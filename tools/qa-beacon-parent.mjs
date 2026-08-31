import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { dirname, extname, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createState, applyAction, publicState } from "../functions/_lib/beacon-brigade.js";

// Run from any directory: node <repo>/tools/qa-beacon-parent.mjs
// All browser requests are fulfilled from fixtures/local files or blocked.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(root, "../outputs/qa-beacon-parent");
const startedAt = new Date().toISOString();
const out = resolve(outputRoot, startedAt.replace(/[:.]/g, "-"));
const origin = "http://127.0.0.1:4197";
const require = createRequire(import.meta.url);
const inputPaths = [
  "tools/qa-beacon-parent.mjs", "bright-quest-shell-merge.js", "beacon-parent.css",
  "functions/_lib/beacon-brigade.js", "beacon-brigade/content.js", "index.html",
  "styles.css", "bright-quest-shell-merge.css", "bright-quest-experience-uplift.css",
  "beacon-brigade/assets/module-preview.jpg"
];
const report = {
  startedAt, command: "node tools/qa-beacon-parent.mjs", expectedChecks: 25,
  scope: "Synthetic full-portal Parent and launch regression; not a live API or game-render test.",
  boundaries: [
    "Fresh browser context; fictional QA learners and UUIDs only.",
    "Parent UI is entered directly; real PIN entry and capability validity are not tested.",
    "Profiles and Beacon GET responses are mocked. Fixture state uses the real domain reducer.",
    "Every request is intercepted: local files/fixtures are fulfilled; external origins are blocked.",
    "No deployment, database migration, production API calls or module artwork changes."
  ],
  checks: [], errors: [], screenshots: [], apiRequests: [], blockedExternalRequests: [],
  unexpectedLocalRequests: [], remoteRequestsSent: 0, inputs: {}, changedInputs: []
};
const profileA = {
  id: "qa-legacy-a", name: "QA Learner A", attempts: [], icasAttempts: [],
  trainingCompleted: {}, writingSamples: [], stars: 0, createdAt: "2026-08-31T00:00:00Z"
};
const profileB = { ...profileA, id: "qa-legacy-b", name: "QA Learner B" };
const childA = "11111111-1111-4111-8111-111111111111";
const childB = "22222222-2222-4222-8222-222222222222";
const at = "2026-08-31T00:00:00Z";
let browser;
let page;
let networkMode = "success";
let payload;
let heldResponse;
let heldNotifier;
let currentCheck = "Setup";
await mkdir(out, { recursive: true });

function fixtures() {
  let state = createState({ profileId: childA });
  const act = (action) => { state = applyAction(state, { ...action, at }); };
  act({ type: "start", regionId: "harbour" });
  for (const station of state.activeExpedition.stations) {
    act({ type: "answer", stationId: station.id, answer: station.question.answer });
  }
  act({ type: "finish" });
  act({ type: "start", regionId: "harbour" });
  let station = state.activeExpedition.stations[0];
  act({ type: "answer", stationId: station.id, answer: 9999 });
  act({ type: "answer", stationId: station.id, answer: station.question.answer });
  station = state.activeExpedition.stations[1];
  act({ type: "answer", stationId: station.id, answer: 8888 });
  act({ type: "hint", stationId: station.id });
  act({ type: "answer", stationId: station.id, answer: 7777 });
  act({ type: "hint", stationId: station.id });
  act({ type: "answer", stationId: station.id, answer: station.question.answer });
  act({ type: "end" });
  act({ type: "start", regionId: "grove" });
  station = state.activeExpedition.stations[0];
  act({ type: "answer", stationId: station.id, answer: station.question.answer });
  const result = (value) => ({ state: publicState(value, { review: true }), profile: { id: childA, name: profileA.name } });
  const mixed = result(state);

  state = createState({ profileId: childA });
  act({ type: "start", regionId: "grove" });
  station = state.activeExpedition.stations[0];
  const wrong = station.question.options.find((option) => option.id !== station.question.answer).id;
  act({ type: "answer", stationId: station.id, answer: wrong });
  act({ type: "hint", stationId: station.id });
  act({ type: "answer", stationId: station.id, answer: station.question.answer });
  act({ type: "end" });
  return { mixed, hintedScience: result(state), empty: result(createState({ profileId: childA })) };
}

