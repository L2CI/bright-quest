import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startBeaconQa } from './serve-beacon-qa.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.BQ_PLAYWRIGHT_MODULE || 'playwright');
const harness = await startBeaconQa({ port: 0 });
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--mute-audio'] });
const out = resolve('../outputs/qa-beacon-valley');
await mkdir(out, { recursive: true });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addCookies([harness.fixture.cookie]);
  await context.addInitScript(cap => sessionStorage.setItem('brightQuestChildCapability', cap), harness.fixture.childCapability);
  const page = await context.newPage();
  page.on('pageerror', e => console.error(e.message));
  await page.goto(`${harness.origin}/beacon-brigade/`);
  await page.waitForFunction(() => !!window.__BEACON_QA__);
  await page.evaluate(() => window.__BEACON_QA__.world.ready);
  const hidden = await page.addStyleTag({ content: '#topbar,#interface,#navigation,#world-controls,#location-pins,#toast{visibility:hidden!important}' });
  for (const id of ['bridge', 'observatory', 'greenhouse']) {
    await page.evaluate(id => {
      const w = window.__BEACON_QA__.world;
      w.syncCampaign({ projectsBuilt: ['bridge', 'observatory', 'greenhouse'], totalResolved: 25, resolvedStations: 25 });
      w.focusProject(id);
    }, id);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: resolve(`beacon-brigade/assets/project-${id}.jpg`), type: 'jpeg', quality: 87 });
  }
  for (const id of ['balanced', 'survey', 'hauler', 'rescue', 'crawler']) {
    await page.evaluate(id => {
      const w = window.__BEACON_QA__.world;
      w.syncCampaign({ projectsBuilt: [], totalResolved: 0, resolvedStations: 0 });
      w.setLoadout(id); w.view = 'project'; w.target.copy(w.tank.position); w.target.y = 1;
      w.radius = 7.8; w.elevation = 3.7; w.yaw = .65;
    }, id);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: resolve(`beacon-brigade/assets/atlas-${id}.jpg`), type: 'jpeg', quality: 87 });
  }
  await hidden.evaluate(el => el.remove());
  for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['tablet', { width: 834, height: 1194 }], ['mobile', { width: 390, height: 844 }]]) {
    await page.setViewportSize(viewport);
    for (const view of ['hq', 'map', 'campaign', 'garage']) {
      if (view === 'garage') await page.locator('[data-action="hq"]').first().click();
      await page.locator(`[data-action="${view}"]`).filter({ visible: true }).first().click();
      await page.waitForTimeout(1100);
      await page.screenshot({ path: resolve(out, `${view}-${name}.png`) });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      if (overflow) throw Error(`${view}-${name} horizontal overflow`);
    }
  }
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.locator('[data-action="map"]').first().click();
  await page.addStyleTag({ content: '#topbar,#interface,#navigation,#world-controls,#location-pins,#toast{visibility:hidden!important}' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: resolve('beacon-brigade/assets/module-preview.jpg'), type: 'jpeg', quality: 87 });
  console.log(`Captured game artwork and desktop/tablet/mobile screens in ${out}`);
} finally { await browser.close(); await harness.close(); }
