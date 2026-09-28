import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFile, mkdir, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import vm from "node:vm";
import { test, after } from "node:test";

// This suite executes the shipped presentation/autosave scripts in a lightweight
// DOM fixture. It does not launch a browser, use a network, read private profiles,
// change production state or export test hooks into the application.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFile(resolve(root, path), "utf8");
const snapshot = (value) => JSON.parse(JSON.stringify(value));
const sources = Object.fromEntries(await Promise.all([
  "app.js", "app-data.js", "final-test-data.js", "international-tests-data.js",
  "autosave-upgrade.js", "bright-quest-shell-merge.js", "bright-quest-child-experience.js", "learning-experience-uplift.js", "bright-quest-family-auth.js",
  "chemistry-training/chemistry-101-winter-2026/chemistry-101.js"
].map(async (path) => [path, await read(path)])));
const report = { startedAt: new Date().toISOString(), scope: "Isolated Node VM, synthetic data only; not visual or browser QA",
  sourceHashes: Object.fromEntries(Object.entries(sources).map(([path, source]) => [path, createHash("sha256").update(source).digest("hex")])), checks: [] };
const verify = (name, fn) => test(name, async () => {
  try { await fn(); report.checks.push({ name, passed: true }); }
  catch (error) { report.checks.push({ name, passed: false, detail: error.message }); throw error; }
});

class Element {
  constructor(label = "") {
    this.label = label; this.innerHTML = ""; this.textContent = ""; this.value = "";
    this.hidden = false; this.disabled = false; this.dataset = {}; this.listeners = new Map();
    this.attributes = new Map(); this.children = []; this.queries = new Map(); this.style = { setProperty() {}, removeProperty() {} };
    const classes = new Set();
    this.classList = { add: (...xs) => xs.forEach((x) => classes.add(x)), remove: (...xs) => xs.forEach((x) => classes.delete(x)),
      contains: (x) => classes.has(x), toggle: (x, force) => { const on = force ?? !classes.has(x); on ? classes.add(x) : classes.delete(x); return on; } };
  }
  addEventListener(type, fn) { this.listeners.set(type, [...(this.listeners.get(type) || []), fn]); }
  removeEventListener() {}
  querySelector(selector) { if (/Popup|popup|dialog/.test(selector)) return null; if (!this.queries.has(selector)) this.queries.set(selector, new Element(selector)); return this.queries.get(selector); }
  querySelectorAll() { return []; }
  append(...children) { this.children.push(...children); }
  appendChild(child) { this.append(child); return child; }
  prepend(child) { this.children.unshift(child); }
  before() {} after() {} remove() {} closest() { return new Element("ancestor"); }
  setAttribute(key, value) { this.attributes.set(key, value); }
  getAttribute(key) { return this.attributes.get(key) ?? null; }
  removeAttribute(key) { this.attributes.delete(key); }
  focus() {} scrollIntoView() {} contains() { return false; }
  showModal() { this.open = true; } close() { this.open = false; }
  getClientRects() { return [{}]; }
  getBoundingClientRect() { return { top: 0, width: 834, height: 44 }; }
  click() { let stopped = false; for (const fn of this.listeners.get("click") || []) { fn({ target: this, preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() { stopped = true; } }); if (stopped) break; } }
}

const longPrompt = "Original question: " + "Use the recorded evidence before deciding. ".repeat(65) + " PROMPT-END";
const longWriting = "Original writing: " + "The explorer checked each clue and explained the choice. ".repeat(65) + " WRITING-END";
function richProfile(id, name = "Alex") {
  return { id, name, stars: 43, createdAt: "2026-06-01T00:00:00Z", createdByParent: true, cloudVersion: 7,
    unknownFutureField: { keep: [1, "original", { nested: true }] },
    attempts: [{ id: `attempt-${id}`, level: 1, levelName: "Warm Start", date: "2026-09-01T02:00:00Z", correct: 1, total: 3, percent: 33, secondsUsed: 127,
      questionStats: [
        { id: "q-correct", prompt: "Pick the first answer", section: "Maths", skill: "Addition", format: "choice", selected: 0, selectedText: "0", correctText: "0", correct: true, secondsSpent: 19 },
        { id: "q-wrong", prompt: longPrompt, section: "Maths", skill: "Addition", format: "choice", selected: 1, selectedText: "Wrong original answer", correctText: "Right original answer", correct: false, secondsSpent: 31 },
        { id: "q-skipped", prompt: "Not answered", section: "Reasoning", skill: "Patterns", format: "choice", selected: null, selectedText: "", correctText: "Triangle", correct: false, secondsSpent: 0 },
        { id: "q-writing", prompt: longPrompt, section: "Writing", skill: "Writing", format: "writing", answerText: longWriting, secondsSpent: 77 }
      ] }],
    writingSamples: [{ id: `writing-${id}`, date: "2026-09-01T02:00:00Z", prompt: longPrompt, text: longWriting, answerText: longWriting }],
    trainingCompleted: { Addition: { count: 3, date: "2026-09-01T03:00:00Z" } },
    icasAttempts: [{ id: `icas-${id}`, level: "maths-readiness", date: "2026-09-01T04:00:00Z", percent: 50, total: 2, correct: 1, questionStats: [{ prompt: longPrompt, selectedText: "A", correctText: "B", correct: false }] }],
    chemistry101Progress: { courseId: "chemistry-101-winter-2026", chapters: { "hidden-code": { completed: true, watchedSeconds: 180, test: { score: 4, total: 5, answers: [{ prompt: longPrompt, selected: "old answer", correct: false }] } } } },
    physics101Progress: { courseId: "physics-101-advanced-grade-4", chapters: { "force-is-an-interaction": { completed: true, watchedSeconds: 205, bestScore: 8, attempts: 2, test: { score: 8, total: 10, submittedAt: "2026-09-01T00:00:00Z", answers: [{ prompt: longPrompt, selected: "Evidence", correct: true }] } } } },
    activeDraft: { version: 1, id: `draft-${id}`, level: 1, levelName: "Warm Start", status: "paused", activeQuestion: 0, startedAtMs: 1788217200000, remainingSeconds: 1203,
      answers: [{ selected: 0, writing: "" }, { selected: null, writing: longWriting }], questionTimes: [19, 77], unknownDraftField: "retain-me" }
  };
}

function appFunction(name) {
  const source = sources["app.js"];
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `Original app function exists: ${name}`);
  const end = source.indexOf("\n}", start);
  assert.notEqual(end, -1, `Function ends: ${name}`);
  return source.slice(start, end + 2);
}

