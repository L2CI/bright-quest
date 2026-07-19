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
const lessonListButton = document.querySelector("#lessonListButton");
const lessonDrawer = document.querySelector("#lessonDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const drawerCloseButton = document.querySelector("#drawerCloseButton");
const drawerSummary = document.querySelector("#drawerSummary");
const ladderTabs = document.querySelector("#ladderTabs");
const timeline = document.querySelector("#timeline");
const elapsedTime = document.querySelector("#elapsedTime");
const remainingTime = document.querySelector("#remainingTime");
const totalTime = document.querySelector("#totalTime");
const quizModal = document.querySelector("#quizModal");
const quizEyebrow = document.querySelector("#quizEyebrow");
const quizTitle = document.querySelector("#quizTitle");
const quizQuestions = document.querySelector("#quizQuestions");
const closeQuizButton = document.querySelector("#closeQuizButton");
const submitQuizButton = document.querySelector("#submitQuizButton");
const quizFeedback = document.querySelector("#quizFeedback");
const FREE_NAVIGATION_RELEASE = "grammar-free-navigation-001";
const DYNAMIC_BOARD_RELEASE = "grammar-dynamic-board-001";
const QUIZ_SYNC_RELEASE = "grammar-quiz-sync-002";
const COURSE_BEAT_RELEASE = "grammar-course-beats-002";

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

[
  "clauses-phrases",
  "independent-dependent",
  "relative-clauses",
  "compound-complex",
  "comma-clauses",
  "subject-verb-agreement",
  "pronoun-antecedents",
  "misplaced-modifiers",
  "parallel-structure",
  "gerunds",
  "participles",
  "infinitives",
  "active-passive",
  "subjunctive-mood",
  "appositives",
  "ellipses-omission",
  "sentence-variety",
  "grammar-editing"
].forEach((id) => {
  renderers[id] = grammarStudioSvg;
});

const grammarStudioScenes = {
  "clauses-phrases": {
    mode: "sort",
    sentence: "Under the old bridge, the river rushed.",
    tokens: [
      ["Under the old bridge", "phrase", "#8bd3dd"],
      ["the river rushed", "clause", "#f3d56b"]
    ],
    lanes: [
      { label: "phrase", copy: "adds detail, no subject + verb pair", color: "#8bd3dd" },
      { label: "clause", copy: "subject + verb", color: "#f3d56b" }
    ],
    chant: "Subject plus verb makes a clause.",
    check: "Does the group have both?"
  },
  "independent-dependent": {
    mode: "balance",
    sentence: "Because the team cheered, the coach smiled.",
    tokens: [
      ["Because the team cheered", "dependent", "#f4a6b8"],
      ["the coach smiled", "independent", "#9fdf9f"]
    ],
    lanes: [
      { label: "needs help", copy: "because makes us wait", color: "#f4a6b8" },
      { label: "stands alone", copy: "a complete thought", color: "#9fdf9f" }
    ],
    chant: "Can it stand alone?",
    check: "Remove because. Does the thought finish?"
  },
  "relative-clauses": {
    mode: "hook",
    sentence: "The book that Mia borrowed was exciting.",
    tokens: [
      ["The book", "noun", "#9fdf9f"],
      ["that Mia borrowed", "relative clause", "#8bd3dd"],
      ["was exciting", "predicate", "#f3d56b"]
    ],
    lanes: [
      { label: "noun", copy: "book", color: "#9fdf9f" },
      { label: "relative clause", copy: "tells which book", color: "#8bd3dd" }
    ],
    chant: "Who, which, that: point back to a noun.",
    check: "Which noun is described?"
  },
  "compound-complex": {
    mode: "compare",
    sentence: "I packed my bag, and I checked the map.",
    altSentence: "After I checked the map, I packed my bag.",
    tokens: [
      ["equal idea", "compound", "#8bd3dd"],
      ["dependent opener", "complex", "#f4a6b8"],
      ["main idea", "independent", "#9fdf9f"]
    ],
    chant: "Equal ideas compound. Dependent plus main is complex.",
    check: "Equal or depending?"
  },
  "comma-clauses": {
    mode: "repair",
    sentence: "Because the path was muddy we wore boots.",
    repaired: "Because the path was muddy, we wore boots.",
    tokens: [
      ["Because the path was muddy", "opening dependent clause", "#f4a6b8"],
      [",", "comma gate", "#f3d56b"],
      ["we wore boots", "main clause", "#9fdf9f"]
    ],
    chant: "Opening dependent clause? Pause with a comma.",
    check: "Where does the opening idea end?"
  },
  "subject-verb-agreement": {
    mode: "telescope",
    sentence: "The box of pencils is on the desk.",
    tokens: [
      ["The box", "true subject", "#9fdf9f"],
      ["of pencils", "extra phrase", "#8bd3dd"],
      ["is", "matching verb", "#f3d56b"]
    ],
    chant: "Ignore the extra phrase. Match the true subject.",
    check: "Box is singular, so choose is."
  },
  "pronoun-antecedents": {
    mode: "repair",
    sentence: "When Ava met Priya, she smiled.",
    repaired: "When Ava met Priya, Ava smiled.",
    tokens: [
      ["Ava", "possible antecedent", "#9fdf9f"],
      ["Priya", "possible antecedent", "#8bd3dd"],
      ["she", "unclear pronoun", "#f4a6b8"]
    ],
    chant: "A pronoun must point clearly.",
    check: "Could the reader be unsure?"
  },
  "misplaced-modifiers": {
    mode: "repair",
    sentence: "Sam saw the bus running down the path.",
    repaired: "Running down the path, Sam saw the bus.",
    tokens: [
      ["Running down the path", "describing phrase", "#f4a6b8"],
      ["Sam", "right noun", "#9fdf9f"],
      ["the bus", "wrong target", "#8bd3dd"]
    ],
    chant: "Put the describing phrase beside its noun.",
    check: "Who was running?"
  },
  "parallel-structure": {
    mode: "transform",
    sentence: "Maya said, \"I am ready.\"",
    repaired: "Maya said that she was ready.",
    tokens: [
      ["I", "speaker pronoun", "#f4a6b8"],
      ["am", "direct tense", "#f3d56b"],
      ["she", "reported pronoun", "#9fdf9f"],
      ["was", "reported tense", "#8bd3dd"]
    ],
    chant: "Exact words use quotes. Reported speech changes pronoun and tense.",
    check: "Quote exact words or report the message?"
  },
  gerunds: {
    mode: "diagram",
    sentence: "Swimming is fun.",
    tokens: [
      ["Swimming", "gerund subject", "#8bd3dd"],
      ["is", "linking verb", "#f3d56b"],
      ["fun", "complement", "#9fdf9f"]
    ],
    chant: "An ing word can act like a noun.",
    check: "Is it naming an activity?"
  },
  participles: {
    mode: "hook",
    sentence: "The barking dog woke us.",
    tokens: [
      ["barking", "participle", "#8bd3dd"],
      ["dog", "noun described", "#9fdf9f"],
      ["woke", "main verb", "#f3d56b"]
    ],
    chant: "Verb form describing a noun: participle.",
    check: "Which noun is being described?"
  },
  infinitives: {
    mode: "diagram",
    sentence: "To win requires practice.",
    tokens: [
      ["To win", "infinitive phrase", "#8bd3dd"],
      ["requires", "verb", "#f3d56b"],
      ["practice", "object", "#9fdf9f"]
    ],
    chant: "To plus verb can do a noun job.",
    check: "What job does the to phrase do?"
  },
  "active-passive": {
    mode: "transform",
    sentence: "The student solved the puzzle.",
    repaired: "The puzzle was solved by the student.",
    tokens: [
      ["student", "doer", "#9fdf9f"],
      ["solved", "action", "#f3d56b"],
      ["puzzle", "receiver", "#8bd3dd"]
    ],
    chant: "Active puts the doer first.",
    check: "Who is doing the action?"
  },
  "subjunctive-mood": {
    mode: "split",
    sentence: "If I were captain, I would choose a calm plan.",
    tokens: [
      ["If", "signal", "#f4a6b8"],
      ["were", "unreal verb", "#f3d56b"],
      ["would choose", "imagined result", "#8bd3dd"]
    ],
    chant: "Were can signal an unreal idea.",
    check: "Real situation or imagined?"
  },
  appositives: {
    mode: "hook",
    sentence: "Leo, our team captain, gave the signal.",
    tokens: [
      ["Leo", "noun", "#9fdf9f"],
      ["our team captain", "renamer", "#8bd3dd"],
      ["gave the signal", "predicate", "#f3d56b"]
    ],
    chant: "An appositive renames beside the noun.",
    check: "Which noun is being renamed?"
  },
  "ellipses-omission": {
    mode: "ghost",
    sentence: "Ava chose blue; Omar, green.",
    repaired: "Ava chose blue; Omar chose green.",
    tokens: [
      ["Ava chose blue", "full pattern", "#9fdf9f"],
      ["Omar, green", "missing verb", "#f4a6b8"],
      ["chose", "understood", "#f3d56b"]
    ],
    chant: "The pattern can carry missing words.",
    check: "What words are understood?"
  },
  "sentence-variety": {
    mode: "rhythm",
    sentence: "Rain fell. Because the wind rose, we hurried inside.",
    tokens: [
      ["Rain fell.", "short punch", "#f3d56b"],
      ["Because the wind rose", "opening clause", "#8bd3dd"],
      ["we hurried inside", "main idea", "#9fdf9f"]
    ],
    chant: "Mix sentence shapes for rhythm.",
    check: "Does every sentence start the same way?"
  },
  "grammar-editing": {
    mode: "repair",
    sentence: "Moving the clause the meaning becomes clearer.",
    repaired: "The meaning becomes clearer when we move the clause.",
    tokens: [
      ["move clause", "structure", "#8bd3dd"],
      ["choose voice", "emphasis", "#f3d56b"],
      ["trim words", "precision", "#9fdf9f"]
    ],
    chant: "Clarity first. Then rhythm. Then polish.",
    check: "What change makes meaning clearest?"
  }
};

const fallbackSceneBeats = {
  "sentence-machine": [
    { at: 0, state: "intro" },
    { at: 18, state: "subject" },
    { at: 38, state: "predicate" },
    { at: 48, state: "example" },
    { at: 70, state: "apply" }
  ],
  "nouns-pronouns": [
    { at: 0, state: "intro" },
    { at: 22, state: "number" },
    { at: 48, state: "case" },
    { at: 76, state: "apply" }
  ],
  "verbs-tense": [
    { at: 0, state: "intro" },
    { at: 22, state: "tense" },
    { at: 48, state: "jobs" },
    { at: 74, state: "apply" }
  ],
  "adjectives-adverbs": [
    { at: 0, state: "intro" },
    { at: 25, state: "adverb" },
    { at: 50, state: "compare" },
    { at: 78, state: "apply" }
  ],
  prepositions: [
    { at: 0, state: "intro" },
    { at: 20, state: "phrase" },
    { at: 42, state: "contrast" },
    { at: 66, state: "apply" }
  ],
  conjunctions: [
    { at: 0, state: "intro" },
    { at: 22, state: "connectors" },
    { at: 52, state: "comma" },
    { at: 78, state: "apply" }
  ],
  punctuation: [
    { at: 0, state: "intro" },
    { at: 24, state: "capitals" },
    { at: 52, state: "end-marks" },
    { at: 82, state: "commas" }
  ],
  "paragraph-repair": [
    { at: 0, state: "intro" },
    { at: 24, state: "sentence-check" },
    { at: 50, state: "pronoun-check" },
    { at: 78, state: "punctuation-check" }
  ],
  "recap-quiz": [
    { at: 0, state: "intro" },
    { at: 17, state: "nouns" },
    { at: 30, state: "pronoun" },
    { at: 38, state: "verbs" },
    { at: 49, state: "modifiers" },
    { at: 58, state: "phrase" },
    { at: 67, state: "conjunction" },
    { at: 80, state: "apply" }
  ]
};

const defaultStudioBeats = [
  { at: 0, state: "intro" },
  { at: 10, state: "example" },
  { at: 24, state: "diagram" },
  { at: 54, state: "check" },
  { at: 78, state: "apply" }
];

const stepMeta = [
  { step: 1, title: "Step 1", subtitle: "Foundations", durationLabel: "15 min" },
  { step: 2, title: "Step 2", subtitle: "Clause craft", durationLabel: "15 min" },
  { step: 3, title: "Step 3", subtitle: "Advanced grammar", durationLabel: "15 min" }
];

const gateQuizzes = {
  1: [
    { prompt: "In 'Maya reads the comic', what is the subject?", options: ["Maya", "reads", "the comic"], answer: 0, why: "Maya is who the sentence is about." },
    { prompt: "In 'Sam's boxes', what does the apostrophe show?", options: ["Possession", "Future tense", "A conjunction"], answer: 0, why: "The boxes belong to Sam." },
    { prompt: "In 'Omar should read', what is 'should'?", options: ["A modal helper", "A noun", "A preposition"], answer: 0, why: "Should helps the main verb read." }
  ],
  2: [
    { prompt: "Which group has both a subject and a verb?", options: ["under the old bridge", "the river rushed", "after lunch"], answer: 1, why: "River is the subject and rushed is the verb." },
    { prompt: "Which clause can stand alone?", options: ["Because the bell rang", "When the rain stopped", "The team cheered"], answer: 2, why: "The team cheered is a complete thought." },
    { prompt: "What changes when direct speech becomes indirect speech?", options: ["Pronoun and tense may change", "All nouns disappear", "No punctuation changes"], answer: 0, why: "Reported speech often shifts pronouns and tense." }
  ],
  3: [
    { prompt: "In 'Swimming is fun', what job is 'Swimming' doing?", options: ["Noun", "Main verb", "Conjunction"], answer: 0, why: "Swimming names the activity, so it works as a noun." },
    { prompt: "In 'The barking dog woke us', what does 'barking' do?", options: ["Describes dog", "Acts as the main verb", "Shows a preposition"], answer: 0, why: "Barking describes which dog." },
    { prompt: "What does active voice usually put first?", options: ["The doer", "The receiver", "The comma"], answer: 0, why: "Active voice usually starts with the person or thing doing the action." }
  ]
};

let allScenes = [];
let scenes = [];
let sceneOffsets = [];
let activeSceneIndex = 0;
let activeStep = 1;
let audio = null;
let playing = false;
let completed = false;
let captionTimer = null;
let rafId = null;
let courseElapsedAtSceneStart = 0;
let sceneStartedAt = 0;
let sceneElapsedOffset = 0;
let captionsVisible = false;
let activeBeatKey = "";
let lessonDrawerOpen = false;
let ladderProgress = loadLadderProgress();

init();

async function init() {
  allScenes = await fetch("./lesson-scripts.json").then((response) => response.json());
  switchStep(1, false);
}

function switchStep(step, autoplay = false) {
  stopFrameLoop();
  if (audio) audio.pause();
  activeStep = step;
  scenes = allScenes.filter((scene) => (scene.step || 1) === step);
  sceneOffsets = scenes.reduce((acc, scene, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + scenes[index - 1].duration);
    return acc;
  }, []);
  const total = courseTotal();
  timeline.max = String(total);
  totalTime.textContent = `${formatTime(total)} total`;
  remainingTime.textContent = formatTime(total);
  completed = false;
  renderLadderTabs();
  renderSceneList();
  loadScene(0, 0, autoplay);
}

