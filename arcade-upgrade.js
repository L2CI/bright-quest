(() => {
  const upgradedGames = [
    { level: 1, name: "Star Dash", className: "star", mode: "catch", icon: "*", targetLabel: "stars", description: "Sweep the glow board across the sky lane and catch star clusters.", help: "Move the glow board. Catch stars, dodge storm sparks." },
    { level: 2, name: "Meteor Drift", className: "meteor", mode: "drift", icon: "o", targetLabel: "sparks", description: "Drift a rocket racer through meteor traffic and collect spark rings.", help: "Drag to drift. Collect spark rings and avoid hot meteors." },
    { level: 3, name: "Balloon Burst", className: "rainbow", mode: "burst", icon: "+", targetLabel: "pops", description: "Tap floating balloons fast enough to build a rainbow combo.", help: "Tap balloons before they float away. Chain taps for combos." },
    { level: 4, name: "Number Drift", className: "number", mode: "drift", icon: "#", targetLabel: "numbers", description: "Steer through neon number gates while avoiding red blockers.", help: "Slide through green number gates. Skip red blockers." },
    { level: 5, name: "Comet Pop", className: "comet", mode: "burst", icon: ">", targetLabel: "comets", description: "Pop comet bubbles as they arc and swirl across deep space.", help: "Tap the comet bubbles. Fast chains make bigger bursts." },
    { level: 6, name: "Treasure Drift", className: "treasure", mode: "drift", icon: "$", targetLabel: "coins", description: "Drift through treasure lanes, grab coins, and dodge rolling rocks.", help: "Collect coins in the bright lane. Rocks break the combo." },
    { level: 7, name: "Cosmic Burst", className: "cosmic", mode: "burst", icon: "@", targetLabel: "crystals", description: "Smash cosmic crystals while the starfield accelerates around you.", help: "Tap crystals quickly. Golden crystals are worth extra." },
    { level: 8, name: "Final Fireworks", className: "final", mode: "burst", icon: "!", targetLabel: "fireworks", description: "Launch a finale of fireworks after the full scholarship quest.", help: "Tap fireworks at peak glow. Keep the combo alive." }
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
      gamesList.innerHTML = upgradedGames.map((game) => {
        const unlocked = completedLevels.has(game.level);
        const type = game.mode === "burst" ? "Tap challenge" : game.mode === "drift" ? "Drift challenge" : "Catch challenge";
        return `
          <article class="game-tile ${game.className}">
            <div class="game-tile-icon" aria-hidden="true">${escapeHtml(game.icon)}</div>
            <p class="eyebrow">Level ${game.level} arcade</p>
            <strong>${escapeHtml(game.name)}</strong>
            <span>${escapeHtml(game.description)}</span>
            <small>${unlocked ? `${type} unlocked` : "Complete this test to unlock"}</small>
            ${unlocked ? `<button class="button button-primary" type="button" data-play-game="${game.level}">Play</button>` : ""}
          </article>
        `;
      }).join("");

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
    element.textContent = hazard ? "X" : arcade.game.icon;

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
    target.textContent = arcade.game.icon;
    target.addEventListener("pointerdown", () => collectObject(object), { once: true });
    addObject(object);
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
    popEffect(object.x, object.y, object.bonus ? "bonus" : "good");
    removeObject(object);
  }

  function loseLife(object) {
    if (!arcade.active || !arcade.objects.includes(object)) return;
    arcade.lives -= 1;
    resetCombo();
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
    stage.querySelectorAll(".game-object, .game-pop").forEach((item) => item.remove());
    arcade.objects = [];
  }
})();
