import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browserPath = process.env.BQ_BROWSER_PATH || chromePath;
const browserName = process.env.BQ_BROWSER_NAME || "Google Chrome headless";
const baseUrl = process.env.BQ_QA_BASE_URL || "http://localhost:4173/physics-training/physics-101-advanced-grade-4/";
const evidenceDir = path.join(root, "outputs", "physics-101-qa");
const profileDir = path.join(evidenceDir, `chrome-profile-${Date.now()}`);
const port = 9334;
let nextId = 1;
const pending = new Map();
const events = [];
const keepAlive = setInterval(() => {}, 1000);

await fs.mkdir(evidenceDir, { recursive: true });
const chrome = spawn(browserPath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--autoplay-policy=no-user-gesture-required",
  `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*",
  `--user-data-dir=${profileDir}`,
  "about:blank",
], { stdio: "ignore" });

try {
  console.log("[qa] waiting for browser");
  await waitForChrome();
  console.log("[qa] creating tab");
  const tab = await createTab(baseUrl);
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await Promise.race([new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  }), timeoutAfter(10000, "Browser WebSocket did not open.")]);
  console.log("[qa] browser connected");
  ws.addEventListener("message", (event) => {
    const raw = typeof event.data === "string" ? event.data : Buffer.from(event.data).toString("utf8");
    const message = JSON.parse(raw);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    events.push(message);
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Browser command timed out: ${method}`));
    }, 60000);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (error) => { clearTimeout(timer); reject(error); },
    });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Browser evaluation failed");
    return result.result.value;
  };

  await Promise.all([send("Page.enable"), send("Runtime.enable"), send("Log.enable"), send("Network.enable")]);
  console.log("[qa] browser domains enabled");

  const results = [];
  const buttonChecks = [];
  await setViewport(send, 1440, 900, 1, false);
  await navigate(send, baseUrl);
  console.log("[qa] desktop landing loaded");
  await waitFor(() => evaluate("(() => { const landing=document.querySelector('.course-landing'); return Boolean(landing && window.getComputedStyle(landing).display !== 'none' && document.querySelectorAll('.chapter-card').length === 11); })()"));
  const deployedMarker = await evaluate("Boolean(document.querySelector('script[src*=\"physics-101-force-lab-008\"]'))");
  if (!deployedMarker) throw new Error("The expected physics-101-force-lab-008 release marker is not live.");
  results.push(await inspect(evaluate, "desktop landing"));
  await screenshot(send, path.join(evidenceDir, "desktop-landing.png"));

  await evaluate("document.querySelector('#courseMapButton').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('.physics-app').classList.contains('landing-view') && !location.search.includes('chapter=1')"))) throw new Error("Course map button did not preserve the landing view.");
  buttonChecks.push("course map header button");

  await evaluate("document.querySelector('[data-open-chapter]').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('.physics-app').classList.contains('player-view')"))) throw new Error("Available chapter card did not open the lesson.");
  buttonChecks.push("available chapter card");

  await evaluate("document.querySelector('#backToMapButton').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('.physics-app').classList.contains('landing-view') && !location.search.includes('chapter=1')"))) throw new Error("Lesson back button did not return to the course map.");
  buttonChecks.push("lesson back to course map button");

  await evaluate("document.querySelector('#courseStartButton').click(); true");
  await waitFor(() => evaluate("document.querySelector('.physics-app').classList.contains('player-view')"));
  buttonChecks.push("start chapter button");
  results.push(await inspect(evaluate, "desktop lesson"));
  await screenshot(send, path.join(evidenceDir, "desktop-lesson.png"));
  console.log("[qa] navigation controls passed");

  await evaluate("document.querySelector('#ccButton').click(); true");
  await waitFor(() => evaluate("document.querySelector('#ccButton').getAttribute('aria-pressed') === 'true'"));
  buttonChecks.push("captions button");
  await evaluate("document.querySelector('#lessonVideo').load(); true");
  const videoReady = await waitFor(() => evaluate("Number.isFinite(document.querySelector('#lessonVideo').duration) && document.querySelector('#lessonVideo').duration > 190"), 15000);
  if (!videoReady) throw new Error("Video metadata did not load within 15 seconds.");
  await seekVideo(evaluate, 30);
  await evaluate("document.querySelector('#rewindButton').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('#lessonVideo').currentTime <= 15.5"))) throw new Error("Rewind button did not move the lesson back 15 seconds.");
  buttonChecks.push("rewind 15 seconds button");
  const timelineSeek = await evaluate("(async () => { const video=document.querySelector('#lessonVideo'); const timeline=document.querySelector('#timeline'); video.pause(); timeline.value='50'; timeline.dispatchEvent(new Event('input', { bubbles: true })); if (video.seeking) await new Promise((resolve) => video.addEventListener('seeked', resolve, { once: true })); return { currentTime: video.currentTime, expected: video.duration / 2 }; })()" );
  if (Math.abs(timelineSeek.currentTime - timelineSeek.expected) >= 1) throw new Error(`Timeline input seek mismatch: ${JSON.stringify(timelineSeek)}`);
  buttonChecks.push("timeline input");
  await evaluate("document.querySelector('#stopButton').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('#lessonVideo').currentTime < 0.5 && !document.querySelector('#videoStartButton').hidden"))) throw new Error("Stop button did not reset the lesson.");
  buttonChecks.push("stop button");
  await evaluate("document.querySelector('#videoStartButton').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('#videoStartButton').hidden"))) throw new Error("Video start button did not begin the lesson.");
  buttonChecks.push("video start button");
  await evaluate("document.querySelector('#playButton').click(); true");
  if (!await waitFor(() => evaluate("document.querySelector('#lessonVideo').paused"))) throw new Error("Play control did not pause the playing lesson.");
  await evaluate("document.querySelector('#playButton').click(); true");
  if (!await waitFor(() => evaluate("!document.querySelector('#lessonVideo').paused"))) throw new Error("Play control did not resume the paused lesson.");
  await evaluate("document.querySelector('#stopButton').click(); true");
  buttonChecks.push("play pause resume button");
  console.log("[qa] player controls passed");
  await seekVideo(evaluate, 9999);
  await evaluate("(() => { const video=document.querySelector('#lessonVideo'); video.dispatchEvent(new Event('timeupdate')); video.dispatchEvent(new Event('ended')); return true; })()");
  if (!await waitFor(() => evaluate("/Ready|Best/.test(document.querySelector('#testStatus')?.textContent || '')"))) throw new Error("Cockpit Check did not unlock after lesson completion.");
  if (!await waitFor(() => evaluate("Boolean(document.querySelector('#beginTestButton, #retakeTestButton'))"))) throw new Error("Cockpit Check start action was not rendered.");
  await evaluate("document.querySelector('#beginTestButton, #retakeTestButton').click(); true");
  for (let index = 0; index < 10; index += 1) {
    await waitFor(() => evaluate("Boolean(document.querySelector('[data-answer]'))"));
    await evaluate("document.querySelector('[data-answer]').click(); true");
    await waitFor(() => evaluate("Boolean(document.querySelector('#nextQuestionButton'))"));
    await evaluate("document.querySelector('#nextQuestionButton').click(); true");
  }
  await waitFor(() => evaluate("Boolean(document.querySelector('.result-score'))"));
  results.push(await inspect(evaluate, "desktop test result"));
  await screenshot(send, path.join(evidenceDir, "desktop-test-result.png"));
  buttonChecks.push("all ten answer and next-question buttons");
  await evaluate("document.querySelector('#retakeTestButton').click(); true");
  if (!await waitFor(() => evaluate("Boolean(document.querySelector('[data-answer]'))"))) throw new Error("Retake button did not start a fresh test.");
  buttonChecks.push("retake test button");
  console.log("[qa] cockpit check passed");

  const returnLinks = await evaluate("[...document.querySelectorAll('a[href=\"../../\"]')].map((link) => link.href)");
  if (returnLinks.length !== 2 || returnLinks.some((href) => new URL(href).pathname !== '/')) throw new Error("Bright Quest return links do not resolve to the portal root.");
  for (const href of returnLinks) {
    const response = await fetch(href);
    if (!response.ok) throw new Error(`Bright Quest return link failed with ${response.status}.`);
  }
  buttonChecks.push("brand and Back to Bright Quest return links");
  console.log("[qa] return links passed");

  await setViewport(send, 834, 1194, 1, true);
  const tabletUrl = new URL(baseUrl);
  tabletUrl.searchParams.set("chapter", "1");
  await navigate(send, tabletUrl.toString());
  console.log("[qa] tablet lesson loaded");
  await waitFor(() => evaluate("document.querySelector('.physics-app').classList.contains('player-view')"));
  results.push(await inspect(evaluate, "tablet lesson"));
  await screenshot(send, path.join(evidenceDir, "tablet-lesson.png"));
  await seekVideo(evaluate, 145);
  await screenshot(send, path.join(evidenceDir, "tablet-lesson-145s.png"));
  console.log("[qa] tablet timestamp captured");

  await setViewport(send, 390, 844, 2, true);
  await navigate(send, baseUrl);
  console.log("[qa] mobile landing loaded");
  await waitFor(() => evaluate("Boolean(document.querySelector('.course-landing'))"));
  results.push(await inspect(evaluate, "mobile landing"));
  await screenshot(send, path.join(evidenceDir, "mobile-landing.png"));
  await evaluate("document.querySelector('#courseStartButton').click(); true");
  await waitFor(() => evaluate("document.querySelector('.physics-app').classList.contains('player-view')"));
  results.push(await inspect(evaluate, "mobile lesson"));
  await screenshot(send, path.join(evidenceDir, "mobile-lesson.png"));
  await seekVideo(evaluate, 145);
  await screenshot(send, path.join(evidenceDir, "mobile-lesson-145s.png"));
  console.log("[qa] mobile first timestamp captured");
  await seekVideo(evaluate, 183);
  await screenshot(send, path.join(evidenceDir, "mobile-lesson-183s.png"));
  console.log("[qa] responsive views passed");

  const browserErrors = events.filter((event) =>
    event.method === "Runtime.exceptionThrown" ||
    event.method === "Log.entryAdded" && ["error", "warning"].includes(event.params?.entry?.level) ||
    event.method === "Network.loadingFailed" && !event.params?.canceled ||
    event.method === "Network.responseReceived" && event.params?.response?.status >= 400
  ).map((event) => ({ method: event.method, params: event.params }));

  const report = {
    release: "physics-101-force-lab-008",
    browser: browserName,
    route: baseUrl,
    deployedMarker,
    buttonChecks,
    results,
    browserErrors,
    passed: results.every((result) => result.horizontalOverflow === 0 && result.brokenImages === 0 && result.smallPrimaryControls === 0) && browserErrors.length === 0,
  };
  await fs.writeFile(path.join(evidenceDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
  ws.close();
  if (!report.passed) process.exitCode = 1;
} finally {
  clearInterval(keepAlive);
  chrome.kill();
}

async function inspect(evaluate, label) {
  return evaluate(`(() => {
    const visible = (element) => { const style=getComputedStyle(element); const box=element.getBoundingClientRect(); return style.display!=='none' && style.visibility!=='hidden' && box.width>0 && box.height>0; };
    const controls=[...document.querySelectorAll('button,a')].filter(visible);
    const small=controls.filter((element) => { const box=element.getBoundingClientRect(); return box.height < 44 || box.width < 44; }).map((element) => ({ text: element.textContent.trim().slice(0,60), width: Math.round(element.getBoundingClientRect().width), height: Math.round(element.getBoundingClientRect().height) }));
    const images=[...document.images];
    return {
      label: ${JSON.stringify(label)},
      viewport: { width: innerWidth, height: innerHeight },
      horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      brokenImages: images.filter((image) => !image.complete || image.naturalWidth === 0).length,
      smallPrimaryControls: small.length,
      smallControls: small,
      headings: [...document.querySelectorAll('h1,h2,h3')].filter(visible).map((heading) => heading.textContent.trim()),
      videoBox: (() => { const video=document.querySelector('video'); if(!video || !visible(video)) return null; const box=video.getBoundingClientRect(); return { width: Math.round(box.width), height: Math.round(box.height), ratio: Math.round((box.width/box.height)*100)/100 }; })()
    };
  })()`);
}

async function setViewport(send, width, height, scale, mobile) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile, screenWidth: width, screenHeight: height });
}