async function hashFile(path) {
  return createHash("sha256").update(await readFile(resolve(root, path))).digest("hex");
}

async function check(name, action) {
  currentCheck = name;
  const start = Date.now();
  try {
    await action();
    report.checks.push({ name, passed: true, durationMs: Date.now() - start });
    console.log("PASS " + name);
  } catch (error) {
    report.checks.push({ name, passed: false, durationMs: Date.now() - start, detail: error.stack });
    throw error;
  }
}

async function shot(name, state) {
  const filename = name + ".png";
  const path = resolve(out, filename);
  await page.screenshot({ path });
  report.screenshots.push({
    file: filename, state, viewport: page.viewportSize(), url: page.url(),
    sha256: createHash("sha256").update(await readFile(path)).digest("hex")
  });
}

async function settled() {
  await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
}

function holdNextResponse() {
  networkMode = "hold";
  return new Promise((done) => { heldNotifier = done; });
}

async function releaseHeld(body) {
  const responsePromise = page.waitForResponse((response) => new URL(response.url()).pathname === "/api/beacon-brigade");
  await heldResponse.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
  await (await responsePromise).finished();
  await settled();
}

async function enterParent(child = profileA) {
  await page.evaluate((profile) => {
    state.selectedRole = "parent";
    state.parentProfileId = profile.id;
    window.BrightQuestFamilyAuth.requestHeaders = () => ({ "x-bq-parent-capability": "synthetic-parent-token" });
    showScreen("parent");
    window.location.hash = "parent/beacon-brigade";
    renderParentDashboard();
  }, child);
  await settled();
}

async function enterKid(uplift = true) {
  await page.evaluate(({ profile, uplift }) => {
    document.body.classList.toggle("bq-experience-uplift", uplift);
    state.profile = state.profiles[profile.id];
    state.profileId = profile.id;
    state.selectedRole = "kid";
    renderDashboard();
    showScreen("dashboard");
  }, { profile: profileA, uplift });
  await settled();
}

