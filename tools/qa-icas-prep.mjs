import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch {
  const modulePath = process.env.BQ_PLAYWRIGHT_MODULE;
  if (!modulePath) throw new Error("Set BQ_PLAYWRIGHT_MODULE to the Playwright package directory.");
  playwright = require(modulePath);
}

const { chromium } = playwright;
const BASE = process.env.BQ_QA_URL || "http://127.0.0.1:4173";
const OUT = resolve("outputs/qa-icas-prep");
const bank = JSON.parse(await readFile(resolve("icas-prep/data/icas-question-bank.json"), "utf8"));
await mkdir(OUT, { recursive: true });

const report = { build: bank.version, startedAt: new Date().toISOString(), checks: [], errors: [], screenshots: [], renderedQuestions: [] };
const check = (name, passed, detail = "") => {
  report.checks.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error(`FAIL ${name}: ${detail}`);
};
const ignoreUrl = (url) => /\/api\/(profiles|family|auth|events)/.test(url) || /favicon/.test(url);
const watch = (page, label) => {
  page.on("console", (message) => { if (message.type() === "error" && !/Failed to load resource/.test(message.text())) report.errors.push({ label, type: "console", text: message.text() }); });
  page.on("pageerror", (error) => report.errors.push({ label, type: "pageerror", text: error.message }));
  page.on("requestfailed", (request) => { if (!ignoreUrl(request.url())) report.errors.push({ label, type: "requestfailed", text: `${request.url()} ${request.failure()?.errorText || "failed"}` }); });
  page.on("response", (response) => { if (response.status() >= 400 && !ignoreUrl(response.url())) report.errors.push({ label, type: "response", text: `${response.status()} ${response.url()}` }); });
};
const shot = async (page, name, fullPage = false) => {
  const path = resolve(OUT, name);
  await page.screenshot({ path, fullPage });
  report.screenshots.push(path);
};
const visibleOverflow = (page) => page.evaluate(() => [...document.querySelectorAll("body *")].filter((element) => {
  if (!(element instanceof HTMLElement) || !element.offsetParent) return false;
  const style = getComputedStyle(element);
  if (["auto", "scroll", "hidden", "clip"].includes(style.overflowX) || ["auto", "scroll", "hidden", "clip"].includes(style.overflowY)) return false;
  return element.scrollWidth > element.clientWidth + 3 || element.scrollHeight > element.clientHeight + 3;
}).slice(0, 20).map((element) => ({ tag: element.tagName, id: element.id, className: element.className, text: element.textContent?.trim().slice(0, 80), width: [element.clientWidth, element.scrollWidth], height: [element.clientHeight, element.scrollHeight] })));

const profile = {
  id: "qa-icas-student",
  name: "QA Student",
  avatar: "blue",
  pin: "abcde",
  createdAt: new Date().toISOString(),
  attempts: [],
  icasAttempts: [],
  questionStats: [],
  trainingCompleted: {},
  writingSamples: []
};

check("Bank contains eight tests", bank.tests.length === 8, String(bank.tests.length));
check("Bank contains 176 questions", bank.tests.reduce((sum, test) => sum + test.questions.length, 0) === 176);
check("All question IDs are unique", new Set(bank.tests.flatMap((test) => test.questions.map((question) => question.id))).size === 176);

