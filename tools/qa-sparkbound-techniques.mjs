import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';
import { createState, applyAction } from '../functions/_lib/sparkbound.js';
import { duelCue } from '../sparkbound/src/duel.js';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';

// World-only synthetic QA. No shared bundle writes, production calls or model-quality verdict.
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(repo, '../outputs/sparkbound-build/techniques');
const require = createRequire(import.meta.url);
function dependency(name) {
  try { return require(name); }
  catch { return require(resolve(process.env.BQ_NODE_MODULES || resolve(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), name)); }
}

export function fixtures() {
  let state = applyAction(createState({ profileId: 'synthetic-techniques' }), { type: 'start', heroId: 'relay' });
  assert.equal(state.match.rulesVersion, 4);
  const stages = new Map(), cases = [];
  for (let step = 0; step < 400 && state.match.phase !== 'victory'; step++) {
    const m = state.match;
    assert.notEqual(m.phase, 'defeat');
    if (m.phase === 'battle' && m.exchange === 0) stages.set(m.upgradeStage, structuredClone(state));
    const q = m.questions[m.questionIndex];
    state = applyAction(state, m.phase === 'battle' ? { type: 'move', move: duelCue(m).suggested } :
      m.phase === 'training' ? { type: 'answer', questionId: q.id, answer: q.answer } : { type: 'continue' });
  }
  assert.equal(state.match.phase, 'victory');
  function add(stage, move, intent, patch = {}, suffix = '') {
    const before = structuredClone(stages.get(stage));
    Object.assign(before.match, { intent, energy: 4 }, patch);
    const after = applyAction(before, { type: 'move', move });
    cases.push({ name: `v${before.match.rulesVersion}-s${stage}-${move}-${intent}${suffix}`, stage,
      before: before.match, after: after.match, event: after.match.lastEvent });
  }
  for (const stage of [3, 4, 5]) for (const move of ['break', 'special']) for (const intent of ['open', 'guard', 'heavy']) add(stage, move, intent);
  for (const intent of ['open', 'guard', 'strike', 'heavy']) add(5, 'guard', intent);
  add(3, 'special', 'open', { rivalHP: 1 }, '-clipped');
  add(5, 'guard', 'heavy', { rivalHP: 1 }, '-clipped');
  add(5, 'guard', 'heavy', { rivalHP: 1, playerHP: 1 }, '-simultaneous-defeat');
  for (const stage of [3, 4, 5]) add(stage, 'special', 'open', { rulesVersion: 3 });
  return cases;
}

