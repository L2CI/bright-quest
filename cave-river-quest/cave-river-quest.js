const THREE_URL = "https://unpkg.com/three@0.165.0/build/three.module.js";

const questions = [
  {
    type: "Maths gate",
    title: "Iron Gate 1",
    text: "The boat has 4 oars on each side. How many oars are there altogether?",
    answers: ["6", "8", "10", "12"],
    correct: "8"
  },
  {
    type: "Logic gate",
    title: "Iron Gate 2",
    text: "I am an odd number. Take away one letter and I become even. What am I?",
    answers: ["Seven", "Nine", "Eleven", "Three"],
    correct: "Seven"
  },
  {
    type: "English gate",
    title: "Iron Gate 3",
    text: "Choose the best word: The cave river was dark, so Aarin rowed very ____.",
    answers: ["careful", "carefully", "care", "caring"],
    correct: "carefully"
  },
  {
    type: "Pattern gate",
    title: "Iron Gate 4",
    text: "What comes next? 3, 6, 12, 24, ...",
    answers: ["30", "36", "42", "48"],
    correct: "48"
  },
  {
    type: "Final gate",
    title: "Vault Gate",
    text: "Which sentence uses an apostrophe correctly?",
    answers: ["The boats oar broke.", "The boat's oar broke.", "The boats' oar broke.", "The boat oar's broke."],
    correct: "The boat's oar broke."
  }
];

const pathPoints = [
  { x: -11, z: 28 },
  { x: -6, z: 19 },
  { x: 7, z: 11 },
  { x: 11, z: 1 },
  { x: -4, z: -10 },
  { x: -11, z: -22 },
  { x: 3, z: -34 },
  { x: 10, z: -47 }
];

const isFastQa = new URLSearchParams(window.location.search).get("qa") === "fast";
const gateProgress = isFastQa ? [0.035, 0.07, 0.105, 0.14, 0.175] : [0.13, 0.29, 0.46, 0.64, 0.81];

const state = {
  progress: 0,
  rowVelocity: 0,
  forwardInput: 0,
  steer: 0,
  lateralOffset: 0,
  lateralVelocity: 0,
  questionIndex: 0,
  mode: "rowing",
  sound: true,
  lastTime: performance.now(),
  finalOpened: false,
  gateOpening: 0,
  wrongPulse: 0,
  lastSwish: 0
};

const el = {
  canvas: document.querySelector("#questCanvas"),
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
  fallback: document.querySelector("#fallbackNotice"),
  forwardButton: document.querySelector("#forwardButton"),
  backButton: document.querySelector("#backButton"),
  leftButton: document.querySelector("#leftButton"),
  rightButton: document.querySelector("#rightButton")
};

let THREE;
let renderer;
let scene;
let camera;
let boat;
let boy;
let river;
let chest;
let relic;
let guardian;
let currentGate;
let gateMeshes = [];
let caveLights = [];
let ripples = [];
let foamTrails = [];
let audioContext;

async function boot() {
  try {
    THREE = await import(THREE_URL);
    initScene();
    bindInput();
    requestAnimationFrame(loop);
  } catch (error) {
    console.error(error);
    el.fallback.classList.remove("hidden");
  }
}

function initScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06111e, 0.035);

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
  camera.position.set(0, 5.6, 11);

  renderer = new THREE.WebGLRenderer({ canvas: el.canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setClearColor(0x071523);

  const ambient = new THREE.HemisphereLight(0x8fdfff, 0x090b13, 1.45);
  scene.add(ambient);

  const moon = new THREE.DirectionalLight(0xbbeeff, 1.85);
  moon.position.set(-6, 9, 7);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  scene.add(moon);

  makeCave();
  makeRiver();
  makeBoat();
  makeGates();
  makeTreasureVault();
  updateBoatTransform();
  window.addEventListener("resize", resize);
}

function makeCave() {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x172234, roughness: 0.96, metalness: 0.08 });
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x263a4d, roughness: 0.94 });
  const darkRock = new THREE.MeshStandardMaterial({ color: 0x101c2c, roughness: 1 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(38, 86), new THREE.MeshStandardMaterial({ color: 0x0b1421, roughness: 1 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.18;
  floor.receiveShadow = true;
  scene.add(floor);

  for (let i = 0; i < 48; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const z = 30 - i * 1.7;
    const h = 3.6 + Math.sin(i * 1.9) * 0.8 + Math.random() * 1.4;
    const rock = new THREE.Mesh(new THREE.ConeGeometry(1.5 + Math.random() * 1.2, h, 7), rockMaterial);
    rock.position.set(side * (11.4 + Math.random() * 3.8), h * 0.5 - 0.2, z + Math.random() * 1.4);
    rock.rotation.y = Math.random() * Math.PI;
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
  }

  for (let i = 0; i < 36; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.55 + Math.random() * 0.8, 2.2 + Math.random() * 2.8, 7), darkRock);
    tooth.position.set(side * (3 + Math.random() * 8), 5.4 + Math.random() * 0.8, 30 - i * 2.25);
    tooth.rotation.x = Math.PI;
    tooth.castShadow = true;
    scene.add(tooth);
  }

  const archGeometry = new THREE.TorusGeometry(14.2, 0.48, 9, 52, Math.PI);
  for (let i = 0; i < 15; i += 1) {
    const arch = new THREE.Mesh(archGeometry, wallMaterial);
    arch.position.set(0, 1.2, 29 - i * 5.6);
    arch.rotation.set(Math.PI / 2, 0, Math.PI);
    arch.scale.y = 0.7 + Math.sin(i) * 0.08;
    arch.castShadow = true;
    scene.add(arch);
  }

  for (let i = 0; i < 24; i += 1) {
    const warm = i % 3 !== 0;
    const light = new THREE.PointLight(warm ? 0xffb45c : 0x45d9ff, warm ? 1.25 : 1.45, 9, 2);
    light.position.set((i % 2 ? -1 : 1) * (7.4 + Math.random() * 2.2), 2.2 + Math.random(), 28 - i * 3.1);
    scene.add(light);
    caveLights.push(light);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 14, 14),
      new THREE.MeshBasicMaterial({ color: warm ? 0xffb45c : 0x45d9ff })
    );
    glow.position.copy(light.position);
    scene.add(glow);
  }
}

function makeRiver() {
  const shape = new THREE.Shape();
  const left = [];
  const right = [];
  for (let i = 0; i <= 130; i += 1) {
    const t = i / 130;
    const p = samplePath(t);
    const n = sampleNormal(t);
    const width = riverWidthAt(t);
    left.push(new THREE.Vector2(p.x + n.x * width, -p.z - n.z * width));
    right.push(new THREE.Vector2(p.x - n.x * width, -p.z + n.z * width));
  }
  shape.moveTo(left[0].x, left[0].y);
  left.forEach((p) => shape.lineTo(p.x, p.y));
  right.reverse().forEach((p) => shape.lineTo(p.x, p.y));
  shape.closePath();

  river = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshPhysicalMaterial({
      color: 0x0b83a5,
      roughness: 0.18,
      metalness: 0.05,
      transmission: 0.12,
      thickness: 0.4,
      clearcoat: 0.55,
      clearcoatRoughness: 0.16,
      emissive: 0x052c42,
      emissiveIntensity: 0.6
    })
  );
  river.rotation.x = -Math.PI / 2;
  river.position.y = 0;
  river.receiveShadow = true;
  scene.add(river);

  for (let i = 0; i < 72; i += 1) {
    const t = i / 72;
    const p = samplePath(t);
    const ripple = new THREE.Mesh(
      new THREE.TorusGeometry(0.58 + Math.random() * 0.4, 0.018, 6, 28),
      new THREE.MeshBasicMaterial({ color: 0x99f6ff, transparent: true, opacity: 0.34 })
    );
    ripple.rotation.x = Math.PI / 2;
    ripple.position.set(p.x + (Math.random() - 0.5) * 4.5, 0.035, p.z + (Math.random() - 0.5) * 1.8);
    ripple.scale.x = 1.5;
    ripple.userData.phase = Math.random() * Math.PI * 2;
    ripple.userData.baseY = ripple.position.y;
    ripples.push(ripple);
    scene.add(ripple);
  }

  const foamMaterial = new THREE.MeshBasicMaterial({ color: 0xd8fbff, transparent: true, opacity: 0.38 });
  for (let i = 0; i < 26; i += 1) {
    const foam = new THREE.Mesh(new THREE.PlaneGeometry(0.9 + Math.random() * 0.9, 0.08), foamMaterial.clone());
    foam.rotation.x = -Math.PI / 2;
    foam.position.y = 0.055;
    foam.visible = false;
    foamTrails.push(foam);
    scene.add(foam);
  }
}

