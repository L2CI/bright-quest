const data = window.BrightQuestData;
const finalTest = window.BrightQuestFinalTest;
const storageKey = "brightQuestProfilesV2";
const apiBase = "/api";
const gameCatalogue = [
  { level: 1, name: "Star Dash", className: "star", mode: "catch", description: "Catch falling stars with a glowing paddle." },
  { level: 2, name: "Meteor Drift", className: "meteor", mode: "drift", description: "Drift the rocket-car through falling meteors and collect sparks." },
  { level: 3, name: "Balloon Burst", className: "rainbow", mode: "burst", description: "Tap the floating balloons before they escape." },
  { level: 4, name: "Number Drift", className: "number", mode: "drift", description: "Slide through the number lane and collect the bright targets." },
  { level: 5, name: "Comet Pop", className: "comet", mode: "burst", description: "Pop comet bubbles as they swirl across the sky." },
  { level: 6, name: "Treasure Drift", className: "treasure", mode: "drift", description: "Drift through falling treasure coins after a pressure test." },
  { level: 7, name: "Cosmic Burst", className: "cosmic", mode: "burst", description: "Burst bright cosmic crystals in a fast starfield." },
  { level: 8, name: "Final Fireworks", className: "final", mode: "burst", description: "Pop blazing reward sparks after the final test." }
];

const screens = {
  role: document.querySelector("#roleScreen"),
  profile: document.querySelector("#profileScreen"),
  dashboard: document.querySelector("#dashboardScreen"),
  test: document.querySelector("#testScreen"),
  result: document.querySelector("#resultScreen"),
  game: document.querySelector("#gameScreen"),
  gamesList: document.querySelector("#gamesListScreen"),
  grammarGym: document.querySelector("#grammarGymScreen"),
  training: document.querySelector("#trainingScreen"),
  parent: document.querySelector("#parentScreen")
};

const state = {
  profiles: loadProfiles(),
  profileId: localStorage.getItem("brightQuestActiveProfile") || "",
  profile: null,
  selectedRole: "",
  parentProfileId: "",
  activeLevel: null,
  activeQuestion: 0,
  answers: [],
  questionTimes: [],
  questionStartedAt: 0,
  startedAt: 0,
  remainingSeconds: 0,
  timerId: null,
  latestResult: null,
  activeTrainingSkill: "",
  gameTimerId: null,
  gameSpawnId: null,
  gameRemainingSeconds: 120,
  gameScore: 0,
  gameActive: false,
  gamePlayerX: 50,
  activeGame: gameCatalogue[0]
};

const roleScreen = document.querySelector("#roleScreen");
const passwordForm = document.querySelector("#passwordForm");
const passwordLabel = document.querySelector("#passwordLabel");
const modePassword = document.querySelector("#modePassword");
const profileForm = document.querySelector("#profileForm");
const profileName = document.querySelector("#profileName");
const savedProfiles = document.querySelector("#savedProfiles");
const welcomeName = document.querySelector("#welcomeName");
const starTotal = document.querySelector("#starTotal");
const switchProfileButton = document.querySelector("#switchProfileButton");
const grammarGymButton = document.querySelector("#grammarGymButton");
const gamesListButton = document.querySelector("#gamesListButton");
const continueButton = document.querySelector("#continueButton");
const levelMap = document.querySelector("#levelMap");
const testsDone = document.querySelector("#testsDone");
const bestScore = document.querySelector("#bestScore");
const trainingDone = document.querySelector("#trainingDone");
const trendChart = document.querySelector("#trendChart");
const trainingQueue = document.querySelector("#trainingQueue");
const coachHeadline = document.querySelector("#coachHeadline");
const coachCopy = document.querySelector("#coachCopy");
const exitTestButton = document.querySelector("#exitTestButton");
const testLevelLabel = document.querySelector("#testLevelLabel");
const testName = document.querySelector("#testName");
const timerText = document.querySelector("#timerText");
const testProgressBar = document.querySelector("#testProgressBar");
const questionNumber = document.querySelector("#questionNumber");
const questionSection = document.querySelector("#questionSection");
const questionSkill = document.querySelector("#questionSkill");
const questionPrompt = document.querySelector("#questionPrompt");
const optionsGrid = document.querySelector("#optionsGrid");
const writingBox = document.querySelector("#writingBox");
const prevQuestionButton = document.querySelector("#prevQuestionButton");
const nextQuestionButton = document.querySelector("#nextQuestionButton");
const resultTitle = document.querySelector("#resultTitle");
const resultCopy = document.querySelector("#resultCopy");
const resultScore = document.querySelector("#resultScore");
const resultDetails = document.querySelector("#resultDetails");
const resultDashboardButton = document.querySelector("#resultDashboardButton");
const reviewTrainingButton = document.querySelector("#reviewTrainingButton");
const playRewardButton = document.querySelector("#playRewardButton");
const reviewList = document.querySelector("#reviewList");
const trainingTitle = document.querySelector("#trainingTitle");
const trainingSteps = document.querySelector("#trainingSteps");
const trainingPractice = document.querySelector("#trainingPractice");
const completeTrainingButton = document.querySelector("#completeTrainingButton");
const closeTrainingButton = document.querySelector("#closeTrainingButton");
const gameStage = document.querySelector("#gameStage");
const gameTitle = document.querySelector("#gameTitle");
const playerShip = document.querySelector("#playerShip");
const gameTimer = document.querySelector("#gameTimer");
const gameScore = document.querySelector("#gameScore");
const exitGameButton = document.querySelector("#exitGameButton");
const gamesList = document.querySelector("#gamesList");
const closeGamesListButton = document.querySelector("#closeGamesListButton");
const grammarSpotlight = document.querySelector("#grammarSpotlight");
const grammarLessonList = document.querySelector("#grammarLessonList");
const closeGrammarGymButton = document.querySelector("#closeGrammarGymButton");
const parentRefreshButton = document.querySelector("#parentRefreshButton");
const parentExitButton = document.querySelector("#parentExitButton");
const parentResetButton = document.querySelector("#parentResetButton");
const parentRecommendation = document.querySelector("#parentRecommendation");
const parentProfileList = document.querySelector("#parentProfileList");
const parentOverview = document.querySelector("#parentOverview");
const parentQuestionTable = document.querySelector("#parentQuestionTable");
const parentTrainingTable = document.querySelector("#parentTrainingTable");
const toast = document.querySelector("#toast");
const confettiLayer = document.querySelector("#confettiLayer");