function browserHarness(SparkWorld, THREE) {
  const w = new SparkWorld(document.querySelector('canvas'));
  window.techniqueWorld = w;
  window.techniqueQa = {
    begin(c, reduced, dt) {
      w.stopAnimation(); w.paused = true; w.reduced = reduced; w.syncKey = ''; w.sync(c.before, 1);
      w.particleData = []; w.shake = 0; w.hitLight.intensity = 0;
      // Let newly equipped assemblies finish their reveal before measuring weapon sockets.
      for (let i = 0; i < 120; i++) { w.relay.update(1 / 60); w.prism.update(1 / 60); }
      this.c = c; this.original = JSON.stringify(c); this.dt = dt; this.time = 0;
      this.hits = []; this.launches = []; this.flights = []; this.beats = []; this.cues = [];
      this.hp = { player: c.before.playerHP, rival: c.before.rivalHP };
      w.onCue = name => this.cues.push(name);
      w.onBeat = text => { this.beats.push(text); document.querySelector('p').textContent = text; };
      w.onImpact = (event, part) => {
        const a = w.animation;
        this.hits.push({ part, time: this.time, effect: a.effect, damage: part === 'player' ? event.damage : event.rivalDamage,
          eventUnchanged: JSON.stringify(event) === JSON.stringify(c.event), arrivalError: w.bolt.position.distanceTo(a.target) });
        if (part === 'player') this.hp.rival -= event.damage;
        else this.hp.player += (event.healing || 0) - event.rivalDamage;
      };
      w.playEvent(c.event, c.after);
    },
    snapshot() {
      const a = w.animation, attacker = a.part === 'player' ? w.relay : w.prism;
      w.scene.updateMatrixWorld(true);
      const groups = [w.bolt, ...w.salvo].filter(g => g.visible);
      const visibleMeshCount = group => {
        let count = 0;
        group.traverseVisible(o => {
          const materials = Array.isArray(o.material) ? o.material : [o.material];
          if ((o.isMesh || o.isSprite || o.isLine) && materials.some(m => m?.visible !== false && m && (!m.transparent || m.opacity > .01))) count++;
        });
        return count;
      };
      const direction = a.target.clone().sub(a.origin).normalize();
      const beam = w.effects.get('laser').children[0];
      const beamDirection = new THREE.Vector3(0, 1, 0).applyQuaternion(beam.getWorldQuaternion(new THREE.Quaternion()));
      return { part: a.part, t: a.phaseTime / a.flightDuration, effect: a.effect,
        expectedShots: a.shotCount, count: groups.length,
        groups: groups.map(g => ({ name: g.name, meshes: visibleMeshCount(g) + (g === w.bolt && w.generatedJet?.visible ? visibleMeshCount(w.generatedJet) : 0), originError: g.position.distanceTo(a.origin), position: g.position.toArray() })),
        muzzleError: a.origin.distanceTo(attacker.weaponTip),
        aimDot: w.bolt.getWorldDirection(new THREE.Vector3()).dot(direction),
        weaponAimDot: attacker.staff.getWorldDirection(new THREE.Vector3()).dot(direction),
        beamDot: Math.abs(beamDirection.dot(direction)), beamLength: beam.scale.y * w.bolt.scale.z,
        travelLength: a.origin.distanceTo(w.bolt.position),
        origin: a.origin.toArray(), target: a.target.toArray(), hitsBefore: this.hits.length };
    },
    step() {
      const before = w.animation?.phase;
      this.time += this.dt; w.elapsed += this.dt;
      w.animateAction(this.dt); w.relay.update(this.dt, w.elapsed); w.prism.update(this.dt, w.elapsed); w.updateImpact(this.dt);
      if (w.animation?.phase === 'flight') {
        if (before !== 'flight') this.launches.push(this.snapshot());
        else if (w.animation.phaseTime / w.animation.flightDuration >= .45 && !this.flights.some(f => f.part === w.animation.part)) this.flights.push(this.snapshot());
      }
    },
    until(part, progress) {
      for (let i = 0; i < 3600 && w.animation; i++) {
        this.step();
        if (w.animation?.phase === 'flight' && w.animation.part === part && w.animation.phaseTime / w.animation.flightDuration >= progress) return true;
      }
      return false;
    },
    finish() {
      for (let i = 0; i < 3600 && w.animation; i++) this.step();
      return { name: this.c.name, reduced: w.reduced, dt: this.dt, finished: !w.animation,
        hits: this.hits, launches: this.launches, flights: this.flights, hp: this.hp,
        inputsUnchanged: JSON.stringify(this.c) === this.original,
        hiddenAtEnd: !w.bolt.visible && w.salvo.every(g => !g.visible), errors: [...w.errors],
        beats: this.beats, cues: this.cues, duration: this.time };
    },
    render() {
      w.fitHeroes(); w.camera.position.copy(w.cameraGoal); w.camera.lookAt(w.target); w.camera.updateMatrixWorld();
      w.renderer.render(w.scene, w.camera);
      const gl = w.renderer.getContext(), width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
      const read = () => { const pixels = new Uint8Array(width * height * 4); gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels); return pixels; };
      const baseline = read(), colours = new Set();
      for (let i = 0; i < baseline.length; i += 64) colours.add(`${baseline[i] >> 3}:${baseline[i + 1] >> 3}:${baseline[i + 2] >> 3}`);
      // Remove each projectile separately and compare actual pixels, not only visible flags.
      const projectiles = [w.bolt, ...w.salvo].filter(g => g.visible).map(group => {
        const projected = group.position.clone().project(w.camera);
        group.visible = false; w.renderer.render(w.scene, w.camera); const without = read(); group.visible = true;
        let changed = 0;
        for (let i = 0; i < baseline.length; i += 4) if (Math.abs(baseline[i] - without[i]) + Math.abs(baseline[i + 1] - without[i + 1]) + Math.abs(baseline[i + 2] - without[i + 2]) > 12) changed++;
        return { name: group.name, changed, projected: projected.toArray() };
      });
      w.renderer.render(w.scene, w.camera);
      return { colours: colours.size, projectiles, snapshot: this.snapshot() };
    }
  };
  w.ready.then(() => { w.paused = true; cancelAnimationFrame(w.raf); window.techniqueReady = true; })
    .catch(error => { window.techniqueBootError = error.stack; });
}

