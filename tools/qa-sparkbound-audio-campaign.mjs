import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Source-only TypeScript transform in memory. No app build, audio files or speaker playback.
const require = createRequire(import.meta.url);
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { transform } = require('esbuild');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(resolve(process.env.BQ_NODE_MODULES || resolve(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), 'playwright'))); }
const sourcePath = resolve(repo, 'sparkbound/src/sound.ts');
const source = await readFile(sourcePath, 'utf8');
const previous = execFileSync('git', ['show', 'HEAD:sparkbound/src/sound.ts'], { cwd: repo, encoding: 'utf8' });
const compile = async (text, globalName) => (await transform(text, { loader: 'ts', format: 'iife', globalName, target: 'es2022' })).code;
const report = { safety: 'Chromium --mute-audio; offline waveform inspection only; no app build or file writes.',
  limits: ['No subjective listening, device-speaker or Safari QA.', 'Main-agent gameplay integration is outside this audio-only test.'], checks: [], errors: [] };
const check = (name, passed, detail) => {
  report.checks.push({ name, passed: Boolean(passed), ...(detail === undefined ? {} : { detail }) });
  assert.ok(passed, `${name}: ${JSON.stringify(detail)}`);
};
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--mute-audio'] });
  const page = await browser.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  const html = `<!doctype html><button id="unlock">Unlock</button><script>
    ${await compile(source, 'SparkAudio')}
    ${await compile(previous, 'PreviousAudio')}
    window.a = new SparkAudio.GameAudio();
    window.initial = { context: a.context, enabled: a.enabled };
    document.querySelector('button').onclick = async () => { await a.unlock(); a.setEnabled(true); };
    a.setEnabled(true); a.setMusicEnabled(true); a.setEffectsEnabled(true); a.setHero('ember');
    a.play('flame'); a.startMusic('battle'); document.querySelector('button').click();
  </script>`;
  await page.route('http://127.0.0.1/spark-audio-qa', route => route.fulfill({ contentType: 'text/html', body: html }));
  await page.goto('http://127.0.0.1/spark-audio-qa');
  check('Setters and synthetic clicks never create or unlock audio', await page.evaluate(() =>
    !initial.context && !initial.enabled && !a.context && !a.unlocked && !a.voices.size));
  await page.click('#unlock');
  await page.waitForFunction(() => a.unlocked);
  const controls = await page.evaluate(async () => {
    const result = {}, context = a.context;
    a.startMusic('battle'); a.play('rocket');
    const timer = a.timer, beat = a.beat, room = a.spaces.get(true);
    for (const hero of ['ember', 'tidal', 'atlas', 'nova', 'echo', 'prism']) {
      a.setHero(hero); result[`hero-${hero}`] = a.hero === hero && a.timer === timer && a.beat === beat;
    }
    a.setHero('__proto__'); result.unknownHero = a.hero === 'relay';
    a.setEffectsEnabled(false); a.play('water');
    result.effectsIndependent = a.spaces.get(true) === room && a.timer === timer && [...a.voices].every(v => v.music) && !a.spaces.has(false);
    a.setEffectsEnabled(true); a.play('sonic');
    const effects = [...a.voices].filter(v => !v.music);
    a.setMusicEnabled(false); a.startMusic('forge');
    result.musicIndependent = effects.length > 0 && effects.every(v => a.voices.has(v)) && !a.spaces.has(true) && a.timer === null;
    a.setMusicEnabled(true);
    result.explicitMusicResume = a.mode === 'forge' && a.timer !== null;
    a.stop(); a.setMusicEnabled(false); a.setMusicEnabled(true);
    result.stopCannotAutoplay = !a.voices.size && !a.output && a.timer === null && a.requestedMode === null;
    a.startMusic('battle'); a.play('plasma'); a.setVolume(0);
    result.zeroStopsAll = !a.voices.size && !a.output && a.timer === null;
    a.setVolume(.12); result.volumeRestoreCannotAutoplay = !a.voices.size && a.timer === null;
    a.play('solar'); result.explicitEffectResumes = a.voices.size > 0 && a.context === context;
    a.setEnabled(false); a.play('rocket');
    result.masterMute = !a.voices.size && !a.output && a.timer === null;
    a.setEnabled(true); a.startMusic('victory'); a.play('flame');
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange')); await new Promise(r => setTimeout(r, 30));
    result.hiddenStopsAll = !a.voices.size && !a.output && a.timer === null && context.state === 'suspended';
    delete document.hidden; document.dispatchEvent(new Event('visibilitychange'));
    a.startMusic('battle'); a.play('flame');
    result.visibleCannotAutoplay = !a.voices.size && a.timer === null && context.state === 'suspended';
    return result;
  });
  for (const [name, passed] of Object.entries(controls)) check(name, passed);
  await page.click('#unlock');
  await page.waitForFunction(() => a.context.state === 'running');
  check('Pagehide stops new cues and music; disposal remains idempotent', await page.evaluate(async () => {
    a.startMusic('battle'); a.play('seismic'); window.dispatchEvent(new Event('pagehide'));
    await new Promise(r => setTimeout(r, 30));
    const quiet = !a.voices.size && !a.output && a.timer === null && a.context.state === 'suspended';
    Object.defineProperty(navigator, 'userActivation', { configurable: true, value: { isActive: true } });
    let finish; a.context.resume = () => new Promise(r => { finish = r; }); a.unlocked = false;
    const pending = a.unlock(); a.setEnabled(false); finish(); await pending;
    const cancelled = !a.unlocked && !a.voices.size && !a.output;
    delete navigator.userActivation;
    a.dispose(); a.dispose(); await a.unlock(); a.play('rocket');
    return quiet && cancelled && !a.context && !a.voices.size;
  }));
  await page.evaluate(() => {
    window.events = ['flame', 'water', 'seismic', 'plasma', 'sonic', 'rocket', 'solar'];
    window.aliases = { flame: ['weapon-flame', 'fire', 'weapon-fire'], water: ['weapon-water'], seismic: ['weapon-seismic'],
      plasma: ['weapon-plasma'], sonic: ['weapon-sonic'], rocket: ['weapon-rocket'], solar: ['weapon-solar'], arc: ['weapon-arc'] };
    window.legacy = ['select', 'round', 'servo', 'strike', 'launch', 'weapon-laser', 'weapon-arc', 'weapon-gravity', 'weapon-burst',
      'weapon-frost', 'impact', 'guard', 'break', 'special', 'charge', 'upgrade', 'upgrade-assembly', 'upgrade-stage2', 'correct', 'wrong', 'victory', 'step'];
    window.makeOffline = (seconds = 1.5, rate = 44100, AudioClass = SparkAudio.GameAudio, channels = 2) => {
      const ctx = new OfflineAudioContext(channels, Math.ceil(seconds * rate), rate), audio = new AudioClass();
      audio.context = ctx; audio.master = ctx.createGain(); audio.master.gain.value = .55 * .42;
      audio.enabled = true; audio.unlocked = true;
      audio.noiseBuffer = ctx.createBuffer(1, rate * 2, rate);
      const noise = audio.noiseBuffer.getChannelData(0); let seed = 123;
      for (let i = 0; i < noise.length; i++) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; noise[i] = seed / 2147483648 - 1; }
      audio.ready = () => !audio.disposed && audio.enabled && audio.volume > 0 && !document.hidden;
      return { ctx, audio, dispose: () => { audio.stop(); audio.context = null; audio.dispose(); } };
    };
    window.metrics = (buffer, start = 0, end = buffer.duration) => {
      const l = buffer.getChannelData(0), r = buffer.getChannelData(Math.min(1, buffer.numberOfChannels - 1));
      let peak = 0, sum = 0, delta = 0, finite = true, side = 0;
      const from = Math.round(start * buffer.sampleRate), to = Math.min(l.length, Math.round(end * buffer.sampleRate));
      for (let i = from; i < to; i++) {
        finite &&= Number.isFinite(l[i]) && Number.isFinite(r[i]);
        peak = Math.max(peak, Math.abs(l[i]), Math.abs(r[i])); sum += (l[i] ** 2 + r[i] ** 2) / 2;
        side += (l[i] - r[i]) ** 2;
        if (i > from) delta = Math.max(delta, Math.abs(l[i] - l[i - 1]), Math.abs(r[i] - r[i - 1]));
      }
      return { finite, peak, rms: Math.sqrt(sum / (to - from)), delta, side };
    };
    window.trace = (event, AudioClass = SparkAudio.GameAudio) => {
      const h = makeOffline(1, 44100, AudioClass), layers = [];
      for (const method of ['tone', 'noise', 'metal']) h.audio[method] = (...args) => layers.push({ method, args });
      h.audio.play(event); h.dispose(); return layers;
    };
  });
  const contracts = await page.evaluate(() => ({
    unchanged: legacy.every(event => JSON.stringify(trace(event)) === JSON.stringify(trace(event, PreviousAudio.GameAudio))),
    aliases: Object.entries(aliases).every(([event, names]) => names.every(name => JSON.stringify(trace(name)) === JSON.stringify(trace(event)))),
    distinct: new Set(events.map(event => JSON.stringify(trace(event)))).size === events.length,
    layers: events.map(event => ({ event, layers: trace(event) })),
    throttle: Object.entries(aliases).every(([event, names]) => {
      const h = makeOffline(); h.audio.play(event); const count = h.audio.voices.size;
      for (const name of names) h.audio.play(name);
      const ok = count > 0 && h.audio.voices.size === count; h.dispose(); return ok;
    }),
  }));
  check('All 22 existing weapon, movement and reward contracts unchanged from HEAD', contracts.unchanged);
  check('Plain and weapon IDs share identical cues and retrigger throttling', contracts.aliases && contracts.throttle);
  check('Seven distinct short launch cues, no timed contact or harsh noise bursts', contracts.distinct && contracts.layers.every(e => e.layers.every(({ method, args }) =>
    args[0] <= .08 && (method === 'tone' ? args[2] >= 200 && args[3] >= 200 && args[4] <= .065 : method === 'noise' && args[4] <= 2400 && args[2] <= .085 && args[5] === 'bandpass'))), contracts.layers);
  report.renders = await page.evaluate(async () => {
    const results = [];
    for (const rate of [44100, 48000]) for (const event of [...events, ...legacy]) {
      const h = makeOffline(3, rate); h.audio.play(event);
      const voices = h.audio.voices.size, end = Math.max(...[...h.audio.voices].map(v => v.end));
      const buffer = await h.ctx.startRendering();
      results.push({ event, rate, voices, end, ended: h.audio.voices.size, ...metrics(buffer), tail: metrics(buffer, 1, 3).peak }); h.dispose();
    }
    return results;
  });
  check('All 29 cues render finite stereo audio with headroom at 44.1 and 48 kHz', report.renders.every(r => r.finite && r.peak > .002 && r.peak < .8 && r.side > 0 && r.voices >= 2 && r.ended === 0));
  const newRenders = report.renders.filter(r => contracts.layers.some(e => e.event === r.event));
  check('New cues finish sources within 280 ms, have smooth transients and no late tails', newRenders.every(r => r.end <= .28 && r.tail === 0 && r.delta < .02), newRenders);
  const volume = await page.evaluate(async () => {
    const results = [];
    for (const event of events) for (const level of [.12, .55, 1]) {
      const h = makeOffline(); h.audio.volume = level; h.audio.master.gain.value = level * .42; h.audio.play(event);
      results.push({ event, level, ...metrics(await h.ctx.startRendering()) }); h.dispose();
    }
    return results;
  });
  check('Every new cue remains audible at reduced volume and bounded at maximum', contracts.layers.every(({ event }) => {
    const [low, normal, high] = volume.filter(r => r.event === event);
    return low.peak > .0001 && low.rms < normal.rms * .4 && normal.rms < high.rms && high.peak < .2;
  }), volume);
  const fade = await page.evaluate(async () => {
    const h = makeOffline(2), a = h.audio;
    a.schedulingMusic = true; a.pad(.01, 1.5, 64, .12, .3, 1); a.schedulingMusic = false;
    const paused = h.ctx.suspend(.65), rendering = h.ctx.startRendering(); await paused;
    a.setVolume(.12); a.play('water');
    await h.ctx.resume(); const buffer = await rendering;
    const result = { before: metrics(buffer, .4, .6), after: metrics(buffer, .85, 1.05) }; h.dispose(); return result;
  });
  check('Actual volume setter smoothly reduces an ongoing music/effect mix', fade.after.rms < fade.before.rms * .5 && fade.after.delta < .02, fade);
  const matrix = await page.evaluate(async () => {
    const results = [];
    for (const master of [false, true]) for (const music of [false, true]) for (const effects of [false, true]) {
      const h = makeOffline(); h.audio.setEnabled(master); h.audio.setMusicEnabled(music); h.audio.setEffectsEnabled(effects);
      h.audio.startMusic('battle'); clearTimeout(h.audio.timer); h.audio.timer = null; h.audio.play('plasma');
      const voices = [...h.audio.voices], buffer = await h.ctx.startRendering();
      results.push({ master, music, effects, musicVoices: voices.filter(v => v.music).length, effectsVoices: voices.filter(v => !v.music).length, ...metrics(buffer) }); h.dispose();
    }
    return results;
  });
  check('All eight independent master/music/effects combinations render correctly', matrix.every(r =>
    Boolean(r.musicVoices) === (r.master && r.music) && Boolean(r.effectsVoices) === (r.master && r.effects) && (r.peak > .0001) === (r.master && (r.music || r.effects))), matrix);
  const boundaries = await page.evaluate(async () => {
    const results = [];
    for (const event of events) for (const action of ['stop', 'effects-off', 'zero', 'restart']) {
      const h = makeOffline(); h.audio.play(event);
      h.audio.tone(.7, .2, 440, 440, .05, 'sine');
      const paused = h.ctx.suspend(.07), rendering = h.ctx.startRendering(); await paused;
      const at = h.ctx.currentTime;
      if (action === 'effects-off') h.audio.setEffectsEnabled(false);
      else if (action === 'zero') h.audio.setVolume(0);
      else h.audio.stop();
      const cleared = !h.audio.voices.size && !h.audio.spaces.has(false);
      if (action === 'restart') h.audio.tone(.4, .08, 640, 640, .05, 'sine', .006, 0, 0);
      await h.ctx.resume(); const buffer = await rendering;
      results.push({ event, action, cleared, before: metrics(buffer, 0, at).peak,
        after: metrics(buffer, at + .03, action === 'restart' ? .39 : 1.5).peak, late: metrics(buffer, .7, 1.5).peak,
        restart: action === 'restart' ? metrics(buffer, .4, .6).peak : 0 }); h.dispose();
    }
    return results;
  });
  check('Every new cue cancels actual tails and future sources; restart revives no old audio', boundaries.every(r =>
    r.cleared && r.before > .0001 && r.after === 0 && r.late === 0 && (r.action !== 'restart' || r.restart > .0001)), boundaries);
  const campaign = await page.evaluate(async () => {
    const results = [];
    for (const hero of ['ember', 'tidal', 'atlas', 'nova', 'echo', 'prism']) {
      const h = makeOffline(5), a = h.audio; a.setHero(hero); a.setVolume(1); a.setIntensity(1);
      let peakVoices = 0;
      // Six progression encounters: explicit scene/cue calls, not stage-dependent gain escalation.
      for (let stage = 1; stage <= 6; stage++) {
        a.startMusic(stage === 6 ? 'victory' : stage % 2 ? 'battle' : 'forge'); clearTimeout(a.timer); a.timer = null;
        for (const event of [...events, 'arc', 'strike', 'step', 'launch']) { a.lastEvent.clear(); a.play(event); }
        peakVoices = Math.max(peakVoices, a.voices.size);
      }
      const buffer = await h.ctx.startRendering();
      results.push({ hero, peakVoices, ended: a.voices.size, ...metrics(buffer) }); h.dispose();
    }
    const h = makeOffline(1.5, 44100, SparkAudio.GameAudio, 1);
    for (const event of events) h.audio.play(event);
    const mono = metrics(await h.ctx.startRendering()); h.dispose();
    return { heroes: results, mono };
  });
  check('Six-stage stress across six new hero colours respects 96 voices and limiter headroom', campaign.heroes.every(r => r.finite && r.peak > .002 && r.peak < .95 && r.peakVoices <= 96 && r.ended === 0), campaign.heroes);
  check('New cue mix remains finite and audible in mono', campaign.mono.finite && campaign.mono.peak > .002 && campaign.mono.peak < .8, campaign.mono);
  check('Source snapshot unchanged during QA', source === await readFile(sourcePath, 'utf8'));
  check('No browser errors', report.errors.length === 0, report.errors);
} catch (error) {
  report.errors.push(error.stack); process.exitCode = 1;
} finally {
  await browser?.close();
  console.log(JSON.stringify(process.argv.includes('--json') ? report : {
    safety: report.safety, limits: report.limits, passed: report.checks.filter(c => c.passed).length,
    failed: report.checks.filter(c => !c.passed), errors: report.errors, eventRenders: report.renders?.length,
  }, null, 2));
}
