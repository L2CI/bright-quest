const board = document.querySelector("#blackboard");
const svg = document.querySelector("#chalkScene");
const sceneTitle = document.querySelector("#sceneTitle");
const sceneCount = document.querySelector("#sceneCount");
const sceneDuration = document.querySelector("#sceneDuration");
const lessonPoint = document.querySelector("#lessonPoint");
const captionText = document.querySelector("#captionText");
const ccButton = document.querySelector("#ccButton");
const playButton = document.querySelector("#playButton");
const rewindButton = document.querySelector("#rewindButton");
const sceneList = document.querySelector("#sceneList");
const timeline = document.querySelector("#timeline");
const elapsedTime = document.querySelector("#elapsedTime");
const remainingTime = document.querySelector("#remainingTime");
const totalTime = document.querySelector("#totalTime");
const magicHand = document.querySelector("#magicHand");

const renderers = {
  "sentence-machine": grammarSentenceMachineSvg,
  "nouns-pronouns": grammarNounsPronounsSvg,
  "verbs-tense": grammarVerbsTenseSvg,
  "adjectives-adverbs": grammarAdjectivesAdverbsSvg,
  prepositions: grammarPrepositionsSvg,
  conjunctions: grammarConjunctionsSvg,
  punctuation: grammarPunctuationSvg,
  "paragraph-repair": grammarParagraphRepairSvg,
  "recap-quiz": grammarRecapQuizSvg
};

const boardMomentTimes = {
  "sentence-machine": 62,
  "nouns-pronouns": 48,
  "verbs-tense": 48,
  "adjectives-adverbs": 50,
  prepositions: 42,
  conjunctions: 52,
  punctuation: 52,
  "paragraph-repair": 50,
  "recap-quiz": 54
};

let scenes = [];
let sceneOffsets = [];
let activeSceneIndex = 0;
let audio = null;
let playing = false;
let completed = false;
let captionTimer = null;
let rafId = null;
let courseElapsedAtSceneStart = 0;
let captionsVisible = false;

init();

async function init() {
  scenes = await fetch("./lesson-scripts.json").then((response) => response.json());
  sceneOffsets = scenes.reduce((acc, scene, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + scenes[index - 1].duration);
    return acc;
  }, []);
  const total = courseTotal();
  timeline.max = String(total);
  totalTime.textContent = `${formatTime(total)} total`;
  remainingTime.textContent = formatTime(total);
  renderSceneList();
  loadScene(0, 0, false);
}

function renderSceneList() {
  sceneList.innerHTML = scenes
    .map((scene, index) => `
      <button class="scene-button ${index === activeSceneIndex ? "active" : ""}" type="button" data-scene="${index}">
        <span>${index + 1}</span>
        <span><strong>${escapeHtml(scene.title)}</strong><small>${escapeHtml(scene.point)}</small></span>
        <small>${formatTime(scene.duration)}</small>
      </button>
    `)
    .join("");
}

