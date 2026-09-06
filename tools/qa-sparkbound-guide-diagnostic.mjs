import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const { chromium } = createRequire(import.meta.url)('playwright');
const output = resolve(root, '../outputs/sparkbound-build/guide-tablet-diagnostic');
await mkdir(output, { recursive: true });
// Pin both assets in memory so concurrent product edits cannot mix this diagnostic.
const assets = {};
for (const file of ['game.js', 'sparkbound.css']) assets[file] = await readFile(resolve(root, 'sparkbound', file));
const hashes = Object.fromEntries(Object.entries(assets).map(([name, bytes]) => [name, createHash('sha256').update(bytes).digest('hex')]));
const harness = await startSparkboundQa({ port: 0 }), f = harness.fixture;
let browser;
const report = { hashes, scenarios: [], errors: [] };
try {
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
  for (const mode of ['guide-entry', 'normal-battle', 'existing-guide']) {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
    await context.addCookies([{ name: 'bq_session', value: f.cookie.value, url: harness.origin }]);
    await context.addInitScript(({ cap, id, seen }) => {
      sessionStorage.setItem('brightQuestChildCapability', cap);
      if (seen) localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true');
    }, { cap: f.childCapability, id: f.childId, seen: mode === 'normal-battle' });
    for (const [file, body] of Object.entries(assets)) await context.route(`**/sparkbound/${file}*`, route => route.fulfill({ body,
      contentType: file.endsWith('.css') ? 'text/css' : 'text/javascript' }));
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    await page.goto(`${harness.origin}/sparkbound/`);
    await page.waitForFunction(() => window.__SPARK_QA__ && document.querySelector('#game').getAttribute('aria-busy') === 'false');
    await page.evaluate(() => {
      const w = window.__SPARK_QA__.world;
      const vec = v => v && { x: v.x, y: v.y, z: v.z };
      const box = b => ({ min: vec(b.min), max: vec(b.max) });
      const rect = el => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height }; };
      window.tabletSnapshot = () => {
        const canvas = document.querySelector('#scene').getBoundingClientRect();
        const actors = ['relay', 'prism'].map(name => {
          const b = w[name].visualBounds(), points = [];
          for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) {
            const p = b.min.clone().set(x, y, z).project(w.camera);
            points.push({ x: (p.x + 1) * canvas.width / 2, y: (1 - p.y) * canvas.height / 2 });
          }
          return { name, worldBounds: box(b), screen: { left: Math.min(...points.map(p => p.x)), right: Math.max(...points.map(p => p.x)),
            top: Math.min(...points.map(p => p.y)), bottom: Math.max(...points.map(p => p.y)) } };
        });
        return { time: performance.now(), frame: w.frame, phase: w.phase, guide: window.__SPARK_QA__.guide?.step,
          reservation: structuredClone(w.battleReservation), fitKey: w.battleFitKey, bandKey: w.battleBandKey,
          camera: vec(w.camera.position), cameraGoal: vec(w.cameraGoal), target: vec(w.target), look: vec(w.look),
          distance: w.cameraGoal.distanceTo(w.target), envelope: box(w.battleEnvelope), actors,
          overlays: [...document.querySelectorAll('#topbar,.hero-hud,.round-chip,#scene-caption,.battle-console,.welcome')].map(el => ({
            label: el.id || el.className, ...rect(el), display: getComputedStyle(el).display, visibility: getComputedStyle(el).visibility,
            text: el.textContent.trim().slice(0, 100) })) };
      };
      window.bandTrace = [];
      const original = w.battleBand.bind(w);
      w.battleBand = (...args) => {
        const before = JSON.stringify(w.battleReservation), beforeSnapshot = window.tabletSnapshot();
        const result = original(...args);
        if (before !== JSON.stringify(w.battleReservation)) window.bandTrace.push({ before: beforeSnapshot, after: window.tabletSnapshot(), result, stack: new Error().stack });
        return result;
      };
    });
    const scenario = { mode, samples: [] };
    scenario.samples.push({ label: 'before-start', ...await page.evaluate(() => window.tabletSnapshot()) });
    if (mode !== 'existing-guide') await page.locator('[data-action="start"]').click();
    let elapsed = 0;
    for (const at of [0, 100, 650, 1500, 4000]) {
      if (at > elapsed) await page.waitForTimeout(at - elapsed);
      elapsed = at;
      scenario.samples.push({ label: `after-${at}ms`, ...await page.evaluate(() => window.tabletSnapshot()) });
    }
    scenario.probes = await page.evaluate(() => {
      const caption = document.querySelector('#scene-caption');
      const result = [];
      const probe = document.createElement('h2'); probe.className = 'scene-title';
      probe.style.cssText = 'position:absolute;left:0;right:0;visibility:hidden;pointer-events:none'; caption.append(probe);
      for (const text of ['Prism commits to a heavy strike', 'You hold guard. Prism holds back.']) {
        probe.textContent = text;
        result.push({ text, captionTop: caption.getBoundingClientRect().top, height: probe.getBoundingClientRect().height,
          marginBottom: getComputedStyle(probe).marginBottom, width: probe.getBoundingClientRect().width,
          fontSize: getComputedStyle(probe).fontSize, proposedTop: caption.getBoundingClientRect().top + probe.getBoundingClientRect().height + parseFloat(getComputedStyle(probe).marginBottom) + 6 });
      }
      probe.remove(); return result;
    });
    scenario.trace = await page.evaluate(() => window.bandTrace);
    const path = resolve(output, `${mode}.png`); await page.screenshot({ path }); scenario.screenshot = path;
    report.scenarios.push(scenario);
    console.log(JSON.stringify(scenario, null, 2));
    await context.close();
  }
} finally {
  await browser?.close(); await harness.close();
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`DIAGNOSTIC ${output}`);
}
