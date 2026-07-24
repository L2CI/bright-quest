(() => {
  "use strict";

  const RELEASE = "physics-101-kinetic-lab-006";
  const ASSET_VERSION = "20260723a";
  const COURSE_URL = `./data/physics-101-course.json?v=${ASSET_VERSION}`;
  const TIMELINE_URL = `./assets/timelines/chapter-01.json?v=${ASSET_VERSION}`;
  const PROGRESS_KEY = "brightQuestPhysics101ProgressV1";
  const PROFILES_KEY = "brightQuestProfilesV2";
  const COURSE_ID = "physics-101-advanced-grade-4";
  const CHAPTER_ID = "force-is-an-interaction";

  const elements = {
    app: document.querySelector(".physics-app"),
    progress: document.querySelector("#courseProgress"),
    courseMap: document.querySelector("#courseMap"),
    chapterGrid: document.querySelector("#chapterGrid"),
    lessonStage: document.querySelector("#lessonStage"),
    courseStart: document.querySelector("#courseStartButton"),
    courseMapButton: document.querySelector("#courseMapButton"),
    backToMap: document.querySelector("#backToMapButton"),
    video: document.querySelector("#lessonVideo"),
    videoStart: document.querySelector("#videoStartButton"),
    play: document.querySelector("#playButton"),
    playIcon: document.querySelector("#playIcon"),
    playLabel: document.querySelector("#playLabel"),
    rewind: document.querySelector("#rewindButton"),
    stop: document.querySelector("#stopButton"),
    captions: document.querySelector("#ccButton"),
    captionsLabel: document.querySelector("#ccLabel"),
    captionReadout: document.querySelector("#captionReadout"),
    timeline: document.querySelector("#timeline"),
    elapsed: document.querySelector("#elapsedTime"),
    total: document.querySelector("#totalTime"),
    lessonPoint: document.querySelector("#lessonPoint"),
    lessonPrompt: document.querySelector("#lessonPrompt"),
    testStatus: document.querySelector("#testStatus"),
    testBody: document.querySelector("#testBody"),
  };

  const state = {
    course: null,
    timeline: null,
    captionsOn: false,
    progress: loadJson(PROGRESS_KEY),
    testQuestions: [],
    testIndex: 0,
    testAnswers: [],
    answerLocked: false,
    lastSavedSecond: -1,
  };

  init().catch((error) => {
    console.error(error);
    elements.testBody.innerHTML = `<p class="test-lock">The Physics workshop could not load. Please refresh and try again.</p>`;
  });

  async function init() {
    const [courseResponse, timelineResponse] = await Promise.all([
      fetch(COURSE_URL, { headers: { accept: "application/json" } }),
      fetch(TIMELINE_URL, { headers: { accept: "application/json" } }),
    ]);
    if (!courseResponse.ok || !timelineResponse.ok) throw new Error("Physics course data was unavailable.");
    state.course = await courseResponse.json();
    state.timeline = await timelineResponse.json();
    mergeProfileProgress();
    renderCourseMap();
    renderProgress();
    wireControls();
    updateLessonCue(0);
    renderTest();

    const params = new URLSearchParams(location.search);
    if (params.get("chapter") === "1" || params.get("view") === "lesson") showPlayer(false);
    console.info(`Physics 101 loaded: ${RELEASE}`);
  }

  function wireControls() {
    elements.courseStart.addEventListener("click", () => showPlayer(true));
    elements.courseMapButton.addEventListener("click", showMap);
    elements.backToMap.addEventListener("click", showMap);
    elements.videoStart.addEventListener("click", playVideo);
    elements.play.addEventListener("click", () => elements.video.paused ? playVideo() : elements.video.pause());
    elements.rewind.addEventListener("click", () => {
      elements.video.currentTime = Math.max(0, elements.video.currentTime - 15);
      elements.videoStart.hidden = true;
    });
    elements.stop.addEventListener("click", () => {
      elements.video.pause();
      elements.video.currentTime = 0;
      elements.videoStart.hidden = false;
      setPlayState("play");
    });
    elements.captions.addEventListener("click", toggleCaptions);
    elements.timeline.addEventListener("input", () => {
      if (Number.isFinite(elements.video.duration)) {
        elements.video.currentTime = (Number(elements.timeline.value) / 100) * elements.video.duration;
        elements.videoStart.hidden = true;
      }
    });
    elements.video.addEventListener("loadedmetadata", updateTimeline);
    elements.video.addEventListener("timeupdate", onTimeUpdate);
    elements.video.addEventListener("play", () => {
      elements.videoStart.hidden = true;
      setPlayState("pause");
    });
    elements.video.addEventListener("pause", () => {
      const resumable = elements.video.currentTime > 0 && elements.video.currentTime < (elements.video.duration || Infinity);
      setPlayState(resumable ? "resume" : "play");
    });
    elements.video.addEventListener("ended", () => {
      markChapterComplete();
      setPlayState("replay");
    });
    elements.video.textTracks?.[0]?.addEventListener?.("cuechange", updateCaptionReadout);
  }

  function showPlayer(shouldPlay) {
    elements.app.classList.remove("landing-view");
    elements.app.classList.add("player-view");
    history.replaceState(null, "", buildUrl({ chapter: "1" }));
    requestAnimationFrame(() => elements.lessonStage.scrollIntoView({ block: "start" }));
    if (shouldPlay) playVideo();
  }

  function showMap() {
    elements.video.pause();
    elements.app.classList.remove("player-view");
    elements.app.classList.add("landing-view");
    history.replaceState(null, "", buildUrl({}));
    requestAnimationFrame(() => elements.courseMap.scrollIntoView({ block: "start" }));
  }

  function buildUrl(extra) {
    const url = new URL(location.href);
    const profileId = url.searchParams.get("profileId");
    url.search = "";
    if (profileId) url.searchParams.set("profileId", profileId);
    Object.entries(extra).forEach(([key, value]) => url.searchParams.set(key, value));
    return `${url.pathname}${url.search}`;
  }

  function playVideo() {
    elements.video.play().catch(() => {});
  }

  function setPlayState(mode) {
    const modes = {
      play: ["▶", "Play"],
      pause: ["Ⅱ", "Pause"],
      resume: ["▶", "Resume"],
      replay: ["↻", "Replay"],
    };
    const [icon, label] = modes[mode] || modes.play;
    elements.playIcon.textContent = icon;
    elements.playLabel.textContent = label;
  }

  function toggleCaptions() {
    state.captionsOn = !state.captionsOn;
    elements.captions.setAttribute("aria-pressed", String(state.captionsOn));
    elements.captionsLabel.textContent = state.captionsOn ? "Captions on" : "Captions off";
    [...elements.video.textTracks].forEach((track) => { track.mode = state.captionsOn ? "hidden" : "disabled"; });
    elements.captionReadout.hidden = !state.captionsOn;
    updateCaptionReadout();
  }

  function updateCaptionReadout() {
    if (!state.captionsOn) return;
    const cue = elements.video.textTracks?.[0]?.activeCues?.[0];
    elements.captionReadout.textContent = cue?.text || "Captions are on.";
  }

  function onTimeUpdate() {
    updateTimeline();
    updateLessonCue(elements.video.currentTime);
    const progress = chapterProgress();
    progress.watchedSeconds = Math.max(progress.watchedSeconds || 0, elements.video.currentTime || 0);
    const second = Math.floor(elements.video.currentTime || 0);
    if (second !== state.lastSavedSecond && second % 5 === 0) {
      state.lastSavedSecond = second;
      saveProgress(false);
    }
    const duration = elements.video.duration || state.timeline?.duration || 180;
    if (!progress.completed && duration > 0 && progress.watchedSeconds >= duration * 0.95) markChapterComplete();
  }

  function updateTimeline() {
    const duration = elements.video.duration || state.timeline?.duration || 180;
    const current = elements.video.currentTime || 0;
    elements.timeline.value = String(duration ? (current / duration) * 100 : 0);
    elements.elapsed.textContent = `${formatTime(current)} elapsed`;
    elements.total.textContent = `${formatTime(duration)} total`;
  }

  function updateLessonCue(seconds) {
    if (!state.timeline?.cues?.length) return;
    const cue = [...state.timeline.cues].reverse().find((entry) => seconds >= entry.start) || state.timeline.cues[0];
    if (elements.lessonPoint.dataset.cue === cue.id) return;
    elements.lessonPoint.dataset.cue = cue.id;
    elements.lessonPoint.textContent = cue.title;
    elements.lessonPrompt.textContent = cuePrompt(cue.id);
  }

  function cuePrompt(id) {
    return {
      mystery: "Which two objects are interacting, and what changes?",
      interaction: "A complete force explanation names both objects.",
      arrows: "Read each arrow as: object on object.",
      "motion-evidence": "Compare the motion before and after contact.",
      "force-does-not-ride": "When contact ends, that contact force ends too.",
      "push-or-pull": "Push or pull: can you name the object pair?",
      "non-contact": "A visible gap is evidence that the objects do not touch.",
      classification: "Name the pair, check for touch, then classify.",
      "fair-evidence": "Keep the cart and surface the same; change only the push.",
      transfer: "Replace stored-force language with an exact interaction.",
      challenge: "Build a claim from the gap and the change in motion.",
      exit: "Pair. Touch. Motion evidence. You are ready.",
    }[id] || "Follow the evidence in the workshop.";
  }

  function markChapterComplete() {
    const progress = chapterProgress();
    if (!progress.completed) {
      progress.completed = true;
      progress.completedAt = new Date().toISOString();
      progress.watchedSeconds = Math.max(progress.watchedSeconds || 0, elements.video.duration || state.timeline?.duration || 180);
      saveProgress(true);
    }
    renderProgress();
    renderCourseMap();
    renderTest();
  }

  function renderCourseMap() {
    const completed = chapterProgress().completed;
    elements.chapterGrid.innerHTML = state.course.chapters.map((chapter) => {
      const available = Boolean(chapter.available);
      const stateCopy = available ? (completed ? "Lesson complete · test ready" : "Ready now") : "In production";
      return `
        <button class="chapter-card ${available ? "available" : "locked"}" type="button" ${available ? "data-open-chapter=\"1\"" : "disabled"}>
          <span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span>
          <strong>${escapeHtml(chapter.title)}</strong>
          <p>${escapeHtml(chapter.learningOutcome)}</p>
          <span class="chapter-state">${stateCopy}</span>
        </button>
      `;
    }).join("");
    elements.chapterGrid.querySelector("[data-open-chapter]")?.addEventListener("click", () => showPlayer(false));
  }

  function renderProgress() {
    elements.progress.textContent = chapterProgress().completed ? "1/1" : "0/1";
  }

  function renderTest() {
    const progress = chapterProgress();
    if (!progress.completed) {
      elements.testStatus.className = "status-pill";
      elements.testStatus.textContent = "Locked";
      elements.testBody.innerHTML = `<p class="test-lock">Watch at least 95% of the investigation. The test unlocks automatically, so the questions follow the evidence you have just seen.</p>`;
      return;
    }

    elements.testStatus.className = "status-pill ready";
    elements.testStatus.textContent = progress.test ? `Best ${progress.bestScore || progress.test.score}/10` : "Ready";
    if (!state.testQuestions.length) {
      const previous = progress.test;
      elements.testBody.innerHTML = `
        ${previous ? `<p class="result-score">${previous.score}/10</p><p class="result-copy">Latest attempt saved ${formatDate(previous.submittedAt)}. Your best score is ${progress.bestScore || previous.score}/10.</p>` : `<p class="test-lock">Ten questions, one at a time. Each answer asks you to identify the interaction and use evidence—not just recall a label.</p>`}
        <button class="primary-button test-action" id="beginTestButton" type="button"><span>${previous ? "Try a fresh version" : "Begin Cockpit Check"}</span><span aria-hidden="true">→</span></button>
      `;
      document.querySelector("#beginTestButton")?.addEventListener("click", beginTest);
      return;
    }

    if (state.testIndex >= state.testQuestions.length) {
      renderResult();
      return;
    }
    renderQuestion();
  }

  function beginTest() {
    const attempts = Number(chapterProgress().attempts) || 0;
    const chapter = state.course.chapters[0];
    state.testQuestions = Array.from({ length: 10 }, (_, offset) => {
      const slot = offset + 1;
      const candidates = chapter.tests.filter((question) => question.slot === slot);
      const selected = candidates[(attempts + slot) % candidates.length];
      const shift = (attempts + slot) % selected.options.length;
      return {
        ...selected,
        options: selected.options.slice(shift).concat(selected.options.slice(0, shift)),
        answer: (selected.answer - shift + selected.options.length) % selected.options.length,
      };
    });
    state.testIndex = 0;
    state.testAnswers = [];
    state.answerLocked = false;
    renderTest();
  }

  function renderQuestion() {
    const question = state.testQuestions[state.testIndex];
    elements.testBody.innerHTML = `
      <div class="test-progress"><span>Question ${state.testIndex + 1} of ${state.testQuestions.length}</span><span>${state.testAnswers.filter((answer) => answer.correct).length} correct</span></div>
      <h4 class="question-prompt">${escapeHtml(question.prompt)}</h4>
      <div class="answer-list">${question.options.map((option, index) => `<button class="answer-button" type="button" data-answer="${index}">${String.fromCharCode(65 + index)}. ${escapeHtml(option)}</button>`).join("")}</div>
      <div id="questionFeedback" aria-live="polite"></div>
    `;
    elements.testBody.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer)));
    });
  }

  function answerQuestion(selected) {
    if (state.answerLocked) return;
    state.answerLocked = true;
    const question = state.testQuestions[state.testIndex];
    const correct = selected === question.answer;
    state.testAnswers.push({
      slot: question.slot,
      variant: question.variant,
      concept: question.concept,
      prompt: question.prompt,
      selected: question.options[selected],
      correctAnswer: question.options[question.answer],
      correct,
      feedback: question.feedback,
    });
    elements.testBody.querySelectorAll("[data-answer]").forEach((button) => {
      button.disabled = true;
      const answer = Number(button.dataset.answer);
      if (answer === question.answer) button.style.borderColor = "#2d9c72";
      if (answer === selected && !correct) button.style.borderColor = "#c53d3d";
    });
    const feedback = document.querySelector("#questionFeedback");
    feedback.innerHTML = `<p class="test-feedback ${correct ? "" : "wrong"}"><strong>${correct ? "Evidence matched." : "Not quite."}</strong> ${escapeHtml(question.feedback)}</p><button class="primary-button test-action" id="nextQuestionButton" type="button"><span>${state.testIndex === 9 ? "See result" : "Next question"}</span><span aria-hidden="true">→</span></button>`;
    document.querySelector("#nextQuestionButton")?.addEventListener("click", () => {
      state.testIndex += 1;
      state.answerLocked = false;
      if (state.testIndex >= state.testQuestions.length) submitTest();
      else renderTest();
    });
  }

  function submitTest() {
    const progress = chapterProgress();
    const score = state.testAnswers.filter((answer) => answer.correct).length;
    progress.attempts = (Number(progress.attempts) || 0) + 1;
    progress.bestScore = Math.max(Number(progress.bestScore) || 0, score);
    progress.test = {
      score,
      total: state.testAnswers.length,
      submittedAt: new Date().toISOString(),
      attempt: progress.attempts,
      answers: state.testAnswers,
    };
    saveProgress(true);
    renderProgress();
    renderTest();
  }

  function renderResult() {
    const result = chapterProgress().test;
    const missed = result.answers.filter((answer) => !answer.correct);
    elements.testStatus.textContent = `Best ${chapterProgress().bestScore}/10`;
    elements.testBody.innerHTML = `
      <p class="result-score">${result.score}/10</p>
      <p class="result-copy">${result.score >= 8 ? "Strong evidence reasoning." : "Good investigation—review the evidence and try a fresh version."}</p>
      ${missed.length ? `<ul class="missed-list">${missed.map((answer) => `<li><strong>${escapeHtml(answer.concept.replaceAll("-", " "))}:</strong> ${escapeHtml(answer.feedback)}</li>`).join("")}</ul>` : `<p class="test-feedback"><strong>Complete result.</strong> Every explanation matched the evidence.</p>`}
      <button class="primary-button test-action" id="retakeTestButton" type="button"><span>Try a fresh version</span><span aria-hidden="true">↻</span></button>
    `;
    document.querySelector("#retakeTestButton")?.addEventListener("click", () => {
      state.testQuestions = [];
      beginTest();
    });
  }

  function chapterProgress() {
    const profileId = currentProfileId();
    state.progress[profileId] ||= { courseId: COURSE_ID, chapters: {} };
    state.progress[profileId].chapters ||= {};
    state.progress[profileId].chapters[CHAPTER_ID] ||= { watchedSeconds: 0, completed: false, test: null, bestScore: 0, attempts: 0 };
    return state.progress[profileId].chapters[CHAPTER_ID];
  }

  function mergeProfileProgress() {
    const profileId = currentProfileId();
    const profile = loadJson(PROFILES_KEY)[profileId];
    const remote = profile?.physics101Progress?.chapters?.[CHAPTER_ID];
    if (!remote) return;
    const local = chapterProgress();
    const localTestAt = Date.parse(local.test?.submittedAt || "") || 0;
    const remoteTestAt = Date.parse(remote.test?.submittedAt || "") || 0;
    Object.assign(local, {
      watchedSeconds: Math.max(Number(local.watchedSeconds) || 0, Number(remote.watchedSeconds) || 0),
      completed: Boolean(local.completed || remote.completed),
      completedAt: latestIso(local.completedAt, remote.completedAt),
      bestScore: Math.max(Number(local.bestScore) || 0, Number(remote.bestScore) || 0, Number(remote.test?.score) || 0),
      attempts: Math.max(Number(local.attempts) || 0, Number(remote.attempts) || 0),
      test: remoteTestAt > localTestAt ? remote.test : local.test,
    });
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
  }

  function saveProgress(syncProfile) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress));
    const profileId = currentProfileId();
    const profiles = loadJson(PROFILES_KEY);
    const profile = profiles[profileId];
    if (!profile) return;
    profile.physics101Progress ||= { courseId: COURSE_ID, chapters: {} };
    profile.physics101Progress.chapters ||= {};
    profile.physics101Progress.chapters[CHAPTER_ID] = JSON.parse(JSON.stringify(chapterProgress()));
    profile.trainingCompleted ||= {};
    if (chapterProgress().completed) {
      profile.trainingCompleted[`${COURSE_ID}:${CHAPTER_ID}`] = {
        date: chapterProgress().completedAt || new Date().toISOString(),
        count: 1,
        title: "Force Is An Interaction",
        source: "Physics 101: Advanced Grade 4",
      };
    }
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    if (!syncProfile) return;
    fetch("/api/profiles", {
      method: "POST",
      headers: capabilityHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({ profile }),
    }).catch(() => {});
  }

  function capabilityHeaders(base) {
    const headers = { ...base };
    try {
      const parent = sessionStorage.getItem("brightQuestParentCapability");
      const child = sessionStorage.getItem("brightQuestChildCapability");
      if (parent) headers["x-bq-parent-capability"] = parent;
      if (child) headers["x-bq-child-capability"] = child;
    } catch {
      // Local progress remains available.
    }
    return headers;
  }

  function currentProfileId() {
    const requested = new URLSearchParams(location.search).get("profileId");
    if (requested) return requested;
    const active = localStorage.getItem("brightQuestActiveProfile");
    if (active) return active;
    const ids = Object.keys(loadJson(PROFILES_KEY));
    return ids.length === 1 ? ids[0] : "demo-student";
  }

  function loadJson(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch { return {}; }
  }

  function latestIso(first, second) {
    if (!first) return second || null;
    if (!second) return first;
    return Date.parse(first) >= Date.parse(second) ? first : second;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.round(Number(seconds) || 0));
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
  }

  function formatDate(value) {
    if (!value) return "recently";
    return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short" }).format(new Date(value));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" })[character]);
  }
})();
