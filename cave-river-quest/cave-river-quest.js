const BUILD_ID = "boat-approaches-gate-651060d";

const assetSources = {
  background: "./assets/generated/painted-cave-river.png",
  boatStrip: "./assets/generated/painted-rowboat-rowing-frames-alpha.png",
  boat: "./assets/generated/painted-boat-boy-alpha.png",
  gate: "./assets/generated/painted-gate-alpha.png"
};

const questions = [
  {
    type: "Maths gate",
    title: "Moonstone Gate",
    text: "The boat has 4 oars on each side. How many oars are there altogether?",
    answers: ["6", "8", "10", "12"],
    correct: "8"
  },
  {
    type: "Logic gate",
    title: "Echo Gate",
    text: "I am an odd number. Take away one letter and I become even. What am I?",
    answers: ["Seven", "Nine", "Eleven", "Three"],
    correct: "Seven"
  },
  {
    type: "English gate",
    title: "Lantern Gate",
    text: "Choose the best word: The cave river was dark, so Aarin rowed very ____.",
    answers: ["careful", "carefully", "care", "caring"],
    correct: "carefully"
  },
  {
    type: "Pattern gate",
    title: "Crystal Gate",
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

const isFastQa = new URLSearchParams(window.location.search).get("qa") === "fast";
const gateProgress = isFastQa ? [0.05, 0.1, 0.15, 0.2, 0.25] : [0.16, 0.32, 0.49, 0.66, 0.82];

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
  forward: document.querySelector("#forwardButton")
};

const ctx = el.canvas.getContext("2d", { alpha: false });
const art = {};
const state = {
  width: 1,
  height: 1,
  dpr: 1,
  progress: 0,
  velocity: 0,
  forwardInput: 0,
  lane: 0,
  questionIndex: 0,
  mode: "rowing",
  gateOpening: 0,
  sound: true,
  lastTime: 0,
  rowPulse: 0,
  boatApproach: 0,
  particles: [],
  wakes: [],
  gateSparkles: [],
  finalStarted: false
};

let audioContext;
let masterGain;
let waterGain;
let waterNoise;

window.__caveQuestBoot = { ok: false, stage: "loading", build: BUILD_ID };

function resize() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = Math.max(1, window.innerWidth);
  state.height = Math.max(1, window.innerHeight);
  el.canvas.width = Math.floor(state.width * state.dpr);
  el.canvas.height = Math.floor(state.height * state.dpr);
  el.canvas.style.width = `${state.width}px`;
  el.canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

async function boot() {
  resize();
  await loadArtAssets();
  bindInput();
  seedParticles();
  el.gateCount.textContent = "0/5";
  el.hint.textContent = "Hold Row to glide through the enchanted river. Ease up to each glowing gate.";
  window.__caveQuestBoot = { ok: true, stage: "ready", build: BUILD_ID, renderer: "2.5d-canvas", art: Object.keys(art).filter((key) => art[key]?.complete).length };
  requestAnimationFrame(loop);
}

async function loadArtAssets() {
  const entries = await Promise.all(Object.entries(assetSources).map(async ([key, src]) => {
    try {
      return [key, await loadImage(src)];
    } catch (error) {
      console.warn(`Art asset failed: ${key}`, error);
      return [key, null];
    }
  }));
  entries.forEach(([key, image]) => {
    art[key] = image;
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
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
    button.addEventListener("lostpointercapture", onUp);
    button.addEventListener("pointerleave", onUp);
  };

  hold(el.forward, () => { state.forwardInput = 1; }, () => { state.forwardInput = 0; });

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    primeAudio();
    if (event.key === "ArrowUp" || event.key === " " || event.key.toLowerCase() === "w") state.forwardInput = 1;
  });

  window.addEventListener("keyup", (event) => {
    if (["ArrowUp", " ", "w", "W"].includes(event.key)) state.forwardInput = 0;
  });

  el.soundButton.addEventListener("click", () => {
    state.sound = !state.sound;
    el.soundButton.textContent = state.sound ? "Sound on" : "Sound off";
    if (masterGain) masterGain.gain.value = state.sound ? 0.35 : 0;
    primeAudio();
  });

  el.claimButton.addEventListener("click", () => {
    primeAudio();
    el.finalePanel.classList.add("hidden");
    state.mode = "final";
    state.finalStarted = true;
    playVictoryVoice();
    el.guardianLine.textContent = "Autobot, you now have the Matrix of Leadership.";
    el.guardianPanel.classList.remove("hidden");
    burstParticles(state.width * 0.5, state.height * 0.43, 120);
  });

  window.addEventListener("resize", resize);
}

function loop(timeMs) {
  const time = timeMs / 1000;
  const dt = Math.min(0.033, Math.max(0.001, time - (state.lastTime || time)));
  state.lastTime = time;
  update(dt, time);
  draw(time);
  requestAnimationFrame(loop);
}

function update(dt, time) {
  if (state.mode === "rowing") updateMovement(dt, time);
  if (state.mode === "gate-open") updateGateOpen(dt, time);
  if (state.mode === "final") {
    state.progress = lerp(state.progress, 0.94, 1 - Math.pow(0.2, dt));
  }
  state.rowPulse += dt * (2.5 + Math.abs(state.velocity) * 55);
  updateBoatApproach(dt);
  updateParticles(dt);
  updateWakes(dt);
  updateDebugHook();
}

function updateBoatApproach(dt) {
  const nextGate = gateProgress[state.questionIndex];
  let target = 0;
  if (state.mode === "gate-open") {
    target = 1;
  } else if (state.mode === "question") {
    target = 1;
  } else if (nextGate) {
    target = clamp(1 - (nextGate - state.progress) / 0.22, 0, 1);
  } else if (state.progress > 0.76) {
    target = clamp((state.progress - 0.76) / 0.16, 0, 1);
  }
  state.boatApproach = lerp(state.boatApproach, target, 1 - Math.pow(0.03, dt));
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
      questionIndex: state.questionIndex,
      rowPulse: Number(state.rowPulse.toFixed(5)),
      boatApproach: Number(state.boatApproach.toFixed(5)),
      boatArt: art.boatStrip ? "strip" : art.boat ? "static" : "procedural",
      wakes: state.wakes.length
    }),
    setRowing: (active) => {
      state.forwardInput = active ? 1 : 0;
    },
    openCurrentGateForQa: () => {
      if (!isFastQa && !new URLSearchParams(window.location.search).has("qa")) return false;
      state.mode = "gate-open";
      state.gateOpening = 0;
      state.velocity = 0;
      state.progress = (gateProgress[state.questionIndex] || state.progress) - 0.018;
      return true;
    }
  };
}

function updateMovement(dt, time) {
  const targetVelocity = state.forwardInput * (isFastQa ? 0.19 : 0.05);
  state.velocity = lerp(state.velocity, targetVelocity, 1 - Math.pow(0.002, dt));
  if (Math.abs(state.forwardInput) < 0.01) {
    state.velocity = lerp(state.velocity, 0, 1 - Math.pow(0.025, dt));
  }
  state.progress = clamp(state.progress + state.velocity * dt, 0, 0.94);
  state.lane = Math.sin((state.progress * 4.8 + 0.2) * Math.PI) * 0.18;

  if (Math.abs(state.velocity) > 0.014 && Math.floor(time * 4) !== Math.floor((time - dt) * 4)) {
    playSwish(Math.min(1, Math.abs(state.velocity) * 18));
    addWake();
  }

  const gate = gateProgress[state.questionIndex];
  if (gate && state.progress >= gate - 0.018) {
    state.progress = gate - 0.018;
    state.velocity = 0;
    showQuestion(state.questionIndex);
  }

  if (state.questionIndex >= gateProgress.length && state.progress > 0.9 && !state.finalStarted) {
    state.mode = "treasure";
    state.velocity = 0;
    el.finalePanel.classList.remove("hidden");
    el.hint.textContent = "The treasure chamber is open. Tap the chest to claim the relic.";
    playChime();
  }
}