function makeBoat() {
  boat = new THREE.Group();

  const hull = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.46, 3.05),
    new THREE.MeshStandardMaterial({ color: 0x8b4b2a, roughness: 0.62, metalness: 0.05 })
  );
  hull.castShadow = true;
  hull.position.y = 0.34;
  boat.add(hull);

  const bow = new THREE.Mesh(
    new THREE.ConeGeometry(0.94, 1.25, 4),
    new THREE.MeshStandardMaterial({ color: 0xb66a35, roughness: 0.62, metalness: 0.06 })
  );
  bow.rotation.y = Math.PI / 4;
  bow.rotation.x = Math.PI / 2;
  bow.position.set(0, 0.35, -1.65);
  bow.castShadow = true;
  boat.add(bow);

  const trimMaterial = new THREE.MeshStandardMaterial({ color: 0xf4c36b, roughness: 0.42, metalness: 0.18 });
  [-1, 1].forEach((side) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 2.88), trimMaterial);
    rail.position.set(side * 0.98, 0.72, 0.05);
    rail.castShadow = true;
    boat.add(rail);
  });

  boy = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xd79b65, roughness: 0.6 });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x2877ff, roughness: 0.62 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x2a1a12, roughness: 0.8 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 18), skin);
  head.position.y = 1.14;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), hair);
  cap.position.y = 1.2;
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.23, 0.45, 8, 14), shirt);
  body.position.y = 0.72;
  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.1), new THREE.MeshStandardMaterial({ color: 0xffd15c, roughness: 0.5 }));
  vest.position.set(0, 0.8, -0.22);
  boy.add(head, cap, body, vest);
  boy.position.z = -0.1;
  boat.add(boy);

  const oarMaterial = new THREE.MeshStandardMaterial({ color: 0xf1d29b, roughness: 0.55 });
  [-1, 1].forEach((side) => {
    const oar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.6), oarMaterial);
    oar.position.set(side * 0.92, 0.56, 0.15);
    oar.rotation.y = side * 0.9;
    oar.name = `oar-${side}`;
    oar.castShadow = true;
    boat.add(oar);
  });

  scene.add(boat);
}

function makeGates() {
  const metal = new THREE.MeshStandardMaterial({ color: 0x485466, roughness: 0.38, metalness: 0.86 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x222a35, roughness: 0.5, metalness: 0.88 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xffd15c, emissive: 0xff9900, emissiveIntensity: 1.1, roughness: 0.28 });
  gateProgress.forEach((t, index) => {
    const p = samplePath(t);
    const n = sampleNormal(t);
    const group = new THREE.Group();
    group.userData.progress = t;
    group.userData.index = index;
    group.position.set(p.x, 0, p.z);
    group.rotation.y = Math.atan2(n.x, n.z);

    const arch = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.18, 8, 36, Math.PI), darkMetal);
    arch.position.y = 2.16;
    arch.rotation.z = Math.PI;
    arch.castShadow = true;
    group.add(arch);

    const top = new THREE.Mesh(new THREE.BoxGeometry(6.7, 0.42, 0.48), metal);
    top.position.y = 2.62;
    top.castShadow = true;
    group.add(top);

    [-2.8, 2.8].forEach((x) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.48, 3.55, 0.52), metal);
      post.position.set(x, 1.35, 0);
      post.castShadow = true;
      group.add(post);
    });

    for (let i = -3; i <= 3; i += 1) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.58, 0.18), i % 2 ? metal : darkMetal);
      bar.position.set(i * 0.62, 1.34, 0);
      bar.castShadow = true;
      group.add(bar);
    }

    const sign = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.46, 0.14), glow);
    sign.position.y = 2.06;
    sign.position.z = -0.25;
    sign.castShadow = true;
    group.add(sign);

    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.4), glow);
    gem.position.y = 3.15;
    gem.castShadow = true;
    group.add(gem);

    const gateLight = new THREE.PointLight(0xffb14d, 1.4, 7, 2);
    gateLight.position.set(0, 2.25, -0.65);
    group.add(gateLight);

    scene.add(group);
    gateMeshes.push(group);
  });
}

