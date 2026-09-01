import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startBeaconQa } from './serve-beacon-qa.mjs';
import { createQuestion } from '../beacon-brigade/content.js';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.BQ_PLAYWRIGHT_MODULE || 'playwright');
const out = resolve('../outputs/qa-beacon-edge');
await mkdir(out, { recursive: true });
const report = { checks: [], errors: [], screenshots: [] };
const check = (name, passed) => { report.checks.push({ name, passed: Boolean(passed) }); if (!passed) throw Error(name); };
const harness = await startBeaconQa({ port: 0 });
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--mute-audio'] });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addCookies([harness.fixture.cookie]);
  await context.addInitScript(cap => sessionStorage.setItem('brightQuestChildCapability', cap), harness.fixture.childCapability);
  await context.route('**/*', route => new URL(route.request().url()).origin === harness.origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  const ready = () => page.waitForFunction(() => !!window.__BEACON_QA__ && document.querySelector('#game').getAttribute('aria-busy') !== 'true');
  const act = async name => { await page.locator(`[data-action="${name}"]`).filter({ visible: true }).first().click(); await ready(); };
  const shot = async name => { const path = resolve(out, `${name}.png`); await page.screenshot({ path }); report.screenshots.push(path); };
  await page.goto(`${harness.origin}/beacon-brigade/`); await ready(); await page.waitForTimeout(1600);
  if (process.env.BQ_QA_CAPTURE_ART === '1') {
    await page.setViewportSize({ width: 1280, height: 800 });
    const hide = await page.addStyleTag({ content: '#topbar,#interface,#navigation,#world-controls,#location-pins,#toast{visibility:hidden!important}' });
    await page.waitForTimeout(700);
    await page.screenshot({ path: resolve('beacon-brigade/assets/module-preview.jpg'), type: 'jpeg', quality: 86 });
    await hide.evaluate(el => el.remove()); await page.setViewportSize({ width: 1440, height: 900 });
  }
  for (const [label, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
    await page.setViewportSize(viewport); await act('map'); await page.waitForTimeout(1500); await shot(`map-${label}`);
    check(`Map ${label} fits viewport`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    check(`Map ${label} labels clear title and screen edges`, await page.evaluate(() => {
      const title = document.querySelector('.scene-caption').getBoundingClientRect();
      return [...document.querySelectorAll('[data-pin]')].every(el => { const r = el.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.top >= title.bottom + 8; });
    }));
    for (const region of ['harbour', 'grove']) {
      const pin = page.locator(`[data-pin="${region}"]`); await pin.click({ timeout: 4000 });
      check(`Map ${label} ${region} pin works`, await page.locator('#game').getAttribute('data-view') === 'region-info');
      await act('map'); await page.waitForTimeout(300);
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('#interface [data-region="harbour"]').click(); await act('deploy');
  await page.waitForTimeout(500); await act('pause-travel');
  const elapsed = await page.evaluate(() => window.__BEACON_QA__.world.travel.elapsed);
  const position = await page.evaluate(() => window.__BEACON_QA__.world.tank.position.toArray());
  await page.waitForTimeout(350);
  check('Pause holds tank and travel time', await page.evaluate(({ elapsed, position }) => window.__BEACON_QA__.world.travel.elapsed === elapsed && JSON.stringify(window.__BEACON_QA__.world.tank.position.toArray()) === JSON.stringify(position), { elapsed, position }));
  await shot('paused-travel'); await act('pause-travel'); await page.waitForTimeout(400);
  check('Continue moves tank', await page.evaluate(elapsed => window.__BEACON_QA__.world.travel.elapsed > elapsed, elapsed));
  await act('cancel-travel'); check('Stopping travel retains active expedition', await page.evaluate(() => window.__BEACON_QA__.view === 'hq' && !!window.__BEACON_QA__.state.activeExpedition));
  await act('settings'); await page.locator('#motion-setting').check(); await act('save-settings');
  await act('resume'); await page.waitForFunction(() => window.__BEACON_QA__.view === 'region');
  await page.locator('[data-action="select-station"]').first().click();
  check('Destination selection exposes Explore and March', await page.locator('[data-action="explore-station"]').isVisible() && await page.locator('[data-action="march-station"]').isVisible());
  await act('march-station'); await page.waitForFunction(() => window.__BEACON_QA__.view === 'station');
  await page.locator('#answer-input').fill('123'); await page.reload(); await ready();
  check('Unsubmitted numeric draft survives reload', await page.locator('#answer-input').inputValue() === '123');
  await act('read'); check('Muted read-aloud has visible feedback', await page.locator('#toast').innerText().then(t => t.includes('Turn on sound')));
  const metadata = await page.evaluate(() => window.__BEACON_QA__.state.activeExpedition.stations[0].question);
  const question = createQuestion(metadata.templateId, metadata.variant);
  await page.locator('#answer-input').fill(String(question.answer));
  // Drop a successful response after the real D1 commit, then replay the same operation.
  await page.route('**/api/beacon-brigade', async route => {
    if (route.request().method() === 'POST') { await route.fetch(); await route.abort('failed'); }
    else await route.continue();
  });
  await page.locator('#answer-form button[type="submit"]').click(); await ready();
  check('Lost response offers retry without guessing reward', await page.locator('[data-action="retry-save"]').isVisible() && await page.evaluate(() => window.__BEACON_QA__.state.wallet.parts === 0));
  await page.unroute('**/api/beacon-brigade'); await act('retry-save');
  check('Retry credits exactly once', await page.evaluate(() => window.__BEACON_QA__.state.wallet.parts === 4 && window.__BEACON_QA__.state.activeExpedition.stations[0].attempts.length === 1));
  await page.reload(); await ready();
  check('Reload after retry retains server receipt', await page.evaluate(() => window.__BEACON_QA__.state.wallet.parts === 4));
  await act('map'); await page.locator('#interface [data-region="grove"]').click(); await act('deploy');
  check('Second region cannot discard active expedition', await page.locator('dialog').innerText().then(t => t.includes('already active')));
  await act('journal-dialog'); await act('end-expedition'); await act('close-dialog');
  check('Cancel ending retains active expedition', await page.evaluate(() => !!window.__BEACON_QA__.state.activeExpedition));
  await act('end-expedition'); await act('end-now');
  check('End retains earned cargo and evidence', await page.evaluate(() => !window.__BEACON_QA__.state.activeExpedition && window.__BEACON_QA__.state.wallet.parts === 4 && window.__BEACON_QA__.state.history[0].stations[0].attempts.length === 1));
  await act('map'); await page.locator('#interface [data-region="grove"]').click(); await act('deploy');
  await page.waitForFunction(() => window.__BEACON_QA__.view === 'region'); await page.locator('[data-action="select-station"]').first().click(); await act('march-station'); await page.waitForFunction(() => window.__BEACON_QA__.view === 'station');
  await page.locator('[data-option]').first().click(); const choice = await page.locator('[data-option][aria-pressed="true"]').getAttribute('data-option');
  await page.reload(); await ready();
  check('Choice draft survives reload', await page.locator('[data-option][aria-pressed="true"]').getAttribute('data-option') === choice);
  await act('settings'); await page.locator('#motion-setting').uncheck(); await act('save-settings');
  await act('observe');
  check('Inspect evidence highlights actual table', await page.locator('[data-evidence-row].selected').count() > 0);
  await page.waitForTimeout(1800); await act('settings'); await page.keyboard.press('Escape');
  check('Dialog Escape returns focus', await page.locator('[data-action="settings"]').evaluate(el => el === document.activeElement));
  await act('hq'); await page.waitForFunction(() => window.__BEACON_QA__.view === 'hq');
  const geometryCount = await page.evaluate(() => window.__BEACON_QA__.world.hq.children.length);
  await page.evaluate(() => window.__BEACON_QA__.world.createBase(3)); await page.waitForTimeout(500); await shot('hq-level3-visual');
  check('Final HQ has added visible structure', await page.evaluate(count => window.__BEACON_QA__.world.hq.children.length > count, geometryCount));
  await page.setViewportSize({ width: 390, height: 844 }); await act('settings');
  await page.getByRole('link', { name: 'Return to Bright Quest' }).click();
  check('Mobile return opens Bright Quest', new URL(page.url()).pathname === '/');
  check('No uncaught runtime errors', report.errors.length === 0);
} catch (error) { report.errors.push(error.stack); console.error(error); }
finally { await browser.close(); await harness.close(); await writeFile(resolve(out, 'report.json'), JSON.stringify(report, null, 2)); }
console.log(JSON.stringify(report, null, 2));
if (report.errors.length || report.checks.some(c => !c.passed)) process.exitCode = 1;
