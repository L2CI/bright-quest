import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { createQuestion } from '../beacon-brigade/content.js';
import { startBeaconQa } from './serve-beacon-qa.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.BQ_PLAYWRIGHT_MODULE || 'playwright');
const sharp = require('sharp');
const authenticated = process.env.BQ_QA_AUTH === '1';
const harness = authenticated ? await startBeaconQa({ port: 0 }) : null;
const base = harness?.origin || process.env.BQ_QA_URL || 'http://127.0.0.1:4187';
const out = resolve(`../outputs/qa-beacon-brigade${authenticated ? '-authenticated' : ''}`); await mkdir(out, { recursive: true });
const report = { checks: [], errors: [], screenshots: [] };
const check = (name, passed, detail = '') => { report.checks.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--mute-audio'] });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  if (harness) {
    await context.addCookies([harness.fixture.cookie]);
    await context.addInitScript(value => { sessionStorage.setItem('brightQuestChildCapability', value); }, harness.fixture.childCapability);
  }
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  const idle = () => page.waitForFunction(() => document.querySelector('#game').getAttribute('aria-busy') !== 'true');
  const act = async action => { await page.locator(`[data-action="${action}"]`).filter({ visible: true }).first().click(); await idle(); };
  const submitAnswer = async () => { await page.locator('#answer-form button[type="submit"]').click(); await idle(); };
  const shot = async name => { const path = resolve(out, `${name}.png`); await page.screenshot({ path }); report.screenshots.push(path); return path; };
  await page.goto(`${base}/beacon-brigade/${authenticated ? '' : '?preview=1'}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !!window.__BEACON_QA__); await page.waitForTimeout(1800);
  check(authenticated ? 'Authenticated game boots' : 'Preview boots', await page.locator('#game').getAttribute('data-view') === 'hq');
  const startFrame = await page.evaluate(() => window.__BEACON_QA__.frame); await page.waitForTimeout(300);
  check('3D render advances', await page.evaluate(f => window.__BEACON_QA__.frame > f, startFrame));
  const image = await shot('01-hq-desktop');
  const stats = await sharp(image).extract({ left: 150, top: 260, width: 650, height: 430 }).stats();
  check('Canvas is nonblank', stats.channels.slice(0, 3).every(c => c.stdev > 15), stats.channels.map(c => c.stdev));
  check('Ground assets loaded', await page.evaluate(() => window.__BEACON_QA__.world.textureErrors.length === 0));
  if (process.env.BQ_QA_SNAPSHOT === '1') {
    await act('map'); await page.waitForTimeout(1500); await shot('02-map-desktop');
    await page.setViewportSize({ width: 390, height: 844 }); await act('hq'); await page.waitForTimeout(1200); await shot('03-hq-mobile');
  } else {
    await act('zoom-in'); await act('zoom-out'); await act('reset-camera');
    await act('settings'); check('Settings dialog opens', await page.locator('dialog').isVisible());
    await page.locator('#motion-setting').check(); await act('save-settings');
    await act('construction'); check('Unfunded build disabled', await page.locator('[data-action="confirm-build"]').isDisabled()); await act('hq');
    for (const region of ['harbour', 'grove']) {
      await act('map'); await page.locator(`#interface [data-region="${region}"]`).click(); await act('deploy');
      await page.waitForFunction(() => window.__BEACON_QA__.view === 'region');
      check(`${region} deployment exposes three physical destinations`, await page.locator('[data-action="select-station"]').count() === 3);
      const stations = await page.evaluate(() => window.__BEACON_QA__.state.activeExpedition.stations.map(s => s.id));
      for (let i = 0; i < stations.length; i++) {
        await page.locator(`[data-action="select-station"][data-station="${stations[i]}"]`).click();
        check(`${region} station ${i + 1} offers Explore and March`, await page.locator('[data-action="explore-station"]').isVisible() && await page.locator('[data-action="march-station"]').isVisible());
        if (i === 0) {
          await page.waitForTimeout(350); await shot(`${region}-aerial-desktop`);
          await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(350); await shot(`${region}-aerial-mobile`);
          check(`${region} aerial destinations fit mobile`, await page.evaluate(() => {
            const panel = document.querySelector('.field-command')?.getBoundingClientRect();
            const pins = [...document.querySelectorAll('.field-location-pin:not([hidden])')].map(el => el.getBoundingClientRect());
            return pins.length === 3 && pins.every(r => r.left >= 0 && r.right <= innerWidth && r.top >= 0 && (!panel || r.bottom < panel.top));
          }));
          await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(250);
          const version = await page.evaluate(() => window.__BEACON_QA__.state.version);
          await act('explore-station');
          check('Explore opens reconnaissance without saving', await page.locator('dialog').isVisible() && await page.evaluate(v => window.__BEACON_QA__.state.version === v, version));
          await act('march-dialog');
        } else await act('march-station');
        check('Question stays closed during march', await page.locator('#answer-form').count() === 0);
        await page.waitForFunction(() => window.__BEACON_QA__.view === 'station');
        check(`${region} station ${i + 1} renders`, await page.locator('#answer-form').isVisible());
        await submitAnswer();
        check('Empty answer does not submit', await page.evaluate(() => window.__BEACON_QA__.state.activeExpedition.stations.find(s => s.id === location.hash.split('/').slice(1).map(decodeURIComponent).join('/'))?.attempts.length === 0));
        const metadata = await page.evaluate(id => window.__BEACON_QA__.state.activeExpedition.stations.find(s => s.id === id).question, stations[i]);
        const question = createQuestion(metadata.templateId, metadata.variant);
        if (i === 0) {
          if (question.type === 'number') await page.locator('#answer-input').fill('999');
          else await page.locator(`[data-option="${question.options.find(o => o.id !== question.answer).id}"]`).click();
          await submitAnswer();
          check('Wrong answer preserved and unpaid', await page.evaluate(id => { const s = window.__BEACON_QA__.state.activeExpedition.stations.find(s => s.id === id); return s.attempts[0].correct === false && !s.rewardGranted; }, stations[i]));
          await act('hint'); check('Targeted hint appears', await page.locator('.feedback').innerText().then(t => t.includes('Field guidance')));
          await shot(`${region}-station-desktop`);
          await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(250); await shot(`${region}-station-mobile`);
          check('Question fits mobile width', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
          await page.setViewportSize({ width: 1440, height: 900 });
        }
        if (question.type === 'number') await page.locator('#answer-input').fill(String(question.answer));
        else await page.locator(`[data-option="${question.answer}"]`).click();
        await submitAnswer();
        check(`${region} station reward`, await page.evaluate(id => window.__BEACON_QA__.state.activeExpedition.stations.find(s => s.id === id).resolved, stations[i]));
        await page.locator('#answer-form [data-action="region"]').click();
      }
      await act('finish'); check(`${region} complete`, await page.locator('#game').getAttribute('data-view') === 'results');
      await act('review'); check('Review retains first missed answer', await page.locator('.review-station').first().innerText().then(t => /first answer missed/i.test(t)));
      await act('journal'); await act('hq');
    }
    check('Both resources total 12', await page.evaluate(() => { const w = window.__BEACON_QA__.state.wallet; return w.parts === 12 && w.cores === 12; }));
    await act('construction'); await act('confirm-build'); await act('close-dialog'); check('Cancelling build keeps resources', await page.evaluate(() => window.__BEACON_QA__.state.wallet.parts === 12));
    await act('confirm-build'); await act('build-now'); check('HQ upgrade funded once', await page.evaluate(() => window.__BEACON_QA__.state.hqLevel === 2 && window.__BEACON_QA__.state.wallet.parts === 0));
    await page.reload({ waitUntil: 'networkidle' }); await page.waitForFunction(() => !!window.__BEACON_QA__);
    check('HQ reload keeps upgrade and history', await page.evaluate(() => window.__BEACON_QA__.state.hqLevel === 2 && window.__BEACON_QA__.state.history.length === 2));
    await shot('hq-level2-desktop');
    await act('map'); await page.goBack(); check('Browser Back returns to HQ', await page.locator('#game').getAttribute('data-view') === 'hq');
    await page.setViewportSize({ width: 834, height: 1194 }); await page.waitForTimeout(400); await shot('hq-tablet');
    await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(400); await shot('hq-level2-mobile');
    await act('settings'); await page.keyboard.press('Escape'); check('Escape closes settings', !await page.locator('dialog').isVisible());
    if (harness) {
      const result = await context.request.get(`${base}/api/beacon-brigade?childId=${harness.fixture.childId}`, { headers: { 'x-bq-parent-capability': harness.fixture.parentCapability } });
      const parent = await result.json();
      check('Real D1 Parent evidence matches game', result.ok() && parent.state.hqLevel === 2 && parent.state.history.length === 2 && parent.state.history.every(e => e.stations[0].firstAttemptCorrect === false && e.stations[0].resolved));
      check('No browser-only wallet in authenticated play', await page.evaluate(() => localStorage.getItem('bqBeaconPreviewV1') === null));
    }
  }
  check('No runtime/console errors', report.errors.length === 0, report.errors);
} catch (e) { report.errors.push(e.stack); console.error(e); }
finally { await browser.close(); await harness?.close(); await writeFile(resolve(out, 'report.json'), JSON.stringify(report, null, 2)); }
console.log(JSON.stringify(report, null, 2));
if (report.errors.length || report.checks.some(c => !c.passed)) process.exitCode = 1;
