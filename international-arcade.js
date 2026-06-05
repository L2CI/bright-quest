(function () {
  const internationalGames = {
    "intl-1": {
      id: "intl-1",
      name: "World Rally Drift",
      mode: "drift",
      help: "Slide or use arrow keys to drift through star gates. Avoid red hazard blocks.",
      sky: ["#0ea5e9", "#8b5cf6"],
      ground: "#22c55e",
      hero: "#facc15"
    },
    "intl-2": {
      id: "intl-2",
      name: "Skyline Balloon Burst",
      mode: "burst",
      help: "Tap bright balloons before they escape. Gold balloons build huge combo streaks.",
      sky: ["#f472b6", "#38bdf8"],
      ground: "#fb923c",
      hero: "#22c55e"
    },
    "intl-3": {
      id: "intl-3",
      name: "Logic Lab Battle",
      mode: "logic",
      help: "Choose glowing logic gates and dodge glitch blocks. Fast correct gates boost your combo.",
      sky: ["#312e81", "#2563eb"],
      ground: "#8b5cf6",
      hero: "#facc15"
    }
  };

  const screen = document.querySelector("#internationalGameScreen");
  const canvas = document.querySelector("#internationalGameCanvas");
  if (!screen || !canvas) return;

  screens.internationalGame = screen;

  const ctx = canvas.getContext("2d");
  const title = document.querySelector("#internationalGameTitle");
  const timer = document.querySelector("#internationalGameTimer");
  const scoreText = document.querySelector("#internationalGameScore");
  const comboText = document.querySelector("#internationalGameCombo");
  const livesText = document.querySelector("#internationalGameLives");
  const help = document.querySelector("#internationalGameHelp");
  const exit = document.querySelector("#exitInternationalGameButton");

  const arcade = {
    active: false,
    game: internationalGames["intl-1"],
    seconds: 120,
    score: 0,
    combo: 1,
    lives: 3,
    playerX: 0.5,
    playerY: 0.78,
    targetX: 0.5,
    objects: [],
    particles: [],
    last: 0,
    spawnAt: 0,
    timerId: null,
    frameId: null,
    keys: new Set()
  };

  const originalStartRewardGame = startRewardGame;
  startRewardGame = function (game) {
    const resultLevel = state.latestResult?.level || state.activeLevel?.level;
    if (typeof resultLevel === "string" && resultLevel.startsWith("intl-")) {
      startInternationalArcade(resultLevel);
      return;
    }
    originalStartRewardGame(game);
  };

  const rewardButton = document.querySelector("#playRewardButton");
  rewardButton?.addEventListener("click", (event) => {
    const resultLevel = state.latestResult?.level || state.activeLevel?.level;
    if (typeof resultLevel !== "string" || !resultLevel.startsWith("intl-")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    startInternationalArcade(resultLevel);
  }, true);

  exit.addEventListener("click", endInternationalArcade);
  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    arcade.targetX = Math.max(0.08, Math.min(0.92, (event.clientX - rect.left) / rect.width));
  });
  canvas.addEventListener("pointerdown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
    if (arcade.game.mode === "burst") popAt(x, y);
    if (arcade.game.mode === "logic") chooseGate(x, y);
  });
  window.addEventListener("keydown", (event) => {
    if (!arcade.active) return;
    if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
    arcade.keys.add(event.key);
  });
  window.addEventListener("keyup", (event) => arcade.keys.delete(event.key));

  function startInternationalArcade(levelId) {
    arcade.game = internationalGames[levelId] || internationalGames["intl-1"];
    arcade.active = true;
    arcade.seconds = 120;
    arcade.score = 0;
    arcade.combo = 1;
    arcade.lives = 3;
    arcade.playerX = 0.5;
    arcade.targetX = 0.5;
    arcade.objects = [];
    arcade.particles = [];
    arcade.last = performance.now();
    arcade.spawnAt = 0;
    title.textContent = arcade.game.name;
    help.textContent = arcade.game.help;
    screen.dataset.mode = arcade.game.mode;
    updateHud();
    showScreen("internationalGame");
    clearInterval(arcade.timerId);
    arcade.timerId = setInterval(() => {
      arcade.seconds -= 1;
      updateHud();
      if (arcade.seconds <= 0) endInternationalArcade();
    }, 1000);
    cancelAnimationFrame(arcade.frameId);
    arcade.frameId = requestAnimationFrame(frame);
    showToast(`${arcade.game.name} unlocked.`);
  }

  function endInternationalArcade() {
    if (!arcade.active) return;
    arcade.active = false;
    clearInterval(arcade.timerId);
    cancelAnimationFrame(arcade.frameId);
    const earned = Math.min(24, Math.max(4, Math.ceil(arcade.score / 120)));
    state.profile.stars += earned;
    saveProfiles();
    syncProfileToCloud();
    renderDashboard();
    showScreen("dashboard");
    showToast(`Arcade complete. +${earned} stars.`);
  }

  function frame(now) {
    if (!arcade.active) return;
    const delta = Math.min(40, now - arcade.last || 16);
    arcade.last = now;
    update(delta, now);
    draw(now);
    arcade.frameId = requestAnimationFrame(frame);
  }

  function update(delta, now) {
    const speed = delta / 16.67;
    if (arcade.keys.has("ArrowLeft")) arcade.targetX -= 0.018 * speed;
    if (arcade.keys.has("ArrowRight")) arcade.targetX += 0.018 * speed;
    arcade.targetX = Math.max(0.08, Math.min(0.92, arcade.targetX));
    arcade.playerX += (arcade.targetX - arcade.playerX) * 0.14;

    arcade.spawnAt -= delta;
    if (arcade.spawnAt <= 0) {
      spawnObject(now);
      arcade.spawnAt = arcade.game.mode === "burst" ? 410 : arcade.game.mode === "logic" ? 720 : 520;
    }

    arcade.objects.forEach((object) => {
      object.t += delta;
      object.y += object.vy * speed;
      object.x += Math.sin((now + object.seed) / object.wave) * object.wobble * speed;
      object.spin += object.spinSpeed * speed;
    });

    if (arcade.game.mode !== "burst") {
      const player = playerBox();
      arcade.objects.forEach((object) => {
        if (object.hit) return;
        const box = objectBox(object);
        if (intersects(player, box)) {
          object.hit = true;
          if (object.kind === "hazard") hurt(object.x, object.y);
          else collect(object.x, object.y, object.value || 10);
        }
      });
    }

    arcade.objects = arcade.objects.filter((object) => object.y < canvas.height + 100 && !object.remove);
    arcade.particles.forEach((p) => {
      p.x += p.vx * speed;
      p.y += p.vy * speed;
      p.life -= delta;
      p.size *= 0.985;
    });
    arcade.particles = arcade.particles.filter((p) => p.life > 0);
  }

  function spawnObject(now) {
    const mode = arcade.game.mode;
    if (mode === "logic") {
      const correct = Math.random() > 0.35;
      arcade.objects.push(makeObject({
        kind: correct ? "gate" : "hazard",
        label: correct ? logicLabel() : "GLITCH",
        x: 120 + Math.random() * (canvas.width - 240),
        y: -70,
        vy: 3.2 + Math.random() * 1.2,
        size: correct ? 82 : 70,
        value: correct ? 16 : 0,
        seed: now + Math.random() * 999
      }));
      return;
    }

    const hazard = Math.random() < (mode === "drift" ? 0.28 : 0.18);
    const bonus = !hazard && Math.random() < 0.22;
    arcade.objects.push(makeObject({
      kind: hazard ? "hazard" : bonus ? "bonus" : "star",
      label: hazard ? "!" : bonus ? "BOOST" : mode === "burst" ? "POP" : "STAR",
      x: 90 + Math.random() * (canvas.width - 180),
      y: mode === "burst" ? canvas.height + 70 : -70,
      vy: mode === "burst" ? -(2.7 + Math.random() * 1.5) : 3.4 + Math.random() * 1.6,
      size: bonus ? 76 : 62,
      value: bonus ? 22 : 10,
      seed: now + Math.random() * 999
    }));
  }

  function makeObject(base) {
    return {
      t: 0,
      spin: 0,
      spinSpeed: (Math.random() - 0.5) * 0.08,
      wave: 360 + Math.random() * 420,
      wobble: (Math.random() - 0.5) * 1.8,
      ...base
    };
  }

  function popAt(x, y) {
    const object = arcade.objects.find((item) => !item.hit && Math.hypot(item.x - x, item.y - y) < item.size * 0.85);
    if (!object) {
      arcade.combo = 1;
      updateHud();
      return;
    }
    object.hit = true;
    if (object.kind === "hazard") hurt(object.x, object.y);
    else collect(object.x, object.y, object.value || 10);
  }

  function chooseGate(x, y) {
    const object = arcade.objects.find((item) => !item.hit && item.kind === "gate" && Math.abs(item.x - x) < item.size && Math.abs(item.y - y) < item.size);
    if (object) {
      object.hit = true;
      collect(object.x, object.y, object.value || 16);
    }
  }

  function collect(x, y, points) {
    arcade.score += points * arcade.combo;
    arcade.combo = Math.min(12, arcade.combo + 1);
    burst(x, y, "#facc15", 14);
    updateHud();
  }

  function hurt(x, y) {
    arcade.lives -= 1;
    arcade.combo = 1;
    burst(x, y, "#fb7185", 18);
    updateHud();
    if (arcade.lives <= 0) endInternationalArcade();
  }

  function burst(x, y, color, count) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const force = 2 + Math.random() * 5;
      arcade.particles.push({ x, y, color, size: 7 + Math.random() * 10, vx: Math.cos(angle) * force, vy: Math.sin(angle) * force, life: 440 + Math.random() * 360 });
    }
  }

  function draw(now) {
    const { width: w, height: h } = canvas;
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, arcade.game.sky[0]);
    gradient.addColorStop(1, arcade.game.sky[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    drawBackdrop(w, h, now);
    arcade.objects.forEach(drawObject);
    drawHero(w, h, now);
    arcade.particles.forEach(drawParticle);
    drawScanlines(w, h);
  }

  function drawBackdrop(w, h, now) {
    ctx.save();
    ctx.globalAlpha = 0.24;
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 24; i += 1) {
      const x = (i * 137 + now * 0.025) % (w + 160) - 80;
      const y = 45 + (i % 6) * 56;
      roundedRect(x, y, 42 + (i % 4) * 12, 18, 10);
      ctx.fill();
    }
    ctx.restore();

    const baseY = h - 112;
    ctx.fillStyle = arcade.game.ground;
    roundedRect(0, baseY, w, 180, 0);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    for (let x = -80; x < w; x += 130) {
      roundedRect(x + ((now * 0.11) % 130), baseY + 38, 72, 12, 8);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(22,33,62,0.22)";
    for (let i = 0; i < 9; i += 1) {
      const x = i * 150 + 24;
      const y = baseY - 80 - (i % 3) * 24;
      roundedRect(x, y, 78, baseY - y, 10);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.34)";
      for (let j = 0; j < 3; j += 1) roundedRect(x + 14 + j * 20, y + 18, 9, 14, 3), ctx.fill();
      ctx.fillStyle = "rgba(22,33,62,0.22)";
    }
  }

  function drawHero(w, h, now) {
    const x = arcade.playerX * w;
    const y = arcade.playerY * h;
    const tilt = (arcade.targetX - arcade.playerX) * 24;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(tilt * Math.PI / 180);
    ctx.shadowColor = "rgba(15,23,42,0.32)";
    ctx.shadowBlur = 18;
    ctx.fillStyle = arcade.game.hero;
    if (arcade.game.mode === "drift") {
      roundedRect(-58, -34, 116, 70, 22); ctx.fill();
      ctx.fillStyle = "#111827"; roundedRect(-44, 30, 26, 22, 12); ctx.fill(); roundedRect(18, 30, 26, 22, 12); ctx.fill();
      ctx.fillStyle = "#ffffff"; roundedRect(-28, -22, 56, 24, 12); ctx.fill();
      ctx.fillStyle = "#f43f5e"; roundedRect(46, -8, 20, 16, 8); ctx.fill();
    } else {
      ctx.fillStyle = "#ffffff"; roundedRect(-38, -62, 76, 76, 22); ctx.fill();
      ctx.fillStyle = arcade.game.hero; roundedRect(-28, -54, 56, 56, 18); ctx.fill();
      ctx.fillStyle = "#111827"; roundedRect(-16, -30, 10, 10, 4); ctx.fill(); roundedRect(6, -30, 10, 10, 4); ctx.fill();
      ctx.fillStyle = "#f43f5e"; roundedRect(-56, 0, 112, 54, 18); ctx.fill();
      ctx.fillStyle = "#2563eb"; roundedRect(-34, 16, 68, 52, 16); ctx.fill();
    }
    ctx.restore();
  }

  function drawObject(object) {
    ctx.save();
    ctx.translate(object.x, object.y);
    ctx.rotate(object.spin);
    ctx.shadowColor = "rgba(15,23,42,0.24)";
    ctx.shadowBlur = 14;
    if (object.kind === "hazard") {
      ctx.fillStyle = "#fb7185";
      roundedRect(-object.size / 2, -object.size / 2, object.size, object.size, 16); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "900 28px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(object.label, 0, 2);
    } else if (object.kind === "gate") {
      ctx.strokeStyle = "#facc15"; ctx.lineWidth = 10;
      roundedRect(-object.size, -object.size / 2, object.size * 2, object.size, 24); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.92)"; roundedRect(-object.size + 12, -object.size / 2 + 12, object.size * 2 - 24, object.size - 24, 18); ctx.fill();
      ctx.fillStyle = "#1e3a8a"; ctx.font = "900 24px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(object.label, 0, 0);
    } else {
      ctx.fillStyle = object.kind === "bonus" ? "#facc15" : "#ffffff";
      star(0, 0, object.size / 2, object.size / 4, 5); ctx.fill();
      ctx.fillStyle = "#1e3a8a"; ctx.font = "900 15px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(object.label, 0, 3);
    }
    ctx.restore();
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life / 800);
    ctx.fillStyle = p.color;
    roundedRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size, 4);
    ctx.fill();
    ctx.restore();
  }

  function drawScanlines(w, h) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#fff";
    for (let y = 0; y < h; y += 28) ctx.fillRect(0, y, w, 2);
    ctx.restore();
  }

  function updateHud() {
    const safe = Math.max(0, arcade.seconds);
    timer.textContent = `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
    scoreText.textContent = String(arcade.score);
    comboText.textContent = `x${arcade.combo}`;
    livesText.textContent = String(Math.max(0, arcade.lives));
  }

  function playerBox() {
    return { x: arcade.playerX * canvas.width - 54, y: arcade.playerY * canvas.height - 54, w: 108, h: 108 };
  }

  function objectBox(object) {
    return { x: object.x - object.size / 2, y: object.y - object.size / 2, w: object.size, h: object.size };
  }

  function intersects(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function logicLabel() {
    return ["6+7", "4x3", "18/3", "A>B", "NEXT", "ODD", "PAIR", "HALF"][Math.floor(Math.random() * 8)];
  }

  function roundedRect(x, y, w, h, r) {
    const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function star(cx, cy, outer, inner, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i += 1) {
      const radius = i % 2 ? inner : outer;
      const angle = -Math.PI / 2 + (i * Math.PI) / points;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
})();
