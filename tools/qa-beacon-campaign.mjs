import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { startBeaconQa } from "./serve-beacon-qa.mjs";
import { createQuestion } from "../beacon-brigade/content.js";
import { getCampaign } from "../beacon-brigade/campaign.js";
import { publicState } from "../functions/_lib/beacon-brigade.js";

// Build separately, then run: node tools/qa-beacon-campaign.mjs
// Never uses BQ_QA_URL, preview mode, shared D1, API mocks or injected game state.
// BQ_PLAYWRIGHT_MODULE / BQ_CHROME_PATH may select existing local runtimes.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const startedAt = new Date().toISOString();
const out = resolve(root, "../outputs/qa-beacon-campaign", startedAt.replace(/[:.]/g, "-"));
const require = createRequire(import.meta.url);
const inputs = ["beacon-brigade/game.js", "beacon-brigade/content.js", "beacon-brigade/subject-content.js",
  "beacon-brigade/campaign.js", "beacon-brigade/src/app.ts", "beacon-brigade/src/campaign-ui.ts",
  "beacon-brigade/src/world.ts", "beacon-brigade/src/scenery.ts", "functions/_lib/beacon-brigade.js",
  "functions/api/beacon-brigade.js", "tools/serve-beacon-qa.mjs"];
const report = { startedAt, command: "node tools/qa-beacon-campaign.mjs", checks: [], errors: [],
  screenshots: [], apiCalls: [], unexpectedResponses: [], requestFailures: [], blockedExternalRequests: [],
  inputs: {}, changedInputs: [], boundaries: [
    "Private startBeaconQa({port:0}) with synthetic child, ephemeral D1 and real API handlers.",
    "Game writes use UI actions; one direct API equip rejection tests server authority without changing state.",
    "Parent review uses the actual portal and synthetic Parent PIN, not an injected Parent capability.",
    "Muted headless browser; outbound page requests blocked; no production data or remote operations.",
    "Scenery visibility/configuration assertions, not pixel matching. Screenshots need human visual review.",
    "No automatic build. Source/build hashes must remain unchanged throughout the run."
  ] };
let harness, browser, context, page, fixture;
let currentCheck = "Setup", completed = false, originalWrong, originalStationId;