function makeTreasureVault() {
  const p = samplePath(0.93);
  chest = new THREE.Group();
  chest.position.set(p.x, 0.34, p.z);
  chest.rotation.y = -0.3;
  const dais = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 3.1, 0.5, 9),
    new THREE.MeshStandardMaterial({ color: 0x2f4053, roughness: 0.72, metalness: 0.18 })
  );
  dais.position.set(p.x, 0.05, p.z);
  dais.castShadow = true;
  dais.receiveShadow = true;
  scene.add(dais);

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 1, 1.35),
    new THREE.MeshStandardMaterial({ color: 0xb46a25, roughness: 0.55 })
  );
  const lid = new THREE.Mesh(
    new THREE.BoxGeometry(2.18, 0.46, 1.42),
    new THREE.MeshStandardMaterial({ color: 0xffc247, roughness: 0.38, metalness: 0.2 })
  );
  lid.position.y = 0.7;
  base.castShadow = true;
  lid.castShadow = true;
  chest.add(base, lid);
  scene.add(chest);

  const vaultLight = new THREE.PointLight(0x7df9ff, 2.2, 10, 2);
  vaultLight.position.set(p.x, 2.1, p.z + 0.5);
  scene.add(vaultLight);

  relic = new THREE.Group();
  const relicCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.54),
    new THREE.MeshStandardMaterial({ color: 0x7df9ff, emissive: 0x29a8ff, emissiveIntensity: 1.8, roughness: 0.18, metalness: 0.35 })
  );
  const relicFrame = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.07, 10, 48),
    new THREE.MeshStandardMaterial({ color: 0xffd15c, emissive: 0x7a3c00, roughness: 0.22, metalness: 0.75 })
  );
  relicFrame.rotation.x = Math.PI / 2;
  relic.add(relicCore, relicFrame);
  relic.position.set(p.x, -1.4, p.z);
  scene.add(relic);

  guardian = new THREE.Group();
  guardian.position.set(p.x + 4.2, -2, p.z - 2.2);
  guardian.rotation.y = -0.45;
  makeGuardianBody(guardian);
  scene.add(guardian);
}

function makeGuardianBody(group) {
  const blue = new THREE.MeshStandardMaterial({ color: 0x245bcb, roughness: 0.42, metalness: 0.62 });
  const red = new THREE.MeshStandardMaterial({ color: 0xbb2e3c, roughness: 0.42, metalness: 0.62 });
  const silver = new THREE.MeshStandardMaterial({ color: 0xb8c7d8, roughness: 0.28, metalness: 0.82 });
  const glow = new THREE.MeshStandardMaterial({ color: 0x7df9ff, emissive: 0x33c9ff, emissiveIntensity: 1.6 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.45, 2.0, 0.72), blue);
  torso.position.y = 2.7;
  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.68, 0.78), red);
  chestPlate.position.set(0, 2.95, -0.05);
  const spark = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), glow);
  spark.position.set(0, 2.95, -0.48);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.62), silver);
  head.position.y = 4.08;
  const crest = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 0.18), blue);
  crest.position.y = 4.62;
  group.add(torso, chestPlate, spark, head, crest);

  [-1, 1].forEach((side) => {
    const shoulder = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.78), side < 0 ? red : blue);
    shoulder.position.set(side * 1.05, 3.35, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.35, 0.42), silver);
    arm.position.set(side * 1.18, 2.42, 0);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.45, 0.5), side < 0 ? blue : red);
    leg.position.set(side * 0.42, 1.05, 0);
    shoulder.castShadow = true;
    arm.castShadow = true;
    leg.castShadow = true;
    group.add(shoulder, arm, leg);
  });
}

