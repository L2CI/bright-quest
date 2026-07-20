import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  const modulePath = process.env.BQ_PLAYWRIGHT_MODULE;
  if (!modulePath) throw new Error("Install Playwright or set BQ_PLAYWRIGHT_MODULE to its module directory.");
  playwright = require(modulePath);
}
const { chromium } = playwright;

const BASE = process.env.BQ_QA_URL || "http://127.0.0.1:4173";
const OUT = resolve("qa-screens/mechshift-rescue");
await mkdir(OUT, { recursive: true });

const report = {
  build: "mechshift-beacon-dock-004",
  baseUrl: BASE,
  startedAt: new Date().toISOString(),
  checks: [],
  consoleErrors: [],
  pageErrors: [],
  failedResponses: [],
  metrics: {}
};

const check = (name, passed, detail = "") => {
  report.checks.push({ name, passed: Boolean(passed), detail });
  if (!passed) throw new Error(`${name}: ${detail || "failed"}`);
};

const browser = await chromium.launch({ channel: "chrome", headless: true });

function watch(page, label) {
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push({ label, text: message.text(), url: message.location().url || "" });
  });
  page.on("pageerror", (error) => report.pageErrors.push({ label, text: error.message }));
  page.on("response", (response) => {
    if (response.status() >= 400) report.failedResponses.push({ label, status: response.status(), url: response.url() });
  });
}

