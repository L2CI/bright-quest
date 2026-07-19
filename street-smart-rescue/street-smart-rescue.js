(() => {
  "use strict";

  const BUILD_ID = "grammar-cinematic-013";
  const voiceBase = "assets/audio/game-voice/";
  const questions = [
    {
      type: "Sentence Checkpoint",
      title: "Maya Reads",
      text: "In 'Maya reads the comic,' which part is the predicate?",
      answers: ["Maya", "reads the comic", "the comic", "reads"],
      correct: "reads the comic",
      hint: "The predicate tells what the subject does or is.",
      voice: "street-q1-sentence"
    },
    {
      type: "Noun Checkpoint",
      title: "Name The Thing",
      text: "Which word is a proper noun?",
      answers: ["city", "teacher", "Maya", "book"],
      correct: "Maya",
      hint: "A proper noun names one special person, place, or thing.",
      voice: "street-q2-noun"
    },
    {
      type: "Verb Checkpoint",
      title: "Engine Word",
      text: "In 'Omar should read the poem,' what is the modal helper verb?",
      answers: ["Omar", "should", "read", "poem"],
      correct: "should",
      hint: "Modal verbs include can, could, should, must, and might.",
      voice: "street-q3-verb"
    },
    {
      type: "Modifier Checkpoint",
      title: "Useful Detail",
      text: "In 'The brave girl spoke clearly,' which word is an adverb?",
      answers: ["brave", "girl", "spoke", "clearly"],
      correct: "clearly",
      hint: "An adverb can describe how an action happens.",
      voice: "street-q4-modifier"
    },
    {
      type: "Clause Checkpoint",
      title: "Complete Thought",
      text: "Which one can stand alone as a complete sentence?",
      answers: ["because the road was busy", "when the lights flashed", "The officer stopped the car.", "after Maya opened the book"],
      correct: "The officer stopped the car.",
      hint: "An independent clause has a subject, a predicate, and a complete thought.",
      voice: "street-q5-clause"
    }
  ];

  const params = new URLSearchParams(window.location.search);
  const isQa = params.has("qa");
  const qaScene = params.get("scene") || "";

  const el = {
    badgeStrip: document.querySelector("#badgeStrip"),
    caption: document.querySelector("#sceneCaption"),
    dialogue: document.querySelector("#dialoguePanel"),
    speaker: document.querySelector("#speakerName"),
    line: document.querySelector("#dialogueLine"),
    startPanel: document.querySelector("#startPanel"),
    startButton: document.querySelector("#startButton"),
    questionPanel: document.querySelector("#questionPanel"),
    questionType: document.querySelector("#questionType"),
    questionTitle: document.querySelector("#questionTitle"),
    questionText: document.querySelector("#questionText"),
    answerGrid: document.querySelector("#answerGrid"),
    feedback: document.querySelector("#feedbackText"),
    pauseButton: document.querySelector("#pauseButton"),
    pausePanel: document.querySelector("#pausePanel"),
    resumeButton: document.querySelector("#resumeButton"),
    finalePanel: document.querySelector("#finalePanel"),
    replayButton: document.querySelector("#replayButton")
  };

  const state = {
    scene: "ready",
    questionIndex: 0,
    solved: 0,
    paused: false,
    audioReady: false,
    width: window.innerWidth,
    height: window.innerHeight,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  let sceneRef = null;
  let audioContext = null;
  let activeVoice = null;
  let activeVoiceCleanup = null;
  let activeVoiceToken = 0;
  let activeVoiceWasPlaying = false;
  const voiceCache = new Map();
  const scheduledTimers = new Set();

  const voiceLines = {
    "street-kid-intro": "The keys are right there. I know I should not touch them.",
    "street-kid-rollout": "This feels wrong already. I am stopping.",
    "street-officer-stop": "Good stop. Cars are adult responsibility, not a kid experiment.",
    "street-kid-caught": "I understand. I should have asked first.",
    "street-officer-brief": "Exactly. We will turn this into a safety drill. Clear each grammar checkpoint, then head back.",
    "street-q1-sentence": "Checkpoint one. A complete sentence needs a subject and a predicate. Find what Maya does.",
    "street-q2-noun": "Checkpoint two. Proper nouns name someone or somewhere special. Pick the special name.",
    "street-q3-verb": "Checkpoint three. Modal helpers show duty, ability, or possibility. Listen for should, must, can, or might.",
    "street-q4-modifier": "Checkpoint four. Adverbs often tell how an action happens.",
    "street-q5-clause": "Checkpoint five. Choose the clause that can stand alone as a complete thought.",
    "street-try": "Not quite. Use the hint, then try again. Grammar is a map, not a trap.",
    "street-finale": "All clear. Smart writers build clear sentences, and smart kids ask an adult before going near the driver seat."
  };

  const correctFeedback = [
    "Yes, that's it.",
    "Good choice.",
    "That one works.",
    "Exactly right.",
    "Nice, keep going."
  ];

  renderBadges();

  class StreetScene extends Phaser.Scene {
    constructor() {
      super("StreetScene");
      this.roadOffset = 0;
      this.flashTimer = 0;
      this.sparkles = [];
      this.speedLines = [];
      this.roadside = [];
    }

    preload() {
      this.load.image("suburbPlate", "assets/generated/suburban-road-plate.png");
      this.load.image("kidStandingAsset", "assets/generated/kid-standing-alpha.png");
      this.load.image("kidCar", "assets/third-party/opengameart/unlucky-topdown-vehicles/selected/Car.png");
      this.load.image("policeCar", "assets/third-party/opengameart/unlucky-topdown-vehicles/selected/Police.png");
      this.load.image("policeCarFlash1", "assets/third-party/opengameart/unlucky-topdown-vehicles/selected/police-animation/1.png");
      this.load.image("policeCarFlash2", "assets/third-party/opengameart/unlucky-topdown-vehicles/selected/police-animation/2.png");
      this.load.image("policeCarFlash3", "assets/third-party/opengameart/unlucky-topdown-vehicles/selected/police-animation/3.png");
      this.load.image("officerAsset", "assets/generated/officer-alpha.png");
    }

    create() {
      sceneRef = this;
      state.width = this.scale.width;
      state.height = this.scale.height;
      this.cameras.main.setBackgroundColor("#89d8ff");

      makeTextures(this);
      createWorld(this);
      layoutWorld(this);
      idleReadyPose(this);
      setupInput();

      this.scale.on("resize", (size) => {
        state.width = size.width;
        state.height = size.height;
        this.cameras.resize(size.width, size.height);
        layoutWorld(this);
      });

      window.__streetSmartRescueBoot = {
        ok: true,
        build: BUILD_ID,
        renderer: "phaser",
        engine: Phaser.VERSION,
        stage: "ready"
      };
      if (isQa) {
        window.__streetSmartRescueDebug = {
          getState: () => ({ scene: state.scene, paused: state.paused, solved: state.solved }),
          setPaused
        };
      }

      if (isQa) {
        el.startPanel.classList.add("hidden");
        if (qaScene === "stop") jumpToStop();
        else if (qaScene === "question") jumpToQuestion();
        else if (qaScene === "finale") jumpToFinale();
        else startIntro();
      }
    }

    update(time, delta) {
      if (state.paused) return;
      const dt = Math.min(delta / 16.67, 2);
      animateAmbient(this, time, dt);
      if (state.scene === "rollout" || state.scene === "stop") {
        this.roadOffset += 7.4 * dt;
        moveRoad(this);
      } else if (state.scene === "return-step" || state.scene === "finale") {
        this.roadOffset -= 3.6 * dt;
        moveRoad(this);
      }
    }
  }

  const config = {
    type: Phaser.AUTO,
    parent: "streetGame",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#89d8ff",
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [StreetScene]
  };

  new Phaser.Game(config);

  function setupInput() {
    el.startButton.addEventListener("click", () => {
      unlockAudio();
      startIntro();
    });
    el.pauseButton.addEventListener("click", () => setPaused(true));
    el.resumeButton.addEventListener("click", () => setPaused(false));
    el.replayButton.addEventListener("click", () => {
      window.location.href = window.location.pathname;
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.paused) setPaused(false);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && !el.pauseButton.disabled && !state.paused) setPaused(true);
    });
  }

  function setPaused(paused) {
    if (paused === state.paused || el.pauseButton.disabled) return;
    state.paused = paused;
    el.pausePanel.classList.toggle("hidden", !paused);
    el.pauseButton.textContent = paused ? "Paused" : "Pause";
    el.pauseButton.setAttribute("aria-pressed", String(paused));
    if (paused) {
      activeVoiceWasPlaying = Boolean(activeVoice && !activeVoice.paused && !activeVoice.ended);
      activeVoice?.pause();
      audioContext?.suspend?.();
      pauseScheduledTimers();
      sceneRef?.scene.pause();
      el.resumeButton.focus();
      return;
    }
    sceneRef?.scene.resume();
    resumeScheduledTimers();
    audioContext?.resume?.();
    if (activeVoiceWasPlaying && activeVoice) activeVoice.play().catch(() => {});
    activeVoiceWasPlaying = false;
    el.pauseButton.focus();
  }

  function makeTextures(scene) {
    drawKid(scene);
    drawOfficer(scene);
    drawHouse(scene);
    drawTree(scene);
    drawSign(scene);
    drawBubbleFlash(scene);
  }

  function drawKid(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x000000, 0.14);
    g.fillEllipse(70, 144, 70, 20);
    g.fillStyle(0xffc98d, 1);
    g.fillCircle(70, 46, 25);
    g.fillStyle(0x3a2518, 1);
    g.fillRoundedRect(47, 20, 46, 23, 12);
    g.fillStyle(0x102a56, 1);
    g.fillRoundedRect(45, 72, 50, 54, 16);
    g.fillStyle(0xffffff, 1);
    g.fillTriangle(58, 72, 82, 72, 70, 96);
    g.fillStyle(0xffd15c, 1);
    g.fillRoundedRect(40, 88, 18, 54, 8);
    g.fillRoundedRect(82, 88, 18, 54, 8);
    g.fillStyle(0x243252, 1);
    g.fillRoundedRect(50, 122, 18, 38, 8);
    g.fillRoundedRect(72, 122, 18, 38, 8);
    g.fillStyle(0x1a2036, 1);
    g.fillCircle(61, 45, 3);
    g.fillCircle(79, 45, 3);
    g.lineStyle(3, 0x8a4c2f, 1);
    g.lineBetween(62, 57, 70, 62);
    g.lineBetween(70, 62, 78, 57);
    g.generateTexture("kid", 140, 170);
    g.destroy();
  }

  function drawOfficer(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x000000, 0.16);
    g.fillEllipse(86, 178, 86, 24);
    g.fillStyle(0xf2b884, 1);
    g.fillCircle(86, 48, 27);
    g.fillStyle(0x26334f, 1);
    g.fillRoundedRect(48, 76, 76, 82, 18);
    g.fillRoundedRect(48, 20, 76, 18, 8);
    g.fillRect(62, 10, 48, 20);
    g.fillStyle(0xffd15c, 1);
    g.fillCircle(86, 106, 9);
    g.fillStyle(0x3a2518, 1);
    g.fillRoundedRect(66, 51, 40, 10, 5);
    g.lineStyle(5, 0x2d1c12, 1);
    g.lineBetween(58, 38, 76, 34);
    g.lineBetween(96, 34, 114, 38);
    g.fillStyle(0x121827, 1);
    g.fillCircle(75, 45, 3);
    g.fillCircle(98, 45, 3);
    g.fillStyle(0xf2b884, 1);
    g.fillRoundedRect(24, 88, 36, 13, 7);
    g.fillRoundedRect(116, 88, 42, 13, 7);
    g.fillStyle(0x1d2843, 1);
    g.fillRoundedRect(58, 152, 22, 36, 8);
    g.fillRoundedRect(94, 152, 22, 36, 8);
    g.generateTexture("officer", 180, 200);
    g.destroy();
  }

  function drawHouse(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff, 1);
    g.fillRoundedRect(34, 80, 228, 150, 14);
    g.fillStyle(0xff6c5f, 1);
    g.fillTriangle(20, 92, 148, 16, 278, 92);
    g.fillStyle(0x2877ff, 1);
    g.fillRoundedRect(70, 124, 48, 48, 10);
    g.fillRoundedRect(176, 124, 48, 48, 10);
    g.fillStyle(0xffd15c, 1);
    g.fillRoundedRect(128, 146, 42, 84, 11);
    g.generateTexture("house", 300, 250);
    g.destroy();
  }

  function drawTree(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x8b5a2b, 1);
    g.fillRoundedRect(48, 86, 26, 76, 10);
    g.fillStyle(0x1fb772, 1);
    g.fillCircle(44, 72, 42);
    g.fillCircle(82, 72, 42);
    g.fillCircle(63, 38, 44);
    g.generateTexture("tree", 130, 170);
    g.destroy();
  }

  function drawSign(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x293a67, 1);
    g.fillRoundedRect(54, 88, 12, 90, 5);
    g.fillStyle(0xffd15c, 1);
    g.fillRoundedRect(14, 18, 92, 76, 12);
    g.lineStyle(5, 0xffffff, 1);
    g.strokeRoundedRect(20, 24, 80, 64, 10);
    g.generateTexture("schoolSign", 120, 190);
    g.destroy();
  }

  function drawBubbleFlash(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff, 1);
    g.fillCircle(64, 64, 44);
    g.fillStyle(0xffd15c, 1);
    g.fillTriangle(64, 4, 76, 48, 120, 34);
    g.fillTriangle(124, 68, 80, 76, 104, 118);
    g.fillTriangle(56, 124, 50, 78, 8, 96);
    g.fillTriangle(4, 48, 48, 52, 26, 12);
    g.generateTexture("starFlash", 128, 128);
    g.destroy();
  }

  function createWorld(scene) {
    scene.sky = scene.add.graphics().setDepth(0);
    scene.plate = scene.add.image(0, 0, "suburbPlate").setOrigin(0.5).setDepth(1).setAlpha(0.28);
    scene.clouds = [
      scene.add.ellipse(0, 0, 120, 34, 0xffffff, 0).setDepth(1),
      scene.add.ellipse(0, 0, 150, 42, 0xffffff, 0).setDepth(1)
    ];
    scene.sun = scene.add.circle(0, 0, 44, 0xffd15c, 0).setDepth(1);
    scene.house = scene.add.image(0, 0, "house").setDepth(2).setAlpha(0);
    scene.trees = [scene.add.image(0, 0, "tree").setDepth(2).setAlpha(0), scene.add.image(0, 0, "tree").setDepth(2).setAlpha(0)];
    scene.sign = scene.add.image(0, 0, "schoolSign").setDepth(4).setAlpha(0);
    scene.road = scene.add.graphics().setDepth(3);
    scene.roadMarks = scene.add.group();
    for (let i = 0; i < 26; i += 1) {
      scene.roadMarks.add(scene.add.rectangle(0, 0, 14, 76, 0xffffff, 0.88).setDepth(4));
    }
    for (let i = 0; i < 18; i += 1) {
      const prop = i % 3 === 0
        ? scene.add.image(0, 0, "tree").setDepth(2).setAlpha(0.9)
        : scene.add.rectangle(0, 0, 46, 28, i % 2 ? 0xffd15c : 0x35d7ff, 0.55).setDepth(2);
      scene.roadside.push(prop);
    }
    scene.kid = scene.add.image(0, 0, "kidStandingAsset").setDepth(8);
    scene.kidCar = scene.add.image(0, 0, "kidCar").setDepth(7);
    scene.policeCar = scene.add.image(0, 0, "policeCar").setDepth(6).setAlpha(0);
    scene.officer = scene.add.image(0, 0, "officerAsset").setDepth(9).setAlpha(0);
    scene.policeLight = scene.add.rectangle(0, 0, 10, 10, 0xffffff, 0).setDepth(13).setBlendMode(Phaser.BlendModes.SCREEN);
    scene.whiteFlash = scene.add.rectangle(0, 0, 10, 10, 0xffffff, 0).setOrigin(0).setDepth(30);
    scene.correctEmitter = scene.add.particles(0, 0, "starFlash", {
      lifespan: 720,
      speed: { min: 160, max: 380 },
      scale: { start: 0.32, end: 0 },
      alpha: { start: 1, end: 0 },
      rotate: { min: -180, max: 180 },
      emitting: false
    }).setDepth(29);
    for (let i = 0; i < 22; i += 1) {
      const line = scene.add.rectangle(0, 0, 110 + (i % 4) * 35, 4, i % 2 ? 0x35d7ff : 0xffd15c, 0).setDepth(12);
      scene.speedLines.push(line);
    }
  }

  function layoutWorld(scene) {
    const w = state.width;
    const h = state.height;
    scene.sky.clear();
    scene.sky.fillStyle(0x78d4ff, 1);
    scene.sky.fillRect(0, 0, w, h);
    fitPlate(scene.plate, w, h);

    scene.sun.setPosition(w - 96, 104);
    scene.clouds[0].setPosition(w * 0.18, 92);
    scene.clouds[1].setPosition(w * 0.48, 132);
    scene.house.setPosition(w * 0.16, h * 0.27).setScale(scaleFor(w, 0.72, 0.44));
    scene.trees[0].setPosition(w * 0.08, h * 0.31).setScale(scaleFor(w, 0.74, 0.48));
    scene.trees[1].setPosition(w * 0.78, h * 0.24).setScale(scaleFor(w, 0.58, 0.38));
    scene.sign.setPosition(w * 0.84, h * 0.34).setScale(scaleFor(w, 0.58, 0.36));

    drawRoad(scene);
    moveRoad(scene);
    scene.whiteFlash.setSize(w, h);
    scene.policeLight.setSize(w * 1.5, h * 0.36).setRotation(-0.22);
  }

  function drawRoad(scene) {
    scene.road.clear();
    const w = state.width;
    const h = state.height;
    scene.road.fillStyle(0x5c6370, 1);
    scene.road.fillRect(0, h * 0.36, w, h * 0.52);
    scene.road.fillStyle(0x47505e, 1);
    scene.road.fillRect(0, h * 0.41, w, h * 0.42);
    scene.road.fillStyle(0x2dd46f, 1);
    scene.road.fillRect(0, h * 0.88, w, h * 0.12);
    scene.road.fillStyle(0xe9f8ff, 1);
    scene.road.fillRect(0, h * 0.35, w, 8);
    scene.road.fillRect(0, h * 0.83, w, 8);
  }

  function moveRoad(scene) {
    const w = state.width;
    const h = state.height;
    const y = h * 0.62;
    const spacing = 120;
    scene.roadMarks.getChildren().forEach((mark, index) => {
      const x = ((index * spacing - scene.roadOffset) % (w + spacing)) - spacing * 0.5;
      mark.setPosition(x, y);
    });
    scene.roadside.forEach((prop, index) => {
      const lane = index % 2 === 0 ? h * 0.32 : h * 0.9;
      const x = ((index * 210 - scene.roadOffset * 0.55) % (w + 240)) - 120;
      prop.setPosition(x, lane + Math.sin(index) * 18);
      if (prop.setScale) prop.setScale(index % 3 === 0 ? scaleFor(w, 0.34, 0.22) : 1);
    });
  }

  function idleReadyPose(scene) {
    const w = state.width;
    const h = state.height;
    state.scene = "ready";
    scene.kid.setAlpha(1).setPosition(w * 0.34, h * 0.56);
    fitSpriteWidth(scene.kid, Math.min(150, w * 0.13));
    scene.kidCar.setTexture("kidCar").setAlpha(1).setPosition(w * 0.56, h * 0.64).setAngle(90);
    fitSpriteWidth(scene.kidCar, Math.min(230, w * 0.2));
    scene.policeCar.setTexture("policeCar").setAlpha(0).setPosition(w + 240, h * 0.58).setAngle(90);
    fitSpriteWidth(scene.policeCar, Math.min(220, w * 0.19));
    scene.officer.setAlpha(0).setPosition(w + 120, h * 0.55);
    fitSpriteWidth(scene.officer, Math.min(220, w * 0.18));
    pulseCar(scene);
  }

  function startIntro() {
    if (!sceneRef) return;
    el.pauseButton.disabled = false;
    state.questionIndex = 0;
    state.solved = 0;
    state.scene = "intro";
    renderBadges();
    el.startPanel.classList.add("hidden");
    el.finalePanel.classList.add("hidden");
    el.questionPanel.classList.add("hidden");
    setCaption("");
    say("Kid", "The keys are right there. I know I should not touch them.");
    const introVoiceDone = playVoice("street-kid-intro");
    flashWhite(0.18);
    const scene = sceneRef;
    scene.tweens.killTweensOf([scene.kid, scene.kidCar]);
    scene.tweens.add({
      targets: scene.kid,
      x: state.width * 0.53,
      y: state.height * 0.6,
      scaleX: scene.kid.scaleX * 0.84,
      scaleY: scene.kid.scaleY * 0.84,
      angle: 5,
      duration: motion(1350),
      ease: "Sine.easeInOut",
      onComplete: () => {
        popDialogue();
        scene.kid.setAlpha(0);
        scene.kidCar.setTexture("kidCar");
        fitSpriteWidth(scene.kidCar, Math.min(230, state.width * 0.2));
        scene.tweens.add({
          targets: scene.kidCar,
          y: scene.kidCar.y - 12,
          scaleX: scene.kidCar.scaleX * 1.04,
          scaleY: scene.kidCar.scaleY * 1.04,
          yoyo: true,
          duration: motion(220),
          ease: "Quad.easeOut",
          onComplete: () => introVoiceDone.then(() => delay(220)).then(startRollout)
        });
      }
    });
  }

  function startRollout() {
    const scene = sceneRef;
    state.scene = "rollout";
    setCaption("");
    say("Kid", "This feels wrong already. I am stopping.");
    const rolloutVoiceDone = playVoice("street-kid-rollout");
    playTone("engine");
    showSpeedLines(true);
    scene.tweens.add({
      targets: scene.kidCar,
      x: state.width * 0.56,
      y: state.height * 0.58,
      angle: { from: 88, to: 92 },
      duration: motion(520),
      yoyo: true,
      repeat: 7,
      ease: "Sine.easeInOut"
    });
    scene.tweens.add({
      targets: scene.kidCar,
      x: state.width * 0.5,
      y: state.height * 0.57,
      duration: motion(3600),
      ease: "Sine.easeInOut",
      onComplete: () => rolloutVoiceDone.then(() => delay(380)).then(startPoliceStop)
    });
    burstStars(state.width * 0.5, state.height * 0.62, 16, 0xffd15c);
    impactRings(state.width * 0.54, state.height * 0.67, 0x35d7ff);
  }

  function startPoliceStop() {
    const scene = sceneRef;
    state.scene = "stop";
    setCaption("");
    say("Officer", "Good stop. Cars are adult responsibility, not a kid experiment.");
    const stopVoiceDone = playVoice("street-officer-stop");
    playTone("siren");
    showSpeedLines(false);
    sweepPoliceLights(5);
    scene.policeCar.setTexture("policeCarFlash1").setAlpha(1).setPosition(state.width + 170, state.height * 0.59).setAngle(90);
    fitSpriteWidth(scene.policeCar, Math.min(220, state.width * 0.19));
    neonTrail(state.width * 0.98, state.height * 0.61, 0x2877ff);
    neonTrail(state.width * 0.98, state.height * 0.66, 0xff2d5f);
    scene.tweens.add({
      targets: scene.policeCar,
      x: state.width * 0.68,
      y: state.height * 0.59,
      duration: motion(1450),
      ease: "Cubic.easeOut",
      onComplete: () => {
        cameraPunch();
        flashWhite(0.3);
        impactRings(scene.policeCar.x - scene.policeCar.displayWidth * 0.26, scene.policeCar.y - scene.policeCar.displayHeight * 0.05, 0xff2d5f);
        impactRings(scene.policeCar.x + scene.policeCar.displayWidth * 0.26, scene.policeCar.y - scene.policeCar.displayHeight * 0.05, 0x2877ff);
        burstStars(scene.policeCar.x, scene.policeCar.y - scene.policeCar.displayHeight * 0.35, 22, 0xffffff);
        scene.tweens.add({
          targets: scene.officer,
          alpha: 1,
          x: state.width * 0.8,
          y: state.height * 0.51,
          duration: motion(520),
          ease: "Back.easeOut",
          onComplete: () => {
            popDialogue();
            stopVoiceDone.then(() => delay(320)).then(() => {
              say("Kid", "I understand. I should have asked first.");
              return playVoice("street-kid-caught");
            }).then(() => delay(320)).then(() => {
                say("Officer", "Exactly. We will turn this into a safety drill. Clear each grammar checkpoint, then head back.");
                return playVoice("street-officer-brief");
              }).then(() => delay(420)).then(() => {
                setCaption("");
                showQuestion();
              });
          }
        });
      }
    });
  }

  function showQuestion() {
    state.scene = "question";
    const q = questions[state.questionIndex];
    el.questionType.textContent = q.type;
    el.questionTitle.textContent = q.title;
    el.questionText.textContent = q.text;
    el.feedback.textContent = "";
    el.answerGrid.innerHTML = q.answers.map((answer) => `<button type="button" disabled>${escapeHtml(answer)}</button>`).join("");
    el.questionPanel.classList.remove("hidden");
    el.questionPanel.classList.remove("flash-hit");
    void el.questionPanel.offsetWidth;
    el.questionPanel.classList.add("flash-hit");
    setCaption("");
    say("Officer", q.hint);
    playVoice(q.voice).then(() => {
      el.answerGrid.querySelectorAll("button").forEach((button) => {
        button.disabled = false;
      });
    });
    sweepPoliceLights(1);
    impactRings(state.width * 0.5, state.height * 0.5, 0xffffff);
    el.answerGrid.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => checkAnswer(button, q));
    });
  }

  function checkAnswer(button, q) {
    const selected = button.textContent;
    if (selected === q.correct) {
      button.classList.add("correct");
      el.feedback.textContent = correctFeedback[state.questionIndex] || "Yes, that's it.";
      playTone("correct");
      correctBurst();
      burstStars(state.width * 0.5, state.height * 0.42, 18, 0x20d982);
      state.solved += 1;
      renderBadges();
      delay(560).then(() => {
        el.questionPanel.classList.add("hidden");
        state.questionIndex += 1;
        if (state.questionIndex >= questions.length) startFinale();
        else reverseTowardHome();
      });
    } else {
      button.classList.add("wrong");
      el.feedback.textContent = `Try again. Hint: ${q.hint}`;
      playTone("wrong");
      playVoice("street-try");
      sweepPoliceLights(1);
      cameraShake();
      impactRings(state.width * 0.5, state.height * 0.48, 0xff2d5f);
      schedule(() => button.classList.remove("wrong"), motion(520));
    }
  }

  function reverseTowardHome() {
    const scene = sceneRef;
    state.scene = "return-step";
    say("Officer", "Nice. Ease back one safe step.");
    setCaption("");
    scene.tweens.add({
      targets: scene.kidCar,
      x: scene.kidCar.x - state.width * 0.035,
      angle: { from: 92, to: 88 },
      duration: motion(720),
      ease: "Sine.easeInOut",
      onStart: () => neonTrail(scene.kidCar.x + scene.kidCar.displayWidth * 0.32, scene.kidCar.y - scene.kidCar.displayHeight * 0.06, 0xffd15c),
      onComplete: () => schedule(showQuestion, motion(280))
    });
  }

  function startFinale() {
    const scene = sceneRef;
    state.scene = "finale";
    el.pauseButton.disabled = true;
    el.questionPanel.classList.add("hidden");
    el.startPanel.classList.add("hidden");
    scene.kidCar.setTexture("kidCar");
    fitSpriteWidth(scene.kidCar, Math.min(230, state.width * 0.2));
    say("Officer", "All clear. Smart writers build clear sentences, and smart kids ask an adult.");
    playVoice("street-finale");
    setCaption("");
    sweepPoliceLights(2);
    burstStars(state.width * 0.64, state.height * 0.36, 20, 0xffd15c);
    const revealFinale = () => {
      el.questionPanel.classList.add("hidden");
      el.finalePanel.classList.remove("hidden");
      renderBadges();
    };
    const fallback = schedule(revealFinale, motion(2400));
    scene.tweens.add({
      targets: scene.kidCar,
      x: state.width * 0.58,
      y: state.height * 0.69,
      angle: 90,
      duration: motion(950),
      ease: "Sine.easeInOut",
      onComplete: () => {
        scene.kid.setAlpha(1).setPosition(state.width * 0.49, state.height * 0.56);
        fitSpriteWidth(scene.kid, Math.min(150, state.width * 0.13));
        scene.tweens.add({
          targets: scene.kid,
          x: state.width * 0.42,
          y: state.height * 0.59,
          angle: -3,
          duration: motion(360),
          ease: "Back.easeOut",
          onComplete: () => {
            cancelScheduled(fallback);
            correctBurst(state.width * 0.5, state.height * 0.34);
            playTone("correct");
            revealFinale();
          }
        });
      }
    });
  }

  function jumpToStop() {
    const scene = sceneRef;
    idleReadyPose(scene);
    el.startPanel.classList.add("hidden");
    state.scene = "stop";
    scene.tweens.killTweensOf([scene.kidCar, scene.policeCar, scene.officer]);
    scene.kid.setAlpha(0);
    scene.kidCar.setTexture("kidCar").setAlpha(1).setPosition(state.width * 0.45, state.height * 0.58).setAngle(90);
    fitSpriteWidth(scene.kidCar, Math.min(230, state.width * 0.2));
    scene.policeCar.setTexture("policeCarFlash2").setAlpha(1).setPosition(state.width * 0.66, state.height * 0.58).setAngle(90);
    fitSpriteWidth(scene.policeCar, Math.min(220, state.width * 0.19));
    scene.officer.setAlpha(1).setPosition(state.width * 0.8, state.height * 0.51).setAngle(0);
    fitSpriteWidth(scene.officer, Math.min(220, state.width * 0.18));
    say("Officer", "Good stop. Cars are adult responsibility, not a kid experiment.");
    setCaption("");
    sweepPoliceLights(2);
    impactRings(scene.policeCar.x, scene.policeCar.y - scene.policeCar.displayHeight * 0.3, 0x2877ff);
    burstStars(scene.policeCar.x - scene.policeCar.displayWidth * 0.22, scene.policeCar.y - scene.policeCar.displayHeight * 0.42, 18, 0xffffff);
  }

  function jumpToQuestion() {
    idleReadyPose(sceneRef);
    el.startPanel.classList.add("hidden");
    sceneRef.kid.setAlpha(0);
    sceneRef.policeCar.setAlpha(1).setPosition(state.width * 0.66, state.height * 0.58);
    sceneRef.policeCar.setTexture("policeCarFlash1").setAngle(90);
    sceneRef.officer.setAlpha(1).setPosition(state.width * 0.8, state.height * 0.51);
    sceneRef.kidCar.setTexture("kidCar");
    fitSpriteWidth(sceneRef.kidCar, Math.min(230, state.width * 0.2));
    state.questionIndex = 0;
    el.pauseButton.disabled = false;
    showQuestion();
  }

  function jumpToFinale() {
    const scene = sceneRef;
    idleReadyPose(scene);
    el.startPanel.classList.add("hidden");
    el.questionPanel.classList.add("hidden");
    state.solved = questions.length;
    state.scene = "finale";
    el.pauseButton.disabled = true;
    renderBadges();
    scene.tweens.killTweensOf([scene.kid, scene.kidCar, scene.policeCar, scene.officer]);
    scene.kidCar.setTexture("kidCar").setAlpha(1).setPosition(state.width * 0.55, state.height * 0.67).setAngle(90);
    fitSpriteWidth(scene.kidCar, Math.min(230, state.width * 0.2));
    scene.kid.setAlpha(1).setPosition(state.width * 0.42, state.height * 0.56).setAngle(-3);
    fitSpriteWidth(scene.kid, Math.min(150, state.width * 0.13));
    scene.policeCar.setTexture("policeCarFlash3").setAlpha(1).setPosition(state.width * 0.68, state.height * 0.58).setAngle(90);
    fitSpriteWidth(scene.policeCar, Math.min(220, state.width * 0.19));
    scene.officer.setAlpha(1).setPosition(state.width * 0.82, state.height * 0.51).setAngle(0);
    fitSpriteWidth(scene.officer, Math.min(220, state.width * 0.18));
    say("Officer", "All clear. Ask an adult, park the idea, and keep the good grammar.");
    setCaption("");
    el.finalePanel.classList.remove("hidden");
  }

  function animateAmbient(scene, time, dt) {
    scene.clouds[0].x += 0.05 * dt;
    scene.clouds[1].x += 0.035 * dt;
    if (scene.clouds[0].x > state.width + 90) scene.clouds[0].x = -90;
    if (scene.clouds[1].x > state.width + 110) scene.clouds[1].x = -110;
    scene.kidCar.y += Math.sin(time / 180) * 0.02 * dt;
    scene.policeCar.y += Math.sin(time / 130) * 0.018 * dt;
    scene.officer.angle = Math.sin(time / 420) * 1.4;
    scene.flashTimer += 16.67 * dt;
    if (!state.reduceMotion && scene.flashTimer > 520 && (state.scene === "stop" || state.scene === "question")) {
      scene.flashTimer = 0;
      sparkleAt(scene.policeCar.x - scene.policeCar.displayWidth * 0.04, scene.policeCar.y - scene.policeCar.displayHeight * 0.42, 0x2877ff);
      sparkleAt(scene.policeCar.x + scene.policeCar.displayWidth * 0.08, scene.policeCar.y - scene.policeCar.displayHeight * 0.42, 0xff2d5f);
    }
  }

  function pulseCar(scene) {
    scene.tweens.add({
      targets: scene.kidCar,
      y: scene.kidCar.y - 6,
      duration: motion(620),
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });
  }

  function showSpeedLines(show) {
    const scene = sceneRef;
    scene.speedLines.forEach((line, index) => {
      line.setAlpha(show ? 0.55 : 0);
      if (!show) return;
      line.setPosition(state.width + Math.random() * state.width, state.height * (0.24 + Math.random() * 0.45));
      line.setRotation(-0.06);
      scene.tweens.add({
        targets: line,
        x: -180,
        duration: motion(460 + (index % 5) * 80),
        repeat: -1,
        delay: index * 36,
        ease: "Linear"
      });
    });
  }

  function sweepPoliceLights(count) {
    const scene = sceneRef;
    let sweepIndex = 0;
    const colors = [0x2877ff, 0xff2d5f];
    scene.tweens.killTweensOf(scene.policeLight);
    scene.policeLight
      .setAlpha(0)
      .setPosition(-state.width * 0.2, state.height * 0.34)
      .setFillStyle(colors[sweepIndex], 1);
    scene.tweens.add({
      targets: scene.policeLight,
      x: state.width * 1.05,
      alpha: { from: 0.78, to: 0 },
      duration: motion(360),
      repeat: Math.max(0, count * 2 - 1),
      yoyo: false,
      onRepeat: () => {
        sweepIndex = (sweepIndex + 1) % colors.length;
        scene.policeLight
          .setFillStyle(colors[sweepIndex], 1)
          .setPosition(-state.width * 0.2, state.height * 0.34);
        if (!state.reduceMotion) neonTrail(state.width * 0.86, state.height * (0.32 + Math.random() * 0.18), colors[sweepIndex]);
      }
    });
  }

  function flashWhite(alpha = 0.26) {
    const scene = sceneRef;
    scene.whiteFlash.setAlpha(alpha);
    scene.tweens.add({
      targets: scene.whiteFlash,
      alpha: 0,
      duration: motion(420),
      ease: "Quad.easeOut"
    });
  }

  function cameraPunch() {
    if (state.reduceMotion) return;
    sceneRef.cameras.main.zoomTo(1.035, 140);
    schedule(() => sceneRef.cameras.main.zoomTo(1, 260), 160);
  }

  function cameraShake() {
    if (state.reduceMotion) return;
    sceneRef.cameras.main.shake(150, 0.006);
  }

  function correctBurst(x = state.width * 0.72, y = state.height * 0.42) {
    const scene = sceneRef;
    scene.correctEmitter.setPosition(x, y);
    scene.correctEmitter.explode(42);
    flashWhite(0.22);
    impactRings(x, y, 0x20d982);
    cameraPunch();
  }

  function impactRings(x, y, color = 0xffffff) {
    if (!sceneRef || state.reduceMotion) return;
    const scene = sceneRef;
    [0, 90, 180].forEach((delay, index) => {
      const ring = scene.add.circle(x, y, 26 + index * 4).setStrokeStyle(5 - index, color, 0.86).setDepth(28).setBlendMode(Phaser.BlendModes.SCREEN);
      scene.tweens.add({
        targets: ring,
        scale: 2.8 + index * 0.55,
        alpha: 0,
        duration: motion(520 + index * 100),
        delay,
        ease: "Cubic.easeOut",
        onComplete: () => ring.destroy()
      });
    });
  }

  function sparkleAt(x, y, tint = 0xffffff) {
    if (!sceneRef || state.reduceMotion) return;
    const scene = sceneRef;
    const sparkle = scene.add.image(x, y, "starFlash").setDepth(29).setTint(tint).setScale(0.12).setAlpha(0.95).setBlendMode(Phaser.BlendModes.SCREEN);
    scene.tweens.add({
      targets: sparkle,
      y: y - 18,
      angle: 160,
      scale: 0.42,
      alpha: 0,
      duration: motion(520),
      ease: "Quad.easeOut",
      onComplete: () => sparkle.destroy()
    });
  }

  function burstStars(x, y, count = 14, tint = 0xffffff) {
    if (!sceneRef || state.reduceMotion) return;
    const scene = sceneRef;
    for (let i = 0; i < count; i += 1) {
      const angle = Phaser.Math.FloatBetween(-Math.PI, Math.PI);
      const distance = Phaser.Math.Between(45, 170);
      const star = scene.add.image(x, y, "starFlash").setDepth(29).setTint(tint).setScale(Phaser.Math.FloatBetween(0.08, 0.18)).setAlpha(0.92).setBlendMode(Phaser.BlendModes.SCREEN);
      scene.tweens.add({
        targets: star,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        angle: Phaser.Math.Between(-220, 220),
        scale: 0,
        alpha: 0,
        duration: motion(560 + Phaser.Math.Between(0, 220)),
        ease: "Cubic.easeOut",
        onComplete: () => star.destroy()
      });
    }
  }

  function neonTrail(x, y, color = 0x35d7ff) {
    if (!sceneRef || state.reduceMotion) return;
    const scene = sceneRef;
    for (let i = 0; i < 7; i += 1) {
      const trail = scene.add.rectangle(x + i * 28, y + Phaser.Math.Between(-30, 30), 160 - i * 12, 8, color, 0.42).setDepth(11).setRotation(-0.07).setBlendMode(Phaser.BlendModes.SCREEN);
      scene.tweens.add({
        targets: trail,
        x: trail.x - state.width * 0.48,
        alpha: 0,
        scaleX: 0.35,
        duration: motion(360 + i * 48),
        ease: "Cubic.easeOut",
        onComplete: () => trail.destroy()
      });
    }
  }

  function say(speaker, line) {
    el.speaker.textContent = speaker;
    el.line.textContent = line;
    popDialogue();
  }

  function playVoice(id) {
    if (!id) return Promise.resolve(false);
    return new Promise((resolve) => {
      try {
        if (activeVoiceCleanup) activeVoiceCleanup();
        if (activeVoice) {
          activeVoice.pause();
          activeVoice.currentTime = 0;
        }

        let clip = voiceCache.get(id);
        if (!clip) {
          clip = new Audio(`${voiceBase}${id}.mp3`);
          clip.preload = "auto";
          clip.volume = 0.94;
          voiceCache.set(id, clip);
        }

        const token = ++activeVoiceToken;
        const fallbackMs = Math.max(2600, (voiceLines[id] || "").length * 95 + 900);
        let settled = false;
        let fallbackId = null;
        const finish = (played) => {
          if (settled) return;
          settled = true;
          clip.removeEventListener("ended", onEnded);
          clip.removeEventListener("error", onError);
          if (fallbackId) cancelScheduled(fallbackId);
          if (activeVoice === clip && token === activeVoiceToken) activeVoice = null;
          if (activeVoiceCleanup === cleanup) activeVoiceCleanup = null;
          resolve(played);
        };
        const onEnded = () => finish(true);
        const onError = () => finish(false);
        const cleanup = () => finish(false);
        activeVoiceCleanup = cleanup;
        activeVoice = clip;
        clip.addEventListener("ended", onEnded, { once: true });
        clip.addEventListener("error", onError, { once: true });
        clip.currentTime = 0;
        fallbackId = schedule(() => finish(true), fallbackMs);
        const attempt = clip.play();
        if (attempt?.catch) attempt.catch(() => finish(false));
      } catch {
        activeVoice = null;
        activeVoiceCleanup = null;
        resolve(false);
      }
    });
  }

  function setCaption(text) {
    el.caption.textContent = text;
  }

  function popDialogue() {
    el.dialogue.animate([
      { transform: "scale(0.96) translateY(8px)", opacity: 0.78 },
      { transform: "scale(1.03) translateY(-2px)", opacity: 1 },
      { transform: "scale(1) translateY(0)", opacity: 1 }
    ], {
      duration: motion(320),
      easing: "cubic-bezier(.2,1.4,.3,1)"
    });
  }

  function renderBadges() {
    el.badgeStrip.innerHTML = questions.map((_, index) => `<span class="${index < state.solved ? "complete" : ""}"></span>`).join("");
  }

  function unlockAudio() {
    if (audioContext) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioContext = new Ctx();
    state.audioReady = true;
  }

  function playTone(kind) {
    if (!audioContext) return;
    const now = audioContext.currentTime;
    const gain = audioContext.createGain();
    gain.connect(audioContext.destination);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "wrong" ? 0.08 : 0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "siren" ? 0.5 : 0.24));

    const osc = audioContext.createOscillator();
    osc.type = kind === "engine" ? "sawtooth" : "sine";
    osc.frequency.setValueAtTime(kind === "wrong" ? 160 : kind === "siren" ? 520 : kind === "engine" ? 90 : 720, now);
    if (kind === "correct") osc.frequency.exponentialRampToValueAtTime(1120, now + 0.16);
    if (kind === "siren") osc.frequency.linearRampToValueAtTime(820, now + 0.24);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + (kind === "siren" ? 0.52 : 0.26));
  }

  function scaleFor(width, desktop, mobile) {
    const t = Math.max(0, Math.min(1, (width - 420) / 780));
    return mobile + (desktop - mobile) * t;
  }

  function fitPlate(image, width, height) {
    const scale = Math.max(width / image.width, height / image.height);
    image.setPosition(width / 2, height / 2).setScale(scale);
  }

  function fitSpriteWidth(image, targetWidth) {
    image.setScale(targetWidth / image.width);
  }

  function motion(ms) {
    return state.reduceMotion ? 1 : ms;
  }

  function delay(ms) {
    return new Promise((resolve) => schedule(resolve, motion(ms)));
  }

  function schedule(callback, delayMs) {
    const timer = { callback, remaining: Math.max(0, delayMs), startedAt: 0, id: null };
    scheduledTimers.add(timer);
    if (!state.paused) armScheduled(timer);
    return timer;
  }

  function armScheduled(timer) {
    timer.startedAt = performance.now();
    timer.id = window.setTimeout(() => {
      scheduledTimers.delete(timer);
      timer.id = null;
      timer.callback();
    }, timer.remaining);
  }

  function cancelScheduled(timer) {
    if (!timer) return;
    if (timer.id !== null) window.clearTimeout(timer.id);
    scheduledTimers.delete(timer);
  }

  function pauseScheduledTimers() {
    const now = performance.now();
    scheduledTimers.forEach((timer) => {
      if (timer.id === null) return;
      window.clearTimeout(timer.id);
      timer.id = null;
      timer.remaining = Math.max(0, timer.remaining - (now - timer.startedAt));
    });
  }

  function resumeScheduledTimers() {
    scheduledTimers.forEach((timer) => {
      if (timer.id === null) armScheduled(timer);
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
