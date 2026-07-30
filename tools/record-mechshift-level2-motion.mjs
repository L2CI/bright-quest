import { createRequire } from "node:module";
import { mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch {
  const modulePath = process.env.BQ_PLAYWRIGHT_MODULE;
  if (!modulePath) throw new Error("Set BQ_PLAYWRIGHT_MODULE to the Playwright package directory.");
  playwright = require(modulePath);
}

const base = process.env.BQ_QA_URL || "http://127.0.0.1:4173";
const outputDir = resolve("qa-screens/mechshift-rescue/level-2/motion-recording");
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const browser = await playwright.chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

await page.goto(`${base}/mechshift-rescue/level-2/`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__STORMRAIL_QA__?.build === "stormrail-shield-sprint-001");
await page.evaluate(() => window.__STORMRAIL_QA__.startRun());
const shieldBox = await page.locator("#shieldButton").boundingBox();
if (!shieldBox) throw new Error("Shield control is not visible.");
const shieldPoint = { x: shieldBox.x + shieldBox.width / 2, y: shieldBox.y + shieldBox.height / 2 };
for (let frame = 0; frame < 64; frame += 1) {
  if (frame === 8) await page.keyboard.press("ArrowUp");
  if (frame === 16) await page.keyboard.press("ArrowDown");
  if (frame === 24) {
    await page.mouse.move(shieldPoint.x, shieldPoint.y);
    await page.mouse.down();
    await page.evaluate(() => window.__STORMRAIL_QA__.forcePulse(1));
  }
  if (frame === 31) await page.mouse.up();
  if (frame === 39) await page.keyboard.press("ArrowDown");
  if (frame === 46) {
    await page.mouse.move(shieldPoint.x, shieldPoint.y);
    await page.mouse.down();
    await page.evaluate(() => window.__STORMRAIL_QA__.forcePulse(2));
  }
  if (frame === 53) await page.mouse.up();
  await page.screenshot({ path: resolve(outputDir, `frame-${String(frame).padStart(3, "0")}.png`) });
  await page.waitForTimeout(80);
}

await page.close();
await context.close();
await browser.close();
if (errors.length) throw new Error(`Motion recording captured runtime errors: ${errors.join(" | ")}`);
console.log(outputDir);