async function screenshot(page, name) {
  await page.screenshot({ path: resolve(OUT, name), type: "png", fullPage: false });
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  watch(desktop, "game-desktop");
  await desktop.goto(`${BASE}/mechshift-rescue/`, { waitUntil: "networkidle" });
  await desktop.waitForFunction(() => window.__MECHSHIFT_QA__?.build === "mechshift-beacon-dock-004");
  check("game route loads", await desktop.title() === "Mechshift Rescue | Bright Quest", await desktop.title());
  check("reference build marker present", await desktop.evaluate(() => window.__MECHSHIFT_QA__.build) === "mechshift-beacon-dock-004");
  await screenshot(desktop, "01-start-desktop.png");

  await desktop.getByRole("button", { name: "Launch rescue" }).click();
  await desktop.getByRole("button", { name: "Take control" }).click();
  await desktop.waitForTimeout(350);
  await screenshot(desktop, "02-roadway-desktop.png");

  const startX = (await desktop.evaluate(() => window.__MECHSHIFT_QA__.getState())).playerX;
  await desktop.keyboard.down("ArrowRight");
  await desktop.waitForTimeout(650);
  await desktop.keyboard.up("ArrowRight");
  const movedX = (await desktop.evaluate(() => window.__MECHSHIFT_QA__.getState())).playerX;
  check("keyboard driving moves Relay-7", movedX > startX + 0.05, `${startX} -> ${movedX}`);

  await desktop.keyboard.down("ArrowRight");
  await desktop.waitForTimeout(900);
  await desktop.keyboard.up("ArrowRight");
  const dockedState = await desktop.evaluate(() => window.__MECHSHIFT_QA__.getState());
  check("Relay-7 automatically stops at the Evac Dock", dockedState.docked && Math.abs(dockedState.playerX - 0.22) < 0.0001, JSON.stringify(dockedState));
  check("load action remains visible at the dock", await desktop.getByRole("button", { name: "Load rescue pods" }).isVisible());
  await screenshot(desktop, "02-beacon-docked-desktop.png");

  await desktop.getByRole("button", { name: /Lift/ }).click();
  await desktop.waitForTimeout(450);
  check("form transformation changes state", (await desktop.evaluate(() => window.__MECHSHIFT_QA__.getState())).form === "lift");
  check("wrong form produces a clear recovery action", await desktop.getByRole("button", { name: "Switch to Rover" }).isVisible());
  await desktop.getByRole("button", { name: "Switch to Rover" }).click();
  await desktop.waitForTimeout(450);
  check("recovery action selects the required form", (await desktop.evaluate(() => window.__MECHSHIFT_QA__.getState())).form === "rover");
  check("load action returns after form recovery", await desktop.getByRole("button", { name: "Load rescue pods" }).isVisible());
  await desktop.getByRole("button", { name: "Load rescue pods" }).click();
  check("load action opens the capacity system", await desktop.getByRole("heading", { name: "Set the passenger capacity" }).isVisible());
  await desktop.getByRole("button", { name: "Return to the roadway" }).click();

  const labelFit = await desktop.evaluate(() => [...document.querySelectorAll(".drive-button, .objective-module li")].map((element) => ({ text: element.textContent.trim(), fitsWidth: element.scrollWidth <= element.clientWidth + 1, fitsHeight: element.scrollHeight <= element.clientHeight + 1 })));
  check("drive and objective labels stay inside their boxes", labelFit.every((item) => item.fitsWidth && item.fitsHeight), JSON.stringify(labelFit));

  await desktop.getByRole("button", { name: "Pause mission" }).click();
  check("pause overlay opens", await desktop.getByRole("heading", { name: "Relay-7 holding position" }).isVisible());
  await desktop.getByRole("button", { name: /Reduced motion/ }).click();
  check("reduced motion toggles", await desktop.getByRole("button", { name: "Reduced motion: on" }).isVisible());
  await desktop.getByRole("button", { name: "Resume rescue" }).click();

  await desktop.evaluate(() => window.__MECHSHIFT_QA__.openChallenge(0));
  await desktop.waitForTimeout(150);
  check("capacity challenge opens", await desktop.getByRole("heading", { name: "Set the passenger capacity" }).isVisible());
  await screenshot(desktop, "03-capacity-system.png");
  await desktop.evaluate(() => window.__MECHSHIFT_QA__.solveCurrent());
  await desktop.waitForFunction(() => window.__MECHSHIFT_QA__.getState().completed === 1);
  await desktop.waitForTimeout(700);

  await desktop.evaluate(() => window.__MECHSHIFT_QA__.gotoMission(1));
  check("Power Yard docking exposes its action", await desktop.getByRole("button", { name: "Power lift clamps" }).isVisible());
  await desktop.getByRole("button", { name: "Power lift clamps" }).click();
  check("power challenge opens", await desktop.getByRole("heading", { name: "Build the lift power plan" }).isVisible());
  await screenshot(desktop, "04-power-system.png");
  await desktop.evaluate(() => window.__MECHSHIFT_QA__.solveCurrent());
  await desktop.waitForFunction(() => window.__MECHSHIFT_QA__.getState().completed === 2);
  await desktop.waitForTimeout(700);

  await desktop.evaluate(() => window.__MECHSHIFT_QA__.gotoMission(2));
  check("Sky Gap docking exposes its action", await desktop.getByRole("button", { name: "Deploy bridge route" }).isVisible());
  await desktop.getByRole("button", { name: "Deploy bridge route" }).click();
  check("timeline challenge opens", await desktop.getByRole("heading", { name: "Program the safe crossing" }).isVisible());
  await screenshot(desktop, "05-timeline-system.png");
  await desktop.evaluate(() => window.__MECHSHIFT_QA__.solveCurrent());
  await desktop.waitForFunction(() => window.__MECHSHIFT_QA__.getState().completed === 3);
  await desktop.getByRole("heading", { name: "Rescue route complete!" }).waitFor({ state: "visible", timeout: 8000 });
  await screenshot(desktop, "06-completion-desktop.png");
  check("completion reward saved", Boolean(await desktop.evaluate(() => JSON.parse(localStorage.getItem("brightQuestMechshiftRescueV1") || "null")?.completedAt)));
  check("Bright Quest return path exists", await desktop.getByRole("link", { name: "Return to Bright Quest" }).count() >= 1);

  const desktopLayout = await desktop.evaluate(() => ({
    viewportWidth: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    buttons: [...document.querySelectorAll("button")].filter((button) => button.offsetParent !== null).map((button) => ({ text: button.innerText.trim(), width: button.getBoundingClientRect().width, height: button.getBoundingClientRect().height, label: button.getAttribute("aria-label") || "" })),
    resources: performance.getEntriesByType("resource").map((entry) => ({ name: entry.name.split("/").pop(), encodedBodySize: entry.encodedBodySize, duration: Math.round(entry.duration) })),
    navigation: performance.getEntriesByType("navigation")[0]?.toJSON()
  }));
  check("desktop has no horizontal overflow", desktopLayout.documentWidth <= desktopLayout.viewportWidth, JSON.stringify(desktopLayout));
  const tinyControls = desktopLayout.buttons.filter((button) => button.width < 44 || button.height < 44);
  check("visible controls meet 44px target", tinyControls.length === 0, JSON.stringify(tinyControls));
  check("visible buttons are named", desktopLayout.buttons.every((button) => button.text || button.label), JSON.stringify(desktopLayout.buttons));
  report.metrics.desktop = desktopLayout;

  const wide = await browser.newPage({ viewport: { width: 2048, height: 1076 }, deviceScaleFactor: 1 });
  watch(wide, "game-wide-desktop");
  await wide.goto(`${BASE}/mechshift-rescue/`, { waitUntil: "networkidle" });
  await wide.waitForFunction(() => window.__MECHSHIFT_QA__?.build === "mechshift-beacon-dock-004");
  await wide.getByRole("button", { name: "Launch rescue" }).click();
  await wide.getByRole("button", { name: "Take control" }).click();
  await wide.evaluate(() => window.__MECHSHIFT_QA__.gotoMission(0));
  check("wide desktop keeps the load action visible", await wide.getByRole("button", { name: "Load rescue pods" }).isVisible());
  const wideLayout = await wide.evaluate(() => {
    const visible = (element) => element && element.offsetParent !== null;
    const labels = [...document.querySelectorAll(".drive-button, .form-button, .objective-module li, .operate-button")].filter(visible).map((element) => ({ text: element.textContent.trim(), fitsWidth: element.scrollWidth <= element.clientWidth + 1, fitsHeight: element.scrollHeight <= element.clientHeight + 1 }));
    return { viewport: { width: innerWidth, height: innerHeight }, documentWidth: document.documentElement.scrollWidth, labels };
  });
  check("wide desktop has no horizontal overflow", wideLayout.documentWidth <= wideLayout.viewport.width, JSON.stringify(wideLayout));
  check("wide desktop text stays inside every game control", wideLayout.labels.every((item) => item.fitsWidth && item.fitsHeight), JSON.stringify(wideLayout.labels));
  await screenshot(wide, "07-wide-docked.png");

  const tablet = await browser.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  watch(tablet, "game-tablet");
  await tablet.goto(`${BASE}/mechshift-rescue/`, { waitUntil: "networkidle" });
  await tablet.waitForFunction(() => window.__MECHSHIFT_QA__?.build === "mechshift-beacon-dock-004");
  await screenshot(tablet, "07-start-tablet.png");
  await tablet.getByRole("button", { name: "Launch rescue" }).click();
  await tablet.getByRole("button", { name: "Take control" }).click();
  await tablet.waitForTimeout(200);
  await screenshot(tablet, "08-roadway-tablet.png");
  check("tablet roadway renders", await tablet.locator("canvas").isVisible());
  const tabletLayout = await tablet.evaluate(() => {
    const rect = (element) => { const box = element.getBoundingClientRect(); return { left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height }; };
    const drive = [...document.querySelectorAll("[data-drive]")].map(rect);
    const objective = rect(document.querySelector(".objective-module"));
    const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    return { drive, objective, driveOverlapsObjective: drive.some((box) => overlaps(box, objective)), viewport: { width: innerWidth, height: innerHeight }, visuals: window.__MECHSHIFT_QA__.getVisualMetrics() };
  });
  check("tablet uses two large thumb controls", tabletLayout.drive.length === 2 && tabletLayout.drive.every((box) => box.width >= 88 && box.height >= 68), JSON.stringify(tabletLayout));
  check("tablet drive controls occupy opposite thumb edges", tabletLayout.drive[0].left < 40 && tabletLayout.drive[1].right > tabletLayout.viewport.width - 40, JSON.stringify(tabletLayout));
  check("tablet drive controls do not cover objectives", !tabletLayout.driveOverlapsObjective, JSON.stringify(tabletLayout));
  check("tablet canvas matches viewport without CSS stretch", Math.abs(tabletLayout.visuals.canvas.clientWidth - tabletLayout.viewport.width) <= 1 && Math.abs(tabletLayout.visuals.canvas.clientHeight - tabletLayout.viewport.height) <= 1, JSON.stringify(tabletLayout.visuals));
  check("tablet painted images retain uniform scale", Math.abs(tabletLayout.visuals.cityScale.x - tabletLayout.visuals.cityScale.y) < 0.0001 && Math.abs(tabletLayout.visuals.vehicleScale.x - tabletLayout.visuals.vehicleScale.y) < 0.0001, JSON.stringify(tabletLayout.visuals));
  const tabletRight = tabletLayout.drive[1];
  const tabletStartX = (await tablet.evaluate(() => window.__MECHSHIFT_QA__.getState())).playerX;
  await tablet.mouse.move((tabletRight.left + tabletRight.right) / 2, (tabletRight.top + tabletRight.bottom) / 2);
  await tablet.mouse.down();
  await tablet.waitForTimeout(650);
  await tablet.mouse.up();
  const tabletMovedX = (await tablet.evaluate(() => window.__MECHSHIFT_QA__.getState())).playerX;
  check("press-and-hold thumb control moves Relay-7", tabletMovedX > tabletStartX + 0.04, `${tabletStartX} -> ${tabletMovedX}`);

  const shortPhone = await browser.newPage({ viewport: { width: 740, height: 320 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  watch(shortPhone, "game-short-landscape");
  await shortPhone.goto(`${BASE}/mechshift-rescue/`, { waitUntil: "networkidle" });
  await shortPhone.waitForFunction(() => window.__MECHSHIFT_QA__?.build === "mechshift-beacon-dock-004");
  const launchBox = await shortPhone.getByRole("button", { name: "Launch rescue" }).boundingBox();
  check("short landscape launch is fully visible", launchBox && launchBox.y >= 0 && launchBox.y + launchBox.height <= 320, JSON.stringify(launchBox));
  await screenshot(shortPhone, "09-short-landscape-launch.png");
  await shortPhone.getByRole("button", { name: "Launch rescue" }).click();
  const controlBox = await shortPhone.getByRole("button", { name: "Take control" }).boundingBox();
  check("short landscape mission brief action is fully visible", controlBox && controlBox.y >= 0 && controlBox.y + controlBox.height <= 320, JSON.stringify(controlBox));
  await shortPhone.getByRole("button", { name: "Take control" }).click();
  check("short landscape game canvas renders", await shortPhone.locator("canvas").isVisible());
  await shortPhone.waitForTimeout(250);
  await screenshot(shortPhone, "10-short-landscape-gameplay.png");
  const phoneLayout = await shortPhone.evaluate(() => {
    const rect = (element) => { const box = element.getBoundingClientRect(); return { left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height }; };
    const visible = (element) => element && element.offsetParent !== null;
    const drive = [...document.querySelectorAll("[data-drive]")].filter(visible).map(rect);
    const forms = [...document.querySelectorAll(".form-button")].filter(visible).map(rect);
    const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    return {
      drive,
      forms,
      controlsOverlapForms: drive.some((control) => forms.some((form) => overlaps(control, form))),
      labelFit: [...document.querySelectorAll(".drive-button, .form-button")].filter(visible).map((element) => ({ text: element.textContent.trim(), fitsWidth: element.scrollWidth <= element.clientWidth + 1, fitsHeight: element.scrollHeight <= element.clientHeight + 1 })),
      viewport: { width: innerWidth, height: innerHeight },
      startBackgroundSize: getComputedStyle(document.querySelector(".start-screen")).backgroundSize,
      visuals: window.__MECHSHIFT_QA__.getVisualMetrics()
    };
  });
  check("short phone thumb controls are visible and large", phoneLayout.drive.length === 2 && phoneLayout.drive.every((box) => box.width >= 86 && box.height >= 66), JSON.stringify(phoneLayout));
  check("short phone keeps controls clear of transform dock", phoneLayout.forms.length === 3 && !phoneLayout.controlsOverlapForms, JSON.stringify(phoneLayout));
  check("short phone labels stay inside controls", phoneLayout.labelFit.every((item) => item.fitsWidth && item.fitsHeight), JSON.stringify(phoneLayout.labelFit));
  check("short phone uses aspect-safe key-art framing", phoneLayout.startBackgroundSize === "auto 100%", phoneLayout.startBackgroundSize);
  check("short phone canvas matches viewport without CSS stretch", Math.abs(phoneLayout.visuals.canvas.clientWidth - phoneLayout.viewport.width) <= 1 && Math.abs(phoneLayout.visuals.canvas.clientHeight - phoneLayout.viewport.height) <= 1, JSON.stringify(phoneLayout.visuals));
  check("short phone painted images retain uniform scale", Math.abs(phoneLayout.visuals.cityScale.x - phoneLayout.visuals.cityScale.y) < 0.0001 && Math.abs(phoneLayout.visuals.vehicleScale.x - phoneLayout.visuals.vehicleScale.y) < 0.0001, JSON.stringify(phoneLayout.visuals));
  const phoneRight = phoneLayout.drive[1];
  await shortPhone.mouse.move((phoneRight.left + phoneRight.right) / 2, (phoneRight.top + phoneRight.bottom) / 2);
  await shortPhone.mouse.down();
  await shortPhone.waitForTimeout(1500);
  await shortPhone.mouse.up();
  const phoneDockedState = await shortPhone.evaluate(() => window.__MECHSHIFT_QA__.getState());
  check("short phone auto-stops at the rescue beacon", phoneDockedState.docked && Math.abs(phoneDockedState.playerX - 0.22) < 0.0001, JSON.stringify(phoneDockedState));
  check("short phone shows the load action", await shortPhone.getByRole("button", { name: "Load rescue pods" }).isVisible());
  await screenshot(shortPhone, "10-short-landscape-docked.png");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  watch(mobile, "game-mobile");
  await mobile.goto(`${BASE}/mechshift-rescue/`, { waitUntil: "networkidle" });
  check("portrait rotation guidance appears", await mobile.getByText("Turn your tablet sideways").isVisible());
  await screenshot(mobile, "09-portrait-guidance.png");

  const signup = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  watch(signup, "signup-mock");
  await signup.route("**/api/auth/config", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ enabled: true, signupEnabled: true, experienceUpliftEnabled: true, legacyEnabled: false }) }));
  await signup.route("**/api/auth/session", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ authenticated: false }) }));
  await signup.route("**/api/auth/signup", (route) => route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ authenticated: true, parentUnlocked: false, children: [], activeChildId: null, family: { id: "qa-family", name: "QA family" }, user: { id: "qa-parent", email: "qa@example.test", displayName: "QA Parent" } }) }));
  await signup.route("**/api/profiles*", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ profiles: [] }) }));
  await signup.goto(`${BASE}/`, { waitUntil: "networkidle" });
  check("landing Sign up button visible", await signup.getByRole("button", { name: "Sign up" }).first().isVisible());
  await screenshot(signup, "10-family-landing-signup.png");
  await signup.locator("#familyLandingSignupButton").click();
  check("signup form follows landing CTA", await signup.locator("#familySignupForm").isVisible());
  await signup.locator("#familySignupName").fill("QA Parent");
  await signup.locator("#familySignupEmail").fill("qa@example.test");
  await signup.locator("#familySignupPassword").fill("local-only-password");
  await signup.locator("#familySignupPin").fill("2468");
  await signup.locator('input[name="parentConfirmed"]').check();
  await signup.getByRole("button", { name: "Continue to nominate your kid" }).click();
  await signup.getByRole("heading", { name: "Nominate your kid" }).waitFor({ state: "visible" });
  check("signup continues to Nominate your kid", true);
  check("nomination requests first name only", await signup.locator('[data-create-child] input[name="name"]').count() === 1);
  await screenshot(signup, "11-nominate-your-kid.png");

  const catalog = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  watch(catalog, "catalog-mock");
  await catalog.route("**/api/auth/config", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ enabled: true, signupEnabled: true, experienceUpliftEnabled: true, legacyEnabled: false }) }));
  const childPayload = { id: "qa-child", name: "QA Explorer", stars: 0, attempts: [], trainingCompleted: {}, writingSamples: [] };
  await catalog.route("**/api/auth/session", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ authenticated: true, parentUnlocked: false, children: [{ id: "qa-child-id", legacyProfileId: "qa-child", name: "QA Explorer", stars: 0, version: 1, pinSet: false, payload: childPayload }], activeChildId: "qa-child-id", family: { id: "qa-family", name: "QA family" }, user: { id: "qa-parent", email: "qa@example.test", displayName: "QA Parent" } }) }));
  await catalog.route("**/api/profiles*", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ profiles: [] }) }));
  await catalog.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await catalog.waitForFunction(() => typeof window.openGamesList === "function");
  await catalog.evaluate(() => window.openGamesList());
  await catalog.locator("#gamesListScreen:not(.hidden)").waitFor({ state: "visible" });
  // Let the shared screen entrance animation settle before recording visual evidence.
  await catalog.waitForTimeout(700);
  const catalogText = await catalog.locator("#gamesList").innerText();
  check("catalog has one visible game", await catalog.locator("#gamesList .game-tile").count() === 1, catalogText);
  check("catalog features Mechshift Rescue", catalogText.includes("Mechshift Rescue"), catalogText);
  check("legacy games absent from catalog", !/Cave River|Street Smart|Treasure Quest|Dragon Forge|Star Skimmer/.test(catalogText), catalogText);
  await screenshot(catalog, "12-mechshift-only-catalog.png");
  await catalog.getByRole("button", { name: "Launch rescue" }).click();
  await catalog.waitForURL("**/mechshift-rescue/");
  check("catalog launch opens Mechshift Rescue", new URL(catalog.url()).pathname === "/mechshift-rescue/", catalog.url());

  report.consoleErrors = report.consoleErrors.filter((item) => !/favicon\.ico/i.test(item.text));
  report.failedResponses = report.failedResponses.filter((item) => !/favicon\.ico/i.test(item.url));
  check("no page exceptions", report.pageErrors.length === 0, JSON.stringify(report.pageErrors));
  check("no console errors", report.consoleErrors.length === 0, JSON.stringify(report.consoleErrors));
  check("no failed required responses", report.failedResponses.length === 0, JSON.stringify(report.failedResponses));
  report.finishedAt = new Date().toISOString();
  report.result = "passed";
} catch (error) {
  report.finishedAt = new Date().toISOString();
  report.result = "failed";
  report.failure = error?.stack || String(error);
  throw error;
} finally {
  await writeFile(resolve(OUT, "qa-report.json"), JSON.stringify(report, null, 2));
  await browser.close();
}

console.log(JSON.stringify({ result: report.result, checks: report.checks.length, screenshots: 12, report: resolve(OUT, "qa-report.json") }, null, 2));
