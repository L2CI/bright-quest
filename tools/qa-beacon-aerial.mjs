import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.BQ_PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BQ_QA_URL || 'http://127.0.0.1:4187';
const out = resolve('../outputs/qa-beacon-aerial');
await mkdir(out, { recursive: true });
const report = { checks: [], errors: [], screenshots: [] };
const check = (name, passed, detail = '') => {
  report.checks.push({ name, passed: Boolean(passed), detail });
  if (!passed) throw new Error(`${name}${detail ? `: ${detail}` : ''}`);
};

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--mute-audio'] });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  const ready = () => page.waitForFunction(() => window.__BEACON_QA__ && document.querySelector('#game')?.getAttribute('aria-busy') !== 'true');
  const tap = async (action) => { await page.locator(`[data-action="${action}"]`).filter({ visible: true }).first().tap(); await ready(); };
  const shot = async name => { const path = resolve(out, `${name}.png`); await page.screenshot({ path }); report.screenshots.push(path); };

  await page.goto(`${base}/beacon-brigade/?preview=1`, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.removeItem('bqBeaconPreviewV1'));
  await page.reload({ waitUntil: 'networkidle' }); await ready();
  await tap('map');
  await page.waitForTimeout(900);
  const overviewCounts = { subjects: await page.locator('.subject-pin:visible').count(), hq: await page.locator('.hq-location:visible').count(), atlas: await page.locator('.atlas-world:visible').count() };
  check('Five compact subject choices appear with HQ and Atlas', overviewCounts.subjects === 5 && overviewCounts.hq === 1 && overviewCounts.atlas === 1, JSON.stringify(overviewCounts));
  check('World starts without a command popup', await page.locator('.world-command').count() === 0);
  const worldLayout = await page.evaluate(() => {
    const markers = [...document.querySelectorAll('.subject-pin:not([hidden]),.hq-location:not([hidden])')].map(el => ({ id: el.getAttribute('data-pin'), rect: el.getBoundingClientRect().toJSON() }));
    const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 4 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 4;
    return { markers, overlaps: markers.flatMap((marker, index) => markers.slice(index + 1).filter(other => overlap(marker.rect, other.rect)).map(other => `${marker.id}/${other.id}`)) };
  });
  check('Subject choices fit mobile without overlap', worldLayout.markers.length === 6 && worldLayout.overlaps.length === 0, worldLayout.overlaps.join(', '));
  await page.locator('#location-pins [data-region="harbour"]').tap();
  check('Touching a district reveals Explore and March', await page.locator('[data-action="explore-region"]').isVisible() && await page.locator('[data-action="march-region"]').isVisible());
  await tap('explore-region'); check('Explore opens district details', await page.locator('dialog').isVisible()); await tap('close-dialog');
  await tap('march-region');
  check('Deployment uses aerial travel', await page.evaluate(() => window.__BEACON_QA__.view === 'travel' && window.__BEACON_QA__.world.radius === 42 && window.__BEACON_QA__.world.elevation === 34));
  await page.waitForFunction(() => window.__BEACON_QA__.view === 'region');
  await page.waitForFunction(() => document.querySelectorAll('[data-action="select-station"]:not([hidden])').length === 5);
  await page.waitForTimeout(900);
  await shot('mobile-quiet-overview');
  const visibleStationCount = await page.locator('[data-action="select-station"]:visible').count();
  check('Five touch destinations appear', visibleStationCount === 5, String(visibleStationCount));
  check('Overview starts without a command popup', await page.locator('.field-command').count() === 0);
  const anchorCounts = { hq: await page.locator('.hq-anchor:visible').count(), atlas: await page.locator('.atlas-anchor:visible').count() };
  check('HQ and Atlas stay marked on mobile', anchorCounts.hq === 1 && anchorCounts.atlas === 1, JSON.stringify(anchorCounts));
  const markerLayout = await page.evaluate(() => {
    const markers = [...document.querySelectorAll('.field-location-pin:not([hidden])')].map(el => ({ id: el.getAttribute('data-pin'), rect: el.getBoundingClientRect().toJSON() }));
    const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 3 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 3;
    return { markers, overlaps: markers.flatMap((marker, index) => markers.slice(index + 1).filter(other => overlap(marker.rect, other.rect)).map(other => `${marker.id}/${other.id}`)) };
  });
  check('Overview markers do not overlap', markerLayout.overlaps.length === 0, markerLayout.overlaps.join(', '));
  const first = page.locator('[data-action="select-station"]:visible').first(); await first.tap();
  check('Touch selection exposes both actions', await page.locator('[data-action="explore-station"]').isVisible() && await page.locator('[data-action="march-station"]').isVisible());
  await tap('clear-station');
  check('Closing a destination restores the quiet map', await page.locator('.field-command').count() === 0);
  await first.tap();
  await tap('explore-station'); check('Explore is a non-blocking reconnaissance popup', await page.locator('dialog').isVisible()); await tap('close-dialog');
  await tap('march-station');
  check('Challenge is absent before arrival', await page.locator('#answer-form').count() === 0);
  await page.waitForTimeout(1700); await shot('mobile-march');
  check('March keeps aerial framing and advances vehicle', await page.evaluate(() => {
    const qa = window.__BEACON_QA__; return qa.view === 'travel' && qa.world.radius === 42 && qa.world.elevation === 34 && qa.world.travel.elapsed > 1;
  }));
  await page.waitForFunction(() => window.__BEACON_QA__.view === 'station');
  check('Question opens automatically on arrival', await page.locator('#answer-form').isVisible());
  const arrival = await page.evaluate(() => window.__BEACON_QA__.world.tank.position.toArray());
  await tap('region');
  check('Back to expedition preserves vehicle location', await page.evaluate(position => JSON.stringify(window.__BEACON_QA__.world.tank.position.toArray()) === JSON.stringify(position), arrival));

  await page.locator('[data-action="select-station"]:visible').nth(1).tap(); await tap('march-station'); await page.waitForTimeout(500); await tap('cancel-travel');
  check('Cancel march returns safely to the expedition', await page.evaluate(() => window.__BEACON_QA__.view === 'region' && !window.__BEACON_QA__.world.travel));
  await page.waitForTimeout(1200);
  check('Cancelled arrival callback cannot open a question later', await page.evaluate(() => window.__BEACON_QA__.view === 'region'));
  check('No horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  check('No browser errors', report.errors.length === 0, report.errors.join(' | '));
  await shot('mobile-returned-region');
} catch (error) {
  report.errors.push(error.stack || String(error));
} finally {
  await browser.close();
  await writeFile(resolve(out, 'report.json'), JSON.stringify(report, null, 2));
}

console.log(JSON.stringify(report, null, 2));
if (report.errors.length || report.checks.some(check => !check.passed)) process.exitCode = 1;
