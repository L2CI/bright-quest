(() => {
  const VOICE_ENDPOINT = "/api/blackboard-voice";
  const VIEW = `0 0 960 600`;
  const FALLBACK_RATE_WPM = 132;

  const scenes = [
    {
      title: "Everything Has a Hidden Code",
      short: "Hidden code",
      target: 60,
      caption: "Chemistry starts with a secret alphabet: atoms, elements, molecules, compounds, and mixtures.",
      narration: "Look at this desk for a second. Pencil. Water. Spoon. Salt. A copper coin. Even the air you breathe out. They look completely different. One writes, one flows, one clinks, one disappears into soup if you are not careful. But chemistry starts with a brilliant idea: these things are not magic. They are built. Built from pieces so tiny that your eyes cannot see them. Once you know the alphabet, water, salt, metal, air, sugar, smoke, even the graphite in your pencil start making more sense. Today we are learning that alphabet: atoms, elements, molecules, compounds, and mixtures.",
      render: renderHiddenCode
    },
    {
      title: "What Counts as Matter?",
      short: "Matter",
      target: 75,
      caption: "Matter has mass and takes up space. Air counts. A torch beam is different: energy.",
      narration: "Before atoms, we need one clean word: matter. Matter is stuff that has mass and takes up space. Water is matter. It has mass, and it takes up space in a cup. A spoon is matter. Easy. Air is matter too. It feels invisible, but try blowing up a balloon. The balloon gets bigger because air takes up space. Air is not nothing. It is just sneaky. Light is different. A torch beam is not matter in the same way. It is energy. We do not need to chase that rabbit today. So our chemistry world begins with matter: solids, liquids, gases, and everyday stuff like metals, plastics, and crystals. Now the big question: what is matter made of?",
      render: renderMatter
    },
    {
      title: "Atoms: Too Small to See",
      short: "Atoms",
      target: 85,
      caption: "Atoms are tiny units of matter. Models help us think about things too small to see.",
      narration: "Imagine I give you one grain of salt. You cut it in half. Still salt. Cut it smaller. Still salt. Smaller again. At some point, the pieces are far too small to see. But chemistry says the salt is still made from tiny particles. One of the most important words in chemistry is atom. An atom is a tiny unit of matter, and atoms are the pieces that make up elements. A bit of gold is made from gold atoms. A pencil's graphite contains carbon atoms. Oxygen gas contains oxygen atoms. Salt is slightly trickier, so for today we will say it is made from tiny particles. Later, we can learn the more advanced word: ions. Atoms are so small that we use models to think about them. A model is not the real thing. It is a thinking tool. Like a map of Australia is not Australia. You cannot swim at Bondi Beach on the map. But the map still helps you understand where things are. Our atom drawings are like that. Useful models. Not tiny photographs.",
      render: renderAtoms
    },
    {
      title: "Elements: One Type of Atom",
      short: "Elements",
      target: 80,
      caption: "An element is made from one type of atom. The periodic table is the map of element types.",
      narration: "Now for the word your periodic-table brain probably wants: element. An element is a substance made from one type of atom. If something is pure carbon, it has carbon atoms. Pure oxygen has oxygen atoms. Pure gold has gold atoms. The periodic table is not just a colourful poster. It is a map of the known element types. Each tile is like saying, here is one kind of atom that nature can use. Carbon. Oxygen. Hydrogen. Iron. Copper. Gold. Now quick check. Is water an element? No. Water is made from hydrogen and oxygen together. Hold that thought, because in a minute we will give that joined-together idea its proper chemistry name. Is gold an element? Yes. Gold is one type of atom. Is plastic an element? No. Plastic is made from several types of atoms joined in long patterns. The trick is simple: one type of atom means element.",
      render: renderElements
    },
    {
      title: "Symbols Are Shortcuts",
      short: "Symbols",
      target: 80,
      caption: "Chemical symbols are shortcuts for element names: H, O, C, Fe, Cu, Au.",
      narration: "Chemists are efficient. Sometimes annoyingly efficient. They do not write hydrogen hydrogen oxygen every time they talk about water. They use symbols. Hydrogen is H. Oxygen is O. Carbon is C. Iron is Fe, from an older name, ferrum. Copper is Cu, from cuprum. Gold is Au, from aurum. You do not need to memorise the whole periodic table today. That would be a deeply rude lesson. But you should know what the symbols are doing. They are shortcuts for element names. So when you see H, O, C, Fe, Cu, and Au, do not think random letters. Think atom types. Also notice the writing: Fe has one capital F and one lowercase e. Chemical symbols are fussy like that. Fussy, but useful. Chemistry is starting to look like a code because it is a code.",
      render: renderSymbols
    },
    {
      title: "Molecules: Atoms Joined",
      short: "Molecules",
      target: 95,
      caption: "A molecule is atoms joined as one unit. Water is a molecule and a compound.",
      narration: "Atoms do not always stay alone. Sometimes atoms join together. When atoms are joined together as a unit, we call that a molecule. Here are two hydrogen atoms joined together. That is a hydrogen molecule. Here are two oxygen atoms joined together. That is an oxygen molecule. Notice something important. A molecule can be made from the same type of atom. Now watch this one: two hydrogen atoms and one oxygen atom joined together. This is a water molecule. Same word, molecule. Different ingredients. Molecule does not automatically mean complicated. It just means atoms joined as a unit. And no, atoms do not have tiny hands. The picture is a model. The model helps us track which atoms are connected. Here is the important bridge: water is a molecule and a compound. It is a molecule because atoms are joined as one unit. It is a compound because those atoms come from different elements.",
      render: renderMolecules
    },
    {
      title: "Compounds: New Substances",
      short: "Compounds",
      target: 85,
      caption: "A compound has atoms of different elements chemically joined into a new substance.",
      narration: "Now we can say compound properly. A compound is made when atoms of different elements are chemically joined. Water is a compound because it contains hydrogen and oxygen joined together. Carbon dioxide is a compound because it contains carbon and oxygen joined together. Table salt is a compound too. It contains sodium and chlorine joined in a pattern. Here is the part that feels almost like a trick: a compound can behave nothing like the separate elements. Hydrogen is a gas. Oxygen is a gas. Joined as water, you can drink it. That does not mean you should try random chemistry in the kitchen. Please do not become the reason the saucepan needs counselling. The serious point is this: when different elements join chemically, the result can be a new substance with new properties.",
      render: renderCompounds
    },
    {
      title: "Mixtures: Together, Not Rebuilt",
      short: "Mixtures",
      target: 80,
      caption: "A mixture has substances together, but not chemically rebuilt into one new substance.",
      narration: "Compounds and mixtures are easy to confuse, so let us separate them carefully. In a compound, atoms of different elements are chemically joined into a substance. In a mixture, substances are together, but they have not been rebuilt into one new substance. Air is a mixture. It has nitrogen, oxygen, carbon dioxide, water vapour, and other gases mixed together. Salt water is a mixture. Water is there. Salt particles are spread through it. They are together, but the water has not turned into a new pure substance. Cereal and milk is a mixture, unless someone has invented a very strange breakfast compound. A good question is: can we separate the parts by filtering, evaporating, or sorting? If yes, you may be looking at a mixture.",
      render: renderMixtures
    },
    {
      title: "The Salt Did Not Vanish",
      short: "Dissolving",
      target: 80,
      caption: "Dissolved does not mean gone. It means spread out at a tiny scale.",
      narration: "Now the classic mystery: when salt dissolves in water, where did it go? It did not vanish. If it vanished, salty water would taste like plain water. It absolutely does not. Your tongue is a surprisingly good chemistry detector. The salt breaks apart into particles too small for your eyes to see, and those particles spread through the water. More advanced chemistry calls those charged particles ions. We do not need to use that word in the test, but it is worth knowing the salt is not floating around as neat little salt cubes. That is why the whole cup can taste salty, not just the bottom. Here is the evidence move. If you evaporate the water, the salt can be left behind. So dissolved does not mean gone. It means spread out at a tiny scale.",
      render: renderDissolving
    },
    {
      title: "Same Element, Different Arrangement",
      short: "Carbon",
      target: 60,
      caption: "Graphite and diamond both contain carbon. Arrangement changes properties.",
      narration: "One more idea, because it is too good to save. Graphite, the stuff in a pencil, contains carbon. Diamond also contains carbon. Same element. Very different material. Graphite is soft enough to leave a mark on paper. Diamond is famous for being extremely hard. How can that happen? The type of atom matters, but the arrangement matters too. Think of it like using the same bricks to build a wobbly tower or a strong bridge. Same pieces, different structure, different behaviour. That is a major chemistry idea, and we will come back to it later.",
      render: renderArrangement
    },
    {
      title: "Fast Sorting Game",
      short: "Sort",
      target: 70,
      caption: "Oxygen gas is both a molecule and an element. Water is a compound molecule.",
      narration: "Let us do a fast sort before the test. Gold. One type of atom. Element. Copper. One type of atom. Element. Oxygen gas. Oxygen atoms joined in pairs. It is a molecule, but still an element because it has only oxygen atoms. That is a useful trick case. Molecule tells us atoms are joined. Element tells us there is only one type of atom. Oxygen gas is both. Water. Hydrogen and oxygen joined together. Compound. Water is also a molecule. More precisely, it is a compound molecule. Carbon dioxide. Carbon and oxygen joined together. Compound. Air. Different gases together, not one new substance. Mixture. Salt water. Water plus dissolved salt particles. Mixture. Cereal and milk. Mixture. Also a breakfast, but the test probably will not accept that as the whole answer.",
      render: renderSorting
    },
    {
      title: "The Chemist Move",
      short: "Test strategy",
      target: 50,
      caption: "Before the test: what is it made of, what category is it, what evidence, what model?",
      narration: "Now you are ready for the test strategy. When a chemistry question appears, do not panic and start guessing from the loudest word. Use the chemist move. First: what is it made of? Second: are we looking at an element, a molecule, a compound, or a mixture? Third: what evidence tells us? Taste, mass, space, separating, dissolving, or a particle model? Fourth: what model explains it? That is the framework. It comes after the chemistry because now the words mean something. Ready. Ten questions. No waffle. Let us see what the matter detective can do.",
      render: renderChemistMove
    }
  ];

  const questions = [
    {
      q: "Which one is matter?",
      choices: ["A metal spoon", "A torch beam", "A shadow", "An idea"],
      answer: 0,
      why: "A spoon has mass and takes up space."
    },
    {
      q: "Why do chemists use particle models?",
      choices: ["Particles are usually too small to see directly", "Models are prettier than facts", "Atoms are the size of marbles", "Because microscopes are boring"],
      answer: 0,
      why: "Models help us reason about particles too small to see."
    },
    {
      q: "What is an element?",
      choices: ["A substance made from one type of atom", "Anything with two atoms", "A mixture of substances", "Only shiny metals"],
      answer: 0,
      why: "One type of atom is the key idea."
    },
    {
      q: "Which symbol is written correctly?",
      choices: ["Fe", "FE", "cu", "AU"],
      answer: 0,
      why: "Chemical symbols use one capital letter, then lowercase if needed."
    },
    {
      q: "Oxygen gas is O2. What is the best description?",
      choices: ["A molecule and an element", "A compound only", "A mixture", "Not matter"],
      answer: 0,
      why: "The atoms are joined, so molecule. They are all oxygen, so element."
    },
    {
      q: "Water is H2O. What is it?",
      choices: ["A compound molecule", "An element", "A mixture", "A single atom"],
      answer: 0,
      why: "It is a molecule made from different elements, so it is also a compound."
    },
    {
      q: "Which is a mixture?",
      choices: ["Air", "Pure gold", "One oxygen molecule", "One water molecule"],
      answer: 0,
      why: "Air contains several gases together."
    },
    {
      q: "When salt dissolves in water, what happened?",
      choices: ["Salt particles spread through the water", "The salt stopped existing", "The water became an element", "The salt became light"],
      answer: 0,
      why: "Dissolved means spread out at a tiny scale, not gone."
    },
    {
      q: "Why can graphite and diamond behave differently if both contain carbon?",
      choices: ["The atoms are arranged differently", "One is not matter", "Gold atoms are hidden inside diamond", "Graphite is secretly water"],
      answer: 0,
      why: "Type of atom matters, but arrangement matters too."
    },
    {
      q: "Best first move in a chemistry question?",
      choices: ["Ask what it is made of", "Guess from the loudest word", "Ignore particle models", "Pick the longest answer"],
      answer: 0,
      why: "The chemist move starts with what it is made of."
    }
  ];

  const totalTarget = scenes.reduce((sum, scene) => sum + scene.target, 0);

  const el = {
    stage: document.getElementById("svgStage"),
    caption: document.getElementById("caption"),
    sceneTitle: document.getElementById("sceneTitle"),
    sceneCounter: document.getElementById("sceneCounter"),
    voiceStatus: document.getElementById("voiceStatus"),
    start: document.getElementById("startButton"),
    pause: document.getElementById("pauseButton"),
    rewind: document.getElementById("rewindButton"),
    stop: document.getElementById("stopButton"),
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
    fallbackElapsedBeforePause: 0,
    fallbackDuration: 0,
    raf: 0,
    captionsVisible: false,
    voiceMode: "cloud",
    quizIndex: 0,
    quizScore: 0,
    quizActive: false
  };

  init();

  function init() {
    renderSceneList();
    renderWaiting();
    el.durationLabel.textContent = formatTime(totalTarget);
    el.start.addEventListener("click", () => playScene(state.sceneIndex));
    el.pause.addEventListener("click", togglePause);
    el.rewind.addEventListener("click", rewind15);
    el.stop.addEventListener("click", stopLesson);
    el.previous.addEventListener("click", () => goToScene(Math.max(0, state.sceneIndex - 1), false));
    el.next.addEventListener("click", () => goToScene(Math.min(scenes.length - 1, state.sceneIndex + 1), false));
    el.captionToggle.addEventListener("click", toggleCaptions);
    el.stage.addEventListener("click", handleStageClick);
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

  function renderWaiting() {
    const scene = scenes[state.sceneIndex];
    el.stage.classList.add("is-waiting");
    el.stage.classList.remove("is-static");
    el.sceneTitle.textContent = scene.title;
    el.sceneCounter.textContent = `Scene ${state.sceneIndex + 1} of ${scenes.length}`;
    el.caption.textContent = scene.caption;
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
    el.progressBar.style.width = "0%";
    el.timeLabel.textContent = "00:00";
    el.stage.innerHTML = board(`
      ${titleText("Ready when you are")}
      ${centerCard("The Secret Alphabet of Matter", "Start the lesson to begin voice and animation together.", 250, 186, 460, 160)}
      ${atomCluster(480, 430, 7, 24, "#9bd6e0")}
      ${smallLabel(480, 508, "atoms -> elements -> molecules -> compounds -> mixtures")}
    `);
  }

  async function playScene(index) {
    if (state.quizActive) {
      state.quizActive = false;
    }
    cleanupAudio();
    const scene = scenes[index];
    state.sceneIndex = index;
    state.playing = true;
    state.paused = false;
    state.phase = -1;
    state.voiceMode = "cloud";
    state.sceneStartedAt = performance.now();
    state.fallbackElapsedBeforePause = 0;
    el.stage.classList.remove("is-waiting", "is-static");
    el.start.textContent = "Restart scene";
    el.start.classList.add("playing");
    el.pause.textContent = "Pause";
    el.voiceStatus.textContent = "Teacher voice loading";
    renderSceneList();
    renderSceneFrame(0, scene.target);

    try {
      if (!canUseCloudVoice()) throw new Error("cloud voice unavailable locally");
      const response = await fetch(VOICE_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: scene.narration, voiceProfile: "chemistry-teacher-v1" })
      });
      if (!response.ok) throw new Error("voice unavailable");
      const blob = await response.blob();
      state.audioUrl = URL.createObjectURL(blob);
      state.audio = new Audio(state.audioUrl);
      state.audio.addEventListener("loadedmetadata", tickAudio);
      state.audio.addEventListener("timeupdate", tickAudio);
      state.audio.addEventListener("ended", advanceAfterScene);
      await state.audio.play();
      el.voiceStatus.textContent = "Teacher voice";
    } catch {
      startSpeechFallback(scene);
    }
  }

  function startSpeechFallback(scene) {
    state.voiceMode = "fallback";
    state.fallbackDuration = fallbackDuration(scene.narration, scene.target);
    state.sceneStartedAt = performance.now();
    el.voiceStatus.textContent = "Browser voice fallback";
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scene.narration);
      utterance.rate = 1.04;
      utterance.pitch = 0.98;
      utterance.volume = 0.95;
      utterance.onend = advanceAfterScene;
      state.audio = utterance;
      speechSynthesis.speak(utterance);
    } else {
      state.fallbackTimer = window.setTimeout(advanceAfterScene, state.fallbackDuration * 1000);
    }
    tickFallback();
  }

  function tickAudio() {
    if (!state.audio || state.voiceMode !== "cloud") return;
    renderSceneFrame(state.audio.currentTime || 0, state.audio.duration || scenes[state.sceneIndex].target);
  }

  function tickFallback() {
    cancelAnimationFrame(state.raf);
    const loop = () => {
      if (!state.playing || state.voiceMode !== "fallback") return;
      if (!state.paused) {
        const elapsed = state.fallbackElapsedBeforePause + (performance.now() - state.sceneStartedAt) / 1000;
        renderSceneFrame(elapsed, state.fallbackDuration || scenes[state.sceneIndex].target);
      }
      state.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  function renderSceneFrame(seconds, duration) {
    const scene = scenes[state.sceneIndex];
    const safeDuration = Math.max(1, duration || scene.target);
    const phase = visualPhase(seconds, safeDuration, 8);
    const sceneProgress = Math.min(1, seconds / safeDuration);
    const totalElapsed = elapsedBeforeScene(state.sceneIndex) + Math.min(scene.target, seconds);
    el.sceneTitle.textContent = scene.title;
    el.sceneCounter.textContent = `Scene ${state.sceneIndex + 1} of ${scenes.length}`;
    el.caption.textContent = scene.caption;
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
    el.timeLabel.textContent = formatTime(totalElapsed);
    el.durationLabel.textContent = formatTime(totalTarget);
    el.progressBar.style.width = `${Math.round((totalElapsed / totalTarget) * 100)}%`;
    if (phase !== state.phase || seconds === 0) {
      state.phase = phase;
      el.stage.innerHTML = scene.render(phase, sceneProgress);
    }
  }

  function visualPhase(seconds, duration, count) {
    if (!state.playing) return count - 1;
    const progressPhase = Math.floor((seconds / Math.max(1, duration)) * count);
    const beatPhase = seconds < 2 ? 0 : Math.floor(seconds / Math.max(5, duration / count));
    return Math.max(0, Math.min(count - 1, Math.max(progressPhase, beatPhase)));
  }

  function advanceAfterScene() {
    if (!state.playing) return;
    if (state.sceneIndex < scenes.length - 1) {
      playScene(state.sceneIndex + 1);
      return;
    }
    finishLesson();
  }

  function finishLesson() {
    cleanupAudio();
    state.playing = false;
    el.start.textContent = "Replay lesson";
    el.start.classList.remove("playing");
    el.pause.textContent = "Pause";
    el.voiceStatus.textContent = "Lesson complete";
    el.stage.classList.add("is-static");
    renderSceneFrame(scenes[state.sceneIndex].target, scenes[state.sceneIndex].target);
  }

  function togglePause() {
    if (!state.playing) return;
    state.paused = !state.paused;
    if (state.voiceMode === "cloud" && state.audio) {
      if (state.paused) state.audio.pause();
      else state.audio.play();
    } else if (state.voiceMode === "fallback") {
      if (state.paused) {
        state.fallbackElapsedBeforePause += (performance.now() - state.sceneStartedAt) / 1000;
        if ("speechSynthesis" in window) speechSynthesis.pause();
      } else {
        state.sceneStartedAt = performance.now();
        if ("speechSynthesis" in window) speechSynthesis.resume();
      }
    }
    el.pause.textContent = state.paused ? "Resume" : "Pause";
    el.voiceStatus.textContent = state.paused ? "Paused" : (state.voiceMode === "cloud" ? "Teacher voice" : "Browser voice fallback");
  }

  function rewind15() {
    if (!state.playing) return;
    if (state.voiceMode === "cloud" && state.audio) {
      state.audio.currentTime = Math.max(0, state.audio.currentTime - 15);
      tickAudio();
      return;
    }
    state.fallbackElapsedBeforePause = Math.max(0, state.fallbackElapsedBeforePause - 15);
    state.sceneStartedAt = performance.now();
    renderSceneFrame(state.fallbackElapsedBeforePause, state.fallbackDuration || scenes[state.sceneIndex].target);
  }

  function stopLesson() {
    cleanupAudio();
    state.playing = false;
    state.paused = false;
    state.quizActive = false;
    el.start.textContent = "Start lesson";
    el.start.classList.remove("playing");
    el.pause.textContent = "Pause";
    el.voiceStatus.textContent = "Stopped";
    renderSceneList();
    renderWaiting();
  }

  function goToScene(index, shouldPlay) {
    cleanupAudio();
    state.playing = false;
    state.paused = false;
    state.quizActive = false;
    state.sceneIndex = index;
    state.phase = -1;
    el.start.textContent = "Start lesson";
    el.start.classList.remove("playing");
    el.pause.textContent = "Pause";
    renderSceneList();
    renderStaticScene(index);
    if (shouldPlay) playScene(index);
  }

  function renderStaticScene(index) {
    const scene = scenes[index];
    el.stage.classList.add("is-static");
    el.stage.classList.remove("is-waiting");
    el.sceneTitle.textContent = scene.title;
    el.sceneCounter.textContent = `Scene ${index + 1} of ${scenes.length}`;
    el.caption.textContent = scene.caption;
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
    el.stage.innerHTML = scene.render(7, 1);
  }

  function toggleCaptions() {
    state.captionsVisible = !state.captionsVisible;
    el.captionToggle.setAttribute("aria-pressed", String(state.captionsVisible));
    el.captionToggle.textContent = state.captionsVisible ? "CC on" : "CC off";
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
  }

  function handleStageClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    if (target.dataset.action === "start-quiz") {
      startQuiz();
    }
  }

  function startQuiz() {
    cleanupAudio();
    state.playing = false;
    state.quizActive = true;
    state.quizIndex = 0;
    state.quizScore = 0;
    el.voiceStatus.textContent = "Test mode";
    el.start.textContent = "Replay lesson";
    el.start.classList.remove("playing");
    renderQuiz();
  }

  function renderQuiz(selected = -1) {
    const q = questions[state.quizIndex];
    const answered = selected >= 0;
    el.stage.classList.add("is-static");
    el.sceneTitle.textContent = "10-question test";
    el.sceneCounter.textContent = `Question ${state.quizIndex + 1} of ${questions.length}`;
    el.caption.textContent = answered ? q.why : "Choose the best answer.";
    el.caption.classList.toggle("is-hidden", !state.captionsVisible);
    el.stage.innerHTML = board(`
      ${titleText("Chemistry Test")}
      ${quizCard(q, selected)}
      ${answered ? centerButton(state.quizIndex === questions.length - 1 ? "Finish test" : "Next question", "next-quiz", 380, 510) : ""}
    `);
    el.stage.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        const choice = Number(button.dataset.choice);
        if (choice === q.answer) state.quizScore += 1;
        renderQuiz(choice);
      });
    });
    const next = el.stage.querySelector("[data-action='next-quiz']");
    if (next) {
      next.addEventListener("click", () => {
        if (state.quizIndex < questions.length - 1) {
          state.quizIndex += 1;
          renderQuiz();
        } else {
          renderQuizResult();
        }
      });
    }
  }

  function renderQuizResult() {
    el.sceneCounter.textContent = "Test complete";
    el.caption.textContent = `Score: ${state.quizScore} out of ${questions.length}`;
    el.stage.innerHTML = board(`
      ${titleText("Result")}
      ${centerCard(`${state.quizScore}/10`, state.quizScore >= 8 ? "Strong result. Review any misses, then keep going." : "Good attempt. Replay the lesson and try again.", 315, 180, 330, 170)}
      ${centerButton("Replay lesson", "replay", 300, 420)}
      ${centerButton("Review from Scene 1", "review", 505, 420)}
    `);
    el.stage.querySelector("[data-action='replay']")?.addEventListener("click", () => playScene(0));
    el.stage.querySelector("[data-action='review']")?.addEventListener("click", () => goToScene(0, false));
  }

  function cleanupAudio() {
    cancelAnimationFrame(state.raf);
    window.clearTimeout(state.fallbackTimer);
    if (state.voiceMode === "cloud" && state.audio) {
      state.audio.pause();
      state.audio.removeAttribute("src");
      state.audio.load?.();
    }
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (state.audioUrl) URL.revokeObjectURL(state.audioUrl);
    state.audio = null;
    state.audioUrl = "";
    state.fallbackTimer = 0;
  }

  function canUseCloudVoice() {
    return location.protocol !== "file:" && !/^(127\.0\.0\.1|localhost)$/i.test(location.hostname);
  }

  function fallbackDuration(text, target) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(28, Math.min(target * 1.25, (words / FALLBACK_RATE_WPM) * 60));
  }

  function elapsedBeforeScene(index) {
    return scenes.slice(0, index).reduce((sum, scene) => sum + scene.target, 0);
  }

  function board(content) {
    return `<svg viewBox="${VIEW}" role="img" aria-label="Animated chemistry board">
      <rect width="960" height="600" fill="#1d2b26"/>
      <path d="M34 62h892M34 540h892" stroke="rgba(247,241,223,.12)" stroke-width="2"/>
      ${content}
    </svg>`;
  }

  function renderHiddenCode(phase) {
    return board(`
      ${titleText("Matter has a hidden code")}
      ${phase >= 1 ? deskObject("pencil", 112, 210, "#f0c35a") : ""}
      ${phase >= 1 ? deskObject("water", 264, 206, "#8ed6e5") : ""}
      ${phase >= 2 ? deskObject("spoon", 416, 206, "#c6cfca") : ""}
      ${phase >= 2 ? deskObject("salt", 568, 206, "#f7f1df") : ""}
      ${phase >= 3 ? deskObject("copper", 720, 206, "#c46b3d") : ""}
      ${phase >= 3 ? deskObject("air", 820, 215, "#9bd6e0") : ""}
      ${phase >= 4 ? lens(458, 338, 230) : ""}
      ${phase >= 5 ? particleField(160, 370, 640, 92, 42) : ""}
      ${phase >= 7 ? formulaStrip(["atoms", "elements", "molecules", "compounds", "mixtures"], 118, 502) : ""}
    `);
  }

  function renderMatter(phase) {
    return board(`
      ${titleText("What counts as matter?")}
      ${phase >= 1 ? questionPill("Has mass?", 170, 116) : ""}
      ${phase >= 1 ? questionPill("Takes up space?", 520, 116) : ""}
      ${phase >= 2 ? matterCard("water", "matter", 105, 228, "#8ed6e5") : ""}
      ${phase >= 3 ? matterCard("spoon", "matter", 310, 228, "#c6cfca") : ""}
      ${phase >= 4 ? matterCard("air", "matter", 515, 228, "#9bd6e0") : ""}
      ${phase >= 5 ? matterCard("light", "energy", 720, 228, "#f0c35a") : ""}
      ${phase >= 6 ? evidenceBanner("Air is not nothing. It is just sneaky.") : ""}
    `);
  }

  function renderAtoms(phase) {
    return board(`
      ${titleText("Atoms: too small to see")}
      ${phase >= 1 ? saltZoom(110, 165, phase) : ""}
      ${phase >= 3 ? arrow(415, 278, 515, 278) : ""}
      ${phase >= 4 ? particleCluster(610, 250, "tiny particles", "#f7f1df") : ""}
      ${phase >= 5 ? atomExample(175, 438, "Au", "gold atoms", "#f0c35a") : ""}
      ${phase >= 5 ? atomExample(395, 438, "C", "carbon atoms", "#75807b") : ""}
      ${phase >= 6 ? atomExample(615, 438, "O", "oxygen atoms", "#7bb8f0") : ""}
      ${phase >= 7 ? smallLabel(480, 548, "Model, not microscope view") : ""}
    `);
  }

  function renderElements(phase) {
    return board(`
      ${titleText("Elements: one type of atom")}
      ${phase >= 1 ? periodicGrid(145, 135) : ""}
      ${phase >= 3 ? elementTile("C", "carbon", 250, 162, "#59615e") : ""}
      ${phase >= 3 ? elementTile("O", "oxygen", 360, 162, "#7bb8f0") : ""}
      ${phase >= 4 ? elementTile("H", "hydrogen", 470, 162, "#cfeff2") : ""}
      ${phase >= 4 ? elementTile("Fe", "iron", 580, 162, "#b9c0bd") : ""}
      ${phase >= 5 ? elementTile("Cu", "copper", 690, 162, "#c46b3d") : ""}
      ${phase >= 5 ? elementTile("Au", "gold", 800, 162, "#f0c35a") : ""}
      ${phase >= 6 ? sortPair("element", "gold", "not element", "water", 260, 405) : ""}
      ${phase >= 7 ? evidenceBanner("One type of atom means element.") : ""}
    `);
  }

  function renderSymbols(phase) {
    const cards = [
      ["H", "hydrogen", "#cfeff2"],
      ["O", "oxygen", "#7bb8f0"],
      ["C", "carbon", "#75807b"],
      ["Fe", "ferrum", "#b9c0bd"],
      ["Cu", "cuprum", "#c46b3d"],
      ["Au", "aurum", "#f0c35a"]
    ];
    return board(`
      ${titleText("Symbols are shortcuts")}
      ${cards.map((card, index) => phase >= index + 1 ? symbolCard(card[0], card[1], card[2], 92 + index * 136, 190) : "").join("")}
      ${phase >= 6 ? centerCard("Fe", "one capital + one lowercase", 286, 392, 388, 92) : ""}
      ${phase >= 7 ? smallLabel(480, 534, "Symbols are code for atom types.") : ""}
    `);
  }

  function renderMolecules(phase) {
    return board(`
      ${titleText("Molecules: atoms joined")}
      ${phase >= 1 ? moleculePair("H", "H", 135, 230, "#cfeff2", "H2") : ""}
      ${phase >= 2 ? moleculePair("O", "O", 365, 230, "#7bb8f0", "O2") : ""}
      ${phase >= 3 ? waterMolecule(665, 240) : ""}
      ${phase >= 4 ? evidenceBanner("Molecule = atoms joined as one unit") : ""}
      ${phase >= 6 ? centerCard("Water is both", "molecule + compound", 310, 410, 340, 90) : ""}
      ${phase >= 7 ? smallLabel(480, 540, "The drawing is a model. Atoms do not have tiny hands.") : ""}
    `);
  }

  function renderCompounds(phase) {
    return board(`
      ${titleText("Compounds: new substances")}
      ${phase >= 1 ? gasJar(150, 175, "H2", "hydrogen") : ""}
      ${phase >= 2 ? gasJar(330, 175, "O2", "oxygen") : ""}
      ${phase >= 3 ? arrow(500, 270, 590, 270) : ""}
      ${phase >= 4 ? waterDrop(690, 220, "water") : ""}
      ${phase >= 5 ? compoundCards() : ""}
      ${phase >= 7 ? evidenceBanner("Different elements joined can make a new substance.") : ""}
    `);
  }

  function renderMixtures(phase) {
    return board(`
      ${titleText("Mixtures: together, not rebuilt")}
      ${phase >= 1 ? comparePanel("compound", "joined", 105, 155, true) : ""}
      ${phase >= 2 ? comparePanel("mixture", "together", 535, 155, false) : ""}
      ${phase >= 4 ? mixtureExamples() : ""}
      ${phase >= 6 ? evidenceBanner("Can we separate the parts by filtering, evaporating, or sorting?") : ""}
    `);
  }

  function renderDissolving(phase) {
    return board(`
      ${titleText("The salt did not vanish")}
      ${phase >= 1 ? beaker(170, 190, false) : ""}
      ${phase >= 2 ? saltCrystal(300, 142, 1.1) : ""}
      ${phase >= 3 ? beaker(170, 190, true) : ""}
      ${phase >= 4 ? particleCloud(480, 230, 250, 120, 46, "#f7f1df") : ""}
      ${phase >= 5 ? miniEvaporation() : ""}
      ${phase >= 7 ? evidenceBanner("Dissolved means spread out, not gone.") : ""}
    `);
  }

  function renderArrangement(phase) {
    return board(`
      ${titleText("Same element, different arrangement")}
      ${phase >= 1 ? carbonCard(450, 105) : ""}
      ${phase >= 2 ? graphitePanel(145, 240) : ""}
      ${phase >= 3 ? diamondPanel(575, 240) : ""}
      ${phase >= 5 ? evidenceBanner("Same carbon. Different structure. Different behaviour.") : ""}
    `);
  }

  function renderSorting(phase) {
    return board(`
      ${titleText("Fast sorting game")}
      ${phase >= 1 ? sortBins() : ""}
      ${phase >= 2 ? flyingCard("Gold", 92, 180, 0) : ""}
      ${phase >= 3 ? flyingCard("O2", 300, 180, 1) : ""}
      ${phase >= 4 ? flyingCard("H2O", 505, 180, 2) : ""}
      ${phase >= 5 ? flyingCard("Air", 710, 180, 3) : ""}
      ${phase >= 6 ? centerCard("Trick case", "O2 is a molecule and an element.", 278, 382, 404, 90) : ""}
      ${phase >= 7 ? smallLabel(480, 540, "Water is a compound molecule.") : ""}
    `);
  }

  function renderChemistMove(phase) {
    return board(`
      ${titleText("The Chemist Move")}
      ${phase >= 1 ? strategyLine(1, "What is it made of?", 170) : ""}
      ${phase >= 2 ? strategyLine(2, "Element, molecule, compound, or mixture?", 245) : ""}
      ${phase >= 3 ? strategyLine(3, "What evidence tells me?", 320) : ""}
      ${phase >= 4 ? strategyLine(4, "What model explains it?", 395) : ""}
      ${phase >= 6 ? centerButton("Start 10-question test", "start-quiz", 330, 500) : ""}
    `);
  }

  function titleText(text) {
    return `<text x="480" y="92" text-anchor="middle" fill="#f7f1df" font-size="34" font-weight="950">${escapeHtml(text)}</text>`;
  }

  function deskObject(type, x, y, color) {
    const shapes = {
      pencil: `<rect x="${x}" y="${y + 18}" width="112" height="18" rx="9" fill="${color}"/><path d="M${x + 112} ${y + 18}l28 9-28 9z" fill="#d7b37f"/><path d="M${x + 140} ${y + 27}l-12-4v8z" fill="#202020"/>`,
      water: `<path d="M${x + 48} ${y}c32 42 52 70 52 99 0 32-23 54-52 54s-52-22-52-54c0-29 20-57 52-99z" fill="${color}" opacity=".86"/><ellipse cx="${x + 49}" cy="${y + 103}" rx="38" ry="10" fill="#dff8fb" opacity=".35"/>`,
      spoon: `<ellipse cx="${x + 52}" cy="${y + 34}" rx="30" ry="42" fill="${color}"/><rect x="${x + 46}" y="${y + 66}" width="12" height="105" rx="6" fill="${color}"/>`,
      salt: `<path d="M${x + 52} ${y + 18}l48 28-8 55-54 16-42-35 14-54z" fill="${color}" opacity=".94" stroke="#d8d0be" stroke-width="3"/>`,
      copper: `<circle cx="${x + 45}" cy="${y + 55}" r="45" fill="${color}"/><text x="${x + 45}" y="${y + 65}" text-anchor="middle" fill="#fff5de" font-size="26" font-weight="950">Cu</text>`,
      air: `<path d="M${x} ${y + 58}c24-30 62-24 70 6 20-8 50 2 56 28 7 32-21 54-58 47H${x + 6}c-38 0-55-24-44-49 8-20 30-26 38-32z" fill="${color}" opacity=".22" stroke="${color}" stroke-width="4"/>`
    };
    return `<g class="pop-in">${shapes[type]}</g>`;
  }

  function particleField(x, y, w, h, count) {
    return `<g class="fade-in">${Array.from({ length: count }, (_, i) => {
      const px = x + ((i * 53) % w);
      const py = y + ((i * 31) % h);
      return `<circle cx="${px}" cy="${py}" r="${3 + (i % 3)}" fill="${i % 2 ? "#9bd6e0" : "#f0c35a"}" opacity=".78"/>`;
    }).join("")}</g>`;
  }

  function lens(x, y, r) {
    return `<g class="slide-in">
      <circle cx="${x}" cy="${y}" r="${r / 2}" fill="none" stroke="#f7f1df" stroke-width="7" opacity=".88"/>
      <path d="M${x + r / 3} ${y + r / 3}l86 86" stroke="#f7f1df" stroke-width="12" stroke-linecap="round"/>
    </g>`;
  }

  function formulaStrip(items, x, y) {
    return `<g class="slide-in">${items.map((item, i) => `
      <g transform="translate(${x + i * 146} ${y})">
        <rect width="128" height="48" rx="10" fill="#f7f1df"/>
        <text x="64" y="31" text-anchor="middle" fill="#17201d" font-size="17" font-weight="950">${escapeHtml(item)}</text>
      </g>`).join("")}</g>`;
  }

  function questionPill(text, x, y) {
    return `<g class="slide-in"><rect x="${x}" y="${y}" width="270" height="66" rx="14" fill="#f7f1df"/><text x="${x + 135}" y="${y + 41}" text-anchor="middle" fill="#17201d" font-size="24" font-weight="950">${escapeHtml(text)}</text></g>`;
  }

  function matterCard(type, label, x, y, color) {
    const icon = type === "water" ? waterDropPath(x + 82, y + 54, 38, color)
      : type === "spoon" ? `<ellipse cx="${x + 84}" cy="${y + 52}" rx="24" ry="34" fill="${color}"/><rect x="${x + 80}" y="${y + 82}" width="9" height="70" rx="5" fill="${color}"/>`
      : type === "air" ? `<ellipse cx="${x + 82}" cy="${y + 72}" rx="52" ry="38" fill="${color}" opacity=".2" stroke="${color}" stroke-width="4"/>`
      : `<path d="M${x + 38} ${y + 48}h95l38-22" stroke="${color}" stroke-width="8" stroke-linecap="round"/><path d="M${x + 130} ${y + 26}l38-12v24z" fill="${color}"/>`;
    return `<g class="pop-in">
      <rect x="${x}" y="${y}" width="170" height="178" rx="18" fill="rgba(247,241,223,.94)"/>
      ${icon}
      <text x="${x + 85}" y="${y + 146}" text-anchor="middle" fill="#1d2b26" font-size="22" font-weight="950">${escapeHtml(type)}</text>
      <text x="${x + 85}" y="${y + 170}" text-anchor="middle" fill="${label === "matter" ? "#206c5a" : "#a3543c"}" font-size="18" font-weight="950">${escapeHtml(label)}</text>
    </g>`;
  }

  function saltZoom(x, y, phase) {
    return `<g class="slide-in">
      ${saltCrystal(x, y, 1.3)}
      <path d="M${x + 130} ${y + 70}h86" stroke="#f7f1df" stroke-width="4" stroke-linecap="round"/>
      ${phase >= 2 ? saltCrystal(x + 235, y + 28, .78) : ""}
      ${phase >= 3 ? saltCrystal(x + 330, y + 48, .48) : ""}
      <text x="${x + 205}" y="${y + 160}" text-anchor="middle" fill="#f7f1df" font-size="17" font-weight="900">smaller... smaller...</text>
    </g>`;
  }

  function particleCluster(x, y, label, color) {
    return `<g class="fade-in">${atomCluster(x, y, 14, 26, color)}${smallLabel(x, y + 112, label)}</g>`;
  }

  function atomExample(x, y, symbol, label, color) {
    return `<g class="pop-in">
      <circle cx="${x}" cy="${y}" r="44" fill="${color}" stroke="#f7f1df" stroke-width="3"/>
      <text x="${x}" y="${y + 10}" text-anchor="middle" fill="#17201d" font-size="28" font-weight="950">${escapeHtml(symbol)}</text>
      <text x="${x}" y="${y + 76}" text-anchor="middle" fill="#f7f1df" font-size="17" font-weight="900">${escapeHtml(label)}</text>
    </g>`;
  }

  function periodicGrid(x, y) {
    return `<g class="fade-in">${Array.from({ length: 48 }, (_, i) => {
      const col = i % 12;
      const row = Math.floor(i / 12);
      return `<rect x="${x + col * 58}" y="${y + row * 58}" width="46" height="46" rx="7" fill="rgba(247,241,223,.18)" stroke="rgba(247,241,223,.25)"/>`;
    }).join("")}</g>`;
  }

  function elementTile(symbol, name, x, y, color) {
    return `<g class="pop-in">
      <rect x="${x}" y="${y}" width="76" height="90" rx="10" fill="${color}" stroke="#f7f1df" stroke-width="2"/>
      <text x="${x + 38}" y="${y + 45}" text-anchor="middle" fill="#17201d" font-size="27" font-weight="950">${escapeHtml(symbol)}</text>
      <text x="${x + 38}" y="${y + 72}" text-anchor="middle" fill="#17201d" font-size="13" font-weight="850">${escapeHtml(name)}</text>
    </g>`;
  }

  function sortPair(leftTitle, leftCopy, rightTitle, rightCopy, x, y) {
    return `<g class="slide-in">
      ${centerCard(leftTitle, leftCopy, x, y, 180, 86)}
      ${centerCard(rightTitle, rightCopy, x + 260, y, 180, 86)}
    </g>`;
  }

  function symbolCard(symbol, name, color, x, y) {
    return `<g class="pop-in">
      <rect x="${x}" y="${y}" width="106" height="142" rx="14" fill="#f7f1df"/>
      <circle cx="${x + 53}" cy="${y + 44}" r="27" fill="${color}"/>
      <text x="${x + 53}" y="${y + 55}" text-anchor="middle" fill="#17201d" font-size="31" font-weight="950">${escapeHtml(symbol)}</text>
      <text x="${x + 53}" y="${y + 105}" text-anchor="middle" fill="#17201d" font-size="15" font-weight="950">${escapeHtml(name)}</text>
    </g>`;
  }

  function moleculePair(a, b, x, y, color, label) {
    return `<g class="pop-in">
      <line x1="${x + 45}" y1="${y}" x2="${x + 105}" y2="${y}" stroke="#f7f1df" stroke-width="8" stroke-linecap="round"/>
      ${atomDisc(x + 42, y, a, color)}${atomDisc(x + 110, y, b, color)}
      <text x="${x + 76}" y="${y + 80}" text-anchor="middle" fill="#f7f1df" font-size="22" font-weight="950">${escapeHtml(label)}</text>
    </g>`;
  }

  function waterMolecule(x, y) {
    return `<g class="pop-in">
      <line x1="${x}" y1="${y}" x2="${x - 58}" y2="${y + 54}" stroke="#f7f1df" stroke-width="8" stroke-linecap="round"/>
      <line x1="${x}" y1="${y}" x2="${x + 58}" y2="${y + 54}" stroke="#f7f1df" stroke-width="8" stroke-linecap="round"/>
      ${atomDisc(x, y, "O", "#7bb8f0")}
      ${atomDisc(x - 66, y + 60, "H", "#cfeff2")}
      ${atomDisc(x + 66, y + 60, "H", "#cfeff2")}
      <text x="${x}" y="${y + 130}" text-anchor="middle" fill="#f7f1df" font-size="22" font-weight="950">H2O</text>
    </g>`;
  }

  function atomDisc(x, y, symbol, color) {
    return `<circle cx="${x}" cy="${y}" r="38" fill="${color}" stroke="#f7f1df" stroke-width="3"/><text x="${x}" y="${y + 10}" text-anchor="middle" fill="#17201d" font-size="24" font-weight="950">${escapeHtml(symbol)}</text>`;
  }

  function gasJar(x, y, formula, label) {
    return `<g class="pop-in">
      <rect x="${x}" y="${y}" width="135" height="168" rx="18" fill="rgba(247,241,223,.12)" stroke="#f7f1df" stroke-width="3"/>
      <path d="M${x + 32} ${y}v-28h70v28" fill="none" stroke="#f7f1df" stroke-width="3"/>
      ${atomCluster(x + 68, y + 80, 6, 18, formula.startsWith("H") ? "#cfeff2" : "#7bb8f0")}
      <text x="${x + 68}" y="${y + 136}" text-anchor="middle" fill="#f7f1df" font-size="24" font-weight="950">${escapeHtml(formula)}</text>
      <text x="${x + 68}" y="${y + 195}" text-anchor="middle" fill="#f7f1df" font-size="17" font-weight="900">${escapeHtml(label)}</text>
    </g>`;
  }

  function waterDrop(x, y, label) {
    return `<g class="pop-in">
      ${waterDropPath(x, y, 66, "#8ed6e5")}
      <text x="${x}" y="${y + 118}" text-anchor="middle" fill="#f7f1df" font-size="19" font-weight="950">${escapeHtml(label)}</text>
    </g>`;
  }

  function compoundCards() {
    return `<g class="slide-in">
      ${centerCard("H2O", "water", 148, 420, 180, 82)}
      ${centerCard("CO2", "carbon dioxide", 390, 420, 180, 82)}
      ${centerCard("NaCl", "table salt", 632, 420, 180, 82)}
    </g>`;
  }

  function comparePanel(title, label, x, y, joined) {
    return `<g class="slide-in">
      <rect x="${x}" y="${y}" width="320" height="230" rx="18" fill="rgba(247,241,223,.12)" stroke="#f7f1df" stroke-width="2"/>
      <text x="${x + 160}" y="${y + 45}" text-anchor="middle" fill="#f7f1df" font-size="26" font-weight="950">${escapeHtml(title)}</text>
      ${joined ? `${waterMolecule(x + 160, y + 120)}` : `${particleCloud(x + 65, y + 94, 190, 80, 18, "#f0c35a")}${particleCloud(x + 70, y + 92, 180, 72, 16, "#7bb8f0")}`}
      <text x="${x + 160}" y="${y + 207}" text-anchor="middle" fill="#f0c35a" font-size="20" font-weight="950">${escapeHtml(label)}</text>
    </g>`;
  }

  function mixtureExamples() {
    return `<g class="slide-in">
      ${centerCard("air", "mixed gases", 110, 430, 190, 74)}
      ${centerCard("salt water", "solution", 385, 430, 190, 74)}
      ${centerCard("cereal + milk", "breakfast mixture", 660, 430, 190, 74)}
    </g>`;
  }

  function beaker(x, y, withParticles) {
    return `<g class="slide-in">
      <path d="M${x} ${y}h190l-28 280H${x + 28}z" fill="rgba(142,214,229,.18)" stroke="#f7f1df" stroke-width="4"/>
      <path d="M${x + 24} ${y + 170}h142l-10 84H${x + 34}z" fill="#8ed6e5" opacity=".42"/>
      ${withParticles ? particleCloud(x + 48, y + 190, 96, 48, 28, "#f7f1df") : ""}
    </g>`;
  }

  function miniEvaporation() {
    return `<g class="slide-in">
      <path d="M646 354c-26-22-16-52 18-76M710 354c-28-24-14-54 18-78" fill="none" stroke="#9bd6e0" stroke-width="5" stroke-linecap="round"/>
      <text x="690" y="430" text-anchor="middle" fill="#f7f1df" font-size="20" font-weight="950">evaporate water</text>
      <text x="690" y="462" text-anchor="middle" fill="#f0c35a" font-size="20" font-weight="950">salt remains</text>
    </g>`;
  }

  function carbonCard(x, y) {
    return `<g class="pop-in">
      <rect x="${x - 52}" y="${y}" width="104" height="118" rx="14" fill="#f7f1df"/>
      <circle cx="${x}" cy="${y + 45}" r="30" fill="#59615e"/>
      <text x="${x}" y="${y + 56}" text-anchor="middle" fill="#fff" font-size="30" font-weight="950">C</text>
      <text x="${x}" y="${y + 94}" text-anchor="middle" fill="#17201d" font-size="17" font-weight="950">carbon</text>
    </g>`;
  }

  function graphitePanel(x, y) {
    return `<g class="slide-in">
      <rect x="${x}" y="${y}" width="270" height="210" rx="18" fill="rgba(247,241,223,.12)" stroke="#f7f1df" stroke-width="2"/>
      <text x="${x + 135}" y="${y + 42}" text-anchor="middle" fill="#f7f1df" font-size="24" font-weight="950">graphite</text>
      ${Array.from({ length: 20 }, (_, i) => `<circle cx="${x + 62 + (i % 5) * 36}" cy="${y + 78 + Math.floor(i / 5) * 25}" r="9" fill="#8b9690"/>`).join("")}
      <path d="M${x + 70} ${y + 174}l118 0" stroke="#f0c35a" stroke-width="8" stroke-linecap="round"/>
      <text x="${x + 135}" y="${y + 198}" text-anchor="middle" fill="#f0c35a" font-size="18" font-weight="950">soft layers</text>
    </g>`;
  }

  function diamondPanel(x, y) {
    return `<g class="slide-in">
      <rect x="${x}" y="${y}" width="270" height="210" rx="18" fill="rgba(247,241,223,.12)" stroke="#f7f1df" stroke-width="2"/>
      <text x="${x + 135}" y="${y + 42}" text-anchor="middle" fill="#f7f1df" font-size="24" font-weight="950">diamond</text>
      <path d="M${x + 62} ${y + 138}l72-72 72 72-72 46z" fill="none" stroke="#9bd6e0" stroke-width="5"/>
      <path d="M${x + 62} ${y + 138}h144M${x + 134} ${y + 66}v118M${x + 94} ${y + 106}l80 78M${x + 174} ${y + 106}l-80 78" stroke="#9bd6e0" stroke-width="3" opacity=".9"/>
      <text x="${x + 135}" y="${y + 198}" text-anchor="middle" fill="#f0c35a" font-size="18" font-weight="950">strong network</text>
    </g>`;
  }

  function sortBins() {
    const bins = ["element", "molecule", "compound", "mixture"];
    return `<g class="fade-in">${bins.map((bin, i) => `
      <g transform="translate(${78 + i * 218} 328)">
        <rect width="182" height="122" rx="14" fill="rgba(247,241,223,.12)" stroke="#f7f1df" stroke-width="2"/>
        <text x="91" y="76" text-anchor="middle" fill="#f7f1df" font-size="20" font-weight="950">${bin}</text>
      </g>`).join("")}</g>`;
  }

  function flyingCard(text, x, y, bin) {
    return `<g class="pop-in">
      <rect x="${x}" y="${y}" width="140" height="70" rx="12" fill="#f7f1df"/>
      <text x="${x + 70}" y="${y + 44}" text-anchor="middle" fill="#17201d" font-size="24" font-weight="950">${escapeHtml(text)}</text>
      <path d="M${x + 70} ${y + 74}C${x + 70} ${y + 125}, ${170 + bin * 218} 300, ${170 + bin * 218} 328" fill="none" stroke="#f0c35a" stroke-width="4" stroke-dasharray="7 9"/>
    </g>`;
  }

  function strategyLine(number, text, y) {
    return `<g class="slide-in">
      <circle cx="190" cy="${y}" r="28" fill="#f0c35a"/>
      <text x="190" y="${y + 9}" text-anchor="middle" fill="#17201d" font-size="24" font-weight="950">${number}</text>
      <rect x="240" y="${y - 31}" width="540" height="62" rx="12" fill="#f7f1df"/>
      <text x="510" y="${y + 8}" text-anchor="middle" fill="#17201d" font-size="23" font-weight="950">${escapeHtml(text)}</text>
    </g>`;
  }

  function centerButton(text, action, x, y) {
    return `<g class="pop-in" data-action="${escapeAttr(action)}" tabindex="0" role="button" aria-label="${escapeAttr(text)}">
      <rect x="${x}" y="${y}" width="300" height="64" rx="10" fill="#f0c35a"/>
      <text x="${x + 150}" y="${y + 40}" text-anchor="middle" fill="#17201d" font-size="21" font-weight="950">${escapeHtml(text)}</text>
    </g>`;
  }

  function quizCard(q, selected) {
    const status = selected < 0 ? "" : selected === q.answer ? "Correct" : "Not quite";
    return `<g class="slide-in">
      <rect x="80" y="108" width="800" height="420" rx="18" fill="rgba(247,241,223,.95)"/>
      <text x="480" y="166" text-anchor="middle" fill="#17201d" font-size="32" font-weight="950">${escapeHtml(q.q)}</text>
      ${q.choices.map((choice, i) => {
        const isSelected = selected === i;
        const fill = isSelected ? (i === q.answer ? "#dff1e8" : "#f3d9cf") : "#fffaf0";
        return `<g data-choice="${i}" role="button" tabindex="0">
          <rect x="132" y="${212 + i * 64}" width="696" height="50" rx="10" fill="${fill}" stroke="#d9cdbb"/>
          <text x="164" y="${244 + i * 64}" fill="#17201d" font-size="24" font-weight="850">${escapeHtml(choice)}</text>
        </g>`;
      }).join("")}
      ${selected >= 0 ? `<text x="480" y="488" text-anchor="middle" fill="${selected === q.answer ? "#206c5a" : "#a3543c"}" font-size="26" font-weight="950">${status}. ${escapeHtml(q.why)}</text>` : ""}
    </g>`;
  }

  function centerCard(title, copy, x, y, w, h) {
    const titleLines = wrapSvgText(title, Math.max(12, Math.floor(w / 15)), 2);
    const copyLines = wrapSvgText(copy, Math.max(18, Math.floor(w / 9)), 2);
    const titleStart = y + (titleLines.length > 1 ? h * 0.31 : h * 0.4);
    const copyStart = y + h * 0.63;
    return `<g class="slide-in">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#f7f1df"/>
      ${titleLines.map((line, i) => `<text x="${x + w / 2}" y="${titleStart + i * 31}" text-anchor="middle" fill="#17201d" font-size="${Math.min(30, w / 11)}" font-weight="950">${escapeHtml(line)}</text>`).join("")}
      ${copyLines.map((line, i) => `<text x="${x + w / 2}" y="${copyStart + i * 23}" text-anchor="middle" fill="#47524d" font-size="17" font-weight="850">${escapeHtml(line)}</text>`).join("")}
    </g>`;
  }

  function evidenceBanner(text) {
    return `<g class="slide-in">
      <rect x="170" y="512" width="620" height="58" rx="12" fill="#f0c35a"/>
      <text x="480" y="548" text-anchor="middle" fill="#17201d" font-size="20" font-weight="950">${escapeHtml(text)}</text>
    </g>`;
  }

  function smallLabel(x, y, text) {
    return `<text x="${x}" y="${y}" text-anchor="middle" fill="#f7f1df" font-size="18" font-weight="900">${escapeHtml(text)}</text>`;
  }

  function arrow(x1, y1, x2, y2) {
    return `<g class="draw"><path pathLength="1" d="M${x1} ${y1}H${x2}" stroke="#f0c35a" stroke-width="7" stroke-linecap="round"/><path d="M${x2} ${y2}l-18-12v24z" fill="#f0c35a"/></g>`;
  }

  function saltCrystal(x, y, scale = 1) {
    return `<g transform="translate(${x} ${y}) scale(${scale})" class="pop-in"><path d="M55 0l55 33-11 64-62 19-48-42 16-58z" fill="#f7f1df" stroke="#d8d0be" stroke-width="3"/></g>`;
  }

  function atomCluster(x, y, count, radius, color) {
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count;
      const px = x + Math.cos(angle) * radius * (1 + (i % 3) * 0.25);
      const py = y + Math.sin(angle) * radius * (1 + (i % 2) * 0.22);
      return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${8 + (i % 3)}" fill="${color}" opacity=".9"/>`;
    }).join("");
  }

  function particleCloud(x, y, w, h, count, color) {
    return Array.from({ length: count }, (_, i) => {
      const px = x + ((i * 47) % w);
      const py = y + ((i * 29) % h);
      return `<circle cx="${px}" cy="${py}" r="${3 + (i % 3)}" fill="${color}" opacity=".82"/>`;
    }).join("");
  }

  function waterDropPath(x, y, r, color) {
    return `<path d="M${x} ${y - r}c${r * .72} ${r * .92} ${r} ${r * 1.45} ${r} ${r * 1.9}c0 ${r * .78}-${r * .58} ${r * 1.28}-${r} ${r * 1.28}s-${r}-${r * .5}-${r}-${r * 1.28}c0-${r * .45} ${r * .28}-${r} ${r}-${r * 1.9}z" fill="${color}" opacity=".9"/>`;
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
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/'/g, "&#39;");
  }

  function wrapSvgText(text, maxChars, maxLines) {
    const words = String(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";
    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (next.length > maxChars && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });
    if (current) lines.push(current);
    if (lines.length <= maxLines) return lines;
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.。]+$/, "")}...`;
    return kept;
  }
})();
