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
const episodeTabs = document.querySelector("#episodeTabs");
const timeline = document.querySelector("#timeline");
const elapsedTime = document.querySelector("#elapsedTime");
const remainingTime = document.querySelector("#remainingTime");
const totalTime = document.querySelector("#totalTime");

const COURSE_RELEASE = "maths-training-002";
const AUDIO_PLAYBACK_RATE = 1.1;
const speech = window.speechSynthesis;

const episodes = [
  { episode: 1, title: "Episode 1", subtitle: "Arithmetic logic", durationLabel: "10 min" },
  { episode: 2, title: "Episode 2", subtitle: "Visual models", durationLabel: "10 min" },
  { episode: 3, title: "Episode 3", subtitle: "Spatial cycles", durationLabel: "10 min" }
];

const allScenes = [
  {
    id: "included-average",
    episode: 1,
    title: "Included Average",
    point: "Use totals to find the extra number that changed the average.",
    audio: "assets/audio/01-included-average.mp3",
    duration: 54,
    beats: [
      { at: 0, state: "setup" },
      { at: 6, state: "model" },
      { at: 18, state: "calculate" },
      { at: 34, state: "discover" },
      { at: 44, state: "apply" }
    ],
    captions: [
      [0, "The average is a total shared equally."],
      [6, "Seven numbers average 42, so the first total is 7 x 42."],
      [18, "After one more number is included, eight numbers average 45."],
      [34, "The included number is the difference between the new total and the old total."],
      [44, "The invariant idea: totals explain averages."]
    ],
    script: "Welcome to Scholarship Maths Lab. First, we solve an included average problem. Seven numbers have an average of forty two. One more number is included, and the new average becomes forty five. The trap is to stare at the averages. Instead, Professor Pixel says: averages are really totals wearing a disguise. Seven numbers averaging forty two make a total of seven times forty two, which is two hundred and ninety four. Now eight numbers averaging forty five make a total of eight times forty five, which is three hundred and sixty. The only new thing added was the mystery number. So subtract the old total from the new total. Three hundred and sixty minus two hundred and ninety four equals sixty six. The mystery number is sixty six. Whenever an average changes after a new value joins, compare the before-total and after-total."
  },
  {
    id: "ducks-rabbits",
    episode: 1,
    title: "Ducks And Rabbits",
    point: "Build one unit group, then divide the invariant total legs.",
    audio: "assets/audio/02-ducks-rabbits.mp3",
    duration: 49,
    beats: [
      { at: 0, state: "setup" },
      { at: 6, state: "model" },
      { at: 18, state: "calculate" },
      { at: 32, state: "discover" },
      { at: 41, state: "apply" }
    ],
    captions: [
      [0, "There are four times as many ducks as rabbits."],
      [6, "One unit group is 1 rabbit plus 4 ducks."],
      [18, "Each group has 4 rabbit legs plus 8 duck legs, so 12 legs."],
      [32, "The total legs are invariant: 1404."],
      [41, "1404 divided by 12 gives 117 groups, so 117 rabbits."]
    ],
    script: "Next comes the ducks and rabbits leg-balance dilemma. The farm has four times as many ducks as rabbits, and there are one thousand four hundred and four legs altogether. Guessing would be slow. Instead, make one unit group. If there is one rabbit, there must be four ducks. The rabbit has four legs. Four ducks have eight legs. One full group therefore has twelve legs. The total number of legs is our invariant: it stays fixed, so we highlight it in gold. Now divide the total legs by the legs in one group. One thousand four hundred and four divided by twelve equals one hundred and seventeen. There are one hundred and seventeen groups, and each group has one rabbit, so there are one hundred and seventeen rabbits."
  },
  {
    id: "fraction-remainder",
    episode: 2,
    title: "Fraction Remaining Model",
    point: "When a fraction is taken from what is left, redraw the remaining bar.",
    audio: "assets/audio/03-fraction-remainder.mp3",
    duration: 49,
    beats: [
      { at: 0, state: "setup" },
      { at: 6, state: "model" },
      { at: 18, state: "calculate" },
      { at: 32, state: "discover" },
      { at: 41, state: "apply" }
    ],
    captions: [
      [0, "Sarah starts with 24 stickers."],
      [6, "She gives 1/3 away, leaving 16."],
      [18, "Now take 1/4 of the remainder, not 1/4 of 24."],
      [32, "The remaining 16 breaks into four equal parts of 4."],
      [41, "Three parts stay with Sarah, so she has 12 stickers."]
    ],
    script: "Episode two is about visual heuristic models. Sarah has twenty four stickers. She gives one third to her brother. Then she gives one quarter of what is left to her sister. The key phrase is: of what is left. Draw one clean bar for twenty four. Split it into three equal parts. One part goes away, so eight stickers are given to her brother. Two parts remain, which is sixteen stickers. Now redraw that remaining block as the new whole. Slice the sixteen into four equal parts. One fourth is four stickers for her sister. Three parts remain. Three times four equals twelve. Sarah has twelve stickers left. When the question says of the remainder, redraw the bar before taking the next fraction."
  },
  {
    id: "excess-shortage",
    episode: 2,
    title: "Excess And Shortage",
    point: "Compare two sharing plans by turning shortage and excess into one total gap.",
    audio: "assets/audio/04-excess-shortage.mp3",
    duration: 50,
    beats: [
      { at: 0, state: "setup" },
      { at: 6, state: "model" },
      { at: 18, state: "calculate" },
      { at: 32, state: "discover" },
      { at: 42, state: "apply" }
    ],
    captions: [
      [0, "Seven each is short by 6. Four each has 3 left over."],
      [6, "The two plans are 3 erasers apart for each boy."],
      [18, "The whole gap is 6 plus 3, which equals 9."],
      [32, "9 divided by 3 gives 3 boys."],
      [42, "Check: 3 boys getting 7 each would need 21, short by 6, so there are 15 erasers."]
    ],
    script: "Now Professor Pixel shows the excess and shortage method. If each boy gets seven erasers, there is a shortage of six. If each boy gets four erasers, there is an excess of three. The individual difference between the two plans is seven minus four, which is three erasers per boy. The total gap is not just six and not just three. It is the shortage plus the excess, so six plus three equals nine. If the total gap is nine, and each boy accounts for three of that gap, then there are nine divided by three boys. That gives three boys. To find the packet size, use either plan. Three boys getting seven each would need twenty one, but we are short by six, so the packet has fifteen erasers."
  },
  {
    id: "cube-joints",
    episode: 3,
    title: "Glued Cube Faces",
    point: "Each glued joint hides exactly two faces.",
    audio: "assets/audio/05-cube-joints.mp3",
    duration: 42,
    beats: [
      { at: 0, state: "setup" },
      { at: 5, state: "model" },
      { at: 15, state: "calculate" },
      { at: 27, state: "discover" },
      { at: 35, state: "apply" }
    ],
    captions: [
      [0, "Nine separate cubes would have 9 x 6 faces."],
      [5, "In a straight line of nine cubes, there are eight glued joints."],
      [15, "Each joint hides two touching faces."],
      [27, "Eight joints times two hidden faces gives 16 hidden faces."],
      [35, "Count joints, not cubes, when objects are glued face-to-face."]
    ],
    script: "Episode three starts with spatial visualization. Nine identical cubes are glued face to face in a straight line. How many faces are hidden? A single cube has six faces. Nine separate cubes would have nine times six, or fifty four faces. But glued cubes hide the touching faces. In a line of nine cubes, the number of joints is one less than the number of cubes. So there are eight joints. Each joint hides two faces: the right face of one cube and the left face of the next cube. Eight joints times two hidden faces gives sixteen hidden faces. The shortcut is simple: for a straight chain, count the joins, then multiply by two."
  },
  {
    id: "calendar-cycle",
    episode: 3,
    title: "Calendar Modulo Loop",
    point: "Use cycles of seven days; the remainder tells the landing day.",
    audio: "assets/audio/06-calendar-cycle.mp3",
    duration: 42,
    beats: [
      { at: 0, state: "setup" },
      { at: 5, state: "model" },
      { at: 15, state: "calculate" },
      { at: 27, state: "discover" },
      { at: 35, state: "apply" }
    ],
    captions: [
      [0, "August 11 is Wednesday. What day is September 21?"],
      [5, "Count days forward: 20 days left in August plus 21 days in September."],
      [15, "The total jump is 41 days."],
      [27, "41 divided by 7 gives 5 full weeks and remainder 6."],
      [35, "Six days after Wednesday is Tuesday."]
    ],
    script: "Finally, we solve a calendar cycle. If August eleventh is a Wednesday, what day of the week is September twenty first? Fingers are easy to lose track of, so use a seven day loop. From August eleventh to the end of August there are twenty days left. Then add twenty one days in September. The total jump is forty one days. Days repeat every seven, so divide forty one by seven. That gives five full weeks with a remainder of six. Full weeks bring us back to Wednesday, so only the remainder matters. Count six steps forward from Wednesday: Thursday, Friday, Saturday, Sunday, Monday, Tuesday. The answer is Tuesday."
  }
];

