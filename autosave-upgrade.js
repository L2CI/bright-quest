(() => {
  const autosaveIntervalMs = 5000;
  const cloudIntervalMs = 8000;
  const draftVersion = 1;
  const autoResumeDrafts = false;
  let autosaveTimer = null;
  let lastCloudSaveAt = 0;
  let resuming = false;
  const resumedProfiles = new Set();
  const resumeAllowedProfiles = new Set();

  const exitTestButton = document.querySelector("#exitTestButton");
  const optionsGrid = document.querySelector("#optionsGrid");
  const writingBox = document.querySelector("#writingBox");

  const originalStartLevel = startLevel;
  const originalFinishTest = finishTest;
  const originalRenderDashboard = renderDashboard;
  const originalActivateProfile = activateProfile;

  startLevel = function autosavedStartLevel(levelNumber) {
    originalStartLevel(levelNumber);
    createFreshDraft();
    startAutosaveTimer();
    saveActiveDraft("started", { cloud: true });
  };

  finishTest = function autosavedFinishTest(timedOut) {
    clearActiveDraft();
    stopAutosaveTimer();
    originalFinishTest(timedOut);
  };

  renderDashboard = function autosavedRenderDashboard() {
    originalRenderDashboard();
    setTimeout(maybeAutoResumeDraft, 80);
  };

  activateProfile = function autosavedActivateProfile(name) {
    originalActivateProfile(name);
    if (state.profile?.id) resumeAllowedProfiles.add(state.profile.id);
    setTimeout(maybeAutoResumeDraft, 120);
  };

  exitTestButton?.addEventListener("click", () => {
    saveActiveDraft("paused", { cloud: true, keepalive: true });
    stopAutosaveTimer();
  }, true);

  optionsGrid?.addEventListener("click", () => {
    queueDraftSave("answer");
  });

  writingBox?.addEventListener("input", () => {
    queueDraftSave("writing");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveActiveDraft("hidden", { cloud: true, keepalive: true });
    } else {
      maybeAutoResumeDraft();
    }
  });

  window.addEventListener("pagehide", () => {
    saveActiveDraft("pagehide", { cloud: true, keepalive: true });
  });

  window.addEventListener("online", () => {
    if (state.profile?.activeDraft) syncProfileToCloud(state.profile);
  });

  document.addEventListener("click", (event) => {
    const profileButton = event.target.closest("[data-profile]");
    if (profileButton?.dataset.profile) {
      resumeAllowedProfiles.add(profileButton.dataset.profile);
      setTimeout(maybeAutoResumeDraft, 180);
    }
  }, true);

  function createFreshDraft() {
    if (!state.profile || !state.activeLevel) return;
    state.profile.activeDraft = {
      version: draftVersion,
      status: "in_progress",
      id: crypto.randomUUID ? crypto.randomUUID() : `draft-${Date.now()}`,
      level: state.activeLevel.level,
      levelName: state.activeLevel.name,
      totalQuestions: state.activeLevel.questions.length,
      startedAt: new Date(state.startedAt).toISOString(),
      startedAtMs: state.startedAt,
      lastSavedAt: new Date().toISOString(),
      activeQuestion: state.activeQuestion,
      answers: cloneAnswers(state.answers),
      questionTimes: [...state.questionTimes],
      remainingSeconds: state.remainingSeconds
    };
    saveProfiles();
  }

  function saveActiveDraft(reason = "autosave", options = {}) {
    if (!state.profile || !state.activeLevel || !Array.isArray(state.answers)) return;
    if (screens.test.classList.contains("hidden") && reason !== "paused" && reason !== "hidden" && reason !== "pagehide") return;

    if (typeof recordQuestionTime === "function" && state.questionStartedAt) {
      recordQuestionTime();
    }

    const previous = state.profile.activeDraft || {};
    state.profile.activeDraft = {
      ...previous,
      version: draftVersion,
      status: reason === "paused" ? "paused" : "in_progress",
      id: previous.id || (crypto.randomUUID ? crypto.randomUUID() : `draft-${Date.now()}`),
      level: state.activeLevel.level,
      levelName: state.activeLevel.name,
      totalQuestions: state.activeLevel.questions.length,
      startedAt: previous.startedAt || new Date(state.startedAt).toISOString(),
      startedAtMs: previous.startedAtMs || state.startedAt,
      lastSavedAt: new Date().toISOString(),
      lastSaveReason: reason,
      activeQuestion: state.activeQuestion,
      answers: cloneAnswers(state.answers),
      questionTimes: [...state.questionTimes],
      remainingSeconds: Math.max(0, state.remainingSeconds)
    };

    saveProfiles();

    const now = Date.now();
    if (options.cloud || now - lastCloudSaveAt >= cloudIntervalMs) {
      lastCloudSaveAt = now;
      if (options.keepalive) {
        sendProfileKeepalive();
      } else {
        syncProfileToCloud(state.profile);
      }
    }
  }

  function queueDraftSave(reason) {
    setTimeout(() => saveActiveDraft(reason), 80);
  }

  function maybeAutoResumeDraft() {
    if (!autoResumeDrafts) return;
    if (!state.profile?.activeDraft || resuming) return;
    if (!resumeAllowedProfiles.has(state.profile.id)) return;
    if (resumedProfiles.has(state.profile.id)) return;

    resumedProfiles.add(state.profile.id);
    setTimeout(() => resumeDraft(state.profile.activeDraft), 300);
  }

  function resumeDraft(draft) {
    if (!state.profile || !draft || resuming) return;
    const level = getAllLevels().find((item) => item.level === Number(draft.level));
    if (!level) {
      clearActiveDraft();
      return;
    }

    resuming = true;
    stopTimer();
    stopAutosaveTimer();

    state.activeLevel = level;
    state.activeQuestion = clamp(Number(draft.activeQuestion) || 0, 0, level.questions.length - 1);
    state.answers = normalizeAnswers(draft.answers, level.questions.length);
    state.questionTimes = normalizeQuestionTimes(draft.questionTimes, level.questions.length);
    state.startedAt = Number(draft.startedAtMs) || Date.now();
    state.remainingSeconds = clamp(Number(draft.remainingSeconds) || level.minutes * 60, 0, level.minutes * 60);
    state.questionStartedAt = Date.now();

    testLevelLabel.textContent = level.level === 8 ? `Level ${level.level} / Final` : `Level ${level.level} / 7`;
    testName.textContent = level.name;
    renderQuestion();
    startTimer();
    showScreen("test");
    startAutosaveTimer();
    showToast(`Resumed ${level.name} from question ${state.activeQuestion + 1}.`);
    resuming = false;
  }

  function clearActiveDraft() {
    if (!state.profile?.activeDraft) return;
    delete state.profile.activeDraft;
    saveProfiles();
  }

  function startAutosaveTimer() {
    stopAutosaveTimer();
    autosaveTimer = setInterval(() => saveActiveDraft("autosave"), autosaveIntervalMs);
  }

  function stopAutosaveTimer() {
    if (autosaveTimer) clearInterval(autosaveTimer);
    autosaveTimer = null;
  }

  function sendProfileKeepalive() {
    try {
      const payload = JSON.stringify({ profile: state.profile });
      if (!window.BrightQuestFamilyAuth?.enabled && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        if (navigator.sendBeacon(`${apiBase}/profiles`, blob)) return;
      }
      fetch(`${apiBase}/profiles`, {
        method: "POST",
        headers: { "content-type": "application/json", ...(window.BrightQuestFamilyAuth?.requestHeaders?.() || {}) },
        body: payload,
        keepalive: true
      });
    } catch {
      // Local storage still has the draft if the network save cannot complete.
    }
  }

  function cloneAnswers(answers) {
    return answers.map((answer) => ({
      selected: answer.selected,
      writing: answer.writing || ""
    }));
  }

  function normalizeAnswers(answers, count) {
    const list = Array.isArray(answers) ? answers : [];
    return Array.from({ length: count }, (_, index) => ({
      selected: list[index]?.selected ?? null,
      writing: list[index]?.writing || ""
    }));
  }

  function normalizeQuestionTimes(times, count) {
    const list = Array.isArray(times) ? times : [];
    return Array.from({ length: count }, (_, index) => Number(list[index]) || 0);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
})();