function loadScene(index, offsetSeconds = 0, shouldPlay = playing) {
  stopFrameLoop();
  window.clearTimeout(captionTimer);
  activeSceneIndex = Math.max(0, Math.min(scenes.length - 1, index));
  const scene = scenes[activeSceneIndex];
  const offset = Math.max(0, Math.min(scene.duration - 0.5, offsetSeconds));
  courseElapsedAtSceneStart = sceneOffsets[activeSceneIndex];

  board.classList.remove("paused");
  sceneTitle.textContent = scene.title;
  sceneCount.textContent = `Scene ${activeSceneIndex + 1} of ${scenes.length}`;
  sceneDuration.textContent = formatTime(scene.duration);
  lessonPoint.textContent = scene.point;
  captionText.textContent = captionFor(scene, offset);
  svg.innerHTML = renderers[scene.id] ? renderers[scene.id]() : baseSvg("");
  updateBoardMoment(scene, offset);
  magicHand.style.setProperty("--hand-x", "8%");
  magicHand.style.setProperty("--hand-y", "28%");
  magicHand.style.setProperty("--hand-time", `${Math.min(24, scene.duration / 4)}s`);
  magicHand.style.animation = "none";
  void magicHand.offsetWidth;
  magicHand.style.animation = "";
  renderSceneList();

  if (audio) {
    audio.pause();
    audio = null;
  }
  audio = new Audio(scene.audio);
  audio.volume = 1;
  audio.playbackRate = 1.1;
  audio.preload = "auto";
  audio.addEventListener("loadedmetadata", () => {
    audio.currentTime = Math.min(offset, Math.max(0, (audio.duration || scene.duration) - 0.4));
  }, { once: true });
  audio.addEventListener("ended", playNextScene);
  audio.addEventListener("error", () => {
    captionText.textContent = "Voice file is still being prepared. The board can play silently for now.";
  });

  setTimeline(courseElapsedAtSceneStart + offset);
  if (shouldPlay) startPlayback();
  else setPlayState(false);
}

function startPlayback() {
  if (!audio) return;
  completed = false;
  playing = true;
  board.classList.remove("paused");
  setPlayState(true);
  audio.play().catch(() => {
    playing = false;
    setPlayState(false);
  });
  startCaptionLoop();
  startFrameLoop();
}

function pausePlayback() {
  playing = false;
  audio?.pause();
  board.classList.add("paused");
  renderPlayButton("resume");
  stopFrameLoop();
}

function setPlayState(value) {
  playing = value;
  renderPlayButton(completed ? "replay" : value ? "pause" : "play");
}

function playNextScene() {
  if (activeSceneIndex + 1 < scenes.length) {
    loadScene(activeSceneIndex + 1, 0, true);
    return;
  }
  completed = true;
  playing = false;
  setTimeline(courseTotal());
  renderPlayButton("replay");
  stopFrameLoop();
  captionText.textContent = "Course complete. Grammar helps your ideas travel clearly.";
}

function rewind(seconds = 15) {
  const current = currentElapsed();
  const target = Math.max(0, current - seconds);
  const { index, offset } = sceneAt(target);
  loadScene(index, offset, true);
}

function seekTo(seconds) {
  const target = Math.max(0, Math.min(courseTotal(), seconds));
  const { index, offset } = sceneAt(target);
  loadScene(index, offset, playing);
}

function currentElapsed() {
  const scene = scenes[activeSceneIndex];
  const audioTime = Number.isFinite(audio?.currentTime) ? audio.currentTime : 0;
  return Math.min(courseTotal(), sceneOffsets[activeSceneIndex] + Math.min(scene.duration, audioTime));
}

function setTimeline(seconds) {
  const total = courseTotal();
  const safe = Math.max(0, Math.min(total, seconds));
  timeline.value = String(Math.round(safe));
  elapsedTime.textContent = `${formatTime(safe)} elapsed`;
  remainingTime.textContent = formatTime(total - safe);
}

