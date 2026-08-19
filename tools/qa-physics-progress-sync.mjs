import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const host = "127.0.0.1";
const serverPort = 4197;
const debugPort = 9300 + Math.floor(Math.random() * 500);
const origin = `http://${host}:${serverPort}`;
const chromePath = process.env.BQ_BROWSER_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profileDir = path.join(root, "outputs", `physics-sync-profile-${Date.now()}`);
const studentId = "qa-physics-child";
const courseId = "physics-101-advanced-grade-4";
const chapterIds = ["force-is-an-interaction", "motion-tells-the-story", "push-pull-and-support"];
const chapterTitles = ["Force Is An Interaction", "Motion Tells The Story", "Push, Pull And Support"];

const testResult = (score, submittedAt) => ({
  score,
  total: 10,
  submittedAt,
  attempt: 1,
  answers: Array.from({ length: 10 }, (_, index) => ({
    prompt: `Question ${index + 1}`,
    selected: "Evidence answer",
    correctAnswer: "Evidence answer",
    correct: index < score,
    feedback: "Use the interaction evidence."
  }))
});

const releasedChapters = chapterIds.map((id, index) => ({ id, number: index + 1, title: chapterTitles[index] }));
const initialProfile = {
  id: studentId,
  name: "Physics QA Child",
  createdAt: "2026-08-18T00:00:00.000Z",
  createdByParent: true,
  stars: 0,
  attempts: [],
  writingSamples: [],
  trainingCompleted: {
    [`${courseId}:${chapterIds[0]}`]: { date: "2026-08-18T01:00:00.000Z", count: 1, title: chapterTitles[0] }
  },
  cloudVersion: 7,
  physics101Progress: {
    courseId,
    releasedChapters,
    chapters: {
      [chapterIds[0]]: { watchedSeconds: 205, completed: true, completedAt: "2026-08-18T01:00:00.000Z", test: null, bestScore: 0, attempts: 0 },
      [chapterIds[1]]: { watchedSeconds: 180, completed: false, test: testResult(8, "2026-08-18T02:00:00.000Z"), bestScore: 8, attempts: 1 }
    }
  }
};