const browser = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await context.route("**/api/auth/config", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ enabled: false, experienceUpliftEnabled: true })
  }));
  await context.addInitScript((seed) => {
    if (!localStorage.getItem("qaIcasSeededV1")) {
      localStorage.setItem("brightQuestProfilesV2", JSON.stringify({ [seed.id]: seed }));
      localStorage.setItem("brightQuestActiveProfile", seed.id);
      localStorage.setItem("qaIcasSeededV1", "true");
    }
  }, profile);

  const page = await context.newPage();
  watch(page, "module-desktop");
  await page.goto(`${BASE}/icas-prep/`, { waitUntil: "networkidle" });
  check("Module home loads", await page.getByRole("heading", { name: "ICAS Challenge Lab", level: 1 }).isVisible());
  check("Active profile appears", /QA Student/.test(await page.locator("#profileBadge").innerText()));
  check("Both subject buttons are visible", await page.locator("[data-subject]").count() === 2);
  check("Home has no unexpected overflow", (await visibleOverflow(page)).length === 0, JSON.stringify(await visibleOverflow(page)));
  await shot(page, "01-home-desktop.png");

  await page.locator('[data-subject="maths"]').click();
  check("Maths subject lists four sets", await page.locator("[data-start-test]").count() === 4);
  await page.locator("#appBackButton").click();
  check("Module Back returns from subject to home", await page.locator('[data-subject="spelling"]').isVisible());
  await page.locator('[data-subject="spelling"]').click();
  check("Spelling subject lists four sets", await page.locator("[data-start-test]").count() === 4);
  await page.locator("[data-volume-check]").click();
  await page.waitForTimeout(250);
  check("Volume-check button remains operable", await page.locator("[data-volume-check]").isEnabled());
  await page.goBack();
  check("Browser Back returns from subject to home", await page.locator('[data-subject="maths"]').isVisible());

  await page.locator('[data-subject="maths"]').click();
  await page.locator('[data-start-test="icas-maths-diagnostic"]').click();
  check("Runner displays timer and palette", await page.locator("#timerValue").isVisible() && await page.locator("[data-jump]").count() === 20);
  await page.locator("[data-flag]").click();
  check("Flag control updates label", /Remove flag/.test(await page.locator("[data-flag]").innerText()));
  await page.locator("[data-flag]").click();
  await page.locator("[data-next]").click();
  check("Next advances a question", (await page.locator(".palette-button.current").innerText()).trim() === "2");
  await page.locator("[data-prev]").click();
  check("Previous returns a question", (await page.locator(".palette-button.current").innerText()).trim() === "1");

  await completeTest(page, bank.tests.find((test) => test.id === "icas-maths-diagnostic"), { wrongFirst: true });
  check("Maths result appears after submission", await page.locator(".result-score").isVisible());
  check("Result reports one deliberately missed answer", /Review 1 missed/.test(await page.locator("[data-review]").innerText()));
  await page.locator("[data-review]").click();
  check("Child review sorts the missed answer first", await page.locator("#answerReview .review-card").first().evaluate((element) => element.classList.contains("missed")));
  await shot(page, "02-result-desktop.png", true);
  const savedMath = await page.evaluate(() => JSON.parse(localStorage.getItem("brightQuestProfilesV2"))["qa-icas-student"].icasAttempts);
  check("Maths attempt persists to active profile", savedMath.length === 1 && savedMath[0].questionStats.length === 20, JSON.stringify(savedMath.map((attempt) => ({ id: attempt.id, questions: attempt.questionStats.length }))));
  await page.locator("[data-result-subject]").click();
  check("Result return button returns to Maths", await page.getByRole("heading", { name: "Mathematics", level: 1 }).isVisible());
  await page.locator("[data-back-home]").click();

  await page.locator('[data-subject="spelling"]').click();
  await page.locator('[data-start-test="icas-spelling-diagnostic"]').click();
  await page.locator("[data-play-audio]").click();
  await page.waitForTimeout(300);
  check("Dictation play button triggers without disappearing", await page.locator("[data-play-audio]").count() === 1);
  await page.locator("#typedAnswer").fill("journey");
  await page.locator("[data-exit]").click();
  check("Exit opens confirmation", await page.locator("#confirmModal:not(.hidden)").isVisible());
  await page.locator("[data-modal-cancel]").last().click();
  check("Cancel exit returns to runner", await page.locator(".question-panel").isVisible());
  await page.locator("[data-exit]").click();
  await page.locator("[data-modal-cancel]").first().click({ position: { x: 5, y: 5 } });
  check("Module confirmation scrim cancels exit", await page.locator("#confirmModal").evaluate((element) => element.classList.contains("hidden")));
  await page.locator("#appBackButton").click();
  check("App Back in runner opens confirmation", await page.locator("#confirmModal:not(.hidden)").isVisible());
  await page.locator("#confirmAction").click();
  check("Confirmed exit returns to Spelling", await page.getByRole("heading", { name: "Spelling Bee", level: 1 }).isVisible());
  check("Exited set offers Resume", /Resume/.test(await page.locator('[data-start-test="icas-spelling-diagnostic"]').innerText()));
  await page.locator('[data-start-test="icas-spelling-diagnostic"]').click();
  check("Resume restores typed spelling", await page.locator("#typedAnswer").inputValue() === "journey");
  await page.goBack();
  check("Browser Back from runner returns to subject", await page.getByRole("heading", { name: "Spelling Bee", level: 1 }).isVisible());
  await page.locator('[data-start-test="icas-spelling-diagnostic"]').click();
  await completeTest(page, bank.tests.find((test) => test.id === "icas-spelling-diagnostic"), { wrongFirst: true, playAudio: true });
  check("Spelling result persists", (await page.evaluate(() => JSON.parse(localStorage.getItem("brightQuestProfilesV2"))["qa-icas-student"].icasAttempts.length)) === 2);
  await shot(page, "03-spelling-result-desktop.png");
  await page.locator("[data-result-subject]").click();
  await page.locator("[data-back-home]").click();

  const covered = new Set(["icas-maths-diagnostic", "icas-spelling-diagnostic"]);
  for (const test of bank.tests.filter((item) => !covered.has(item.id))) {
    if (!(await page.getByRole("heading", { name: "ICAS Challenge Lab", level: 1 }).isVisible().catch(() => false))) {
      while (!(await page.locator(`[data-subject="${test.subject}"]`).isVisible().catch(() => false))) await page.goBack();
    }
    await page.locator(`[data-subject="${test.subject}"]`).click();
    await page.locator(`[data-start-test="${test.id}"]`).click();
    const paletteCount = await page.locator("[data-jump]").count();
    check(`${test.id} palette has ${test.questions.length} buttons`, paletteCount === test.questions.length, String(paletteCount));
    for (let index = 0; index < test.questions.length; index += 1) {
      await page.locator(`[data-jump="${index}"]`).click();
      const question = test.questions[index];
      const hasResponse = question.options ? await page.locator("[data-answer-index]").count() >= 4 : await page.locator("#typedAnswer").count() === 1;
      const hasStimulus = !question.stimulus || await page.locator(".stimulus").count() === 1;
      if (!hasResponse || !hasStimulus) report.errors.push({ label: test.id, type: "render", text: `${question.id} response=${hasResponse} stimulus=${hasStimulus}` });
      report.renderedQuestions.push(question.id);
    }
    if (test.mode === "simulation") check(`${test.id} uses countdown label`, /Time remaining/.test(await page.locator("#timerBox").innerText()));
    await page.locator("[data-exit]").click();
    await page.locator("#confirmAction").click();
    check(`${test.id} exits back to subject`, await page.locator(`[data-start-test="${test.id}"]`).isVisible());
    await page.locator("[data-back-home]").click();
  }
  report.renderedQuestions.push(...bank.tests.filter((test) => covered.has(test.id)).flatMap((test) => test.questions.map((question) => question.id)));
  check("All 176 questions render through the UI", new Set(report.renderedQuestions).size === 176, String(new Set(report.renderedQuestions).size));

  const mobile = await context.newPage();
  watch(mobile, "module-mobile");
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(`${BASE}/icas-prep/`, { waitUntil: "networkidle" });
  check("Mobile home fits viewport", (await visibleOverflow(mobile)).length === 0, JSON.stringify(await visibleOverflow(mobile)));
  await shot(mobile, "04-home-mobile.png", true);
  await mobile.locator('[data-subject="maths"]').click();
  await mobile.locator('[data-start-test="icas-maths-full-1"]').click();
  check("Mobile runner has no horizontal page overflow", await mobile.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
  await mobile.locator('[data-jump="0"]').click();
  await mobile.waitForTimeout(100);
  const mobileHeader = await mobile.locator(".icas-topbar").boundingBox();
  const mobileQuestionTop = await mobile.locator(".question-top").boundingBox();
  check("Mobile sticky header does not cover question context", Boolean(mobileHeader && mobileQuestionTop && mobileQuestionTop.y >= mobileHeader.y + mobileHeader.height - 1), JSON.stringify({ mobileHeader, mobileQuestionTop }));
  await shot(mobile, "05-runner-mobile.png");
  await mobile.locator("#appBackButton").click();
  await mobile.locator("#confirmAction").click();

  const tablet = await context.newPage();
  watch(tablet, "module-tablet");
  await tablet.setViewportSize({ width: 1024, height: 768 });
  await tablet.goto(`${BASE}/icas-prep/`, { waitUntil: "networkidle" });
  await tablet.locator('[data-subject="spelling"]').click();
  await tablet.locator('[data-start-test="icas-spelling-full-1"]').click();
  check("Tablet runner has no horizontal page overflow", await tablet.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
  await shot(tablet, "06-runner-tablet.png");

  const root = await context.newPage();
  watch(root, "bright-quest-kid");
  await root.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await enterKid(root);
  const icasPortalCard = root.locator('.bq-world-grid .bq-world-tile.icas[data-bq-action="icas-prep"]');
  check("Logged-in kid portal contains standalone ICAS module", await icasPortalCard.count() === 1 && await icasPortalCard.isVisible());
  check("Standalone ICAS module shows attempt status", /complete|Ready/.test(await icasPortalCard.locator(".bq-world-status").innerText()));
  check("Standalone ICAS module artwork loads", await icasPortalCard.locator("img").evaluate((image) => image.complete && image.naturalWidth > 0));
  await shot(root, "07-kid-launch-card.png", true);
  await icasPortalCard.click();
  await root.waitForURL(/\/icas-prep\//);
  check("Kid ICAS card opens module route", root.url().includes("/icas-prep/"));
  await root.goBack();
  check("Browser Back from module returns to Bright Quest", new URL(root.url()).pathname === "/");

  const mobilePortal = await context.newPage();
  watch(mobilePortal, "bright-quest-kid-mobile");
  await mobilePortal.setViewportSize({ width: 390, height: 844 });
  await mobilePortal.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await enterKid(mobilePortal);
  const mobileIcasCard = mobilePortal.locator('.bq-world-grid .bq-world-tile.icas[data-bq-action="icas-prep"]');
  check("Mobile kid portal shows standalone ICAS module", await mobileIcasCard.isVisible());
  check("Mobile kid portal fits viewport", await mobilePortal.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
  await shot(mobilePortal, "08-kid-launch-card-mobile.png", true);
  await mobileIcasCard.click();
  await mobilePortal.waitForURL(/\/icas-prep\//);
  check("Mobile ICAS module link opens", mobilePortal.url().includes("/icas-prep/"));
  await mobilePortal.goBack();
  check("Mobile browser Back returns to kid portal", new URL(mobilePortal.url()).pathname === "/");

  const moduleBack = await context.newPage();
  watch(moduleBack, "module-home-back");
  await moduleBack.goto(`${BASE}/icas-prep/`, { waitUntil: "networkidle" });
  await moduleBack.locator("#appBackButton").click();
  await moduleBack.waitForURL((url) => url.pathname === "/");
  check("Module Back on home returns to Bright Quest", new URL(moduleBack.url()).pathname === "/");

  const parent = await context.newPage();
  watch(parent, "bright-quest-parent");
  await parent.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await enterParent(parent);
  check("Parent Learning hub contains ICAS row", await parent.locator('[data-parent-route="icas"]').count() > 0);
  await parent.locator('[data-parent-route="icas"]').first().click();
  check("Parent ICAS page lists two completed attempts", await parent.locator("[data-icas-review]").count() === 2, String(await parent.locator("[data-icas-review]").count()));
  await parent.locator('[data-open-game-url*="icas-prep"]').click();
  await parent.waitForURL(/\/icas-prep\//);
  check("Parent Open module button opens ICAS route", parent.url().includes("/icas-prep/"));
  await parent.goBack();
  await enterParent(parent);
  if (!(await parent.locator("[data-icas-review]").count())) await parent.locator('[data-parent-route="icas"]').first().click();
  await parent.waitForSelector("[data-icas-review]");
  await parent.locator("[data-icas-review]").first().click();
  check("ICAS review opens as a modal", await parent.locator("#bqIcasReviewPopup:not(.hidden)").isVisible());
  check("Parent modal explicitly labels wrong answers first", /Wrong answers first/i.test(await parent.locator("#bqIcasReviewPopup").innerText()));
  const popupOrder = await parent.locator("#bqIcasReviewPopup .bq-chem-answer-card").evaluateAll((cards) => cards.map((card) => card.classList.contains("missed") ? "missed" : "correct"));
  check("Parent popup orders missed records before correct records", popupOrder.join(",").indexOf("correct,missed") === -1, popupOrder.join(","));
  await parent.locator("#bqIcasReviewPopup summary").click();
  check("Parent correct-answer disclosure expands", await parent.locator("#bqIcasReviewPopup details").evaluate((element) => element.open));
  await shot(parent, "08-parent-popup-desktop.png", true);
  await parent.locator("[data-icas-review-close]").last().click();
  check("Parent modal close button works", await parent.locator("#bqIcasReviewPopup").evaluate((element) => element.classList.contains("hidden")));
  await parent.locator("[data-icas-review]").last().click();
  await parent.locator("[data-icas-review-close]").first().click({ position: { x: 5, y: 5 } });
  check("Parent modal scrim closes popup", await parent.locator("#bqIcasReviewPopup").evaluate((element) => element.classList.contains("hidden")));
  await parent.locator("[data-parent-route=\"overview\"]").last().click();
  check("Parent return control returns to overview", /parent\/overview$/.test(parent.url()));

  const mobileParent = await context.newPage();
  watch(mobileParent, "parent-mobile");
  await mobileParent.setViewportSize({ width: 390, height: 844 });
  await mobileParent.goto(`${BASE}/#parent/icas`, { waitUntil: "domcontentloaded" });
  await enterParent(mobileParent);
  if (!(await mobileParent.locator("[data-icas-review]").count())) {
    await mobileParent.locator('[data-parent-route="icas"]').first().click();
  }
  await mobileParent.locator("[data-icas-review]").first().click();
  check("Mobile Parent popup fits horizontally", await mobileParent.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
  await shot(mobileParent, "09-parent-popup-mobile.png", true);

  const audioChecks = await page.evaluate(async (paths) => Promise.all(paths.map(async (path) => {
    const response = await fetch(path);
    return { path, status: response.status, bytes: (await response.arrayBuffer()).byteLength };
  })), ["assets/audio/volume-check.mp3", ...bank.tests.flatMap((test) => test.questions).filter((question) => question.audio).map((question) => question.audio)]);
  check("All 27 audio assets load", audioChecks.length === 27 && audioChecks.every((item) => item.status === 200 && item.bytes > 50000), JSON.stringify(audioChecks.filter((item) => item.status !== 200 || item.bytes <= 50000)));

  check("No unexpected browser errors", report.errors.length === 0, JSON.stringify(report.errors.slice(0, 20)));
} finally {
  await browser.close();
}

report.completedAt = new Date().toISOString();
report.passed = report.checks.filter((item) => item.passed).length;
report.failed = report.checks.filter((item) => !item.passed).length;
await writeFile(resolve(OUT, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ passed: report.passed, failed: report.failed, errors: report.errors.length, renderedQuestions: new Set(report.renderedQuestions).size, report: resolve(OUT, "report.json") }, null, 2));
if (report.failed || report.errors.length) process.exitCode = 1;

async function completeTest(page, test, { wrongFirst = false, playAudio = false } = {}) {
  for (let index = 0; index < test.questions.length; index += 1) {
    const question = test.questions[index];
    await page.locator(`[data-jump="${index}"]`).click();
    report.renderedQuestions.push(question.id);
    if (playAudio && question.audio) {
      await page.locator("[data-play-audio]").click();
      await page.waitForTimeout(100);
      await page.locator("audio").evaluate((audio) => audio.pause());
    }
    if (question.options) {
      const answer = wrongFirst && index === 0 ? (question.correct + 1) % question.options.length : question.correct;
      await page.locator(`[data-answer-index="${answer}"]`).click();
    } else {
      const value = wrongFirst && index === 0 ? "incorrect" : question.acceptedAnswers[0];
      await page.locator("#typedAnswer").fill(value);
    }
  }
  await page.locator("[data-next]").click();
  await page.locator("#confirmAction").click();
  await page.waitForSelector(".result-score");
}

async function enterKid(page) {
  if (await page.locator('[data-bq-action="icas-prep"]').isVisible().catch(() => false)) return;
  await page.locator('[data-role="kid"]').click();
  await page.locator("#modePassword").fill("abcde");
  await page.locator("#passwordForm button").click();
  const confirm = page.locator("[data-bq-confirm-yes]");
  if (await confirm.isVisible({ timeout: 2000 }).catch(() => false)) await confirm.click();
  const saved = page.locator('#profileScreen:not(.hidden) [data-profile="qa-icas-student"]');
  if (await saved.isVisible({ timeout: 3000 }).catch(() => false)) await saved.click();
  await page.waitForSelector('[data-bq-action="icas-prep"]', { timeout: 10000 });
}

async function enterParent(page) {
  if (await page.locator(".parent-cockpit-redesign").isVisible().catch(() => false)) return;
  await page.locator('[data-role="parent"]').click();
  await page.locator("#modePassword").fill("12345");
  await page.locator("#passwordForm button").click();
  await page.waitForSelector(".parent-cockpit-redesign", { timeout: 10000 });
  await page.waitForSelector(".bq-parent-page", { timeout: 10000 });
}
