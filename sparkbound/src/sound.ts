type MusicMode = 'battle' | 'forge' | 'victory';
type Voice = { source: AudioScheduledSourceNode; nodes: AudioNode[]; end: number; music: boolean };

/** Original Web Audio synthesis, not sampled effects or a recorded commercial score. */
export class GameAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private voices = new Set<Voice>();
  private enabled = false;
  private unlocked = false;
  private volume = .55;
  private disposed = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private mode: MusicMode | null = null;
  private nextBeat = 0;
  private beat = 0;
  private generation = 0;
  private schedulingMusic = false;
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
        this.limiter = this.context.createDynamicsCompressor();
        this.limiter.threshold.value = -14; this.limiter.knee.value = 12;
        this.limiter.ratio.value = 5; this.limiter.attack.value = .004; this.limiter.release.value = .17;
        this.master.connect(this.limiter); this.limiter.connect(this.context.destination);
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

  setVolume(value: number) {
    if (!Number.isFinite(value)) return;
    this.volume = Math.max(0, Math.min(1, value)); this.applyVolume();
  }

  play(event: string) {
    if (!this.ready()) return;
    const t = this.context!.currentTime;
    if (t - (this.lastEvent.get(event) ?? -Infinity) < (event === 'step' ? .09 : .045)) return;
    this.lastEvent.set(event, t);
    // Small pitch variation prevents repeated contacts sounding like identical UI notifications.
    const variation = .96 + Math.random() * .08;
    switch (event) {
      case 'strike':
        this.noise(t, .19, .2, 1400, 400, 'bandpass');
        this.tone(t + .035, .16, 175 * variation, 58, .21, 'triangle');
        this.tone(t, .12, 360, 130, .035, 'sawtooth'); break;
      case 'impact':
        this.tone(t, .34, 102 * variation, 34, .29, 'sine');
        this.noise(t, .095, .3, 2200, 380, 'lowpass');
        this.metal(t + .008, .28, 280 * variation, .07); break;
      case 'guard':
        this.metal(t, .38, 470 * variation, .095);
        this.noise(t, .25, .16, 2800, 650, 'bandpass');
        this.tone(t, .2, 110, 75, .13, 'sine'); break;
      case 'break':
        this.tone(t, .55, 150, 30, .3, 'sine');
        this.noise(t, .14, .32, 3800, 300, 'lowpass');
        this.metal(t + .025, .5, 215, .11);
        this.noise(t + .12, .4, .09, 900, 180, 'bandpass'); break;
      case 'special':
        this.noise(t, .7, .17, 500, 4300, 'bandpass', .2);
        this.tone(t, .5, 70, 210, .11, 'triangle', .12);
        this.tone(t + .34, .8, 125, 29, .3, 'sine');
        this.metal(t + .35, .8, 330, .09);
        this.noise(t + .35, .6, .2, 3000, 200, 'lowpass'); break;
      case 'charge':
        this.tone(t, .65, 52, 155, .1, 'triangle', .18);
        this.tone(t, .7, 105, 315, .035, 'sawtooth', .2);
        this.noise(t, .65, .11, 400, 2300, 'bandpass', .18); break;
      case 'upgrade':
        this.noise(t, .3, .13, 1900, 350, 'bandpass');
        [164.81, 220, 329.63].forEach((f, i) => { this.metal(t + i * .13, .6, f, .045); });
        this.tone(t, .55, 80, 55, .14, 'sine'); break;
      case 'correct':
        this.noise(t, .075, .06, 1900, 800, 'bandpass');
        this.metal(t, .36, 329.63, .04); this.metal(t + .1, .4, 440, .04); break;
      case 'wrong':
        this.tone(t, .23, 180, 125, .055, 'triangle', .025);
        this.noise(t, .2, .06, 650, 300, 'bandpass'); break;
      case 'victory':
        [164.81, 220, 277.18, 329.63].forEach((f, i) => {
          this.tone(t + i * .17, 1.2, f, f * .998, .06, 'triangle', .12);
          this.metal(t + i * .17, .8, f * 2, .027);
        });
        this.noise(t, 1.1, .08, 800, 2200, 'bandpass', .2); break;
      case 'step':
        this.noise(t, .085, .14, 750, 160, 'lowpass');
        this.tone(t, .095, 88 * variation, 42, .095, 'sine');
        this.tone(t + .02, .09, 260, 160, .018, 'sawtooth'); break;
    }
  }

  startMusic(mode: MusicMode) {
    if (!this.ready() || !['battle', 'forge', 'victory'].includes(mode)) return;
    if (this.mode === mode && this.timer !== null) return;
    this.stopMusic(); this.mode = mode; this.beat = 0; this.nextBeat = this.context!.currentTime + .04;
    this.scheduleMusic();
  }

  /** Pause boundary: stops effects, future scheduled notes and all music scheduling. */
  stop() {
    this.generation++;
    this.stopMusic(); this.lastEvent.clear();
    for (const voice of [...this.voices]) {
      try { voice.source.stop(); } catch { /* A source may already have ended. */ }
      this.release(voice);
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true; this.stop();
    document.removeEventListener('visibilitychange', this.visibility);
    window.removeEventListener('pagehide', this.pageHide);
    this.master?.disconnect(); this.limiter?.disconnect();
    if (this.context) { this.context.onstatechange = null; void this.context.close().catch(() => {}); }
    this.context = null; this.master = null; this.limiter = null; this.noiseBuffer = null;
    this.unlocked = false;
  }

  private ready() { return !this.disposed && this.enabled && this.unlocked && !document.hidden && this.context?.state === 'running'; }
  private applyVolume() {
    if (!this.master || !this.context || this.disposed) return;
    const t = this.context.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setTargetAtTime(this.enabled && this.unlocked ? this.volume * .42 : 0, t, .025);
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
    const voice = this.voices.values().next().value as Voice | undefined;
    if (voice) { try { voice.source.stop(); } catch {} this.release(voice); }
  }

  private tone(t: number, duration: number, from: number, to: number, level: number, type: OscillatorType, attack = .006) {
    const ctx = this.context!;
    const oscillator = ctx.createOscillator(), gain = ctx.createGain(), filter = ctx.createBiquadFilter();
    oscillator.type = type; oscillator.frequency.setValueAtTime(from, t);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + duration);
    filter.type = 'lowpass'; filter.frequency.value = type === 'sawtooth' ? 950 : 5000; filter.Q.value = .5;
    this.envelope(gain, t, duration, level, attack);
    oscillator.connect(filter); filter.connect(gain); gain.connect(this.master!);
    this.track(oscillator, [filter, gain], t, duration);
  }

  private noise(t: number, duration: number, level: number, from: number, to: number, type: BiquadFilterType, attack = .004) {
    const ctx = this.context!, source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = this.noiseBuffer; source.loop = true;
    filter.type = type; filter.Q.value = .8;
    filter.frequency.setValueAtTime(from, t); filter.frequency.exponentialRampToValueAtTime(to, t + duration);
    this.envelope(gain, t, duration, level, attack);
    source.connect(filter); filter.connect(gain); gain.connect(this.master!);
    this.track(source, [filter, gain], t, duration);
  }

  private metal(t: number, duration: number, fundamental: number, level: number) {
    [1, 1.483, 2.137, 3.19].forEach((ratio, i) => this.tone(t, duration / (1 + i * .4), fundamental * ratio, fundamental * ratio * .97, level / (1 + i * 1.5), 'sine'));
  }

  private stopMusic() {
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null; this.mode = null;
    for (const voice of [...this.voices]) {
      if (!voice.music) continue;
      try { voice.source.stop(); } catch {}
      this.release(voice);
    }
  }

  private scheduleMusic = () => {
    if (!this.ready() || !this.mode) { this.stop(); return; }
    const ctx = this.context!, mode = this.mode;
    const step = mode === 'battle' ? .375 : .5;
    if (this.nextBeat < ctx.currentTime) this.nextBeat = ctx.currentTime + .025;
    this.schedulingMusic = true;
    while (this.nextBeat < ctx.currentTime + .16) {
      const t = this.nextBeat, beat = this.beat;
      const progression = mode === 'victory' ? [164.81, 146.83, 220, 164.81] : [82.41, 73.42, 98, 82.41];
      const root = progression[Math.floor(beat / 16) % 4];
      if (beat % 8 === 0) {
        [1, 1.5, 2.002].forEach((ratio, i) => this.tone(t, step * 9, root * ratio, root * ratio * .999, .027 / (1 + i * .3), 'triangle', .45));
        this.noise(t, step * 7, .012, 500, 850, 'bandpass', .5);
      }
      if (mode === 'battle') {
        if (beat % 4 === 0 || beat % 16 === 11) this.tone(t, .21, 94, 38, .095, 'sine');
        if (beat % 4 === 2) { this.noise(t, .1, .036, 1700, 420, 'bandpass'); this.metal(t, .13, 180, .008); }
        if (beat % 2 === 1) this.noise(t, .045, .018, 4700, 2500, 'highpass');
        if (beat % 2 === 0) this.tone(t, .22, root, root, .032, 'triangle', .025);
      } else if (beat % 4 === 2) {
        const ratio = [2, 3, 2.5, 3][Math.floor(beat / 4) % 4];
        this.metal(t, 1.1, root * ratio, mode === 'forge' ? .011 : .017);
      }
      this.beat++; this.nextBeat += step;
    }
    this.schedulingMusic = false;
    this.timer = setTimeout(this.scheduleMusic, 70);
  };
}
