import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4174";
const routes = [
  ["parent overview", "#parent/overview"],
  ["parent exam results", "#parent/exam-results"],
  ["parent focus", "#parent/focus"],
  ["parent training", "#parent/training"],
  ["parent writing", "#parent/writing"],
  ["parent games", "#parent/games"],
  ["parent chemistry", "#parent/chemistry"],
  ["parent winter", "#parent/winter-2026"],
  ["parent records", "#parent/records"]
];

function normalize(text) {
  return String(text || "").replace(/\s+/g, " ").trim().toLowerCase();
}

async function loginParent(page) {
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-role="parent"]').click();
  await page.locator("#modePassword").fill("12345");
  await page.locator("#passwordForm button").click();
  await page.waitForSelector(".parent-cockpit-redesign", { timeout: 10000 });
}

async function loginKid(page) {
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-role="kid"]').click();
  await page.locator("#modePassword").fill("abcde");
  await page.locator("#passwordForm button").click();
  const confirmKid = page.locator("[data-bq-confirm-yes]");
  if (await confirmKid.isVisible({ timeout: 3000 }).catch(() => false)) await confirmKid.click();
  await page.waitForFunction(() => {
    const visible = (element) => Boolean(
      element
      && element.getClientRects().length
      && getComputedStyle(element).visibility !== "hidden"
    );
    return visible(document.querySelector("[data-bq-action]"))
      || [...document.querySelectorAll("#profileScreen:not(.hidden) [data-profile]")].some(visible)
      || visible(document.querySelector("#profileScreen:not(.hidden) #profileName"));
  }, null, { timeout: 10000 });
  const savedQaProfile = page.locator('#profileScreen:not(.hidden) [data-profile="qa-student"]');
  if (await savedQaProfile.isVisible().catch(() => false)) await savedQaProfile.click();
  const visibleProfileName = page.locator("#profileScreen:not(.hidden) #profileName");
  if (await visibleProfileName.isVisible().catch(() => false)) {
    await visibleProfileName.fill("QA Student");
    await page.locator("#profileScreen:not(.hidden) #profileForm button").click();
  }
  await page.waitForSelector("[data-bq-action]", { timeout: 10000 });
}

async function visibleHeadingTexts(page) {
  return page.$$eval("h1,h2,h3,h4", (nodes) =>
    nodes
      .filter((node) => {
        const style = getComputedStyle(node);
        return node.getClientRects().length && style.visibility !== "hidden" && style.display !== "none";
      })
      .map((node) => node.textContent || "")
      .map((text) => text.replace(/\s+/g, " ").trim())
      .filter(Boolean)
  );
}

function duplicateHeadings(label, headings) {
  const seen = new Map();
  for (const heading of headings) {
    const key = normalize(heading);
    if (!key) continue;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(heading);
  }
  return [...seen.entries()]
    .filter(([, values]) => values.length > 1)
    .map(([key, values]) => `${label}: "${values[0]}" appears ${values.length} times`);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await context.addInitScript(() => {
  const profile = {
    id: "qa-student",
    name: "QA Student",
    attempts: [],
    stars: 0,
    completedGames: [],
    trainingCompleted: {},
    writingSamples: []
  };
  localStorage.setItem("brightQuestProfilesV2", JSON.stringify({ "qa-student": profile }));
  localStorage.setItem("brightQuestActiveProfile", "qa-student");
});

const findings = [];
const parent = await context.newPage();
await loginParent(parent);
for (const [label, hash] of routes) {
  await parent.evaluate((nextHash) => { window.location.hash = nextHash; }, hash);
  await parent.waitForTimeout(250);
  findings.push(...duplicateHeadings(label, await visibleHeadingTexts(parent)));
}

const kid = await context.newPage();
await loginKid(kid);
findings.push(...duplicateHeadings("kid home", await visibleHeadingTexts(kid)));
for (const [label, action] of [
  ["kid exam prep", "city-exam"],
  ["kid winter training", "winter-training"],
  ["kid progress", "progress"],
  ["kid games", "games"]
]) {
  await kid.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await loginKid(kid);
  const target = kid.locator(`[data-bq-action="${action}"]`).first();
  if (await target.isVisible().catch(() => false)) {
    await target.click();
    await kid.waitForTimeout(300);
    findings.push(...duplicateHeadings(label, await visibleHeadingTexts(kid)));
  }
}

await browser.close();

if (findings.length) {
  console.log("Duplicate visible headings found:");
  for (const finding of findings) console.log(`- ${finding}`);
  process.exitCode = 1;
} else {
  console.log("No duplicate visible headings found across audited Bright Quest parent/kid routes.");
}
