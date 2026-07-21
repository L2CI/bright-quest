(() => {
  const BRIGHT_QUEST_URL = "https://bright-quest.pages.dev/";
  const AGMATHS_BASE_URL = "https://agmaths.dipanjan-gupta.workers.dev/";
  const AGMATHS_API_BASE = "https://agmaths.dipanjan-gupta.workers.dev";
  const CHEMISTRY_COURSE_DATA_URL = "chemistry-training/chemistry-101-winter-2026/data/chemistry-101-course.json?v=20260711a";
  const PHYSICS_COURSE_URL = "physics-training/physics-101-advanced-grade-4/";
  let pendingKidProfile = null;
  let chemistryCourseCache = null;

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
    requestAnimationFrame(() => {
      addDragonForgeKidCard();
      upliftGamesList();
    });
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
      await fetch(`/api/profiles?profileId=${encodeURIComponent(profileId)}`, {
        method: "DELETE",
        headers: window.BrightQuestFamilyAuth?.requestHeaders?.() || {}
      });
    } catch (error) {
      console.warn("Cloud profile delete skipped", error);
    }
  }

  function renderKidShell() {
    const ref = document.querySelector("#brightReferenceDashboard");
    if (!ref || !state.profile) return;
    if (document.body.classList.contains("bq-experience-uplift")) {
      renderKidMissionControl(ref);
      return;
    }
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
          ${window.BrightQuestFamilyAuth?.enabled ? `<button type="button" class="bq-logout-chip" data-bq-action="parent-cockpit">Parent Cockpit</button>` : ""}
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
            <button type="button" class="bq-module-card chemistry" data-bq-action="chemistry-training">
              ${art("chemistry")}
              <strong>Chemistry 101 Winter 2026</strong>
              <span>Video chapters + tests</span>
            </button>
            <button type="button" class="bq-module-card chemistry" data-bq-action="physics-training">
              ${art("focus")}
              <strong>Physics 101: Advanced Grade 4</strong>
              <span>Chapter 1 live pilot</span>
            </button>
          </div>
        </article>

        <button type="button" class="bq-zone-card games" data-bq-action="games">
          ${art("treasure")}
          <strong>Games & Rewards</strong>
          <span>Mechshift Rescue: one polished transforming-machine adventure with three rescue systems.</span>
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

  function renderKidMissionControl(ref) {
    const profile = state.profile;
    const attempts = profile.attempts || [];
    const chemistryChapters = profile.chemistry101Progress?.chapters || {};
    const chemistryCompleted = Object.values(chemistryChapters).filter((chapter) => chapter?.completed).length;
    const physicsStatus = physicsProgress(profile);
    const nextChemistryChapter = nextChemistryChapterNumber(profile);
    const trainingCompleted = profile.trainingCompleted || {};
    const winterCompleted = Object.keys(trainingCompleted).filter((key) => /winter|agmaths/i.test(key) && !/chemistry/i.test(key)).length;
    const best = attempts.reduce((max, attempt) => Math.max(max, Number(attempt.percent || 0)), 0);
    const journeyCount = attempts.length + chemistryCompleted + winterCompleted;
    const mission = chemistryCompleted > 0 && chemistryCompleted < 11
      ? {
        action: "chemistry-training",
        eyebrow: "Next mission",
        title: `Chemistry Lab: Chapter ${nextChemistryChapter}`,
        copy: "Continue the particle investigation, then complete the chapter test.",
        meta: `Chapter ${nextChemistryChapter} of 11 · about 10 minutes`,
        progress: Math.round((chemistryCompleted / 11) * 100),
        image: `chemistry-training/chemistry-101-winter-2026/assets/ui/chapter-${String(nextChemistryChapter).padStart(2, "0")}-card.png`,
        imageAlt: `Chemistry Chapter ${nextChemistryChapter} lesson artwork`
      }
      : {
        action: "city-exam",
        eyebrow: attempts.length ? "Keep going" : "First mission",
        title: attempts.length && best < 75 ? "Repair the latest exam set" : "City Exam Expedition",
        copy: attempts.length ? "Use the next short set to build calm speed and accuracy." : "Start with a short mixed set and unlock your first reward.",
        meta: `${attempts.length} sets complete · about 12 minutes`,
        progress: Math.min(100, attempts.length * 12),
        image: "assets/ui/test-workbench-scene.svg",
        imageAlt: "Bright Quest exam workbench"
      };

    document.querySelector("#dashboardScreen")?.classList.remove("bq-kid-subpage");
    ref.className = "reference-dashboard bq-mission-control";
    ref.innerHTML = `
      <header class="bq-mc-topbar">
        <div class="bq-mc-identity">
          <span class="bq-mc-mark" aria-hidden="true">BQ</span>
          <div><small>Welcome back</small><strong>${escapeHtml(profile.name)}</strong></div>
        </div>
        <div class="bq-mc-status" aria-label="Journey status">
          <span><strong>${profile.stars || 0}</strong><small>stars</small></span>
          <span><strong>${journeyCount}</strong><small>missions</small></span>
        </div>
        <div class="bq-mc-account-actions">
          ${window.BrightQuestFamilyAuth?.enabled ? `<button type="button" class="button button-soft" data-bq-action="parent-cockpit">Parent</button>` : ""}
          <button type="button" class="button button-soft" data-bq-action="logout">Log out</button>
        </div>
      </header>

      <section class="bq-mc-main">
        <section class="bq-next-mission" aria-labelledby="bqNextMissionTitle">
          <div class="bq-next-mission-copy">
            <p class="eyebrow">${mission.eyebrow}</p>
            <h1 id="bqNextMissionTitle">${escapeHtml(mission.title)}</h1>
            <p>${escapeHtml(mission.copy)}</p>
            <div class="bq-mission-progress" role="progressbar" aria-label="Mission progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${mission.progress}">
              <span style="width:${mission.progress}%"></span>
            </div>
            <small>${escapeHtml(mission.meta)}</small>
            <button type="button" class="button button-primary" data-bq-action="${mission.action}">Continue mission</button>
          </div>
          <figure class="bq-next-mission-art">
            <img src="${mission.image}" alt="${escapeAttr(mission.imageAlt)}" />
          </figure>
        </section>

        <section class="bq-worlds-section" aria-labelledby="bqWorldsTitle">
          <div class="bq-section-heading">
            <div><p class="eyebrow">Learn</p><h2 id="bqWorldsTitle">Choose a world</h2></div>
            <p>Continue a course or switch subjects.</p>
          </div>
          <div class="bq-world-grid">
            <button type="button" class="bq-world-tile exam ${mission.action === "city-exam" ? "current" : ""}" data-bq-action="city-exam">
              <img src="assets/ui/core-test-path.svg" alt="" />
              <span class="bq-world-status">${mission.action === "city-exam" ? "Current" : `${attempts.length} sets`}</span>
              <strong>Exam Expedition</strong>
              <small>Maths, English and reasoning</small>
            </button>
            <button type="button" class="bq-world-tile winter" data-bq-action="winter-training">
              <img src="assets/ui/winter-2026/place-value.png" alt="" />
              <span class="bq-world-status">${winterCompleted ? `${winterCompleted} complete` : "Ready"}</span>
              <strong>Winter Maths Workshop</strong>
              <small>Ten focused maths topics</small>
            </button>
            <button type="button" class="bq-world-tile chemistry ${mission.action === "chemistry-training" ? "current" : ""}" data-bq-action="chemistry-training">
              <img src="chemistry-training/chemistry-101-winter-2026/assets/ui/chapter-${String(nextChemistryChapter).padStart(2, "0")}-card.png" alt="" />
              <span class="bq-world-status">${mission.action === "chemistry-training" ? "Current" : `${chemistryCompleted} of 11`}</span>
              <strong>Chemistry Lab</strong>
              <small>Animated lessons and tests</small>
            </button>
            <button type="button" class="bq-world-tile chemistry" data-bq-action="physics-training">
              <img src="physics-training/physics-101-advanced-grade-4/assets/ui/chapter-01-card.png" alt="" />
              <span class="bq-world-status">${physicsStatus.completed ? "Chapter complete" : "Pilot ready"}</span>
              <strong>Physics Workshop</strong>
              <small>Forces, evidence and a cockpit check</small>
            </button>
          </div>
        </section>

        <section class="bq-reward-strip" aria-label="Reward game">
          <img src="mechshift-rescue/assets/mechshift-rescue-keyframe.webp" alt="" />
          <div><p class="eyebrow">Play</p><h2>${attempts.length ? "Mechshift Rescue is ready" : "Your first rescue mission is close"}</h2><p>${attempts.length ? "Transform Relay-7 and restore three city systems." : "Complete one exam set, then launch the transforming rescue adventure."}</p></div>
          <button type="button" class="button button-soft" data-bq-action="games">Open Play</button>
        </section>
      </section>

      <nav class="bq-child-nav" aria-label="Child navigation">
        <button type="button" class="active" data-bq-action="kid-home" aria-current="page">Today</button>
        <button type="button" data-bq-action="learn">Learn</button>
        <button type="button" data-bq-action="games">Play</button>
        <button type="button" data-bq-action="progress">My Journey</button>
      </nav>
    `;

    ref.querySelectorAll("[data-bq-action]").forEach((button) => {
      button.addEventListener("click", () => handleKidAction(button.dataset.bqAction));
    });
  }

  function handleKidAction(action) {
    if (action === "learn") {
      document.querySelector(".bq-worlds-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (action === "city-exam") {
      renderCityExamPrepPage();
      return;
    }
    if (action === "winter-training") {
      renderWinterTrainingPage();
      return;
    }
    if (action === "chemistry-training") {
      window.location.href = chemistry101Url(state.profile, nextChemistryChapterNumber(state.profile));
      return;
    }
    if (action === "physics-training") {
      window.location.href = physics101Url(state.profile);
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
    if (action === "parent-cockpit") {
      window.BrightQuestFamilyAuth?.openParent();
      return;
    }
    if (action === "kid-home") {
      renderKidShell();
      return;
    }
    if (action === "open-agmaths") {
      window.location.href = agmathsUrl("map");
      return;
    }
    if (action === "open-agmaths-cockpit") {
      window.location.href = agmathsUrl("cockpit");
      return;
    }
    if (action === "open-dragon-forge") {
      window.location.href = "mechshift-rescue/";
      return;
    }
    if (action === "logout") {
      if (window.BrightQuestFamilyAuth?.enabled) window.BrightQuestFamilyAuth.logout();
      else switchProfileButton.click();
    }
  }

  function activeAgmathsProfile(profile = null) {
    if (profile) return profile;
    if (state.profile?.id) return state.profile;
    if (state.parentProfileId && state.profiles[state.parentProfileId]) return state.profiles[state.parentProfileId];
    return Object.values(state.profiles || {})[0] || null;
  }

  function agmathsStudentId(profile = null) {
    const agProfile = activeAgmathsProfile(profile);
    return profileKey(agProfile?.id || agProfile?.name || "demo-student");
  }

  function agmathsUrl(route, profile = null, returnRoute = "") {
    const agProfile = activeAgmathsProfile(profile);
    const url = new URL(AGMATHS_BASE_URL);
    url.searchParams.set("from", "brightquest");
    url.searchParams.set("studentId", agmathsStudentId(agProfile));
    if (agProfile?.name) url.searchParams.set("studentName", agProfile.name);
    if (returnRoute) {
      const returnUrl = new URL(BRIGHT_QUEST_URL);
      returnUrl.hash = returnRoute;
      url.searchParams.set("return", returnUrl.toString());
    }
    url.hash = route || "map";
    return url.toString();
  }

  function nextChemistryChapterNumber(profile = null) {
    const chapters = profile?.chemistry101Progress?.chapters || {};
    const ids = ["hidden-code", "periodic-map", "particle-states", "mixtures-separation", "chemical-clues", "mystery-of-stuff", "solid-liquid-gas", "tiny-particles-big-clues", "heat-particles-dance", "melting-not-disappearing", "dissolving-not-melting"];
    const index = ids.findIndex((id) => !chapters[id]?.completed);
    return index < 0 ? ids.length : index + 1;
  }

  function chemistry101Url(profile = null, chapterNumber = null) {
    const profileId = profile?.id || state.profileId || localStorage.getItem("brightQuestActiveProfile") || "";
    const url = new URL("chemistry-training/chemistry-101-winter-2026/", window.location.href);
    if (profileId) url.searchParams.set("profileId", profileId);
    if (chapterNumber) url.searchParams.set("chapter", String(chapterNumber));
    return `${url.pathname.replace(/^\//, "")}${url.search}`;
  }

  function physics101Url(profile = null) {
    const profileId = profile?.id || state.profileId || localStorage.getItem("brightQuestActiveProfile") || "";
    const url = new URL(PHYSICS_COURSE_URL, window.location.href);
    if (profileId) url.searchParams.set("profileId", profileId);
    return `${url.pathname.replace(/^\//, "")}${url.search}`;
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
    ref.querySelectorAll("[data-course-path-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const path = button.previousElementSibling;
        const expanded = path?.classList.toggle("show-full-path") || false;
        button.textContent = expanded ? "Show current path" : path?.classList.contains("winter-path") ? "View full workshop map" : "View full expedition";
        button.setAttribute("aria-expanded", String(expanded));
      });
    });
    return ref;
  }

  function renderCityExamPrepPage() {
    const latest = latestAttemptsByLevel();
    const recommended = nextSuggestedLevel();
    const levels = getAllLevels();
    const completed = levels.filter((level) => latest[level.level]).length;
    const currentIndex = Math.max(0, levels.findIndex((level) => level.level === recommended));
    const body = `
      <section class="bq-prep-summary">
        <div><strong>${completed}/${levels.length}</strong><span>sets attempted</span></div>
        <div><strong>${bestAttemptScore()}%</strong><span>best score</span></div>
        <div><strong>${recommended}</strong><span>suggested set</span></div>
      </section>
      <section class="bq-course-path exam-path" aria-label="City School Exam Prep expedition">
        ${levels.map((level, index) => {
          const attempt = latest[level.level];
          const status = attempt ? `${attempt.percent}% ${scoreLabel(attempt.percent)}` : "Pending";
          const isRecommended = level.level === recommended;
          return `
            <button type="button" class="bq-path-node ${attempt ? "done" : "pending"} ${isRecommended ? "current" : ""} ${index >= currentIndex && index <= currentIndex + 2 ? "nearby" : ""}" data-start-level="${escapeAttr(level.level)}">
              <span class="bq-path-marker">${attempt ? "Done" : String(level.level).padStart(2, "0")}</span>
              <span class="bq-path-copy"><strong>${escapeHtml(level.name)}</strong><small>${escapeHtml(level.challengeLabel || level.difficulty || "City School Prep")}</small></span>
              <span class="bq-path-status">${isRecommended ? "Start next" : escapeHtml(status)}</span>
            </button>
          `;
        }).join("")}
      </section>
      <button class="button button-soft bq-course-path-toggle" type="button" data-course-path-toggle aria-expanded="false">View full expedition</button>
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
          <button type="button" class="bq-command-button" data-open-game-url="mechshift-rescue/"><span>Play Mechshift Rescue</span></button>
        </div>
      </section>
      <section class="bq-course-path winter-path" aria-label="Winter 2026 workshop path">
        ${topics.map(winterTopicCard).join("")}
      </section>
      <button class="button button-soft bq-course-path-toggle" type="button" data-course-path-toggle aria-expanded="false">View full workshop map</button>
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
      <button class="bq-path-node bq-winter-topic ${escapeAttr(topic.visual)}" type="button" data-bq-action="open-agmaths" data-ag-topic-id="${escapeAttr(topic.id)}">
        <span class="bq-path-marker">${String(index + 1).padStart(2, "0")}</span>
        <span class="bq-path-copy"><strong>${escapeHtml(topic.title)}</strong><small>Training and test</small></span>
        <span class="bq-winter-status-row bq-path-status" aria-label="${escapeAttr(topic.title)} progress">
          <span class="bq-status-pill checking" data-ag-status="training"><b>Training</b><em>Checking...</em></span>
          <span class="bq-status-pill checking" data-ag-status="test"><b>Test</b><em>Checking...</em></span>
        </span>
      </button>
    `;
  }

  async function loadWinterTrainingStatus() {
    const cards = [...document.querySelectorAll("[data-ag-topic-id]")];
    if (!cards.length) return;
    const studentId = agmathsStudentId();
    try {
      const [progress, attempts] = await Promise.all([
        fetch(`${AGMATHS_API_BASE}/api/progress?studentId=${encodeURIComponent(studentId)}`, { headers: { accept: "application/json" } }).then((res) => res.ok ? res.json() : []),
        fetch(`${AGMATHS_API_BASE}/api/attempts?studentId=${encodeURIComponent(studentId)}`, { headers: { accept: "application/json" } }).then((res) => res.ok ? res.json() : [])
      ]);
      const progressByTopic = new Map((Array.isArray(progress) ? progress : []).map((item) => [agTopicId(item), item]).filter(([topicId]) => topicId));
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
      updateWinterPathWindow(cards);
    } catch {
      cards.forEach((card) => {
        updateAgStatus(card, "training", false, "Done", "Open AGMaths");
        updateAgStatus(card, "test", false, "Taken", "Open AGMaths");
      });
      updateWinterPathWindow(cards);
    }
  }

  function updateWinterPathWindow(cards) {
    const currentIndex = Math.max(0, cards.findIndex((card) => ![...card.querySelectorAll(".bq-status-pill")].every((pill) => pill.classList.contains("done"))));
    cards.forEach((card, index) => {
      card.classList.toggle("current", index === currentIndex);
      card.classList.toggle("nearby", index >= currentIndex && index <= currentIndex + 2);
    });
  }

  function agTopicId(item) {
    return normalizeAgTopicId(
      item?.topicId ||
      item?.topic_id ||
      item?.topicSlug ||
      item?.topic_slug ||
      item?.topic ||
      item?.moduleId ||
      item?.module_id ||
      item?.lessonId ||
      item?.lesson_id ||
      item?.slug ||
      item?.title ||
      item?.topicTitle ||
      item?.topic_title ||
      item?.name ||
      ""
    );
  }

  function normalizeAgTopicId(value) {
    const slug = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const aliases = {
      "place-value": "place-value",
      "place-values": "place-value",
      "multi-step-arithmetic": "multi-arithmetic",
      "multi-arithmetic": "multi-arithmetic",
      "multiplication": "multiplication",
      "division": "division",
      "fraction-equivalence": "fraction-equivalence",
      "equivalent-fractions": "fraction-equivalence",
      "fraction-operations": "fraction-operations",
      "fractions-operations": "fraction-operations",
      "decimals-data": "decimals-data",
      "decimals-and-data": "decimals-data",
      "angles-geometry": "angles-geometry",
      "angles-and-geometry": "angles-geometry",
      "word-problems": "word-problems",
      "factors-patterns": "factors-patterns",
      "mixed-revision": "factors-patterns"
    };
    return aliases[slug] || slug;
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
    const chemistryDone = Object.values(state.profile.chemistry101Progress?.chapters || {}).filter((chapter) => chapter?.completed).length;
    const physics = physicsProgress(state.profile);
    const latestAttempt = attempts.at(-1);
    const completedLevels = levels.filter((level) => latest[level.level]).length;
    const focusCopy = weak.length ? `Build confidence in ${weak[0][0]} next.` : "Complete a mission to reveal your next focus.";
    const body = `
      <section class="bq-journey-hero">
        <div><p class="eyebrow">Current level</p><h3>${completedLevels ? `Explorer level ${completedLevels}` : "New explorer"}</h3><p>${focusCopy}</p></div>
        <div class="bq-journey-stars"><strong>${state.profile.stars || 0}</strong><span>stars earned</span></div>
      </section>
      <section class="bq-journey-subjects" aria-label="Subject progress">
        ${journeySubject("Exam Expedition", completedLevels, levels.length, latestAttempt ? `${latestAttempt.percent}% latest` : "First set ready", "exam")}
        ${journeySubject("Chemistry Lab", chemistryDone, 11, `${chemistryDone} chapters complete`, "chemistry")}
        ${journeySubject("Physics Workshop", physics.completed ? 1 : 0, 1, physics.test ? `Cockpit Check ${physics.test.score}/10` : physics.completed ? "Cockpit Check ready" : "Chapter 1 ready", "chemistry")}
        ${journeySubject("Winter Workshop", Object.keys(state.profile.trainingCompleted || {}).filter((key) => /winter|agmaths/i.test(key) && !/chemistry/i.test(key)).length, 10, "Maths practice path", "winter")}
      </section>
      <section class="bq-journey-wins">
        <div><p class="eyebrow">Recent win</p><h3>${latestAttempt ? `${latestAttempt.levelName}: ${latestAttempt.percent}%` : "Your first result is waiting"}</h3><p>${latestAttempt ? "That result is now part of your journey." : "Finish one short exam set to start your trophy trail."}</p></div>
        <div class="bq-trophy-shelf" aria-label="Trophies"><span class="earned">First steps</span><span class="${completedLevels >= 3 ? "earned" : ""}">Three sets</span><span class="${chemistryDone >= 5 ? "earned" : ""}">Lab learner</span></div>
      </section>
    `;
    kidPageShell("My Journey", "Milestones, recent wins, and the next skill to strengthen.", "mountain", body);
  }

  function journeySubject(title, done, total, detail, tone) {
    const percent = Math.min(100, Math.round((done / Math.max(1, total)) * 100));
    return `<article class="bq-journey-subject ${tone}"><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(detail)}</span></div><div class="bq-journey-bar" role="progressbar" aria-label="${escapeAttr(title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div><small>${done} of ${total}</small></article>`;
  }

  function upliftGamesList() {
    const screen = document.querySelector("#gamesListScreen");
    if (!screen || !document.body.classList.contains("bq-experience-uplift")) return;
    screen.classList.add("bq-play-uplift");
    screen.querySelector("h2").textContent = "Play";
    const eyebrow = screen.querySelector(".app-header .eyebrow");
    if (eyebrow) eyebrow.textContent = "Reward quests";
    if (closeGamesListButton) closeGamesListButton.textContent = "Back to Today";
    const hero = gamesList.querySelector(".game-gallery-hero");
    hero?.classList.add("bq-play-summary");
    const tiles = [...gamesList.querySelectorAll(".game-tile")];
    const featured = tiles.find((tile) => tile.classList.contains("bq-reward-game-tile") && tile.classList.contains("unlocked")) || tiles.find((tile) => tile.classList.contains("unlocked")) || tiles[0];
    featured?.classList.add("bq-featured-game");
    const secondary = tiles.find((tile) => tile !== featured && tile.classList.contains("unlocked"));
    secondary?.classList.add("bq-play-secondary");
    const nextLocked = tiles.find((tile) => tile.classList.contains("locked"));
    nextLocked?.classList.add("bq-next-unlock");
    tiles.forEach((tile) => {
      if (tile !== featured && tile !== secondary && tile !== nextLocked) tile.classList.add("bq-game-compact");
    });
    if (hero && featured) hero.after(featured);
    if (featured && secondary) featured.after(secondary);
    if ((secondary || featured) && nextLocked) (secondary || featured).after(nextLocked);
  }

  function addDragonForgeKidCard() {
    const list = document.getElementById("gamesList");
    if (!list) return;
    list.querySelectorAll(".game-tile:not(.mechshift-rescue)").forEach((tile) => tile.remove());
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
    const uplift = document.body.classList.contains("bq-experience-uplift");
    document.querySelector("#parentScreen")?.classList.toggle("bq-parent-uplift", uplift);
    const route = parentRoute().split("/")[0] || "overview";
    header.innerHTML = `
      <div class="cockpit-title-block">
        <p class="eyebrow">Parent Cockpit</p>
        <h2>${parentRouteTitle()}</h2>
      </div>
      ${uplift ? `<nav class="bq-parent-nav" aria-label="Parent navigation">
        ${parentNavButton("overview", "Overview", route)}
        ${parentNavButton("learning", "Learning", route)}
        ${parentNavButton("evidence", "Evidence", route)}
        ${parentNavButton("settings", "Settings", route)}
      </nav>` : ""}
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
            ${window.BrightQuestFamilyAuth?.enabled ? `<button type="button" data-parent-shell-action="manage-children">Manage children</button>` : ""}
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
    header.querySelectorAll("[data-parent-route]").forEach((button) => {
      button.addEventListener("click", () => parentNavigate(button.dataset.parentRoute));
    });
  }

  function parentNavButton(route, label, activeRoute) {
    const active = route === activeRoute || (route === "learning" && ["exam-results", "focus", "training", "chemistry", "physics", "winter-2026"].includes(activeRoute)) || (route === "evidence" && ["writing", "records"].includes(activeRoute));
    return `<button type="button" class="${active ? "active" : ""}" data-parent-route="${route}" ${active ? 'aria-current="page"' : ""}>${label}</button>`;
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

    const uplift = document.body.classList.contains("bq-experience-uplift");
    const renderers = {
      overview: () => uplift ? renderParentOverviewUplift(metrics) : renderParentOverviewPage(metrics),
      learning: () => renderParentLearningHub(metrics),
      evidence: () => renderParentEvidenceHub(metrics),
      settings: () => renderParentSettingsHub(metrics),
      "exam-results": () => attemptId ? renderAttemptDetailPage(metrics, attemptId) : renderExamResultsPage(metrics),
      focus: () => renderFocusPage(metrics),
      training: () => renderTrainingPage(metrics),
      writing: () => renderWritingPage(metrics),
      games: () => renderGamesPage(metrics),
      chemistry: () => renderChemistryPage(metrics),
      physics: () => renderPhysicsPage(metrics),
      "winter-2026": () => renderWinterPage(metrics),
      records: () => renderRecordsPage(metrics)
    };
    parentRecommendation.innerHTML = (renderers[page] || renderers.overview)();
    wireParentPage();
  }

  function renderParentOverviewUplift(metrics) {
    const latest = metrics.latest;
    const previous = metrics.previous;
    const trend = latest && previous ? latest.percent - previous.percent : null;
    const focus = metrics.focus[0];
    const attentionRoute = focus ? "focus" : latest ? "exam-results" : "learning";
    const attentionTitle = focus ? `${focus.skill} needs a closer look` : latest ? "Review the latest result" : "Start the first learning record";
    const attentionCopy = focus ? `${focus.missed} missed answer${focus.missed === 1 ? "" : "s"} in the saved evidence.` : latest ? `${latest.levelName} was ${latest.percent}%.` : "No saved exam result exists yet.";
    const recentCopy = latest ? `${latest.levelName}: ${latest.percent}% on ${latest.displayDate}.` : "No recent saved activity.";
    const changeCopy = trend === null ? "A second result will reveal a trend." : trend > 0 ? `Improved by ${trend} points.` : trend < 0 ? `Down ${Math.abs(trend)} points from the previous result.` : "Score is unchanged from the previous result.";
    return parentPageShell("overview", `
      <section class="bq-parent-attention ${focus ? "needs-attention" : "steady"}">
        <div><p class="eyebrow">Attention</p><h3>${escapeHtml(attentionTitle)}</h3><p>${escapeHtml(attentionCopy)}</p></div>
        <button class="button button-primary" type="button" data-parent-route="${attentionRoute}">Review evidence</button>
      </section>
      <section class="bq-parent-decision-grid">
        <article><p class="eyebrow">Recent change</p><h3>${escapeHtml(changeCopy)}</h3><p>${escapeHtml(recentCopy)}</p></article>
        <article><p class="eyebrow">Next action</p><h3>${focus ? `Practise ${escapeHtml(focus.skill)}` : "Keep the routine moving"}</h3><p>${focus ? "Open the evidence first, then choose one short practice activity." : "Choose a learning area and complete one focused activity."}</p></article>
      </section>
      <section class="bq-parent-subject-rows" aria-label="Learning summary">
        ${parentHubRow("learning", "Learning", `${metrics.attempts.length} exam attempts`, metrics.attempts.length ? `${metrics.average}% average` : "No baseline", "chart")}
        ${parentHubRow("chemistry", "Chemistry", `${chemistryProgress(metrics.profile).completed} of 11 chapters`, "Chapter tests and wrong answers", "chemistry")}
        ${parentHubRow("physics", "Physics", `${physicsProgress(metrics.profile).completed ? 1 : 0} of 1 pilot chapter`, "Cockpit Check and evidence reasoning", "focus")}
        ${parentHubRow("evidence", "Evidence", `${metrics.questionStats.length} saved question records`, `${metrics.writing.length} writing samples`, "database")}
      </section>
    `, true);
  }

  function renderParentLearningHub(metrics) {
    const chemistry = chemistryProgress(metrics.profile);
    return parentPageShell("learning", `
      <section class="bq-parent-hub-list" aria-label="Learning areas">
        ${parentHubRow("exam-results", "Exam Expedition", `${metrics.attempts.length} attempts`, metrics.latest ? `${metrics.latest.percent}% latest` : "No result yet", "school")}
        ${parentHubRow("focus", "Focus Areas", `${metrics.focus.length} signals`, metrics.focus[0]?.skill || "No focus flagged", "focus")}
        ${parentHubRow("training", "Bright Quest Training", `${metrics.training.completed.length} complete`, `${metrics.training.untouched.length} available`, "book")}
        ${parentHubRow("chemistry", "Chemistry 101", `${chemistry.completed} of ${chemistry.total} chapters`, `${chemistry.tested} tests submitted`, "chemistry")}
        ${parentHubRow("physics", "Physics 101", `${physicsProgress(metrics.profile).completed ? 1 : 0} of 1 pilot chapter`, physicsProgress(metrics.profile).test ? `Cockpit Check ${physicsProgress(metrics.profile).test.score}/10` : "Test not submitted", "focus")}
        ${parentHubLink(agmathsUrl("cockpit", metrics.profile, "parent/learning"), "Winter Maths", "Open linked AGMaths progress", "External course", "snow")}
      </section>
    `);
  }

  function renderParentEvidenceHub(metrics) {
    const missed = metrics.choices.filter((question) => question.correct === false).length;
    return parentPageShell("evidence", `
      <section class="bq-parent-evidence-summary">
        ${metric("Saved attempts", metrics.attempts.length)}
        ${metric("Missed answers", missed)}
        ${metric("Writing samples", metrics.writing.length)}
      </section>
      <section class="bq-parent-hub-list" aria-label="Evidence areas">
        ${parentHubRow("exam-results", "Attempts and answers", "Wrong answers first in each review", `${metrics.questionStats.length} question records`, "clipboard")}
        ${parentHubRow("writing", "Writing evidence", "Saved responses and writing signals", `${metrics.writing.length} samples`, "writing")}
        ${parentHubRow("records", "All records", "Complete audit view", "Profiles, attempts, questions and training", "database")}
      </section>
    `);
  }

  function renderParentSettingsHub(metrics) {
    return parentPageShell("settings", `
      <section class="bq-parent-settings-list">
        <div><strong>Current child</strong><span>${escapeHtml(metrics.profile.name)}</span></div>
        ${window.BrightQuestFamilyAuth?.enabled ? '<button class="button button-soft" type="button" data-parent-shell-action="manage-children">Manage children and PINs</button>' : ""}
        <button class="button button-soft" type="button" data-parent-shell-action="refresh">Refresh saved data</button>
        <button class="button button-soft danger" type="button" data-parent-shell-action="reset">Reset all data</button>
        <button class="button button-soft" type="button" data-parent-shell-action="logout">Log out</button>
      </section>
    `);
  }

  function parentHubRow(route, title, primary, secondary, iconName) {
    return `<button class="bq-parent-hub-row" type="button" data-parent-route="${escapeAttr(route)}"><span class="bq-parent-row-icon">${icon(iconName)}</span><span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(primary)}</small></span><em>${escapeHtml(secondary)}</em><b aria-hidden="true">›</b></button>`;
  }

  function parentHubLink(url, title, primary, secondary, iconName) {
    return `<button class="bq-parent-hub-row" type="button" data-open-game-url="${escapeAttr(url)}"><span class="bq-parent-row-icon">${icon(iconName)}</span><span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(primary)}</small></span><em>${escapeHtml(secondary)}</em><b aria-hidden="true">›</b></button>`;
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
          queryCard("chemistry", "Chemistry 101 Winter 2026", "Video chapters, tests, and course progress.", "chemistry"),
          queryCard("physics", "Physics 101: Advanced Grade 4", "Force-interaction lesson, Cockpit Check and saved evidence.", "focus"),
          queryLinkCard(agmathsUrl("cockpit", metrics.profile, "parent/overview"), "Winter 2026 Training 1", "Open the AGMaths cockpit for this child.", "winter")
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
      return `<article class="bq-game-record unlocked"><strong>${escapeHtml(game.name)}</strong><span>Mission ready · 8–12 minutes · three systems</span></article>`;
    }).join("");
    return parentPageShell("games", `
      <section class="bq-parent-query-grid compact">
        <button class="bq-query-card area-play bq-parent-mechshift" type="button" data-open-game-url="mechshift-rescue/"><img src="mechshift-rescue/assets/mechshift-rescue-keyframe.webp" alt="" /><strong>Mechshift Rescue</strong><span>Painted cinematic rescue mission · Rover, Lift and Bridge forms</span></button>
      </section>
      <section class="bq-page-list">${rows}</section>
    `);
  }

  function renderWinterPage(metrics) {
    return parentPageShell("winter-2026", `
      <section class="bq-cockpit-status winter">
        <div>
          <p class="eyebrow">Linked module</p>
          <h3>AGMaths progress bridge</h3>
          <p>AGMaths remains the source of truth for its Grade 4 training, tests, and cockpit data.</p>
        </div>
        <div class="bq-linked-actions">
          <button class="button button-primary" type="button" data-open-game-url="${agmathsUrl("map", metrics.profile)}">Open training</button>
          <button class="button button-soft" type="button" data-open-game-url="${agmathsUrl("cockpit", metrics.profile)}">Open AGMaths cockpit</button>
        </div>
      </section>
    `);
  }

  function renderChemistryPage(metrics) {
    const status = chemistryProgress(metrics.profile);
    const totalChapters = status.chapters.length;
    const totalQuestions = totalChapters * 10;
    const rows = status.chapters.map((chapter) => ({ label: chapter.title, value: chapter.test ? `${chapter.test.score}/${chapter.test.total || 10}` : chapter.completed ? "Test ready" : "Pending" }));
    return parentPageShell("chemistry", `
      <section class="bq-cockpit-status winter">
        <div>
          <p class="eyebrow">Bright Quest module</p>
          <h3>Course progress</h3>
          <p>${status.completed}/${totalChapters} chapters watched, ${status.tests}/${totalChapters} chapter tests submitted. Total video runtime is about 74 minutes.</p>
        </div>
        <div class="bq-linked-actions">
          <button class="button button-primary" type="button" data-open-game-url="${chemistry101Url(metrics.profile)}">Open Chemistry 101</button>
        </div>
      </section>
      <section class="bq-chemistry-topic-grid" aria-label="Chemistry 101 progress">
        ${status.chapters.map((chapter, index) => chemistryTopicCard(chapter, index, metrics.profile)).join("")}
      </section>
      ${chemistryReviewPanel(status)}
      <section class="bq-two-column records">
        <article>${recordBlock("Chemistry chapters", rows)}</article>
        <article>${recordBlock("Course summary", [
          { label: "Video chapters", value: `${status.completed}/${totalChapters} complete` },
          { label: "Chapter tests", value: `${status.tests}/${totalChapters} submitted` },
          { label: "Question bank", value: `${totalQuestions} questions` }
        ])}</article>
      </section>
    `);
  }

  function renderPhysicsPage(metrics) {
    const status = physicsProgress(metrics.profile);
    const answerRows = Array.isArray(status.test?.answers) ? status.test.answers.map((answer, index) => ({
      label: `Q${index + 1} ${String(answer.concept || "evidence").replaceAll("-", " ")}`,
      value: answer.correct ? "Correct" : `Review: ${answer.correctAnswer || answer.feedback || "Check the interaction evidence"}`
    })) : [];
    return parentPageShell("physics", `
      <section class="bq-cockpit-status winter">
        <div>
          <p class="eyebrow">Bright Quest live pilot</p>
          <h3>Force Is An Interaction</h3>
          <p>${status.completed ? "The animated lesson is complete." : "The animated lesson has not yet been completed."} ${status.test ? `Latest Cockpit Check: ${status.test.score}/${status.test.total || 10}; best ${status.bestScore || status.test.score}/10.` : "The Cockpit Check has not yet been submitted."}</p>
        </div>
        <div class="bq-linked-actions">
          <button class="button button-primary" type="button" data-open-game-url="${physics101Url(metrics.profile)}">Open Physics 101</button>
        </div>
      </section>
      <section class="bq-two-column records">
        <article>${recordBlock("Pilot progress", [
          { label: "Animated lesson", value: status.completed ? "Complete" : "Pending" },
          { label: "Watched", value: `${Math.round(status.watchedSeconds || 0)} seconds` },
          { label: "Cockpit Check", value: status.test ? `${status.test.score}/${status.test.total || 10}` : "Pending" },
          { label: "Attempts", value: String(status.attempts || 0) }
        ])}</article>
        <article>${recordBlock("Question evidence", answerRows.length ? answerRows : [{ label: "No result yet", value: "Complete the lesson, then submit the Cockpit Check." }])}</article>
      </section>
    `);
  }

  function physicsProgress(profile) {
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem("brightQuestPhysics101ProgressV1")) || {};
    } catch {
      saved = {};
    }
    const profileId = profile?.id || "demo-student";
    const id = "force-is-an-interaction";
    const local = saved[profileId]?.chapters?.[id] || saved["demo-student"]?.chapters?.[id] || {};
    const profileChapter = profile?.physics101Progress?.chapters?.[id] || {};
    const chapter = { ...local, ...profileChapter };
    return {
      completed: Boolean(chapter.completed || profile?.trainingCompleted?.[`physics-101-advanced-grade-4:${id}`]),
      watchedSeconds: Math.max(Number(local.watchedSeconds) || 0, Number(profileChapter.watchedSeconds) || 0),
      test: chapter.test || null,
      bestScore: Math.max(Number(local.bestScore) || 0, Number(profileChapter.bestScore) || 0, Number(chapter.test?.score) || 0),
      attempts: Math.max(Number(local.attempts) || 0, Number(profileChapter.attempts) || 0)
    };
  }

  function chemistryReviewPanel(status) {
    const tested = status.chapters.filter((chapter) => chapter.test);
    if (!tested.length) {
      return `<section class="bq-chemistry-review-panel"><p class="eyebrow">Chapter test review</p><h3>No Chemistry tests submitted yet.</h3><p>Once a chapter test is submitted, the parent review popup will show missed answers first.</p></section>`;
    }
    return `
      <section class="bq-chemistry-review-panel" aria-label="Chemistry chapter test review">
        <div>
          <p class="eyebrow">Chapter test review</p>
          <h3>Review missed answers first</h3>
          <p>Open any submitted chapter test to see the missed questions, selected answers, correct answers, and teaching feedback.</p>
        </div>
        <div class="bq-chemistry-review-actions">
          ${tested.map((chapter) => {
            const missed = chemistryFeedbackItems(chapter).filter((item) => item.correct === false).length;
            return `<button class="button ${missed ? "button-primary" : "button-soft"}" type="button" data-chemistry-review="${escapeAttr(chapter.id)}">
              Chapter ${escapeHtml(String(status.chapters.indexOf(chapter) + 1))}: ${missed ? `${missed} missed` : "All correct"}
            </button>`;
          }).join("")}
        </div>
      </section>
    `;
  }

  function chemistryProgress(profile) {
    const titles = [
      "Matter Has A Hidden Code",
      "The Periodic Table Is A Map",
      "Particles Explain States",
      "Mixtures, Solutions, And Separation",
      "Chemical Change Clues",
      "The Mystery of Stuff",
      "Solid, Liquid or Gas?",
      "Tiny Particles, Big Clues",
      "Heat Makes Particles Dance",
      "Melting Is Not Disappearing",
      "Dissolving Is Not Melting"
    ];
    const ids = ["hidden-code", "periodic-map", "particle-states", "mixtures-separation", "chemical-clues", "mystery-of-stuff", "solid-liquid-gas", "tiny-particles-big-clues", "heat-particles-dance", "melting-not-disappearing", "dissolving-not-melting"];
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem("brightQuestChemistry101ProgressV1")) || {};
    } catch {
      saved = {};
    }
    const profileId = profile?.id || "demo-student";
    const profileChapters = profile?.chemistry101Progress?.chapters || {};
    const localChapters = saved[profileId]?.chapters || {};
    const legacyChapters = saved["demo-student"]?.chapters || {};
    const completedMap = profile?.trainingCompleted || {};
    const chapters = ids.map((id, index) => {
      const chapter = { ...(legacyChapters[id] || {}), ...(localChapters[id] || {}), ...(profileChapters[id] || {}) };
      const completed = Boolean(chapter.completed || completedMap[`chemistry-101-winter-2026:${id}`]);
      return { id, title: titles[index], completed, test: chapter.test || null };
    });
    return {
      chapters,
      completed: chapters.filter((chapter) => chapter.completed).length,
      tests: chapters.filter((chapter) => chapter.test).length
    };
  }

  function chemistryTopicCard(chapter, index, profile = null) {
    const tested = Boolean(chapter.test);
    return `
      <button class="bq-chemistry-topic ${tested ? "tested" : chapter.completed ? "done" : "pending"}" type="button" data-open-game-url="${chemistry101Url(profile)}">
        ${art("chemistry")}
        <span class="bq-winter-number">${String(index + 1).padStart(2, "0")}</span>
        <strong>${escapeHtml(chapter.title)}</strong>
        <span class="bq-winter-status-row" aria-label="${escapeAttr(chapter.title)} progress">
          <span class="bq-status-pill ${chapter.completed ? "done" : "pending"}"><b>Video</b><em>${chapter.completed ? "Done" : "Pending"}</em></span>
          <span class="bq-status-pill ${tested ? "done" : "pending"}"><b>Test</b><em>${tested ? `${chapter.test.score}/${chapter.test.total || 10}` : "Pending"}</em></span>
        </span>
      </button>
    `;
  }

  function chemistryFeedbackItems(chapter, courseChapter = null) {
    const feedback = Array.isArray(chapter?.test?.feedback) ? chapter.test.feedback : [];
    const bank = Array.isArray(courseChapter?.tests) ? courseChapter.tests : [];
    return feedback.map((item, index) => chemistryFeedbackItem(item, bank[index], index));
  }

  function chemistryFeedbackItem(item, bankQuestion, index) {
    const selectedIndex = Number.isInteger(item?.selectedIndex) ? item.selectedIndex : null;
    const answerIndex = Number.isInteger(item?.answerIndex) ? item.answerIndex : Number.isInteger(bankQuestion?.answer) ? bankQuestion.answer : null;
    const selectedFromBank = selectedIndex !== null && Array.isArray(bankQuestion?.options) ? bankQuestion.options[selectedIndex] : "";
    const answerFromBank = answerIndex !== null && Array.isArray(bankQuestion?.options) ? bankQuestion.options[answerIndex] : "";
    const cleanFeedback = item?.feedback || String(item?.copy || "").replace(/^\d+\.\s*(Correct|Review):\s*/i, "") || bankQuestion?.feedback || "";
    return {
      number: item?.number || index + 1,
      correct: item?.correct === true,
      prompt: item?.prompt || bankQuestion?.prompt || `Question ${index + 1}`,
      concept: item?.concept || bankQuestion?.concept || "Chemistry",
      selectedText: item?.selected || item?.selectedText || selectedFromBank || "",
      correctText: item?.answer || item?.correctText || answerFromBank || "",
      feedback: cleanFeedback,
      legacySelection: !(item?.selected || item?.selectedText || selectedFromBank)
    };
  }

  async function loadChemistryCourse() {
    if (chemistryCourseCache) return chemistryCourseCache;
    const response = await fetch(CHEMISTRY_COURSE_DATA_URL, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`Chemistry course data failed: ${response.status}`);
    chemistryCourseCache = await response.json();
    return chemistryCourseCache;
  }

  function currentParentChemistryChapter(chapterId) {
    const profile = getParentProfile(Object.values(state.profiles || {}));
    return chemistryProgress(profile).chapters.find((chapter) => chapter.id === chapterId) || null;
  }

  function ensureChemistryReviewPopup() {
    let popup = document.querySelector("#bqChemistryReviewPopup");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "bqChemistryReviewPopup";
      popup.className = "bq-chem-review-overlay hidden";
      popup.setAttribute("role", "dialog");
      popup.setAttribute("aria-modal", "true");
      document.body.append(popup);
    }
    return popup;
  }

  function showChemistryReviewPopup(html) {
    const popup = ensureChemistryReviewPopup();
    popup.innerHTML = html;
    popup.classList.remove("hidden");
    popup.querySelector("[data-chemistry-review-close]")?.focus();
  }

  function closeChemistryReviewPopup() {
    const popup = document.querySelector("#bqChemistryReviewPopup");
    if (!popup) return;
    popup.classList.add("hidden");
    popup.innerHTML = "";
  }

  async function openChemistryReviewPopup(chapterId) {
    const chapter = currentParentChemistryChapter(chapterId);
    if (!chapter?.test) return;
    showChemistryReviewPopup(chemistryReviewPopupShell(chapter, `<div class="empty-state">Loading question detail...</div>`));
    try {
      const course = await loadChemistryCourse();
      const courseChapter = course?.chapters?.find((item) => item.id === chapterId) || null;
      showChemistryReviewPopup(chemistryReviewPopupShell(chapter, chemistryReviewPopupBody(chapter, courseChapter)));
    } catch {
      showChemistryReviewPopup(chemistryReviewPopupShell(chapter, chemistryReviewPopupBody(chapter, null, true)));
    }
  }

  function chemistryReviewPopupShell(chapter, body) {
    const total = Number(chapter.test?.total || chemistryFeedbackItems(chapter).length || 10);
    const score = Number(chapter.test?.score || 0);
    return `
      <div class="bq-chem-review-scrim" data-chemistry-review-close></div>
      <section class="bq-chem-review-modal" aria-labelledby="bqChemReviewTitle">
        <header class="bq-chem-review-head">
          <div>
            <p class="eyebrow">Chemistry test review</p>
            <h3 id="bqChemReviewTitle">${escapeHtml(chapter.title || "Chapter test")}</h3>
            <p>${score}/${total} correct. Missed answers are shown first.</p>
          </div>
          <button class="button button-soft" type="button" data-chemistry-review-close>Close</button>
        </header>
        ${body}
      </section>
    `;
  }

  function chemistryReviewPopupBody(chapter, courseChapter, usedFallback = false) {
    const items = chemistryFeedbackItems(chapter, courseChapter);
    const missed = items.filter((item) => item.correct === false);
    const correct = items.filter((item) => item.correct === true);
    const missedBody = missed.length
      ? missed.map((item) => chemistryAnswerCard(item, true)).join("")
      : `<div class="empty-state">No missed questions in this chapter test.</div>`;
    const correctBody = correct.length ? correct.map((item) => chemistryAnswerCard(item, false)).join("") : "";
    return `
      ${usedFallback ? `<div class="bq-chem-review-note">Question-bank lookup did not load. Showing the saved attempt details that are available.</div>` : ""}
      <section class="bq-chem-review-section">
        <div class="bq-chem-review-section-head">
          <p class="eyebrow">Wrong answers first</p>
          <strong>${missed.length} missed</strong>
        </div>
        <div class="bq-chem-review-list">${missedBody}</div>
      </section>
      ${correctBody ? `
        <details class="bq-chem-review-correct">
          <summary>Show correct answers too (${correct.length})</summary>
          <div class="bq-chem-review-list">${correctBody}</div>
        </details>
      ` : ""}
    `;
  }

  function chemistryAnswerCard(item, missed) {
    return `
      <article class="bq-question-card bq-chem-answer-card ${missed ? "missed" : "correct"}">
        <p class="eyebrow">${missed ? "Review first" : "Correct"}</p>
        <h4>Q${escapeHtml(String(item.number))}: ${escapeHtml(shorten(item.prompt, 190))}</h4>
        <p>${escapeHtml(item.concept || "Chemistry")}</p>
        <p><strong>Your answer:</strong> ${escapeHtml(item.selectedText || "Not captured for this earlier attempt")}</p>
        <p><strong>Correct answer:</strong> ${escapeHtml(item.correctText || "See chapter question bank")}</p>
        ${item.legacySelection ? `<p class="bq-chem-review-note">This older attempt did not save the selected option, so the parent view can show the missed question and correct answer but not the exact choice picked.</p>` : ""}
        <p>${escapeHtml(item.feedback || "")}</p>
      </article>
    `;
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
      learning: ["Learning", "Learning", "Exam, Winter Maths, Chemistry and focus areas in one place."],
      evidence: ["Evidence", "Evidence", "Attempts, wrong answers, writing and complete saved records."],
      settings: ["Settings", "Settings", "Manage this family, refresh data or sign out."],
      "exam-results": ["City School Exam Prep", "Exam Prep Results", "Saved Bright Quest attempts and answer review pages."],
      focus: ["Weak spots", "Focus Areas", "Recurring missed or slow skills with evidence."],
      training: ["Training", "Training Coverage", "Completed, untouched, and recommended Bright Quest training."],
      writing: ["English and writing", "Writing Signals", "Saved writing responses and parent review signals."],
      games: ["Rewards", "Games & Rewards", "Unlocked and recommended Bright Quest game experiences."],
      chemistry: ["Bright Quest module", "Chemistry 101 Winter 2026", "Video chapter progress and chapter-test results."],
      physics: ["Bright Quest live pilot", "Physics 101: Advanced Grade 4", "Animated force lesson, Cockpit Check and saved evidence reasoning."],
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
    parentRecommendation.querySelectorAll("[data-chemistry-review]").forEach((button) => {
      button.addEventListener("click", () => openChemistryReviewPopup(button.dataset.chemistryReview));
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
    return `<button class="bq-query-card ${learningAreaClass(route || iconName || title)}" type="button" data-parent-route="${escapeAttr(route)}">${art(iconName)}<strong>${escapeHtml(title)}</strong><span>${escapeHtml(copy)}</span></button>`;
  }

  function queryLinkCard(url, title, copy, iconName) {
    return `<button class="bq-query-card ${learningAreaClass(title || iconName || url)}" type="button" data-open-game-url="${escapeAttr(url)}">${art(iconName)}<strong>${escapeHtml(title)}</strong><span>${escapeHtml(copy)}</span></button>`;
  }

  function learningAreaClass(value) {
    const key = String(value || "").toLowerCase();
    if (key.includes("exam") || key.includes("city")) return "area-exam";
    if (key.includes("chem")) return "area-chemistry";
    if (key.includes("winter") || key.includes("agmaths")) return "area-winter";
    if (key.includes("focus")) return "area-focus";
    if (key.includes("training") || key.includes("coverage") || key.includes("book")) return "area-coverage";
    if (key.includes("game") || key.includes("reward") || key.includes("play") || key.includes("treasure")) return "area-play";
    if (key.includes("writing")) return "area-writing";
    if (key.includes("record")) return "area-records";
    if (key.includes("progress") || key.includes("mountain")) return "area-progress";
    return "area-utility";
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
      chemistry: ["#54c8de", "#cf7b3f", "#f5f1e8"],
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
      chemistry: `<path d="M35 24h40v10l-13 18v30c0 8-7 14-16 14s-16-6-16-14V52L35 34z" fill="${c}" stroke="${a}" stroke-width="5" stroke-linejoin="round"/><path d="M32 72h28" stroke="${a}" stroke-width="5" stroke-linecap="round"/><path d="M39 59c8 6 18 0 25 5" stroke="${b}" stroke-width="5" stroke-linecap="round"/><circle cx="78" cy="39" r="7" fill="${a}"/><circle cx="88" cy="56" r="5" fill="${b}"/><circle cx="75" cy="73" r="6" fill="${b}"/><path d="M74 43l10 9M84 59l-7 9" stroke="${a}" stroke-width="4" stroke-linecap="round"/><path d="M35 34h40" stroke="${a}" stroke-width="5" stroke-linecap="round"/>`,
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
    if (event.target.closest("[data-chemistry-review-close]")) {
      closeChemistryReviewPopup();
      return;
    }
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
    if (action.dataset.parentShellAction === "manage-children") window.BrightQuestFamilyAuth?.openFamilySettings();
    if (action.dataset.parentShellAction === "reset") parentResetButton.click();
    if (action.dataset.parentShellAction === "logout") parentExitButton.click();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeChemistryReviewPopup();
  });
})();
