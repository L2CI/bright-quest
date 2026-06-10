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
  { x: -9, z: 18 },
  { x: -5, z: 12 },
  { x: 4, z: 7 },
  { x: 8, z: 0 },
  { x: -3, z: -7 },
  { x: -8, z: -14 },
  { x: 0, z: -22 }
];

const isFastQa = new URLSearchParams(window.location.search).get("qa") === "fast";
const gateProgress = isFastQa ? [0.035, 0.07, 0.105, 0.14, 0.175] : [0.17, 0.32, 0.48, 0.64, 0.8];

const state = {
  progress: 0,
  speed: isFastQa ? 0.18 : 0.032,
  steer: 0,
  questionIndex: 0,
  mode: "rowing",
  sound: true,
  lastTime: performance.now(),
  finalOpened: false,
  gateOpening: 0,
  wrongPulse: 0
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
  renderer.setClearColor(0x071523);

  const ambient = new THREE.HemisphereLight(0x8fdfff, 0x090b13, 1.8);
  scene.add(ambient);

  const moon = new THREE.DirectionalLight(0xbbeeff, 1.5);
  moon.position.set(-6, 9, 7);
  moon.castShadow = true;
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
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x172234, roughness: 0.95, metalness: 0.05 });
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x263a4d, roughness: 0.92 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(34, 54), new THREE.MeshStandardMaterial({ color: 0x0b1421, roughness: 1 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.18;
  floor.receiveShadow = true;
  scene.add(floor);

  for (let i = 0; i < 28; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const z = 20 - i * 1.7;
    const h = 3.6 + Math.sin(i * 1.9) * 0.8 + Math.random() * 1.4;
    const rock = new THREE.Mesh(new THREE.ConeGeometry(1.5 + Math.random() * 1.2, h, 7), rockMaterial);
    rock.position.set(side * (10.8 + Math.random() * 3), h * 0.5 - 0.2, z + Math.random() * 1.4);
    rock.rotation.y = Math.random() * Math.PI;
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
  }

  const archGeometry = new THREE.TorusGeometry(13.5, 0.42, 8, 42, Math.PI);
  for (let i = 0; i < 9; i += 1) {
    const arch = new THREE.Mesh(archGeometry, wallMaterial);
    arch.position.set(0, 1.2, 18 - i * 5.2);
    arch.rotation.set(Math.PI / 2, 0, Math.PI);
    arch.scale.y = 0.7 + Math.sin(i) * 0.08;
    arch.castShadow = true;
    scene.add(arch);
  }

  for (let i = 0; i < 16; i += 1) {
    const light = new THREE.PointLight(i % 2 ? 0xffb45c : 0x45d9ff, 1.2, 8, 2);
    light.position.set((i % 2 ? -1 : 1) * (7 + Math.random() * 2), 2.2 + Math.random(), 18 - i * 2.8);
    scene.add(light);
    caveLights.push(light);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 12, 12),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffb45c : 0x45d9ff })
    );
    glow.position.copy(light.position);
    scene.add(glow);
  }
}

function makeRiver() {
  const shape = new THREE.Shape();
  const left = [];
  const right = [];
  for (let i = 0; i <= 80; i += 1) {
    const t = i / 80;
    const p = samplePath(t);
    const n = sampleNormal(t);
    left.push(new THREE.Vector2(p.x + n.x * 3.2, -p.z - n.z * 3.2));
    right.push(new THREE.Vector2(p.x - n.x * 3.2, -p.z + n.z * 3.2));
  }
  shape.moveTo(left[0].x, left[0].y);
  left.forEach((p) => shape.lineTo(p.x, p.y));
  right.reverse().forEach((p) => shape.lineTo(p.x, p.y));
  shape.closePath();

  river = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshStandardMaterial({ color: 0x0b83a5, roughness: 0.28, metalness: 0.18, emissive: 0x052c42 })
  );
  river.rotation.x = -Math.PI / 2;
  river.position.y = 0;
  river.receiveShadow = true;
  scene.add(river);

  for (let i = 0; i < 42; i += 1) {
    const t = i / 42;
    const p = samplePath(t);
    const ripple = new THREE.Mesh(
      new THREE.TorusGeometry(0.58 + Math.random() * 0.4, 0.018, 6, 28),
      new THREE.MeshBasicMaterial({ color: 0x99f6ff, transparent: true, opacity: 0.34 })
    );
    ripple.rotation.x = Math.PI / 2;
    ripple.position.set(p.x + (Math.random() - 0.5) * 4.5, 0.035, p.z + (Math.random() - 0.5) * 1.8);
    ripple.scale.x = 1.5;
    scene.add(ripple);
  }
}

