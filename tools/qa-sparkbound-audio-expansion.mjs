import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Standalone, in-memory audio build only. No app build, shared artifacts or audible playback.
const require = createRequire(import.meta.url);
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { build } = require('esbuild');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(resolve(process.env.BQ_NODE_MODULES || resolve(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), 'playwright'))); }
if (process.argv.includes('--final-bundle')) { await verifyFinalBundle(); process.exit(0); }
const source = 'sparkbound/src/sound.ts';
const options = { absWorkingDir: repo, bundle: true, write: false, format: 'iife', target: 'es2022', tsconfigRaw: {}, minify: true };
const bundle = await build({ ...options, entryPoints: [resolve(repo, source)], globalName: 'SparkAudio' });
const previous = await build({ ...options, globalName: 'PreviousAudio', stdin: {
  contents: execFileSync('git', ['show', `HEAD:${source}`], { cwd: repo, encoding: 'utf8' }), loader: 'ts', resolveDir: repo,
} });
const report = {
  safety: 'Chromium --mute-audio always; OfflineAudioContext waveform rendering; no audio export, app build or shared file writes.',
  limits: ['No subjective listening or device speaker QA.', 'No Safari/iOS interruption QA or main-app preference wiring in this audio-only test.'],
  bundleBytes: bundle.outputFiles[0].contents.length, checks: [], errors: [],
};
const check = (name, passed, detail) => {
  report.checks.push({ name, passed: Boolean(passed), ...(detail === undefined ? {} : { detail }) });
  assert.ok(passed, `${name}: ${JSON.stringify(detail)}`);
};
const html = `<!doctype html><button id="unlock">Unlock</button><script src="/sound.js"></script><script>
window.GameAudio = SparkAudio.GameAudio; window.a = new GameAudio();
window.initial = { enabled: a.enabled, music: a.musicEnabled, effects: a.effectsEnabled, context: a.context };
document.querySelector('button').onclick = async () => { await a.unlock(); a.setEnabled(true); };
a.setHero('helio'); a.setMusicEnabled(true); a.setEffectsEnabled(true); a.setEnabled(true);
a.play('weapon-laser'); a.startMusic('battle'); document.querySelector('button').click();
setTimeout(() => { window.beforeGesture = { context: a.context, unlocked: a.unlocked }; a.setEnabled(false); }, 30);
</script>`;
const server = createServer((req, res) => {
  res.setHeader('content-type', req.url === '/sound.js' ? 'text/javascript' : 'text/html');
  res.end(req.url === '/sound.js' ? bundle.outputFiles[0].text + '\n' + previous.outputFiles[0].text : html);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--mute-audio'] });
  const page = await browser.newPage();
  page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(() => window.beforeGesture);
  check('Master defaults off, both channels default on; synthetic gesture and setters cannot unlock', await page.evaluate(() =>
    !initial.enabled && initial.music && initial.effects && initial.context === null && beforeGesture.context === null && !beforeGesture.unlocked));
  await page.click('#unlock');
  await page.waitForFunction(() => a.unlocked);
  check('Trusted gesture unlocks the existing context', await page.evaluate(() => a.context.state === 'running'));
  const controls = await page.evaluate(() => {
    const results = {}, context = a.context;
    a.startMusic('battle'); a.play('charge');
    const timer = a.timer, music = [...a.voices].filter(v => v.music), room = a.spaces.get(true);
    a.setEffectsEnabled(false); a.play('impact'); a.setEffectsEnabled(false);
    results.effectsOffKeepsMusic = a.timer === timer && a.spaces.get(true) === room && music.every(v => a.voices.has(v)) && [...a.voices].every(v => v.music);
    a.setEffectsEnabled(true); a.play('charge');
    const fx = [...a.voices].filter(v => !v.music), fxRoom = a.spaces.get(false);
    a.setMusicEnabled(false); a.startMusic('forge'); a.setMusicEnabled(false);
    results.musicOffKeepsEffects = a.timer === null && !a.spaces.has(true) && a.spaces.get(false) === fxRoom && fx.every(v => a.voices.has(v));
    a.setMusicEnabled(true);
    results.musicResumesLatestScene = a.mode === 'forge' && a.timer !== null && fx.every(v => a.voices.has(v));
    const sameTimer = a.timer, beat = a.beat;
    a.setMusicEnabled(true); a.setEffectsEnabled(true); a.startMusic('forge'); a.setHero('glacier');
    results.idempotentAndHeroPreservesPhrase = a.timer === sameTimer && a.beat === beat && a.hero === 'glacier';
    a.setHero('toString'); results.unknownHero = a.hero === 'relay';
    a.setIntensity(2); results.intensityMax = a.intensity === 1; a.setIntensity(-1); results.intensityMin = a.intensity === 0;
    const volume = a.volume; a.setIntensity(.8); a.setIntensity(NaN); a.setVolume(NaN);
    results.intensityIndependent = a.intensity === .8 && a.volume === volume && a.timer === sameTimer;
    a.setMusicEnabled(false); a.stop(); a.setMusicEnabled(true); a.setEffectsEnabled(false); a.setEffectsEnabled(true);
    results.pauseCannotBeRevivedByChannelToggle = !a.voices.size && a.timer === null && !a.output && a.requestedMode === null;
    a.startMusic('victory'); a.play('victory'); a.setEnabled(false);
    results.masterStopsEverything = !a.voices.size && !a.spaces.size && !a.output && a.timer === null;
    a.setMusicEnabled(false); a.setMusicEnabled(true); a.play('weapon-laser');
    results.masterOffIsSilent = !a.voices.size && a.timer === null;
    a.setEnabled(true); a.startMusic('battle'); a.setVolume(0); a.play('round');
    results.zeroHardStops = !a.voices.size && !a.output && a.timer === null;
    a.setVolume(.55); a.play('select'); const count = a.voices.size; a.play('select');
    results.throttle = count > 0 && a.voices.size === count;
    results.reusesContext = a.context === context;
    a.stop(); return results;
  });
  for (const [name, passed] of Object.entries(controls)) check(name, passed);
  const lifecycle = await page.evaluate(async () => {
    const results = {};
    a.startMusic('battle'); a.play('weapon-frost');
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange')); await new Promise(r => setTimeout(r, 30));
    results.hidden = !a.voices.size && !a.spaces.size && !a.output && a.timer === null && a.context.state === 'suspended';
    delete document.hidden; document.dispatchEvent(new Event('visibilitychange'));
    a.setMusicEnabled(false); a.setMusicEnabled(true); a.startMusic('battle');
    results.showDoesNotResume = !a.voices.size && a.timer === null;
    return results;
  });
  for (const [name, passed] of Object.entries(lifecycle)) check(name, passed);
  await page.click('#unlock');
  await page.waitForFunction(() => a.context.state === 'running');
  check('Pagehide cancels all audio', await page.evaluate(async () => {
    a.startMusic('battle'); a.play('special'); window.dispatchEvent(new Event('pagehide'));
    await new Promise(r => setTimeout(r, 30));
    return !a.voices.size && !a.output && !a.spaces.size && a.timer === null && a.context.state === 'suspended';
  }));
  check('Mute invalidates a pending unlock; disposal is idempotent', await page.evaluate(async () => {
    Object.defineProperty(navigator, 'userActivation', { configurable: true, value: { isActive: true } });
    let finish; a.context.resume = () => new Promise(r => { finish = r; }); a.unlocked = false;
    const pending = a.unlock(); a.setEnabled(false); finish(); await pending;
    const cancelled = !a.unlocked && !a.voices.size && !a.output;
    delete navigator.userActivation; a.dispose(); a.dispose(); a.setMusicEnabled(true); a.setEffectsEnabled(true); await a.unlock();
    return cancelled && !a.context && !a.voices.size && a.timer === null;
  }));

  // Test-only private hooks, following qa-sparkbound-audio-v2. No production bypass is exported.
  await page.evaluate(() => {
    window.legacy = ['launch', 'strike', 'impact', 'guard', 'break', 'special', 'charge', 'upgrade', 'correct', 'wrong', 'victory', 'step', 'select', 'round', 'servo'];
    window.expansion = ['weapon-laser', 'weapon-arc', 'weapon-gravity', 'weapon-burst', 'weapon-frost'];
    window.upgrades = ['upgrade-assembly', 'upgrade-stage2'];
    window.makeOffline = (seconds, rate = 44100, AudioClass = GameAudio, channels = 2) => {
      const ctx = new OfflineAudioContext(channels, Math.ceil(rate * seconds), rate), audio = new AudioClass();
      audio.context = ctx; audio.master = ctx.createGain(); audio.master.gain.value = .55 * .42;
      audio.enabled = true; audio.unlocked = true;
      audio.noiseBuffer = ctx.createBuffer(1, rate * 2, rate);
      let seed = 123;
      const noise = audio.noiseBuffer.getChannelData(0);
      for (let i = 0; i < noise.length; i++) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; noise[i] = seed / 2147483648 - 1; }
      audio.ready = () => !audio.disposed && audio.enabled && audio.volume > 0 && !document.hidden;
      return { ctx, audio, dispose: () => { audio.stop(); audio.context = null; audio.dispose(); } };
    };
    window.metrics = (buffer, start = 0, end = buffer.duration) => {
      let peak = 0, sum = 0, side = 0, finite = true, maxDelta = 0;
      const l = buffer.getChannelData(0), r = buffer.getChannelData(Math.min(1, buffer.numberOfChannels - 1));
      const from = Math.round(start * buffer.sampleRate), to = Math.min(l.length, Math.round(end * buffer.sampleRate));
      for (let i = from; i < to; i++) {
        finite &&= Number.isFinite(l[i]) && Number.isFinite(r[i]);
        peak = Math.max(peak, Math.abs(l[i]), Math.abs(r[i])); sum += (l[i] ** 2 + r[i] ** 2) / 2; side += (l[i] - r[i]) ** 2;
        if (i > from) maxDelta = Math.max(maxDelta, Math.abs(l[i] - l[i - 1]), Math.abs(r[i] - r[i - 1]));
      }
      return { peak, rms: Math.sqrt(sum / (to - from)), sideRatio: Math.sqrt(side / Math.max(sum, 1e-30)), maxDelta, finite };
    };
    window.cancelTimer = audio => { clearTimeout(audio.timer); audio.timer = null; };
  });
  report.events = await page.evaluate(async () => {
    const results = [];
    for (const rate of [44100, 48000]) for (const event of [...legacy, ...expansion, ...upgrades]) {
      const h = makeOffline(3, rate); h.audio.play(event);
      const voices = h.audio.voices.size, end = Math.max(...[...h.audio.voices].map(v => v.end));
      const buffer = await h.ctx.startRendering();
      results.push({ event, rate, voices, end, ...metrics(buffer), tail: metrics(buffer, 1, 3).peak }); h.dispose();
    }
    return results;
  });
  check('All 22 FX are layered, finite, stereo and below clipping at 44.1/48 kHz', report.events.every(e => e.voices >= 2 && e.finite && e.peak > .002 && e.peak < .8 && e.sideRatio > .001));
  check('Stage-two reward is longer and richer without exceeding the legacy upgrade peak', [44100, 48000].every(rate => {
    const get = event => report.events.find(e => e.event === event && e.rate === rate);
    return get('upgrade-stage2').rms > get('upgrade-assembly').rms && get('upgrade-stage2').end > get('upgrade-assembly').end &&
      get('upgrade-stage2').peak <= get('upgrade').peak && get('upgrade-assembly').peak <= get('upgrade').peak;
  }));
  check('All five expansion FX finish sources within 280 ms and have no late tails', report.events.filter(e => e.event.startsWith('weapon-')).every(e => e.end <= .28 && e.tail === 0));
  const contracts = await page.evaluate(() => {
    const trace = (event, AudioClass) => {
      const h = makeOffline(1, 44100, AudioClass), layers = [];
      for (const method of ['tone', 'noise', 'metal']) h.audio[method] = (...args) => layers.push({ method, args });
      h.audio.play(event); h.dispose(); return layers;
    };
    return {
      legacyUnchanged: legacy.every(event => JSON.stringify(trace(event, GameAudio)) === JSON.stringify(trace(event, PreviousAudio.GameAudio))),
      expansion: expansion.map(event => ({ event, layers: trace(event, GameAudio) })),
    };
  });
  check('All 15 legacy event synthesis contracts match HEAD exactly', contracts.legacyUnchanged);
  check('Expansion launch-only contracts: no metal, lowpass impact burst, sub drop or delayed arrival cue', contracts.expansion.every(e => e.layers.every(({ method, args }) =>
    args[0] <= .086 && (method === 'tone' ? args[2] >= 200 && args[3] >= 200 && args[4] <= .075 : method === 'noise' && args[5] !== 'lowpass'))), contracts.expansion);

  report.channelMatrix = await page.evaluate(async () => {
    const results = [];
    for (const master of [false, true]) for (const music of [false, true]) for (const effects of [false, true]) {
      const h = makeOffline(1); h.audio.setEnabled(master); h.audio.setMusicEnabled(music); h.audio.setEffectsEnabled(effects);
      h.audio.startMusic('battle'); cancelTimer(h.audio); h.audio.play('weapon-gravity');
      const voices = [...h.audio.voices], buffer = await h.ctx.startRendering();
      results.push({ master, music, effects, musicVoices: voices.filter(v => v.music).length, effectVoices: voices.filter(v => !v.music).length, ...metrics(buffer) }); h.dispose();
    }
    return results;
  });
  check('All eight master/music/effects combinations independently render or suppress each channel', report.channelMatrix.every(r =>
    Boolean(r.musicVoices) === (r.master && r.music) && Boolean(r.effectVoices) === (r.master && r.effects) && ((r.peak > .0001) === (r.master && (r.music || r.effects)))));

  report.boundaries = await page.evaluate(async () => {
    const results = [];
    for (const action of ['stop', 'mute', 'zero', 'hidden', 'pagehide', 'dispose', 'restart', 'music-off', 'effects-off']) {
      const h = makeOffline(2), audio = h.audio;
      audio.schedulingMusic = true; audio.pad(.01, 1.3, 64, .13, -.4, 1); audio.tone(.7, .3, 750, 750, .12, 'sine'); audio.schedulingMusic = false;
      audio.tone(.01, 1.3, 240, 240, .15, 'sine', .01, .3, .8); audio.tone(.7, .3, 1200, 1200, .1, 'sine');
      const pause = h.ctx.suspend(.18), rendering = h.ctx.startRendering(); await pause; const at = h.ctx.currentTime;
      if (action === 'mute') audio.setEnabled(false);
      else if (action === 'zero') audio.setVolume(0);
      else if (action === 'music-off') audio.setMusicEnabled(false);
      else if (action === 'effects-off') audio.setEffectsEnabled(false);
      else if (action === 'hidden' || action === 'pagehide') {
        const suspend = h.ctx.suspend.bind(h.ctx); h.ctx.suspend = () => Promise.resolve();
        if (action === 'hidden') {
          Object.defineProperty(document, 'hidden', { configurable: true, value: true });
          document.dispatchEvent(new Event('visibilitychange')); delete document.hidden;
        } else window.dispatchEvent(new Event('pagehide'));
        h.ctx.suspend = suspend;
      } else if (action === 'dispose') { h.ctx.close = () => Promise.resolve(); audio.dispose(); }
      else audio.stop();
      const music = [...audio.voices].filter(v => v.music).length, effects = [...audio.voices].filter(v => !v.music).length;
      const cleared = !audio.voices.size && !audio.spaces.size && !audio.output && audio.timer === null;
      if (action === 'restart') audio.tone(.5, .07, 900, 900, .12, 'sine', .006, 0, 0);
      await h.ctx.resume(); const buffer = await rendering;
      results.push({ action, at, cleared, music, effects, before: metrics(buffer, .01, at).peak,
        after: metrics(buffer, at + .008, action === 'restart' ? .49 : 2).peak, late: metrics(buffer, .7, 1.5).peak,
        restart: action === 'restart' ? metrics(buffer, .5, .65).peak : 0 }); h.dispose();
    }
    return results;
  });
  check('Hard boundaries cancel pads, room tails, compressor look-ahead and future notes; restart revives no old source', report.boundaries.filter(b => !b.action.endsWith('-off')).every(b =>
    b.cleared && b.before > .002 && b.after === 0 && b.late === 0 && (b.action !== 'restart' || b.restart > .002)), report.boundaries);
  check('Channel cancellation leaves the opposite channel rendering', report.boundaries.filter(b => b.action.endsWith('-off')).every(b =>
    b.after > .002 && (b.action === 'music-off' ? b.music === 0 && b.effects > 0 : b.effects === 0 && b.music > 0)));
  const channelTails = await page.evaluate(async () => {
    const results = [];
    for (const music of [true, false]) {
      const h = makeOffline(1.5), a = h.audio; a.schedulingMusic = music;
      a.tone(.01, .06, 640, 640, .2, 'sine', .002, -.3, 1); a.tone(.7, .2, 840, 840, .2, 'sine'); a.schedulingMusic = false;
      const pause = h.ctx.suspend(.09), rendering = h.ctx.startRendering(); await pause;
      const at = h.ctx.currentTime;
      if (music) a.setMusicEnabled(false); else a.setEffectsEnabled(false);
      await h.ctx.resume(); const buffer = await rendering;
      results.push({ music, before: metrics(buffer, 0, at).peak, after: metrics(buffer, at + .025, 1.5).peak }); h.dispose();
    }
    return results;
  });
  check('Individual channel off removes its actual convolution tails and future sources', channelTails.every(r => r.before > .002 && r.after === 0), channelTails);

  const fades = await page.evaluate(async () => {
    const h = makeOffline(3); h.audio.schedulingMusic = true; h.audio.pad(.05, 1.6, 64, .12, .3, 1); h.audio.schedulingMusic = false;
    const pause = h.ctx.suspend(.7), rendering = h.ctx.startRendering(); await pause; h.audio.setVolume(.1);
    await h.ctx.resume(); const buffer = await rendering;
    const result = { attack: metrics(buffer, .05, .1), body: metrics(buffer, .4, .65), fade: metrics(buffer, .8, 1.1), tail: metrics(buffer, 2.8, 3) }; h.dispose(); return result;
  });
  check('Soft pad attack, smooth volume fade and finite release to silence', fades.attack.rms < fades.body.rms && fades.fade.rms < fades.body.rms * .6 && fades.body.maxDelta < .02 && fades.fade.maxDelta < .02 && fades.tail.peak === 0, fades);

  console.log('Controls, launch contracts and cancellation passed; rendering four full 16-bar arrangements offline.');
  report.music = await page.evaluate(async () => {
    const results = [];
    for (const [mode, intensity] of [['battle', 0], ['battle', 1], ['forge', .2], ['victory', .6]]) {
      const step = mode === 'battle' ? .19 : mode === 'forge' ? .28 : .235, duration = .04 + step * 256;
      const h = makeOffline(duration + 2, 22050), a = h.audio;
      let peakVoices = 0, created = 0, steals = 0;
      const track = a.track.bind(a), oldest = a.releaseOldest.bind(a);
      a.track = (...args) => { track(...args); created++; peakVoices = Math.max(peakVoices, a.voices.size); };
      a.releaseOldest = () => { steals++; oldest(); };
      a.setIntensity(intensity); a.startMusic(mode); cancelTimer(a);
      let next = .1, suspended = h.ctx.suspend(next); const rendering = h.ctx.startRendering();
      while (next < duration) {
        await suspended; a.scheduleMusic(); cancelTimer(a);
        next += .1; suspended = h.ctx.suspend(next); await h.ctx.resume();
      }
      await suspended; const beats = a.beat; a.stopMusic(); await h.ctx.resume(); const buffer = await rendering;
      const bars = Array.from({ length: 16 }, (_, bar) => metrics(buffer, .04 + bar * 16 * step, .04 + (bar + 1) * 16 * step));
      results.push({ mode, intensity, peakVoices, created, steals, beats, ...metrics(buffer), bars, end: metrics(buffer, duration + .3).peak }); h.dispose();
    }
    return results;
  });
  check('All 16 bars in every arrangement render finite stereo music without voice stealing or clipping', report.music.every(r =>
    r.beats >= 256 && r.finite && r.peak < .8 && r.sideRatio > .01 && r.peakVoices <= 96 && r.steals === 0 && r.bars.every(b => b.rms > .0001) && r.end === 0));
  check('Battle intensity increases arrangement density and energy, not master volume', report.music[1].created > report.music[0].created * 1.4 && report.music[1].rms > report.music[0].rms * 1.1);
  check('Forge is calmer than high-intensity battle; victory ends with a quieter tonic resolution', report.music[2].rms < report.music[1].rms && report.music[3].bars[15].rms < report.music[3].bars[12].rms);
  const arrangements = await page.evaluate(() => {
    const h = makeOffline(1), a = h.audio, results = [];
    for (const mode of ['battle', 'forge', 'victory']) for (const hero of ['relay', 'helio', 'volt', 'bastion', 'zephyr', 'glacier']) {
      a.setHero(hero); a.tension = .8;
      const bars = [];
      for (let bar = 0; bar <= 16; bar++) {
        const notes = [];
        for (const method of ['tone', 'noise', 'pad', 'pluck']) a[method] = (...args) => notes.push([method, ...args]);
        for (let slot = 0; slot < 16; slot++) a.musicStep(slot * .19, bar * 16 + slot, .19, mode);
        bars.push({ signature: JSON.stringify(notes), layers: [...new Set(notes.map(n => n[0]))], notes: notes.length });
      }
      results.push({ mode, hero, bars });
    }
    h.dispose(); return results;
  });
  check('16-bar variation and later-pass revoicing for all six heroes/modes', arrangements.every(r => new Set(r.bars.slice(0, 16).map(b => b.signature)).size >= 12 && r.bars[0].signature !== r.bars[16].signature));
  check('Six subtle orchestration colours share melody, pads and plucked accompaniment', ['battle', 'forge', 'victory'].every(mode => {
    const rows = arrangements.filter(r => r.mode === mode);
    return new Set(rows.map(r => r.bars[0].signature)).size === 6 && rows.every(r => ['tone', 'pad', 'pluck'].every(layer => r.bars[0].layers.includes(layer)));
  }));
  const overload = await page.evaluate(async () => {
    const h = makeOffline(4), a = h.audio; a.setVolume(1); a.setIntensity(1); a.startMusic('battle'); cancelTimer(a);
    for (const event of [...legacy, ...expansion, ...upgrades]) a.play(event);
    const voices = a.voices.size, buffer = await h.ctx.startRendering(), ended = a.voices.size;
    const result = { voices, ended, ...metrics(buffer) }; h.dispose();
    const stress = makeOffline(2); for (let i = 0; i < 180; i++) { stress.audio.lastEvent.clear(); stress.audio.play(i % 2 ? 'special' : 'break'); }
    result.stressVoices = stress.audio.voices.size; stress.dispose(); return result;
  });
  check('Maximum-volume 22-FX mix plus music keeps limiter headroom, 96-voice cap and ended cleanup', overload.finite && overload.peak < .95 && overload.peak > .01 && overload.voices <= 96 && overload.stressVoices <= 96 && overload.ended === 0, overload);
  check('No browser errors', report.errors.length === 0, report.errors);
} catch (error) {
  report.errors.push(error.stack); process.exitCode = 1;
} finally {
  await browser?.close(); await new Promise(r => server.close(r));
  console.log(JSON.stringify(process.argv.includes('--json') ? report : {
    safety: report.safety, limits: report.limits, bundleBytes: report.bundleBytes,
    passed: report.checks.filter(c => c.passed).length, failed: report.checks.filter(c => !c.passed), errors: report.errors,
    eventRenders: report.events?.length, channelCombinations: report.channelMatrix?.length,
    music: report.music?.map(({ mode, intensity, peakVoices, created, steals, beats, peak, rms }) => ({ mode, intensity, peakVoices, created, steals, beats, peak, rms })),
  }, null, 2));
}