async function check(name, run) {
  currentCheck = name;
  const start = Date.now();
  try {
    await run();
    report.checks.push({ name, passed: true, durationMs: Date.now() - start });
    console.log("PASS " + name);
  } catch (error) {
    report.checks.push({ name, passed: false, detail: error.stack });
    throw error;
  }
}
const hashFile = async (name) => createHash("sha256").update(await readFile(resolve(root, name))).digest("hex");
const state = () => page.evaluate(() => window.__BEACON_QA__.state);
const action = (name) => page.locator(`[data-action="${name}"]:visible`).first();
const projectButton = (id) => page.locator(`[data-action="restore-project"][data-project="${id}"]`);
const equipButton = (id) => page.locator(`[data-action="equip-loadout"][data-loadout="${id}"]`);
async function idle() {
  await page.waitForFunction(() => window.__BEACON_QA__ && document.querySelector("#game")?.getAttribute("aria-busy") !== "true");
}
async function view(name) {
  await page.waitForFunction((expected) => window.__BEACON_QA__?.view === expected
    && document.querySelector("#game")?.getAttribute("aria-busy") !== "true", name, { timeout: 45000 });
}
async function click(name) { await action(name).click(); await idle(); }
async function nav(name) { await page.locator(`#navigation [data-action="${name}"]`).click(); await view(name); }
async function boot(reload = false) {
  if (reload) await page.reload({ waitUntil: "networkidle" });
  else await page.goto(`${harness.origin}/beacon-brigade/`, { waitUntil: "networkidle" });
  await idle();
  await page.waitForFunction(() => window.__BEACON_QA__?.world?.scenery);
  assert.equal(await page.evaluate(() => window.__BEACON_QA__.preview), false);
}
async function shot(name) {
  const filename = `${name}.png`;
  await page.screenshot({ path: resolve(out, filename) });
  report.screenshots.push({ file: filename, check: currentCheck, viewport: page.viewportSize() });
}
async function stored() {
  const row = await harness.db.prepare("SELECT version,state_json FROM beacon_brigade_states WHERE family_id=? AND child_id=?")
    .bind(fixture.familyId, fixture.childId).first();
  assert(row, "Expected a persisted synthetic child game row");
  const saved = JSON.parse(row.state_json);
  assert.equal(saved.version, row.version);
  return saved;
}
async function receipts() {
  return (await harness.db.prepare("SELECT COUNT(*) AS total FROM beacon_brigade_operations WHERE family_id=? AND child_id=?")
    .bind(fixture.familyId, fixture.childId).first()).total;
}
async function persistedMatchesUi() {
  const saved = await stored();
  assert.deepEqual(await state(), publicState(saved));
  assert.equal(await receipts(), saved.version, "Every successful UI mutation has exactly one D1 receipt");
  return saved;
}
async function uiCommit(type, control) {
  const version = (await state()).version;
  const responsePromise = page.waitForResponse((response) => {
    if (new URL(response.url()).pathname !== "/api/beacon-brigade" || response.request().method() !== "POST") return false;
    return response.request().postDataJSON()?.action?.type === type;
  });
  // Register the response waiter before clicking; do not race against a fast D1 save.
  const [response] = await Promise.all([responsePromise, control.click()]);
  const body = await response.json();
  assert.equal(response.status(), 200, JSON.stringify(body));
  assert.equal(body.state.version, version + 1);
  await page.waitForFunction((expected) => window.__BEACON_QA__?.state.version === expected
    && document.querySelector("#game")?.getAttribute("aria-busy") !== "true", version + 1);
  await persistedMatchesUi();
  return body.state;
}
async function currentQuestion(id) {
  const station = (await state()).activeExpedition.stations.find((item) => item.id === id);
  assert(station, "Station belongs to the active expedition");
  // The saved variant is authoritative: never assume two variants or recompute rotation.
  const question = createQuestion(station.question.templateId, station.question.variant);
  assert.equal(question.id, station.question.id);
  assert.equal(question.prompt, station.question.prompt, "Built client and current authored content must agree");
  return question;
}
async function answer(id, value) {
  const question = await currentQuestion(id);
  if (question.type === "number") await page.locator("#answer-input").fill(String(value));
  if (question.type === "choice") {
    const option = page.locator("#answer-form [data-option]:visible");
    const index = await option.evaluateAll((elements, expected) => elements.findIndex((el) => el.dataset.option === expected), String(value));
    assert(index >= 0, "Authored choice has a visible answer control");
    await option.nth(index).click();
  }
  await uiCommit("answer", page.locator('#answer-form button[type="submit"]'));
}
async function openStation(id) {
  await view("region");
  const index = (await state()).activeExpedition.stations.findIndex((station) => station.id === id);
  assert(index >= 0);
  await page.locator('[data-action="select-station"]').nth(index).click();
  await click("march-station");
  await view("station");
  assert(await page.locator("#answer-form").isVisible());
}
async function sceneryMatches() {
  const campaign = getCampaign(await state());
  const actual = await page.evaluate(() => {
    const { world } = window.__BEACON_QA__;
    return { projects: [...world.scenery.projects].map(([id, item]) => ({ id, visible: item.visible })),
      repairs: [...world.scenery.repairs].map(([threshold, item]) => ({ threshold, visible: item.visible })),
      textureErrors: world.textureErrors };
  });
  assert.deepEqual(actual.projects.map((item) => item.id).sort(), ["bridge", "greenhouse", "observatory"]);
  for (const item of actual.projects) assert.equal(item.visible, campaign.projectsBuilt.includes(item.id), `${item.id} scenery`);
  assert(actual.repairs.some((item) => item.threshold > 0 && item.threshold <= 5), "Early repairs are configured within the first expedition");
  for (const repair of actual.repairs) assert.equal(repair.visible, campaign.resolvedStations >= repair.threshold, `Repair threshold ${repair.threshold}`);
  assert.deepEqual(actual.textureErrors, []);
  return actual;
}
async function deploy(regionId, amount) {
  await nav("campaign");
  await page.locator(`.district-track [data-action="destination"][data-region="${regionId}"]`).click();
  await view("map");
  await uiCommit("start", action("march-region"));
  await view("region");
  const expedition = (await state()).activeExpedition;
  assert.equal(expedition.regionId, regionId);
  assert.equal(expedition.loadoutId, "hauler");
  assert.equal(expedition.stations.length, 5);
  for (const station of expedition.stations) {
    assert.equal(station.reward.amount, amount);
    assert.equal(station.question.answer, undefined);
  }
  return expedition;
}
async function solveRemaining({ supportFirst = false } = {}) {
  const stations = (await state()).activeExpedition.stations;
  for (const [index, station] of stations.entries()) {
    if (station.resolved) continue;
    await openStation(station.id);
    const question = await currentQuestion(station.id);
    const before = (await state()).wallet[station.reward.resource];
    if (index === 0 && supportFirst) {
      originalStationId = station.id;
      originalWrong = question.type === "number" ? question.answer + 1 : question.options.find((option) => option.id !== question.answer).id;
      await answer(station.id, originalWrong);
      await uiCommit("hint", action("hint"));
      await answer(station.id, originalWrong);
      await uiCommit("hint", action("hint"));
      assert.equal((await state()).wallet[station.reward.resource], before);
      assert.equal((await state()).activeExpedition.stations[index].reward.amount, station.reward.amount);
      await shot("first-question-worked-support");
    }
    await answer(station.id, question.answer);
    const next = await state();
    assert.equal(next.wallet[station.reward.resource], before + station.reward.amount);
    assert.equal(next.activeExpedition.stations[index].resolved, true);
    if (index === 0 && supportFirst) {
      assert.equal(next.activeExpedition.stations[index].resolution, "assisted");
      assert.equal(getCampaign(next).resolvedStations, 1);
    }
    await sceneryMatches();
    await page.locator('#answer-form [data-action="region"]').click();
    await view("region");
  }
}
async function finish() {
  const id = (await state()).activeExpedition.id;
  await uiCommit("finish", action("finish"));
  await view("results");
  const saved = await state();
  assert.equal(saved.activeExpedition, null);
  assert.equal(saved.history.at(-1).id, id);
  assert.equal(saved.history.at(-1).status, "completed");
  await nav("map");
  assert.equal(await page.evaluate((regionId) => window.__BEACON_QA__.world.mapMarkers.get(regionId)?.completed,
    saved.history.at(-1).regionId), true);
}
async function completeDistrict(regionId, amount) {
  await deploy(regionId, amount);
  await solveRemaining();
  await finish();
}
async function restore(id) {
  await nav("campaign");
  assert.equal(await projectButton(id).isDisabled(), false);
  await projectButton(id).click();
  await page.locator("#dialog[open]").waitFor();
  await uiCommit("project", page.locator(`#dialog [data-action="restore-now"][data-project="${id}"]`));
  await view("landmark");
  await sceneryMatches();
  await nav("map");
}
async function cancelAndPreserve(opener) {
  const before = await stored();
  const count = await receipts();
  await opener.click();
  await page.locator("#dialog[open]").waitFor();
  await page.locator('#dialog .dialog-actions [data-action="close-dialog"]').click();
  await page.locator("#dialog").waitFor({ state: "hidden" });
  assert.deepEqual(await stored(), before);
  assert.equal(await receipts(), count);
  await persistedMatchesUi();
}

