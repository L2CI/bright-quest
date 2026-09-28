(() => {
  // Presentation state is deliberately separate from learner records and drafts.
  const views = new Map();
  let context = null;
  let renderInProgress = false;
  const routes = new Set(["today", "learn", "play", "journey", "exams", "winter", "international"]);
  const icons = {
    today: '<path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10"/>',
    learn: '<path d="M12 5v16M3 4h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3z"/>',
    play: '<path d="M7 7h10c3 0 5 10 3 12-2 2-5-3-5-3H9s-3 5-5 3C2 17 4 7 7 7ZM7 10v5m-2-2h4m6-2h.01m3 3h.01"/>',
    journey: '<path d="M12 3 9 9l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1z"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>'
  };
  const esc = (value) => escapeHtml(value);
  const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
  const art = (path, alt = "", eager = false) => `<img src="${esc(path)}" alt="${esc(alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async" />`;

  function uiState() {
    const id = state.profile?.id || "";
    if (!views.has(id)) {
      let saved = {};
      try { saved = JSON.parse(sessionStorage.getItem(`brightQuestUiViewV1:${id}`) || "{}"); } catch { /* Optional UI preference. */ }
      views.set(id, { route: "today", query: "", subject: "all", type: "all", duration: "all", scroll: {}, ...saved });
    }
    return views.get(id);
  }

  function remember() {
    try { sessionStorage.setItem(`brightQuestUiViewV1:${state.profile.id}`, JSON.stringify(uiState())); } catch { /* Learning works without UI preferences. */ }
  }

  function route() {
    const hash = window.location.hash.match(/^#child\/([a-z-]+)$/)?.[1];
    return routes.has(hash) ? hash : routes.has(uiState().route) ? uiState().route : "today";
  }

  function navigation(active) {
    return `<nav class="bq-studio-nav" aria-label="Child navigation">${[["today", "Today"], ["learn", "Learn"], ["play", "Play"], ["journey", "My Journey"]].map(([id, name]) => `<button type="button" data-child-route="${id}" ${id === active ? 'aria-current="page"' : ""}>${svg(id)}<span>${name}</span></button>`).join("")}</nav>`;
  }

  function header(active) {
    const profile = state.profile;
    return `<header class="bq-studio-header">
      <a class="bq-studio-brand" href="#child/today" aria-label="Bright Quest Today">${art("assets/ui/bright-quest-mark.svg")}<span>Bright Quest<small>Learning is an adventure</small></span></a>
      <div class="bq-studio-person"><span class="bq-avatar" aria-hidden="true">${esc((profile.name || "B").slice(0, 1))}</span><strong>${esc(profile.name)}</strong><span class="bq-star-count" aria-label="${Number(profile.stars || 0)} stars">${svg("journey")}${Number(profile.stars || 0)}</span></div>
      <div class="bq-studio-account">${window.BrightQuestFamilyAuth?.enabled ? '<button class="button button-soft" type="button" data-bq-action="parent-cockpit">Parent</button>' : ""}<button class="bq-text-button" type="button" data-bq-action="switch-child">${esc(switchProfileButton?.textContent || "Switch child")}</button></div>
    </header>${navigation(active)}`;
  }

  function catalogue() {
    const profile = state.profile;
    const chapters = Object.values(profile.chemistry101Progress?.chapters || {});
    const chemistryDone = chapters.filter((item) => item?.completed).length;
    const physics = context.physicsProgress(profile);
    const exams = getAllLevels();
    const attempted = new Set((profile.attempts || []).map((item) => String(item.level)));
    const examDone = exams.filter((item) => attempted.has(String(item.level))).length;
    return [
      { id: "exams", title: "Exam Expedition", subject: "mixed", type: "test", tone: "blue", action: "city-exam", image: "assets/ui/illustrated-worlds/exam-expedition.webp", copy: "Maths, English and reasoning in eight practice sets.", status: `${examDone} of ${exams.length} sets attempted`, meta: "30 minutes per set", minutes: 30 },
      { id: "icas", title: "ICAS Challenge Lab", subject: "mixed", type: "test", tone: "teal", action: "icas-prep", image: "assets/ui/illustrated-worlds/challenge-observatory.webp", copy: "Choose maths or spelling. Practise a skill or try a full simulation.", status: `${(profile.icasAttempts || []).length} attempts saved`, meta: "Choose your test length" },
      { id: "winter", title: "Winter Maths Workshop", subject: "maths", type: "lesson", tone: "violet", action: "winter-training", image: "assets/ui/illustrated-worlds/winter-maths.webp", copy: "Ten topics with guided lessons and checks in AGMaths.", status: "Open your course map", meta: "Winter 2026 · at your pace" },
      { id: "chemistry", title: "Chemistry Lab", subject: "science", type: "lesson", tone: "orange", action: "chemistry-training", image: "assets/ui/illustrated-worlds/chemistry-lab.webp", copy: "See particles, investigate materials and test your discoveries.", status: `${chemistryDone} of 11 chapters complete`, meta: "11 animated chapters" },
      { id: "physics", title: "Physics Workshop", subject: "science", type: "lesson", tone: "cyan", action: "physics-training", image: "assets/ui/illustrated-worlds/physics-workshop.webp", copy: "Explore forces through animated lessons and chapter checks.", status: `${physics.completed} of ${physics.total} chapters complete`, meta: `${physics.total} chapters available` },
      { id: "grammar", title: "Grammar Gym", subject: "english", type: "lesson", tone: "green", href: "english-grammar/", image: "assets/ui/illustrated-worlds/grammar-garden.webp", copy: "Build sentences with narrated boards, examples and practice.", status: "Progress stays on this device", meta: "Three lesson ladders" },
      { id: "blackboard", title: "Focus Studio", subject: "mixed", type: "lesson", tone: "blue", href: "blackboard-focus-session/", image: "assets/ui/illustrated-worlds/focus-studio.webp", copy: "Work through explanations and questions from your learning.", status: "Choose your focus", meta: "Guided practice" },
      { id: "international", title: "International Challenges", subject: "mixed", type: "test", tone: "teal", action: "international", image: "assets/ui/illustrated-worlds/world-voyage.webp", copy: "Three global-style exam sets with a writing task.", status: `${(window.BrightQuestInternationalTests || []).filter((item) => attempted.has(String(item.level))).length} of 3 sets attempted`, meta: "30 minutes per set", minutes: 30 },
      { id: "beacon", title: "Beacon Brigade", subject: "mixed", type: "game", tone: "orange", action: "beacon-brigade", image: "beacon-brigade/assets/module-preview.jpg", copy: "Explore five districts, build your base and choose your expeditions.", status: "Continue your adventure", meta: "Five subject worlds" },
      { id: "sparkbound", title: "Sparkbound", subject: "mixed", type: "game", tone: "violet", action: "sparkbound", image: "sparkbound/assets/module-preview.jpg", copy: "Choose your hero, train your skills and master the arena.", status: "Hero and campaign saved in game", meta: "Heroes · equipment · duels" },
      { id: "maths-lessons", title: "Maths Board Lessons", subject: "maths", type: "lesson", tone: "violet", href: "maths-training/", image: "assets/ui/illustrated-worlds/winter-maths.webp", copy: "Revisit the original narrated maths lessons and examples.", status: "Original lesson collection", meta: "At your pace", collection: true },
      { id: "secret-alphabet", title: "The Secret Alphabet of Matter", subject: "science", type: "lesson", tone: "orange", href: "chemistry-training/secret-alphabet-session/", image: "assets/ui/illustrated-worlds/chemistry-lab.webp", copy: "Explore the earlier standalone matter lesson.", status: "Original lesson collection", meta: "At your pace", collection: true },
      { id: "chemistry-original", title: "Chemistry: Lesson One", subject: "science", type: "lesson", tone: "orange", href: "chemistry-training/lesson-1/", image: "assets/ui/illustrated-worlds/chemistry-lab.webp", copy: "Return to the original Chemistry introduction.", status: "Original lesson collection", meta: "At your pace", collection: true }
    ];
  }

  function card(item) {
    const attr = item.action ? `data-bq-action="${item.action}"` : `data-child-href="${esc(item.href)}"`;
    return `<button type="button" class="bq-library-card bq-tone-${item.tone}" ${attr}><span class="bq-library-art">${item.customArt || art(item.image)}</span><span class="bq-library-copy"><span class="bq-library-kind">${esc(item.type === "test" ? "Practice & tests" : item.type === "game" ? "Learning adventure" : "Guided lessons")}</span><strong>${esc(item.title)}</strong><span class="bq-library-description">${esc(item.copy)}</span><span class="bq-library-meta">${esc(item.meta)}</span><span class="bq-library-status">${esc(item.status)}${svg("arrow")}</span></span></button>`;
  }

  function mission() {
    const draft = window.BrightQuestDrafts?.get();
    if (draft) return { title: draft.levelName || "Your saved test", eyebrow: "Right where you left off", copy: `Question ${Number(draft.activeQuestion || 0) + 1} of ${Number(draft.totalQuestions || 0)}. Your answers and writing are kept with this test.`, meta: `${Math.ceil(Math.max(0, Number(draft.remainingSeconds || 0)) / 60)} minutes remaining`, action: "resume-draft", button: window.BrightQuestDrafts.canResume(draft) ? "Resume saved test" : "View saved test", image: "assets/ui/illustrated-worlds/discovery-treehouse.webp" };
    const attempted = new Set((state.profile.attempts || []).map((attempt) => String(attempt.level)));
    const next = getAllLevels().find((level) => !attempted.has(String(level.level)));
    const chemistry = Object.values(state.profile.chemistry101Progress?.chapters || {});
    const completed = chemistry.filter((chapter) => chapter?.completed).length;
    if (completed > 0 && completed < 11) return { title: "Your next discovery awaits", eyebrow: "Continue Chemistry Lab", copy: `Open chapter ${context.nextChemistryChapterNumber(state.profile)} and continue exploring the world of particles.`, meta: `${completed} of 11 chapters complete`, action: "chemistry-training", button: "Continue the course", image: "assets/ui/illustrated-worlds/chemistry-lab.webp" };
    if (next) return { title: attempted.size ? "Ready for your next challenge?" : "A little curiosity. A big adventure.", eyebrow: attempted.size ? "Your next exam set" : "Welcome, explorer", copy: `${next.name} brings maths, English and reasoning together. Choose a set when you are ready.`, meta: `${next.minutes} minutes · ${next.questions.length} questions`, action: "city-exam", button: "Choose an exam set", image: "assets/ui/illustrated-worlds/discovery-treehouse.webp" };
    return { title: "Where will curiosity take you?", eyebrow: "Your next adventure", copy: "You have tried every core exam set. Explore a science chapter, practise a skill or revisit a favourite.", meta: "Your completed work stays in My Journey", action: "learn", button: "Explore the library", image: "assets/ui/illustrated-worlds/discovery-treehouse.webp" };
  }

  function today() {
    const current = mission();
    const recent = (state.profile.attempts || []).at(-1);
    const featured = catalogue().filter((item) => ["chemistry", "grammar", "winter"].includes(item.id));
    return `<section class="bq-today-hero"><div class="bq-today-copy"><p class="eyebrow">${esc(current.eyebrow)}</p><h1>${esc(current.title)}</h1><p>${esc(current.copy)}</p><span class="bq-duration">${esc(current.meta)}</span><div class="bq-hero-actions"><button type="button" class="button button-primary" data-bq-action="${current.action}">${esc(current.button)}${svg("arrow")}</button><button type="button" class="bq-text-button" data-child-route="learn">Choose something else</button></div></div><div class="bq-today-art">${art(current.image, "An invitation to explore and learn", true)}</div></section><section class="bq-today-note"><span class="bq-note-icon">${svg("journey")}</span><div><strong>${recent ? "Your latest practice is saved" : "Every adventure starts with a first step"}</strong><p>${recent ? `${esc(recent.levelName || "Exam practice")} · ${Number(recent.percent || 0)}% · see your recent practice in My Journey.` : "Pick a subject that makes you curious. You can change direction whenever you like."}</p></div><button type="button" class="bq-text-button" data-child-route="journey">My Journey ${svg("arrow")}</button></section><section aria-labelledby="bqExploreHeading"><div class="bq-studio-section-heading"><div><p class="eyebrow">Make room for curiosity</p><h2 id="bqExploreHeading">A few places to explore</h2></div><button type="button" class="bq-text-button" data-child-route="learn">See all learning ${svg("arrow")}</button></div><div class="bq-library-grid bq-featured-grid">${featured.map(card).join("")}</div></section>`;
  }

  function learn() {
    const filters = uiState();
    return `<section class="bq-library-heading"><p class="eyebrow">Your learning library</p><h1>Find your next discovery.</h1><p>Follow a favourite subject or try something new. Every course has a place here.</p></section><section class="bq-library-tools" aria-label="Filter learning activities"><label class="bq-library-search">${svg("search")}<span class="sr-only">Search learning activities</span><input id="bqLibrarySearch" type="search" placeholder="Search lessons, subjects and adventures" value="${esc(filters.query)}" /></label><div class="bq-library-filter-row"><label>Subject<select data-library-filter="subject">${options([["all","All subjects"],["maths","Maths"],["english","English"],["science","Science"],["mixed","Mixed subjects"]],filters.subject)}</select></label><label>Activity<select data-library-filter="type">${options([["all","All activities"],["lesson","Lessons"],["test","Practice & tests"],["game","Learning games"]],filters.type)}</select></label><label>Time<select data-library-filter="duration">${options([["all","Any time"],["self","At your pace"],["long","15+ minutes"]],filters.duration)}</select></label><button type="button" class="bq-text-button" data-clear-filters>Clear filters</button></div></section><p class="bq-library-count" id="bqLibraryCount" role="status" aria-live="polite"></p><div class="bq-library-grid" id="bqLibraryResults"></div><details class="bq-original-collection"><summary>Original lesson collection <span>Earlier maths and science lessons</span></summary><div class="bq-library-grid">${catalogue().filter((item) => item.collection).map(card).join("")}</div></details>`;
  }

  function options(items, selected) { return items.map(([value, text]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${text}</option>`).join(""); }

  function updateLibrary(ref) {
    const filters = uiState();
    const all = catalogue();
    const query = filters.query.trim().toLowerCase();
    const filtered = all.filter((item) => (!item.collection || query) && (filters.subject === "all" || item.subject === filters.subject) && (filters.type === "all" || item.type === filters.type) && (filters.duration === "all" || (filters.duration === "self" ? item.type === "lesson" : Number(item.minutes) >= 15)) && (!query || `${item.title} ${item.copy} ${item.subject}`.toLowerCase().includes(query)));
    ref.querySelector("#bqLibraryCount").textContent = `${filtered.length} ${filtered.length === 1 ? "activity" : "activities"}${query ? ` matching “${filters.query.trim()}”` : " to explore"}`;
    ref.querySelector("#bqLibraryResults").innerHTML = filtered.length ? filtered.map(card).join("") : '<div class="bq-library-empty"><h2>No activities found</h2><p>Try another search or clear your filters to see the full library.</p><button type="button" class="button button-soft" data-clear-filters>Clear filters</button></div>';
    remember();
  }

  function play() {
    const learningGames = catalogue().filter((item) => item.type === "game");
    const earlier = [
      { title: "Cave River Quest", href: "cave-river-quest/", image: "cave-river-quest/assets/generated/painted-cave-river.png", copy: "Explore the original river adventure.", tone: "cyan", type: "game", status: "Open adventure", meta: "Original collection" },
      { title: "Street Smart Rescue", href: "street-smart-rescue/", image: "street-smart-rescue/assets/generated/suburban-road-plate.png", copy: "Return to the original street rescue game.", tone: "orange", type: "game", status: "Open adventure", meta: "Original collection" },
      { title: "Treasure Quest", href: "treasure-quest/", image: "treasure-quest/assets/treasure-islands.png", copy: "Explore the earlier treasure game prototype.", tone: "violet", type: "game", status: "Open prototype", meta: "Original collection" }
    ];
    return `<div class="bq-library-heading"><p class="eyebrow">Play your way</p><h1>Choose your adventure.</h1><p>Build, explore and solve. Each world keeps your own choices and progress.</p></div><section class="bq-game-feature"><div>${art("mechshift-rescue/assets/aether-city-mission-deck.webp", "The floating city and rescue deck in Mechshift Rescue")}</div><div class="bq-game-feature-copy"><p class="eyebrow">Featured adventure</p><h2>Mechshift Rescue</h2><p>Transform into a rover, lift mech and bridge crawler. Find your way through the floating city.</p><span class="bq-duration">Two missions · progress saved in the game</span><button type="button" class="button button-primary" data-child-href="mechshift-rescue/">Launch rescue ${svg("arrow")}</button></div></section><div class="bq-library-grid bq-games-grid">${learningGames.map(card).join("")}</div><details class="bq-original-collection"><summary>More adventures <span>Your original Bright Quest games</span></summary><div class="bq-library-grid">${earlier.map(card).join("")}</div></details>`;
  }

  function journey() {
    const profile = state.profile;
    const attempts = profile.attempts || [];
    const entries = catalogue().filter((item) => !item.collection);
    const latest = attempts.slice().reverse().slice(0, 5);
    return `<section class="bq-journey-banner"><div class="bq-journey-copy"><p class="eyebrow">My Journey</p><h1>Look how far you've come.</h1><p>Every saved practice and discovery has a place here.</p><div class="bq-journey-stars">${svg("journey")}<strong>${Number(profile.stars || 0)}</strong><span>stars earned</span></div></div><div class="bq-journey-art">${art("assets/ui/illustrated-worlds/world-voyage.webp", "A world of discoveries to explore")}</div></section><div class="bq-journey-summary"><div><strong>${attempts.length}</strong><span>exam attempts saved</span></div><div><strong>${(profile.icasAttempts || []).length}</strong><span>ICAS attempts saved</span></div><div><strong>${Object.values(profile.chemistry101Progress?.chapters || {}).filter((item) => item?.completed).length}</strong><span>Chemistry chapters complete</span></div></div><section aria-labelledby="bqJourneyAreas"><div class="bq-studio-section-heading"><h2 id="bqJourneyAreas">Your learning worlds</h2></div><div class="bq-journey-area-grid">${entries.map((item) => `<button type="button" class="bq-journey-area bq-tone-${item.tone}" ${item.action ? `data-bq-action="${item.action}"` : `data-child-href="${esc(item.href)}"`}><span>${item.customArt || art(item.image)}</span><div><strong>${esc(item.title)}</strong><small>${esc(item.status)}</small></div>${svg("arrow")}</button>`).join("")}</div></section><section class="bq-recent-practice"><div class="bq-studio-section-heading"><h2>Recent practice</h2><button type="button" class="bq-text-button" data-child-route="exams">All exam sets ${svg("arrow")}</button></div>${latest.length ? `<ul>${latest.map((attempt) => `<li><div><strong>${esc(attempt.levelName || "Exam practice")}</strong><span>${esc(attempt.date ? new Date(attempt.date).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "Saved practice")}</span></div><span>${Number(attempt.percent || 0)}%<small>${Number(attempt.correct || 0)} of ${Number(attempt.total || 0)} correct</small></span></li>`).join("")}</ul>` : '<p>Your first saved result will appear here. Choose any exam set when you are ready.</p>'}<p class="bq-quiet-note">Parents can open every original answer and writing response in Evidence. Game milestones and device-only lesson progress remain in their own activity.</p></section>`;
  }

  function wire(ref) {
    if (ref.dataset.childStudioWired) return;
    ref.dataset.childStudioWired = "true";
    ref.addEventListener("click", (event) => {
      const destination = event.target.closest("[data-child-route]");
      if (destination) { navigate(destination.dataset.childRoute); return; }
      const action = event.target.closest("[data-bq-action]");
      if (action && ref.classList.contains("bq-studio")) { context.handleAction(action.dataset.bqAction); return; }
      const link = event.target.closest("[data-child-href]");
      if (link) { rememberDeparture(); window.location.href = profileUrl(link.dataset.childHref); return; }
      if (event.target.closest("[data-clear-filters]")) {
        Object.assign(uiState(), { query: "", subject: "all", type: "all", duration: "all" });
        renderRoot(ref, "learn");
        ref.querySelector("#bqLibrarySearch")?.focus();
      }
    });
    ref.addEventListener("input", (event) => {
      if (event.target.id !== "bqLibrarySearch") return;
      uiState().query = event.target.value;
      updateLibrary(ref);
    });
    ref.addEventListener("change", (event) => {
      const key = event.target.dataset.libraryFilter;
      if (!key) return;
      uiState()[key] = event.target.value;
      updateLibrary(ref);
    });
  }

  function profileUrl(path) {
    const url = new URL(path, window.location.href);
    if (state.profile?.id && url.origin === window.location.origin) url.searchParams.set("profileId", state.profile.id);
    return url.toString();
  }

  function rememberDeparture() {
    uiState().scroll[route()] = window.scrollY;
    remember();
  }

  function restoreScroll() {
    const top = Number(uiState().scroll[route()]) || 0;
    window.scrollTo({ top, behavior: "instant" });
  }

  function renderRoot(ref, destination) {
    const root = ["today", "learn", "play", "journey"].includes(destination) ? destination : "today";
    document.querySelector("#dashboardScreen")?.classList.remove("bq-kid-subpage");
    ref.className = `reference-dashboard bq-mission-control bq-studio bq-view-${root}`;
    ref.innerHTML = `${header(root)}<div class="bq-studio-body">${({ today, learn, play, journey })[root]()}</div>`;
    wire(ref);
    if (root === "learn") updateLibrary(ref);
  }

  function decorateSubpage(ref, active = "learn") {
    ref.classList.add("bq-studio-subpage");
    ref.insertAdjacentHTML("afterbegin", header(active));
    const back = ref.querySelector(".bq-kid-page-head [data-bq-action]");
    if (back) { back.dataset.bqAction = "learn"; back.textContent = "Back to Learn"; }
    ref.querySelectorAll(".bq-studio-header [data-bq-action]").forEach((button) => button.addEventListener("click", () => context.handleAction(button.dataset.bqAction)));
    wire(ref);
  }

  function show(destination, restore = false) {
    if (!context || !state.profile || renderInProgress) return;
    renderInProgress = true;
    try {
      const ref = document.querySelector("#brightReferenceDashboard");
      if (destination === "international") {
        window.openInternationalArena();
        const screen = document.querySelector("#internationalScreen");
        if (!screen.querySelector(".bq-studio-nav")) {
          screen.insertAdjacentHTML("afterbegin", navigation("learn"));
          screen.querySelectorAll("[data-child-route]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.childRoute)));
        }
        const back = screen.querySelector("#closeInternationalButton");
        back.textContent = "Back to Learn";
        if (!back.dataset.studioBack) {
          back.dataset.studioBack = "true";
          back.addEventListener("click", (event) => { event.stopImmediatePropagation(); navigate("learn"); }, true);
        }
      } else {
        showScreen("dashboard");
        if (destination === "exams") context.renderExams();
        else if (destination === "winter") context.renderWinter();
        else renderRoot(ref, destination);
      }
      if (restore && uiState().scroll[destination]) requestAnimationFrame(() => window.scrollTo({ top: uiState().scroll[destination], behavior: "instant" }));
    } finally { renderInProgress = false; }
  }

  function navigate(destination, restore = false) {
    if (!routes.has(destination) || !context || !state.profile) return;
    rememberDeparture();
    uiState().route = destination;
    remember();
    if (window.location.hash !== `#child/${destination}`) history.pushState(null, "", `#child/${destination}`);
    show(destination, restore);
  }

  function handleAction(action) {
    const destinations = { "kid-home": "today", learn: "learn", games: "play", progress: "journey", "city-exam": "exams", "winter-training": "winter", international: "international" };
    if (destinations[action]) { navigate(destinations[action], action === "learn"); return true; }
    if (action === "switch-child") { switchProfileButton.click(); return true; }
    if (action === "resume-draft") { window.BrightQuestDrafts?.resume(); return true; }
    rememberDeparture();
    return false;
  }

  window.addEventListener("hashchange", () => {
    if (!context || !state.profile || state.selectedRole === "parent" || !/^#child\//.test(window.location.hash)) return;
    // Browser Back must take the same save/stop path as the visible exit control.
    if (!screens.test.classList.contains("hidden")) document.querySelector("#exitTestButton")?.click();
    const destination = route();
    uiState().route = destination;
    show(destination, true);
  });

  window.BrightQuestChildExperience = Object.freeze({
    render(ref, adapters) {
      context = adapters;
      document.body.classList.add("bq-child-uplift");
      const destination = route();
      uiState().route = destination;
      if (["exams", "winter", "international"].includes(destination)) show(destination, true);
      else renderRoot(ref, destination);
    },
    handleAction, navigate, decorateSubpage, catalogue, restoreScroll
  });
})();
