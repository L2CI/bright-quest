import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4174";
const outDir = path.resolve("..", "outputs", "chemistry-101-winter-2026-build", "qa", "web");
mkdirSync(outDir, { recursive: true });

const route = `${baseUrl}/chemistry-training/chemistry-101-winter-2026/`;
const issues = [];

function record(condition, message) {
  if (!condition) issues.push(message);
}

async function runViewport(browser, name, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedResponses = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("favicon") && !msg.text().includes("Failed to load resource")) {
      consoleErrors.push(msg.text());
    }
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("favicon")) failedResponses.push(`${res.status()} ${res.url()}`);
  });

  await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#lessonVideo");
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, `${name}-initial.png`), fullPage: true });

  record(await page.locator("text=Chemistry 101").count() > 0, `${name}: title missing`);
  record(await page.locator(".chapter-tab").count() === 5, `${name}: expected five chapter tabs`);
  record(await page.locator(".chapter-card").count() === 5, `${name}: expected five chapter cards`);
  record(await page.locator("video source").getAttribute("src") === "./assets/videos/chapter-01.mp4", `${name}: chapter 1 video source not loaded`);
  record((await page.locator("track").getAttribute("src"))?.endsWith("chapter-01.vtt"), `${name}: VTT not attached`);

  const overflow = await page.evaluate(() => {
    const offenders = [];
    const viewportWidth = document.documentElement.clientWidth;
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      const spillsViewport = rect.left < -2 || rect.right > viewportWidth + 2;
      const clipsOwnText = ["BUTTON", "A", "SPAN"].includes(el.tagName) && (el.scrollWidth > el.clientWidth + 8 || el.scrollHeight > el.clientHeight + 8);
      if (spillsViewport || clipsOwnText) {
        const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
        offenders.push(`${el.tagName.toLowerCase()}.${el.className || ""} ${text}`);
      }
    }
    return offenders.slice(0, 12);
  });
  record(overflow.length === 0, `${name}: overflow/intersection risk ${overflow.join(" | ")}`);

  await page.locator("#ccButton").click();
  record(await page.locator("#ccButton").getAttribute("aria-pressed") === "true", `${name}: CC did not toggle on`);
  await page.locator("#playButton").click();
  await page.waitForTimeout(500);
  record(await page.locator("#playButton").textContent() !== "Play", `${name}: play button did not change state`);
  await page.locator("#rewindButton").click();
  await page.locator("#stopButton").click();
  await page.waitForTimeout(250);
  const stopped = await page.$eval("#lessonVideo", (video) => video.paused && video.currentTime < 0.5);
  record(stopped, `${name}: stop did not pause and reset video`);

  await page.waitForFunction(() => Number.isFinite(document.querySelector("#lessonVideo").duration) && document.querySelector("#lessonVideo").duration > 30);
  await page.$eval("#lessonVideo", (video) => {
    video.currentTime = video.duration * 0.97;
    video.dispatchEvent(new Event("timeupdate"));
    video.dispatchEvent(new Event("ended"));
  });
  await page.waitForTimeout(400);
  record(await page.locator("#testStatus").textContent() === "Ready", `${name}: test did not unlock after completion`);

  for (let i = 0; i < 10; i += 1) {
    await page.locator(`input[name="q${i}"][value="0"]`).check();
  }
  await page.locator(".submit-test").click();
  await page.waitForTimeout(400);
  record((await page.locator("#testStatus").textContent()) === "10/10", `${name}: test score was not saved as 10/10`);

  await page.locator(".chapter-tab").nth(3).click();
  await page.waitForTimeout(500);
  record((await page.locator("#chapterTitle").textContent()).includes("Mixtures"), `${name}: chapter tab switch failed`);
  await page.screenshot({ path: path.join(outDir, `${name}-after-test.png`), fullPage: true });

  record(consoleErrors.length === 0, `${name}: console errors ${consoleErrors.join(" | ")}`);
  record(failedResponses.length === 0, `${name}: failed responses ${failedResponses.join(" | ")}`);
  await context.close();
}

async function runShellIntegration(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  await context.addInitScript(() => {
    const profile = {
      id: "qa-student",
      name: "QA Student",
      createdAt: new Date().toISOString(),
      stars: 0,
      attempts: [],
      trainingCompleted: {},
      writingSamples: []
    };
    localStorage.setItem("brightQuestProfilesV2", JSON.stringify({ "qa-student": profile }));
    localStorage.setItem("brightQuestActiveProfile", "qa-student");
  });

  const kid = await context.newPage();
  await kid.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await kid.locator('[data-role="kid"]').click();
  await kid.locator("#modePassword").fill("abcde");
  await kid.locator("#passwordForm button").click();
  await kid.locator("[data-bq-confirm-yes]").click();
  await kid.waitForSelector('[data-bq-action="chemistry-training"]');
  record(await kid.locator('[data-bq-action="chemistry-training"]').count() === 1, "kid shell: Chemistry card missing");
  await kid.screenshot({ path: path.join(outDir, "shell-kid-card.png"), fullPage: true });
  await kid.locator('[data-bq-action="chemistry-training"]').click();
  await kid.waitForURL(/chemistry-101-winter-2026/);
  record(kid.url().includes("chemistry-training/chemistry-101-winter-2026"), "kid shell: Chemistry card did not navigate to route");

  const parent = await context.newPage();
  await parent.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await parent.locator('[data-role="parent"]').click();
  await parent.locator("#modePassword").fill("12345");
  await parent.locator("#passwordForm button").click();
  await parent.waitForSelector("text=Chemistry 101 Winter 2026");
  record(await parent.locator("text=Chemistry 101 Winter 2026").count() > 0, "parent shell: Chemistry cockpit entry missing");
  await parent.screenshot({ path: path.join(outDir, "shell-parent-cockpit.png"), fullPage: true });
  await context.close();
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});
await runViewport(browser, "desktop", { width: 1440, height: 1000 });
await runViewport(browser, "mobile", { width: 390, height: 844 });
await runShellIntegration(browser);
await browser.close();

for (const file of ["desktop-initial.png", "desktop-after-test.png", "mobile-initial.png", "mobile-after-test.png"]) {
  record(existsSync(path.join(outDir, file)), `missing screenshot ${file}`);
}

if (issues.length) {
  console.error("Chemistry 101 QA failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Chemistry 101 QA passed");
console.log(`Screenshots: ${outDir}`);
