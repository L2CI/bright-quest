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

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const offenders = [];
    const viewportWidth = document.documentElement.clientWidth;
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      const spillsViewport = rect.left < -2 || rect.right > viewportWidth + 2;
      const clipsOwnText = ["BUTTON", "A", "SPAN", "STRONG", "LABEL"].includes(el.tagName)
        && (el.scrollWidth > el.clientWidth + 8 || el.scrollHeight > el.clientHeight + 8);
      if (spillsViewport || clipsOwnText) {
        const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
        offenders.push(`${el.tagName.toLowerCase()}.${el.className || ""} ${text}`);
      }
    }
    return offenders.slice(0, 12);
  });
  record(overflow.length === 0, `${label}: overflow/intersection risk ${overflow.join(" | ")}`);
}

async function verifyChapterAssets(page, chapterExpectations) {
  const assets = chapterExpectations.flatMap(([, video, vtt], index) => {
    const n = String(index + 1).padStart(2, "0");
    return [
      { type: "video", src: `./assets/videos/${video}` },
      { type: "audio", src: `./assets/audio/chapter-${n}-teacher.mp3` },
      { type: "captions", src: `./assets/captions/${vtt}` },
      { type: "poster", src: `./assets/posters/chapter-${n}.jpg` }
    ];
  });
  const headResults = await page.evaluate(async (assetList) => {
    return Promise.all(assetList.map(async (asset) => {
      const href = new URL(asset.src, location.href).href;
      try {
        const response = await fetch(href, { method: "HEAD", cache: "no-store" });
        return {
          ...asset,
          href,
          ok: response.ok,
          status: response.status,
          contentType: response.headers.get("content-type") || ""
        };
      } catch (error) {
        return { ...asset, href, ok: false, status: 0, contentType: "", error: String(error) };
      }
    }));
  }, assets);

  for (const result of headResults) {
    record(result.ok, `asset ${result.src} did not return 200; status ${result.status}`);
    if (result.type === "video") record(result.contentType.includes("video/mp4"), `asset ${result.src} did not return video/mp4`);
    if (result.type === "audio") record(result.contentType.includes("audio/"), `asset ${result.src} did not return audio content`);
    if (result.type === "captions") record(result.contentType.includes("text/vtt"), `asset ${result.src} did not return text/vtt`);
  }

  const audioResults = await page.evaluate(async (sources) => {
    function readAudioMetadata(src) {
      return new Promise((resolve) => {
        const audio = new Audio(new URL(src, location.href).href);
        const timeout = setTimeout(() => resolve({ src, ok: false, duration: 0, error: "metadata timeout" }), 8000);
        audio.preload = "metadata";
        audio.addEventListener("loadedmetadata", () => {
          clearTimeout(timeout);
          resolve({ src, ok: Number.isFinite(audio.duration) && audio.duration > 30, duration: audio.duration });
        }, { once: true });
        audio.addEventListener("error", () => {
          clearTimeout(timeout);
          resolve({ src, ok: false, duration: 0, error: "audio error" });
        }, { once: true });
        audio.load();
      });
    }
    return Promise.all(sources.map(readAudioMetadata));
  }, assets.filter((asset) => asset.type === "audio").map((asset) => asset.src));

  for (const result of audioResults) {
    record(result.ok, `audio metadata failed for ${result.src}; duration ${result.duration}; ${result.error || ""}`);
  }
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

  await assertNoOverflow(page, name);

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

  const chapterExpectations = [
    ["Matter Has A Hidden Code", "chapter-01.mp4", "chapter-01.vtt", 194],
    ["The Periodic Table Is A Map", "chapter-02.mp4", "chapter-02.vtt", 186],
    ["Particles Explain States", "chapter-03.mp4", "chapter-03.vtt", 189],
    ["Mixtures, Solutions, And Separation", "chapter-04.mp4", "chapter-04.vtt", 219],
    ["Chemical Change Clues", "chapter-05.mp4", "chapter-05.vtt", 194]
  ];
  if (name === "desktop") await verifyChapterAssets(page, chapterExpectations);

  const actualDurations = [];
  for (let index = 0; index < chapterExpectations.length; index += 1) {
    const [title, video, vtt, expectedDuration] = chapterExpectations[index];
    await page.locator(".chapter-tab").nth(index).click();
    await page.waitForTimeout(350);
    record((await page.locator("#chapterTitle").textContent()).includes(title), `${name}: chapter ${index + 1} title mismatch`);
    record((await page.locator("video source").getAttribute("src"))?.endsWith(video), `${name}: chapter ${index + 1} video source mismatch`);
    record((await page.locator("track").getAttribute("src"))?.endsWith(vtt), `${name}: chapter ${index + 1} VTT source mismatch`);
    await page.waitForFunction((expectedVideo) => {
      const videoElement = document.querySelector("#lessonVideo");
      return videoElement?.currentSrc?.endsWith(expectedVideo)
        && Number.isFinite(videoElement.duration)
        && videoElement.duration > 30;
    }, video);
    const actualDuration = await page.$eval("#lessonVideo", (videoElement) => videoElement.duration);
    actualDurations.push(actualDuration);
    record(Math.abs(actualDuration - expectedDuration) < 2, `${name}: chapter ${index + 1} runtime ${actualDuration.toFixed(1)}s does not match expected ${expectedDuration}s`);
    await page.$eval("#lessonVideo", (videoElement) => {
      videoElement.currentTime = videoElement.duration * 0.97;
      videoElement.dispatchEvent(new Event("timeupdate"));
      videoElement.dispatchEvent(new Event("ended"));
    });
    await page.waitForTimeout(400);
    record(await page.locator("#testStatus").textContent() === "Ready", `${name}: chapter ${index + 1} test did not unlock after completion`);
    record(await page.locator(".test-question").count() === 10, `${name}: chapter ${index + 1} did not render 10 test questions`);
    await assertNoOverflow(page, `${name}: chapter ${index + 1} test form`);
    const firstOptionValues = await page.$$eval(".test-question", (questions) => questions.map((question) => question.querySelector("input")?.value));
    record(firstOptionValues.some((value) => value !== "0"), `${name}: chapter ${index + 1} test options were not visually rotated`);
    for (let questionIndex = 0; questionIndex < 10; questionIndex += 1) {
      await page.locator(`input[name="q${questionIndex}"][value="0"]`).check();
    }
    await page.locator(".submit-test").click();
    await page.waitForTimeout(400);
    record((await page.locator("#testStatus").textContent()) === "10/10", `${name}: chapter ${index + 1} test score was not saved as 10/10`);
  }
  const totalRuntime = actualDurations.reduce((sum, duration) => sum + duration, 0);
  record(totalRuntime >= 900 && totalRuntime <= 1200, `${name}: total runtime ${totalRuntime.toFixed(1)}s is outside 15-20 minutes`);
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
  const shellErrors = [];
  const shellFailures = [];
  kid.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("favicon") && !msg.text().includes("Failed to load resource")) {
      shellErrors.push(`kid: ${msg.text()}`);
    }
  });
  kid.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("favicon") && !res.url().includes("/api/profiles")) shellFailures.push(`kid: ${res.status()} ${res.url()}`);
  });
  await kid.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await kid.locator('[data-role="kid"]').click();
  await kid.locator("#modePassword").fill("abcde");
  await kid.locator("#passwordForm button").click();
  const confirmKid = kid.locator("[data-bq-confirm-yes]");
  if (await confirmKid.isVisible({ timeout: 3000 }).catch(() => false)) {
    await confirmKid.click();
  }
  await kid.waitForFunction(() => {
    const visible = (element) => Boolean(
      element
      && element.getClientRects().length
      && getComputedStyle(element).visibility !== "hidden"
    );
    return visible(document.querySelector('[data-bq-action="chemistry-training"]'))
      || [...document.querySelectorAll("#profileScreen:not(.hidden) [data-profile]")].some(visible)
      || visible(document.querySelector("#profileScreen:not(.hidden) #profileName"));
  }, null, { timeout: 10000 });
  const savedQaProfile = kid.locator('#profileScreen:not(.hidden) [data-profile="qa-student"]');
  if (await savedQaProfile.isVisible().catch(() => false)) {
    await savedQaProfile.click();
  }
  const visibleProfileName = kid.locator("#profileScreen:not(.hidden) #profileName");
  if (await visibleProfileName.isVisible().catch(() => false)) {
    await visibleProfileName.fill("QA Student");
    await kid.locator("#profileScreen:not(.hidden) #profileForm button").click();
  }
  await kid.waitForSelector('[data-bq-action="chemistry-training"]');
  record(await kid.locator('[data-bq-action="chemistry-training"]').count() === 1, "kid shell: Chemistry card missing");
  await kid.screenshot({ path: path.join(outDir, "shell-kid-card.png"), fullPage: true });
  await kid.locator('[data-bq-action="chemistry-training"]').click();
  await kid.waitForURL(/chemistry-101-winter-2026/);
  record(kid.url().includes("chemistry-training/chemistry-101-winter-2026"), "kid shell: Chemistry card did not navigate to route");

  const parent = await context.newPage();
  parent.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("favicon") && !msg.text().includes("Failed to load resource")) {
      shellErrors.push(`parent: ${msg.text()}`);
    }
  });
  parent.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("favicon") && !res.url().includes("/api/profiles")) shellFailures.push(`parent: ${res.status()} ${res.url()}`);
  });
  await parent.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await parent.locator('[data-role="parent"]').click();
  await parent.locator("#modePassword").fill("12345");
  await parent.locator("#passwordForm button").click();
  await parent.waitForSelector(".parent-cockpit-redesign", { timeout: 10000 });
  await parent.waitForSelector(".bq-parent-page", { timeout: 10000 });
  await parent.waitForTimeout(500);
  record(await parent.locator("text=Chemistry 101 Winter 2026").count() > 0, "parent shell: Chemistry cockpit entry missing");
  record(await parent.locator(".bq-parent-page").isVisible(), "parent shell: parent page is not visible");
  const parentBox = await parent.locator(".bq-parent-page").boundingBox();
  record(Boolean(parentBox && parentBox.width > 400 && parentBox.height > 200), "parent shell: cockpit content did not render to a visible area");
  await parent.screenshot({ path: path.join(outDir, "shell-parent-cockpit.png"), fullPage: true });
  record(shellErrors.length === 0, `shell integration console errors ${shellErrors.join(" | ")}`);
  record(shellFailures.length === 0, `shell integration failed responses ${shellFailures.join(" | ")}`);
  await context.close();
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});
await runViewport(browser, "desktop", { width: 1440, height: 1000 });
await runViewport(browser, "tablet", { width: 820, height: 1180 });
await runViewport(browser, "mobile", { width: 390, height: 844 });
await runShellIntegration(browser);
await browser.close();

for (const file of ["desktop-initial.png", "desktop-after-test.png", "tablet-initial.png", "tablet-after-test.png", "mobile-initial.png", "mobile-after-test.png", "shell-kid-card.png", "shell-parent-cockpit.png"]) {
  record(existsSync(path.join(outDir, file)), `missing screenshot ${file}`);
}

if (issues.length) {
  console.error("Chemistry 101 QA failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("Chemistry 101 QA passed");
console.log(`Screenshots: ${outDir}`);