function makeBoat() {
  boat = new THREE.Group();

  const hull = new THREE.Mesh(
    new THREE.BoxGeometry(1.75, 0.5, 2.7),
    new THREE.MeshStandardMaterial({ color: 0x8b4b2a, roughness: 0.72 })
  );
  hull.castShadow = true;
  hull.position.y = 0.34;
  boat.add(hull);

  const bow = new THREE.Mesh(
    new THREE.ConeGeometry(0.88, 1.1, 4),
    new THREE.MeshStandardMaterial({ color: 0xb66a35, roughness: 0.7 })
  );
  bow.rotation.y = Math.PI / 4;
  bow.rotation.x = Math.PI / 2;
  bow.position.set(0, 0.35, -1.65);
  bow.castShadow = true;
  boat.add(bow);

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
  boy.add(head, cap, body);
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
  const metal = new THREE.MeshStandardMaterial({ color: 0x596577, roughness: 0.5, metalness: 0.75 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xffd15c, emissive: 0x8a4f08, roughness: 0.32 });
  gateProgress.forEach((t, index) => {
    const p = samplePath(t);
    const n = sampleNormal(t);
    const group = new THREE.Group();
    group.userData.progress = t;
    group.userData.index = index;
    group.position.set(p.x, 0, p.z);
    group.rotation.y = Math.atan2(n.x, n.z);

    const top = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.38, 0.38), metal);
    top.position.y = 2.72;
    top.castShadow = true;
    group.add(top);

    [-2.8, 2.8].forEach((x) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.5, 0.42), metal);
      post.position.set(x, 1.35, 0);
      post.castShadow = true;
      group.add(post);
    });

    for (let i = -2; i <= 2; i += 1) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.18), metal);
      bar.position.set(i * 0.85, 1.4, 0);
      bar.castShadow = true;
      group.add(bar);
    }

    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.36), glow);
    gem.position.y = 3.15;
    gem.castShadow = true;
    group.add(gem);

    scene.add(group);
    gateMeshes.push(group);
  });
}

function makeTreasureVault() {
  const p = samplePath(0.93);
  chest = new THREE.Group();
  chest.position.set(p.x, 0.34, p.z);
  chest.rotation.y = -0.3;
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
  const setSteer = (value) => {
    state.steer = value;
  };

  el.leftButton.addEventListener("pointerdown", () => setSteer(-1));
  el.rightButton.addEventListener("pointerdown", () => setSteer(1));
  window.addEventListener("pointerup", () => setSteer(0));
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setSteer(-1);
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setSteer(1);
  });
  window.addEventListener("keyup", (event) => {
    if (["ArrowLeft", "ArrowRight", "a", "d"].includes(event.key)) setSteer(0);
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
      state.progress += dt * state.speed;
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
  const sideOffset = state.steer * 0.72;
  boat.position.set(p.x + normal.x * sideOffset, 0.18 + Math.sin(time * 3.1) * 0.05, p.z + normal.z * sideOffset);
  boat.rotation.y = Math.atan2(tangent.x, tangent.z) + state.steer * -0.12;
  boat.rotation.z = state.steer * -0.08 + Math.sin(time * 2.8) * 0.025;
  boat.children.forEach((child) => {
    if (child.name && child.name.startsWith("oar")) child.rotation.x = Math.sin(time * 5.5) * 0.28;
  });

  const camBack = 8.4;
  const camHeight = window.innerWidth < 720 ? 5.2 : 6.2;
  camera.position.lerp(new THREE.Vector3(p.x - tangent.x * camBack, camHeight, p.z - tangent.z * camBack + 1.2), 0.075);
  camera.lookAt(p.x, 1.1, p.z - 3);

  if (river?.material) {
    river.material.emissiveIntensity = 0.6 + Math.sin(time * 1.8) * 0.12;
  }
}

function showQuestion() {
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
  if (!state.sound || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(line);
  utterance.pitch = 0.55;
  utterance.rate = 0.78;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => /male|daniel|david|mark|google uk english male/i.test(voice.name)) || voices[0] || null;
  window.speechSynthesis.speak(utterance);
}

function playTone(freq, duration, type = "sine", delay = 0) {
  if (!state.sound) return;
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
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