roleScreen.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => selectRole(button.dataset.role));
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const expected = state.selectedRole === "parent" ? "12345" : "abcde";
  if (modePassword.value !== expected) {
    showToast("Password did not match. Try again.");
    return;
  }
  modePassword.value = "";
  if (state.selectedRole === "parent") {
    renderParentDashboard();
    showScreen("parent");
  } else {
    renderProfileScreen();
    showScreen("profile");
  }
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = profileName.value.trim();
  if (!name) return;
  activateProfile(name);
});

switchProfileButton.addEventListener("click", () => {
  state.profileId = "";
  state.profile = null;
  localStorage.removeItem("brightQuestActiveProfile");
  renderRoleScreen();
  showScreen("role");
});

gamesListButton.addEventListener("click", openGamesList);
grammarGymButton.addEventListener("click", openGrammarGym);
continueButton.addEventListener("click", () => startLevel(nextSuggestedLevel()));
exitTestButton.addEventListener("click", () => {
  stopTimer();
  renderDashboard();
  showScreen("dashboard");
});
prevQuestionButton.addEventListener("click", () => moveQuestion(-1));
nextQuestionButton.addEventListener("click", () => {
  if (state.activeQuestion === state.activeLevel.questions.length - 1) {
    finishTest(false);
  } else {
    moveQuestion(1);
  }
});
resultDashboardButton.addEventListener("click", () => {
  renderDashboard();
  showScreen("dashboard");
});
reviewTrainingButton.addEventListener("click", () => {
  const skill = firstWeakSkill();
  if (skill) openTraining(skill);
});
playRewardButton.addEventListener("click", startRewardGame);
closeGamesListButton.addEventListener("click", () => {
  renderDashboard();
  showScreen("dashboard");
});
closeGrammarGymButton.addEventListener("click", () => {
  renderDashboard();
  showScreen("dashboard");
});
closeTrainingButton.addEventListener("click", () => {
  renderDashboard();
  showScreen("dashboard");
});
completeTrainingButton.addEventListener("click", completeTraining);
parentRefreshButton.addEventListener("click", () => {
  state.profiles = loadProfiles();
  if (state.profileId) state.profile = state.profiles[state.profileId];
  renderParentDashboard();
  showToast("Parent view refreshed.");
});
parentExitButton.addEventListener("click", () => {
  renderRoleScreen();
  showScreen("role");
});
parentResetButton.addEventListener("click", handleParentReset);
exitGameButton.addEventListener("click", endRewardGame);
gameStage.addEventListener("pointermove", movePlayer);

bootstrap();

function bootstrap() {
  normalizeProfiles();
  if (state.profileId && state.profiles[state.profileId]) {
    state.profile = state.profiles[state.profileId];
  }
  renderRoleScreen();
  showScreen("role");
  pullCloudProfiles();
}

function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveProfiles() {
  localStorage.setItem(storageKey, JSON.stringify(state.profiles));
  if (state.profileId) localStorage.setItem("brightQuestActiveProfile", state.profileId);
}

async function pullCloudProfiles() {
  try {
    const response = await fetch(`${apiBase}/profiles`, { headers: { accept: "application/json" } });
    if (!response.ok) return;
    const body = await response.json();
    if (!Array.isArray(body.profiles)) return;

    body.profiles.forEach((remote) => {
      if (!remote.payload?.id) return;
      const local = state.profiles[remote.payload.id];
      if (!local || new Date(remote.updatedAt) > new Date(local.cloudSyncedAt || local.createdAt || 0)) {
        state.profiles[remote.payload.id] = { ...remote.payload, cloudSyncedAt: remote.updatedAt };
      }
    });

    if (state.profileId && state.profiles[state.profileId]) state.profile = state.profiles[state.profileId];
    saveProfiles();
    if (!screens.dashboard.classList.contains("hidden")) renderDashboard();
    if (!screens.parent.classList.contains("hidden")) renderParentDashboard();
  } catch {
    // Static local hosting has no API. The app remains local-first.
  }
}

async function syncProfileToCloud(profile = state.profile) {
  if (!profile?.id) return;
  try {
    const response = await fetch(`${apiBase}/profiles`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ profile })
    });
    if (!response.ok) return;
    const body = await response.json();
    profile.cloudSyncedAt = body.syncedAt || new Date().toISOString();
    saveProfiles();
  } catch {
    // Cloud sync is best-effort; local progress is still saved.
  }
}

