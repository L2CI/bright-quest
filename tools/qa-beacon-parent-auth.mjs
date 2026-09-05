import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { startBeaconQa } from "./serve-beacon-qa.mjs";
import { createQuestion } from "../beacon-brigade/content.js";
import { publicState } from "../functions/_lib/beacon-brigade.js";

// Own port and ephemeral D1 only. No shared 4191 state, real user data or mocked API.
// The fixture's issued child session seeds the browser; Parent access is earned by PIN UI.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(root, "../outputs/qa-beacon-parent-auth");
const startedAt = new Date().toISOString();
const out = resolve(outputRoot, startedAt.replace(/[:.]/g, "-"));
const require = createRequire(import.meta.url);
const inputs = [
  "tools/qa-beacon-parent-auth.mjs", "tools/serve-beacon-qa.mjs",
  "bright-quest-shell-merge.js", "beacon-parent.css", "bright-quest-family-auth.js",
  "functions/api/beacon-brigade.js", "functions/_lib/beacon-brigade.js", "functions/_lib/family-auth.js",
  "functions/api/profiles.js", "functions/api/auth/session.js", "functions/api/auth/parent-lock.js",
  "functions/api/auth/parent-unlock.js", "beacon-brigade/content.js", "migrations/0003_beacon_brigade.sql",
  "beacon-brigade/assets/module-preview.jpg"
];
const report = {
  startedAt, expectedChecks: 20, command: "node tools/qa-beacon-parent-auth.mjs",
  scope: "Real localhost API handlers, isolated ephemeral D1, issued synthetic child session and actual Parent PIN browser flow.",
  boundaries: [
    "startBeaconQa({port:0}) creates a private database and port; no shared harness is modified.",
    "The harness seeds a fictional family. Expedition writes occur only through the actual API.",
    "The same browser context owns seeding, session cookies, Parent PIN unlock and review.",
    "No Parent capability, auth response, app state or review response is injected or mocked.",
    "D1 reads independently verify persisted game evidence and operation receipts.",
    "Credentials, cookies, control tokens and capabilities are omitted from retained artifacts.",
    "Game rendering, external services, production deployment and module artwork are out of scope."
  ],
  checks: [], errors: [], apiCalls: [], browserRequests: [], screenshots: [],
  unexpectedResponses: [], blockedExternalRequests: [], inputs: {}, changedInputs: []
};
let harness, browser, context, page;
let currentCheck = "Setup";
let fixture, childHeaders, saved, parentEvidence, storedRow, storedState;
const operations = [];
const pendingResponses = new Set();
await mkdir(out, { recursive: true });