let activeEpisode = 1;
let scenes = [];
let sceneOffsets = [];
let activeSceneIndex = 0;
let playing = false;
let startedAt = 0;
let elapsedOffset = 0;
let courseElapsedAtSceneStart = 0;
let rafId = 0;
let captionTimer = 0;
let utterance = null;
let audio = null;
let captionsVisible = false;

const renderers = {
  "included-average": renderIncludedAverage,
  "ducks-rabbits": renderDucksRabbits,
  "fraction-remainder": renderFractionRemainder,
  "excess-shortage": renderExcessShortage,
  "cube-joints": renderCubeJoints,
  "calendar-cycle": renderCalendarCycle
};

function formatTime(seconds) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEpisodeTabs() {
  episodeTabs.innerHTML = episodes.map((episode) => `
    <button class="ladder-tab ${episode.episode === activeEpisode ? "active" : ""}" type="button" data-episode="${episode.episode}">
      <span>${episode.episode}</span>
      <strong>${episode.title}</strong>
      <small>${episode.subtitle} - ${episode.durationLabel}</small>
    </button>
  `).join("");
}

function setupEpisode(episode, sceneIndex = 0) {
  activeEpisode = episode;
  scenes = allScenes.filter((scene) => scene.episode === episode);
  sceneOffsets = scenes.reduce((acc, scene, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + scenes[index - 1].duration);
    return acc;
  }, []);
  timeline.max = String(courseTotal());
  totalTime.textContent = `${formatTime(courseTotal())} total`;
  renderEpisodeTabs();
  renderSceneList();
  loadScene(sceneIndex, 0, false);
}

