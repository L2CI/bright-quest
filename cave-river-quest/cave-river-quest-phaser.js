(() => {
  "use strict";

  const BUILD_ID = "stable-rowing-010";
  const assetBase = "./assets/generated/";
  const questions = [
    {
      type: "Maths Gate",
      title: "Lantern Rows",
      text: "Four rows have 6 lanterns each. Three lanterns go out, then 5 new ones are lit. How many glow now?",
      answers: ["21", "24", "26", "29"],
      correct: "26"
    },
    {
      type: "Logic Gate",
      title: "Factor Lock",
      text: "The lock opens for a number that is a factor of 36 and also greater than 6. Which number works?",
      answers: ["5", "6", "9", "14"],
      correct: "9"
    },
    {
      type: "Word Gate",
      title: "Cave Meaning",
      text: "In 'The narrow tunnel made the rower cautious,' which clue best helps you know cautious means careful?",
      answers: ["narrow tunnel", "the rower", "made the", "cave color"],
      correct: "narrow tunnel"
    },
    {
      type: "Pattern Gate",
      title: "Fraction Torch",
      text: "A torch burns for 3/4 of an hour. Another burns for 1/4 of an hour. How long do they burn altogether?",
      answers: ["1/2 hour", "1 hour", "1 1/4 hours", "2 hours"],
      correct: "1 hour"
    },
    {
      type: "Inference Gate",
      title: "Wet Footprints",
      text: "Wet footprints lead from the river to a dry tunnel, and the lantern there is still swinging. What is the best inference?",
      answers: ["Someone climbed out recently", "The cave is dry", "The boat flew", "The lantern walked"],
      correct: "Someone climbed out recently"
    },
    {
      type: "Maths Gate",
      title: "Elapsed Time",
      text: "The boat leaves at 3:20 and reaches the next gate at 4:05. How long did the trip take?",
      answers: ["35 minutes", "45 minutes", "50 minutes", "1 hour"],
      correct: "45 minutes"
    },
    {
      type: "Grammar Gate",
      title: "Best Sentence",
      text: "Which revision combines the ideas best? 'The river was dark. The river was calm.'",
      answers: ["The river was dark and calm.", "The river was dark calm.", "Dark the river was calm.", "The river and was dark calm."],
      correct: "The river was dark and calm."
    },
    {
      type: "Geometry Gate",
      title: "Angle Signal",
      text: "The gate symbol has an angle smaller than a right angle. What kind of angle is it?",
      answers: ["acute", "obtuse", "straight", "square"],
      correct: "acute"
    },
    {
      type: "Word Gate",
      title: "Prefix Power",
      text: "If a map is 'misread,' what most likely happened?",
      answers: ["It was read wrongly", "It was read twice", "It was read aloud", "It was not a map"],
      correct: "It was read wrongly"
    },
    {
      type: "Final Gate",
      title: "Leadership Choice",
      text: "Your team is nervous before the final gate. What is the strongest leadership choice?",
      answers: ["Blame them", "Make a plan together", "Quit the quest", "Grab the treasure alone"],
      correct: "Make a plan together"
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
    transitionStart: 0,
    transitionEnd: 0,
    sceneStep: 0,
    sceneTravel: 0,
    shotProgress: 0,
    shotVelocity: 0,
    qaFrozen: false,
    lastSplashAt: 0,
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
      this.load.image("plate6", assetBase + "journey-plate-6.png");
      this.load.image("plate7", assetBase + "journey-plate-7.png");
      this.load.image("plate8", assetBase + "journey-plate-8.png");
      this.load.image("plate9", assetBase + "journey-plate-9.png");
      this.load.image("plate10", assetBase + "journey-plate-10.png");
      this.load.image("gate", assetBase + "stone-gate-v3-alpha.png");
      this.load.image("chest", assetBase + "treasure-chest-alpha.png");
      this.load.image("guardian", assetBase + "guardian-robot-alpha.png");
      this.load.audio("riverLoop", "./assets/audio/mixkit-river-water-flowing.mp3");
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

      this.plateKeys = ["plate1", "plate2", "plate3", "plate4", "plate5", "plate6", "plate7", "plate8", "plate9", "plate10"];
      this.bgA = this.add.image(0, 0, "plate1").setOrigin(0.5).setDepth(0);
      this.bgB = this.add.image(0, 0, "plate2").setOrigin(0.5).setDepth(1).setAlpha(0);
      this.wash = this.add.rectangle(0, 0, 10, 10, 0x49dff2, 0).setOrigin(0).setBlendMode(Phaser.BlendModes.SCREEN).setDepth(2);
      this.waterFx = this.add.graphics().setDepth(3);
      this.sparkleLayer = this.add.layer().setDepth(4);
      this.chamberShade = this.add.rectangle(0, 0, 10, 10, 0x03101d, 0).setOrigin(0).setDepth(5);
      this.gateAura = this.add.circle(0, 0, 120, 0x5be7ff, 0).setBlendMode(Phaser.BlendModes.SCREEN).setDepth(6);
      this.gate = this.add.image(0, 0, "gate").setOrigin(0.5, 0.5).setDepth(7).setVisible(false);
      this.gateDoor = this.add.graphics().setDepth(8);
      this.gateSeal = this.add.graphics().setDepth(8);
      this.gateDust = this.add.graphics().setDepth(8);
      this.chestGlow = this.add.graphics().setDepth(8);
      this.chest = this.add.image(0, 0, "chest").setOrigin(0.5).setDepth(10).setVisible(false).setInteractive({ useHandCursor: true });
      this.boat = this.add.sprite(0, 0, "boatRow", 0).setOrigin(0.5).setDepth(9);
      this.guardian = this.add.image(0, 0, "guardian").setOrigin(0.5, 1).setDepth(8).setVisible(false).setAlpha(0);
      this.riverLoop = this.sound.add("riverLoop", { loop: true, volume: 0.36 });

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
      updateRiverAmbience();
      updateDebugHook();
    }
  }

  function setupInput() {
    const setRowing = (active) => {
      if (state.mode !== "rowing") return;
      if (active) startRiverAmbience();
      state.forwardInput = active ? 1 : 0;
      if (active) startWaterLoop();
      else stopWaterLoop();
    };
    el.forward.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      setRowing(true);
    });
    [el.forward, el.soundButton].forEach((control) => {
      control.addEventListener("contextmenu", (event) => event.preventDefault());
      control.addEventListener("selectstart", (event) => event.preventDefault());
      control.addEventListener("dragstart", (event) => event.preventDefault());
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
      if (state.soundEnabled) startRiverAmbience();
      else stopAllLoops();
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

  function startRiverAmbience() {
    if (!state.soundEnabled || !sceneRef?.riverLoop) return;
    resumeAudio();
    if (!sceneRef.riverLoop.isPlaying) {
      sceneRef.riverLoop.play();
    }
    sceneRef.riverLoop.setVolume(state.mode === "question" ? 0.24 : 0.38);
  }

  function updateRiverAmbience() {
    if (!state.soundEnabled || !sceneRef?.riverLoop?.isPlaying) return;
    const target = state.mode === "question" ? 0.22 : state.mode === "gate-open" ? 0.42 : 0.36;
    sceneRef.riverLoop.setVolume(lerp(sceneRef.riverLoop.volume, target, 0.035));
  }

  function stopAllLoops() {
    stopWaterLoop();
    if (sceneRef?.riverLoop?.isPlaying) {
      sceneRef.riverLoop.stop();
    }
  }

  function playRowSplash() {
    if (!state.soundEnabled || !audio?.ctx) return;
    resumeAudio();
    const now = audio.ctx.currentTime;
    const buffer = audio.ctx.createBuffer(1, Math.floor(audio.ctx.sampleRate * 0.16), audio.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2) * 0.42;
    }
    const source = audio.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = audio.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1150 + Math.random() * 260;
    filter.Q.value = 0.8;
    const gain = audio.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    source.connect(filter).connect(gain).connect(audio.ctx.destination);
    source.start(now);
    source.stop(now + 0.2);
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
    if (type === "wrong") {
      playSoftKnock(ctx);
      return;
    }
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

  function playSoftKnock(ctx) {
    const now = ctx.currentTime;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3) * 0.32;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);
    source.stop(now + 0.24);
  }

  function playSuccessSparkle() {
    if (!state.soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    resumeAudio();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.042, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
    gain.connect(ctx.destination);
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now + index * 0.045);
      osc.connect(gain);
      osc.start(now + index * 0.045);
      osc.stop(now + 0.74);
    });
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
    if (sceneRef?.sound?.context?.state === "suspended") sceneRef.sound.context.resume();
  }

  function updateMovement(dt) {
    const gate = gateProgress[state.questionIndex];
    if (gate) {
      const previousGate = state.questionIndex > 0 ? gateProgress[state.questionIndex - 1] : 0;
      const gap = Math.max(0.04, gate - previousGate);
      const start = state.questionIndex > 0 ? previousGate + gap * 0.08 : 0;
      const end = gate - 0.055;
      const target = state.forwardInput ? 0.27 : 0;
      state.shotVelocity = lerp(state.shotVelocity, target, 1 - Math.pow(0.025, dt));
      state.shotProgress = clamp(state.shotProgress + state.shotVelocity * dt, 0, 1);
      const shotEase = easeInOutCubic(state.shotProgress);
      state.velocity = state.shotVelocity;
      state.progress = lerp(start, end, shotEase);
      state.lane = Math.sin((state.sceneStep * 0.7 + state.shotProgress * 1.25 + 0.2) * Math.PI) * 0.18;
    }
    if (gate && state.shotProgress >= 1) {
      state.progress = gate - 0.055;
      state.velocity = 0;
      state.shotVelocity = 0;
      state.forwardInput = 0;
      stopWaterLoop();
      beginGateApproach();
    }
    if (state.questionIndex >= gateProgress.length && state.progress > 0.9 && !state.finalStarted) {
      state.finalStarted = true;
      state.mode = "final";
      el.finalePanel.classList.add("hidden");
      el.hint.textContent = "The treasure waits ahead. Tap the glowing chest.";
      playSuccessSparkle();
    }
  }

  function beginGateApproach() {
    state.mode = "approaching";
    state.arrivalTimer = 0;
    state.boatPass = 0;
    el.hint.textContent = "The gate is ahead. Keep rowing into the lantern light.";
    startWaterLoop();
    startRiverAmbience();
  }

  function updateApproach(dt) {
    state.arrivalTimer += dt;
    state.boatApproach = lerp(state.boatApproach, 1, 1 - Math.pow(0.018, dt));
    state.progress = (gateProgress[state.questionIndex] || state.progress) - 0.055;
    if (state.arrivalTimer >= 1.72) {
      stopWaterLoop();
      showQuestion(state.questionIndex);
    }
  }

  function updateGateOpen(dt) {
    state.gateOpening = clamp(state.gateOpening + dt / 1.45, 0, 1);
    state.boatPass = easeInOutCubic(state.gateOpening);
    const currentGate = gateProgress[state.questionIndex] || state.progress;
    const nextGate = gateProgress[state.questionIndex + 1];
    const gap = nextGate ? nextGate - currentGate : 0.08;
    const fallbackStart = nextGate ? currentGate + gap * 0.03 : 0.875;
    const fallbackEnd = nextGate ? Math.min(nextGate - 0.058, currentGate + gap * 0.08) : 0.9;
    const start = state.transitionStart || fallbackStart;
    const end = state.transitionEnd || fallbackEnd;
    state.progress = lerp(start, end, Math.pow(state.boatPass, 0.72));
    state.lane = Math.sin((state.progress * 4.8 + 0.2) * Math.PI) * 0.18;
    if (state.gateOpening >= 1) {
      state.questionIndex += 1;
      state.sceneStep = Math.min(state.questionIndex, sceneRef?.plateKeys?.length ? sceneRef.plateKeys.length - 1 : questions.length - 1);
      updateGateCount();
      state.mode = "rowing";
      state.gateOpening = 0;
      state.boatPass = 0;
      state.transitionStart = 0;
      state.transitionEnd = 0;
      state.shotProgress = 0;
      state.shotVelocity = 0;
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
    else if (nextGate) target = clamp(0.05 + state.shotProgress * 0.48, 0, 0.48);
    else if (state.progress > 0.76) target = clamp((state.progress - 0.76) / 0.16, 0, 1);
    state.boatApproach = lerp(state.boatApproach, target, 1 - Math.pow(0.03, dt));
  }

  function renderJourney(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const frame = getJourneyFrame(scene);
    const index = frame.index;
    const local = frame.local;
    const nextIndex = Math.min(scene.plateKeys.length - 1, index + 1);
    const fade = nextIndex === index ? 0 : smoothstep(0.86, 0.99, local) * 0.18;
    setPlate(scene.bgA, scene.plateKeys[index], w, h, index, local, 1, scene.timeSeconds);
    setPlate(scene.bgB, scene.plateKeys[nextIndex], w, h, nextIndex, local - 1, fade, scene.timeSeconds);
    const washColors = [0x2ad8e8, 0x68e2ac, 0x8b76ff, 0xffc253, 0x52e7ff];
    const reveal = Math.sin(clamp(local, 0, 1) * Math.PI);
    scene.wash.setPosition(0, 0).setSize(w, h).setFillStyle(washColors[(index + 1) % washColors.length], Math.max(reveal * 0.1, fade * 0.07));

    scene.sparkles.forEach((sparkle, i) => {
      const t = (i * 0.071 + scene.timeSeconds * sparkle.speed + (index + local) * 0.05) % 1;
      sparkle.dot.setPosition(
        (w * ((sparkle.seed % 100) / 100) + Math.sin(scene.timeSeconds * 0.4 + i) * 22) % w,
        h * (0.12 + t * 0.72)
      );
      sparkle.dot.setRadius(Phaser.Math.Linear(1, 3.4, t));
      sparkle.dot.setAlpha(Phaser.Math.Linear(0.08, 0.36, t));
    });
  }

  function getJourneyFrame(scene) {
    const maxIndex = scene.plateKeys.length - 1;
    const index = clamp(Math.floor(state.sceneStep), 0, maxIndex);
    const gate = gateProgress[state.questionIndex];
    let local = 0;
    if (state.mode === "gate-open") {
      local = clamp(state.boatPass * 0.35, 0, 0.42);
    } else if (gate) {
      local = clamp(state.shotProgress, 0, 1);
    } else {
      local = clamp((state.progress - 0.84) / 0.08, 0, 1);
    }
    state.sceneTravel = local;
    return { index, local };
  }

  function setPlate(image, key, w, h, index, local, alpha, time) {
    if (image.texture.key !== key) image.setTexture(key);
    const shot = clamp(local, 0, 1);
    const travel = index * 0.43 + shot * 1.15;
    const rowBoost = state.forwardInput ? 1 : 0;
    const panX = Math.sin(travel * Math.PI * 0.85) * 0.05 + shot * 0.125 + state.lane * 0.055;
    const panY = Math.cos(travel * Math.PI * 0.62) * 0.02 - state.boatApproach * 0.052 + shot * 0.058 + rowBoost * Math.sin(time * 2.8) * 0.004;
    const zoom = 1.045 + shot * 0.155 + state.boatApproach * 0.055 + rowBoost * 0.012 + Math.sin(time * 0.08 + index) * 0.004;
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
    const travel = clamp(state.sceneTravel, 0, 1);
    const rowingPower = state.forwardInput ? 1 : 0.35;
    const streamSpeed = state.forwardInput ? 0.135 : 0.055;
    g.fillStyle(0x5be7ff, 0.035 + travel * 0.025);
    g.fillTriangle(w * 0.5, h * 0.12, w * (0.16 - travel * 0.04), h, w * (0.84 + travel * 0.04), h);
    g.fillStyle(0x061826, 0.08 + travel * 0.04);
    g.fillRect(0, 0, w, h * lerp(0.07, 0.035, travel));
    g.fillRect(0, h * lerp(0.93, 0.97, travel), w, h * 0.08);
    for (let i = 0; i < 34; i += 1) {
      const t = (i / 34 + scene.timeSeconds * streamSpeed + travel * 0.56) % 1;
      const y = lerp(h * 0.14, h * 1.08, Math.pow(t, 1.16));
      const x = w * 0.5 + Math.sin((t + state.sceneStep * 0.17 + travel) * Math.PI * 2.3) * w * lerp(0.05, 0.14, t) + state.lane * w * 0.08 * t;
      const len = lerp(w * 0.05, w * 0.42, t) * lerp(0.75, 1.2, rowingPower);
      g.lineStyle(Phaser.Math.Linear(1, 3.8, t), 0xdfffff, Phaser.Math.Linear(0.05, 0.28, t) * lerp(0.8, 1.15, rowingPower));
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
    for (let i = 0; i < 10; i += 1) {
      const t = (i / 10 + scene.timeSeconds * 0.022 + travel * 0.18) % 1;
      const alpha = Phaser.Math.Linear(0.02, 0.09, 1 - Math.abs(t - 0.5) * 2);
      g.lineStyle(Phaser.Math.Linear(16, 44, t), 0xffffff, alpha);
      g.beginPath();
      const y = h * Phaser.Math.Linear(0.12, 0.82, t);
      g.moveTo(w * (0.08 + i * 0.09), y);
      g.lineTo(w * (0.18 + i * 0.09 + travel * 0.05), y + h * 0.24);
      g.strokePath();
    }
    if (state.forwardInput) {
      const bx = w * 0.5 + state.lane * w * 0.13;
      const by = lerp(h * 0.72, h * 0.66, state.boatApproach);
      for (let side of [-1, 1]) {
        g.lineStyle(3, 0xdfffff, 0.38);
        g.strokeEllipse(bx + side * w * 0.18, by + h * 0.12, w * 0.09, h * 0.035);
        g.lineStyle(2, 0xdfffff, 0.2);
        g.beginPath();
        g.moveTo(bx + side * w * 0.1, by + h * 0.18);
        g.lineTo(bx + side * w * 0.24, by + h * 0.31);
        g.strokePath();
      }
      if (scene.timeSeconds - state.lastSplashAt > 0.52) {
        state.lastSplashAt = scene.timeSeconds;
        playRowSplash();
      }
    }
  }

  function renderGate(scene) {
    const gate = gateProgress[state.questionIndex];
    if (!gate) {
      scene.gate.setVisible(false);
      scene.gateAura.setAlpha(0);
      scene.chamberShade.setAlpha(0);
      scene.gateDoor?.clear();
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
      scene.gateDoor?.clear();
      scene.gateSeal?.clear();
      scene.gateDust?.clear();
      return;
    }
    const w = scene.scale.width;
    const h = scene.scale.height;
    const isNarrow = w < 720;
    const arrivalEase = state.mode === "approaching"
      ? easeOutCubic(clamp(state.arrivalTimer / 0.72, 0, 1))
      : 1;
    const openingEase = smoothstep(0.08, 0.96, state.gateOpening);
    const targetWidth = Math.min(w * (isNarrow ? 0.58 : 0.38), h * (isNarrow ? 0.42 : 0.58), isNarrow ? 360 : 610);
    const texture = scene.textures.get("gate").getSourceImage();
    const gateX = w * 0.5;
    const gateY = h * (isNarrow ? 0.405 : 0.35);
    const gateHeight = targetWidth * (texture.height / texture.width);
    const visualScale = lerp(0.93, 1, arrivalEase);
    scene.chamberShade
      .setPosition(0, 0)
      .setSize(w, h)
      .setFillStyle(0x03101d, 0.04 + arrivalEase * 0.14)
      .setAlpha(1);
    scene.gateAura
      .setPosition(gateX, gateY)
      .setRadius(Math.min(w * 0.18, 180) * (1 + Math.sin(scene.timeSeconds * 2.2) * 0.025 + openingEase * 0.12))
      .setAlpha((0.08 + Math.sin(scene.timeSeconds * 2.6) * 0.02) * arrivalEase + openingEase * 0.16);
    scene.gate
      .setVisible(true)
      .setDepth(7)
      .setAlpha(1)
      .setDisplaySize(targetWidth * visualScale, gateHeight * visualScale)
      .setPosition(gateX, gateY);
    renderGateRig(scene, gateX, gateY, targetWidth * visualScale, gateHeight * visualScale, arrivalEase, openingEase);
  }

  function renderDistantGateHint(scene, gate) {
    const travel = clamp(state.sceneTravel, 0, 1);
    if (travel < 0.86) {
      scene.gate.setVisible(false);
      scene.gateAura.setAlpha(0);
      scene.chamberShade.setAlpha(0);
      scene.gateDoor?.clear();
      scene.gateSeal?.clear();
      scene.gateDust?.clear();
      return;
    }
    const w = scene.scale.width;
    const h = scene.scale.height;
    const isNarrow = w < 720;
    const approach = smoothstep(0.86, 1, travel);
    const depthEase = easeOutCubic(approach);
    const pathX = w * 0.5 + Math.sin((gate * 5.8 + 0.45) * Math.PI) * w * lerp(0.026, 0.012, depthEase);
    const y = h * lerp(isNarrow ? 0.31 : 0.23, isNarrow ? 0.395 : 0.3, depthEase);
    const maxWidth = Math.min(w * (isNarrow ? 0.5 : 0.24), h * (isNarrow ? 0.36 : 0.3), isNarrow ? 320 : 310);
    const scaleFromDot = Math.max(0.035, depthEase * depthEase);
    const targetWidth = maxWidth * lerp(0.035, 0.42, scaleFromDot);
    const texture = scene.textures.get("gate").getSourceImage();
    scene.chamberShade.setAlpha(0);
    scene.gateDoor?.clear();
    scene.gateSeal?.clear();
    scene.gateDust?.clear();
    scene.gateAura
      .setPosition(pathX, y)
      .setRadius(Math.min(w * 0.045, 54) * lerp(0.2, 0.72, scaleFromDot))
      .setAlpha(0.04 + scaleFromDot * 0.05);
    scene.gate
      .setVisible(true)
      .setAlpha(0.92)
      .setDisplaySize(targetWidth, targetWidth * (texture.height / texture.width))
      .setPosition(pathX, y);
  }

  function renderGateRig(scene, gateX, gateY, gateWidth, gateHeight, arrivalEase, openingEase) {
    const door = scene.gateDoor;
    const seal = scene.gateSeal;
    const dust = scene.gateDust;
    door.clear();
    seal.clear();
    dust.clear();
    const doorAlpha = arrivalEase;
    const portalW = gateWidth * 0.46;
    const portalH = gateHeight * 0.44;
    const portalY = gateY + gateHeight * 0.08;
    const portalTop = portalY - portalH * 0.48;
    const portalBottom = portalY + portalH * 0.48;
    const baseY = gateY + gateHeight * 0.4;
    const lift = openingEase * portalH * 1.22;

    door.fillStyle(0x07121c, 0.58 * arrivalEase);
    door.fillRoundedRect(gateX - portalW * 0.48, portalTop, portalW * 0.96, portalH * 0.96, portalW * 0.08);
    door.lineStyle(Math.max(2, gateWidth * 0.008), 0xffd36a, 0.16 * arrivalEase);
    door.strokeRoundedRect(gateX - portalW * 0.48, portalTop, portalW * 0.96, portalH * 0.96, portalW * 0.08);

    door.lineStyle(Math.max(5, gateWidth * 0.017), 0x101722, 0.96 * doorAlpha);
    for (let i = -3; i <= 3; i += 1) {
      const x = gateX + i * portalW * 0.135;
      drawClippedLine(door, x, portalTop - lift, x, portalBottom - lift, portalTop, portalBottom);
    }
    door.lineStyle(Math.max(2, gateWidth * 0.006), 0x5f6b75, 0.48 * doorAlpha);
    for (let i = -3; i <= 3; i += 1) {
      const x = gateX + i * portalW * 0.135 - gateWidth * 0.006;
      drawClippedLine(door, x, portalTop - lift + portalH * 0.05, x, portalBottom - lift - portalH * 0.06, portalTop, portalBottom);
    }
    door.lineStyle(Math.max(5, gateWidth * 0.017), 0x15100f, 0.94 * doorAlpha);
    for (let i = 0; i < 4; i += 1) {
      const y = portalTop + portalH * (0.18 + i * 0.2) - lift;
      drawClippedLine(door, gateX - portalW * 0.43, y, gateX + portalW * 0.43, y, portalTop, portalBottom);
    }
    door.lineStyle(Math.max(2, gateWidth * 0.006), 0xffc95a, 0.28 * doorAlpha);
    for (let i = 0; i < 3; i += 1) {
      const y = portalTop + portalH * (0.2 + i * 0.2) - lift - gateHeight * 0.006;
      drawClippedLine(door, gateX - portalW * 0.41, y, gateX + portalW * 0.41, y, portalTop, portalBottom);
    }
    if (openingEase < 0.95) {
      const teethY = portalBottom - lift;
      door.fillStyle(0x101722, 0.95 * doorAlpha);
      for (let i = -3; i <= 3; i += 1) {
        const x = gateX + i * portalW * 0.135;
        const top = clamp(teethY - portalH * 0.055, portalTop, portalBottom);
        const bottom = clamp(teethY + portalH * 0.045, portalTop, portalBottom);
        if (bottom > portalTop && top < portalBottom) {
          door.fillTriangle(x - gateWidth * 0.014, top, x + gateWidth * 0.014, top, x, bottom);
        }
      }
    }

    seal.setBlendMode(Phaser.BlendModes.SCREEN);
    seal.fillStyle(0x071523, 0.18 * arrivalEase);
    seal.fillEllipse(gateX, baseY + gateHeight * 0.015, gateWidth * 0.98, gateHeight * 0.14);
    seal.fillStyle(0x9befff, 0.075 * arrivalEase);
    seal.fillEllipse(gateX, baseY, gateWidth * 0.96, gateHeight * 0.12);
    seal.lineStyle(Math.max(1, gateWidth * 0.005), 0xcdfcff, 0.18 * arrivalEase);
    seal.strokeEllipse(gateX, baseY, gateWidth * 1.05, gateHeight * 0.18);
    seal.fillStyle(0xffe7a0, 0.05 * arrivalEase);
    for (let i = 0; i < 7; i += 1) {
      const phase = (scene.timeSeconds * 0.32 + i * 0.13) % 1;
      const x = gateX + Math.sin(i * 1.9) * gateWidth * 0.34;
      const y = baseY + Math.sin(scene.timeSeconds + i) * gateHeight * 0.014;
      seal.fillEllipse(x, y, gateWidth * lerp(0.1, 0.22, phase), gateHeight * lerp(0.018, 0.04, phase));
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

  function drawClippedLine(graphics, x1, y1, x2, y2, clipTop, clipBottom) {
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    if (maxY < clipTop || minY > clipBottom) return;
    const cy1 = clamp(y1, clipTop, clipBottom);
    const cy2 = clamp(y2, clipTop, clipBottom);
    graphics.lineBetween(x1, cy1, x2, cy2);
  }

  function renderTreasureAndGuardian(scene) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    scene.chestGlow.clear();
    const t = clamp((state.progress - 0.76) / 0.18, 0, 1);
    if (t > 0) {
      const finalT = state.mode === "final" || state.finaleClaimed ? 1 : 0;
      const eased = easeOutCubic(t);
      const chestWidth = Math.min(w * lerp(0.2, 0.3, finalT), h * lerp(0.24, 0.36, finalT), 390) * lerp(0.62, 1.0, eased);
      const chestTexture = scene.textures.get("chest").getSourceImage();
      const chestX = lerp(w * 0.5, w * 0.66, finalT);
      const chestY = lerp(h * 0.38, h * 0.34, finalT);
      scene.chestGlow.setBlendMode(Phaser.BlendModes.SCREEN);
      scene.chestGlow.fillStyle(0xffd56c, (0.12 + Math.sin(scene.timeSeconds * 3) * 0.03) * t);
      scene.chestGlow.fillCircle(chestX, chestY, chestWidth * 0.55);
      scene.chestGlow.lineStyle(3, 0xfff2a8, 0.18 * t);
      scene.chestGlow.strokeEllipse(chestX, chestY + chestWidth * 0.22, chestWidth * 1.15, chestWidth * 0.28);
      scene.chest
        .setVisible(true)
        .setDepth(10)
        .setDisplaySize(chestWidth, chestWidth * (chestTexture.height / chestTexture.width))
        .setPosition(chestX, chestY + Math.sin(scene.timeSeconds * 1.7) * 4 * finalT)
        .setAlpha(t);
    } else {
      scene.chest.setVisible(false);
    }
    if (state.finaleClaimed) {
      const isNarrow = w < 720;
      const guardianWidth = Math.min(w * (isNarrow ? 0.92 : 0.62), h * 0.92, isNarrow ? 430 : 760);
      const guardianTexture = scene.textures.get("guardian").getSourceImage();
      scene.guardian
        .setVisible(true)
        .setAlpha(state.qaFrozen ? 0.94 : lerp(scene.guardian.alpha, 1, 0.08))
        .setDepth(11)
        .setDisplaySize(guardianWidth, guardianWidth * (guardianTexture.height / guardianTexture.width))
        .setPosition(w * (isNarrow ? 0.64 : 0.78), h * (isNarrow ? 0.98 : 1.06) + Math.sin(scene.timeSeconds * 1.4) * 5);
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
    const farY = isNarrow ? 0.65 : 0.66;
    const approach = state.mode === "approaching"
      ? easeInOutCubic(clamp(state.arrivalTimer / 1.45, 0, 1))
      : state.boatApproach;
    const bob = Math.sin(scene.timeSeconds * 2.2) * (state.forwardInput ? 1.4 : 4);
    let x = w * 0.5 + state.lane * w * 0.13;
    let y = lerp(h * nearY, h * farY, approach) + bob;
    let scaleT = approach;
    let alpha = 1;
    let depth = 9;

    if (state.mode === "question") {
      scaleT = 1;
      x = w * 0.5;
      y = h * (isNarrow ? 0.66 : 0.61) + Math.sin(scene.timeSeconds * 1.8) * 2;
    }

    if (state.mode === "final" || state.finaleClaimed) {
      scaleT = 0.72;
      x = w * (isNarrow ? 0.46 : 0.4);
      y = h * (isNarrow ? 0.72 : 0.76) + Math.sin(scene.timeSeconds * 1.8) * 3;
      depth = 9;
    }

    if (state.mode === "gate-open") {
      const pass = state.boatPass;
      const passEase = easeInOutCubic(pass);
      const startY = h * (isNarrow ? 0.66 : 0.62);
      const gateY = h * (isNarrow ? 0.43 : 0.37);
      x = lerp(w * 0.5, w * 0.5 + Math.sin((state.questionIndex + 1) * 1.7) * w * 0.018, passEase);
      y = lerp(startY, gateY + h * 0.04, passEase) + Math.sin(scene.timeSeconds * 2.6) * lerp(3, 0, passEase);
      scaleT = lerp(1, 1.72, passEase);
      alpha = lerp(1, 0.16, smoothstep(0.9, 1, passEase));
      depth = passEase > 0.28 ? 6 : 9;
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
    stopWaterLoop();
    updateRiverAmbience();
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
      const currentGate = gateProgress[state.questionIndex] || state.progress;
      const nextGate = gateProgress[state.questionIndex + 1];
      const gap = nextGate ? nextGate - currentGate : 0.08;
      state.sceneStep = Math.min(state.questionIndex + 1, sceneRef?.plateKeys?.length ? sceneRef.plateKeys.length - 1 : questions.length - 1);
      state.transitionStart = nextGate ? currentGate + gap * 0.03 : 0.875;
      state.transitionEnd = nextGate ? Math.min(nextGate - 0.058, currentGate + gap * 0.08) : 0.9;
      state.progress = state.transitionStart;
      state.shotProgress = 0;
      state.shotVelocity = 0;
      state.boatApproach = 0.82;
      el.questionPanel.classList.add("hidden");
      state.mode = "gate-open";
      state.gateOpening = 0;
      state.boatPass = 0;
      startRiverAmbience();
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
    playSuccessSparkle();
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
        sceneStep: state.sceneStep,
        sceneTravel: Number(state.sceneTravel.toFixed(5)),
        shotProgress: Number(state.shotProgress.toFixed(5)),
        shotVelocity: Number(state.shotVelocity.toFixed(5)),
        plateKey: sceneRef?.plateKeys?.[state.sceneStep] || null,
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
        state.transitionStart = 0;
        state.transitionEnd = 0;
        state.shotProgress = 0;
        state.shotVelocity = 0;
        state.qaFrozen = false;
        state.questionIndex = gateProgress.findIndex((gate) => gate > state.progress + 0.02);
        if (state.questionIndex < 0) state.questionIndex = gateProgress.length;
        state.sceneStep = Math.min(state.questionIndex, sceneRef?.plateKeys?.length ? sceneRef.plateKeys.length - 1 : questions.length - 1);
        state.sceneTravel = 0;
        state.boatApproach = 0;
        el.questionPanel.classList.add("hidden");
        el.finalePanel.classList.add("hidden");
        return true;
      },
      arriveAtGateForQa: (index = state.questionIndex) => {
        if (!isQa) return false;
        const gateIndex = clamp(Math.floor(Number(index) || 0), 0, gateProgress.length - 1);
        state.questionIndex = gateIndex;
        state.sceneStep = gateIndex;
        state.sceneTravel = 0;
        state.shotProgress = 0;
        state.shotVelocity = 0;
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
        state.sceneStep = sceneRef?.plateKeys?.length ? sceneRef.plateKeys.length - 1 : questions.length - 1;
        state.sceneTravel = 1;
        state.shotProgress = 1;
        state.shotVelocity = 0;
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
    state.transitionStart = 0;
    state.transitionEnd = 0;
    state.sceneStep = gateIndex;
    state.sceneTravel = 0;
    state.shotProgress = 0;
    state.shotVelocity = 0;
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
    if (qaState === "final" || qaState === "claimed") {
      state.progress = 0.94;
      state.mode = "final";
      state.finalStarted = true;
      state.questionIndex = questions.length;
      state.finaleClaimed = qaState === "claimed";
      if (state.finaleClaimed) {
        el.guardianLine.textContent = "Autobot, you now have the Matrix of Leadership.";
        el.guardianPanel.classList.remove("hidden");
        el.hint.textContent = "Quest complete. You earned the Leadership Matrix.";
      } else {
        el.guardianPanel.classList.add("hidden");
        el.hint.textContent = "The treasure waits ahead. Tap the glowing chest.";
      }
      el.finalePanel.classList.add("hidden");
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
