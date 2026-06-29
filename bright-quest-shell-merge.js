(() => {
  const AGMATHS_URL = "https://agmaths.dipanjan-gupta.workers.dev/";
  const AGMATHS_COCKPIT_URL = "https://agmaths.dipanjan-gupta.workers.dev/#cockpit";
  const DRAGON_FORGE_URL = "https://agmaths.dipanjan-gupta.workers.dev/#game";

  document.body.classList.add("bq-shell-merge");

  passwordForm?.addEventListener("submit", handleKidConfirmation, true);
  window.addEventListener("hashchange", () => {
    if (state.selectedRole === "parent" && !screens.parent.classList.contains("hidden")) {
      renderParentDashboard();
    }
  });

  const previousRenderDashboard = renderDashboard;
  renderDashboard = function shellMergeRenderDashboard(...args) {
    const result = previousRenderDashboard.apply(this, args);
    requestAnimationFrame(renderKidShell);
    return result;
  };

  const previousOpenGamesList = openGamesList;
  openGamesList = function shellMergeOpenGamesList(...args) {
    const result = previousOpenGamesList.apply(this, args);
    requestAnimationFrame(addDragonForgeKidCard);
    return result;
  };

  renderParentDashboard = function shellMergeParentDashboard() {
    normalizeProfiles();
    document.querySelector("#parentScreen")?.classList.add("parent-cockpit-redesign", "parent-page-cockpit");
    const profiles = Object.values(state.profiles);
    const profile = getParentProfile(profiles);
    renderParentHeader(profile, profiles);
    renderParentRoute(profile);
  };

  function handleKidConfirmation(event) {
    if (state.selectedRole !== "kid") return;
    if (modePassword.value !== "abcde") return;
    const profiles = Object.values(state.profiles);
    const profile = confirmationProfile(profiles);
    if (!profile) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    modePassword.value = "";

    if (!window.confirm(`Are you ${profile.name}?`)) {
      renderProfileScreen();
      showScreen("profile");
      return;
    }

    state.profileId = profile.id;
    state.profile = state.profiles[profile.id];
    saveProfiles();
    renderDashboard();
    showScreen("dashboard");
    showToast(`Welcome back, ${profile.name}.`);
  }

  function confirmationProfile(profiles) {
    if (!profiles.length) return null;
    if (profiles.length === 1) return profiles[0];
    const names = new Set(profiles.map((profile) => normalizedName(profile.name)));
    if (names.size !== 1) return null;
    return [...profiles].sort((a, b) => profileActivityScore(b) - profileActivityScore(a))[0];
  }

  function normalizedName(name) {
    return String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function profileActivityScore(profile) {
    return (profile.attempts || []).length * 100
      + Object.keys(profile.trainingCompleted || {}).length * 20
      + (profile.writingSamples || []).length * 10
      + (profile.stars || 0);
  }

  function renderKidShell() {
    const ref = document.querySelector("#brightReferenceDashboard");
    if (!ref || !state.profile) return;
    const attempts = state.profile.attempts || [];
    const best = attempts.reduce((max, item) => Math.max(max, item.percent || 0), 0);
    const weak = Object.entries(weakSkillCounts()).sort((a, b) => b[1] - a[1])[0];
    ref.className = "reference-dashboard bq-home-shell";
    ref.innerHTML = `
      <section class="bq-home-hero">
        <div>
          <p class="eyebrow">Bright Quest</p>
          <h3>Welcome back, ${escapeHtml(state.profile.name)}.</h3>
          <p>Choose today&apos;s path: train for city school exams, build skills in Winter 2026 Training 1, or play reward games.</p>
        </div>
        <div class="bq-home-stats" aria-label="Current progress">
          <span><strong>${attempts.length}</strong><small>tests</small></span>
          <span><strong>${best}%</strong><small>best</small></span>
          <span><strong>${state.profile.stars || 0}</strong><small>stars</small></span>
        </div>
      </section>

      <section class="bq-zone-grid" aria-label="Bright Quest zones">
        <article class="bq-zone-card training">
          <span class="bq-zone-icon" aria-hidden="true">${icon("book")}</span>
          <div>
            <p class="eyebrow">Training</p>
            <h3>Pick the learning path</h3>
            <p>Exam preparation and structured maths training live here.</p>
          </div>
          <div class="bq-module-list">
            <button type="button" class="bq-module-card exam" data-bq-action="city-exam">
              <strong>City School Exam Prep</strong>
              <span>Timed Bright Quest maths, English, reasoning, writing, and weak-spot practice.</span>
            </button>
            <button type="button" class="bq-module-card winter" data-bq-action="winter-training">
              <strong>Winter 2026 Training 1</strong>
              <span>Structured Grade 4 maths training, tests, parent results, and Dragon Forge.</span>
            </button>
          </div>
        </article>

        <button type="button" class="bq-zone-card games" data-bq-action="games">
          <span class="bq-zone-icon" aria-hidden="true">${icon("game")}</span>
          <strong>Games & Rewards</strong>
          <span>Cave River Quest, Street Smart Rescue, Treasure Quest, Dragon Forge, and arcade unlocks.</span>
        </button>

        <button type="button" class="bq-zone-card progress" data-bq-action="progress">
          <span class="bq-zone-icon" aria-hidden="true">${icon("chart")}</span>
          <strong>Progress</strong>
          <span>${weak ? `Current focus: ${escapeHtml(weak[0])}` : "Stars, trend, best score, and progress badges."}</span>
        </button>
      </section>
    `;

    ref.querySelectorAll("[data-bq-action]").forEach((button) => {
      button.addEventListener("click", () => handleKidAction(button.dataset.bqAction));
    });
  }

  function handleKidAction(action) {
    if (action === "city-exam") {
      startLevel(nextSuggestedLevel());
      return;
    }
    if (action === "winter-training") {
      window.location.href = AGMATHS_URL;
      return;
    }
    if (action === "games") {
      openGamesList();
      return;
    }
    if (action === "progress") {
      document.querySelector(".insight-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function addDragonForgeKidCard() {
    const list = document.getElementById("gamesList");
    if (!list || list.querySelector("[data-open-game-url*='agmaths']")) return;
    const card = document.createElement("article");
    card.className = "game-card bq-dragon-forge-card";
    card.innerHTML = `
      <div class="game-thumb dragon" aria-hidden="true">DF</div>
      <div>
        <h3>Dragon Forge</h3>
        <p>Winter 2026 maths reward game with harder Grade 4 multiplication gates.</p>
        <button class="button button-primary" type="button" data-open-game-url="${DRAGON_FORGE_URL}">Open Dragon Forge</button>
      </div>
    `;
    list.appendChild(card);
  }

  function getParentProfile(profiles) {
    if (!profiles.length) return null;
    if (!state.parentProfileId || !state.profiles[state.parentProfileId]) {
      state.parentProfileId = state.profileId && state.profiles[state.profileId] ? state.profileId : profiles[0].id;
    }
    return state.profiles[state.parentProfileId] || null;
  }

  function renderParentHeader(profile, profiles) {
    const header = document.querySelector("#parentScreen .app-header");
    if (!header) return;
    header.innerHTML = `
      <div class="cockpit-title-block">
        <p class="eyebrow">Parent Cockpit</p>
        <h2>${parentRouteTitle()}</h2>
      </div>
      <div class="cockpit-header-controls">
        <label class="parent-child-picker">
          <span>Child</span>
          <select data-parent-switch ${profiles.length ? "" : "disabled"}>
            ${profiles.map((item) => `<option value="${escapeAttr(item.id)}" ${item.id === profile?.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
          </select>
        </label>
        <div class="parent-options-wrap">
          <button class="button button-soft" type="button" data-parent-options>Options</button>
          <div class="parent-options-menu hidden">
            <button type="button" data-parent-shell-action="refresh">Refresh data</button>
            <button type="button" data-parent-shell-action="reset">Reset all data</button>
            <button type="button" data-parent-shell-action="logout">Log out</button>
          </div>
        </div>
      </div>
    `;

    header.querySelector("[data-parent-switch]")?.addEventListener("change", (event) => {
      state.parentProfileId = event.target.value;
      parentNavigate("overview");
    });
  }

  function renderParentRoute(profile) {
    parentProfileList.innerHTML = "";
    parentOverview.innerHTML = "";
    parentQuestionTable.innerHTML = "";
    parentTrainingTable.innerHTML = "";
    [parentProfileList.closest(".parent-grid"), parentQuestionTable.closest(".parent-grid")].forEach((grid) => {
      if (!grid) return;
      grid.classList.add("bq-parent-hidden-grid");
      grid.hidden = true;
      grid.setAttribute("aria-hidden", "true");
      grid.style.setProperty("display", "none", "important");
    });

    if (!profile) {
      parentRecommendation.innerHTML = `
        <section class="bq-parent-page">
          <h3>No child profile yet.</h3>
          <p>Create a child profile from Kid Adventure first. Parent signup and managed child registration are planned for the next layer.</p>
        </section>
      `;
      return;
    }

    const metrics = buildParentMetrics(profile);
    const route = parentRoute();
    const parts = route.split("/");
    const page = parts[0] || "overview";
    const attemptId = parts[1] || "";

    const renderers = {
      overview: () => renderParentOverviewPage(metrics),
      "exam-results": () => attemptId ? renderAttemptDetailPage(metrics, attemptId) : renderExamResultsPage(metrics),
      focus: () => renderFocusPage(metrics),
      training: () => renderTrainingPage(metrics),
      writing: () => renderWritingPage(metrics),
      games: () => renderGamesPage(metrics),
      "winter-2026": () => renderWinterPage(metrics),
      records: () => renderRecordsPage(metrics)
    };
    parentRecommendation.innerHTML = (renderers[page] || renderers.overview)();
    wireParentPage();
  }

  function buildParentMetrics(profile) {
    const attempts = profile.attempts || [];
    const questionStats = attempts.flatMap((attempt) =>
      (attempt.questionStats || []).map((question) => ({ ...question, attempt }))
    );
    const choices = questionStats.filter((question) => question.format !== "writing");
    const writing = questionStats.filter((question) => question.format === "writing").reverse();
    const latest = attempts.at(-1);
    const previous = attempts.at(-2);
    const average = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + (item.percent || 0), 0) / attempts.length) : 0;
    const best = attempts.reduce((max, item) => Math.max(max, item.percent || 0), 0);
    const focus = focusGroups(choices);
    const training = getTrainingCoverage(profile);
    const completedLevels = new Set(attempts.map((attempt) => attempt.level));
    return { profile, attempts, questionStats, choices, writing, latest, previous, average, best, focus, training, completedLevels };
  }

  function focusGroups(questions) {
    const groups = questions.reduce((acc, question) => {
      const skill = question.skill || "Mixed skill";
      acc[skill] ||= { skill, section: question.section || "Mixed", count: 0, missed: 0, seconds: 0, questions: [] };
      acc[skill].count += 1;
      acc[skill].missed += question.correct === false ? 1 : 0;
      acc[skill].seconds += question.secondsSpent || 0;
      acc[skill].questions.push(question);
      return acc;
    }, {});
    return Object.values(groups)
      .map((item) => ({
        ...item,
        averageSeconds: Math.round(item.seconds / Math.max(1, item.count)),
        score: item.missed * 5 + Math.round(item.seconds / 35)
      }))
      .sort((a, b) => b.score - a.score);
  }

  function renderParentOverviewPage(metrics) {
    const trend = metrics.latest && metrics.previous ? metrics.latest.percent - metrics.previous.percent : 0;
    const focus = metrics.focus[0];
    return parentPageShell("overview", `
      <section class="bq-cockpit-status">
        <div>
          <p class="eyebrow">Status</p>
          <h3>${metrics.latest ? `${metrics.profile.name} scored ${metrics.latest.percent}% last time.` : `${metrics.profile.name} is ready for the first saved result.`}</h3>
          <p>${focus ? `Next useful review: ${escapeHtml(focus.skill)}.` : "No recurring weak spot is visible yet."}</p>
        </div>
        <div class="bq-status-metrics">
          ${metric("Tests", metrics.attempts.length)}
          ${metric("Average", metrics.attempts.length ? `${metrics.average}%` : "--")}
          ${metric("Best", metrics.attempts.length ? `${metrics.best}%` : "--")}
          ${metric("Trend", metrics.attempts.length > 1 ? `${trend > 0 ? "+" : ""}${trend}%` : "--")}
        </div>
      </section>
      <section class="bq-parent-query-grid">
        ${queryCard("exam-results", "Exam Prep Results", "Saved City School Exam Prep attempts, scores, and answer records.", "file")}
        ${queryCard("focus", "Focus Areas", "Recurring missed or slow skills with evidence.", "alert")}
        ${queryCard("training", "Training Coverage", "Completed, untouched, and recommended Bright Quest training.", "book")}
        ${queryCard("writing", "Writing Signals", "Saved writing responses and English signals.", "pen")}
        ${queryCard("games", "Games & Rewards", "Reward-game access and recommendation context.", "game")}
        ${queryCard("winter-2026", "Winter 2026 Training 1", "Open AGMaths results and training in its own module.", "snow")}
        ${queryCard("records", "All Records", "Complete saved Bright Quest records for audit access.", "database")}
      </section>
    `, true);
  }

  function renderExamResultsPage(metrics) {
    const rows = metrics.attempts.slice().reverse().map((attempt) => `
      <button class="bq-result-row" type="button" data-parent-route="exam-results/${escapeAttr(attempt.id)}">
        <span>${escapeHtml(attempt.levelName)}</span>
        <strong>${attempt.percent}%</strong>
        <small>${new Date(attempt.date).toLocaleString()} / ${attempt.correct} of ${attempt.total} / ${formatDuration(attempt.secondsUsed || 0)}</small>
      </button>
    `).join("") || `<div class="empty-state">No City School Exam Prep attempts yet.</div>`;
    return parentPageShell("exam-results", `<div class="bq-page-list">${rows}</div>`);
  }

  function renderAttemptDetailPage(metrics, attemptId) {
    const attempt = metrics.attempts.find((item) => item.id === attemptId) || metrics.attempts.at(-1);
    if (!attempt) return parentPageShell("exam-results", `<div class="empty-state">No attempt found.</div>`);
    const questions = attempt.questionStats || [];
    const sorted = [...questions].sort((a, b) => {
      const priority = (question) => {
        if (question.correct === false) return 0;
        if (question.format === "writing") return 1;
        return 2;
      };
      const priorityDiff = priority(a) - priority(b);
      if (priorityDiff) return priorityDiff;
      return (a.number || 0) - (b.number || 0);
    });
    const wrong = questions.filter((item) => item.correct === false).length;
    return parentPageShell("exam-results", `
      <section class="bq-attempt-hero">
        <div><p class="eyebrow">Attempt detail</p><h3>${escapeHtml(attempt.levelName)}</h3><p>${new Date(attempt.date).toLocaleString()}</p></div>
        <div class="bq-attempt-score"><strong>${attempt.percent}%</strong><span>${attempt.correct}/${attempt.total} correct</span><small>${wrong} to review first</small></div>
      </section>
      <section class="bq-question-stack">
        ${sorted.map(questionCard).join("") || `<div class="empty-state">No question records saved for this attempt.</div>`}
      </section>
    `);
  }

  function renderFocusPage(metrics) {
    const rows = metrics.focus.map((focus) => `
      <article class="bq-focus-page-card">
        <div><h3>${escapeHtml(focus.skill)}</h3><p>${escapeHtml(focus.section)} / ${focus.missed} missed / avg ${formatDuration(focus.averageSeconds)}</p></div>
        <div class="bq-evidence-list">${focus.questions.slice(0, 5).map(questionCard).join("")}</div>
      </article>
    `).join("") || `<div class="empty-state">No recurring weak spots yet.</div>`;
    return parentPageShell("focus", `<div class="bq-page-list">${rows}</div>`);
  }

  function renderTrainingPage(metrics) {
    return parentPageShell("training", `
      <section class="bq-two-column">
        <article><p class="eyebrow">Completed</p><h3>${metrics.training.completed.length} opened</h3><div class="bq-chip-cloud">${metrics.training.completed.map((skill) => `<span class="done">${escapeHtml(skill)}</span>`).join("") || "<span>No completed training yet</span>"}</div></article>
        <article><p class="eyebrow">Untouched</p><h3>${metrics.training.untouched.length} remaining</h3><div class="bq-chip-cloud">${metrics.training.untouched.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("") || "<span>All training areas opened</span>"}</div></article>
      </section>
    `);
  }

  function renderWritingPage(metrics) {
    const rows = metrics.writing.map((question) => `
      <article class="bq-writing-record">
        <p class="eyebrow">${escapeHtml(question.attempt?.levelName || "Writing")}</p>
        <h3>${escapeHtml(shorten(question.prompt || "Writing prompt", 140))}</h3>
        <p>${escapeHtml(question.answerText || "No response saved.")}</p>
      </article>
    `).join("") || `<div class="empty-state">No writing samples saved yet.</div>`;
    return parentPageShell("writing", `<div class="bq-page-list">${rows}</div>`);
  }

  function renderGamesPage(metrics) {
    const rows = gameCatalogue.map((game) => {
      const unlocked = metrics.completedLevels.has(game.level);
      return `<article class="bq-game-record ${unlocked ? "unlocked" : ""}"><strong>${escapeHtml(game.name)}</strong><span>${unlocked ? "Unlocked" : `Complete level ${game.level}`}</span></article>`;
    }).join("");
    return parentPageShell("games", `
      <section class="bq-parent-query-grid compact">
        <button class="bq-query-card" type="button" data-open-game-url="cave-river-quest/">${icon("game")}<strong>Cave River Quest</strong><span>3D reward quest</span></button>
        <button class="bq-query-card" type="button" data-open-game-url="street-smart-rescue/">${icon("game")}<strong>Street Smart Rescue</strong><span>Animated puzzle quest</span></button>
        <button class="bq-query-card" type="button" data-open-game-url="${DRAGON_FORGE_URL}">${icon("snow")}<strong>Dragon Forge</strong><span>Winter 2026 Training 1 game</span></button>
      </section>
      <section class="bq-page-list">${rows}</section>
    `);
  }

  function renderWinterPage() {
    return parentPageShell("winter-2026", `
      <section class="bq-cockpit-status winter">
        <div>
          <p class="eyebrow">Linked module</p>
          <h3>Winter 2026 Training 1</h3>
          <p>AGMaths remains the source of truth for its Grade 4 training, tests, cockpit, and Dragon Forge data.</p>
        </div>
        <div class="bq-linked-actions">
          <button class="button button-primary" type="button" data-open-game-url="${AGMATHS_URL}">Open training</button>
          <button class="button button-soft" type="button" data-open-game-url="${AGMATHS_COCKPIT_URL}">Open AGMaths cockpit</button>
        </div>
      </section>
    `);
  }

  function renderRecordsPage(metrics) {
    return parentPageShell("records", `
      <section class="bq-two-column records">
        <article>${recordBlock("Profiles", [{ label: metrics.profile.name, value: `${metrics.attempts.length} attempts` }])}</article>
        <article>${recordBlock("Attempts", metrics.attempts.map((item) => ({ label: item.levelName, value: `${item.percent}%` })))}</article>
        <article>${recordBlock("Questions", metrics.questionStats.map((item) => ({ label: `Q${item.number} ${item.skill || ""}`, value: item.format === "writing" ? "Writing" : item.correct ? "Correct" : "Missed" })))}</article>
        <article>${recordBlock("Training", [...metrics.training.completed.map((item) => ({ label: item, value: "Completed" })), ...metrics.training.untouched.map((item) => ({ label: item, value: "Untouched" }))])}</article>
      </section>
    `);
  }

  function parentPageShell(route, body, isOverview = false) {
    const [eyebrow, title, copy] = parentPageMeta(route);
    return `
      <section class="bq-parent-page ${isOverview ? "overview" : ""}">
        <header class="bq-parent-page-head">
          <div>
            <p class="eyebrow">${escapeHtml(eyebrow)}</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(copy)}</p>
          </div>
          ${isOverview ? "" : `<button class="button button-soft" type="button" data-parent-route="overview">Return to Parent Cockpit</button>`}
        </header>
        ${body}
      </section>
    `;
  }

  function parentPageMeta(route) {
    return ({
      overview: ["Parent overview", "Parent Cockpit Overview", "The fast answer page: status, trend, focus, and where to go next."],
      "exam-results": ["City School Exam Prep", "Exam Prep Results", "Saved Bright Quest attempts and answer review pages."],
      focus: ["Weak spots", "Focus Areas", "Recurring missed or slow skills with evidence."],
      training: ["Training", "Training Coverage", "Completed, untouched, and recommended Bright Quest training."],
      writing: ["English and writing", "Writing Signals", "Saved writing responses and parent review signals."],
      games: ["Rewards", "Games & Rewards", "Unlocked and recommended Bright Quest game experiences."],
      "winter-2026": ["Linked module", "Winter 2026 Training 1", "Open AGMaths without moving its data."],
      records: ["Audit", "All Records", "Complete saved Bright Quest records remain accessible here."]
    }[route] || ["Parent cockpit", "Parent Cockpit", "Review saved progress."]);
  }

  function wireParentPage() {
    parentRecommendation.querySelectorAll("[data-parent-route]").forEach((button) => {
      button.addEventListener("click", () => parentNavigate(button.dataset.parentRoute));
    });
    parentRecommendation.querySelectorAll("[data-open-game-url]").forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = button.dataset.openGameUrl;
      });
    });
  }

  function parentNavigate(route) {
    window.location.hash = `parent/${route}`;
    renderParentDashboard();
  }

  function parentRoute() {
    const raw = window.location.hash.replace(/^#\/?/, "");
    if (!raw.startsWith("parent")) return "overview";
    return raw.replace(/^parent\/?/, "") || "overview";
  }

  function parentRouteTitle() {
    return parentPageMeta(parentRoute().split("/")[0] || "overview")[1];
  }

  function metric(label, value) {
    return `<span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(label)}</small></span>`;
  }

  function queryCard(route, title, copy, iconName) {
    return `<button class="bq-query-card" type="button" data-parent-route="${escapeAttr(route)}">${icon(iconName)}<strong>${escapeHtml(title)}</strong><span>${escapeHtml(copy)}</span></button>`;
  }

  function questionCard(question) {
    return `
      <article class="bq-question-card ${question.correct === false ? "missed" : "correct"}">
        <p class="eyebrow">${escapeHtml(question.correct === false ? "Review first" : question.format === "writing" ? "Writing" : "Correct")}</p>
        <h4>Q${question.number || "?"}: ${escapeHtml(shorten(question.prompt || "", 190))}</h4>
        <p>${escapeHtml(question.skill || question.section || "Saved question")} / ${formatDuration(question.secondsSpent || 0)}</p>
        ${question.format === "writing"
          ? `<p>Response: ${escapeHtml(shorten(question.answerText || "No response saved.", 260))}</p>`
          : `<p>Selected: ${escapeHtml(question.selectedText || "No answer")} / Correct: ${escapeHtml(question.correctText || "")}</p>`}
      </article>
    `;
  }

  function recordBlock(title, rows) {
    return `<p class="eyebrow">${escapeHtml(title)}</p><div class="bq-record-lines">${rows.map((row) => `<div><span>${escapeHtml(row.label)}</span><strong>${escapeHtml(row.value)}</strong></div>`).join("") || `<div><span>No records</span><strong>--</strong></div>`}</div>`;
  }

  function icon(name) {
    const icons = {
      book: "M5 5h10a4 4 0 0 1 4 4v10H9a4 4 0 0 0-4 4V5z M5 5v18",
      game: "M7 15l2-2 2 2 2-2 2 2 M8 9h.01 M16 9h.01 M6 5h12a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z",
      chart: "M4 19V5 M4 19h16 M8 15l3-4 3 2 5-7",
      file: "M8 4h7l4 4v12H8z M15 4v5h5 M10 13h6 M10 17h4",
      alert: "M12 9v4 M12 17h.01 M10.3 4.2 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z",
      pen: "M4 20l4-1 10-10-3-3L5 16z M14 6l3 3",
      snow: "M12 2v20 M4.2 6.2l15.6 11.6 M19.8 6.2 4.2 17.8 M7 4l5 3 5-3 M7 20l5-3 5 3",
      database: "M4 6c0-2 16-2 16 0v12c0 2-16 2-16 0z M4 6c0 2 16 2 16 0 M4 12c0 2 16 2 16 0"
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name] || icons.chart}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  document.addEventListener("click", (event) => {
    const options = event.target.closest("[data-parent-options]");
    if (options) {
      const menu = document.querySelector(".parent-options-menu");
      menu?.classList.toggle("hidden");
      return;
    }
    const action = event.target.closest("[data-parent-shell-action]");
    if (!action) return;
    if (action.dataset.parentShellAction === "refresh") {
      state.profiles = loadProfiles();
      if (state.profileId) state.profile = state.profiles[state.profileId];
      renderParentDashboard();
      showToast("Parent view refreshed.");
    }
    if (action.dataset.parentShellAction === "reset") parentResetButton.click();
    if (action.dataset.parentShellAction === "logout") parentExitButton.click();
  });
})();
