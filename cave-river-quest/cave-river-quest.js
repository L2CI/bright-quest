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
let comicRider;
let river;
let chest;
let relic;
let guardian;
let boatRig = {};
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

  const hullMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4b2a, roughness: 0.58, metalness: 0.04 });
  const innerMaterial = new THREE.MeshStandardMaterial({ color: 0x5d321d, roughness: 0.72 });
  const trimMaterial = new THREE.MeshStandardMaterial({ color: 0xf4c36b, roughness: 0.42, metalness: 0.18 });
  const shadowMaterial = new THREE.MeshStandardMaterial({ color: 0x2e1b12, roughness: 0.9 });

  const hull = new THREE.Mesh(makeBoatHullGeometry(), hullMaterial);
  hull.castShadow = true;
  hull.receiveShadow = true;
  hull.position.y = 0.22;
  boat.add(hull);

  const inner = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.18, 2.55), innerMaterial);
  inner.position.set(0, 0.62, 0.02);
  inner.castShadow = true;
  boat.add(inner);

  [-1, 1].forEach((side) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 3.28), trimMaterial);
    rail.position.set(side * 0.98, 0.78, 0);
    rail.castShadow = true;
    boat.add(rail);
  });

  [-0.74, 0.12, 0.86].forEach((z) => {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.13, 0.22), trimMaterial);
    bench.position.set(0, 0.78, z);
    bench.castShadow = true;
    boat.add(bench);
  });

  for (let i = -2; i <= 2; i += 1) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(1.42 - Math.abs(i) * 0.12, 0.08, 0.08), shadowMaterial);
    rib.position.set(0, 0.56, i * 0.46);
    rib.castShadow = true;
    boat.add(rib);
  }

  boy = new THREE.Group();
  makeRowingBoy(boy);
  boy.position.set(0, 0.2, -0.08);
  boat.add(boy);
  boy.visible = false;

  comicRider = makeComicRiderSprite();
  comicRider.position.set(0, 1.12, -0.34);
  comicRider.rotation.x = -0.08;
  boat.add(comicRider);

  const oarMaterial = new THREE.MeshStandardMaterial({ color: 0xd9ad73, roughness: 0.5 });
  const bladeMaterial = new THREE.MeshStandardMaterial({ color: 0xf1d29b, roughness: 0.48 });
  boatRig.oars = [];
  [-1, 1].forEach((side) => {
    const oar = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.9, 10), oarMaterial);
    shaft.rotation.z = Math.PI / 2;
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.22), bladeMaterial);
    blade.position.x = side * 1.48;
    blade.scale.set(0.7, 1, 1.25);
    blade.castShadow = true;
    shaft.castShadow = true;
    oar.add(shaft, blade);
    oar.position.set(side * 0.22, 0.86, 0.02);
    oar.rotation.set(0.16, 0, side * 0.42);
    oar.name = `oar-${side}`;
    boat.add(oar);
    boatRig.oars.push({ group: oar, side });
  });

  scene.add(boat);
}