function updateGateOpen(dt, time) {
  const gate = gateProgress[state.questionIndex] || state.progress;
  const previousOpening = state.gateOpening;
  state.gateOpening += dt * 1.65;
  const openingEase = easeOutCubic(clamp(state.gateOpening, 0, 1));
  const start = gate - 0.018;
  const nextGate = gateProgress[state.questionIndex + 1];
  const driftDistance = nextGate ? Math.min(0.034, (nextGate - gate) * 0.35) : 0.034;
  const end = gate + driftDistance;
  state.velocity = lerp(state.velocity, 0.034, 1 - Math.pow(0.01, dt));
  state.progress = lerp(start, end, openingEase);
  state.lane = Math.sin((state.progress * 4.8 + 0.2) * Math.PI) * 0.18;
  if (Math.floor(time * 5) !== Math.floor((time - dt) * 5) && previousOpening < 0.88) {
    playSwish(0.45);
    addWake();
  }
  if (state.gateOpening >= 1) {
    state.mode = "rowing";
    state.gateOpening = 0;
    state.questionIndex += 1;
    el.gateCount.textContent = `${state.questionIndex}/5`;
    state.progress = end;
    state.velocity = 0.018;
    el.hint.textContent = state.questionIndex >= gateProgress.length
      ? "The vault glows ahead. Row into the treasure chamber."
      : "Gate open. Follow the lanterns to the next challenge.";
  }
}

function showQuestion(index) {
  state.mode = "question";
  const question = questions[index];
  el.questionType.textContent = question.type;
  el.questionTitle.textContent = question.title;
  el.questionText.textContent = question.text;
  el.feedback.textContent = "";
  el.answerGrid.replaceChildren();
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => answerQuestion(answer, question.correct));
    el.answerGrid.append(button);
  });
  el.questionPanel.classList.remove("hidden");
  el.hint.textContent = "A glowing gate blocks the river. Choose the answer to open it.";
  playGateHum();
}

function answerQuestion(answer, correct) {
  primeAudio();
  if (answer !== correct) {
    el.feedback.textContent = "Almost. Try one more time.";
    playWrong();
    return;
  }
  el.feedback.textContent = "Correct. The gate opens.";
  playGateOpen();
  burstParticles(state.width * 0.5, state.height * 0.45, 50);
  setTimeout(() => {
    el.questionPanel.classList.add("hidden");
    state.mode = "gate-open";
    state.gateOpening = 0;
  }, 500);
}

function draw(time) {
  const w = state.width;
  const h = state.height;
  ctx.clearRect(0, 0, w, h);
  if (art.background) {
    drawCoverImage(art.background, 0, 0, w, h);
    drawPaintedSceneMotion(w, h, time);
  } else {
    drawBackdrop(w, h, time);
    drawLightShafts(w, h, time);
    drawCaveLayers(w, h, time);
    drawRiver(w, h, time);
  }
  drawDistantObjects(w, h, time);
  drawBoat(w, h, time);
  if (!art.background) drawForegroundRocks(w, h, time);
  drawParticles();
  drawVignette(w, h);
}

function drawCoverImage(image, x, y, width, height) {
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;
  if (imageRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawPaintedSceneMotion(w, h, time) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const riverGlow = ctx.createRadialGradient(w * 0.5, h * 0.62, 20, w * 0.5, h * 0.7, h * 0.55);
  riverGlow.addColorStop(0, "rgba(88, 255, 236, 0.18)");
  riverGlow.addColorStop(0.55, "rgba(40, 181, 219, 0.08)");
  riverGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = riverGlow;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 38; i += 1) {
    const t = (i / 38 + time * 0.055 + state.progress * 1.7) % 1;
    const y = lerp(h * 0.28, h * 1.05, Math.pow(t, 1.18));
    const width = lerp(w * 0.06, w * 0.58, Math.pow(t, 1.4));
    const x = w * 0.5 + Math.sin(t * Math.PI * 2.6 + state.progress) * w * 0.1;
    ctx.strokeStyle = `rgba(215, 255, 255, ${lerp(0.04, 0.22, t)})`;
    ctx.lineWidth = lerp(1, 4, t);
    ctx.beginPath();
    ctx.moveTo(x - width * 0.5, y);
    ctx.bezierCurveTo(x - width * 0.15, y + 10, x + width * 0.15, y - 10, x + width * 0.5, y);
    ctx.stroke();
  }
  ctx.restore();
  drawWaterWakes(w, h, time);
}

