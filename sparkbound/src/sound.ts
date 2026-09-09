type MusicMode = 'battle' | 'forge' | 'victory';
type Voice = { source: AudioScheduledSourceNode; nodes: AudioNode[]; end: number; music: boolean };
type Space = { output: GainNode; room: ConvolverNode; wet: GainNode };

const midi = (note: number) => 440 * 2 ** ((note - 69) / 12);
// Original 16-bar score: statement, answer, lifted reprise, then a breathing cadence.
const harmony = {
  battle: [[40, 3], [36, 4], [43, 4], [38, 4], [45, 3], [40, 3], [36, 4], [47, 4],
    [40, 3], [43, 4], [38, 4], [45, 3], [36, 4], [45, 3], [47, 5], [47, 4]],
  forge: [[48, 4], [53, 4], [45, 3], [55, 4], [48, 4], [52, 3], [53, 4], [55, 5],
    [48, 4], [45, 3], [53, 4], [52, 3], [50, 3], [55, 4], [48, 4], [48, 4]],
  victory: [[40, 4], [45, 4], [47, 4], [40, 4], [49, 3], [45, 4], [47, 5], [47, 4],
    [40, 4], [44, 3], [45, 4], [40, 4], [45, 4], [47, 4], [40, 4], [40, 4]],
} satisfies Record<MusicMode, number[][]>;

// Colour changes orchestration, not tempo/key or separate hero soundtracks.
const heroColours = {
  relay: { warmth: 1, shimmer: .16, pluck: 1, spread: .5 },
  helio: { warmth: .92, shimmer: .42, pluck: .9, spread: .55 },
  volt: { warmth: .96, shimmer: .23, pluck: 1.22, spread: .48 },
  bastion: { warmth: .72, shimmer: .08, pluck: .82, spread: .38 },
  zephyr: { warmth: 1.12, shimmer: .22, pluck: 1.08, spread: .68 },
  glacier: { warmth: .85, shimmer: .36, pluck: .84, spread: .72 },
  ember: { warmth: 1.08, shimmer: .18, pluck: .96, spread: .46 },
  tidal: { warmth: .9, shimmer: .3, pluck: .86, spread: .7 },
  atlas: { warmth: .76, shimmer: .1, pluck: .92, spread: .4 },
  nova: { warmth: .95, shimmer: .38, pluck: 1.12, spread: .6 },
  echo: { warmth: 1, shimmer: .26, pluck: 1.04, spread: .74 },
  prism: { warmth: .98, shimmer: .4, pluck: 1.06, spread: .62 },
};
type HeroId = keyof typeof heroColours;

// Plain effect IDs and equipment IDs share synthesis, variation and retrigger limits.
const effectAliases: Readonly<Record<string, string>> = {
  flame: 'weapon-flame', fire: 'weapon-flame', 'weapon-fire': 'weapon-flame',
  water: 'weapon-water', seismic: 'weapon-seismic', plasma: 'weapon-plasma',
  sonic: 'weapon-sonic', rocket: 'weapon-rocket', arc: 'weapon-arc', solar: 'weapon-solar',
};