function startFrameLoop() {
  stopFrameLoop();
  const tick = () => {
    if (!playing) return;
    setTimeline(currentElapsed());
    updateBoardMoment(scenes[activeSceneIndex], audio?.currentTime || 0);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopFrameLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

function startCaptionLoop() {
  window.clearTimeout(captionTimer);
  if (!playing) return;
  const scene = scenes[activeSceneIndex];
  captionText.textContent = captionFor(scene, audio?.currentTime || 0);
  updateBoardMoment(scene, audio?.currentTime || 0);
  captionTimer = window.setTimeout(startCaptionLoop, 500);
}

function updateBoardMoment(scene, seconds) {
  const threshold = boardMomentTimes[scene.id] ?? Number.POSITIVE_INFINITY;
  const showMoment = seconds >= threshold;
  board.classList.toggle("show-board-moment", showMoment);
  board.classList.toggle("dim-main-example", showMoment);
  board.classList.toggle("show-maya-example", scene.id === "sentence-machine" && showMoment);
  board.classList.toggle("dim-dog-example", scene.id === "sentence-machine" && showMoment);
}

function captionFor(scene, seconds) {
  return scene.captions.reduce((current, item) => seconds >= item[0] ? item[1] : current, scene.captions[0]?.[1] || scene.point);
}

function sceneAt(courseSeconds) {
  let index = scenes.length - 1;
  for (let i = 0; i < scenes.length; i += 1) {
    if (courseSeconds < sceneOffsets[i] + scenes[i].duration) {
      index = i;
      break;
    }
  }
  return { index, offset: courseSeconds - sceneOffsets[index] };
}

function courseTotal() {
  return scenes.reduce((sum, scene) => sum + scene.duration, 0);
}

playButton.addEventListener("click", () => {
  if (completed) {
    completed = false;
    loadScene(0, 0, true);
    return;
  }
  if (playing) pausePlayback();
  else startPlayback();
});

rewindButton.addEventListener("click", () => rewind(15));

ccButton.addEventListener("click", () => {
  captionsVisible = !captionsVisible;
  captionText.classList.toggle("hidden", !captionsVisible);
  ccButton.classList.toggle("active", captionsVisible);
  ccButton.setAttribute("aria-expanded", String(captionsVisible));
});

sceneList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scene]");
  if (!button) return;
  loadScene(Number(button.dataset.scene), 0, true);
});

timeline.addEventListener("input", () => {
  setTimeline(Number(timeline.value));
});

timeline.addEventListener("change", () => {
  seekTo(Number(timeline.value));
});

function baseSvg(content) {
  return `
    <defs>
      <filter id="chalkRough" x="-4%" y="-4%" width="108%" height="108%">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="7" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2"/>
      </filter>
      <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L8,3 L0,6 Z" fill="#f5f5f0"></path>
      </marker>
    </defs>
    ${content}
  `;
}

function path(d, delay, dur = 1, color = "#f5f5f0", width = 6, extra = "") {
  return `<path class="draw-path" pathLength="100" d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" style="--delay:${delay}s;--dur:${dur}s" ${extra}></path>`;
}

function line(x1, y1, x2, y2, delay, dur = 1, color = "#f5f5f0", width = 6, extra = "") {
  return path(`M${x1} ${y1} L${x2} ${y2}`, delay, dur, color, width, extra);
}

function rect(x, y, w, h, delay, dur = 1, color = "#f5f5f0", width = 5) {
  return `<rect class="draw-shape" pathLength="100" x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(245,245,240,0.025)" stroke="${color}" stroke-width="${width}" style="--delay:${delay}s;--dur:${dur}s"></rect>`;
}

function circle(cx, cy, r, delay, dur = 1, color = "#f5f5f0", width = 5) {
  return `<circle class="draw-shape" pathLength="100" cx="${cx}" cy="${cy}" r="${r}" fill="rgba(245,245,240,0.025)" stroke="${color}" stroke-width="${width}" style="--delay:${delay}s;--dur:${dur}s"></circle>`;
}

function text(x, y, value, delay, size = 28, color = "#f5f5f0", anchor = "middle", weight = 800) {
  return `<text class="draw-text chalk-label" x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" style="--delay:${delay}s">${escapeHtml(value)}</text>`;
}

function smallText(x, y, value, delay, color = "rgba(245,245,240,0.78)", anchor = "middle") {
  return text(x, y, value, delay, 19, color, anchor, 700);
}

function wordBox(x, y, value, delay, color = "#f5f5f0", w = 150) {
  return `${rect(x, y, w, 58, delay, 0.55, color, 4)}${text(x + w / 2, y + 38, value, delay + 0.35, 24, color)}`;
}

