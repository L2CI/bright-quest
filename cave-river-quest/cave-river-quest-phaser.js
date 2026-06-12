(() => {
  "use strict";

  const BUILD_ID = "static-gate-pass-through-001";
  const assetBase = "./assets/generated/";
  const questions = [
    {
      type: "Maths Gate",
      title: "Crystal Count",
      text: "There are 4 blue crystals and 5 gold crystals. How many crystals glow in total?",
      answers: ["8", "9", "10", "11"],
      correct: "9"
    },
    {
      type: "Logic Gate",
      title: "The Odd Lantern",
      text: "Which one does not belong: river, boat, candle, oar?",
      answers: ["river", "boat", "candle", "oar"],
      correct: "candle"
    },
    {
      type: "Word Gate",
      title: "Cave Word",
      text: "Which word means almost the same as brave?",
      answers: ["sleepy", "courageous", "tiny", "silent"],
      correct: "courageous"
    },
    {
      type: "Pattern Gate",
      title: "Crystal Pattern",
      text: "What comes next: red, blue, red, blue, red, ?",
      answers: ["red", "blue", "green", "gold"],
      correct: "blue"
    },
    {
      type: "Riddle Gate",
      title: "River Riddle",
      text: "I have a mouth but never speak. I have a bed but never sleep. What am I?",
      answers: ["A river", "A dragon", "A lantern", "A cave"],
      correct: "A river"
    },
    {
      type: "Maths Gate",
      title: "Torch Trail",
      text: "If 3 torches are on the left wall and 4 are on the right wall, how many torches are there?",
      answers: ["6", "7", "8", "9"],
      correct: "7"
    },
    {
      type: "Grammar Gate",
      title: "The Best Sentence",
      text: "Which sentence is written correctly?",
      answers: ["The boat is fast.", "the boat is fast", "The boat are fast.", "Boat the fast is."],
      correct: "The boat is fast."
    },
    {
      type: "Logic Gate",
      title: "Silent Switch",
      text: "A lantern is on. One switch turns it off. What should you do first?",
      answers: ["Look at the switch", "Break the lantern", "Close your eyes", "Row backwards"],
      correct: "Look at the switch"
    },
    {
      type: "Word Gate",
      title: "Hidden Word",
      text: "Which word has the tiny word 'and' hiding inside it?",
      answers: ["boat", "candle", "cart", "stone"],
      correct: "candle"
    },
    {
      type: "Final Gate",
      title: "Leadership Choice",
      text: "A friend drops their paddle. What should a leader do?",
      answers: ["Laugh", "Help them", "Hide it", "Race away"],
      correct: "Help them"
    }
  ];

  const gateProgress = buildGateProgress(questions.length);
  const isQa = new URLSearchParams(window.location.search).has("qa");

  const el = {
    shell: document.querySelector(".quest-shell"),
    gateCount: document.querySelector("#gateCount"),
    hint: document.querySelector("#hintChip"),
    questionPanel: document.querySelector("#questionPanel"),
    questionType: document.querySelector("#questionType"),
    questionTitle: document.querySelector("#questionTitle"),
    questionText: document.querySelector("#questionText"),
    answerGrid: document.querySelector("#answerGrid"),
    feedback: document.querySelector("#feedbackText"),
    finalePanel: document.querySelector("#finalePanel"),
    claimButton: document.querySelector("#claimButton"),
    guardianPanel: document.querySelector("#guardianPanel"),
    guardianLine: document.querySelector("#guardianLine"),
    soundButton: document.querySelector("#soundButton"),
    forward: document.querySelector("#forwardButton"),
    fallback: document.querySelector("#fallbackNotice")
  };

  const state = {
    mode: "rowing",
    progress: 0,
    velocity: 0,
    forwardInput: 0,
    questionIndex: 0,
    arrivalTimer: 0,
    gateOpening: 0,
    boatPass: 0,
    boatApproach: 0,
    qaFrozen: false,
    lane: 0,
    soundEnabled: true,
    finalStarted: false,
    finaleClaimed: false,
    width: window.innerWidth,
    height: window.innerHeight
  };

  let sceneRef = null;
  let audio = null;

  class CaveRiverScene extends Phaser.Scene {
    constructor() {
      super("CaveRiverScene");
      this.plates = [];
      this.sparkles = [];
      this.wakeMarks = [];
      this.timeSeconds = 0;
    }

    preload() {
      this.load.image("plate1", assetBase + "journey-plate-1.png");
      this.load.image("plate2", assetBase + "journey-plate-2.png");
      this.load.image("plate3", assetBase + "journey-plate-3.png");
      this.load.image("plate4", assetBase + "journey-plate-4.png");
      this.load.image("plate5", assetBase + "journey-plate-5.png");
      this.load.image("gate", assetBase + "painted-gate-alpha.png");
      this.load.image("chest", assetBase + "treasure-chest-alpha.png");
      this.load.image("guardian", assetBase + "guardian-robot-alpha.png");
      this.load.spritesheet("boatRow", assetBase + "painted-rowboat-rowing-frames-alpha.png", {
        frameWidth: 543,
        frameHeight: 408
      });
    }

    create() {
      sceneRef = this;
      state.width = this.scale.width;
      state.height = this.scale.height;
      this.cameras.main.setBackgroundColor("#071523");

      this.plateKeys = ["plate1", "plate2", "plate3", "plate4", "plate5"];
      this.bgA = this.add.image(0, 0, "plate1").setOrigin(0.5).setDepth(0);
      this.bgB = this.add.image(0, 0, "plate2").setOrigin(0.5).setDepth(1).setAlpha(0);
      this.wash = this.add.rectangle(0, 0, 10, 10, 0x49dff2, 0).setOrigin(0).setBlendMode(Phaser.BlendModes.SCREEN).setDepth(2);
      this.waterFx = this.add.graphics().setDepth(3);
      this.sparkleLayer = this.add.layer().setDepth(4);
      this.chamberShade = this.add.rectangle(0, 0, 10, 10, 0x03101d, 0).setOrigin(0).setDepth(5);
      this.gateAura = this.add.circle(0, 0, 120, 0x5be7ff, 0).setBlendMode(Phaser.BlendModes.SCREEN).setDepth(6);
      this.gate = this.add.image(0, 0, "gate").setOrigin(0.5, 0.5).setDepth(7).setVisible(false);
      this.gateSeal = this.add.graphics().setDepth(8);
      this.gateDust = this.add.graphics().setDepth(8);
      this.chest = this.add.image(0, 0, "chest").setOrigin(0.5).setDepth(7).setVisible(false).setInteractive({ useHandCursor: true });
      this.boat = this.add.sprite(0, 0, "boatRow", 0).setOrigin(0.5).setDepth(9);
      this.guardian = this.add.image(0, 0, "guardian").setOrigin(0.5, 1).setDepth(8).setVisible(false).setAlpha(0);

      this.anims.create({
        key: "row",
        frames: this.anims.generateFrameNumbers("boatRow", { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
      });
      this.boat.play("row");

      for (let i = 0; i < 42; i += 1) {
        const dot = this.add.circle(0, 0, 1, i % 4 ? 0x70eaff : 0xffd56c, 0.35).setBlendMode(Phaser.BlendModes.SCREEN);
        this.sparkleLayer.add(dot);
        this.sparkles.push({ dot, seed: i * 97, speed: 0.025 + (i % 7) * 0.005 });
      }

      this.chest.on("pointerdown", () => claimFinale());
      this.scale.on("resize", (size) => {
        state.width = size.width;
        state.height = size.height;
        this.cameras.resize(size.width, size.height);
        layoutStaticObjects(this);
      });

      layoutStaticObjects(this);
      updateGateCount();
      setupInput();
      setupAudio();
      applyQaUrlState();
      updateDebugHook();
      window.__caveQuestBoot = { ok: true, stage: "ready", build: BUILD_ID, renderer: "phaser", engine: Phaser.VERSION };
    }

    update(time, delta) {
      const dt = Math.min(delta / 1000, 0.05);
      this.timeSeconds = time / 1000;
      if (!state.qaFrozen) {
        if (state.mode === "rowing") updateMovement(dt);
        if (state.mode === "approaching") updateApproach(dt);
        if (state.mode === "gate-open") updateGateOpen(dt);
        if (state.mode === "final") {
          state.progress = lerp(state.progress, 0.94, 1 - Math.pow(0.2, dt));
        }
      }
      if (!state.qaFrozen) updateBoatApproach(dt);
      renderJourney(this);
      renderWaterFx(this);
      renderGate(this);
      renderTreasureAndGuardian(this);
      renderBoat(this);
      updateDebugHook();
    }
  }

  function setupInput() {
    const setRowing = (active) => {
      if (state.mode !== "rowing") return;
      state.forwardInput = active ? 1 : 0;
      if (active) startWaterLoop();
      else stopWaterLoop();
    };
    el.forward.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      setRowing(true);
    });
    window.addEventListener("pointerup", () => setRowing(false));
    window.addEventListener("pointercancel", () => setRowing(false));
    window.addEventListener("blur", () => setRowing(false));
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") setRowing(true);
    });
    window.addEventListener("keyup", (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") setRowing(false);
    });
    el.soundButton.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      el.soundButton.textContent = state.soundEnabled ? "Sound on" : "Sound off";
      if (!state.soundEnabled) stopWaterLoop();
    });
  }

  function setupAudio() {
    const ctx = getAudioContext();
    audio = {
      ctx,
      water: null,
      gain: null
    };
  }

  function startWaterLoop() {
    if (!state.soundEnabled || !audio?.ctx || audio.water) return;
    resumeAudio();
    const noise = audio.ctx.createBufferSource();
    const buffer = audio.ctx.createBuffer(1, audio.ctx.sampleRate * 2, audio.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.28;
    }
    const filter = audio.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 620;
    const gain = audio.ctx.createGain();
    gain.gain.value = 0.018;
    noise.buffer = buffer;
    noise.loop = true;
    noise.connect(filter).connect(gain).connect(audio.ctx.destination);
    noise.start();
    audio.water = noise;
    audio.gain = gain;
  }

  function stopWaterLoop() {
    if (!audio?.water) return;
    try {
      audio.water.stop();
    } catch {
      // Already stopped.
    }
    audio.water = null;
    audio.gain = null;
  }

  function playTone(type) {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    resumeAudio();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(type === "wrong" ? 0.05 : 0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (type === "gate" ? 0.85 : 0.28));
    gain.connect(ctx.destination);
    const osc = ctx.createOscillator();
    osc.type = type === "wrong" ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(type === "wrong" ? 130 : 280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(type === "gate" ? 760 : 520, ctx.currentTime + 0.32);
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + (type === "gate" ? 0.9 : 0.32));
  }

  function playGateOpenSound() {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    resumeAudio();
    const now = ctx.currentTime;

    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.95), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const fade = 1 - i / data.length;
      data[i] = (Math.random() * 2 - 1) * fade * 0.55;
    }
    const rumble = ctx.createBufferSource();
    rumble.buffer = buffer;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(180, now);
    lowpass.frequency.exponentialRampToValueAtTime(760, now + 0.7);
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.0001, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
    rumble.connect(lowpass).connect(rumbleGain).connect(ctx.destination);
    rumble.start(now);
    rumble.stop(now + 1);

    const chimeGain = ctx.createGain();
    chimeGain.gain.setValueAtTime(0.0001, now + 0.16);
    chimeGain.gain.exponentialRampToValueAtTime(0.05, now + 0.22);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
    chimeGain.connect(ctx.destination);
    [392, 587, 784].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now + 0.18 + index * 0.035);
      osc.connect(chimeGain);
      osc.start(now + 0.18 + index * 0.035);
      osc.stop(now + 1.08);
    });
  }

  function playGateCloseSound() {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    resumeAudio();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
    gain.connect(ctx.destination);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(116, now);
    osc.frequency.exponentialRampToValueAtTime(58, now + 0.28);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  function getAudioContext() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!window.AudioContext) return null;
    if (!audio?.ctx) return new window.AudioContext();
    return audio.ctx;
  }

  function resumeAudio() {
    if (audio?.ctx?.state === "suspended") audio.ctx.resume();
  }

  function updateMovement(dt) {
    const target = state.forwardInput ? 0.055 : 0;
    state.velocity = lerp(state.velocity, target, 1 - Math.pow(0.015, dt));
    state.progress = clamp(state.progress + state.velocity * dt, 0, 0.94);
    state.lane = Math.sin((state.progress * 4.8 + 0.2) * Math.PI) * 0.18;
    const gate = gateProgress[state.questionIndex];
    if (gate && state.progress >= gate - 0.055) {
      state.progress = gate - 0.055;
      state.velocity = 0;
      state.forwardInput = 0;
      stopWaterLoop();
      beginGateApproach();
    }
    if (state.questionIndex >= gateProgress.length && state.progress > 0.9 && !state.finalStarted) {
      state.finalStarted = true;
      state.mode = "final";
      el.finalePanel.classList.remove("hidden");
      el.hint.textContent = "The treasure waits ahead. Tap the chest when it glows.";
    }
  }

  function beginGateApproach() {
    state.mode = "approaching";
    state.arrivalTimer = 0;
    state.boatPass = 0;
    el.hint.textContent = "The gate is ahead. Keep rowing into the lantern light.";
    startWaterLoop();
  }

  function updateApproach(dt) {
    state.arrivalTimer += dt;
    state.boatApproach = lerp(state.boatApproach, 1, 1 - Math.pow(0.018, dt));
    state.progress = (gateProgress[state.questionIndex] || state.progress) - 0.055;
    if (state.arrivalTimer >= 1.45) {
      stopWaterLoop();
      showQuestion(state.questionIndex);
    }
  }

  function updateGateOpen(dt) {
    state.gateOpening = clamp(state.gateOpening + dt / 1.45, 0, 1);
    state.boatPass = easeInOutCubic(state.gateOpening);
    const start = (gateProgress[state.questionIndex] || state.progress) - 0.018;
    const nextGate = gateProgress[state.questionIndex + 1];
    const end = nextGate ? nextGate - 0.13 : 0.88;
    state.progress = lerp(start, end, Math.pow(state.boatPass, 1.35));
    state.lane = Math.sin((state.progress * 4.8 + 0.2) * Math.PI) * 0.18;
    if (state.gateOpening >= 1) {
      state.questionIndex += 1;
      updateGateCount();
      state.mode = "rowing";
      state.gateOpening = 0;
      state.boatPass = 0;
      state.boatApproach = 0;
      stopWaterLoop();
      playGateCloseSound();
      el.hint.textContent = state.questionIndex >= questions.length
        ? "The vault is close. Row into the golden glow."
        : "Nice. Keep rowing to the next glowing gate.";
    }
  }

  function updateBoatApproach(dt) {
    const nextGate = gateProgress[state.questionIndex];
    let target = 0;
    if (state.mode === "approaching" || state.mode === "gate-open" || state.mode === "question") target = 1;
    else if (nextGate) target = clamp(1 - (nextGate - state.progress) / 0.16, 0, 0.42);
    else if (state.progress > 0.76) target = clamp((state.progress - 0.76) / 0.16, 0, 1);
    state.boatApproach = lerp(state.boatApproach, target, 1 - Math.pow(0.03, dt));
  }

  function renderJourney(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const journey = clamp(state.progress / 0.92, 0, 0.999) * (scene.plateKeys.length - 1);
    const index = Math.min(scene.plateKeys.length - 1, Math.floor(journey));
    const local = journey - index;
    const nextIndex = Math.min(scene.plateKeys.length - 1, index + 1);
    const fade = smoothstep(0.34, 0.82, local);
    setPlate(scene.bgA, scene.plateKeys[index], w, h, index, local, 1 - fade * 0.45, scene.timeSeconds);
    setPlate(scene.bgB, scene.plateKeys[nextIndex], w, h, nextIndex, local - 1, nextIndex === index ? 0 : fade, scene.timeSeconds);
    const washColors = [0x2ad8e8, 0x68e2ac, 0x8b76ff, 0xffc253, 0x52e7ff];
    const reveal = Math.sin(clamp(local, 0, 1) * Math.PI);
    scene.wash.setPosition(0, 0).setSize(w, h).setFillStyle(washColors[(index + 1) % washColors.length], Math.max(reveal * 0.1, fade * 0.07));

    scene.sparkles.forEach((sparkle, i) => {
      const t = (i * 0.071 + scene.timeSeconds * sparkle.speed + journey * 0.05) % 1;
      sparkle.dot.setPosition(
        (w * ((sparkle.seed % 100) / 100) + Math.sin(scene.timeSeconds * 0.4 + i) * 22) % w,
        h * (0.12 + t * 0.72)
      );
      sparkle.dot.setRadius(Phaser.Math.Linear(1, 3.4, t));
      sparkle.dot.setAlpha(Phaser.Math.Linear(0.08, 0.36, t));
    });
  }

  function setPlate(image, key, w, h, index, local, alpha, time) {
    if (image.texture.key !== key) image.setTexture(key);
    const travel = state.progress * 2.1 + index * 0.23;
    const panX = Math.sin(travel * Math.PI * 1.75) * 0.055 + local * 0.052 + state.lane * 0.035;
    const panY = Math.cos(travel * Math.PI * 1.18) * 0.026 - state.boatApproach * 0.026 + local * 0.018;
    const zoom = 1.07 + state.boatApproach * 0.05 + Math.abs(local) * 0.018 + Math.sin(time * 0.08 + index) * 0.004;
    coverImage(image, w, h, zoom);
    image.setPosition(w * (0.5 - panX * 0.52), h * (0.5 - panY * 0.44));
    image.setAlpha(alpha);
  }

  function renderWaterFx(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const g = scene.waterFx;
    g.clear();
    g.setBlendMode(Phaser.BlendModes.SCREEN);
    for (let i = 0; i < 34; i += 1) {
      const t = (i / 34 + scene.timeSeconds * 0.06 + state.progress * 2.4) % 1;
      const y = lerp(h * 0.17, h * 1.05, Math.pow(t, 1.18));
      const x = w * 0.5 + Math.sin((t + state.progress) * Math.PI * 2.3) * w * 0.08 + state.lane * w * 0.06 * t;
      const len = lerp(w * 0.04, w * 0.34, t);
      g.lineStyle(Phaser.Math.Linear(1, 3, t), 0xdfffff, Phaser.Math.Linear(0.06, 0.24, t));
      g.beginPath();
      for (let step = 0; step <= 8; step += 1) {
        const u = step / 8;
        const px = lerp(x - len, x + len, u);
        const py = y + Math.sin(scene.timeSeconds + i + u * Math.PI) * 7 * (1 - Math.abs(u - 0.5));
        if (step === 0) g.moveTo(px, py);
        else g.lineTo(px, py);
      }
      g.strokePath();
    }
    if (state.forwardInput) {
      const bx = w * 0.5 + state.lane * w * 0.13;
      const by = lerp(h * 0.72, h * 0.66, state.boatApproach);
      for (let side of [-1, 1]) {
        g.lineStyle(3, 0xdfffff, 0.38);
        g.strokeEllipse(bx + side * w * 0.18, by + h * 0.12, w * 0.09, h * 0.035);
      }
    }
  }

  function renderGate(scene) {
    const gate = gateProgress[state.questionIndex];
    if (!gate) {
      scene.gate.setVisible(false);
      scene.gateAura.setAlpha(0);
      scene.chamberShade.setAlpha(0);
      scene.gateSeal?.clear();
      scene.gateDust?.clear();
      return;
    }
    if (state.mode === "rowing") {
      renderDistantGateHint(scene, gate);
      return;
    }
    if (state.mode !== "approaching" && state.mode !== "question" && state.mode !== "gate-open") {
      scene.gate.setVisible(false);
      scene.gateAura.setAlpha(0);
      scene.chamberShade.setAlpha(0);
      scene.gateSeal?.clear();
      scene.gateDust?.clear();
      return;
    }
    const w = scene.scale.width;
    const h = scene.scale.height;
    const arrivalEase = state.mode === "approaching"
      ? easeOutCubic(clamp(state.arrivalTimer / 0.34, 0, 1))
      : 1;
    const openingEase = easeOutCubic(state.gateOpening);
    const targetWidth = Math.min(w * 0.42, h * 0.54, 600);
    const texture = scene.textures.get("gate").getSourceImage();
    const gateX = w * 0.5;
    const gateY = h * 0.37;
    const gateHeight = targetWidth * (texture.height / texture.width);
    scene.chamberShade
      .setPosition(0, 0)
      .setSize(w, h)
      .setFillStyle(0x03101d, 0.1 + arrivalEase * 0.28)
      .setAlpha(1);
    scene.gateAura
      .setPosition(gateX, gateY)
      .setRadius(Math.min(w * 0.24, 240) * (1 + Math.sin(scene.timeSeconds * 2.2) * 0.03 + openingEase * 0.18))
      .setAlpha((0.18 + Math.sin(scene.timeSeconds * 2.6) * 0.035) * arrivalEase + openingEase * 0.3);
    scene.gate
      .setVisible(true)
      .setDepth(7)
      .setAlpha(arrivalEase)
      .setDisplaySize(targetWidth, gateHeight)
      .setPosition(gateX, gateY);
    renderGateSeal(scene, gateX, gateY, targetWidth, gateHeight, arrivalEase, openingEase);
  }

  function renderDistantGateHint(scene, gate) {
    const distance = gate - state.progress;
    const visibleDistance = 0.18;
    const stopDistance = 0.055;
    if (distance < stopDistance || distance > visibleDistance) {
      scene.gate.setVisible(false);
      scene.gateAura.setAlpha(0);
      scene.chamberShade.setAlpha(0);
      scene.gateSeal?.clear();
      scene.gateDust?.clear();
      return;
    }
    const w = scene.scale.width;
    const h = scene.scale.height;
    const approach = 1 - clamp((distance - stopDistance) / (visibleDistance - stopDistance), 0, 1);
    const depthEase = easeInOutCubic(approach);
    const pathX = w * 0.5 + Math.sin((gate * 5.8 + 0.45) * Math.PI) * w * 0.018;
    const y = h * 0.36;
    const maxWidth = Math.min(w * 0.3, h * 0.38, 360);
    const targetWidth = maxWidth * lerp(0.22, 0.34, depthEase);
    const texture = scene.textures.get("gate").getSourceImage();
    const alpha = smoothstep(0.1, 0.42, approach) * 0.48;
    scene.chamberShade.setAlpha(0);
    scene.gateAura
      .setPosition(pathX, y)
      .setRadius(Math.min(w * 0.1, 112))
      .setAlpha(alpha * 0.18);
    scene.gate
      .setVisible(true)
      .setAlpha(alpha)
      .setDisplaySize(targetWidth, targetWidth * (texture.height / texture.width))
      .setPosition(pathX, y);
  }

  function renderGateSeal(scene, gateX, gateY, gateWidth, gateHeight, arrivalEase, openingEase) {
    const seal = scene.gateSeal;
    const dust = scene.gateDust;
    seal.clear();
    dust.clear();
    const closedAlpha = arrivalEase * (1 - openingEase);
    const portalW = gateWidth * 0.34;
    const portalH = gateHeight * 0.36;
    const portalY = gateY + gateHeight * 0.06;
    if (closedAlpha > 0.02) {
      seal.setBlendMode(Phaser.BlendModes.SCREEN);
      seal.fillStyle(0x09263c, 0.52 * closedAlpha);
      seal.fillRoundedRect(gateX - portalW * 0.52, portalY - portalH * 0.5, portalW * 1.04, portalH, portalW * 0.12);
      seal.lineStyle(Math.max(2, gateWidth * 0.014), 0x58efff, 0.36 * closedAlpha);
      seal.strokeRoundedRect(gateX - portalW * 0.52, portalY - portalH * 0.5, portalW * 1.04, portalH, portalW * 0.12);
      for (let i = -2; i <= 2; i += 1) {
        const x = gateX + i * portalW * 0.18;
        seal.lineStyle(Math.max(2, gateWidth * 0.012), 0xffd56c, (0.56 - Math.abs(i) * 0.06) * closedAlpha);
        seal.lineBetween(x, portalY - portalH * 0.43, x, portalY + portalH * 0.43);
      }
    }
    if (openingEase > 0.02) {
      dust.setBlendMode(Phaser.BlendModes.SCREEN);
      for (let i = 0; i < 24; i += 1) {
        const seed = i * 12.9898;
        const t = (openingEase + (i % 7) * 0.035) % 1;
        const angle = seed + scene.timeSeconds * 0.25;
        const radius = portalW * lerp(0.14, 0.72, t);
        const x = gateX + Math.cos(angle) * radius;
        const y = portalY + Math.sin(angle * 1.7) * portalH * 0.32 - openingEase * gateHeight * 0.13;
        dust.fillStyle(i % 3 ? 0x70efff : 0xffd56c, (1 - t) * openingEase * 0.55);
        dust.fillCircle(x, y, lerp(1.5, 5, 1 - t));
      }
    }
  }

  function renderTreasureAndGuardian(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const t = clamp((state.progress - 0.76) / 0.18, 0, 1);
    if (t > 0) {
      const chestWidth = Math.min(w * 0.26, 320) * lerp(0.62, 1.0, easeOutCubic(t));
      const chestTexture = scene.textures.get("chest").getSourceImage();
      scene.chest
        .setVisible(true)
        .setDisplaySize(chestWidth, chestWidth * (chestTexture.height / chestTexture.width))
        .setPosition(w * 0.5, lerp(h * 0.28, h * 0.43, t))
        .setAlpha(t);
    } else {
      scene.chest.setVisible(false);
    }
    if (state.finaleClaimed) {
      const guardianWidth = Math.min(w * 0.24, 260);
      const guardianTexture = scene.textures.get("guardian").getSourceImage();
      scene.guardian
        .setVisible(true)
        .setAlpha(lerp(scene.guardian.alpha, 1, 0.04))
        .setDisplaySize(guardianWidth, guardianWidth * (guardianTexture.height / guardianTexture.width))
        .setPosition(w * 0.75, h * 0.82 + Math.sin(scene.timeSeconds * 1.4) * 5);
    }
  }

  function renderBoat(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const isNarrow = w < 720;
    const nearWidth = isNarrow ? 0.58 : 0.42;
    const farWidth = isNarrow ? 0.46 : 0.32;
    const nearHeightCap = isNarrow ? 0.46 : 0.72;
    const farHeightCap = isNarrow ? 0.38 : 0.56;
    const nearY = isNarrow ? 0.69 : 0.74;
    const farY = isNarrow ? 0.6 : 0.66;
    const approach = state.mode === "approaching"
      ? easeInOutCubic(clamp(state.arrivalTimer / 1.45, 0, 1))
      : state.boatApproach;
    let x = w * 0.5 + state.lane * w * 0.13;
    let y = lerp(h * nearY, h * farY, approach) + Math.sin(scene.timeSeconds * 2.2) * 4;
    let scaleT = approach;
    let alpha = 1;
    let depth = 9;

    if (state.mode === "question") {
      scaleT = 1;
      x = w * 0.5;
      y = h * (isNarrow ? 0.59 : 0.61) + Math.sin(scene.timeSeconds * 1.8) * 2;
    }

    if (state.mode === "gate-open") {
      const pass = state.boatPass;
      const passEase = easeInOutCubic(pass);
      const startY = h * (isNarrow ? 0.6 : 0.62);
      const gateY = h * 0.37;
      x = lerp(w * 0.5, w * 0.5 + Math.sin((state.questionIndex + 1) * 1.7) * w * 0.018, passEase);
      y = lerp(startY, gateY + h * 0.04, passEase) + Math.sin(scene.timeSeconds * 2.6) * lerp(3, 0, passEase);
      scaleT = lerp(1, 1.72, passEase);
      alpha = lerp(1, 0.16, smoothstep(0.9, 1, passEase));
      depth = passEase > 0.82 ? 6 : 9;
    }

    const width = Math.min(w * lerp(nearWidth, farWidth, scaleT), h * lerp(nearHeightCap, farHeightCap, scaleT));
    scene.boat.setDisplaySize(width, width * (408 / 543));
    scene.boat.setPosition(x, y);
    scene.boat.setDepth(depth);
    scene.boat.setAlpha(alpha);
    const rowing = state.forwardInput || state.mode === "approaching" || state.mode === "gate-open";
    scene.boat.setFrame(rowing ? Math.floor(scene.timeSeconds * 8) % 4 : Math.floor(scene.timeSeconds * 2) % 2);
  }

  function showQuestion(index) {
    const question = questions[index];
    if (!question) return;
    state.mode = "question";
    state.forwardInput = 0;
    state.arrivalTimer = 0;
    el.questionType.textContent = question.type;
    el.questionTitle.textContent = question.title;
    el.questionText.textContent = question.text;
    el.feedback.textContent = "";
    el.answerGrid.textContent = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = answer;
      button.addEventListener("click", () => answerQuestion(answer));
      el.answerGrid.appendChild(button);
    });
    el.questionPanel.classList.remove("hidden");
    el.hint.textContent = "Answer the gate challenge to open the way.";
  }

  function answerQuestion(answer) {
    const question = questions[state.questionIndex];
    if (!question) return;
    if (answer !== question.correct) {
      el.feedback.textContent = "Try again. Read it carefully.";
      playTone("wrong");
      return;
    }
    el.feedback.textContent = "Correct. The gate opens.";
    playGateOpenSound();
    sceneRef?.cameras.main.shake(180, 0.004);
    setTimeout(() => {
      el.questionPanel.classList.add("hidden");
      state.mode = "gate-open";
      state.gateOpening = 0;
      state.boatPass = 0;
      startWaterLoop();
    }, 450);
  }

  function claimFinale() {
    if (!state.finalStarted || state.finaleClaimed) return;
    state.finaleClaimed = true;
    el.finalePanel.classList.add("hidden");
    el.guardianLine.textContent = "Autobot, you now have the Matrix of Leadership.";
    el.guardianPanel.classList.remove("hidden");
    el.hint.textContent = "Quest complete. You earned the Leadership Matrix.";
    speakFinale();
    playTone("gate");
  }

  function speakFinale() {
    if (!state.soundEnabled || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance("Autobot, you now have the Matrix of Leadership.");
    utterance.rate = 0.72;
    utterance.pitch = 0.62;
    utterance.volume = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((voice) => /male|david|mark|guy|english/i.test(voice.name));
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function layoutStaticObjects(scene) {
    renderJourney(scene);
    renderGate(scene);
    renderBoat(scene);
  }

  function coverImage(image, width, height, zoom) {
    const source = image.texture.getSourceImage();
    const scale = Math.max(width / source.width, height / source.height) * zoom;
    image.setScale(scale);
  }

  function updateGateCount() {
    el.gateCount.textContent = `${Math.min(state.questionIndex, questions.length)}/${questions.length}`;
  }

  function updateDebugHook() {
    window.__caveQuestDebug = {
      build: BUILD_ID,
      getState: () => ({
        mode: state.mode,
        progress: Number(state.progress.toFixed(5)),
        velocity: Number(state.velocity.toFixed(5)),
        forwardInput: state.forwardInput,
        gateOpening: Number(state.gateOpening.toFixed(5)),
        boatPass: Number(state.boatPass.toFixed(5)),
        arrivalTimer: Number(state.arrivalTimer.toFixed(5)),
        questionIndex: state.questionIndex,
        boatApproach: Number(state.boatApproach.toFixed(5)),
        qaFrozen: state.qaFrozen,
        renderer: "phaser",
        engine: Phaser.VERSION
      }),
      setRowing: (active) => {
        state.forwardInput = active ? 1 : 0;
        return true;
      },
      setProgressForQa: (value) => {
        if (!isQa) return false;
        state.progress = clamp(Number(value) || 0, 0, 0.94);
        state.velocity = 0;
        state.mode = "rowing";
        state.arrivalTimer = 0;
        state.gateOpening = 0;
        state.boatPass = 0;
        state.qaFrozen = false;
        state.questionIndex = gateProgress.findIndex((gate) => gate > state.progress + 0.02);
        if (state.questionIndex < 0) state.questionIndex = gateProgress.length;
        state.boatApproach = 0;
        el.questionPanel.classList.add("hidden");
        el.finalePanel.classList.add("hidden");
        return true;
      },
      arriveAtGateForQa: (index = state.questionIndex) => {
        if (!isQa) return false;
        const gateIndex = clamp(Math.floor(Number(index) || 0), 0, gateProgress.length - 1);
        state.questionIndex = gateIndex;
        state.progress = gateProgress[gateIndex] - 0.022;
        state.velocity = 0;
        state.forwardInput = 0;
        state.boatApproach = 0.45;
        state.qaFrozen = false;
        beginGateApproach();
        el.questionPanel.classList.add("hidden");
        el.finalePanel.classList.add("hidden");
        return true;
      },
      startFinalForQa: () => {
        if (!isQa) return false;
        state.progress = 0.94;
        state.mode = "final";
        state.finalStarted = true;
        state.questionIndex = questions.length;
        state.qaFrozen = false;
        el.finalePanel.classList.remove("hidden");
        updateGateCount();
        return true;
      }
    };
  }

  function applyQaUrlState() {
    if (!isQa) return;
    const params = new URLSearchParams(window.location.search);
    const qaState = params.get("qaState");
    if (!qaState) return;
    const gateIndex = clamp(Math.floor(Number(params.get("gate")) || 0), 0, gateProgress.length - 1);
    state.questionIndex = gateIndex;
    state.progress = gateProgress[gateIndex] - 0.055;
    state.velocity = 0;
    state.forwardInput = 0;
    state.lane = 0;
    state.boatApproach = 0;
    state.gateOpening = 0;
    state.boatPass = 0;
    state.qaFrozen = true;
    el.questionPanel.classList.add("hidden");
    el.finalePanel.classList.add("hidden");

    if (qaState === "approach") {
      state.mode = "approaching";
      state.arrivalTimer = Number(params.get("t")) || 0.78;
      state.boatApproach = easeInOutCubic(clamp(state.arrivalTimer / 1.45, 0, 1));
      el.hint.textContent = "QA: gate is fixed while the boat approaches.";
      return;
    }
    if (qaState === "question") {
      state.mode = "question";
      state.boatApproach = 1;
      showQuestion(gateIndex);
      return;
    }
    if (qaState === "open" || qaState === "pass") {
      state.mode = "gate-open";
      state.boatApproach = 1;
      state.gateOpening = qaState === "open" ? 0.38 : 0.62;
      state.boatPass = easeInOutCubic(state.gateOpening);
      el.hint.textContent = qaState === "open"
        ? "QA: gate opens in place."
        : "QA: boat slips through the open gate.";
      return;
    }
    if (qaState === "final") {
      state.progress = 0.94;
      state.mode = "final";
      state.finalStarted = true;
      state.questionIndex = questions.length;
      el.finalePanel.classList.remove("hidden");
      updateGateCount();
    }
  }

  function buildGateProgress(count) {
    const first = 0.12;
    const last = 0.86;
    return Array.from({ length: count }, (_, index) => lerp(first, last, index / Math.max(1, count - 1)));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  }

  function easeInOutCubic(t) {
    const clamped = clamp(t, 0, 1);
    return clamped < 0.5
      ? 4 * clamped * clamped * clamped
      : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
  }

  function startGame() {
    window.__caveQuestBoot = { ok: false, stage: "loading", build: BUILD_ID, renderer: "phaser" };
    try {
      new Phaser.Game({
        type: Phaser.AUTO,
        parent: "questGame",
        backgroundColor: "#071523",
        scale: {
          mode: Phaser.Scale.RESIZE,
          width: window.innerWidth,
          height: window.innerHeight
        },
        render: {
          antialias: true,
          pixelArt: false,
          roundPixels: false
        },
        scene: CaveRiverScene
      });
    } catch (error) {
      console.error(error);
      window.__caveQuestBoot = { ok: false, stage: "failed", build: BUILD_ID, message: error?.message || String(error) };
      el.fallback.classList.remove("hidden");
    }
  }

  startGame();
})();
