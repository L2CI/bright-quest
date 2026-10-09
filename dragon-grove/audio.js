// Recorded music and licensed effects stay local to Bright Quest; nothing autoplays on load.
const ASSETS = {
  music: new URL('./assets/audio/enchanted-valley.mp3', import.meta.url).href,
  flap: new URL('./assets/audio/dragon-flap.mp3', import.meta.url).href,
  fire: new URL('./assets/audio/fire-breath.wav', import.meta.url).href
};
const MAX_VOICES = 24;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export class GroveAudio {
  constructor({onError = () => {}} = {}) {
    this.onError = onError;
    this.settings = {sound:false, music:true, reduced:false};
    this.phase = 'welcome';
    this.level = 1;
    this.started = false;
    this.suspended = false;
    this.context = null;
    this.musicElement = null;
    this.buffers = new Map();
    this.loads = new Map();
    this.voices = new Set();
    this.reported = new Set();
    this.lastEffect = new Map();
    this.failedAssets = new Set();
    this.effectCount = 0;
    this.errorCount = 0;
    this.playAttempt = 0;
  }

  configure({sound, music, reduced} = {}) {
    if (typeof sound === 'boolean') this.settings.sound = sound;
    if (typeof music === 'boolean') this.settings.music = music;
    if (typeof reduced === 'boolean') this.settings.reduced = reduced;
    if (!this.context) return;
    if (!this.settings.sound) this._stopVoices();
    if (this.settings.sound && this.started && !this.suspended) this._warmSamples();
    this._levels();
    if (!this.settings.music) {
      this.playAttempt++;
      this.musicElement.pause();
    }
    // Enabling a track does not start playback here. start() is called from the user's control.
  }

  _createGraph() {
    if (this.context) return true;
    const AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AudioContextClass) {
      this._report('unsupported', 'Audio is unavailable in this browser. The adventure still works with sound off.');
      return false;
    }
    this.context = new AudioContextClass({latencyHint:'interactive'});
    const ctx = this.context;
    this.master = ctx.createGain();
    this.master.gain.value = 0.8;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -12;
    limiter.knee.value = 8;
    limiter.ratio.value = 8;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.2;
    limiter.connect(this.master).connect(ctx.destination);
    this.musicGain = ctx.createGain();
    this.musicGain.gain.value = 0;
    this.musicGain.connect(limiter);
    this.effectsGain = ctx.createGain();
    this.effectsGain.gain.value = 0;
    // The wing recording has substantial bass; filter sub-bass and keep a conservative bus gain.
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 65;
    highpass.Q.value = 0.6;
    this.effectsGain.connect(highpass).connect(limiter);
    this.musicElement = new Audio();
    this.musicElement.preload = 'none';
    this.musicElement.loop = true;
    this.musicElement.volume = 1;
    this.musicElement.src = ASSETS.music;
    this.musicElement.addEventListener('error', () => {
      this.failedAssets.add('music');
      this._report('music-load', 'The soundtrack could not load. You can keep playing and try Music again later.');
    });
    // Stream the three-minute recording; do not decode the whole track into mobile memory.
    this.musicSource = ctx.createMediaElementSource(this.musicElement);
    this.musicSource.connect(this.musicGain);
    this._levels();
    return true;
  }

  start() {
    if (typeof document !== 'undefined' && document.hidden) return Promise.resolve(false);
    if (!this.started && globalThis.navigator?.userActivation && !navigator.userActivation.isActive) return Promise.resolve(false);
    if (!this.settings.sound && !this.settings.music) return Promise.resolve(false);
    try {
      if (!this._createGraph()) return Promise.resolve(false);
      this.started = true;
      this.suspended = false;
      this._levels();
      if (this.settings.sound) this._warmSamples();
      // Both requests happen synchronously within the gesture, before awaiting either one.
      const resumed = this.context.state === 'running' ? Promise.resolve() : this.context.resume();
      const music = this._playMusic();
      return Promise.all([resumed, music]).then(() => !this.suspended && this.context.state === 'running').catch(() => {
        this._report('audio-blocked', 'Tap Sound or Music to enable audio. Your adventure is ready to continue.');
        return false;
      });
    } catch {
      this._report('audio-start', 'Audio could not start. The adventure still works with sound off.');
      return Promise.resolve(false);
    }
  }

  _playMusic() {
    if (!this.musicElement || !this.settings.music || this.suspended) return Promise.resolve();
    if (!this.musicElement.paused) return Promise.resolve();
    const request = ++this.playAttempt;
    return Promise.resolve(this.musicElement.play()).then(() => {
      if (request !== this.playAttempt || this.suspended || !this.settings.music) this.musicElement.pause();
    }).catch(error => {
      if (error?.name === 'AbortError' || this.suspended || !this.settings.music) return;
      this._report('music-blocked', 'Tap Music to start the soundtrack. You can also keep playing without it.');
    });
  }

  setScene(phase, level) {
    this.phase = typeof phase === 'string' ? phase : 'welcome';
    this.level = clamp(Number.isFinite(Number(level)) ? Number(level) : 1, 1, 10);
    this._levels();
  }

  _musicLevel() {
    const reading = /question|learning|challenge|quiz|training|think/.test(this.phase);
    const celebration = /celebrate|complete|finale/.test(this.phase);
    const base = reading ? 0.095 : celebration ? 0.2 : 0.145;
    return Math.min(0.2, base * (this.settings.reduced ? 0.82 : 1));
  }

  _levels() {
    if (!this.context) return;
    const now = this.context.currentTime;
    const active = this.started && !this.suspended;
    for (const [gain, target] of [[this.musicGain, active && this.settings.music ? this._musicLevel() : 0], [this.effectsGain, active && this.settings.sound ? (this.settings.reduced ? 0.3 : 0.4) : 0]]) {
      if (gain.gain.cancelAndHoldAtTime) gain.gain.cancelAndHoldAtTime(now);
      else gain.gain.cancelScheduledValues(now);
      // A muted bus is exactly zero. Repeated scene updates must not restart a fading mute.
      if (target === 0) gain.gain.setValueAtTime(0, now);
      else gain.gain.setTargetAtTime(target, now, 0.09);
    }
  }

  _warmSamples() {
    for (const name of ['flap','fire']) {
      if (this.loads.has(name) || this.buffers.has(name)) continue;
      const load = this._loadSample(name);
      this.loads.set(name, load);
    }
  }

  async _loadSample(name) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);
    try {
      const response = await fetch(ASSETS[name], {signal:controller.signal, credentials:'same-origin'});
      if (!response.ok) throw new Error('Audio asset unavailable');
      const bytes = await response.arrayBuffer();
      const buffer = await this.context.decodeAudioData(bytes);
      this.buffers.set(name, buffer);
    } catch {
      this.failedAssets.add(name);
      this._report(`sample-${name}`, 'One recorded effect could not load. The game will use its softer built-in sound.');
    } finally { clearTimeout(timeout); }
  }

  effect(name) {
    if (!this.started || this.suspended || !this.settings.sound || this.context?.state !== 'running') return false;
    if (!['correct','try','grow','victory','fire','storm','nature','astral'].includes(name)) return false;
    const now = this.context.currentTime;
    if (now - (this.lastEffect.get(name) ?? -Infinity) < 0.18) return false;
    this.lastEffect.set(name, now);
    this.effectCount++;
    if (name === 'correct') this._chime([523.25,659.25,783.99],0.09,0.055,0.48);
    if (name === 'try') this._chime([392,440],0.12,0.025,0.28);
    if (name === 'grow') {
      this._sample('flap',0.55,0.86);
      this._chime([261.63,392,523.25,659.25,783.99],0.13,0.05,1.2);
      this._tone(130.81,now,1.4,0.045,'sine',196);
    }
    if (name === 'victory') {
      this._sample('flap',0.4,1);
      this._chime([392,523.25,659.25,783.99,659.25,783.99,1046.5],0.16,0.045,0.85);
    }
    if (name === 'fire') {
      this._sample('fire',0.68,0.86 + this.level * 0.008);
      this._noise(now,1.45,0.13,1250,'bandpass');
      this._tone(86,now,1.1,0.07,'sine',43);
    }
    if (name === 'storm') {
      this._noise(now,1.65,0.16,520,'lowpass');
      this._noise(now+0.07,0.18,0.05,3600,'highpass');
      this._tone(110,now,1.5,0.05,'sine',45);
      this._chime([587.33,880],0.08,0.025,0.5);
    }
    if (name === 'nature') {
      this._sample('flap',0.22,1.35);
      this._noise(now,0.75,0.035,2000,'bandpass');
      this._chime([392,493.88,587.33,783.99],0.15,0.04,0.9);
    }
    if (name === 'astral') this._chime([523.25,659.25,783.99,987.77,1174.66],0.13,0.035,1.5);
    return true;
  }

  _register(source, nodes, endAt) {
    if (this.voices.size >= MAX_VOICES) this._stopVoice(this.voices.values().next().value);
    const voice = {source,nodes};
    this.voices.add(voice);
    source.onended = () => this._cleanVoice(voice);
    source.stop(endAt);
    return voice;
  }

  _cleanVoice(voice) {
    this.voices.delete(voice);
    for (const node of [voice.source, ...voice.nodes]) { try { node.disconnect(); } catch {} }
  }

  _stopVoice(voice) {
    if (!voice) return;
    try { voice.source.stop(); } catch {}
    this._cleanVoice(voice);
  }

  _stopVoices() { for (const voice of [...this.voices]) this._stopVoice(voice); }

  _envelope(gain, start, duration, level) {
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(clamp(level,0,0.75), start + Math.min(0.04,duration/5));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  }

  _sample(name, volume, rate = 1) {
    const buffer = this.buffers.get(name);
    if (!buffer) return false;
    const ctx = this.context, now = ctx.currentTime;
    const source = ctx.createBufferSource(), gain = ctx.createGain();
    source.buffer = buffer;
    source.playbackRate.value = clamp(rate,0.75,1.5);
    const duration = buffer.duration / source.playbackRate.value;
    // Keep the recording's own envelope; fade only its edges to prevent clicks.
    gain.gain.setValueAtTime(0,now);
    gain.gain.linearRampToValueAtTime(clamp(volume,0,0.7),now+0.025);
    gain.gain.setValueAtTime(clamp(volume,0,0.7),now+Math.max(0.025,duration-0.15));
    gain.gain.linearRampToValueAtTime(0,now+duration);
    source.connect(gain).connect(this.effectsGain);
    source.start(now);
    this._register(source,[gain],now+duration+0.01);
    return true;
  }

  _tone(frequency, start, duration, level, type = 'sine', endFrequency) {
    const oscillator = this.context.createOscillator(), gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency,start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency,start+duration);
    this._envelope(gain,start,duration,Math.min(level,0.08));
    oscillator.connect(gain).connect(this.effectsGain);
    oscillator.start(start);
    this._register(oscillator,[gain],start+duration+0.025);
  }

  _chime(notes, spacing, volume, duration) {
    const now = this.context.currentTime;
    notes.forEach((note,i) => {
      this._tone(note,now+i*spacing,duration,volume);
      this._tone(note*2,now+i*spacing,duration*0.58,volume*0.18);
    });
  }

  _noise(start, duration, volume, frequency, type) {
    const ctx = this.context;
    const buffer = ctx.createBuffer(1,Math.ceil(ctx.sampleRate*duration),ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i=0;i<data.length;i++) data[i] = Math.random()*2-1;
    const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = 0.65;
    this._envelope(gain,start,duration,Math.min(volume,0.16));
    source.connect(filter).connect(gain).connect(this.effectsGain);
    source.start(start);
    this._register(source,[filter,gain],start+duration+0.025);
  }

  suspend() {
    this.suspended = true;
    this.playAttempt++;
    this.musicElement?.pause();
    this._stopVoices();
    this._levels();
    if (this.context && this.context.state !== 'closed') return this.context.suspend().catch(() => {});
    return Promise.resolve();
  }

  resume() {
    if (!this.started || (typeof document !== 'undefined' && document.hidden)) return Promise.resolve(false);
    if (!this.settings.music && !this.settings.sound) { this.suspended = false; return Promise.resolve(false); }
    this.suspended = false;
    this._levels();
    return Promise.all([this.context.resume(),this._playMusic()]).then(() => true).catch(() => {
      this._report('resume-blocked','Tap Sound or Music to resume audio.');
      return false;
    });
  }

  _report(key, message) {
    if (this.reported.has(key)) return;
    this.reported.add(key);
    this.errorCount++;
    try { this.onError(message); } catch {}
  }

  diagnostics() {
    return {
      started:this.started, suspended:this.suspended, contextState:this.context?.state || 'not-started',
      soundEnabled:this.settings.sound, musicEnabled:this.settings.music, reduced:this.settings.reduced,
      musicPlaying:Boolean(this.musicElement && !this.musicElement.paused && !this.suspended && this.settings.music),
      musicTime:Number.isFinite(this.musicElement?.currentTime) ? Number(this.musicElement.currentTime.toFixed(2)) : 0,
      musicDuration:Number.isFinite(this.musicElement?.duration) ? Number(this.musicElement.duration.toFixed(2)) : null,
      recordedEffects:[...this.buffers.keys()], failedAssets:[...this.failedAssets], activeVoices:this.voices.size,
      effectCount:this.effectCount, errorCount:this.errorCount, musicGain:this.context && this.started && !this.suspended && this.settings.music ? this._musicLevel() : 0,
      voiceLimit:MAX_VOICES
    };
  }
}