function grammarSentenceMachineSvg() {
  return baseSvg(`
    ${text(600, 58, "The Sentence Machine", 0.1, 34)}
    ${rect(100, 145, 1000, 440, 0.5, 1.0, "#8bd3dd", 6)}
    ${text(600, 150, "A complete sentence needs three parts", 1.2, 27)}
    <g class="dog-example">
      ${circle(300, 298, 78, 1.8, 0.9, "#9fdf9f", 7)}
      ${text(300, 286, "Subject", 2.5, 27, "#9fdf9f")}
      ${smallText(300, 321, "who or what", 2.8)}
      ${path("M378 298 L502 298", 3.2, 0.5, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${circle(600, 298, 78, 3.7, 0.9, "#f3d56b", 7)}
      ${text(600, 286, "Predicate", 4.4, 25, "#f3d56b")}
      ${smallText(600, 321, "what happened", 4.7)}
      ${path("M678 298 L802 298", 5.1, 0.5, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${circle(900, 298, 78, 5.6, 0.9, "#f4a6b8", 7)}
      ${text(900, 286, "Complete", 6.3, 25, "#f4a6b8")}
      ${text(900, 318, "thought", 6.6, 25, "#f4a6b8")}
      ${text(600, 425, "The curious dog chased the red ball.", 7.4, 31)}
      ${path("M280 448 C355 500 430 500 505 448", 8.2, 0.7, "#9fdf9f")}
      ${text(392, 526, "subject", 8.9, 23, "#9fdf9f")}
      ${path("M520 448 C640 500 795 500 930 448", 9.4, 0.7, "#f3d56b")}
      ${text(720, 526, "predicate", 10.1, 23, "#f3d56b")}
    </g>
    <g class="board-moment maya-moment">
      ${line(150, 606, 1050, 606, 0, 0.01, "rgba(245,245,240,0.34)", 4)}
      ${text(600, 632, "Quick check: Maya reads a comic.", 0, 29, "#f5f5f0")}
      ${path("M402 642 C440 670 488 670 526 642", 0, 0.01, "#9fdf9f", 5)}
      ${text(464, 676, "subject", 0, 20, "#9fdf9f")}
      ${path("M540 642 C628 670 754 670 842 642", 0, 0.01, "#f3d56b", 5)}
      ${text(690, 676, "predicate", 0, 20, "#f3d56b")}
    </g>
  `);
}

function grammarNounsPronounsSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Nouns name. Pronouns replace.", 0.1, 32)}
    ${text(260, 128, "Nouns", 0.6, 34, "#9fdf9f")}
    ${wordBox(104, 170, "teacher", 1.0, "#9fdf9f")}
    ${wordBox(104, 250, "garden", 1.5, "#9fdf9f")}
    ${wordBox(104, 330, "bicycle", 2.0, "#9fdf9f")}
    ${wordBox(104, 410, "courage", 2.5, "#9fdf9f")}
    ${path("M366 310 C465 250 520 250 604 310", 3.2, 0.8, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
    ${text(650, 128, "Pronouns", 3.8, 34, "#8bd3dd")}
    ${wordBox(560, 190, "she", 4.2, "#8bd3dd", 110)}
    ${wordBox(690, 190, "he", 4.5, "#8bd3dd", 110)}
    ${wordBox(560, 270, "they", 4.8, "#8bd3dd", 110)}
    ${wordBox(690, 270, "it", 5.1, "#8bd3dd", 110)}
    ${rect(820, 170, 300, 205, 5.8, 0.8, "#f3d56b", 5)}
    ${text(970, 220, "Sofia packed", 6.5, 25)}
    ${text(970, 258, "Sofia's bag.", 6.8, 25)}
    ${path("M875 300 L1065 300", 7.3, 0.4, "#f4a6b8", 6)}
    ${text(970, 345, "Sofia packed her bag.", 7.8, 25, "#f3d56b")}
    </g>
    <g class="board-moment">
      ${text(600, 58, "Pronouns make writing smoother", 0, 32)}
      ${rect(115, 160, 970, 360, 0, 0.01, "#8bd3dd", 6)}
      ${text(600, 230, "The players cheered after the players won.", 0, 30)}
      ${path("M650 252 L952 252", 0, 0.01, "#f4a6b8", 6)}
      ${text(790, 308, "too much repeating", 0, 24, "#f4a6b8")}
      ${path("M600 345 L600 405", 0, 0.01, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${text(600, 458, "The players cheered after they won.", 0, 32, "#f3d56b")}
      ${path("M735 480 C770 512 820 512 855 480", 0, 0.01, "#9fdf9f", 5)}
      ${text(795, 546, "they = the players", 0, 24, "#9fdf9f")}
    </g>
  `);
}

function grammarVerbsTenseSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Verbs show action. Tense shows time.", 0.1, 31)}
    ${line(160, 320, 1040, 320, 0.7, 0.9, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
    ${text(220, 285, "Past", 1.4, 30, "#8bd3dd")}
    ${text(600, 285, "Present", 1.8, 30, "#9fdf9f")}
    ${text(980, 285, "Future", 2.2, 30, "#f3d56b")}
    ${circle(220, 320, 18, 2.7, 0.35, "#8bd3dd", 6)}
    ${circle(600, 320, 18, 3.0, 0.35, "#9fdf9f", 6)}
    ${circle(980, 320, 18, 3.3, 0.35, "#f3d56b", 6)}
    ${wordBox(140, 385, "walked", 3.8, "#8bd3dd", 150)}
    ${wordBox(525, 385, "walk", 4.3, "#9fdf9f", 150)}
    ${wordBox(890, 385, "will walk", 4.8, "#f3d56b", 190)}
    ${path("M250 510 C330 470 410 470 490 510", 5.5, 0.65, "#f4a6b8", 5)}
    ${text(370, 548, "Not all past verbs use -ed", 6.1, 26, "#f4a6b8")}
    ${wordBox(650, 500, "run -> ran", 6.8, "#f5f5f0", 190)}
    ${wordBox(870, 500, "eat -> ate", 7.3, "#f5f5f0", 190)}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Quick check: present to past", 0, 32)}
      ${rect(140, 200, 920, 300, 0, 0.01, "#8bd3dd", 6)}
      ${wordBox(250, 310, "I see a bird", 0, "#f5f5f0", 245)}
      ${path("M520 340 L670 340", 0, 0.01, "#f3d56b", 7, 'marker-end="url(#arrowHead)"')}
      ${wordBox(700, 310, "I saw a bird", 0, "#f3d56b", 245)}
      ${path("M360 410 C410 445 468 445 520 410", 0, 0.01, "#8bd3dd", 5)}
      ${text(440, 474, "present", 0, 24, "#8bd3dd")}
      ${path("M805 410 C855 445 918 445 970 410", 0, 0.01, "#9fdf9f", 5)}
      ${text(890, 474, "past", 0, 24, "#9fdf9f")}
    </g>
  `);
}

function grammarAdjectivesAdverbsSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Adjectives and Adverbs add detail", 0.1, 32)}
    ${rect(92, 150, 450, 390, 0.7, 0.9, "#9fdf9f", 5)}
    ${text(317, 205, "Adjective", 1.4, 32, "#9fdf9f")}
    ${smallText(317, 238, "describes a noun", 1.8)}
    ${path("M270 350 C292 270 418 270 440 350 C442 420 270 420 270 350", 2.4, 1.0, "#f5f5f0", 7)}
    ${path("M300 310 L330 250 L360 310 M390 310 L420 250 L450 310", 3.2, 0.6, "#f5f5f0", 5)}
    ${text(355, 465, "bright blue kite", 4.0, 29, "#9fdf9f")}
    ${rect(660, 150, 450, 390, 4.7, 0.9, "#f3d56b", 5)}
    ${text(885, 205, "Adverb", 5.4, 32, "#f3d56b")}
    ${smallText(885, 238, "describes a verb", 5.8)}
    ${path("M780 395 C860 320 942 320 1018 395", 6.4, 0.9, "#f5f5f0", 7, 'marker-end="url(#arrowHead)"')}
    ${circle(800, 415, 32, 7.1, 0.4, "#f5f5f0", 5)}
    ${circle(982, 415, 32, 7.35, 0.4, "#f5f5f0", 5)}
    ${text(900, 465, "moved slowly", 8.0, 29, "#f3d56b")}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Spot the detail job", 0, 32)}
      ${text(600, 178, "The brave girl spoke clearly.", 0, 33)}
      ${path("M315 202 C370 245 435 245 490 202", 0, 0.01, "#8bd3dd", 6)}
      ${text(402, 280, "brave describes girl", 0, 25, "#8bd3dd")}
      ${path("M625 202 C690 245 790 245 855 202", 0, 0.01, "#f3d56b", 6)}
      ${text(740, 280, "clearly describes spoke", 0, 25, "#f3d56b")}
      ${rect(250, 390, 700, 100, 0, 0.01, "#9fdf9f", 5)}
      ${text(600, 452, "Adjective -> noun    Adverb -> verb", 0, 30, "#9fdf9f")}
    </g>
  `);
}

function grammarPrepositionsSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Prepositions show relationships", 0.1, 32)}
    ${rect(420, 365, 360, 54, 0.7, 0.7, "#f5f5f0", 6)}
    ${text(600, 455, "desk", 1.35, 26)}
    ${circle(600, 310, 34, 2.1, 0.5, "#f3d56b", 6)}
    ${text(600, 250, "on", 2.65, 28, "#f3d56b")}
    ${circle(600, 495, 34, 3.4, 0.5, "#8bd3dd", 6)}
    ${text(600, 560, "under", 3.95, 28, "#8bd3dd")}
    ${circle(360, 390, 34, 4.8, 0.5, "#9fdf9f", 6)}
    ${text(360, 455, "beside", 5.35, 28, "#9fdf9f")}
    ${path("M170 160 C260 112 380 112 470 160", 6.1, 0.8, "#f4a6b8", 5, 'marker-end="url(#arrowHead)"')}
    ${text(320, 190, "after lunch", 6.75, 27, "#f4a6b8")}
    ${text(890, 190, "under the chair", 7.45, 27, "#8bd3dd")}
    ${smallText(890, 222, "prepositional phrase", 7.8)}
    </g>
    <g class="board-moment">
      ${text(600, 66, "One word changes the picture", 0, 32)}
      ${rect(330, 335, 540, 52, 0, 0.01, "#f5f5f0", 6)}
      ${text(600, 430, "chair", 0, 26)}
      ${circle(480, 280, 34, 0, 0.01, "#f3d56b", 6)}
      ${text(480, 224, "on", 0, 28, "#f3d56b")}
      ${circle(720, 460, 34, 0, 0.01, "#8bd3dd", 6)}
      ${text(720, 528, "under", 0, 28, "#8bd3dd")}
      ${text(600, 610, "The phrase tells where.", 0, 29, "#9fdf9f")}
    </g>
  `);
}

function grammarConjunctionsSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Conjunctions connect ideas", 0.1, 32)}
    ${rect(110, 210, 350, 130, 0.8, 0.8, "#8bd3dd", 6)}
    ${text(285, 268, "I wanted to play", 1.5, 27, "#8bd3dd")}
    ${rect(740, 210, 350, 130, 2.1, 0.8, "#f3d56b", 6)}
    ${text(915, 268, "it rained", 2.8, 27, "#f3d56b")}
    ${path("M470 275 C560 230 650 230 730 275", 3.5, 0.9, "#f4a6b8", 6, 'marker-end="url(#arrowHead)"')}
    ${text(600, 220, "but", 4.2, 40, "#f4a6b8")}
    ${text(250, 475, "and = add", 5.0, 28, "#9fdf9f")}
    ${text(500, 475, "but = contrast", 5.6, 28, "#f4a6b8")}
    ${text(760, 475, "or = choice", 6.2, 28, "#8bd3dd")}
    ${text(985, 475, "so = result", 6.8, 28, "#f3d56b")}
    ${text(600, 585, "Choose the connector that matches the relationship.", 7.6, 28)}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Comma + conjunction", 0, 32)}
      ${rect(145, 215, 395, 135, 0, 0.01, "#8bd3dd", 6)}
      ${text(342, 292, "I was hungry", 0, 29, "#8bd3dd")}
      ${text(600, 292, ", so", 0, 40, "#f3d56b")}
      ${rect(690, 215, 395, 135, 0, 0.01, "#9fdf9f", 6)}
      ${text(887, 292, "I made toast", 0, 29, "#9fdf9f")}
      ${path("M420 430 C525 375 675 375 780 430", 0, 0.01, "#f3d56b", 6, 'marker-end="url(#arrowHead)"')}
      ${text(600, 500, "so shows the result", 0, 30, "#f3d56b")}
    </g>
  `);
}

function grammarPunctuationSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Punctuation is a reading signal", 0.1, 32)}
    ${text(220, 195, "Capital", 0.8, 32, "#9fdf9f")}
    ${text(220, 260, "M", 1.3, 82, "#9fdf9f")}
    ${smallText(220, 310, "Monday, Maya, Mars", 1.8)}
    ${text(535, 220, ".", 2.4, 92, "#f5f5f0")}
    ${text(650, 220, "?", 3.0, 92, "#8bd3dd")}
    ${text(765, 220, "!", 3.6, 92, "#f4a6b8")}
    ${text(650, 315, "end marks", 4.2, 28)}
    ${path("M320 430 L880 430", 5.0, 0.8, "#f3d56b", 7)}
    ${text(600, 400, "pen, snack, and hat", 5.8, 32, "#f3d56b")}
    ${text(600, 520, "On Monday, Leo asked, Where is my pencil?", 6.8, 30)}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Repair the sentence", 0, 32)}
      ${text(600, 190, "on monday leo asked where is my pencil", 0, 28, "#f4a6b8")}
      ${path("M215 215 L985 215", 0, 0.01, "#f4a6b8", 6)}
      ${path("M600 270 L600 338", 0, 0.01, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${text(600, 405, "On Monday, Leo asked, Where is my pencil?", 0, 30, "#9fdf9f")}
      ${text(330, 500, "capital", 0, 23, "#9fdf9f")}
      ${text(600, 500, "commas", 0, 23, "#f3d56b")}
      ${text(870, 500, "question mark", 0, 23, "#8bd3dd")}
    </g>
  `);
}

function grammarParagraphRepairSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Paragraph Repair Checklist", 0.1, 32)}
    ${rect(210, 130, 780, 430, 0.7, 1.0, "#8bd3dd", 6)}
    ${circle(300, 220, 24, 1.6, 0.35, "#9fdf9f", 6)}
    ${text(350, 228, "Subject + predicate?", 2.0, 27, "#9fdf9f", "start")}
    ${circle(300, 310, 24, 2.8, 0.35, "#f3d56b", 6)}
    ${text(350, 318, "Pronouns clear?", 3.2, 27, "#f3d56b", "start")}
    ${circle(300, 400, 24, 4.0, 0.35, "#f4a6b8", 6)}
    ${text(350, 408, "Details helpful?", 4.4, 27, "#f4a6b8", "start")}
    ${circle(300, 490, 24, 5.2, 0.35, "#f5f5f0", 6)}
    ${text(350, 498, "Capitals and punctuation?", 5.6, 27, "#f5f5f0", "start")}
    ${path("M270 218 L295 242 L340 190", 6.3, 0.55, "#9fdf9f", 7)}
    ${path("M270 308 L295 332 L340 280", 6.9, 0.55, "#f3d56b", 7)}
    ${path("M270 398 L295 422 L340 370", 7.5, 0.55, "#f4a6b8", 7)}
    ${path("M270 488 L295 512 L340 460", 8.1, 0.55, "#f5f5f0", 7)}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Editor mode", 0, 32)}
      ${rect(165, 160, 870, 110, 0, 0.01, "#f4a6b8", 5)}
      ${text(600, 225, "Ran through the park.", 0, 31, "#f4a6b8")}
      ${text(600, 315, "Who ran?", 0, 34, "#f3d56b")}
      ${path("M600 345 L600 405", 0, 0.01, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${rect(165, 430, 870, 110, 0, 0.01, "#9fdf9f", 5)}
      ${text(600, 495, "Maya ran through the park.", 0, 31, "#9fdf9f")}
      ${smallText(600, 585, "Add the missing subject first.", 0)}
    </g>
  `);
}

function grammarRecapQuizSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Grammar Power-Up Quiz", 0.1, 32)}
    ${text(600, 135, "The tiny robot danced happily beside the desk.", 0.8, 30)}
    ${wordBox(105, 230, "robot", 1.5, "#9fdf9f", 145)}
    ${smallText(177, 315, "noun", 2.0, "#9fdf9f")}
    ${wordBox(310, 230, "danced", 2.6, "#f3d56b", 150)}
    ${smallText(385, 315, "verb", 3.1, "#f3d56b")}
    ${wordBox(520, 230, "tiny", 3.7, "#8bd3dd", 130)}
    ${smallText(585, 315, "adjective", 4.2, "#8bd3dd")}
    ${wordBox(710, 230, "happily", 4.8, "#f4a6b8", 160)}
    ${smallText(790, 315, "adverb", 5.3, "#f4a6b8")}
    ${wordBox(930, 230, "beside", 5.9, "#f5f5f0", 150)}
    ${smallText(1005, 315, "preposition", 6.4)}
    ${path("M250 460 C390 390 520 390 660 460", 7.0, 0.8, "#f5f5f0", 6, 'marker-end="url(#arrowHead)"')}
    ${text(455, 510, "and", 7.7, 42, "#f3d56b")}
    ${text(600, 600, "Grammar helps ideas travel clearly.", 8.5, 31)}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Final toolkit", 0, 32)}
      ${wordBox(120, 180, "sentence", 0, "#f5f5f0", 170)}
      ${wordBox(330, 180, "noun", 0, "#9fdf9f", 130)}
      ${wordBox(500, 180, "verb", 0, "#f3d56b", 130)}
      ${wordBox(670, 180, "adjective", 0, "#8bd3dd", 170)}
      ${wordBox(880, 180, "adverb", 0, "#f4a6b8", 150)}
      ${wordBox(220, 340, "preposition", 0, "#f5f5f0", 210)}
      ${wordBox(495, 340, "conjunction", 0, "#f3d56b", 210)}
      ${wordBox(770, 340, "punctuation", 0, "#9fdf9f", 210)}
      ${text(600, 560, "Use the right tool to make meaning clear.", 0, 31)}
    </g>
  `);
}

function formatTime(value) {
  const seconds = Math.max(0, Math.round(Number(value) || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function renderPlayButton(state) {
  const labels = {
    play: "Start lesson",
    pause: "Pause lesson",
    resume: "Resume lesson",
    replay: "Replay lesson"
  };
  playButton.className = `primary-control icon-control ${state}-state`;
  playButton.setAttribute("aria-label", labels[state] || labels.play);
  playButton.innerHTML = `<span class="control-icon ${state}-icon" aria-hidden="true"></span><span class="control-label">${state === "replay" ? "Replay" : state === "pause" ? "Pause" : state === "resume" ? "Resume" : "Play"}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