function renderSceneList() {
  sceneList.innerHTML = scenes.map((scene, index) => `
    <button class="scene-button ${index === activeSceneIndex ? "active" : ""}" type="button" data-scene="${index}">
      <span>${index + 1}</span>
      <span><strong>${escapeHtml(scene.title)}</strong><small>${escapeHtml(scene.point)}</small></span>
      <small>${formatTime(scene.duration)}</small>
    </button>
  `).join("");
}

function loadScene(index, offsetSeconds = 0, autoPlay = playing) {
  stopSpeech();
  stopAudio();
  window.cancelAnimationFrame(rafId);
  activeSceneIndex = Math.max(0, Math.min(scenes.length - 1, index));
  const scene = scenes[activeSceneIndex];
  const offset = Math.max(0, Math.min(scene.duration - 0.5, offsetSeconds));
  elapsedOffset = offset;
  startedAt = performance.now() - offset * 1000;
  courseElapsedAtSceneStart = sceneOffsets[activeSceneIndex];
  sceneTitle.textContent = scene.title;
  sceneCount.textContent = `Episode ${activeEpisode} - Module ${activeSceneIndex + 1} of ${scenes.length}`;
  sceneDuration.textContent = formatTime(scene.duration);
  lessonPoint.textContent = scene.point;
  captionText.textContent = captionFor(scene, offset);
  svg.innerHTML = renderers[scene.id](scene);
  prepareAudio(scene);
  updateBoard(scene, offset);
  renderSceneList();
  updateControls();
  updateTimeline();
  if (autoPlay) startPlayback();
}

function startPlayback() {
  const scene = scenes[activeSceneIndex];
  playing = true;
  board.classList.add("animating");
  board.classList.remove("paused", "finished");
  startedAt = performance.now() - elapsedOffset * 1000;
  const audioAttempt = playSceneAudio(scene, elapsedOffset);
  if (audioAttempt) {
    audioAttempt.catch(() => speakScene(scene, elapsedOffset));
  } else {
    speakScene(scene, elapsedOffset);
  }
  updateControls();
  startCaptionLoop();
  tick();
}

function pausePlayback() {
  playing = false;
  elapsedOffset = currentSceneTime();
  board.classList.add("paused");
  if (audio) audio.pause();
  else pauseSpeech();
  window.cancelAnimationFrame(rafId);
  updateControls();
}

function togglePlayback() {
  if (playing) pausePlayback();
  else startPlayback();
}