function bindInput() {
  const hold = (button, onDown, onUp) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      onDown();
      primeAudio();
    });
    button.addEventListener("pointerup", onUp);
    button.addEventListener("pointercancel", onUp);
    button.addEventListener("pointerleave", onUp);
  };

  hold(el.forwardButton, () => { state.forwardInput = 1; }, () => { if (state.forwardInput > 0) state.forwardInput = 0; });
  hold(el.backButton, () => { state.forwardInput = -0.62; }, () => { if (state.forwardInput < 0) state.forwardInput = 0; });
  hold(el.leftButton, () => { state.steer = -1; }, () => { if (state.steer < 0) state.steer = 0; });
  hold(el.rightButton, () => { state.steer = 1; }, () => { if (state.steer > 0) state.steer = 0; });

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "arrowup" || key === "w") state.forwardInput = 1;
    if (key === "arrowdown" || key === "s") state.forwardInput = -0.62;
    if (key === "arrowleft" || key === "a") state.steer = -1;
    if (key === "arrowright" || key === "d") state.steer = 1;
    primeAudio();
  });
  window.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (["arrowup", "w"].includes(key) && state.forwardInput > 0) state.forwardInput = 0;
    if (["arrowdown", "s"].includes(key) && state.forwardInput < 0) state.forwardInput = 0;
    if (["arrowleft", "a"].includes(key) && state.steer < 0) state.steer = 0;
    if (["arrowright", "d"].includes(key) && state.steer > 0) state.steer = 0;
  });
  el.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    el.soundButton.textContent = state.sound ? "Sound on" : "Sound off";
    if (state.sound) playTone(330, 0.08, "sine");
  });
  el.claimButton.addEventListener("click", openFinalChest);
}

