(() => {
  const previousRenderParentDashboard = renderParentDashboard;
  const previousRenderProfileScreen = renderProfileScreen;
  const optionState = { open: false };

  renderParentDashboard = function parentCockpitRedesign() {
    previousRenderParentDashboard();
    prepareAarinProfile(false);
    renderCockpit();
  };

  renderProfileScreen = function aarinOnlyProfileScreen() {
    prepareAarinProfile(false);
    previousRenderProfileScreen();
  };

  document.addEventListener("click", (event) => {
    const optionsButton = event.target.closest("[data-parent-options]");
    if (optionsButton) {
      optionState.open = !optionState.open;
      document.querySelector(".parent-options-menu")?.classList.toggle("hidden", !optionState.open);
      return;
    }

    if (!event.target.closest(".parent-options-wrap")) {
      optionState.open = false;
      document.querySelector(".parent-options-menu")?.classList.add("hidden");
    }

    const action = event.target.closest("[data-parent-action]");
    if (action) handleParentAction(action.dataset.parentAction);

    const panelButton = event.target.closest("[data-cockpit-panel]");
    if (panelButton) {
      const panel = document.querySelector(`[data-cockpit-panel-body="${panelButton.dataset.cockpitPanel}"]`);
      if (!panel) return;
      const hidden = panel.classList.toggle("hidden");
      panelButton.textContent = hidden ? panelButton.dataset.openText : panelButton.dataset.closeText;
    }

    const writingButton = event.target.closest("[data-writing-drawer]");
    if (writingButton) openWritingDrawer(writingButton.dataset.writingDrawer);

    if (event.target.closest("[data-close-writing-drawer]")) closeWritingDrawer();
  });

  function renderCockpit() {
    normalizeProfiles();
    const profiles = Object.values(state.profiles);
    const profile = getSelectedProfile(profiles);

    document.querySelector("#parentScreen")?.classList.add("parent-cockpit-redesign");
    renderCockpitHeader(profile, profiles);

    if (!profile) {
      parentRecommendation.innerHTML = `<div class="cockpit-empty"><h3>No child profile yet.</h3><p>Add a kid profile from Options to begin.</p></div>`;
      parentProfileList.innerHTML = "";
      parentOverview.innerHTML = "";
      parentQuestionTable.innerHTML = "";
      parentTrainingTable.innerHTML = "";
      return;
    }

    const metrics = buildMetrics(profile);
    updateSectionHeadings();
    parentRecommendation.innerHTML = renderRecommendation(metrics);
    parentProfileList.innerHTML = renderWritingSignals(metrics);
    parentOverview.innerHTML = renderOverview(metrics);
    parentQuestionTable.innerHTML = renderFocusAreas(metrics);
    parentTrainingTable.innerHTML = renderRecords(metrics);
    ensureWritingDrawer();
  }

  function updateSectionHeadings() {
    parentProfileList.closest(".parent-card")?.querySelector(".eyebrow") && (parentProfileList.closest(".parent-card").querySelector(".eyebrow").textContent = "Writing signals");
    parentOverview.closest(".parent-card")?.querySelector(".eyebrow") && (parentOverview.closest(".parent-card").querySelector(".eyebrow").textContent = "Snapshot");
    const focusHeading = parentQuestionTable.closest(".parent-card")?.querySelector(".section-heading");
    focusHeading?.querySelector(".eyebrow") && (focusHeading.querySelector(".eyebrow").textContent = "Focus areas");
    focusHeading?.querySelector("h3") && (focusHeading.querySelector("h3").textContent = "What needs help next");
    const recordsHeading = parentTrainingTable.closest(".parent-card")?.querySelector(".section-heading");
    recordsHeading?.querySelector(".eyebrow") && (recordsHeading.querySelector(".eyebrow").textContent = "Records");
    recordsHeading?.querySelector("h3") && (recordsHeading.querySelector("h3").textContent = "Open details on request");
  }

  function getSelectedProfile(profiles) {
    if (!profiles.length) return null;
    if (!state.parentProfileId || !state.profiles[state.parentProfileId]) {
      const preferred = state.profiles.test || profiles.find((profile) => profile.name === "Aarin") || profiles[0];
      state.parentProfileId = preferred.id;
    }
    return state.profiles[state.parentProfileId] || null;
  }

  function renderCockpitHeader(profile, profiles) {
    const header = document.querySelector("#parentScreen .app-header");
    if (!header) return;
    header.innerHTML = `
      <div class="cockpit-title-block">
        <p class="eyebrow">Parent cockpit</p>
        <h2>Progress cockpit</h2>
      </div>
      <div class="cockpit-header-controls">
        <label class="parent-child-picker">
          <span>Child</span>
          <select data-parent-action="switch-profile">
            ${profiles.map((item) => `<option value="${escapeAttr(item.id)}" ${item.id === profile?.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
          </select>
        </label>
        <div class="parent-options-wrap">
          <button class="button button-soft" type="button" data-parent-options>Options</button>
          <div class="parent-options-menu hidden">
            <button type="button" data-parent-action="refresh">Refresh data</button>
            <button type="button" data-parent-action="add-profile">Add kid profile</button>
            <button type="button" data-parent-action="prepare-aarin">Keep only Aarin</button>
            <button type="button" data-parent-action="reset">Reset all data</button>
            <button type="button" data-parent-action="logout">Log out</button>
          </div>
        </div>
      </div>
    `;
    header.querySelector("[data-parent-action='switch-profile']")?.addEventListener("change", (event) => {
      state.parentProfileId = event.target.value;
      renderParentDashboard();
    });
  }

  function buildMetrics(profile) {
    const attempts = profile.attempts || [];
    const questionStats = attempts.flatMap((attempt) =>
      (attempt.questionStats || []).map((question) => ({ ...question, attempt }))
    );
    const choiceStats = questionStats.filter((question) => question.format !== "writing");
    const writing = questionStats
      .filter((question) => question.format === "writing")
      .map((question) => ({ attempt: question.attempt, question, score: question.writingScore || scoreWritingResponseLite(question.answerText || "", question.prompt || "") }))
      .reverse();
    const latest = attempts.at(-1);
    const previous = attempts.at(-2);
    const average = attempts.length ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.percent || 0), 0) / attempts.length) : 0;
    const best = attempts.reduce((max, attempt) => Math.max(max, attempt.percent || 0), 0);
    const focus = buildFocusSummaries(choiceStats);
    const training = getTrainingCoverage(profile);
    return { profile, attempts, questionStats, choiceStats, writing, latest, previous, average, best, focus, training };
  }

  function buildFocusSummaries(questions) {
    const groups = questions.reduce((acc, question) => {
      const key = question.skill || "Mixed skill";
      acc[key] ||= { skill: key, section: question.section || "Mixed", count: 0, missed: 0, seconds: 0, questions: [] };
      acc[key].count += 1;
      acc[key].missed += question.correct === false ? 1 : 0;
      acc[key].seconds += question.secondsSpent || 0;
      acc[key].questions.push(question);
      return acc;
    }, {});

    return Object.values(groups)
      .map((item) => ({
        ...item,
        averageSeconds: Math.round(item.seconds / Math.max(1, item.count)),
        score: item.missed * 5 + Math.round(item.seconds / 40)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  function renderRecommendation(metrics) {
    const focus = metrics.focus[0];
    const headline = focus ? `Focus next: ${focus.skill}` : "Focus next: keep the rhythm going";
    const copy = focus
      ? `${focus.missed} missed, ${Math.max(0, focus.count - focus.missed)} slow or watch-list signals, average ${formatDuration(focus.averageSeconds)}.`
      : metrics.latest
        ? "No strong weak spot is standing out. Use one timed practice to keep exam pressure familiar."
        : "Complete a test to unlock the first recommendation.";
    return `
      <div class="cockpit-recommendation">
        <div>
          <p class="eyebrow">Today&apos;s recommendation</p>
          <h3>${escapeHtml(headline)}</h3>
          <p>${escapeHtml(copy)}</p>
        </div>
        <div class="recommendation-actions">
          ${focus ? `<button class="button button-primary" type="button" data-cockpit-panel="focus-0" data-open-text="View evidence" data-close-text="Hide evidence">View evidence</button>` : ""}
          <button class="button button-soft" type="button" data-parent-action="refresh">Refresh</button>
        </div>
        <span class="recommendation-orbit" aria-hidden="true"></span>
      </div>
    `;
  }

  function renderOverview(metrics) {
    const trend = metrics.latest && metrics.previous ? metrics.latest.percent - metrics.previous.percent : 0;
    const writingScore = metrics.writing[0]?.score.total;
    return `
      <div class="cockpit-snapshot-card">
        <span>Latest score</span><strong>${metrics.latest ? `${metrics.latest.percent}%` : "--"}</strong><small>${metrics.latest ? escapeHtml(metrics.latest.levelName) : "No test yet"}</small>
      </div>
      <div class="cockpit-snapshot-card">
        <span>Trend</span><strong>${trend ? `${trend > 0 ? "+" : ""}${trend}%` : metrics.attempts.length > 1 ? "Flat" : "--"}</strong><small>${metrics.attempts.length} completed</small>
      </div>
      <div class="cockpit-snapshot-card">
        <span>Pressure points</span><strong>${metrics.focus.length}</strong><small>${metrics.focus[0]?.skill || "None flagged"}</small>
      </div>
      <div class="cockpit-snapshot-card">
        <span>Writing quality</span><strong>${writingScore ? `${writingScore}/20` : "--"}</strong><small>${metrics.writing.length ? "Latest writing" : "No writing yet"}</small>
      </div>
      <section class="cockpit-chart-card">
        <div class="cockpit-card-head">
          <div><p class="eyebrow">Progress trend</p><h3>Scores over time</h3></div>
          <div class="chart-tabs"><span>Maths</span><span>English</span><span>Writing</span><span>International</span></div>
        </div>
        ${renderCockpitTrend(metrics.attempts)}
      </section>
    `;
  }

  function renderWritingSignals(metrics) {
    const latest = metrics.writing[0];
    if (!latest) {
      return `
        <section class="writing-signal-panel">
          <div class="cockpit-card-head"><div><p class="eyebrow">Writing signals</p><h3>No writing response yet</h3></div></div>
          <p class="muted">Writing samples and full text will appear here after a writing question is completed.</p>
        </section>
      `;
    }
    const score = latest.score;
    return `
      <section class="writing-signal-panel">
        <div class="cockpit-card-head">
          <div><p class="eyebrow">Writing signals</p><h3>Latest writing: ${score.total}/20</h3></div>
          <button class="button button-primary" type="button" data-writing-drawer="0">Open writing samples</button>
        </div>
        <div class="writing-signal-grid">
          <div class="writing-score-ring" style="--writing-score:${(score.total / 20) * 100}%"><strong>${score.total}</strong><span>/20</span></div>
          <div class="writing-bars">
            ${rubricBar("Ideas", score.ideas)}
            ${rubricBar("Structure", score.structure)}
            ${rubricBar("Vocabulary", score.vocabulary)}
            ${rubricBar("Accuracy", score.accuracy)}
          </div>
          <button class="writing-preview-card" type="button" data-writing-drawer="0">
            <strong>${escapeHtml(latest.attempt.levelName)}</strong>
            <span>${escapeHtml(shorten(latest.question.answerText || "No response saved.", 170))}</span>
          </button>
        </div>
        <div class="writing-mini-list">
          ${metrics.writing.slice(0, 4).map((item, index) => `
            <button type="button" data-writing-drawer="${index}">
              <span>${escapeHtml(item.attempt.levelName)}</span><strong>${item.score.total}/20</strong>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderFocusAreas(metrics) {
    if (!metrics.focus.length) return `<div class="empty-state">No focus areas yet. Complete a test to build evidence.</div>`;
    return `
      <div class="focus-area-list">
        ${metrics.focus.map((focus, index) => `
          <article class="focus-area-row">
            <span class="severity-dot level-${Math.min(3, Math.max(1, focus.missed + 1))}"></span>
            <div><h4>${escapeHtml(focus.skill)}</h4><p>${escapeHtml(focus.section)} / ${focus.missed} missed / avg ${formatDuration(focus.averageSeconds)}</p></div>
            <button class="button button-soft" type="button" data-cockpit-panel="focus-${index}" data-open-text="View evidence" data-close-text="Hide evidence">View evidence</button>
            <div class="cockpit-panel-body hidden" data-cockpit-panel-body="focus-${index}">
              ${focus.questions.map((question) => renderQuestionEvidence(question)).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderRecords(metrics) {
    return `
      <div class="records-request-list">
        ${recordPanel("tests", "Test history", `${metrics.attempts.length} attempts saved`, metrics.attempts.slice().reverse().map(renderAttemptRecord).join("") || `<div class="empty-state">No test attempts yet.</div>`)}
        ${recordPanel("questions", "Question records", `${metrics.questionStats.length} question records available`, metrics.questionStats.map(renderQuestionEvidence).join("") || `<div class="empty-state">No question records yet.</div>`)}
        ${recordPanel("training", "Training opened", `${metrics.training.completed.length} opened / ${metrics.training.untouched.length} untouched`, renderTrainingRecord(metrics.training))}
        ${recordPanel("timing", "Timing breakdown", "Slowest saved questions", metrics.choiceStats.slice().sort((a, b) => (b.secondsSpent || 0) - (a.secondsSpent || 0)).slice(0, 12).map(renderQuestionEvidence).join("") || `<div class="empty-state">No timing records yet.</div>`)}
      </div>
    `;
  }

  function recordPanel(id, title, copy, body) {
    return `
      <article class="record-request-row">
        <div><h4>${escapeHtml(title)}</h4><p>${escapeHtml(copy)}</p></div>
        <button class="button button-soft" type="button" data-cockpit-panel="record-${id}" data-open-text="Show" data-close-text="Hide">Show</button>
        <div class="cockpit-panel-body hidden" data-cockpit-panel-body="record-${id}">${body}</div>
      </article>
    `;
  }

  function renderCockpitTrend(attempts) {
    if (!attempts.length) return `<div class="empty-state">Complete a test to see a trend line.</div>`;
    const recent = attempts.slice(-10);
    const width = 720;
    const height = 220;
    const pad = 30;
    const points = recent.map((attempt, index) => {
      const x = recent.length === 1 ? width / 2 : pad + (index * (width - pad * 2)) / (recent.length - 1);
      const y = height - pad - ((attempt.percent || 0) / 100) * (height - pad * 2);
      return { x, y, attempt };
    });
    return `
      <svg class="cockpit-trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Score trend">
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" class="parent-axis"/>
        <polyline points="${points.map((point) => `${point.x},${point.y}`).join(" ")}" class="parent-trend-line"/>
        ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="7" class="parent-trend-dot"><title>${escapeHtml(point.attempt.levelName)} ${point.attempt.percent}%</title></circle>`).join("")}
      </svg>
    `;
  }

  function renderQuestionEvidence(question) {
    return `
      <div class="evidence-line ${question.correct === false ? "missed" : ""}">
        <strong>${escapeHtml(question.attempt?.levelName || "Saved test")} / Q${question.number || "?"} / ${escapeHtml(question.skill || "Writing")}</strong>
        <p>${escapeHtml(question.format === "writing" ? "Writing" : question.correct ? "Correct" : "Missed")} / ${formatDuration(question.secondsSpent || 0)}</p>
        <p>${escapeHtml(shorten(question.prompt || "", 260))}</p>
        ${question.format === "writing"
          ? `<p><button class="button button-soft button-compact" type="button" data-writing-drawer="0">Open full writing</button></p>`
          : `<p>Selected: ${escapeHtml(question.selectedText || "No answer")} / Correct: ${escapeHtml(question.correctText || "")}</p>`}
      </div>
    `;
  }

  function renderAttemptRecord(attempt) {
    return `
      <div class="attempt-record-line">
        <div><strong>${escapeHtml(attempt.levelName)}</strong><p>${new Date(attempt.date).toLocaleString()} / ${attempt.correct} of ${attempt.total} / ${formatDuration(attempt.secondsUsed || 0)}</p></div>
        <b>${attempt.percent}%</b>
      </div>
    `;
  }

  function renderTrainingRecord(training) {
    return `
      <div class="training-record-grid">
        ${training.completed.map((skill) => `<span class="done">${escapeHtml(skill)}</span>`).join("")}
        ${training.untouched.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
      </div>
    `;
  }

  function ensureWritingDrawer() {
    if (document.querySelector("#writingDrawer")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="writing-drawer-shell hidden" id="writingDrawer" role="dialog" aria-modal="true" aria-label="Full writing sample">
        <div class="writing-drawer-backdrop" data-close-writing-drawer></div>
        <aside class="writing-drawer-panel">
          <button class="button button-soft writing-drawer-close" type="button" data-close-writing-drawer>Close</button>
          <div id="writingDrawerContent"></div>
        </aside>
      </div>
    `);
  }

  function openWritingDrawer(indexValue) {
    const metrics = buildMetrics(state.profiles[state.parentProfileId] || state.profile || {});
    const item = metrics.writing[Number(indexValue) || 0];
    if (!item) return;
    ensureWritingDrawer();
    const score = item.score;
    document.querySelector("#writingDrawerContent").innerHTML = `
      <p class="eyebrow">Writing sample</p>
      <h2>${escapeHtml(item.attempt.levelName)} - ${score.total}/20</h2>
      <section class="drawer-score-grid">
        ${rubricBox("Ideas", score.ideas)}
        ${rubricBox("Structure", score.structure)}
        ${rubricBox("Vocabulary", score.vocabulary)}
        ${rubricBox("Accuracy", score.accuracy)}
      </section>
      <article class="drawer-writing-block">
        <h3>Question prompt</h3>
        <p>${escapeHtml(item.question.prompt || "")}</p>
      </article>
      <article class="drawer-writing-block full-answer">
        <h3>Full answer</h3>
        <p>${escapeHtml(item.question.answerText || "No response saved.")}</p>
      </article>
      <article class="drawer-writing-block">
        <h3>Parent signal</h3>
        <p>${escapeHtml(score.feedback)} ${escapeHtml(score.nextStep)}</p>
      </article>
    `;
    document.querySelector("#writingDrawer").classList.remove("hidden");
  }

  function closeWritingDrawer() {
    document.querySelector("#writingDrawer")?.classList.add("hidden");
  }

  function rubricBar(label, value) {
    return `<div class="rubric-bar"><span>${escapeHtml(label)}</span><i style="--bar:${Math.max(8, value * 20)}%"></i><strong>${value}/5</strong></div>`;
  }

  function rubricBox(label, value) {
    return `<div><strong>${value}/5</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function scoreWritingResponseLite(text, prompt) {
    const clean = String(text || "").trim();
    const words = clean ? clean.split(/\s+/).filter(Boolean) : [];
    const sentences = clean ? clean.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean) : [];
    const lower = clean.toLowerCase();
    const vivid = ["because", "finally", "carefully", "suddenly", "bright", "strange", "brave", "hidden"];
    const promptWords = String(prompt || "").toLowerCase().split(/\W+/).filter((word) => word.length > 4);
    const ideas = clampScore((words.length >= 45 ? 2 : words.length >= 25 ? 1 : 0) + (promptWords.some((word) => lower.includes(word)) ? 1 : 0) + (vivid.some((word) => lower.includes(word)) ? 1 : 0) + 1);
    const structure = clampScore((sentences.length >= 4 ? 2 : sentences.length >= 2 ? 1 : 0) + (/\b(first|then|after|finally|because)\b/i.test(clean) ? 2 : 1));
    const vocabulary = clampScore(1 + (new Set(words.map((word) => word.toLowerCase())).size > 24 ? 2 : 1) + (words.some((word) => word.length >= 8) ? 1 : 0));
    const accuracy = clampScore((/[.!?]/.test(clean) ? 2 : 1) + (/^[A-Z]/.test(clean) ? 1 : 0) + (words.length >= 25 ? 1 : 0));
    const total = ideas + structure + vocabulary + accuracy;
    return {
      total, ideas, structure, vocabulary, accuracy,
      feedback: total >= 14 ? "This is a solid response with useful exam signal." : "This response needs a little more control and development.",
      nextStep: total >= 14 ? "Next step: keep practising under time." : "Next step: add more detail, clearer structure, and cleaner punctuation."
    };
  }

  function clampScore(value) {
    return Math.max(1, Math.min(5, value));
  }

  function handleParentAction(action) {
    if (action === "refresh") {
      state.profiles = loadProfiles();
      if (state.profileId) state.profile = state.profiles[state.profileId];
      renderParentDashboard();
      showToast("Parent view refreshed.");
    }
    if (action === "logout") parentExitButton.click();
    if (action === "reset") parentResetButton.click();
    if (action === "prepare-aarin") {
      prepareAarinProfile(true);
      renderParentDashboard();
    }
    if (action === "add-profile") {
      const name = window.prompt("New kid first name");
      if (!name?.trim()) return;
      const id = profileKey(name.trim());
      if (!state.profiles[id]) {
        state.profiles[id] = { id, name: name.trim(), createdAt: new Date().toISOString(), stars: 0, attempts: [], trainingCompleted: {}, writingSamples: [] };
        normalizeProfiles();
        syncProfileToCloud(state.profiles[id]);
      }
      state.parentProfileId = id;
      renderParentDashboard();
      showToast(`Profile added for ${name.trim()}.`);
    }
  }

  function prepareAarinProfile(showMessage) {
    const testProfile = state.profiles.test;
    if (!testProfile) return;
    let changed = false;
    if (testProfile.name !== "Aarin") {
      testProfile.name = "Aarin";
      changed = true;
    }
    state.parentProfileId = "test";
    if (state.profileId === "test") state.profile = testProfile;

    Object.values(state.profiles).forEach((profile) => {
      if (profile.id === "test") return;
      const hasData = (profile.attempts || []).length || Object.keys(profile.trainingCompleted || {}).length || (profile.writingSamples || []).length || (profile.stars || 0);
      if (hasData) return;
      delete state.profiles[profile.id];
      deleteCloudProfile(profile.id);
      changed = true;
    });

    if (changed) {
      normalizeProfiles();
      syncProfileToCloud(testProfile);
    }
    if (showMessage) showToast("Aarin is preserved; empty extra profiles were removed.");
  }

  async function deleteCloudProfile(profileId) {
    try {
      await fetch(`${apiBase}/profiles?profileId=${encodeURIComponent(profileId)}`, { method: "DELETE" });
    } catch {
      // Local-only use can ignore remote cleanup.
    }
  }
})();
