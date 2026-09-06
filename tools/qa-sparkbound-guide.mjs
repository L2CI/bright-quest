import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { createState, applyAction } from '../functions/_lib/sparkbound.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const { chromium } = createRequire(import.meta.url)('playwright');
const output = resolve(root, '../outputs/sparkbound-build', process.env.BQ_GUIDE_QA_RUN || 'guide-qa');
const viewports = [
  { name: 'small-phone', width: 320, height: 568 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'landscape', width: 844, height: 390 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 1000 }
];
const steps = ['relay', 'prism', 'charge', 'blocked', 'opening', 'complete'];
const checks = [], failures = [], errors = [], screenshots = [], layouts = [], canvases = [], requests = [];
const check = (label, condition, detail) => {
  checks.push({ label, passed: !!condition });
  if (!condition) {
    failures.push({ label, detail });
    console.error(`FAIL ${label}: ${JSON.stringify(detail ?? '')}`);
  }
};
const assetHashes = async () => Object.fromEntries(await Promise.all(['game.js', 'sparkbound.css'].map(async name =>
  [name, createHash('sha256').update(await readFile(resolve(root, 'sparkbound', name))).digest('hex')])));
await mkdir(output, { recursive: true });
const startedAt = new Date().toISOString(), hashes = await assetHashes();
let harness, browser;