try {
  for (const path of inputPaths) report.inputs[path] = await hashFile(path);
  const syntax = spawnSync(process.execPath, ["--check", resolve(root, "bright-quest-shell-merge.js")], { encoding: "utf8" });
  report.syntaxCheck = { passed: syntax.status === 0, detail: syntax.stderr || syntax.stdout };
  assert.equal(syntax.status, 0, report.syntaxCheck.detail);
  let playwright;
  let modulePath = process.env.BQ_PLAYWRIGHT_MODULE || "playwright";
  try { playwright = require(modulePath); }
  catch (error) {
    if (process.env.BQ_PLAYWRIGHT_MODULE) throw error;
    modulePath = resolve(homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
    playwright = require(modulePath);
  }
  const executablePath = process.env.BQ_CHROME_PATH || (process.platform === "win32"
    ? resolve(process.env.ProgramFiles || "C:/Program Files", "Google/Chrome/Application/chrome.exe") : undefined);
  report.runtime = { node: process.version, platform: process.platform, playwright: modulePath, executablePath };
  const data = fixtures();
  payload = data.mixed;
  await writeFile(resolve(out, "fixtures.json"), JSON.stringify({ profiles: [profileA, profileB], childA, childB, ...data }, null, 2));
  browser = await playwright.chromium.launch({ executablePath, headless: true, args: ["--mute-audio", "--disable-background-networking"] });
  report.runtime.browser = browser.version();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
    locale: "en-AU", timezoneId: "Australia/Sydney", reducedMotion: "reduce", serviceWorkers: "block"
  });
  page = await context.newPage();
  page.setDefaultTimeout(6000);
  page.on("pageerror", (error) => report.errors.push({ check: currentCheck, type: "pageerror", text: error.message }));
  page.on("console", (message) => {
    // Expected 403/aborted fixture requests are recorded separately; retain other console errors.
    if (message.type() === "error" && !/Failed to load resource/.test(message.text())) {
      report.errors.push({ check: currentCheck, type: "console", text: message.text() });
    }
  });
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin) {
      report.blockedExternalRequests.push(url.href);
      return route.abort();
    }
    const json = (body) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
    if (url.pathname === "/api/auth/config") return json({ enabled: false, experienceUpliftEnabled: true });
    if (url.pathname === "/api/profiles") {
      report.apiRequests.push({
        path: url.pathname, method: request.method(),
        parentCapabilityAttached: request.headers()["x-bq-parent-capability"] === "synthetic-parent-token",
        scenario: networkMode
      });
      if (request.method() !== "GET") return json({ ok: true });
      return json({ profiles: networkMode === "missing" ? [] : [
        { profileId: profileA.id, childId: childA, payload: profileA },
        { profileId: profileB.id, childId: childB, payload: profileB }
      ] });
    }
    if (url.pathname === "/api/beacon-brigade") {
      report.apiRequests.push({
        path: url.pathname + url.search, method: request.method(),
        parentCapabilityAttached: request.headers()["x-bq-parent-capability"] === "synthetic-parent-token",
        scenario: networkMode
      });
      if (networkMode === "hold") {
        heldResponse = route;
        heldNotifier?.();
        heldNotifier = null;
        return;
      }
      if (networkMode === "denied") return route.fulfill({ status: 403, contentType: "application/json", body: '{"error":"Synthetic denial"}' });
      if (networkMode === "empty") return json(data.empty);
      if (networkMode === "mismatch") return json({ ...payload, profile: { id: childB, name: profileB.name } });
      return json(payload);
    }
    if (url.pathname.startsWith("/api/")) return json({ ok: true });
    // This proves the launch URL only; the main game QA owns rendering and session bootstrap.
    if (url.pathname === "/beacon-brigade/") {
      return route.fulfill({ status: 200, contentType: "text/html", body: "<h1>Synthetic module launch target</h1>" });
    }
    const path = resolve(root, "." + decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname));
    if (!path.startsWith(root + sep)) return route.abort();
    try {
      const body = await readFile(path);
      const mime = {
        ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
        ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
        ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2",
        ".webmanifest": "application/manifest+json", ".mp3": "audio/mpeg"
      }[extname(path)] || "application/octet-stream";
      return route.fulfill({ status: 200, contentType: mime, body });
    } catch {
      if (url.pathname !== "/favicon.ico") report.unexpectedLocalRequests.push(url.pathname);
      return route.fulfill({ status: 404, body: "Local fixture resource not found" });
    }
  });
  await context.addInitScript(({ a, b }) => {
    localStorage.setItem("brightQuestProfilesV2", JSON.stringify({ [a.id]: a, [b.id]: b }));
    localStorage.setItem("brightQuestActiveProfile", a.id);
  }, { a: profileA, b: profileB });
  await page.goto(origin + "/?profileId=untrusted-url-child", { waitUntil: "networkidle" });
  await enterParent();
  const open = page.getByRole("button", { name: "Review expeditions", exact: true });
  const popup = page.locator("#bqBeaconReviewPopup");
  const close = popup.getByRole("button", { name: "Close", exact: true });
  const ready = () => popup.locator("[data-beacon-review-body][aria-busy=false]").waitFor();
  const openReady = async () => { await open.click(); await ready(); };

  await check("Authorised UUID mapping and capability headers", async () => {
    await openReady();
    assert.equal(await popup.getAttribute("aria-modal"), "true");
    assert.equal(await popup.getAttribute("aria-labelledby"), "bqBeaconReviewTitle");
    const requests = report.apiRequests.filter((item) => item.parentCapabilityAttached);
    assert.equal(requests.at(-2).path, "/api/profiles");
    assert.equal(requests.at(-1).path, "/api/beacon-brigade?childId=" + childA);
    assert.equal(requests.at(-1).method, "GET");
  });
  await check("Original incorrect answers retained before later corrections", async () => {
    assert.equal(await popup.locator(".bq-beacon-station.missed").count(), 2);
    assert.match(await popup.locator(".bq-beacon-station.missed").first().innerText(),
      /Original answer: 9999[\s\S]*Incorrect[\s\S]*Attempt 2:[\s\S]*Correct/);
  });
  await check("Worked guidance, partial and unattempted labels", async () => {
    const text = await popup.innerText();
    assert.match(text, /Completed with worked guidance/);
    assert.match(text, /Ended early - partial \| 2 of 3 stations resolved/);
    assert.match(text, /Not attempted - no station reward/);
    assert.match(text, /One expedition is in progress/);
  });
  await check("Wrong-answer expeditions first and first-response totals", async () => {
    const first = popup.locator(".bq-beacon-expedition").first();
    assert.equal(await first.locator("h4").innerText(), "Supply Harbour");
    assert.match(await first.innerText(), /Ended early - partial/);
    assert.match(await popup.locator(".bq-beacon-summary").nth(1).innerText(), /4 of 6/);
  });
  await check("Correct-first-try answers start collapsed and expand", async () => {
    assert.equal(await popup.locator(".bq-chem-review-correct[open]").count(), 0);
    const correct = popup.locator(".bq-chem-review-correct").first();
    await correct.locator(":scope > summary").click();
    assert.match(await correct.innerText(), /Correct first try, without hints/);
    await correct.locator(":scope > summary").click();
  });
  await check("Tab and Shift+Tab remain inside the popup", async () => {
    await close.focus();
    await page.keyboard.press("Shift+Tab");
    assert(await page.evaluate(() => document.activeElement.closest("#bqBeaconReviewPopup") !== null));
    await page.keyboard.press("Tab");
    assert(await close.evaluate((element) => element === document.activeElement));
  });
  await check("Escape closes, restores focus and releases inert background", async () => {
    await page.keyboard.press("Escape");
    assert.equal(await popup.isVisible(), false);
    assert(await open.evaluate((element) => element === document.activeElement));
    assert.equal(await page.locator("#app").evaluate((element) => element.inert), false);
  });
  for (const viewport of [
    { width: 390, height: 844, name: "mobile" },
    { width: 834, height: 1194, name: "tablet" },
    { width: 1440, height: 900, name: "desktop" }
  ]) {
    await check("Review fits " + viewport.name + " " + viewport.width + "x" + viewport.height, async () => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await openReady();
      const modal = popup.locator(".bq-chem-review-modal");
      const bounds = await modal.boundingBox();
      assert(bounds.x >= 0 && bounds.x + bounds.width <= viewport.width + 1);
      assert(bounds.y >= 0 && bounds.y + bounds.height <= viewport.height + 1);
      assert.equal(await modal.evaluate((element) => element.scrollWidth > element.clientWidth + 2), false);
      await shot("review-" + viewport.name, "Mixed evidence, summary and wrong-first expedition");
      await popup.locator(".bq-beacon-attempts").first().scrollIntoViewIfNeeded();
      await shot("answers-" + viewport.name, "Original incorrect numeric answer and later correction");
      await close.click();
    });
  }
  await check("Empty history is explicit", async () => {
    networkMode = "empty";
    await openReady();
    assert(await popup.getByText("No saved expeditions yet.", { exact: true }).isVisible());
    await shot("empty-history", "No saved expeditions");
    await close.click();
  });
  await check("Denied Parent access is recoverable via retry", async () => {
    networkMode = "denied";
    await openReady();
    assert.match(await popup.getByRole("alert").innerText(), /Parent access/);
    await shot("denied-access", "Synthetic HTTP 403");
    networkMode = "success";
    await popup.getByRole("button", { name: "Try again" }).click();
    await ready();
    assert(await popup.getByText("Ended early - partial | 2 of 3 stations resolved", { exact: true }).isVisible());
    await close.click();
  });
  await check("A closed popup rejects a delayed response", async () => {
    const held = holdNextResponse();
    await open.click();
    await held;
    await shot("loading-history", "Held synthetic response");
    await close.click();
    await releaseHeld(data.mixed);
    assert.equal(await popup.isVisible(), false);
    assert.equal(await popup.innerText(), "");
  });
  await check("Child switch clears evidence and rejects delayed response", async () => {
    const held = holdNextResponse();
    await open.click();
    await held;
    await page.evaluate((child) => { state.parentProfileId = child.id; renderParentDashboard(); }, profileB);
    await releaseHeld(data.mixed);
    assert.equal(await popup.isVisible(), false);
    assert.equal(await popup.innerText(), "");
    networkMode = "success";
    await enterParent();
  });
  await check("A learner with no exam attempts can launch from Learn", async () => {
    await enterKid();
    const launch = page.locator('[data-bq-action="beacon-brigade"]');
    assert.equal(await launch.count(), 1);
    assert.equal(await launch.isDisabled(), false);
    assert.match(await launch.innerText(), /Beacon Brigade[\s\S]*Maths & Science Expeditions/);
    assert.equal(await page.evaluate(() => state.profile.attempts.length), 0);
    await enterParent();
  });
  await check("Hinted science completion retains the original choice label", async () => {
    payload = data.hintedScience;
    await openReady();
    assert.match(await popup.innerText(), /Completed with a hint/);
    assert.match(await popup.locator(".bq-beacon-attempts").innerText(), /Original answer: Sample B: card/);
    assert.match(await popup.locator(".bq-beacon-attempts").innerText(), /Attempt 2: Sample A: flexible sheet/);
  });
  await check("Science tables, saved choices and answer evidence fit desktop/mobile", async () => {
    for (const size of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      await page.setViewportSize(size);
      const table = popup.locator("table").first();
      assert.equal(await table.locator("th[scope=col]").count(), 3);
      assert.equal(await table.locator("tbody tr").count(), 3);
      const choices = popup.locator(".bq-beacon-station").first().locator("summary");
      await choices.click();
      assert.match(await popup.innerText(), /Sample C: tile/);
      await choices.click();
      await popup.locator(".bq-beacon-attempts").scrollIntoViewIfNeeded();
      assert.equal(await popup.locator(".bq-chem-review-modal").evaluate((element) => element.scrollWidth > element.clientWidth + 2), false);
      await shot("science-evidence-" + size.width, "Saved science observations, incorrect choice, hinted correction");
    }
  });
  await check("Backdrop closes the popup and restores the opener", async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.locator(".bq-chem-review-scrim[data-beacon-review-close]").click({ position: { x: 2, y: 2 } });
    assert.equal(await popup.isVisible(), false);
    assert(await open.evaluate((element) => element === document.activeElement));
  });
  await check("Missing authorised mapping prevents the Beacon API request", async () => {
    networkMode = "missing";
    const calls = report.apiRequests.filter((item) => item.path.startsWith("/api/beacon-brigade")).length;
    await openReady();
    assert.match(await popup.getByRole("alert").innerText(), /could not be matched/);
    assert.equal(report.apiRequests.filter((item) => item.path.startsWith("/api/beacon-brigade")).length, calls);
    await shot("missing-child-mapping", "No matching child returned by synthetic profiles API");
    await close.click();
  });
  await check("Mismatched response identity never renders child evidence", async () => {
    networkMode = "mismatch";
    await openReady();
    assert.match(await popup.getByRole("alert").innerText(), /do not match this child/);
    assert.equal(await popup.locator(".bq-beacon-expedition").count(), 0);
    await close.click();
  });
  await check("Question snapshots are escaped rather than executed", async () => {
    networkMode = "success";
    payload = structuredClone(data.hintedScience);
    payload.state.history[0].stations[0].question.prompt = '<img src=x onerror="window.qaInjected=true">';
    await openReady();
    assert.equal(await popup.locator("img").count(), 0);
    assert.equal(await page.evaluate(() => window.qaInjected), undefined);
    assert.match(await popup.innerText(), /<img src=x/);
    await close.click();
    payload = data.hintedScience;
  });
  await check("Leaving the Parent screen clears the popup", async () => {
    await openReady();
    await page.evaluate(() => showScreen("profile"));
    await settled();
    assert.equal(await popup.isVisible(), false);
    assert.equal(await popup.innerText(), "");
  });
  await check("Both portal layouts expose the Beacon launch", async () => {
    for (const uplift of [true, false]) {
      await enterKid(uplift);
      const launch = page.locator('[data-bq-action="beacon-brigade"]');
      assert.equal(await launch.count(), 1);
      assert.equal(await launch.isDisabled(), false);
      for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
        await page.setViewportSize(viewport);
        await launch.scrollIntoViewIfNeeded();
        const thumbnail = launch.locator("img.bq-beacon-preview");
        await thumbnail.evaluate((image) => image.decode());
        assert(await thumbnail.evaluate((image) => image.naturalWidth > 100 && image.naturalHeight > 100));
        assert.equal(await thumbnail.getAttribute("src"), "/beacon-brigade/assets/module-preview.jpg");
        await launch.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
        const bounds = await launch.boundingBox();
        assert(bounds.x >= 0 && bounds.x + bounds.width <= viewport.width + 1);
        assert(bounds.y >= 0 && bounds.y + bounds.height <= viewport.height + 1);
        assert.equal(await launch.evaluate((element) => element.scrollWidth > element.clientWidth + 2), false);
        await shot("launch-" + (uplift ? "uplift" : "legacy") + "-" + viewport.width, "Learn launch, no exam prerequisites");
      }
    }
  });
  await check("Launch URL uses the selected profile hint, not the incoming URL hint", async () => {
    await page.locator('[data-bq-action="beacon-brigade"]').click();
    await page.waitForURL(origin + "/beacon-brigade/?profileId=qa-legacy-a");
    assert.equal(new URL(page.url()).searchParams.get("profileId"), profileA.id);
  });
  await check("No runtime errors, missing local assets or outbound requests", async () => {
    assert.deepEqual(report.errors, []);
    assert.deepEqual(report.unexpectedLocalRequests, []);
    assert.equal(report.remoteRequestsSent, 0);
  });
} catch (error) {
  report.fatal = { check: currentCheck, detail: error.stack };
  console.error(error.stack);
  if (page && !page.isClosed()) await shot("failure", currentCheck).catch(() => {});
} finally {
  if (browser) await browser.close();
  for (const [path, before] of Object.entries(report.inputs)) {
    if (await hashFile(path).catch(() => "missing") !== before) report.changedInputs.push(path);
  }
  report.finishedAt = new Date().toISOString();
  report.durationMs = Date.parse(report.finishedAt) - Date.parse(startedAt);
  report.passed = report.checks.length === report.expectedChecks
    && report.checks.every((item) => item.passed) && !report.fatal
    && report.errors.length === 0 && report.changedInputs.length === 0;
  report.artifactDirectory = out;
  const md = [
    "# Beacon Parent Regression",
    "",
    "- Result: " + (report.passed ? "PASS" : "FAIL"),
    "- Run: " + startedAt,
    "- Checks: " + report.checks.filter((item) => item.passed).length + "/" + report.expectedChecks,
    "- Command: \`node tools/qa-beacon-parent.mjs\`",
    "- Evidence directory: \`" + out + "\`",
    "- No server is required. BQ_PLAYWRIGHT_MODULE and BQ_CHROME_PATH can override installed runtimes.",
    "- Artwork: unchanged by this runner; no module preview is captured or installed.",
    "",
    "## Coverage Boundaries",
    ...report.boundaries.map((item) => "- " + item),
    "",
    "## Checks",
    "| Result | Check |",
    "| --- | --- |",
    ...report.checks.map((item) => "| " + (item.passed ? "PASS" : "FAIL") + " | " + item.name + " |"),
    "",
    "## Evidence",
    "- [Synthetic fixtures](fixtures.json)",
    "- [Machine-readable report and source hashes](report.json)",
    ...report.screenshots.map((item) => "- [" + item.state + " (" + item.viewport.width + "x" + item.viewport.height + ")](" + item.file + ")"),
    "",
    "## Errors",
    "Runtime/console errors: " + report.errors.length + ". Missing local resources: " + report.unexpectedLocalRequests.length + ".",
    "Source files changed during run: " + (report.changedInputs.join(", ") || "none") + ".",
    report.fatal ? "\n\`\`\`text\n" + report.fatal.detail + "\n\`\`\`" : "None.",
    ""
  ].join("\n");
  await writeFile(resolve(out, "report.json"), JSON.stringify(report, null, 2));
  await writeFile(resolve(out, "report.md"), md);
  await writeFile(resolve(outputRoot, "latest.json"), JSON.stringify({
    passed: report.passed, startedAt, report: resolve(out, "report.json"), summary: resolve(out, "report.md")
  }, null, 2));
  await writeFile(resolve(outputRoot, "latest.md"), "# Latest Beacon Parent QA\n\n"
    + (report.passed ? "PASS" : "FAIL") + ": " + report.checks.filter((item) => item.passed).length
    + "/" + report.expectedChecks + " checks.\n\n[Open retained report]("
    + out.slice(outputRoot.length + 1).replaceAll("\\", "/") + "/report.md)\n");
  console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, output: out }));
  if (!report.passed) process.exitCode = 1;
}
