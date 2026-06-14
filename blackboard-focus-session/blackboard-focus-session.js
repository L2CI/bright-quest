(() => {
  const storageKey = "brightQuestProfilesV2";
  const data = window.BrightQuestData || { levels: [], lessons: {} };
  const finalTest = window.BrightQuestFinalTest;
  const internationalTests = window.BrightQuestInternationalTests || [];
  const allTests = [...(data.levels || []), ...(finalTest ? [finalTest] : []), ...internationalTests];

  const el = {
    canvas: document.querySelector("#chalkboard"),
    caption: document.querySelector("#teacherCaption"),
    studentPill: document.querySelector("#studentPill"),
    moduleList: document.querySelector("#moduleList"),
    evidenceList: document.querySelector("#evidenceList"),
    memoryList: document.querySelector("#memoryList"),
    planTitle: document.querySelector("#planTitle"),
    planSummary: document.querySelector("#planSummary"),
    start: document.querySelector("#startLessonButton"),
    slower: document.querySelector("#slowerButton"),
    repeat: document.querySelector("#repeatButton"),
    next: document.querySelector("#nextStepButton"),
    voice: document.querySelector("#voiceToggle"),
    form: document.querySelector("#questionForm"),
    question: document.querySelector("#studentQuestion"),
    back: document.querySelector("#backButton")
  };

  const ctx = el.canvas.getContext("2d");
  const lessonState = {
    profile: null,
    plan: null,
    moduleIndex: 0,
    stepIndex: 0,
    playing: false,
    speed: 1,
    memory: ["Current objective: find one clear pattern, then practise it."],
    interruptedFrom: null,
    lastStep: null
  };

  init();

  async function init() {
    el.back.addEventListener("click", () => { window.location.href = "../"; });
    el.start.addEventListener("click", startTeaching);
    el.slower.addEventListener("click", () => {
      lessonState.speed = lessonState.speed === 1 ? 0.62 : 1;
      teach(lessonState.speed === 1 ? "Back to normal teaching speed." : "Slowing down. I will use smaller steps.");
    });
    el.repeat.addEventListener("click", () => replayStep());
    el.next.addEventListener("click", () => playNextStep());
    el.form.addEventListener("submit", handleQuestion);
    document.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        el.question.value = button.dataset.question;
        el.form.requestSubmit();
      });
    });

    fitCanvas();
    window.addEventListener("resize", fitCanvas);
    lessonState.profile = await loadProfile();
    lessonState.plan = buildPlan(lessonState.profile);
    renderPlan();
    clearBoard();
    drawWelcomeBoard();
  }

  function fitCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const rect = el.canvas.getBoundingClientRect();
    el.canvas.width = Math.max(320, Math.floor(rect.width * ratio));
    el.canvas.height = Math.max(320, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (lessonState.lastStep) renderStaticStep(lessonState.lastStep);
    else {
      clearBoard();
      drawWelcomeBoard();
    }
  }

  async function loadProfile() {
    const local = safeJson(localStorage.getItem(storageKey), {});
    const activeId = localStorage.getItem("brightQuestActiveProfile");
    let profile = activeId ? local[activeId] : Object.values(local)[0];

    const canUseCloudProfiles = !["127.0.0.1", "localhost", ""].includes(window.location.hostname);
    try {
      if (!canUseCloudProfiles) return normalizeProfile(profile);
      const response = await fetch("/api/profiles", { headers: { accept: "application/json" } });
      if (response.ok) {
        const body = await response.json();
        const remoteProfiles = (body.profiles || []).map((item) => item.payload).filter(Boolean);
        const activeRemote = activeId ? remoteProfiles.find((item) => item.id === activeId) : null;
        profile = activeRemote || remoteProfiles[0] || profile;
      }
    } catch {
      // Local preview has no Cloudflare API. Local storage is enough for QA.
    }

    return normalizeProfile(profile);
  }

  function normalizeProfile(profile) {
    const fallback = { id: "aarin", name: "Aarin", stars: 0, attempts: [], trainingCompleted: {}, writingSamples: [] };
    return {
      ...fallback,
      ...(profile || {}),
      attempts: Array.isArray(profile?.attempts) ? profile.attempts : [],
      trainingCompleted: profile?.trainingCompleted || {},
      writingSamples: Array.isArray(profile?.writingSamples) ? profile.writingSamples : []
    };
  }

  function buildPlan(profile) {
    const attempts = profile.attempts || [];
    const questionStats = attempts.flatMap((attempt) =>
      (attempt.questionStats || []).map((question) => ({ ...question, attempt }))
    );
    const wrong = questionStats.filter((question) => question.correct === false);
    const slow = questionStats
      .filter((question) => question.format !== "writing")
      .sort((a, b) => (b.secondsSpent || 0) - (a.secondsSpent || 0))
      .slice(0, 10);
    const skillScores = {};
    [...wrong, ...slow].forEach((question) => {
      const key = question.skill || "Careful reasoning";
      skillScores[key] ||= { skill: key, section: question.section || "Mixed", wrong: 0, slow: 0, seconds: 0, examples: [] };
      if (question.correct === false) skillScores[key].wrong += 1;
      if ((question.secondsSpent || 0) >= 45) skillScores[key].slow += 1;
      skillScores[key].seconds += question.secondsSpent || 0;
      if (skillScores[key].examples.length < 2) skillScores[key].examples.push(question);
    });

    const ranked = Object.values(skillScores)
      .sort((a, b) => (b.wrong * 4 + b.slow * 2 + b.seconds / 45) - (a.wrong * 4 + a.slow * 2 + a.seconds / 45));

    const seedSkills = ranked.length ? ranked : [
      { skill: "Multi-step word problem", section: "Maths", wrong: 0, slow: 0, seconds: 0, examples: [] },
      { skill: "Inference", section: "English", wrong: 0, slow: 0, seconds: 0, examples: [] },
      { skill: "Number sequences", section: "Reasoning", wrong: 0, slow: 0, seconds: 0, examples: [] }
    ];

    const modules = seedSkills.slice(0, 4).map((item, index) => makeModule(item, index, attempts.length));
    return {
      attempts,
      wrongCount: wrong.length,
      slowCount: slow.filter((item) => (item.secondsSpent || 0) >= 45).length,
      modules,
      evidence: buildEvidence(profile, attempts, wrong, slow, modules)
    };
  }

  function makeModule(item, index, attemptCount) {
    const adjacent = adjacentSkills(item.skill);
    const example = item.examples?.[0];
    const title = item.skill;
    const childReason = item.wrong
      ? `This appeared in ${item.wrong} missed answer${item.wrong === 1 ? "" : "s"}.`
      : item.slow
        ? "This looks slow, so we will make the thinking path shorter."
        : attemptCount
          ? "This is a useful next stretch from the latest work."
          : "This is a gentle starting skill.";

    return {
      title,
      section: item.section,
      childReason,
      adjacent,
      example,
      objective: moduleObjective(title),
      steps: buildTeachingSteps(title, item.section, example, adjacent, index)
    };
  }

  function buildEvidence(profile, attempts, wrong, slow, modules) {
    const latest = attempts.at(-1);
    const rows = [
      `${profile.name || "Aarin"} has ${attempts.length} saved test attempt${attempts.length === 1 ? "" : "s"}.`,
      latest ? `Latest result: ${latest.levelName || latest.level} at ${latest.percent}%.` : "No saved attempt yet, so this starts with foundation lessons.",
      wrong.length ? `${wrong.length} missed question${wrong.length === 1 ? "" : "s"} found across saved results.` : "No missed answers found in the current saved profile.",
      slow.length ? `Slowest recent skills are included so speed improves gently.` : "No timing records found yet."
    ];
    if (modules[0]) rows.push(`First focus: ${modules[0].title}.`);
    return rows;
  }

  function moduleObjective(skill) {
    const lower = skill.toLowerCase();
    if (lower.includes("fraction")) return "See the equal parts before choosing the answer.";
    if (lower.includes("time")) return "Use jumps to the next hour instead of counting one minute at a time.";
    if (lower.includes("money")) return "Add the cost first, then find the change.";
    if (lower.includes("inference")) return "Join a text clue with a sensible thought.";
    if (lower.includes("analogy")) return "Say the relationship out loud before looking at options.";
    if (lower.includes("pattern") || lower.includes("sequence")) return "Compare neighbours and name the rule.";
    if (lower.includes("grammar")) return "Find the subject, then make the verb match.";
    if (lower.includes("multi")) return "Split one big story into two tiny sums.";
    return "Find the clue, name the move, then answer calmly.";
  }

  function adjacentSkills(skill) {
    const lower = String(skill).toLowerCase();
    if (lower.includes("fraction")) return ["Division as sharing", "Equal parts", "Simplifying"];
    if (lower.includes("time")) return ["Addition", "Number line jumps", "Elapsed time"];
    if (lower.includes("money")) return ["Decimals", "Subtraction", "Change"];
    if (lower.includes("inference")) return ["Reading proof", "Vocabulary", "Main idea"];
    if (lower.includes("analogy")) return ["Word groups", "Functions", "Odd one out"];
    if (lower.includes("pattern") || lower.includes("sequence")) return ["Skip counting", "Difference", "Missing number"];
    if (lower.includes("grammar")) return ["Subject", "Verb", "Tense"];
    return ["Careful reading", "Working memory", "Checking"];
  }

  function buildTeachingSteps(skill, section, example, adjacent, index) {
    const prompt = example?.prompt ? shorten(example.prompt, 110) : samplePromptFor(skill);
    return [
      {
        say: `Let's work on ${skill}. This is a short focus session, so we will learn one move really well.`,
        commands: [
          { type: "text", x: 54, y: 72, text: `Focus: ${skill}`, size: 34 },
          { type: "text", x: 58, y: 118, text: `Goal: ${moduleObjective(skill)}`, size: 20 },
          { type: "box", x: 52, y: 150, w: 370, h: 92 },
          { type: "text", x: 76, y: 188, text: "One clear move", size: 24 },
          { type: "arrow", x1: 424, y1: 195, x2: 560, y2: 195 },
          { type: "circle", x: 645, y: 196, r: 62 },
          { type: "text", x: 602, y: 204, text: "calm answer", size: 18 }
        ]
      },
      {
        say: `Here is the kind of question that caused effort. We will not rush it. First, we find what the question is really asking.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 54, y: 72, text: "Question type", size: 32 },
          { type: "box", x: 58, y: 116, w: 840, h: 116 },
          { type: "text", x: 80, y: 158, text: prompt, size: 21, max: 760 },
          { type: "highlight", x: 78, y: 181, w: 280, h: 20 },
          { type: "text", x: 78, y: 292, text: "Ask: what is the job?", size: 26 },
          { type: "arrow", x1: 360, y1: 284, x2: 540, y2: 235 },
          { type: "text", x: 588, y: 292, text: section || "Mixed skill", size: 24 }
        ]
      },
      {
        say: `Now I draw the thinking path. A good test answer is usually not magic. It is a small chain of steps.`,
        commands: thinkingCommands(skill)
      },
      {
        say: `This skill sits next to ${adjacent[0]} and ${adjacent[1]}. When those are stronger, this question type gets easier too.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 54, y: 72, text: "Adjacent learning", size: 32 },
          { type: "circle", x: 234, y: 260, r: 86 },
          { type: "text", x: 180, y: 268, text: skill, size: 18, max: 120 },
          { type: "circle", x: 530, y: 170, r: 72 },
          { type: "text", x: 485, y: 176, text: adjacent[0], size: 18, max: 110 },
          { type: "circle", x: 594, y: 392, r: 72 },
          { type: "text", x: 550, y: 398, text: adjacent[1], size: 18, max: 110 },
          { type: "arrow", x1: 318, y1: 238, x2: 458, y2: 184 },
          { type: "arrow", x1: 318, y1: 294, x2: 520, y2: 372 },
          { type: "text", x: 745, y: 284, text: "Practise the neighbours, not only the final question.", size: 22, max: 330 }
        ]
      },
      {
        say: `Check point. Before we move on, can you say the move in your own words? If not, ask me. That is exactly what this classroom is for.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 54, y: 72, text: "Check understanding", size: 32 },
          { type: "box", x: 72, y: 140, w: 460, h: 92 },
          { type: "text", x: 96, y: 178, text: "1. What is the question asking?", size: 22 },
          { type: "box", x: 72, y: 262, w: 460, h: 92 },
          { type: "text", x: 96, y: 300, text: "2. What is the one clear move?", size: 22 },
          { type: "box", x: 72, y: 384, w: 460, h: 92 },
          { type: "text", x: 96, y: 422, text: "3. How will I check?", size: 22 },
          { type: "text", x: 636, y: 252, text: index < 2 ? "Then we continue." : "Then we finish strong.", size: 30 }
        ]
      }
    ];
  }

  function thinkingCommands(skill) {
    const lower = String(skill).toLowerCase();
    if (lower.includes("fraction")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Fractions: equal parts", size: 32 },
        { type: "box", x: 94, y: 162, w: 300, h: 180 }, { type: "line", x1: 194, y1: 162, x2: 194, y2: 342 }, { type: "line", x1: 294, y1: 162, x2: 294, y2: 342 },
        { type: "highlight", x: 96, y: 164, w: 98, h: 176 }, { type: "text", x: 108, y: 388, text: "1 out of 3 equal parts", size: 24 },
        { type: "arrow", x1: 430, y1: 252, x2: 600, y2: 252 }, { type: "text", x: 650, y: 260, text: "top counts chosen", size: 22 }, { type: "text", x: 650, y: 310, text: "bottom counts total", size: 22 }
      ];
    }
    if (lower.includes("time")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Time: jump in chunks", size: 32 },
        { type: "line", x1: 100, y1: 260, x2: 860, y2: 260 }, { type: "text", x: 90, y: 300, text: "9:35", size: 24 }, { type: "text", x: 386, y: 300, text: "10:00", size: 24 }, { type: "text", x: 720, y: 300, text: "10:20", size: 24 },
        { type: "arrow", x1: 150, y1: 230, x2: 420, y2: 230 }, { type: "text", x: 245, y: 205, text: "+25", size: 22 },
        { type: "arrow", x1: 466, y1: 230, x2: 746, y2: 230 }, { type: "text", x: 574, y: 205, text: "+20", size: 22 }
      ];
    }
    if (lower.includes("inference")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Inference = clue + thinking", size: 32 },
        { type: "box", x: 86, y: 160, w: 300, h: 120 }, { type: "text", x: 120, y: 222, text: "Text clue", size: 28 },
        { type: "arrow", x1: 390, y1: 220, x2: 510, y2: 220 }, { type: "box", x: 520, y: 160, w: 300, h: 120 }, { type: "text", x: 556, y: 222, text: "Sensible idea", size: 28 },
        { type: "arrow", x1: 670, y1: 284, x2: 670, y2: 388 }, { type: "circle", x: 670, y: 462, r: 74 }, { type: "text", x: 632, y: 468, text: "answer", size: 24 }
      ];
    }
    return [
      { type: "erase" }, { type: "text", x: 54, y: 72, text: "The thinking path", size: 32 },
      { type: "box", x: 84, y: 168, w: 220, h: 90 }, { type: "text", x: 116, y: 222, text: "Find clue", size: 24 },
      { type: "arrow", x1: 310, y1: 212, x2: 440, y2: 212 },
      { type: "box", x: 448, y: 168, w: 220, h: 90 }, { type: "text", x: 482, y: 222, text: "Name move", size: 24 },
      { type: "arrow", x1: 674, y1: 212, x2: 804, y2: 212 },
      { type: "box", x: 812, y: 168, w: 220, h: 90 }, { type: "text", x: 858, y: 222, text: "Answer", size: 24 },
      { type: "text", x: 102, y: 372, text: "Slow is fine while learning. Smooth comes after the pattern is clear.", size: 24, max: 820 }
    ];
  }

  function samplePromptFor(skill) {
    const match = allTests.flatMap((test) => test.questions || []).find((question) => question.skill === skill);
    return match?.prompt || "A question asks you to choose the best answer. What is the hidden move?";
  }

  function renderPlan() {
    const profile = lessonState.profile;
    const plan = lessonState.plan;
    el.studentPill.textContent = `${profile.name || "Aarin"} / ${plan.attempts.length} saved test${plan.attempts.length === 1 ? "" : "s"}`;
    el.planTitle.textContent = plan.modules[0]?.title || "Focus lesson";
    el.planSummary.textContent = plan.modules[0]?.childReason || "A short classroom lesson is ready.";
    el.moduleList.innerHTML = plan.modules.map((module, index) => `
      <button class="module-button ${index === lessonState.moduleIndex ? "active" : ""}" type="button" data-module="${index}">
        <strong>${escapeHtml(module.title)}</strong>
        <span>${escapeHtml(module.objective)}</span>
      </button>
    `).join("");
    el.evidenceList.innerHTML = `<ul>${plan.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    renderMemory();
    el.moduleList.querySelectorAll("[data-module]").forEach((button) => {
      button.addEventListener("click", () => selectModule(Number(button.dataset.module)));
    });
  }

  function selectModule(index) {
    lessonState.moduleIndex = index;
    lessonState.stepIndex = 0;
    lessonState.lastStep = null;
    renderPlan();
    clearBoard();
    drawWelcomeBoard();
    teach(`Ready for ${lessonState.plan.modules[index].title}. Press start teaching.`);
  }

  function startTeaching() {
    lessonState.playing = true;
    playCurrentStep();
  }

  function playCurrentStep() {
    const step = currentStep();
    if (!step) return;
    lessonState.lastStep = step;
    clearBoard();
    animateCommands(step.commands || []);
    teach(step.say);
  }

  function playNextStep() {
    const module = currentModule();
    if (!module) return;
    if (lessonState.stepIndex < module.steps.length - 1) {
      lessonState.stepIndex += 1;
    } else if (lessonState.moduleIndex < lessonState.plan.modules.length - 1) {
      lessonState.moduleIndex += 1;
      lessonState.stepIndex = 0;
      renderPlan();
    } else {
      teach("That is today's focused classroom session. Stop here while it still feels clear.");
      lessonState.memory.push("Completed today's short blackboard session.");
      renderMemory();
      return;
    }
    playCurrentStep();
  }

  function replayStep() {
    const step = currentStep();
    if (!step) return;
    teach("Of course. I will draw that step again.");
    setTimeout(() => playCurrentStep(), 500);
  }

  function currentModule() {
    return lessonState.plan?.modules?.[lessonState.moduleIndex];
  }

  function currentStep() {
    return currentModule()?.steps?.[lessonState.stepIndex];
  }

  function handleQuestion(event) {
    event.preventDefault();
    const question = el.question.value.trim();
    if (!question) return;
    const savedPosition = { moduleIndex: lessonState.moduleIndex, stepIndex: lessonState.stepIndex };
    lessonState.interruptedFrom = savedPosition;
    lessonState.memory.push(`Open question: ${question}`);
    renderMemory();
    const answer = localTeacherAnswer(question, currentModule());
    animateCommands(answer.commands);
    teach(answer.say, () => {
      lessonState.moduleIndex = savedPosition.moduleIndex;
      lessonState.stepIndex = savedPosition.stepIndex;
      lessonState.memory.push(`Returned to ${currentModule()?.title || "the lesson"}.`);
      renderMemory();
    });
    el.question.value = "";
  }

  function localTeacherAnswer(question, module) {
    const lower = question.toLowerCase();
    if (lower.includes("example")) {
      return {
        say: `Let's use a tiny example. Suppose the skill is ${module?.title || "this idea"}. I draw one clue, one move, and one answer. That is the whole path.`,
        commands: [
          { type: "erase" }, { type: "text", x: 54, y: 72, text: "Quick example", size: 34 },
          { type: "box", x: 90, y: 160, w: 220, h: 90 }, { type: "text", x: 138, y: 214, text: "clue", size: 28 },
          { type: "arrow", x1: 316, y1: 205, x2: 450, y2: 205 },
          { type: "box", x: 458, y: 160, w: 220, h: 90 }, { type: "text", x: 510, y: 214, text: "move", size: 28 },
          { type: "arrow", x1: 684, y1: 205, x2: 818, y2: 205 },
          { type: "box", x: 826, y: 160, w: 220, h: 90 }, { type: "text", x: 872, y: 214, text: "answer", size: 28 }
        ]
      };
    }
    if (lower.includes("why")) {
      return {
        say: `It matters because tests often repeat the same thinking move with different decorations. If you recognise the move, the question feels less scary.`,
        commands: [
          { type: "erase" }, { type: "text", x: 54, y: 72, text: "Why it matters", size: 34 },
          { type: "circle", x: 220, y: 242, r: 76 }, { type: "text", x: 178, y: 248, text: "new story", size: 20 },
          { type: "circle", x: 528, y: 242, r: 76 }, { type: "text", x: 488, y: 248, text: "same move", size: 20 },
          { type: "circle", x: 836, y: 242, r: 76 }, { type: "text", x: 790, y: 248, text: "calmer", size: 22 },
          { type: "arrow", x1: 296, y1: 242, x2: 452, y2: 242 }, { type: "arrow", x1: 604, y1: 242, x2: 760, y2: 242 }
        ]
      };
    }
    return {
      say: `Yes. Put simply: ${stripTrailingPunctuation(module?.objective || "find the clue, name the move, then answer")}. We are not trying to be clever fast. We are trying to be clear first.`,
      commands: [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Simpler version", size: 34 },
        { type: "text", x: 82, y: 164, text: "1. Find the clue.", size: 28 },
        { type: "text", x: 82, y: 228, text: "2. Name the move.", size: 28 },
        { type: "text", x: 82, y: 292, text: "3. Check the answer.", size: 28 },
        { type: "highlight", x: 76, y: 320, w: 520, h: 34 },
        { type: "text", x: 92, y: 348, text: "Clear first. Speed later.", size: 30 }
      ]
    };
  }

  function animateCommands(commands) {
    const queue = [...commands];
    const run = () => {
      const command = queue.shift();
      if (!command) return;
      drawCommand(command, true);
      setTimeout(run, command.type === "erase" ? 180 : 260 / lessonState.speed);
    };
    run();
  }

  function renderStaticStep(step) {
    clearBoard();
    (step.commands || []).forEach((command) => drawCommand(command, false));
  }

  function clearBoard() {
    const ratio = window.devicePixelRatio || 1;
    const rect = el.canvas.getBoundingClientRect();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, el.canvas.width, el.canvas.height);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(8, 34, 30, 0.24)";
    ctx.fillRect(0, 0, rect.width, rect.height);
  }

  function drawWelcomeBoard() {
    drawCommand({ type: "text", x: 54, y: 78, text: "Blackboard Focus Session", size: 34 }, false);
    drawCommand({ type: "text", x: 58, y: 128, text: "Short lessons from real test results.", size: 22 }, false);
    drawCommand({ type: "box", x: 60, y: 180, w: 460, h: 112 }, false);
    drawCommand({ type: "text", x: 88, y: 224, text: "1. Teach with chalk", size: 25 }, false);
    drawCommand({ type: "text", x: 88, y: 262, text: "2. Pause for questions", size: 25 }, false);
    drawCommand({ type: "arrow", x1: 550, y1: 236, x2: 760, y2: 236 }, false);
    drawCommand({ type: "circle", x: 850, y: 236, r: 72 }, false);
    drawCommand({ type: "text", x: 807, y: 244, text: "learn", size: 26 }, false);
  }

  function drawCommand(command, jitter) {
    if (command.type === "erase") {
      clearBoard();
      return;
    }
    const scale = boardScale();
    const c = { ...command };
    ["x", "y", "x1", "y1", "x2", "y2", "w", "h", "r", "size"].forEach((key) => {
      if (typeof c[key] === "number") c[key] *= scale;
    });
    ctx.save();
    ctx.globalAlpha = command.type === "highlight" ? 0.25 : 0.92;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = command.type === "highlight" ? "#f5c76a" : "#f8f1dd";
    ctx.fillStyle = command.type === "highlight" ? "#f5c76a" : "#f8f1dd";
    ctx.shadowColor = "rgba(255, 255, 255, 0.28)";
    ctx.shadowBlur = 1.5;
    if (command.type === "text") chalkText(c.text, c.x, c.y, c.size || 22, c.max ? c.max * scale : undefined);
    if (command.type === "line") chalkLine(c.x1, c.y1, c.x2, c.y2, jitter);
    if (command.type === "arrow") chalkArrow(c.x1, c.y1, c.x2, c.y2, jitter);
    if (command.type === "box") chalkBox(c.x, c.y, c.w, c.h, jitter);
    if (command.type === "circle") chalkCircle(c.x, c.y, c.r, jitter);
    if (command.type === "highlight") {
      ctx.fillRect(c.x, c.y, c.w, c.h);
    }
    ctx.restore();
  }

  function boardScale() {
    return el.canvas.getBoundingClientRect().width / 1280;
  }

  function chalkText(text, x, y, size, maxWidth) {
    ctx.font = `700 ${Math.max(13, size)}px "Comic Sans MS", "Trebuchet MS", sans-serif`;
    const words = String(text).split(" ");
    let line = "";
    let lineY = y;
    const limit = maxWidth || 1000;
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > limit && line) {
        roughFillText(line, x, lineY);
        line = word;
        lineY += size * 1.28;
      } else {
        line = test;
      }
    });
    if (line) roughFillText(line, x, lineY);
  }

  function roughFillText(text, x, y) {
    ctx.fillText(text, x + rand(-0.7, 0.7), y + rand(-0.7, 0.7));
    ctx.globalAlpha *= 0.34;
    ctx.fillText(text, x + rand(-1.3, 1.3), y + rand(-1.3, 1.3));
    ctx.globalAlpha = Math.min(0.92, ctx.globalAlpha / 0.34);
  }

  function chalkLine(x1, y1, x2, y2, jitter) {
    ctx.lineWidth = Math.max(2, 3 * boardScale());
    for (let pass = 0; pass < 2; pass += 1) {
      ctx.beginPath();
      ctx.moveTo(x1 + randJ(jitter), y1 + randJ(jitter));
      ctx.lineTo(x2 + randJ(jitter), y2 + randJ(jitter));
      ctx.stroke();
    }
  }

  function chalkArrow(x1, y1, x2, y2, jitter) {
    chalkLine(x1, y1, x2, y2, jitter);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const len = 18 * boardScale();
    chalkLine(x2, y2, x2 - Math.cos(angle - 0.52) * len, y2 - Math.sin(angle - 0.52) * len, jitter);
    chalkLine(x2, y2, x2 - Math.cos(angle + 0.52) * len, y2 - Math.sin(angle + 0.52) * len, jitter);
  }

  function chalkBox(x, y, w, h, jitter) {
    chalkLine(x, y, x + w, y, jitter);
    chalkLine(x + w, y, x + w, y + h, jitter);
    chalkLine(x + w, y + h, x, y + h, jitter);
    chalkLine(x, y + h, x, y, jitter);
  }

  function chalkCircle(x, y, r, jitter) {
    ctx.lineWidth = Math.max(2, 3 * boardScale());
    for (let pass = 0; pass < 2; pass += 1) {
      ctx.beginPath();
      ctx.ellipse(x + randJ(jitter), y + randJ(jitter), r + randJ(jitter), r * 0.96 + randJ(jitter), rand(-0.05, 0.05), 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function teach(text, after) {
    el.caption.textContent = text;
    if (el.voice.checked && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = lessonState.speed === 1 ? 0.9 : 0.72;
      utterance.pitch = 0.94;
      utterance.volume = 0.9;
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.find((voice) => /Daniel|Google UK English Male|Microsoft David|Microsoft George|Male/i.test(voice.name)) || voices.find((voice) => /English/i.test(voice.lang)) || null;
      utterance.onend = () => after?.();
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => after?.(), Math.min(2400, 900 + text.length * 22));
    }
  }

  function renderMemory() {
    el.memoryList.innerHTML = lessonState.memory.slice(-6).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function safeJson(value, fallback) {
    try { return JSON.parse(value) || fallback; } catch { return fallback; }
  }

  function shorten(value, max) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    return text.length > max ? `${text.slice(0, max - 3)}...` : text;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function stripTrailingPunctuation(value) {
    return String(value || "").replace(/[.!?]+$/g, "");
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function randJ(enabled) {
    return enabled ? rand(-1.6, 1.6) : 0;
  }

  window.__blackboardFocusDebug = {
    getState: () => ({
      profile: lessonState.profile?.name,
      attempts: lessonState.plan?.attempts?.length || 0,
      modules: lessonState.plan?.modules?.map((module) => module.title) || [],
      moduleIndex: lessonState.moduleIndex,
      stepIndex: lessonState.stepIndex,
      caption: el.caption.textContent
    }),
    next: playNextStep,
    ask: (question) => {
      el.question.value = question;
      el.form.requestSubmit();
    }
  };
})();