function playNextScene() {
  if (activeSceneIndex + 1 < scenes.length) {
    loadScene(activeSceneIndex + 1, 0, true);
    return;
  }
  playing = false;
  board.classList.add("finished");
  stopSpeech();
  stopAudio();
  updateControls();
}

function courseTotal() {
  return scenes.reduce((sum, scene) => sum + scene.duration, 0);
}

function currentCourseTime() {
  return Math.min(courseTotal(), sceneOffsets[activeSceneIndex] + Math.min(scenes[activeSceneIndex].duration, currentSceneTime()));
}

function currentSceneTime() {
  if (audio && Number.isFinite(audio.currentTime) && audio.readyState > 0) return audio.currentTime;
  if (!playing) return elapsedOffset;
  return Math.max(0, (performance.now() - startedAt) / 1000);
}

function seekTo(courseSeconds) {
  const target = Math.max(0, Math.min(courseTotal(), courseSeconds));
  let index = scenes.length - 1;
  for (let i = 0; i < scenes.length; i += 1) {
    if (target < sceneOffsets[i] + scenes[i].duration) {
      index = i;
      break;
    }
  }
  loadScene(index, target - sceneOffsets[index], playing);
}

function rewind() {
  seekTo(currentCourseTime() - 15);
}

function tick() {
  if (!playing) return;
  const scene = scenes[activeSceneIndex];
  const seconds = currentSceneTime();
  updateBoard(scene, seconds);
  updateTimeline();
  if (seconds >= scene.duration) {
    playNextScene();
    return;
  }
  rafId = window.requestAnimationFrame(tick);
}

function updateControls() {
  const icon = playing ? "pause-icon" : "play-icon";
  const label = playing ? "Pause" : "Play";
  playButton.innerHTML = `<span class="control-icon ${icon}" aria-hidden="true"></span><span class="control-label">${label}</span>`;
  playButton.setAttribute("aria-label", playing ? "Pause lesson" : "Start lesson");
}

function updateTimeline() {
  const safe = currentCourseTime();
  timeline.value = String(Math.round(safe));
  elapsedTime.textContent = `${formatTime(safe)} elapsed`;
  remainingTime.textContent = formatTime(Math.max(0, courseTotal() - safe));
}

function startCaptionLoop() {
  window.clearTimeout(captionTimer);
  const scene = scenes[activeSceneIndex];
  const seconds = currentSceneTime();
  captionText.textContent = captionFor(scene, seconds);
  updateBoard(scene, seconds);
  captionTimer = window.setTimeout(startCaptionLoop, 500);
}

function captionFor(scene, seconds) {
  return scene.captions.reduce((current, item) => seconds >= item[0] ? item[1] : current, scene.captions[0]?.[1] || scene.point);
}

function updateBoard(scene, seconds) {
  const beatIndex = activeBeatIndex(scene.beats, seconds);
  const states = scene.beats.slice(0, beatIndex + 1).map((beat) => beat.state);
  resetBeatClasses();
  states.forEach((state) => board.classList.add(`beat-${state}`));
  board.dataset.activeBeat = scene.beats[beatIndex]?.state || "setup";
}

function activeBeatIndex(beats, seconds) {
  let index = 0;
  beats.forEach((beat, beatIndex) => {
    if (seconds >= beat.at) index = beatIndex;
  });
  return index;
}

function resetBeatClasses() {
  [...board.classList].forEach((className) => {
    if (className.startsWith("beat-")) board.classList.remove(className);
  });
}

function speakScene(scene, offsetSeconds) {
  stopSpeech();
  if (!speech || offsetSeconds > 2) return;
  utterance = new SpeechSynthesisUtterance(scene.script);
  utterance.rate = 1.08;
  utterance.pitch = 1.04;
  utterance.volume = 1;
  utterance.onend = () => {
    if (playing && scenes[activeSceneIndex]?.id === scene.id && currentSceneTime() > scene.duration - 4) playNextScene();
  };
  speech.speak(utterance);
}

function prepareAudio(scene) {
  if (!scene.audio) return;
  audio = document.createElement("audio");
  audio.dataset.mathsTrainingAudio = scene.id;
  audio.src = scene.audio;
  audio.preload = "auto";
  audio.playbackRate = AUDIO_PLAYBACK_RATE;
  audio.volume = 1;
  audio.style.display = "none";
  document.body.append(audio);
  audio.addEventListener("ended", () => {
    if (playing && scenes[activeSceneIndex]?.id === scene.id) playNextScene();
  });
  audio.addEventListener("loadedmetadata", () => {
    if (!Number.isFinite(audio.duration) || audio.duration < 20) return;
    scene.duration = Math.ceil(audio.duration);
    renderSceneList();
    updateTimeline();
  });
}