/** Original Web Audio synthesis, not sampled effects or a recorded commercial score. */
export class GameAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private output: GainNode | null = null;
  private impulse: AudioBuffer | null = null;
  private musicImpulse: AudioBuffer | null = null;
  private spaces = new Map<boolean, Space>();
  private noiseBuffer: AudioBuffer | null = null;
  private voices = new Set<Voice>();
  private enabled = false;
  private musicEnabled = true;
  private effectsEnabled = true;
  private hero: HeroId = 'relay';
  private unlocked = false;
  private volume = .55;
  private disposed = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private mode: MusicMode | null = null;
  private requestedMode: MusicMode | null = null;
  private nextBeat = 0;
  private beat = 0;
  private generation = 0;
  private schedulingMusic = false;
  private intensity = .35;
  private tension = .35;
  private foot = 1;
  private variants = new Map<string, number>();
  private lastEvent = new Map<string, number>();
  private visibility = () => { if (document.hidden) { this.stop(); void this.context?.suspend().catch(() => {}); } };
  private pageHide = () => { this.stop(); void this.context?.suspend().catch(() => {}); };

  constructor() {
    document.addEventListener('visibilitychange', this.visibility);
    window.addEventListener('pagehide', this.pageHide);
  }

  async unlock(): Promise<void> {
    if (this.disposed || document.hidden) return;
    // Do not create/resume a context from timers or synthetic clicks. Older browsers enforce this themselves.
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    if (!this.context) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      try {
        this.context = new AudioContextClass();
        this.master = this.context.createGain(); this.master.gain.value = 0;
        this.ensureGraph();
        this.noiseBuffer = this.context.createBuffer(1, this.context.sampleRate * 2, this.context.sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        this.context.onstatechange = () => { if (this.context?.state !== 'running') this.stop(); };
      } catch { this.dispose(); return; }
    }
    try {
      const generation = this.generation;
      await this.context.resume();
      if (this.disposed || document.hidden || generation !== this.generation) return;
      this.unlocked = this.context.state === 'running'; this.applyVolume();
    } catch { this.unlocked = false; }
  }

  setEnabled(value: boolean) {
    this.enabled = Boolean(value);
    if (!this.enabled) this.stop();
    this.applyVolume();
  }

  /** Independent preference; never unlocks audio. Resume only the current, unpaused scene. */
  setMusicEnabled(value: boolean) {
    const enabled = Boolean(value);
    if (this.musicEnabled === enabled) return;
    this.musicEnabled = enabled;
    if (!enabled) this.stopMusic();
    else if (this.requestedMode) this.startMusic(this.requestedMode);
  }

  /** Cancels effects and their room tails without resetting or unducking the score. */
  setEffectsEnabled(value: boolean) {
    const enabled = Boolean(value);
    if (this.effectsEnabled === enabled) return;
    this.effectsEnabled = enabled;
    if (!enabled) { this.stopVoices(false); this.clearSpace(false); this.lastEvent.clear(); }
  }

  /** Unknown IDs use Relay. Colour applies to future notes without restarting the phrase. */
  setHero(id: string) {
    this.hero = Object.prototype.hasOwnProperty.call(heroColours, id) ? id as HeroId : 'relay';
  }

  setVolume(value: number) {
    if (!Number.isFinite(value)) return;
    this.volume = Math.max(0, Math.min(1, value));
    if (this.volume === 0) this.stop();
    this.applyVolume();
  }

  /** Battle tension, independent of listening volume. New notes ease towards 0..1. */
  setIntensity(value: number) {
    if (Number.isFinite(value)) this.intensity = Math.max(0, Math.min(1, value));
  }

  play(event: string) {
    if (!this.ready() || !this.effectsEnabled) return;
    if (Object.prototype.hasOwnProperty.call(effectAliases, event)) event = effectAliases[event];
    const t = this.context!.currentTime;
    if (t - (this.lastEvent.get(event) ?? -Infinity) < (event === 'step' ? .09 : .045)) return;
    this.lastEvent.set(event, t);
    // Small pitch variation prevents repeated contacts sounding like identical UI notifications.
    const take = (this.variants.get(event) ?? 0) + 1;
    this.variants.set(event, take);
    const variation = 1 + Math.sin(take * 2.39996) * .045;
    const side = Math.sin(take * 2.39996) * .42;
    if (['launch', 'strike', 'impact', 'break', 'special', 'round', 'victory',
      'weapon-laser', 'weapon-arc', 'weapon-gravity', 'weapon-burst', 'weapon-frost',
      'weapon-flame', 'weapon-water', 'weapon-seismic', 'weapon-plasma', 'weapon-sonic', 'weapon-rocket', 'weapon-solar',
      'upgrade-assembly', 'upgrade-stage2'].includes(event)) this.duck(t);
    switch (event) {
      case 'select':
        this.tone(t, .065, 740 * variation, 630, .032, 'sine', .003, side, .04);
        this.noise(t, .032, .038, 3200, 1700, 'bandpass', .002, -side, .03);
        this.tone(t + .024, .09, 1110 * variation, 1080, .014, 'sine', .003, -side, .1); break;
      case 'round':
        [0, 7, 12].forEach((note, i) => {
          this.tone(t + i * .14, .65, midi(52 + note), midi(52 + note), .075, 'triangle', .035, (i - 1) * .4, .3);
          this.metal(t + i * .14, .48, midi(64 + note), .028, (1 - i) * .3);
        });
        this.tone(t, .34, 116, 46, .19, 'sine');
        this.noise(t, .32, .1, 450, 2100, 'bandpass', .07, -.25, .25, .25); break;
      case 'servo':
        this.tone(t, .24, 155 * variation, 340, .055, 'sawtooth', .025, -.3, .08, .3);
        this.tone(t + .045, .21, 420, 170, .025, 'triangle', .02, .25, .12, -.2);
        this.noise(t, .22, .055, 1700, 650, 'bandpass', .025, side, .12);
        this.metal(t + .2, .09, 530 * variation, .022, .2); break;
      case 'strike':
        // Native attack start, NOT contact: air and motor movement only.
        this.noise(t, .115, .22, 850, 3600, 'bandpass', .012, -.65, .1, .45);
        this.tone(t, .16, 240 * variation, 470, .025, 'sawtooth', .025, -.4, .08, .4);
        this.tone(t + .03, .16, 580 * variation, 320, .014, 'sine', .025, .35, .12, -.2);
        this.noise(t + .065, .16, .065, 2400, 700, 'bandpass', .025, .4, .18, -.15); break;
      case 'launch':
        // Muzzle discharge only; the separate impact cue follows projectile arrival.
        this.tone(t, .24, 280 * variation, 65, .13, 'triangle', .007, -.4, .12, .35);
        this.noise(t, .18, .19, 2200, 450, 'bandpass', .004, -.5, .12, .55);
        this.tone(t + .02, .3, 720, 260, .035, 'sine', .015, -.35, .2, .45);
        this.metal(t + .035, .15, 410, .025, -.35); break;
      // All expansion cues are short muzzle/flight textures. No delayed contact, debris or sub hit.
      case 'weapon-flame':
        // Warm, rounded breath with a rising ember, not crackling white noise.
        this.noise(t, .23, .075, 620, 1400, 'bandpass', .025, -.3, .08, .25);
        this.tone(t, .24, 260 * variation, 390, .045, 'triangle', .025, -.2, .1, .2);
        this.tone(t + .025, .19, 520 * variation, 585, .016, 'sine', .02, .25, .1); break;
      case 'weapon-water':
        this.noise(t, .22, .05, 1700, 650, 'bandpass', .025, -.35, .1, .35);
        [0, .035, .07].forEach((offset, i) => this.tone(t + offset, .17 - i * .025,
          (560 + i * 140) * variation, 340 + i * 100, .035 / (1 + i * .4), 'sine', .014, (i - 1) * .3, .12)); break;
      case 'weapon-seismic':
        // A compact resonant motor pulse; contact and its bass transient stay with impact.
        this.tone(t, .25, 220 * variation, 275, .065, 'sine', .025, -.18, .08, .18);
        this.tone(t + .035, .2, 330 * variation, 412.5, .028, 'triangle', .024, .2, .1);
        this.noise(t, .18, .05, 450, 850, 'bandpass', .022, -.2, .06, .2); break;
      case 'weapon-plasma':
        this.tone(t, .21, 880 * variation, 440, .05, 'sine', .012, -.3, .1, .25);
        this.tone(t + .015, .22, 1320 * variation, 660, .024, 'triangle', .018, .3, .1, -.2);
        this.noise(t, .12, .035, 2400, 1200, 'bandpass', .015, side, .06); break;
      case 'weapon-sonic':
        [0, .04, .08].forEach((offset, i) => {
          const f = 440 * variation;
          this.tone(t + offset, .18, f, f * 1.125, .046 / (1 + i * .65), 'sine', .018, (i - 1) * .35, .09);
          this.tone(t + offset, .14, f * 1.5, f * 1.6875, .012 / (1 + i), 'sine', .02, (1 - i) * .25, .1);
        }); break;
      case 'weapon-rocket':
        // Soft ignition and an ascending flight whistle; never a timed explosion.
        this.noise(t, .25, .085, 700, 1900, 'bandpass', .018, -.35, .06, .4);
        this.tone(t, .24, 240 * variation, 480, .052, 'triangle', .018, -.3, .08, .35);
        this.tone(t + .035, .21, 600 * variation, 900, .018, 'sine', .025, -.2, .1, .4); break;
      case 'weapon-solar':
        [1, 1.5, 2].forEach((ratio, i) => this.tone(t + i * .02, .23 - i * .025,
          392 * ratio * variation, 440 * ratio, .045 / (1 + i * .8), 'sine', .025, (i - 1) * .3, .12));
        this.noise(t, .17, .028, 1200, 2200, 'bandpass', .03, -.2, .07, .2); break;
      case 'weapon-laser':
        this.tone(t, .19, 1550 * variation, 580, .065, 'sine', .008, -.35, .08, .45);
        this.tone(t + .012, .16, 2325 * variation, 870, .02, 'triangle', .009, .3, .1, -.1);
        this.noise(t, .085, .055, 4800, 2100, 'bandpass', .006, -.2, .05, .3); break;
      case 'weapon-arc':
        [0, .028, .063].forEach((offset, i) => {
          this.noise(t + offset, .052, .065 / (1 + i * .3), 3600 + i * 450, 1700, 'bandpass', .003, (i - 1) * .42, .07);
          this.tone(t + offset, .075, (820 + i * 310) * variation, 510 + i * 160, .028, 'triangle', .005, (1 - i) * .3, .09);
        }); break;
      case 'weapon-gravity':
        this.tone(t, .26, 220 * variation, 340, .07, 'sine', .035, -.25, .1, .25);
        this.tone(t, .23, 331 * variation, 510, .025, 'triangle', .03, .3, .12, -.3);
        this.noise(t, .21, .09, 650, 1600, 'bandpass', .025, -.45, .08, .4); break;
      case 'weapon-burst':
        [0, .043, .086].forEach((offset, i) => {
          this.tone(t + offset, .07, (620 + i * 75) * variation, 310 + i * 35, .045, 'triangle', .004, -.25 + i * .25, .05);
          this.noise(t + offset, .055, .075, 2800, 1100, 'bandpass', .004, -.4 + i * .4, .05);
        }); break;
      case 'weapon-frost':
        this.noise(t, .22, .085, 3800, 6800, 'highpass', .018, -.45, .13, .4);
        [1, 1.5, 2].forEach((ratio, i) => this.tone(t + i * .012, .2 - i * .025,
          1250 * ratio * variation, 1500 * ratio, .024 / (1 + i), 'sine', .012, (i - 1) * .45, .15)); break;
      case 'impact':
        this.tone(t, .34, 102 * variation, 34, .29, 'sine');
        this.tone(t, .16, 195 * variation, 48, .13, 'triangle', .003, .12, .08);
        this.noise(t, .095, .3, 2200, 380, 'lowpass');
        this.noise(t, .045, .15, 3600, 850, 'lowpass', .002, .3, .13);
        this.metal(t + .008, .28, 280 * variation, .07, side);
        this.noise(t + .065, .22, .07, 1900, 500, 'bandpass', .012, -side, .32); break;
      case 'guard':
        // A stable, luminous harmonic shell, deliberately unlike the falling attack transients.
        [1, 1.5, 2, 3].forEach((ratio, i) => this.tone(t + i * .009, .6 - i * .09,
          392 * ratio * variation, 392 * ratio * variation, .068 / (1 + i), 'sine', .005, (i % 2 ? 1 : -1) * .55, .38));
        this.noise(t, .075, .11, 4600, 2200, 'highpass', .002, side, .25);
        this.tone(t, .24, 125, 110, .11, 'sine', .007);
        this.noise(t + .07, .32, .038, 1800, 3100, 'bandpass', .08, -.5, .3, .5); break;
      case 'break':
        this.tone(t, .55, 150, 30, .3, 'sine');
        this.noise(t, .14, .32, 3800, 300, 'lowpass');
        this.metal(t + .025, .5, 215, .11);
        this.noise(t + .12, .4, .09, 900, 180, 'bandpass', .004, -.4, .3);
        [0, 1, 2].forEach(i => this.metal(t + .08 + i * .055, .2, (680 + i * 230) * variation, .03, (i - 1) * .65)); break;
      case 'special':
        this.noise(t, .7, .17, 500, 4300, 'bandpass', .2, -.7, .25, .7);
        this.tone(t, .5, 70, 210, .11, 'triangle', .12);
        this.tone(t + .34, .8, 125, 29, .3, 'sine');
        this.metal(t + .35, .8, 330, .09, -.45);
        this.metal(t + .4, .65, 495, .045, .55);
        this.noise(t + .35, .6, .2, 3000, 200, 'lowpass'); break;
      case 'charge':
        this.tone(t, .65, 52, 155, .1, 'triangle', .18);
        this.tone(t, .7, 105, 315, .035, 'sawtooth', .2);
        this.noise(t, .65, .11, 400, 2300, 'bandpass', .18, -.5, .22, .5);
        [0, 1, 2].forEach(i => this.tone(t + i * .14, .25, 220 + i * 80, 340 + i * 110, .025, 'sine', .045, (i - 1) * .5, .24)); break;
      case 'upgrade':
        this.noise(t, .3, .13, 1900, 350, 'bandpass');
        [164.81, 220, 329.63].forEach((f, i) => { this.metal(t + i * .13, .6, f, .045, (i - 1) * .4); });
        this.tone(t, .55, 80, 55, .14, 'sine'); break;
      case 'upgrade-assembly':
        // Earned equipment fitting: a small motor, two seated locks, then a warm confirmation.
        this.noise(t, .24, .065, 1450, 520, 'bandpass', .025, -.3, .12, .25);
        this.tone(t, .22, 210, 360, .025, 'triangle', .025, -.25, .1, .2);
        [0, .11].forEach((offset, i) => this.metal(t + offset, .16, 480 + i * 160, .019, i ? .3 : -.3));
        [52, 59, 64].forEach((note, i) => this.tone(t + .2 + i * .08, .48, midi(note), midi(note), .035 / (1 + i * .2), 'triangle', .028, (i - 1) * .3, .28)); break;
      case 'upgrade-stage2':
        // Fuller major-sixth resolution celebrates the second earned stage, not a louder impact.
        this.noise(t, .32, .055, 1100, 2600, 'bandpass', .08, -.4, .2, .4);
        [52, 59, 64, 68, 73, 76].forEach((note, i) => {
          this.tone(t + i * .075, .85 - i * .045, midi(note), midi(note), .034 / (1 + i * .25), 'triangle', .04, (i % 2 ? 1 : -1) * .35, .32);
          this.tone(t + .015 + i * .075, .45, midi(note + 12), midi(note + 12), .006, 'sine', .018, (i % 2 ? -1 : 1) * .45, .38);
        }); break;
      case 'correct':
        this.noise(t, .075, .06, 1900, 800, 'bandpass');
        this.metal(t, .36, 329.63, .04, -.25); this.metal(t + .1, .4, 440, .04, .25); break;
      case 'wrong':
        this.tone(t, .23, 180, 125, .055, 'triangle', .025);
        this.noise(t, .2, .06, 650, 300, 'bandpass'); break;
      case 'victory':
        [164.81, 220, 277.18, 329.63].forEach((f, i) => {
          this.tone(t + i * .17, 1.2, f, f * .998, .06, 'triangle', .12, (i - 1.5) * .3, .32);
          this.metal(t + i * .17, .8, f * 2, .027, (1.5 - i) * .35);
        });
        this.noise(t, 1.1, .08, 800, 2200, 'bandpass', .2); break;
      case 'step':
        this.foot *= -1;
        this.noise(t, .075, .105, 750 * variation, 160, 'lowpass', .003, this.foot * .3, .07);
        this.tone(t, .095, 88 * variation, 42, .095, 'sine', .004, this.foot * .2, .04);
        this.metal(t + .02, .07, 260 * variation, .018, this.foot * .35); break;
    }
  }

  startMusic(mode: MusicMode) {
    if (!this.ready() || !['battle', 'forge', 'victory'].includes(mode)) return;
    this.requestedMode = mode;
    if (!this.musicEnabled) return;
    if (this.mode === mode && this.timer !== null) return;
    this.stopMusic(); this.mode = mode; this.beat = 0; this.tension = this.intensity;
    this.nextBeat = this.context!.currentTime + .04;
    this.scheduleMusic();
  }

  /** Pause boundary: stops effects, future scheduled notes and all music scheduling. */
  stop() {
    this.generation++;
    this.requestedMode = null;
    // Gate AFTER the compressor: even its look-ahead buffer must not leak on pause.
    if (this.output && this.context) {
      this.output.gain.cancelScheduledValues(this.context.currentTime);
      this.output.gain.setValueAtTime(0, this.context.currentTime);
    }
    this.stopMusic(); this.lastEvent.clear();
    for (const voice of [...this.voices]) {
      try { voice.source.stop(); } catch { /* A source may already have ended. */ }
      this.release(voice);
    }
    for (const music of [...this.spaces.keys()]) this.clearSpace(music);
    this.master?.disconnect(); this.limiter?.disconnect(); this.output?.disconnect();
    this.limiter = null; this.output = null;
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    document.removeEventListener('visibilitychange', this.visibility);
    window.removeEventListener('pagehide', this.pageHide);
    this.master?.disconnect(); this.limiter?.disconnect();
    if (this.context) { this.context.onstatechange = null; void this.context.close().catch(() => {}); }
    this.context = null; this.master = null; this.limiter = null; this.noiseBuffer = null; this.impulse = null; this.musicImpulse = null;
    this.variants.clear();
    this.unlocked = false;
  }

  private ready() { return !this.disposed && this.enabled && this.volume > 0 && this.unlocked && !document.hidden && this.context?.state === 'running'; }
  private applyVolume() {
    if (!this.master || !this.context || this.disposed) return;
    const t = this.context.currentTime;
    this.master.gain.cancelScheduledValues(t);
    if (!this.enabled || !this.unlocked || document.hidden) this.master.gain.setValueAtTime(0, t);
    else this.master.gain.setTargetAtTime(this.volume * .42, t, .025);
  }

  private ensureGraph() {
    if (this.output) return;
    const ctx = this.context!;
    this.master!.disconnect();
    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -14; this.limiter.knee.value = 12;
    this.limiter.ratio.value = 5; this.limiter.attack.value = .004; this.limiter.release.value = .17;
    this.output = ctx.createGain();
    this.master!.connect(this.limiter); this.limiter.connect(this.output); this.output.connect(ctx.destination);
  }

  private space(music: boolean) {
    this.ensureGraph();
    const existing = this.spaces.get(music);
    if (existing) return existing;
    const ctx = this.context!;
    if (!this.impulse) {
      // Short original stereo room: asymmetric early reflections and a damped diffuse decay.
      this.impulse = ctx.createBuffer(2, Math.ceil(ctx.sampleRate * .34), ctx.sampleRate);
      let seed = 719;
      for (let channel = 0; channel < 2; channel++) {
        const data = this.impulse.getChannelData(channel);
        for (let i = 0; i < data.length; i++) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          const time = i / ctx.sampleRate;
          data[i] = time < .012 ? 0 : (seed / 2147483648 - 1) * .012 * Math.exp(-time * 22) * (1 - i / data.length);
        }
        [.017, .031, .053, .079].forEach((time, i) => {
          data[Math.round((time + channel * (.003 + i * .001)) * ctx.sampleRate)] += .42 / (i + 1);
        });
      }
    }
    if (music && !this.musicImpulse) {
      // A separate damped hall keeps the score spacious without lengthening muzzle cues.
      this.musicImpulse = ctx.createBuffer(2, Math.ceil(ctx.sampleRate * 1.1), ctx.sampleRate);
      let seed = 1709;
      for (let channel = 0; channel < 2; channel++) {
        const data = this.musicImpulse.getChannelData(channel); let smooth = 0;
        for (let i = 0; i < data.length; i++) {
          seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
          smooth = smooth * .75 + (seed / 2147483648 - 1) * .25;
          const time = i / ctx.sampleRate;
          data[i] = time < .025 ? 0 : smooth * .045 * Math.exp(-time * 6) * (1 - i / data.length);
        }
        [.029, .047, .083, .131].forEach((time, i) => {
          data[Math.round((time + channel * .007) * ctx.sampleRate)] += .3 / (i + 1);
        });
      }
    }
    const output = ctx.createGain(), room = ctx.createConvolver(), wet = ctx.createGain();
    room.normalize = false; room.buffer = music ? this.musicImpulse : this.impulse; wet.gain.value = .65;
    room.connect(wet); wet.connect(output); output.connect(this.master!);
    const space = { output, room, wet };
    this.spaces.set(music, space);
    return space;
  }

  private clearSpace(music: boolean) {
    const space = this.spaces.get(music);
    if (!space) return;
    space.room.disconnect(); space.wet.disconnect(); space.output.disconnect();
    this.spaces.delete(music);
  }

  private spatial(gain: GainNode, t: number, duration: number, pan: number, room: number, panEnd: number) {
    const ctx = this.context!, space = this.space(this.schedulingMusic);
    const panner = ctx.createStereoPanner(), send = ctx.createGain();
    panner.pan.setValueAtTime(pan, t); panner.pan.linearRampToValueAtTime(panEnd, t + duration);
    send.gain.value = room;
    gain.connect(panner); panner.connect(space.output); panner.connect(send); send.connect(space.room);
    return [panner, send];
  }

  private duck(t: number) {
    const bus = this.spaces.get(true)?.output.gain;
    if (!bus) return;
    bus.cancelScheduledValues(t); bus.setValueAtTime(bus.value, t);
    bus.linearRampToValueAtTime(.58, t + .018);
    bus.setTargetAtTime(1, t + .12, .16);
  }

  private envelope(gain: GainNode, t: number, duration: number, level: number, attack: number) {
    gain.gain.setValueAtTime(.0001, t);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0001, level), t + Math.min(attack, duration * .4));
    gain.gain.exponentialRampToValueAtTime(.0001, t + duration);
  }

  private track(source: AudioScheduledSourceNode, nodes: AudioNode[], t: number, duration: number) {
    if (this.voices.size >= 96) this.releaseOldest();
    const voice = { source, nodes, end: t + duration + .015, music: this.schedulingMusic };
    this.voices.add(voice); source.onended = () => this.release(voice);
    source.start(t); source.stop(voice.end);
  }

  private release(voice: Voice) {
    voice.source.onended = null; voice.source.disconnect(); voice.nodes.forEach(node => node.disconnect());
    this.voices.delete(voice);
  }

  private releaseOldest() {
    const voice = [...this.voices].find(voice => voice.music) ?? this.voices.values().next().value;
    if (voice) { try { voice.source.stop(); } catch {} this.release(voice); }
  }

  private tone(t: number, duration: number, from: number, to: number, level: number, type: OscillatorType, attack = .006, pan = 0, room = .14, panEnd = pan) {
    const ctx = this.context!;
    const oscillator = ctx.createOscillator(), gain = ctx.createGain(), filter = ctx.createBiquadFilter();
    oscillator.type = type; oscillator.frequency.setValueAtTime(from, t);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + duration);
    filter.type = 'lowpass'; filter.frequency.value = type === 'sawtooth' ? 950 : 5000; filter.Q.value = .5;
    this.envelope(gain, t, duration, level, attack);
    oscillator.connect(filter); filter.connect(gain);
    this.track(oscillator, [filter, gain, ...this.spatial(gain, t, duration, pan, room, panEnd)], t, duration);
  }

  private noise(t: number, duration: number, level: number, from: number, to: number, type: BiquadFilterType, attack = .004, pan = 0, room = .14, panEnd = pan) {
    const ctx = this.context!, source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = this.noiseBuffer; source.loop = true;
    filter.type = type; filter.Q.value = .8;
    filter.frequency.setValueAtTime(from, t); filter.frequency.exponentialRampToValueAtTime(to, t + duration);
    this.envelope(gain, t, duration, level, attack);
    source.connect(filter); filter.connect(gain);
    this.track(source, [filter, gain, ...this.spatial(gain, t, duration, pan, room, panEnd)], t, duration);
  }

  private metal(t: number, duration: number, fundamental: number, level: number, pan = 0) {
    [1, 1.483, 2.137, 3.19].forEach((ratio, i) => this.tone(t + i * .0015, duration / (1 + i * .4), fundamental * ratio, fundamental * ratio * .97, level / (1 + i * 1.5), 'sine', .003, Math.max(-1, Math.min(1, pan + (i % 2 ? .12 : -.12))), .26));
  }

  private pad(t: number, duration: number, note: number, level: number, pan: number, warmth: number) {
    const ctx = this.context!, frequency = midi(note);
    [-1, 1].forEach(side => {
      const source = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
      source.type = 'sawtooth'; source.frequency.value = frequency;
      source.detune.setValueAtTime(side * 4, t);
      source.detune.linearRampToValueAtTime(side * 7, t + duration);
      filter.type = 'lowpass'; filter.Q.value = .4;
      filter.frequency.setValueAtTime(frequency * 1.4, t);
      filter.frequency.linearRampToValueAtTime(frequency * (2.2 + warmth), t + duration * .35);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, t + duration);
      gain.gain.setValueAtTime(.0001, t);
      gain.gain.linearRampToValueAtTime(level * .5, t + Math.min(.55, duration * .2));
      gain.gain.linearRampToValueAtTime(level * .38, t + duration * .68);
      gain.gain.exponentialRampToValueAtTime(.0001, t + duration);
      source.connect(filter); filter.connect(gain);
      this.track(source, [filter, gain, ...this.spatial(gain, t, duration, pan + side * .09, .48, pan)], t, duration);
    });
  }

  private pluck(t: number, note: number, level: number, pan: number, duration = .48) {
    const f = midi(note);
    this.tone(t, duration, f * 1.003, f, level, 'triangle', .006, pan, .28);
    this.tone(t, duration * .32, f * 2, f * 2, level * .23, 'sine', .004, pan, .32);
  }

  private stopMusic() {
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null; this.mode = null;
    this.stopVoices(true);
    this.clearSpace(true);
  }

  private stopVoices(music: boolean) {
    for (const voice of [...this.voices]) {
      if (voice.music !== music) continue;
      try { voice.source.stop(); } catch {}
      this.release(voice);
    }
  }

  private scheduleMusic = () => {
    if (!this.ready() || !this.mode) { this.stop(); return; }
    if (!this.musicEnabled) { this.stopMusic(); return; }
    const ctx = this.context!, mode = this.mode;
    const step = mode === 'battle' ? .19 : mode === 'forge' ? .28 : .235;
    if (this.nextBeat < ctx.currentTime) this.nextBeat = ctx.currentTime + .025;
    this.schedulingMusic = true;
    try {
      while (this.nextBeat < ctx.currentTime + .16) {
        this.tension += (this.intensity - this.tension) * .18;
        this.musicStep(this.nextBeat, this.beat, step, mode);
        this.beat++; this.nextBeat += step;
      }
    } finally { this.schedulingMusic = false; }
    this.timer = setTimeout(this.scheduleMusic, 70);
  };

  private musicStep(t: number, beat: number, step: number, mode: MusicMode) {
    const bar = Math.floor(beat / 16), slot = beat % 16, phrase = bar % 16, pass = Math.floor(bar / 16);
    const [rootNote, third] = harmony[mode][phrase], root = midi(rootNote);
    const energy = mode === 'battle' ? this.tension : mode === 'forge' ? .15 : .55;
    const colour = heroColours[this.hero], lift = phrase >= 8 && phrase < 14;
    const resolved = mode !== 'battle' && phrase >= 14;
    const breath = phrase % 8 === 7 || resolved;
    if (slot === 0) {
      const notes = [12, third + 12, 19, resolved ? 24 : pass % 2 ? 26 : 24];
      notes.forEach((note, i) => {
        const pan = [-1, 1, -.5, .5][i] * colour.spread;
        this.pad(t + i * .012, step * (resolved ? 16 : 18), rootNote + note,
          (mode === 'forge' ? .022 : .026) / (1 + i * .3), pan, colour.warmth);
      });
      this.tone(t, step * (resolved ? 13 : 7), root, root, .03 + energy * .012, 'sine', .055, 0, .12);
    }

    // The rising fifth, upper neighbour and descending answer recur as one recognisable theme.
    const rhythms = [[0, 6, 8, 14], [0, 8, 12], [2, 6, 10], [0, 8]];
    const contours = [[0, 7, 12, 7], [third, 2, 0], [7, 12, third + 12], [2, 0]];
    const cell = phrase % 4, index = rhythms[cell].indexOf(slot);
    if (index >= 0 && !(breath && slot > 0) && (mode !== 'forge' || cell % 2 === 0 || index === 0)) {
      const interval = resolved ? 0 : contours[cell][index];
      const note = rootNote + 24 + interval;
      const f = midi(note), duration = step * (resolved ? 12 : index === rhythms[cell].length - 1 ? 4.5 : 3.2);
      const level = (mode === 'forge' ? .017 : .029 + energy * .01) * (lift ? 1.08 : 1);
      this.tone(t, duration, f * .999, f, level, 'triangle', .035, -.12, .4);
      if (mode !== 'forge') this.tone(t + .009, duration * .9, f / 2, f / 2, level * .25, 'sawtooth', .06, .12, .35);
      this.tone(t + .014, duration * .8, f * 2.001, f * 2, level * colour.shimmer, 'sine', .025, colour.spread, .48);
      if (lift && energy > .5) this.pluck(t + step, note - 12, .009, -.45);
    }

    const pizzSlots = mode === 'forge' ? [2, 10] : lift ? [0, 3, 6, 8, 11, 14] : [0, 6, 8, 14];
    if (pizzSlots.includes(slot) && !(breath && slot > 6) && !resolved) {
      const chord = [12, 19, third + 12, 19];
      this.pluck(t + .008, rootNote + chord[(pizzSlots.indexOf(slot) + pass) % 4],
        (.014 + energy * .014) * colour.pluck, -.36, mode === 'forge' ? .7 : .4);
    }
    if (!breath && (mode === 'victory' || mode === 'battle' && energy > .4) && slot % 2 === 1) {
      const arpeggio = [24, 19, third + 24, 19, 26, 24, third + 24, 31];
      const note = rootNote + arpeggio[(Math.floor(slot / 2) + (lift ? 2 : 0) + pass) % 8];
      this.pluck(t + .012, note, .008 + energy * .008, slot % 4 === 1 ? .48 : -.48, step * 1.8);
    }
    if (mode !== 'battle') {
      if (mode === 'victory' && !breath && [0, 8].includes(slot)) {
        this.tone(t, .25, 100, 55, .05, 'sine', .008, 0, .2);
        this.noise(t, .09, .012, 2600, 900, 'bandpass', .008, .3, .22);
      }
      return;
    }
    if (slot === 0 || slot === 8 || (!breath && energy > .55 && [6, 14].includes(slot))) {
      this.tone(t, .22, 110, 39, .065 + energy * .065, 'sine', .004, 0, .08);
      this.noise(t, .035, .025 + energy * .02, 1700, 350, 'lowpass', .002, 0, .08);
    }
    if ([0, 6, 8, 14].includes(slot) && !(breath && slot > 8)) {
      const f = slot === 14 && pass % 2 ? root * 1.5 : root;
      this.tone(t, step * 1.6, f, f, .03 + energy * .025, 'triangle', .012, -.08, .08);
    }
    if ([4, 12].includes(slot) && energy > .18) {
      this.noise(t + .008, .12, .022 + energy * .033, 2300, 650, 'bandpass', .003, .18, .27);
      this.tone(t, .1, 210, 140, .025, 'triangle', .003, .15, .18);
    }
    if (energy > .4 && slot % 2 === (bar % 2) && !(breath && slot > 8)) {
      this.noise(t, slot === 14 ? .12 : .04, .008 + energy * .013, 6500, 3100, 'highpass', .002, slot % 4 ? -.55 : .55, .15);
    }
    if (energy > .7 && bar % 4 === 3 && [13, 15].includes(slot)) {
      this.metal(t, .13, 185 + slot * 11, .009, slot === 13 ? -.5 : .5);
      this.tone(t, .15, 165, 70, .045, 'sine', .004, slot === 13 ? -.3 : .3, .2);
    }
  }
}
