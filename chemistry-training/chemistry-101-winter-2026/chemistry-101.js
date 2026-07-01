(() => {
  const COURSE_URL = "./data/chemistry-101-course.json";
  const RELEASE = "chemistry-101-winter-2026-001";
  const progressKey = "brightQuestChemistry101ProgressV1";
  const profilesKey = "brightQuestProfilesV2";

  const els = {
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
      chapter.video = `./assets/videos/chapter-${n}.mp4`;
      chapter.audio = `./assets/audio/chapter-${n}-teacher.mp3`;
      chapter.captions = `./assets/captions/chapter-${n}.vtt`;
      chapter.poster = `./assets/posters/chapter-${n}.jpg`;
    });

    renderTabs();
    renderMap();
    wireControls();
    loadChapter(0);
    console.info(`Chemistry 101 loaded: ${RELEASE}`);
  }

  function currentProfileId() {
    return localStorage.getItem("brightQuestActiveProfile") || "demo-student";
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

  function profileProgress() {
    const id = currentProfileId();
    if (!state.progress[id]) state.progress[id] = { courseId: "chemistry-101-winter-2026", chapters: {} };
    return state.progress[id];
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
      const done = chapterProgress(chapter);
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
      const done = chapterProgress(chapter).completed;
      return `
        <button class="chapter-tab ${index === state.activeIndex ? "active" : ""} ${done ? "done" : ""}" type="button" data-chapter-index="${index}">
          <span>${chapter.number}</span>
          <strong>${escapeHtml(chapter.shortTitle || chapter.title)}</strong>
          <small>${done ? "Done" : "Video + 10 questions"}</small>
        </button>
      `;
    }).join("");
    els.tabs.querySelectorAll("[data-chapter-index]").forEach((button) => {
      button.addEventListener("click", () => loadChapter(Number(button.dataset.chapterIndex)));
    });
  }

  function renderMap() {
    els.map.innerHTML = state.course.chapters.map((chapter, index) => {
      const progress = chapterProgress(chapter);
      const score = progress.test ? `${progress.test.score}/10` : progress.completed ? "Test ready" : "Watch first";
      return `
        <button class="chapter-card" type="button" data-chapter-index="${index}">
          <strong>${chapter.number}. ${escapeHtml(chapter.title)}</strong>
          <span>${escapeHtml(score)} / ${escapeHtml(chapter.learningOutcome)}</span>
        </button>
      `;
    }).join("");
    els.map.querySelectorAll("[data-chapter-index]").forEach((button) => {
      button.addEventListener("click", () => loadChapter(Number(button.dataset.chapterIndex)));
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
    els.duration.textContent = "--:--";
    els.elapsed.textContent = "0:00 elapsed";
    els.total.textContent = "0:00 total";
    els.timeline.value = "0";
    els.play.textContent = "Play";
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
      els.play.textContent = "Pause";
    });
    els.video.addEventListener("pause", () => {
      els.play.textContent = els.video.currentTime > 0 && els.video.currentTime < (els.video.duration || Infinity) ? "Resume" : "Play";
    });
    els.video.addEventListener("ended", () => {
      markComplete(activeChapter());
      els.play.textContent = "Play";
    });
    els.video.textTracks?.[0]?.addEventListener?.("cuechange", updateCaptionReadout);
  }

  function applyCaptions() {
    els.cc.setAttribute("aria-pressed", String(state.ccOn));
    els.captionReadout.classList.toggle("hidden", !state.ccOn);
    [...els.video.textTracks].forEach((track) => {
      track.mode = state.ccOn ? "showing" : "disabled";
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
    if (duration > 0) {
      els.timeline.value = String((current / duration) * 100);
      els.duration.textContent = formatTime(duration);
      els.total.textContent = `${formatTime(duration)} total`;
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
            ${question.options.map((option, optionIndex) => `
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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
