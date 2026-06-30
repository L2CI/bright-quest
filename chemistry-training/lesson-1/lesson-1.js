(() => {
  const VOICE_ENDPOINT = "/api/blackboard-voice";
  const FALLBACK_SCENE_SECONDS = 75;

  const scenes = [
    {
      title: "Chemistry starts with evidence",
      short: "What chemists do",
      phaseCount: 8,
      narration: "Welcome to Chemistry Foundations. Not baby chemistry. Real chemistry, made clear. Today we start with matter, materials, and evidence. Chemistry is the study of what things are made of, what properties they have, and how they change. The important word is evidence. We do not say, that looks sciencey, therefore it is true. We observe, test, compare, and then decide. On the bench today we have metal, plastic, wax, salt, water, and graphite. Each one is a suspect in our material mystery. Sensible goggles on. Serious eyebrows optional.",
      caption: "Chemistry is evidence work: observe, test, compare, decide."
    },
    {
      title: "Object or material?",
      short: "Object vs material",
      phaseCount: 8,
      narration: "First distinction. An object is the thing. A material is what the thing is made from. A spoon is an object. Metal is the material. A bottle is an object. It might be made from glass or plastic. This sounds simple, but it matters. Chemists ask material questions. Is it flexible? Does it dissolve? Is it magnetic? Does it conduct heat? If a rubber duck applies to be a window, we can admire the confidence, but we still have to ask for evidence. Is it transparent enough? No. Excellent confidence. Terrible transparency.",
      caption: "Object = the thing. Material = what it is made from."
    },
    {
      title: "The property test bench",
      short: "Properties",
      phaseCount: 8,
      narration: "A property is a feature we can observe or test. Some properties are visible, like colour and transparency. Some need a test, like magnetism, flexibility, waterproofing, and heat conduction. The clever part is that we do not test everything randomly. We choose a test that answers a question. Want a raincoat material? Test waterproofing and flexibility. Want a saucepan handle? Test whether heat travels through it easily. Want a bridge cable? Test strength. Chemistry is not just naming materials. It is matching properties to a job.",
      caption: "Properties are features we can observe or test."
    },
    {
      title: "Fair comparison",
      short: "Fair tests",
      phaseCount: 7,
      narration: "Now the quiet superpower: fair comparison. If we test two materials, we keep the test fair. Same amount of water. Same time. Same magnet. Same kind of bend. Otherwise we are not comparing materials; we are comparing messy tests. Imagine testing a raincoat with one tiny drip, then testing paper with a bucket. The paper complains, and honestly, the paper has a point. A fair test changes one thing at a time, so the evidence actually means something.",
      caption: "A fair test changes one thing at a time."
    },
    {
      title: "Choose the material for the job",
      short: "Material choices",
      phaseCount: 7,
      narration: "Let us make decisions. For a window, glass wins because it is transparent: light passes through, so we can see out. For a raincoat, flexible waterproof fabric beats cardboard. Cardboard can be noble, but in a thunderstorm it becomes sad breakfast cereal. For electrical wire, copper is useful because it conducts electricity and can be drawn into thin wire. Notice the pattern. We do not ask, what material is best? We ask, best for what job?",
      caption: "The best material depends on the job."
    },
    {
      title: "When one property is not enough",
      short: "Trade-offs",
      phaseCount: 7,
      narration: "Real chemists also look for trade-offs. Glass is transparent, but it can break. Metal can be strong, but it can heat up. Plastic can be light and waterproof, but it may not be strong enough for every job. Good material decisions balance several properties. That is why engineers and chemists work together. One says, I need this to be strong. The other says, fine, but do you also need it light, safe, cheap, waterproof, and not secretly terrible? Evidence keeps the conversation honest.",
      caption: "Good material choices balance several properties."
    },
    {
      title: "Evidence summary",
      short: "Review",
      phaseCount: 6,
      narration: "Recap time. Matter is the stuff around us. Materials are what objects are made from. Properties are features we can observe or test. Evidence comes from careful comparison. And the best material depends on the job. If you remember one sentence, remember this: chemistry is how we use evidence to understand and choose materials. Next lesson, we go smaller. Much smaller. We meet atoms, the tiny building blocks behind the materials on this bench. Tiny, but not cute. Atoms do serious work.",
      caption: "Chemistry uses evidence to understand and choose materials."
    }
  ];

  const el = {
    stage: document.getElementById("svgStage"),
    caption: document.getElementById("caption"),
    sceneTitle: document.getElementById("sceneTitle"),
    sceneCounter: document.getElementById("sceneCounter"),
    voiceStatus: document.getElementById("voiceStatus"),
    start: document.getElementById("startButton"),
    pause: document.getElementById("pauseButton"),
    previous: document.getElementById("previousButton"),
    next: document.getElementById("nextButton"),
    captionToggle: document.getElementById("captionToggle"),
    timeLabel: document.getElementById("timeLabel"),
    durationLabel: document.getElementById("durationLabel"),
    progressBar: document.getElementById("progressBar"),
    sceneList: document.getElementById("sceneList")
  };

  const state = {
    sceneIndex: 0,
    phase: 0,
    playing: false,
    paused: false,
    audio: null,
    audioUrl: "",
    sceneStartedAt: 0,
    fallbackTimer: 0,
    raf: 0,
    captionsVisible: true,
    voiceMode: "cloud"
  };

  init();

  function init() {
    renderSceneList();
    renderScene(0, scenes[0].phaseCount - 1);
    el.start.addEventListener("click", startOrRestart);
    el.pause.addEventListener("click", togglePause);
    el.previous.addEventListener("click", previousScene);
    el.next.addEventListener("click", nextScene);
    el.captionToggle.addEventListener("click", toggleCaptions);
  }

  function renderSceneList() {
    el.sceneList.innerHTML = scenes.map((scene, index) => `
      <button class="scene-button${index === state.sceneIndex ? " active" : ""}" type="button" data-scene="${index}">
        <b>${String(index + 1).padStart(2, "0")}</b>
        <span>${escapeHtml(scene.short)}</span>
      </button>
    `).join("");
    el.sceneList.querySelectorAll("[data-scene]").forEach((button) => {
      button.addEventListener("click", () => goToScene(Number(button.dataset.scene), false));
    });
  }

  function startOrRestart() {
    if (!state.playing) {
      playScene(state.sceneIndex);
      return;
    }
    goToScene(0, true);
  }

  async function playScene(index) {
    cleanupAudio();
    const scene = scenes[index];
    state.sceneIndex = index;
    state.playing = true;
    state.paused = false;
    state.phase = 0;
    state.sceneStartedAt = performance.now();
    el.start.textContent = "Restart lesson";
    el.start.classList.add("playing");
    el.pause.textContent = "Pause";
    renderSceneList();
    renderScene(index, 0);

    try {
      if (!canUseCloudVoice()) throw new Error("local voice fallback");
      el.voiceStatus.textContent = "Teacher voice loading";
      const response = await fetch(VOICE_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: scene.narration })
      });
      if (!response.ok) throw new Error("voice unavailable");
      const blob = await response.blob();
      state.audioUrl = URL.createObjectURL(blob);
      state.audio = new Audio(state.audioUrl);
      state.audio.addEventListener("loadedmetadata", tick);
      state.audio.addEventListener("timeupdate", tick);
      state.audio.addEventListener("ended", () => {
        if (state.sceneIndex < scenes.length - 1) playScene(state.sceneIndex + 1);
        else finishLesson();
      });
      await state.audio.play();
      el.voiceStatus.textContent = "Teacher voice";
      el.durationLabel.textContent = formatTime(state.audio.duration || 0);
    } catch {
      el.voiceStatus.textContent = "Browser voice fallback";
      state.voiceMode = "fallback";
      speakFallback(scene.narration, () => {
        if (state.sceneIndex < scenes.length - 1) playScene(state.sceneIndex + 1);
        else finishLesson();
      });
      tickFallback();
    }
  }

  function speakFallback(text, onEnd) {
    if (!("speechSynthesis" in window)) {
      state.fallbackTimer = window.setTimeout(onEnd, FALLBACK_SCENE_SECONDS * 1000);
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 0.82;
    utterance.volume = 1;
    utterance.onend = onEnd;
    state.audio = utterance;
    speechSynthesis.speak(utterance);
  }

  function tickFallback() {
    cancelAnimationFrame(state.raf);
    const loop = () => {
      if (!state.playing || state.voiceMode !== "fallback") return;
      const elapsed = (performance.now() - state.sceneStartedAt) / 1000;
      updateProgress(elapsed, FALLBACK_SCENE_SECONDS);
      state.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  function tick() {
    if (!state.audio || state.voiceMode === "fallback") return;
    updateProgress(state.audio.currentTime || 0, state.audio.duration || 1);
  }

  function updateProgress(seconds, duration) {
    const scene = scenes[state.sceneIndex];
    const safeDuration = Math.max(1, duration || FALLBACK_SCENE_SECONDS);
    const progress = Math.min(1, seconds / safeDuration);
    const phase = visualPhase(scene, seconds, safeDuration);
    el.timeLabel.textContent = formatTime(seconds);
    el.durationLabel.textContent = formatTime(safeDuration);
    el.progressBar.style.width = `${Math.round(progress * 100)}%`;
    if (phase !== state.phase) {
      state.phase = phase;
      renderScene(state.sceneIndex, phase);
    }
  }

  function togglePause() {
    if (!state.playing) return;
    state.paused = !state.paused;
    if (state.voiceMode === "fallback") {
      if ("speechSynthesis" in window) {
        state.paused ? speechSynthesis.pause() : speechSynthesis.resume();
      }
    } else if (state.audio) {
      state.paused ? state.audio.pause() : state.audio.play();
    }
    el.pause.textContent = state.paused ? "Resume" : "Pause";
  }

  function visualPhase(scene, seconds, duration) {
    const firstBeat = 2.5;
    const maxGap = 6.5;
    if (seconds < firstBeat) return 0;
    const timedPhase = 1 + Math.floor((seconds - firstBeat) / maxGap);
    const proportionalPhase = Math.floor((seconds / Math.max(1, duration)) * scene.phaseCount);
    return Math.min(scene.phaseCount - 1, Math.max(timedPhase, proportionalPhase));
  }

  function previousScene() {
    goToScene(Math.max(0, state.sceneIndex - 1), state.playing);
  }

  function nextScene() {
    goToScene(Math.min(scenes.length - 1, state.sceneIndex + 1), state.playing);
  }

  function goToScene(index, shouldPlay) {
    cleanupAudio();
    state.playing = false;
    state.paused = false;
    state.voiceMode = "cloud";
    state.sceneIndex = index;
    state.phase = 0;
    el.start.textContent = "Start lesson";
    el.start.classList.remove("playing");
    el.pause.textContent = "Pause";
    el.progressBar.style.width = "0%";
    el.timeLabel.textContent = "00:00";
    renderSceneList();
    renderScene(index, scenes[index].phaseCount - 1);
    if (shouldPlay) playScene(index);
  }

  function finishLesson() {
    cleanupAudio();
    state.playing = false;
    state.paused = false;
    el.start.textContent = "Replay lesson";
    el.start.classList.remove("playing");
    el.voiceStatus.textContent = "Lesson complete";
    renderScene(scenes.length - 1, scenes.at(-1).phaseCount - 1);
  }

  function cleanupAudio() {
    cancelAnimationFrame(state.raf);
    clearTimeout(state.fallbackTimer);
    if (state.audio instanceof HTMLAudioElement) {
      state.audio.pause();
      state.audio.src = "";
    }
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
    state.audio = null;
    state.audioUrl = "";
  }

  function canUseCloudVoice() {
    return !["127.0.0.1", "localhost", ""].includes(window.location.hostname);
  }

  function toggleCaptions() {
    state.captionsVisible = !state.captionsVisible;
    el.captionToggle.setAttribute("aria-pressed", String(state.captionsVisible));
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
  }

  function renderScene(index, phase) {
    const scene = scenes[index];
    el.stage.classList.toggle("is-static", !state.playing);
    el.sceneTitle.textContent = scene.title;
    el.sceneCounter.textContent = `Scene ${index + 1} of ${scenes.length}`;
    el.caption.textContent = scene.caption;
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
    el.stage.innerHTML = sceneSvg(index, phase);
  }

  function sceneSvg(index, phase) {
    return [
      evidenceBench,
      objectMaterial,
      propertyBench,
      fairTest,
      jobChooser,
      tradeOffs,
      recap
    ][index](phase);
  }

  function evidenceBench(phase) {
    return board(`
      ${labBench()}
      ${phase >= 0 ? titleText("Matter, Materials, Evidence") : ""}
      ${phase >= 1 ? sampleSet(230, phase === 1 ? 2 : 6) : ""}
      ${phase >= 3 ? detectiveLens(710, 150, "observe") : ""}
      ${phase >= 4 ? evidenceSteps(["Observe", "Test", "Compare", "Decide"].slice(0, Math.min(4, phase - 3))) : ""}
    `);
  }

  function objectMaterial(phase) {
    return board(`
      ${phase >= 0 ? titleText("Object vs Material") : ""}
      ${phase >= 1 ? objectCard(170, 165, "Spoon", "object", "#e8eef0") : ""}
      ${phase >= 2 ? objectCard(450, 165, "Metal", "material", "#d7c7a0") : ""}
      ${phase >= 3 ? arrow(360, 215, 440, 215) : ""}
      ${phase >= 4 ? evidenceMini("Question", "What is it made from?", 330, 365) : ""}
      ${phase === 5 ? duckWindow(false) : ""}
      ${phase >= 6 ? duckWindow(true) : ""}
      ${phase >= 7 ? jobBanner("Chemists ask material questions.") : ""}
    `);
  }

  function propertyBench(phase) {
    const tests = [
      ["Magnet", 155, "#d74b3f"],
      ["Bend", 300, "#2d7f73"],
      ["Water", 445, "#2c7fa3"],
      ["Heat", 590, "#c98325"],
      ["Light", 735, "#e2c75b"]
    ];
    return board(`
      ${phase >= 0 ? titleText("Property Test Bench") : ""}
      ${phase >= 1 ? sampleSet(92) : ""}
      ${phase >= 2 ? evidenceMini("Visible", "colour, shape, transparency", 260, 300) : ""}
      ${phase >= 3 ? tests.slice(0, 2).map(([label, x, color]) => testTool(x, 395, label, color)).join("") : ""}
      ${phase >= 4 ? tests.slice(2, 3).map(([label, x, color]) => testTool(x, 395, label, color)).join("") : ""}
      ${phase >= 5 ? tests.slice(3).map(([label, x, color]) => testTool(x, 395, label, color)).join("") : ""}
      ${phase >= 6 ? evidenceMini("Rule", "choose the test for the question", 455, 300) : ""}
      ${phase >= 7 ? jobBanner("Choose the test that answers the question.") : ""}
    `);
  }

  function fairTest(phase) {
    return board(`
      ${phase >= 0 ? titleText("Fair Comparison") : ""}
      ${phase >= 1 ? testColumn(175, "Material A", "same water", "#deefe9") : ""}
      ${phase >= 2 ? testColumn(510, "Material B", "same water", "#f5e8cf") : ""}
      ${phase >= 3 ? rulerLine(160, 385, 680, "same time") : ""}
      ${phase >= 4 ? evidenceMini("Same", "amount, time, tool", 320, 115) : ""}
      ${phase >= 5 ? warningCard("Change one thing at a time") : ""}
      ${phase >= 6 ? jobBanner("Fair evidence beats messy tests.") : ""}
    `);
  }

  function jobChooser(phase) {
    return board(`
      ${phase >= 0 ? titleText("Best Material For The Job") : ""}
      ${phase >= 1 ? jobChoice(115, "Window", "transparent", "glass", "#8fd3e8") : ""}
      ${phase >= 2 ? jobChoice(335, "Raincoat", "waterproof + flexible", "fabric", "#58a777") : ""}
      ${phase >= 3 ? jobChoice(555, "Wire", "conducts electricity", "copper", "#c7763a") : ""}
      ${phase >= 4 ? arrow(265, 438, 365, 438) : ""}
      ${phase >= 5 ? arrow(485, 438, 585, 438) : ""}
      ${phase >= 6 ? jobBanner("The real question is: best for what job?") : ""}
    `);
  }

  function tradeOffs(phase) {
    return board(`
      ${phase >= 0 ? titleText("Trade-offs") : ""}
      ${phase >= 1 ? balanceScale("Glass", "transparent", "breaks", 150) : ""}
      ${phase >= 2 ? balanceScale("Metal", "strong", "heats up", 395) : ""}
      ${phase >= 3 ? balanceScale("Plastic", "light", "not always strong", 640) : ""}
      ${phase >= 4 ? evidenceMini("Trade-off", "one good property is not enough", 285, 435) : ""}
      ${phase >= 5 ? warningCard("Good choices balance several properties") : ""}
      ${phase >= 6 ? jobBanner("Evidence keeps the choice honest.") : ""}
    `);
  }

  function recap(phase) {
    return board(`
      ${phase >= 0 ? titleText("Evidence Summary") : ""}
      ${phase >= 1 ? recapTile(110, 160, "Matter", "stuff around us") : ""}
      ${phase >= 2 ? recapTile(330, 160, "Materials", "what objects are made from") : ""}
      ${phase >= 3 ? recapTile(550, 160, "Properties", "features we test") : ""}
      ${phase >= 4 ? recapTile(220, 375, "Evidence", "observe, test, compare") : ""}
      ${phase >= 5 ? recapTile(500, 375, "Next", "atoms") : ""}
    `);
  }

  function board(content) {
    return `<svg viewBox="0 0 900 620" role="img" aria-label="Animated chemistry board">
      <defs>
        <filter id="chalkSoft"><feGaussianBlur stdDeviation="0.18"/></filter>
        <linearGradient id="paperGrad" x1="0" x2="1"><stop stop-color="#fff9df"/><stop offset="1" stop-color="#efe1bf"/></linearGradient>
      </defs>
      <rect width="900" height="620" rx="18" fill="#1f2a26"/>
      <path d="M34 548 C210 518 382 585 560 548 S780 536 866 556" fill="none" stroke="#f7f1df" stroke-opacity=".08" stroke-width="4"/>
      ${content}
    </svg>`;
  }

  function titleText(text) {
    return `<text class="fade-in" x="54" y="76" fill="#f7f1df" font-size="34" font-weight="900">${escapeHtml(text)}</text>`;
  }

  function labBench() {
    return `<path class="draw" pathLength="1" d="M90 472 H810" stroke="#d7c7a0" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path class="draw" pathLength="1" d="M150 472 v52 M750 472 v52" stroke="#d7c7a0" stroke-width="7" stroke-linecap="round"/>`;
  }

  function sampleSet(y = 230, limit = 6) {
    const samples = [
      sampleBlock(98, y, "Metal", "#c7d0d0", "M0 0h78v54H0z"),
      sampleBlock(205, y, "Plastic", "#6fb593", "M39 0c26 0 45 15 45 34s-19 34-45 34S-6 53-6 34 13 0 39 0z"),
      sampleBlock(325, y, "Wax", "#e5c476", "M0 8c18-12 60-12 78 0v52H0z"),
      sampleBlock(445, y, "Salt", "#f4f1e5", "M10 44 28 14l20 30 18-20 13 31z"),
      sampleBlock(565, y, "Water", "#7fc4d3", "M38 0c22 26 36 46 36 66 0 21-16 36-36 36S2 87 2 66C2 46 16 26 38 0z"),
      sampleBlock(700, y, "Graphite", "#747c7a", "M0 28 50 0l45 28-50 30z")
    ];
    return `<g class="pop-in">${samples.slice(0, limit).join("")}</g>`;
  }

  function sampleBlock(x, y, label, color, path) {
    return `<g transform="translate(${x} ${y})">
      <path d="${path}" fill="${color}" stroke="#f7f1df" stroke-opacity=".75" stroke-width="3"/>
      <text x="39" y="96" text-anchor="middle" fill="#f7f1df" font-size="18" font-weight="800">${label}</text>
    </g>`;
  }

  function detectiveLens(x, y, label) {
    return `<g class="pop-in" transform="translate(${x} ${y})">
      <circle cx="0" cy="0" r="48" fill="none" stroke="#f2c35e" stroke-width="8"/>
      <path d="M34 34l54 54" stroke="#f2c35e" stroke-width="10" stroke-linecap="round"/>
      <text x="0" y="8" text-anchor="middle" fill="#f7f1df" font-size="17" font-weight="900">${label}</text>
    </g>`;
  }

  function evidenceSteps(labels) {
    return labels.map((label, i) => `<g class="slide-in" style="animation-delay:${i * 0.12}s" transform="translate(${105 + i * 178} 392)">
      <rect width="142" height="68" rx="13" fill="#f7f1df" opacity=".96"/>
      <circle cx="24" cy="34" r="12" fill="#1f6f5b"/>
      <text x="76" y="40" text-anchor="middle" fill="#1f2a26" font-size="18" font-weight="900">${label}</text>
    </g>`).join("");
  }

  function evidenceMini(label, copy, x, y) {
    return `<g class="slide-in" transform="translate(${x} ${y})">
      <rect width="250" height="78" rx="15" fill="#f7f1df" opacity=".96"/>
      <text x="125" y="31" text-anchor="middle" fill="#1f6f5b" font-size="18" font-weight="950">${escapeHtml(label)}</text>
      <text x="125" y="57" text-anchor="middle" fill="#1f2a26" font-size="17" font-weight="850">${escapeHtml(copy)}</text>
    </g>`;
  }

  function objectCard(x, y, big, small, fill) {
    return `<g class="pop-in" transform="translate(${x} ${y})">
      <rect width="210" height="170" rx="18" fill="${fill}" stroke="#f7f1df" stroke-width="3"/>
      <text x="105" y="76" text-anchor="middle" fill="#1f2a26" font-size="34" font-weight="950">${big}</text>
      <text x="105" y="116" text-anchor="middle" fill="#4b5751" font-size="22" font-weight="850">${small}</text>
    </g>`;
  }

  function arrow(x1, y1, x2, y2) {
    return `<path class="draw" pathLength="1" d="M${x1} ${y1} H${x2}" stroke="#f2c35e" stroke-width="7" stroke-linecap="round"/>
      <path class="pop-in" d="M${x2} ${y2}l-18-12v24z" fill="#f2c35e"/>`;
  }

  function duckWindow(showReject) {
    return `<g transform="translate(245 390)">
      <rect class="fade-in" x="0" y="0" width="390" height="110" rx="18" fill="#233932" stroke="#f7f1df" stroke-opacity=".35"/>
      <path class="pop-in" d="M75 70c-10-6-12-27 8-36 16-7 28 2 33 12 16-4 33 4 38 18 8 23-12 42-38 38H70c-28 0-41-18-35-34 5-14 22-17 40 2z" fill="#e8bd3b"/>
      <circle cx="112" cy="50" r="4" fill="#1f2a26"/>
      <path d="M58 82c28 12 69 12 96 0" stroke="#8a5b1d" stroke-width="4" fill="none" stroke-linecap="round"/>
      <text x="242" y="44" fill="#f7f1df" font-size="20" font-weight="900">Window job?</text>
      ${showReject ? `<g class="pop-in">
        <text x="270" y="75" text-anchor="middle" fill="#f2c35e" font-size="20" font-weight="950">Excellent confidence.</text>
        <text x="270" y="101" text-anchor="middle" fill="#f2c35e" font-size="20" font-weight="950">Terrible transparency.</text>
      </g>` : ""}
    </g>`;
  }

  function testTool(x, y, label, color) {
    return `<g class="pop-in" transform="translate(${x} ${y})">
      <rect x="-48" y="-34" width="96" height="92" rx="15" fill="#f7f1df"/>
      <circle class="pulse-test" cx="0" cy="2" r="24" fill="${color}"/>
      <text x="0" y="76" text-anchor="middle" fill="#f7f1df" font-size="18" font-weight="850">${label}</text>
    </g>`;
  }

  function jobBanner(text) {
    return `<g class="slide-in" transform="translate(185 510)">
      <rect width="530" height="58" rx="15" fill="#f2c35e"/>
      <text x="265" y="38" text-anchor="middle" fill="#1f2a26" font-size="21" font-weight="950">${escapeHtml(text)}</text>
    </g>`;
  }

  function testColumn(x, title, note, fill) {
    return `<g class="pop-in" transform="translate(${x} 165)">
      <rect width="220" height="270" rx="20" fill="${fill}" stroke="#f7f1df" stroke-width="3"/>
      <text x="110" y="42" text-anchor="middle" fill="#1f2a26" font-size="24" font-weight="950">${title}</text>
      <path d="M67 75h86l-18 118H85z" fill="#8fc7d7" opacity=".9" stroke="#1f2a26" stroke-width="4"/>
      <path class="float-gently" d="M82 182h56" stroke="#1f6f5b" stroke-width="9" stroke-linecap="round"/>
      <text x="110" y="236" text-anchor="middle" fill="#4b5751" font-size="19" font-weight="850">${note}</text>
    </g>`;
  }

  function rulerLine(x, y, width, label) {
    return `<g class="draw" pathLength="1">
      <path d="M${x} ${y}h${width}" stroke="#f2c35e" stroke-width="5"/>
      <text x="${x + width / 2}" y="${y + 38}" text-anchor="middle" fill="#f7f1df" font-size="22" font-weight="900">${label}</text>
    </g>`;
  }

  function warningCard(text) {
    return `<g class="slide-in" transform="translate(230 480)">
      <rect width="440" height="72" rx="16" fill="#a84f37"/>
      <text x="220" y="44" text-anchor="middle" fill="#fff9df" font-size="22" font-weight="950">${escapeHtml(text)}</text>
    </g>`;
  }

  function jobChoice(x, title, property, material, color) {
    return `<g class="pop-in" transform="translate(${x} 155)">
      <rect width="190" height="260" rx="18" fill="#f7f1df"/>
      <rect x="24" y="38" width="142" height="94" rx="14" fill="${color}" stroke="#1f2a26" stroke-width="4"/>
      <text x="95" y="168" text-anchor="middle" fill="#1f2a26" font-size="24" font-weight="950">${title}</text>
      <text x="95" y="202" text-anchor="middle" fill="#4b5751" font-size="16" font-weight="850">${property}</text>
      <text x="95" y="232" text-anchor="middle" fill="#1f6f5b" font-size="20" font-weight="950">${material}</text>
    </g>`;
  }

  function balanceScale(title, good, risk, x) {
    return `<g class="pop-in" transform="translate(${x} 180)">
      <text x="0" y="-22" text-anchor="middle" fill="#f7f1df" font-size="24" font-weight="950">${title}</text>
      <path d="M0 26v132M-76 64h152M-42 64l-24 64h48zM42 64l-24 64h48z" fill="none" stroke="#d7c7a0" stroke-width="5" stroke-linejoin="round"/>
      <text x="-66" y="168" text-anchor="middle" fill="#8fd3e8" font-size="16" font-weight="900">${good}</text>
      <text x="66" y="168" text-anchor="middle" fill="#f2c35e" font-size="16" font-weight="900">${risk}</text>
    </g>`;
  }

  function recapTile(x, y, title, copy) {
    return `<g class="slide-in" transform="translate(${x} ${y})">
      <rect width="170" height="124" rx="18" fill="#f7f1df"/>
      <text x="85" y="49" text-anchor="middle" fill="#1f2a26" font-size="24" font-weight="950">${title}</text>
      <text x="85" y="84" text-anchor="middle" fill="#4b5751" font-size="15" font-weight="800">${copy}</text>
    </g>`;
  }

  function formatTime(seconds) {
    const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const mins = Math.floor(safe / 60);
    const secs = Math.floor(safe % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