function playSceneAudio(scene, offsetSeconds) {
  if (!scene.audio) return null;
  if (!audio) prepareAudio(scene);
  if (!audio) return null;
  try {
    const safeDuration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : scene.duration;
    audio.playbackRate = AUDIO_PLAYBACK_RATE;
    audio.volume = 1;
    audio.currentTime = Math.max(0, Math.min(offsetSeconds, Math.max(0, safeDuration - 0.2)));
    return audio.play();
  } catch {
    return null;
  }
}

function stopAudio() {
  if (!audio) return;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  audio.remove();
  audio = null;
}

function pauseSpeech() {
  if (speech?.speaking) speech.pause();
}

function resumeSpeech() {
  if (speech?.paused) speech.resume();
}

function stopSpeech() {
  if (speech) speech.cancel();
  utterance = null;
}

function baseSvg(content) {
  return `
    <defs>
      <filter id="chalkRough">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" result="noise"></feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.7"></feDisplacementMap>
      </filter>
      <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f5f5f0"></path>
      </marker>
    </defs>
    ${content}
  `;
}

function line(x1, y1, x2, y2, delay = 0, duration = 1, color = "#f5f5f0", width = 5, extra = "") {
  return `<line class="draw-path" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" pathLength="100" style="--delay:${delay}s;--dur:${duration}s" ${extra}></line>`;
}

function path(d, delay = 0, duration = 1, color = "#f5f5f0", width = 5, extra = "") {
  return `<path class="draw-path" d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" pathLength="100" style="--delay:${delay}s;--dur:${duration}s" ${extra}></path>`;
}

function rect(x, y, width, height, delay = 0, duration = 1, color = "#f5f5f0", strokeWidth = 5, fill = "transparent") {
  return `<rect class="draw-shape" x="${x}" y="${y}" width="${width}" height="${height}" rx="18" fill="${fill}" stroke="${color}" stroke-width="${strokeWidth}" pathLength="100" style="--delay:${delay}s;--dur:${duration}s"></rect>`;
}

function circle(cx, cy, r, delay = 0, duration = 1, color = "#f5f5f0", strokeWidth = 5, fill = "transparent") {
  return `<circle class="draw-shape" cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${strokeWidth}" pathLength="100" style="--delay:${delay}s;--dur:${duration}s"></circle>`;
}

function text(x, y, value, delay = 0, size = 28, color = "#f5f5f0", anchor = "middle") {
  return `<text class="draw-text" x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Comic Sans MS, Caveat, cursive" font-size="${size}" font-weight="800" style="--delay:${delay}s">${escapeHtml(value)}</text>`;
}

function smallText(x, y, value, delay = 0, color = "#f5f5f0") {
  return text(x, y, value, delay, 22, color);
}

function multiText(x, y, lines, delay, size = 25, color = "#f5f5f0") {
  return lines.map((lineText, index) => text(x, y + index * (size + 9), lineText, delay + index * 0.18, size, color)).join("");
}

function invariantBox(x, y, label, value, delay = 0) {
  return `
    ${rect(x, y, 245, 86, delay, 0.8, "#f3d56b", 5, "rgba(243,213,107,0.1)")}
    ${smallText(x + 122, y + 32, label, delay + 0.6, "#f3d56b")}
    ${text(x + 122, y + 68, value, delay + 0.8, 30, "#f3d56b")}
  `;
}