function createFixture() {
  const nodes = new Map();
  const element = (selector) => {
    if (/Popup|popup/.test(selector)) return null;
    if (!nodes.has(selector)) nodes.set(selector, new Element(selector));
    return nodes.get(selector);
  };
  const document = { querySelector: element, querySelectorAll: () => [], createElement: () => new Element(),
    getElementById: (id) => element(`#${id}`), body: new Element("body"), head: new Element("head"),
    addEventListener() {}, visibilityState: "visible", activeElement: null };
  document.body.classList.add("bq-experience-uplift");
  const storage = new Map(); const sessionStore = new Map(); const windowEvents = new Map(); const requests = []; const localWrites = []; const notices = []; const saves = [];
  const state = { profiles: { one: richProfile("one"), two: richProfile("two") }, profileId: "one", parentProfileId: "one", selectedRole: "parent", activeLevel: null,
    activeQuestion: 0, answers: [], questionTimes: [], questionStartedAt: 0, remainingSeconds: 0, startedAt: 0 };
  state.profile = state.profiles.one;
  const location = { hash: "#parent/overview", href: "http://127.0.0.1/", origin: "http://127.0.0.1", pathname: "/", search: "" };
  const screens = Object.fromEntries(["test", "parent", "dashboard", "international", "result"].map((key) => [key, element(`#${key}Screen`)]));
  screens.test.classList.add("hidden"); screens.dashboard.classList.add("hidden");
  const context = { console, URL, URLSearchParams, Date, JSON, Math, Number, String, Object, Array, Set, Map, Promise, structuredClone, Blob,
    crypto: { randomUUID }, document, location, navigator: {}, state, screens,
    localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => { storage.set(key, String(value)); localWrites.push({ key, value }); }, removeItem: (key) => { storage.delete(key); localWrites.push({ key, removed: true }); } },
    sessionStorage: { getItem: (key) => sessionStore.get(key) ?? null, setItem: (key, value) => sessionStore.set(key, String(value)), removeItem: (key) => sessionStore.delete(key) },
    fetch: async (url, options = {}) => { requests.push({ url: String(url), method: options.method || "GET", body: options.body }); return { ok: false, status: 404, json: async () => ({}) }; },
    setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1, clearInterval() {}, requestAnimationFrame() {},
    MutationObserver: class { observe() {} disconnect() {} },
    renderDashboard() {}, renderParentDashboard() {}, renderResult() {}, openGamesList() {}, openTraining() {}, finishTest() {}, activateProfile() {},
    startLevel(level) { context.startQuest(context.getAllLevels().find((item) => item.level === level)); },
    startInternationalTest(id) { context.startQuest(context.internationalTests.find((item) => item.level === id)); },
    startQuest(level) { if (!level) return; state.activeLevel = level; state.activeQuestion = 0; state.answers = level.questions.map(() => ({ selected: null, writing: "" })); state.questionTimes = level.questions.map(() => 0); state.startedAt = Date.now(); state.remainingSeconds = level.minutes * 60; context.showScreen("test"); },
    stopTimer() {}, startTimer() {}, renderQuestion() {}, recordQuestionTime() {},
    showScreen(name) { for (const [key, screen] of Object.entries(screens)) screen.classList.toggle("hidden", key !== name); },
    showToast(message) { notices.push(message); },
    saveProfiles() { saves.push(snapshot(state.profiles)); }, syncProfileToCloud(profile) { requests.push({ url: "/api/profiles", method: "POST", body: JSON.stringify(profile) }); },
    weakSkillCounts: () => ({}), nextSuggestedLevel: () => 1, latestAttemptsByLevel: () => ({}), randomEncouragement: () => "Synthetic test ready",
    addEventListener(type, callback) { windowEvents.set(type, [...(windowEvents.get(type) || []), callback]); }, scrollTo() {}, history: { pushState() {}, replaceState() {} }, apiBase: "/api", storageKey: "brightQuestProfilesV2"
  };
  for (const name of ["passwordForm", "modePassword", "testLevelLabel", "testName", "parentProfileList", "parentOverview", "parentQuestionTable", "parentTrainingTable", "parentRecommendation", "parentResetButton", "parentExitButton", "switchProfileButton"]) context[name] = element(`#${name}`);
  context.window = context;
  context.BrightQuestFamilyAuth = { enabled: true, requestHeaders: () => ({}) };
  vm.createContext(context);
  for (const path of ["app-data.js", "final-test-data.js", "international-tests-data.js"]) vm.runInContext(sources[path], context, { filename: path });
  context.data = context.BrightQuestData; context.finalTest = context.BrightQuestFinalTest; context.internationalTests = context.BrightQuestInternationalTests;
  for (const name of ["escapeHtml", "escapeAttr", "shorten", "formatDuration", "getTrainingCoverage", "getAllLevels", "normalizeProfiles", "profileKey", "startLevel", "startQuest", "startInternationalTest", "mergeCloudProfile", "mergeSavedRecords", "draftSavedAt", "draftHasCompletedAttempt", "mergeChemistryCourseProgress", "mergePhysicsCourseProgress", "mergePhysicsChapterProgress", "newestPhysicsTest", "mergePhysicsReleasedChapters", "mergeTrainingProgress", "latestProfileDate"]) vm.runInContext(appFunction(name), context);
  function loadShell() {
    const exports = ["normalizeQuestionRecord", "normalizeParentAttempt", "questionStatus", "buildParentMetrics", "focusGroups", "renderAttemptDetailPage", "renderWritingPage", "renderRecordsPage", "renderParentLearningHub", "renderParentEvidenceHub", "chemistryProgress", "physicsProgress", "renderKidMissionControl", "handleKidAction", "handleKidConfirmation", "parentNavButton", "renderKidProgressPage", "renderCityExamPrepPage", "beaconLaunchArt", "sparkboundLaunchArt", "nextChemistryChapterNumber", "icasAnswerCard", "chemistryAnswerCard", "renderDeviceScienceHistory"];
    const tail = `\nwindow.__testShell = {${exports.map((name) => `${name}: typeof ${name} === 'function' ? ${name} : null`).join(",")}};\n`;
    const source = sources["bright-quest-shell-merge.js"].replace(/\}\)\(\);\s*$/, tail + "})();");
    vm.runInContext(source, context, { filename: "bright-quest-shell-merge.js" });
  }
  function loadAutosave() {
    const tail = "\nwindow.__testAutosave = {resumeDraft,saveActiveDraft,normalizeAnswers,normalizeQuestionTimes};\n";
    vm.runInContext(sources["autosave-upgrade.js"].replace(/\}\)\(\);\s*$/, tail + "})();"), context, { filename: "autosave-upgrade.js" });
  }
  function loadChild() {
    const tail = "\nwindow.__testChild = {catalogue,mission,today,learn,play,journey,uiState,updateLibrary,profileUrl};\n";
    vm.runInContext(sources["bright-quest-child-experience.js"].replace(/\}\)\(\);\s*$/, tail + "})();"), context, { filename: "bright-quest-child-experience.js" });
    const api = context.__testShell;
    context.BrightQuestChildExperience.render(element("#brightReferenceDashboard"), { physicsProgress: api.physicsProgress, nextChemistryChapterNumber: api.nextChemistryChapterNumber,
      beaconLaunchArt: api.beaconLaunchArt, sparkboundLaunchArt: api.sparkboundLaunchArt, handleAction: api.handleKidAction, renderExams: api.renderCityExamPrepPage, renderWinter() {} });
  }
  function loadLearning() {
    const tail = "\nwindow.__testLearning = {reviewRows,reviewMarkup,renderCompleteReview};\n";
    vm.runInContext(sources["learning-experience-uplift.js"].replace(/\}\)\(\);\s*$/, tail + "})();"), context, { filename: "learning-experience-uplift.js" });
  }
  async function loadAuth(parentSession, responses) {
    context.fetch = async () => ({ ok: true, status: 200, json: async () => ({ enabled: false }) });
    const tail = "\nwindow.__testAuth = {hydrateProfiles,archiveDeviceProfiles,selectChild,unlockParent,interceptLegacyLogout,setSession(value) { session=value; controller.enabled=true; }};\n";
    const source = sources["bright-quest-family-auth.js"].replace("  initialise();", "  window.__authReady = initialise();").replace(/\}\)\(\);\s*$/, tail + "})();");
    vm.runInContext(source, context, { filename: "bright-quest-family-auth.js" });
    await context.__authReady; context.__testAuth.setSession(parentSession);
    context.fetch = async (url, options = {}) => {
      requests.push({ url, method: options.method || "GET", hasParentCapability: Boolean(options.headers?.["x-bq-parent-capability"]) });
      const next = responses.shift(); assert.ok(next, `Unexpected family API request: ${url}`); assert.equal(url, next.path);
      return { ok: next.ok !== false, status: next.ok === false ? 503 : 200, json: async () => next.body };
    };
  }
  function loadChemistry() {
    const path = "chemistry-training/chemistry-101-winter-2026/chemistry-101.js";
    const tail = "\nwindow.__testChemistry = {profileProgress,mergeCourseProgress,getProgress: () => state.progress};\n";
    const source = sources[path].replace("  init();", "  // Media/UI boot is outside this logic fixture.").replace(/\}\)\(\);\s*$/, tail + "})();");
    vm.runInContext(source, context, { filename: path });
  }
  return { context, state, nodes, storage, sessionStore, requests, localWrites, notices, saves, loadShell, loadAutosave, loadChild, loadLearning, loadAuth, loadChemistry,
    dispatchWindow: (type) => { for (const callback of windowEvents.get(type) || []) callback({ type }); } };
}

verify("Protected content and contracts match baseline with the documented config flag amendment", async () => {
  const baseline = JSON.parse(await read("tools/ui-preservation-baseline.json"));
  assert.ok(Object.keys(baseline.files).length > 30);
  for (const [path, expected] of Object.entries(baseline.files)) {
    const content = (await read(path)).replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
    const amendment = baseline.authorisedAmendments?.[path];
    if (amendment) assert.equal(path, "functions/api/auth/config.js", "Only the reviewed config availability flags are exempt from the original baseline");
    assert.equal(createHash("sha256").update(content).digest("hex"), amendment?.sha256 || expected, `${path} changed outside the reviewed scope`);
  }
});