async function hashFile(path) {
  return createHash("sha256").update(await readFile(resolve(root, path))).digest("hex");
}
async function check(name, fn) {
  currentCheck = name;
  const start = Date.now();
  try {
    await fn();
    report.checks.push({ name, passed: true, durationMs: Date.now() - start });
    console.log("PASS " + name);
  } catch (error) {
    report.checks.push({ name, passed: false, durationMs: Date.now() - start, detail: error.stack });
    throw error;
  }
}
async function shot(name, state) {
  const path = resolve(out, name + ".png");
  await page.screenshot({ path });
  report.screenshots.push({ file: name + ".png", state, viewport: page.viewportSize(),
    sha256: createHash("sha256").update(await readFile(path)).digest("hex") });
}
async function api(path, { method = "GET", headers = childHeaders, data, expected = 200 } = {}) {
  const url = new URL(path, harness.origin);
  assert.equal(url.origin, harness.origin, "QA requests must stay inside this private harness");
  const response = await context.request.fetch(url.href, { method, headers: { ...headers, origin: harness.origin }, data });
  report.apiCalls.push({ phase: currentCheck, path: url.pathname + url.search, method, status: response.status() });
  const body = await response.json();
  assert.equal(response.status(), expected, JSON.stringify(body));
  return body;
}
async function browserApi(path, method = "GET") {
  return page.evaluate(async ({ path, method }) => {
    const response = await fetch(path, { method, headers: window.BrightQuestFamilyAuth.requestHeaders() });
    return { status: response.status, body: await response.json() };
  }, { path, method });
}
async function command(action) {
  const operationId = randomUUID();
  const expectedVersion = saved.version;
  const body = await api("/api/beacon-brigade", { method: "POST", data: { operationId, version: expectedVersion, action } });
  saved = body.state;
  assert.equal(saved.version, expectedVersion + 1);
  operations.push({ operationId, version: expectedVersion, action, resultingVersion: saved.version });
}
function authoredAnswer(station) {
  return createQuestion(station.question.templateId, station.question.variant).answer;
}
async function unlockWithPin() {
  await page.locator('[data-bq-action="parent-cockpit"]').click();
  await page.locator("#familyParentPin").fill(fixture.login.parentPin);
  const response = page.waitForResponse((item) => new URL(item.url()).pathname === "/api/auth/parent-unlock");
  await page.getByRole("button", { name: "Open Parent Cockpit", exact: true }).click();
  assert.equal((await response).status(), 200);
  await page.locator("#parentScreen:not(.hidden)").waitFor();
}
async function openReview(childId = fixture.childId) {
  await page.locator('#parentScreen [data-parent-route="beacon-brigade"]').click();
  const responsePromise = page.waitForResponse((item) => {
    const url = new URL(item.url());
    return url.pathname === "/api/beacon-brigade" && url.searchParams.get("childId") === childId;
  });
  await page.getByRole("button", { name: "Review expeditions", exact: true }).click();
  const response = await responsePromise;
  assert.equal(response.status(), 200);
  const body = await response.json();
  await page.locator("#bqBeaconReviewPopup [data-beacon-review-body][aria-busy=false]").waitFor();
  return body;
}
function answerText(question, answer) {
  return question.type === "choice" ? question.options.find((option) => option.id === answer).label : String(answer);
}