function renderIncludedAverage() {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 60, "Included Average", 0.1, 36)}
      ${multiText(600, 118, ["7 numbers average 42", "add 1 number -> new average 45"], 0.6, 27)}
      ${line(250, 330, 950, 330, 1.1, 0.8, "#8bd3dd", 7)}
      ${path("M600 330 L600 205", 1.8, 0.8, "#8bd3dd", 7)}
      ${circle(600, 185, 18, 2.4, 0.5, "#8bd3dd", 6)}
    </g>
    <g class="math-phase phase-model">
      ${[0,1,2,3,4,5,6].map((i) => circle(270 + i * 72, 420, 28, 0.2 + i * 0.12, 0.45, "#8bd3dd", 5, "rgba(139,211,221,0.12)")).join("")}
      ${smallText(486, 486, "7 values", 1.2, "#8bd3dd")}
      ${circle(830, 420, 40, 1.4, 0.8, "#f3d56b", 6, "rgba(243,213,107,0.14)")}
      ${text(830, 430, "X", 2.0, 34, "#f3d56b")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(170, 200, 310, 118, 0.1, 0.8, "#9fdf9f", 5)}
      ${text(325, 248, "old total", 0.8, 27, "#9fdf9f")}
      ${text(325, 292, "7 x 42 = 294", 1.2, 30, "#9fdf9f")}
      ${rect(720, 200, 310, 118, 1.8, 0.8, "#f3d56b", 5)}
      ${text(875, 248, "new total", 2.5, 27, "#f3d56b")}
      ${text(875, 292, "8 x 45 = 360", 2.9, 30, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${line(480, 530, 720, 530, 0.1, 0.8, "#f5f5f0", 6, 'marker-end="url(#arrowHead)"')}
      ${text(600, 590, "360 - 294 = 66", 0.9, 38, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(478, 100, "answer", "X = 66", 0.2)}
    </g>
  `);
}

function renderDucksRabbits() {
  const duck = (x, y, delay) => `
    ${path(`M${x - 54} ${y + 8} C${x - 40} ${y - 20} ${x + 5} ${y - 26} ${x + 38} ${y - 6} C${x + 52} ${y + 2} ${x + 54} ${y + 24} ${x + 30} ${y + 36} C${x - 8} ${y + 55} ${x - 52} ${y + 42} ${x - 62} ${y + 18} C${x - 66} ${y + 12} ${x - 62} ${y + 8} ${x - 54} ${y + 8}`, delay, 0.8, "#f3d56b", 4)}
    ${path(`M${x + 32} ${y - 10} C${x + 42} ${y - 34} ${x + 70} ${y - 28} ${x + 72} ${y - 4} C${x + 72} ${y + 14} ${x + 48} ${y + 14} ${x + 38} ${y + 2}`, delay + 0.28, 0.55, "#f3d56b", 4)}
    ${path(`M${x + 70} ${y - 3} L${x + 93} ${y + 6} L${x + 71} ${y + 16}`, delay + 0.75, 0.35, "#f4a6b8", 4)}
    ${path(`M${x - 18} ${y + 46} L${x - 18} ${y + 70} M${x + 20} ${y + 43} L${x + 20} ${y + 70}`, delay + 1.0, 0.45, "#f3d56b", 3)}
  `;
  const rabbit = (x, y, delay) => `
    ${path(`M${x - 72} ${y + 42} C${x - 70} ${y - 18} ${x - 26} ${y - 66} ${x + 36} ${y - 48} C${x + 82} ${y - 34} ${x + 90} ${y + 26} ${x + 48} ${y + 54} C${x + 8} ${y + 82} ${x - 60} ${y + 72} ${x - 72} ${y + 42}`, delay, 0.9, "#9fdf9f", 4)}
    ${path(`M${x - 18} ${y - 56} C${x - 38} ${y - 112} ${x - 30} ${y - 154} ${x - 4} ${y - 126} C${x + 0} ${y - 96} ${x - 2} ${y - 78} ${x + 2} ${y - 54}`, delay + 0.32, 0.6, "#9fdf9f", 4)}
    ${path(`M${x + 12} ${y - 52} C${x + 22} ${y - 110} ${x + 46} ${y - 140} ${x + 58} ${y - 106} C${x + 46} ${y - 84} ${x + 38} ${y - 66} ${x + 36} ${y - 44}`, delay + 0.58, 0.6, "#9fdf9f", 4)}
    ${circle(x + 54, y - 32, 7, delay + 1.0, 0.25, "#f5f5f0", 3, "rgba(245,245,240,0.05)")}
    ${path(`M${x - 40} ${y + 64} C${x - 62} ${y + 90} ${x - 100} ${y + 84} ${x - 92} ${y + 62} M${x + 40} ${y + 60} C${x + 70} ${y + 86} ${x + 108} ${y + 78} ${x + 92} ${y + 56}`, delay + 1.15, 0.55, "#9fdf9f", 4)}
  `;
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 62, "Ducks And Rabbits", 0.1, 36)}
      ${text(600, 122, "4 ducks for every 1 rabbit", 0.8, 29)}
      ${invariantBox(478, 168, "invariant", "1404 legs", 1.2)}
    </g>
    <g class="math-phase phase-model">
      ${rect(120, 245, 960, 300, 0.1, 0.9, "#8bd3dd", 5)}
      ${smallText(260, 286, "1 rabbit", 0.7, "#9fdf9f")}
      ${smallText(705, 286, "4 ducks", 0.95, "#f3d56b")}
      ${rabbit(260, 410, 1.1)}
      ${duck(510, 410, 2.1)}${duck(650, 410, 2.45)}${duck(790, 410, 2.8)}${duck(930, 410, 3.15)}
      ${text(600, 610, "one complete unit group", 3.9, 31, "#8bd3dd")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(165, 170, 280, 76, 0.2, 0.65, "#9fdf9f", 4)}
      ${text(305, 218, "rabbit legs = 4", 0.85, 25, "#9fdf9f")}
      ${rect(755, 170, 280, 76, 1.25, 0.65, "#f3d56b", 4)}
      ${text(895, 218, "duck legs = 8", 1.9, 25, "#f3d56b")}
      ${path("M448 208 C520 174 680 174 752 208", 2.45, 0.7, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${text(600, 276, "12 legs per group", 3.1, 34, "#f4a6b8")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(380, 618, 440, 72, 0.2, 0.7, "#f3d56b", 4)}
      ${text(600, 665, "1404 / 12 = 117 groups", 0.9, 35, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(478, 80, "answer", "117 rabbits", 0.2)}
    </g>
  `);
}

function renderFractionRemainder() {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 60, "Fraction Remaining Model", 0.1, 35)}
      ${text(600, 118, "24 stickers: give 1/3, then 1/4 of what is left", 0.7, 27)}
    </g>
    <g class="math-phase phase-model">
      ${rect(160, 220, 880, 100, 0.1, 0.9, "#8bd3dd", 5)}
      ${line(453, 220, 453, 320, 1.0, 0.45, "#8bd3dd", 4)}
      ${line(746, 220, 746, 320, 1.15, 0.45, "#8bd3dd", 4)}
      ${text(306, 280, "8", 1.5, 34, "#f4a6b8")}
      ${text(600, 280, "8", 1.65, 34, "#9fdf9f")}
      ${text(894, 280, "8", 1.8, 34, "#9fdf9f")}
      ${path("M306 342 C330 382 408 382 432 342", 2.2, 0.7, "#f4a6b8", 5)}
      ${smallText(370, 405, "brother gets 8", 2.9, "#f4a6b8")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(380, 455, 440, 86, 0.1, 0.8, "#9fdf9f", 5)}
      ${[1,2,3].map((i) => line(380 + i * 110, 455, 380 + i * 110, 541, 0.9 + i * 0.18, 0.35, "#9fdf9f", 3)).join("")}
      ${text(600, 510, "16 split into 4 parts", 1.7, 28, "#9fdf9f")}
    </g>
    <g class="math-phase phase-discover">
      ${text(600, 600, "1 part = 4, so 3 parts = 12", 0.4, 36, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(478, 342, "left with", "12 stickers", 0.2)}
    </g>
  `);
}

function renderExcessShortage() {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 60, "Excess And Shortage", 0.1, 36)}
      ${multiText(600, 118, ["7 each -> shortage of 6", "4 each -> excess of 3"], 0.7, 28)}
    </g>
    <g class="math-phase phase-model">
      ${rect(170, 245, 830, 70, 0.2, 0.8, "#f4a6b8", 5)}
      ${text(245, 292, "7 each", 0.9, 27, "#f4a6b8")}
      ${line(865, 230, 940, 230, 1.4, 0.5, "#f4a6b8", 5)}
      ${smallText(902, 215, "short 6", 1.9, "#f4a6b8")}
      ${rect(170, 405, 610, 70, 2.2, 0.8, "#9fdf9f", 5)}
      ${text(245, 452, "4 each", 2.9, 27, "#9fdf9f")}
      ${line(780, 440, 860, 440, 3.4, 0.5, "#9fdf9f", 5)}
      ${smallText(820, 425, "extra 3", 3.9, "#9fdf9f")}
    </g>
    <g class="math-phase phase-calculate">
      ${text(600, 355, "individual difference: 7 - 4 = 3", 0.3, 31, "#8bd3dd")}
      ${text(600, 530, "total gap: 6 + 3 = 9", 1.4, 34, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${text(600, 608, "9 / 3 = 3 boys", 0.3, 39, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(478, 160, "packet", "15 erasers", 0.2)}
    </g>
  `);
}

