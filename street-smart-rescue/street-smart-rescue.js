(() => {
  "use strict";

  const BUILD_ID = "grammar-cinematic-007";
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
    finalePanel: document.querySelector("#finalePanel"),
    replayButton: document.querySelector("#replayButton")
  };

  const state = {
    scene: "ready",
    questionIndex: 0,
    solved: 0,
    audioReady: false,
    width: window.innerWidth,
    height: window.innerHeight,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  let sceneRef = null;
  let audioContext = null;
  let activeVoice = null;
  const voiceCache = new Map();

  const voiceLines = {
    "street-kid-intro": "No one's here. Maybe I can drive today.",
    "street-kid-rollout": "Okay. Just a tiny drive. Nobody will know.",
    "street-officer-stop": "Hold it. Street-smart choices start before the engine does.",
    "street-kid-caught": "I don't have a licence. I was just trying.",
    "street-officer-brief": "Then you solve five grammar checkpoints and take the safe way home.",
    "street-q1-sentence": "Checkpoint one. A complete sentence needs a subject and a predicate. Find what Maya does.",
    "street-q2-noun": "Checkpoint two. Proper nouns name someone or somewhere special. Pick the special name.",
    "street-q3-verb": "Checkpoint three. Modal helpers show duty, ability, or possibility. Listen for should, must, can, or might.",
    "street-q4-modifier": "Checkpoint four. Adverbs often tell how an action happens.",
    "street-q5-clause": "Checkpoint five. Choose the clause that can stand alone as a complete thought.",
    "street-correct": "Correct. One grammar lock clears, and the safe route gets brighter.",
    "street-try": "Not quite. Use the hint, then try again. Grammar is a map, not a trap.",
    "street-finale": "Unlocked. Smart writers build clear sentences, and smart kids ask an adult before any drive."
  };

  renderBadges();

  class StreetScene extends Phaser.Scene {
    constructor() {
      super("StreetScene");
      this.roadOffset = 0;
      this.flashTimer = 0;
      this.sparkles = [];
      this.speedLines = [];
    }

    preload() {
      this.load.image("suburbPlate", "assets/generated/suburban-road-plate.png");
      this.load.image("kidStandingAsset", "assets/generated/kid-standing-alpha.png");
      this.load.image("kidCarAsset", "assets/generated/kid-car-alpha.png");
      this.load.image("policeCarAsset", "assets/generated/police-car-alpha.png");
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
        el.startPanel.classList.add("hidden");
        if (qaScene === "stop") jumpToStop();
        else if (qaScene === "question") jumpToQuestion();
        else if (qaScene === "finale") jumpToFinale();
        else startIntro();
      }
    }

    update(time, delta) {
      const dt = Math.min(delta / 16.67, 2);
      animateAmbient(this, time, dt);
      if (state.scene === "rollout") {
        this.roadOffset += 4.2 * dt;
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
    el.replayButton.addEventListener("click", () => {
      window.location.href = window.location.pathname;
    });
  }

  function makeTextures(scene) {
    drawCar(scene, "kidCar", 260, 138, 0x12b8d9, 0xffd15c);
    drawCar(scene, "policeCar", 282, 142, 0xffffff, 0x2877ff, true);
    drawKid(scene);
    drawOfficer(scene);
    drawHouse(scene);
    drawTree(scene);
    drawSign(scene);
    drawBubbleFlash(scene);
  }

  function drawCar(scene, key, w, h, bodyColor, accentColor, police = false) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.clear();
    g.fillStyle(0x000000, 0.18);
    g.fillEllipse(w * 0.5, h - 16, w * 0.78, 28);
    g.fillStyle(bodyColor, 1);
    g.fillRoundedRect(26, 48, w - 52, 54, 24);
    g.fillStyle(accentColor, 1);
    g.fillRoundedRect(64, 20, w * 0.42, 46, 22);
    g.fillStyle(0xb8f3ff, 1);
    g.fillRoundedRect(82, 27, 42, 28, 11);
    g.fillRoundedRect(130, 27, 46, 28, 11);
    g.fillStyle(0xffffff, 0.95);
    g.fillCircle(42, 72, 13);
    g.fillStyle(0xfff3a8, 1);
    g.fillCircle(w - 42, 72, 12);
    g.fillStyle(0x18223d, 1);
    g.fillCircle(76, 104, 24);
    g.fillCircle(w - 76, 104, 24);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(76, 104, 10);
    g.fillCircle(w - 76, 104, 10);
    if (police) {
      g.fillStyle(0x102a56, 1);
      g.fillRoundedRect(102, 57, 80, 28, 12);
      g.fillStyle(0xff2d5f, 1);
      g.fillRoundedRect(118, 8, 28, 14, 6);
      g.fillStyle(0x2877ff, 1);
      g.fillRoundedRect(148, 8, 28, 14, 6);
    } else {
      g.fillStyle(0xff5f8a, 1);
      g.fillCircle(w - 88, 52, 8);
      g.fillCircle(w - 108, 50, 5);
    }
    g.generateTexture(key, w, h);
    g.destroy();
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
    scene.plate = scene.add.image(0, 0, "suburbPlate").setOrigin(0.5).setDepth(1);
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
    for (let i = 0; i < 16; i += 1) {
      scene.roadMarks.add(scene.add.rectangle(0, 0, 72, 10, 0xffffff, 0).setDepth(4));
    }
    scene.kid = scene.add.image(0, 0, "kidStandingAsset").setDepth(8);
    scene.kidCar = scene.add.image(0, 0, "kidCarAsset").setDepth(7);
    scene.policeCar = scene.add.image(0, 0, "policeCarAsset").setDepth(6).setAlpha(0);
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
    scene.house.setPosition(w * 0.18, h * 0.48).setScale(scaleFor(w, 0.92, 0.58));
    scene.trees[0].setPosition(w * 0.08, h * 0.48).setScale(scaleFor(w, 0.9, 0.55));
    scene.trees[1].setPosition(w * 0.72, h * 0.5).setScale(scaleFor(w, 0.74, 0.5));
    scene.sign.setPosition(w * 0.79, h * 0.58).setScale(scaleFor(w, 0.8, 0.54));

    drawRoad(scene);
    moveRoad(scene);
    scene.whiteFlash.setSize(w, h);
    scene.policeLight.setSize(w * 1.5, h * 0.36).setRotation(-0.22);
  }

  function drawRoad(scene) {
    scene.road.clear();
  }

  function moveRoad(scene) {
    const w = state.width;
    const h = state.height;
    const y = h * 0.79;
    const spacing = 152;
    scene.roadMarks.getChildren().forEach((mark, index) => {
      const x = ((index * spacing - scene.roadOffset) % (w + spacing)) - spacing * 0.5;
      mark.setPosition(x, y);
    });
  }

  function idleReadyPose(scene) {
    const w = state.width;
    const h = state.height;
    state.scene = "ready";
    scene.kid.setAlpha(1).setPosition(w * 0.34, h * 0.56);
    fitSpriteWidth(scene.kid, Math.min(150, w * 0.13));
    scene.kidCar.setAlpha(1).setPosition(w * 0.56, h * 0.67);
    fitSpriteWidth(scene.kidCar, Math.min(360, w * 0.3));
    scene.policeCar.setAlpha(0).setPosition(w + 240, h * 0.69);
    fitSpriteWidth(scene.policeCar, Math.min(390, w * 0.32));
    scene.officer.setAlpha(0).setPosition(w + 120, h * 0.55);
    fitSpriteWidth(scene.officer, Math.min(220, w * 0.18));
    pulseCar(scene);
  }

  function startIntro() {
    if (!sceneRef) return;
    state.questionIndex = 0;
    state.solved = 0;
    state.scene = "intro";
    renderBadges();
    el.startPanel.classList.add("hidden");
    el.finalePanel.classList.add("hidden");
    el.questionPanel.classList.add("hidden");
    setCaption("The driveway is quiet. The jazzy car blinks like it has an idea.");
    say("Kid", "No one's here... maybe I can drive today.");
    playVoice("street-kid-intro");
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
        scene.tweens.add({
          targets: scene.kid,
          alpha: 0,
          y: scene.kid.y - 24,
          duration: motion(360),
          ease: "Back.easeIn"
        });
        scene.tweens.add({
          targets: scene.kidCar,
          y: scene.kidCar.y - 12,
          scaleX: scene.kidCar.scaleX * 1.04,
          scaleY: scene.kidCar.scaleY * 1.04,
          yoyo: true,
          duration: motion(220),
          ease: "Quad.easeOut",
          onComplete: () => startRollout()
        });
      }
    });
  }

  function startRollout() {
    const scene = sceneRef;
    state.scene = "rollout";
    setCaption("The car rolls onto the road. It wobbles. This is already a bad idea.");
    say("Kid", "Okay... just a little drive.");
    playVoice("street-kid-rollout");
    playTone("engine");
    showSpeedLines(true);
    scene.tweens.add({
      targets: scene.kidCar,
      x: state.width * 0.5,
      angle: { from: -3, to: 5 },
      duration: motion(420),
      yoyo: true,
      repeat: 5,
      ease: "Sine.easeInOut"
    });
    scene.tweens.add({
      targets: scene.kidCar,
      x: state.width * 0.36,
      duration: motion(2200),
      ease: "Sine.easeInOut",
      onComplete: () => startPoliceStop()
    });
    burstStars(state.width * 0.5, state.height * 0.62, 16, 0xffd15c);
    impactRings(state.width * 0.54, state.height * 0.67, 0x35d7ff);
  }

  function startPoliceStop() {
    const scene = sceneRef;
    state.scene = "stop";
    setCaption("Red and blue lights flash. The police car pulls in behind him.");
    say("Officer", "Hold it. Street-smart choices start before the engine does.");
    playVoice("street-officer-stop");
    playTone("siren");
    showSpeedLines(false);
    sweepPoliceLights(5);
    scene.policeCar.setAlpha(1).setPosition(state.width + 260, state.height * 0.69);
    fitSpriteWidth(scene.policeCar, Math.min(390, state.width * 0.32));
    neonTrail(state.width * 0.98, state.height * 0.61, 0x2877ff);
    neonTrail(state.width * 0.98, state.height * 0.66, 0xff2d5f);
    scene.tweens.add({
      targets: scene.policeCar,
      x: state.width * 0.66,
      duration: motion(900),
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
          x: state.width * 0.72,
          y: state.height * 0.58,
          duration: motion(520),
          ease: "Back.easeOut",
          onComplete: () => {
            popDialogue();
            setTimeout(() => {
              say("Kid", "I don't have one. I was just trying.");
              playVoice("street-kid-caught");
              setTimeout(() => {
                say("Officer", "Solve five grammar checkpoints, then take the safe way home.");
                playVoice("street-officer-brief");
                setCaption("Five grammar checkpoints appear. Wrong answers stay put until corrected.");
                setTimeout(showQuestion, motion(1700));
              }, motion(1700));
            }, motion(1350));
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
    el.answerGrid.innerHTML = q.answers.map((answer) => `<button type="button">${escapeHtml(answer)}</button>`).join("");
    el.questionPanel.classList.remove("hidden");
    el.questionPanel.classList.remove("flash-hit");
    void el.questionPanel.offsetWidth;
    el.questionPanel.classList.add("flash-hit");
    setCaption(`Grammar checkpoint ${state.questionIndex + 1} of ${questions.length}. Read it like a sentence detective.`);
    say("Officer", q.hint);
    playVoice(q.voice);
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
      el.feedback.textContent = "Correct. One grammar lock cleared.";
      playTone("correct");
      playVoice("street-correct");
      correctBurst();
      burstStars(state.width * 0.5, state.height * 0.42, 18, 0x20d982);
      state.solved += 1;
      renderBadges();
      setTimeout(() => {
        el.questionPanel.classList.add("hidden");
        state.questionIndex += 1;
        if (state.questionIndex >= questions.length) startFinale();
        else reverseTowardHome();
      }, motion(900));
    } else {
      button.classList.add("wrong");
      el.feedback.textContent = `Try again. Hint: ${q.hint}`;
      playTone("wrong");
      playVoice("street-try");
      sweepPoliceLights(1);
      cameraShake();
      impactRings(state.width * 0.5, state.height * 0.48, 0xff2d5f);
      setTimeout(() => button.classList.remove("wrong"), motion(520));
    }
  }

  function reverseTowardHome() {
    const scene = sceneRef;
    state.scene = "return-step";
    say("Officer", "Good. Back it up one safe step.");
    setCaption("The car reverses toward the driveway after the solved grammar checkpoint.");
    scene.tweens.add({
      targets: scene.kidCar,
      x: scene.kidCar.x - state.width * 0.055,
      angle: { from: 2, to: -2 },
      duration: motion(720),
      ease: "Sine.easeInOut",
      onStart: () => neonTrail(scene.kidCar.x + scene.kidCar.displayWidth * 0.32, scene.kidCar.y - scene.kidCar.displayHeight * 0.06, 0xffd15c),
      onComplete: () => setTimeout(showQuestion, motion(620))
    });
  }

  function startFinale() {
    const scene = sceneRef;
    state.scene = "finale";
    say("Officer", "Unlocked. Smart writers build clear sentences, and smart kids ask an adult.");
    playVoice("street-finale");
    setCaption("All five grammar checkpoints are solved. The car returns home safely.");
    sweepPoliceLights(2);
    burstStars(state.width * 0.56, state.height * 0.55, 20, 0xffd15c);
    scene.tweens.add({
      targets: scene.kidCar,
      x: state.width * 0.58,
      y: state.height * 0.69,
      angle: 0,
      duration: motion(1500),
      ease: "Sine.easeInOut",
      onComplete: () => {
        scene.kid.setAlpha(1).setPosition(state.width * 0.49, state.height * 0.56);
        fitSpriteWidth(scene.kid, Math.min(150, state.width * 0.13));
        scene.tweens.add({
          targets: scene.kid,
          x: state.width * 0.42,
          y: state.height * 0.59,
          angle: -3,
          duration: motion(520),
          ease: "Back.easeOut",
          onComplete: () => {
            correctBurst(state.width * 0.5, state.height * 0.44);
            playTone("correct");
            el.finalePanel.classList.remove("hidden");
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
    scene.kidCar.setAlpha(1).setPosition(state.width * 0.42, state.height * 0.67).setAngle(0);
    fitSpriteWidth(scene.kidCar, Math.min(360, state.width * 0.3));
    scene.policeCar.setAlpha(1).setPosition(state.width * 0.68, state.height * 0.69).setAngle(0);
    fitSpriteWidth(scene.policeCar, Math.min(390, state.width * 0.32));
    scene.officer.setAlpha(1).setPosition(state.width * 0.74, state.height * 0.55).setAngle(0);
    fitSpriteWidth(scene.officer, Math.min(220, state.width * 0.18));
    say("Officer", "Show me your driver's licence!");
    setCaption("Red and blue lights flash. The police car has pulled in behind him.");
    sweepPoliceLights(2);
    impactRings(scene.policeCar.x, scene.policeCar.y - scene.policeCar.displayHeight * 0.3, 0x2877ff);
    burstStars(scene.policeCar.x, scene.policeCar.y - scene.policeCar.displayHeight * 0.36, 18, 0xffffff);
  }

  function jumpToQuestion() {
    idleReadyPose(sceneRef);
    el.startPanel.classList.add("hidden");
    sceneRef.policeCar.setAlpha(1).setPosition(state.width * 0.66, state.height * 0.7);
    sceneRef.officer.setAlpha(1).setPosition(state.width * 0.72, state.height * 0.58);
    state.questionIndex = 0;
    showQuestion();
  }

  function jumpToFinale() {
    const scene = sceneRef;
    idleReadyPose(scene);
    el.startPanel.classList.add("hidden");
    el.questionPanel.classList.add("hidden");
    state.solved = questions.length;
    state.scene = "finale";
    renderBadges();
    scene.tweens.killTweensOf([scene.kid, scene.kidCar, scene.policeCar, scene.officer]);
    scene.kidCar.setAlpha(1).setPosition(state.width * 0.55, state.height * 0.67).setAngle(0);
    fitSpriteWidth(scene.kidCar, Math.min(360, state.width * 0.3));
    scene.kid.setAlpha(1).setPosition(state.width * 0.42, state.height * 0.56).setAngle(-3);
    fitSpriteWidth(scene.kid, Math.min(150, state.width * 0.13));
    scene.policeCar.setAlpha(1).setPosition(state.width * 0.74, state.height * 0.69).setAngle(0);
    fitSpriteWidth(scene.policeCar, Math.min(390, state.width * 0.32));
    scene.officer.setAlpha(1).setPosition(state.width * 0.78, state.height * 0.55).setAngle(0);
    fitSpriteWidth(scene.officer, Math.min(220, state.width * 0.18));
    say("Officer", "Last warning. Smart kids ask an adult. Now go back.");
    setCaption("All five grammar checkpoints are solved. The car returns home safely.");
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
    setTimeout(() => sceneRef.cameras.main.zoomTo(1, 260), 160);
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
    if (!id) return;
    try {
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
      activeVoice = clip;
      clip.currentTime = 0;
      const attempt = clip.play();
      if (attempt?.catch) attempt.catch(() => {});
    } catch {
      activeVoice = null;
    }
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

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
