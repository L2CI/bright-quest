(function () {
  const tests = window.BrightQuestInternationalTests || [];
  const main = document.querySelector("#app");
  const dashboard = document.querySelector("#dashboardScreen");
  if (!main || !dashboard || !tests.length) return;

  function wireAcademyHero(hero) {
    if (!hero || hero.dataset.internationalWired === "true") return;
    hero.dataset.internationalWired = "true";
    hero.querySelectorAll("[data-zone-level]").forEach((button) => {
      button.addEventListener("click", () => startLevel(Number(button.dataset.zoneLevel)));
    });
    hero.querySelector("#academyGrammarButton, #academyGrammarButton2")?.addEventListener("click", openGrammarGym);
    hero.querySelector("#academyGamesButton, #academyGamesButton2")?.addEventListener("click", openGamesList);
    hero.querySelector("#internationalTestsButton, #academyInternationalButton")?.addEventListener("click", openInternationalArena);
  }

  function ensureAcademyHero() {
    const existing = dashboard.querySelector(".academy-hero");
    if (existing) {
      wireAcademyHero(existing);
      return;
    }
    const grid = dashboard.querySelector(".dashboard-grid");
    if (!grid) return;
    const hero = document.createElement("section");
    hero.className = "academy-hero academy-hero-overlay";
    hero.setAttribute("aria-label", "Bright Quest academy map");
    hero.innerHTML = `
      <div class="academy-copy">
        <p class="eyebrow">Training academy</p>
        <h3>Pick today's power-up.</h3>
        <p>Pick a focused activity for today.</p>
        <div class="academy-actions">
          <button class="academy-zone maths" type="button" data-zone-level="1"><span aria-hidden="true">+</span><strong>Maths Mountain</strong><small>Number speed</small></button>
          <button class="academy-zone english" type="button" id="academyGrammarButton2"><span aria-hidden="true">G</span><strong>Grammar Gym</strong><small>Sentence power</small></button>
          <button class="academy-zone reasoning" type="button" data-zone-level="4"><span aria-hidden="true">?</span><strong>Reasoning Lab</strong><small>Pattern moves</small></button>
          <button class="academy-zone world" type="button" id="academyInternationalButton"><span aria-hidden="true">W</span><strong>International Tests</strong><small>World arena</small></button>
          <button class="academy-zone arcade" type="button" id="academyGamesButton2"><span aria-hidden="true">A</span><strong>Arcade Rewards</strong><small>Unlocked games</small></button>
        </div>
      </div>
      <div class="academy-map-art" aria-hidden="true">
        <span class="map-sun"></span>
        <span class="map-path path-one"></span>
        <span class="map-path path-two"></span>
        <span class="map-pin pin-one">+</span>
        <span class="map-pin pin-two">A</span>
        <span class="map-pin pin-three">?</span>
        <span class="map-pin pin-four">A</span>
      </div>
    `;
    grid.before(hero);
    wireAcademyHero(hero);
  }

  function ensureInternationalScreen() {
    let screen = document.querySelector("#internationalScreen");
    if (!screen) {
      screen = document.createElement("section");
      screen.className = "screen hidden";
      screen.id = "internationalScreen";
      screen.innerHTML = `
        <header class="app-header">
          <div>
            <p class="eyebrow">World Challenge Arena</p>
            <h2>International Tests</h2>
          </div>
          <button class="button button-soft" id="closeInternationalButton" type="button">Dashboard</button>
        </header>
        <section class="international-arena">
          <div class="arena-hero-card">
            <p class="eyebrow">Grade 5 entry preparation</p>
            <h3>Three global-style practice missions.</h3>
            <p>Each mission is 30 minutes, with maths, English, reasoning, and a writing task. Scores are saved under this profile like every other test.</p>
          </div>
          <div class="international-list" id="internationalList"></div>
        </section>
      `;
      document.querySelector("#testScreen")?.before(screen);
    }
    screens.international = screen;
    document.querySelector("#closeInternationalButton")?.addEventListener("click", () => {
      renderDashboard();
      showScreen("dashboard");
    });
  }

  function openInternationalArena() {
    ensureInternationalScreen();
    renderInternationalArena();
    showScreen("international");
  }

  function renderInternationalArena() {
    const list = document.querySelector("#internationalList");
    if (!list) return;
    const latest = latestAttemptsByLevel();
    list.innerHTML = tests.map((test, index) => {
      const attempt = latest[test.level];
      const status = attempt ? scoreLabel(attempt.percent) : "Not started";
      const score = attempt ? `${attempt.percent}%` : "New";
      const sections = [...new Set(test.questions.map((question) => question.section))].slice(0, 4).join(" / ");
      const game = ["World Rally Drift", "Skyline Balloon Burst", "Logic Lab Battle"][index] || "World Arcade";
      return `
        <article class="international-card card-${index + 1}">
          <div class="world-orb" aria-hidden="true">${index === 0 ? "UK" : index === 1 ? "US" : "ST"}</div>
          <p class="eyebrow">${escapeHtml(test.challengeLabel || "International")}</p>
          <h3>${escapeHtml(test.name)}</h3>
          <p>${escapeHtml(test.theme)}</p>
          <div class="international-meta">
            <span>${test.minutes} min</span>
            <span>${test.questions.length} questions</span>
            <span>${escapeHtml(sections)}</span>
            <span>Reward: ${escapeHtml(game)}</span>
          </div>
          <div class="international-footer">
            <strong>${score}<small>${status}</small></strong>
            <button class="button button-primary" type="button" data-international-test="${escapeAttr(test.level)}">${attempt ? "Retry" : "Start"}</button>
          </div>
        </article>
      `;
    }).join("");
    list.querySelectorAll("[data-international-test]").forEach((button) => {
      button.addEventListener("click", () => startInternationalTest(button.dataset.internationalTest));
    });
  }

  function startInternationalTest(testId) {
    const test = tests.find((item) => item.level === testId);
    if (!test) {
      showToast("That world challenge is not ready yet.");
      return;
    }
    state.activeLevel = test;
    state.activeQuestion = 0;
    state.answers = test.questions.map(() => ({ selected: null, writing: "" }));
    state.questionTimes = test.questions.map(() => 0);
    state.questionStartedAt = Date.now();
    state.startedAt = Date.now();
    state.remainingSeconds = test.minutes * 60;
    testLevelLabel.textContent = `${test.challengeLabel || "International"} / World Challenge`;
    testName.textContent = test.name;
    renderQuestion();
    startTimer();
    showScreen("test");
    showToast(randomEncouragement());
  }

  ensureAcademyHero();
  ensureInternationalScreen();
  window.openInternationalArena = openInternationalArena;
  window.startBrightQuestInternationalTest = startInternationalTest;
})();
