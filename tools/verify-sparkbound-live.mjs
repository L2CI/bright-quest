import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { get as httpsGet } from 'node:https';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { HEROES } from '../sparkbound/roster.js';
import { createState, publicState } from '../functions/_lib/sparkbound.js';
import { CAMPAIGN, CURRENT_RULES_VERSION, VIEWPORTS, repo, dependency, assertPanelFits, assertLearnerPrivacy, verifyHarderCampaignForms, verifyLegacyV3Save, verifyInspectionControls, runCampaignJourney, verifyParentEvidence } from './qa-sparkbound-expansion.mjs';

assert.ok(process.argv.includes('--approved-deploy'), 'Run only after the user confirms an approved deployment, with --approved-deploy.');
const { chromium } = dependency('playwright'), sharp = dependency('sharp');
const origin = 'https://bright-quest.pages.dev', output = resolve(repo, '../outputs/sparkbound-build/live');
await mkdir(output, { recursive: true });
const report = { at: new Date().toISOString(), boundary: 'Production static assets and real unauthenticated gate. Gameplay and parent-review API requests intercepted into ephemeral local D1; no production writes.', assets: [], checks: [], errors: [], previewEvidence: [] };
const hash = b => createHash('sha256').update(b).digest('hex');
const check = (name, passed = true) => { assert.ok(passed, name); report.checks.push(name); };
const guardianLibrary = 'sparkbound/assets/mechs/guardian-library.glb';
const packedGuardianLibrary = `${guardianLibrary}.gz`;
// Combat effects remain textured; image-actor pose atlases are no longer character runtime assets.
const combatEffects = 'sparkbound/assets/heroes/generated/packed/combat-effects.webp';
const runtimePaths = [packedGuardianLibrary, 'sparkbound/assets/mechs/stan.glb', 'sparkbound/assets/mechs/mike.glb', combatEffects];
async function releaseBytes(path) {
  if (!path.endsWith('.gz')) {
    const response = await fetch(`${origin}/${path}`, { cache: 'no-store' });
    return { status: response.status, bytes: Buffer.from(await response.arrayBuffer()) };
  }
  // Fetch transparently decodes Content-Encoding. Inspect raw transport bytes for the gzip SHA.
  return new Promise((resolveBytes, reject) => {
    const request = httpsGet(`${origin}/${path}`, { headers: { 'accept-encoding': 'identity', 'cache-control': 'no-cache' } }, response => {
      const chunks = []; let size = 0;
      response.on('data', chunk => {
        size += chunk.length;
        if (size > 50 * 1024 * 1024) return request.destroy(new Error('Unexpectedly large compressed model response'));
        chunks.push(chunk);
      });
      response.on('error', reject);
      response.on('end', () => resolveBytes({ status: response.statusCode, bytes: Buffer.concat(chunks) }));
    });
    request.setTimeout(30000, () => request.destroy(new Error('Compressed model verification timed out')));
    request.on('error', reject);
  });
}
let browser, h;
try {
  check('Expected campaign roster', HEROES.length === CAMPAIGN.heroes && HEROES.every(hero => hero.weapons.length === CAMPAIGN.stages));
  const models = JSON.parse(await readFile(resolve(repo, 'sparkbound/assets/model-provenance.json'), 'utf8'));
  const environment = JSON.parse(await readFile(resolve(repo, 'sparkbound/assets/environment-provenance.json'), 'utf8'));
  const glb = await readFile(resolve(repo, guardianLibrary));
  const packedGlb = await readFile(resolve(repo, packedGuardianLibrary));
  const guardianReportPath = 'sparkbound/assets/mechs/guardian-library.report.json';
  const guardianReport = JSON.parse(await readFile(resolve(repo, guardianReportPath), 'utf8'));
  check('Guardian provenance names the expected local generator', guardianReport.source === 'tools/build-sparkbound-3d.py');
  check('Guardian provenance matches generator, source GLB and gzip SHA-256', guardianReport.generatorSha256 === hash(await readFile(resolve(repo, 'tools/build-sparkbound-3d.py')))
    && guardianReport.export.sha256 === hash(glb) && guardianReport.gzip.sha256 === hash(packedGlb));
  check('Gzip expands to the exact source GLB', hash(gunzipSync(packedGlb)) === hash(glb));
  check('Guardian library is a complete glTF 2 binary', glb.length >= 20 && glb.readUInt32LE(0) === 0x46546c67 && glb.readUInt32LE(4) === 2 && glb.readUInt32LE(8) === glb.length && glb.readUInt32LE(16) === 0x4e4f534a);
  const library = JSON.parse(glb.subarray(20, 20 + glb.readUInt32LE(12)).toString());
  const nodes = new Set((library.nodes || []).map(node => node.name));
  check('Guardian library contains twelve hero templates and five weapon stages each', [...HEROES.map(hero => hero.id), 'prism'].every(id => nodes.has(`${id}__Head`) && nodes.has(`${id}__Chest`) && [1, 2, 3, 4, 5].every(stage => nodes.has(`${id}__Weapon${stage}`))));
  report.runtimeAssets = runtimePaths;
  report.rulesVersion = CURRENT_RULES_VERSION;
  const files = [...new Set(['sparkbound/index.html', 'sparkbound/game.js', 'sparkbound/sparkbound.css', 'sparkbound/roster.js', 'sparkbound/assets/module-preview.jpg', 'sparkbound-parent.js', 'sparkbound-parent.css', 'bright-quest-shell-merge.js',
    ...HEROES.flatMap(hero => Array.from({ length: CAMPAIGN.stages }, (_, stage) => `sparkbound/assets/heroes/${hero.id}-${stage}.jpg`)),
    guardianLibrary, guardianReportPath, ...runtimePaths, ...models.models.map(m => 'sparkbound/assets/' + m.file), ...environment.files.map(m => 'sparkbound/assets/' + m.file)])];
  for (const path of files) {
    const r = await releaseBytes(path); assert.equal(r.status, 200, path);
    const live = r.bytes, local = await readFile(resolve(repo, path));
    const normal = b => /\.(js|css|html|json)$/.test(path) ? Buffer.from(b.toString().replaceAll('\r\n', '\n')) : b;
    assert.equal(hash(normal(live)), hash(normal(local)), path);
    report.assets.push({ path, sha256: hash(normal(live)), bytes: live.length });
  }
  check('All 66 portraits, guardian library, combat effects and retained skeletons match local release bytes');
  assert.equal((await fetch(origin + '/api/sparkbound', { cache: 'no-store' })).status, 401); check('Production API requires authentication');
  assert.equal((await fetch(origin + '/sparkbound/content.js')).status, 404); check('Answer bank is not published');
  const campaignTools = (await readdir(resolve(repo, 'tools'))).filter(name => /sparkbound.*campaign.*\.mjs$/.test(name));
  const privateTools = new Set(['test-sparkbound-expansion-content.mjs', 'test-sparkbound-roster.mjs', 'test-sparkbound-campaign.mjs', 'qa-sparkbound-audio-campaign.mjs', 'qa-sparkbound-expansion.mjs', 'qa-sparkbound-true3d.mjs', 'verify-sparkbound-live.mjs', ...campaignTools]);
  for (const name of privateTools) assert.equal((await fetch(`${origin}/tools/${name}`, { cache: 'no-store' })).status, 404, name);
  check('Production blocks existing and new campaign development fixtures');
  browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
  const gate = await browser.newPage(); await gate.goto(origin + '/sparkbound/');
  await gate.getByText('Open Bright Quest and select your child profile to begin.').waitFor();
  check('Real authentication gate provides Bright Quest return', await gate.locator('a[href="/"]').count() > 0);
  await gate.screenshot({ path: resolve(output, 'auth-gate.png') }); await gate.close();
  h = await startSparkboundQa({ port: 0 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' }); let latest;
  await context.addInitScript(({ id, cap }) => {
    localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true');
    if (!localStorage.getItem('bqSparkSettings')) localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, music: true, effects: true, volume: .4, reduced: false }));
    sessionStorage.setItem('brightQuestChildCapability', cap);
  }, { id: h.fixture.childId, cap: h.fixture.childCapability });
  await context.route('**/*', async route => {
    try {
      const request = route.request(), url = new URL(request.url());
      if (url.origin !== origin) return route.abort();
      if (url.pathname.startsWith('/api/')) {
        assert.ok(['/api/sparkbound', '/api/profiles'].includes(url.pathname), `Unexpected API: ${url.pathname}`);
        assert.ok(['GET', 'POST'].includes(request.method()));
        assert.ok(url.pathname === '/api/sparkbound' || request.method() === 'GET', 'Profiles are read-only');
        const parent = Boolean(request.headers()['x-bq-parent-capability']);
        const r = await fetch(h.origin + url.pathname + url.search, { method: request.method(), headers: {
          origin: h.origin, 'content-type': 'application/json', cookie: `bq_session=${h.fixture.cookie.value}`,
          ...(parent ? { 'x-bq-parent-capability': h.fixture.parentCapability } : { 'x-bq-child-capability': h.fixture.childCapability, 'x-bq-child-id': h.fixture.childId }),
        }, ...(request.postData() ? { body: request.postData() } : {}) });
        const body = await r.text(); assert.equal(r.status, 200, body);
        if (!parent && url.pathname === '/api/sparkbound') {
          latest = JSON.parse(body).state;
          assertLearnerPrivacy(latest, check, 'Live child API response');
        }
        return route.fulfill({ status: r.status, contentType: 'application/json', body });
      }
      assert.equal(request.method(), 'GET'); return route.continue();
    } catch (error) { report.errors.push(error.stack); await route.abort(); }
  });
  const page = await context.newPage();
  const runtimeBrowserLoads = new Map(), obsoleteActorLoads = new Set();
  const observe = p => {
    p.on('pageerror', e => report.errors.push(e.message));
    p.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
    p.on('requestfailed', r => report.errors.push(`${r.failure()?.errorText} ${r.url()}`));
    p.on('response', r => {
      if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);
      const path = new URL(r.url()).pathname.slice(1);
      if (path.startsWith('sparkbound/assets/heroes/generated/packed/') && path !== combatEffects) obsoleteActorLoads.add(path);
      if (runtimePaths.includes(path)) runtimeBrowserLoads.set(path,
        r.finished().then(error => ({ path, status: r.status(), complete: !error, error: error?.message ?? null }),
          error => ({ path, status: r.status(), complete: false, error: String(error) })));
    });
  };
  observe(page);
  const idle = () => page.waitForFunction(() => document.querySelector('#loading')?.style.display === 'none' && document.querySelector('#game')?.getAttribute('aria-busy') === 'false', null, { timeout: 45000 });
  const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await idle(); };
  const shot = async name => { await page.waitForTimeout(500); await page.screenshot({ path: resolve(output, `${name}.png`) }); };
  const privateState = async () => JSON.parse((await h.db.prepare('SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?').bind(h.fixture.familyId, h.fixture.childId).first()).state_json);
  const seed = async saved => {
    publicState(saved);
    await h.db.prepare('DELETE FROM sparkbound_operations WHERE family_id=? AND child_id=?').bind(h.fixture.familyId, h.fixture.childId).run();
    await h.db.prepare('UPDATE sparkbound_states SET state_json=?,version=?,last_operation_id=NULL WHERE family_id=? AND child_id=?').bind(JSON.stringify(saved), saved.version, h.fixture.familyId, h.fixture.childId).run();
    await page.reload(); await idle();
  };
  await page.goto(origin + '/sparkbound/'); await idle();
  await page.waitForFunction(paths => {
    const completed = new Set(performance.getEntriesByType('resource').filter(entry => entry.responseEnd > 0).map(entry => new URL(entry.name).pathname.slice(1)));
    return paths.every(path => completed.has(path));
  }, runtimePaths, { timeout: 45000 });
  report.runtimeBrowserLoads = await Promise.all(runtimePaths.map(path => runtimeBrowserLoads.get(path) ?? { path, complete: false, error: 'Browser response not observed' }));
  check('Browser fully loads guardian library, both authored skeletons and combat effects', report.runtimeBrowserLoads.every(load => load.status === 200 && load.complete));
  report.previewEvidenceBoundary = 'Live checks use real UI rotation/selection, completed GLB loads, canvas pixels and screenshots. Internal mesh identity, drag rotation angle and socket assertions require the local true3D/expansion suites; manual review is required for live rotation evidence.';
  check('Eleven live heroes', await page.locator('.hero-tile').count() === CAMPAIGN.heroes);
  for (const hero of HEROES) {
    await page.locator(`[data-hero="${hero.id}"]`).click();
    for (let stage = 0; stage < CAMPAIGN.stages; stage++) {
      await page.locator(`[data-stage="${stage}"]`).click();
      check(`${hero.id}: live preview ${stage} is render-only`, !latest.match && (await page.locator('.preview-name').textContent()).includes(hero.weapons[stage].name) && await page.locator(`[data-stage="${stage}"]`).getAttribute('aria-pressed') === 'true');
      const name = `${hero.id}-preview-${stage}`;
      await shot(name);
      const pixels = await page.locator('#scene').screenshot({ path: resolve(output, `${name}-canvas.png`) });
      const stats = await sharp(pixels).stats();
      const channelStdev = stats.channels.slice(0, 3).map(channel => channel.stdev);
      report.previewEvidence.push({ hero: hero.id, previewStage: stage, screenshot: `${name}.png`, canvasScreenshot: `${name}-canvas.png`, canvasSha256: hash(pixels), channelStdev });
      check(`${hero.id}: live preview ${stage} has rendered canvas pixel evidence`, channelStdev.every(value => value > 12));
    }
    await click('path');
    await page.waitForFunction(count => [...document.querySelectorAll('.stage-image img')].length === count && [...document.querySelectorAll('.stage-image img')].every(i => i.complete && i.naturalWidth === 640), CAMPAIGN.stages);
    check(`${hero.id}: six stages, five locked upgrades and six Prism kits`, await page.locator('.upgrade-stage').count() === CAMPAIGN.stages && (await page.locator('.stage-status').allTextContents()).filter(t => t.includes('Locked')).length === CAMPAIGN.locked && await page.locator('.prism-path li').count() === CAMPAIGN.stages);
    await click('path-back');
  }
  check('All 66 live previews have canvas and screenshot evidence', report.previewEvidence.length === CAMPAIGN.heroes * CAMPAIGN.stages);
  for (const [name, width, height] of VIEWPORTS) {
    await page.setViewportSize({ width, height }); await assertPanelFits(page, '.hangar-panel', check, `${name} live hangar`); await shot(`${name}-hangar`);
    if (['desktop', 'tablet', 'phone'].includes(name)) await verifyInspectionControls({ page, state: async () => latest, check, shot, label: `${name}-live`, touch: name !== 'desktop', hook: false });
    await click('path'); await assertPanelFits(page, '.path-panel', check, `${name} live path`); await shot(`${name}-path`); await click('path-back');
    const stats = await sharp(await page.locator('#scene').screenshot()).stats(); check(`${name}: nonblank live canvas`, stats.channels.slice(0, 3).every(c => c.stdev > 12));
  }
  await page.locator('[data-hero="echo"]').click(); await click('start');
  check('Live selected hero starts with fifteen questions, six rounds and Shield available', latest.match.heroId === 'echo' && latest.match.questions.length === CAMPAIGN.questions && latest.configuration.battle.rounds.length === CAMPAIGN.rounds && await page.locator('[data-move="guard"]').count() === 1);
  check(`Fresh live v${CURRENT_RULES_VERSION} starts at Applied`, latest.match.rulesVersion === CURRENT_RULES_VERSION && latest.match.learningLevel === 2);
  await verifyLegacyV3Save({ page, seed, state: async () => latest, settled: idle, check, shot, profileId: h.fixture.childId });
  await verifyHarderCampaignForms({ page, seed, state: async () => latest, settled: idle, check, shot, profileId: h.fixture.childId });
  const journeyBase = createState({ profileId: h.fixture.childId }); Object.assign(journeyBase, { wins: 4, tier: 5 });
  await seed(journeyBase); await page.locator('[data-hero="echo"]').click(); await click('start');
  check(`Experienced live v${CURRENT_RULES_VERSION} starts at Stretch, capped at band 3`, latest.match.rulesVersion === CURRENT_RULES_VERSION && latest.match.learningLevel === 3);
  const completed = await runCampaignJourney({ page, settled: idle, state: async () => latest, privateState, check, shot });
  const parent = await context.newPage(); observe(parent);
  await verifyParentEvidence({ page: parent, origin, fixture: h.fixture, completed, check, shot: name => parent.screenshot({ path: resolve(output, `${name}.png`) }) }); await parent.close();
  await click('review'); check('Live learner review has all fifteen tasks', await page.locator('.review-item').count() === CAMPAIGN.questions);
  await page.goBack(); await idle();
  await click('settings'); await click('path'); await page.locator('[data-hero="echo"]').click();
  check('Live completed guide marks sixth equipment stage', (await page.locator('.stage-status').last().textContent()).includes('Equipped')); await click('path-back');
  await click('pause'); await page.getByRole('button', { name: 'Resume', exact: true }).click(); await idle();
  await click('settings'); await click('restart'); await click('close-dialog');
  check('Live reset cancellation preserves the completed campaign', JSON.stringify(await privateState()) === JSON.stringify(completed));
  await click('settings'); await click('restart'); await click('confirm-restart');
  const reset = await privateState();
  check('Live reset archives fifteen records and preserves wins', !reset.match && reset.wins === completed.wins && JSON.stringify(reset.history.at(-1).questions) === JSON.stringify(completed.match.questions));
  await page.reload(); await idle(); check('Live reset and wins survive refresh', !latest.match && latest.wins === completed.wins);
  check('Character pose atlases are not loaded by the true3D release', obsoleteActorLoads.size === 0);
  assert.deepEqual(report.errors, []); check('No browser or asset errors');
} catch (error) { report.errors.push(error.stack); process.exitCode = 1; }
finally {
  await browser?.close(); await h?.close();
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