async function logCloudEvent(eventType, payload = {}, profile = state.profile) {
  if (!profile?.id) return;
  try {
    await fetch(`${apiBase}/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ profileId: profile.id, eventType, payload })
    });
  } catch {
    // Event logging is best-effort.
  }
}

async function purgeCloudData() {
  try {
    await fetch(`${apiBase}/profiles`, { method: "DELETE" });
  } catch {
    // Local reset can still succeed without the cloud API.
  }
}

function normalizeProfiles() {
  Object.values(state.profiles).forEach((profile) => {
    profile.stars ||= 0;
    profile.attempts ||= [];
    profile.trainingCompleted ||= {};
    profile.writingSamples ||= [];
  });
  saveProfiles();
}

function renderRoleScreen() {
  state.selectedRole = "";
  passwordForm.classList.add("hidden");
  roleScreen.querySelectorAll("[data-role]").forEach((button) => button.classList.remove("selected"));
}

function selectRole(role) {
  state.selectedRole = role;
  roleScreen.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.role === role);
  });
  passwordLabel.textContent = role === "parent" ? "Parent password" : "Kid password";
  modePassword.placeholder = role === "parent" ? "12345" : "abcde";
  passwordForm.classList.remove("hidden");
  modePassword.focus();
}

function profileKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `student-${Date.now()}`;
}

function activateProfile(name) {
  const id = profileKey(name);
  if (!state.profiles[id]) {
    state.profiles[id] = {
      id,
      name,
      createdAt: new Date().toISOString(),
      stars: 0,
      attempts: [],
      trainingCompleted: {},
      writingSamples: []
    };
    showToast(`Profile ready for ${name}.`);
  }
  state.profileId = id;
  state.profile = state.profiles[id];
  normalizeProfiles();
  saveProfiles();
  syncProfileToCloud();
  renderDashboard();
  showScreen("dashboard");
}

function renderProfileScreen() {
  profileName.value = "";
  const profiles = Object.values(state.profiles);
  savedProfiles.innerHTML = profiles.length
    ? `<p class="saved-label">Continue a journey</p>${profiles.map((profile) => `<button class="profile-chip" type="button" data-profile="${profile.id}">${escapeHtml(profile.name)}</button>`).join("")}`
    : `<p class="saved-label">No profiles yet. Start with a first name.</p>`;

  savedProfiles.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileId = button.dataset.profile;
      state.profile = state.profiles[state.profileId];
      saveProfiles();
      renderDashboard();
      showScreen("dashboard");
    });
  });
}

function renderDashboard() {
  welcomeName.textContent = `${state.profile.name}'s Quest`;
  starTotal.textContent = state.profile.stars;
  testsDone.textContent = state.profile.attempts.length;
  bestScore.textContent = `${bestAttemptScore()}%`;
  trainingDone.textContent = Object.keys(state.profile.trainingCompleted).length;
  renderLevelMap();
  renderTrend();
  renderTrainingQueue();
  renderCoachNote();
}

function renderParentDashboard() {
  normalizeProfiles();
  const profiles = Object.values(state.profiles);
  if (!profiles.length) {
    parentRecommendation.innerHTML = `
      <p class="eyebrow">Recommendation</p>
      <h3>No child profile yet.</h3>
      <p>Switch to Kid mode, create a first-name profile, and complete a quest. Parent analytics will appear here immediately after that.</p>
    `;
    parentProfileList.innerHTML = `<div class="empty-state">No profiles yet.</div>`;
    parentOverview.innerHTML = "";
    parentQuestionTable.innerHTML = "";
    parentTrainingTable.innerHTML = "";
    return;
  }

  if (!state.parentProfileId || !state.profiles[state.parentProfileId]) {
    state.parentProfileId = state.profileId && state.profiles[state.profileId] ? state.profileId : profiles[0].id;
  }

  const profile = state.profiles[state.parentProfileId];
  const attempts = profile.attempts || [];
  const questionStats = attempts.flatMap((attempt) =>
    (attempt.questionStats || []).map((question) => ({ ...question, attempt }))
  );
  const markedQuestions = questionStats.filter((question) => question.format !== "writing");
  const totalQuestions = questionStats.length;
  const averageScore = attempts.length
    ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.percent, 0) / attempts.length)
    : 0;
  const slowOrWrong = getSlowOrWrongQuestions(questionStats);
  const training = getTrainingCoverage(profile);

  parentProfileList.innerHTML = profiles.map((item) => `
    <button class="parent-profile-button ${item.id === profile.id ? "active" : ""}" type="button" data-parent-profile="${item.id}">
      <span>${escapeHtml(item.name)}</span>
      <small>${(item.attempts || []).length} tests</small>
    </button>
  `).join("");
  parentProfileList.querySelectorAll("[data-parent-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      state.parentProfileId = button.dataset.parentProfile;
      renderParentDashboard();
    });
  });

  parentOverview.innerHTML = `
    <div class="parent-stat"><strong>${attempts.length}</strong><span>tests taken</span></div>
    <div class="parent-stat"><strong>${totalQuestions}</strong><span>questions seen</span></div>
    <div class="parent-stat"><strong>${averageScore}%</strong><span>average score</span></div>
    <div class="parent-stat"><strong>${training.completed.length}</strong><span>trainings taken</span></div>
  `;

  parentRecommendation.innerHTML = renderParentRecommendation(profile, slowOrWrong, training, averageScore, markedQuestions);
  parentQuestionTable.innerHTML = renderParentQuestionRows(slowOrWrong);
  parentTrainingTable.innerHTML = renderParentTrainingRows(training);
}