function renderLadderTabs() {
  ladderTabs.innerHTML = stepMeta.map((item) => {
    const passed = ladderProgress.passedSteps.includes(item.step);
    return `
      <button class="ladder-tab ${activeStep === item.step ? "active" : ""} ${passed ? "passed" : ""}" type="button" data-step="${item.step}" ${activeStep === item.step ? 'aria-current="step"' : ""}>
        <span>${item.step}</span>
        <strong>${item.title}</strong>
        <small>${item.subtitle} - ${item.durationLabel}</small>
      </button>
    `;
  }).join("");
}

function isStepUnlocked(step) {
  return stepMeta.some((item) => item.step === Number(step));
}

function renderSceneList() {
  drawerSummary.textContent = `Step ${activeStep} - ${scenes.length} lesson modules`;
  sceneList.innerHTML = scenes
    .map((scene, index) => `
      <button class="scene-button ${index === activeSceneIndex ? "active" : ""}" type="button" data-scene="${index}" ${index === activeSceneIndex ? 'aria-current="true"' : ""}>
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
  sceneElapsedOffset = offset;
  sceneStartedAt = performance.now() - offset * 1000;
  courseElapsedAtSceneStart = sceneOffsets[activeSceneIndex];

  board.classList.remove("paused", "animating", "finished");
  resetBoardBeatClasses();
  activeBeatKey = "";
  sceneTitle.textContent = scene.title;
  sceneCount.textContent = `Step ${activeStep} - Module ${activeSceneIndex + 1} of ${scenes.length}`;
  sceneDuration.textContent = formatTime(scene.duration);
  lessonPoint.textContent = scene.point;
  captionText.textContent = captionFor(scene, offset);
  svg.innerHTML = renderers[scene.id] ? renderers[scene.id](scene) : genericLessonSvg(scene);
  board.classList.toggle("seeked", offset > 0.75);
  updateBoardMoment(scene, offset);
  renderSceneList();

  if (audio) {
    audio.pause();
    audio = null;
  }
  audio = new Audio(scene.audio);
  audio.volume = 1;
  audio.playbackRate = 1.1;
  audio.preload = "auto";
  syncAudioToOffset(offset);
  audio.addEventListener("error", () => {
    captionText.textContent = "Voice file is still being prepared. The board can play silently for now.";
  });
  audio.addEventListener("ended", () => {
    if (playing && activeSceneIndex === scenes.indexOf(scene)) playNextScene();
  });

  setTimeline(courseElapsedAtSceneStart + offset);
  if (shouldPlay) startPlayback();
  else setPlayState(false);
}

function startPlayback() {
  if (!audio) return;
  completed = false;
  playing = true;
  sceneStartedAt = performance.now() - sceneElapsedOffset * 1000;
  syncAudioToOffset(sceneElapsedOffset);
  if (audio.currentTime < 0.2) restartBoardAnimation();
  board.classList.remove("paused");
  board.classList.add("animating");
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
  sceneElapsedOffset = currentSceneTime();
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
  board.classList.add("finished");
  ladderProgress.passedSteps = uniqueNumbers([...ladderProgress.passedSteps, activeStep]);
  saveLadderProgress();
  renderLadderTabs();
  window.setTimeout(() => openGateQuiz(activeStep), 450);
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
  return Math.min(courseTotal(), sceneOffsets[activeSceneIndex] + Math.min(scene.duration, currentSceneTime()));
}

function currentSceneTime() {
  if (!playing) return sceneElapsedOffset;
  if (audio && Number.isFinite(audio.currentTime) && audio.readyState > 0) {
    sceneElapsedOffset = audio.currentTime;
    return audio.currentTime;
  }
  return Math.max(0, (performance.now() - sceneStartedAt) / 1000);
}

function syncAudioToOffset(offset) {
  if (!audio) return;
  const setTime = () => {
    const max = Math.max(0, (audio.duration || scenes[activeSceneIndex]?.duration || 0) - 0.35);
    const target = Math.max(0, Math.min(offset, max || offset));
    try {
      audio.currentTime = target;
      sceneElapsedOffset = target;
    } catch {
      sceneElapsedOffset = offset;
    }
  };
  if (audio.readyState > 0) setTime();
  else audio.addEventListener("loadedmetadata", setTime, { once: true });
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
    const sceneTime = currentSceneTime();
    updateBoardMoment(scenes[activeSceneIndex], sceneTime);
    if (sceneTime >= scenes[activeSceneIndex].duration) {
      playNextScene();
      return;
    }
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
  const sceneTime = currentSceneTime();
  captionText.textContent = captionFor(scene, sceneTime);
  updateBoardMoment(scene, sceneTime);
  captionTimer = window.setTimeout(startCaptionLoop, 500);
}

function updateBoardMoment(scene, seconds) {
  const beats = sceneBeats(scene);
  const beatIndex = activeBeatIndex(beats, seconds);
  const activeStates = beats.slice(0, beatIndex + 1).map((beat) => beat.state);
  const showMoment = activeStates.includes("example") || activeStates.includes("contrast") || activeStates.includes("comma") || activeStates.includes("sentence-check");
  const activeBeat = beats[beatIndex]?.state || "intro";
  const beatKey = `${scene.id}:${activeStates.join("|")}:${showMoment ? "moment" : "base"}`;
  if (beatKey !== activeBeatKey) {
    resetBoardBeatClasses();
    activeStates.forEach((state) => board.classList.add(`beat-${state}`));
    board.classList.add(`board-beat-${Math.min(4, Math.max(1, beatIndex + 1))}`);
    board.dataset.activeBeat = activeBeat;
    activeBeatKey = beatKey;
  }
  board.classList.toggle("show-board-moment", showMoment);
  board.classList.toggle("show-board-build", beatIndex >= 1);
  board.classList.toggle("show-board-apply", beatIndex >= Math.max(1, beats.length - 2));
  board.classList.toggle("dim-main-example", showMoment);
  board.classList.toggle("show-maya-example", scene.id === "sentence-machine" && showMoment);
  board.classList.toggle("dim-dog-example", scene.id === "sentence-machine" && showMoment);
  updateQuizBoardBeats(scene, activeStates);
}

function sceneBeats(scene) {
  if (Array.isArray(scene.beats) && scene.beats.length) return normalizeBeats(scene.beats);
  if (fallbackSceneBeats[scene.id]) return fallbackSceneBeats[scene.id];
  return defaultStudioBeats;
}

function normalizeBeats(beats) {
  return beats
    .map((beat) => ({ at: Number(beat.at) || 0, state: String(beat.state || "beat").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-") }))
    .sort((a, b) => a.at - b.at);
}

function activeBeatIndex(beats, seconds) {
  let index = 0;
  beats.forEach((beat, beatIndex) => {
    if (seconds >= beat.at) index = beatIndex;
  });
  return index;
}

function resetBoardBeatClasses() {
  [...board.classList].forEach((className) => {
    if (className.startsWith("beat-") || className.startsWith("board-beat-") || className.startsWith("quiz-beat-")) {
      board.classList.remove(className);
    }
  });
}

function updateQuizBoardBeats(scene, activeStates) {
  const isQuiz = scene.id === "recap-quiz";
  board.classList.toggle("quiz-beat-1", isQuiz && activeStates.includes("nouns"));
  board.classList.toggle("quiz-beat-2", isQuiz && activeStates.includes("verbs"));
  board.classList.toggle("quiz-beat-3", isQuiz && activeStates.includes("modifiers"));
  board.classList.toggle("quiz-beat-4", isQuiz && activeStates.includes("conjunction"));
  board.classList.toggle("quiz-beat-5", isQuiz && activeStates.includes("apply"));
}

function restartBoardAnimation() {
  board.classList.remove("animating", "paused", "finished");
  activeBeatKey = "";
  void board.offsetWidth;
  board.classList.add("animating");
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

function openGateQuiz(step) {
  const questions = gateQuizzes[step] || [];
  quizEyebrow.textContent = `Step ${step} practice`;
  quizTitle.textContent = step < 3 ? "Choose the best answer" : "Final grammar ladder check";
  quizFeedback.textContent = "";
  quizQuestions.innerHTML = questions.map((question, index) => `
    <fieldset class="quiz-question" data-question="${index}">
      <legend>${index + 1}. ${escapeHtml(question.prompt)}</legend>
      ${question.options.map((option, optionIndex) => `
        <label class="answer-choice">
          <input type="radio" name="gate-${index}" value="${optionIndex}" data-answer-choice />
          <span>${escapeHtml(option)}</span>
        </label>
      `).join("")}
      <p class="question-feedback" aria-live="polite"></p>
    </fieldset>
  `).join("");
  submitQuizButton.disabled = true;
  quizModal.classList.remove("hidden");
}

function gradeGateQuiz() {
  const questions = gateQuizzes[activeStep] || [];
  const score = questions.reduce((sum, question, index) => {
    const selected = quizQuestions.querySelector(`input[name="gate-${index}"]:checked`);
    const fieldset = quizQuestions.querySelector(`[data-question="${index}"]`);
    const selectedValue = Number(selected?.value);
    fieldset?.classList.toggle("answered-correct", selectedValue === question.answer);
    fieldset?.classList.toggle("answered-wrong", selected && selectedValue !== question.answer);
    const feedback = fieldset?.querySelector(".question-feedback");
    if (feedback) {
      feedback.textContent = selectedValue === question.answer
        ? `Correct. ${question.why}`
        : `Not quite. Best answer: ${question.options[question.answer]}. ${question.why}`;
    }
    return sum + (Number(selected?.value) === question.answer ? 1 : 0);
  }, 0);
  if (score !== questions.length) {
    quizFeedback.textContent = `You got ${score} of ${questions.length}. Review the lesson, then try again.`;
    return;
  }
  ladderProgress.passedSteps = uniqueNumbers([...ladderProgress.passedSteps, activeStep]);
  ladderProgress.unlockedSteps = uniqueNumbers([...ladderProgress.unlockedSteps, 1, 2, 3]);
  saveLadderProgress();
  renderLadderTabs();
  quizFeedback.textContent = activeStep < 3 ? "Perfect. Choose any step when you are ready." : "Brilliant. Grammar ladder complete.";
  if (activeStep < 3) {
    window.setTimeout(() => {
      quizModal.classList.add("hidden");
      switchStep(activeStep + 1, false);
    }, 900);
  }
}

function loadLadderProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem("brightQuestEnglishGrammarLadder") || "{}");
    return {
      unlockedSteps: uniqueNumbers([1, 2, 3, ...(parsed.unlockedSteps || [])]),
      passedSteps: uniqueNumbers(parsed.passedSteps || [])
    };
  } catch {
    return { unlockedSteps: [1, 2, 3], passedSteps: [] };
  }
}

function saveLadderProgress() {
  localStorage.setItem("brightQuestEnglishGrammarLadder", JSON.stringify(ladderProgress));
}

function uniqueNumbers(values) {
  return [...new Set(values.map(Number).filter(Boolean))].sort((a, b) => a - b);
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

ladderTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step]");
  if (!button) return;
  switchStep(Number(button.dataset.step), false);
});

closeQuizButton.addEventListener("click", () => {
  quizModal.classList.add("hidden");
});

submitQuizButton.addEventListener("click", gradeGateQuiz);

quizQuestions.addEventListener("change", (event) => {
  const input = event.target.closest("[data-answer-choice]");
  if (!input) return;
  const fieldset = input.closest(".quiz-question");
  fieldset?.querySelectorAll(".answer-choice").forEach((choice) => {
    choice.classList.toggle("selected", choice.contains(input));
  });
  fieldset?.classList.remove("answered-correct", "answered-wrong");
  const feedback = fieldset?.querySelector(".question-feedback");
  if (feedback) feedback.textContent = "";
  const answered = gateQuizzes[activeStep].every((_, index) => quizQuestions.querySelector(`input[name="gate-${index}"]:checked`));
  submitQuizButton.disabled = !answered;
  quizFeedback.textContent = answered ? "All set. Tap Check answers when ready." : "Choose one answer for each question.";
});

sceneList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scene]");
  if (!button) return;
  loadScene(Number(button.dataset.scene), 0, true);
  closeLessonDrawer();
});

function openLessonDrawer() {
  if (lessonDrawerOpen) return;
  lessonDrawerOpen = true;
  lessonDrawer.classList.add("open");
  lessonDrawer.setAttribute("aria-hidden", "false");
  lessonDrawer.inert = false;
  lessonListButton.setAttribute("aria-expanded", "true");
  drawerBackdrop.hidden = false;
  requestAnimationFrame(() => drawerBackdrop.classList.add("visible"));
  document.body.classList.add("drawer-open");
  const activeLesson = sceneList.querySelector(".scene-button.active");
  (activeLesson || drawerCloseButton).focus();
}

function closeLessonDrawer({ restoreFocus = true } = {}) {
  if (!lessonDrawerOpen) return;
  lessonDrawerOpen = false;
  lessonDrawer.classList.remove("open");
  lessonDrawer.setAttribute("aria-hidden", "true");
  lessonDrawer.inert = true;
  lessonListButton.setAttribute("aria-expanded", "false");
  drawerBackdrop.classList.remove("visible");
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => {
    if (!lessonDrawerOpen) drawerBackdrop.hidden = true;
  }, 180);
  if (restoreFocus) lessonListButton.focus();
}

lessonListButton.addEventListener("click", openLessonDrawer);
drawerCloseButton.addEventListener("click", () => closeLessonDrawer());
drawerBackdrop.addEventListener("click", () => closeLessonDrawer());
document.addEventListener("keydown", (event) => {
  if (!lessonDrawerOpen) return;
  if (event.key === "Escape") {
    closeLessonDrawer();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...lessonDrawer.querySelectorAll("button:not([disabled]), a[href], input:not([disabled])")];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
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

function fitText(x, y, value, delay, size = 28, color = "#f5f5f0", maxWidth = 160, anchor = "middle", weight = 800) {
  return `<text class="draw-text chalk-label" x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs" style="--delay:${delay}s">${escapeHtml(value)}</text>`;
}

function smallText(x, y, value, delay, color = "rgba(245,245,240,0.78)", anchor = "middle") {
  return text(x, y, value, delay, 19, color, anchor, 700);
}

function wordBox(x, y, value, delay, color = "#f5f5f0", w = 150) {
  const label = String(value || "");
  const size = label.length > 14 ? 19 : label.length > 10 ? 21 : 24;
  return `${rect(x, y, w, 58, delay, 0.55, color, 4)}${fitText(x + w / 2, y + 38, label, delay + 0.35, size, color, Math.max(40, w - 26))}`;
}

function genericLessonSvg(scene) {
  const lines = wrapSvgText(scene.point, 42).slice(0, 3);
  const example = wrapSvgText(scene.visual?.example || scene.captions?.[1]?.[1] || "Watch the example.", 46).slice(0, 3);
  const check = wrapSvgText(scene.visual?.check || scene.captions?.[2]?.[1] || "Check the word job.", 44).slice(0, 3);
  return baseSvg(`
    <g class="main-example">
      ${text(600, 58, scene.title, 0.1, 34)}
      ${rect(120, 130, 960, 390, 0.7, 1.0, "#8bd3dd", 6)}
      ${text(600, 190, "Main pattern", 1.4, 30, "#8bd3dd")}
      ${multiText(600, 250, lines, 2.1, 27, "#f5f5f0")}
      ${path("M260 405 C410 340 790 340 940 405", 4.2, 0.8, "#f3d56b", 6, 'marker-end="url(#arrowHead)"')}
      ${text(600, 470, "Find the job each word group is doing.", 5.0, 28, "#f3d56b")}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Practice check", 0, 34)}
      ${rect(105, 145, 990, 220, 0, 0.01, "#9fdf9f", 6)}
      ${multiText(600, 210, example, 0, 26, "#f5f5f0")}
      ${path("M600 390 L600 445", 0, 0.01, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${rect(180, 470, 840, 120, 0, 0.01, "#f3d56b", 6)}
      ${multiText(600, 525, check, 0, 25, "#f3d56b")}
    </g>
  `);
}

function grammarStudioSvg(scene) {
  const spec = grammarStudioScenes[scene.id] || {
    mode: "diagram",
    sentence: scene.visual?.example || scene.point,
    tokens: [[scene.title, "pattern", "#8bd3dd"]],
    chant: scene.point,
    check: scene.visual?.check || scene.point
  };
  const modeLabel = {
    sort: "sort",
    balance: "test",
    hook: "attach",
    compare: "compare",
    repair: "repair",
    telescope: "focus",
    rhythm: "rhythm",
    diagram: "diagram",
    transform: "transform",
    split: "real / imagined",
    ghost: "missing words"
  }[spec.mode] || "diagram";

  return baseSvg(`
    <g class="grammar-studio">
      <g class="beat-phase phase-intro">${grammarStudioBackdrop(scene, spec, modeLabel)}</g>
      <g class="beat-phase phase-example">${grammarStudioMainSentence(spec)}</g>
      <g class="beat-phase phase-diagram">${grammarStudioDiagram(spec)}</g>
      <g class="beat-phase phase-check">${grammarStudioCheck(spec)}</g>
      <g class="beat-phase phase-apply">${grammarStudioApply(scene, spec)}</g>
    </g>
  `);
}

function grammarStudioBackdrop(scene, spec, modeLabel) {
  return `
    ${text(86, 62, modeLabel, 0.1, 19, "#f3d56b", "start", 900)}
    ${text(600, 62, scene.title, 0.45, 33, "#f5f5f0")}
    ${path("M86 92 C245 116 367 104 518 120 C690 139 808 108 1048 130", 1.0, 1.2, "#2b675e", 4)}
    ${path("M970 78 C1020 42 1082 42 1122 84 C1087 92 1043 116 1010 148 C1006 113 992 94 970 78", 2.25, 0.8, "#f5f5f0", 4)}
    ${circle(1052, 128, 24, 2.9, 0.45, "#f3d56b", 4)}
    ${smallText(1052, 174, "idea compass", 3.3, "#f3d56b")}
  `;
}

function grammarStudioMainSentence(spec) {
  const sentenceLines = wrapSvgText(spec.sentence || "", 72).slice(0, 2);
  const repairedLines = spec.repaired ? wrapSvgText(spec.repaired, 72).slice(0, 2) : [];
  const altLines = spec.altSentence ? wrapSvgText(spec.altSentence, 68).slice(0, 2) : [];
  const repair = repairedLines.length ? `
    ${path("M600 250 L600 290", 2.6, 0.55, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
    ${rect(138, 302, 924, 82, 3.2, 0.9, "#9fdf9f", 4)}
    ${multiText(600, 342, repairedLines, 4.0, 25, "#9fdf9f")}
  ` : "";
  const alt = altLines.length ? `
    ${rect(138, 302, 924, 82, 3.2, 0.9, "#f4a6b8", 4)}
    ${multiText(600, 342, altLines, 4.0, 25, "#f4a6b8")}
  ` : "";
  return `
    ${rect(120, 128, 960, repairedLines.length || altLines.length ? 128 : 154, 0.0, 1.0, "#8bd3dd", 5)}
    ${smallText(600, 166, repairedLines.length ? "first draft" : "sentence under the magnifier", 0.9, "#8bd3dd")}
    ${multiText(600, 212, sentenceLines, 1.45, 29, "#f5f5f0")}
    ${grammarStudioUnderline(spec)}
    ${repair}
    ${alt}
  `;
}

function grammarStudioUnderline(spec) {
  const mode = spec.mode;
  if (mode === "repair") return path("M180 238 C390 266 810 266 1020 238", 2.0, 0.9, "#f4a6b8", 6);
  if (mode === "transform") return path("M280 248 C418 286 782 286 920 248", 2.0, 0.9, "#f3d56b", 6, 'marker-end="url(#arrowHead)"');
  if (mode === "rhythm") return `${circle(330, 248, 18, 2.0, 0.4, "#f3d56b", 4)}${circle(600, 248, 18, 2.45, 0.4, "#8bd3dd", 4)}${circle(870, 248, 18, 2.9, 0.4, "#9fdf9f", 4)}`;
  return path("M230 246 C360 276 470 276 600 246 C730 216 840 216 970 246", 2.0, 1.0, "#f3d56b", 5);
}

function grammarStudioDiagram(spec) {
  const tokens = (spec.tokens || []).slice(0, 4);
  const startX = tokens.length === 4 ? 146 : tokens.length === 3 ? 196 : 250;
  const gap = tokens.length === 4 ? 235 : tokens.length === 3 ? 300 : 360;
  const tokenMarkup = tokens.map(([value, label, color], index) => {
    const x = startX + index * gap;
    const delay = 0.8 + index * 0.75;
    return `
      <g class="grammar-token token-${index + 1}">
      ${rect(x, 430, tokens.length === 4 ? 200 : 240, 72, delay, 0.65, color, 4)}
      ${multiText(x + (tokens.length === 4 ? 100 : 120), 460, wrapSvgText(value, tokens.length === 4 ? 16 : 20).slice(0, 2), delay + 0.4, 22, color)}
      ${path(`M${x + (tokens.length === 4 ? 100 : 120)} 410 L${x + (tokens.length === 4 ? 100 : 120)} 430`, delay + 0.75, 0.35, color, 4)}
      ${smallText(x + (tokens.length === 4 ? 100 : 120), 535, label, delay + 1.1, color)}
      </g>
    `;
  }).join("");
  return `
    ${line(160, 410, 1040, 410, 0.0, 0.9, "rgba(245,245,240,0.54)", 4)}
    ${tokenMarkup}
    ${grammarStudioModeMark(spec)}
  `;
}

function grammarStudioModeMark(spec) {
  if (spec.mode === "balance") {
    return `
      ${line(600, 394, 600, 330, 0.45, 0.55, "#f5f5f0", 5)}
      ${path("M486 346 L714 346", 1.0, 0.55, "#f5f5f0", 5)}
      ${path("M494 346 C508 392 560 392 574 346", 2.0, 0.65, "#f4a6b8", 5)}
      ${path("M626 346 C640 392 692 392 706 346", 2.8, 0.65, "#9fdf9f", 5)}
    `;
  }
  if (spec.mode === "hook" || spec.mode === "telescope") {
    return path("M288 402 C378 338 472 338 562 402 C652 466 746 466 836 402", 3.8, 1.0, "#8bd3dd", 5);
  }
  if (spec.mode === "ghost") {
    return `
      ${rect(740, 344, 172, 48, 3.4, 0.75, "rgba(243,213,107,0.72)", 4)}
      ${text(826, 376, "chose", 4.0, 21, "rgba(243,213,107,0.72)")}
    `;
  }
  if (spec.mode === "split") {
    return `
      ${line(600, 332, 600, 580, 1.0, 0.8, "rgba(245,245,240,0.32)", 3)}
      ${smallText(420, 374, "real", 2.0, "#9fdf9f")}
      ${smallText(780, 374, "imagined", 2.8, "#f4a6b8")}
    `;
  }
  return path("M220 394 C348 356 472 356 600 394 C728 432 852 432 980 394", 3.8, 1.0, "#9fdf9f", 4);
}

function grammarStudioCheck(spec) {
  const check = wrapSvgText(spec.check || "", 32).slice(0, 2);
  return `
    ${rect(842, 496, 270, 86, 0.0, 0.7, "#f3d56b", 4)}
    ${smallText(977, 522, "quick check", 0.8, "#f3d56b")}
    ${multiText(977, 552, check, 1.35, 18, "#f5f5f0")}
  `;
}

function grammarStudioApply(scene, spec) {
  return `
    ${line(88, 612, 1112, 612, 0.0, 1.0, "rgba(245,245,240,0.38)", 3)}
    ${multiText(600, 650, wrapSvgText(spec.chant || scene.point, 50).slice(0, 2), 0.85, 22, "#f3d56b")}
  `;
}

function multiText(x, y, lines, delay, size = 26, color = "#f5f5f0") {
  return lines.map((line, index) => text(x, y + index * (size + 10), line, delay + index * 0.25, size, color)).join("");
}

function wrapSvgText(value, max = 42) {
  const words = String(value || "").split(/\s+/);
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function grammarSentenceMachineSvg() {
  return baseSvg(`
    <g class="dog-example">
      ${text(600, 58, "The Sentence Machine", 0.1, 34)}
      ${text(600, 130, "A complete sentence needs three parts", 1.2, 27)}
      ${rect(100, 170, 1000, 400, 0.5, 1.0, "#8bd3dd", 6)}
      ${circle(300, 300, 70, 1.8, 0.9, "#9fdf9f", 7)}
      ${text(300, 289, "Subject", 2.5, 25, "#9fdf9f")}
      ${smallText(300, 322, "who or what", 2.8)}
      ${path("M370 300 L506 300", 3.2, 0.5, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${circle(600, 300, 70, 3.7, 0.9, "#f3d56b", 7)}
      ${text(600, 289, "Predicate", 4.4, 24, "#f3d56b")}
      ${smallText(600, 322, "what happened", 4.7)}
      ${path("M670 300 L806 300", 5.1, 0.5, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${circle(900, 300, 70, 5.6, 0.9, "#f4a6b8", 7)}
      ${text(900, 286, "Complete", 6.3, 22, "#f4a6b8")}
      ${text(900, 326, "thought", 6.6, 22, "#f4a6b8")}
      ${text(600, 420, "The curious dog chased the red ball.", 7.4, 30)}
      ${path("M285 450 C358 495 432 495 505 450", 8.2, 0.7, "#9fdf9f")}
      ${text(392, 528, "subject", 8.9, 22, "#9fdf9f")}
      ${path("M522 450 C644 495 800 495 928 450", 9.4, 0.7, "#f3d56b")}
      ${text(722, 528, "predicate", 10.1, 22, "#f3d56b")}
    </g>
    <g class="board-moment maya-moment">
      <rect x="132" y="78" width="936" height="500" rx="20" fill="rgba(9, 48, 43, 0.94)" stroke="rgba(139, 211, 221, 0.24)" stroke-width="4"></rect>
      ${rect(150, 92, 900, 470, 0.2, 0.9, "#8bd3dd", 5)}
      ${text(600, 148, "Quick check: Maya reads the comic.", 0.2, 31, "#f5f5f0")}
      ${wordBox(245, 230, "Maya", 0.55, "#9fdf9f", 170)}
      ${wordBox(485, 230, "reads", 1.15, "#f3d56b", 170)}
      ${wordBox(725, 230, "the comic", 1.8, "#f3d56b", 220)}
      ${path("M330 310 C360 350 405 350 435 310", 3.2, 0.7, "#9fdf9f", 6)}
      ${text(382, 384, "subject", 3.9, 23, "#9fdf9f")}
      ${path("M520 310 C620 375 780 375 880 310", 5.1, 0.9, "#f3d56b", 6)}
      ${text(700, 408, "predicate", 6.0, 23, "#f3d56b")}
      ${path("M262 462 L938 462", 8.6, 0.7, "#f5f5f0", 5)}
      ${text(600, 508, "Both parts are there, so the thought is complete.", 9.4, 26, "#f4a6b8")}
    </g>
  `);
}

function grammarNounsPronounsSvg() {
  return baseSvg(`
    <g class="main-example noun-board">
      <g class="noun-phase noun-phase-intro">
        ${text(600, 58, "Nouns name people, places, things, and ideas", 0.1, 30)}
        ${rect(130, 128, 940, 178, 0.6, 0.8, "#9fdf9f", 5)}
        ${wordBox(180, 190, "teacher", 1.3, "#9fdf9f", 160)}
        ${wordBox(395, 190, "garden", 2.0, "#8bd3dd", 160)}
        ${wordBox(610, 190, "bicycle", 2.7, "#f3d56b", 160)}
        ${wordBox(825, 190, "courage", 3.4, "#f4a6b8", 160)}
        ${smallText(260, 286, "person", 4.1, "#9fdf9f")}
        ${smallText(475, 286, "place", 4.35, "#8bd3dd")}
        ${smallText(690, 286, "thing", 4.6, "#f3d56b")}
        ${smallText(905, 286, "idea", 4.85, "#f4a6b8")}
      </g>
      <g class="noun-phase noun-phase-number">
        ${rect(92, 348, 300, 150, 0.2, 0.8, "#9fdf9f", 5)}
        ${text(242, 392, "Number", 0.9, 29, "#9fdf9f")}
        ${wordBox(132, 425, "fox", 1.5, "#f5f5f0", 105)}
        ${path("M252 455 L292 455", 2.2, 0.35, "#f3d56b", 4, 'marker-end="url(#arrowHead)"')}
        ${wordBox(304, 425, "foxes", 2.6, "#f3d56b", 120)}
      </g>
      <g class="noun-phase noun-phase-case">
        ${rect(452, 348, 300, 150, 0.2, 0.8, "#8bd3dd", 5)}
        ${text(602, 392, "Gender", 0.9, 29, "#8bd3dd")}
        ${wordBox(492, 425, "boy", 1.5, "#f5f5f0", 105)}
        ${wordBox(612, 425, "girl", 2.0, "#f5f5f0", 105)}
        ${fitText(602, 522, "teacher = common", 2.6, 21, "#8bd3dd", 250)}
        ${rect(812, 348, 300, 150, 3.1, 0.8, "#f4a6b8", 5)}
        ${text(962, 392, "Case", 3.8, 29, "#f4a6b8")}
        ${fitText(962, 437, "Maya reads.", 4.4, 22, "#f5f5f0", 238)}
        ${fitText(962, 472, "Sam helps Maya.", 4.85, 22, "#f5f5f0", 238)}
        ${fitText(962, 507, "Maya's book", 5.3, 22, "#f3d56b", 238)}
      </g>
      <g class="noun-phase noun-phase-apply">
        ${path("M220 580 C360 536 486 536 600 580 C714 624 840 624 980 580", 0.2, 1.0, "#f3d56b", 5)}
        ${fitText(600, 642, "Ask: one or many? what kind? what job?", 1.3, 27, "#f3d56b", 720)}
      </g>
    </g>
    <g class="board-moment">
      ${text(600, 58, "Quick check: Sam's boxes", 0, 32)}
      ${rect(145, 170, 910, 320, 0, 0.01, "#8bd3dd", 6)}
      ${text(600, 240, "The girls carried Sam's boxes.", 0, 32)}
      ${path("M260 266 C325 310 412 310 480 266", 0, 0.01, "#9fdf9f", 6)}
      ${text(370, 345, "girls = plural doers", 0, 25, "#9fdf9f")}
      ${path("M596 266 C646 306 718 306 768 266", 0, 0.01, "#f3d56b", 6)}
      ${text(682, 382, "Sam's = possession", 0, 25, "#f3d56b")}
      ${text(600, 548, "Number + case make the noun job clear.", 0, 30, "#f4a6b8")}
    </g>
  `);
}

function grammarVerbsTenseSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Verbs: time and job", 0.1, 31)}
    ${line(155, 205, 1045, 205, 0.7, 0.9, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
    ${text(220, 170, "Past", 1.4, 27, "#8bd3dd")}
    ${text(600, 170, "Present", 1.8, 27, "#9fdf9f")}
    ${text(980, 170, "Future", 2.2, 27, "#f3d56b")}
    ${wordBox(145, 235, "walked", 2.8, "#8bd3dd", 150)}
    ${wordBox(525, 235, "walk", 3.3, "#9fdf9f", 150)}
    ${wordBox(885, 235, "will walk", 3.8, "#f3d56b", 190)}
    ${rect(120, 385, 188, 120, 5.0, 0.65, "#9fdf9f", 4)}
    ${text(214, 424, "transitive", 5.6, 21, "#9fdf9f")}
    ${smallText(214, 462, "kicked ball", 6.0, "#9fdf9f")}
    ${rect(328, 385, 188, 120, 6.6, 0.65, "#8bd3dd", 4)}
    ${text(422, 424, "intransitive", 7.2, 20, "#8bd3dd")}
    ${smallText(422, 462, "baby laughed", 7.6, "#8bd3dd")}
    ${rect(536, 385, 188, 120, 8.2, 0.65, "#f4a6b8", 4)}
    ${text(630, 424, "linking", 8.8, 21, "#f4a6b8")}
    ${smallText(630, 462, "soup is hot", 9.2, "#f4a6b8")}
    ${rect(744, 385, 188, 120, 9.8, 0.65, "#f3d56b", 4)}
    ${text(838, 424, "auxiliary", 10.4, 20, "#f3d56b")}
    ${smallText(838, 462, "has finished", 10.8, "#f3d56b")}
    ${rect(952, 385, 148, 120, 11.4, 0.65, "#f5f5f0", 4)}
    ${text(1026, 424, "modal", 12.0, 21)}
    ${smallText(1026, 462, "should read", 12.4)}
    ${text(600, 590, "Ask: when did it happen, and what job is the verb doing?", 13.2, 26, "#f3d56b")}
    </g>
    <g class="board-moment">
      ${text(600, 66, "Quick check: should read", 0, 32)}
      ${rect(150, 190, 900, 300, 0, 0.01, "#8bd3dd", 6)}
      ${text(600, 260, "Omar should read the poem.", 0, 32)}
      ${path("M435 286 C490 324 562 324 618 286", 0, 0.01, "#f3d56b", 6)}
      ${text(526, 360, "should = modal helper", 0, 25, "#f3d56b")}
      ${path("M585 286 C646 332 738 332 800 286", 0, 0.01, "#9fdf9f", 6)}
      ${text(700, 410, "read = main verb", 0, 25, "#9fdf9f")}
      ${text(600, 550, "The verb team tells duty plus action.", 0, 30, "#f4a6b8")}
    </g>
  `);
}

function grammarAdjectivesAdverbsSvg() {
  return baseSvg(`
    <g class="main-example">
    ${text(600, 58, "Adjectives and Adverbs add detail", 0.1, 32)}
    ${rect(92, 150, 450, 390, 0.7, 0.9, "#9fdf9f", 5)}
    ${text(317, 198, "Adjective", 1.4, 30, "#9fdf9f")}
    ${smallText(317, 247, "describes a noun", 1.8)}
    ${path("M270 350 C292 270 418 270 440 350 C442 420 270 420 270 350", 2.4, 1.0, "#f5f5f0", 7)}
    ${path("M300 310 L330 250 L360 310 M390 310 L420 250 L450 310", 3.2, 0.6, "#f5f5f0", 5)}
    ${text(355, 465, "bright blue kite", 4.0, 29, "#9fdf9f")}
    ${rect(660, 150, 450, 390, 4.7, 0.9, "#f3d56b", 5)}
    ${text(885, 198, "Adverb", 5.4, 30, "#f3d56b")}
    ${smallText(885, 247, "describes a verb", 5.8)}
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
    ${text(220, 148, "Capital", 0.8, 28, "#9fdf9f")}
    ${text(220, 275, "M", 1.3, 74, "#9fdf9f")}
    ${smallText(220, 338, "Monday, Maya, Mars", 1.8)}
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
    <g class="main-example recap-board">
    ${text(600, 58, "Grammar Power-Up Quiz", 0.1, 32)}
    ${text(600, 120, "The tiny robots danced happily beside Maya's desk, and they clapped.", 0.8, 26)}

    <g class="quiz-phase quiz-phase-1">
      ${text(160, 205, "1", 0, 34, "#9fdf9f")}
      ${text(600, 205, "Find the nouns", 0, 30)}
      ${wordBox(190, 255, "robots", 0, "#9fdf9f", 150)}
      ${wordBox(430, 255, "Maya", 0, "#9fdf9f", 130)}
      ${wordBox(650, 255, "desk", 0, "#9fdf9f", 130)}
      ${smallText(895, 292, "things and names", 0, "#9fdf9f")}
    </g>

    <g class="quiz-phase quiz-phase-2">
      ${text(160, 385, "2", 0, 34, "#f3d56b")}
      ${text(600, 385, "Find the verbs", 0, 30)}
      ${wordBox(285, 430, "danced", 0, "#f3d56b", 160)}
      ${wordBox(535, 430, "clapped", 0, "#f3d56b", 160)}
      ${smallText(800, 466, "past-tense actions", 0, "#f3d56b")}
    </g>

    <g class="quiz-phase quiz-phase-3">
      ${text(175, 560, "3", 0, 34, "#8bd3dd")}
      ${wordBox(240, 530, "tiny", 0, "#8bd3dd", 125)}
      ${smallText(302, 615, "adjective", 0, "#8bd3dd")}
      ${wordBox(440, 530, "happily", 0, "#f4a6b8", 160)}
      ${smallText(520, 615, "adverb", 0, "#f4a6b8")}
      ${wordBox(690, 530, "beside Maya's desk", 0, "#f5f5f0", 285)}
      ${smallText(832, 615, "prepositional phrase", 0)}
    </g>

    <g class="quiz-phase quiz-phase-4">
      ${path("M912 592 C970 548 1038 548 1096 592", 0, 0.01, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${text(1010, 574, "and", 0, 34, "#f3d56b")}
      ${smallText(1010, 632, "joins ideas", 0, "#f3d56b")}
    </g>
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
