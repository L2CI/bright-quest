(() => {
  const qualityState = {
    keyboardGameX: 50
  };

  installScreenReveal();
  installSpotlights();
  installQuestionStepper();
  installGameKeyboardSupport();
  installProductionChips();
  installBestInClassSkin();
  installHolisticRedesign();

  function installScreenReveal() {
    if (typeof showScreen !== "function" || window.__bqQualityShowScreenWrapped) return;
    window.__bqQualityShowScreenWrapped = true;
    const previousShowScreen = showScreen;
    showScreen = function qualityShowScreen(name, ...args) {
      const result = previousShowScreen.call(this, name, ...args);
      requestAnimationFrame(() => revealScreen(name));
      return result;
    };
    requestAnimationFrame(() => {
      const active = Object.entries(screens || {}).find(([, screen]) => !screen.classList.contains("hidden"));
      if (active) revealScreen(active[0]);
    });
  }

  function revealScreen(name) {
    const screen = screens?.[name];
    if (!screen) return;
    const targets = [...screen.children].filter((child) =>
      !child.classList.contains("hidden") &&
      !child.classList.contains("toast") &&
      child.tagName !== "SCRIPT"
    );
    targets.slice(0, 8).forEach((child, index) => {
      child.classList.add("bq-reveal");
      child.style.setProperty("--reveal-delay", `${Math.min(index * 55, 260)}ms`);
      child.classList.remove("bq-revealed");
      void child.offsetWidth;
      child.classList.add("bq-revealed");
    });
  }

  function installSpotlights() {
    const selector = [
      ".role-card",
      ".level-node",
      ".training-chip",
      ".option-card",
      ".game-tile",
      ".academy-zone",
      ".quick-action-ref",
      ".island-label"
    ].join(",");
    document.addEventListener("pointermove", (event) => {
      const target = event.target.closest(selector);
      if (!target) return;
      target.classList.add("bq-spotlight");
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spot-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty("--spot-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    }, { passive: true });
  }

  function installQuestionStepper() {
    if (typeof renderQuestion !== "function" || window.__bqQuestionStepperWrapped) return;
    window.__bqQuestionStepperWrapped = true;
    const previousRenderQuestion = renderQuestion;
    renderQuestion = function qualityRenderQuestion(...args) {
      const result = previousRenderQuestion.apply(this, args);
      requestAnimationFrame(renderQuestionStepper);
      return result;
    };
  }

  function renderQuestionStepper() {
    const progress = document.querySelector(".test-progress");
    if (!progress || !state?.activeLevel?.questions?.length) return;
    let stepper = document.querySelector("#questionStepper");
    if (!stepper) {
      stepper = document.createElement("div");
      stepper.id = "questionStepper";
      stepper.className = "question-stepper";
      stepper.setAttribute("aria-label", "Question navigation");
      progress.after(stepper);
    }

    stepper.innerHTML = state.activeLevel.questions.map((question, index) => {
      const answer = state.answers[index] || {};
      const answered = question.format === "writing" ? !!answer.writing?.trim() : Number.isInteger(answer.selected);
      const active = index === state.activeQuestion;
      const status = active ? "Now" : answered ? "Done" : question.format === "writing" ? "Write" : "";
      return `
        <button
          class="${active ? "active" : ""} ${answered ? "answered" : ""} ${question.format === "writing" ? "writing" : ""}"
          type="button"
          data-question-jump="${index}"
          data-status="${status}"
          aria-current="${active ? "step" : "false"}"
          aria-label="Go to question ${index + 1}${answered ? ", answered" : ""}">
          ${index + 1}
        </button>
      `;
    }).join("");

    stepper.querySelectorAll("[data-question-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = Number(button.dataset.questionJump);
        if (!Number.isFinite(target) || target === state.activeQuestion) return;
        moveQuestion(target - state.activeQuestion);
      });
    });
  }

  function installGameKeyboardSupport() {
    document.addEventListener("keydown", (event) => {
      const activeGameScreen = document.querySelector("#gameScreen:not(.hidden)");
      const stage = document.querySelector("#gameStage");
      if (!activeGameScreen || !stage || stage.classList.contains("burst")) return;
      if (!["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowLeft", "a", "A"].includes(event.key) ? -1 : 1;
      qualityState.keyboardGameX = Math.max(6, Math.min(94, qualityState.keyboardGameX + direction * 7));
      dispatchGamePointerMove(stage, qualityState.keyboardGameX);
    });

    document.addEventListener("pointermove", (event) => {
      if (!event.target.closest("#gameStage")) return;
      const stage = document.querySelector("#gameStage");
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      qualityState.keyboardGameX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    }, { passive: true });

    if (typeof startRewardGame === "function" && !window.__bqQualityStartGameWrapped) {
      window.__bqQualityStartGameWrapped = true;
      const previousStartRewardGame = startRewardGame;
      startRewardGame = function qualityStartRewardGame(...args) {
        qualityState.keyboardGameX = 50;
        const result = previousStartRewardGame.apply(this, args);
        requestAnimationFrame(addGameHint);
        return result;
      };
    }
  }

  function dispatchGamePointerMove(stage, percent) {
    const rect = stage.getBoundingClientRect();
    const clientX = rect.left + (rect.width * percent) / 100;
    stage.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      clientX,
      clientY: rect.top + rect.height - 80,
      pointerType: "mouse"
    }));
  }

  function addGameHint() {
    const stage = document.querySelector("#gameStage");
    if (!stage || stage.querySelector(".game-keyboard-hint")) return;
    stage.tabIndex = 0;
    const hint = document.createElement("div");
    hint.className = "game-keyboard-hint";
    hint.innerHTML = "<kbd>A</kbd><kbd>D</kbd><span>or drag to steer</span>";
    stage.append(hint);
    stage.focus({ preventScroll: true });
  }

  function installProductionChips() {
    const chipTargets = [
      { selector: "#englishGrammarButton", text: "Static voice package" },
      { selector: "#blackboardFocusButton", text: "Teacher mode ready" }
    ];
    chipTargets.forEach(({ selector, text }) => {
      const target = document.querySelector(selector);
      if (!target || target.querySelector(".production-chip")) return;
      target.title = `${target.textContent.trim()} - ${text}`;
    });
  }

  function installBestInClassSkin() {
    document.body.classList.add("bq-premium-shell");
    upgradeCurrentSurface();

    const observer = new MutationObserver(() => {
      window.clearTimeout(window.__bqPremiumTimer);
      window.__bqPremiumTimer = window.setTimeout(upgradeCurrentSurface, 40);
    });
    observer.observe(document.querySelector("#app") || document.body, { childList: true, subtree: true });
  }

  function upgradeCurrentSurface() {
    upgradeRoleSurface();
    upgradeDashboardSurface();
    upgradeTestSurface();
    upgradeParentSurface();
  }

  function installHolisticRedesign() {
    document.body.classList.add("bq-holistic-shell");
    const observer = new MutationObserver(() => {
      window.clearTimeout(window.__bqHolisticTimer);
      window.__bqHolisticTimer = window.setTimeout(upgradeLearningStudio, 60);
    });
    observer.observe(document.querySelector("#app") || document.body, { childList: true, subtree: true });
    upgradeLearningStudio();
  }

  function upgradeLearningStudio() {
    const dashboard = document.querySelector("#brightReferenceDashboard");
    if (!dashboard) return;
    if (!dashboard.querySelector(".learning-studio-banner")) {
      const banner = document.createElement("section");
      banner.className = "learning-studio-banner";
      banner.innerHTML = `
        <div class="studio-copy">
          <p class="eyebrow">Bright Quest Studio</p>
          <h3>Choose the lesson, test, or game that moves the story forward.</h3>
          <p>Training, timed practice, and reward worlds now sit in one visual route so the next action is obvious.</p>
        </div>
        <div class="studio-shot-stack" aria-hidden="true">
          <span class="studio-shot cave"></span>
          <span class="studio-shot treasure"></span>
          <span class="studio-shot street"></span>
        </div>
        <div class="studio-actions">
          <button class="button button-primary" type="button" data-studio-grammar>English Grammar</button>
          <button class="button button-soft" type="button" data-studio-games>Reward Games</button>
        </div>
      `;
      const topbar = dashboard.querySelector(".reference-topbar");
      topbar?.after(banner);
      banner.querySelector("[data-studio-grammar]")?.addEventListener("click", () => { window.location.href = "english-grammar/"; });
      banner.querySelector("[data-studio-games]")?.addEventListener("click", () => {
        if (window.openGamesList) window.openGamesList();
        else document.querySelector("#academyGamesButton")?.click();
      });
    }

    dashboard.querySelectorAll(".reference-panel").forEach((panel) => panel.classList.add("studio-panel"));
    dashboard.querySelectorAll(".academy-tile-ref, .island-label, .game-card-ref, .intl-card-ref, .core-test-chip-ref").forEach((item) => {
      item.classList.add("studio-interactive");
    });
  }

  function upgradeRoleSurface() {
    document.querySelectorAll(".role-panel, #profileScreen .hero-panel").forEach((panel) => {
      if (panel.dataset.premiumSkin === "true") return;
      panel.dataset.premiumSkin = "true";
      const scene = document.createElement("div");
      scene.className = "premium-login-scene";
      scene.setAttribute("aria-hidden", "true");
      scene.innerHTML = `
        <span class="premium-planet planet-one"></span>
        <span class="premium-planet planet-two"></span>
        <span class="premium-rocket"></span>
        <span class="premium-path"></span>
      `;
      panel.prepend(scene);
    });
  }

  function upgradeDashboardSurface() {
    const dashboard = document.querySelector("#brightReferenceDashboard");
    if (!dashboard) return;
    dashboard.classList.add("premium-dashboard");

    if (dashboard.dataset.premiumSkin !== "true") {
      dashboard.dataset.premiumSkin = "true";
      const canopy = document.createElement("div");
      canopy.className = "premium-canopy";
      canopy.setAttribute("aria-hidden", "true");
      canopy.innerHTML = `
        <span class="canopy-grid"></span>
        <span class="canopy-orbit orbit-a"></span>
        <span class="canopy-orbit orbit-b"></span>
        <span class="canopy-spark spark-a"></span>
        <span class="canopy-spark spark-b"></span>
        <span class="canopy-spark spark-c"></span>
      `;
      dashboard.prepend(canopy);
    }

    const topbar = dashboard.querySelector(".reference-topbar");
    if (topbar && !topbar.querySelector(".premium-status-rail")) {
      const rail = document.createElement("div");
      rail.className = "premium-status-rail";
      rail.innerHTML = `
        <span><b>Plan</b> choose mission</span>
        <span><b>Learn</b> teacher lesson</span>
        <span><b>Play</b> reward game</span>
        <span><b>Review</b> parent cockpit</span>
      `;
      topbar.append(rail);
    }

    dashboard.querySelectorAll(".academy-card-ref, .world-card-ref, .international-card-ref, .game-card-ref, .island-label, .quick-action-ref, .achievement-strip > *, .progress-dials-ref > *").forEach((item, index) => {
      item.classList.add("premium-tile");
      item.style.setProperty("--tile-index", index);
    });
  }

  function upgradeTestSurface() {
    const testScreen = document.querySelector("#testScreen");
    if (!testScreen || testScreen.dataset.premiumSkin === "true") return;
    testScreen.dataset.premiumSkin = "true";
    const beam = document.createElement("div");
    beam.className = "test-focus-beam";
    beam.setAttribute("aria-hidden", "true");
    testScreen.prepend(beam);
  }

  function upgradeParentSurface() {
    const parent = document.querySelector("#parentScreen");
    if (!parent || parent.dataset.premiumFrame === "true") return;
    parent.dataset.premiumFrame = "true";
    const frame = document.createElement("div");
    frame.className = "parent-premium-frame";
    frame.setAttribute("aria-hidden", "true");
    parent.prepend(frame);
  }
})();