function handleParentReset() {
  const first = window.confirm("This will delete every child profile, test attempt, training record, and writing sample stored in this browser. Continue?");
  if (!first) return;

  const typed = window.prompt("Type RESET to permanently purge Bright Quest data from this browser.");
  if (typed !== "RESET") {
    showToast("Reset cancelled.");
    return;
  }

  localStorage.removeItem(storageKey);
  localStorage.removeItem("brightQuestActiveProfile");
  purgeCloudData();
  state.profiles = {};
  state.profileId = "";
  state.profile = null;
  state.parentProfileId = "";
  renderParentDashboard();
  showToast("All saved Bright Quest data has been reset.");
}

function getSlowOrWrongQuestions(questionStats) {
  return questionStats
    .filter((question) => question.format !== "writing")
    .map((question) => ({
      ...question,
      attentionScore: question.secondsSpent + (question.correct === false ? 90 : 0)
    }))
    .sort((a, b) => b.attentionScore - a.attentionScore)
    .slice(0, 12);
}

function getTrainingCoverage(profile) {
  const completedMap = profile.trainingCompleted || {};
  const allSkills = Object.keys(data.lessons).sort();
  const completed = allSkills.filter((skill) => completedMap[skill]);
  const untouched = allSkills.filter((skill) => !completedMap[skill]);
  return { completed, untouched, completedMap };
}

function renderParentRecommendation(profile, slowOrWrong, training, averageScore, markedQuestions) {
  const weakestSkill = mostCommon(
    markedQuestions.filter((question) => question.correct === false).map((question) => question.skill)
  );
  const slowest = slowOrWrong[0];
  let headline = `${profile.name} is ready to start building a pattern.`;
  let copy = "Complete one timed quest to unlock more precise recommendations.";

  if (markedQuestions.length) {
    if (weakestSkill) {
      headline = `Focus next on ${weakestSkill}.`;
      copy = `${profile.name} is missing this skill most often. Start with the mini training, then retry the latest unfinished or low-scoring level.`;
    } else if (slowest) {
      headline = `Build speed on ${slowest.skill}.`;
      copy = `The longest time was spent on a ${slowest.section} question. Practise the related mini lesson, then do one timed level without pausing too long.`;
    }
    if (averageScore >= 80) {
      headline = "Shift from accuracy to pressure control.";
      copy = `${profile.name}'s accuracy is strong. The next lift is finishing cleanly with the timer running and reducing slow questions.`;
    }
  }

  const untouchedNote = training.untouched.length
    ? `${training.untouched.length} training areas are still untouched.`
    : "All training areas have been opened at least once.";

  return `
    <p class="eyebrow">Recommendation</p>
    <h3>${escapeHtml(headline)}</h3>
    <p>${escapeHtml(copy)} ${escapeHtml(untouchedNote)}</p>
  `;
}

function renderParentQuestionRows(questions) {
  if (!questions.length) {
    return `<div class="empty-state">No question timing yet. Complete a test to see stuck points.</div>`;
  }

  const summaries = Object.values(questions.reduce((acc, question) => {
    const key = question.skill;
    acc[key] ||= {
      skill: question.skill,
      section: question.section,
      count: 0,
      missed: 0,
      seconds: 0,
      questions: []
    };
    acc[key].count += 1;
    acc[key].missed += question.correct === false ? 1 : 0;
    acc[key].seconds += question.secondsSpent;
    acc[key].questions.push(question);
    return acc;
  }, {})).sort((a, b) => b.missed - a.missed || b.seconds - a.seconds);

  return summaries.map((summary) => `
    <div class="parent-row">
      <div>
        <h4>${escapeHtml(summary.skill)}</h4>
        <p>${escapeHtml(summary.section)} / ${summary.count} flagged question(s) / ${summary.missed} missed</p>
      </div>
      <strong>${formatDuration(summary.seconds)}</strong>
      <details>
        <summary>Show exact questions</summary>
        <div class="detail-panel">
          ${summary.questions.map((question) => `
            <p><strong>Q${question.number}</strong> ${escapeHtml(question.attempt.levelName)} - ${question.correct ? "correct but slow" : "missed"} - ${formatDuration(question.secondsSpent)}</p>
            <p>${escapeHtml(shorten(question.prompt, 190))}</p>
            ${question.correct === false ? `<p>Correct: ${escapeHtml(question.correctText || "")}</p>` : ""}
          `).join("")}
        </div>
      </details>
    </div>
  `).join("");
}

function renderParentTrainingRows(training) {
  const completedRows = training.completed.map((skill) => `
    <div class="parent-row">
      <div>
        <h4>${escapeHtml(skill)}</h4>
        <p>Completed ${training.completedMap[skill].count || 1} time(s)</p>
      </div>
      <strong>Done</strong>
    </div>
  `);
  const untouchedRows = training.untouched.slice(0, 12).map((skill) => `
    <div class="parent-row">
      <div>
        <h4>${escapeHtml(skill)}</h4>
        <p>Not touched yet</p>
      </div>
      <strong>Open</strong>
    </div>
  `);

  return [...completedRows, ...untouchedRows].join("") || `<div class="empty-state">No training catalogue found.</div>`;
}