async function navigate(send, url) {
  await send("Page.navigate", { url });
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function screenshot(send, outputPath) {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  await fs.writeFile(outputPath, Buffer.from(data, "base64"));
}

async function seekVideo(evaluate, seconds) {
  return evaluate(`(async () => {
    const video = document.querySelector('#lessonVideo');
    if (!video) throw new Error('Lesson video not found.');
    video.preload = 'auto';
    if (!video.dataset.qaSeekable) {
      const source = video.currentSrc || video.querySelector('source')?.src;
      const response = await fetch(source);
      if (!response.ok) throw new Error('Could not load lesson video for timestamp QA.');
      video.src = URL.createObjectURL(await response.blob());
      video.dataset.qaSeekable = 'true';
      video.load();
    }
    if (!(Number.isFinite(video.duration) && video.duration > 0)) {
      video.load();
      await new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', resolve, { once: true });
        video.addEventListener('error', () => reject(new Error('Video metadata failed.')), { once: true });
      });
    }
    video.currentTime = Math.min(${seconds}, Math.max(0, video.duration - 0.25));
    if (video.seeking) await new Promise((resolve) => video.addEventListener('seeked', resolve, { once: true }));
    document.querySelector('#videoStartButton').hidden = true;
    video.dispatchEvent(new Event('timeupdate'));
    await new Promise((resolve) => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        resolve();
      };
      setTimeout(finish, 1000);
      if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(finish);
    });
    return { currentTime: video.currentTime, duration: video.duration };
  })()`);
}

async function waitFor(predicate, timeout = 10000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await predicate()) return true;
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  return false;
}

async function waitForChrome() {
  const started = Date.now();
  while (Date.now() - started < 10000) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error("Chrome remote debugging did not start.");
}

async function createTab(url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`Could not open Chrome tab (${response.status}).`);
  return response.json();
}

function timeoutAfter(milliseconds, message) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), milliseconds));
}