await mkdir(out, { recursive: true });
try {
  for (const name of inputs) report.inputs[name] = await hashFile(name);
  let playwright;
  try { playwright = require(process.env.BQ_PLAYWRIGHT_MODULE || "playwright"); }
  catch (error) {
    if (process.env.BQ_PLAYWRIGHT_MODULE) throw error;
    playwright = require(resolve(homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"));
  }
  harness = await startBeaconQa({ port: 0 });
  fixture = harness.fixture;
  assert.equal(fixture.synthetic, true);
  report.origin = harness.origin;
  browser = await playwright.chromium.launch({ headless: true,
    executablePath: process.env.BQ_CHROME_PATH || (process.platform === "win32"
      ? resolve(process.env.ProgramFiles || "C:/Program Files", "Google/Chrome/Application/chrome.exe") : undefined),
    args: ["--mute-audio", "--disable-background-networking"] });
  context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "en-AU",
    timezoneId: "Australia/Sydney", reducedMotion: "reduce", serviceWorkers: "block" });
  await context.addCookies([fixture.cookie]);
  await context.addInitScript((capability) => {
    if (!sessionStorage.getItem("beaconCampaignQaInitialised")) {
      sessionStorage.setItem("brightQuestChildCapability", capability);
      sessionStorage.setItem("beaconCampaignQaInitialised", "true");
    }
  }, fixture.childCapability);
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === harness.origin) return route.continue();
    report.blockedExternalRequests.push(url.origin + url.pathname);
    return route.abort();
  });
  page = await context.newPage();
  page.setDefaultTimeout(20000);
  page.on("pageerror", (error) => report.errors.push({ check: currentCheck, text: error.message }));
  page.on("console", (message) => {
    if (message.type() === "error") report.errors.push({ check: currentCheck, text: message.text() });
  });
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (url.origin !== harness.origin) return;
    if (url.pathname.startsWith("/api/")) report.apiCalls.push({ check: currentCheck,
      path: url.pathname + url.search, method: response.request().method(), status: response.status() });
    if (response.status() >= 400) report.unexpectedResponses.push({ check: currentCheck, path: url.pathname, status: response.status() });
  });
  page.on("requestfailed", (request) => {
    // Navigation may legitimately cancel a previous page's in-flight resource.
    if (request.failure()?.errorText !== "net::ERR_ABORTED") report.requestFailures.push({ check: currentCheck,
      path: new URL(request.url()).pathname, error: request.failure()?.errorText });
  });

  await check("Authenticated fresh child, disabled restoration and live renderer", async () => {
    await boot(); await view("hq");
    assert.deepEqual((await state()).wallet, { parts: 0, cores: 0 });
    assert.equal(await page.evaluate(() => localStorage.getItem("bqBeaconPreviewV1")), null);
    const frame = await page.evaluate(() => window.__BEACON_QA__.frame);
    await page.waitForFunction((before) => window.__BEACON_QA__.frame > before, frame);
    await sceneryMatches();
    await nav("campaign");
    for (const id of ["bridge", "observatory", "greenhouse"]) assert(await projectButton(id).isDisabled());
    await shot("campaign-initial-desktop");
  });
  await check("Garage offers all loadouts; hauler equipment persists through reload", async () => {
    await nav("hq"); await click("garage"); await view("garage");
    for (const id of ["survey", "balanced", "rescue", "crawler", "hauler"]) {
      await uiCommit("equip", equipButton(id));
      assert.equal(getCampaign(await state()).loadoutId, id);
      assert(await equipButton(id).isDisabled());
    }
    await shot("garage-hauler-desktop");
    await boot(true); await nav("hq"); await click("garage"); await view("garage");
    assert(await equipButton("hauler").isDisabled());
    assert.equal(getCampaign(await persistedMatchesUi()).loadoutId, "hauler");
    await page.setViewportSize({ width: 390, height: 844 });
    await shot("garage-hauler-mobile");
    await page.setViewportSize({ width: 1440, height: 900 });
  });
  await check("Active expedition snapshots hauler and blocks every equipment change", async () => {
    const expedition = await deploy("harbour", 5);
    assert.equal(expedition.modifiers.travelSpeedMultiplier, 0.85);
    await nav("hq"); await click("garage"); await view("garage");
    for (const id of ["balanced", "survey", "hauler", "rescue", "crawler"]) assert(await equipButton(id).isDisabled());
    const before = await stored();
    const response = await context.request.post(`${harness.origin}/api/beacon-brigade`, {
      headers: { "x-bq-child-capability": fixture.childCapability, "x-bq-child-id": fixture.childId },
      data: { operationId: randomUUID(), version: before.version, action: { type: "equip", loadoutId: "survey" } }
    });
    assert.equal(response.status(), 409);
    assert.equal((await response.json()).code, "EXPEDITION_ACTIVE");
    report.apiCalls.push({ check: currentCheck, method: "POST", path: "/api/beacon-brigade", status: 409, expected: true });
    assert.deepEqual(await stored(), before);
    await boot(true);
    assert.deepEqual((await state()).activeExpedition, publicState(before).activeExpedition);
    await nav("hq"); await click("resume"); await view("region");
  });
  await check("Five harbour stations award 25 parts, even with worked support; early repairs light before finish", async () => {
    await solveRemaining({ supportFirst: true });
    assert.deepEqual((await state()).wallet, { parts: 25, cores: 0 });
    assert.equal(getCampaign(await state()).resolvedStations, 5);
    assert.equal((await state()).history.length, 0);
    const scenery = await sceneryMatches();
    assert(scenery.repairs.some((item) => item.visible));
    await shot("harbour-resolved-before-finish");
    await finish();
    assert.equal((await state()).history[0].earned.parts, 25);
  });
  await check("Bridge cancellation preserves funds; construction debits 16/0 once and survives reload", async () => {
    await nav("campaign");
    assert.equal(await projectButton("bridge").isDisabled(), false);
    await cancelAndPreserve(projectButton("bridge"));
    assert.deepEqual((await state()).wallet, { parts: 25, cores: 0 });
    await restore("bridge");
    assert.deepEqual((await state()).wallet, { parts: 9, cores: 0 });
    await boot(true); await persistedMatchesUi();
    assert.deepEqual(getCampaign(await state()).projectsBuilt, ["bridge"]);
    await sceneryMatches();
    await nav("campaign"); assert(await projectButton("bridge").isDisabled());
    await shot("bridge-built-desktop");
    await page.setViewportSize({ width: 390, height: 844 });
    await shot("bridge-built-mobile");
    await page.setViewportSize({ width: 1440, height: 900 });
  });
  await check("Physics completes normally; unlocked but unaffordable observatory is disabled", async () => {
    await completeDistrict("physics", 5);
    assert.deepEqual((await state()).wallet, { parts: 9, cores: 25 });
    await nav("campaign");
    const project = getCampaign(await state()).projects.find((item) => item.id === "observatory");
    assert.equal(project.unlocked, true); assert.equal(project.affordable, false);
    assert(await projectButton("observatory").isDisabled());
  });
  await check("English funds the observatory; building during chemistry cannot alter active rewards", async () => {
    await completeDistrict("english", 5);
    assert.deepEqual((await state()).wallet, { parts: 34, cores: 25 });
    const expedition = await deploy("chemistry", 5);
    await restore("observatory");
    assert.deepEqual((await state()).wallet, { parts: 10, cores: 9 });
    assert.deepEqual((await state()).activeExpedition, expedition);
    assert.equal(getCampaign(await state()).stationRewardAmount, 6);
    await boot(true); await persistedMatchesUi();
    assert.deepEqual((await state()).activeExpedition, expedition);
    await nav("hq"); await click("resume"); await view("region");
    await solveRemaining(); await finish();
    assert.equal((await state()).history.at(-1).earned.cores, 25);
    assert.deepEqual((await state()).wallet, { parts: 10, cores: 34 });
  });
  await check("Next expedition receives cargo bonus; greenhouse stays disabled until funded", async () => {
    await completeDistrict("grove", 6);
    assert.deepEqual((await state()).wallet, { parts: 10, cores: 64 });
    await nav("campaign");
    const project = getCampaign(await state()).projects.find((item) => item.id === "greenhouse");
    assert.equal(project.unlocked, true); assert.equal(project.affordable, false);
    assert(await projectButton("greenhouse").isDisabled());
    await completeDistrict("harbour", 6);
    assert.deepEqual((await state()).wallet, { parts: 40, cores: 64 });
    await restore("greenhouse");
    assert.deepEqual((await state()).wallet, { parts: 24, cores: 40 });
    await boot(true); await persistedMatchesUi(); await sceneryMatches();
    assert.equal(getCampaign(await state()).projectsBuilt.length, 3);
    assert.equal(getCampaign(await state()).resolvedStations, 30);
    await nav("campaign"); await shot("all-projects-restored");
  });
  await check("Reset warning cancellation preserves purchases, wallet, loadout and learning evidence", async () => {
    const before = await stored();
    await click("reset-game");
    const warning = await page.locator("#dialog .reset-warning").innerText();
    for (const phrase of ["HQ levels", "resources", "completed districts", "answers", "journal records"]) assert(warning.includes(phrase));
    await shot("reset-warning");
    await page.locator('#dialog .dialog-actions [data-action="close-dialog"]').click();
    await page.locator("#dialog").waitFor({ state: "hidden" });
    assert.deepEqual(await stored(), before);
    await boot(true); assert.deepEqual(await persistedMatchesUi(), before);
    await writeFile(resolve(out, "d1-game-state.json"), JSON.stringify(before, null, 2));
  });
  await check("Actual Parent PIN review retains the original wrong answer and unchanged five-site cargo", async () => {
    const before = await stored();
    await page.goto(harness.origin + "/", { waitUntil: "networkidle" });
    await page.locator("#dashboardScreen:not(.hidden)").waitFor();
    await page.locator('[data-bq-action="parent-cockpit"]').click();
    await page.locator("#familyParentPin").fill(fixture.login.parentPin);
    const unlockPromise = page.waitForResponse((response) => new URL(response.url()).pathname === "/api/auth/parent-unlock");
    const [unlock] = await Promise.all([unlockPromise, page.getByRole("button", { name: "Open Parent Cockpit", exact: true }).click()]);
    assert.equal(unlock.status(), 200);
    await page.locator("#parentScreen:not(.hidden)").waitFor();
    await page.locator('#parentScreen [data-parent-route="beacon-brigade"]').click();
    const reviewPromise = page.waitForResponse((response) => {
      const url = new URL(response.url());
      return url.pathname === "/api/beacon-brigade" && url.searchParams.get("childId") === fixture.childId;
    });
    const [response] = await Promise.all([reviewPromise, page.getByRole("button", { name: "Review expeditions", exact: true }).click()]);
    assert.equal(response.status(), 200);
    const evidence = await response.json();
    assert.deepEqual(evidence.state, publicState(before, { review: true }));
    const original = evidence.state.history[0].stations.find((station) => station.id === originalStationId);
    assert.equal(original.attempts[0].answer, originalWrong);
    assert.deepEqual(original.attempts.map((attempt) => attempt.correct), [false, false, true]);
    assert.equal(original.resolution, "assisted"); assert.equal(original.reward.amount, 5);
    assert.equal(evidence.state.history[0].earned.parts, 25);
    const popup = page.locator("#bqBeaconReviewPopup");
    await popup.locator("[data-beacon-review-body][aria-busy=false]").waitFor();
    const card = popup.locator(".bq-beacon-station").filter({ has: page.getByRole("heading", { name: original.question.prompt, exact: true }) }).first();
    assert(await card.isVisible());
    const attempts = await card.locator(".bq-beacon-attempts").innerText();
    assert(attempts.includes(`Original answer: ${originalWrong}`));
    assert(attempts.includes("Incorrect"));
    await card.scrollIntoViewIfNeeded(); await shot("parent-original-wrong-answer");
    await popup.getByRole("button", { name: "Close", exact: true }).click();
    await popup.waitFor({ state: "hidden" });
    assert.deepEqual(await stored(), before, "Parent review and navigation do not mutate game evidence");
    await writeFile(resolve(out, "parent-review.json"), JSON.stringify(evidence, null, 2));
  });
  await check("Confirmed reset during a live station drive clears its callback and never reopens a station", async () => {
    await boot();
    await deploy("harbour", 6);
    // Exercise the real motion preference so the reset occurs during an observable drive.
    await click("settings");
    await page.locator("#motion-setting").uncheck();
    await page.locator("#sound-setting").uncheck();
    await click("save-settings");
    await page.locator('[data-action="select-station"]').first().click();
    await click("march-station");
    await view("travel");
    await page.waitForFunction(() => {
      const travel = window.__BEACON_QA__.world.travel;
      return travel?.kind === "station" && travel.elapsed > 0 && travel.elapsed < travel.duration;
    });
    const drive = await page.evaluate(() => ({ duration: window.__BEACON_QA__.world.travel.duration,
      hasCallback: typeof window.__BEACON_QA__.world.onTravelEnd === "function" }));
    assert.equal(drive.hasCallback, true);
    await click("reset-game");
    assert.equal(await page.evaluate(() => window.__BEACON_QA__.world.paused), true);
    await shot("reset-during-live-station-drive");
    await uiCommit("reset", page.locator('#dialog [data-action="reset-now"]'));
    await view("hq");
    const reset = await persistedMatchesUi();
    assert.deepEqual(reset.wallet, { parts: 0, cores: 0 });
    assert.deepEqual(reset.history, []);
    assert.equal(reset.activeExpedition, null);
    assert.deepEqual(reset.campaign, { loadoutId: "balanced", projects: [] });
    assert.deepEqual(await page.evaluate(() => ({ travel: window.__BEACON_QA__.world.travel,
      callback: window.__BEACON_QA__.world.onTravelEnd })), { travel: null, callback: null });
    // Wait beyond the old drive's full duration using the renderer's own clock.
    // This observes the live loop without accelerating it or invoking stale callbacks.
    const clock = await page.evaluate(() => window.__BEACON_QA__.world.clock);
    await page.waitForFunction(({ start, duration }) => window.__BEACON_QA__.world.clock >= start + duration + 0.5,
      { start: clock, duration: drive.duration }, { timeout: 60000 });
    await view("hq");
    assert.equal(await page.locator("#answer-form").count(), 0);
    assert.deepEqual(await stored(), reset);
    await sceneryMatches();
    await shot("reset-still-hq-after-old-drive-duration");
    await boot(true); await view("hq");
    assert.deepEqual(await persistedMatchesUi(), reset);
    await writeFile(resolve(out, "d1-after-drive-reset.json"), JSON.stringify(reset, null, 2));
  });
  await check("No runtime errors, missing resources, outbound requests or concurrent build changes", async () => {
    for (const [name, before] of Object.entries(report.inputs)) if (await hashFile(name) !== before) report.changedInputs.push(name);
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.unexpectedResponses, []);
    assert.deepEqual(report.requestFailures, []);
    assert.deepEqual(report.blockedExternalRequests, []);
    assert.deepEqual(report.changedInputs, [], "Rebuild/re-run after concurrent source changes finish");
  });
  completed = true;
} catch (error) {
  report.fatal = { check: currentCheck, detail: error.stack };
  console.error(error.stack);
  if (page && !page.isClosed()) await shot("failure").catch(() => {});
} finally {
  try { await browser?.close(); } catch (error) { report.errors.push({ check: "Cleanup", text: error.message }); }
  try { await harness?.close(); report.privateHarnessClosed = Boolean(harness); }
  catch (error) { report.errors.push({ check: "Cleanup", text: error.message }); }
  report.finishedAt = new Date().toISOString();
  report.passed = completed && !report.fatal && report.errors.length === 0 && report.checks.every((item) => item.passed);
  await writeFile(resolve(out, "report.json"), JSON.stringify(report, null, 2));
  await writeFile(resolve(out, "report.md"), ["# Beacon Campaign Browser / D1 QA", "",
    `Result: ${report.passed ? "PASS" : "FAIL"}`, `Run: ${startedAt}`,
    `Checks passed: ${report.checks.filter((item) => item.passed).length}/${report.checks.length}`, "",
    "## Boundaries", ...report.boundaries.map((item) => "- " + item), "", "## Checks",
    ...report.checks.map((item) => `- ${item.passed ? "PASS" : "FAIL"}: ${item.name}`), "", "## Evidence",
    "- [Machine-readable report](report.json)",
    ...report.screenshots.map((item) => `- [${item.check}, ${item.viewport.width}x${item.viewport.height}](${item.file})`),
    "", "## Failure", report.fatal ? "```text\n" + report.fatal.detail + "\n```" : "None.", ""
  ].join("\n"));
  console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, output: out,
    privateHarnessClosed: report.privateHarnessClosed }, null, 2));
  if (!report.passed) process.exitCode = 1;
}