function mostCommon(values) {
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function renderLevelMap() {
  const latestByLevel = latestAttemptsByLevel();
  const levels = getAllLevels();
  levelMap.innerHTML = levels.map((level) => {
    const attempt = latestByLevel[level.level];
    const score = attempt ? `${attempt.percent}%` : "New";
    const status = attempt ? scoreLabel(attempt.percent) : "Not started";
    return `
      <button class="level-node ${attempt ? "completed" : ""}" type="button" data-level="${level.level}">
        <span class="level-orb">${level.level}</span>
        <span class="level-copy">
          <strong>${level.name}</strong>
          <small>${level.theme}</small>
        </span>
        <span class="level-score">${score}<small>${status}</small></span>
      </button>
    `;
  }).join("");

  levelMap.querySelectorAll("[data-level]").forEach((button) => {
    button.addEventListener("click", () => startLevel(Number(button.dataset.level)));
  });
}

function renderTrend() {
  const attempts = state.profile.attempts.slice(-10);
  if (!attempts.length) {
    trendChart.innerHTML = `<div class="empty-state">Complete a timed quest and your progress line appears here.</div>`;
    return;
  }

  const width = 640;
  const height = 210;
  const padding = 28;
  const points = attempts.map((attempt, index) => {
    const x = attempts.length === 1 ? width / 2 : padding + (index * (width - padding * 2)) / (attempts.length - 1);
    const y = height - padding - (attempt.percent / 100) * (height - padding * 2);
    return { x, y, attempt };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

  trendChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Score trend chart">
      <defs>
        <linearGradient id="trendGradient" x1="0" x2="1">
          <stop offset="0%" stop-color="#ffbf3f"/>
          <stop offset="50%" stop-color="#22b8cf"/>
          <stop offset="100%" stop-color="#7c5cff"/>
        </linearGradient>
      </defs>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="chart-axis"/>
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="chart-axis"/>
      <polyline points="${polyline}" class="trend-line"/>
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="8" class="trend-dot"><title>Level ${point.attempt.level}: ${point.attempt.percent}%</title></circle>`).join("")}
    </svg>
  `;
}

function renderTrainingQueue() {
  const weakSkills = weakSkillCounts();
  const skills = Object.entries(weakSkills).sort((a, b) => b[1] - a[1]).slice(0, 4);
  if (!skills.length) {
    trainingQueue.innerHTML = `<div class="empty-state">No weak spots yet. Start a timed quest and I will build your training queue.</div>`;
    return;
  }
  trainingQueue.innerHTML = skills.map(([skill, count]) => `
    <button class="training-chip" type="button" data-skill="${escapeAttr(skill)}">
      <span>${escapeHtml(skill)}</span>
      <small>${count} to practise</small>
    </button>
  `).join("");
  trainingQueue.querySelectorAll("[data-skill]").forEach((button) => {
    button.addEventListener("click", () => openTraining(button.dataset.skill));
  });
}

function openGamesList() {
  const completedLevels = new Set((state.profile.attempts || []).map((attempt) => attempt.level));
  gamesList.innerHTML = gameCatalogue.map((game) => {
    const unlocked = completedLevels.has(game.level);
    return `
      <article class="game-tile">
        <p class="eyebrow">Level ${game.level}</p>
        <strong>${escapeHtml(game.name)}</strong>
        <span>${escapeHtml(game.description)}</span>
        <small>${unlocked ? "Unlocked" : "Complete this test to unlock"}</small>
        ${unlocked ? `<button class="button button-primary" type="button" data-play-game="${game.level}">Play</button>` : ""}
      </article>
    `;
  }).join("");

  gamesList.querySelectorAll("[data-play-game]").forEach((button) => {
    button.addEventListener("click", () => {
      const game = gameCatalogue.find((item) => item.level === Number(button.dataset.playGame));
      startRewardGame(game);
    });
  });

  showScreen("gamesList");
}

function openGrammarGym() {
  const grammarSkills = [
    "Grammar",
    "Punctuation",
    "Sentence logic",
    "Spelling",
    "Vocabulary",
    "Reading comprehension",
    "Inference",
    "Written expression"
  ];
  const completed = state.profile.trainingCompleted || {};

  grammarSpotlight.innerHTML = `
    <p class="eyebrow">Coach path</p>
    <h3>Train the sentence engine.</h3>
    <p>Pick a grammar skill, learn the move, then try one fast practice question. Completed lessons add stars and appear in the parent dashboard.</p>
  `;

  grammarLessonList.innerHTML = grammarSkills.map((skill) => {
    const lesson = data.lessons[skill];
    const done = completed[skill];
    return `
      <article class="grammar-card">
        <p class="eyebrow">${done ? "Practised" : "Ready"}</p>
        <strong>${escapeHtml(skill)}</strong>
        <span>${escapeHtml(lesson?.rule || "Build accuracy and confidence with this English skill.")}</span>
        <small>${done ? `Completed ${done.count || 1} time(s)` : "Not tried yet"}</small>
        <button class="button button-primary" type="button" data-grammar-skill="${escapeAttr(skill)}">Train</button>
      </article>
    `;
  }).join("");

  grammarLessonList.querySelectorAll("[data-grammar-skill]").forEach((button) => {
    button.addEventListener("click", () => openTraining(button.dataset.grammarSkill));
  });

  showScreen("grammarGym");
}

function gameForLevel(level) {
  return gameCatalogue.find((game) => game.level === level) || gameCatalogue[0];
}

function renderCoachNote() {
  const best = bestAttemptScore();
  if (!state.profile.attempts.length) {
    coachHeadline.textContent = "Start with calm speed.";
    coachCopy.textContent = "The timer is there to practise courage. Answer steadily, skip when stuck, and come back if time allows.";
  } else if (best >= 80) {
    coachHeadline.textContent = "You are building exam confidence.";
    coachCopy.textContent = "Now aim for clean explanations and fewer careless slips under the timer.";
  } else {
    coachHeadline.textContent = "Train the pattern, then try again.";
    coachCopy.textContent = "Wrong answers are not failures here. They unlock exactly the lesson you need next.";
  }
}

function startLevel(levelNumber) {
  const level = getAllLevels().find((item) => item.level === levelNumber);
  state.activeLevel = level;
  state.activeQuestion = 0;
  state.answers = level.questions.map(() => ({ selected: null, writing: "" }));
  state.questionTimes = level.questions.map(() => 0);
  state.questionStartedAt = Date.now();
  state.startedAt = Date.now();
  state.remainingSeconds = level.minutes * 60;
  testLevelLabel.textContent = `Level ${level.level} / 7`;
  testName.textContent = level.name;
  renderQuestion();
  startTimer();
  showScreen("test");
  showToast(randomEncouragement());
}

function startTimer() {
  stopTimer();
  updateTimerDisplay();
  state.timerId = setInterval(() => {
    state.remainingSeconds -= 1;
    updateTimerDisplay();
    if (state.remainingSeconds <= 0) finishTest(true);
  }, 1000);
}

function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function updateTimerDisplay() {
  const safeSeconds = Math.max(0, state.remainingSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  timerText.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.querySelector("#timer").classList.toggle("urgent", safeSeconds <= 180);
}

function renderQuestion() {
  const question = currentQuestion();
  const total = state.activeLevel.questions.length;
  const answer = state.answers[state.activeQuestion];
  const remaining = total - state.activeQuestion;
  questionNumber.textContent = `Question ${state.activeQuestion + 1} of ${total}`;
  questionSection.textContent = question.section;
  questionSkill.textContent = question.skill;
  questionPrompt.textContent = question.prompt;
  testProgressBar.style.width = `${((state.activeQuestion + 1) / total) * 100}%`;
  prevQuestionButton.disabled = state.activeQuestion === 0;
  nextQuestionButton.textContent = state.activeQuestion === total - 1 ? "Finish" : "Next";
  if (remaining <= 5 && remaining > 1) showToast(`Reward game in ${remaining} questions.`);
  if (remaining === 1) showToast("Last question, then reward game unlocks.");

  if (question.format === "writing") {
    optionsGrid.classList.add("hidden");
    writingBox.classList.remove("hidden");
    writingBox.value = answer.writing || "";
    writingBox.oninput = () => {
      state.answers[state.activeQuestion].writing = writingBox.value;
    };
    return;
  }

  writingBox.classList.add("hidden");
  optionsGrid.classList.remove("hidden");
  optionsGrid.innerHTML = question.options.map((option, index) => `
    <button class="option-card ${answer.selected === index ? "selected" : ""}" type="button" data-answer="${index}">
      <span>${String.fromCharCode(65 + index)}</span>
      <strong>${escapeHtml(option)}</strong>
    </button>
  `).join("");
  optionsGrid.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[state.activeQuestion].selected = Number(button.dataset.answer);
      showToast(randomEncouragement());
      renderQuestion();
    });
  });
}

