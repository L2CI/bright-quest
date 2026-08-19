import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const expectedRelease = "physics-101-cinematic-lab-011";
const chapterNumbers = [1, 2, 3, 4, 5, 6];
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browserPath = process.env.BQ_BROWSER_PATH || chromePath;
const browserName = process.env.BQ_BROWSER_NAME || "Google Chrome headless";
const baseUrl = process.env.BQ_QA_BASE_URL || "http://localhost:4173/physics-training/physics-101-advanced-grade-4/";
const evidenceDir = path.join(root, "outputs", "physics-101-qa");
const profileDir = path.join(evidenceDir, `chrome-profile-${Date.now()}`);
const qaProfileId = `codex-physics-qa-${Date.now()}`;
const port = 9334;
const chromeArgs = [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--mute-audio",
  "--autoplay-policy=no-user-gesture-required",
  `--remote-debugging-port=${port}`,
  "--remote-allow-origins=*",
  `--user-data-dir=${profileDir}`,
  "about:blank",
];
const mediaMuteGuard = `(() => {
  const mute = (element) => {
    if (!(element instanceof HTMLMediaElement)) return;
    element.muted = true;
    element.volume = 0;
  };
  const muteAll = () => document.querySelectorAll('audio,video').forEach(mute);
  document.addEventListener('play', (event) => mute(event.target), true);
  const install = () => {
    muteAll();
    new MutationObserver(muteAll).observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();`;

let nextId = 1;
const pending = new Map();
const events = [];
const keepAlive = setInterval(() => {}, 1000);

await fs.mkdir(evidenceDir, { recursive: true });
const chrome = spawn(browserPath, chromeArgs, { stdio: "ignore" });

