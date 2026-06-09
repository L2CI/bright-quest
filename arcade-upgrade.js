(() => {
  const upgradedGames = [
    { level: 1, name: "Star Skimmer Reef", className: "reef", mode: "catch", icon: "STAR", targetLabel: "stars", accent: "#22d3ee", danger: "#7c3aed", description: "Surf a glowing board between island reefs and catch falling starfish tokens.", help: "Slide the board. Catch yellow stars, dodge purple splash blocks." },
    { level: 2, name: "Brick Rocket Rally", className: "brick-rally", mode: "drift", icon: "BOOST", targetLabel: "boosts", accent: "#2563eb", danger: "#ef4444", description: "Drift a brick-built rocket car through toy-city ramps and booster rings.", help: "Drag to drift through blue boosters. Red road blocks break the combo." },
    { level: 3, name: "Sky Balloon Carnival", className: "balloon-carnival", mode: "burst", icon: "POP", targetLabel: "pops", accent: "#f6478f", danger: "#7c2d12", description: "Tap cheerful balloons over a parade skyline and keep the combo floating.", help: "Tap balloons before they escape. Golden balloons are worth extra." },
    { level: 4, name: "Number Ninja Gates", className: "ninja-gates", mode: "drift", icon: "GO", targetLabel: "gates", accent: "#16a34a", danger: "#dc2626", description: "Dash through glowing number gates in a training dojo full of moving pads.", help: "Slide through green gates. Avoid red danger tiles." },
    { level: 5, name: "Comet Candy Pop", className: "candy-comet", mode: "burst", icon: "ZAP", targetLabel: "comets", accent: "#fb7185", danger: "#581c87", description: "Pop comet candies as they swirl through a neon sweet-shop galaxy.", help: "Tap the comet candies. Chain quick taps for bigger bursts." },
    { level: 6, name: "Treasure Kart Cove", className: "treasure-kart", mode: "drift", icon: "GEM", targetLabel: "gems", accent: "#f59e0b", danger: "#92400e", description: "Steer a tiny treasure kart over beach bridges, collecting gems and avoiding rocks.", help: "Collect gems in the bright lane. Rocks cost a life." },
    { level: 7, name: "Portal Crystal Clash", className: "portal-clash", mode: "burst", icon: "ORB", targetLabel: "orbs", accent: "#8b5cf6", danger: "#fb7185", description: "Tap portal crystals before they overload a colourful science lab.", help: "Tap glowing orbs quickly. Bonus orbs boost the combo." },
    { level: 8, name: "Firework Hero Finale", className: "hero-finale", mode: "burst", icon: "BOOM", targetLabel: "fireworks", accent: "#facc15", danger: "#ef4444", description: "Launch a superhero-style firework finale across the Bright Quest skyline.", help: "Tap fireworks at peak glow. Keep the finale chain alive." }
  ];

  const arcade = {
    active: false,
    frameId: null,
    timerId: null,
    remaining: 120,
    score: 0,
    combo: 1,
    lives: 3,
    playerX: 50,
    tilt: 0,
    objects: [],
    lastFrame: 0,
    lastSpawn: 0,
    spawnEvery: 580,
    game: upgradedGames[0]
  };

  const $ = (selector) => document.querySelector(selector);
  const stage = $("#gameStage");
  const ship = $("#playerShip");
  const title = $("#gameTitle");
  const timer = $("#gameTimer");
  const score = $("#gameScore");
  const scoreLabel = $("#gameScoreLabel");
  const combo = $("#gameCombo");
  const lives = $("#gameLives");
  const help = $("#gameHelp");
  const gamesList = $("#gamesList");
  const playReward = $("#playRewardButton");
  const exitGame = $("#exitGameButton");

  if (!stage || !ship || !title || !timer || !score) return;

  replaceGameCatalogue();
  upgradeGamesList();
  interceptRewardButton();
  interceptExitButton();
  stage.addEventListener("pointermove", movePlayer, { capture: true });

  function replaceGameCatalogue() {
    if (!Array.isArray(gameCatalogue)) return;
    gameCatalogue.splice(0, gameCatalogue.length, ...upgradedGames);
  }

  function upgradeGamesList() {
    const originalOpenGamesList = openGamesList;
    openGamesList = function upgradedOpenGamesList() {
      const completedLevels = new Set((state.profile.attempts || []).map((attempt) => attempt.level));
      const unlockedCount = upgradedGames.filter((game) => completedLevels.has(game.level)).length;
      gamesList.innerHTML = `
        <article class="game-gallery-hero">
          <div>
            <p class="eyebrow">Arcade vault</p>
            <h3>Unlocked games and coming attractions</h3>
            <p>${unlockedCount} of ${upgradedGames.length} games unlocked. Finish tests to light up the rest of the arcade.</p>
          </div>
          <div class="gallery-mini-console" aria-hidden="true"><span></span><i></i><b></b></div>
        </article>
        ${upgradedGames.map((game) => {
        const unlocked = completedLevels.has(game.level);
        const type = game.mode === "burst" ? "Tap challenge" : game.mode === "drift" ? "Drift challenge" : "Catch challenge";
        return `
          <article class="game-tile ${game.className} ${unlocked ? "unlocked" : "locked"}">
            ${gamePreviewArt(game)}
            <p class="eyebrow">Level ${game.level} arcade</p>
            <strong>${escapeHtml(game.name)}</strong>
            <span>${escapeHtml(game.description)}</span>
            <small>${unlocked ? `${type} unlocked` : `Complete level ${game.level} to unlock`}</small>
            ${unlocked ? `<button class="button button-primary" type="button" data-play-game="${game.level}">Play</button>` : ""}
          </article>
        `;
      }).join("")}
      `;

      gamesList.querySelectorAll("[data-play-game]").forEach((button) => {
        button.addEventListener("click", () => {
          const game = upgradedGames.find((item) => item.level === Number(button.dataset.playGame));
          startRewardGame(game);
        });
      });

      showScreen("gamesList");
    };
    openGamesList.original = originalOpenGamesList;
  }

  function gamePreviewArt(game) {
    return `
      <div class="game-preview ${escapeAttr(game.className)}" aria-hidden="true">
        <span class="preview-sky"></span>
        <span class="preview-land"></span>
        <span class="preview-road"></span>
        <span class="preview-hero">${escapeHtml(game.icon)}</span>
        <span class="preview-token one"></span>
        <span class="preview-token two"></span>
        <span class="preview-token three"></span>
      </div>
    `;
  }

  function interceptRewardButton() {
    playReward?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      startRewardGame();
    }, true);
  }

  function interceptExitButton() {
    exitGame?.addEventListener("click", (event) => {
      if (!arcade.active) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      endRewardGame();
    }, true);
  }

  startRewardGame = function upgradedStartRewardGame(game = gameForLatestLevel()) {
    stopRewardGameTimers();
    arcade.game = game || upgradedGames[0];
    arcade.remaining = 120;
    arcade.score = 0;
    arcade.combo = 1;
    arcade.lives = arcade.game.mode === "burst" ? 5 : 3;
    arcade.playerX = 50;
    arcade.tilt = 0;
    arcade.objects = [];
    arcade.lastFrame = 0;
    arcade.lastSpawn = 0;
    arcade.spawnEvery = arcade.game.mode === "burst" ? 520 : 580;
    arcade.active = true;

    title.textContent = arcade.game.name;
    score.textContent = "0";
    scoreLabel.textContent = arcade.game.targetLabel || "score";
    combo.textContent = "x1";
    lives.textContent = String(arcade.lives);
    help.textContent = arcade.game.help;
    updateTimer();
    clearStage();
    stage.className = `game-stage ${arcade.game.className} ${arcade.game.mode}`;
    stage.style.setProperty("--game-accent", arcade.game.accent || "#22d3ee");
    stage.style.setProperty("--game-danger", arcade.game.danger || "#ef4444");
    renderStageChrome();
    ship.style.left = "50%";
    ship.style.transform = "translateX(-50%)";
    showScreen("game");

    arcade.timerId = setInterval(() => {
      arcade.remaining -= 1;
      updateTimer();
      if (arcade.remaining <= 0) endRewardGame();
    }, 1000);
    spawnGameObject(performance.now());
    arcade.frameId = requestAnimationFrame(runFrame);
  };

  stopRewardGameTimers = function upgradedStopRewardGameTimers() {
    if (arcade.timerId) clearInterval(arcade.timerId);
    if (arcade.frameId) cancelAnimationFrame(arcade.frameId);
    arcade.timerId = null;
    arcade.frameId = null;
  };

  endRewardGame = function upgradedEndRewardGame() {
    stopRewardGameTimers();
    if (!arcade.active) return;
    arcade.active = false;
    clearStage();

    state.profile.stars += Math.min(18, Math.ceil(arcade.score / 18));
    saveProfiles();
    syncProfileToCloud();
    showToast(`Reward complete. ${arcade.score} points scored.`);
    renderDashboard();
    showScreen("dashboard");
  };

  function gameForLatestLevel() {
    const latest = state.latestResult?.level
      || state.activeLevel?.level
      || state.profile?.attempts?.at(-1)?.level
      || 1;
    return upgradedGames.find((game) => game.level === latest) || upgradedGames[0];
  }

  function runFrame(now) {
    if (!arcade.active) return;
    const last = arcade.lastFrame || now;
    const delta = Math.min(34, now - last);
    arcade.lastFrame = now;

    if (now - arcade.lastSpawn > arcade.spawnEvery) {
      spawnGameObject(now);
      arcade.lastSpawn = now;
      arcade.spawnEvery = Math.max(330, arcade.spawnEvery - 6);
    }

    updateObjects(delta);
    arcade.frameId = requestAnimationFrame(runFrame);
  }

  function spawnGameObject(now = performance.now()) {
    if (arcade.game.mode === "burst") spawnBurstTarget(now);
    else spawnFallingTarget(now);
  }

  function spawnFallingTarget(now) {
    if (!arcade.active) return;
    const element = document.createElement("span");
    const hazard = Math.random() < (arcade.game.mode === "drift" ? 0.28 : 0.18);
    const bonus = !hazard && Math.random() < 0.18;
    element.className = `game-object falling-star ${hazard ? "hazard" : ""} ${bonus ? "bonus" : ""}`;
    element.innerHTML = tokenMarkup(hazard ? "!" : bonus ? "x2" : arcade.game.icon);

    addObject({
      el: element,
      kind: hazard ? "hazard" : "target",
      bonus,
      x: 8 + Math.random() * 84,
      y: -42,
      vx: arcade.game.mode === "drift" ? (Math.random() - 0.5) * 0.025 : 0,
      vy: arcade.game.mode === "drift" ? 0.34 + Math.random() * 0.2 : 0.24 + Math.random() * 0.18,
      born: now
    });
  }

  function spawnBurstTarget(now) {
    if (!arcade.active) return;
    const target = document.createElement("button");
    const bonus = Math.random() < 0.2;
    const object = {
      el: target,
      kind: "target",
      bonus,
      x: 8 + Math.random() * 84,
      y: stage.clientHeight + 22,
      vx: (Math.random() - 0.5) * 0.035,
      vy: -(0.22 + Math.random() * 0.18),
      wobble: Math.random() * Math.PI * 2,
      born: now
    };
    target.className = `game-object falling-star burst-target ${bonus ? "bonus" : ""}`;
    target.type = "button";
    target.innerHTML = tokenMarkup(bonus ? "x2" : arcade.game.icon);
    target.addEventListener("pointerdown", () => collectObject(object), { once: true });
    addObject(object);
  }

  function tokenMarkup(label) {
    return `<span class="token-aura"></span><span class="token-core">${escapeHtml(label)}</span><span class="token-spark"></span>`;
  }

  function addObject(object) {
    placeObject(object);
    stage.append(object.el);
    arcade.objects.push(object);
  }

  function updateObjects(delta) {
    const stageHeight = stage.clientHeight;
    const catchLine = stageHeight - 82;
    [...arcade.objects].forEach((object) => {
      object.x += object.vx * delta;
      object.y += object.vy * delta;
      if (object.wobble !== undefined) {
        object.x += Math.sin((performance.now() - object.born) / 260 + object.wobble) * 0.045 * delta;
      }
      object.x = Math.max(5, Math.min(93, object.x));
      placeObject(object);

      if (arcade.game.mode !== "burst" && object.y > catchLine) {
        const distance = Math.abs(object.x - arcade.playerX);
        if (distance < (arcade.game.mode === "drift" ? 7.5 : 9.5)) {
          if (object.kind === "hazard") loseLife(object);
          else collectObject(object);
        }
      }

      if (object.y > stageHeight + 56 || object.y < -64) {
        if (arcade.game.mode === "burst" && object.kind === "target") resetCombo();
        removeObject(object);
      }
    });
  }

  function movePlayer(event) {
    if (!arcade.active || arcade.game.mode === "burst") return;
    const rect = stage.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    arcade.tilt = Math.max(-16, Math.min(16, (x - arcade.playerX) * 0.7));
    arcade.playerX = x;
    ship.style.left = `${x}%`;
    ship.style.transform = `translateX(-50%) rotate(${arcade.tilt}deg)`;
  }

  function collectObject(object) {
    if (!arcade.active || !arcade.objects.includes(object)) return;
    const points = object.bonus ? 18 : 10;
    arcade.score += points * arcade.combo;
    arcade.combo = Math.min(9, arcade.combo + 1);
    updateHud();
    updateComboHeat();
    popEffect(object.x, object.y, object.bonus ? "bonus" : "good");
    addTrailBurst(object.x, object.y, object.bonus);
    removeObject(object);
  }

  function loseLife(object) {
    if (!arcade.active || !arcade.objects.includes(object)) return;
    arcade.lives -= 1;
    resetCombo();
    updateComboHeat();
    popEffect(object.x, object.y, "hazard");
    removeObject(object);
    if (arcade.lives <= 0) {
      showToast("Game over. Great effort.");
      endRewardGame();
    }
  }

  function placeObject(object) {
    object.el.style.left = `${object.x}%`;
    object.el.style.top = `${object.y}px`;
  }

  function removeObject(object) {
    arcade.objects = arcade.objects.filter((item) => item !== object);
    object.el.remove();
  }

  function resetCombo() {
    arcade.combo = 1;
    updateHud();
  }

  function updateHud() {
    score.textContent = String(arcade.score);
    combo.textContent = `x${arcade.combo}`;
    lives.textContent = String(Math.max(0, arcade.lives));
  }

  function updateTimer() {
    const safe = Math.max(0, arcade.remaining);
    timer.textContent = `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function popEffect(x, y, type) {
    const burst = document.createElement("span");
    burst.className = `game-pop ${type}`;
    burst.style.left = `${x}%`;
    burst.style.top = `${y}px`;
    burst.textContent = type === "hazard" ? "Ouch" : `+${type === "bonus" ? 18 : 10}`;
    stage.append(burst);
    setTimeout(() => burst.remove(), 620);
  }

  function clearStage() {
    stage.querySelectorAll(".game-object, .game-pop, .arcade-trail, .arcade-stage-chrome").forEach((item) => item.remove());
    arcade.objects = [];
  }

  function renderStageChrome() {
    const chrome = document.createElement("div");
    chrome.className = "arcade-stage-chrome";
    chrome.innerHTML = `
      <span class="chrome-orbit orbit-one"></span>
      <span class="chrome-orbit orbit-two"></span>
      <span class="chrome-mesh"></span>
      <span class="chrome-speedline line-one"></span>
      <span class="chrome-speedline line-two"></span>
      <span class="chrome-speedline line-three"></span>
      <span class="chrome-badge">${escapeHtml(arcade.game.name.split(" ")[0])}</span>
    `;
    stage.prepend(chrome);
  }

  function addTrailBurst(x, y, bonus) {
    for (let i = 0; i < (bonus ? 10 : 6); i += 1) {
      const spark = document.createElement("span");
      spark.className = `arcade-trail ${bonus ? "bonus" : ""}`;
      spark.style.left = `${x + (Math.random() - 0.5) * 10}%`;
      spark.style.top = `${y + (Math.random() - 0.5) * 34}px`;
      spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 90}px`);
      spark.style.setProperty("--dy", `${-28 - Math.random() * 52}px`);
      stage.append(spark);
      setTimeout(() => spark.remove(), 780);
    }
  }

  function updateComboHeat() {
    stage.classList.toggle("combo-hot", arcade.combo >= 5);
  }
})();
