(() => {
  const BRIGHT_QUEST_URL = "https://bright-quest.pages.dev/";
  const AGMATHS_URL = "https://agmaths.dipanjan-gupta.workers.dev/?from=brightquest#map";
  const AGMATHS_COCKPIT_URL = "https://agmaths.dipanjan-gupta.workers.dev/?from=brightquest#cockpit";
  const DRAGON_FORGE_URL = "https://agmaths.dipanjan-gupta.workers.dev/?from=brightquest#game";
  const AGMATHS_API_BASE = "https://agmaths.dipanjan-gupta.workers.dev";
  let pendingKidProfile = null;

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
    dedupeSameNameProfiles();
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
    dedupeSameNameProfiles();
    const profiles = Object.values(state.profiles);
    const profile = confirmationProfile(profiles);
    if (!profile) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    modePassword.value = "";

    showKidConfirmation(profile);
  }

  function showKidConfirmation(profile) {
    pendingKidProfile = profile;
    let screen = document.querySelector("#bqKidConfirmScreen");
    if (!screen) {
      screen = document.createElement("section");
      screen.id = "bqKidConfirmScreen";
      screen.className = "screen bq-kid-confirm-screen hidden";
      screen.innerHTML = `
        <div class="bq-kid-confirm-card">
          <div class="bq-confirm-art"></div>
          <div>
            <p class="eyebrow">Bright Quest check-in</p>
            <h1></h1>
            <p class="bq-confirm-copy"></p>
            <div class="bq-confirm-actions">
              <button class="button button-primary" type="button" data-bq-confirm-yes>Yes, that's me</button>
              <button class="button button-soft" type="button" data-bq-confirm-no>No, go back</button>
            </div>
          </div>
        </div>
      `;
      document.querySelector("#app")?.append(screen);
      screen.querySelector("[data-bq-confirm-yes]")?.addEventListener("click", confirmKidProfile);
      screen.querySelector("[data-bq-confirm-no]")?.addEventListener("click", rejectKidProfile);
    }
    screen.querySelector(".bq-confirm-art").innerHTML = art("compass");
    screen.querySelector("h1").textContent = `Confirm you are ${profile.name}`;
    screen.querySelector(".bq-confirm-copy").textContent = `This keeps stars, tests, games, and training saved under ${profile.name}'s Bright Quest journey.`;
    showOnlyKidConfirm();
  }

  function showOnlyKidConfirm() {
    Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
    document.querySelector("#bqKidConfirmScreen")?.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirmKidProfile() {
    const profile = pendingKidProfile;
    if (!profile) return rejectKidProfile();
    state.profileId = profile.id;
    state.profile = state.profiles[profile.id];
    pendingKidProfile = null;
    saveProfiles();
    document.querySelector("#bqKidConfirmScreen")?.classList.add("hidden");
    renderDashboard();
    showScreen("dashboard");
  }

  function rejectKidProfile() {
    pendingKidProfile = null;
    document.querySelector("#bqKidConfirmScreen")?.classList.add("hidden");
    renderProfileScreen();
    showScreen("profile");
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

  function dedupeSameNameProfiles() {
    const groups = Object.values(state.profiles).reduce((acc, profile) => {
      const key = normalizedName(profile.name || profile.id);
      if (!key) return acc;
      (acc[key] ||= []).push(profile);
      return acc;
    }, {});
    let changed = false;
    Object.values(groups).forEach((profiles) => {
      if (profiles.length < 2) return;
      const canonical = [...profiles].sort((a, b) => profileCanonicalScore(b) - profileCanonicalScore(a))[0];
      profiles.forEach((profile) => {
        if (profile.id === canonical.id) return;
        mergeProfileData(canonical, profile);
        if (state.profileId === profile.id) state.profileId = canonical.id;
        if (state.parentProfileId === profile.id) state.parentProfileId = canonical.id;
        delete state.profiles[profile.id];
        deleteCloudProfile(profile.id);
        changed = true;
      });
      canonical.createdByParent ||= profiles.some((profile) => profile.createdByParent);
      if (state.profileId === canonical.id) state.profile = canonical;
      syncProfileToCloud(canonical);
    });
    if (changed) {
      normalizeProfiles();
      saveProfiles();
    }
  }

  function profileCanonicalScore(profile) {
    return (profile.createdByParent ? 100000 : 0)
      + (profile.id !== "test" ? 10000 : 0)
      + profileActivityScore(profile);
  }

  function mergeProfileData(target, source) {
    target.stars = Math.max(Number(target.stars || 0), Number(source.stars || 0));
    target.createdAt = earliestDate(target.createdAt, source.createdAt);
    target.attempts = mergeArrayRecords(target.attempts || [], source.attempts || [], attemptKey);
    target.writingSamples = mergeArrayRecords(target.writingSamples || [], source.writingSamples || [], writingKey);
    target.trainingCompleted = mergeTraining(target.trainingCompleted || {}, source.trainingCompleted || {});
  }

  function mergeArrayRecords(primary, secondary, keyFn) {
    const seen = new Set();
    return [...primary, ...secondary].filter((item) => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function attemptKey(item) {
    return [item?.date || item?.createdAt || "", item?.level || "", item?.percent || "", item?.score || ""].join("|");
  }

  function writingKey(item) {
    return [item?.date || item?.createdAt || "", item?.prompt || "", item?.response || ""].join("|");
  }

  function mergeTraining(primary, secondary) {
    const merged = { ...secondary, ...primary };
    Object.keys(secondary).forEach((key) => {
      if (!primary[key]) return;
      merged[key] = {
        ...secondary[key],
        ...primary[key],
        count: Math.max(Number(primary[key].count || 0), Number(secondary[key].count || 0)),
        date: latestDate(primary[key].date, secondary[key].date)
      };
    });
    return merged;
  }

  function earliestDate(a, b) {
    if (!a) return b;
    if (!b) return a;
    return new Date(a) <= new Date(b) ? a : b;
  }

  function latestDate(a, b) {
    if (!a) return b;
    if (!b) return a;
    return new Date(a) >= new Date(b) ? a : b;
  }

  async function deleteCloudProfile(profileId) {
    try {
      await fetch(`/api/profiles?profileId=${encodeURIComponent(profileId)}`, { method: "DELETE" });
    } catch (error) {
      console.warn("Cloud profile delete skipped", error);
    }
  }

  function renderKidShell() {
    const ref = document.querySelector("#brightReferenceDashboard");
    if (!ref || !state.profile) return;
    const attempts = state.profile.attempts || [];
    const best = attempts.reduce((max, item) => Math.max(max, item.percent || 0), 0);
    const weak = Object.entries(weakSkillCounts()).sort((a, b) => b[1] - a[1])[0];
    const latest = attempts.at(-1);
    const todayTitle = latest
      ? latest.percent >= 75 ? "Keep the streak going" : "Repair the latest weak spot"
      : "Start today&apos;s quest";
    const todayCopy = latest
      ? latest.percent >= 75
        ? `Last score ${latest.percent}%. Try the next City School Exam Prep set, then choose a reward game.`
        : `Last score ${latest.percent}%. ${weak ? `Focus on ${escapeHtml(weak[0])}, then try another short set.` : "Use a short training run, then try another set."}`
      : "Begin with City School Exam Prep, then unlock a reward game after the first result.";
    document.querySelector("#dashboardScreen")?.classList.remove("bq-kid-subpage");
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
          <button type="button" class="bq-logout-chip" data-bq-action="logout">Log out</button>
        </div>
      </section>

      <section class="bq-today-card" aria-label="Recommended next action">
        ${art("compass")}
        <div>
          <span class="bq-today-label">Continue today</span>
          <h3>${todayTitle}</h3>
          <p>${todayCopy}</p>
        </div>
        <div class="bq-today-actions">
          <button type="button" class="button button-primary" data-bq-action="city-exam">Continue exam prep</button>
          <button type="button" class="button button-soft" data-bq-action="${weak ? "progress" : "games"}">${weak ? "See progress" : "Pick a reward game"}</button>
        </div>
      </section>

      <section class="bq-zone-grid" aria-label="Bright Quest zones">
        <article class="bq-zone-card training">
          ${art("school")}
          <div>
            <p class="eyebrow">Training</p>
            <h3>Pick the learning path</h3>
            <p>Choose a path first. Tests open after the prep map.</p>
          </div>
          <div class="bq-module-list">
            <button type="button" class="bq-module-card exam" data-bq-action="city-exam">
              ${art("school")}
              <strong>City School Exam Prep</strong>
              <span>View all sets</span>
            </button>
            <button type="button" class="bq-module-card winter" data-bq-action="winter-training">
              ${art("winter")}
              <strong>Winter 2026 Training 1</strong>
              <span>Maths course map</span>
            </button>
          </div>
        </article>

        <button type="button" class="bq-zone-card games" data-bq-action="games">
          ${art("treasure")}
          <strong>Games & Rewards</strong>
          <span>Cave River Quest, Street Smart Rescue, Treasure Quest, Dragon Forge, and arcade unlocks.</span>
        </button>

        <button type="button" class="bq-zone-card progress" data-bq-action="progress">
          ${art("mountain")}
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
      renderCityExamPrepPage();
      return;
    }
    if (action === "winter-training") {
      renderWinterTrainingPage();
      return;
    }
    if (action === "games") {
      openGamesList();
      return;
    }
    if (action === "progress") {
      renderKidProgressPage();
      return;
    }
    if (action === "kid-home") {
      renderKidShell();
      return;
    }
    if (action === "open-agmaths") {
      window.location.href = AGMATHS_URL;
      return;
    }
    if (action === "open-agmaths-cockpit") {
      window.location.href = AGMATHS_COCKPIT_URL;
      return;
    }
    if (action === "open-dragon-forge") {
      window.location.href = DRAGON_FORGE_URL;
      return;
    }
    if (action === "logout") {
      switchProfileButton.click();
    }
  }

  function kidPageShell(title, copy, artName, body) {
    const ref = document.querySelector("#brightReferenceDashboard");
    if (!ref || !state.profile) return null;
    document.querySelector("#dashboardScreen")?.classList.add("bq-kid-subpage");
    ref.className = "reference-dashboard bq-home-shell bq-kid-page";
    ref.innerHTML = `
      <section class="bq-kid-page-head">
        ${art(artName)}
        <div>
          <p class="eyebrow">Bright Quest</p>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(copy)}</p>
        </div>
        <button type="button" class="button button-soft" data-bq-action="kid-home">Back to dashboard</button>
      </section>
      ${body}
    `;
    ref.querySelectorAll("[data-bq-action]").forEach((button) => {
      button.addEventListener("click", () => handleKidAction(button.dataset.bqAction));
    });
    ref.querySelectorAll("[data-start-level]").forEach((button) => {
      button.addEventListener("click", () => startLevel(Number(button.dataset.startLevel)));
    });
    return ref;
  }

  function renderCityExamPrepPage() {
    const latest = latestAttemptsByLevel();
    const recommended = nextSuggestedLevel();
    const levels = getAllLevels();
    const completed = levels.filter((level) => latest[level.level]).length;
    const body = `
      <section class="bq-prep-summary">
        <div><strong>${completed}/${levels.length}</strong><span>sets attempted</span></div>
        <div><strong>${bestAttemptScore()}%</strong><span>best score</span></div>
        <div><strong>${recommended}</strong><span>suggested set</span></div>
      </section>
      <section class="bq-prep-grid" aria-label="City School Exam Prep sets">
        ${levels.map((level) => {
          const attempt = latest[level.level];
          const status = attempt ? `${attempt.percent}% ${scoreLabel(attempt.percent)}` : "Pending";
          const isRecommended = level.level === recommended;
          return `
            <button type="button" class="bq-prep-card ${attempt ? "done" : "pending"} ${isRecommended ? "recommended" : ""}" data-start-level="${escapeAttr(level.level)}">
              ${art(attempt ? "mountain" : "school")}
              <span class="bq-prep-state">${isRecommended ? "Suggested next" : attempt ? "Done" : "Pending"}</span>
              <strong>${escapeHtml(level.name)}</strong>
              <small>${escapeHtml(level.challengeLabel || level.difficulty || "City School Prep")}</small>
              <em>${escapeHtml(status)}</em>
            </button>
          `;
        }).join("")}
      </section>
    `;
    kidPageShell("City School Exam Prep", "Choose a set, see what is done, and start the real test only when ready.", "school", body);
  }

  function renderWinterTrainingPage() {
    const topics = winterTopics();
    const body = `
      <section class="bq-winter-brief">
        <div>
          <span class="bq-section-kicker">AGMaths module</span>
          <h4>Choose a topic</h4>
          <p>Each topic shows two signals: training done and test taken.</p>
        </div>
        <div class="bq-winter-actions">
          <button type="button" class="bq-command-button primary" data-bq-action="open-agmaths"><span>Open training map</span></button>
          <button type="button" class="bq-command-button" data-bq-action="open-agmaths-cockpit"><span>Open AGMaths cockpit</span></button>
          <button type="button" class="bq-command-button" data-bq-action="open-dragon-forge"><span>Play Dragon Forge</span></button>
        </div>
      </section>
      <section class="bq-winter-topic-grid" aria-label="Winter 2026 topics">
        ${topics.map(winterTopicCard).join("")}
      </section>
    `;
    kidPageShell("Winter 2026 Training 1", "Training done and test taken are shown on every topic.", "book", body);
    requestAnimationFrame(loadWinterTrainingStatus);
  }

  function winterTopics() {
    return [
      { id: "place-value", title: "Place value", visual: "blackboard" },
      { id: "multi-arithmetic", title: "Multi-step arithmetic", visual: "workbench" },
      { id: "multiplication", title: "Multiplication", visual: "mountain" },
      { id: "division", title: "Division", visual: "reasoning" },
      { id: "fraction-equivalence", title: "Fraction equivalence", visual: "core" },
      { id: "fraction-operations", title: "Fraction operations", visual: "notebook" },
      { id: "decimals-data", title: "Decimals and data", visual: "progress" },
      { id: "angles-geometry", title: "Angles and geometry", visual: "world" },
      { id: "word-problems", title: "Word problems", visual: "reading" },
      { id: "factors-patterns", title: "Mixed revision", visual: "academy" }
    ];
  }

  function winterTopicCard(topic, index) {
    return `
      <button class="bq-winter-topic ${escapeAttr(topic.visual)}" type="button" data-bq-action="open-agmaths" data-ag-topic-id="${escapeAttr(topic.id)}">
        <span class="bq-winter-thumb" aria-hidden="true"></span>
        <span class="bq-winter-number">${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(topic.title)}</strong>
        <span class="bq-winter-status-row" aria-label="${escapeAttr(topic.title)} progress">
          <span class="bq-status-pill checking" data-ag-status="training"><b>Training</b><em>Checking...</em></span>
          <span class="bq-status-pill checking" data-ag-status="test"><b>Test</b><em>Checking...</em></span>
        </span>
      </button>
    `;
  }

  async function loadWinterTrainingStatus() {
    const cards = [...document.querySelectorAll("[data-ag-topic-id]")];
    if (!cards.length) return;
    try {
      const [progress, attempts] = await Promise.all([
        fetch(`${AGMATHS_API_BASE}/api/progress?studentId=demo-student`, { headers: { accept: "application/json" } }).then((res) => res.ok ? res.json() : []),
        fetch(`${AGMATHS_API_BASE}/api/attempts?studentId=demo-student`, { headers: { accept: "application/json" } }).then((res) => res.ok ? res.json() : [])
      ]);
      const progressByTopic = new Map((Array.isArray(progress) ? progress : []).map((item) => [agTopicId(item), item]));
      const attemptsByTopic = new Map();
      (Array.isArray(attempts) ? attempts : []).forEach((item) => {
        const topicId = agTopicId(item);
        if (topicId && !attemptsByTopic.has(topicId)) attemptsByTopic.set(topicId, item);
      });
      cards.forEach((card) => {
        const topicId = card.dataset.agTopicId;
        updateAgStatus(card, "training", progressByTopic.get(topicId)?.status === "completed", "Done", "Pending");
        const attempt = attemptsByTopic.get(topicId);
        const testCopy = attempt ? `${Number(attempt.score ?? 0)}/${Number(attempt.total ?? 10)}` : "Pending";
        updateAgStatus(card, "test", Boolean(attempt), testCopy, "Pending");
      });
    } catch {
      cards.forEach((card) => {
        updateAgStatus(card, "training", false, "Done", "Open AGMaths");
        updateAgStatus(card, "test", false, "Taken", "Open AGMaths");
      });
    }
  }

  function agTopicId(item) {
    return item?.topicId || item?.topic_id || item?.topic || "";
  }

  function updateAgStatus(card, kind, isDone, doneCopy, pendingCopy) {
    const pill = card.querySelector(`[data-ag-status="${kind}"]`);
    if (!pill) return;
    pill.classList.toggle("done", isDone);
    pill.classList.toggle("pending", !isDone);
    pill.classList.remove("checking");
    const value = pill.querySelector("em");
    if (value) value.textContent = isDone ? doneCopy : pendingCopy;
  }

  function renderKidProgressPage() {
    const attempts = state.profile.attempts || [];
    const weak = Object.entries(weakSkillCounts()).sort((a, b) => b[1] - a[1]);
    const latest = latestAttemptsByLevel();
    const levels = getAllLevels();
    const body = `
      <section class="bq-prep-summary progress">
        <div><strong>${attempts.length}</strong><span>tests taken</span></div>
        <div><strong>${bestAttemptScore()}%</strong><span>best score</span></div>
        <div><strong>${state.profile.stars || 0}</strong><span>stars</span></div>
      </section>
      <section class="bq-progress-board">
        <article>
          <h3>Done and pending</h3>
          <div class="bq-mini-status-list">
            ${levels.map((level) => `<div><span>${escapeHtml(level.name)}</span><strong>${latest[level.level] ? `${latest[level.level].percent}%` : "Pending"}</strong></div>`).join("")}
          </div>
        </article>
        <article>
          <h3>Focus areas</h3>
          <div class="bq-chip-cloud">
            ${weak.length ? weak.slice(0, 8).map(([skill, count]) => `<span>${escapeHtml(skill)} / ${count}</span>`).join("") : "<span>No weak spots yet</span>"}
          </div>
        </article>
      </section>
    `;
    kidPageShell("Progress", "See what is done, what is pending, and where to focus next.", "mountain", body);
  }

  function addDragonForgeKidCard() {
    const list = document.getElementById("gamesList");
    if (!list) return;
    if (!list.querySelector("[data-bq-treasure-map-card]")) {
      const treasureCard = document.createElement("article");
      treasureCard.className = "game-tile bq-reward-game-tile bq-treasure-map-card unlocked";
      treasureCard.dataset.bqTreasureMapCard = "true";
      treasureCard.innerHTML = `
        ${art("treasure")}
        <p class="eyebrow">Pirate map quest</p>
        <h3>Treasure Quest</h3>
        <p>Follow the pirate map, collect treasure, and keep the reward-game trail visible.</p>
        <button class="button button-primary" type="button" data-open-game-url="treasure-quest/">Open Treasure Quest</button>
      `;
      list.appendChild(treasureCard);
    }
    if (list.querySelector("[data-open-game-url*='agmaths']")) return;
    const dragonCard = document.createElement("article");
    dragonCard.className = "game-tile bq-reward-game-tile bq-dragon-forge-card unlocked";
    dragonCard.innerHTML = `
      ${art("winter")}
      <p class="eyebrow">Winter maths quest</p>
      <h3>Dragon Forge</h3>
      <p>Winter 2026 maths reward game with harder Grade 4 multiplication gates.</p>
      <button class="button button-primary" type="button" data-open-game-url="${DRAGON_FORGE_URL}">Open Dragon Forge</button>
    `;
    list.appendChild(dragonCard);
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
    header.querySelector("[data-parent-options]")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      header.querySelector(".parent-options-menu")?.classList.toggle("hidden");
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

  function validDate(value) {
    const date = value ? new Date(value) : null;
    return date && Number.isFinite(date.getTime()) ? date : null;
  }

  function displayDate(value) {
    const date = validDate(value);
    return date ? date.toLocaleString() : "Date not captured";
  }

  function normalText(value, fallback = "") {
    if (value === undefined || value === null) return fallback;
    return String(value);
  }

  function matchingAnswer(left, right) {
    if (!left || !right) return undefined;
    return String(left).trim().toLowerCase() === String(right).trim().toLowerCase();
  }

  function normalizeQuestionRecord(rawQuestion, index) {
    const raw = rawQuestion || {};
    const selected = raw.selectedText ?? raw.selectedAnswer ?? raw.selected ?? raw.answer ?? raw.answerText ?? "";
    const correctAnswer = raw.correctText ?? raw.correctAnswer ?? raw.expectedAnswer ?? raw.solution ?? "";
    let correct = typeof raw.correct === "boolean" ? raw.correct : undefined;
    if (correct === undefined && typeof raw.isCorrect === "boolean") correct = raw.isCorrect;
    if (correct === undefined) correct = matchingAnswer(selected, correctAnswer);
    return {
      ...raw,
      number: raw.number ?? raw.questionNumber ?? raw.questionIndex ?? index + 1,
      prompt: normalText(raw.prompt ?? raw.question ?? raw.text ?? raw.title ?? raw.skill, "Question detail not captured"),
      skill: normalText(raw.skill ?? raw.topic ?? raw.section, "Saved question"),
      section: normalText(raw.section ?? raw.topic ?? raw.skill, "Saved question"),
      format: raw.format || (raw.writingResponse || raw.answerText && !correctAnswer ? "writing" : "choice"),
      selectedText: normalText(selected, "No answer"),
      correctText: normalText(correctAnswer, "Not captured"),
      answerText: normalText(raw.answerText ?? raw.writingResponse ?? selected, ""),
      secondsSpent: Number(raw.secondsSpent ?? raw.seconds ?? raw.timeSeconds ?? raw.durationSeconds ?? 0) || 0,
      correct
    };
  }

  function normalizeParentAttempt(rawAttempt, index) {
    const raw = rawAttempt || {};
    const level = raw.level ?? raw.levelId ?? raw.set ?? raw.stage ?? "";
    const levelInfo = typeof getAllLevels === "function"
      ? getAllLevels().find((item) => String(item.level) === String(level))
      : null;
    const questionStats = Array.isArray(raw.questionStats)
      ? raw.questionStats.map(normalizeQuestionRecord)
      : Array.isArray(raw.answers)
        ? raw.answers.map(normalizeQuestionRecord)
        : [];
    const inferredCorrect = questionStats.length
      ? questionStats.filter((question) => question.correct === true).length
      : 0;
    const total = Number(raw.total ?? raw.questionCount ?? questionStats.length ?? 0) || 0;
    const correct = Number(raw.correct ?? raw.score ?? inferredCorrect ?? 0) || 0;
    const percent = Number.isFinite(Number(raw.percent))
      ? Number(raw.percent)
      : total ? Math.round((correct / total) * 100) : 0;
    const date = raw.date ?? raw.completedAt ?? raw.finishedAt ?? raw.startedAt ?? raw.createdAt ?? "";
    const fallbackId = [level || "attempt", date || index].join("-");
    return {
      ...raw,
      id: normalText(raw.id ?? raw.attemptId ?? fallbackId),
      level,
      levelName: normalText(raw.levelName ?? raw.name ?? levelInfo?.name ?? (level ? `Level ${level}` : "City School Exam Prep")),
      date,
      displayDate: displayDate(date),
      correct,
      total,
      percent,
      secondsUsed: Number(raw.secondsUsed ?? raw.durationSeconds ?? raw.elapsedSeconds ?? raw.timeSeconds ?? 0) || 0,
      questionStats
    };
  }

  function buildParentMetrics(profile) {
    const attempts = (profile.attempts || []).map(normalizeParentAttempt);
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
    const trendCopy = !metrics.latest
      ? "No completed City School Exam Prep attempt yet."
      : metrics.previous
        ? trend > 0 ? `Improved by ${trend} points since the previous test.` : trend < 0 ? `Dropped by ${Math.abs(trend)} points since the previous test.` : "Score is flat against the previous test."
        : "First saved result is ready for review.";
    const nextRoute = focus ? "focus" : metrics.latest ? "exam-results" : "training";
    const nextCopy = focus
      ? `Review ${escapeHtml(focus.skill)} first, then assign a short training path.`
      : metrics.latest
        ? "Review the latest attempt, then decide whether to practise or play."
        : "Start with City School Exam Prep or Winter 2026 Training 1.";
    return parentPageShell("overview", `
      <section class="bq-cockpit-status">
        <div>
          <p class="eyebrow">Parent answer desk</p>
          <h3>${metrics.latest ? `${metrics.profile.name} scored ${metrics.latest.percent}% last time.` : `${metrics.profile.name} is ready for the first saved result.`}</h3>
          <p>${nextCopy}</p>
        </div>
        <div class="bq-status-metrics">
          ${metric("Tests", metrics.attempts.length)}
          ${metric("Average", metrics.attempts.length ? `${metrics.average}%` : "--")}
          ${metric("Best", metrics.attempts.length ? `${metrics.best}%` : "--")}
          ${metric("Trend", metrics.attempts.length > 1 ? `${trend > 0 ? "+" : ""}${trend}%` : "--")}
        </div>
      </section>

      <section class="bq-answer-grid" aria-label="Parent cockpit answers">
        ${answerCard("Is my child on track?", metrics.latest ? `${metrics.latest.percent}% latest / ${metrics.average}% average` : "No test record yet", metrics.latest ? scoreLabel(metrics.latest.percent) : "Needs first attempt", "exam-results", "compass")}
        ${answerCard("What changed recently?", trendCopy, metrics.attempts.length > 1 ? "Trend signal" : "Baseline", metrics.attempts.length ? "exam-results" : "training", "mountain")}
        ${answerCard("What should I do next?", nextCopy, focus ? `Focus: ${focus.skill}` : "Next action", nextRoute, "focus")}
      </section>

      <section class="bq-parent-groups" aria-label="Detailed cockpit areas">
        ${queryGroup("Learning", "Exam prep, weak spots, training coverage, and Winter 2026.", [
          queryCard("exam-results", "City School Exam Prep", "Attempts, scores, and answer records.", "school"),
          queryCard("focus", "Focus Areas", "Recurring missed or slow skills with evidence.", "focus"),
          queryCard("training", "Training Coverage", "Completed, untouched, and recommended Bright Quest training.", "book"),
          queryCard("winter-2026", "Winter 2026 Training 1", "Open AGMaths training and cockpit as the linked module.", "winter")
        ])}
        ${queryGroup("Play", "Reward games and motivation signals.", [
          queryCard("games", "Games & Rewards", "Reward-game access and recommendation context.", "treasure")
        ])}
        ${queryGroup("Records", "Detailed saved evidence when you want to interrogate the data.", [
          queryCard("writing", "Writing Signals", "Saved writing responses and English signals.", "writing"),
          queryCard("records", "All Records", "Complete saved Bright Quest records for audit access.", "records")
        ])}
      </section>
    `, true);
  }

  function renderExamResultsPage(metrics) {
    const rows = metrics.attempts.slice().reverse().map((attempt) => `
      <button class="bq-result-row" type="button" data-parent-route="exam-results/${escapeAttr(attempt.id)}">
        <span>${escapeHtml(attempt.levelName)}</span>
        <strong>${attempt.percent}%</strong>
        <small>${escapeHtml(attempt.displayDate)} / ${attempt.correct} of ${attempt.total} / ${formatDuration(attempt.secondsUsed || 0)}</small>
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
        <div><p class="eyebrow">Attempt detail</p><h3>${escapeHtml(attempt.levelName)}</h3><p>${escapeHtml(attempt.displayDate)}</p></div>
        <div class="bq-attempt-score"><strong>${attempt.percent}%</strong><span>${attempt.correct}/${attempt.total} correct</span><small>${wrong} to review first</small></div>
      </section>
      <button class="button button-soft bq-page-return-inline" type="button" data-parent-route="exam-results">Back to Exam Results</button>
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
        <button class="bq-query-card" type="button" data-open-game-url="cave-river-quest/">${art("mountain")}<strong>Cave River Quest</strong><span>3D reward quest</span></button>
        <button class="bq-query-card" type="button" data-open-game-url="street-smart-rescue/">${art("focus")}<strong>Street Smart Rescue</strong><span>Animated puzzle quest</span></button>
        <button class="bq-query-card" type="button" data-open-game-url="treasure-quest/">${art("treasure")}<strong>Treasure Quest</strong><span>Pirate map reward prototype</span></button>
        <button class="bq-query-card" type="button" data-open-game-url="${DRAGON_FORGE_URL}">${art("winter")}<strong>Dragon Forge</strong><span>Winter 2026 Training 1 game</span></button>
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

  function answerCard(question, answer, status, route, artName) {
    return `<button class="bq-answer-card" type="button" data-parent-route="${escapeAttr(route)}">
      ${art(artName)}
      <span class="bq-answer-copy">
        <strong>${escapeHtml(question)}</strong>
        <em>${escapeHtml(status)}</em>
        <span>${escapeHtml(answer)}</span>
      </span>
    </button>`;
  }

  function queryGroup(title, copy, cards) {
    return `<section class="bq-query-group">
      <div class="bq-query-group-head">
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(copy)}</p>
      </div>
      <div class="bq-parent-query-grid">${cards.join("")}</div>
    </section>`;
  }

  function queryCard(route, title, copy, iconName) {
    return `<button class="bq-query-card" type="button" data-parent-route="${escapeAttr(route)}">${art(iconName)}<strong>${escapeHtml(title)}</strong><span>${escapeHtml(copy)}</span></button>`;
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

  function art(name) {
    const palette = {
      school: ["#2563eb", "#14b8a6", "#facc15"],
      winter: ["#0ea5e9", "#7c3aed", "#e0f2fe"],
      treasure: ["#f97316", "#facc15", "#22c55e"],
      mountain: ["#16a34a", "#38bdf8", "#f59e0b"],
      compass: ["#1d4ed8", "#8b5cf6", "#f43f5e"],
      focus: ["#0f766e", "#f97316", "#fde68a"],
      records: ["#4f46e5", "#06b6d4", "#f8fafc"],
      writing: ["#be123c", "#f59e0b", "#fff7ed"],
      book: ["#2563eb", "#22c55e", "#fef3c7"]
    }[name] || ["#2563eb", "#14b8a6", "#facc15"];
    const [a, b, c] = palette;
    const drawings = {
      school: `<path d="M25 62h58v30H25z" fill="${c}"/><path d="M32 45h44l10 17H22z" fill="${a}"/><path d="M48 62h13v30H48z" fill="#fff7ed"/><path d="M36 70h8M66 70h8" stroke="${b}" stroke-width="5" stroke-linecap="round"/><circle cx="55" cy="36" r="10" fill="${b}"/><path d="M88 32l8-11M91 42l13-3" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`,
      winter: `<path d="M25 68l30-28 30 28v24H25z" fill="${a}"/><path d="M38 67h34v25H38z" fill="${c}"/><path d="M20 69h70L55 35z" fill="#f8fafc"/><path d="M47 76h16M47 84h16" stroke="${b}" stroke-width="5" stroke-linecap="round"/><circle cx="85" cy="29" r="5" fill="${c}"/><circle cx="28" cy="36" r="4" fill="${c}"/>`,
      treasure: `<path d="M24 55h64v33H24z" fill="${a}"/><path d="M24 55c7-20 57-20 64 0z" fill="${c}"/><path d="M24 66h64M56 52v38" stroke="#7c2d12" stroke-width="5"/><circle cx="56" cy="70" r="7" fill="${b}"/><path d="M32 30l5 9 10 1-8 6 3 10-10-5-9 5 2-10-7-6 10-1z" fill="${b}"/>`,
      mountain: `<path d="M16 88l27-49 17 27 11-18 25 40z" fill="${a}"/><path d="M43 39l8 13-14 2zM71 48l6 10-12 1z" fill="#f8fafc"/><path d="M28 82c20-9 36-11 61-3" stroke="${b}" stroke-width="6" stroke-linecap="round"/><path d="M80 32v26M80 33h18l-5 8 5 8H80" stroke="${c}" stroke-width="5" fill="none" stroke-linejoin="round"/>`,
      compass: `<circle cx="56" cy="58" r="34" fill="${c}"/><circle cx="56" cy="58" r="24" fill="#fff"/><path d="M67 42L59 68 45 75l8-26z" fill="${a}"/><path d="M49 44l14 28" stroke="${b}" stroke-width="5" stroke-linecap="round"/><path d="M20 92h72" stroke="${b}" stroke-width="5" stroke-linecap="round"/>`,
      focus: `<circle cx="47" cy="48" r="24" fill="${c}" stroke="${a}" stroke-width="7"/><path d="M64 65l24 24" stroke="${a}" stroke-width="9" stroke-linecap="round"/><path d="M39 44h16M39 54h23" stroke="${b}" stroke-width="5" stroke-linecap="round"/><path d="M23 84h34" stroke="${b}" stroke-width="5" stroke-linecap="round"/>`,
      records: `<path d="M28 24h49l12 13v57H28z" fill="${c}" stroke="${a}" stroke-width="5" stroke-linejoin="round"/><path d="M77 24v16h14" fill="none" stroke="${a}" stroke-width="5"/><path d="M39 48h34M39 62h38M39 76h25" stroke="${b}" stroke-width="5" stroke-linecap="round"/><path d="M21 34h12M21 50h12M21 66h12" stroke="${a}" stroke-width="5" stroke-linecap="round"/>`,
      writing: `<path d="M24 68c14-8 32-8 44 0v25c-13-7-30-7-44 0z" fill="${c}" stroke="${a}" stroke-width="5"/><path d="M68 68c9-6 17-7 25-2v26c-8-4-16-3-25 1z" fill="#fff" stroke="${a}" stroke-width="5"/><path d="M71 28l18 8-28 35-12 4 3-13z" fill="${b}"/><path d="M39 80h19" stroke="${a}" stroke-width="5" stroke-linecap="round"/>`,
      book: `<path d="M24 30h30c8 0 12 4 12 12v52c-4-5-9-7-16-7H24z" fill="${c}" stroke="${a}" stroke-width="5"/><path d="M66 42c0-8 4-12 12-12h18v57H80c-7 0-11 2-14 7z" fill="#fff" stroke="${b}" stroke-width="5"/><path d="M36 47h16M36 61h18M78 49h10M78 63h10" stroke="${a}" stroke-width="5" stroke-linecap="round"/>`
    };
    return `<span class="bq-art bq-art-${escapeAttr(name)}" aria-hidden="true">
      <svg viewBox="0 0 112 112" role="img" focusable="false">
        <rect x="8" y="8" width="96" height="96" rx="26" fill="rgba(255,255,255,0.72)"/>
        ${drawings[name] || drawings.book}
      </svg>
    </span>`;
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
