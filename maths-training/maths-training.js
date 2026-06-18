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

const COURSE_RELEASE = "maths-training-003";
const AUDIO_PLAYBACK_RATE = 1.1;
const speech = window.speechSynthesis;
const QUIZ_STATES = ["model", "calculate", "discover"];

const episodes = [
  { episode: 1, title: "Part 1", subtitle: "Arithmetic logic" },
  { episode: 2, title: "Part 2", subtitle: "Visual models" },
  { episode: 3, title: "Part 3", subtitle: "Spatial cycles" }
];

const allScenes = [
  {
    id: "included-average",
    episode: 1,
    title: "Included Average",
    point: "Use totals to find the extra number that changed the average.",
    audio: "assets/audio/01-included-average.mp3",
    duration: 77,
    beats: [
      { at: 0, state: "setup" },
      { at: 6, state: "model" },
      { at: 24, state: "calculate" },
      { at: 52, state: "discover" },
      { at: 66, state: "apply" }
    ],
    captions: [
      [0, "The average is a total shared equally."],
      [12, "Seven numbers average 42, so the first total is 7 x 42."],
      [30, "After one more number is included, eight numbers average 45."],
      [52, "The included number is the difference between the new total and the old total."],
      [66, "The invariant idea: totals explain averages."]
    ],
    script: "Welcome to Scholarship Maths Lab. First, we solve an included average problem. Seven numbers have an average of forty two. One more number is included, and the new average becomes forty five. The trap is to stare at the averages. Instead, Professor Pixel says: averages are really totals wearing a disguise. Seven numbers averaging forty two make a total of seven times forty two, which is two hundred and ninety four. Now eight numbers averaging forty five make a total of eight times forty five, which is three hundred and sixty. The only new thing added was the mystery number. So subtract the old total from the new total. Three hundred and sixty minus two hundred and ninety four equals sixty six. The mystery number is sixty six. Whenever an average changes after a new value joins, compare the before-total and after-total."
  },
  {
    id: "ducks-rabbits",
    episode: 1,
    title: "Ducks And Rabbits",
    point: "Build one unit group, then divide the invariant total legs.",
    audio: "assets/audio/02-ducks-rabbits.mp3",
    duration: 71,
    beats: [
      { at: 0, state: "setup" },
      { at: 11, state: "model" },
      { at: 28, state: "calculate" },
      { at: 49, state: "discover" },
      { at: 62, state: "apply" }
    ],
    captions: [
      [0, "There are four times as many ducks as rabbits."],
      [11, "One unit group is 1 rabbit plus 4 ducks."],
      [28, "Each group has 4 rabbit legs plus 8 duck legs, so 12 legs."],
      [49, "The total legs are invariant: 1404."],
      [62, "1404 divided by 12 gives 117 groups, so 117 rabbits."]
    ],
    script: "Next comes the ducks and rabbits leg-balance dilemma. The farm has four times as many ducks as rabbits, and there are one thousand four hundred and four legs altogether. Guessing would be slow. Instead, make one unit group. If there is one rabbit, there must be four ducks. The rabbit has four legs. Four ducks have eight legs. One full group therefore has twelve legs. The total number of legs is our invariant: it stays fixed, so we highlight it in gold. Now divide the total legs by the legs in one group. One thousand four hundred and four divided by twelve equals one hundred and seventeen. There are one hundred and seventeen groups, and each group has one rabbit, so there are one hundred and seventeen rabbits."
  },
  {
    id: "fraction-remainder",
    episode: 2,
    title: "Fraction Remaining Model",
    point: "When a fraction is taken from what is left, redraw the remaining bar.",
    audio: "assets/audio/03-fraction-remainder.mp3",
    duration: 73,
    beats: [
      { at: 0, state: "setup" },
      { at: 12, state: "model" },
      { at: 30, state: "calculate" },
      { at: 50, state: "discover" },
      { at: 64, state: "apply" }
    ],
    captions: [
      [0, "Sarah starts with 24 stickers."],
      [12, "She gives 1/3 away, leaving 16."],
      [30, "Now take 1/4 of the remainder, not 1/4 of 24."],
      [50, "The remaining 16 breaks into four equal parts of 4."],
      [64, "Three parts stay with Sarah, so she has 12 stickers."]
    ],
    script: "Episode two is about visual heuristic models. Sarah has twenty four stickers. She gives one third to her brother. Then she gives one quarter of what is left to her sister. The key phrase is: of what is left. Draw one clean bar for twenty four. Split it into three equal parts. One part goes away, so eight stickers are given to her brother. Two parts remain, which is sixteen stickers. Now redraw that remaining block as the new whole. Slice the sixteen into four equal parts. One fourth is four stickers for her sister. Three parts remain. Three times four equals twelve. Sarah has twelve stickers left. When the question says of the remainder, redraw the bar before taking the next fraction."
  },
  {
    id: "excess-shortage",
    episode: 2,
    title: "Excess And Shortage",
    point: "Compare two sharing plans by turning shortage and excess into one total gap.",
    audio: "assets/audio/04-excess-shortage.mp3",
    duration: 86,
    beats: [
      { at: 0, state: "setup" },
      { at: 14, state: "model" },
      { at: 34, state: "calculate" },
      { at: 58, state: "discover" },
      { at: 74, state: "apply" }
    ],
    captions: [
      [0, "Seven each is short by 6. Four each has 3 left over."],
      [14, "The same packet is compared under two different sharing plans."],
      [34, "Each boy changes the plan by 3 erasers: 7 minus 4."],
      [58, "The full gap is shortage plus excess: 6 plus 3 equals 9."],
      [74, "Then 9 divided by 3 gives 3 boys, and the packet has 15 erasers."]
    ],
    script: "Now Professor Pixel shows the excess and shortage method. If each boy gets seven erasers, there is a shortage of six. If each boy gets four erasers, there is an excess of three. The individual difference between the two plans is seven minus four, which is three erasers per boy. The total gap is not just six and not just three. It is the shortage plus the excess, so six plus three equals nine. If the total gap is nine, and each boy accounts for three of that gap, then there are nine divided by three boys. That gives three boys. To find the packet size, use either plan. Three boys getting seven each would need twenty one, but we are short by six, so the packet has fifteen erasers."
  },
  {
    id: "cube-joints",
    episode: 3,
    title: "Glued Cube Faces",
    point: "Each glued joint hides exactly two faces.",
    audio: "assets/audio/05-cube-joints.mp3",
    duration: 68,
    beats: [
      { at: 0, state: "setup" },
      { at: 10, state: "model" },
      { at: 27, state: "calculate" },
      { at: 45, state: "discover" },
      { at: 58, state: "apply" }
    ],
    captions: [
      [0, "Nine separate cubes would have 9 x 6 faces."],
      [10, "In a straight line of nine cubes, there are eight glued joints."],
      [27, "Each joint hides two touching faces."],
      [45, "Eight joints times two hidden faces gives 16 hidden faces."],
      [58, "Count joints, not cubes, when objects are glued face-to-face."]
    ],
    script: "Episode three starts with spatial visualization. Nine identical cubes are glued face to face in a straight line. How many faces are hidden? A single cube has six faces. Nine separate cubes would have nine times six, or fifty four faces. But glued cubes hide the touching faces. In a line of nine cubes, the number of joints is one less than the number of cubes. So there are eight joints. Each joint hides two faces: the right face of one cube and the left face of the next cube. Eight joints times two hidden faces gives sixteen hidden faces. The shortcut is simple: for a straight chain, count the joins, then multiply by two."
  },
  {
    id: "calendar-cycle",
    episode: 3,
    title: "Calendar Modulo Loop",
    point: "Use cycles of seven days; the remainder tells the landing day.",
    audio: "assets/audio/06-calendar-cycle.mp3",
    duration: 73,
    beats: [
      { at: 0, state: "setup" },
      { at: 12, state: "model" },
      { at: 30, state: "calculate" },
      { at: 50, state: "discover" },
      { at: 64, state: "apply" }
    ],
    captions: [
      [0, "August 11 is Wednesday. What day is September 21?"],
      [12, "Count days forward: 20 days left in August plus 21 days in September."],
      [30, "The total jump is 41 days."],
      [50, "41 divided by 7 gives 5 full weeks and remainder 6."],
      [64, "Six days after Wednesday is Tuesday."]
    ],
    script: "Finally, we solve a calendar cycle. If August eleventh is a Wednesday, what day of the week is September twenty first? Fingers are easy to lose track of, so use a seven day loop. From August eleventh to the end of August there are twenty days left. Then add twenty one days in September. The total jump is forty one days. Days repeat every seven, so divide forty one by seven. That gives five full weeks with a remainder of six. Full weeks bring us back to Wednesday, so only the remainder matters. Count six steps forward from Wednesday: Thursday, Friday, Saturday, Sunday, Monday, Tuesday. The answer is Tuesday."
  },
  {
    id: "average-practice",
    episode: 1,
    title: "Average Practice",
    point: "Use total first, then compare before and after.",
    audio: "assets/audio/07-average-practice.mp3",
    duration: 46,
    beats: [{ at: 0, state: "setup" }, { at: 7, state: "model" }, { at: 18, state: "calculate" }, { at: 31, state: "discover" }, { at: 39, state: "apply" }],
    captions: [[0, "Practice the included-average method."], [7, "Four scores average 15."], [18, "A fifth score makes the average 18."], [31, "Compare totals: 90 minus 60."], [39, "The added score is 30."]],
    board: {
      title: "Average Practice",
      prompt: "4 scores average 15. Add one score -> average 18.",
      left: ["before total", "4 x 15 = 60"],
      right: ["after total", "5 x 18 = 90"],
      working: "90 - 60 = 30",
      answer: "added score = 30"
    },
    script: "Here is a second average problem to lock the method in. Four scores have an average of fifteen. One extra score is added, and the new average becomes eighteen. Again, do not subtract the averages and stop. The average rose by three, but that does not mean the new score was three. First turn each average into a total. Four scores averaging fifteen make a total of sixty. Five scores averaging eighteen make a total of ninety. Only one new score was added, so the new score is the difference between those totals. Ninety minus sixty is thirty. The added score was thirty. A good check is to ask whether thirty is high enough to pull the average from fifteen to eighteen. Yes, it is. So the pattern is stable: before total, after total, difference."
  },
  {
    id: "ratio-group-practice",
    episode: 1,
    title: "Ratio Group Practice",
    point: "Convert a ratio into one complete group before dividing.",
    audio: "assets/audio/08-ratio-group-practice.mp3",
    duration: 49,
    beats: [{ at: 0, state: "setup" }, { at: 8, state: "model" }, { at: 20, state: "calculate" }, { at: 33, state: "discover" }, { at: 42, state: "apply" }],
    captions: [[0, "Build one complete ratio group."], [8, "Three ducks for every one rabbit."], [20, "One group has 10 legs."], [33, "150 divided by 10 gives 15 groups."], [42, "So there are 15 rabbits."]],
    board: {
      title: "Ratio Group Practice",
      prompt: "3 ducks for every 1 rabbit, 150 legs total.",
      left: ["one group", "1 rabbit + 3 ducks"],
      right: ["legs/group", "4 + 6 = 10"],
      working: "150 / 10 = 15 groups",
      answer: "15 rabbits"
    },
    script: "Now try the ratio group method again with a smaller number. There are three times as many ducks as rabbits, and the animals have one hundred and fifty legs altogether. Build one complete group from the ratio. One group is one rabbit plus three ducks. The rabbit has four legs. Three ducks have six legs. So one complete group has ten legs. The whole farm has one hundred and fifty legs. Divide the total by the legs in one group: one hundred and fifty divided by ten equals fifteen groups. Each group has one rabbit, so there are fifteen rabbits. If the question asked for ducks, there would be three ducks in each group, so fifteen times three would give forty five ducks. Always ask: what is inside one group?"
  },
  {
    id: "remainder-practice",
    episode: 2,
    title: "Remainder Practice",
    point: "When the whole changes, redraw the whole.",
    audio: "assets/audio/09-remainder-practice.mp3",
    duration: 45,
    beats: [{ at: 0, state: "setup" }, { at: 7, state: "model" }, { at: 18, state: "calculate" }, { at: 30, state: "discover" }, { at: 38, state: "apply" }],
    captions: [[0, "A fraction of the remainder needs a new bar."], [7, "Start with 36."], [18, "Give away 1/4, leaving 27."], [30, "Then take 1/3 of 27."], [38, "18 remain."]],
    board: {
      title: "Remainder Practice",
      prompt: "36 sweets. Give 1/4, then 1/3 of what is left.",
      left: ["first whole", "36 -> give 9"],
      right: ["new whole", "27 -> give 9"],
      working: "27 - 9 = 18",
      answer: "18 sweets left"
    },
    script: "Here is another remainder model. Start with thirty six sweets. Give away one quarter. One quarter of thirty six is nine, so twenty seven sweets remain. Now the question says one third of what is left. That means the new whole is twenty seven, not thirty six. One third of twenty seven is nine. After giving those nine away, eighteen sweets remain. Notice how the same number, nine, appeared twice, but for different reasons. The first nine came from a quarter of thirty six. The second nine came from a third of twenty seven. That is why drawing the new whole matters. When a problem changes the amount you are working with, redraw the bar."
  },
  {
    id: "shortage-practice",
    episode: 2,
    title: "Shortage Practice",
    point: "Shortage plus excess is the total gap between two plans.",
    audio: "assets/audio/10-shortage-practice.mp3",
    duration: 58,
    beats: [{ at: 0, state: "setup" }, { at: 9, state: "model" }, { at: 23, state: "calculate" }, { at: 39, state: "discover" }, { at: 50, state: "apply" }],
    captions: [[0, "Repeat the excess-shortage method."], [9, "9 each is short by 8."], [23, "6 each leaves 7."], [39, "Gap is 8 plus 7."], [50, "There are 5 children and 37 cards."]],
    board: {
      title: "Shortage Practice",
      prompt: "9 each -> short 8. 6 each -> extra 7.",
      left: ["per child gap", "9 - 6 = 3"],
      right: ["whole gap", "8 + 7 = 15"],
      working: "15 / 3 = 5 children",
      answer: "5 x 9 - 8 = 37 cards"
    },
    script: "Let us practise excess and shortage one more time. If each child gets nine cards, there is a shortage of eight. If each child gets six cards, there is an excess of seven. The two plans differ by three cards for every child. That is the per-child gap. The total gap is the shortage plus the excess, because we travel from being eight cards short to having seven cards left over. Eight plus seven is fifteen. Now divide the whole gap by the per-child gap: fifteen divided by three equals five children. To find the number of cards, use either plan. Five children getting nine cards each would need forty five, but the packet is short by eight, so there are thirty seven cards. Check using the six-card plan: five times six is thirty, with seven left over, also thirty seven."
  },
  {
    id: "strategy-map",
    episode: 3,
    title: "Strategy Map",
    point: "Pick the method by spotting the invariant.",
    audio: "assets/audio/11-strategy-map.mp3",
    duration: 43,
    beats: [{ at: 0, state: "setup" }, { at: 7, state: "model" }, { at: 17, state: "calculate" }, { at: 29, state: "discover" }, { at: 37, state: "apply" }],
    captions: [[0, "Choose the method from the wording."], [7, "Average changing means compare totals."], [17, "Ratio plus total means build one group."], [29, "Remainder means redraw the whole."], [37, "Shortage/excess means compare plans."]],
    board: {
      title: "Strategy Map",
      prompt: "What is staying the same?",
      left: ["average changes", "compare totals"],
      right: ["ratio + total", "one group"],
      working: "remainder -> redraw whole",
      answer: "shortage/excess -> total gap"
    },
    script: "Before the quiz, make a strategy map. These problems are not random tricks. Each one asks you to protect an invariant. If an average changes, the invariant is the total before and after. Compare totals. If a ratio is given with a total number of legs or objects, build one complete group from the ratio, then divide the total. If a fraction is taken from what is left, the whole has changed, so redraw the bar. If a plan has a shortage and another plan has an excess, compare the two plans. The total gap is shortage plus excess, and the per-person gap is the difference between the two shares. If you can name the invariant, you can choose the method."
  },
  {
    id: "rate-time-practice",
    episode: 3,
    title: "Rate And Time",
    point: "Convert rates into a shared total amount of work or distance.",
    audio: "assets/audio/13-rate-time-practice.mp3",
    duration: 48,
    beats: [{ at: 0, state: "setup" }, { at: 8, state: "model" }, { at: 20, state: "calculate" }, { at: 32, state: "discover" }, { at: 41, state: "apply" }],
    captions: [[0, "Rates become easier when we compare totals."], [8, "A cyclist rides 12 km each hour."], [20, "In 2.5 hours, distance is 30 km."], [32, "Another cyclist at 15 km/h takes 2 hours."], [41, "Same distance, different rates."]],
    board: {
      title: "Rate And Time",
      prompt: "12 km/h for 2.5 h. Same distance at 15 km/h?",
      left: ["distance", "12 x 2.5 = 30 km"],
      right: ["time", "30 / 15 = 2 h"],
      working: "same distance is the invariant",
      answer: "2 hours"
    },
    script: "Here is a rate and time practice board. A cyclist rides at twelve kilometres per hour for two and a half hours. How long would another cyclist take to cover the same distance at fifteen kilometres per hour? The invariant is distance. First find the shared distance. Twelve kilometres each hour for two and a half hours gives thirty kilometres. Now the second cyclist covers that same thirty kilometres at fifteen kilometres per hour. Time equals distance divided by rate, so thirty divided by fifteen equals two hours. The useful question is not, which formula do I remember? The useful question is, what stays the same? Here, the distance stays the same while the speed changes."
  },
  {
    id: "percent-change-practice",
    episode: 3,
    title: "Percent Change",
    point: "Track the original whole before comparing the new value.",
    audio: "assets/audio/14-percent-change-practice.mp3",
    duration: 48,
    beats: [{ at: 0, state: "setup" }, { at: 8, state: "model" }, { at: 20, state: "calculate" }, { at: 32, state: "discover" }, { at: 41, state: "apply" }],
    captions: [[0, "Percent change protects the original whole."], [8, "A price rises from 80 to 100."], [20, "The increase is 20."], [32, "20 out of the original 80 is 25 percent."], [41, "Always compare with the original."]],
    board: {
      title: "Percent Change",
      prompt: "Price rises from 80 to 100. What percent increase?",
      left: ["change", "100 - 80 = 20"],
      right: ["original", "80 is the base"],
      working: "20 / 80 = 1/4",
      answer: "25% increase"
    },
    script: "Now a percent change problem. A price rises from eighty dollars to one hundred dollars. What is the percent increase? First find the change. One hundred minus eighty is twenty. Now ask, twenty compared with what? For percent increase, compare the change with the original value, not the new value. The original price was eighty. Twenty divided by eighty is one quarter. One quarter is twenty five percent. So the price increased by twenty five percent. This is a common trap because students sometimes divide by one hundred, the new price, and get twenty percent. That answers a different question. The base for percent increase is the original amount."
  },
  {
    id: "pop-quiz",
    episode: 3,
    title: "Pop Quiz",
    point: "Check the method: totals, ratio groups, and excess-shortage gaps.",
    audio: "assets/audio/12-pop-quiz.mp3",
    duration: 73,
    beats: [
      { at: 0, state: "setup" },
      { at: 12, state: "model" },
      { at: 29, state: "calculate" },
      { at: 48, state: "discover" },
      { at: 62, state: "apply" }
    ],
    captions: [
      [0, "Pop quiz: three method checks."],
      [12, "Question 1 checks included averages using totals."],
      [29, "Question 2 checks ratio groups using legs."],
      [48, "Question 3 checks excess and shortage."],
      [62, "If your method is clear, the answers become predictable."]
    ],
    script: "Pop quiz time. This is not a speed test; it is a method check. Question one. Five numbers average eighteen. One more number is added and the new average is twenty. What was the added number? Use totals: five times eighteen is ninety, and six times twenty is one hundred and twenty. The added number is thirty. Question two. There are three times as many ducks as rabbits. The animals have one hundred and fifty legs altogether. One unit group is one rabbit plus three ducks. That is four rabbit legs plus six duck legs, or ten legs per group. One hundred and fifty divided by ten gives fifteen groups, so there are fifteen rabbits. Question three. If each child gets nine cards, there is a shortage of eight. If each child gets six cards, there is an excess of seven. The per-child difference is three. The total gap is eight plus seven, which is fifteen. Fifteen divided by three gives five children. Use the nine-card plan: five children would need forty five cards, but we are short by eight, so there are thirty seven cards. If you got these right, you are not memorizing steps; you are seeing the invariant."
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
let quizOverlay = null;
let quizPausedState = null;
let pendingQuizResume = false;
let timelineSeeking = false;
let activeBeatKey = "";

const quizQuestions = {
  model: {
    number: 1,
    title: "Question 1: Included Average",
    prompt: "Five numbers average 18. One more number is added and the new average is 20. What was the added number?",
    options: ["20", "30", "120"],
    correct: 1,
    feedback: "Correct method: compare totals. 6 x 20 is 120, 5 x 18 is 90, so the added number is 30."
  },
  calculate: {
    number: 2,
    title: "Question 2: Ratio Group",
    prompt: "There are 3 times as many ducks as rabbits, and 150 legs altogether. How many rabbits are there?",
    options: ["10", "15", "45"],
    correct: 1,
    feedback: "One group is 1 rabbit plus 3 ducks: 4 + 6 = 10 legs. 150 / 10 = 15 groups, so 15 rabbits."
  },
  discover: {
    number: 3,
    title: "Question 3: Excess And Shortage",
    prompt: "9 cards each is short by 8. 6 cards each leaves 7. How many cards are in the packet?",
    options: ["37", "45", "52"],
    correct: 0,
    feedback: "Gap is 8 + 7 = 15. Per-child gap is 9 - 6 = 3, so 5 children. 5 x 9 - 8 = 37 cards."
  }
};

const quizState = {
  answered: {},
  waiting: false
};

const renderers = {
  "included-average": renderIncludedAverage,
  "ducks-rabbits": renderDucksRabbits,
  "fraction-remainder": renderFractionRemainder,
  "excess-shortage": renderExcessShortage,
  "cube-joints": renderCubeJoints,
  "calendar-cycle": renderCalendarCycle,
  "average-practice": renderAveragePractice,
  "ratio-group-practice": renderRatioPractice,
  "remainder-practice": renderRemainderPractice,
  "shortage-practice": renderShortagePractice,
  "strategy-map": renderStrategyMap,
  "rate-time-practice": renderRateTimePractice,
  "percent-change-practice": renderPercentChangePractice,
  "pop-quiz": renderPopQuiz
};

function rebuildSceneOffsets() {
  sceneOffsets = scenes.reduce((acc, scene, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + scenes[index - 1].duration);
    return acc;
  }, []);
  timeline.max = String(courseTotal());
  totalTime.textContent = `${formatTime(courseTotal())} total`;
}

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
      <small>${episode.subtitle} - ${episodeSummary(episode.episode)}</small>
    </button>
  `).join("");
}

function episodeSummary(episode) {
  const episodeScenes = allScenes.filter((scene) => scene.episode === episode);
  const total = episodeScenes.reduce((sum, scene) => sum + scene.duration, 0);
  return `${episodeScenes.length} modules - ${formatTime(total)}`;
}

function setupEpisode(episode, sceneIndex = 0) {
  activeEpisode = episode;
  scenes = allScenes;
  rebuildSceneOffsets();
  renderEpisodeTabs();
  renderSceneList();
  const episodeStart = Math.max(0, scenes.findIndex((scene) => scene.episode === episode));
  loadScene(sceneIndex || episodeStart, 0, false);
}

function initQuizOverlay() {
  quizOverlay = document.createElement("div");
  quizOverlay.id = "quizOverlay";
  quizOverlay.className = "quiz-overlay";
  quizOverlay.setAttribute("aria-live", "polite");
  quizOverlay.innerHTML = `
    <h3 id="quizTitle"></h3>
    <p id="quizPrompt"></p>
    <div class="quiz-options" id="quizOptions"></div>
    <p class="quiz-feedback" id="quizFeedback"></p>
    <button class="quiz-continue" id="quizContinue" type="button" disabled>Continue lesson</button>
  `;
  board.append(quizOverlay);
  quizOverlay.querySelector("#quizOptions").addEventListener("click", handleQuizChoice);
  quizOverlay.querySelector("#quizContinue").addEventListener("click", continueQuiz);
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
  hideQuizOverlay();
  stopSpeech();
  stopAudio();
  window.cancelAnimationFrame(rafId);
  activeSceneIndex = Math.max(0, Math.min(scenes.length - 1, index));
  const scene = scenes[activeSceneIndex];
  if (scene.id === "pop-quiz" && offsetSeconds < 1) {
    quizState.answered = {};
    quizState.waiting = false;
  }
  activeEpisode = scene.episode;
  const offset = Math.max(0, Math.min(scene.duration - 0.5, offsetSeconds));
  elapsedOffset = offset;
  startedAt = performance.now() - offset * 1000;
  courseElapsedAtSceneStart = sceneOffsets[activeSceneIndex];
  sceneTitle.textContent = scene.title;
  sceneCount.textContent = `Part ${activeEpisode} - Module ${activeSceneIndex + 1} of ${scenes.length}`;
  sceneDuration.textContent = formatTime(scene.duration);
  lessonPoint.textContent = scene.point;
  captionText.textContent = captionFor(scene, offset);
  svg.innerHTML = renderers[scene.id](scene);
  prepareAudio(scene);
  board.classList.toggle("seeked", offset > 0.75);
  activeBeatKey = "";
  updateBoard(scene, offset);
  renderSceneList();
  updateControls();
  updateTimeline();
  keepActiveSceneVisible();
  if (autoPlay) startPlayback();
}

function keepActiveSceneVisible() {
  const active = sceneList.querySelector(".scene-button.active");
  if (!active) return;
  const containerTop = sceneList.scrollTop;
  const containerBottom = containerTop + sceneList.clientHeight;
  const itemTop = active.offsetTop;
  const itemBottom = itemTop + active.offsetHeight;
  if (itemTop < containerTop) sceneList.scrollTop = itemTop - 8;
  else if (itemBottom > containerBottom) sceneList.scrollTop = itemBottom - sceneList.clientHeight + 8;
}

function startPlayback() {
  if (quizState.waiting && pendingQuizResume) {
    updateControls();
    return;
  }
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
  elapsedOffset = currentSceneTime();
  playing = false;
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
  hideQuizOverlay();
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
  if (!playing) return elapsedOffset;
  if (audio && Number.isFinite(audio.currentTime) && audio.readyState > 0) return audio.currentTime;
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
  const quizLocked = quizState.waiting && pendingQuizResume;
  const icon = playing ? "pause-icon" : "play-icon";
  const label = quizLocked ? "Answer first" : playing ? "Pause" : "Play";
  playButton.innerHTML = `<span class="control-icon ${icon}" aria-hidden="true"></span><span class="control-label">${label}</span>`;
  playButton.disabled = quizLocked;
  playButton.setAttribute("aria-label", quizLocked ? "Answer the quiz question to continue" : playing ? "Pause lesson" : "Start lesson");
}

function updateTimeline() {
  if (timelineSeeking) return;
  const safe = currentCourseTime();
  timeline.value = String(Math.round(safe));
  elapsedTime.textContent = `${formatTime(safe)} elapsed`;
  remainingTime.textContent = formatTime(Math.max(0, courseTotal() - safe));
}

function previewTimeline(value) {
  const safe = Math.max(0, Math.min(courseTotal(), Number(value) || 0));
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
  const activeBeat = scene.beats[beatIndex]?.state || "setup";
  const beatKey = `${scene.id}:${states.join("|")}`;
  if (beatKey !== activeBeatKey) {
    resetBeatClasses();
    states.forEach((state) => board.classList.add(`beat-${state}`));
    board.dataset.activeBeat = activeBeat;
    activeBeatKey = beatKey;
  }
  maybePauseForQuiz(scene, board.dataset.activeBeat);
}

function maybePauseForQuiz(scene, state) {
  if (scene.id !== "pop-quiz" || !playing || !QUIZ_STATES.includes(state)) return;
  if (Object.hasOwn(quizState.answered, state) || quizState.waiting || quizPausedState === state) return;
  quizPausedState = state;
  quizState.waiting = true;
  pendingQuizResume = true;
  pausePlayback();
  showQuizQuestion(state);
}

function showQuizQuestion(state) {
  const question = quizQuestions[state];
  if (!quizOverlay || !question) return;
  quizOverlay.querySelector("#quizTitle").textContent = `${question.number}. ${question.title}`;
  quizOverlay.querySelector("#quizPrompt").textContent = question.prompt;
  quizOverlay.querySelector("#quizFeedback").textContent = "Choose the best answer to continue.";
  quizOverlay.querySelector("#quizContinue").disabled = true;
  quizOverlay.querySelector("#quizOptions").innerHTML = question.options.map((option, index) => `
    <button class="quiz-option" type="button" data-state="${state}" data-choice="${index}" data-correct="${index === question.correct}">${escapeHtml(option)}</button>
  `).join("");
  quizOverlay.classList.add("active");
}

function handleQuizChoice(event) {
  const button = event.target.closest(".quiz-option");
  if (!button) return;
  const state = button.dataset.state;
  const question = quizQuestions[state];
  if (!question) return;
  const choice = Number(button.dataset.choice);
  quizState.answered[state] = choice;
  quizOverlay.querySelectorAll(".quiz-option").forEach((option) => {
    option.disabled = true;
    const optionChoice = Number(option.dataset.choice);
    option.classList.toggle("correct", optionChoice === question.correct);
    option.classList.toggle("incorrect", optionChoice === choice && choice !== question.correct);
  });
  const prefix = choice === question.correct ? "Yes. " : "Not quite. ";
  quizOverlay.querySelector("#quizFeedback").textContent = `${prefix}${question.feedback}`;
  quizOverlay.querySelector("#quizContinue").disabled = false;
  updateControls();
}

function continueQuiz() {
  hideQuizOverlay();
  if (!pendingQuizResume) return;
  pendingQuizResume = false;
  quizPausedState = null;
  startPlayback();
}

function hideQuizOverlay() {
  if (!quizOverlay) return;
  quizOverlay.classList.remove("active");
  quizState.waiting = false;
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
    rebuildSceneOffsets();
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
    ${rect(x, y, 255, 94, delay, 0.8, "#f3d56b", 5, "rgba(243,213,107,0.1)")}
    ${text(x + 128, y + 29, label, delay + 0.6, 18, "#f3d56b")}
    ${text(x + 128, y + 72, value, delay + 0.8, 28, "#f3d56b")}
  `;
}

