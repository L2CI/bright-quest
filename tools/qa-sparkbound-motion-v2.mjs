import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { createState, applyAction } from '../functions/_lib/sparkbound.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const output = resolve('../outputs/sparkbound-build/motion-v2');
await mkdir(output, { recursive: true });
// Compile only the owned world in memory: no writes to the shared app bundle or sound files.
const bundle = await build({ stdin: { contents: `import { SparkWorld } from './sparkbound/src/world.ts';
  window.motionWorld = new SparkWorld(document.querySelector('canvas'));
  await window.motionWorld.ready; window.motionWorld.paused = true;`, resolveDir: resolve('.') },
  bundle: true, write: false, format: 'esm', target: 'es2022', tsconfigRaw: {} });
const harness = await startSparkboundQa({ port: 0 });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true, args: ['--mute-audio'] });
const errors = [], results = [];
const cases = [];
for (const move of ['strike', 'guard', 'break', 'special']) {
  for (const intent of ['open', 'guard', 'strike', 'heavy']) {
    const before = applyAction(createState({ profileId: 'motion-qa' }), { type: 'start' });
    Object.assign(before.match, { intent, staff: true, pad: true, energy: 4 });
    const after = applyAction(before, { type: 'move', move });
    cases.push({ name: `${move}-${intent}`, before: before.match, after: after.match, event: after.match.lastEvent });
  }
}
for (const terminal of ['round_won', 'defeat']) {
  const before = applyAction(createState({ profileId: `motion-${terminal}` }), { type: 'start' });
  Object.assign(before.match, { intent: 'heavy', rivalHP: terminal === 'round_won' ? 1 : 30, playerHP: terminal === 'defeat' ? 1 : 30 });
  const after = applyAction(before, { type: 'move', move: 'strike' });
  assert.equal(after.match.phase, terminal);
  cases.push({ name: terminal, before: before.match, after: after.match, event: after.match.lastEvent });
}
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await page.route('**/__motion-world.js', route => route.fulfill({ contentType: 'text/javascript', body: bundle.outputFiles[0].text }));
  await page.route('**/sparkbound/', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><title>Muted world motion QA</title>
    <style>body{margin:0}canvas{display:block;width:100vw;height:100vh}p{position:fixed;bottom:30px;left:0;right:0;text-align:center;font:24px Arial;color:white;text-shadow:0 1px 3px black;pointer-events:none}</style>
    </head><body><canvas></canvas><p></p><script type="module" src="/__motion-world.js"></script></body></html>` }));
  await page.goto(`${harness.origin}/sparkbound/`);
  await page.waitForFunction(() => window.motionWorld?.relay.ready && window.motionWorld?.prism.ready && window.motionWorld.paused);
  await page.evaluate(() => {
    const w = window.motionWorld;
    window.motionQa = {
      begin(c, reduced = false) {
        w.stopAnimation(); w.paused = true; w.reduced = reduced; w.syncKey = ''; w.sync(c.before, 2);
        w.particleData = []; w.shake = 0; w.hitLight.intensity = 0;
        this.c = c; this.cues = []; this.hits = []; this.beats = []; this.time = 0; this.maxTilt = 0; this.phases = [];
        w.onCue = name => this.cues.push({ name, time: this.time });
        w.onBeat = text => { this.beats.push(text); document.querySelector('p').textContent = text; };
        w.onImpact = (event, part) => {
          const a = w.animation, attacker = part === 'player' ? w.relay : w.prism;
          const defender = part === 'player' ? w.prism : w.relay;
          const local = attacker.contactLocal(a.attackMotion);
          const expected = attacker.root.localToWorld(local.clone());
          this.hits.push({ part, time: this.time, nativeOffset: a.phaseTime - a.contactTime,
            eventUnchanged: JSON.stringify(event) === JSON.stringify(c.event),
            rootError: Math.abs(Math.abs(attacker.root.position.x - defender.root.position.x) - local.z - .58),
            pointError: attacker.contactPoint.distanceTo(expected),
            tilt: Math.max(Math.abs(attacker.root.rotation.z), Math.abs(defender.root.rotation.z)),
            cue: this.cues.at(-1)?.name, cueTime: this.cues.at(-1)?.time });
        };
        w.playEvent(c.event, c.after);
      },
      step(dt = 1 / 120) {
        this.time += dt; w.elapsed += dt;
        const a = w.animation;
        if (a && this.phases.at(-1)?.name !== `${a.phase}-${a.part}`) this.phases.push({ name: `${a.phase}-${a.part}`, time: this.time });
        w.animateAction(dt); w.relay.update(dt, w.elapsed); w.prism.update(dt, w.elapsed);
        if (w.animation?.isMove) w.shield.position.set(w.prism.root.position.x - .58, 2.2, w.prism.root.position.z);
        this.maxTilt = Math.max(this.maxTilt, Math.abs(w.relay.root.rotation.z), Math.abs(w.prism.root.rotation.z));
      },
      render() {
        w.fitHeroes(); w.camera.position.copy(w.cameraGoal); w.camera.lookAt(w.target); w.renderer.render(w.scene, w.camera);
        const gl = w.renderer.getContext(), width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
        const pixels = new Uint8Array(width * height * 4); gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        const colours = new Set();
        for (let y = 0; y < height; y += 20) for (let x = 0; x < width; x += 20) {
          const i = (y * width + x) * 4; colours.add(`${pixels[i] >> 3}:${pixels[i + 1] >> 3}:${pixels[i + 2] >> 3}`);
        }
        const bounds = [w.relay, w.prism].map(rig => {
          const b = rig.visualBounds(), points = [];
          for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) {
            const p = rig.root.position.clone().set(x, y, z).project(w.camera); points.push(Math.abs(p.x), Math.abs(p.y));
          }
          return Math.max(...points);
        });
        return { colours: colours.size, bounds };
      },
      report() { return { hits: this.hits, cues: this.cues, beats: this.beats, duration: this.time, phases: this.phases,
        maxTilt: this.maxTilt, finished: !w.animation, shake: w.shake, light: w.hitLight.intensity,
        homes: [w.relay.root.position.x - w.heroHome, w.prism.root.position.x - w.rivalHome] }; }
    };
  });
  for (const reduced of [false, true]) {
    for (const dt of [1 / 120, .045]) {
      for (const c of cases) {
        const r = await page.evaluate(({ c, reduced, dt }) => {
          const qa = window.motionQa; qa.begin(c, reduced);
          for (let n = 0; window.motionWorld.animation && n < 2000; n++) qa.step(dt);
          return qa.report();
        }, { c, reduced, dt });
        const label = `${c.name}, reduced=${reduced}, dt=${dt}`;
        assert.ok(r.finished, `settles: ${label}`);
        const expectedParts = c.event.move === 'guard' ? c.event.intent === 'open' ? [] : ['rival'] :
          c.event.rivalDamage > 0 ? ['player', 'rival'] : ['player'];
        assert.deepEqual(r.hits.map(h => h.part), expectedParts, `callback count/order: ${label}`);
        for (const hit of r.hits) {
          assert.ok(hit.eventUnchanged, `unmodified server event: ${label}`);
          assert.ok(hit.rootError < 1e-6 && hit.tilt < 1e-6, `calibrated contact roots: ${label}`);
          assert.ok(Math.abs(hit.nativeOffset) <= dt + 1e-6, `native callback timing: ${label}`);
          assert.ok(['impact', 'break', 'guard'].includes(hit.cue) && hit.cueTime === hit.time, `audio/HP sync: ${label}`);
          // Coarse-frame sampling overshoots the native pose; the calibrated root must never change.
          if (dt < .01) assert.ok(hit.pointError < .22, `native contact pose: ${label}, error=${hit.pointError}`);
        }
        assert.ok(r.homes.every(x => Math.abs(x) < 1e-6), `returns home: ${label}`);
        assert.ok(!r.beats.some(b => /CONTACT|WIND-UP|KINETIC/.test(b)), `plain-language beats: ${label}`);
        if (expectedParts.length) assert.ok(r.cues.some(cue => cue.name === 'servo'), `movement cue: ${label}`);
        else assert.deepEqual(r.cues, [], `no imaginary guard/open hit or movement: ${label}`);
        if (reduced) assert.ok(r.maxTilt === 0 && r.shake === 0 && r.light === 0, `reduced motion: ${label}`);
        results.push({ label, ...r });
      }
    }
  }
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport); await page.waitForTimeout(100);
    for (const name of ['strike-open', 'guard-heavy', 'break-guard', 'special-heavy']) {
      const c = cases.find(c => c.name === name);
      for (const state of ['windup', 'contact', 'retreat']) {
        const pixels = await page.evaluate(({ c, state }) => {
          const qa = window.motionQa, w = window.motionWorld; qa.begin(c);
          for (let i = 0; i < 1500 && w.animation; i++) {
            qa.step();
            if (state === 'contact' ? qa.hits.length > 0 : w.animation?.phase === state) break;
          }
          return qa.render();
        }, { c, state });
        assert.ok(pixels.colours > 30, `nonblank canvas: ${name}/${state}/${viewport.width}`);
        assert.ok(pixels.bounds.every(n => n < 1), `framed heroes: ${name}/${state}/${viewport.width}`);
        await page.screenshot({ path: resolve(output, `${viewport.width}-${name}-${state}.png`) });
      }
    }
  }
  // Exercise the real RAF loop separately from deterministic contact checks.
  const live = await page.evaluate(c => {
    const qa = window.motionQa, w = window.motionWorld; qa.begin(c); w.paused = false;
    return { frame: w.frame, x: w.relay.root.position.x };
  }, cases[0]);
  await page.waitForTimeout(450);
  assert.ok(await page.evaluate(live => window.motionWorld.frame > live.frame && window.motionWorld.relay.root.position.x !== live.x, live), 'real-time canvas moves');
  await page.waitForFunction(() => !window.motionWorld.animation, { timeout: 20000 });

  // Verify framing against the current real UI, without rebuilding its shared output file.
  const appBundle = await build({ entryPoints: [resolve('sparkbound/src/app.ts')], bundle: true, write: false,
    format: 'esm', target: 'es2022', tsconfigRaw: {} });
  const ui = await browser.newContext({ viewport: { width: 320, height: 568 }, deviceScaleFactor: 1 });
  await ui.addCookies([{ name: 'bq_session', value: harness.fixture.cookie.value, url: harness.origin }]);
  await ui.addInitScript(cap => {
    sessionStorage.setItem('brightQuestChildCapability', cap);
    localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, volume: 0, reduced: false }));
  }, harness.fixture.childCapability);
  const app = await ui.newPage();
  app.on('pageerror', e => errors.push(e.message));
  await app.route('**/sparkbound/game.js*', route => route.fulfill({ contentType: 'text/javascript', body: appBundle.outputFiles[0].text }));
  await app.goto(`${harness.origin}/sparkbound/`);
  await app.waitForFunction(() => window.__SPARK_QA__?.world?.relay.ready && document.querySelector('.welcome'));
  const framing = [];
  const measure = () => app.evaluate(() => {
    const w = window.__SPARK_QA__.world, canvas = w.canvas.getBoundingClientRect();
    const ys = [], xs = [];
    for (const rig of [w.relay, w.prism]) {
      const b = rig.visualBounds();
      for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) {
        const p = rig.root.position.clone().set(x, y, z).project(w.camera);
        xs.push((p.x + 1) * canvas.width / 2); ys.push((1 - p.y) * canvas.height / 2);
      }
    }
    return { top: Math.min(...ys), bottom: Math.max(...ys), left: Math.min(...xs), right: Math.max(...xs),
      welcomeTop: document.querySelector('.welcome')?.getBoundingClientRect().top,
      topbarBottom: document.querySelector('#topbar').getBoundingClientRect().bottom,
      camera: w.cameraGoal.toArray(), target: w.target.toArray(), homes: [w.heroHome, w.rivalHome] };
  });
  for (const viewport of [{ width: 320, height: 568 }, { width: 360, height: 640 }, { width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    await app.setViewportSize(viewport); await app.waitForTimeout(1400);
    const m = await measure(); framing.push({ viewport, phase: 'welcome', ...m });
    if (viewport.height <= 650) {
      assert.ok(m.top >= m.topbarBottom + 8, `welcome below topbar: ${viewport.width}`);
      assert.ok(m.bottom <= Math.min(viewport.height / 2 + 1, viewport.height - 230, m.welcomeTop - 4), `welcome clears mission copy: ${viewport.width}, ${JSON.stringify(m)}`);
    }
    assert.ok(m.left > 0 && m.right < viewport.width && m.top > 0 && m.bottom < viewport.height, 'welcome rigs fully framed');
    await app.screenshot({ path: resolve(output, `${viewport.width}x${viewport.height}-welcome-ui.png`) });
  }
  await app.setViewportSize({ width: 320, height: 568 });
  await app.locator('[data-action="start"]').click();
  await app.waitForFunction(() => window.__SPARK_QA__.world.phase === 'battle');
  await app.waitForTimeout(1600);
  const battle = await measure(); framing.push({ viewport: { width: 320, height: 568 }, phase: 'battle', ...battle });
  assert.deepEqual(battle.target, [0, 1.8, 0], 'battle target unchanged');
  assert.deepEqual(battle.homes, [-2.25, 2.25], 'battle roots unchanged');
  assert.ok(battle.top > 175, 'battle heroes below short-phone HUD');
  await app.screenshot({ path: resolve(output, '320x568-battle-ui.png') });
  await ui.close();
  assert.deepEqual(errors, [], 'no browser/asset errors');
  await writeFile(resolve(output, 'report.json'), JSON.stringify({ results, framing, errors }, null, 2));
  console.log(JSON.stringify({ scenarios: results.length, screenshots: 29, framing, errors, output }, null, 2));
} finally {
  await browser.close(); await harness.close();
}
