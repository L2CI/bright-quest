(() => {
  const autosaveIntervalMs = 5000;
  const cloudIntervalMs = 8000;
  const draftVersion = 1;
  const autoResumeDrafts = false;
  let autosaveTimer = null;
  let lastCloudSaveAt = 0;
  let resuming = false;
  let activeDraftSession = false;
  const resumedProfiles = new Set();
  const resumeAllowedProfiles = new Set();

  const exitTestButton = document.querySelector("#exitTestButton");
  const optionsGrid = document.querySelector("#optionsGrid");
  const writingBox = document.querySelector("#writingBox");

  const originalStartQuest = startQuest;
  const originalFinishTest = finishTest;
  const originalRenderDashboard = renderDashboard;
  const originalActivateProfile = activateProfile;

  startQuest = function autosavedStartQuest(level) {
    if (!level || !state.profile) return;
    const existing = state.profile.activeDraft;
    if (existing) {
      if (String(existing.level) === String(level.level) && findDraftLevel(existing)) {
        resumeDraft(existing);
      } else {
        showSavedTestChoice(existing);
      }
      return;
    }
    originalStartQuest(level);
    activeDraftSession = true;
    createFreshDraft();
    startAutosaveTimer();
    saveActiveDraft("started", { cloud: true });
  };

  finishTest = function autosavedFinishTest(timedOut) {
    activeDraftSession = false;
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
    activeDraftSession = false;
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
    if (!activeDraftSession) return;
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
    const level = findDraftLevel(draft);
    if (!level) {
      showToast("Your saved test is safe. Its original content is not available here yet.");
      return false;
    }

    resuming = true;
    stopTimer();
    stopAutosaveTimer();

    state.activeLevel = level;
    state.activeQuestion = clamp(Number(draft.activeQuestion) || 0, 0, level.questions.length - 1);
    state.answers = normalizeAnswers(draft.answers, level.questions.length);
    state.questionTimes = normalizeQuestionTimes(draft.questionTimes, level.questions.length);
    state.startedAt = Number(draft.startedAtMs) || Date.now();
    const remaining = Number(draft.remainingSeconds);
    state.remainingSeconds = clamp(Number.isFinite(remaining) ? remaining : level.minutes * 60, 0, level.minutes * 60);
    state.questionStartedAt = Date.now();

    testLevelLabel.textContent = level.family === "international" || String(level.level).startsWith("intl-")
      ? `${level.challengeLabel || "International"} / World Challenge`
      : `Level ${level.level} / ${getAllLevels().length}`;
    testName.textContent = level.name;
    renderQuestion();
    startTimer();
    showScreen("test");
    activeDraftSession = true;
    startAutosaveTimer();
    showToast(`Resumed ${level.name} from question ${state.activeQuestion + 1}.`);
    resuming = false;
    return true;
  }

  function findDraftLevel(draft) {
    if (!draft) return null;
    return [...getAllLevels(), ...(window.BrightQuestInternationalTests || [])]
      .find((level) => String(level.level) === String(draft.level)) || null;
  }

  function showSavedTestChoice(draft) {
    let dialog = document.querySelector("#bqSavedTestChoice");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "bqSavedTestChoice";
      dialog.className = "bq-saved-test-dialog";
      document.body.append(dialog);
    }
    const canResume = Boolean(findDraftLevel(draft));
    dialog.innerHTML = `<h2>A saved test is waiting</h2><p>${escapeHtml(draft.levelName || "Your unfinished test")} still has your answers. Finish it before starting a different test, or keep it saved and choose a lesson or game.</p><div class="bq-dialog-actions">${canResume ? '<button class="button button-primary" type="button" data-resume-saved>Resume saved test</button>' : '<p>Your original test content is unavailable. The saved answers have been kept.</p>'}<button class="button button-soft" type="button" data-keep-saved>Keep saved and go back</button></div>`;
    dialog.querySelector("[data-resume-saved]")?.addEventListener("click", () => {
      dialog.close();
      resumeDraft(state.profile.activeDraft);
    });
    dialog.querySelector("[data-keep-saved]").addEventListener("click", () => dialog.close());
    if (!dialog.open) dialog.showModal();
  }

  window.BrightQuestDrafts = Object.freeze({
    get: (profile = state.profile) => profile?.activeDraft || null,
    canResume: (draft = state.profile?.activeDraft) => Boolean(findDraftLevel(draft)),
    resume: () => resumeDraft(state.profile?.activeDraft),
    start: (level) => startQuest(level)
  });

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
    // Use the same per-profile queue as normal saves so an older pause cannot
    // race a finished result or send an out-of-date cloud version.
    syncProfileToCloud(state.profile, true, { keepalive: true });
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