function currentQuestion() {
  return state.activeLevel.questions[state.activeQuestion];
}

function moveQuestion(direction) {
  recordQuestionTime();
  state.activeQuestion = Math.max(0, Math.min(state.activeLevel.questions.length - 1, state.activeQuestion + direction));
  state.questionStartedAt = Date.now();
  renderQuestion();
}

function finishTest(timedOut) {
  recordQuestionTime();
  stopTimer();
  const level = state.activeLevel;
  const marked = level.questions.filter((question) => question.format === "choice");
  let correct = 0;
  const wrong = [];
  const questionStats = [];

  level.questions.forEach((question, index) => {
    const answer = state.answers[index];
    const secondsSpent = Math.round(state.questionTimes[index] / 1000);
    if (question.format === "writing") {
      if (answer.writing.trim()) {
        state.profile.writingSamples.push({
          date: new Date().toISOString(),
          level: level.level,
          prompt: question.prompt,
          response: answer.writing.trim()
        });
      }
      questionStats.push({
        id: question.id,
        number: index + 1,
        section: question.section,
        skill: question.skill,
        prompt: question.prompt,
        format: question.format,
        secondsSpent,
        correct: null,
        selected: null,
        answerText: answer.writing.trim()
      });
      return;
    }
    const isCorrect = answer.selected === question.correct;
    if (isCorrect) correct += 1;
    else wrong.push({
      id: question.id,
      skill: question.skill,
      section: question.section,
      prompt: question.prompt,
      selected: answer.selected,
      correct: question.correct,
      options: question.options,
      explain: question.explain
    });
    questionStats.push({
      id: question.id,
      number: index + 1,
      section: question.section,
      skill: question.skill,
      prompt: question.prompt,
      format: question.format,
      secondsSpent,
      correct: isCorrect,
      selected: answer.selected,
      correctAnswer: question.correct,
      selectedText: answer.selected === null ? "" : question.options[answer.selected],
      correctText: question.options[question.correct]
    });
  });

  const percent = Math.round((correct / marked.length) * 100);
  const attempt = {
    id: crypto.randomUUID ? crypto.randomUUID() : `attempt-${Date.now()}`,
    date: new Date().toISOString(),
    level: level.level,
    levelName: level.name,
    correct,
    total: marked.length,
    percent,
    secondsUsed: Math.round((Date.now() - state.startedAt) / 1000),
    timedOut,
    wrong,
    questionStats
  };

  state.profile.attempts.push(attempt);
  state.profile.stars += Math.max(3, Math.round(percent / 10));
  state.latestResult = attempt;
  saveProfiles();
  syncProfileToCloud();
  logCloudEvent("test_completed", attempt);
  renderResult(attempt);
  burstConfetti(percent);
  showScreen("result");
}