function renderCubeJoints() {
  const cube = (x, y, delay) => `
    ${rect(x, y, 76, 76, delay, 0.45, "#8bd3dd", 4, "rgba(139,211,221,0.08)")}
    ${path(`M${x} ${y} L${x + 24} ${y - 22} L${x + 100} ${y - 22} L${x + 76} ${y}`, delay + 0.18, 0.35, "#8bd3dd", 3)}
    ${path(`M${x + 76} ${y} L${x + 100} ${y - 22} L${x + 100} ${y + 54} L${x + 76} ${y + 76}`, delay + 0.28, 0.35, "#8bd3dd", 3)}
  `;
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 62, "Glued Cube Faces", 0.1, 36)}
      ${text(600, 122, "9 cubes in a straight line", 0.8, 29)}
      ${text(600, 176, "separate faces: 9 x 6 = 54", 1.4, 29, "#9fdf9f")}
    </g>
    <g class="math-phase phase-model">
      ${[0,1,2,3,4,5,6,7,8].map((i) => cube(130 + i * 100, 330, 0.1 + i * 0.12)).join("")}
      ${[1,2,3,4,5,6,7,8].map((i) => line(130 + i * 100, 300, 130 + i * 100, 430, 1.4 + i * 0.08, 0.25, "#27d3a2", 5)).join("")}
      ${smallText(600, 500, "8 glued joints", 2.4, "#27d3a2")}
    </g>
    <g class="math-phase phase-calculate">
      ${text(600, 555, "each joint hides 2 faces", 0.3, 33, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${text(600, 615, "8 x 2 = 16 hidden faces", 0.4, 38, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(478, 205, "answer", "16 hidden", 0.2)}
    </g>
  `);
}

function renderCalendarCycle() {
  const days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  const dayNodes = days.map((day, i) => {
    const angle = (-90 + i * (360 / 7)) * Math.PI / 180;
    const x = 600 + Math.cos(angle) * 188;
    const y = 340 + Math.sin(angle) * 188;
    const color = day === "Tue" ? "#f3d56b" : "#8bd3dd";
    return `${circle(x.toFixed(1), y.toFixed(1), 42, 0.2 + i * 0.1, 0.4, color, 5, "rgba(139,211,221,0.08)")}${text(x.toFixed(1), (y + 10).toFixed(1), day, 0.7 + i * 0.1, 25, color)}`;
  }).join("");
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 62, "Calendar Modulo Loop", 0.1, 36)}
      ${text(600, 120, "August 11 is Wednesday", 0.7, 29)}
    </g>
    <g class="math-phase phase-model">
      ${circle(600, 340, 210, 0.1, 1.0, "#8bd3dd", 5)}
      ${dayNodes}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(110, 245, 260, 92, 0.2, 0.8, "#9fdf9f", 5)}
      ${text(240, 283, "Aug: 31 - 11", 0.9, 25, "#9fdf9f")}
      ${text(240, 318, "= 20", 1.2, 30, "#9fdf9f")}
      ${rect(830, 245, 260, 92, 1.6, 0.8, "#f3d56b", 5)}
      ${text(960, 283, "Sept: 21", 2.3, 25, "#f3d56b")}
      ${text(960, 318, "total 41", 2.6, 30, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${text(600, 585, "41 / 7 = 5 weeks remainder 6", 0.3, 34, "#f5f5f0")}
      ${path("M600 130 C848 166 898 438 712 524", 1.0, 1.2, "#f3d56b", 6, 'marker-end="url(#arrowHead)"')}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(478, 238, "landing day", "Tuesday", 0.2)}
    </g>
  `);
}

playButton.addEventListener("click", () => {
  if (!playing && speech?.paused) resumeSpeech();
  togglePlayback();
});
rewindButton.addEventListener("click", rewind);
ccButton.addEventListener("click", () => {
  captionsVisible = !captionsVisible;
  captionText.classList.toggle("hidden", !captionsVisible);
  ccButton.classList.toggle("active", captionsVisible);
  ccButton.setAttribute("aria-expanded", String(captionsVisible));
});
episodeTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-episode]");
  if (!button) return;
  playing = false;
  setupEpisode(Number(button.dataset.episode), 0);
});
sceneList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scene]");
  if (!button) return;
  loadScene(Number(button.dataset.scene), 0, true);
});
timeline.addEventListener("input", () => {
  updateTimeline();
});
timeline.addEventListener("change", () => {
  seekTo(Number(timeline.value));
});

setupEpisode(1, 0);
console.info(`Maths Training loaded: ${COURSE_RELEASE}`);