function loop(now) {
  const dt = Math.min((now - state.lastTime) / 1000, 0.05);
  state.lastTime = now;
  update(dt, now / 1000);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function update(dt, time) {
  caveLights.forEach((light, index) => {
    light.intensity = 1 + Math.sin(time * 2.2 + index) * 0.22;
  });
  updateWater(dt, time);

  if (state.mode === "rowing") {
    const nextGate = gateProgress[state.questionIndex];
    if (typeof nextGate === "number" && state.progress >= nextGate - 0.022) {
      state.mode = "question";
      currentGate = gateMeshes[state.questionIndex];
      state.progress = nextGate - 0.022;
      showQuestion();
    } else if (state.progress >= 0.91) {
      state.mode = "finale";
      el.finalePanel.classList.remove("hidden");
      el.hint.textContent = "The treasure vault is here. Tap the chest to claim the relic.";
      playTone(196, 0.16, "triangle");
    } else {
      updateMovement(dt, time);
    }
  }

  if (state.mode === "gate-open" && currentGate) {
    state.gateOpening += dt * 1.4;
    currentGate.position.y = easeOut(Math.min(state.gateOpening, 1)) * 3.8;
    if (state.gateOpening >= 1) {
      state.mode = "rowing";
      state.gateOpening = 0;
      state.questionIndex += 1;
      currentGate = null;
      el.gateCount.textContent = `${state.questionIndex}/5`;
      state.rowVelocity = 0.018;
      state.forwardInput = 0;
      el.hint.textContent = state.questionIndex >= gateProgress.length
        ? "The vault is ahead. Row forward into the treasure chamber."
        : "Gate open. Row forward and steer through the next bend.";
    }
  }

  if (state.mode === "final-reveal") {
    relic.position.y = Math.min(relic.position.y + dt * 1.7, 2.2);
    relic.rotation.y += dt * 2.6;
    guardian.position.y = Math.min(guardian.position.y + dt * 1.6, 0);
    guardian.rotation.y = -0.45 + Math.sin(time * 2) * 0.03;
  }

  updateBoatTransform(time);
}

function updateBoatTransform(time = 0) {
  const p = samplePath(state.progress);
  const tangent = sampleTangent(state.progress);
  const normal = sampleNormal(state.progress);
  const sideOffset = state.lateralOffset;
  boat.position.set(p.x + normal.x * sideOffset, 0.18 + Math.sin(time * 3.1) * 0.05, p.z + normal.z * sideOffset);
  boat.rotation.y = Math.atan2(tangent.x, tangent.z) + state.steer * -0.16 + state.lateralVelocity * -0.08;
  boat.rotation.z = state.steer * -0.1 + Math.sin(time * 2.8) * 0.025;
  boat.rotation.x = state.rowVelocity * 1.3 + Math.sin(time * 3.8) * 0.018;
  boat.children.forEach((child) => {
    if (child.name && child.name.startsWith("oar")) child.rotation.x = Math.sin(time * 7.2) * (0.18 + Math.abs(state.rowVelocity) * 5.5);
  });

  const camBack = window.innerWidth < 720 ? 8.2 : 9.5;
  const camHeight = window.innerWidth < 720 ? 5.4 : 6.5;
  camera.position.lerp(new THREE.Vector3(p.x - tangent.x * camBack + normal.x * sideOffset * 0.35, camHeight, p.z - tangent.z * camBack + normal.z * sideOffset * 0.35), 0.075);
  camera.lookAt(p.x + normal.x * sideOffset * 0.35, 1.16, p.z + tangent.z * 1.2);

  if (river?.material) {
    river.material.emissiveIntensity = 0.6 + Math.sin(time * 1.8) * 0.12;
  }
}

function updateMovement(dt, time) {
  const targetVelocity = state.forwardInput * (isFastQa ? 0.2 : 0.055);
  state.rowVelocity = lerp(state.rowVelocity, targetVelocity, 1 - Math.pow(0.001, dt));
  if (Math.abs(state.forwardInput) < 0.01) {
    state.rowVelocity = lerp(state.rowVelocity, 0, 1 - Math.pow(0.03, dt));
  }
  state.progress = Math.max(0, Math.min(0.94, state.progress + state.rowVelocity * dt));

  const maxOffset = riverWidthAt(state.progress) - 1.25;
  const targetLateral = state.steer * maxOffset;
  state.lateralOffset = lerp(state.lateralOffset, targetLateral, 1 - Math.pow(0.015, dt));
  state.lateralVelocity = lerp(state.lateralVelocity, state.steer, 1 - Math.pow(0.02, dt));

  if ((Math.abs(state.rowVelocity) > 0.012 || Math.abs(state.steer) > 0.2) && time - state.lastSwish > 0.55) {
    state.lastSwish = time;
    playWaterSwish(Math.min(1, Math.abs(state.rowVelocity) * 18 + Math.abs(state.steer) * 0.25));
  }
}

function updateWater(dt, time) {
  ripples.forEach((ripple, index) => {
    ripple.position.y = ripple.userData.baseY + Math.sin(time * 2.1 + ripple.userData.phase) * 0.018;
    ripple.rotation.z += dt * (0.18 + (index % 3) * 0.05);
    ripple.material.opacity = 0.22 + Math.sin(time * 1.7 + ripple.userData.phase) * 0.1;
  });

  const p = samplePath(state.progress);
  const tangent = sampleTangent(state.progress);
  const normal = sampleNormal(state.progress);
  foamTrails.forEach((foam, index) => {
    const age = (time * 0.5 + index / foamTrails.length) % 1;
    const back = 0.9 + age * 3.4;
    const side = (index % 2 ? 1 : -1) * (0.65 + age * 0.35);
    foam.position.set(
      p.x - tangent.x * back + normal.x * (state.lateralOffset + side),
      0.07,
      p.z - tangent.z * back + normal.z * (state.lateralOffset + side)
    );
    foam.rotation.z = Math.atan2(tangent.x, tangent.z);
    foam.visible = Math.abs(state.rowVelocity) > 0.01 && state.mode === "rowing";
    foam.material.opacity = (1 - age) * Math.min(0.42, Math.abs(state.rowVelocity) * 7);
  });
}

function showQuestion() {
  state.forwardInput = 0;
  state.steer = 0;
  state.rowVelocity = 0;
  const q = questions[state.questionIndex];
  el.questionType.textContent = q.type;
  el.questionTitle.textContent = q.title;
  el.questionText.textContent = q.text;
  el.feedback.textContent = "";
  el.answerGrid.innerHTML = "";
  q.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => answerQuestion(answer));
    el.answerGrid.append(button);
  });
  el.questionPanel.classList.remove("hidden");
  el.hint.textContent = "An iron gate blocks the river. Pick the answer to open it.";
  playTone(130, 0.12, "sawtooth");
}

