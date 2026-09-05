import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startBeaconQa } from './serve-beacon-qa.mjs';
import { ACTIVITY_CONTENT, ACTIVITY_SITES } from '../beacon-brigade/activities.js';
const require = createRequire(import.meta.url), { chromium } = require('playwright'), sharp = require('sharp');
const out = resolve('../outputs/qa-beacon-discovery'); await mkdir(out, { recursive: true });
const report = { checks: [], screenshots: [], errors: [], boundary: 'Muted Chromium with synthetic child and ephemeral local D1 only' };
const harness = await startBeaconQa({ port: 0 });
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, args: ['--mute-audio'] });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addCookies([harness.fixture.cookie]);
  await context.addInitScript(cap => sessionStorage.setItem('brightQuestChildCapability', cap), harness.fixture.childCapability);
  await context.route('**/*', r => new URL(r.request().url()).origin === harness.origin ? r.continue() : r.abort());
  const page = await context.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) report.errors.push(`${r.status()} ${new URL(r.url()).pathname}`); });
  const idle = () => page.waitForFunction(() => !!window.__BEACON_QA__ && document.querySelector('#game').getAttribute('aria-busy') !== 'true');
  const act = async action => { await page.locator(`[data-action="${action}"]`).filter({ visible: true }).first().click(); await idle(); };
  const check = (name, result) => { assert(result, name); report.checks.push(name); };
  const state = () => page.evaluate(() => window.__BEACON_QA__.state);
  const shot = async name => { const path = resolve(out, name + '.png'); await page.screenshot({ path }); report.screenshots.push(path); };
  await page.goto(harness.origin + '/beacon-brigade/'); await idle();
  await page.evaluate(() => window.__BEACON_QA__.world.ready);
  check('All 24 discovery return routes follow their connector back to the road network', await page.evaluate(() => {
    const s = window.__BEACON_QA__.world.scenery;
    return [...s.activitySites.keys()].every(id => {
      const source = s.activityRoadPoints(id);
      return Object.keys(s.locations).every(region => {
        const path = s.roadPath(s.activityParking(id), region, `activity-${id}`);
        return source.every(point => path.some(p => p.distanceTo(point) < .001));
      });
    });
  }));
  await act('settings'); await page.locator('#motion-setting').check(); await act('save-settings');
  for (const [size, viewport] of [['desktop', { width: 1440, height: 900 }], ['tablet', { width: 834, height: 1194 }], ['mobile', { width: 390, height: 844 }]]) {
    await page.setViewportSize(viewport); await act('hq'); await act('garage');
    check(`${size} five selectable vehicles`, await page.locator('.loadout-item').count() === 5);
    for (const id of ['balanced', 'survey', 'hauler', 'rescue', 'crawler']) {
      const before = (await state()).campaign.loadoutId;
      await page.locator(`[data-action="inspect-vehicle"][data-loadout="${id}"]`).click(); await idle(); await page.waitForTimeout(350);
      check(`${size} inspect ${id} does not spend or equip`, (await state()).campaign.loadoutId === before);
      check(`${size} ${id} body is actually rendered`, await page.evaluate(id => window.__BEACON_QA__.world.fleet.activeId === id, id));
      const pixels = await sharp(await page.locator('#scene').screenshot()).stats();
      check(`${size} ${id} canvas pixels nonblank`, pixels.channels.slice(0, 3).every(c => c.stdev > 12));
      await shot(`vehicle-${id}-${size}`);
      if (before !== id) await act('equip-loadout');
      await act('garage');
      check(`${size} ${id} equipped`, (await state()).campaign.loadoutId === id);
    }
    await page.reload(); await idle(); check(`${size} equipped crawler survives reload`, (await state()).campaign.loadoutId === 'crawler');
    await act('map'); await page.waitForTimeout(300); await shot(`activities-map-${size}`);
    check(`${size} all activity targets in viewport`, await page.evaluate(() => [...document.querySelectorAll('.activity-pin')].every(el => {
      const r = el.getBoundingClientRect(); return !el.hidden && r.left >= 0 && r.right <= innerWidth && r.top >= 76 && r.bottom < innerHeight - 85;
    })));
    for (const site of ACTIVITY_SITES) {
      const version = (await state()).version;
      await page.locator(`[data-activity="${site.id}"]`).click(); await act('visit-activity');
      await page.locator('#game[data-view="activity"]').waitFor();
      const item = ACTIVITY_CONTENT[site.id][0];
      if (await page.locator('[data-action="activity-answer"]:enabled').count()) {
        await page.locator(`[data-action="activity-answer"][data-option="${item.options.find(o => o.id !== item.correctOption).id}"]`).click();
        check(`${size} ${site.id} wrong answer is retryable`, await page.locator('.activity-retry').isVisible());
        await page.locator(`[data-action="activity-answer"][data-option="${item.correctOption}"]`).click();
      } else if (await page.locator('[data-action="reveal-activity"]').count()) await act('reveal-activity');
      check(`${size} ${site.id} reveals answer`, await page.locator('.discovery-answer').isVisible());
      check(`${size} ${site.id} does not change assessment wallet or version`, (await state()).version === version);
      check(`${size} ${site.id} no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await shot(`${site.id}-${size}`);
      await page.reload(); await idle();
      check(`${size} ${site.id} reveal survives reload`, await page.locator('.discovery-answer').isVisible());
      await act('next-activity'); check(`${size} next activity is different`, (await page.locator('.activity-panel h2').innerText()) !== item.prompt);
      await act('map');
      // Start each viewport on its first content item without changing saved discoveries.
      await page.evaluate(id => { const key = `bqBeaconDiscovery:${window.__BEACON_QA__.state.profileId}`; const record = JSON.parse(localStorage.getItem(key)); record[id].index = 0; localStorage.setItem(key, JSON.stringify(record)); }, site.id);
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 }); await act('map');
  await page.locator('[data-pin="harbour"]').click(); await act('march-region'); await page.locator('#game[data-view="region"]').waitFor();
  const active = JSON.stringify((await state()).activeExpedition);
  await act('map'); await page.locator('[data-activity="riddles"]').click(); await act('visit-activity'); await page.locator('#game[data-view="activity"]').waitFor();
  await act('resume'); await page.locator('#game[data-view="region"]').waitFor();
  check('Discovery detour and resume preserve every active mission', JSON.stringify((await state()).activeExpedition) === active);
  await act('hq'); await page.locator('#game[data-view="hq"]').waitFor(); await act('garage');
  check('Active expedition blocks changing all five vehicles', await page.locator('[data-action="equip-loadout"]:enabled').count() === 0);
  await act('hq'); await act('reset-game'); await act('close-dialog');
  check('Cancelling reset preserves discoveries', await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem(`bqBeaconDiscovery:${window.__BEACON_QA__.state.profileId}`))).length === 4));
  await act('reset-game'); await act('reset-now');
  check('Confirmed reset clears this child discovery record', await page.evaluate(() => localStorage.getItem(`bqBeaconDiscovery:${window.__BEACON_QA__.state.profileId}`) === null));
  check('No runtime or missing-asset errors', report.errors.length === 0); report.passed = true;
} catch (e) { report.failure = e.stack; report.passed = false; process.exitCode = 1; }
finally { await browser.close(); await harness.close(); await writeFile(resolve(out, 'report.json'), JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2)); }
