import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(repo, '../outputs/sparkbound-build/audio-v2');
const { build } = require('esbuild');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(resolve(process.env.BQ_NODE_MODULES || resolve(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), 'playwright'))); }
const bundle = await build({ absWorkingDir: repo, entryPoints: [resolve(repo, 'sparkbound/src/sound.ts')], bundle: true, write: false, format: 'iife', globalName: 'SparkAudio', target: 'es2022', tsconfigRaw: {} });
const report = {
  safety: 'Headless Chrome --mute-audio; waveform tests use OfflineAudioContext only. No audio files played or exported.',
  limits: ['No subjective listening, headphone comfort or device speaker QA.', 'Chromium only; no Safari/iOS audio-device interruption testing.', 'Historical stage audio assertions replayed in isolation; current app gameplay tested separately.'],
  checks: [], errors: [], events: [], music: [], boundaries: [],
};
const check = (name, passed, detail) => {
  report.checks.push({ name, passed: Boolean(passed), ...(detail === undefined ? {} : { detail }) });
  assert.ok(passed, `${name}: ${JSON.stringify(detail)}`);
};
// Inspect the historical contract without rebuilding or overwriting its stage artifacts.
const stage = await readFile(resolve(repo, '../outputs/sparkbound-build/stage/verify.mjs'), 'utf8');
check('Existing stage lifecycle contract located', stage.includes('transitionPreservesCue') && stage.includes('disabledSilent') && stage.includes('OfflineAudioContext'));
const html = `<!doctype html><button id="unlock">Unlock</button><script src="/sound.js"></script><script>
window.GameAudio = SparkAudio.GameAudio; window.a = new GameAudio();
document.querySelector('button').onclick = async () => { await a.unlock(); a.setEnabled(true); };
window.initial = { context: a.context, enabled: a.enabled };
a.setEnabled(true); a.play('special'); a.startMusic('battle');
document.querySelector('button').click();
setTimeout(() => { window.beforeGesture = { context: a.context, unlocked: a.unlocked }; a.setEnabled(false); }, 30);
</script>`;
const server = createServer((req, res) => {
  res.setHeader('content-type', req.url === '/sound.js' ? 'text/javascript' : 'text/html');
  res.end(req.url === '/sound.js' ? bundle.outputFiles[0].text : html);
});
await mkdir(output, { recursive: true });
await new Promise(r => server.listen(0, '127.0.0.1', r));
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--mute-audio'] });
  const page = await browser.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(() => window.beforeGesture);
  check('Default muted; pre-gesture calls and synthetic click create no context', await page.evaluate(() => initial.context === null && !initial.enabled && beforeGesture.context === null && !beforeGesture.unlocked));
  await page.click('#unlock');
  await page.waitForFunction(() => a.unlocked);
  check('Trusted gesture unlocks a running context', await page.evaluate(() => a.context.state === 'running'));
  const lifecycle = await page.evaluate(async () => {
    a.setVolume(.3); a.startMusic('battle'); const running = a.voices.size;
    const timer = a.timer; a.startMusic('battle'); const idempotent = timer === a.timer;
    a.stop(); const stopped = a.voices.size === 0 && a.timer === null && !a.output && !a.spaces.size;
    a.play('victory'); const oneShots = [...a.voices].filter(v => !v.music).length, effectRoom = a.spaces.get(false);
    a.startMusic('victory'); const transitionPreservesCue = [...a.voices].filter(v => !v.music).length === oneShots && a.spaces.get(false) === effectRoom;
    a.stop(); a.play('special'); const effect = a.voices.size;
    a.setEnabled(false); const disabled = a.voices.size === 0 && a.timer === null && !a.output && !a.spaces.size;
    a.play('impact'); const disabledSilent = a.voices.size === 0;
    a.setEnabled(true); a.startMusic('forge');
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await new Promise(r => setTimeout(r, 50));
    const hidden = !a.voices.size && a.timer === null && a.context.state === 'suspended' && !a.output && !a.spaces.size;
    delete document.hidden;
    document.dispatchEvent(new Event('visibilitychange'));
    const noAutoResume = !a.voices.size && a.timer === null;
    return { running, effect, stopped, disabled, disabledSilent, hidden, transitionPreservesCue, idempotent, noAutoResume };
  });
  check('Historical stage lifecycle assertions plus room cleanup', lifecycle.running > 0 && lifecycle.effect > 0 && Object.entries(lifecycle).filter(([k]) => !['running', 'effect'].includes(k)).every(([, v]) => v), lifecycle);
  await page.click('#unlock');
  await page.waitForFunction(() => a.context.state === 'running');
  const controls = await page.evaluate(async () => {
    a.startMusic('battle'); const timer = a.timer, volume = a.volume;
    a.setIntensity(2); const max = a.intensity; a.setIntensity(-1); const min = a.intensity;
    a.setIntensity(.72); a.setIntensity(NaN); a.setIntensity(Infinity);
    const independent = a.intensity === .72 && a.volume === volume && a.timer === timer;
    a.setVolume(NaN); const finiteVolume = a.volume === volume;
    a.setVolume(0); a.play('round'); const zeroSilent = !a.voices.size && !a.output && a.timer === null;
    a.setVolume(.55); a.play('select'); const select = a.voices.size;
    a.play('select'); const throttled = a.voices.size === select;
    a.stop();
    for (let i = 0; i < 180; i++) { a.lastEvent.clear(); a.play(i % 2 ? 'break' : 'special'); }
    const capped = a.voices.size <= 96;
    a.stop(); a.play('round');
    await new Promise(r => setTimeout(r, 1400));
    const endedClean = a.voices.size === 0;
    a.startMusic('forge'); await a.context.suspend(); await new Promise(r => setTimeout(r, 30));
    const suspended = !a.voices.size && !a.spaces.size && a.timer === null;
    return { max, min, independent, finiteVolume, zeroSilent, select, throttled, capped, endedClean, suspended };
  });
  check('Independent bounded intensity, zero volume, event throttle, 96-voice cap and source cleanup', controls.max === 1 && controls.min === 0 && controls.select >= 2 && Object.entries(controls).filter(([k]) => !['max', 'min', 'select'].includes(k)).every(([, v]) => v), controls);
  await page.click('#unlock');
  const pagehide = await page.evaluate(async () => {
    a.play('special'); window.dispatchEvent(new Event('pagehide')); await new Promise(r => setTimeout(r, 50));
    return !a.voices.size && !a.spaces.size && !a.output && a.context.state === 'suspended';
  });
  check('Pagehide stops sources, scheduling, convolution and suspends context', pagehide);
  const race = await page.evaluate(async () => {
    Object.defineProperty(navigator, 'userActivation', { configurable: true, value: { isActive: true } });
    const original = a.context.resume.bind(a.context);
    let finish;
    a.context.resume = () => new Promise(r => { finish = r; });
    a.unlocked = false;
    const pending = a.unlock(); a.setEnabled(false); finish(); await pending;
    const cancelled = !a.unlocked && !a.voices.size && !a.output;
    a.context.resume = original; delete navigator.userActivation;
    a.dispose(); a.dispose(); a.setEnabled(true); a.startMusic('battle'); a.play('select'); await a.unlock();
    return { cancelled, disposed: a.context === null && a.voices.size === 0 && a.spaces.size === 0 && a.timer === null };
  });
  check('Mute during pending unlock cannot revive audio; disposal is idempotent', race.cancelled && race.disposed, race);

  // Private hooks exist only in this isolated harness; production gesture gating is tested above.
  await page.evaluate(() => {
    window.makeOffline = (seconds, rate = 44100, channels = 2) => {
      const ctx = new OfflineAudioContext(channels, Math.ceil(rate * seconds), rate), audio = new GameAudio();
      audio.context = ctx; audio.master = ctx.createGain(); audio.master.gain.value = .55 * .42;
      audio.enabled = true; audio.unlocked = true;
      audio.noiseBuffer = ctx.createBuffer(1, rate * 2, rate);
      let seed = 123;
      const noise = audio.noiseBuffer.getChannelData(0);
      for (let i = 0; i < noise.length; i++) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; noise[i] = seed / 2147483648 - 1; }
      audio.ready = () => !audio.disposed && audio.enabled && audio.volume > 0 && !document.hidden;
      return { ctx, audio, dispose: () => { audio.context = null; audio.dispose(); } };
    };
    window.metrics = (buffer, start = 0, end = buffer.duration) => {
      const l = buffer.getChannelData(0), r = buffer.getChannelData(Math.min(1, buffer.numberOfChannels - 1));
      const from = Math.round(start * buffer.sampleRate), to = Math.min(l.length, Math.round(end * buffer.sampleRate));
      let peak = 0, sum = 0, side = 0, differences = 0, previous = 0, active = 0, finite = true;
      for (let i = from; i < to; i++) {
        finite &&= Number.isFinite(l[i]) && Number.isFinite(r[i]);
        peak = Math.max(peak, Math.abs(l[i]), Math.abs(r[i]));
        sum += (l[i] ** 2 + r[i] ** 2) / 2; side += (l[i] - r[i]) ** 2;
        const mid = (l[i] + r[i]) / 2;
        differences += (mid - previous) ** 2; previous = mid;
        if (Math.abs(l[i]) > .0001 || Math.abs(r[i]) > .0001) active++;
      }
      return { peak, rms: Math.sqrt(sum / (to - from)), sideRatio: Math.sqrt(side / Math.max(sum, 1e-30)), roughness: Math.sqrt(differences / Math.max(sum, 1e-30)), activeSamples: active, finite };
    };
  });
  report.events = await page.evaluate(async () => {
    const results = [];
    for (const rate of [44100, 48000]) {
      for (const event of ['launch', 'strike', 'impact', 'guard', 'break', 'special', 'charge', 'upgrade', 'correct', 'wrong', 'victory', 'step', 'select', 'round', 'servo']) {
        const h = makeOffline(3, rate); h.audio.play(event); const voices = h.audio.voices.size;
        const buffer = await h.ctx.startRendering();
        results.push({ event, sampleRate: rate, voices, ...metrics(buffer) }); h.dispose();
      }
    }
    return results;
  });
  check('All 14 events render layered finite nonclipping output at 44.1/48 kHz', report.events.every(e => e.voices >= 2 && e.finite && e.peak > .002 && e.peak < .8 && e.activeSamples > 100), report.events.map(e => ({ event: e.event, rate: e.sampleRate, peak: e.peak })));
  check('Stereo spatial energy in all 14 cues', report.events.every(e => e.sideRatio > .001));
  const maximumMix = await page.evaluate(async () => {
    const h = makeOffline(4), audio = h.audio;
    audio.setVolume(1); audio.setIntensity(1); audio.startMusic('battle');
    clearTimeout(audio.timer); audio.timer = null;
    for (const event of ['launch', 'select', 'strike', 'impact', 'guard', 'break', 'special', 'charge', 'upgrade', 'correct', 'wrong', 'victory', 'step', 'round', 'servo']) audio.play(event);
    const voices = audio.voices.size, buffer = await h.ctx.startRendering(); h.dispose();
    return { voices, ...metrics(buffer) };
  });
  check('Maximum-volume simultaneous effects plus battle retain headroom and voice bound', maximumMix.finite && maximumMix.peak < .95 && maximumMix.peak > .01 && maximumMix.voices <= 96, maximumMix);
  const timbres = await page.evaluate(async () => {
    const render = async (event, take = 0, channels = 2) => {
      const h = makeOffline(2, 44100, channels); h.audio.variants.set(event, take); h.audio.play(event);
      const buffer = await h.ctx.startRendering(); h.dispose(); return buffer;
    };
    const strike = await render('strike'), guard = await render('guard'), selectA = await render('select'), selectB = await render('select', 1), mono = await render('special', 0, 1);
    const first = selectA.getChannelData(0), second = selectB.getChannelData(0);
    let delta = 0; for (let i = 0; i < first.length; i++) delta += (first[i] - second[i]) ** 2;
    return { attack: metrics(strike, .12, .5), shield: metrics(guard, .12, .5), variationDelta: Math.sqrt(delta / first.length), mono: metrics(mono) };
  });
  check('Shield has smoother sustained resonance than attack; repeated selections vary; mono remains audible', timbres.shield.roughness < timbres.attack.roughness && timbres.shield.rms > timbres.attack.rms && timbres.variationDelta > .00001 && timbres.mono.peak > .002 && timbres.mono.peak < .8, timbres);

  report.boundaries = await page.evaluate(async () => {
    const results = [];
    for (const action of ['stop', 'mute', 'hidden', 'pagehide', 'zero', 'dispose', 'restart']) {
      const h = makeOffline(2), audio = h.audio;
      // A short impulse excites the real room. A future special tests scheduled-source cancellation.
      audio.tone(.02, .035, 650, 650, .25, 'sine', .002, -.4, 1);
      audio.tone(.7, .3, 90, 30, .25, 'sine');
      const pause = h.ctx.suspend(.09);
      const rendering = h.ctx.startRendering();
      await pause; const at = h.ctx.currentTime;
      if (action === 'mute') audio.setEnabled(false);
      else if (action === 'zero') audio.setVolume(0);
      else if (action === 'hidden') {
        // Visibility calls realtime suspend; the offline renderer is already suspended here.
        const original = h.ctx.suspend.bind(h.ctx); h.ctx.suspend = () => Promise.resolve();
        Object.defineProperty(document, 'hidden', { configurable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange')); delete document.hidden; h.ctx.suspend = original;
      } else if (action === 'pagehide') {
        const original = h.ctx.suspend.bind(h.ctx); h.ctx.suspend = () => Promise.resolve();
        window.dispatchEvent(new Event('pagehide')); h.ctx.suspend = original;
      } else if (action === 'dispose') {
        h.ctx.close = () => Promise.resolve(); audio.dispose();
      } else audio.stop();
      const cleared = !audio.voices.size && !audio.spaces.size && !audio.output && audio.timer === null;
      if (action === 'restart') { audio.setEnabled(true); audio.tone(.5, .06, 900, 900, .1, 'sine'); }
      await h.ctx.resume(); const buffer = await rendering;
      results.push({ action, at, cleared, before: metrics(buffer, 0, at), silence: metrics(buffer, at + .004, action === 'restart' ? .49 : 2), restart: action === 'restart' ? metrics(buffer, .5, .7) : undefined });
      h.dispose();
    }
    const h = makeOffline(.5); h.audio.tone(.02, .035, 650, 650, .25, 'sine', .002, -.4, 1);
    const reference = await h.ctx.startRendering(); results.push({ action: 'room-positive-control', tail: metrics(reference, .09, .2) }); h.dispose();
    return results;
  });
  check('Stop/mute/hidden/pagehide/zero/dispose remove real tails and future sources; restart cannot revive tails', report.boundaries.filter(b => b.action !== 'room-positive-control').every(b => b.cleared && b.before.peak > .002 && b.silence.peak === 0 && (!b.restart || b.restart.peak > .002)), report.boundaries);
  check('Room positive control contains actual post-source reflections', report.boundaries.at(-1).tail.peak > .00001, report.boundaries.at(-1));

  // Advance the production look-ahead scheduler on the offline sample clock, one quantum at a time.
  report.music = await page.evaluate(async () => {
    const results = [];
    for (const [mode, intensity] of [['battle', 0], ['battle', 1], ['forge', .2], ['victory', .6]]) {
      const h = makeOffline(28, 22050), audio = h.audio; let peakVoices = 0, created = 0;
      const track = audio.track.bind(audio);
      audio.track = (...args) => { track(...args); created++; peakVoices = Math.max(peakVoices, audio.voices.size); };
      audio.setIntensity(intensity); audio.startMusic(mode); clearTimeout(audio.timer); audio.timer = null;
      let next = .1, suspended = h.ctx.suspend(next);
      const rendering = h.ctx.startRendering();
      while (next < 27.5) {
        await suspended; audio.scheduleMusic(); clearTimeout(audio.timer); audio.timer = null;
        next += .1; suspended = h.ctx.suspend(next); await h.ctx.resume();
      }
      await suspended; audio.stopMusic(); await h.ctx.resume();
      const buffer = await rendering;
      results.push({ mode, intensity, peakVoices, created, ...metrics(buffer), firstBar: metrics(buffer, .04, 3.08), laterPass: metrics(buffer, 24.36, 27.4) });
      h.dispose();
    }
    return results;
  });
  check('All music modes render finite stereo output with bounded voices', report.music.every(m => m.finite && m.peak > .002 && m.peak < .8 && m.sideRatio > .01 && m.peakVoices <= 96), report.music);
  check('Battle intensity adds arrangement density independently of listening volume', report.music[1].created > report.music[0].created * 1.4 && report.music[1].rms > report.music[0].rms * 1.1);
  const arrangements = await page.evaluate(() => {
    const h = makeOffline(1), audio = h.audio;
    const bars = [];
    for (const mode of ['battle', 'forge', 'victory']) {
      for (const bar of [0, 1, 7, 8, 16]) {
        const notes = [];
        audio.tone = (...args) => notes.push(['tone', ...args]);
        audio.noise = (...args) => notes.push(['noise', ...args]);
        audio.tension = .7;
        for (let slot = 0; slot < 16; slot++) audio.musicStep(slot * .19, bar * 16 + slot, .19, mode);
        bars.push({ mode, bar, signature: JSON.stringify(notes), notes: notes.length });
      }
    }
    h.dispose(); return bars;
  });
  check('Eight-bar journeys vary harmony, rests and later-pass motif voicings', ['battle', 'forge', 'victory'].every(mode => new Set(arrangements.filter(a => a.mode === mode).map(a => a.signature)).size === 5), arrangements.map(({ mode, bar, notes }) => ({ mode, bar, notes })));
  const strikeContract = await page.evaluate(() => {
    const h = makeOffline(1), layers = [];
    h.audio.tone = (...args) => layers.push({ kind: 'tone', from: args[2], to: args[3], level: args[4] });
    h.audio.noise = (...args) => layers.push({ kind: 'noise', filter: args[5] });
    h.audio.metal = () => layers.push({ kind: 'metal' });
    h.audio.play('strike'); h.dispose(); return layers;
  });
  check('Strike is motion-only: no metal, sub/body drop or lowpass impact burst', strikeContract.every(l => l.kind !== 'metal' && (l.kind !== 'tone' || (l.from >= 200 && l.to >= 200 && l.level <= .03)) && (l.kind !== 'noise' || l.filter === 'bandpass')), strikeContract);
  console.log('Offline audio checks passed; starting muted current-app gameplay QA.');
  await runIntegration(browser);
  check('No browser errors', report.errors.length === 0, report.errors);
} catch (error) {
  report.errors.push(error.stack); process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise(r => server.close(r));
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.checks.filter(c => c.passed).length, failed: report.checks.filter(c => !c.passed), errors: report.errors, output }, null, 2));
}