try {
  for (const path of inputs) report.inputs[path] = await hashFile(path);
  let playwright;
  let modulePath = process.env.BQ_PLAYWRIGHT_MODULE || "playwright";
  try { playwright = require(modulePath); }
  catch (error) {
    if (process.env.BQ_PLAYWRIGHT_MODULE) throw error;
    modulePath = resolve(homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
    playwright = require(modulePath);
  }
  harness = await startBeaconQa({ port: 0 });
  report.origin = harness.origin;
  fixture = harness.fixture;
  assert.equal(fixture.synthetic, true);
  browser = await playwright.chromium.launch({
    executablePath: process.env.BQ_CHROME_PATH || (process.platform === "win32"
      ? resolve(process.env.ProgramFiles || "C:/Program Files", "Google/Chrome/Application/chrome.exe") : undefined),
    headless: true, args: ["--mute-audio", "--disable-background-networking"]
  });
  report.runtime = { node: process.version, browser: browser.version(), playwright: modulePath };
  context = await browser.newContext({
    viewport: { width: 1440, height: 900 }, locale: "en-AU",
    timezoneId: "Australia/Sydney", deviceScaleFactor: 1, serviceWorkers: "block", reducedMotion: "reduce"
  });
  await context.addCookies([fixture.cookie]);
  childHeaders = { "x-bq-child-capability": fixture.childCapability, "x-bq-child-id": fixture.childId };
  page = await context.newPage();
  page.setDefaultTimeout(10000);
  page.on("pageerror", (error) => report.errors.push({ check: currentCheck, type: "pageerror", text: error.message }));
  page.on("console", (message) => {
    if (message.type() === "error" && !/Failed to load resource/.test(message.text())) {
      report.errors.push({ check: currentCheck, type: "console", text: message.text() });
    }
  });
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== harness.origin) {
      report.blockedExternalRequests.push(url.origin + url.pathname);
      return route.abort();
    }
    return route.continue();
  });
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (url.origin !== harness.origin) return;
    const request = response.request();
    if (url.pathname.startsWith("/api/")) {
      report.browserRequests.push({
        path: url.pathname + url.search, method: request.method(), status: response.status(),
        parentCapabilityAttached: Boolean(request.headers()["x-bq-parent-capability"]),
        childCapabilityAttached: Boolean(request.headers()["x-bq-child-capability"])
      });
    }
    if (response.status() >= 400) {
      // Read only error bodies for classification. Never retain unlock/session credentials.
      const task = response.json().catch(() => ({})).then((body) => {
        const expected = (url.pathname === "/api/beacon-brigade" && response.status() === 403 && body.code === "PARENT_PIN_REQUIRED")
          || (url.pathname === "/api/auth/parent-unlock" && response.status() === 401 && body.error === "Parent PIN did not match");
        if (!expected) report.unexpectedResponses.push({ path: url.pathname + url.search, status: response.status(), code: body.code || body.error || "" });
      }).finally(() => pendingResponses.delete(task));
      pendingResponses.add(task);
    }
  });

  await check("Own ephemeral harness, guarded fixture and issued child session", async () => {
    await api("/__beacon-qa__/fixture", { headers: {}, expected: 403 });
    const controlled = await api("/__beacon-qa__/fixture", { headers: { "x-bq-qa-control": harness.controlToken } });
    assert.equal(controlled.childId, fixture.childId);
    const session = await api("/api/auth/session");
    assert.equal(session.authenticated, true);
    assert.equal(session.activeChildId, fixture.childId);
    report.syntheticFamily = { familyId: fixture.familyId, children: fixture.children.map(({ id, legacyId, name }) => ({ id, legacyId, name })) };
  });
  await check("Maths expedition seeded through API retains a wrong-then-corrected answer", async () => {
    saved = (await api("/api/beacon-brigade")).state;
    assert.equal(saved.history.length, 0);
    await command({ type: "start", regionId: "harbour" });
    const original = saved.activeExpedition.stations[0];
    assert.equal(original.question.answer, undefined, "Unresolved child answers must remain private");
    await command({ type: "answer", stationId: original.id, answer: 9999 });
    assert.equal(saved.wallet.parts, 0);
    await command({ type: "answer", stationId: original.id, answer: authoredAnswer(original) });
    for (const station of saved.activeExpedition.stations.slice(1)) {
      await command({ type: "answer", stationId: station.id, answer: authoredAnswer(station) });
    }
    await command({ type: "finish" });
    const station = saved.history[0].stations[0];
    assert.deepEqual(station.attempts.map((attempt) => attempt.correct), [false, true]);
    assert.equal(station.resolution, "corrected");
    assert.equal(saved.wallet.parts, 20);
  });
  await check("Science expedition seeded through API retains worked-guidance completion", async () => {
    await command({ type: "start", regionId: "grove" });
    const original = saved.activeExpedition.stations[0];
    const correct = authoredAnswer(original);
    const wrong = original.question.options.find((option) => option.id !== correct).id;
    await command({ type: "answer", stationId: original.id, answer: wrong });
    await command({ type: "hint", stationId: original.id });
    await command({ type: "answer", stationId: original.id, answer: wrong });
    await command({ type: "hint", stationId: original.id });
    assert.equal(saved.wallet.cores, 0);
    await command({ type: "answer", stationId: original.id, answer: correct });
    for (const station of saved.activeExpedition.stations.slice(1)) {
      await command({ type: "answer", stationId: station.id, answer: authoredAnswer(station) });
    }
    await command({ type: "finish" });
    const station = saved.history[1].stations[0];
    assert.deepEqual(station.attempts.map((attempt) => attempt.helpStage), [0, 1, 2]);
    assert.equal(station.resolution, "assisted");
    assert.equal(saved.wallet.cores, 20);
    await writeFile(resolve(out, "api-seed-operations.json"), JSON.stringify(operations, null, 2));
  });
  await check("Ephemeral D1 contains both expeditions and every operation receipt", async () => {
    storedRow = await harness.db.prepare("SELECT version,state_json FROM beacon_brigade_states WHERE family_id=? AND child_id=?")
      .bind(fixture.familyId, fixture.childId).first();
    assert(storedRow);
    storedState = JSON.parse(storedRow.state_json);
    assert.equal(storedState.history.length, 2);
    assert.equal(storedRow.version, operations.length);
    const receipts = await harness.db.prepare("SELECT COUNT(*) AS total FROM beacon_brigade_operations WHERE family_id=? AND child_id=?")
      .bind(fixture.familyId, fixture.childId).first();
    assert.equal(receipts.total, operations.length);
    report.persisted = { childId: fixture.childId, version: storedRow.version, operationReceipts: receipts.total };
    await writeFile(resolve(out, "d1-game-state.json"), JSON.stringify(storedState, null, 2));
  });
  await check("Actual parent-lock rotates the cookie and invalidates old Parent capability", async () => {
    const before = (await context.cookies(harness.origin)).find((cookie) => cookie.name === "bq_session").value;
    await api("/api/auth/parent-lock", { method: "POST", data: {} });
    const after = (await context.cookies(harness.origin)).find((cookie) => cookie.name === "bq_session").value;
    assert.notEqual(before, after);
    await api("/api/beacon-brigade?childId=" + fixture.childId, {
      headers: { ...childHeaders, "x-bq-parent-capability": fixture.parentCapability }, expected: 403
    });
    assert.equal((await api("/api/auth/session")).parentUnlocked, false);
    report.lockRotatedCookie = true;
  });
  await check("Portal boots the authenticated child without injected Parent capability", async () => {
    await context.addInitScript((childCapability) => {
      if (!sessionStorage.getItem("beaconAuthQaInitialised")) {
        sessionStorage.setItem("brightQuestChildCapability", childCapability);
        sessionStorage.setItem("beaconAuthQaInitialised", "true");
      }
    }, fixture.childCapability);
    await page.goto(harness.origin + "/", { waitUntil: "networkidle" });
    await page.locator("#dashboardScreen:not(.hidden)").waitFor();
    assert(await page.locator('[data-bq-action="parent-cockpit"]').isVisible());
    assert.equal(await page.evaluate(() => sessionStorage.getItem("brightQuestParentCapability")), null);
    assert.match(await page.locator(".bq-mc-identity").innerText(), new RegExp(fixture.children[0].name));
    await shot("child-before-parent", "Real child portal before Parent PIN unlock");
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(viewport);
      const launch = page.locator('[data-bq-action="beacon-brigade"]');
      await launch.scrollIntoViewIfNeeded();
      const thumbnail = launch.locator("img.bq-beacon-preview");
      await thumbnail.evaluate((image) => image.decode());
      assert(await thumbnail.evaluate((image) => image.naturalWidth > 100 && image.naturalHeight > 100));
      assert.equal(await thumbnail.getAttribute("src"), "/beacon-brigade/assets/module-preview.jpg");
      await launch.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
      const bounds = await launch.boundingBox();
      assert(bounds.x >= 0 && bounds.x + bounds.width <= viewport.width + 1);
      assert(bounds.y >= 0 && bounds.y + bounds.height <= viewport.height + 1);
      await shot("real-launch-thumbnail-" + viewport.width, "Actual game thumbnail in authenticated child portal");
    }
    await page.setViewportSize({ width: 1440, height: 900 });
  });
  await check("Parent review endpoint rejects the real child-only browser session", async () => {
    const denied = await browserApi("/api/beacon-brigade?childId=" + fixture.childId);
    assert.equal(denied.status, 403);
    assert.equal(denied.body.code, "PARENT_PIN_REQUIRED");
  });
  await check("Incorrect Parent PIN is rejected by the real unlock endpoint", async () => {
    await page.locator('[data-bq-action="parent-cockpit"]').click();
    await page.locator("#familyParentPin").fill("0000");
    const response = page.waitForResponse((item) => new URL(item.url()).pathname === "/api/auth/parent-unlock");
    await page.getByRole("button", { name: "Open Parent Cockpit", exact: true }).click();
    assert.equal((await response).status(), 401);
    await page.getByText("Parent PIN did not match", { exact: true }).waitFor();
    assert.equal(await page.evaluate(() => sessionStorage.getItem("brightQuestParentCapability")), null);
    await shot("incorrect-parent-pin", "Actual failed PIN check, no Parent capability issued");
  });
  await check("Correct Parent PIN unlocks through UI and rotates the session cookie", async () => {
    const before = (await context.cookies(harness.origin)).find((cookie) => cookie.name === "bq_session").value;
    await page.locator("#familyParentPin").fill(fixture.login.parentPin);
    const response = page.waitForResponse((item) => new URL(item.url()).pathname === "/api/auth/parent-unlock");
    await page.getByRole("button", { name: "Open Parent Cockpit", exact: true }).click();
    assert.equal((await response).status(), 200);
    await page.locator("#parentScreen:not(.hidden)").waitFor();
    const after = (await context.cookies(harness.origin)).find((cookie) => cookie.name === "bq_session").value;
    assert.notEqual(before, after);
    const session = await browserApi("/api/auth/session");
    assert.equal(session.body.parentUnlocked, true);
    assert.equal(session.body.activeChildId, fixture.childId);
    report.uiUnlockRotatedCookie = true;
    await shot("parent-unlocked", "Parent Cockpit after actual PIN unlock");
  });
  await check("Real profile listing maps the selected legacy ID to the correct child UUID", async () => {
    const listing = await browserApi("/api/profiles");
    assert.equal(listing.status, 200);
    const selected = listing.body.profiles.find((row) => row.profileId === fixture.legacyId);
    assert.equal(selected.childId, fixture.childId);
    assert.equal(await page.locator("[data-parent-switch]").inputValue(), fixture.legacyId);
  });
  await check("Real Parent popup response equals authoritative D1 evidence", async () => {
    parentEvidence = await openReview();
    assert.equal(parentEvidence.profile.id, fixture.childId);
    assert.equal(parentEvidence.profile.name, fixture.children[0].name);
    assert.deepEqual(parentEvidence.state, publicState(storedState, { review: true }));
    assert.equal(await page.locator("#bqBeaconReviewPopup .bq-beacon-expedition").count(), 2);
    assert.match(await page.locator("#bqBeaconReviewPopup .bq-chem-review-head").innerText(), /BEACON QA EXPLORER/i);
    const legacyReview = await browserApi("/api/beacon-brigade?childId=" + fixture.legacyId);
    assert.equal(legacyReview.status, 200);
    assert.deepEqual(legacyReview.body, parentEvidence);
    await writeFile(resolve(out, "parent-api-evidence.json"), JSON.stringify(parentEvidence, null, 2));
  });
  await check("Every displayed question, subject and original attempt matches the API snapshot", async () => {
    const popup = page.locator("#bqBeaconReviewPopup");
    for (const expedition of parentEvidence.state.history) {
      const region = expedition.regionId === "harbour" ? "Supply Harbour" : "Discovery Grove";
      const section = popup.locator(".bq-beacon-expedition").filter({ has: page.getByRole("heading", { name: region, exact: true }) });
      const correct = section.locator(".bq-chem-review-correct");
      await correct.locator(":scope > summary").click();
      for (const station of expedition.stations) {
        const question = station.question;
        const card = section.locator(".bq-beacon-station").filter({ has: page.getByRole("heading", { name: question.prompt, exact: true }) });
        assert.equal(await card.count(), 1);
        assert(await card.isVisible());
        const label = (await card.locator(".eyebrow").innerText()).toLowerCase();
        assert(label.includes(question.subject.toLowerCase()));
        assert(label.includes(question.skill.toLowerCase()));
        const attempts = card.locator(".bq-beacon-attempts > li");
        assert.equal(await attempts.count(), station.attempts.length);
        for (const [index, attempt] of station.attempts.entries()) {
          const text = await attempts.nth(index).innerText();
          assert(text.includes(answerText(question, attempt.answer)));
          assert(text.includes(attempt.correct ? "(Correct;" : "(Incorrect;"));
          assert(text.includes(index === 0 ? "Original answer:" : "Attempt " + (index + 1) + ":"));
        }
        assert((await card.innerText()).includes("Correct answer: " + answerText(question, question.answer)));
      }
      await correct.locator(":scope > summary").click();
    }
  });
  await check("Wrong-first ordering and support summaries reflect original performance", async () => {
    const popup = page.locator("#bqBeaconReviewPopup");
    const sections = popup.locator(".bq-beacon-expedition");
    for (let i = 0; i < await sections.count(); i++) {
      assert.match(await sections.nth(i).locator(".bq-beacon-station").first().getAttribute("class"), /missed/);
    }
    const text = await popup.innerText();
    assert.match(text, /Completed with worked guidance/);
    assert.match(text, /Corrected after feedback/);
    assert.match(text, /original incorrect answer retained/);
    const summary = await popup.locator(".bq-beacon-summary").nth(1).innerText();
    assert.match(summary, /8 of 10/);
    assert.match(summary, /2\s+Stations with incorrect answers/);
    assert.match(summary, /1\s+Completed with hints or guidance/);
    assert.deepEqual(parentEvidence.state.wallet, { parts: 20, cores: 20 });
  });
  for (const size of [
    { width: 1440, height: 900, name: "desktop" },
    { width: 834, height: 1194, name: "tablet" },
    { width: 390, height: 844, name: "mobile" }
  ]) {
    await check("Real Parent review fits " + size.name + " " + size.width + "x" + size.height, async () => {
      await page.setViewportSize({ width: size.width, height: size.height });
      const modal = page.locator("#bqBeaconReviewPopup .bq-chem-review-modal");
      await modal.evaluate((element) => { element.scrollTop = 0; });
      const bounds = await modal.boundingBox();
      assert(bounds.x >= 0 && bounds.x + bounds.width <= size.width + 1);
      assert(bounds.y >= 0 && bounds.y + bounds.height <= size.height + 1);
      assert.equal(await modal.evaluate((element) => element.scrollWidth > element.clientWidth + 2), false);
      await shot("real-review-" + size.name, "Authorised API/D1 Parent review summary");
      await page.locator("#bqBeaconReviewPopup .bq-beacon-attempts").first().scrollIntoViewIfNeeded();
      await shot("real-original-answers-" + size.name, "Original science errors and worked-guidance completion");
    });
  }
  await check("Sibling selection uses its own authorised API record with no evidence leakage", async () => {
    await page.locator("#bqBeaconReviewPopup").getByRole("button", { name: "Close", exact: true }).click();
    await page.setViewportSize({ width: 1440, height: 900 });
    const sibling = fixture.children[1];
    await page.locator("[data-parent-switch]").selectOption(sibling.legacyId);
    const evidence = await openReview(sibling.id);
    assert.equal(evidence.profile.id, sibling.id);
    assert.equal(evidence.state.profileId, sibling.id);
    assert.equal(evidence.state.history.length, 0);
    const popup = page.locator("#bqBeaconReviewPopup");
    assert(await popup.getByText("No saved expeditions yet.", { exact: true }).isVisible());
    assert.match(await popup.locator(".bq-chem-review-head").innerText(), /BEACON QA SIBLING/i);
    assert.equal(await popup.locator(".bq-beacon-station").count(), 0);
    await shot("sibling-empty-review", "Real sibling review has no explorer evidence");
    await writeFile(resolve(out, "sibling-api-evidence.json"), JSON.stringify(evidence, null, 2));
  });
  await check("Switching back restores unchanged evidence and Escape restores focus", async () => {
    const popup = page.locator("#bqBeaconReviewPopup");
    await popup.getByRole("button", { name: "Close", exact: true }).click();
    await page.locator("[data-parent-switch]").selectOption(fixture.legacyId);
    assert.deepEqual(await openReview(), parentEvidence);
    await page.keyboard.press("Escape");
    assert.equal(await popup.isVisible(), false);
    assert(await page.getByRole("button", { name: "Review expeditions", exact: true }).evaluate((element) => document.activeElement === element));
  });
  await check("Reload performs a real Parent lock, then PIN re-unlock preserves D1 evidence", async () => {
    const lockResponse = page.waitForResponse((response) => new URL(response.url()).pathname === "/api/auth/parent-lock");
    await page.reload({ waitUntil: "networkidle" });
    assert.equal((await lockResponse).status(), 200);
    await page.locator("#dashboardScreen:not(.hidden)").waitFor();
    assert.equal(await page.evaluate(() => sessionStorage.getItem("brightQuestParentCapability")), null);
    assert.equal((await browserApi("/api/beacon-brigade?childId=" + fixture.childId)).status, 403);
    await unlockWithPin();
    assert.deepEqual(await openReview(), parentEvidence);
    const finalRow = await harness.db.prepare("SELECT version,state_json FROM beacon_brigade_states WHERE family_id=? AND child_id=?")
      .bind(fixture.familyId, fixture.childId).first();
    assert.equal(finalRow.state_json, storedRow.state_json);
    assert.equal(finalRow.version, storedRow.version);
    report.reviewDidNotMutateGameState = true;
    await shot("reopened-after-real-relock", "Re-unlocked Parent review remains identical to D1");
  });
  await check("No runtime errors, unexpected HTTP failures or external requests", async () => {
    await Promise.all([...pendingResponses]);
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.unexpectedResponses, []);
    assert.deepEqual(report.blockedExternalRequests, []);
  });
} catch (error) {
  report.fatal = { check: currentCheck, detail: error.stack };
  console.error(error.stack);
  if (page && !page.isClosed()) await shot("failure", currentCheck).catch(() => {});
} finally {
  if (browser) await browser.close();
  if (harness) await harness.close();
  report.privateHarnessClosed = Boolean(harness);
  for (const [path, before] of Object.entries(report.inputs)) {
    if (await hashFile(path).catch(() => "missing") !== before) report.changedInputs.push(path);
  }
  report.finishedAt = new Date().toISOString();
  report.passed = report.checks.length === report.expectedChecks && report.checks.every((item) => item.passed)
    && !report.fatal && report.errors.length === 0 && report.changedInputs.length === 0;
  const md = [
    "# Authenticated Beacon Parent / D1 QA",
    "", "- Result: " + (report.passed ? "PASS" : "FAIL"),
    "- Run: " + startedAt,
    "- Checks: " + report.checks.filter((item) => item.passed).length + "/" + report.expectedChecks,
    "- Command: \`node tools/qa-beacon-parent-auth.mjs\`",
    "- Harness: private ephemeral D1 at " + (report.origin || "not started") + "; closed on completion.",
    "- Dependencies: repo Miniflare; installed Playwright/Chrome (BQ_PLAYWRIGHT_MODULE and BQ_CHROME_PATH overrides).",
    "", "## Boundaries", ...report.boundaries.map((item) => "- " + item),
    "", "## Checks", "| Result | Check |", "| --- | --- |",
    ...report.checks.map((item) => "| " + (item.passed ? "PASS" : "FAIL") + " | " + item.name + " |"),
    "", "## Retained Evidence",
    "- [Detailed report, API statuses and source hashes](report.json)",
    "- [Actual API seed commands](api-seed-operations.json)",
    "- [Persisted D1 game state](d1-game-state.json)",
    "- [Actual Parent GET evidence](parent-api-evidence.json)",
    "- [Actual sibling GET evidence](sibling-api-evidence.json)",
    ...report.screenshots.map((item) => "- [" + item.state + " (" + item.viewport.width + "x" + item.viewport.height + ")](" + item.file + ")"),
    "", "## Errors",
    "Runtime errors: " + report.errors.length + ". Unexpected HTTP failures: " + report.unexpectedResponses.length + ".",
    "Source changes during run: " + (report.changedInputs.join(", ") || "none") + ".",
    report.fatal ? "\n\`\`\`text\n" + report.fatal.detail + "\n\`\`\`" : "None.", ""
  ].join("\n");
  await writeFile(resolve(out, "report.json"), JSON.stringify(report, null, 2));
  await writeFile(resolve(out, "report.md"), md);
  await writeFile(resolve(outputRoot, "latest.json"), JSON.stringify({
    passed: report.passed, startedAt, report: resolve(out, "report.json"), summary: resolve(out, "report.md")
  }, null, 2));
  await writeFile(resolve(outputRoot, "latest.md"), "# Latest Authenticated Beacon Parent QA\n\n"
    + (report.passed ? "PASS" : "FAIL") + ": " + report.checks.filter((item) => item.passed).length
    + "/" + report.expectedChecks + " checks.\n\n[Open retained report]("
    + out.slice(outputRoot.length + 1).replaceAll("\\", "/") + "/report.md)\n");
  console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, output: out, privateHarnessClosed: report.privateHarnessClosed }));
  if (!report.passed) process.exitCode = 1;
}
