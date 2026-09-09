import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { HEROES } from '../sparkbound/roster.js';
import { createState, publicState } from '../functions/_lib/sparkbound.js';
import { CAMPAIGN, VIEWPORTS, repo, dependency, assertPanelFits, assertLearnerPrivacy, verifyHarderCampaignForms, runCampaignJourney, verifyParentEvidence } from './qa-sparkbound-expansion.mjs';

assert.ok(process.argv.includes('--approved-deploy'), 'Run only after the user confirms an approved deployment, with --approved-deploy.');
const { chromium } = dependency('playwright'), sharp = dependency('sharp');
const origin = 'https://bright-quest.pages.dev', output = resolve(repo, '../outputs/sparkbound-build/live');
await mkdir(output, { recursive: true });
const report = { at: new Date().toISOString(), boundary: 'Production static assets and real unauthenticated gate. Gameplay and parent-review API requests intercepted into ephemeral local D1; no production writes.', assets: [], checks: [], errors: [], previewEvidence: [] };
const hash = b => createHash('sha256').update(b).digest('hex');
const check = (name, passed = true) => { assert.ok(passed, name); report.checks.push(name); };
const packedDirectory = 'sparkbound/assets/heroes/generated/packed';
async function generatedRuntimeFiles(directory = packedDirectory) {
  const files = [];
  for (const entry of await readdir(resolve(repo, directory), { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await generatedRuntimeFiles(path));
    else if (entry.isFile() && /\.(png|webp|json)$/i.test(entry.name)) files.push(path);
  }
  return files.sort();
}
let browser, h;
try {
  check('Expected campaign roster', HEROES.length === CAMPAIGN.heroes && HEROES.every(hero => hero.weapons.length === CAMPAIGN.stages));
  const models = JSON.parse(await readFile(resolve(repo, 'sparkbound/assets/model-provenance.json'), 'utf8'));
  const environment = JSON.parse(await readFile(resolve(repo, 'sparkbound/assets/environment-provenance.json'), 'utf8'));
  // Only prepared runtime assets are release requirements; raw source images and README files are excluded.
  const generatedAssets = await generatedRuntimeFiles();
  const manifestPath = `${packedDirectory}/manifest.json`;
  check('Packed actor coordinate manifest is included', generatedAssets.includes(manifestPath));
  const packedManifest = JSON.parse(await readFile(resolve(repo, manifestPath), 'utf8'));
  check('Every packed manifest image is included in release verification', Array.isArray(packedManifest.files)
    && packedManifest.files.length > 0
    && packedManifest.files.every(file => typeof file === 'string' && /\.(png|webp)$/i.test(file) && generatedAssets.includes(`${packedDirectory}/${file}`)));
  check('Generated actor runtime images exist for release verification', generatedAssets.some(path => /\.(png|webp)$/i.test(path)));
  report.generatedAssets = generatedAssets;
  const files = ['sparkbound/index.html', 'sparkbound/game.js', 'sparkbound/sparkbound.css', 'sparkbound/roster.js', 'sparkbound/assets/module-preview.jpg', 'sparkbound-parent.js', 'sparkbound-parent.css', 'bright-quest-shell-merge.js',
    ...HEROES.flatMap(hero => Array.from({ length: CAMPAIGN.stages }, (_, stage) => `sparkbound/assets/heroes/${hero.id}-${stage}.jpg`)),
    ...generatedAssets, ...models.models.map(m => 'sparkbound/assets/' + m.file), ...environment.files.map(m => 'sparkbound/assets/' + m.file)];
  for (const path of files) {
    const r = await fetch(`${origin}/${path}`, { cache: 'no-store' }); assert.equal(r.status, 200, path);
    const live = Buffer.from(await r.arrayBuffer()), local = await readFile(resolve(repo, path));
    const normal = b => /\.(js|css|html|json)$/.test(path) ? Buffer.from(b.toString().replaceAll('\r\n', '\n')) : b;
    assert.equal(hash(normal(live)), hash(normal(local)), path);
    report.assets.push({ path, sha256: hash(normal(live)), bytes: live.length });
  }
  check('All 66 portraits, generated runtime assets and retained models match local release bytes');
  assert.equal((await fetch(origin + '/api/sparkbound', { cache: 'no-store' })).status, 401); check('Production API requires authentication');
  assert.equal((await fetch(origin + '/sparkbound/content.js')).status, 404); check('Answer bank is not published');
  const campaignTools = (await readdir(resolve(repo, 'tools'))).filter(name => /sparkbound.*campaign.*\.mjs$/.test(name));
  const privateTools = new Set(['test-sparkbound-expansion-content.mjs', 'test-sparkbound-roster.mjs', 'test-sparkbound-campaign.mjs', 'qa-sparkbound-audio-campaign.mjs', 'qa-sparkbound-expansion.mjs', 'verify-sparkbound-live.mjs', ...campaignTools]);
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
  const generatedBrowserLoads = new Map();
  const observe = p => {
    p.on('pageerror', e => report.errors.push(e.message));
    p.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
    p.on('requestfailed', r => report.errors.push(`${r.failure()?.errorText} ${r.url()}`));
    p.on('response', r => {
      if (r.status() >= 400) report.errors.push(`${r.status()} ${r.url()}`);
      const path = new URL(r.url()).pathname.slice(1);
      if (path.startsWith(`${packedDirectory}/`)) generatedBrowserLoads.set(path,
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
  const runtimePaths = [manifestPath, ...packedManifest.files.map(file => `${packedDirectory}/${file}`)];
  await page.waitForFunction(paths => {
    const completed = new Set(performance.getEntriesByType('resource').filter(entry => entry.responseEnd > 0).map(entry => new URL(entry.name).pathname.slice(1)));
    return paths.every(path => completed.has(path));
  }, runtimePaths, { timeout: 45000 });
  report.generatedBrowserLoads = await Promise.all(runtimePaths.map(path => generatedBrowserLoads.get(path) ?? { path, complete: false, error: 'Browser response not observed' }));
  check('Browser fully loads packed coordinate manifest and every generated actor image', report.generatedBrowserLoads.every(load => load.status === 200 && load.complete));
  report.previewEvidenceBoundary = 'Live checks use UI selection, completed asset loads, canvas pixels and screenshots; they do not assert internal actor identity without the local QA hook.';
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
    await click('path'); await assertPanelFits(page, '.path-panel', check, `${name} live path`); await shot(`${name}-path`); await click('path-back');
    const stats = await sharp(await page.locator('#scene').screenshot()).stats(); check(`${name}: nonblank live canvas`, stats.channels.slice(0, 3).every(c => c.stdev > 12));
  }
  await page.locator('[data-hero="echo"]').click(); await click('start');
  check('Live selected hero starts with fifteen questions, six rounds and Shield available', latest.match.heroId === 'echo' && latest.match.questions.length === CAMPAIGN.questions && latest.configuration.battle.rounds.length === CAMPAIGN.rounds && await page.locator('[data-move="guard"]').count() === 1);
  check('Fresh live v3 starts at Applied', latest.match.rulesVersion === 3 && latest.match.learningLevel === 2);
  await verifyHarderCampaignForms({ page, seed, state: async () => latest, settled: idle, check, shot, profileId: h.fixture.childId });
  const journeyBase = createState({ profileId: h.fixture.childId }); Object.assign(journeyBase, { wins: 4, tier: 5 });
  await seed(journeyBase); await page.locator('[data-hero="echo"]').click(); await click('start');
  check('Experienced live v3 starts at Stretch, capped at band 3', latest.match.learningLevel === 3);
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
  assert.deepEqual(report.errors, []); check('No browser or asset errors');
} catch (error) { report.errors.push(error.stack); process.exitCode = 1; }
finally {
  await browser?.close(); await h?.close();
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