function makeBoatHullGeometry() {
  const vertices = new Float32Array([
    0, 0.78, -1.85, -1.02, 0.62, -1.2, 1.02, 0.62, -1.2,
    -1.02, 0.62, -1.2, -1.1, 0.52, 1.2, 1.1, 0.52, 1.2,
    -1.02, 0.62, -1.2, 1.1, 0.52, 1.2, 1.02, 0.62, -1.2,
    -1.1, 0.52, 1.2, 0, 0.7, 1.9, 1.1, 0.52, 1.2,
    -0.58, 0.06, -1.05, 0.58, 0.06, -1.05, 0.7, 0.02, 1.05,
    -0.58, 0.06, -1.05, 0.7, 0.02, 1.05, -0.7, 0.02, 1.05,
    -1.02, 0.62, -1.2, -0.58, 0.06, -1.05, -0.7, 0.02, 1.05,
    -1.02, 0.62, -1.2, -0.7, 0.02, 1.05, -1.1, 0.52, 1.2,
    1.02, 0.62, -1.2, 1.1, 0.52, 1.2, 0.7, 0.02, 1.05,
    1.02, 0.62, -1.2, 0.7, 0.02, 1.05, 0.58, 0.06, -1.05,
    0, 0.78, -1.85, 1.02, 0.62, -1.2, 0.58, 0.06, -1.05,
    0, 0.78, -1.85, 0.58, 0.06, -1.05, -0.58, 0.06, -1.05,
    0, 0.78, -1.85, -0.58, 0.06, -1.05, -1.02, 0.62, -1.2,
    -1.1, 0.52, 1.2, -0.7, 0.02, 1.05, 0.7, 0.02, 1.05,
    -1.1, 0.52, 1.2, 0.7, 0.02, 1.05, 0, 0.7, 1.9,
    0, 0.7, 1.9, 0.7, 0.02, 1.05, 1.1, 0.52, 1.2
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function makeRowingBoy(group) {
  const skin = new THREE.MeshStandardMaterial({ color: 0xd69a67, roughness: 0.62 });
  const cheek = new THREE.MeshStandardMaterial({ color: 0xe8a176, roughness: 0.68 });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x2470d8, roughness: 0.58 });
  const vestMat = new THREE.MeshStandardMaterial({ color: 0xffc83d, roughness: 0.5 });
  const shorts = new THREE.MeshStandardMaterial({ color: 0x18345f, roughness: 0.66 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x2a1a12, roughness: 0.82 });
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x101820 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1c2430, roughness: 0.7 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.56, 8, 18), shirt);
  torso.position.set(0, 0.86, 0.02);
  torso.scale.set(0.92, 1, 0.72);
  torso.rotation.x = -0.18;
  torso.castShadow = true;
  group.add(torso);

  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.48, 0.12), vestMat);
  vest.position.set(0, 0.9, -0.22);
  vest.rotation.x = -0.18;
  vest.castShadow = true;
  group.add(vest);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.16, 14), skin);
  neck.position.set(0, 1.28, -0.01);
  group.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 28, 20), skin);
  head.position.set(0, 1.52, -0.06);
  head.scale.set(0.88, 1.08, 0.8);
  head.castShadow = true;
  group.add(head);

  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.275, 26, 10, 0, Math.PI * 2, 0, Math.PI / 2), hair);
  hairCap.position.set(0, 1.61, -0.06);
  hairCap.scale.set(0.94, 0.66, 0.86);
  hairCap.castShadow = true;
  group.add(hairCap);

  const fringe = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.08), hair);
  fringe.position.set(0.02, 1.59, -0.27);
  fringe.rotation.z = -0.18;
  group.add(fringe);

  [-1, 1].forEach((side) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.026, 10, 8), eyeMat);
    eye.position.set(side * 0.08, 1.53, -0.275);
    eye.scale.set(1, 0.8, 0.45);
    group.add(eye);

    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 8), skin);
    ear.position.set(side * 0.235, 1.51, -0.05);
    ear.scale.set(0.55, 0.85, 0.35);
    group.add(ear);

    const blush = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), cheek);
    blush.position.set(side * 0.12, 1.47, -0.285);
    blush.scale.set(1.25, 0.5, 0.25);
    group.add(blush);
  });

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), skin);
  nose.position.set(0, 1.49, -0.3);
  nose.scale.set(0.75, 1, 1.3);
  group.add(nose);

  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.006, 6, 18, Math.PI), new THREE.MeshBasicMaterial({ color: 0x7f3f2c }));
  smile.position.set(0, 1.43, -0.292);
  smile.rotation.set(Math.PI, 0, 0);
  group.add(smile);

  boatRig.arms = [];
  [-1, 1].forEach((side) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.25, 1.02, -0.1);
    shoulder.rotation.z = side * -0.58;
    shoulder.rotation.x = -0.28;
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.34, 8, 12), shirt);
    upper.position.y = -0.18;
    upper.rotation.z = 0.05;
    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.34, 8, 12), skin);
    forearm.position.set(side * 0.08, -0.45, -0.08);
    forearm.rotation.z = side * 0.4;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), skin);
    hand.position.set(side * 0.16, -0.66, -0.12);
    shoulder.add(upper, forearm, hand);
    group.add(shoulder);
    boatRig.arms.push({ group: shoulder, side });
  });

  [-1, 1].forEach((side) => {
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.34, 8, 12), shorts);
    thigh.position.set(side * 0.16, 0.5, 0.12);
    thigh.rotation.set(1.05, 0, side * 0.12);
    const calf = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.28, 8, 12), skin);
    calf.position.set(side * 0.22, 0.42, -0.15);
    calf.rotation.set(1.22, 0, side * 0.08);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.24), shoeMat);
    shoe.position.set(side * 0.24, 0.34, -0.36);
    shoe.castShadow = true;
    group.add(thigh, calf, shoe);
  });
}

function makeComicRiderSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const shadow = ctx.createRadialGradient(512, 830, 40, 512, 830, 360);
  shadow.addColorStop(0, "rgba(0, 0, 0, 0.36)");
  shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(512, 828, 355, 82, 0, 0, Math.PI * 2);
  ctx.fill();

  const hull = ctx.createLinearGradient(0, 610, 0, 900);
  hull.addColorStop(0, "#c47a35");
  hull.addColorStop(0.52, "#8e4a24");
  hull.addColorStop(1, "#3d2216");
  ctx.fillStyle = hull;
  ctx.strokeStyle = "#2a160e";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(150, 640);
  ctx.bezierCurveTo(270, 560, 750, 560, 874, 640);
  ctx.bezierCurveTo(805, 820, 650, 904, 512, 916);
  ctx.bezierCurveTo(372, 904, 218, 820, 150, 640);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const inside = ctx.createLinearGradient(0, 596, 0, 764);
  inside.addColorStop(0, "#6b351c");
  inside.addColorStop(1, "#27140d");
  ctx.fillStyle = inside;
  ctx.strokeStyle = "#f0bd65";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.ellipse(512, 645, 325, 92, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 224, 150, 0.72)";
  ctx.lineWidth = 10;
  for (let i = 0; i < 5; i += 1) {
    const y = 690 + i * 34;
    ctx.beginPath();
    ctx.moveTo(270 + i * 22, y);
    ctx.bezierCurveTo(392, y + 28, 632, y + 28, 754 - i * 22, y);
    ctx.stroke();
  }

  drawOar(ctx, 240, 602, 84, 832, -1);
  drawOar(ctx, 784, 602, 940, 832, 1);

  const torso = ctx.createLinearGradient(0, 390, 0, 650);
  torso.addColorStop(0, "#2f8cff");
  torso.addColorStop(1, "#123f95");
  ctx.fillStyle = torso;
  ctx.strokeStyle = "#061b45";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(400, 430);
  ctx.bezierCurveTo(452, 378, 575, 378, 628, 430);
  ctx.lineTo(690, 630);
  ctx.bezierCurveTo(612, 692, 416, 692, 336, 630);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const vest = ctx.createLinearGradient(0, 420, 0, 660);
  vest.addColorStop(0, "#ffe36d");
  vest.addColorStop(0.55, "#ffb629");
  vest.addColorStop(1, "#f47d20");
  ctx.fillStyle = vest;
  ctx.strokeStyle = "#8c4208";
  ctx.lineWidth = 10;
  roundedRect(ctx, 410, 438, 205, 222, 42);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(512, 452);
  ctx.lineTo(512, 650);
  ctx.stroke();

  drawArm(ctx, 395, 468, 262, 586, -1);
  drawArm(ctx, 630, 468, 762, 586, 1);

  const skin = ctx.createLinearGradient(0, 210, 0, 400);
  skin.addColorStop(0, "#f0bc86");
  skin.addColorStop(1, "#c97748");
  ctx.fillStyle = skin;
  ctx.strokeStyle = "#7f3f28";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.ellipse(512, 312, 100, 118, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const hair = ctx.createLinearGradient(0, 178, 0, 300);
  hair.addColorStop(0, "#3a2417");
  hair.addColorStop(1, "#140b07");
  ctx.fillStyle = hair;
  ctx.beginPath();
  ctx.moveTo(410, 284);
  ctx.bezierCurveTo(410, 176, 472, 136, 548, 162);
  ctx.bezierCurveTo(622, 188, 622, 260, 596, 294);
  ctx.bezierCurveTo(560, 250, 486, 242, 410, 284);
  ctx.fill();

  ctx.fillStyle = "#101820";
  ctx.beginPath();
  ctx.ellipse(476, 318, 12, 17, 0, 0, Math.PI * 2);
  ctx.ellipse(548, 318, 12, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#7a3827";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(512, 350, 42, 0.18 * Math.PI, 0.82 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 142, 132, 0.4)";
  ctx.beginPath();
  ctx.ellipse(442, 350, 28, 15, -0.1, 0, Math.PI * 2);
  ctx.ellipse(584, 350, 28, 15, 0.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(426, 236);
  ctx.bezierCurveTo(470, 176, 560, 174, 596, 235);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.9, 2.9, 1);
  sprite.userData.texture = texture;
  return sprite;
}

function drawOar(ctx, x1, y1, x2, y2, side) {
  ctx.strokeStyle = "#dca96a";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  const blade = ctx.createLinearGradient(0, y2 - 40, 0, y2 + 60);
  blade.addColorStop(0, "#f6d39b");
  blade.addColorStop(1, "#b56e34");
  ctx.fillStyle = blade;
  ctx.strokeStyle = "#6a3a1e";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.ellipse(x2 + side * 6, y2 + 24, 38, 78, side * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawArm(ctx, sx, sy, hx, hy, side) {
  ctx.strokeStyle = "#1d5ab8";
  ctx.lineWidth = 42;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.bezierCurveTo(sx + side * 12, sy + 60, hx - side * 40, hy - 56, hx, hy);
  ctx.stroke();
  ctx.strokeStyle = "#d9905e";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(sx + side * 34, sy + 68);
  ctx.bezierCurveTo(sx + side * 68, sy + 104, hx - side * 36, hy - 34, hx, hy);
  ctx.stroke();
  ctx.fillStyle = "#e1a06d";
  ctx.strokeStyle = "#7f3f28";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.ellipse(hx, hy, 30, 24, side * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
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
  updateRowingRig(time);

  const camBack = window.innerWidth < 720 ? 8.2 : 9.5;
  const camHeight = window.innerWidth < 720 ? 5.4 : 6.5;
  camera.position.lerp(new THREE.Vector3(p.x - tangent.x * camBack + normal.x * sideOffset * 0.35, camHeight, p.z - tangent.z * camBack + normal.z * sideOffset * 0.35), 0.075);
  camera.lookAt(p.x + normal.x * sideOffset * 0.35, 1.16, p.z + tangent.z * 1.2);

  if (river?.material) {
    river.material.emissiveIntensity = 0.6 + Math.sin(time * 1.8) * 0.12;
  }
}

function updateRowingRig(time) {
  const rowPower = Math.min(1, Math.abs(state.rowVelocity) * 20 + Math.abs(state.forwardInput) * 0.4);
  const stroke = Math.sin(time * (4.4 + rowPower * 3.2));
  boatRig.oars?.forEach(({ group, side }) => {
    group.rotation.x = 0.16 + stroke * rowPower * 0.2;
    group.rotation.y = side * (0.1 + stroke * rowPower * 0.1);
    group.rotation.z = side * (0.42 + stroke * rowPower * 0.36);
    group.position.y = 0.86 + Math.cos(time * 6.2) * rowPower * 0.025;
  });
  boatRig.arms?.forEach(({ group, side }) => {
    group.rotation.z = side * (-0.58 + stroke * rowPower * 0.32);
    group.rotation.x = -0.28 + Math.cos(time * 4.8) * rowPower * 0.16;
  });
  if (boy) {
    boy.rotation.x = -0.05 + stroke * rowPower * 0.05;
    boy.position.y = 0.2 + Math.cos(time * 5.4) * rowPower * 0.012;
  }
  if (comicRider) {
    comicRider.position.y = 1.12 + Math.cos(time * 5.4) * rowPower * 0.018;
    comicRider.rotation.z = stroke * rowPower * 0.035;
    comicRider.scale.set(2.9 + Math.abs(stroke) * rowPower * 0.035, 2.9, 1);
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