function drawBackdrop(w, h, time) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#3b7180");
  sky.addColorStop(0.22, "#183f54");
  sky.addColorStop(0.68, "#071928");
  sky.addColorStop(1, "#020811");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  drawPaintedCaveBase(w, h, time);

  const opening = ctx.createRadialGradient(w * 0.52, h * 0.05, 10, w * 0.52, h * 0.05, h * 0.55);
  opening.addColorStop(0, "rgba(222, 249, 255, 0.62)");
  opening.addColorStop(0.22, "rgba(116, 223, 255, 0.25)");
  opening.addColorStop(0.48, "rgba(255, 194, 92, 0.08)");
  opening.addColorStop(1, "rgba(4, 18, 28, 0)");
  ctx.fillStyle = opening;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 26; i += 1) {
    const x = (i * 173 + Math.sin(time * 0.2 + i) * 12) % w;
    const y = h * (0.14 + ((i * 37) % 42) / 100);
    ctx.fillStyle = i % 3 ? "rgba(91, 231, 255, 0.18)" : "rgba(255, 194, 92, 0.16)";
    ctx.beginPath();
    ctx.arc(x, y, 1.4 + (i % 4), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPaintedCaveBase(w, h, time) {
  const chamberGlow = ctx.createRadialGradient(w * 0.5, h * 0.18, 20, w * 0.5, h * 0.42, h * 0.72);
  chamberGlow.addColorStop(0, "rgba(137, 235, 255, 0.24)");
  chamberGlow.addColorStop(0.48, "rgba(23, 83, 105, 0.2)");
  chamberGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = chamberGlow;
  ctx.fillRect(0, 0, w, h);

  const clusters = [
    [0.05, 0.34, 0.24, 0.42],
    [0.18, 0.18, 0.2, 0.34],
    [0.78, 0.2, 0.24, 0.38],
    [0.9, 0.44, 0.18, 0.36],
    [0.5, 0.12, 0.22, 0.26]
  ];
  clusters.forEach(([cx, cy, sx, sy], index) => {
    const g = ctx.createRadialGradient(w * cx, h * cy, 10, w * cx, h * cy, w * sx);
    g.addColorStop(0, index % 2 ? "rgba(72, 128, 141, 0.34)" : "rgba(87, 149, 155, 0.28)");
    g.addColorStop(0.72, "rgba(10, 29, 40, 0.36)");
    g.addColorStop(1, "rgba(2, 8, 14, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(w * cx, h * cy, w * sx, h * sy, Math.sin(index) * 0.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#e0fbff";
  ctx.lineWidth = 2;
  for (let i = 0; i < 18; i += 1) {
    const y = h * (0.12 + i * 0.036);
    ctx.beginPath();
    ctx.moveTo(w * 0.08, y + Math.sin(i) * 8);
    ctx.bezierCurveTo(w * 0.28, y + 22, w * 0.58, y - 18, w * 0.92, y + Math.cos(i) * 10);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLightShafts(w, h, time) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 5; i += 1) {
    const x = w * (0.28 + i * 0.12) + Math.sin(time * 0.25 + i) * 16;
    const width = w * (0.08 + i * 0.01);
    const alpha = 0.08 + Math.sin(time * 0.5 + i) * 0.018;
    const shaft = ctx.createLinearGradient(x, 0, x + width * 0.35, h * 0.82);
    shaft.addColorStop(0, `rgba(196, 246, 255, ${alpha})`);
    shaft.addColorStop(0.46, `rgba(93, 210, 236, ${alpha * 0.36})`);
    shaft.addColorStop(1, "rgba(93, 210, 236, 0)");
    ctx.fillStyle = shaft;
    ctx.beginPath();
    ctx.moveTo(x - width * 0.45, 0);
    ctx.lineTo(x + width * 0.55, 0);
    ctx.lineTo(x + width * 1.55, h * 0.88);
    ctx.lineTo(x - width * 0.75, h * 0.88);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawCaveLayers(w, h, time) {
  drawWallLayer(w, h, 0.13, "#123247", "#05131d", time, 0.14);
  drawWallLayer(w, h, 0.22, "#1c4a5e", "#081b27", time, 0.28);
  drawWallLayer(w, h, 0.33, "#386f78", "#102b35", time, 0.42);
  drawStalactites(w, h, time);
  drawLanterns(w, h, time);
}

function drawWallLayer(w, h, horizon, light, dark, time, offset) {
  const topY = h * horizon;
  const floorY = h * 0.83;
  [["left", -1], ["right", 1]].forEach(([, side]) => {
    const g = ctx.createLinearGradient(0, topY, 0, floorY);
    g.addColorStop(0, light);
    g.addColorStop(1, dark);
    ctx.fillStyle = g;
    ctx.beginPath();
    if (side < 0) {
      ctx.moveTo(0, topY - 80);
      for (let i = 0; i <= 12; i += 1) {
        const t = i / 12;
        const x = w * (0.16 + t * (0.18 + offset * 0.08)) + Math.sin(i * 1.9 + time * 0.12) * 10;
        const y = lerp(topY, floorY, t);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(0, h);
      ctx.closePath();
    } else {
      ctx.moveTo(w, topY - 80);
      for (let i = 0; i <= 12; i += 1) {
        const t = i / 12;
        const x = w * (0.84 - t * (0.18 + offset * 0.08)) + Math.sin(i * 1.7 + time * 0.1) * 10;
        const y = lerp(topY, floorY, t);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
    }
    ctx.fill();
    drawRockFacets(w, topY, floorY, side, offset);
    ctx.strokeStyle = "rgba(143, 216, 230, 0.08)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i += 1) {
      const y = topY + i * (h * 0.055);
      ctx.beginPath();
      ctx.moveTo(side < 0 ? 0 : w, y);
      ctx.bezierCurveTo(w * (side < 0 ? 0.08 : 0.92), y + 18, w * (side < 0 ? 0.2 : 0.8), y - 10, w * (side < 0 ? 0.34 : 0.66), y + 35);
      ctx.stroke();
    }
  });
}

function drawRockFacets(w, topY, floorY, side, offset) {
  ctx.save();
  ctx.globalAlpha = 0.26;
  for (let i = 0; i < 16; i += 1) {
    const t = i / 16;
    const anchor = side < 0
      ? w * (0.03 + t * (0.28 + offset * 0.1))
      : w * (0.97 - t * (0.28 + offset * 0.1));
    const y = lerp(topY + 20, floorY - 20, (i * 7 % 16) / 15);
    const size = lerp(18, 58, t);
    ctx.fillStyle = i % 2 ? "rgba(203, 246, 255, 0.13)" : "rgba(0, 0, 0, 0.22)";
    ctx.beginPath();
    ctx.moveTo(anchor, y - size * 0.6);
    ctx.lineTo(anchor + side * size * 0.85, y - size * 0.08);
    ctx.lineTo(anchor + side * size * 0.42, y + size * 0.72);
    ctx.lineTo(anchor - side * size * 0.32, y + size * 0.2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawStalactites(w, h, time) {
  const ceiling = ctx.createLinearGradient(0, 0, 0, h * 0.22);
  ceiling.addColorStop(0, "#06131c");
  ceiling.addColorStop(0.48, "#102b38");
  ceiling.addColorStop(1, "rgba(16, 43, 56, 0)");
  ctx.fillStyle = ceiling;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let i = 0; i <= 18; i += 1) {
    const x = (i / 18) * w;
    const y = h * (0.02 + 0.035 * Math.sin(i * 1.7) + 0.018 * Math.sin(time * 0.15 + i));
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, 0);
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < 13; i += 1) {
    const x = (i / 12) * w + Math.sin(i * 2.1) * 24;
    const len = h * (0.065 + ((i * 13) % 10) / 130);
    const width = 22 + ((i * 17) % 34);
    drawLimestoneFormation(x, 0, width, len, i, time);
  }

  for (let i = 0; i < 9; i += 1) {
    const x = w * (0.08 + i * 0.105) + Math.sin(i * 3.4) * 18;
    const y = h * (0.035 + (i % 3) * 0.018);
    const glow = i % 2 ? "#67eaff" : "#ffd76f";
    ctx.fillStyle = glow;
    ctx.globalAlpha = 0.28;
    ctx.beginPath();
    ctx.ellipse(x, y + 18, 6 + (i % 3) * 3, 18 + (i % 4) * 5, 0.05 * i, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function drawLimestoneFormation(x, y, width, height, index, time) {
  const gradient = ctx.createLinearGradient(x - width, y, x + width * 0.4, y + height);
  gradient.addColorStop(0, "#07151f");
  gradient.addColorStop(0.46, "#173847");
  gradient.addColorStop(1, "#06111a");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x - width * 0.9, y);
  ctx.bezierCurveTo(x - width * 0.72, y + height * 0.12, x - width * 0.46, y + height * 0.18, x - width * 0.36, y + height * 0.34);
  ctx.bezierCurveTo(x - width * 0.18, y + height * 0.58, x - width * 0.18, y + height * 0.76, x + Math.sin(time * 0.2 + index) * 2, y + height);
  ctx.bezierCurveTo(x + width * 0.12, y + height * 0.72, x + width * 0.42, y + height * 0.48, x + width * 0.55, y + height * 0.22);
  ctx.bezierCurveTo(x + width * 0.68, y + height * 0.08, x + width * 0.84, y + height * 0.03, x + width * 0.95, y);
  ctx.closePath();
  ctx.fill();

  const shine = ctx.createLinearGradient(x - width * 0.2, y, x + width * 0.08, y + height);
  shine.addColorStop(0, "rgba(187, 240, 250, 0.2)");
  shine.addColorStop(0.6, "rgba(187, 240, 250, 0.04)");
  shine.addColorStop(1, "rgba(187, 240, 250, 0)");
  ctx.fillStyle = shine;
  ctx.beginPath();
  ctx.moveTo(x - width * 0.16, y + height * 0.08);
  ctx.bezierCurveTo(x - width * 0.08, y + height * 0.32, x - width * 0.1, y + height * 0.62, x, y + height * 0.86);
  ctx.bezierCurveTo(x + width * 0.05, y + height * 0.58, x + width * 0.18, y + height * 0.26, x + width * 0.28, y + height * 0.08);
  ctx.closePath();
  ctx.fill();
}

function drawLanterns(w, h, time) {
  for (let i = 0; i < 12; i += 1) {
    const side = i % 2 ? -1 : 1;
    const depth = i / 11;
    const y = lerp(h * 0.28, h * 0.74, depth);
    const x = w * 0.5 + side * lerp(w * 0.1, w * 0.36, depth) + Math.sin(i * 4) * 12;
    const size = lerp(9, 28, depth);
    const pulse = 0.84 + Math.sin(time * 2.4 + i) * 0.16;
    const glow = ctx.createRadialGradient(x, y, 2, x, y, size * 4.6);
    glow.addColorStop(0, `rgba(255, 219, 116, ${0.48 * pulse})`);
    glow.addColorStop(0.36, `rgba(255, 139, 45, ${0.22 * pulse})`);
    glow.addColorStop(1, "rgba(255, 139, 45, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - size * 5, y - size * 5, size * 10, size * 10);
    ctx.strokeStyle = "#1c2b34";
    ctx.lineWidth = Math.max(2, size * 0.15);
    ctx.beginPath();
    ctx.moveTo(x, y - size * 1.9);
    ctx.lineTo(x, y + size * 0.4);
    ctx.stroke();
    ctx.fillStyle = "#ffd36b";
    roundedRect(x - size * 0.55, y - size * 0.5, size * 1.1, size * 1.2, size * 0.25);
    ctx.fill();
  }
}

function drawRiver(w, h, time) {
  const horizonY = h * 0.16;
  const bottomY = h * 1.12;
  const left = [];
  const right = [];
  for (let i = 0; i <= 36; i += 1) {
    const t = i / 36;
    const y = lerp(horizonY, bottomY, t);
    const center = w * 0.5 + Math.sin((t + state.progress * 0.85) * Math.PI * 2.2) * w * lerp(0.02, 0.15, t) + state.lane * w * 0.08 * t;
    const half = lerp(w * 0.035, w * 0.5, Math.pow(t, 1.45));
    left.push([center - half, y]);
    right.push([center + half, y]);
  }

  const bankGradient = ctx.createLinearGradient(0, horizonY, 0, h);
  bankGradient.addColorStop(0, "#4c7883");
  bankGradient.addColorStop(0.45, "#274957");
  bankGradient.addColorStop(1, "#0b1b27");
  ctx.fillStyle = bankGradient;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  left.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w, horizonY);
  right.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  const water = ctx.createLinearGradient(0, horizonY, 0, h);
  water.addColorStop(0, "#12a2b8");
  water.addColorStop(0.24, "#1fd0dc");
  water.addColorStop(0.58, "#0b84ac");
  water.addColorStop(1, "#04305b");
  ctx.fillStyle = water;
  ctx.beginPath();
  ctx.moveTo(left[0][0], left[0][1]);
  left.forEach(([x, y]) => ctx.lineTo(x, y));
  right.slice().reverse().forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.clip();
  const centerGlow = ctx.createRadialGradient(w * 0.5, h * 0.58, 10, w * 0.5, h * 0.7, h * 0.74);
  centerGlow.addColorStop(0, "rgba(154, 255, 247, 0.22)");
  centerGlow.addColorStop(0.5, "rgba(44, 178, 218, 0.1)");
  centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, horizonY, w, h - horizonY);

  for (let i = 0; i < 42; i += 1) {
    const t = ((i / 42 + time * 0.06 + state.progress * 2.5) % 1);
    const y = lerp(horizonY, bottomY, Math.pow(t, 1.22));
    const alpha = lerp(0.08, 0.38, t);
    const width = lerp(w * 0.04, w * 0.68, Math.pow(t, 1.45));
    const x = w * 0.5 + Math.sin((t + state.progress) * Math.PI * 2.2) * w * 0.08 + state.lane * w * 0.06 * t;
    ctx.strokeStyle = `rgba(223, 255, 255, ${alpha})`;
    ctx.lineWidth = lerp(1, 4, t);
    ctx.beginPath();
    ctx.moveTo(x - width * 0.5, y);
    ctx.bezierCurveTo(x - width * 0.18, y + 8, x + width * 0.18, y - 8, x + width * 0.5, y);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 34; i += 1) {
    const t = ((i / 34 + time * 0.09 + state.progress * 3.1) % 1);
    const y = lerp(horizonY, bottomY, Math.pow(t, 1.12));
    const x = w * 0.5 + Math.sin((t * 2.8 + state.progress) * Math.PI) * w * 0.12 + state.lane * w * 0.08 * t;
    const len = lerp(w * 0.03, w * 0.22, t);
    ctx.strokeStyle = `rgba(255, 244, 184, ${lerp(0.05, 0.22, t)})`;
    ctx.lineWidth = lerp(1, 3, t);
    ctx.beginPath();
    ctx.moveTo(x - len, y);
    ctx.quadraticCurveTo(x, y + Math.sin(time + i) * 10, x + len, y + Math.cos(time + i) * 6);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();

  drawWaterWakes(w, h, time);

  ctx.strokeStyle = "rgba(226, 255, 255, 0.58)";
  ctx.lineWidth = 5;
  [left, right].forEach((edge) => {
    ctx.beginPath();
    edge.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(255, 219, 116, 0.2)";
  ctx.lineWidth = 2;
  [left, right].forEach((edge) => {
    ctx.beginPath();
    edge.forEach(([x, y], index) => {
      const wobble = Math.sin(index * 1.7 + time * 2) * 3;
      index ? ctx.lineTo(x, y + wobble) : ctx.moveTo(x, y + wobble);
    });
    ctx.stroke();
  });
}

function drawWaterWakes(w, h, time) {
  if (!state.wakes.length) return;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  state.wakes.forEach((wake) => {
    const alpha = wake.life * 0.42;
    const x = wake.x + Math.sin(time * 3 + wake.phase) * 8;
    const y = wake.y + wake.age * 18;
    ctx.strokeStyle = `rgba(219, 255, 255, ${alpha})`;
    ctx.lineWidth = 3 * wake.life;
    ctx.beginPath();
    ctx.ellipse(x, y, wake.radius * (1.5 - wake.life * 0.2), wake.radius * 0.34, wake.side * 0.22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 224, 137, ${alpha * 0.45})`;
    ctx.lineWidth = 1.5 * wake.life;
    ctx.beginPath();
    ctx.moveTo(x - wake.radius * 1.4, y + wake.radius * 0.2);
    ctx.quadraticCurveTo(x, y + Math.sin(time + wake.phase) * 6, x + wake.radius * 1.4, y + wake.radius * 0.12);
    ctx.stroke();
  });
  ctx.restore();
}

function drawDistantObjects(w, h, time) {
  gateProgress.forEach((gate, index) => {
    if (index !== state.questionIndex) return;
    const distance = gate - state.progress;
    if (distance < -0.06 || distance > 0.26) return;
    const t = 1 - clamp(distance / 0.26, 0, 1);
    drawGate(w, h, t, index, state.mode === "gate-open" && index === state.questionIndex ? state.gateOpening : 0, time);
  });

  if (state.progress > 0.76) {
    const t = clamp((state.progress - 0.76) / 0.18, 0, 1);
    drawTreasure(w, h, t, time);
  }
}

function drawGate(w, h, t, index, opening, time) {
  const settle = easeOutCubic(t);
  const y = h * 0.46 + Math.sin(index * 2.1) * h * 0.012;
  const scale = lerp(0.62, 0.72, settle);
  const x = w * 0.5 + Math.sin(gateProgress[index] * 8) * w * 0.018;
  if (art.gate) {
    ctx.save();
    ctx.translate(x, y);
    const spriteWidth = 260 * scale;
    const spriteHeight = spriteWidth * (art.gate.height / art.gate.width);
    const pulse = 1 + Math.sin(time * 3 + index) * 0.03;
    ctx.globalAlpha = 0.55 + settle * 0.45;
    ctx.filter = `drop-shadow(0 0 ${Math.round(18 * scale)}px rgba(91, 231, 255, 0.55))`;
    ctx.drawImage(art.gate, -spriteWidth * 0.5 * pulse, -spriteHeight * 0.48, spriteWidth * pulse, spriteHeight * pulse);
    ctx.filter = "none";
    if (opening > 0) {
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = `rgba(255, 226, 116, ${opening * 0.32})`;
      ctx.beginPath();
      ctx.ellipse(0, 12, spriteWidth * 0.34, spriteHeight * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const glow = ctx.createRadialGradient(0, 4, 18, 0, 4, 230);
  glow.addColorStop(0, opening ? "rgba(255, 230, 122, 0.68)" : "rgba(98, 232, 255, 0.5)");
  glow.addColorStop(0.34, opening ? "rgba(255, 151, 56, 0.24)" : "rgba(57, 142, 255, 0.2)");
  glow.addColorStop(1, "rgba(98, 232, 255, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(-260, -210, 520, 430);

  const stone = ctx.createLinearGradient(-150, -80, 150, 150);
  stone.addColorStop(0, "#b7c8c8");
  stone.addColorStop(0.38, "#5e7e8a");
  stone.addColorStop(1, "#2d4854");
  ctx.fillStyle = stone;
  roundedRect(-164, -42, 48, 178, 18);
  ctx.fill();
  roundedRect(116, -42, 48, 178, 18);
  ctx.fill();
  ctx.fillStyle = "rgba(218, 250, 255, 0.18)";
  roundedRect(-154, -28, 12, 148, 6);
  ctx.fill();
  roundedRect(128, -28, 12, 148, 6);
  ctx.fill();
  ctx.fillStyle = "#9fb8bd";
  roundedRect(-184, -58, 88, 34, 14);
  ctx.fill();
  roundedRect(96, -58, 88, 34, 14);
  ctx.fill();

  ctx.strokeStyle = "rgba(7, 21, 30, 0.38)";
  ctx.lineWidth = 3;
  [-146, 146].forEach((px) => {
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(px - 10, -8 + i * 34);
      ctx.lineTo(px + 10, -18 + i * 34);
      ctx.stroke();
    }
  });

  ctx.strokeStyle = "#ffd66d";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(0, 18, 148, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.strokeStyle = "#f3a943";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(0, 18, 127, Math.PI * 1.08, Math.PI * 1.92);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 18, 158, Math.PI * 1.11, Math.PI * 1.89);
  ctx.stroke();

  const curtainAlpha = Math.max(0, 0.75 - opening);
  const curtain = ctx.createLinearGradient(0, -104, 0, 120);
  curtain.addColorStop(0, `rgba(110, 242, 255, ${0.18 * curtainAlpha})`);
  curtain.addColorStop(0.5, `rgba(46, 143, 255, ${0.36 * curtainAlpha})`);
  curtain.addColorStop(1, `rgba(8, 42, 86, ${0.18 * curtainAlpha})`);
  ctx.fillStyle = curtain;
  roundedRect(-108, -78, 216, 198, 28);
  ctx.fill();
  ctx.strokeStyle = `rgba(214, 252, 255, ${0.56 * curtainAlpha})`;
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i += 1) {
    const yy = -32 + i * 34 + Math.sin(time * 2 + i) * 4;
    ctx.beginPath();
    ctx.moveTo(-82, yy);
    ctx.bezierCurveTo(-28, yy - 18, 28, yy + 18, 82, yy);
    ctx.stroke();
  }

  [-192, 192].forEach((px, sideIndex) => {
    const torchPulse = 0.78 + Math.sin(time * 4 + sideIndex) * 0.18;
    const torchGlow = ctx.createRadialGradient(px, 22, 4, px, 22, 80);
    torchGlow.addColorStop(0, `rgba(255, 226, 128, ${0.5 * torchPulse})`);
    torchGlow.addColorStop(0.34, `rgba(255, 129, 42, ${0.26 * torchPulse})`);
    torchGlow.addColorStop(1, "rgba(255, 129, 42, 0)");
    ctx.fillStyle = torchGlow;
    ctx.fillRect(px - 90, -68, 180, 180);
    ctx.fillStyle = "#263a43";
    roundedRect(px - 9, 16, 18, 70, 8);
    ctx.fill();
    ctx.fillStyle = "#ffcf67";
    ctx.beginPath();
    ctx.ellipse(px, 12, 14, 25, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#ffe083";
  ctx.beginPath();
  ctx.moveTo(0, -164);
  ctx.lineTo(32, -110);
  ctx.lineTo(0, -56);
  ctx.lineTo(-32, -110);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.beginPath();
  ctx.arc(-8, -126, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawTreasure(w, h, t, time) {
  const x = w * 0.5;
  const y = lerp(h * 0.32, h * 0.48, t);
  const scale = lerp(0.5, 1.1, t);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 190);
  glow.addColorStop(0, "rgba(255, 221, 97, 0.58)");
  glow.addColorStop(1, "rgba(255, 221, 97, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(-220, -170, 440, 340);

  const chestBody = ctx.createLinearGradient(0, -20, 0, 80);
  chestBody.addColorStop(0, "#b65f27");
  chestBody.addColorStop(0.55, "#7d3c1f");
  chestBody.addColorStop(1, "#3c1d13");
  ctx.fillStyle = chestBody;
  roundedRect(-78, 8, 156, 62, 12);
  ctx.fill();
  const lid = ctx.createLinearGradient(0, -34, 0, 22);
  lid.addColorStop(0, "#f0a33d");
  lid.addColorStop(1, "#8a421f");
  ctx.fillStyle = lid;
  ctx.beginPath();
  ctx.ellipse(0, 8, 82, 46, 0, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = "#ffd66d";
  ctx.lineWidth = 8;
  ctx.strokeRect(-76, 8, 152, 62);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-58, 22);
  ctx.lineTo(58, 22);
  ctx.stroke();
  ctx.fillStyle = "#ffe182";
  roundedRect(-12, 28, 24, 28, 6);
  ctx.fill();

  if (state.finalStarted) drawGuardian(0, -130, time);
  ctx.restore();
}

function drawGuardian(x, y, time) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 2) * 4);
  ctx.scale(0.9, 0.9);
  ctx.fillStyle = "#315fd7";
  roundedRect(-58, -8, 116, 104, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(215, 237, 255, 0.42)";
  ctx.lineWidth = 4;
  roundedRect(-58, -8, 116, 104, 14);
  ctx.stroke();
  ctx.fillStyle = "#d83e43";
  roundedRect(-48, -8, 42, 94, 10);
  ctx.fill();
  roundedRect(6, -8, 42, 94, 10);
  ctx.fill();
  ctx.fillStyle = "#cdd9e6";
  roundedRect(-36, -78, 72, 62, 12);
  ctx.fill();
  ctx.fillStyle = "#1b3e9b";
  ctx.beginPath();
  ctx.moveTo(0, -104);
  ctx.lineTo(14, -78);
  ctx.lineTo(-14, -78);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#38e8ff";
  ctx.fillRect(-22, -52, 14, 8);
  ctx.fillRect(8, -52, 14, 8);
  ctx.fillStyle = "#51f3ff";
  ctx.beginPath();
  ctx.arc(0, 40, 16 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBoat(w, h, time) {
  const x = w * 0.5 + state.lane * w * 0.18;
  const y = lerp(h * 0.82, h * 0.57, easeOutCubic(state.boatApproach)) + Math.sin(time * 2.8) * 6;
  const scale = Math.min(w / 1100, h / 650) * 0.92;
  if (art.boatStrip) {
    const rowPower = clamp(Math.abs(state.velocity) * 30 + Math.abs(state.forwardInput) * 0.75 + (state.mode === "gate-open" ? 0.6 : 0), 0, 1);
    const frameCount = 4;
    const phase = ((state.rowPulse / (Math.PI * 2)) % 1 + 1) % 1;
    const frameIndex = rowPower > 0.08 ? Math.floor(phase * frameCount) % frameCount : 0;
    const frameWidth = art.boatStrip.width / frameCount;
    const frameHeight = art.boatStrip.height;
    const spriteWidth = Math.min(w * lerp(0.44, 0.34, state.boatApproach), h * lerp(0.7, 0.54, state.boatApproach));
    const spriteHeight = spriteWidth * (frameHeight / frameWidth);
    const rowStroke = Math.sin(state.rowPulse) * rowPower;
    ctx.save();
    ctx.translate(x, y + Math.sin(time * 3.2) * 3.2 - rowPower * 10);
    ctx.rotate(Math.sin(time * 2.4) * 0.008 + rowStroke * 0.012);
    ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(0, spriteHeight * 0.33, spriteWidth * 0.3, spriteHeight * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.filter = "drop-shadow(0 18px 22px rgba(0, 0, 0, 0.28))";
    ctx.drawImage(
      art.boatStrip,
      frameIndex * frameWidth,
      0,
      frameWidth,
      frameHeight,
      -spriteWidth * 0.5,
      -spriteHeight * 0.58,
      spriteWidth,
      spriteHeight
    );
    ctx.filter = "none";
    ctx.restore();
    return;
  }
  if (art.boat) {
    const rowPower = clamp(Math.abs(state.velocity) * 28 + Math.abs(state.forwardInput) * 0.55 + (state.mode === "gate-open" ? 0.55 : 0), 0, 1);
    const rowStroke = Math.sin(state.rowPulse) * rowPower;
    ctx.save();
    ctx.translate(x, y + Math.sin(time * 3.2) * 3.5 - rowPower * 8);
    ctx.rotate(Math.sin(time * 2.4) * 0.008 + rowStroke * 0.016);
    const spriteWidth = Math.min(w * 0.42, h * 0.66);
    const spriteHeight = spriteWidth * (art.boat.height / art.boat.width);
    const drawWidth = spriteWidth * (1 + rowPower * 0.012);
    const drawHeight = spriteHeight * (1 - rowPower * 0.006);
    ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(0, spriteHeight * 0.32, spriteWidth * 0.32, spriteHeight * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    drawOarTrail(spriteWidth, spriteHeight, rowPower, rowStroke, time);
    ctx.save();
    roundedRect(-drawWidth * 0.42, -drawHeight * 0.58, drawWidth * 0.84, drawHeight * 0.92, drawWidth * 0.08);
    ctx.clip();
    ctx.filter = "drop-shadow(0 18px 22px rgba(0, 0, 0, 0.28))";
    ctx.drawImage(art.boat, -drawWidth * 0.5, -drawHeight * 0.58, drawWidth, drawHeight);
    ctx.filter = "none";
    ctx.restore();
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(time * 2.4) * 0.012);
  ctx.scale(scale, scale);

  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 54, 150, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(214, 255, 255, 0.36)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 66, 128, 20, 0, 0, Math.PI * 2);
  ctx.stroke();

  drawOars(time);
  drawHull();
  drawBoy(time);
  ctx.restore();
}

function drawOarTrail(spriteWidth, spriteHeight, rowPower, rowStroke, time) {
  if (rowPower <= 0.04) return;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  [-1, 1].forEach((side) => {
    const bladeX = side * spriteWidth * (0.46 + rowStroke * 0.05);
    const bladeY = spriteHeight * (0.18 + rowStroke * 0.04);
    ctx.strokeStyle = `rgba(219, 255, 255, ${0.22 + rowPower * 0.28})`;
    ctx.lineWidth = Math.max(2, spriteWidth * 0.008);
    ctx.beginPath();
    ctx.ellipse(bladeX, bladeY, spriteWidth * (0.07 + rowPower * 0.02), spriteHeight * 0.025, side * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(114, 237, 255, ${0.14 + rowPower * 0.18})`;
    ctx.lineWidth = Math.max(1.5, spriteWidth * 0.004);
    ctx.beginPath();
    ctx.moveTo(bladeX - side * spriteWidth * 0.09, bladeY + Math.sin(time * 6) * 2);
    ctx.quadraticCurveTo(bladeX, bladeY + spriteHeight * 0.035, bladeX + side * spriteWidth * 0.1, bladeY + Math.cos(time * 6) * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function drawPaintedRowingOverlay(spriteWidth, spriteHeight, rowPower, rowStroke, time) {
  const unit = spriteWidth / 500;
  const handleY = -spriteHeight * 0.18 + rowStroke * 16 * unit;
  const shoulderY = -spriteHeight * 0.22 + Math.sin(time * 3.4) * 2 * unit;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  [-1, 1].forEach((side) => {
    const shoulderX = side * 42 * unit;
    const handX = side * (72 + rowStroke * 24) * unit;
    const handY = handleY + side * rowStroke * 4 * unit;
    const oarAngle = side * (0.18 + rowStroke * 0.26);
    const innerX = side * 50 * unit;
    const bladeX = side * (242 + rowStroke * 34) * unit;
    const bladeY = spriteHeight * 0.1 + rowStroke * 34 * unit;

    ctx.save();
    ctx.rotate(oarAngle);
    const shaft = ctx.createLinearGradient(innerX, handleY, bladeX, bladeY);
    shaft.addColorStop(0, "#ffe3a0");
    shaft.addColorStop(0.34, "#c47a33");
    shaft.addColorStop(1, "#6c361b");
    ctx.strokeStyle = shaft;
    ctx.lineWidth = 9 * unit;
    ctx.shadowColor = "rgba(0, 0, 0, 0.28)";
    ctx.shadowBlur = 8 * unit;
    ctx.beginPath();
    ctx.moveTo(innerX, handleY);
    ctx.lineTo(bladeX, bladeY);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#d99043";
    ctx.beginPath();
    ctx.ellipse(bladeX + side * 18 * unit, bladeY + 2 * unit, 32 * unit, 12 * unit, side * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 231, 174, 0.55)";
    ctx.lineWidth = 2 * unit;
    ctx.beginPath();
    ctx.moveTo(bladeX + side * 4 * unit, bladeY - 3 * unit);
    ctx.lineTo(bladeX + side * 30 * unit, bladeY + 5 * unit);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = "#d99063";
    ctx.lineWidth = 11 * unit;
    ctx.shadowColor = "rgba(0, 0, 0, 0.18)";
    ctx.shadowBlur = 5 * unit;
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.quadraticCurveTo(side * 58 * unit, shoulderY + 22 * unit, handX, handY);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#efb984";
    ctx.beginPath();
    ctx.ellipse(handX, handY, 9 * unit, 7 * unit, side * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 232, 197, 0.55)";
    ctx.lineWidth = 1.6 * unit;
    ctx.beginPath();
    ctx.arc(handX - side * 2 * unit, handY - 1 * unit, 4 * unit, 0, Math.PI * 1.35);
    ctx.stroke();
  });

  if (rowPower > 0.12) {
    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = `rgba(229, 255, 255, ${0.16 + rowPower * 0.18})`;
    ctx.lineWidth = 2.2 * unit;
    ctx.beginPath();
    ctx.ellipse(0, spriteHeight * 0.23, spriteWidth * 0.26, spriteHeight * 0.045, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawOars(time) {
  const stroke = Math.sin(state.rowPulse) * clamp(Math.abs(state.velocity) * 26 + Math.abs(state.forwardInput) * 0.45, 0.12, 1);
  [-1, 1].forEach((side) => {
    ctx.save();
    ctx.rotate(side * (0.24 + stroke * 0.18));
    ctx.strokeStyle = "#d49a5f";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(side * 30, 8);
    ctx.lineTo(side * 182, 42 + stroke * 22);
    ctx.stroke();
    ctx.fillStyle = "#efc98b";
    ctx.beginPath();
    ctx.ellipse(side * 205, 48 + stroke * 24, 26, 10, side * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(226, 255, 255, 0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(side * 205, 50 + stroke * 24, 18, 0.15, Math.PI * 0.85);
    ctx.stroke();
    ctx.restore();
  });
}

function drawHull() {
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;
  const hull = ctx.createLinearGradient(0, -30, 0, 80);
  hull.addColorStop(0, "#d9893f");
  hull.addColorStop(0.34, "#9a4f24");
  hull.addColorStop(0.78, "#552a17");
  hull.addColorStop(1, "#2d140d");
  ctx.fillStyle = hull;
  ctx.beginPath();
  ctx.moveTo(-168, -4);
  ctx.bezierCurveTo(-128, 78, -56, 126, 0, 142);
  ctx.bezierCurveTo(56, 126, 128, 78, 168, -4);
  ctx.bezierCurveTo(98, 30, -98, 30, -168, -4);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  const inner = ctx.createLinearGradient(0, -26, 0, 54);
  inner.addColorStop(0, "#432416");
  inner.addColorStop(1, "#160c08");
  ctx.fillStyle = inner;
  ctx.beginPath();
  ctx.ellipse(0, -1, 122, 36, 0, 0, Math.PI * 2);
  ctx.fill();

  const rim = ctx.createLinearGradient(-160, -20, 160, 24);
  rim.addColorStop(0, "#f2bd69");
  rim.addColorStop(0.5, "#8f5428");
  rim.addColorStop(1, "#f2bd69");
  ctx.strokeStyle = rim;
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.moveTo(-168, -4);
  ctx.bezierCurveTo(-98, 30, 98, 30, 168, -4);
  ctx.stroke();

  const shine = ctx.createLinearGradient(-120, -18, 110, 80);
  shine.addColorStop(0, "rgba(255, 231, 174, 0.28)");
  shine.addColorStop(0.36, "rgba(255, 231, 174, 0.06)");
  shine.addColorStop(1, "rgba(255, 231, 174, 0)");
  ctx.fillStyle = shine;
  ctx.beginPath();
  ctx.moveTo(-116, -6);
  ctx.bezierCurveTo(-74, 20, -18, 32, 76, 10);
  ctx.bezierCurveTo(42, 38, -42, 46, -108, 18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#f3b661";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 222, 152, 0.65)";
  ctx.lineWidth = 5;
  for (let i = -3; i <= 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(-118, i * 18 + 34);
    ctx.quadraticCurveTo(0, i * 12 + 42, 118, i * 18 + 34);
    ctx.stroke();
  }

  ctx.fillStyle = "#f4bb64";
  ctx.beginPath();
  ctx.moveTo(-168, -4);
  ctx.lineTo(-218, -34);
  ctx.lineTo(-196, 32);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#a85b28";
  ctx.beginPath();
  ctx.moveTo(168, -4);
  ctx.lineTo(218, -34);
  ctx.lineTo(196, 32);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.24)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-204, -20);
  ctx.lineTo(-190, 16);
  ctx.moveTo(204, -20);
  ctx.lineTo(190, 16);
  ctx.stroke();
  ctx.restore();
}

function drawBoy(time) {
  const breathe = Math.sin(time * 2.5) * 2;
  ctx.save();
  ctx.translate(0, -44 + breathe);
  const shirt = ctx.createLinearGradient(0, -16, 0, 50);
  shirt.addColorStop(0, "#2f74d7");
  shirt.addColorStop(1, "#123f91");
  ctx.fillStyle = shirt;
  roundedRect(-32, -14, 64, 62, 18);
  ctx.fill();
  const vest = ctx.createLinearGradient(0, 0, 0, 32);
  vest.addColorStop(0, "#ffe27a");
  vest.addColorStop(1, "#f2ad35");
  ctx.fillStyle = vest;
  roundedRect(-26, 5, 52, 24, 8);
  ctx.fill();
  const skin = ctx.createLinearGradient(-18, -74, 26, -14);
  skin.addColorStop(0, "#f2bf8b");
  skin.addColorStop(0.56, "#df9d68");
  skin.addColorStop(1, "#b96f45");
  ctx.fillStyle = skin;
  roundedRect(-32, -72, 64, 60, 22);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 226, 195, 0.38)";
  ctx.beginPath();
  ctx.ellipse(-10, -50, 12, 16, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#25150f";
  ctx.beginPath();
  ctx.moveTo(-30, -52);
  ctx.bezierCurveTo(-38, -86, 12, -104, 36, -66);
  ctx.bezierCurveTo(24, -72, 14, -74, 4, -65);
  ctx.bezierCurveTo(-8, -78, -20, -66, -30, -52);
  ctx.fill();
  ctx.fillStyle = "#5a3022";
  ctx.beginPath();
  ctx.moveTo(-8, -82);
  ctx.bezierCurveTo(8, -106, 30, -84, 26, -62);
  ctx.bezierCurveTo(15, -75, 3, -69, -8, -82);
  ctx.fill();
  ctx.fillStyle = "#0d1720";
  ctx.beginPath();
  ctx.arc(-12, -46, 4.6, 0, Math.PI * 2);
  ctx.arc(14, -46, 4.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(-13.5, -47.5, 1.2, 0, Math.PI * 2);
  ctx.arc(12.5, -47.5, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#803d30";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(2, -34, 10, 0.1, Math.PI - 0.1);
  ctx.stroke();
  ctx.strokeStyle = "#d99a6c";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-25, 4);
  ctx.lineTo(-66, 18 + Math.sin(state.rowPulse) * 8);
  ctx.moveTo(25, 4);
  ctx.lineTo(66, 18 - Math.sin(state.rowPulse) * 8);
  ctx.stroke();
  ctx.restore();
}

function drawParticles() {
  state.particles.forEach((p) => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = p.drift ? 10 : 18;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

function drawForegroundRocks(w, h, time) {
  ctx.save();
  const leftGlow = ctx.createRadialGradient(w * 0.06, h * 0.82, 20, w * 0.06, h * 0.82, w * 0.28);
  leftGlow.addColorStop(0, "rgba(255, 183, 82, 0.16)");
  leftGlow.addColorStop(1, "rgba(255, 183, 82, 0)");
  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, h * 0.55, w * 0.34, h * 0.45);

  [["left", -1], ["right", 1]].forEach(([, side]) => {
    const baseX = side < 0 ? -w * 0.08 : w * 1.08;
    const rock = ctx.createLinearGradient(0, h * 0.55, 0, h);
    rock.addColorStop(0, "#244757");
    rock.addColorStop(1, "#02070d");
    ctx.fillStyle = rock;
    ctx.beginPath();
    ctx.moveTo(baseX, h);
    for (let i = 0; i < 8; i += 1) {
      const y = lerp(h * 0.58, h, i / 7);
      const x = baseX - side * (w * (0.04 + Math.sin(i * 1.7 + time * 0.08) * 0.015 + i * 0.025));
      ctx.lineTo(x, y);
    }
    ctx.lineTo(side < 0 ? -w * 0.16 : w * 1.16, h);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(187, 235, 244, 0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  ctx.restore();
}

function drawVignette(w, h) {
  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.52, h * 0.18, w * 0.5, h * 0.52, h * 0.86);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(0.62, "rgba(0, 0, 0, 0.14)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.58)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);

  const grade = ctx.createLinearGradient(0, 0, w, h);
  grade.addColorStop(0, "rgba(99, 220, 255, 0.08)");
  grade.addColorStop(0.48, "rgba(0, 0, 0, 0)");
  grade.addColorStop(1, "rgba(255, 160, 69, 0.08)");
  ctx.fillStyle = grade;
  ctx.fillRect(0, 0, w, h);
}

function seedParticles() {
  for (let i = 0; i < 72; i += 1) {
    state.particles.push({
      x: Math.random() * state.width,
      y: Math.random() * state.height * 0.75,
      vx: -4 + Math.random() * 8,
      vy: -4 - Math.random() * 10,
      size: 0.8 + Math.random() * 3.4,
      life: 0.12 + Math.random() * 0.42,
      color: i % 3 ? "#6cf3ff" : "#ffd66d",
      drift: true
    });
  }
}

function burstParticles(x, y, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 80 + Math.random() * 260;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 80,
      size: 2 + Math.random() * 5,
      life: 0.8 + Math.random() * 0.8,
      color: i % 2 ? "#ffe083" : "#6cf3ff",
      drift: false
    });
  }
}

function updateParticles(dt) {
  state.particles.forEach((p) => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (!p.drift) p.vy += 90 * dt;
    p.life -= p.drift ? dt * 0.02 : dt * 0.9;
    if (p.drift && (p.y < -20 || p.life < 0.1)) {
      p.x = Math.random() * state.width;
      p.y = state.height * (0.18 + Math.random() * 0.55);
      p.life = 0.15 + Math.random() * 0.35;
    }
  });
  state.particles = state.particles.filter((p) => p.life > 0 && p.x > -80 && p.x < state.width + 80 && p.y < state.height + 120);
}

function addWake() {
  const baseY = state.height * 0.86;
  const baseX = state.width * 0.5 + state.lane * state.width * 0.18;
  [-1, 1].forEach((side) => {
    state.wakes.push({
      x: baseX + side * state.width * 0.17,
      y: baseY + Math.random() * 14,
      side,
      radius: 18 + Math.random() * 18,
      age: 0,
      life: 1,
      phase: Math.random() * Math.PI * 2
    });
  });
  if (state.wakes.length > 18) state.wakes.splice(0, state.wakes.length - 18);
}

function updateWakes(dt) {
  state.wakes.forEach((wake) => {
    wake.age += dt;
    wake.radius += dt * 48;
    wake.life -= dt * 1.35;
  });
  state.wakes = state.wakes.filter((wake) => wake.life > 0);
}

function primeAudio() {
  if (audioContext) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioContext.createGain();
  masterGain.gain.value = state.sound ? 0.35 : 0;
  masterGain.connect(audioContext.destination);
  startWaterAmbience();
}

function startWaterAmbience() {
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, sampleRate * 2, sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i += 1) {
    last = last * 0.94 + (Math.random() * 2 - 1) * 0.06;
    data[i] = last;
  }
  waterNoise = audioContext.createBufferSource();
  waterNoise.buffer = buffer;
  waterNoise.loop = true;

  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 520;
  filter.Q.value = 0.7;

  waterGain = audioContext.createGain();
  waterGain.gain.value = 0.018;
  waterNoise.connect(filter).connect(waterGain).connect(masterGain);
  waterNoise.start();
}

function tone(freq, duration, type = "sine", gain = 0.14, when = 0) {
  if (!audioContext || !state.sound) return;
  const osc = audioContext.createOscillator();
  const g = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioContext.currentTime + when);
  g.gain.setValueAtTime(0.0001, audioContext.currentTime + when);
  g.gain.exponentialRampToValueAtTime(gain, audioContext.currentTime + when + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + when + duration);
  osc.connect(g).connect(masterGain);
  osc.start(audioContext.currentTime + when);
  osc.stop(audioContext.currentTime + when + duration + 0.04);
}

function playSwish(power) {
  if (waterGain && audioContext && state.sound) {
    const now = audioContext.currentTime;
    waterGain.gain.cancelScheduledValues(now);
    waterGain.gain.setValueAtTime(0.018, now);
    waterGain.gain.linearRampToValueAtTime(0.038 + power * 0.018, now + 0.06);
    waterGain.gain.exponentialRampToValueAtTime(0.018, now + 0.42);
  }
  tone(86 + power * 55, 0.16, "triangle", 0.025 + power * 0.018);
  tone(170 + power * 90, 0.1, "sine", 0.012, 0.04);
}

function playGateHum() {
  tone(164, 0.38, "sine", 0.05);
  tone(246, 0.4, "triangle", 0.035, 0.06);
}

function playGateOpen() {
  tone(146, 0.16, "sawtooth", 0.08);
  tone(330, 0.2, "triangle", 0.09, 0.08);
  tone(660, 0.28, "sine", 0.07, 0.18);
}

function playWrong() {
  tone(180, 0.14, "square", 0.05);
  tone(130, 0.16, "square", 0.035, 0.12);
}

function playChime() {
  [392, 523, 659, 784].forEach((freq, i) => tone(freq, 0.22, "sine", 0.07, i * 0.09));
}

function playVictoryVoice() {
  if (!audioContext || !state.sound) return;
  playChime();
  const line = "Autobot, you now have the Matrix of Leadership.";
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.rate = 0.72;
    utterance.pitch = 0.42;
    utterance.volume = 0.95;
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => /male|david|mark|english|us/i.test(`${voice.name} ${voice.lang}`)) || voices[0] || null;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}

function roundedRect(x, y, width, height, radius) {
  const r = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function easeOutCubic(value) {
  const t = clamp(value, 0, 1);
  return 1 - Math.pow(1 - t, 3);
}

try {
  boot();
} catch (error) {
  console.error(error);
  window.__caveQuestBoot = { ok: false, stage: "failed", build: BUILD_ID, message: error?.message || String(error) };
  el.fallback.classList.remove("hidden");
}