function inspect(result, fixture, check) {
  const label = `${fixture.name}/reduced=${result.reduced}/dt=${result.dt}`;
  const event = fixture.event;
  const parts = event.move === 'guard' ? event.intent === 'open' ? [] : event.damage > 0 ? ['rival', 'player'] : ['rival'] :
    event.rivalDamage > 0 ? ['player', 'rival'] : ['player'];
  check(`${label}: one aggregate impact per part in order`, JSON.stringify(result.hits.map(h => h.part)) === JSON.stringify(parts));
  check(`${label}: actual final HP without duplicate damage`, result.hp.player === fixture.after.playerHP && result.hp.rival === fixture.after.rivalHP);
  check(`${label}: settles and removes every projectile`, result.finished && result.hiddenAtEnd);
  check(`${label}: authoritative payloads unchanged`, result.inputsUnchanged && result.hits.every(h => h.eventUnchanged));
  check(`${label}: exact target contacts`, result.hits.every(h => h.arrivalError < .02));
  check(`${label}: one launch per expected part`, JSON.stringify(result.launches.map(l => l.part)) === JSON.stringify(parts));
  check(`${label}: no runtime errors`, result.errors.length === 0);
  for (const launch of result.launches) {
    const expectedShots = launch.part === 'player' ? event.technique?.shots.length || 1 : fixture.stage === 3 ? 3 : 1;
    check(`${label}/${launch.part}: ${expectedShots} visible shot groups with rendered geometry`, launch.count === expectedShots && launch.groups.every(g => g.meshes > 0));
    check(`${label}/${launch.part}: every shot begins at the muzzle`, launch.groups.every(g => g.originError < .08) && launch.muzzleError < .08);
    check(`${label}/${launch.part}: aimed toward target`, launch.aimDot > .999 && launch.weaponAimDot > .99);
    if (launch.part === 'player' && event.technique?.id === 'counter') check(`${label}: counter is a single return pulse`, launch.effect === 'pulse' && launch.count === 1);
    if (launch.part === 'player' && event.technique?.id === 'rail') check(`${label}: rail is a single laser`, launch.effect === 'laser' && launch.count === 1);
  }
  for (const flight of result.flights) {
    check(`${label}/${flight.part}: flight retains visible shot count`, flight.count === flight.expectedShots);
    if (flight.effect === 'laser') check(`${label}/${flight.part}: beam axis and growing length match flight`, flight.beamDot > .999 && Math.abs(flight.beamLength - flight.travelLength) < .02);
  }
}