let cloud = { version: 7, updatedAt: "2026-08-18T01:00:00.000Z", payload: structuredClone(initialProfile) };
const api = { gets: 0, posts: [], stale: 0 };

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, origin);
  if (url.pathname === "/api/profiles" && request.method === "GET") {
    api.gets += 1;
    return sendJson(response, 200, { profiles: [{ profileId: studentId, version: cloud.version, updatedAt: cloud.updatedAt, payload: cloud.payload }] });
  }
  if (url.pathname === "/api/profiles" && request.method === "POST") {
    const body = JSON.parse(await readBody(request));
    const version = Number(body.profile?.cloudVersion || 0);
    api.posts.push(version);
    if (version !== cloud.version) {
      api.stale += 1;
      return sendJson(response, 409, { code: "STALE_PROFILE", currentVersion: cloud.version });
    }
    cloud.version += 1;
    cloud.updatedAt = new Date(Date.parse(cloud.updatedAt) + 60000).toISOString();
    cloud.payload = structuredClone(body.profile);
    return sendJson(response, 200, { ok: true, version: cloud.version, syncedAt: cloud.updatedAt });
  }
  if (url.pathname === "/api/auth/config") {
    return sendJson(response, 200, { enabled: false, experienceUpliftEnabled: true });
  }
  if (url.pathname.startsWith("/api/")) return sendJson(response, 200, { ok: true });

  const requestPath = url.pathname === "/" ? "/index.html" : url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
  const relative = decodeURIComponent(requestPath);
  const filePath = path.resolve(root, `.${relative}`);
  if (!filePath.startsWith(root)) return sendJson(response, 403, { error: "Forbidden" });
  try {
    const body = await fs.readFile(filePath);
    response.writeHead(200, { "content-type": mimeType(filePath), "cache-control": "no-store" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

await fs.mkdir(profileDir, { recursive: true });
await new Promise((resolve) => server.listen(serverPort, host, resolve));
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--mute-audio",
  "--autoplay-policy=document-user-activation-required",
  `--remote-debugging-port=${debugPort}`,
  "--remote-allow-origins=*",
  `--user-data-dir=${profileDir}`,
  "about:blank"
], { stdio: "ignore" });

let socket;
let cdp;
try {
  await waitForChrome();
  const tab = await fetch(`http://${host}:${debugPort}/json/new?about%3Ablank`, { method: "PUT" }).then((response) => response.json());
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  cdp = createCdp(socket);
  await Promise.all([cdp.send("Page.enable"), cdp.send("Runtime.enable")]);

  await navigate(cdp, `${origin}/`);
  await evaluate(cdp, `(() => {
    localStorage.setItem("brightQuestProfilesV2", ${JSON.stringify(JSON.stringify({ [studentId]: initialProfile }))});
    localStorage.setItem("brightQuestActiveProfile", ${JSON.stringify(studentId)});
    localStorage.setItem("brightQuestPhysics101ProgressV1", ${JSON.stringify(JSON.stringify({
      [studentId]: {
        courseId,
        chapters: {
          [chapterIds[1]]: initialProfile.physics101Progress.chapters[chapterIds[1]]
        }
      }
    }))});
  })()`);

  await navigate(cdp, `${origin}/physics-training/physics-101-advanced-grade-4/?profileId=${studentId}&chapter=2&view=lesson`);
  await waitForValue(cdp, `document.querySelector("#chapterTitle")?.textContent`, chapterTitles[1]);
  await evaluate(cdp, `document.querySelector("#lessonVideo").dispatchEvent(new Event("ended"))`);
  await waitFor(() => api.posts.length >= 1 && storedVersion(cloud.payload) === 7);
  await waitForValue(cdp, `JSON.parse(localStorage.getItem("brightQuestProfilesV2"))[${JSON.stringify(studentId)}].cloudVersion`, 8);
  assert(api.posts[0] === 7, `first save used version ${api.posts[0]}, expected 7`);

  cloud.version = 9;
  cloud.updatedAt = "2026-08-18T03:00:00.000Z";
  cloud.payload.cloudVersion = 9;
  cloud.payload.physics101Progress.chapters[chapterIds[0]].test = testResult(9, "2026-08-18T03:00:00.000Z");
  cloud.payload.physics101Progress.chapters[chapterIds[0]].bestScore = 9;
  cloud.payload.physics101Progress.chapters[chapterIds[0]].attempts = 1;

  await navigate(cdp, `${origin}/physics-training/physics-101-advanced-grade-4/?profileId=${studentId}&chapter=3&view=lesson`);
  await waitForValue(cdp, `document.querySelector("#chapterTitle")?.textContent`, chapterTitles[2]);
  await evaluate(cdp, `document.querySelector("#lessonVideo").dispatchEvent(new Event("ended"))`);
  await waitFor(() => api.posts.length >= 3 && cloud.version === 10);

  assert(api.posts.join(",") === "7,8,9", `save versions were ${api.posts.join(",")}, expected 7,8,9`);
  assert(api.stale === 1, `expected one stale response, received ${api.stale}`);
  assert(cloud.payload.physics101Progress.chapters[chapterIds[0]].test?.score === 9, "remote Chapter 1 test was lost during stale merge");
  assert(cloud.payload.physics101Progress.chapters[chapterIds[1]].test?.score === 8, "local Chapter 2 test was lost during stale merge");
  assert(cloud.payload.physics101Progress.chapters[chapterIds[2]].completed === true, "Chapter 3 completion was not saved after retry");

  const duplicateProfile = {
    id: "qa-physics-duplicate",
    name: initialProfile.name,
    createdAt: "2026-08-18T00:30:00.000Z",
    createdByParent: false,
    stars: 0,
    attempts: [],
    writingSamples: [],
    trainingCompleted: {},
    physics101Progress: {
      courseId,
      releasedChapters,
      chapters: {
        [chapterIds[1]]: {
          watchedSeconds: 205,
          completed: true,
          completedAt: "2026-08-18T03:30:00.000Z",
          test: testResult(10, "2026-08-18T03:30:00.000Z"),
          bestScore: 10,
          attempts: 2
        }
      }
    }
  };
  await evaluate(cdp, `(() => {
    const profiles = JSON.parse(localStorage.getItem("brightQuestProfilesV2"));
    profiles[${JSON.stringify(duplicateProfile.id)}] = ${JSON.stringify(duplicateProfile)};
    localStorage.setItem("brightQuestProfilesV2", JSON.stringify(profiles));
  })()`);
  await navigate(cdp, `${origin}/`);
  await waitForValue(cdp, `JSON.parse(localStorage.getItem("brightQuestProfilesV2"))[${JSON.stringify(studentId)}].cloudVersion`, 10);
  await loginAsChild(cdp);
  await waitForValue(cdp, `Boolean(JSON.parse(localStorage.getItem("brightQuestProfilesV2"))[${JSON.stringify(duplicateProfile.id)}])`, false);
  await waitForValue(cdp, `JSON.parse(localStorage.getItem("brightQuestProfilesV2"))[${JSON.stringify(studentId)}].physics101Progress.chapters[${JSON.stringify(chapterIds[1])}].test.score`, 10);
  await waitFor(() => cloud.version === 11);
  await waitForValue(cdp, `document.querySelector('[data-bq-action="physics-training"] .bq-world-status')?.textContent.trim()`, "3 of 6 complete");
  await evaluate(cdp, `document.querySelector('[data-bq-action="progress"]').click()`);
  await waitForValue(cdp, `[...document.querySelectorAll(".bq-journey-subject")].find((item) => item.textContent.includes("Physics Workshop"))?.querySelector("small")?.textContent.trim()`, "3 of 6");

  await navigate(cdp, `${origin}/`);
  await loginAsParent(cdp);
  await evaluate(cdp, `location.hash = "#parent/physics"`);
  await waitForValue(cdp, `document.querySelector("#parentScreen")?.textContent.includes("2/6 Cockpit Checks submitted")`, true);

  cloud.version = 12;
  cloud.updatedAt = "2026-08-18T04:00:00.000Z";
  cloud.payload.cloudVersion = 12;
  cloud.payload.physics101Progress.chapters[chapterIds[2]].test = testResult(7, "2026-08-18T04:00:00.000Z");
  cloud.payload.physics101Progress.chapters[chapterIds[2]].bestScore = 7;
  cloud.payload.physics101Progress.chapters[chapterIds[2]].attempts = 1;
  const getsBeforeRefresh = api.gets;
  await evaluate(cdp, `document.querySelector('[data-parent-shell-action="refresh"]').click()`);
  await waitFor(() => api.gets > getsBeforeRefresh);
  await waitForValue(cdp, `document.querySelector("#parentScreen")?.textContent.includes("3/6 Cockpit Checks submitted")`, true);
  await waitForValue(cdp, `JSON.parse(localStorage.getItem("brightQuestProfilesV2"))[${JSON.stringify(studentId)}].cloudVersion`, 12);

  console.log("[pass] Physics save records successful cloud versions");
  console.log("[pass] STALE_PROFILE fetches, unions chapter tests, and retries once");
  console.log("[pass] Same-name profile dedupe preserves the richer Physics test");
  console.log("[pass] Child tile and My Journey show 3 of 6 released chapters");
  console.log("[pass] Parent refresh pulls cloud data and displays the new test");
} finally {
  await cdp?.send("Browser.close").catch(() => {});
  socket?.close();
  const chromeExited = new Promise((resolve) => chrome.once("exit", resolve));
  chrome.kill();
  await new Promise((resolve) => server.close(resolve));
  await Promise.race([chromeExited, delay(3000)]);
  await fs.rm(profileDir, { recursive: true, force: true, maxRetries: 8, retryDelay: 150 });
}

function storedVersion(profile) {
  return Number(profile?.cloudVersion || 0);
}

function sendJson(response, status, body) {
  response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function mimeType(file) {
  return ({ ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".vtt": "text/vtt", ".mp4": "video/mp4" })[path.extname(file).toLowerCase()] || "application/octet-stream";
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const tabs = await fetch(`http://${host}:${debugPort}/json/list`).then((response) => response.json());
      if (Array.isArray(tabs)) return;
    } catch {}
    await delay(100);
  }
  throw new Error("Muted Chrome did not start.");
}