function renderIncludedAverage() {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 60, "Included Average", 0.1, 36)}
      ${rect(285, 104, 630, 106, 0.45, 0.7, "#f5f5f0", 4, "rgba(245,245,240,0.04)")}
      ${text(600, 145, "7 numbers average 42", 0.9, 27)}
      ${text(600, 184, "add 1 number -> new average 45", 1.2, 27)}
    </g>
    <g class="math-phase phase-model">
      ${[0,1,2,3,4,5,6].map((i) => circle(270 + i * 72, 425, 28, 0.2 + i * 0.12, 0.45, "#8bd3dd", 5, "rgba(139,211,221,0.12)")).join("")}
      ${smallText(486, 492, "7 values", 1.2, "#8bd3dd")}
      ${circle(900, 425, 40, 1.4, 0.8, "#f3d56b", 6, "rgba(243,213,107,0.14)")}
      ${text(900, 435, "X", 2.0, 34, "#f3d56b")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(120, 250, 360, 112, 0.1, 0.8, "#9fdf9f", 5)}
      ${text(300, 294, "old total", 0.8, 27, "#9fdf9f")}
      ${text(300, 336, "7 x 42 = 294", 1.2, 30, "#9fdf9f")}
      ${rect(720, 250, 360, 112, 1.8, 0.8, "#f3d56b", 5)}
      ${text(900, 294, "new total", 2.5, 27, "#f3d56b")}
      ${text(900, 336, "8 x 45 = 360", 2.9, 30, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${path("M900 370 C812 492 668 554 492 592", 0.1, 0.9, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${rect(190, 594, 430, 72, 0.55, 0.65, "#f4a6b8", 4)}
      ${text(405, 642, "360 - 294 = 66", 1.05, 34, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${invariantBox(745, 586, "answer", "X = 66", 0.2)}
    </g>
  `);
}

function renderDucksRabbits() {
  const duck = (x, y, delay) => `
    ${path(`M${x - 46} ${y + 8} C${x - 32} ${y - 22} ${x + 22} ${y - 24} ${x + 44} ${y + 4} C${x + 26} ${y + 30} ${x - 24} ${y + 30} ${x - 46} ${y + 8}`, delay, 0.65, "#f3d56b", 4)}
    ${circle(x + 52, y - 14, 17, delay + 0.32, 0.35, "#f3d56b", 4)}
    ${path(`M${x + 66} ${y - 13} L${x + 88} ${y - 4} L${x + 66} ${y + 5}`, delay + 0.62, 0.25, "#f4a6b8", 4)}
    ${line(x - 12, y + 32, x - 12, y + 54, delay + 0.86, 0.22, "#f3d56b", 3)}
    ${line(x + 18, y + 32, x + 18, y + 54, delay + 0.98, 0.22, "#f3d56b", 3)}
  `;
  const rabbit = (x, y, delay) => `
    ${path(`M${x - 64} ${y + 28} C${x - 42} ${y - 28} ${x + 42} ${y - 32} ${x + 66} ${y + 22} C${x + 42} ${y + 66} ${x - 38} ${y + 68} ${x - 64} ${y + 28}`, delay, 0.72, "#9fdf9f", 4)}
    ${circle(x + 72, y - 4, 24, delay + 0.22, 0.36, "#9fdf9f", 4)}
    ${path(`M${x + 56} ${y - 24} C${x + 46} ${y - 74} ${x + 60} ${y - 104} ${x + 78} ${y - 62}`, delay + 0.5, 0.34, "#9fdf9f", 4)}
    ${path(`M${x + 78} ${y - 25} C${x + 88} ${y - 74} ${x + 110} ${y - 94} ${x + 104} ${y - 46}`, delay + 0.66, 0.34, "#9fdf9f", 4)}
    ${circle(x + 84, y - 10, 5, delay + 0.92, 0.18, "#f5f5f0", 3, "rgba(245,245,240,0.05)")}
    ${path(`M${x - 30} ${y + 62} C${x - 56} ${y + 82} ${x - 88} ${y + 78} ${x - 80} ${y + 55}`, delay + 1.04, 0.28, "#9fdf9f", 4)}
    ${path(`M${x + 36} ${y + 58} C${x + 58} ${y + 79} ${x + 90} ${y + 75} ${x + 82} ${y + 52}`, delay + 1.16, 0.28, "#9fdf9f", 4)}
  `;
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 54, "Ducks And Rabbits", 0.1, 36)}
      ${text(600, 108, "4 ducks for every 1 rabbit", 0.8, 29)}
      ${rect(380, 132, 440, 64, 1.2, 0.65, "#f3d56b", 4, "rgba(243,213,107,0.08)")}
      ${text(600, 174, "fixed total = 1404 legs", 1.82, 27, "#f3d56b")}
    </g>
    <g class="math-phase phase-model">
      ${rect(92, 322, 1016, 220, 0.1, 0.9, "#8bd3dd", 5)}
      ${rabbit(226, 418, 0.8)}
      ${duck(472, 420, 1.75)}${duck(612, 420, 2.05)}${duck(752, 420, 2.35)}${duck(892, 420, 2.65)}
      ${smallText(226, 574, "1 rabbit", 3.0, "#9fdf9f")}
      ${smallText(755, 574, "4 ducks", 3.15, "#f3d56b")}
      ${text(600, 616, "one complete unit group", 3.5, 27, "#8bd3dd")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(105, 225, 300, 60, 0.2, 0.65, "#9fdf9f", 4)}
      ${text(255, 264, "rabbit legs = 4", 0.85, 23, "#9fdf9f")}
      ${rect(450, 225, 300, 60, 1.0, 0.65, "#f3d56b", 4)}
      ${text(600, 264, "duck legs = 8", 1.55, 23, "#f3d56b")}
      ${rect(795, 225, 300, 60, 1.8, 0.65, "#f4a6b8", 4)}
      ${text(945, 264, "group total = 12", 2.35, 23, "#f4a6b8")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(260, 620, 680, 48, 0.2, 0.7, "#f3d56b", 4)}
      ${text(600, 652, "1404 / 12 = 117 groups", 0.9, 27, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${rect(822, 124, 250, 54, 0.2, 0.55, "#9fdf9f", 4)}
      ${text(947, 160, "answer: 117 rabbits", 0.75, 22, "#9fdf9f")}
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
      ${text(600, 116, "same packet, two different sharing plans", 0.7, 28)}
    </g>
    <g class="math-phase phase-model">
      ${rect(145, 190, 910, 92, 0.2, 0.8, "#f4a6b8", 5)}
      ${text(260, 247, "Plan A: 7 each", 0.85, 27, "#f4a6b8")}
      ${line(780, 236, 920, 236, 1.35, 0.55, "#f4a6b8", 5)}
      ${smallText(850, 218, "needs 6 more", 1.85, "#f4a6b8")}
      ${rect(145, 335, 740, 92, 2.15, 0.8, "#9fdf9f", 5)}
      ${text(260, 392, "Plan B: 4 each", 2.75, 27, "#9fdf9f")}
      ${line(885, 381, 985, 381, 3.25, 0.55, "#9fdf9f", 5)}
      ${smallText(935, 363, "3 left over", 3.75, "#9fdf9f")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(140, 500, 410, 78, 0.2, 0.65, "#8bd3dd", 4)}
      ${text(345, 550, "per child: 7 - 4 = 3", 0.85, 27, "#8bd3dd")}
      ${rect(650, 500, 410, 78, 1.25, 0.65, "#f3d56b", 4)}
      ${text(855, 550, "whole gap: 6 + 3 = 9", 1.9, 27, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${path("M345 584 C400 626 510 626 565 584", 0.2, 0.8, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${text(360, 654, "9 / 3 = 3 boys", 0.9, 32, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${rect(690, 612, 390, 58, 0.2, 0.7, "#9fdf9f", 4)}
      ${text(885, 650, "check: 3 x 7 - 6 = 15", 0.85, 26, "#9fdf9f")}
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
      ${text(240, 276, "Aug: 31 - 11", 0.9, 22, "#9fdf9f")}
      ${text(240, 322, "= 20", 1.2, 25, "#9fdf9f")}
      ${rect(830, 245, 260, 92, 1.6, 0.8, "#f3d56b", 5)}
      ${text(960, 276, "Sept: 21", 2.3, 22, "#f3d56b")}
      ${text(960, 322, "total 41", 2.6, 25, "#f3d56b")}
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

function renderPracticeBoard(scene) {
  const board = scene.board || {};
  const left = board.left || ["method", "step one"];
  const right = board.right || ["method", "step two"];
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, board.title || scene.title, 0.1, 36)}
      ${rect(190, 105, 820, 78, 0.55, 0.7, "#f5f5f0", 4, "rgba(245,245,240,0.04)")}
      ${text(600, 154, board.prompt || scene.point, 1.05, 25, "#f5f5f0")}
    </g>
    <g class="math-phase phase-model">
      ${rect(125, 235, 410, 118, 0.2, 0.75, "#8bd3dd", 4)}
      ${text(330, 282, left[0], 0.85, 27, "#8bd3dd")}
      ${text(330, 326, left[1], 1.25, 29, "#8bd3dd")}
      ${rect(665, 235, 410, 118, 1.65, 0.75, "#f3d56b", 4)}
      ${text(870, 282, right[0], 2.25, 27, "#f3d56b")}
      ${text(870, 326, right[1], 2.65, 29, "#f3d56b")}
    </g>
    <g class="math-phase phase-calculate">
      ${path("M330 370 C420 438 780 438 870 370", 0.2, 0.95, "#f5f5f0", 5, 'marker-end="url(#arrowHead)"')}
      ${rect(285, 448, 630, 82, 0.95, 0.75, "#f4a6b8", 4)}
      ${text(600, 500, board.working || "combine the method steps", 1.55, 31, "#f4a6b8")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(300, 585, 600, 70, 0.2, 0.7, "#9fdf9f", 4)}
      ${text(600, 630, board.answer || "answer", 0.85, 31, "#9fdf9f")}
    </g>
    <g class="math-phase phase-apply">
      ${smallText(600, 672, "method check complete", 0.2, "#8bd3dd")}
    </g>
  `);
}

function renderAveragePractice(scene) {
  const marks = [0, 1, 2, 3].map((i) => circle(330 + i * 70, 330, 25, 0.2 + i * 0.12, 0.35, "#8bd3dd", 5, "rgba(139,211,221,0.1)")).join("");
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 118, "4 scores average 15. Add one score -> average 18.", 0.75, 25)}
    </g>
    <g class="math-phase phase-model">
      ${marks}
      ${text(435, 392, "before: 4 scores", 0.9, 25, "#8bd3dd")}
      ${circle(790, 330, 36, 1.3, 0.6, "#f3d56b", 6, "rgba(243,213,107,0.12)")}
      ${text(790, 340, "?", 1.9, 34, "#f3d56b")}
      ${text(790, 392, "added score", 2.1, 25, "#f3d56b")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(145, 465, 390, 78, 0.15, 0.65, "#8bd3dd", 4)}
      ${text(340, 514, "4 x 15 = 60", 0.8, 30, "#8bd3dd")}
      ${rect(665, 465, 390, 78, 1.0, 0.65, "#f3d56b", 4)}
      ${text(860, 514, "5 x 18 = 90", 1.65, 30, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(360, 570, 480, 62, 0.2, 0.6, "#f4a6b8", 4)}
      ${text(600, 611, "90 - 60 = 30", 0.75, 33, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${text(600, 660, "added score = 30", 0.2, 26, "#9fdf9f")}
    </g>
  `);
}

function renderRatioPractice(scene) {
  const miniDuck = (x, delay) => `${circle(x, 365, 24, delay, 0.32, "#f3d56b", 4)}${path(`M${x + 20} 360 L${x + 42} 368 L${x + 20} 376`, delay + 0.25, 0.22, "#f4a6b8", 4)}${line(x - 8, 389, x - 8, 414, delay + 0.45, 0.2, "#f3d56b", 3)}${line(x + 12, 389, x + 12, 414, delay + 0.5, 0.2, "#f3d56b", 3)}`;
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 116, "3 ducks for every 1 rabbit, 150 legs total.", 0.75, 26)}
    </g>
    <g class="math-phase phase-model">
      ${rect(130, 235, 940, 230, 0.15, 0.8, "#8bd3dd", 5)}
      ${circle(285, 365, 42, 0.85, 0.5, "#9fdf9f", 5, "rgba(159,223,159,0.1)")}
      ${path("M270 320 C260 280 278 250 294 318", 1.25, 0.35, "#9fdf9f", 4)}
      ${path("M304 320 C326 280 346 260 326 328", 1.4, 0.35, "#9fdf9f", 4)}
      ${miniDuck(500, 1.8)}${miniDuck(650, 2.1)}${miniDuck(800, 2.4)}
      ${text(600, 512, "one group = 1 rabbit + 3 ducks", 2.85, 29, "#8bd3dd")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(150, 548, 300, 58, 0.2, 0.55, "#9fdf9f", 4)}
      ${text(300, 586, "rabbit: 4 legs", 0.8, 24, "#9fdf9f")}
      ${rect(500, 548, 300, 58, 1.0, 0.55, "#f3d56b", 4)}
      ${text(650, 586, "ducks: 6 legs", 1.6, 24, "#f3d56b")}
      ${rect(850, 548, 210, 58, 1.8, 0.55, "#f4a6b8", 4)}
      ${text(955, 586, "total 10", 2.35, 24, "#f4a6b8")}
    </g>
    <g class="math-phase phase-discover">
      ${text(600, 630, "150 / 10 = 15 groups", 0.2, 29, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${text(600, 670, "15 rabbits", 0.2, 22, "#9fdf9f")}
    </g>
  `);
}

function renderRemainderPractice(scene) {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 116, "36 sweets. Give 1/4, then 1/3 of what is left.", 0.75, 26)}
    </g>
    <g class="math-phase phase-model">
      ${rect(155, 210, 890, 82, 0.15, 0.75, "#8bd3dd", 5)}
      ${[1,2,3].map((i) => line(155 + i * 222.5, 210, 155 + i * 222.5, 292, 0.9 + i * 0.1, 0.25, "#8bd3dd", 3)).join("")}
      ${text(270, 263, "9", 1.25, 29, "#f4a6b8")}
      ${text(490, 263, "9", 1.38, 29, "#9fdf9f")}
      ${text(712, 263, "9", 1.51, 29, "#9fdf9f")}
      ${text(935, 263, "9", 1.64, 29, "#9fdf9f")}
      ${smallText(270, 332, "give 1/4", 2.0, "#f4a6b8")}
    </g>
    <g class="math-phase phase-calculate">
      ${text(600, 384, "new whole = 27", 0.2, 31, "#f3d56b")}
      ${rect(265, 420, 670, 82, 0.8, 0.75, "#9fdf9f", 5)}
      ${line(488, 420, 488, 502, 1.5, 0.25, "#9fdf9f", 3)}
      ${line(711, 420, 711, 502, 1.65, 0.25, "#9fdf9f", 3)}
      ${text(378, 473, "9", 1.95, 29, "#f4a6b8")}
      ${text(600, 473, "9", 2.1, 29, "#9fdf9f")}
      ${text(822, 473, "9", 2.25, 29, "#9fdf9f")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(365, 560, 470, 60, 0.2, 0.6, "#f3d56b", 4)}
      ${text(600, 600, "27 - 9 = 18", 0.75, 32, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${text(600, 656, "18 sweets remain", 0.2, 26, "#9fdf9f")}
    </g>
  `);
}

function renderShortagePractice(scene) {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 116, "9 each -> short 8. 6 each -> extra 7.", 0.75, 27)}
    </g>
    <g class="math-phase phase-model">
      ${rect(130, 215, 760, 74, 0.2, 0.65, "#f4a6b8", 4)}
      ${text(285, 263, "Plan A: 9 each", 0.8, 25, "#f4a6b8")}
      ${rect(895, 215, 150, 74, 1.15, 0.5, "#f4a6b8", 4)}
      ${text(970, 263, "short 8", 1.65, 24, "#f4a6b8")}
      ${rect(130, 360, 610, 74, 2.0, 0.65, "#9fdf9f", 4)}
      ${text(285, 408, "Plan B: 6 each", 2.6, 25, "#9fdf9f")}
      ${rect(745, 360, 150, 74, 2.95, 0.5, "#9fdf9f", 4)}
      ${text(820, 408, "extra 7", 3.45, 24, "#9fdf9f")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(155, 508, 390, 62, 0.2, 0.55, "#8bd3dd", 4)}
      ${text(350, 548, "per child gap: 9 - 6 = 3", 0.75, 24, "#8bd3dd")}
      ${rect(655, 508, 390, 62, 1.05, 0.55, "#f3d56b", 4)}
      ${text(850, 548, "total gap: 8 + 7 = 15", 1.6, 24, "#f3d56b")}
    </g>
    <g class="math-phase phase-discover">
      ${text(600, 622, "15 / 3 = 5 children", 0.2, 31, "#f3d56b")}
    </g>
    <g class="math-phase phase-apply">
      ${text(600, 660, "5 x 9 - 8 = 37 cards", 0.2, 25, "#9fdf9f")}
    </g>
  `);
}

function renderStrategyMap(scene) {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 116, "Ask: what stays the same?", 0.75, 29)}
    </g>
    <g class="math-phase phase-model">
      ${circle(600, 260, 74, 0.2, 0.8, "#f3d56b", 5, "rgba(243,213,107,0.1)")}
      ${text(600, 246, "spot the", 0.85, 23, "#f3d56b")}
      ${text(600, 292, "invariant", 1.05, 27, "#f3d56b")}
      ${line(545, 310, 300, 410, 1.5, 0.55, "#8bd3dd", 4)}
      ${line(655, 310, 900, 410, 1.65, 0.55, "#9fdf9f", 4)}
      ${line(600, 334, 600, 465, 1.8, 0.55, "#f4a6b8", 4)}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(115, 398, 350, 106, 0.2, 0.55, "#8bd3dd", 4)}
      ${text(290, 438, "average changes", 0.75, 21, "#8bd3dd")}
      ${text(290, 486, "compare totals", 0.95, 23, "#8bd3dd")}
      ${rect(735, 398, 350, 106, 1.15, 0.55, "#9fdf9f", 4)}
      ${text(910, 438, "ratio + total", 1.7, 21, "#9fdf9f")}
      ${text(910, 486, "build one group", 1.9, 23, "#9fdf9f")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(425, 520, 350, 100, 0.2, 0.55, "#f4a6b8", 4)}
      ${text(600, 558, "remainder", 0.75, 21, "#f4a6b8")}
      ${text(600, 604, "redraw the whole", 0.95, 23, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${rect(345, 642, 510, 52, 0.2, 0.55, "#f3d56b", 4)}
      ${text(600, 676, "shortage/excess -> compare plans", 0.75, 23, "#f3d56b")}
    </g>
  `);
}

function renderRateTimePractice(scene) {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 116, "12 km/h for 2.5 h. Same distance at 15 km/h?", 0.75, 26)}
    </g>
    <g class="math-phase phase-model">
      ${line(180, 320, 1020, 320, 0.2, 1.0, "#8bd3dd", 7)}
      ${circle(180, 320, 13, 1.05, 0.25, "#8bd3dd", 5)}
      ${circle(1020, 320, 13, 1.15, 0.25, "#8bd3dd", 5)}
      ${text(600, 282, "same distance", 1.45, 28, "#8bd3dd")}
      ${text(600, 370, "12 x 2.5 = 30 km", 1.85, 31, "#f3d56b")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(250, 445, 700, 78, 0.2, 0.7, "#9fdf9f", 4)}
      ${text(600, 495, "time = distance / rate", 0.9, 31, "#9fdf9f")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(355, 565, 490, 62, 0.2, 0.6, "#f4a6b8", 4)}
      ${text(600, 606, "30 / 15 = 2 hours", 0.8, 31, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${smallText(600, 658, "distance stayed fixed", 0.2, "#8bd3dd")}
    </g>
  `);
}

function renderPercentChangePractice(scene) {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, scene.title, 0.1, 36)}
      ${text(600, 116, "Price rises from 80 to 100. What percent increase?", 0.75, 26)}
    </g>
    <g class="math-phase phase-model">
      ${rect(220, 245, 520, 86, 0.2, 0.75, "#8bd3dd", 5, "rgba(139,211,221,0.1)")}
      ${text(480, 298, "original base = 80", 0.95, 30, "#8bd3dd")}
      ${rect(740, 245, 130, 86, 1.45, 0.45, "#f3d56b", 5, "rgba(243,213,107,0.1)")}
      ${text(805, 298, "+20", 1.95, 29, "#f3d56b")}
      ${text(600, 382, "new price = 100", 2.25, 28, "#f5f5f0")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(245, 455, 710, 78, 0.2, 0.65, "#f4a6b8", 4)}
      ${text(600, 504, "change / original = 20 / 80", 0.85, 31, "#f4a6b8")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(380, 575, 440, 58, 0.2, 0.55, "#9fdf9f", 4)}
      ${text(600, 613, "1/4 = 25%", 0.8, 32, "#9fdf9f")}
    </g>
    <g class="math-phase phase-apply">
      ${smallText(600, 660, "compare with the original value", 0.2, "#8bd3dd")}
    </g>
  `);
}

function renderPopQuiz() {
  return baseSvg(`
    <g class="math-phase phase-setup">
      ${text(600, 58, "Pop Quiz", 0.1, 38)}
      ${text(600, 112, "Three touch checks: choose before the answer", 0.7, 28)}
      ${rect(170, 150, 860, 72, 1.0, 0.7, "#8bd3dd", 4)}
      ${text(600, 196, "The voice pauses at each question until you answer.", 1.55, 25, "#8bd3dd")}
    </g>
    <g class="math-phase phase-model">
      ${rect(90, 260, 1020, 96, 0.2, 0.7, "#f3d56b", 4)}
      ${text(600, 316, "Q1: 5 numbers average 18. Add one -> average 20.", 0.85, 25, "#f3d56b")}
    </g>
    <g class="math-phase phase-calculate">
      ${rect(90, 388, 1020, 96, 0.2, 0.7, "#9fdf9f", 4)}
      ${text(600, 444, "Q2: 3 ducks for every 1 rabbit, 150 legs total.", 0.85, 25, "#9fdf9f")}
    </g>
    <g class="math-phase phase-discover">
      ${rect(90, 516, 1020, 96, 0.2, 0.7, "#f4a6b8", 4)}
      ${text(600, 572, "Q3: 9 each short 8; 6 each leaves 7.", 0.85, 25, "#f4a6b8")}
    </g>
    <g class="math-phase phase-apply">
      ${rect(335, 628, 530, 40, 0.2, 0.6, "#8bd3dd", 4)}
      ${text(600, 657, "Invariant thinking beats memorised tricks.", 0.8, 24, "#8bd3dd")}
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
  const targetEpisode = Number(button.dataset.episode);
  const targetScene = Math.max(0, scenes.findIndex((scene) => scene.episode === targetEpisode));
  setupEpisode(targetEpisode, targetScene);
});
sceneList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scene]");
  if (!button) return;
  loadScene(Number(button.dataset.scene), 0, true);
});
timeline.addEventListener("input", () => {
  timelineSeeking = true;
  previewTimeline(timeline.value);
});
timeline.addEventListener("change", () => {
  timelineSeeking = false;
  seekTo(Number(timeline.value));
});

initQuizOverlay();
setupEpisode(1, 0);
console.info(`Maths Training loaded: ${COURSE_RELEASE}`);
