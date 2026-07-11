(() => {
  const ASSET_VERSION = "20260711a";
  const COURSE_URL = `./data/chemistry-101-course.json?v=${ASSET_VERSION}`;
  const RELEASE = "chemistry-101-winter-2026-007";
  const withAssetVersion = (url) => `${url}?v=${ASSET_VERSION}`;
  const progressKey = "brightQuestChemistry101ProgressV1";
  const profilesKey = "brightQuestProfilesV2";
  const chapterIconNames = ["beaker", "tile", "particles", "filter", "fizz", "tile", "beaker", "particles", "fizz", "filter", "beaker"];
  const runtimeSeconds = {
    "hidden-code": 269,
    "periodic-map": 209,
    "particle-states": 255,
    "mixtures-separation": 248,
    "chemical-clues": 244,
    "mystery-of-stuff": 339,
    "solid-liquid-gas": 324,
    "tiny-particles-big-clues": 329,
    "heat-particles-dance": 321,
    "melting-not-disappearing": 314,
    "dissolving-not-melting": 344
  };

  const els = {
    app: document.querySelector(".chem-app"),
    tabs: document.querySelector("#chapterTabs"),
    map: document.querySelector("#chapterMap"),
    progress: document.querySelector("#courseProgress"),
    count: document.querySelector("#chapterCount"),
    title: document.querySelector("#chapterTitle"),
    duration: document.querySelector("#chapterDuration"),
    point: document.querySelector("#lessonPoint"),
    video: document.querySelector("#lessonVideo"),
    source: document.querySelector("#videoSource"),
    captionTrack: document.querySelector("#captionTrack"),
    cc: document.querySelector("#ccButton"),
    captionReadout: document.querySelector("#captionReadout"),
    courseStart: document.querySelector("#courseStartButton"),
    courseMapButton: document.querySelector("#courseMapButton"),
    headerStart: document.querySelector("#headerStartButton"),
    headerCards: document.querySelector("#headerCardsButton"),
    play: document.querySelector("#playButton"),
    rewind: document.querySelector("#rewindButton"),
    stop: document.querySelector("#stopButton"),
    timeline: document.querySelector("#timeline"),
    elapsed: document.querySelector("#elapsedTime"),
    total: document.querySelector("#totalTime"),
    testPanel: document.querySelector("#testPanel"),
    testStatus: document.querySelector("#testStatus")
  };

  const state = {
    course: null,
    activeIndex: 0,
    ccOn: false,
    seeking: false,
    progress: loadProgress()
  };

  init();

  async function init() {
    const response = await fetch(COURSE_URL, { headers: { accept: "application/json" } });
    state.course = await response.json();
    state.course.chapters.forEach((chapter, index) => {
      const n = String(index + 1).padStart(2, "0");
      chapter.number = index + 1;
      chapter.video = withAssetVersion(`./assets/videos/chapter-${n}.mp4`);
      chapter.audio = withAssetVersion(`./assets/audio/chapter-${n}-teacher.mp3`);
      chapter.captions = withAssetVersion(`./assets/captions/chapter-${n}.vtt`);
      chapter.poster = withAssetVersion(`./assets/posters/chapter-${n}.jpg`);
    });

    renderTabs();
    renderMap();
    wireControls();
    loadChapter(0);
    showLanding(false);
    console.info(`Chemistry 101 loaded: ${RELEASE}`);
  }

  function currentProfileId() {
    const urlProfile = new URLSearchParams(location.search).get("profileId");
    if (urlProfile) return urlProfile;
    const active = localStorage.getItem("brightQuestActiveProfile");
    if (active) return active;
    const profiles = loadProfiles();
    const ids = Object.keys(profiles);
    return ids.length === 1 ? ids[0] : "demo-student";
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(progressKey)) || {};
    } catch {
      return {};
    }
  }

  function saveProgress() {
    localStorage.setItem(progressKey, JSON.stringify(state.progress));
  }

  function loadProfiles() {
    try {
      return JSON.parse(localStorage.getItem(profilesKey)) || {};
    } catch {
      return {};
    }
  }

  function profileProgress() {
    const id = currentProfileId();
    if (!state.progress[id]) state.progress[id] = { courseId: "chemistry-101-winter-2026", chapters: {} };
    preserveLegacyDemoProgress(id);
    return state.progress[id];
  }

  function preserveLegacyDemoProgress(id) {
    if (id === "demo-student") return;
    const active = state.progress[id];
    const legacy = state.progress["demo-student"];
    if (!active || !legacy?.chapters) return;
    if (Object.keys(active.chapters || {}).length) return;
    active.chapters = { ...legacy.chapters };
    active.migratedFromDemoStudentAt ||= new Date().toISOString();
    saveProgress();
  }

  function chapterProgress(chapter) {
    const progress = profileProgress();
    if (!progress.chapters[chapter.id]) progress.chapters[chapter.id] = { watchedSeconds: 0, completed: false, test: null };
    return progress.chapters[chapter.id];
  }

  function saveChapterProgress(chapter) {
    saveProgress();
    const id = currentProfileId();
    try {
      const profiles = JSON.parse(localStorage.getItem(profilesKey)) || {};
      const profile = profiles[id];
      if (!profile) return;
      profile.trainingCompleted ||= {};
      profile.chemistry101Progress ||= { courseId: "chemistry-101-winter-2026", chapters: {} };
      const done = chapterProgress(chapter);
      profile.chemistry101Progress.chapters[chapter.id] = {
        watchedSeconds: done.watchedSeconds || 0,
        completed: Boolean(done.completed),
        completedAt: done.completedAt || null,
        test: done.test || null
      };
      if (done.completed) {
        profile.trainingCompleted[`chemistry-101-winter-2026:${chapter.id}`] = {
          date: new Date().toISOString(),
          count: 1,
          title: chapter.title,
          source: "Chemistry 101 Winter 2026"
        };
      }
      localStorage.setItem(profilesKey, JSON.stringify(profiles));
      fetch("/api/profiles", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ profile })
      }).catch(() => {});
    } catch {
      // Local progress remains the source if profile sync is unavailable.
    }
  }

  function renderTabs() {
    els.tabs.innerHTML = state.course.chapters.map((chapter, index) => {
      const progress = chapterProgress(chapter);
      const done = progress.completed;
      const tested = Boolean(progress.test);
      return `
        <button class="chapter-tab ${index === state.activeIndex ? "active" : ""} ${tested ? "tested" : done ? "done" : ""}" type="button" data-chapter-index="${index}">
          <span class="chem-icon-chip" aria-hidden="true">${chemistryIcon(chapterIconNames[index])}</span>
          <strong>${escapeHtml(chapter.shortTitle || chapter.title)}</strong>
          <small>${tested ? `Test ${progress.test.score}/${progress.test.total || 10}` : done ? "Test ready" : formatTime(chapterRuntime(chapter))}</small>
        </button>
      `;
    }).join("");
    els.tabs.querySelectorAll("[data-chapter-index]").forEach((button) => {
      button.addEventListener("click", () => showPlayer(Number(button.dataset.chapterIndex)));
    });
  }

  function renderMap() {
    els.map.innerHTML = state.course.chapters.map((chapter, index) => {
      const progress = chapterProgress(chapter);
      const tested = Boolean(progress.test);
      const videoCopy = progress.completed ? "Done" : index === state.activeIndex ? "Start" : "--";
      const testCopy = tested ? `${progress.test.score}/${progress.test.total || 10}` : progress.completed ? "Ready" : "--";
      return `
        <button class="chapter-card ${index === state.activeIndex ? "active" : ""} ${tested ? "tested" : progress.completed ? "done" : ""}" type="button" data-chapter-index="${index}">
          <span class="chapter-thumb" aria-hidden="true">${cardVisual(index)}</span>
          <span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span>
          <span class="chapter-card-head">
            <strong>${escapeHtml(chapter.title)}</strong>
          </span>
          <span class="chapter-status-row" aria-label="${escapeAttr(chapter.title)} progress">
            <span class="chapter-status-pill ${progress.completed ? "done" : ""}" aria-label="Video ${progress.completed ? "done" : "not started"}"><b>Video</b><em>${videoCopy}</em></span>
            <span class="chapter-status-pill ${tested ? "score" : progress.completed ? "ready" : ""}" aria-label="Test ${tested ? "submitted" : progress.completed ? "ready" : "not started"}"><b>Test</b><em>${testCopy}</em></span>
          </span>
        </button>
      `;
    }).join("");
    els.map.querySelectorAll("[data-chapter-index]").forEach((button) => {
      button.addEventListener("click", () => {
        showPlayer(Number(button.dataset.chapterIndex));
      });
    });
    const done = state.course.chapters.filter((chapter) => chapterProgress(chapter).completed).length;
    els.progress.textContent = `${done}/${state.course.chapters.length}`;
  }

  function loadChapter(index) {
    state.activeIndex = Math.max(0, Math.min(index, state.course.chapters.length - 1));
    const chapter = activeChapter();
    els.video.pause();
    els.source.src = chapter.video;
    els.captionTrack.src = chapter.captions;
    els.video.poster = chapter.poster;
    els.video.load();
    els.count.textContent = `Chapter ${chapter.number} of ${state.course.chapters.length}`;
    els.title.textContent = chapter.title;
    els.point.textContent = chapter.learningOutcome;
    const fallbackDuration = chapterRuntime(chapter);
    els.duration.textContent = formatTime(fallbackDuration);
    els.elapsed.textContent = "0:00 elapsed";
    els.total.textContent = `${formatTime(fallbackDuration)} total`;
    els.timeline.value = "0";
    setPlayButton("play");
    renderTabs();
    renderMap();
    renderTest();
    applyCaptions();
  }

  function activeChapter() {
    return state.course.chapters[state.activeIndex];
  }

  function wireControls() {
    els.play.addEventListener("click", () => {
      if (els.video.paused) {
        els.video.play().catch(() => {});
      } else {
        els.video.pause();
      }
    });
    els.rewind.addEventListener("click", () => {
      els.video.currentTime = Math.max(0, els.video.currentTime - 15);
    });
    els.stop.addEventListener("click", () => {
      els.video.pause();
      els.video.currentTime = 0;
    });
    els.cc.addEventListener("click", () => {
      state.ccOn = !state.ccOn;
      applyCaptions();
    });
    els.courseStart?.addEventListener("click", () => {
      showPlayer(0);
    });
    els.headerStart?.addEventListener("click", () => {
      showPlayer(0);
    });
    els.courseMapButton?.addEventListener("click", () => {
      showLanding();
    });
    els.headerCards?.addEventListener("click", () => {
      showLanding();
    });
    els.timeline.addEventListener("input", () => {
      if (Number.isFinite(els.video.duration)) {
        els.video.currentTime = (Number(els.timeline.value) / 100) * els.video.duration;
      }
    });
    els.video.addEventListener("loadedmetadata", updateTimeline);
    els.video.addEventListener("timeupdate", () => {
      updateTimeline();
      maybeCompleteChapter();
    });
    els.video.addEventListener("play", () => {
      setPlayButton("pause");
    });
    els.video.addEventListener("pause", () => {
      const canResume = els.video.currentTime > 0 && els.video.currentTime < (els.video.duration || Infinity);
      setPlayButton(canResume ? "resume" : "play");
    });
    els.video.addEventListener("ended", () => {
      markComplete(activeChapter());
      setPlayButton("play");
    });
    els.video.textTracks?.[0]?.addEventListener?.("cuechange", updateCaptionReadout);
  }

  function applyCaptions() {
    els.cc.setAttribute("aria-pressed", String(state.ccOn));
    els.captionReadout.classList.toggle("hidden", !state.ccOn);
    [...els.video.textTracks].forEach((track) => {
      track.mode = state.ccOn ? "hidden" : "disabled";
    });
    if (!state.ccOn) els.captionReadout.textContent = "Captions are off.";
    updateCaptionReadout();
  }

  function updateCaptionReadout() {
    if (!state.ccOn) return;
    const track = els.video.textTracks?.[0];
    const cue = track?.activeCues?.[0];
    els.captionReadout.textContent = cue?.text || "Captions are on.";
  }

  function updateTimeline() {
    const duration = Number.isFinite(els.video.duration) ? els.video.duration : 0;
    const current = Number.isFinite(els.video.currentTime) ? els.video.currentTime : 0;
    const displayDuration = duration || chapterRuntime(activeChapter());
    if (duration > 0) {
      els.timeline.value = String((current / duration) * 100);
    }
    if (displayDuration > 0) {
      els.duration.textContent = formatTime(displayDuration);
      els.total.textContent = `${formatTime(displayDuration)} total`;
    }
    els.elapsed.textContent = `${formatTime(current)} elapsed`;
    const progress = chapterProgress(activeChapter());
    progress.watchedSeconds = Math.max(progress.watchedSeconds || 0, current);
    saveProgress();
  }

  function maybeCompleteChapter() {
    const duration = Number.isFinite(els.video.duration) ? els.video.duration : 0;
    if (duration && els.video.currentTime >= duration * 0.95) {
      markComplete(activeChapter());
    }
  }

  function markComplete(chapter) {
    const progress = chapterProgress(chapter);
    if (!progress.completed) {
      progress.completed = true;
      progress.completedAt = new Date().toISOString();
      saveChapterProgress(chapter);
      renderTabs();
      renderMap();
      renderTest();
    }
  }

  function renderTest() {
    const chapter = activeChapter();
    const progress = chapterProgress(chapter);
    els.testStatus.textContent = progress.test ? `${progress.test.score}/10` : progress.completed ? "Ready" : "Locked";
    els.testStatus.className = `status-pill ${progress.test ? "done" : progress.completed ? "ready" : ""}`;
    if (!progress.completed) {
      els.testPanel.innerHTML = `<div class="test-intro"><p>Watch this chapter to unlock the 10-question cockpit check.</p></div>`;
      return;
    }
    if (progress.test) {
      els.testPanel.innerHTML = `
        <div class="test-result">
          <p><strong>Latest score: ${progress.test.score}/10</strong></p>
          <p>${escapeHtml(scoreCopy(progress.test.score))}</p>
          <button class="submit-test" type="button" data-retake-test>Retake test</button>
          <div class="feedback-list">${progress.test.feedback.map((item) => `<div class="${item.correct ? "correct" : "missed"}">${escapeHtml(item.copy)}</div>`).join("")}</div>
        </div>
      `;
      els.testPanel.querySelector("[data-retake-test]").addEventListener("click", () => renderTestForm(chapter));
      return;
    }
    renderTestForm(chapter);
  }

  function renderTestForm(chapter) {
    els.testPanel.innerHTML = `
      <form class="test-form" id="chapterTestForm">
        ${chapter.tests.map((question, index) => `
          <fieldset class="test-question">
            <strong>${index + 1}. ${escapeHtml(question.prompt)}</strong>
            ${orderedOptions(chapter, question, index).map(({ option, optionIndex }) => `
              <label>
                <input type="radio" name="q${index}" value="${optionIndex}" required />
                <span>${escapeHtml(option)}</span>
              </label>
            `).join("")}
          </fieldset>
        `).join("")}
        <button class="submit-test" type="submit">Submit chapter test</button>
      </form>
    `;
    document.querySelector("#chapterTestForm").addEventListener("submit", submitTest);
  }

  function orderedOptions(chapter, question, questionIndex) {
    const options = question.options.map((option, optionIndex) => ({ option, optionIndex }));
    if (options.length < 2) return options;
    const shift = (Number(chapter.number || 0) + questionIndex) % options.length;
    return [...options.slice(shift), ...options.slice(0, shift)];
  }

  function submitTest(event) {
    event.preventDefault();
    const chapter = activeChapter();
    const form = new FormData(event.currentTarget);
    let score = 0;
    const feedback = chapter.tests.map((question, index) => {
      const selected = Number(form.get(`q${index}`));
      const correct = selected === question.answer;
      if (correct) score += 1;
      return {
        number: index + 1,
        prompt: question.prompt,
        concept: question.concept || "",
        selectedIndex: selected,
        selected: question.options[selected] || "No answer",
        answerIndex: question.answer,
        answer: question.options[question.answer] || "",
        feedback: question.feedback,
        correct,
        copy: `${index + 1}. ${correct ? "Correct" : "Review"}: ${question.feedback}`
      };
    });
    const progress = chapterProgress(chapter);
    progress.test = {
      score,
      total: chapter.tests.length,
      feedback,
      submittedAt: new Date().toISOString()
    };
    saveChapterProgress(chapter);
    renderMap();
    renderTest();
  }

  function scoreCopy(score) {
    if (score >= 9) return "Strong cockpit check. The chapter ideas are landing.";
    if (score >= 7) return "Solid pass. Review the missed explanations before moving on.";
    return "Retake after replaying the chapter. The feedback points to what to repair.";
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(Number(seconds) || 0));
    const mins = Math.floor(safe / 60);
    const secs = String(safe % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function chapterRuntime(chapter) {
    return runtimeSeconds[chapter?.id] || Number(chapter?.durationTarget || 0);
  }

  function showLanding(scroll = true) {
    els.video.pause();
    els.app.classList.remove("player-view");
    els.app.classList.add("landing-view");
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showPlayer(index = state.activeIndex) {
    loadChapter(index);
    els.app.classList.remove("landing-view");
    els.app.classList.add("player-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setPlayButton(mode) {
    const icon = mode === "pause" ? "pause-icon" : mode === "resume" ? "resume-icon" : "play-icon";
    const label = mode === "pause" ? "Pause" : mode === "resume" ? "Resume" : "Play";
    const aria = mode === "pause" ? "Pause chapter" : mode === "resume" ? "Resume chapter" : "Play chapter";
    els.play.innerHTML = `<span class="control-icon ${icon}" aria-hidden="true"></span><span class="control-label">${label}</span>`;
    els.play.setAttribute("aria-label", aria);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function chemistryIcon(name) {
    const icons = {
      beaker: `<svg viewBox="0 0 48 48" focusable="false"><path d="M17 6h14M20 6v12l-8 14a7 7 0 0 0 6 10h12a7 7 0 0 0 6-10l-8-14V6"/><path d="M14 32c5 3 13-3 20 1"/></svg>`,
      tile: `<svg viewBox="0 0 48 48" focusable="false"><rect x="10" y="9" width="28" height="30" rx="5"/><path d="M18 17h12M18 31h16"/><path d="M18 25h8"/></svg>`,
      particles: `<svg viewBox="0 0 48 48" focusable="false"><circle cx="16" cy="18" r="6"/><circle cx="31" cy="17" r="5"/><circle cx="24" cy="31" r="7"/><path d="M21 20l6-2M19 24l3 3M29 22l-3 5"/></svg>`,
      filter: `<svg viewBox="0 0 48 48" focusable="false"><path d="M10 10h28L27 24v13l-6 3V24z"/><path d="M10 36h28M14 31h8"/></svg>`,
      fizz: `<svg viewBox="0 0 48 48" focusable="false"><path d="M15 9h18M18 9v10l-7 16a6 6 0 0 0 5 8h14a6 6 0 0 0 5-8l-7-16V9"/><circle cx="21" cy="31" r="2"/><circle cx="28" cy="27" r="2"/><circle cx="25" cy="36" r="2"/></svg>`
    };
    return icons[name] || icons.beaker;
  }

  function cardVisual(index) {
    const chapter = String(index + 1).padStart(2, "0");
    return `<img src="${withAssetVersion(`./assets/ui/chapter-${chapter}-card.png`)}" alt="" decoding="async" />`;
  }
})();