try {
  harness = await startSparkboundQa({ port: 0 });
  const f = harness.fixture, guideKey = `bqSparkGuide:launcher-v1:${f.childId}`;
  browser = await chromium.launch({
    executablePath: process.env.BQ_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true, args: ['--mute-audio']
  });
  const savedRow = () => harness.db.prepare('SELECT version,state_json,last_operation_id,updated_at FROM sparkbound_states WHERE family_id=? AND child_id=?')
    .bind(f.familyId, f.childId).first();
  const seed = async state => {
    const now = new Date().toISOString();
    // Reset receipts with the disposable fixture; result versions are unique per child.
    await harness.db.prepare('DELETE FROM sparkbound_operations WHERE family_id=? AND child_id=?').bind(f.familyId, f.childId).run();
    await harness.db.prepare('INSERT INTO sparkbound_states(family_id,child_id,version,state_json,last_operation_id,created_at,updated_at) VALUES(?,?,?,?,NULL,?,?) ON CONFLICT(family_id,child_id) DO UPDATE SET version=excluded.version,state_json=excluded.state_json,last_operation_id=NULL,updated_at=excluded.updated_at')
      .bind(f.familyId, f.childId, state.version, JSON.stringify(state), now, now).run();
  };

  async function session(name, viewport, { existing = false, reduced = false, pending = false } = {}, run) {
    let initial = createState({ profileId: f.childId });
    if (existing) {
      initial = applyAction(initial, { type: 'start' });
      initial = applyAction(initial, { type: 'move', move: 'strike' });
    }
    await seed(initial);
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await context.addCookies([{ name: 'bq_session', value: f.cookie.value, url: harness.origin }]);
    // Leave settings and the guide flag absent: these cases test the real defaults.
    await context.addInitScript(cap => sessionStorage.setItem('brightQuestChildCapability', cap), f.childCapability);
    if (pending) await context.addInitScript(({ id, version }) => localStorage.setItem(`bqSparkPending:${id}`,
      JSON.stringify({ operationId: crypto.randomUUID(), version, action: { type: 'move', move: 'strike' } })),
    { id: f.childId, version: initial.version });
    const page = await context.newPage(), posts = [];
    page.setDefaultTimeout(20000);
    page.on('pageerror', e => errors.push({ name, message: e.message }));
    page.on('console', e => { if (e.type() === 'error') errors.push({ name, message: e.text() }); });
    page.on('response', r => { if (r.status() >= 400) errors.push({ name, message: `${r.status()} ${r.url()}` }); });
    page.on('requestfailed', r => errors.push({ name, message: `${r.failure()?.errorText} ${r.url()}` }));
    page.on('request', r => {
      if (r.method() === 'POST' && new URL(r.url()).pathname.startsWith('/api/')) {
        const entry = { name, url: r.url(), body: r.postDataJSON() };
        posts.push(entry); requests.push(entry);
      }
    });
    const settled = () => page.waitForFunction(() => window.__SPARK_QA__ && !window.__SPARK_QA__.acting &&
      document.querySelector('#game')?.getAttribute('aria-busy') === 'false', null, { timeout: 30000 });
    const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
    const state = () => page.evaluate(() => window.__SPARK_QA__.state);
    const step = () => page.evaluate(() => window.__SPARK_QA__.guide?.step ?? null);
    const shot = async label => {
      const path = resolve(output, `${name}-${label}.png`);
      await page.screenshot({ path }); screenshots.push(path); console.log(`SCREENSHOT ${path}`);
    };
    const baseline = async () => ({ row: await savedRow(), state: await state(), posts: posts.length });
    const unchanged = async (label, before) => {
      check(`${name}: ${label} sends no API POST`, posts.length === before.posts, posts.slice(before.posts));
      check(`${name}: ${label} preserves saved match and server version`,
        JSON.stringify(await savedRow()) === JSON.stringify(before.row), { before: before.row, after: await savedRow() });
      check(`${name}: ${label} preserves client state`, JSON.stringify(await state()) === JSON.stringify(before.state));
    };
    const expectStep = async expected => {
      assert.equal(await step(), expected, `${name}: expected guide ${expected}`);
      check(`${name}: ${expected} displays correct step counter`,
        (await page.locator('.guide-heading .eyebrow').innerText()).includes(`${steps.indexOf(expected) + 1} OF 6`));
      check(`${name}: ${expected} hides real move controls`, await page.locator('[data-move]').count() === 0);
    };
    const visual = async label => {
      await page.waitForTimeout(650);
      await shot(label);
      const geometry = await page.evaluate(() => {
        const rect = el => el.getBoundingClientRect();
        const visible = el => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && rect(el).width > 0 && rect(el).height > 0;
        const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
        const inside = (a, b) => a.left >= b.left - 2 && a.right <= b.right + 2 && a.top >= b.top - 2 && a.bottom <= b.bottom + 2;
        const viewport = { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
        const scope = document.querySelector('dialog[open]') || document.querySelector('#game');
        const label = el => el.dataset.action || el.id || el.className || el.tagName;
        const issues = [], controls = [...scope.querySelectorAll('button,a,input')].filter(visible), text = [];
        for (const control of controls) if (!inside(rect(control), viewport)) issues.push(`Control outside viewport: ${label(control)}`);
        for (let i = 0; i < controls.length; i++) for (let j = i + 1; j < controls.length; j++) {
          if (overlap(rect(controls[i]), rect(controls[j]))) issues.push(`Controls overlap: ${label(controls[i])} / ${label(controls[j])}`);
        }
        const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode, parent = node.parentElement;
          if (!node.textContent.trim() || !visible(parent) || parent.closest('svg,style,script,#loading')) continue;
          const range = document.createRange(); range.selectNodeContents(node);
          for (const r of range.getClientRects()) {
            if (!r.width || !r.height) continue;
            const content = node.textContent.trim(); text.push({ r, content });
            if (!inside(r, viewport)) issues.push(`Text outside viewport: ${content}`);
            const control = parent.closest('button,a');
            if (control && !inside(r, rect(control))) issues.push(`Text outside control: ${content}`);
            for (const other of controls) if (!other.contains(parent) && overlap(r, rect(other))) issues.push(`Text covers control: ${content} / ${label(other)}`);
          }
        }
        for (let i = 0; i < text.length; i++) for (let j = i + 1; j < text.length; j++) {
          if (overlap(text[i].r, text[j].r)) issues.push(`Text overlap: ${text[i].content} / ${text[j].content}`);
        }
        const w = window.__SPARK_QA__.world, canvas = rect(document.querySelector('#scene'));
        const overlays = [...document.querySelectorAll('#topbar,.hero-hud,.round-chip,.guide-console,.guide-signal')].filter(visible);
        const actors = ['relay', 'prism'].map(name => {
          const bounds = w[name].visualBounds(), points = [];
          for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
            const p = bounds.min.clone().set(x, y, z).project(w.camera);
            points.push({ x: canvas.left + (p.x + 1) * canvas.width / 2, y: canvas.top + (1 - p.y) * canvas.height / 2, z: p.z });
          }
          const b = { left: Math.min(...points.map(p => p.x)), right: Math.max(...points.map(p => p.x)),
            top: Math.min(...points.map(p => p.y)), bottom: Math.max(...points.map(p => p.y)) };
          return { name, ...b, clipped: !inside(b, viewport) || points.some(p => !Number.isFinite(p.x + p.y + p.z) || Math.abs(p.z) > 1),
            collisions: overlays.filter(el => overlap(b, rect(el))).map(label) };
        });
        return { width: innerWidth, height: innerHeight, issues: [...new Set(issues)], actors,
          overflow: document.documentElement.scrollWidth > innerWidth };
      });
      layouts.push({ name: `${name}-${label}`, ...geometry });
      check(`${name}-${label}: no text/button overlap or clipping`, !geometry.issues.length && !geometry.overflow, geometry.issues);
      if (!await page.locator('dialog[open]').count()) check(`${name}-${label}: both actors fit clear of UI`,
        geometry.actors.every(a => !a.clipped && !a.collisions.length && a.right - a.left > 20 && a.bottom - a.top > 20), geometry.actors);
      if (((geometry.width === 1024 && geometry.height === 768) ||
        (geometry.width === 1440 && geometry.height === 1000)) && steps.includes(label)) {
        const heights = geometry.actors.map(a => ({ name: a.name, height: a.bottom - a.top }));
        check(`${name}-${label}: both tablet/desktop heroes are at least 130px tall`, heights.length === 2 &&
          heights.every(a => a.height >= 130), heights);
      }
      const sample = () => page.evaluate(() => {
        const w = window.__SPARK_QA__.world; w.renderer.render(w.scene, w.camera);
        const gl = w.renderer.getContext(), bytes = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
        gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
        const colours = new Set(); let hash = 2166136261;
        for (let i = 0; i < bytes.length; i += 64) {
          colours.add(`${bytes[i]},${bytes[i + 1]},${bytes[i + 2]}`);
          hash = Math.imul(hash ^ (bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16), 16777619) >>> 0;
        }
        return { hash, colours: colours.size, frame: w.frame, ready: w.relay.ready && w.prism.ready, paused: w.paused, reduced: w.reduced };
      });
      const before = await sample(); await page.waitForTimeout(400); const after = await sample();
      canvases.push({ name: `${name}-${label}`, before, after });
      check(`${name}-${label}: models ready and canvas nonblank`, before.ready && after.ready && after.colours > 100, after);
      if (!after.paused && !after.reduced) check(`${name}-${label}: canvas renders moving pixels`, after.frame > before.frame && after.hash !== before.hash, { before, after });
    };
    const exchange = async (action, next, before) => {
      await page.locator(`[data-action="${action}"]`).click();
      await page.waitForFunction(() => window.__SPARK_QA__.acting, null, { timeout: 5000 });
      check(`${name}: ${action} locks guide controls while acting`,
        await page.locator('.guide-console button').evaluateAll(nodes => nodes.every(n => n.disabled)));
      await unchanged(`${action} while acting`, before);
      if (existing && action === 'guide-guard') {
        await page.locator('[data-action="settings"]').click();
        await page.locator('[data-action="mission"]').click();
        check(`${name}: acting prevents practice replay`, await page.locator('[data-action="practice"]').isDisabled() &&
          await page.evaluate(() => window.__SPARK_QA__.acting && window.__SPARK_QA__.world.paused));
        await page.keyboard.press('Escape');
      }
      await settled(); await expectStep(next);
    };
    const chargeHold = async () => {
      const began = Date.now(), samples = [];
      for (let i = 0; i < 5; i++) {
        await page.waitForTimeout(500);
        samples.push(await page.evaluate(() => ({ step: window.__SPARK_QA__.guide?.step,
          acting: window.__SPARK_QA__.acting, preview: window.__SPARK_QA__.world.previewStep,
          motion: window.__SPARK_QA__.world.prism.motion, charge: window.__SPARK_QA__.world.prism.root.userData.charge })));
      }
      check(`${name}: charge tell holds beyond two seconds without advancing`, Date.now() - began > 2000 &&
        samples.every(s => s.step === 'charge' && !s.acting && s.preview === 'charge' && s.motion === 'charge'), samples);
      check(`${name}: held charge has a visible charge signal`, samples.some(s => s.charge > .6), samples);
    };
    const fullGuide = async (before, capture = true) => {
      for (const expected of steps) {
        await expectStep(expected); await unchanged(expected, before);
        if (capture) await visual(expected);
        if (expected === 'charge') { await chargeHold(); await exchange('guide-guard', 'blocked', before); }
        else if (expected === 'opening') await exchange('guide-attack', 'complete', before);
        else if (expected !== 'complete') await click('guide-next');
      }
      const demo = await page.evaluate(() => window.__SPARK_QA__.guide.match);
      check(`${name}: demo block and opening produce expected shields and energy`, demo.playerHP === 22 && demo.rivalHP === 12 && demo.energy === 4, demo);
      check(`${name}: flag absent until guide finishes`, await page.evaluate(key => localStorage.getItem(key) === null, guideKey));
      await unchanged('complete before finish', before);
      await click('guide-finish');
      check(`${name}: finish clears guide and persists profile-scoped flag`, await step() === null &&
        await page.evaluate(key => localStorage.getItem(key) === 'true', guideKey));
      if (before.state.match) await unchanged('finish existing match', before);
      else {
        const after = await state(), row = await savedRow();
        check(`${name}: only finish starts one actual match`, posts.length === before.posts + 1 &&
          posts.at(-1)?.body?.action?.type === 'start' && after.match?.phase === 'battle' &&
          after.version === before.state.version + 1 && row.version === before.row.version + 1, { posts, version: after.version });
      }
      const finished = await baseline();
      await page.reload(); await settled();
      check(`${name}: completed guide stays dismissed after reload`, await step() === null);
      await unchanged('reload after finish', finished);
    };
    try {
      await page.goto(`${harness.origin}/sparkbound/`); await settled();
      assert.ok(await page.evaluate(() => 'guide' in window.__SPARK_QA__), 'Current built game lacks guide hook; ask main to build, do not build from QA');
      check(`${name}: sound is off by default without injected settings`, await page.getByRole('button', { name: 'Enable sound', exact: true }).isVisible());
      check(`${name}: default reduced motion follows browser preference`, await page.evaluate(value =>
        window.__SPARK_QA__.world.reduced === value && document.querySelector('#game').dataset.reduced === String(value), reduced));
      const before = await baseline();
      check(`${name}: initial boot sends no API POST`, posts.length === 0);
      await run({ page, posts, state, step, settled, click, baseline, unchanged, before, expectStep, visual, shot, fullGuide });
      check(`${name}: audio never unlocks during practice`, await page.evaluate(() =>
        !window.__SPARK_QA__.audio.enabled && !window.__SPARK_QA__.audio.context));
    } catch (error) {
      failures.push({ label: `${name}: blocking assertion`, detail: error.stack });
      console.error(`${name}: ${error.stack}`);
      await shot('failure').catch(() => {});
    } finally { await context.close(); }
  }

  for (const viewport of viewports) await session(`new-${viewport.name}`, viewport, {}, async q => {
    check(`new-${viewport.name}: welcome waits for Start`, await q.step() === null && (await q.state()).match === null);
    await q.click('start'); await q.expectStep('relay'); await q.unchanged('Start intercept', q.before);
    await q.fullGuide(q.before);
  });

  for (const reduced of [false, true]) await session(reduced ? 'existing-reduced' : 'existing', viewports[1], { existing: true, reduced }, async q => {
    await q.expectStep('relay'); await q.unchanged('automatic guidance on saved battle', q.before);
    await q.click('pause');
    check('Pause opens and freezes guide world', await q.page.locator('dialog[open]').isVisible() &&
      await q.page.evaluate(() => window.__SPARK_QA__.world.paused));
    const frame = await q.page.evaluate(() => window.__SPARK_QA__.world.frame);
    await q.page.waitForTimeout(500);
    check('Paused guide frame does not advance', await q.page.evaluate(n => window.__SPARK_QA__.world.frame === n, frame));
    check('Review cannot escape practice while paused', await q.page.locator('[data-action="review-dialog"]').isDisabled());
    await q.visual('paused'); await q.page.keyboard.press('Escape'); await q.settled();
    check('Escape closes pause and resumes guide', !await q.page.locator('dialog').isVisible() &&
      !await q.page.evaluate(() => window.__SPARK_QA__.world.paused) && await q.step() === 'relay');
    await q.click('settings');
    check('Settings sound unchecked', !await q.page.locator('#sound-setting').isChecked());
    check('Settings reduced motion matches browser', await q.page.locator('#motion-setting').isChecked() === reduced);
    check('Restart disabled during guide', await q.page.locator('[data-action="restart"]').isDisabled());
    await q.page.keyboard.press('Escape'); await q.settled(); await q.unchanged('pause and settings', q.before);
    await q.fullGuide(q.before);

    // Establish real same-document history using the supported review/arena controls.
    await q.click('pause'); await q.click('review-dialog'); await q.click('arena');
    const replayBefore = await q.baseline();
    await q.click('settings'); await q.click('mission'); await q.click('practice'); await q.expectStep('relay');
    await q.unchanged('Settings > Guardian mission > practice', replayBefore);
    await q.click('pause'); await q.page.goBack(); await q.settled();
    check('Browser Back closes dialog but retains active practice', !await q.page.locator('dialog').isVisible() &&
      await q.step() === 'relay' && await q.page.locator('.review-panel').count() === 0);
    await q.unchanged('browser Back during practice', replayBefore);
    await q.click('guide-skip');
    check('Replay skip returns to actual saved battle', await q.step() === null && await q.page.locator('[data-move]').count() > 0);
    await q.unchanged('replay skip', replayBefore);
  });

  await session('new-skip', viewports[0], {}, async q => {
    await q.click('start'); await q.expectStep('relay'); await q.unchanged('before skip', q.before);
    await q.click('guide-skip');
    check('New-user skip starts exactly one real match', await q.step() === null && q.posts.length === 1 &&
      q.posts[0].body.action.type === 'start' && (await q.state()).version === q.before.state.version + 1);
    check('Skip persists profile-scoped flag', await q.page.evaluate(key => localStorage.getItem(key) === 'true', guideKey));
    const after = await q.baseline(); await q.page.reload(); await q.settled();
    check('Skipped guide stays dismissed', await q.step() === null); await q.unchanged('reload after skip', after);
  });
  await session('pending-save', viewports[1], { existing: true, pending: true }, async q => {
    check('Pending save suppresses automatic guide', await q.step() === null && await q.page.locator('[data-action="reconnect"]').isVisible());
    await q.click('settings'); await q.click('mission');
    check('Pending save disables practice replay', await q.page.locator('[data-action="practice"]').isDisabled());
    await q.page.keyboard.press('Escape'); await q.settled();
    check('Pending save remains queued after closing mission', await q.page.evaluate(id => localStorage.getItem(`bqSparkPending:${id}`) !== null, f.childId));
    await q.unchanged('pending save and blocked replay', q.before);
  });
  check('No browser, runtime or network errors', errors.length === 0, errors);
} catch (error) {
  failures.push({ label: 'Harness failure', detail: error.stack }); console.error(error);
} finally {
  await browser?.close(); await harness?.close();
  const endingHashes = await assetHashes();
  check('Built game and CSS unchanged during QA', JSON.stringify(hashes) === JSON.stringify(endingHashes), { hashes, endingHashes });
  const report = { startedAt, finishedAt: new Date().toISOString(), boundary: 'Existing built assets only; muted Playwright; isolated ephemeral local D1. No builds, live requests or production writes.',
    hashes, endingHashes, checks, failures, errors, requests, screenshots, layouts, canvases, output };
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: checks.filter(c => c.passed).length, failed: failures.length, screenshots: screenshots.length, output }, null, 2));
  if (failures.length) process.exitCode = 1;
}