function recordQuestionTime() {
  if (!state.activeLevel || !state.questionStartedAt) return;
  const elapsed = Date.now() - state.questionStartedAt;
  state.questionTimes[state.activeQuestion] = (state.questionTimes[state.activeQuestion] || 0) + elapsed;
  state.questionStartedAt = Date.now();
}

function renderResult(attempt) {
  const message = data.resultMessages.find((item) => attempt.percent >= item.min);
  resultTitle.textContent = message.title;
  resultCopy.textContent = attempt.timedOut ? `${message.copy} The timer finished, and that is useful pressure practice.` : message.copy;
  resultScore.textContent = `${attempt.percent}%`;
  resultDetails.textContent = `${attempt.correct} of ${attempt.total} correct`;
  reviewTrainingButton.disabled = !attempt.wrong.length;

  if (!attempt.wrong.length) {
    reviewList.innerHTML = `<div class="empty-state bright">No weak spots from this quest. Beautifully steady.</div>`;
    return;
  }

  reviewList.innerHTML = attempt.wrong.map((item) => `
    <article class="review-card">
      <div>
        <p class="eyebrow">${escapeHtml(item.section)} / ${escapeHtml(item.skill)}</p>
        <h3>${escapeHtml(item.prompt)}</h3>
        <p>${escapeHtml(item.explain)}</p>
        <p class="answer-note">Correct answer: ${String.fromCharCode(65 + item.correct)}. ${escapeHtml(item.options[item.correct])}</p>
      </div>
      <button class="button button-soft" type="button" data-train="${escapeAttr(item.skill)}">Mini training</button>
    </article>
  `).join("");

  reviewList.querySelectorAll("[data-train]").forEach((button) => {
    button.addEventListener("click", () => openTraining(button.dataset.train));
  });
}

function openTraining(skill) {
  const lesson = data.lessons[skill] || data.lessons.Grammar;
  state.activeTrainingSkill = skill;
  trainingTitle.textContent = skill;
  trainingSteps.innerHTML = `
    <div class="lesson-badge">${escapeHtml(lesson.title)}</div>
    <h3>${escapeHtml(lesson.rule)}</h3>
    <ol>
      ${lesson.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
    </ol>
    <div class="example-box">${escapeHtml(lesson.example)}</div>
  `;
  trainingPractice.innerHTML = `
    <p class="eyebrow">Try one</p>
    <h3>${escapeHtml(lesson.practicePrompt)}</h3>
    <div class="options-grid mini">
      ${lesson.practiceOptions.map((option, index) => `
        <button class="option-card" type="button" data-mini="${index}">
          <span>${String.fromCharCode(65 + index)}</span>
          <strong>${escapeHtml(option)}</strong>
        </button>
      `).join("")}
    </div>
    <p class="mini-feedback" id="miniFeedback">Choose an answer to warm up the skill.</p>
  `;
  trainingPractice.querySelectorAll("[data-mini]").forEach((button) => {
    button.addEventListener("click", () => {
      const chosen = Number(button.dataset.mini);
      const isCorrect = chosen === lesson.practiceAnswer;
      trainingPractice.querySelectorAll("[data-mini]").forEach((item) => {
        item.classList.toggle("correct", Number(item.dataset.mini) === lesson.practiceAnswer);
        item.classList.toggle("wrong", Number(item.dataset.mini) === chosen && !isCorrect);
      });
      document.querySelector("#miniFeedback").textContent = isCorrect
        ? "Yes. That is the move to remember."
        : "Good practice. Look at the highlighted answer and try that pattern next time.";
    });
  });
  showScreen("training");
}

function completeTraining() {
  if (!state.activeTrainingSkill) return;
  state.profile.trainingCompleted[state.activeTrainingSkill] = {
    date: new Date().toISOString(),
    count: (state.profile.trainingCompleted[state.activeTrainingSkill]?.count || 0) + 1
  };
  state.profile.stars += 2;
  saveProfiles();
  syncProfileToCloud();
  logCloudEvent("training_completed", { skill: state.activeTrainingSkill });
  burstConfetti(80);
  showToast("Training win saved.");
  renderDashboard();
  showScreen("dashboard");
}

function startRewardGame(game = gameForLevel(state.latestResult?.level || state.activeLevel?.level || 1)) {
  stopRewardGameTimers();
  state.activeGame = game;
  state.gameRemainingSeconds = 120;
  state.gameScore = 0;
  state.gameActive = true;
  state.gamePlayerX = 50;
  gameScore.textContent = "0";
  gameTitle.textContent = game.name;
  updateGameTimer();
  gameStage.querySelectorAll(".falling-star").forEach((star) => star.remove());
  gameStage.className = `game-stage ${game.className}`;
  playerShip.style.left = "50%";
  showScreen("game");

  state.gameTimerId = setInterval(() => {
    state.gameRemainingSeconds -= 1;
    updateGameTimer();
    if (state.gameRemainingSeconds <= 0) endRewardGame();
  }, 1000);
  state.gameSpawnId = setInterval(spawnGameObject, game.mode === "burst" ? 560 : 620);
  spawnGameObject();
}

function stopRewardGameTimers() {
  if (state.gameTimerId) clearInterval(state.gameTimerId);
  if (state.gameSpawnId) clearInterval(state.gameSpawnId);
  state.gameTimerId = null;
  state.gameSpawnId = null;
}