async function verifyFinalBundle() {
  const { startSparkboundQa } = await import('./serve-sparkbound-qa.mjs');
  const bundlePath = resolve(repo, 'sparkbound/game.js');
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  const before = hash(await readFile(bundlePath));
  const checks = [], errors = [];
  const check = (name, passed, detail) => {
    checks.push({ name, passed: Boolean(passed), ...(detail === undefined ? {} : { detail }) });
    assert.ok(passed, `${name}: ${JSON.stringify(detail)}`);
  };
  let harness, browser;
  try {
    harness = await startSparkboundQa({ port: 0 });
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--mute-audio'] });
    const fixture = harness.fixture;
    const newPage = async prefs => {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
      await context.addCookies([{ name: 'bq_session', value: fixture.cookie.value, url: harness.origin }]);
      await context.addInitScript(({ prefs, id, capability }) => {
        localStorage.setItem('bqSparkSettings', JSON.stringify({ volume: .55, reduced: false, ...prefs }));
        localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true');
        sessionStorage.setItem('brightQuestChildCapability', capability);
      }, { prefs, id: fixture.childId, capability: fixture.childCapability });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      // Synthetic responses only; shared bundle and all asset requests remain unmodified.
      await page.route('**/api/sparkbound', async route => {
        const response = await route.fetch(); const body = await response.json();
        if (route.request().method() === 'GET') body.state.match = null;
        await route.fulfill({ response, json: body });
      });
      const loaded = page.waitForResponse(response => new URL(response.url()).pathname === '/sparkbound/game.js');
      await page.goto(`${harness.origin}/sparkbound/`);
      check('Browser loaded the exact shared bundle', hash(await (await loaded).body()) === before);
      await page.waitForFunction(() => window.__SPARK_QA__ && document.querySelector('#game').getAttribute('aria-busy') === 'false', null, { timeout: 45000 });
      await page.evaluate(() => {
        const a = __SPARK_QA__.audio;
        window.audioRegression = { unlocks: [], plays: [], music: [] };
        const unlock = a.unlock.bind(a), play = a.play.bind(a), music = a.startMusic.bind(a);
        a.unlock = async (...args) => {
          audioRegression.unlocks.push({ trusted: navigator.userActivation.isActive, previous: a.context?.state || null });
          return unlock(...args);
        };
        a.play = event => {
          const count = [...a.voices].filter(v => !v.music).length; play(event);
          audioRegression.plays.push({ event, created: [...a.voices].filter(v => !v.music).length - count });
        };
        a.startMusic = mode => { audioRegression.music.push(mode); return music(mode); };
      });
      return { page, context };
    };
    for (const action of ['select-hero', 'preview-kit']) {
      for (const sound of [true, false]) {
        const { page, context } = await newPage({ sound, music: true, effects: true });
        try {
          check(`${action}: saved preference never creates a context before a gesture`, await page.evaluate(() => !__SPARK_QA__.audio.context && !__SPARK_QA__.audio.unlocked));
          const selector = action === 'select-hero' ? '[data-action="select-hero"][data-hero="helio"]' : '[data-action="preview-kit"][data-stage="1"]';
          await page.locator(selector).click();
          if (sound) await page.waitForFunction(() => __SPARK_QA__.audio.unlocked);
          const result = await page.evaluate(() => ({ ...audioRegression, running: __SPARK_QA__.audio.context?.state === 'running', voices: __SPARK_QA__.audio.voices.size, context: Boolean(__SPARK_QA__.audio.context) }));
          check(`${action}: master ${sound ? 'on unlocks on trusted click and plays select' : 'off remains silent without unlocking'}`, sound
            ? result.running && result.unlocks.length === 1 && result.unlocks[0].trusted && result.unlocks[0].previous === null && result.plays.some(p => p.event === 'select' && p.created > 0)
            : !result.context && !result.voices && !result.unlocks.length && result.plays.every(p => p.created === 0), result);
          if (sound) {
            await page.evaluate(() => {
              Object.defineProperty(document, 'hidden', { configurable: true, value: true });
              document.dispatchEvent(new Event('visibilitychange'));
            });
            await page.waitForFunction(() => __SPARK_QA__.audio.context.state === 'suspended');
            await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
            check(`${action}: visibility return does not auto-resume`, await page.evaluate(() => __SPARK_QA__.audio.context.state === 'suspended' && !__SPARK_QA__.audio.voices.size));
            await page.locator(selector).click();
            await page.waitForFunction(() => __SPARK_QA__.audio.context.state === 'running' && __SPARK_QA__.audio.voices.size > 0);
            check(`${action}: next trusted click resumes the suspended context`, await page.evaluate(() => audioRegression.unlocks.at(-1).trusted && audioRegression.unlocks.at(-1).previous === 'suspended' && audioRegression.plays.at(-1).created > 0));
          }
        } finally { await context.close(); }
      }
    }
    for (const prefs of [{ sound: true, music: false, effects: true }, { sound: true, music: true, effects: false }]) {
      const { page, context } = await newPage(prefs);
      try {
        await page.locator('[data-action="preview-kit"][data-stage="1"]').click();
        await page.waitForFunction(() => __SPARK_QA__.audio.unlocked);
        const result = await page.evaluate(() => ({ effectCreated: audioRegression.plays.some(p => p.created > 0), musicActive: [...__SPARK_QA__.audio.voices].some(v => v.music) }));
        check(`Saved independent preferences: music=${prefs.music}, effects=${prefs.effects}`, result.effectCreated === prefs.effects && result.musicActive === prefs.music, result);
      } finally { await context.close(); }
    }
    console.log('Shared-bundle preview gesture and preference checks passed; testing delayed completion during pause.');
    let completionTemplate;
    for (const pause of [true, false]) {
      const { page, context } = await newPage({ sound: true, music: true, effects: true });
      let release;
      try {
        let arrived, failed;
        const responseReady = new Promise((resolve, reject) => { arrived = resolve; failed = reject; });
        await page.route('**/api/sparkbound', async route => {
          if (route.request().method() !== 'POST') return route.fallback();
          try {
            if (!completionTemplate) {
              const response = await route.fetch(); const body = await response.json();
              assert.ok(response.ok() && body.state?.match, 'Synthetic start request must return a match');
              completionTemplate = body;
            }
            // Reuse the same synthetic outcome; the positive control must not start a second live match.
            const body = structuredClone(completionTemplate);
            body.state.match.phase = 'victory';
            const hold = new Promise(resolve => { release = resolve; }); arrived();
            await hold; await route.fulfill({ status: 200, json: body });
          } catch (error) { failed(error); await route.abort().catch(() => {}); }
        });
        await page.locator('[data-action="start"]').click();
        await Promise.race([responseReady, new Promise((_, reject) => setTimeout(() => reject(new Error('Delayed response not reached')), 15000))]);
        if (pause) {
          await page.locator('[data-action="pause"]').click();
          check('Pause clears all existing voices, tails and scheduling before the response arrives', await page.evaluate(() => {
            const a = __SPARK_QA__.audio; return document.querySelector('dialog').open && !a.voices.size && !a.spaces.size && !a.output && a.timer === null;
          }));
        }
        await page.evaluate(() => { audioRegression.plays = []; audioRegression.music = []; });
        release();
        await page.waitForFunction(() => __SPARK_QA__.state.match?.phase === 'victory' && document.querySelector('#game').getAttribute('aria-busy') === 'false');
        await page.waitForTimeout(250);
        const result = await page.evaluate(() => ({ plays: audioRegression.plays, music: audioRegression.music,
          dialogOpen: document.querySelector('dialog').open, voices: __SPARK_QA__.audio.voices.size,
          scheduling: __SPARK_QA__.audio.timer !== null, output: Boolean(__SPARK_QA__.audio.output) }));
        check(`Delayed victory ${pause ? 'stays silent behind Pause' : 'positive control plays normally'}`, pause
          ? result.dialogOpen && !result.plays.length && !result.music.length && !result.voices && !result.scheduling && !result.output
          : !result.dialogOpen && result.plays.some(p => p.event === 'victory' && p.created > 0) && result.music.includes('victory') && result.voices > 0, result);
        if (pause) {
          await page.getByRole('button', { name: 'Resume', exact: true }).click();
          await page.waitForFunction(() => __SPARK_QA__.audio.mode === 'victory' && __SPARK_QA__.audio.voices.size > 0);
          check('Explicit Resume starts the current victory score', true);
        }
      } finally { release?.(); await context.close(); }
    }
    check('No browser errors', !errors.length, errors);
    check('Shared bundle unchanged throughout targeted regression', hash(await readFile(bundlePath)) === before);
  } catch (error) { errors.push(error.stack); process.exitCode = 1; }
  finally {
    await browser?.close(); await harness?.close();
    console.log(JSON.stringify({ mode: 'final-bundle', passed: checks.filter(c => c.passed).length, failed: checks.filter(c => !c.passed), errors,
      bundleHash: before, checks, safety: 'Exact shared game.js; no rebuild or asset writes. Ephemeral synthetic API fixture. Chromium --mute-audio.',
      limits: ['Original music subjective quality remains unchecked: muted browser only.', 'Desktop Chromium targeted regression, not a full gameplay or device audit.'] }, null, 2));
  }
  if (process.exitCode) throw new Error('Final-bundle audio regression failed');
}