try {
  console.log("[qa] waiting for muted browser");
  await waitForChrome();
  const tab = await createTab("about:blank");
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await Promise.race([
    new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    }),
    timeoutAfter(10000, "Browser WebSocket did not open."),
  ]);

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
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Browser evaluation failed");
    }
    return result.result.value;
  };

  await Promise.all([send("Page.enable"), send("Runtime.enable"), send("Log.enable"), send("Network.enable")]);
  await send("Page.addScriptToEvaluateOnNewDocument", { source: mediaMuteGuard });

  const qaUrl = withParams(baseUrl, { profileId: qaProfileId });
  const results = [];
  const buttonChecks = [];
  const audioMuteChecks = [];
  const chapterResults = [];

  await setViewport(send, 1440, 900, 1, false);
  await navigate(send, qaUrl);
  await waitForOrThrow(
    () => evaluate(`(() => {
      const landing = document.querySelector('.course-landing');
      return Boolean(landing && getComputedStyle(landing).display !== 'none' && document.querySelectorAll('.chapter-card').length === 11);
    })()`),
    "Desktop course map did not load.",
  );
  await recordMuteState(evaluate, audioMuteChecks, "desktop course map");
  const deployedMarker = await evaluate(`Boolean(document.querySelector('script[src*="${expectedRelease}"]'))`);
  if (!deployedMarker) throw new Error(`The expected ${expectedRelease} release marker is not present.`);
  await assertChapterCards(evaluate);
  results.push(await inspect(evaluate, "desktop course map"));
  await screenshot(send, path.join(evidenceDir, "desktop-course-map.png"));

  await evaluate("document.querySelector('#courseMapButton').click(); true");
  await waitForOrThrow(() => evaluate("document.querySelector('.physics-app').classList.contains('landing-view')"), "Course map button did not show the map.");
  buttonChecks.push("course map header button");

  await evaluate("document.querySelector('#courseStartButton').click(); true");
  await waitForOrThrow(
    () => evaluate("document.querySelector('.physics-app').classList.contains('player-view') && new URL(location.href).searchParams.get('chapter') === '1'"),
    "Start Chapter 1 button did not open Chapter 1.",
  );
  await recordMuteState(evaluate, audioMuteChecks, "course start auto-play");
  await evaluate("document.querySelector('#stopButton').click(); true");
  await evaluate("document.querySelector('#backToMapButton').click(); true");
  await waitForOrThrow(() => evaluate("document.querySelector('.physics-app').classList.contains('landing-view')"), "Back to map failed after the course start action.");
  buttonChecks.push("course start button", "lesson back to course map button");

  for (const chapterNumber of chapterNumbers) {
    chapterResults.push(await exerciseChapter({
      chapterNumber,
      evaluate,
      send,
      results,
      buttonChecks,
      audioMuteChecks,
    }));
  }
  assertIndependentChapterAssets(chapterResults);

  await exerciseReturnPaths({ evaluate, send, qaUrl, buttonChecks, audioMuteChecks });
  await exerciseResponsiveView({
    evaluate, send, results, audioMuteChecks,
    width: 834, height: 1194, scale: 1, mobile: true,
    chapterNumber: 2, label: "tablet",
  });
  await exerciseResponsiveView({
    evaluate, send, results, audioMuteChecks,
    width: 390, height: 844, scale: 2, mobile: true,
    chapterNumber: 3, label: "mobile",
  });
  const parentReview = await exerciseParentReview({ evaluate, send, buttonChecks });

  const browserErrors = collectBrowserErrors(events);
  const audioMuted = chromeArgs.includes("--mute-audio") &&
    audioMuteChecks.length > 0 &&
    audioMuteChecks.every((check) => check.muted);
  const visualChecksPassed = results.every((result) =>
    result.horizontalOverflow === 0 &&
    result.brokenImages === 0 &&
    result.smallPrimaryControls === 0
  );
  const report = {
    release: expectedRelease,
    browser: browserName,
    route: baseUrl,
    viewports: ["desktop 1440x900", "tablet 834x1194", "mobile 390x844"],
    deployedMarker,
    chaptersExercised: chapterNumbers,
    chapterResults,
    parentReview,
    buttonChecks,
    results,
    audioMuted,
    audioMuteEvidence: {
      chromeMuteFlag: chromeArgs.includes("--mute-audio"),
      mediaLevelChecks: audioMuteChecks,
    },
    browserErrors,
    passed: deployedMarker && audioMuted && visualChecksPassed && browserErrors.length === 0,
  };
  await fs.writeFile(path.join(evidenceDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
  ws.close();
  if (!report.passed) process.exitCode = 1;
} finally {
  clearInterval(keepAlive);
  chrome.kill();
}

async function exerciseParentReview({ evaluate, send, buttonChecks }) {
  console.log("[qa] exercising Parent Cockpit Physics review");
  const portalUrl = new URL("/", baseUrl).href + "#parent/physics";
  await setViewport(send, 1440, 900, 1, false);
  await navigate(send, portalUrl);
  await waitForOrThrow(() => evaluate("Boolean(document.querySelector('#parentScreen'))"), "Bright Quest portal did not load for Parent Cockpit QA.");
  await waitForOrThrow(
    () => evaluate("typeof renderParentDashboard !== 'undefined' && /shellMergeParentDashboard/.test(renderParentDashboard.toString())"),
    "Bright Quest parent shell did not finish loading.",
  );
  await evaluate(`(() => {
    const id = ${JSON.stringify(qaProfileId)};
    const progress = JSON.parse(localStorage.getItem('brightQuestPhysics101ProgressV1') || '{}');
    Object.values(progress[id]?.chapters || {}).forEach((chapter) => {
      if (!chapter.test?.answers?.length) return;
      chapter.test.answers[0].correct = false;
      if (chapter.test.answers[0].selected === chapter.test.answers[0].correctAnswer) {
        chapter.test.answers[0].selected = 'QA incorrect selection';
      }
      chapter.test.score = Math.min(Number(chapter.test.score) || 0, 9);
    });
    const profile = { id, name: 'Physics QA Student', physics101Progress: progress[id] || { chapters: {} }, trainingCompleted: {} };
    state.profiles[id] = profile;
    state.profileId = id;
    state.profile = profile;
    state.parentProfileId = id;
    state.selectedRole = 'parent';
    localStorage.setItem('brightQuestProfilesV2', JSON.stringify(state.profiles));
    localStorage.setItem('brightQuestActiveProfile', id);
    location.hash = 'parent/physics';
    showScreen('parent');
    renderParentDashboard();
    return true;
  })()`);
  await waitForOrThrow(
    () => evaluate("document.querySelectorAll('[data-physics-review]').length === 6"),
    "Parent Cockpit did not show review actions for all six Physics chapters.",
  );
  await evaluate("new Promise((resolve) => setTimeout(resolve, 650))");
  await screenshot(send, path.join(evidenceDir, "desktop-parent-physics.png"));
  const reviews = [];
  for (let index = 0; index < 6; index += 1) {
    await evaluate(`document.querySelectorAll('[data-physics-review]')[${index}].click(); true`);
    await waitForOrThrow(
      () => evaluate("Boolean(document.querySelector('#bqChemistryReviewPopup:not(.hidden) .bq-chem-review-modal'))"),
      `Physics parent review popup ${index + 1} did not open.`,
    );
    const review = await evaluate(`(() => {
      const popup = document.querySelector('#bqChemistryReviewPopup:not(.hidden)');
      const cards = [...popup.querySelectorAll('.bq-chem-answer-card')];
      return {
        title: popup.querySelector('h3')?.textContent?.trim() || '',
        missedCount: popup.querySelectorAll('.bq-chem-answer-card.missed').length,
        firstCardMissed: cards.length > 0 && cards[0].classList.contains('missed'),
        correctAnswersCollapsed: !popup.querySelector('.bq-chem-review-correct')?.open,
        hasSelectedAnswer: /Your answer:/.test(popup.textContent),
        hasCorrectAnswer: /Correct answer:/.test(popup.textContent),
      };
    })()`);
    if (!review.title || !review.firstCardMissed || !review.correctAnswersCollapsed || !review.hasSelectedAnswer || !review.hasCorrectAnswer) {
      throw new Error(`Physics parent review popup ${index + 1} failed wrong-answer-first QA: ${JSON.stringify(review)}`);
    }
    reviews.push(review);
    if (index === 0) await screenshot(send, path.join(evidenceDir, "desktop-parent-physics-review-popup.png"));
    await evaluate("document.querySelector('#bqChemistryReviewPopup [data-chemistry-review-close]').click(); true");
    await waitForOrThrow(
      () => evaluate("document.querySelector('#bqChemistryReviewPopup')?.classList.contains('hidden')"),
      `Physics parent review popup ${index + 1} did not close.`,
    );
  }
  buttonChecks.push("six Physics parent review popup buttons", "six Physics review close buttons");
  await evaluate("document.querySelector('[data-parent-route=\"overview\"]').click(); true");
  await waitForOrThrow(() => evaluate("location.hash === '#parent/overview'"), "Physics Parent Cockpit return button failed.");
  buttonChecks.push("Physics return to Parent Cockpit button");
  return { chapterReviewButtons: 6, reviews, returnPath: locationHashLabel("parent/overview") };
}

function locationHashLabel(value) {
  return `#${value}`;
}

async function exerciseChapter({ chapterNumber, evaluate, send, results, buttonChecks, audioMuteChecks }) {
  console.log(`[qa] exercising Chapter ${chapterNumber}`);
  await waitForOrThrow(
    () => evaluate("document.querySelector('.physics-app').classList.contains('landing-view')"),
    `Course map was not ready before Chapter ${chapterNumber}.`,
  );
  await evaluate(`(() => {
    const expected = '${padChapter(chapterNumber)}';
    const card = [...document.querySelectorAll('[data-open-chapter]')].find((candidate) =>
      candidate.querySelector('.chapter-number')?.textContent?.trim() === expected
    );
    if (!card) throw new Error('Chapter ${chapterNumber} card was not found.');
    card.click();
    return true;
  })()`);
  await waitForOrThrow(
    () => evaluate(`document.querySelector('.physics-app').classList.contains('player-view') && new URL(location.href).searchParams.get('chapter') === '${chapterNumber}'`),
    `Chapter ${chapterNumber} card did not open the correct lesson.`,
  );
  buttonChecks.push(`Chapter ${chapterNumber} card`);
  await recordMuteState(evaluate, audioMuteChecks, `Chapter ${chapterNumber} opened`);

  const identity = await inspectChapterIdentity(evaluate, chapterNumber);
  await validatePlaybackControls(evaluate, chapterNumber, buttonChecks, audioMuteChecks);
  results.push(await inspect(evaluate, `desktop Chapter ${chapterNumber} lesson`));
  await screenshot(send, path.join(evidenceDir, `desktop-chapter-${padChapter(chapterNumber)}-lesson.png`));

  const testResult = await completeChapterTest(evaluate, chapterNumber, buttonChecks);
  results.push(await inspect(evaluate, `desktop Chapter ${chapterNumber} test result`));
  await screenshot(send, path.join(evidenceDir, `desktop-chapter-${padChapter(chapterNumber)}-test-result.png`));
  await recordMuteState(evaluate, audioMuteChecks, `Chapter ${chapterNumber} test result`);
  await restoreVideoSource(evaluate);

  await evaluate("document.querySelector('#backToMapButton').click(); true");
  await waitForOrThrow(
    () => evaluate("document.querySelector('.physics-app').classList.contains('landing-view') && !new URL(location.href).searchParams.has('chapter')"),
    `Chapter ${chapterNumber} back-to-map button did not return to the course map.`,
  );
  buttonChecks.push(`Chapter ${chapterNumber} back-to-map button`);
  return { chapterNumber, ...identity, ...testResult };
}

async function inspectChapterIdentity(evaluate, chapterNumber) {
  const padded = padChapter(chapterNumber);
  const identity = await evaluate(`(async () => {
    const video = document.querySelector('#lessonVideo');
    const track = document.querySelector('#captionTrack');
    if (!video || !track) throw new Error('Chapter media elements were not found.');
    video.muted = true;
    video.volume = 0;
    video.load();
    if (!(Number.isFinite(video.duration) && video.duration > 0)) {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Video metadata timed out.')), 15000);
        video.addEventListener('loadedmetadata', () => { clearTimeout(timer); resolve(); }, { once: true });
        video.addEventListener('error', () => { clearTimeout(timer); reject(new Error('Video metadata failed.')); }, { once: true });
      });
    }
    const timelineUrl = new URL('./assets/timelines/chapter-${padded}.json', location.href).href;
    const timelineWasLoadedByPlayer = performance.getEntriesByType('resource').some((entry) =>
      entry.name.includes('/assets/timelines/chapter-${padded}.json')
    );
    const timelineResponse = await fetch(timelineUrl, { cache: 'no-store' });
    if (!timelineResponse.ok) throw new Error('Chapter ${chapterNumber} timeline returned ' + timelineResponse.status + '.');
    const timeline = await timelineResponse.json();
    const captionUrl = track.src;
    const captionResponse = await fetch(captionUrl, { cache: 'no-store' });
    if (!captionResponse.ok) throw new Error('Chapter ${chapterNumber} captions returned ' + captionResponse.status + '.');
    const captionText = await captionResponse.text();
    const cueMatches = [...captionText.matchAll(/(\\d{2}):(\\d{2}):(\\d{2}\\.\\d{3})\\s+-->\\s+(\\d{2}):(\\d{2}):(\\d{2}\\.\\d{3})/g)];
    const last = cueMatches.at(-1);
    const captionEnd = last ? Number(last[4]) * 3600 + Number(last[5]) * 60 + Number(last[6]) : 0;
    return {
      videoUrl: video.currentSrc || video.querySelector('source')?.src || '',
      captionUrl,
      timelineUrl,
      duration: video.duration,
      timelineDuration: Number(timeline.duration),
      timelineCueCount: timeline.cues?.length || 0,
      timelineSignature: (timeline.cues || []).map((cue) => cue.id).join('|'),
      activeCue: document.querySelector('#lessonPoint')?.dataset.cue || '',
      firstTimelineCue: timeline.cues?.[0]?.id || '',
      captionCueCount: cueMatches.length,
      captionEnd,
      timelineWasLoadedByPlayer,
    };
  })()`);

  const expectedVideo = `/assets/videos/chapter-${padded}.mp4`;
  const expectedCaptions = `/assets/captions/chapter-${padded}.vtt`;
  if (!new URL(identity.videoUrl).pathname.endsWith(expectedVideo)) {
    throw new Error(`Chapter ${chapterNumber} loaded the wrong video: ${identity.videoUrl}`);
  }
  if (!new URL(identity.captionUrl).pathname.endsWith(expectedCaptions)) {
    throw new Error(`Chapter ${chapterNumber} loaded the wrong captions: ${identity.captionUrl}`);
  }
  if (!identity.timelineWasLoadedByPlayer) throw new Error(`Chapter ${chapterNumber} player did not request its own timeline.`);
  if (identity.timelineCueCount < 1 || !identity.timelineSignature) throw new Error(`Chapter ${chapterNumber} timeline has no cues.`);
  if (identity.firstTimelineCue !== identity.activeCue) throw new Error(`Chapter ${chapterNumber} did not activate its first timeline cue.`);
  if (Math.abs(identity.duration - identity.timelineDuration) > 1.5) {
    throw new Error(`Chapter ${chapterNumber} video/timeline duration mismatch: ${JSON.stringify(identity)}`);
  }
  if (identity.captionCueCount < 1 || Math.abs(identity.duration - identity.captionEnd) > 2.5) {
    throw new Error(`Chapter ${chapterNumber} video/caption duration mismatch: ${JSON.stringify(identity)}`);
  }
  return identity;
}

async function validatePlaybackControls(evaluate, chapterNumber, buttonChecks, audioMuteChecks) {
  const captionsWereOn = await evaluate("document.querySelector('#ccButton').getAttribute('aria-pressed') === 'true'");
  await evaluate("document.querySelector('#ccButton').click(); true");
  await waitForOrThrow(
    () => evaluate(`document.querySelector('#ccButton').getAttribute('aria-pressed') === '${!captionsWereOn}'`),
    `Chapter ${chapterNumber} captions button did not toggle.`,
  );
  await evaluate("document.querySelector('#ccButton').click(); true");
  await waitForOrThrow(
    () => evaluate(`document.querySelector('#ccButton').getAttribute('aria-pressed') === '${captionsWereOn}'`),
    `Chapter ${chapterNumber} captions button did not return to its initial state.`,
  );
  buttonChecks.push(`Chapter ${chapterNumber} captions toggle`);

  await seekVideo(evaluate, 30);
  await evaluate("document.querySelector('#rewindButton').click(); true");
  await waitForOrThrow(
    () => evaluate("document.querySelector('#lessonVideo').currentTime <= 15.5"),
    `Chapter ${chapterNumber} rewind did not move back 15 seconds.`,
  );
  buttonChecks.push(`Chapter ${chapterNumber} rewind 15 seconds`);

  const timelineSeek = await evaluate(`(async () => {
    const video = document.querySelector('#lessonVideo');
    const timeline = document.querySelector('#timeline');
    video.pause();
    timeline.value = '50';
    timeline.dispatchEvent(new Event('input', { bubbles: true }));
    if (video.seeking) await new Promise((resolve) => video.addEventListener('seeked', resolve, { once: true }));
    return { currentTime: video.currentTime, expected: video.duration / 2 };
  })()`);
  if (Math.abs(timelineSeek.currentTime - timelineSeek.expected) >= 1) {
    throw new Error(`Chapter ${chapterNumber} timeline seek mismatch: ${JSON.stringify(timelineSeek)}`);
  }
  buttonChecks.push(`Chapter ${chapterNumber} timeline input`);

  await evaluate("document.querySelector('#stopButton').click(); true");
  await waitForOrThrow(
    () => evaluate("document.querySelector('#lessonVideo').currentTime < 0.5 && !document.querySelector('#videoStartButton').hidden"),
    `Chapter ${chapterNumber} stop button did not reset playback.`,
  );
  buttonChecks.push(`Chapter ${chapterNumber} stop button`);

  await evaluate("document.querySelector('#videoStartButton').click(); true");
  await waitForOrThrow(
    () => evaluate("document.querySelector('#videoStartButton').hidden && !document.querySelector('#lessonVideo').paused"),
    `Chapter ${chapterNumber} start overlay did not play the video.`,
  );
  await recordMuteState(evaluate, audioMuteChecks, `Chapter ${chapterNumber} playing`);
  buttonChecks.push(`Chapter ${chapterNumber} video start button`);

  await evaluate("document.querySelector('#playButton').click(); true");
  await waitForOrThrow(() => evaluate("document.querySelector('#lessonVideo').paused"), `Chapter ${chapterNumber} play control did not pause.`);
  await evaluate("document.querySelector('#playButton').click(); true");
  await waitForOrThrow(() => evaluate("!document.querySelector('#lessonVideo').paused"), `Chapter ${chapterNumber} play control did not resume.`);
  await recordMuteState(evaluate, audioMuteChecks, `Chapter ${chapterNumber} resumed`);
  await evaluate("document.querySelector('#stopButton').click(); true");
  buttonChecks.push(`Chapter ${chapterNumber} play/pause/resume`);
}

async function completeChapterTest(evaluate, chapterNumber, buttonChecks) {
  await seekVideo(evaluate, 99999);
  await evaluate(`(() => {
    const video = document.querySelector('#lessonVideo');
    video.dispatchEvent(new Event('timeupdate'));
    video.dispatchEvent(new Event('ended'));
    return true;
  })()`);
  await waitForOrThrow(
    () => evaluate("/Ready|Best/.test(document.querySelector('#testStatus')?.textContent || '')"),
    `Chapter ${chapterNumber} test did not unlock.`,
  );
  await waitForOrThrow(
    () => evaluate("Boolean(document.querySelector('#beginTestButton, #retakeTestButton'))"),
    `Chapter ${chapterNumber} test action was not rendered.`,
  );
  await evaluate("document.querySelector('#beginTestButton, #retakeTestButton').click(); true");
  const firstPrompt = await answerTenQuestions(evaluate, chapterNumber);
  await waitForOrThrow(
    () => evaluate("Boolean(document.querySelector('.result-score'))"),
    `Chapter ${chapterNumber} test result did not render.`,
  );
  const result = await evaluate(`(() => ({
    score: document.querySelector('.result-score')?.textContent?.trim() || '',
    status: document.querySelector('#testStatus')?.textContent?.trim() || '',
    missedCount: document.querySelectorAll('.missed-list li').length,
  }))()`);
  if (!/^\d+\/10$/.test(result.score)) throw new Error(`Chapter ${chapterNumber} test did not report a score out of 10.`);
  buttonChecks.push(`Chapter ${chapterNumber} ten answers and next-question buttons`);

  await evaluate("document.querySelector('#retakeTestButton').click(); true");
  await waitForOrThrow(
    () => evaluate("Boolean(document.querySelector('[data-answer]')) && /Question 1 of 10/.test(document.querySelector('.test-progress')?.textContent || '')"),
    `Chapter ${chapterNumber} retake did not start at Question 1.`,
  );
  const retakePrompt = await evaluate("document.querySelector('.question-prompt')?.textContent?.trim() || ''");
  if (!retakePrompt) throw new Error(`Chapter ${chapterNumber} retake question was blank.`);
  buttonChecks.push(`Chapter ${chapterNumber} retake button`);
  return {
    testScore: result.score,
    missedCount: result.missedCount,
    firstPrompt,
    retakePrompt,
    retakeStarted: true,
  };
}

async function answerTenQuestions(evaluate, chapterNumber) {
  let firstPrompt = "";
  for (let index = 0; index < 10; index += 1) {
    await waitForOrThrow(
      () => evaluate("Boolean(document.querySelector('[data-answer]'))"),
      `Chapter ${chapterNumber} Question ${index + 1} did not render.`,
    );
    if (index === 0) firstPrompt = await evaluate("document.querySelector('.question-prompt')?.textContent?.trim() || ''");
    await evaluate("document.querySelector('[data-answer]').click(); true");
    await waitForOrThrow(
      () => evaluate("Boolean(document.querySelector('#nextQuestionButton'))"),
      `Chapter ${chapterNumber} Question ${index + 1} did not show feedback/next.`,
    );
    await evaluate("document.querySelector('#nextQuestionButton').click(); true");
  }
  return firstPrompt;
}

function assertIndependentChapterAssets(chapterResults) {
  const checks = [
    ["videoUrl", "video sources"],
    ["captionUrl", "caption sources"],
    ["timelineUrl", "timeline sources"],
    ["timelineSignature", "timeline cue sets"],
  ];
  for (const [key, label] of checks) {
    if (new Set(chapterResults.map((result) => result[key])).size !== chapterNumbers.length) {
      throw new Error(`Chapters 1-6 do not have independent ${label}.`);
    }
  }
}

async function exerciseReturnPaths({ evaluate, send, qaUrl, buttonChecks, audioMuteChecks }) {
  await waitForOrThrow(
    () => evaluate("document.querySelector('.physics-app').classList.contains('landing-view')"),
    "Course map was not visible before return-link QA.",
  );
  const returnCount = await evaluate("document.querySelectorAll('a[href=\"../../\"]').length");
  if (returnCount !== 2) throw new Error(`Expected two Bright Quest return links, found ${returnCount}.`);

  for (let index = 0; index < returnCount; index += 1) {
    await evaluate(`document.querySelectorAll('a[href="../../"]')[${index}].click(); true`);
    await waitForOrThrow(() => evaluate("location.pathname === '/'"), `Bright Quest return link ${index + 1} did not reach the portal root.`);
    buttonChecks.push(index === 0 ? "Bright Quest brand return link" : "Back to Bright Quest return link");
    await evaluate("history.back(); true");
    await waitForOrThrow(
      () => evaluate("location.pathname.includes('/physics-training/physics-101-advanced-grade-4/')"),
      `Browser Back did not return from portal link ${index + 1}.`,
    );
    await waitForOrThrow(() => evaluate("Boolean(document.querySelector('.physics-app'))"), `Physics app did not restore after browser Back ${index + 1}.`);
    await recordMuteState(evaluate, audioMuteChecks, `browser Back from return link ${index + 1}`);
    buttonChecks.push(`browser Back from return link ${index + 1}`);
  }

  await navigate(send, qaUrl);
  await waitForOrThrow(() => evaluate("Boolean(document.querySelector('.course-landing'))"), "Course map did not recover after return-path QA.");
}

async function exerciseResponsiveView({ evaluate, send, results, audioMuteChecks, width, height, scale, mobile, chapterNumber, label }) {
  await setViewport(send, width, height, scale, mobile);
  const responsiveUrl = withParams(baseUrl, { profileId: qaProfileId, chapter: chapterNumber });
  await navigate(send, responsiveUrl);
  await waitForOrThrow(
    () => evaluate(`document.querySelector('.physics-app').classList.contains('player-view') && new URL(location.href).searchParams.get('chapter') === '${chapterNumber}'`),
    `${label} Chapter ${chapterNumber} lesson did not load.`,
  );
  await recordMuteState(evaluate, audioMuteChecks, `${label} Chapter ${chapterNumber}`);
  results.push(await inspect(evaluate, `${label} Chapter ${chapterNumber} lesson`));
  await screenshot(send, path.join(evidenceDir, `${label}-chapter-${padChapter(chapterNumber)}-lesson.png`));

  await evaluate("document.querySelector('#backToMapButton').click(); true");
  await waitForOrThrow(() => evaluate("document.querySelector('.physics-app').classList.contains('landing-view')"), `${label} back-to-map path failed.`);
  await assertChapterCards(evaluate);
  results.push(await inspect(evaluate, `${label} course map`));
  await screenshot(send, path.join(evidenceDir, `${label}-course-map.png`));
}

async function assertChapterCards(evaluate) {
  const cards = await evaluate(`(() => [...document.querySelectorAll('.chapter-card')].map((card) => ({
    chapter: Number(card.querySelector('.chapter-number')?.textContent || 0),
    chapterId: card.dataset.openChapter || '',
    disabled: card.disabled,
    visible: getComputedStyle(card).display !== 'none' && card.getBoundingClientRect().width > 0 && card.getBoundingClientRect().height > 0,
  })))()`);
  for (const chapterNumber of chapterNumbers) {
    const card = cards.find((candidate) => candidate.chapter === chapterNumber);
    if (!card || !card.chapterId || card.disabled || !card.visible) {
      throw new Error(`Chapter ${chapterNumber} card is not available and clickable.`);
    }
  }
}

async function recordMuteState(evaluate, checks, label) {
  const state = await muteMedia(evaluate);
  checks.push({ label, mediaCount: state.mediaCount, muted: state.muted });
  if (!state.muted) throw new Error(`Media was not muted during ${label}.`);
}

async function inspect(evaluate, label) {
  return evaluate(`(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0;
    };
    const controls = [...document.querySelectorAll('button,a')].filter(visible);
    const small = controls.filter((element) => {
      const box = element.getBoundingClientRect();
      return box.height < 44 || box.width < 44;
    }).map((element) => ({
      text: element.textContent.trim().slice(0, 60),
      width: Math.round(element.getBoundingClientRect().width),
      height: Math.round(element.getBoundingClientRect().height),
    }));
    const images = [...document.images];
    return {
      label: ${JSON.stringify(label)},
      viewport: { width: innerWidth, height: innerHeight },
      horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      brokenImages: images.filter((image) => !image.complete || image.naturalWidth === 0).length,
      smallPrimaryControls: small.length,
      smallControls: small,
      headings: [...document.querySelectorAll('h1,h2,h3')].filter(visible).map((heading) => heading.textContent.trim()),
      videoBox: (() => {
        const video = document.querySelector('video');
        if (!video || !visible(video)) return null;
        const box = video.getBoundingClientRect();
        return {
          width: Math.round(box.width),
          height: Math.round(box.height),
          ratio: Math.round((box.width / box.height) * 100) / 100,
        };
      })(),
    };
  })()`);
}

async function setViewport(send, width, height, scale, mobile) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: scale,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
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
    video.muted = true;
    video.volume = 0;
    video.preload = 'auto';
    if (!video.dataset.qaSeekable) {
      const source = video.currentSrc || video.querySelector('source')?.src;
      const response = await fetch(source);
      if (!response.ok) throw new Error('Could not load lesson video for timestamp QA.');
      video.dataset.qaObjectUrl = URL.createObjectURL(await response.blob());
      video.src = video.dataset.qaObjectUrl;
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
    video.muted = true;
    video.volume = 0;
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

async function restoreVideoSource(evaluate) {
  await evaluate(`(() => {
    const video = document.querySelector('#lessonVideo');
    if (!video?.dataset.qaSeekable) return true;
    video.pause();
    video.removeAttribute('src');
    if (video.dataset.qaObjectUrl) URL.revokeObjectURL(video.dataset.qaObjectUrl);
    delete video.dataset.qaObjectUrl;
    delete video.dataset.qaSeekable;
    video.load();
    video.muted = true;
    video.volume = 0;
    return true;
  })()`);
}

async function muteMedia(evaluate) {
  return evaluate(`(() => {
    const media = [...document.querySelectorAll('audio,video')];
    media.forEach((element) => {
      element.muted = true;
      element.volume = 0;
    });
    return {
      mediaCount: media.length,
      muted: media.every((element) => element.muted && element.volume === 0),
    };
  })()`);
}

function collectBrowserErrors(browserEvents) {
  return browserEvents.filter((event) => {
    const url = event.params?.response?.url || event.params?.entry?.url || "";
    const expectedStaticFallback = /^https?:\/\/(localhost|127\.0\.0\.1):\d+\/api\/(profiles|auth\/config)$/.test(url);
    if (expectedStaticFallback) return false;
    return (
    event.method === "Runtime.exceptionThrown" ||
    event.method === "Log.entryAdded" && ["error", "warning"].includes(event.params?.entry?.level) ||
    event.method === "Network.loadingFailed" && !event.params?.canceled ||
    event.method === "Network.responseReceived" && event.params?.response?.status >= 400
    );
  }).map((event) => ({ method: event.method, params: event.params }));
}

function withParams(url, params) {
  const result = new URL(url);
  for (const [key, value] of Object.entries(params)) result.searchParams.set(key, String(value));
  return result.toString();
}

function padChapter(chapterNumber) {
  return String(chapterNumber).padStart(2, "0");
}

async function waitForOrThrow(predicate, message, timeout = 10000) {
  if (!await waitFor(predicate, timeout)) throw new Error(message);
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