function endRewardGame() {
  stopRewardGameTimers();
  if (!state.gameActive) return;
  state.gameActive = false;
  state.profile.stars += Math.min(10, Math.ceil(state.gameScore / 3));
  saveProfiles();
  syncProfileToCloud();
  showToast(`Reward complete. ${state.gameScore} stars caught.`);
  renderDashboard();
  showScreen("dashboard");
}

function updateGameTimer() {
  const safe = Math.max(0, state.gameRemainingSeconds);
  gameTimer.textContent = `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function movePlayer(event) {
  const rect = gameStage.getBoundingClientRect();
  const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
  state.gamePlayerX = x;
  playerShip.style.left = `${x}%`;
}

function spawnGameObject() {
  if (state.activeGame.mode === "burst") {
    spawnBurstTarget();
    return;
  }
  spawnFallingStar();
}

function spawnFallingStar() {
  if (!state.gameActive) return;
  const star = document.createElement("span");
  star.className = "falling-star";
  star.textContent = gameSymbol(state.activeGame.className);
  const startX = 8 + Math.random() * 84;
  let y = -40;
  star.style.left = `${startX}%`;
  star.style.top = `${y}px`;
  gameStage.append(star);

  const speed = state.activeGame.mode === "drift" ? 5 + Math.random() * 4 : 3 + Math.random() * 3;
  const fallId = setInterval(() => {
    if (!state.gameActive) {
      clearInterval(fallId);
      star.remove();
      return;
    }
    y += speed;
    star.style.top = `${y}px`;
    const stageHeight = gameStage.clientHeight;
    const playerDistance = Math.abs(startX - state.gamePlayerX);
    if (y > stageHeight - 78 && playerDistance < (state.activeGame.mode === "drift" ? 7 : 9)) {
      state.gameScore += 1;
      gameScore.textContent = state.gameScore;
      clearInterval(fallId);
      star.remove();
    } else if (y > stageHeight + 40) {
      clearInterval(fallId);
      star.remove();
    }
  }, 24);
}

function spawnBurstTarget() {
  if (!state.gameActive) return;
  const target = document.createElement("button");
  target.className = "falling-star burst-target";
  target.type = "button";
  target.textContent = gameSymbol(state.activeGame.className);
  const startX = 8 + Math.random() * 84;
  let y = gameStage.clientHeight + 20;
  target.style.left = `${startX}%`;
  target.style.top = `${y}px`;
  gameStage.append(target);

  const pop = () => {
    if (!state.gameActive) return;
    state.gameScore += 1;
    gameScore.textContent = state.gameScore;
    target.remove();
  };
  target.addEventListener("pointerdown", pop, { once: true });

  const drift = (Math.random() - 0.5) * 0.45;
  const speed = 2.8 + Math.random() * 2.6;
  const riseId = setInterval(() => {
    if (!state.gameActive) {
      clearInterval(riseId);
      target.remove();
      return;
    }
    y -= speed;
    const currentLeft = Number.parseFloat(target.style.left) + drift;
    target.style.left = `${Math.max(4, Math.min(92, currentLeft))}%`;
    target.style.top = `${y}px`;
    if (y < -50) {
      clearInterval(riseId);
      target.remove();
    }
  }, 24);
}

function gameSymbol(className) {
  const symbols = {
    star: "*",
    meteor: "o",
    rainbow: "+",
    number: "#",
    comet: ">",
    treasure: "$",
    cosmic: "@",
    final: "!"
  };
  return symbols[className] || "*";
}

function latestAttemptsByLevel() {
  return state.profile.attempts.reduce((acc, attempt) => {
    acc[attempt.level] = attempt;
    return acc;
  }, {});
}

function bestAttemptScore() {
  return state.profile.attempts.reduce((best, attempt) => Math.max(best, attempt.percent), 0);
}

function weakSkillCounts() {
  return state.profile.attempts.flatMap((attempt) => attempt.wrong).reduce((acc, item) => {
    acc[item.skill] = (acc[item.skill] || 0) + 1;
    return acc;
  }, {});
}

function firstWeakSkill() {
  const weak = Object.entries(weakSkillCounts()).sort((a, b) => b[1] - a[1]);
  return weak[0]?.[0] || "";
}

function nextSuggestedLevel() {
  const latest = latestAttemptsByLevel();
  for (const level of data.levels) {
    if (!latest[level.level] || latest[level.level].percent < 70) return level.level;
  }
  return finalTest ? finalTest.level : 7;
}

function getAllLevels() {
  return finalTest ? [...data.levels, finalTest] : data.levels;
}

function scoreLabel(percent) {
  if (percent >= 85) return "Sparkling";
  if (percent >= 70) return "Strong";
  if (percent >= 50) return "Training";
  return "Retry";
}

function randomEncouragement() {
  return data.encouragement[Math.floor(Math.random() * data.encouragement.length)];
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => screen.classList.toggle("hidden", key !== name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("hidden"), 1700);
}

function burstConfetti(percent) {
  const count = percent >= 70 ? 36 : 18;
  confettiLayer.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = ["#ffbf3f", "#27d3a2", "#22b8cf", "#ff6b7a", "#7c5cff"][i % 5];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.append(piece);
  }
  setTimeout(() => {
    confettiLayer.innerHTML = "";
  }, 2200);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll(" ", "&#32;");
}

function formatDuration(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safe / 60);
  const remainder = safe % 60;
  return minutes ? `${minutes}m ${String(remainder).padStart(2, "0")}s` : `${remainder}s`;
}

function shorten(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}
