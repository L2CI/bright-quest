(() => {
  "use strict";

  const BUILD = "stormrail-shield-sprint-001";
  const eventBus = new EventTarget();
  const STAGES = [
    {
      kicker: "Commander Nimbus // Stage 1",
      title: "Charge the magnetic couplers",
      text: "Calculate the usable charge, then lock all three couplers into the rail junction.",
      form: "Mag-Claw mode",
      orders: ["Transform Relay-7 into Mag-Claw mode", "Work out the usable coupler charge", "Select a coupler, then lock it into each glowing socket"],
      voice: "../assets/level-2/audio/commander-level-2-stage-1.mp3"
    },
    {
      kicker: "Commander Nimbus // Stage 2",
      title: "Transform for the Shield Sprint",
      text: "Share the shield charge, find the reserve, then protect the convoy through six lightning pulses.",
      form: "Shield Runner mode",
      orders: ["Calculate each carrier's equal shield share", "Calculate the reserve after one crossing", "Change lane, match the marker, then hold Shield at impact"],
      voice: "../assets/level-2/audio/commander-level-2-stage-2.mp3"
    },
    {
      kicker: "Commander Nimbus // Final stage",
      title: "Build the Titan Bridge",
      text: "Prove the sections reach the far anchor, then lock the safe seven-minute build sequence.",
      form: "Titan Bridge mode",
      orders: ["Calculate the bridge total and anchor overlap", "Choose the three required actions in safe order", "Rotate, lock and hold while the convoy crosses"],
      voice: "../assets/level-2/audio/commander-level-2-stage-3.mp3"
    }
  ];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const dom = {
    launch: $("#launchScreen"), launchButton: $("#launchButton"),
    brief: $("#briefScreen"), briefKicker: $("#briefKicker"), briefTitle: $("#briefTitle"), briefText: $("#briefText"), briefForm: $("#briefForm"), briefOrders: $("#briefOrders"), briefContinue: $("#briefContinueButton"), briefReplay: $("#briefReplayButton"),
    challenge: $("#challengeScreen"), challengeKicker: $("#challengeKicker"), challengeTitle: $("#challengeTitle"), challengeStory: $("#challengeStory"), challengeBody: $("#challengeBody"), challengeClose: $("#challengeCloseButton"), confirm: $("#confirmChallengeButton"), hintButton: $("#hintButton"), hintText: $("#hintText"),
    pause: $("#pauseScreen"), pauseButton: $("#pauseButton"), resume: $("#resumeButton"), restart: $("#restartButton"), motion: $("#motionButton"), sound: $("#soundButton"),
    result: $("#resultScreen"), resultStars: $("#resultStars"), resultTime: $("#resultTime"), playAgain: $("#playAgainButton"),
    missionKicker: $("#missionKicker"), missionTitle: $("#missionTitle"), missionInstruction: $("#missionInstruction"), progress: $$(".mission-progress i"),
    chargeRing: $("#chargeRing"), chargeValue: $("#chargeValue"), chargeLabel: $("#chargeLabel"), formName: $("#formName"),
    runStatus: $("#runStatus"), runControls: $("#runControls"), laneUp: $("#laneUpButton"), laneDown: $("#laneDownButton"), shield: $("#shieldButton"), runTimer: $("#runTimer"), runMeter: $("#runMeterFill"), convoyCount: $("#convoyCount"),
    captions: $("#captions"), safeHold: $("#safeHold")
  };

  const state = {
    started: false,
    stage: 0,
    phase: "launch",
    paused: false,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    elapsed: 0,
    startedAt: 0,
    timer: null,
    mistakes: 0,
    hintLevel: 0,
    selectedCoupler: null,
    couplers: [null, null, null],
    bridgeSelected: null,
    bridgeSlots: [null, null, null],
    lane: 1,
    shieldHeld: false,
    shieldEnergy: 120,
    runElapsed: 0,
    runDuration: 35,
    runActive: false,
    runFrozen: 0,
    pulseIndex: 0,
    pulse: null,
    pulseSchedule: [
      { at: 3.6, lane: 1 }, { at: 8.2, lane: 0 }, { at: 13.1, lane: 2 },
      { at: 18.0, lane: 1 }, { at: 23.3, lane: 2 }, { at: 29.0, lane: 0 }
    ],
    scene: null
  };

  class StormrailScene extends Phaser.Scene {
    constructor() { super("stormrail"); }

    preload() {
      this.load.image("sky", "../assets/level-2/stormrail-sky-city.webp");
      this.load.image("track", "../assets/level-2/stormrail-track.webp");
      this.load.spritesheet("runner", "../assets/level-2/relay7-shield-runner-sheet.webp", { frameWidth: 512, frameHeight: 1024, endFrame: 3 });
      this.load.spritesheet("carrier", "../assets/level-2/stormrail-carrier-sheet.webp", { frameWidth: 512, frameHeight: 512, endFrame: 2 });
      this.load.image("shield", "../assets/level-2/shield-impact.webp");
      this.load.image("titan", "../assets/level-2/relay7-titan-bridge.webp");
    }

    create() {
      state.scene = this;
      this.sky = this.add.image(0, 0, "sky").setOrigin(.5).setDepth(0);
      this.skyEcho = this.add.image(0, 0, "sky").setOrigin(.5).setDepth(1).setAlpha(.16).setTint(0x8edcff);
      this.track = this.add.image(0, 0, "track").setOrigin(.5).setDepth(3);
      this.carriers = [0, 1, 2].map((index) => this.add.sprite(0, 0, "carrier", index % 3).setOrigin(.5, .86).setDepth(5).setAlpha(0));
      this.runner = this.add.sprite(0, 0, "runner", 0).setOrigin(.5, .9).setDepth(7).setAlpha(0);
      this.shield = this.add.image(0, 0, "shield").setOrigin(.5).setDepth(8).setAlpha(0);
      this.titan = this.add.image(0, 0, "titan").setOrigin(.5, .76).setDepth(7).setAlpha(0).setVisible(false);
      this.fx = this.add.graphics().setDepth(9);
      this.telegraph = this.add.graphics().setDepth(6);
      this.anims.create({ key: "runner-gait", frames: this.anims.generateFrameNumbers("runner", { start: 0, end: 3 }), frameRate: 7, repeat: -1, yoyo: false });
      this.scale.on("resize", this.resize, this);
      this.resize({ width: this.scale.width, height: this.scale.height });
      this.cameras.main.fadeIn(500, 3, 11, 23);
      eventBus.addEventListener("show-stage", (event) => this.showStage(event.detail));
      eventBus.addEventListener("start-run", () => this.startRun());
      eventBus.addEventListener("lane", (event) => this.changeLane(event.detail));
      eventBus.addEventListener("shield", (event) => this.setShield(event.detail));
      eventBus.addEventListener("couplers-locked", () => this.couplerLockMoment());
      eventBus.addEventListener("start-finale", () => this.startFinale());
      eventBus.addEventListener("motion", () => this.applyMotionMode());
    }

    resize(gameSize) {
      const width = gameSize.width;
      const height = gameSize.height;
      const cover = Math.max(width / this.sky.width, height / this.sky.height);
      this.sky.setPosition(width / 2, height / 2).setScale(cover);
      this.skyEcho.setPosition(width / 2 + 18, height / 2 + 8).setScale(cover * 1.025);
      const trackScale = Math.max(width / this.track.width, height / this.track.height);
      this.track.setPosition(width / 2, height / 2).setScale(trackScale);
      this.placeActors(true);
    }

    laneY(lane) {
      const height = this.scale.height;
      const short = this.scale.width / Math.max(height, 1) > 2;
      const base = height * (short ? .69 : .73);
      const gap = Math.max(32, Math.min(72, height * .075));
      return base + (lane - 1) * gap;
    }

    actorScale() {
      return Math.max(.22, Math.min(.46, Math.min(this.scale.width / 1440, this.scale.height / 900) * .42));
    }

    placeActors(immediate = false) {
      if (!this.runner) return;
      const width = this.scale.width;
      const scale = this.actorScale();
      const runnerX = width * .5;
      const targetY = this.laneY(state.lane);
      if (immediate || state.reducedMotion) this.runner.setPosition(runnerX, targetY);
      else this.tweens.add({ targets: this.runner, y: targetY, duration: 260, ease: "Cubic.easeOut" });
      this.runner.setScale(scale);
      this.shield.setScale(scale * .68).setPosition(runnerX + 128 * scale, targetY - 230 * scale);
      const spacing = Math.max(95, Math.min(170, width * .105));
      this.carriers.forEach((carrier, index) => carrier.setScale(scale * .7).setPosition(runnerX - spacing * (index + 1), this.laneY(1) + index * 2));
      this.titan.setPosition(width * .53, this.laneY(1) + 15).setScale(Math.max(.23, Math.min(.42, scale * .92)));
    }

    showStage(stage) {
      this.tweens.killTweensOf([this.runner, ...this.carriers, this.titan]);
      this.fx.clear();
      this.telegraph.clear();
      this.titan.setVisible(false).setAlpha(0);
      this.runner.setVisible(true).setAlpha(stage === 0 ? .92 : 1).setFrame(stage === 0 ? 1 : 0);
      this.carriers.forEach((carrier) => carrier.setAlpha(stage > 0 ? .98 : .48));
      this.placeActors(true);
      if (stage === 0 && !state.reducedMotion) {
        this.tweens.add({ targets: this.runner, scaleX: this.runner.scaleX * 1.04, scaleY: this.runner.scaleY * .98, duration: 700, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
      }
    }

    startRun() {
      this.runner.setVisible(true).setAlpha(1);
      this.titan.setVisible(false).setAlpha(0);
      this.carriers.forEach((carrier) => carrier.setAlpha(1));
      this.runner.play("runner-gait", true);
      this.placeActors(true);
      this.cameras.main.flash(state.reducedMotion ? 0 : 220, 40, 194, 238, false, undefined, .18);
    }

    changeLane(direction) {
      if (!state.runActive || state.runFrozen > 0 || state.paused) return;
      const next = Phaser.Math.Clamp(state.lane + direction, 0, 2);
      if (next === state.lane) return;
      state.lane = next;
      audio.sfx("lane");
      this.placeActors(false);
    }

    setShield(active) {
      state.shieldHeld = Boolean(active && state.runActive && state.runFrozen <= 0 && !state.paused);
      this.shield.setAlpha(state.shieldHeld ? .82 : 0);
      if (state.shieldHeld && !state.reducedMotion) this.tweens.add({ targets: this.shield, scale: this.shield.scaleX * 1.06, duration: 180, yoyo: true, ease: "Sine.easeOut" });
    }

    update(_time, delta) {
      if (!state.started || state.paused) return;
      const d = Math.min(delta, 42);
      const drift = state.runActive ? state.runElapsed : state.elapsed * .22;
      const motion = state.reducedMotion ? .25 : 1;
      this.sky.x = this.scale.width / 2 - Math.sin(drift * .13) * 18 * motion;
      this.skyEcho.x = this.scale.width / 2 + Math.sin(drift * .08) * 32 * motion;
      this.skyEcho.y = this.scale.height / 2 + Math.cos(drift * .1) * 8 * motion;
      this.track.x = this.scale.width / 2 - Math.sin(drift * .4) * 9 * motion;

      if (!state.runActive) return;
      if (state.runFrozen > 0) {
        state.runFrozen = Math.max(0, state.runFrozen - d);
        if (state.runFrozen === 0) {
          dom.safeHold.classList.add("hidden");
          state.pulse = null;
          this.telegraph.clear();
        }
        return;
      }

      state.runElapsed = Math.min(state.runDuration, state.runElapsed + d / 1000);
      this.updateRunMotion(drift);
      this.updatePulse();
      updateRunHud();
      if (state.pulseIndex >= state.pulseSchedule.length && !state.pulse && state.runElapsed >= 31) finishShieldRun();
    }

    updateRunMotion(time) {
      const scale = this.actorScale();
      const bob = state.reducedMotion ? 0 : Math.sin(time * 8) * 4;
      if (!this.tweens.isTweening(this.runner)) this.runner.y = this.laneY(state.lane) + bob;
      this.carriers.forEach((carrier, index) => {
        carrier.setFrame(Math.floor(time * 5 + index) % 3);
        carrier.y = this.laneY(1) + (state.reducedMotion ? 0 : Math.sin(time * 5.2 + index * .9) * 3);
        carrier.rotation = state.reducedMotion ? 0 : Math.sin(time * 3.4 + index) * .006;
      });
      this.shield.setPosition(this.runner.x + 125 * scale, this.runner.y - 225 * scale);
      if (state.shieldHeld) this.shield.rotation += .002;
    }

    updatePulse() {
      const schedule = state.pulseSchedule[state.pulseIndex];
      if (!schedule) return;
      if (!state.pulse && state.runElapsed >= schedule.at - 1.45) state.pulse = { lane: schedule.lane, impactAt: schedule.at, startedAt: state.runElapsed };
      if (!state.pulse) return;
      const remaining = state.pulse.impactAt - state.runElapsed;
      this.drawTelegraph(state.pulse.lane, remaining);
      if (remaining <= 0) this.resolvePulse();
    }

    drawTelegraph(lane, remaining) {
      this.telegraph.clear();
      const x = this.scale.width * .68;
      const y = this.laneY(lane) - 4;
      const urgency = Phaser.Math.Clamp(1 - remaining / 1.45, 0, 1);
      const radius = 42 + urgency * 22;
      this.telegraph.lineStyle(5, urgency > .68 ? 0xffffff : 0x55efff, .45 + urgency * .35);
      this.telegraph.strokeCircle(x, y, radius);
      this.telegraph.lineStyle(2, 0x9b81ff, .5);
      this.telegraph.strokeCircle(x, y, radius + 13);
      if (!state.reducedMotion) {
        this.telegraph.fillStyle(0x55efff, .12 + urgency * .12);
        this.telegraph.fillCircle(x, y, radius - 4);
      }
    }

    resolvePulse() {
      const pulse = state.pulse;
      if (!pulse) return;
      const blocked = state.shieldHeld && state.lane === pulse.lane && state.shieldEnergy >= 10;
      this.drawLightning(pulse.lane, blocked);
      if (blocked) {
        state.shieldEnergy -= 10;
        state.pulseIndex += 1;
        state.pulse = null;
        audio.sfx("shield");
        speak(`Pulse ${state.pulseIndex} blocked. Keep the convoy moving.`, 1650);
        this.telegraph.clear();
      } else {
        state.mistakes += 1;
        state.runFrozen = 1900;
        state.pulse = null;
        state.pulseSchedule[state.pulseIndex].at = state.runElapsed + 2.45;
        state.shieldHeld = false;
        this.shield.setAlpha(0);
        dom.shield.classList.remove("active");
        dom.safeHold.classList.remove("hidden");
        audio.sfx("safe");
        speak("Safe hold. Match Relay-7 to the glowing lane, then hold Shield before the pulse lands.", 3000);
      }
      updateCharge();
    }

    drawLightning(lane, blocked) {
      this.fx.clear();
      const endX = this.scale.width * .68;
      const endY = this.laneY(lane);
      const startX = endX + this.scale.width * .12;
      let previousX = startX;
      let previousY = 0;
      const points = [{ x: previousX, y: previousY }];
      for (let index = 1; index <= 8; index += 1) {
        previousX += Phaser.Math.Between(-30, 18);
        previousY = (endY / 8) * index;
        points.push({ x: index === 8 ? endX : previousX, y: previousY });
      }
      this.fx.lineStyle(blocked ? 8 : 6, blocked ? 0x88f8ff : 0xbca9ff, .85);
      this.fx.beginPath();
      this.fx.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((point) => this.fx.lineTo(point.x, point.y));
      this.fx.strokePath();
      this.fx.lineStyle(2, 0xffffff, .95);
      this.fx.beginPath();
      this.fx.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((point) => this.fx.lineTo(point.x, point.y));
      this.fx.strokePath();
      if (!state.reducedMotion) this.cameras.main.shake(150, blocked ? .0025 : .0015);
      this.time.delayedCall(170, () => this.fx.clear());
    }

    couplerLockMoment() {
      this.runner.setAlpha(1).setFrame(1);
      if (!state.reducedMotion) this.cameras.main.zoomTo(1.035, 350, "Sine.easeOut", true);
      this.fx.clear().fillStyle(0x55efff, .35).fillCircle(this.scale.width * .55, this.laneY(1), 80);
      this.time.delayedCall(350, () => { this.fx.clear(); this.cameras.main.zoomTo(1, 350); });
    }

    startFinale() {
      this.runner.stop().setAlpha(1);
      this.carriers.forEach((carrier) => carrier.setAlpha(1));
      audio.sfx("transform");
      const targetScale = this.actorScale() * .18;
      this.tweens.add({ targets: this.runner, scaleX: targetScale, scaleY: targetScale, rotation: state.reducedMotion ? 0 : -.08, alpha: 0, duration: state.reducedMotion ? 180 : 700, ease: "Cubic.easeIn", onComplete: () => {
        this.runner.setVisible(false);
        this.titan.setVisible(true).setAlpha(0).setScale(this.actorScale() * .48);
        this.tweens.add({ targets: this.titan, alpha: 1, scaleX: this.actorScale() * .92, scaleY: this.actorScale() * .92, duration: state.reducedMotion ? 220 : 850, ease: "Back.easeOut", onComplete: () => this.crossConvoy() });
      }});
    }

    crossConvoy() {
      const finishX = this.scale.width * .86;
      this.carriers.forEach((carrier, index) => {
        carrier.setDepth(8);
        this.tweens.add({ targets: carrier, x: finishX + index * 35, duration: state.reducedMotion ? 900 : 2600 + index * 360, delay: index * 260, ease: "Sine.easeInOut" });
      });
      if (!state.reducedMotion) this.cameras.main.pan(this.scale.width * .58, this.scale.height * .48, 2200, "Sine.easeInOut", true);
      this.time.delayedCall(state.reducedMotion ? 1450 : 3800, () => {
        audio.sfx("victory");
        showResults();
      });
    }

    applyMotionMode() {
      if (state.reducedMotion && this.runner?.anims?.isPlaying) this.runner.stop().setFrame(0);
    }
  }

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "gameCanvas",
    backgroundColor: "#071b35",
    scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
    render: { antialias: true, pixelArt: false, roundPixels: false, powerPreference: "high-performance" },
    audio: { noAudio: true },
    scene: StormrailScene
  });

  class StormrailAudio {
    constructor() { this.ctx = null; this.music = null; this.voice = null; this.voiceStage = null; this.muted = false; }
    start() {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.ctx.resume?.();
      if (!this.music) {
        this.music = new Audio("../assets/level-2/audio/stormrail-command-loop.webm");
        this.music.loop = true;
        this.music.volume = .42;
        this.music.addEventListener("error", () => { this.music.src = "../assets/audio/mechshift-command-loop.webm"; this.music.play().catch(() => {}); }, { once: true });
      }
      if (!this.muted) this.music.play().catch(() => {});
    }
    playBrief(index) {
      this.stopVoice();
      const stage = STAGES[index];
      if (!stage || this.muted) return;
      this.voiceStage = index;
      this.voice = new Audio(stage.voice);
      this.voice.volume = 1;
      this.voice.addEventListener("play", () => { if (this.music) this.music.volume = .18; });
      this.voice.addEventListener("ended", () => { if (this.music) this.music.volume = state.runActive ? .52 : .42; });
      this.voice.addEventListener("error", () => { if (this.music) this.music.volume = .42; });
      this.voice.play().catch(() => {});
    }
    stopVoice() { if (this.voice) { this.voice.pause(); this.voice.currentTime = 0; } this.voice = null; this.voiceStage = null; if (this.music) this.music.volume = state.runActive ? .52 : .42; }
    setPaused(paused) { if (paused) { this.music?.pause(); this.voice?.pause(); } else if (!this.muted) { this.music?.play().catch(() => {}); this.voice?.play().catch(() => {}); } }
    toggle() { this.muted = !this.muted; if (this.music) this.music.muted = this.muted; if (this.voice) this.voice.muted = this.muted; return this.muted; }
    sfx(kind) {
      if (this.muted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const out = this.ctx.createGain();
      out.connect(this.ctx.destination);
      const tone = (frequency, start, duration, type, volume, endFrequency = frequency) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type; osc.frequency.setValueAtTime(frequency, start); osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), start + duration);
        gain.gain.setValueAtTime(.001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .02); gain.gain.exponentialRampToValueAtTime(.001, start + duration);
        osc.connect(gain).connect(out); osc.start(start); osc.stop(start + duration + .03);
      };
      const patterns = {
        lane: [[180,.14,"triangle",.05,260]], select: [[330,.12,"sine",.05,520]], wrong: [[170,.28,"sawtooth",.045,85]], safe: [[230,.22,"triangle",.04,160],[310,.28,"sine",.04,220]],
        shield: [[420,.24,"sine",.065,860],[740,.18,"triangle",.035,980]], transform: [[92,.7,"sawtooth",.045,320],[170,.8,"triangle",.05,520]], victory: [[330,.4,"triangle",.05,440],[440,.5,"sine",.055,660],[660,.7,"sine",.045,990]]
      };
      (patterns[kind] || patterns.select).forEach((entry, index) => tone(entry[0], now + index * .08, entry[1], entry[2], entry[3], entry[4]));
    }
    getState() { return { muted: this.muted, musicReady: Boolean(this.music), musicPaused: Boolean(this.music?.paused), voiceStage: this.voiceStage, voicePlaying: Boolean(this.voice && !this.voice.paused) }; }
  }

  const audio = new StormrailAudio();

  function startLevel() {
    if (state.started) return;
    state.started = true;
    state.phase = "brief";
    state.startedAt = Date.now();
    state.timer = setInterval(() => { if (!state.paused && !state.runFrozen) state.elapsed += 1; }, 1000);
    dom.launch.classList.add("hidden");
    audio.start();
    showBrief(0);
  }

  function showBrief(index) {
    const stage = STAGES[index];
    if (!stage) return;
    state.stage = index;
    state.phase = "brief";
    state.hintLevel = 0;
    state.runActive = false;
    state.shieldHeld = false;
    dom.runControls.classList.add("hidden");
    dom.runStatus.classList.add("hidden");
    dom.briefKicker.textContent = stage.kicker;
    dom.briefTitle.textContent = stage.title;
    dom.briefText.textContent = stage.text;
    dom.briefForm.textContent = stage.form;
    dom.briefOrders.innerHTML = stage.orders.map((order, i) => `<li><span>${i + 1}</span><strong>${order}</strong></li>`).join("");
    dom.briefContinue.textContent = `Begin stage ${index + 1}`;
    dom.brief.classList.remove("hidden");
    updateMissionHud();
    eventBus.dispatchEvent(new CustomEvent("show-stage", { detail: index }));
    speak(`Stage ${index + 1}. ${stage.orders.join(". ")}.`, 6800);
    audio.playBrief(index);
  }

  function beginStage() {
    audio.stopVoice();
    dom.brief.classList.add("hidden");
    openChallenge(state.stage);
  }

  function openChallenge(index) {
    state.stage = index;
    state.phase = "challenge";
    state.hintLevel = 0;
    dom.hintText.textContent = "";
    dom.challenge.classList.remove("hidden");
    audio.sfx("select");
    if (index === 0) renderCouplers();
    if (index === 1) renderShieldMath();
    if (index === 2) renderBridgePlan();
  }

  function closeChallenge() {
    dom.challenge.classList.add("hidden");
    state.phase = "world";
    speak("System console closed. Tap the mission instruction to continue when ready.", 2300);
  }

  function renderCouplers() {
    dom.challengeKicker.textContent = "System 1 / Rail junction";
    dom.challengeTitle.textContent = "Charge the magnetic couplers";
    dom.challengeStory.innerHTML = `<strong>Seven couplers hold 18 charge units each.</strong> Two damaged couplers lose 9 units each. The stabiliser needs 96 units.<span class="challenge-order"><b>Your mission:</b> Calculate usable charge and spare charge, then select a coupler and a socket.</span>`;
    dom.confirm.textContent = "Lock coupler system";
    drawCouplers();
  }

  function drawCouplers(message = "Select a coupler, then choose a glowing socket.") {
    const inventory = ["Alpha", "Bravo", "Charlie"];
    dom.challengeBody.innerHTML = `
      <div class="system-equation"><span class="machine-value">7 × 18</span><span class="operator">−</span><span class="machine-value">2 × 9</span><span class="operator">=</span><span class="machine-value">usable</span></div>
      <div class="answer-grid">
        <div class="number-console"><label for="usableCharge">Usable charge</label><input id="usableCharge" inputmode="numeric" maxlength="3" aria-label="Usable charge" /></div>
        <div class="number-console"><label for="neededCharge">Stabiliser needs</label><input id="neededCharge" inputmode="numeric" maxlength="3" value="96" aria-label="Stabiliser charge needed" /></div>
        <div class="number-console"><label for="spareCharge">Spare charge</label><input id="spareCharge" inputmode="numeric" maxlength="2" aria-label="Spare charge" /></div>
      </div>
      <div class="coupler-board">
        <div class="coupler-inventory">${inventory.map((name, i) => `<button class="coupler-chip ${state.selectedCoupler === i ? "selected" : ""} ${state.couplers.includes(i) ? "placed" : ""}" type="button" data-coupler="${i}"><strong>${name}</strong><small>36 charge</small></button>`).join("")}</div>
        <div class="coupler-sockets">${state.couplers.map((value, i) => `<button class="coupler-socket ${value !== null ? "locked" : ""}" type="button" data-socket="${i}">${value !== null ? `<strong>${inventory[value]} locked</strong><small>Socket ${i + 1}</small>` : `<strong>Socket ${i + 1}</strong><small>Tap to lock</small>`}</button>`).join("")}</div>
      </div>
      <div class="challenge-message" id="challengeMessage">${message}</div>`;
    $$("[data-coupler]").forEach((button) => button.addEventListener("click", () => { state.selectedCoupler = Number(button.dataset.coupler); audio.sfx("select"); drawCouplers("Coupler selected. Choose an empty socket."); restoreCouplerAnswers(); }));
    $$("[data-socket]").forEach((button) => button.addEventListener("click", () => {
      const socket = Number(button.dataset.socket);
      if (state.couplers[socket] !== null) { state.couplers[socket] = null; audio.sfx("select"); drawCouplers("Socket cleared. Select another coupler."); restoreCouplerAnswers(); return; }
      if (state.selectedCoupler === null || state.couplers.includes(state.selectedCoupler)) { state.mistakes += 1; audio.sfx("wrong"); setChallengeMessage("Select an unused coupler first.", false); return; }
      state.couplers[socket] = state.selectedCoupler; state.selectedCoupler = null; audio.sfx("select"); drawCouplers("Magnetic lock confirmed. Continue with the next socket."); restoreCouplerAnswers();
    }));
    restoreCouplerAnswers();
  }

  function restoreCouplerAnswers() {
    const stored = state.couplerAnswers || {};
    const usable = $("#usableCharge"), needed = $("#neededCharge"), spare = $("#spareCharge");
    if (!usable || !needed || !spare) return;
    usable.value = stored.usable || usable.value;
    needed.value = stored.needed || needed.value;
    spare.value = stored.spare || spare.value;
    [usable, needed, spare].forEach((input) => input.addEventListener("input", () => { state.couplerAnswers = { usable: usable.value, needed: needed.value, spare: spare.value }; }));
  }

  function renderShieldMath() {
    dom.challengeKicker.textContent = "System 2 / Convoy shields";
    dom.challengeTitle.textContent = "Allocate the shield reserve";
    dom.challengeStory.innerHTML = `<strong>Relay-7 carries 171 shield units for three carriers.</strong> Share them equally. One crossing costs 17 units from each carrier. The remainder powers four shield impacts per carrier.<span class="challenge-order"><b>Your mission:</b> Enter each equal share and the reserve, then inspect all three carrier meters.</span>`;
    dom.confirm.textContent = "Start Shield Sprint";
    dom.challengeBody.innerHTML = `
      <div class="system-equation"><span class="machine-value">171 ÷ 3</span><span class="operator">=</span><span class="machine-value">share</span><span class="operator">− 17 =</span><span class="machine-value">reserve</span></div>
      <div class="answer-grid">
        <div class="number-console"><label for="carrierShare">Each carrier receives</label><input id="carrierShare" inputmode="numeric" maxlength="2" aria-label="Equal shield share" /></div>
        <div class="number-console"><label for="crossingCost">Crossing cost</label><input id="crossingCost" inputmode="numeric" maxlength="2" value="17" aria-label="Crossing cost" /></div>
        <div class="number-console"><label for="carrierReserve">Reserve per carrier</label><input id="carrierReserve" inputmode="numeric" maxlength="2" aria-label="Reserve per carrier" /></div>
      </div>
      <div class="allocation-board">${["Carrier A", "Carrier B", "Carrier C"].map((name) => `<div class="allocation-cell"><span>${name}</span><strong>40</strong><div class="reserve-bar"><i></i></div><small>4 safe blocks</small></div>`).join("")}</div>
      <div class="challenge-message" id="challengeMessage">The reserve becomes visible shield energy in the action run.</div>`;
  }

  function renderBridgePlan() {
    dom.challengeKicker.textContent = "System 3 / Final sky gap";
    dom.challengeTitle.textContent = "Program the Titan Bridge";
    dom.challengeStory.innerHTML = `<strong>Bridge sections are 24 m, 18 m and 12 m.</strong> The gap is 52 m. Extra length becomes the anchor zone. The storm closes in 8 minutes.<span class="challenge-order"><b>Your mission:</b> Calculate total and overlap, then choose three required actions in safe order. Leave a one-minute safety margin.</span>`;
    dom.confirm.textContent = "Transform and deploy";
    drawBridgePlan();
  }

  function drawBridgePlan(message = "Choose an action, then place it in the next bridge slot.") {
    const actions = [
      { id: "rotate", label: "Rotate deck", value: 2 },
      { id: "anchor", label: "Lock anchors", value: 3 },
      { id: "energy", label: "Energise shield rail", value: 2 },
      { id: "scan", label: "Repeat full scan", value: 2 }
    ];
    const byId = Object.fromEntries(actions.map((action) => [action.id, action]));
    dom.challengeBody.innerHTML = `
      <div class="answer-grid">
        <div class="number-console"><label for="bridgeTotal">Bridge total</label><input id="bridgeTotal" inputmode="numeric" maxlength="2" aria-label="Bridge total in metres" /></div>
        <div class="number-console"><label for="bridgeGap">Gap length</label><input id="bridgeGap" inputmode="numeric" maxlength="2" value="52" aria-label="Gap length in metres" /></div>
        <div class="number-console"><label for="bridgeOverlap">Anchor overlap</label><input id="bridgeOverlap" inputmode="numeric" maxlength="2" aria-label="Anchor overlap in metres" /></div>
      </div>
      <div class="bridge-console">
        <div class="bridge-diagram"><div class="bridge-sections"><span>24 m</span><span>18 m</span><span>12 m</span></div><div class="gap-readout">52 m gap + anchor zone</div><div class="bridge-slots">${state.bridgeSlots.map((id, i) => `<button class="bridge-slot ${id ? "filled" : ""}" type="button" data-bridge-slot="${i}">${id ? `${i + 1}. ${byId[id].label} / ${byId[id].value} min` : `Step ${i + 1}`}</button>`).join("")}</div></div>
        <div class="bridge-actions">${actions.map((action) => `<button class="bridge-action ${state.bridgeSelected === action.id ? "selected" : ""}" type="button" data-bridge-action="${action.id}">${action.label}<small>${action.value} min</small></button>`).join("")}</div>
      </div>
      <div class="challenge-message" id="challengeMessage">${message}</div>`;
    $$("[data-bridge-action]").forEach((button) => button.addEventListener("click", () => { const id = button.dataset.bridgeAction; const existing = state.bridgeSlots.indexOf(id); if (existing >= 0) state.bridgeSlots[existing] = null; state.bridgeSelected = id; audio.sfx("select"); cacheBridgeAnswers(); drawBridgePlan("Action selected. Place it into a bridge slot."); restoreBridgeAnswers(); }));
    $$("[data-bridge-slot]").forEach((button) => button.addEventListener("click", () => { const slot = Number(button.dataset.bridgeSlot); if (state.bridgeSlots[slot]) { state.bridgeSlots[slot] = null; cacheBridgeAnswers(); drawBridgePlan("Slot cleared. Choose another action."); restoreBridgeAnswers(); return; } if (!state.bridgeSelected) { audio.sfx("wrong"); setChallengeMessage("Choose an action first.", false); return; } state.bridgeSlots[slot] = state.bridgeSelected; state.bridgeSelected = null; audio.sfx("select"); cacheBridgeAnswers(); drawBridgePlan("Action placed. Keep the build safe and under eight minutes."); restoreBridgeAnswers(); }));
    restoreBridgeAnswers();
  }

  function cacheBridgeAnswers() {
    const total = $("#bridgeTotal"), gap = $("#bridgeGap"), overlap = $("#bridgeOverlap");
    if (total && gap && overlap) state.bridgeAnswers = { total: total.value, gap: gap.value, overlap: overlap.value };
  }

  function restoreBridgeAnswers() {
    const stored = state.bridgeAnswers || {};
    const total = $("#bridgeTotal"), gap = $("#bridgeGap"), overlap = $("#bridgeOverlap");
    if (!total || !gap || !overlap) return;
    total.value = stored.total || total.value;
    gap.value = stored.gap || gap.value;
    overlap.value = stored.overlap || overlap.value;
    [total, gap, overlap].forEach((input) => input.addEventListener("input", cacheBridgeAnswers));
  }

  function confirmChallenge() {
    if (state.stage === 0) {
      const usable = Number($("#usableCharge")?.value), needed = Number($("#neededCharge")?.value), spare = Number($("#spareCharge")?.value);
      const valid = usable === 108 && needed === 96 && spare === 12 && state.couplers.every((value) => value !== null);
      if (!valid) return rejectChallenge("Check all three numbers and lock every coupler. Usable is after both damaged losses.");
      dom.challenge.classList.add("hidden"); audio.sfx("shield"); eventBus.dispatchEvent(new Event("couplers-locked")); speak("All couplers locked. Twelve charge units spare. Rail junction stable.", 2900);
      setTimeout(() => showBrief(1), state.reducedMotion ? 500 : 1100); return;
    }
    if (state.stage === 1) {
      const share = Number($("#carrierShare")?.value), cost = Number($("#crossingCost")?.value), reserve = Number($("#carrierReserve")?.value);
      if (share !== 57 || cost !== 17 || reserve !== 40) return rejectChallenge("Share 171 equally across three carriers first, then subtract the 17-unit crossing cost.");
      dom.challenge.classList.add("hidden"); startShieldRun(); return;
    }
    if (state.stage === 2) {
      cacheBridgeAnswers();
      const total = Number($("#bridgeTotal")?.value), gap = Number($("#bridgeGap")?.value), overlap = Number($("#bridgeOverlap")?.value);
      const order = state.bridgeSlots.join(",");
      if (total !== 54 || gap !== 52 || overlap !== 2 || order !== "rotate,anchor,energy") return rejectChallenge("The bridge must total 54 metres. Use the three required actions: rotate, anchor, then energise. Leave the re-scan out.");
      dom.challenge.classList.add("hidden"); beginFinale();
    }
  }

  function rejectChallenge(message) {
    state.mistakes += 1; audio.sfx("wrong"); setChallengeMessage(message, false); dom.challengeBody.classList.remove("wrong-flash"); void dom.challengeBody.offsetWidth; dom.challengeBody.classList.add("wrong-flash");
  }

  function setChallengeMessage(message, good) {
    const node = $("#challengeMessage");
    if (!node) return;
    node.textContent = message; node.classList.toggle("good", Boolean(good)); node.classList.toggle("bad", good === false);
  }

  function showHint() {
    const hints = [
      ["First find 7 × 18.", "Subtract 18 because two couplers each lose 9.", "108 usable minus 96 needed leaves 12 spare."],
      ["Share 171 into three equal groups.", "Each carrier receives 57.", "57 minus 17 leaves a 40-unit reserve."],
      ["Add 24, 18 and 12.", "54 metres gives 2 metres beyond the 52-metre gap.", "Use rotate, anchor and energise: 2 + 3 + 2 = 7 minutes, leaving one minute."]
    ][state.stage];
    const index = Math.min(state.hintLevel, hints.length - 1);
    dom.hintText.textContent = hints[index]; state.hintLevel += 1; audio.sfx("select"); speak(hints[index], 2500);
  }

  function startShieldRun() {
    state.phase = "run"; state.runActive = true; state.runElapsed = 0; state.runFrozen = 0; state.pulseIndex = 0; state.pulse = null; state.lane = 1; state.shieldEnergy = 120; state.shieldHeld = false;
    dom.runControls.classList.remove("hidden"); dom.runStatus.classList.remove("hidden"); dom.safeHold.classList.add("hidden");
    dom.chargeLabel.textContent = "Shield reserve"; dom.formName.textContent = "Shield Runner";
    dom.missionKicker.textContent = "Stormrail Convoy / Shield run"; dom.missionTitle.textContent = "Protect all six pulses"; dom.missionInstruction.textContent = "Match the glowing lane, then hold Shield.";
    audio.start(); if (audio.music) audio.music.volume = .52; audio.sfx("transform"); eventBus.dispatchEvent(new Event("start-run"));
    speak("Shield Runner active. Use up and down to match the glowing lane. Hold Shield before the pulse lands.", 4200); updateRunHud(); updateCharge();
  }

  function updateRunHud() {
    dom.convoyCount.textContent = String(state.pulseIndex);
    dom.runMeter.style.width = `${Math.min(100, state.runElapsed / state.runDuration * 100)}%`;
    const remaining = Math.max(0, Math.ceil(state.runDuration - state.runElapsed));
    dom.runTimer.textContent = `00:${String(remaining).padStart(2, "0")}`;
  }

  function finishShieldRun() {
    if (!state.runActive) return;
    state.runActive = false; state.shieldHeld = false; state.phase = "brief";
    dom.runControls.classList.add("hidden"); dom.runStatus.classList.add("hidden"); dom.shield.classList.remove("active");
    audio.sfx("victory"); speak("All six pulses blocked. Every carrier is safe. Prepare the Titan Bridge.", 3400);
    setTimeout(() => showBrief(2), state.reducedMotion ? 550 : 1200);
  }

  function beginFinale() {
    state.phase = "finale";
    dom.missionKicker.textContent = "Stormrail Convoy / Final transform"; dom.missionTitle.textContent = "Titan Bridge deploying"; dom.missionInstruction.textContent = "Rotate. Anchor. Energise. Convoy crossing.";
    dom.formName.textContent = "Titan Bridge"; dom.chargeLabel.textContent = "Anchor charge";
    speak("Titan Bridge sequence confirmed. Rotate. Anchor. Energise. Hold for the convoy crossing.", 4100);
    eventBus.dispatchEvent(new Event("start-finale"));
  }

  function showResults() {
    state.phase = "result";
    if (state.timer) clearInterval(state.timer);
    const stars = state.mistakes <= 1 ? 3 : state.mistakes <= 4 ? 2 : 1;
    dom.resultStars.textContent = String(stars);
    dom.resultTime.textContent = `${String(Math.floor(state.elapsed / 60)).padStart(2, "0")}:${String(state.elapsed % 60).padStart(2, "0")}`;
    dom.result.classList.remove("hidden");
    saveProgress(stars);
  }

  function saveProgress(stars) {
    try {
      const legacy = JSON.parse(localStorage.getItem("brightQuestMechshiftRescueV1") || "null");
      const existing = JSON.parse(localStorage.getItem("brightQuestMechshiftRescueV2") || "null") || { version: 2, levels: {} };
      if (legacy && !existing.levels[1]) existing.levels[1] = legacy;
      const previous = existing.levels[2] || {};
      existing.build = BUILD;
      existing.levels[2] = { completedAt: new Date().toISOString(), seconds: state.elapsed, mistakes: state.mistakes, stars, bestStars: Math.max(previous.bestStars || 0, stars), bestSeconds: previous.bestSeconds ? Math.min(previous.bestSeconds, state.elapsed) : state.elapsed };
      localStorage.setItem("brightQuestMechshiftRescueV2", JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent("brightquest:game-complete", { detail: { gameId: "mechshift-rescue", level: 2, stars, seconds: state.elapsed, build: BUILD } }));
    } catch {}
  }

  function updateMissionHud() {
    const titles = ["Charge the couplers", "Allocate the shield reserve", "Program the Titan Bridge"];
    const instructions = ["Solve the charge plan and lock three sockets.", "Find each share and the active-run reserve.", "Prove the bridge length, then order the build."];
    const forms = ["Mag-Claw", "Shield Runner", "Titan Bridge"];
    dom.missionKicker.textContent = `Stormrail Convoy / Stage ${state.stage + 1}`;
    dom.missionTitle.textContent = titles[state.stage];
    dom.missionInstruction.textContent = instructions[state.stage];
    dom.formName.textContent = forms[state.stage];
    dom.chargeLabel.textContent = state.stage === 1 ? "Shield reserve" : "Relay charge";
    dom.progress.forEach((item, index) => item.classList.toggle("active", index <= state.stage));
    updateCharge();
  }

  function updateCharge() {
    const value = state.runActive ? Math.round(state.shieldEnergy / 120 * 100) : state.stage === 2 ? 78 : 100;
    dom.chargeValue.textContent = String(value);
    dom.chargeRing.style.borderColor = value < 35 ? "#ffd06c" : "#55efff";
    dom.chargeRing.style.borderRightColor = "rgba(85,239,255,.24)";
  }

  function togglePause(force) {
    if (!state.started || state.phase === "result") return;
    const next = typeof force === "boolean" ? force : !state.paused;
    state.paused = next;
    dom.pause.classList.toggle("hidden", !next);
    if (next) game.scene.pause("stormrail"); else game.scene.resume("stormrail");
    audio.setPaused(next);
  }

  function toggleMotion() {
    state.reducedMotion = !state.reducedMotion;
    document.body.classList.toggle("reduced-motion", state.reducedMotion);
    dom.motion.textContent = `Reduced motion: ${state.reducedMotion ? "on" : "off"}`;
    dom.motion.setAttribute("aria-pressed", String(state.reducedMotion));
    eventBus.dispatchEvent(new Event("motion"));
  }

  let captionTimer = 0;
  function speak(message, duration = 2600) {
    clearTimeout(captionTimer); dom.captions.textContent = message; dom.captions.classList.add("show"); captionTimer = setTimeout(() => dom.captions.classList.remove("show"), duration);
  }

  function changeLane(direction) { eventBus.dispatchEvent(new CustomEvent("lane", { detail: direction })); }
  function setShield(active) { dom.shield.classList.toggle("active", active); eventBus.dispatchEvent(new CustomEvent("shield", { detail: active })); }

  dom.launchButton.addEventListener("click", startLevel);
  dom.briefContinue.addEventListener("click", beginStage);
  dom.briefReplay.addEventListener("click", () => { audio.start(); audio.playBrief(state.stage); speak(`Stage ${state.stage + 1}. ${STAGES[state.stage].orders.join(". ")}.`, 6800); });
  dom.challengeClose.addEventListener("click", closeChallenge);
  dom.confirm.addEventListener("click", confirmChallenge);
  dom.hintButton.addEventListener("click", showHint);
  dom.pauseButton.addEventListener("click", () => togglePause());
  dom.resume.addEventListener("click", () => togglePause(false));
  dom.restart.addEventListener("click", () => location.reload());
  dom.motion.addEventListener("click", toggleMotion);
  dom.playAgain.addEventListener("click", () => location.reload());
  dom.sound.addEventListener("click", () => { audio.start(); const muted = audio.toggle(); dom.sound.textContent = muted ? "Muted" : "Sound"; dom.sound.setAttribute("aria-pressed", String(muted)); speak(muted ? "Sound muted. Captions remain on." : "Sound on.", 1700); });
  dom.laneUp.addEventListener("click", () => changeLane(-1));
  dom.laneDown.addEventListener("click", () => changeLane(1));
  dom.shield.addEventListener("pointerdown", (event) => { event.preventDefault(); dom.shield.setPointerCapture?.(event.pointerId); setShield(true); });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => dom.shield.addEventListener(type, () => setShield(false)));

  window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "KeyW"].includes(event.code)) { event.preventDefault(); changeLane(-1); }
    if (["ArrowDown", "KeyS"].includes(event.code)) { event.preventDefault(); changeLane(1); }
    if (event.code === "Space" && !event.repeat) { event.preventDefault(); setShield(true); }
    if (event.code === "Escape") { if (!dom.challenge.classList.contains("hidden")) closeChallenge(); else togglePause(); }
  });
  window.addEventListener("keyup", (event) => { if (event.code === "Space") setShield(false); });
  window.addEventListener("blur", () => setShield(false));
  window.addEventListener("pagehide", () => setShield(false));

  window.__STORMRAIL_QA__ = {
    build: BUILD,
    getState: () => ({ stage: state.stage, phase: state.phase, lane: state.lane, shieldHeld: state.shieldHeld, shieldEnergy: state.shieldEnergy, runElapsed: state.runElapsed, pulseIndex: state.pulseIndex, runActive: state.runActive, mistakes: state.mistakes, reducedMotion: state.reducedMotion }),
    getVisualState: () => ({
      runnerFrame: state.scene?.runner?.frame?.name,
      runnerX: state.scene?.runner?.x,
      runnerY: state.scene?.runner?.y,
      runnerAlpha: state.scene?.runner?.alpha,
      carrierFrames: state.scene?.carriers?.map((carrier) => carrier.frame.name),
      carrierY: state.scene?.carriers?.map((carrier) => carrier.y),
      skyX: state.scene?.sky?.x,
      shieldAlpha: state.scene?.shield?.alpha,
      titanAlpha: state.scene?.titan?.alpha
    }),
    getAudioState: () => audio.getState(),
    start: startLevel,
    showBrief: (index) => { dom.launch.classList.add("hidden"); state.started = true; showBrief(Math.max(0, Math.min(2, index))); },
    openChallenge: (index) => { dom.launch.classList.add("hidden"); dom.brief.classList.add("hidden"); state.started = true; openChallenge(Math.max(0, Math.min(2, index))); },
    solveCurrent: () => {
      if (state.stage === 0) { $("#usableCharge").value = "108"; $("#neededCharge").value = "96"; $("#spareCharge").value = "12"; state.couplers = [0,1,2]; drawCouplers("QA solution loaded."); restoreCouplerAnswers(); $("#usableCharge").value = "108"; $("#neededCharge").value = "96"; $("#spareCharge").value = "12"; }
      if (state.stage === 1) { $("#carrierShare").value = "57"; $("#crossingCost").value = "17"; $("#carrierReserve").value = "40"; }
      if (state.stage === 2) { state.bridgeAnswers = { total: "54", gap: "52", overlap: "2" }; state.bridgeSlots = ["rotate","anchor","energy"]; drawBridgePlan("QA solution loaded."); restoreBridgeAnswers(); }
    },
    confirm: confirmChallenge,
    startRun: () => { dom.launch.classList.add("hidden"); dom.brief.classList.add("hidden"); dom.challenge.classList.add("hidden"); state.started = true; startShieldRun(); },
    setLane: (lane) => { state.lane = Phaser.Math.Clamp(lane,0,2); state.scene?.placeActors(false); },
    forcePulse: (lane = state.lane) => { if (!state.runActive) startShieldRun(); state.pulse = { lane, impactAt: state.runElapsed + .15, startedAt: state.runElapsed }; },
    finishRun: () => { state.pulseIndex = 6; state.runElapsed = 31; state.pulse = null; finishShieldRun(); },
    startFinale: () => { dom.launch.classList.add("hidden"); dom.brief.classList.add("hidden"); dom.challenge.classList.add("hidden"); state.started = true; beginFinale(); }
  };
})();