verify("All retained activity routes and required module assets still exist", async () => {
  const baseline = JSON.parse(await read("tools/ui-preservation-baseline.json"));
  for (const route of baseline.routes) {
    const path = resolve(root, route + "index.html");
    assert.ok(existsSync(path), `Retained route missing: /${route}`);
    const html = await readFile(path, "utf8");
    for (const match of html.matchAll(/(?:src|href)=["']([^"'#]+)["']/g)) {
      const ref = match[1].split(/[?#]/)[0];
      if (/^(https?:|data:|mailto:|\/\/)/.test(ref) || !/\.(?:js|css|svg|png|jpg|json)$/.test(ref)) continue;
      assert.ok(existsSync(resolve(ref.startsWith("/") ? root : dirname(path), ref.replace(/^\//, ""))), `Missing route dependency: /${route} → ${ref}`);
    }
  }
});

verify("Existing device storage and session capability names remain compatible", async () => {
  const keys = {
    "app.js": ["brightQuestProfilesV2", "brightQuestActiveProfile"],
    "bright-quest-family-auth.js": ["brightQuestParentCapability", "brightQuestChildCapability"],
    "icas-prep/icas-prep.js": ["brightQuestIcasDraftsV1", "brightQuestIcasStandaloneAttemptsV1"],
    "chemistry-training/chemistry-101-winter-2026/chemistry-101.js": ["brightQuestChemistry101ProgressV1", "brightQuestProfilesV2"],
    "physics-training/physics-101-advanced-grade-4/physics-101.js": ["brightQuestPhysics101ProgressV1", "brightQuestProfilesV2"],
    "english-grammar/english-grammar.js": ["brightQuestEnglishGrammarLadder"],
    "mechshift-rescue/mechshift-rescue.js": ["brightQuestMechshiftRescueV1"],
    "beacon-brigade/src/app.ts": ["bqBeaconPending:", "bqBeaconDraft:", "bqBeaconDiscovery:", "bqBeaconSettings"],
    "sparkbound/src/app.ts": ["bqSparkPending:", "bqSparkDraft:", "bqSparkHero:", "bqSparkGuide:", "bqSparkSettings"]
  };
  for (const [path, expected] of Object.entries(keys)) {
    const source = await read(path); for (const key of expected) assert.ok(source.includes(key), `${path} no longer references ${key}`);
  }
});

verify("Parent navigation keeps same-name identities and every original profile field", () => {
  const f = createFixture(); const before = snapshot(f.state.profiles); f.loadShell();
  for (const route of ["overview", "learning", "evidence", "exam-results", "exam-results/attempt-one", "focus", "writing", "chemistry", "physics", "icas", "records", "settings"]) {
    f.context.location.hash = `#parent/${route}`; f.context.renderParentDashboard();
    assert.deepEqual(snapshot(f.state.profiles), before, `${route} changed saved profile data`);
  }
  assert.deepEqual(Object.keys(f.state.profiles), ["one", "two"]);
  assert.equal(f.requests.filter((r) => r.method !== "GET").length, 0, "Viewing records must not save or delete profiles");
  assert.equal(f.saves.length, 0, "Viewing records must not rewrite local profiles");
});

verify("Child confirmation never merges profiles that share a display name", () => {
  const f = createFixture(); f.loadShell(); const before = snapshot(f.state.profiles);
  f.state.selectedRole = "kid"; f.context.modePassword.value = "abcde";
  f.context.__testShell.handleKidConfirmation({ preventDefault() {}, stopImmediatePropagation() {} });
  assert.deepEqual(snapshot(f.state.profiles), before);
  assert.equal(f.requests.filter((r) => r.method !== "GET").length, 0);
});

verify("Parent evidence keeps complete long prompts, original writing and recorded answers", () => {
  const f = createFixture(); f.loadShell(); const api = f.context.__testShell;
  const metrics = api.buildParentMetrics(f.state.profile);
  const detail = api.renderAttemptDetailPage(metrics, "attempt-one");
  const writing = api.renderWritingPage(metrics);
  assert.ok(detail.includes(longPrompt), "Full question prompt must remain in answer detail");
  assert.ok(detail.includes("Wrong original answer") && detail.includes("Right original answer"));
  assert.ok(writing.includes(longWriting), "Full original writing must remain available");
  assert.ok(writing.includes(longPrompt), "Full writing prompt must remain available");
  assert.deepEqual(snapshot(metrics.profile), snapshot(f.state.profile));
});

verify("Legacy standalone writing remains accessible even without an attached question record", () => {
  const f = createFixture(); f.state.profile.attempts = []; f.state.profile.writingSamples = [{ date: "2026-05-05", prompt: longPrompt, response: longWriting }]; f.loadShell();
  const api = f.context.__testShell; const html = api.renderWritingPage(api.buildParentMetrics(f.state.profile));
  assert.ok(html.includes(longWriting)); assert.ok(html.includes(longPrompt));
});

verify("ICAS and Chemistry answer details retain full original prompts", () => {
  const f = createFixture(); f.loadShell(); const api = f.context.__testShell;
  const row = { number: 1, prompt: longPrompt, selectedText: "Original", correctText: "Correct", explanation: "Explanation", feedback: "Feedback" };
  assert.ok(api.icasAnswerCard(row, true).includes(longPrompt), "ICAS prompt is truncated without a full view");
  assert.ok(api.chemistryAnswerCard(row, true).includes(longPrompt), "Chemistry prompt is truncated without a full view");
});

verify("Presentation distinguishes incorrect, unanswered, first-choice zero and missing legacy evidence", () => {
  const f = createFixture(); f.loadShell(); const api = f.context.__testShell;
  const inputs = [
    [{ selected: null, selectedText: "", correct: false }, "unanswered"],
    [{ selected: 0, selectedText: "Zero", correct: false }, "incorrect"],
    [{ selected: 0, selectedText: "Zero", correct: true }, "correct"],
    [{ prompt: "Old record has no captured response or marking" }, "unmarked"],
    [{ format: "writing", answerText: longWriting, correct: null }, "writing"]
  ];
  for (const [input, expected] of inputs) {
    const before = snapshot(input);
    assert.equal(api.questionStatus(api.normalizeQuestionRecord(input, 0)), expected);
    assert.deepEqual(input, before, "Presentation classification mutated original record");
  }
});

verify("Chemistry learning summary has correct chapter denominator and submitted-test count", () => {
  const f = createFixture(); f.loadShell(); const api = f.context.__testShell;
  const status = api.chemistryProgress(f.state.profile);
  assert.equal(status.chapters.length, 11); assert.equal(status.completed, 1); assert.equal(status.tests, 1);
  const html = api.renderParentLearningHub(api.buildParentMetrics(f.state.profile));
  assert.ok(!html.includes("undefined")); assert.match(html, /1 of 11 chapters/); assert.match(html, /1 tests? submitted/);
});

verify("Resume restores first-choice index zero, full writing, elapsed timing and unknown metadata", () => {
  const f = createFixture(); f.loadAutosave(); const draft = snapshot(f.state.profile.activeDraft);
  f.context.__testAutosave.resumeDraft(f.state.profile.activeDraft);
  assert.equal(f.state.activeLevel.level, 1); assert.equal(f.state.activeQuestion, 0);
  assert.equal(f.state.answers[0].selected, 0); assert.equal(f.state.answers[1].writing, longWriting);
  assert.equal(f.state.remainingSeconds, 1203); assert.equal(f.state.questionTimes[0], 19);
  assert.equal(f.state.profile.activeDraft.unknownDraftField, "retain-me");
  assert.deepEqual(snapshot(f.state.profile.activeDraft), draft, "Resume must not erase or reinitialise the saved draft");
});

verify("Unknown or retired saved test is retained without starting or deleting it", () => {
  const f = createFixture(); f.state.profile.activeDraft.level = "retired-test-2030"; f.loadAutosave();
  const before = snapshot(f.state.profile); f.context.__testAutosave.resumeDraft(f.state.profile.activeDraft);
  assert.deepEqual(snapshot(f.state.profile), before);
  assert.equal(f.state.activeLevel, null); assert.equal(f.saves.length, 0);
});

verify("An exhausted draft cannot regain the original full timer on resume", () => {
  const f = createFixture(); f.state.profile.activeDraft.remainingSeconds = 0; f.loadAutosave();
  f.context.__testAutosave.resumeDraft(f.state.profile.activeDraft);
  assert.equal(f.state.remainingSeconds, 0);
});

verify("International draft resumes the same content ID and original selected answer", () => {
  const f = createFixture(); f.state.profile.activeDraft.level = "intl-1"; f.loadAutosave();
  const before = snapshot(f.state.profile.activeDraft);
  f.context.__testAutosave.resumeDraft(f.state.profile.activeDraft);
  assert.equal(f.state.activeLevel?.level, "intl-1"); assert.equal(f.state.answers[0].selected, 0);
  assert.deepEqual(snapshot(f.state.profile.activeDraft), before);
});

verify("Opening another exam cannot silently replace an unfinished draft", () => {
  const f = createFixture(); f.loadAutosave(); const before = snapshot(f.state.profile.activeDraft);
  f.context.startLevel(2);
  assert.deepEqual(snapshot(f.state.profile.activeDraft), before);
  assert.equal(f.state.activeLevel, null);
});

verify("International start guard also protects a paused core exam", () => {
  const f = createFixture(); f.loadAutosave(); const before = snapshot(f.state.profile.activeDraft);
  f.context.startInternationalTest("intl-1");
  assert.deepEqual(snapshot(f.state.profile.activeDraft), before); assert.equal(f.state.activeLevel, null);
});

verify("Fresh international attempts receive a draft through the normal start path", () => {
  const f = createFixture(); delete f.state.profile.activeDraft; const siblingBefore = snapshot(f.state.profiles.two); f.loadAutosave();
  f.context.startInternationalTest("intl-1");
  assert.equal(f.state.activeLevel?.level, "intl-1"); assert.equal(f.state.profile.activeDraft?.level, "intl-1");
  assert.equal(f.state.profile.activeDraft.answers.length, f.state.activeLevel.questions.length);
  assert.deepEqual(snapshot(f.state.profiles.two), siblingBefore);
});

verify("Finishing a test prevents later page-hide saves from recreating its draft", () => {
  const f = createFixture(); f.loadAutosave(); f.context.BrightQuestDrafts.resume(); f.context.finishTest(false);
  assert.equal(f.state.profile.activeDraft, undefined);
  const writes = f.saves.length; f.context.__testAutosave.saveActiveDraft("pagehide", { cloud: true, keepalive: true });
  assert.equal(f.state.profile.activeDraft, undefined); assert.equal(f.saves.length, writes);
});

verify("Save and leave retains responses and prevents background rewriting after return home", () => {
  const f = createFixture(); f.loadAutosave(); f.context.BrightQuestDrafts.resume();
  f.state.answers[0].selected = 0; f.state.answers[1].writing = longWriting; f.state.remainingSeconds = 777;
  f.nodes.get("#exitTestButton").click();
  assert.equal(f.state.profile.activeDraft.status, "paused"); assert.equal(f.state.profile.activeDraft.remainingSeconds, 777);
  assert.equal(f.state.profile.activeDraft.answers[0].selected, 0); assert.equal(f.state.profile.activeDraft.answers[1].writing, longWriting);
  const before = snapshot(f.state.profile.activeDraft); const writes = f.saves.length;
  f.context.showScreen("dashboard"); f.context.__testAutosave.saveActiveDraft("hidden", { cloud: true });
  assert.deepEqual(snapshot(f.state.profile.activeDraft), before); assert.equal(f.saves.length, writes);
});

verify("Learn and Play give retained learning and older game capabilities a visible entry", () => {
  const f = createFixture(); f.loadShell(); f.loadChild(); const api = f.context.__testChild;
  const catalogue = api.catalogue(); const ids = new Set(catalogue.map((item) => item.id));
  for (const id of ["exams", "icas", "winter", "chemistry", "physics", "grammar", "blackboard", "international", "beacon", "sparkbound", "maths-lessons", "secret-alphabet", "chemistry-original"]) assert.ok(ids.has(id), `Missing catalogue capability ${id}`);
  const play = api.play();
  for (const path of ["mechshift-rescue/", "cave-river-quest/", "street-smart-rescue/", "treasure-quest/"]) assert.ok(play.includes(`data-child-href="${path}"`), `Missing Play route ${path}`);
  for (const action of ["beacon-brigade", "sparkbound"]) assert.ok(play.includes(`data-bq-action="${action}"`));
  const originals = api.learn();
  for (const path of ["maths-training/", "chemistry-training/lesson-1/", "chemistry-training/secret-alphabet-session/"]) assert.ok(originals.includes(`data-child-href="${path}"`));
});

verify("Child screens, search and filters never mutate learning records or active draft", () => {
  const f = createFixture(); const before = snapshot(f.state.profiles); f.loadAutosave(); f.loadShell(); f.loadChild(); const api = f.context.__testChild;
  for (const render of [api.today, api.learn, api.play, api.journey]) assert.equal(typeof render(), "string");
  const ref = f.nodes.get("#brightReferenceDashboard");
  Object.assign(api.uiState(), { query: "grammar", subject: "all", type: "all", duration: "all" }); api.updateLibrary(ref);
  assert.ok(ref.querySelector("#bqLibraryResults").innerHTML.includes("Grammar Gym"));
  assert.ok(!ref.querySelector("#bqLibraryResults").innerHTML.includes("Exam Expedition"));
  Object.assign(api.uiState(), { query: "", subject: "science", type: "lesson" }); api.updateLibrary(ref);
  assert.ok(ref.querySelector("#bqLibraryResults").innerHTML.includes("Chemistry Lab"));
  assert.ok(!ref.querySelector("#bqLibraryResults").innerHTML.includes("Grammar Gym"));
  assert.deepEqual(snapshot(f.state.profiles), before); assert.equal(f.saves.length, 0); assert.equal(f.requests.filter((r) => r.method !== "GET").length, 0);
  assert.equal(new URL(api.profileUrl("english-grammar/")).searchParams.get("profileId"), "one");
});

verify("All artwork referenced by the new child screens resolves to an existing local asset", () => {
  const f = createFixture(); f.loadShell(); f.loadChild(); const api = f.context.__testChild;
  const ref = f.nodes.get("#brightReferenceDashboard"); api.updateLibrary(ref);
  const html = [ref.innerHTML, api.today(), api.learn(), api.play(), api.journey(), ref.querySelector("#bqLibraryResults").innerHTML].join("\n");
  const paths = new Set([...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1].split("?")[0]));
  assert.ok(paths.size >= 10, "The fixture inspected actual catalogue and scene artwork");
  for (const path of paths) { if (/^(data:|https?:)/.test(path)) continue; assert.ok(existsSync(resolve(root, path.replace(/^\//, ""))), `Missing child artwork: ${path}`); }
});

verify("Nine illustrated worlds are local WebP assets, all referenced and together below 3.3 MiB", async () => {
  const directory = "assets/ui/illustrated-worlds";
  const files = (await readdir(resolve(root, directory))).filter((name) => name.endsWith(".webp")).sort();
  assert.equal(files.length, 9);
  const consumers = ["bright-quest-child-experience.js", "bright-quest-child-uplift.css", "bright-quest-family-auth.css", "parent-experience-uplift.css"];
  const content = (await Promise.all(consumers.map(read))).join("\n");
  const references = new Set([...content.matchAll(/assets\/ui\/illustrated-worlds\/[a-z-]+\.webp/g)].map((match) => match[0]));
  assert.equal(references.size, 9);
  const illustrations = [];
  for (const name of files) {
    const path = `${directory}/${name}`;
    assert.ok(references.has(path), `Unreferenced scene: ${path}`);
    const bytes = await readFile(resolve(root, path));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF"); assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    illustrations.push({ path, bytes: (await stat(resolve(root, path))).size, sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  const totalBytes = illustrations.reduce((sum, item) => sum + item.bytes, 0);
  assert.ok(totalBytes <= 3.3 * 1024 * 1024, `Scene bundle is ${totalBytes} bytes`);
  assert.doesNotMatch(content, /(?:src\s*=\s*["']|url\(\s*["']?)(?:https?:)?\/\//i, "The new graphics have no external runtime image URL");
  report.illustratedWorlds = { totalBytes, runtimeImageOrigin: "local files", files: illustrations };
});

verify("Today points to a real draft and uses the actual exam duration when no draft exists", () => {
  const f = createFixture(); f.loadAutosave(); f.loadShell(); f.loadChild(); const api = f.context.__testChild;
  assert.equal(api.mission().action, "resume-draft"); assert.equal(api.mission().title, "Warm Start");
  delete f.state.profile.activeDraft; f.state.profile.chemistry101Progress = { chapters: {} };
  const mission = api.mission(); const next = f.context.getAllLevels().find((item) => item.level === 2);
  assert.ok(mission.meta.includes(`${next.minutes} minutes`));
});

verify("Focused result review preserves full answers, writing, statuses and counts without changing the attempt", () => {
  const f = createFixture(); f.loadLearning(); const attempt = f.state.profile.attempts[0]; const before = snapshot(attempt); const api = f.context.__testLearning;
  const rows = api.reviewRows(attempt);
  assert.deepEqual(snapshot(rows.map((row) => row.status)), ["correct", "incorrect", "unanswered", "writing"]);
  assert.ok(api.reviewMarkup(rows[1]).includes(longPrompt)); assert.ok(api.reviewMarkup(rows[3]).includes(longWriting));
  f.context.renderResult(attempt); const html = f.nodes.get("#reviewList").innerHTML;
  for (const label of ["Incorrect", "Unanswered", "Correct", "Writing"]) assert.ok(html.includes(`${label}<span>1</span>`));
  assert.ok(html.includes("All answers<span>4</span>")); assert.deepEqual(snapshot(attempt), before); assert.equal(f.saves.length, 0);
  const older = api.reviewRows({ wrong: [{ selected: 0, correct: 1, options: ["Original first choice", "Correct"], prompt: longPrompt }] });
  assert.equal(older[0].status, "incorrect"); assert.equal(older[0].response, "Original first choice");
});

verify("Result Back to Today uses the child destination and preserves the completed record", () => {
  const f = createFixture(); f.state.selectedRole = "kid"; f.loadShell(); f.loadChild(); f.loadLearning();
  f.context.__testChild.uiState().route = "learn"; const before = snapshot(f.state.profiles);
  f.nodes.get("#resultDashboardButton").click();
  assert.equal(f.context.__testChild.uiState().route, "today"); assert.deepEqual(snapshot(f.state.profiles), before); assert.equal(f.saves.length, 0);
});

function familySession(profile) {
  return { authenticated: true, family: { id: "synthetic-family" }, parentUnlocked: true, activeChildId: "child-one", children: [{ id: "child-one", legacyProfileId: profile.id, name: profile.name, version: 7, payload: snapshot(profile) }] };
}

verify("Return to child retains parent access and data when the lock request fails", async () => {
  const f = createFixture(); const session = familySession(f.state.profile); const before = snapshot(f.state.profiles);
  f.sessionStore.set("brightQuestParentCapability", "synthetic-parent-capability");
  await f.loadAuth(session, [{ path: "/api/auth/session", body: session }, { path: "/api/auth/parent-lock", ok: false, body: { error: "Synthetic offline response" } }]);
  await f.context.BrightQuestFamilyAuth.returnToChild();
  assert.equal(f.state.selectedRole, "parent"); assert.equal(f.sessionStore.get("brightQuestParentCapability"), "synthetic-parent-capability");
  assert.deepEqual(snapshot(f.state.profiles), before); assert.equal(f.saves.length, 0); assert.ok(f.notices.some((text) => text.includes("could not be locked")));
});

verify("Return to child locks first, clears the capability and reads the reduced session before navigation", async () => {
  const f = createFixture(); const parentSession = familySession(f.state.profile); const childSession = { ...snapshot(parentSession), parentUnlocked: false };
  f.sessionStore.set("brightQuestParentCapability", "synthetic-parent-capability");
  await f.loadAuth(parentSession, [{ path: "/api/auth/session", body: parentSession }, { path: "/api/auth/parent-lock", body: { ok: true } }, { path: "/api/auth/session", body: childSession }]);
  await f.context.BrightQuestFamilyAuth.returnToChild();
  assert.deepEqual(f.requests.map((r) => [r.url, r.method]), [["/api/auth/session", "GET"], ["/api/auth/parent-lock", "POST"], ["/api/auth/session", "GET"]]);
  assert.equal(f.requests[2].hasParentCapability, false); assert.equal(f.sessionStore.has("brightQuestParentCapability"), false);
  assert.equal(f.state.selectedRole, "kid"); assert.equal(f.state.profileId, "one"); assert.equal(f.context.location.hash, "child/today");
  assert.equal(f.state.profile.attempts[0].questionStats[3].answerText, longWriting);
});

verify("A failed session refresh after locking never opens a child view with stale parent history", async () => {
  const f = createFixture(); const session = familySession(f.state.profile);
  f.sessionStore.set("brightQuestParentCapability", "synthetic-parent-capability");
  await f.loadAuth(session, [{ path: "/api/auth/session", body: session }, { path: "/api/auth/parent-lock", body: { ok: true } }, { path: "/api/auth/session", ok: false, body: {} }]);
  await f.context.BrightQuestFamilyAuth.returnToChild();
  assert.equal(f.sessionStore.has("brightQuestParentCapability"), false); assert.equal(f.state.selectedRole, "parent");
  assert.equal(f.context.screens.dashboard.classList.contains("hidden"), true); assert.equal(f.context.screens.parent.classList.contains("hidden"), true);
  assert.equal(f.nodes.get("#familyAuthScreen").classList.contains("hidden"), false);
  assert.match(f.nodes.get("#familyAuthMessage").textContent, /Parent access is locked/);
});

verify("Same-family hydration preserves unsynced records and a genuine newer draft", async () => {
  const f = createFixture(); const session = familySession(f.state.profile);
  await f.loadAuth(session, []); f.context.__testAuth.hydrateProfiles();
  const local = f.state.profiles.one;
  local.attempts.push({ id: "unsynced-attempt", level: 2, date: "2026-09-28T00:00:00Z", percent: 4, questionStats: [{ selected: 0, answerText: longWriting }] });
  local.activeDraft = { id: "newer-draft", level: 1, startedAtMs: Date.parse("2026-09-29T00:00:00Z"), remainingSeconds: 91, answers: [{ selected: 0, writing: longWriting }] };
  local.stars = 46;
  const stale = familySession(richProfile("one")); stale.children[0].version = 8;
  f.context.__testAuth.setSession(stale); f.context.__testAuth.hydrateProfiles();
  assert.equal(f.state.profiles.one.attempts.length, 2); assert.equal(f.state.profiles.one.attempts[1].questionStats[0].answerText, longWriting);
  assert.equal(f.state.profiles.one.activeDraft.id, "newer-draft"); assert.equal(f.state.profiles.one.activeDraft.answers[0].selected, 0);
  assert.equal(f.state.profiles.one.stars, 46); assert.equal(f.state.profiles.one.cloudVersion, 8);
  assert.deepEqual(Object.keys(f.state.profiles), ["one"]);
});

verify("Hydration never attaches another family's cached work to a matching legacy ID", async () => {
  const f = createFixture(); const session = familySession(f.state.profile);
  await f.loadAuth(session, []); f.context.__testAuth.hydrateProfiles();
  const foreignRecord = { id: "foreign-unsynced", level: 3, questionStats: [{ answerText: "Other family private writing" }] };
  f.state.profiles.one.attempts.push(foreignRecord);
  f.storage.set("brightQuestProfilesV2", JSON.stringify(f.state.profiles));
  const different = familySession({ id: "one", name: "Different family Alex", stars: 0, attempts: [], writingSamples: [] });
  different.family.id = "another-family";
  f.context.__testAuth.setSession(different); f.context.__testAuth.hydrateProfiles();
  assert.equal(f.state.profiles.one.attempts.length, 0); assert.equal(f.state.profiles.one.stars, 0);
  assert.equal(f.state.profiles.one.name, "Different family Alex"); assert.equal(f.state.profiles.one.activeDraft, undefined);
});

verify("A redacted sibling payload never receives local private history during hydration", async () => {
  const f = createFixture(); const full = familySession(f.state.profile);
  full.children.push({ id: "child-two", legacyProfileId: "two", name: "Alex", version: 7, payload: snapshot(f.state.profiles.two) });
  await f.loadAuth(full, []); f.context.__testAuth.hydrateProfiles();
  const reduced = snapshot(full); reduced.parentUnlocked = false; reduced.children[1].payload = null;
  f.context.__testAuth.setSession(reduced); f.context.__testAuth.hydrateProfiles();
  assert.equal(f.state.profiles.one.attempts.length, 1); assert.equal(f.state.profiles.two.attempts.length, 0);
  assert.equal(f.state.profiles.two.writingSamples.length, 0); assert.equal(f.state.profiles.two.activeDraft, undefined);
  assert.equal(f.state.profiles.two.chemistry101Progress, undefined);
});

verify("Reload restores cached work only with matching family, database child and profile ownership", async () => {
  const f = createFixture(); const cached = richProfile("one");
  cached.attempts.push({ id: "offline-evidence", date: "2026-09-29", level: 2, questionStats: [{ selected: 0, answerText: longWriting }] });
  cached.activeDraft = { id: "offline-draft", level: 3, startedAtMs: Date.parse("2026-09-30"), remainingSeconds: 321, answers: [{ selected: 0 }] };
  const session = familySession({ id: "one", name: "Alex", stars: 3, attempts: [] });
  f.storage.set("brightQuestProfilesV2", JSON.stringify({ one: cached }));
  f.storage.set("brightQuestFamilyProfileCacheOwnerV1", JSON.stringify({ familyId: "synthetic-family", children: { "child-one": "one" } }));
  await f.loadAuth(session, []); f.context.__testAuth.hydrateProfiles();
  assert.equal(f.state.profiles.one.attempts.length, 2); assert.equal(f.state.profiles.one.attempts[1].questionStats[0].answerText, longWriting);
  assert.equal(f.state.profiles.one.activeDraft.id, "offline-draft"); assert.equal(f.state.profiles.one.activeDraft.remainingSeconds, 321);
  assert.equal(f.state.profiles.one.stars, 43); assert.equal(f.state.profiles.one.cloudVersion, 7);
});

verify("Missing or mismatched cache ownership never attributes device history by a legacy profile ID", async () => {
  for (const owner of [null, {}, { familyId: "another-family", children: { "child-one": "one" } },
    { familyId: "synthetic-family", children: { "different-database-child": "one" } },
    { familyId: "synthetic-family", children: { "child-one": "different-profile" } }]) {
    const f = createFixture(); const session = familySession({ id: "one", name: "Alex", stars: 0, attempts: [] });
    f.storage.set("brightQuestProfilesV2", JSON.stringify(f.state.profiles));
    if (owner !== null) f.storage.set("brightQuestFamilyProfileCacheOwnerV1", JSON.stringify(owner));
    await f.loadAuth(session, []); f.context.__testAuth.hydrateProfiles();
    assert.equal(f.state.profiles.one.attempts.length, 0); assert.equal(f.state.profiles.one.stars, 0); assert.equal(f.state.profiles.one.activeDraft, undefined);
  }
});

verify("Malformed and JSON-null cache metadata cannot break authorised cloud profile loading", async () => {
  for (const [cache, owner] of [["null", "null"], ["null", '{"familyId":"synthetic-family","children":{"child-one":"one"}}'], ["not-json", "null"], ["[]", "[]"]]) {
    const f = createFixture(); const session = familySession({ id: "one", name: "Alex", stars: 2, attempts: [] });
    f.storage.set("brightQuestProfilesV2", cache); f.storage.set("brightQuestFamilyProfileCacheOwnerV1", owner);
    await f.loadAuth(session, []); f.context.__testAuth.hydrateProfiles();
    assert.equal(f.state.profiles.one.stars, 2); assert.equal(f.state.profiles.one.attempts.length, 0);
  }
});

verify("Unowned or differently owned device history is archived verbatim before authorised hydration replaces its cache", async () => {
  for (const owner of [null, JSON.stringify({ familyId: "other-family", children: { "other-child": "one" } })]) {
    const f = createFixture(); const original = JSON.stringify(f.state.profiles);
    const session = familySession({ id: "one", name: "Current family", stars: 0, attempts: [] });
    f.storage.set("brightQuestProfilesV2", original);
    if (owner !== null) f.storage.set("brightQuestFamilyProfileCacheOwnerV1", owner);
    f.context.saveProfiles = () => f.context.localStorage.setItem("brightQuestProfilesV2", JSON.stringify(f.state.profiles));
    await f.loadAuth(session, []); assert.equal(f.context.__testAuth.hydrateProfiles(), true);
    const archive = JSON.parse(f.storage.get("brightQuestDeviceProfileRecoveryV1"));
    assert.equal(archive.entries.length, 1); assert.equal(archive.entries[0].profileCache, original); assert.equal(archive.entries[0].ownerMetadata, owner);
    assert.equal(f.state.profiles.one.attempts.length, 0); assert.equal(f.state.profiles.two, undefined);
    assert.equal(JSON.parse(f.storage.get("brightQuestProfilesV2")).one.attempts.length, 0);
    f.storage.set("brightQuestProfilesV2", original);
    owner === null ? f.storage.delete("brightQuestFamilyProfileCacheOwnerV1") : f.storage.set("brightQuestFamilyProfileCacheOwnerV1", owner);
    assert.equal(f.context.__testAuth.hydrateProfiles(), true);
    assert.equal(JSON.parse(f.storage.get("brightQuestDeviceProfileRecoveryV1")).entries.length, 1, "An identical raw cache is retained once");
  }
});

verify("Repeated archive candidates differing only in sync metadata or object key order retain one original copy", async () => {
  const f = createFixture(); await f.loadAuth(familySession(f.state.profile), []);
  const owner = { familyId: "synthetic-family", children: { "child-one": "one", "child-two": "two" } };
  const original = JSON.stringify(f.state.profiles); const rawOwner = JSON.stringify(owner);
  assert.equal(f.context.__testAuth.archiveDeviceProfiles(original, rawOwner), true);
  const changed = snapshot(f.state.profiles);
  for (const profile of Object.values(changed)) { profile.cloudVersion += 10; profile.cloudSyncedAt = "2026-09-29T00:00:00Z"; }
  const reorder = (value) => Array.isArray(value) ? value.map(reorder) : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().reverse().map((key) => [key, reorder(value[key])])) : value;
  assert.equal(f.context.__testAuth.archiveDeviceProfiles(JSON.stringify(reorder(changed)), JSON.stringify(reorder(owner))), true);
  const entries = JSON.parse(f.storage.get("brightQuestDeviceProfileRecoveryV1")).entries;
  assert.equal(entries.length, 1); assert.equal(entries[0].profileCache, original); assert.equal(entries[0].ownerMetadata, rawOwner);
});

verify("Archive comparison preserves changes to answers, drafts, nested or unknown fields and family ownership", async () => {
  const f = createFixture(); await f.loadAuth(familySession(f.state.profile), []);
  const original = snapshot(f.state.profiles); const owner = { familyId: "synthetic-family", children: { "child-one": "one" } };
  const save = (profile, metadata = owner) => f.context.__testAuth.archiveDeviceProfiles(JSON.stringify(profile), JSON.stringify(metadata));
  assert.equal(save(original), true);
  const answer = snapshot(original); answer.one.attempts[0].questionStats[0].selectedText = "New original answer"; assert.equal(save(answer), true);
  const draft = snapshot(original); draft.one.activeDraft.answers[0].selected = 2; assert.equal(save(draft), true);
  const unknown = snapshot(original); unknown.one.unknownFutureField.cloudVersion = 9; assert.equal(save(unknown), true);
  const nested = snapshot(original); nested.one.activeDraft.cloudSyncedAt = "Original nested evidence"; assert.equal(save(nested), true);
  assert.equal(save(original, { ...owner, familyId: "another-family" }), true);
  assert.equal(save(original, { ...owner, children: { "different-child": "one" } }), true);
  assert.equal(JSON.parse(f.storage.get("brightQuestDeviceProfileRecoveryV1")).entries.length, 7);
});

verify("Malformed archive candidates use exact original bytes for comparison", async () => {
  const f = createFixture(); await f.loadAuth(familySession(f.state.profile), []);
  for (const [cache, owner] of [["null", "null"], [" null ", "null"], ["{", null], [" {", null], [JSON.stringify(f.state.profiles), "{"], [JSON.stringify(f.state.profiles), " { "]]) {
    assert.equal(f.context.__testAuth.archiveDeviceProfiles(cache, owner), true);
    assert.equal(f.context.__testAuth.archiveDeviceProfiles(cache, owner), true);
  }
  assert.equal(JSON.parse(f.storage.get("brightQuestDeviceProfileRecoveryV1")).entries.length, 6);
});

verify("A failed recovery archive keeps the original cache and owner and never opens the replacement child", async () => {
  const f = createFixture(); const before = snapshot(f.state.profiles); const original = JSON.stringify(before);
  const owner = JSON.stringify({ familyId: "other-family", children: { "other-child": "one" } });
  f.storage.set("brightQuestProfilesV2", original); f.storage.set("brightQuestFamilyProfileCacheOwnerV1", owner);
  const write = f.context.localStorage.setItem;
  f.context.localStorage.setItem = (key, value) => { if (key === "brightQuestDeviceProfileRecoveryV1") throw new Error("Synthetic full device storage"); write(key, value); };
  f.context.saveProfiles = () => f.context.localStorage.setItem("brightQuestProfilesV2", JSON.stringify(f.state.profiles));
  const session = familySession({ id: "one", name: "Current family", stars: 0, attempts: [] }); session.parentUnlocked = false;
  await f.loadAuth(session, [{ path: "/api/auth/session", body: session }]);
  assert.equal(await f.context.BrightQuestFamilyAuth.returnToChild(), false);
  assert.equal(f.storage.get("brightQuestProfilesV2"), original); assert.equal(f.storage.get("brightQuestFamilyProfileCacheOwnerV1"), owner);
  assert.deepEqual(snapshot(f.state.profiles), before); assert.equal(f.localWrites.length, 0);
  assert.equal(f.context.screens.dashboard.classList.contains("hidden"), true);
  assert.match(f.nodes.get("#familyAuthMessage").textContent, /safe copy of its earlier learning/);
});

verify("Reloading an unselected family retires stale active pointers and preserves private cached history before choosing a child", async () => {
  const f = createFixture(); const session = familySession(f.state.profile);
  session.children.push({ id: "child-two", legacyProfileId: "two", name: "Alex", version: 7, payload: snapshot(f.state.profiles.two) });
  const nextSession = snapshot(session); nextSession.activeChildId = "child-two"; nextSession.parentUnlocked = false; nextSession.children[0].payload = null;
  session.activeChildId = null; session.parentUnlocked = false; session.children.forEach((child) => { child.payload = null; });
  const original = JSON.stringify(f.state.profiles);
  f.storage.set("brightQuestProfilesV2", original);
  f.storage.set("brightQuestFamilyProfileCacheOwnerV1", JSON.stringify({ familyId: "synthetic-family", children: { "child-one": "one", "child-two": "two" } }));
  f.storage.set("brightQuestActiveProfile", "one");
  f.context.saveProfiles = () => f.context.localStorage.setItem("brightQuestProfilesV2", JSON.stringify(f.state.profiles));
  await f.loadAuth(session, [{ path: "/api/auth/session", body: session }, { path: "/api/auth/select-child", body: { ok: true, childCapability: "next-child-capability" } }, { path: "/api/auth/session", body: nextSession }]);
  let saves = 0; f.context.syncProfileToCloud = async () => { saves += 1; return false; };
  await f.context.BrightQuestFamilyAuth.returnToChild();
  assert.equal(f.state.profile, null); assert.equal(f.state.profileId, ""); assert.equal(f.storage.has("brightQuestActiveProfile"), false);
  assert.match(f.nodes.get("#familyNextStep").innerHTML, /Who is learning now/);
  assert.equal(JSON.parse(f.storage.get("brightQuestDeviceProfileRecoveryV1")).entries[0].profileCache, original);
  assert.equal(f.state.profiles.one.attempts.length, 0); assert.equal(f.state.profiles.two.attempts.length, 0);
  f.context.FormData = class { get() { return "7391"; } };
  const form = new Element("choose after reload"); form.dataset.childId = "child-two";
  await f.context.__testAuth.selectChild({ preventDefault() {}, currentTarget: form });
  assert.equal(f.state.profileId, "two"); assert.equal(f.state.selectedRole, "kid"); assert.equal(saves, 0);
});

verify("An unsuccessful cloud save stops parent, child and logout transitions before authentication changes", async () => {
  const f = createFixture(); const session = familySession(f.state.profile);
  await f.loadAuth(session, []); f.context.__testAuth.hydrateProfiles();
  f.state.profile = f.state.profiles.one; f.sessionStore.set("brightQuestParentCapability", "parent-capability");
  f.sessionStore.set("brightQuestChildCapability", "child-capability");
  const before = snapshot(f.state.profiles); const beforeSaves = f.saves.length;
  let saveCalls = 0; f.context.syncProfileToCloud = async () => { saveCalls += 1; return false; };
  f.context.FormData = class { get() { return "7391"; } };
  const event = { preventDefault() {}, currentTarget: new Element("synthetic auth form") };
  await f.context.BrightQuestFamilyAuth.openParent();
  await f.context.BrightQuestFamilyAuth.returnToChild();
  await f.context.__testAuth.selectChild(event);
  await f.context.__testAuth.unlockParent(event);
  await f.context.BrightQuestFamilyAuth.logout();
  assert.equal(saveCalls, 5); assert.equal(f.requests.length, 0);
  assert.equal(f.sessionStore.get("brightQuestParentCapability"), "parent-capability");
  assert.equal(f.sessionStore.get("brightQuestChildCapability"), "child-capability");
  assert.deepEqual(snapshot(f.state.profiles), before); assert.equal(f.saves.length, beforeSaves);
  assert.match(f.nodes.get("#familyAuthMessage").textContent, /Reconnect and try again/);
  assert.equal(f.nodes.get("#familyAuthMessage").classList.contains("hidden"), false);
});

verify("Switch child retires the saved active context so chooser selection, parent access and logout can continue", async () => {
  for (const destination of ["child", "parent", "logout"]) {
    const f = createFixture(); const session = familySession(f.state.profile);
    session.parentUnlocked = false;
    session.children.push({ id: "child-two", legacyProfileId: "two", name: "Alex", version: 7, payload: snapshot(f.state.profiles.two) });
    const nextSession = snapshot(session); nextSession.activeChildId = "child-two"; nextSession.children[0].payload = null;
    const parentSession = snapshot(session); parentSession.parentUnlocked = true;
    const replies = [{ path: "/api/auth/select-child", body: { ok: true } }];
    if (destination === "child") replies.push({ path: "/api/auth/select-child", body: { ok: true, childCapability: "next-child-capability" } }, { path: "/api/auth/session", body: nextSession });
    if (destination === "parent") replies.push({ path: "/api/auth/parent-unlock", body: { ok: true, parentCapability: "next-parent-capability" } }, { path: "/api/auth/session", body: parentSession });
    if (destination === "logout") replies.push({ path: "/api/auth/session", body: { ok: true } });
    await f.loadAuth(session, replies); f.context.__testAuth.hydrateProfiles();
    f.state.profile = f.state.profiles.one; f.state.selectedRole = "kid";
    f.sessionStore.set("brightQuestChildCapability", "previous-child-capability");
    const before = snapshot(f.state.profiles); let saves = 0;
    f.context.syncProfileToCloud = async () => { saves += 1; return f.sessionStore.has("brightQuestChildCapability"); };
    await f.context.__testAuth.interceptLegacyLogout({ preventDefault() {}, stopImmediatePropagation() {} });
    assert.equal(saves, 1); assert.equal(f.state.profile, null); assert.equal(f.state.profileId, "");
    assert.equal(f.sessionStore.has("brightQuestChildCapability"), false); assert.deepEqual(snapshot(f.state.profiles), before);
    assert.match(f.nodes.get("#familyNextStep").innerHTML, /Who is learning now/);
    f.context.FormData = class { get() { return "7391"; } };
    const form = new Element("chooser destination"); form.dataset.childId = "child-two";
    const event = { preventDefault() {}, currentTarget: form };
    if (destination === "child") {
      await f.context.__testAuth.selectChild(event);
      assert.equal(f.state.profileId, "two"); assert.equal(f.state.selectedRole, "kid");
      assert.equal(f.sessionStore.get("brightQuestChildCapability"), "next-child-capability");
    } else if (destination === "parent") {
      await f.context.BrightQuestFamilyAuth.openParent();
      assert.match(f.nodes.get("#familyNextStep").innerHTML, /Enter the parent PIN/);
      await f.context.__testAuth.unlockParent(event);
      assert.equal(f.state.selectedRole, "parent");
      assert.equal(f.sessionStore.get("brightQuestParentCapability"), "next-parent-capability");
    } else {
      await f.context.BrightQuestFamilyAuth.logout();
      assert.equal(f.state.profile, null); assert.equal(f.nodes.get("#familyAuthScreen").dataset.authView, "gateway");
    }
    assert.equal(saves, 1, `The retired child must not be resaved while opening ${destination}`);
    assert.equal(replies.length, 0);
  }
});

verify("Parent Chemistry never attributes unmapped demo history to a named child", () => {
  const f = createFixture(); f.state.profile.chemistry101Progress = { chapters: {} }; f.state.profile.trainingCompleted = {};
  const legacy = { "demo-student": { courseId: "chemistry-101-winter-2026", chapters: { "hidden-code": { completed: true, watchedSeconds: 269, test: { score: 10 } } } } };
  f.storage.set("brightQuestChemistry101ProgressV1", JSON.stringify(legacy)); const before = snapshot(f.state.profiles); f.loadShell();
  const status = f.context.__testShell.chemistryProgress(f.state.profile);
  assert.equal(status.completed, 0); assert.equal(status.tests, 0);
  assert.deepEqual(JSON.parse(f.storage.get("brightQuestChemistry101ProgressV1")), legacy); assert.deepEqual(snapshot(f.state.profiles), before);
});

verify("Chemistry course keeps unmapped demo progress separate from a new named child", () => {
  const f = createFixture(); f.context.location.search = "?profileId=one";
  f.state.profile.chemistry101Progress = { chapters: {} };
  const legacy = { courseId: "chemistry-101-winter-2026", chapters: { "hidden-code": { completed: true, watchedSeconds: 269, test: { score: 10, answers: ["original"] } } } };
  f.storage.set("brightQuestChemistry101ProgressV1", JSON.stringify({ "demo-student": legacy }));
  f.storage.set("brightQuestProfilesV2", JSON.stringify(f.state.profiles)); f.loadChemistry();
  const progress = f.context.__testChemistry.profileProgress();
  assert.deepEqual(snapshot(progress.chapters), {}); assert.equal(progress.migratedFromDemoStudentAt, undefined);
  assert.deepEqual(snapshot(f.context.__testChemistry.getProgress()["demo-student"]), legacy);
});

verify("Chemistry retains already attributed legacy history and merges only the same named child's records", () => {
  const f = createFixture(); f.context.location.search = "?profileId=one";
  const originalAt = "2026-06-01T00:00:00Z";
  const legacy = { chapters: { "particle-states": { completed: true, watchedSeconds: 255 } } };
  const ownDevice = { courseId: "chemistry-101-winter-2026", migratedFromDemoStudentAt: originalAt, chapters: { "hidden-code": { completed: true, watchedSeconds: 269, test: { score: 6, submittedAt: "2026-08-01", answers: ["older answer"] } } } };
  f.storage.set("brightQuestChemistry101ProgressV1", JSON.stringify({ "demo-student": legacy, one: ownDevice }));
  f.state.profile.chemistry101Progress.chapters["hidden-code"].test = { score: 4, submittedAt: "2026-09-01", answers: ["newer original answer"] };
  f.storage.set("brightQuestProfilesV2", JSON.stringify(f.state.profiles)); const sibling = snapshot(f.state.profiles.two); f.loadChemistry();
  const progress = f.context.__testChemistry.profileProgress();
  assert.equal(progress.migratedFromDemoStudentAt, originalAt); assert.equal(progress.chapters["hidden-code"].watchedSeconds, 269);
  assert.equal(progress.chapters["hidden-code"].completed, true); assert.equal(progress.chapters["hidden-code"].test.score, 4);
  assert.deepEqual(snapshot(progress.chapters["hidden-code"].test.answers), ["newer original answer"]);
  assert.equal(progress.chapters["particle-states"], undefined); assert.deepEqual(snapshot(f.context.__testChemistry.getProgress()["demo-student"]), legacy);
  assert.deepEqual(JSON.parse(f.storage.get("brightQuestProfilesV2")).two, sibling);
});

verify("Physics ignores unmapped demo history while preserving a named child's own results", () => {
  const f = createFixture(); f.state.profile.physics101Progress = { chapters: {} }; f.state.profile.trainingCompleted = {};
  const legacy = { chapters: { "force-is-an-interaction": { completed: true, watchedSeconds: 205, test: { score: 10 } } } };
  const own = { chapters: { "motion-tells-the-story": { completed: true, watchedSeconds: 180, test: { score: 7, total: 10, answers: [{ prompt: longPrompt, selected: "Own answer" }] } } } };
  const saved = { "demo-student": legacy, one: own }; f.storage.set("brightQuestPhysics101ProgressV1", JSON.stringify(saved)); f.loadShell();
  const status = f.context.__testShell.physicsProgress(f.state.profile);
  assert.equal(status.completed, 1); assert.equal(status.tests, 1);
  assert.equal(status.chapters.find((chapter) => chapter.id === "force-is-an-interaction").completed, false);
  assert.equal(status.chapters.find((chapter) => chapter.id === "motion-tells-the-story").test.answers[0].selected, "Own answer");
  assert.deepEqual(JSON.parse(f.storage.get("brightQuestPhysics101ProgressV1")), saved);
});

verify("Unmapped science history remains fully reviewable without being assigned or rewritten", () => {
  const f = createFixture(); f.loadShell(); const api = f.context.__testShell;
  for (const [subject, key, chapter] of [["chemistry", "brightQuestChemistry101ProgressV1", "hidden-code"], ["physics", "brightQuestPhysics101ProgressV1", "force-is-an-interaction"]]) {
    const response = { prompt: longPrompt, selected: "Original device answer", answer: "Correct device answer", correctAnswer: "Correct device answer", correct: false };
    const saved = { "demo-student": { chapters: { [chapter]: { completed: true, watchedSeconds: 205, test: { score: 0, total: 1, [subject === "chemistry" ? "feedback" : "answers"]: [response] } } } } };
    f.storage.set(key, JSON.stringify(saved)); const html = api.renderDeviceScienceHistory(f.state.profile, subject);
    assert.ok(html.includes(longPrompt)); assert.ok(html.includes("Original device answer")); assert.ok(html.includes("Correct device answer"));
    assert.match(html, /before a child was identified/); assert.deepEqual(JSON.parse(f.storage.get(key)), saved);
    assert.equal(api.renderDeviceScienceHistory({ id: "demo-student" }, subject), "");
    const demoStatus = subject === "chemistry" ? api.chemistryProgress({ id: "demo-student" }) : api.physicsProgress({ id: "demo-student" });
    assert.equal(demoStatus.completed, 1); assert.equal(demoStatus.tests, 1);
  }
  assert.equal(f.localWrites.length, 0); assert.equal(f.saves.length, 0); assert.equal(f.requests.filter((request) => request.method !== "GET").length, 0);
});

verify("Browser-history navigation during a test uses Save and leave before showing the library", () => {
  const f = createFixture(); f.state.selectedRole = "kid"; f.loadAutosave(); f.loadShell(); f.loadChild();
  f.context.BrightQuestDrafts.resume(); f.state.answers[0].selected = 0; f.state.remainingSeconds = 456;
  f.context.location.hash = "#child/learn"; f.dispatchWindow("hashchange");
  assert.equal(f.state.profile.activeDraft.status, "paused"); assert.equal(f.state.profile.activeDraft.remainingSeconds, 456);
  assert.equal(f.state.profile.activeDraft.answers[0].selected, 0); assert.equal(f.context.screens.test.classList.contains("hidden"), true);
  const before = snapshot(f.state.profile.activeDraft); f.context.__testAutosave.saveActiveDraft("pagehide", { cloud: true });
  assert.deepEqual(snapshot(f.state.profile.activeDraft), before);
});

after(async () => {
  report.completedAt = new Date().toISOString(); report.passed = report.checks.every((check) => check.passed);
  const out = resolve(root, "../outputs/brightquest-uplift-qa-2026-09-28");
  await mkdir(out, { recursive: true }); await writeFile(resolve(out, "preservation-tests.json"), JSON.stringify(report, null, 2));
});