async function main() {
  const cases = fixtures();
  if (process.argv.includes('--self-test')) {
    assert.equal(cases.length, 28);
    assert.ok(cases.filter(c => c.before.rulesVersion === 4).every(c => c.before.questions.length === 15 && c.before.questionIndex === c.stage * 3));
    assert.equal(cases.find(c => c.name === 'v4-s3-special-open').after.energy, 1);
    assert.deepEqual(cases.find(c => c.name === 'v4-s5-guard-heavy-clipped').event.technique.shots, [1]);
    assert.equal(cases.find(c => c.name === 'v4-s5-guard-heavy-simultaneous-defeat').after.phase, 'defeat');
    console.log(`${cases.length} valid saved-state fixtures passed; no browser or shared file writes.`);
    return;
  }
  await mkdir(output, { recursive: true });
  const report = { status: 'RUNNING', scope: 'World technique integration only; rendered model quality is a separate gate.',
    cases: [], checks: [], evidence: [], errors: [], sources: {} };
  const check = (name, passed) => report.checks.push({ name, passed: Boolean(passed) });
  let server, browser, page;
  try {
    for (const path of ['sparkbound/src/world.ts', 'sparkbound/src/hero.ts', 'sparkbound/src/app.ts'])
      report.sources[path] = createHash('sha256').update(await readFile(resolve(repo, path))).digest('hex');
    const { build } = dependency('esbuild');
    const bundle = await build({ absWorkingDir: repo, stdin: { contents: `import { SparkWorld } from './sparkbound/src/world.ts';
      import * as THREE from './cave-river-quest/vendor/three.module.js'; (${browserHarness.toString()})(SparkWorld, THREE);`, resolveDir: repo },
      bundle: true, write: false, format: 'esm', target: 'es2022', tsconfigRaw: {} });
    server = await startSparkboundQa({ port: 0 });
    browser = await dependency('playwright').chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
    page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) report.errors.push(`${response.status()} ${response.url()}`); });
    await page.route('**/__technique-world.js', route => route.fulfill({ contentType: 'text/javascript', body: bundle.outputFiles[0].text }));
    await page.route('**/sparkbound/', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>Technique world QA</title><style>body{margin:0}canvas{display:block;width:100vw;height:100vh}p{position:fixed;bottom:8px;left:8px;color:#fff;background:#20252c;font:14px Arial;padding:6px;pointer-events:none}</style></head><body><canvas></canvas><p></p><script type="module" src="/__technique-world.js"></script></body></html>' }));
    await page.goto(`${server.origin}/sparkbound/`);
    await page.waitForFunction(() => window.techniqueReady || window.techniqueBootError, null, { timeout: 120000 });
    const bootError = await page.evaluate(() => window.techniqueBootError);
    assert.ok(!bootError, bootError);
    for (const reduced of [false, true]) for (const dt of [1 / 120, .045]) {
      for (const fixture of cases) {
        const result = await page.evaluate(({ fixture, reduced, dt }) => { const qa = window.techniqueQa; qa.begin(fixture, reduced, dt); return qa.finish(); }, { fixture, reduced, dt });
        report.cases.push(result); inspect(result, fixture, check);
      }
      console.log(`Technique matrix: ${cases.length} cases, reduced=${reduced}, dt=${dt}`);
    }
    for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport); await page.waitForTimeout(100);
      for (const name of ['v4-s3-special-open', 'v4-s4-special-open', 'v4-s5-special-heavy', 'v4-s5-guard-heavy', 'v4-s5-guard-heavy-clipped']) {
        const fixture = cases.find(c => c.name === name);
        for (const progress of [0, .5]) {
          const frame = await page.evaluate(({ fixture, progress }) => {
            const qa = window.techniqueQa; qa.begin(fixture, false, 1 / 120);
            if (!qa.until('player', progress)) throw Error('Expected player flight was never reached');
            return qa.render();
          }, { fixture, progress });
          const label = `${viewport.width}-${name}-${progress === 0 ? 'launch' : 'flight'}`;
          check(`${label}: nonblank world`, frame.colours > 30);
          if (progress > 0) {
            check(`${label}: each projectile contributes visible pixels`, frame.projectiles.every(p => p.changed >= 2));
            check(`${label}: projectiles within camera`, frame.projectiles.every(p => p.projected.every(Number.isFinite) && Math.abs(p.projected[0]) < 1 && Math.abs(p.projected[1]) < 1 && Math.abs(p.projected[2]) <= 1));
          }
          const file = `${label}.png`;
          await page.screenshot({ path: resolve(output, file) }); report.evidence.push({ file, viewport, frame });
        }
      }
    }
    // Do not let deterministic stepping mask a broken requestAnimationFrame integration.
    await page.evaluate(fixture => { window.techniqueQa.begin(fixture, false, 1 / 120); window.techniqueWorld.paused = false;
      window.techniqueWorld.raf = requestAnimationFrame(t => window.techniqueWorld.tick(t)); }, cases[2]);
    await page.waitForFunction(() => !window.techniqueWorld.animation, null, { timeout: 30000 });
    check('Actual RAF loop completes one whole exchange', await page.evaluate(() => window.techniqueQa.hits.length === 2));
    report.status = report.errors.length || report.checks.some(c => !c.passed) ? 'FAIL' : 'PASS_AUTOMATED_VISUAL_REVIEW_REQUIRED';
  } catch (error) { report.status = 'FAIL'; report.errors.push(error.stack); }
  finally {
    try { await page?.evaluate(() => window.techniqueWorld?.dispose()); } catch { /* Boot may have failed. */ }
    await browser?.close(); await server?.close();
    await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ status: report.status, scenarios: report.cases.length, checks: report.checks.length,
      failures: report.checks.filter(c => !c.passed), errors: report.errors, screenshots: report.evidence.length, output }, null, 2));
    if (report.status === 'FAIL') process.exitCode = 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