function answerQuestion(answer) {
  const q = questions[state.questionIndex];
  if (answer !== q.correct) {
    el.feedback.textContent = "Not that one. Try again, captain.";
    state.wrongPulse = 1;
    playTone(110, 0.16, "square");
    return;
  }
  el.feedback.textContent = "Correct. Gate opening.";
  playTone(523, 0.12, "sine");
  playTone(784, 0.18, "triangle", 0.08);
  setTimeout(() => {
    el.questionPanel.classList.add("hidden");
    el.hint.textContent = "Gate open. Keep rowing through the glowing river.";
    state.mode = "gate-open";
  }, 450);
}

function openFinalChest() {
  if (state.finalOpened) return;
  state.finalOpened = true;
  state.mode = "final-reveal";
  el.finalePanel.classList.add("hidden");
  el.guardianPanel.classList.remove("hidden");
  el.hint.textContent = "The Leadership Matrix is yours.";
  playTone(196, 0.18, "triangle");
  playTone(392, 0.22, "triangle", 0.12);
  playTone(659, 0.28, "sine", 0.24);
  speakGuardian();
}

function speakGuardian() {
  const line = "Young hero, you have awakened the Leadership Matrix. Carry its courage well.";
  el.guardianLine.textContent = line;
  playBaritoneBed();
  if (!state.sound || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(line);
  utterance.pitch = 0.38;
  utterance.rate = 0.64;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => /daniel|david|mark|george|male|english.*united kingdom|english.*australia/i.test(`${voice.name} ${voice.lang}`)) || voices[0] || null;
  window.speechSynthesis.speak(utterance);
}

function primeAudio() {
  if (!state.sound) return;
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === "suspended") audioContext.resume();
}

function playTone(freq, duration, type = "sine", delay = 0) {
  if (!state.sound) return;
  primeAudio();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + delay + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + delay + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime + delay);
  oscillator.stop(audioContext.currentTime + delay + duration + 0.02);
}

function playWaterSwish(power = 0.5) {
  if (!state.sound) return;
  primeAudio();
  const duration = 0.32;
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * power;
  }
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 560 + power * 440;
  filter.Q.value = 0.9;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08 + power * 0.08, audioContext.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  source.start();
  source.stop(audioContext.currentTime + duration);
}

function playBaritoneBed() {
  if (!state.sound) return;
  primeAudio();
  [82, 123, 164].forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.value = freq;
    filter.type = "lowpass";
    filter.frequency.value = 520;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.09 : 0.035, audioContext.currentTime + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 3.9);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 4.05);
  });
}

function samplePath(t) {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (pathPoints.length - 1);
  const index = Math.min(Math.floor(scaled), pathPoints.length - 2);
  const local = scaled - index;
  const a = pathPoints[index];
  const b = pathPoints[index + 1];
  const smooth = local * local * (3 - 2 * local);
  return {
    x: lerp(a.x, b.x, smooth),
    z: lerp(a.z, b.z, smooth)
  };
}

function sampleTangent(t) {
  const a = samplePath(Math.max(0, t - 0.006));
  const b = samplePath(Math.min(1, t + 0.006));
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  return { x: dx / len, z: dz / len };
}

function sampleNormal(t) {
  const tangent = sampleTangent(t);
  return { x: -tangent.z, z: tangent.x };
}

function riverWidthAt(t) {
  return 3.2 + Math.sin(t * Math.PI * 3.2) * 0.34 + Math.sin(t * Math.PI * 8) * 0.16;
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

boot();
