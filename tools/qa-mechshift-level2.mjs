import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
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
const OUT = resolve("qa-screens/mechshift-rescue/level-2");
await mkdir(OUT, { recursive: true });

const report = { build: "stormrail-shield-sprint-001", baseUrl: BASE, startedAt: new Date().toISOString(), checks: [], errors: [], screenshots: [] };
const check = (name, passed, detail = "") => { report.checks.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error(`FAIL ${name}: ${detail}`); };
const watch = (page, label) => {
  page.on("console", (msg) => { if (msg.type() === "error") report.errors.push({ label, type: "console", text: msg.text() }); });
  page.on("pageerror", (error) => report.errors.push({ label, type: "pageerror", text: error.message }));
  page.on("requestfailed", (request) => report.errors.push({ label, type: "requestfailed", text: `${request.url()} ${request.failure()?.errorText || "failed"}` }));
  page.on("response", (response) => { if (response.status() >= 400) report.errors.push({ label, type: "response", text: `${response.status()} ${response.url()}` }); });
};
const shot = async (page, name) => { const path = resolve(OUT, name); await page.screenshot({ path, fullPage: false }); report.screenshots.push(path); return path; };
const fits = async (page, selectors) => page.evaluate((list) => list.flatMap((selector) => [...document.querySelectorAll(selector)]).filter((element) => element.offsetParent !== null).map((element) => ({ selector: element.id || element.className, text: element.textContent.trim().slice(0,100), fitsWidth: element.scrollWidth <= element.clientWidth + 1, fitsHeight: element.scrollHeight <= element.clientHeight + 1, box: element.getBoundingClientRect().toJSON() })), selectors);

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const root = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  watch(root, "root");
  await root.goto(`${BASE}/mechshift-rescue/`, { waitUntil: "networkidle" });
  const level2Link = root.getByRole("link", { name: /Level 2 — Stormrail/i });
  check("Level 2 is visible from the Mechshift level select", await level2Link.isVisible());
  check("Level 2 route is correct", (await level2Link.getAttribute("href")) === "level-2/");
  await shot(root, "00-level-select.png");

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  watch(desktop, "desktop");
  await desktop.goto(`${BASE}/mechshift-rescue/level-2/`, { waitUntil: "networkidle" });
  await desktop.waitForFunction(() => window.__STORMRAIL_QA__?.build === "stormrail-shield-sprint-001");
  check("Level 2 build marker present", await desktop.evaluate(() => window.__STORMRAIL_QA__.build) === "stormrail-shield-sprint-001");
  check("Selected Stormrail launch art visible", await desktop.getByRole("heading", { name: /Stormrail Shield Sprint/i }).isVisible());
  const launchFits = await fits(desktop, [".launch-copy", ".primary-cta", ".mission-specs span"]);
  check("Desktop launch content has no overflow", launchFits.every((item) => item.fitsWidth && item.fitsHeight), JSON.stringify(launchFits));
  await shot(desktop, "01-launch-desktop.png");

  await desktop.getByRole("button", { name: /Launch Level 2/i }).click();
  check("Stage 1 briefing appears", await desktop.getByRole("heading", { name: "Charge the magnetic couplers" }).isVisible());
  check("Stage 1 briefing names Mag-Claw and the physical action", /Mag-Claw mode/i.test(await desktop.locator("#briefScreen").innerText()) && /lock it into each glowing socket/i.test(await desktop.locator("#briefScreen").innerText()));
  await desktop.getByRole("button", { name: /Replay orders/i }).click();
  await desktop.waitForFunction(() => { const audio = window.__STORMRAIL_QA__.getAudioState(); return audio.voiceStage === 0 && audio.voicePlaying; }, null, { timeout: 5000 });
  check("Replay orders restarts the Stage 1 commander briefing", await desktop.evaluate(() => window.__STORMRAIL_QA__.getAudioState().voiceStage) === 0);
  await shot(desktop, "02-stage-1-briefing.png");

  await desktop.getByRole("button", { name: "Begin stage 1" }).click();
  await desktop.getByRole("button", { name: /Return to the mission view/i }).click();
  check("Challenge close control returns to the mission view", await desktop.locator("#challengeScreen").isHidden());
  await desktop.evaluate(() => window.__STORMRAIL_QA__.openChallenge(0));
  check("Coupler console shows the three-step calculation", /7 × 18[\s\S]*2 × 9/i.test(await desktop.locator("#challengeScreen").innerText()));
  await desktop.locator("#usableCharge").fill("107");
  await desktop.locator("#neededCharge").fill("96");
  await desktop.locator("#spareCharge").fill("11");
  await desktop.getByRole("button", { name: "Lock coupler system" }).click();
  check("Wrong Stage 1 plan gives recovery copy", /Check all three numbers/i.test(await desktop.locator("#challengeMessage").innerText()));
  await desktop.getByRole("button", { name: /Ask Nimbus/i }).click();
  check("Stage 1 hint ladder starts with multiplication", /7 × 18/i.test(await desktop.locator("#hintText").innerText()));
  await desktop.locator("#usableCharge").fill("108");
  await desktop.locator("#neededCharge").fill("96");
  await desktop.locator("#spareCharge").fill("12");
  for (let index = 0; index < 3; index += 1) {
    await desktop.locator(`[data-coupler="${index}"]`).click();
    await desktop.locator(`[data-socket="${index}"]`).click();
  }
  await shot(desktop, "03-couplers-locked.png");
  await desktop.getByRole("button", { name: "Lock coupler system" }).click();
  await desktop.getByRole("heading", { name: "Transform for the Shield Sprint" }).waitFor({ state: "visible", timeout: 4000 });

  await desktop.getByRole("button", { name: "Begin stage 2" }).click();
  await desktop.locator("#carrierShare").fill("57");
  await desktop.locator("#crossingCost").fill("17");
  await desktop.locator("#carrierReserve").fill("40");
  await shot(desktop, "04-shield-allocation.png");
  await desktop.getByRole("button", { name: "Start Shield Sprint" }).click();
  check("Shield Sprint controls appear", await desktop.locator("#runControls").isVisible());
  const visual0 = await desktop.evaluate(() => window.__STORMRAIL_QA__.getVisualState());
  const gaitFrames = [visual0.runnerFrame];
  for (let sample = 0; sample < 3; sample += 1) {
    await desktop.waitForTimeout(135);
    gaitFrames.push((await desktop.evaluate(() => window.__STORMRAIL_QA__.getVisualState())).runnerFrame);
  }
  const visual1 = await desktop.evaluate(() => window.__STORMRAIL_QA__.getVisualState());
  check("Runner gait changes sprite frame", new Set(gaitFrames).size > 1, gaitFrames.join(" -> "));
  check("Convoy suspension or frame animation is active", JSON.stringify(visual0.carrierY) !== JSON.stringify(visual1.carrierY) || JSON.stringify(visual0.carrierFrames) !== JSON.stringify(visual1.carrierFrames), `${JSON.stringify(visual0)} -> ${JSON.stringify(visual1)}`);
  check("Storm city parallax is active", visual0.skyX !== visual1.skyX, `${visual0.skyX} -> ${visual1.skyX}`);
  const beforeLane = await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().lane);
  await desktop.keyboard.press("ArrowUp");
  const afterKeyboardLane = await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().lane);
  check("Keyboard lane control moves Relay-7", afterKeyboardLane === Math.max(0, beforeLane - 1), `${beforeLane} -> ${afterKeyboardLane}`);
  await desktop.getByRole("button", { name: /Move Relay-7 down/i }).click();
  check("Visible lane button moves Relay-7", await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().lane) === 1);
  await desktop.locator("#shieldButton").dispatchEvent("pointerdown", { pointerId: 1, pointerType: "mouse", isPrimary: true, buttons: 1 });
  check("Hold Shield raises the shield", await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().shieldHeld));
  await desktop.evaluate(() => window.__STORMRAIL_QA__.forcePulse(1));
  await desktop.waitForTimeout(160);
  await shot(desktop, "05-shield-impact.png");
  await desktop.waitForTimeout(210);
  await desktop.locator("#shieldButton").dispatchEvent("pointerup", { pointerId: 1, pointerType: "mouse", isPrimary: true, buttons: 0 });
  check("Matched shield pulse consumes ten reserve units", await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().shieldEnergy) === 110);
  const activeAudio = await desktop.evaluate(() => window.__STORMRAIL_QA__.getAudioState());
  check("Soundtrack is active during the Shield Sprint", activeAudio.musicReady && !activeAudio.musicPaused, JSON.stringify(activeAudio));
  await desktop.locator("#soundButton").click();
  check("Sound control mutes mission audio", await desktop.evaluate(() => window.__STORMRAIL_QA__.getAudioState().muted));
  await desktop.locator("#soundButton").click();
  check("Sound control restores mission audio", !(await desktop.evaluate(() => window.__STORMRAIL_QA__.getAudioState().muted)));
  await desktop.getByRole("button", { name: /Pause mission/i }).click();
  check("Pause panel appears and suspends music", await desktop.locator("#pauseScreen").isVisible() && await desktop.evaluate(() => window.__STORMRAIL_QA__.getAudioState().musicPaused));
  await desktop.getByRole("button", { name: /Reduced motion/i }).click();
  check("Reduced-motion control updates the game state", await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().reducedMotion));
  await desktop.getByRole("button", { name: /Resume mission/i }).click();
  check("Resume returns to the live Shield Sprint", !(await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().paused)));
  const mistakesBeforeMiss = await desktop.evaluate(() => window.__STORMRAIL_QA__.getState().mistakes);
  await desktop.evaluate(() => window.__STORMRAIL_QA__.forcePulse(2));
  await desktop.waitForTimeout(350);
  check("Missed pulse enters child-safe hold", await desktop.locator("#safeHold").isVisible());
  check("Missed pulse remains recoverable", await desktop.evaluate((before) => { const s=window.__STORMRAIL_QA__.getState(); return s.runActive && s.mistakes === before + 1; }, mistakesBeforeMiss));
  await shot(desktop, "06-safe-hold-recovery.png");
  await desktop.waitForTimeout(2100);
  await desktop.evaluate(() => window.__STORMRAIL_QA__.finishRun());
  await desktop.getByRole("heading", { name: "Build the Titan Bridge" }).waitFor({ state: "visible", timeout: 3500 });

  await desktop.getByRole("button", { name: "Begin stage 3" }).click();
  await desktop.locator("#bridgeTotal").fill("54");
  await desktop.locator("#bridgeGap").fill("52");
  await desktop.locator("#bridgeOverlap").fill("2");
  for (const [index, id] of ["rotate","anchor","energy"].entries()) {
    await desktop.locator(`[data-bridge-action="${id}"]`).click();
    await desktop.locator(`[data-bridge-slot="${index}"]`).click();
  }
  await shot(desktop, "07-titan-bridge-plan.png");
  await desktop.getByRole("button", { name: "Transform and deploy" }).click();
  await desktop.waitForTimeout(1150);
  const finaleVisual = await desktop.evaluate(() => window.__STORMRAIL_QA__.getVisualState());
  check("Finale swaps to Titan Bridge art", finaleVisual.titanAlpha > .5 && finaleVisual.runnerAlpha < .2, JSON.stringify(finaleVisual));
  await shot(desktop, "08-titan-transformation.png");
  await desktop.getByRole("heading", { name: /Shield sprint complete/i }).waitFor({ state: "visible", timeout: 5000 });
  check("Level 2 completion reward is saved", Boolean(await desktop.evaluate(() => JSON.parse(localStorage.getItem("brightQuestMechshiftRescueV2") || "null")?.levels?.[2]?.completedAt)));
  check("Result provides replay and Bright Quest return", await desktop.getByRole("button", { name: /Play Level 2 again/i }).isVisible() && await desktop.getByRole("link", { name: /Return to Bright Quest/i }).isVisible());
  check("Bright Quest result link carries Level 2 completion", (await desktop.getByRole("link", { name: /Return to Bright Quest/i }).getAttribute("href")) === "../../?from=mechshift-rescue&complete=2");
  await shot(desktop, "09-results-desktop.png");

  const controls = await desktop.evaluate(() => [...document.querySelectorAll("button,a")].filter((element) => element.offsetParent !== null).map((element) => { const box=element.getBoundingClientRect(); return { label: element.getAttribute("aria-label") || element.textContent.trim(), width: box.width, height: box.height }; }));
  check("Visible result controls meet 44px target", controls.every((item) => item.width >= 44 && item.height >= 44), JSON.stringify(controls));
  await Promise.all([desktop.waitForLoadState("domcontentloaded"), desktop.getByRole("button", { name: /Play Level 2 again/i }).click()]);
  check("Play again returns to the Level 2 launch", await desktop.getByRole("button", { name: /Launch Level 2/i }).isVisible());

  const tablet = await browser.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  watch(tablet, "tablet");
  await tablet.goto(`${BASE}/mechshift-rescue/level-2/`, { waitUntil: "networkidle" });
  await tablet.evaluate(() => window.__STORMRAIL_QA__.startRun());
  await tablet.waitForTimeout(500);
  const tabletLayout = await tablet.evaluate(() => {
    const rect=(selector)=>document.querySelector(selector).getBoundingClientRect().toJSON();
    const overlaps=(a,b)=>a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const up=rect("#laneUpButton"), down=rect("#laneDownButton"), shield=rect("#shieldButton"), hud=rect(".mission-hud");
    return { up, down, shield, hud, overlap: overlaps(up,shield)||overlaps(down,shield), viewport:{width:innerWidth,height:innerHeight} };
  });
  check("Tablet thumb controls are separated", !tabletLayout.overlap, JSON.stringify(tabletLayout));
  check("Tablet primary touch controls exceed 48px", [tabletLayout.up,tabletLayout.down,tabletLayout.shield].every((box)=>box.width>=48&&box.height>=48), JSON.stringify(tabletLayout));
  await shot(tablet, "10-shield-run-tablet.png");

  const restartPage = await browser.newPage({ viewport: { width: 1180, height: 820 }, deviceScaleFactor: 1 });
  watch(restartPage, "restart");
  await restartPage.goto(`${BASE}/mechshift-rescue/level-2/`, { waitUntil: "networkidle" });
  await restartPage.evaluate(() => window.__STORMRAIL_QA__.startRun());
  await restartPage.getByRole("button", { name: /Pause mission/i }).click();
  await Promise.all([restartPage.waitForLoadState("domcontentloaded"), restartPage.getByRole("button", { name: /Restart Level 2/i }).click()]);
  check("Restart Level 2 returns to a fresh launch", await restartPage.getByRole("button", { name: /Launch Level 2/i }).isVisible());

  const shortPhone = await browser.newPage({ viewport: { width: 740, height: 320 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  watch(shortPhone, "short-phone");
  await shortPhone.goto(`${BASE}/mechshift-rescue/level-2/`, { waitUntil: "networkidle" });
  const shortLaunch = await shortPhone.evaluate(() => { const el=document.querySelector(".launch-copy"); const b=el.getBoundingClientRect(); return { top:b.top,bottom:b.bottom,height:b.height,viewport:innerHeight,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight }; });
  check("Short landscape launch fits", shortLaunch.top >= 0 && shortLaunch.bottom <= shortLaunch.viewport && shortLaunch.scrollHeight <= shortLaunch.clientHeight + 1, JSON.stringify(shortLaunch));
  await shortPhone.getByRole("button", { name: /Launch Level 2/i }).click();
  const briefAction = await shortPhone.getByRole("button", { name: "Begin stage 1" }).boundingBox();
  check("Short landscape briefing action remains visible", briefAction && briefAction.y >= 0 && briefAction.y + briefAction.height <= 320, JSON.stringify(briefAction));
  const shortBriefFits = await fits(shortPhone, [".brief-orders li", ".brief-actions button"]);
  check("Short landscape briefing labels fit", shortBriefFits.every((item) => item.fitsWidth && item.fitsHeight), JSON.stringify(shortBriefFits));
  await shot(shortPhone, "11-brief-short-landscape.png");

  const portrait = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  watch(portrait, "portrait");
  await portrait.goto(`${BASE}/mechshift-rescue/level-2/`, { waitUntil: "networkidle" });
  check("Portrait rotation guidance appears", await portrait.getByText("Turn your tablet sideways").isVisible());
  await shot(portrait, "12-portrait-guidance.png");

  const scopedErrors = report.errors.filter((error) => !/favicon/i.test(error.text));
  check("No console, page, required-network or asset errors", scopedErrors.length === 0, JSON.stringify(scopedErrors));
} finally {
  await browser.close();
}

report.finishedAt = new Date().toISOString();
report.passed = report.checks.every((item) => item.passed) && report.errors.filter((error) => !/favicon/i.test(error.text)).length === 0;
await writeFile(resolve(OUT, "qa-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, failed: report.checks.filter((item)=>!item.passed), errors: report.errors }, null, 2));
if (!report.passed) process.exitCode = 1;