async function runIntegration(browser) {
  const { startSparkboundQa } = await import('./serve-sparkbound-qa.mjs');
  const { applyAction } = await import('../functions/_lib/sparkbound.js');
  // Serve the current sources in memory: never overwrite the shared production game.js.
  const hashes = {};
  for (const file of ['sound.ts', 'app.ts', 'world.ts']) hashes[file] = createHash('sha256').update(await readFile(resolve(repo, 'sparkbound/src', file))).digest('hex');
  const current = await build({ absWorkingDir: repo, entryPoints: [resolve(repo, 'sparkbound/src/app.ts')], bundle: true, write: false, format: 'esm', target: 'es2022', tsconfigRaw: {}, nodePaths: process.env.BQ_NODE_MODULES ? [process.env.BQ_NODE_MODULES] : [] });
  const harness = await startSparkboundQa({ port: 0 }), fixture = harness.fixture;
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  try {
    await context.addCookies([{ name: 'bq_session', value: fixture.cookie.value, url: harness.origin }]);
    await context.addInitScript(id => localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true'), fixture.childId);
    await context.addInitScript(cap => {
      sessionStorage.setItem('brightQuestChildCapability', cap);
      localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, volume: .55, reduced: false }));
    }, fixture.childCapability);
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    await page.route('**/sparkbound/game.js*', route => route.fulfill({ status: 200, contentType: 'text/javascript', body: current.outputFiles[0].text }));
    const settle = () => page.waitForFunction(() => window.__SPARK_QA__ && !__SPARK_QA__.acting && document.querySelector('#game').getAttribute('aria-busy') === 'false', null, { timeout: 45000 });
    const click = async action => {
      await page.locator(`[data-action="${action}"]`).first().click();
      if (action === 'save-settings') await page.locator('dialog').waitFor({ state: 'hidden' });
      await settle();
    };
    const state = () => page.evaluate(() => __SPARK_QA__.state);
    const privateState = async () => JSON.parse((await harness.db.prepare('SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?').bind(fixture.familyId, fixture.childId).first()).state_json);
    await page.goto(`${harness.origin}/sparkbound/`); await settle();
    check('Actual app boots muted without AudioContext', await page.evaluate(() => __SPARK_QA__.audio.context === null && !__SPARK_QA__.audio.enabled));
    await page.evaluate(() => {
      const { audio, world } = __SPARK_QA__;
      window.audioTrace = { cues: [], intensities: [], modes: [], contacts: [] };
      let inContact = false;
      const contact = world.makeContact.bind(world);
      world.makeContact = (...args) => { inContact = true; try { return contact(...args); } finally { inContact = false; } };
      const play = audio.play.bind(audio);
      audio.play = event => {
        const ready = audio.ready(), before = audio.voices.size;
        play(event);
        audioTrace.cues.push({ event, ready, before, after: audio.voices.size, time: performance.now(), inContact,
          phase: world.animation?.phase, phaseTime: world.animation?.phaseTime, contactTime: world.animation?.contactTime });
      };
      const intensity = audio.setIntensity.bind(audio);
      audio.setIntensity = value => { intensity(value); audioTrace.intensities.push({ value, volume: audio.volume }); };
      const music = audio.startMusic.bind(audio);
      audio.startMusic = mode => { music(mode); if (audioTrace.modes.at(-1) !== audio.mode) audioTrace.modes.push(audio.mode); };
      const impact = world.onImpact;
      world.onImpact = (...args) => { audioTrace.contacts.push({ time: performance.now(), part: args[1] }); impact(...args); };
    });
    await click('sound');
    check('Actual sound toggle unlocks audio and starts music', await page.evaluate(() => __SPARK_QA__.audio.ready() && __SPARK_QA__.audio.voices.size > 0));
    await click('start');
    check('New battle calls round cue and independent intensity API', await page.evaluate(() => audioTrace.cues.some(c => c.event === 'round' && c.ready && c.after > c.before) && audioTrace.intensities.length > 0));
    await page.screenshot({ path: resolve(output, 'app-battle-desktop.png') });
    await page.locator('[data-move="strike"]').click();
    await page.waitForFunction(() => __SPARK_QA__.acting);
    await page.locator('[data-action="pause"]').click();
    await page.waitForTimeout(220);
    check('Actual mid-exchange pause clears all voices, music and room tails', await page.evaluate(() => { const a = __SPARK_QA__.audio; return !a.voices.size && !a.spaces.size && !a.output && a.timer === null && __SPARK_QA__.world.paused; }));
    await click('close-dialog');
    check('Resume completes the paused native exchange', await page.evaluate(() => !__SPARK_QA__.acting && __SPARK_QA__.audio.ready()));
    await click('sound');
    await page.locator('[data-move="guard"]').click(); await settle();
    check('Actual muted exchange remains silent through world callbacks', await page.evaluate(() => { const a = __SPARK_QA__.audio; return !a.voices.size && !a.output && !a.spaces.size && a.timer === null; }));
    await click('sound');
    const path = [];
    for (let n = 0; n < 100; n++) {
      const s = await state(), m = s.match;
      path.push({ phase: m.phase, round: m.round });
      if (m.phase === 'victory') break;
      if (m.phase === 'battle') {
        const privateS = await privateState();
        const move = ['strike', 'guard', 'break', 'special'].flatMap(move => {
          try {
            const next = applyAction(privateS, { type: 'move', move }).match;
            return [{ move, score: next.phase === 'defeat' ? -10000 : next.phase === 'round_won' ? 10000 : (m.rivalHP - next.rivalHP) * 5 - (m.playerHP - next.playerHP) * 3 + next.energy }];
          } catch { return []; }
        }).sort((a, b) => b.score - a.score)[0].move;
        await page.locator(`[data-move="${move}"]`).click(); await settle();
      } else if (m.phase === 'training') {
        const q = (await privateState()).match.questions[m.questionIndex];
        if (q.type === 'numeric') {
          for (const digit of String(q.answer)) await page.locator(`[data-key="${digit}"]`).click();
        } else if (q.type === 'order') {
          for (const id of q.answer) await page.locator(`[data-action="order"][data-choice="${id}"]`).click();
        } else await page.locator(`[data-action="choose"][data-choice="${q.answer}"]`).click();
        await click('answer');
        if (await page.locator('[data-action="acknowledge"]').count()) await click('acknowledge');
      } else if (m.phase === 'defeat') await click('retry-supported');
      else await click('continue');
      if (n % 5 === 0) console.log(`Muted gameplay: action ${n}, round ${m.round}, phase ${m.phase}`);
    }
    check('Actual three-round game and four forge tasks reach victory', (await state()).match.phase === 'victory');
    report.integration = { path, sourceHashes: hashes, trace: await page.evaluate(() => audioTrace), errors };
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: resolve(output, 'app-victory-mobile.png') });
    await click('settings');
    check('Actual mobile settings stops audio', await page.evaluate(() => !__SPARK_QA__.audio.voices.size && !__SPARK_QA__.audio.output));
    await page.locator('#volume-setting').fill('0'); await click('save-settings');
    check('Actual zero-volume settings remain silent after closing', await page.evaluate(() => !__SPARK_QA__.audio.voices.size && !__SPARK_QA__.audio.output));
    await click('settings'); await page.locator('#volume-setting').fill('0.55'); await click('save-settings');
    const hidden = await page.evaluate(async () => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange')); await new Promise(r => setTimeout(r, 50));
      const audio = __SPARK_QA__.audio;
      const quiet = !audio.voices.size && !audio.spaces.size && !audio.output && audio.context.state === 'suspended';
      delete document.hidden; document.dispatchEvent(new Event('visibilitychange'));
      return quiet && !audio.voices.size && !audio.output;
    });
    check('Actual app visibility lifecycle clears audio and does not auto-resume on show', hidden);
    await click('settings'); await click('save-settings');
    await page.waitForFunction(() => __SPARK_QA__.audio.ready() && __SPARK_QA__.audio.voices.size > 0);
    check('Actual settings gesture resumes audio after visibility suspension', true);
    const trace = await page.evaluate(() => audioTrace);
    report.integration = { path, sourceHashes: hashes, trace, screenshots: ['app-battle-desktop.png', 'app-victory-mobile.png'], errors };
    check('App/world deliver select, round, servo and all three music modes', ['select', 'round', 'servo'].every(event => trace.cues.some(c => c.event === event && c.ready && c.after > c.before)) && ['battle', 'forge', 'victory'].every(mode => trace.modes.includes(mode)));
    const contacts = trace.cues.filter(c => ['impact', 'guard', 'break'].includes(c.event));
    check('Every hard contact cue originates inside the native contact callback', contacts.length > 3 && contacts.every(c => c.inContact), contacts.map(c => ({ event: c.event, phaseTime: c.phaseTime, contactTime: c.contactTime, inContact: c.inContact })));
    check('Strike swish originates at attack start outside contact', trace.cues.filter(c => c.event === 'strike').every(c => !c.inContact && c.phase === 'strike' && c.phaseTime === 0));
    check('App changes tension while preserving the listening volume', new Set(trace.intensities.map(i => i.value)).size >= 3 && trace.intensities.every(i => i.value >= 0 && i.value <= 1));
    check('No current-app browser or asset errors', errors.length === 0, errors);
    const changedDuringRun = [];
    for (const file of Object.keys(hashes)) if (hashes[file] !== createHash('sha256').update(await readFile(resolve(repo, 'sparkbound/src', file))).digest('hex')) changedDuringRun.push(file);
    report.integration.changedDuringRun = changedDuringRun;
    check('Verified source snapshots stayed unchanged during gameplay QA', changedDuringRun.length === 0, changedDuringRun);
    await page.evaluate(() => __SPARK_QA__.audio.dispose());
  } finally { await context.close(); await harness.close(); }
}