function createCdp(ws) {
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const request = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });
  return {
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const requestId = ++id;
        pending.set(requestId, { resolve, reject });
        ws.send(JSON.stringify({ id: requestId, method, params }));
      });
    }
  };
}

async function navigate(cdp, url) {
  await cdp.send("Page.navigate", { url });
  await waitForValue(cdp, "document.readyState", "complete");
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}

async function waitForValue(cdp, expression, expected) {
  let actual;
  try {
    await waitFor(async () => {
      actual = await evaluate(cdp, expression);
      return Object.is(actual, expected);
    });
  } catch {
    throw new Error(`Timed out waiting for ${expression}; expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

async function waitFor(predicate, timeout = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await predicate()) return;
    await delay(50);
  }
  throw new Error("Timed out waiting for QA condition.");
}

async function loginAsChild(cdp) {
  await evaluate(cdp, `document.querySelector('[data-role="kid"]').click(); document.querySelector("#modePassword").value = "abcde"; document.querySelector("#passwordForm").requestSubmit()`);
  await waitForValue(cdp, `!document.querySelector("#bqKidConfirmScreen")?.classList.contains("hidden")`, true);
  await evaluate(cdp, `document.querySelector("[data-bq-confirm-yes]").click()`);
}

async function loginAsParent(cdp) {
  await evaluate(cdp, `document.querySelector('[data-role="parent"]').click(); document.querySelector("#modePassword").value = "12345"; document.querySelector("#passwordForm").requestSubmit()`);
  await waitForValue(cdp, `!document.querySelector("#parentScreen")?.classList.contains("hidden")`, true);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
