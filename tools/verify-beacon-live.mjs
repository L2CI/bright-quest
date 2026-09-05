import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { startBeaconQa } from './serve-beacon-qa.mjs';
import { createQuestion } from '../beacon-brigade/content.js';

const origin = 'https://bright-quest.pages.dev';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const sharp = require('sharp');
const out = resolve('../outputs/qa-beacon-valley/live');
await mkdir(out, { recursive: true });
const report = { at: new Date().toISOString(), origin, boundary: 'Production static assets and unauthenticated gate. All gameplay API calls intercepted and sent to an isolated local D1 fixture; no production writes.', assets: [], checks: [], errors: [] };
const hash = b => createHash('sha256').update(b).digest('hex');
const manifest = JSON.parse(await readFile('beacon-brigade/assets/provenance.json', 'utf8'));
let browser, harness;
try {
  for (const path of ['beacon-brigade/index.html', 'beacon-brigade/game.js', 'beacon-brigade/beacon.css', 'beacon-brigade/campaign.css', 'beacon-brigade/field-lab.css', 'beacon-brigade/discovery.css', ...manifest.files.map(f => 'beacon-brigade/assets/' + f.file)]) {
    const response = await fetch(origin + '/' + path, { cache: 'no-store' });
    assert.equal(response.status, 200, path);
    const local = await readFile(path), live = Buffer.from(await response.arrayBuffer());
    const text = /\.(html|js|css)$/.test(path);
    const normal = b => text ? Buffer.from(b.toString().replaceAll('\r\n', '\n')) : b;
    assert.equal(hash(normal(live)), hash(normal(local)), 'Deployed asset mismatch: ' + path);
    report.assets.push({ path, sha256: hash(normal(live)), bytes: live.length });
  }
  assert.equal((await fetch(origin + '/api/beacon-brigade')).status, 401);
  report.checks.push('Real production API rejects unauthenticated access');
  browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--mute-audio'] });
  const gate = await browser.newPage();
  await gate.goto(origin + '/beacon-brigade/');
  await gate.getByText('Open Bright Quest and select your child profile to begin.', { exact: true }).waitFor();
  assert.equal(await gate.getByRole('link', { name: 'Open Bright Quest', exact: true }).getAttribute('href'), '/');
  await gate.screenshot({ path: resolve(out, 'production-auth-gate.png') });
  await gate.close(); report.checks.push('Real production login gate and portal return');

  harness = await startBeaconQa({ port: 0 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  let latest;
  // Production receives static GETs only. Synthetic credentials stay inside this callback.
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.origin !== origin) return route.abort();
    if (url.pathname.startsWith('/api/')) {
      assert.equal(url.pathname, '/api/beacon-brigade');
      const response = await fetch(harness.origin + url.pathname, {
        method: request.method(), headers: { origin: harness.origin, 'content-type': 'application/json',
          cookie: `${harness.fixture.cookie.name}=${harness.fixture.cookie.value}`,
          'x-bq-child-capability': harness.fixture.childCapability, 'x-bq-child-id': harness.fixture.childId },
        ...(request.postData() ? { body: request.postData() } : {})
      });
      const body = await response.text();
      assert.equal(response.status, 200, body); latest = JSON.parse(body).state;
      return route.fulfill({ status: response.status, contentType: 'application/json', body });
    }
    assert.equal(request.method(), 'GET');
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) report.errors.push(`${r.status()} ${new URL(r.url()).pathname}`); });
  const idle = () => page.waitForFunction(() => document.querySelector('#game').getAttribute('aria-busy') !== 'true');
  const act = async action => { await page.locator(`[data-action="${action}"]`).filter({ visible: true }).first().click(); await idle(); };
  await page.goto(origin + '/beacon-brigade/');
  await page.locator('#game[data-view="hq"]').waitFor();
  for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    await page.setViewportSize(viewport); await act('map'); await page.waitForTimeout(1100);
    const screenshot = await page.locator('#scene').screenshot();
    const stats = await sharp(screenshot).stats(); assert(stats.channels.slice(0, 3).every(c => c.stdev > 12));
    await page.screenshot({ path: resolve(out, `live-map-${name}.png`) });
    for (const id of ['harbour', 'english', 'physics', 'chemistry', 'grove']) {
      await page.locator(`[data-pin="${id}"]`).click(); await act('explore-region');
      assert(await page.locator('[data-action="march-region-dialog"]').isVisible());
      await act('close-dialog'); await act('clear-region');
    }
    await act('campaign'); assert.equal(await page.locator('.restoration-project').count(), 3);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await act('hq'); await act('garage'); assert.equal(await page.locator('.loadout-item').count(), 5);
    for (const id of ['balanced', 'survey', 'hauler', 'rescue', 'crawler']) {
      await page.locator(`[data-action="inspect-vehicle"][data-loadout="${id}"]`).click(); await idle();
      await page.locator('#game[data-view="vehicle"]').waitFor();
      assert.equal(latest.campaign.loadoutId, 'balanced', 'Inspection must not equip');
      await page.screenshot({ path: resolve(out, `live-vehicle-${id}-${name}.png`) });
      await act('garage');
    }
    await act('settings'); await page.locator('#motion-setting').check(); await act('save-settings');
    await act('map');
    for (const id of ['jokes', 'riddles', 'lookout', 'numbers']) {
      const version = latest.version;
      await page.locator(`[data-activity="${id}"]`).click(); await act('visit-activity');
      await page.locator('#game[data-view="activity"]').waitFor();
      if (await page.locator('[data-action="reveal-activity"]').count()) await act('reveal-activity');
      assert(await page.locator('.discovery-answer').isVisible());
      assert.equal(latest.version, version, 'Discovery must not change assessment progress');
      await page.screenshot({ path: resolve(out, `live-discovery-${id}-${name}.png`) });
      await act('map');
    }
    report.checks.push(`${name}: all five vehicle inspections and four discovery arrivals/reveals`);
    report.checks.push(`${name}: nonblank live canvas, all five destination popups, campaign, garage and return controls`);
  }
  await page.setViewportSize({ width: 1440, height: 900 }); await act('map');
  await page.locator('[data-pin="harbour"]').click(); await act('march-region');
  await page.locator('#game[data-view="region"]').waitFor({ timeout: 30000 });
  await page.locator('[data-action="select-station"]').first().click(); await act('march-station');
  await page.locator('#game[data-view="station"]').waitFor({ timeout: 30000 });
  const q = latest.activeExpedition.stations[0].question;
  await page.locator('#answer-input').fill(String(createQuestion(q.templateId, q.variant).answer));
  await page.locator('#answer-form button[type="submit"]').click(); await idle();
  assert.equal(latest.wallet.parts, 4); assert(latest.activeExpedition.stations[0].resolved);
  await page.reload(); await page.locator('[data-action="next-mission"]').waitFor();
  await page.screenshot({ path: resolve(out, 'live-saved-mission.png') });
  report.checks.push('Live frontend march, arrival, answer, reward and reload against isolated local D1');
  assert.deepEqual(report.errors, []); report.passed = true;
} catch (e) { report.passed = false; report.failure = e.stack; process.exitCode = 1; }
finally {
  await browser?.close(); await harness?.close();
  await writeFile(resolve(out, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
