(() => {
  const storageKey = "brightQuestProfilesV2";
  const data = window.BrightQuestData || { levels: [], lessons: {} };
  const finalTest = window.BrightQuestFinalTest;
  const internationalTests = window.BrightQuestInternationalTests || [];
  const allTests = [...(data.levels || []), ...(finalTest ? [finalTest] : []), ...internationalTests];

  const el = {
    canvas: document.querySelector("#chalkboard"),
    caption: document.querySelector("#teacherCaption"),
    captionToggle: document.querySelector("#captionToggleButton"),
    missedQuestionStrip: document.querySelector("#missedQuestionStrip"),
    missedQuestionText: document.querySelector("#missedQuestionText"),
    studentPill: document.querySelector("#studentPill"),
    moduleList: document.querySelector("#moduleList"),
    evidenceList: document.querySelector("#evidenceList"),
    memoryList: document.querySelector("#memoryList"),
    planTitle: document.querySelector("#planTitle"),
    planSummary: document.querySelector("#planSummary"),
    start: document.querySelector("#startLessonButton"),
    apiStatus: document.querySelector("#apiStatus"),
    mic: document.querySelector("#micButton"),
    ask: document.querySelector("#askButton"),
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
    paused: false,
    completed: false,
    autoTimer: null,
    currentUtterance: null,
    currentAudio: null,
    voiceToken: 0,
    voiceCache: new Map(),
    animationToken: 0,
    speed: 1,
    captionsVisible: false,
    memory: ["Current objective: teach from the exact saved questions, then practise one move."],
    interruptedFrom: null,
    lastStep: null,
    transcript: [],
    recognition: null,
    listening: false,
    apiAvailable: true,
    cloudVoiceAvailable: true,
    voicesReady: false
  };

  init();

  async function init() {
    el.back.addEventListener("click", () => { window.location.href = "../"; });
    el.start.addEventListener("click", handleLessonControl);
    el.captionToggle.addEventListener("click", toggleCaptions);
    el.caption.hidden = true;
    el.captionToggle.setAttribute("aria-pressed", "false");
    el.form.addEventListener("submit", handleQuestion);
    el.mic.addEventListener("click", toggleMic);
    document.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        el.question.value = button.dataset.question;
        el.form.requestSubmit();
      });
    });

    fitCanvas();
    window.addEventListener("resize", fitCanvas);
    prepareVoices();
    lessonState.profile = await loadProfile();
    lessonState.plan = buildPlan(lessonState.profile);
    renderPlan();
    clearBoard();
    drawWelcomeBoard();
    el.apiStatus.textContent = canUseCloudVoice() ? "AI teacher voice ready" : "Local preview uses browser voice";
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
    const seenQuestions = new Set();
    const questionStats = attempts.flatMap((attempt) =>
      (attempt.questionStats || []).map((question) => ({ ...question, attempt }))
    ).filter((question) => {
      const key = [
        question.skill || "",
        question.prompt || "",
        question.selectedText || question.answerText || "",
        question.correctText || "",
        question.correct
      ].join("|");
      if (seenQuestions.has(key)) return false;
      seenQuestions.add(key);
      return true;
    });
    const timedChoice = questionStats.filter((question) => question.format !== "writing");
    const slowCutoff = timedChoice.length
      ? Math.max(45, percentile(timedChoice.map((question) => question.secondsSpent || 0), 0.72))
      : 45;
    const wrong = timedChoice.filter((question) => question.correct === false);
    const slow = timedChoice.filter((question) => (question.secondsSpent || 0) >= slowCutoff);
    const skillScores = {};
    timedChoice.forEach((question) => {
      const isWrong = question.correct === false;
      const isSlow = (question.secondsSpent || 0) >= slowCutoff;
      if (!isWrong && !isSlow) return;
      const key = question.skill || "Careful reasoning";
      skillScores[key] ||= { skill: key, section: question.section || "Mixed", wrong: 0, slow: 0, seconds: 0, examples: [] };
      if (isWrong) skillScores[key].wrong += 1;
      if (isSlow) skillScores[key].slow += 1;
      skillScores[key].seconds += question.secondsSpent || 0;
      if (skillScores[key].examples.length < 4) skillScores[key].examples.push(normalizeQuestionExample(question));
    });

    const ranked = Object.values(skillScores)
      .sort((a, b) => (b.wrong * 4 + b.slow * 2 + b.seconds / 45) - (a.wrong * 4 + a.slow * 2 + a.seconds / 45));

    const seedSkills = ranked.length ? ranked : [
      { skill: "Multi-step word problem", section: "Maths", wrong: 0, slow: 0, seconds: 0, examples: [] },
      { skill: "Inference", section: "English", wrong: 0, slow: 0, seconds: 0, examples: [] },
      { skill: "Number sequences", section: "Reasoning", wrong: 0, slow: 0, seconds: 0, examples: [] }
    ];

    const modules = seedSkills.slice(0, 14).map((item, index) => makeModule(item, index, attempts.length, slowCutoff));
    return {
      attempts,
      wrongCount: wrong.length,
      slowCount: slow.length,
      slowCutoff,
      modules,
      evidence: buildEvidence(profile, attempts, wrong, slow, modules)
    };
  }

  function toggleCaptions() {
    lessonState.captionsVisible = !lessonState.captionsVisible;
    el.caption.hidden = !lessonState.captionsVisible;
    el.captionToggle.setAttribute("aria-pressed", String(lessonState.captionsVisible));
    el.captionToggle.classList.toggle("active", lessonState.captionsVisible);
  }

  function makeModule(item, index, attemptCount, slowCutoff) {
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
    const narrative = createNarrative({ ...item, examples: item.examples || [] }, adjacent, slowCutoff);

    return {
      title,
      section: item.section,
      childReason,
      adjacent,
      example,
      examples: item.examples || [],
      objective: moduleObjective(title),
      narrative,
      steps: buildTeachingSteps(title, item.section, item.examples || [], adjacent, index, narrative)
    };
  }

  function buildEvidence(profile, attempts, wrong, slow, modules) {
    const latest = attempts.at(-1);
    const rows = [
      `${profile.name || "Aarin"} has ${attempts.length} saved test attempt${attempts.length === 1 ? "" : "s"}.`,
      latest ? `Latest result: ${latest.levelName || latest.level} at ${latest.percent}%.` : "No saved attempt yet, so this starts with foundation lessons.",
      wrong.length ? `${wrong.length} missed question${wrong.length === 1 ? "" : "s"} found across saved results.` : "No missed answers found in the current saved profile.",
      slow.length ? `${slow.length} slow question${slow.length === 1 ? "" : "s"} included, even when correct.` : "No timing records found yet."
    ];
    if (modules[0]) rows.push(`First focus: ${modules[0].title}.`);
    return rows;
  }

  function normalizeQuestionExample(question) {
    return {
      section: question.section || "Mixed",
      skill: question.skill || "Careful reasoning",
      prompt: String(question.prompt || "").replace(/\s+/g, " ").trim(),
      secondsSpent: question.secondsSpent || 0,
      correct: question.correct,
      selectedText: question.selectedText || question.answerText || "",
      correctText: question.correctText || "",
      levelName: question.attempt?.levelName || question.attempt?.name || question.attempt?.level || "Saved test",
      explain: question.explain || question.attempt?.wrong?.find((item) => item.prompt === question.prompt)?.explain || ""
    };
  }

  function percentile(values, p) {
    const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
    if (!sorted.length) return 45;
    return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(sorted.length * p)))];
  }

  function createNarrative(group, adjacent, slowCutoff) {
    const examples = group.examples || [];
    const first = examples[0];
    const missed = examples.filter((item) => item.correct === false).length;
    const slow = examples.filter((item) => item.secondsSpent >= slowCutoff).length;
    const evidence = evidenceSentence(first);
    const diagnosis = diagnosisFor(group.skill, first);
    const thinkAloud = thinkAloudFor(group.skill, first);
    const rehearsal = rehearsalFor(group.skill, first);
    const intro = missed
      ? `${group.skill} needs a short lesson because ${missed} saved answer${missed === 1 ? "" : "s"} got stuck at this exact move.`
      : `${group.skill} needs a short lesson because ${slow || 1} saved question${slow === 1 ? "" : "s"} took longer than it should.`;
    const actual = first
      ? `Saved example: ${evidence}`
      : `I will use a Grade 5 style example, then show the same move on the board.`;
    const misconception = diagnosis;
    const move = moduleObjective(group.skill);
    const practice = `The rehearsal is: ${rehearsal}`;
    const bridge = `This same move also helps ${adjacent[0]} and ${adjacent[1]}.`;
    const story = [intro, actual, diagnosis, thinkAloud, practice, bridge];
    return {
      intro,
      actual,
      misconception,
      move,
      practice,
      bridge,
      diagnosis,
      thinkAloud,
      rehearsal,
      story,
      short: story.join(" ")
    };
  }

  function evidenceSentence(example) {
    if (!example) return "No saved example is attached yet.";
    const parts = [`"${shorten(example.prompt, 120)}"`];
    if (example.selectedText) parts.push(`Aarin chose "${shorten(example.selectedText, 48)}"`);
    if (example.correctText) parts.push(`the best answer was "${shorten(example.correctText, 48)}"`);
    if (example.explain) parts.push(`because ${stripTrailingPunctuation(example.explain)}`);
    if (example.secondsSpent) parts.push(`after ${example.secondsSpent} seconds`);
    return `${parts.join("; ")}.`;
  }

  function diagnosisFor(skill, example) {
    const lower = String(skill).toLowerCase();
    if (lower.includes("division")) return "This story asks for each table's share, and then adds extra border tiles to that share.";
    if (lower.includes("data")) return "Range is not the biggest number; it is biggest minus smallest.";
    if (lower.includes("subtraction")) return "Both booked groups must be removed before we can know what is still empty.";
    if (lower.includes("deduction") || lower.includes("logic")) return "The word 'must' means only the statement guaranteed by the clues can survive.";
    if (lower.includes("geometry")) return "Same perimeter means the distance around is equal, not that the side lengths stay the same.";
    if (lower.includes("text structure")) return "Claim plus evidence plus final judgement belongs to argument writing, not story writing.";
    if (lower.includes("inference")) return "This is not about a clever guess; the answer has to be tied to words in the passage.";
    if (lower.includes("fraction")) return "The first check is whether the parts are equal; the numbers only make sense after that.";
    if (lower.includes("sequence") || lower.includes("pattern")) return "The useful evidence is the step rule, and term numbers count how many times to use it.";
    if (lower.includes("money")) return "A change question has two jobs: find the total spent, then subtract it from the money paid.";
    if (lower.includes("time")) return "A time question is a little journey on a clock, so jumps are safer than counting one minute at a time.";
    if (lower.includes("analogy")) return "An analogy is a sentence relationship; matching words by theme is not enough.";
    if (lower.includes("grammar")) return "The sentence has an owner and an action; the action has to match the owner.";
    if (lower.includes("multi")) return "The story contains two smaller questions, and the second answer depends on the first.";
    return example?.correct === false
      ? "The answer went in before the question's exact job was named."
      : "The work was probably correct but too heavy; we need a shorter routine.";
  }

  function thinkAloudFor(skill, example) {
    const lower = String(skill).toLowerCase();
    const promptHint = example?.prompt ? `I look at "${shorten(example.prompt, 64)}" and ask myself: ` : "I ask myself: ";
    if (lower.includes("division")) return `${promptHint}what does one table get before the extra tiles are added?`;
    if (lower.includes("data")) return `${promptHint}which value is biggest, which is smallest, and what is the difference?`;
    if (lower.includes("subtraction")) return `${promptHint}what has already been taken away, and what is left?`;
    if (lower.includes("deduction") || lower.includes("logic")) return `${promptHint}which answer is forced by every clue, not just possible?`;
    if (lower.includes("geometry")) return `${promptHint}what is the perimeter first, then what side makes that perimeter?`;
    if (lower.includes("text structure")) return `${promptHint}is this telling events, or proving a point with evidence?`;
    if (lower.includes("inference")) return `${promptHint}which exact words prove the answer?`;
    if (lower.includes("fraction")) return `${promptHint}are the parts equal before I count them?`;
    if (lower.includes("sequence") || lower.includes("pattern")) return `${promptHint}what are the jumps between each pair?`;
    if (lower.includes("money")) return `${promptHint}what was spent, and what is left?`;
    if (lower.includes("time")) return `${promptHint}where is the next easy clock stop?`;
    if (lower.includes("analogy")) return `${promptHint}can I say the relationship as a sentence?`;
    if (lower.includes("grammar")) return `${promptHint}who is doing the action, and does the verb match?`;
    if (lower.includes("multi")) return `${promptHint}what is the first tiny question inside this story?`;
    return `${promptHint}what clue tells me the first move?`;
  }

  function rehearsalFor(skill) {
    const lower = String(skill).toLowerCase();
    if (lower.includes("division")) return "divide the shared total first, then add the extra amount each group receives.";
    if (lower.includes("data")) return "circle the biggest and smallest values, then subtract smallest from biggest.";
    if (lower.includes("subtraction")) return "add what was used, subtract that from the starting amount, then check the left-over.";
    if (lower.includes("deduction") || lower.includes("logic")) return "test each option against every clue and cross out anything not guaranteed.";
    if (lower.includes("geometry")) return "find the matching perimeter, divide by the number of equal sides, then label the side.";
    if (lower.includes("text structure")) return "look for claim, evidence, and judgement; if they are present, call it an argument.";
    if (lower.includes("inference")) return "underline the proof words, say what they suggest, then choose the only answer they support.";
    if (lower.includes("fraction")) return "check equal parts, count the shaded parts, then count the total parts.";
    if (lower.includes("sequence") || lower.includes("pattern")) return "write the gaps above the numbers, name the rule, then continue once.";
    if (lower.includes("money")) return "add the prices in one line, subtract from the money paid in the next line.";
    if (lower.includes("time")) return "jump to the next hour or half-hour, then add the remaining minutes.";
    if (lower.includes("analogy")) return "turn the first pair into a sentence, then test each option in the same sentence.";
    if (lower.includes("grammar")) return "circle the subject, tap the verb, then read them together.";
    if (lower.includes("multi")) return "write Step 1 and Step 2 before doing any arithmetic.";
    return "find the clue, say the move, answer, then check against the question.";
  }

  function moduleObjective(skill) {
    const lower = skill.toLowerCase();
    if (lower.includes("division")) return "Find one group's share, then add any extra amount.";
    if (lower.includes("data")) return "Find range by subtracting the smallest value from the biggest.";
    if (lower.includes("subtraction")) return "Add what is used first, then subtract from the starting total.";
    if (lower.includes("deduction") || lower.includes("logic")) return "Choose only what the clues force to be true.";
    if (lower.includes("geometry")) return "Match the perimeter first, then find the missing side.";
    if (lower.includes("text structure")) return "Use structure clues to name the type of writing.";
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
    if (lower.includes("division")) return ["Multiplication facts", "Multi-step arithmetic", "Equal groups"];
    if (lower.includes("data")) return ["Subtraction", "Graph reading", "Compare values"];
    if (lower.includes("subtraction")) return ["Addition check", "Multi-step word problem", "Regrouping"];
    if (lower.includes("deduction") || lower.includes("logic")) return ["Elimination", "Must be true", "Careful reading"];
    if (lower.includes("geometry")) return ["Perimeter", "Multiplication", "Division"];
    if (lower.includes("text structure")) return ["Reading comprehension", "Persuasive writing", "Evidence"];
    if (lower.includes("fraction")) return ["Division as sharing", "Equal parts", "Simplifying"];
    if (lower.includes("time")) return ["Addition", "Number line jumps", "Elapsed time"];
    if (lower.includes("money")) return ["Decimals", "Subtraction", "Change"];
    if (lower.includes("inference")) return ["Reading proof", "Vocabulary", "Main idea"];
    if (lower.includes("analogy")) return ["Word groups", "Functions", "Odd one out"];
    if (lower.includes("pattern") || lower.includes("sequence")) return ["Skip counting", "Difference", "Missing number"];
    if (lower.includes("grammar")) return ["Subject", "Verb", "Tense"];
    return ["Careful reading", "Working memory", "Checking"];
  }

  function buildTeachingSteps(skill, section, examples, adjacent, index, narrative) {
    const example = examples[0];
    const secondExample = examples[1];
    const concreteSteps = concreteStorySteps(skill, example, narrative, index);
    if (concreteSteps.length) return concreteSteps;
    const prompt = example?.prompt ? shorten(example.prompt, 138) : samplePromptFor(skill);
    const answerLine = example?.correctText
      ? `Best answer: ${shorten(example.correctText, 52)}`
      : "Best answer: prove it from the question.";
    const selectedLine = example?.selectedText
      ? `Chosen: ${shorten(example.selectedText, 56)}`
      : "Chosen answer was not saved.";
    return [
      {
        say: `${narrative.intro} We will start with the saved question, because that is where the useful learning is.`,
        commands: [
          { type: "text", x: 52, y: 64, text: `Focus: ${skill}`, size: 36 },
          { type: "text", x: 56, y: 112, text: shorten(narrative.intro, 130), size: 20, max: 1000 },
          { type: "box", x: 60, y: 164, w: 960, h: 162 },
          { type: "text", x: 88, y: 206, text: prompt, size: 22, max: 880 },
          { type: "text", x: 88, y: 278, text: selectedLine, size: 19, max: 420 },
          { type: "text", x: 540, y: 278, text: answerLine, size: 19, max: 430 },
          { type: "line", x1: 88, y1: 360, x2: 760, y2: 360 },
          { type: "text", x: 88, y: 405, text: "We learn from the exact moment the thinking changed.", size: 24, max: 880 }
        ],
        mobileCommands: [
          { type: "text", fixed: true, x: 24, y: 32, text: `Focus: ${shorten(skill, 18)}`, size: 18, max: 308 },
          { type: "text", fixed: true, x: 26, y: 72, text: shorten(narrative.intro, 72), size: 13, max: 306 },
          { type: "box", fixed: true, x: 24, y: 116, w: 318, h: 138 },
          { type: "text", fixed: true, x: 38, y: 144, text: shorten(prompt, 84), size: 14, max: 290 },
          { type: "text", fixed: true, x: 38, y: 200, text: shorten(selectedLine, 40), size: 13, max: 278 },
          { type: "text", fixed: true, x: 38, y: 226, text: shorten(answerLine, 44), size: 13, max: 278 },
          { type: "line", fixed: true, x1: 38, y1: 286, x2: 304, y2: 286 },
          { type: "text", fixed: true, x: 42, y: 318, text: "Now we practise the step.", size: 17, max: 280 }
        ]
      },
      {
        say: `${narrative.diagnosis} Listen to my teacher-thought: ${narrative.thinkAloud}`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Teacher think-aloud", size: 34 },
          { type: "box", x: 62, y: 124, w: 1030, h: 112 },
          { type: "text", x: 92, y: 176, text: shorten(narrative.thinkAloud, 120), size: 25, max: 960 },
          { type: "arrow", x1: 184, y1: 292, x2: 412, y2: 292 },
          { type: "arrow", x1: 552, y1: 292, x2: 780, y2: 292 },
          { type: "box", x: 70, y: 334, w: 250, h: 88 },
          { type: "text", x: 102, y: 388, text: "question job", size: 22 },
          { type: "box", x: 404, y: 334, w: 250, h: 88 },
          { type: "text", x: 452, y: 388, text: "evidence", size: 22 },
          { type: "box", x: 738, y: 334, w: 250, h: 88 },
          { type: "text", x: 792, y: 388, text: "answer", size: 22 }
        ],
        mobileCommands: [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 38, text: "Teacher thinking", size: 20, max: 310 },
          { type: "box", fixed: true, x: 28, y: 76, w: 300, h: 104 },
          { type: "text", fixed: true, x: 44, y: 106, text: shorten(narrative.thinkAloud, 86), size: 14, max: 272 },
          { type: "box", fixed: true, x: 34, y: 218, w: 86, h: 54 },
          { type: "text", fixed: true, x: 50, y: 250, text: "job", size: 14 },
          { type: "arrow", fixed: true, x1: 124, y1: 244, x2: 168, y2: 244 },
          { type: "box", fixed: true, x: 174, y: 218, w: 96, h: 54 },
          { type: "text", fixed: true, x: 194, y: 250, text: "proof", size: 14 },
          { type: "arrow", fixed: true, x1: 274, y1: 244, x2: 314, y2: 244 },
          { type: "text", fixed: true, x: 34, y: 324, text: shorten(narrative.diagnosis, 72), size: 14, max: 296 }
        ]
      },
      {
        say: `Now let's act it out on the board. ${narrative.practice}`,
        commands: thinkingCommands(skill),
        mobileCommands: mobileThinkingCommands(skill)
      },
      {
        say: secondExample
          ? `Here is another saved example from the same pattern. Notice that the decoration changes, but the thinking move stays the same.`
          : `Now I show how the same move travels to nearby skills. This is how one lesson helps more than one test question.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: secondExample ? "Same pattern, another question" : "Adjacent learning", size: 32 },
          ...(secondExample ? [
            { type: "box", x: 62, y: 120, w: 980, h: 142 },
            { type: "text", x: 88, y: 164, text: shorten(secondExample.prompt, 142), size: 22, max: 900 },
            { type: "text", x: 88, y: 228, text: secondExample.correctText ? `Best answer: ${shorten(secondExample.correctText, 76)}` : "Use the same move as before.", size: 20, max: 820 },
            { type: "arrow", x1: 250, y1: 330, x2: 520, y2: 330 },
            { type: "text", x: 92, y: 338, text: "different words", size: 22 },
            { type: "text", x: 560, y: 338, text: "same move", size: 24 }
          ] : [
            { type: "circle", x: 234, y: 260, r: 86 },
            { type: "text", x: 180, y: 268, text: skill, size: 18, max: 120 },
            { type: "circle", x: 530, y: 170, r: 72 },
            { type: "text", x: 485, y: 176, text: adjacent[0], size: 18, max: 110 },
            { type: "circle", x: 594, y: 392, r: 72 },
            { type: "text", x: 550, y: 398, text: adjacent[1], size: 18, max: 110 },
            { type: "arrow", x1: 318, y1: 238, x2: 458, y2: 184 },
            { type: "arrow", x1: 318, y1: 294, x2: 520, y2: 372 }
          ])
        ],
        mobileCommands: secondExample ? [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 38, text: "Same pattern", size: 21 },
          { type: "box", fixed: true, x: 28, y: 78, w: 306, h: 120 },
          { type: "text", fixed: true, x: 42, y: 108, text: shorten(secondExample.prompt, 96), size: 14, max: 278 },
          { type: "text", fixed: true, x: 42, y: 174, text: secondExample.correctText ? `Best: ${shorten(secondExample.correctText, 44)}` : "Use the same move.", size: 14, max: 278 },
          { type: "arrow", fixed: true, x1: 90, y1: 248, x2: 256, y2: 248 },
          { type: "text", fixed: true, x: 46, y: 232, text: "new words", size: 14 },
          { type: "text", fixed: true, x: 234, y: 232, text: "same move", size: 14 }
        ] : [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 38, text: "Adjacent learning", size: 21 },
          { type: "circle", fixed: true, x: 176, y: 120, r: 54 },
          { type: "text", fixed: true, x: 132, y: 126, text: shorten(skill, 18), size: 14, max: 88 },
          { type: "box", fixed: true, x: 36, y: 210, w: 122, h: 62 },
          { type: "text", fixed: true, x: 48, y: 246, text: shorten(adjacent[0], 18), size: 13, max: 96 },
          { type: "box", fixed: true, x: 204, y: 210, w: 122, h: 62 },
          { type: "text", fixed: true, x: 216, y: 246, text: shorten(adjacent[1], 18), size: 13, max: 96 },
          { type: "arrow", fixed: true, x1: 146, y1: 170, x2: 96, y2: 210 },
          { type: "arrow", fixed: true, x1: 204, y1: 170, x2: 264, y2: 210 }
        ]
      },
      {
        say: `Check point. Say the move back in your own words. If it still feels fuzzy, interrupt me now and we will slow it down.`,
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
        ],
        mobileCommands: [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 40, text: "Check understanding", size: 21 },
          { type: "box", fixed: true, x: 30, y: 82, w: 300, h: 56 },
          { type: "text", fixed: true, x: 46, y: 116, text: "1. What is it asking?", size: 15 },
          { type: "box", fixed: true, x: 30, y: 158, w: 300, h: 56 },
          { type: "text", fixed: true, x: 46, y: 192, text: "2. What is the move?", size: 15 },
          { type: "box", fixed: true, x: 30, y: 234, w: 300, h: 56 },
          { type: "text", fixed: true, x: 46, y: 268, text: "3. How will I check?", size: 15 },
          { type: "text", fixed: true, x: 58, y: 338, text: index < 2 ? "Then we continue." : "Then we finish strong.", size: 18, max: 270 }
        ]
      }
    ];
  }

  function concreteStorySteps(skill, example, narrative, index) {
    const lower = String(skill || "").toLowerCase();
    if (lower.includes("division")) return divisionStorySteps(example, narrative, index);
    if (lower.includes("data")) return rangeStorySteps(example, narrative, index);
    if (lower.includes("time")) return timeStorySteps(example, narrative, index);
    if (lower.includes("money")) return moneyStorySteps(example, narrative, index);
    if (lower.includes("pattern") || lower.includes("sequence")) return patternStorySteps(example, narrative, index);
    if (lower.includes("multi")) return multiStepStorySteps(example, narrative, index);
    if (lower.includes("subtraction")) return subtractionStorySteps(example, narrative, index);
    if (lower.includes("deduction") || lower.includes("logic")) return logicStorySteps(example, narrative, index);
    if (lower.includes("geometry")) return geometryStorySteps(example, narrative, index);
    return [];
  }

  function divisionStorySteps(example, narrative, index) {
    const nums = numbersFrom(example?.prompt);
    const total = nums[0] || 104;
    const groups = nums[1] || 8;
    const extra = nums[2] || 6;
    const share = Math.round(total / groups);
    const final = share + extra;
    return [
      {
        say: `Watch this one. It looks like a plain division question, but there is a little twist hiding at the end. We have a big pile of ${total} coloured tiles, and ${groups} tables waiting for their fair share.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "A pile of tiles walks into the classroom...", size: 32, max: 1040 },
          { type: "box", x: 84, y: 142, w: 300, h: 170 },
          { type: "text", x: 132, y: 212, text: `${total} tiles`, size: 34 },
          ...tableRowCommands(groups, 480, 130),
          { type: "text", x: 502, y: 330, text: `${groups} tables are waiting`, size: 25, max: 520 }
        ],
        mobileCommands: [
          { type: "text", fixed: true, x: 24, y: 38, text: "A big tile pile", size: 22 },
          { type: "box", fixed: true, x: 34, y: 86, w: 126, h: 82 },
          { type: "text", fixed: true, x: 64, y: 136, text: `${total}`, size: 24 },
          { type: "text", fixed: true, x: 190, y: 116, text: `${groups} tables`, size: 18 },
          { type: "text", fixed: true, x: 44, y: 238, text: "First question:", size: 18 },
          { type: "text", fixed: true, x: 44, y: 278, text: "What does ONE table get?", size: 17, max: 270 }
        ]
      },
      {
        say: `Here is the part that makes the mistake feel reasonable. Your brain sees ${total} and ${groups}, and it wants to share. That is a good first idea. So let's share first: ${total} divided by ${groups} is ${share}. Each table gets ${share} tiles.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Share the pile first", size: 34 },
          ...tableRowCommands(groups, 92, 130, `${share}`),
          { type: "line", x1: 90, y1: 342, x2: 820, y2: 342 },
          { type: "text", x: 112, y: 404, text: `${total} / ${groups} = ${share}`, size: 42 },
          { type: "text", x: 538, y: 404, text: "for each table", size: 30 }
        ],
        mobileCommands: [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 38, text: "Share first", size: 22 },
          { type: "text", fixed: true, x: 44, y: 112, text: `${total} / ${groups} = ${share}`, size: 24 },
          { type: "box", fixed: true, x: 42, y: 164, w: 112, h: 58 },
          { type: "text", fixed: true, x: 72, y: 202, text: `T1 ${share}`, size: 16 },
          { type: "box", fixed: true, x: 188, y: 164, w: 112, h: 58 },
          { type: "text", fixed: true, x: 218, y: 202, text: `T2 ${share}`, size: 16 },
          { type: "text", fixed: true, x: 44, y: 286, text: "Every table gets the same share.", size: 17, max: 270 }
        ]
      },
      {
        say: `Now, stop for the sneaky bit. The ${extra} border tiles are not in the big pile. They arrive later, like a little delivery truck for every table. So one table has ${share}, then it receives ${extra} more. That makes ${final}.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "The extra tiles arrive later", size: 34 },
          { type: "box", x: 126, y: 140, w: 260, h: 118 },
          { type: "text", x: 172, y: 210, text: `one table: ${share}`, size: 29 },
          { type: "arrow", x1: 420, y1: 198, x2: 590, y2: 198 },
          { type: "box", x: 620, y: 140, w: 260, h: 118 },
          { type: "text", x: 670, y: 210, text: `+ ${extra} border`, size: 29 },
          { type: "arrow", x1: 746, y1: 270, x2: 746, y2: 350 },
          { type: "text", x: 308, y: 430, text: `${share} + ${extra} = ${final}`, size: 48 },
          { type: "text", x: 602, y: 430, text: "tiles on each table", size: 28 }
        ],
        mobileCommands: [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 38, text: "Then the delivery arrives", size: 21, max: 300 },
          { type: "box", fixed: true, x: 40, y: 104, w: 110, h: 58 },
          { type: "text", fixed: true, x: 62, y: 140, text: `${share}`, size: 20 },
          { type: "arrow", fixed: true, x1: 160, y1: 132, x2: 214, y2: 132 },
          { type: "box", fixed: true, x: 226, y: 104, w: 90, h: 58 },
          { type: "text", fixed: true, x: 248, y: 140, text: `+${extra}`, size: 20 },
          { type: "text", fixed: true, x: 74, y: 244, text: `${share} + ${extra} = ${final}`, size: 25 },
          { type: "text", fixed: true, x: 56, y: 300, text: "That is one table's total.", size: 17, max: 260 }
        ]
      },
      checkStep(index, `Next time: share first, then ask what arrives for each group.`)
    ];
  }

  function rangeStorySteps(example, narrative, index) {
    const nums = numbersFrom(example?.prompt).filter((value) => value > 20);
    const values = nums.length >= 4 ? nums.slice(0, 4) : [128, 146, 119, 152];
    const low = Math.min(...values);
    const high = Math.max(...values);
    const range = high - low;
    return [
      {
        say: `This one is a sneaky word question. Range sounds like it might mean the biggest pile. But watch this. I am going to line up the can collections like little towers.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Four can towers", size: 34 },
          ...barCommands(values),
          { type: "text", x: 86, y: 420, text: "Which tower is tallest? Which is shortest?", size: 30, max: 900 }
        ],
        mobileCommands: [
          { type: "text", fixed: true, x: 24, y: 38, text: "Can towers", size: 22 },
          { type: "text", fixed: true, x: 48, y: 110, text: values.join("   "), size: 17, max: 280 },
          { type: "text", fixed: true, x: 44, y: 220, text: "Tallest? Shortest?", size: 20 }
        ]
      },
      {
        say: `Now the interesting bit. Range is the stretch from the smallest tower to the biggest tower. So I circle ${low}, I circle ${high}, and I ask: how far apart are they?`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Range means the stretch", size: 34 },
          ...barCommands(values, low, high),
          { type: "arrow", x1: 230, y1: 350, x2: 720, y2: 350 },
          { type: "text", x: 276, y: 408, text: `${high} - ${low} = ${range}`, size: 46 }
        ],
        mobileCommands: [
          { type: "erase" },
          { type: "text", fixed: true, x: 24, y: 38, text: "Range = stretch", size: 22 },
          { type: "text", fixed: true, x: 46, y: 120, text: `biggest ${high}`, size: 19 },
          { type: "text", fixed: true, x: 46, y: 170, text: `smallest ${low}`, size: 19 },
          { type: "line", fixed: true, x1: 46, y1: 194, x2: 250, y2: 194 },
          { type: "text", fixed: true, x: 46, y: 246, text: `${high} - ${low} = ${range}`, size: 24 }
        ]
      },
      checkStep(index, `Range is not the tallest tower. It is the gap between tallest and shortest.`)
    ];
  }

  function timeStorySteps(example, narrative, index) {
    const text = String(example?.prompt || "");
    const start = text.match(/(\d{1,2}):(\d{2})/);
    const startHour = Number(start?.[1] || 9);
    const startMinute = Number(start?.[2] || 35);
    const duration = Number(text.match(/lasts?\s+(\d+)\s+minutes?/i)?.[1] || 42);
    const breakMinutes = Number(text.match(/(\d+)[-\s]?minute break/i)?.[1] || 12);
    const testEnd = addMinutes(startHour, startMinute, duration);
    const finalEnd = addMinutes(testEnd.hour, testEnd.minute, breakMinutes);
    const firstJump = Math.min(60 - startMinute, duration);
    const secondJump = duration - firstJump;
    return [
      {
        say: `Let's make the clock into a little river. We do not count every minute like tiny pebbles. We jump to useful rocks. Start at ${formatTime(startHour, startMinute)}, then the test lasts ${duration} minutes.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Clock river", size: 34 },
          { type: "line", x1: 90, y1: 260, x2: 900, y2: 260 },
          { type: "text", x: 90, y: 314, text: formatTime(startHour, startMinute), size: 28 },
          { type: "text", x: 370, y: 314, text: formatTime(startHour + 1, 0), size: 28 },
          { type: "text", x: 650, y: 314, text: formatTime(testEnd.hour, testEnd.minute), size: 28 },
          { type: "arrow", x1: 150, y1: 228, x2: 420, y2: 228 },
          { type: "text", x: 236, y: 202, text: `+${firstJump}`, size: 24 },
          { type: "arrow", x1: 456, y1: 228, x2: 696, y2: 228 },
          { type: "text", x: 546, y: 202, text: `+${secondJump}`, size: 24 }
        ]
      },
      {
        say: `Careful: the question is not finished when the test ends. There is a ${breakMinutes} minute break after that. So from ${formatTime(testEnd.hour, testEnd.minute)} we hop ${breakMinutes} more minutes, and we land at ${formatTime(finalEnd.hour, finalEnd.minute)}.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "The break happens after the test", size: 34 },
          { type: "line", x1: 120, y1: 260, x2: 780, y2: 260 },
          { type: "text", x: 110, y: 314, text: formatTime(testEnd.hour, testEnd.minute), size: 30 },
          { type: "arrow", x1: 220, y1: 228, x2: 560, y2: 228 },
          { type: "text", x: 350, y: 202, text: `+${breakMinutes}`, size: 26 },
          { type: "text", x: 590, y: 314, text: formatTime(finalEnd.hour, finalEnd.minute), size: 34 },
          { type: "circle", x: 650, y: 304, r: 78 }
        ]
      },
      checkStep(index, `Clock questions are journeys. Stop at each station in order.`)
    ];
  }

  function moneyStorySteps(example, narrative, index) {
    const amounts = moneyAmountsFrom(example?.prompt);
    const priceA = amounts[0] ?? 4.5;
    const priceB = amounts[1] ?? 2.25;
    const paid = amounts[2] ?? 10;
    const total = roundMoney(priceA + priceB);
    const change = roundMoney(paid - total);
    return [
      {
        say: `Let's turn this into a tiny shop counter. I can see two price tags, ${money(priceA)} and ${money(priceB)}. Before we talk about change, we need to know how much money actually left the pocket.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Shop counter", size: 34 },
          { type: "box", x: 100, y: 148, w: 250, h: 118 },
          { type: "text", x: 136, y: 218, text: `item A ${money(priceA)}`, size: 27 },
          { type: "box", x: 430, y: 148, w: 250, h: 118 },
          { type: "text", x: 466, y: 218, text: `item B ${money(priceB)}`, size: 27 },
          { type: "arrow", x1: 276, y1: 310, x2: 510, y2: 310 },
          { type: "text", x: 160, y: 376, text: `${money(priceA)} + ${money(priceB)} = ${money(total)}`, size: 38 }
        ]
      },
      {
        say: `Now the customer pays with ${money(paid)}. Change is the money that comes marching back. So I take away the ${money(total)} that was spent, and ${money(change)} walks back.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Money leaving, money coming back", size: 34 },
          { type: "box", x: 110, y: 144, w: 240, h: 110 },
          { type: "text", x: 152, y: 210, text: `paid ${money(paid)}`, size: 29 },
          { type: "arrow", x1: 380, y1: 198, x2: 560, y2: 198 },
          { type: "box", x: 590, y: 144, w: 270, h: 110 },
          { type: "text", x: 628, y: 210, text: `spent ${money(total)}`, size: 29 },
          { type: "line", x1: 140, y1: 316, x2: 700, y2: 316 },
          { type: "text", x: 154, y: 388, text: `${money(paid)} - ${money(total)} = ${money(change)} change`, size: 38, max: 900 }
        ]
      },
      checkStep(index, `Change is what comes back after the price is paid.`)
    ];
  }

  function patternStorySteps(example, narrative, index) {
    const text = String(example?.prompt || "");
    const nums = numbersFrom(text);
    const start = Number(text.match(/starts with\s+(\d+)/i)?.[1] || nums[0] || 2);
    const step = Number(text.match(/adds?\s+(\d+)/i)?.[1] || Math.abs((nums[1] || 6) - start) || 4);
    const target = Number(text.match(/(\d+)(?:st|nd|rd|th)\s+term/i)?.[1] || 8);
    const answer = start + step * (target - 1);
    return [
      {
        say: `This pattern is like stepping stones. The first stone says ${start}. Every jump adds ${step}. The question is not asking for the next stone we can see. It asks for stone number ${target}.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Pattern stepping stones", size: 34 },
          ...stoneCommands(start, step, Math.min(target, 8)),
          { type: "text", x: 86, y: 430, text: `Count the stones, not just the gaps.`, size: 30, max: 840 }
        ]
      },
      {
        say: `Watch the count. Stone 1 is ${start}. Then we jump ${step} seven times to reach stone 8. That lands on ${answer}.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Count the term numbers", size: 34 },
          { type: "text", x: 108, y: 160, text: `Term ${target} = ${start} + ${step} x ${target - 1}`, size: 34 },
          { type: "line", x1: 108, y1: 194, x2: 670, y2: 194 },
          { type: "text", x: 108, y: 272, text: `${start} + ${step * (target - 1)} = ${answer}`, size: 44 },
          { type: "circle", x: 402, y: 260, r: 76 }
        ]
      },
      checkStep(index, `For a term number, count the first term before counting jumps.`)
    ];
  }

  function multiStepStorySteps(example, narrative, index) {
    const nums = numbersFrom(example?.prompt);
    const rows = nums[0] || 18;
    const seats = nums[1] || 16;
    const empty = nums[2] || 73;
    const total = rows * seats;
    const seated = total - empty;
    return [
      {
        say: `This is a theatre picture. First we build the theatre: ${rows} rows, with ${seats} seats in each row. So before anyone leaves a seat empty, the theatre has ${total} seats.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Build the theatre first", size: 34 },
          { type: "box", x: 98, y: 142, w: 360, h: 190 },
          { type: "line", x1: 98, y1: 190, x2: 458, y2: 190 },
          { type: "line", x1: 98, y1: 238, x2: 458, y2: 238 },
          { type: "line", x1: 98, y1: 286, x2: 458, y2: 286 },
          { type: "text", x: 548, y: 190, text: `${rows} rows x ${seats} seats`, size: 32 },
          { type: "text", x: 548, y: 270, text: `= ${total} seats`, size: 38 }
        ]
      },
      {
        say: `Now ${empty} seats are empty. I rub those away from the full theatre, not from one row. ${total} minus ${empty} leaves ${seated} people seated.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Now remove the empty seats", size: 34 },
          { type: "text", x: 108, y: 160, text: `${total} seats altogether`, size: 34 },
          { type: "text", x: 108, y: 230, text: `- ${empty} empty seats`, size: 34 },
          { type: "line", x1: 108, y1: 260, x2: 560, y2: 260 },
          { type: "text", x: 108, y: 340, text: `${seated} people seated`, size: 42 }
        ]
      },
      checkStep(index, `Build the full theatre first, then remove the empty seats.`)
    ];
  }

  function subtractionStorySteps(example, narrative, index) {
    return [
      {
        say: `Imagine a theatre with 723 empty seats. Two waves of people book seats. If we only remove one wave, the theatre picture is wrong, so let's put both waves on the board.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "The theatre seats", size: 34 },
          { type: "box", x: 86, y: 140, w: 280, h: 130 },
          { type: "text", x: 134, y: 216, text: "723 seats", size: 32 },
          { type: "arrow", x1: 410, y1: 172, x2: 610, y2: 172 },
          { type: "text", x: 444, y: 144, text: "246 booked", size: 24 },
          { type: "arrow", x1: 410, y1: 238, x2: 610, y2: 238 },
          { type: "text", x: 444, y: 286, text: "157 booked", size: 24 }
        ]
      },
      {
        say: `Now I bundle the two booked groups together first. Two hundred forty-six plus one hundred fifty-seven is four hundred three. Then I take that away from 723. That leaves 320 seats.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Both groups leave the seat pile", size: 34 },
          { type: "text", x: 102, y: 160, text: "246 + 157 = 403 booked", size: 34 },
          { type: "line", x1: 100, y1: 190, x2: 640, y2: 190 },
          { type: "text", x: 102, y: 270, text: "723 - 403 = 320 empty", size: 40 },
          { type: "circle", x: 620, y: 258, r: 70 }
        ]
      },
      checkStep(index, `When two groups are used, bundle them before subtracting.`)
    ];
  }

  function logicStorySteps(example, narrative, index) {
    return [
      {
        say: `This is a detective question. The word must is very strict. It does not ask what might be true. It asks what cannot escape the clues.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Detective word: MUST", size: 36 },
          { type: "box", x: 90, y: 140, w: 470, h: 90 },
          { type: "text", x: 122, y: 198, text: "All glims are blue", size: 30 },
          { type: "box", x: 90, y: 282, w: 470, h: 90 },
          { type: "text", x: 122, y: 340, text: "Some blue things are round", size: 28 }
        ]
      },
      {
        say: `Watch this. The first clue ties every glim to blue. But the second clue only says some blue things are round. It never says glims are round. So the only safe answer is: all glims are blue.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "What is guaranteed?", size: 34 },
          { type: "circle", x: 230, y: 220, r: 112 },
          { type: "text", x: 190, y: 228, text: "blue", size: 28 },
          { type: "circle", x: 230, y: 220, r: 48 },
          { type: "text", x: 198, y: 286, text: "glims", size: 22 },
          { type: "text", x: 440, y: 210, text: "safe answer:", size: 28 },
          { type: "text", x: 440, y: 270, text: "All glims are blue.", size: 34, max: 620 }
        ]
      },
      checkStep(index, `Must means guaranteed by the clues.`)
    ];
  }

  function geometryStorySteps(example, narrative, index) {
    const prompt = String(example?.prompt || "");
    const nums = numbersFrom(prompt);
    if (/perimeter of/i.test(prompt) && /length/i.test(prompt) && /width/i.test(prompt)) {
      const perimeter = nums[0] || 30;
      const length = nums[1] || 10;
      const halfPerimeter = perimeter / 2;
      const width = halfPerimeter - length;
      return [
        {
          say: `This rectangle question is a fence walk. The whole fence is ${perimeter} centimetres. A rectangle has two lengths and two widths, so I first fold the fence in half.`,
          commands: [
            { type: "text", x: 52, y: 64, text: "Rectangle fence walk", size: 34 },
            { type: "box", x: 110, y: 148, w: 360, h: 190 },
            { type: "text", x: 218, y: 130, text: `${length} cm`, size: 26 },
            { type: "text", x: 530, y: 190, text: `perimeter ${perimeter} cm`, size: 32 },
            { type: "arrow", x1: 620, y1: 226, x2: 620, y2: 304 },
            { type: "text", x: 520, y: 360, text: `half fence = ${perimeter} / 2 = ${halfPerimeter}`, size: 31, max: 680 }
          ]
        },
        {
          say: `Half the fence is one length plus one width. So ${halfPerimeter} is ${length} plus the missing width. That means the width is ${width} centimetres.`,
          commands: [
            { type: "erase" },
            { type: "text", x: 52, y: 64, text: "One length plus one width", size: 34 },
            { type: "text", x: 110, y: 162, text: `${length} + width = ${halfPerimeter}`, size: 40 },
            { type: "line", x1: 110, y1: 198, x2: 600, y2: 198 },
            { type: "text", x: 110, y: 286, text: `${halfPerimeter} - ${length} = ${width}`, size: 44 },
            { type: "circle", x: 498, y: 274, r: 72 },
            { type: "text", x: 602, y: 286, text: "cm wide", size: 30 }
          ]
        },
        checkStep(index, `For rectangle perimeter, halve the fence first: length plus width.`)
      ];
    }
    return [
      {
        say: `Here the square is trying to copy the rectangle's fence. Not the same shape, not the same sides. Just the same walk all the way around.`,
        commands: [
          { type: "text", x: 52, y: 64, text: "Same fence, different shape", size: 34 },
          { type: "box", x: 100, y: 148, w: 340, h: 190 },
          { type: "text", x: 210, y: 126, text: "9", size: 26 },
          { type: "text", x: 62, y: 246, text: "5", size: 26 },
          { type: "text", x: 520, y: 210, text: "walk around: 9 + 5 + 9 + 5", size: 30, max: 620 }
        ]
      },
      {
        say: `The rectangle's fence is 28 centimetres. A square has four equal sides, so I share that fence into four equal pieces. Twenty-eight divided by four is seven.`,
        commands: [
          { type: "erase" },
          { type: "text", x: 52, y: 64, text: "Share the fence into 4 equal sides", size: 34 },
          { type: "text", x: 110, y: 150, text: "9 + 5 + 9 + 5 = 28", size: 34 },
          { type: "box", x: 210, y: 240, w: 220, h: 220 },
          { type: "text", x: 286, y: 226, text: "7", size: 28 },
          { type: "text", x: 102, y: 540, text: "28 / 4 = 7 cm", size: 42 }
        ]
      },
      checkStep(index, `Same perimeter means same outside walk, not same side lengths.`)
    ];
  }

  function checkStep(index, closeLine) {
    return {
      say: `Tiny check. Say this back in your own words: ${closeLine} Nice. That is the bit we want your brain to remember next time.`,
      commands: [
        { type: "erase" },
        { type: "text", x: 54, y: 72, text: "Tiny check", size: 34 },
        { type: "box", x: 90, y: 150, w: 900, h: 146 },
        { type: "text", x: 124, y: 210, text: closeLine, size: 28, max: 820 },
        { type: "text", x: 126, y: 380, text: index < 2 ? "Ready for the next little lesson." : "That is a strong finish.", size: 30, max: 780 }
      ],
      mobileCommands: [
        { type: "erase" },
        { type: "text", fixed: true, x: 24, y: 40, text: "Tiny check", size: 22 },
        { type: "box", fixed: true, x: 30, y: 92, w: 306, h: 128 },
        { type: "text", fixed: true, x: 46, y: 130, text: shorten(closeLine, 94), size: 16, max: 276 },
        { type: "text", fixed: true, x: 44, y: 288, text: "Say it back once.", size: 18 }
      ]
    };
  }

  function numbersFrom(text) {
    return String(text || "").match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  }

  function moneyAmountsFrom(text) {
    return String(text || "").match(/\$?\d+(?:\.\d+)?/g)?.map((item) => Number(item.replace("$", ""))) || [];
  }

  function roundMoney(value) {
    return Math.round(value * 100) / 100;
  }

  function money(value) {
    return `$${roundMoney(value).toFixed(2).replace(/\.00$/, "")}`;
  }

  function addMinutes(hour, minute, add) {
    const total = hour * 60 + minute + add;
    return { hour: Math.floor(total / 60), minute: total % 60 };
  }

  function formatTime(hour, minute) {
    const normalizedHour = ((hour - 1) % 12) + 1;
    return `${normalizedHour}:${String(minute).padStart(2, "0")}`;
  }

  function tableRowCommands(count, x, y, label) {
    const commands = [];
    const cols = Math.min(4, count);
    for (let i = 0; i < count; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const px = x + col * 142;
      const py = y + row * 92;
      commands.push({ type: "box", x: px, y: py, w: 106, h: 58 });
      commands.push({ type: "text", x: px + 24, y: py + 38, text: label ? `T${i + 1}: ${label}` : `T${i + 1}`, size: 17 });
    }
    return commands;
  }

  function barCommands(values, low, high) {
    const max = Math.max(...values);
    const labels = ["3A", "3B", "3C", "3D"];
    return values.flatMap((value, index) => {
      const h = 90 + (value / max) * 180;
      const x = 108 + index * 172;
      const y = 350 - h;
      const commands = [
        { type: "box", x, y, w: 88, h },
        { type: "text", x: x + 8, y: y - 14, text: String(value), size: 22 },
        { type: "text", x: x + 18, y: 390, text: labels[index] || `C${index + 1}`, size: 22 }
      ];
      if (value === low || value === high) commands.push({ type: "circle", x: x + 44, y: y - 24, r: 42 });
      return commands;
    });
  }

  function stoneCommands(start, step, count) {
    return Array.from({ length: count }, (_, index) => {
      const x = 92 + index * 118;
      const value = start + step * index;
      return [
        { type: "circle", x, y: 220, r: 42 },
        { type: "text", x: x - 16, y: 228, text: String(value), size: 22 },
        { type: "text", x: x - 22, y: 298, text: `#${index + 1}`, size: 18 },
        ...(index < count - 1 ? [{ type: "arrow", x1: x + 44, y1: 220, x2: x + 74, y2: 220 }] : [])
      ];
    }).flat();
  }

  function mobileThinkingCommands(skill) {
    const lower = String(skill).toLowerCase();
    if (lower.includes("division")) {
      return [
        { type: "erase" },
        { type: "text", fixed: true, x: 24, y: 38, text: "Share, then add", size: 22 },
        { type: "text", fixed: true, x: 44, y: 104, text: "104 / 8 = 13", size: 18 },
        { type: "arrow", fixed: true, x1: 116, y1: 130, x2: 116, y2: 174 },
        { type: "text", fixed: true, x: 44, y: 210, text: "13 + 6 = 19", size: 18 },
        { type: "box", fixed: true, x: 36, y: 246, w: 260, h: 58 },
        { type: "text", fixed: true, x: 58, y: 282, text: "each table gets 19", size: 16 }
      ];
    }
    if (lower.includes("data")) {
      return [
        { type: "erase" },
        { type: "text", fixed: true, x: 24, y: 38, text: "Range", size: 22 },
        { type: "text", fixed: true, x: 46, y: 106, text: "biggest 152", size: 17 },
        { type: "text", fixed: true, x: 46, y: 154, text: "smallest 119", size: 17 },
        { type: "line", fixed: true, x1: 46, y1: 176, x2: 220, y2: 176 },
        { type: "text", fixed: true, x: 46, y: 224, text: "152 - 119 = 33", size: 18 }
      ];
    }
    if (lower.includes("inference")) {
      return [
        { type: "erase" },
        { type: "text", fixed: true, x: 24, y: 38, text: "Inference", size: 22 },
        { type: "box", fixed: true, x: 32, y: 82, w: 126, h: 68 },
        { type: "text", fixed: true, x: 54, y: 122, text: "text clue", size: 15 },
        { type: "arrow", fixed: true, x1: 164, y1: 116, x2: 204, y2: 116 },
        { type: "box", fixed: true, x: 210, y: 82, w: 126, h: 68 },
        { type: "text", fixed: true, x: 226, y: 122, text: "thinking", size: 15 },
        { type: "arrow", fixed: true, x1: 272, y1: 154, x2: 272, y2: 210 },
        { type: "circle", fixed: true, x: 272, y: 266, r: 42 },
        { type: "text", fixed: true, x: 242, y: 272, text: "answer", size: 14 }
      ];
    }
    return [
      { type: "erase" },
      { type: "text", fixed: true, x: 24, y: 38, text: "Thinking path", size: 22 },
      { type: "box", fixed: true, x: 34, y: 86, w: 294, h: 54 },
      { type: "text", fixed: true, x: 52, y: 120, text: "1. Find the clue", size: 15 },
      { type: "box", fixed: true, x: 34, y: 160, w: 294, h: 54 },
      { type: "text", fixed: true, x: 52, y: 194, text: "2. Name the move", size: 15 },
      { type: "box", fixed: true, x: 34, y: 234, w: 294, h: 54 },
      { type: "text", fixed: true, x: 52, y: 268, text: "3. Answer and check", size: 15 }
    ];
  }

  function thinkingCommands(skill) {
    const lower = String(skill).toLowerCase();
    if (lower.includes("division")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Division story: one table first", size: 32 },
        { type: "box", x: 92, y: 150, w: 240, h: 88 }, { type: "text", x: 124, y: 204, text: "104 shared", size: 24 },
        { type: "arrow", x1: 340, y1: 194, x2: 520, y2: 194 },
        { type: "box", x: 536, y: 150, w: 240, h: 88 }, { type: "text", x: 580, y: 204, text: "8 tables", size: 24 },
        { type: "text", x: 116, y: 314, text: "104 / 8 = 13", size: 30 },
        { type: "arrow", x1: 356, y1: 306, x2: 514, y2: 306 },
        { type: "text", x: 556, y: 314, text: "13 + 6 border = 19", size: 30 }
      ];
    }
    if (lower.includes("data")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Data: range", size: 32 },
        { type: "text", x: 100, y: 154, text: "3A 128   3B 146   3C 119   3D 152", size: 26 },
        { type: "circle", x: 276, y: 148, r: 42 }, { type: "text", x: 248, y: 226, text: "smallest", size: 22 },
        { type: "circle", x: 626, y: 148, r: 42 }, { type: "text", x: 600, y: 226, text: "biggest", size: 22 },
        { type: "line", x1: 118, y1: 294, x2: 700, y2: 294 },
        { type: "text", x: 126, y: 352, text: "range = biggest - smallest = 152 - 119 = 33", size: 28, max: 980 }
      ];
    }
    if (lower.includes("subtraction")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Subtraction: what is left?", size: 32 },
        { type: "text", x: 108, y: 156, text: "723 seats", size: 28 },
        { type: "text", x: 108, y: 222, text: "246 + 157 = 403 booked", size: 28 },
        { type: "line", x1: 108, y1: 250, x2: 620, y2: 250 },
        { type: "text", x: 108, y: 318, text: "723 - 403 = 320 empty", size: 32 }
      ];
    }
    if (lower.includes("deduction") || lower.includes("logic")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Logic: must be true", size: 32 },
        { type: "box", x: 90, y: 140, w: 430, h: 88 }, { type: "text", x: 118, y: 194, text: "All glims are blue", size: 25 },
        { type: "box", x: 90, y: 270, w: 430, h: 88 }, { type: "text", x: 118, y: 324, text: "Some blue things are round", size: 25 },
        { type: "arrow", x1: 550, y1: 208, x2: 720, y2: 264 },
        { type: "text", x: 742, y: 272, text: "Only the first clue is guaranteed.", size: 26, max: 420 }
      ];
    }
    if (lower.includes("geometry")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Geometry: same perimeter", size: 32 },
        { type: "box", x: 92, y: 150, w: 300, h: 168 }, { type: "text", x: 148, y: 348, text: "9 cm by 5 cm", size: 24 },
        { type: "text", x: 470, y: 180, text: "perimeter = 9 + 5 + 9 + 5 = 28", size: 26, max: 700 },
        { type: "arrow", x1: 640, y1: 228, x2: 640, y2: 300 },
        { type: "text", x: 470, y: 360, text: "square side = 28 / 4 = 7 cm", size: 30 }
      ];
    }
    if (lower.includes("text structure")) {
      return [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Text structure: argument", size: 32 },
        { type: "box", x: 84, y: 150, w: 260, h: 82 }, { type: "text", x: 130, y: 202, text: "claim", size: 26 },
        { type: "arrow", x1: 354, y1: 192, x2: 450, y2: 192 },
        { type: "box", x: 462, y: 150, w: 260, h: 82 }, { type: "text", x: 548, y: 202, text: "evidence", size: 26 },
        { type: "arrow", x1: 732, y1: 192, x2: 828, y2: 192 },
        { type: "box", x: 840, y: 150, w: 260, h: 82 }, { type: "text", x: 890, y: 202, text: "judgement", size: 26 },
        { type: "text", x: 100, y: 334, text: "That is proving a point, so it is an argument.", size: 28, max: 860 }
      ];
    }
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
      { type: "text", x: 102, y: 372, text: "Use this same path on the next question.", size: 24, max: 820 }
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
    const activeModule = plan.modules[lessonState.moduleIndex] || plan.modules[0];
    el.planSummary.textContent = activeModule?.example?.prompt
      ? "One missed question is on the board."
      : "Pick a lesson or press Start.";
    el.moduleList.innerHTML = plan.modules.map((module, index) => `
      <button class="module-button ${index === lessonState.moduleIndex ? "active" : ""}" type="button" data-module="${index}">
        <strong>${escapeHtml(module.title)}</strong>
        <span>${escapeHtml(module.section || "Mixed")} ${module.example?.correct === false ? "missed" : "slow"}</span>
      </button>
    `).join("");
    el.evidenceList.innerHTML = `<ul>${plan.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    renderMissedQuestion();
    renderMemory();
    el.moduleList.querySelectorAll("[data-module]").forEach((button) => {
      button.addEventListener("click", () => selectModule(Number(button.dataset.module)));
    });
  }

  function renderMissedQuestion() {
    const example = currentModule()?.examples?.find((item) => item.correct === false) || currentModule()?.example;
    if (!example?.prompt) {
      el.missedQuestionStrip.hidden = true;
      el.missedQuestionText.textContent = "";
      return;
    }
    const chosen = example.selectedText ? ` Chose: ${example.selectedText}.` : "";
    const correct = example.correctText ? ` Answer: ${example.correctText}.` : "";
    el.missedQuestionText.textContent = `${example.prompt}${chosen}${correct}`;
    el.missedQuestionStrip.hidden = false;
  }

  function selectModule(index) {
    lessonState.moduleIndex = index;
    lessonState.stepIndex = 0;
    lessonState.lastStep = null;
    lessonState.completed = false;
    lessonState.playing = false;
    lessonState.paused = false;
    clearAutoTimer();
    cancelTeacherVoice();
    renderPlan();
    clearBoard();
    drawWelcomeBoard();
    el.caption.textContent = `Ready for ${lessonState.plan.modules[index].title}. Press Start lesson.`;
    updateLessonControl();
  }

  function handleLessonControl() {
    if (lessonState.completed) {
      lessonState.moduleIndex = 0;
      lessonState.stepIndex = 0;
      lessonState.completed = false;
      lessonState.lastStep = null;
      renderPlan();
      clearBoard();
      drawWelcomeBoard();
    }

    if (!lessonState.playing) {
      lessonState.playing = true;
      lessonState.paused = false;
      updateLessonControl();
      playCurrentStep();
      return;
    }

    if (lessonState.paused) {
      lessonState.paused = false;
      updateLessonControl();
      playCurrentStep();
      return;
    }

    pauseLesson("Lesson paused. Press Continue when you are ready.");
  }

  function pauseLesson(message) {
    lessonState.paused = true;
    clearAutoTimer();
    cancelTeacherVoice();
    lessonState.animationToken += 1;
    if (message) el.caption.textContent = message;
    updateLessonControl();
  }

  function updateLessonControl() {
    if (lessonState.completed) {
      el.start.textContent = "Restart lesson";
    } else if (!lessonState.playing) {
      el.start.textContent = "Start lesson";
    } else if (lessonState.paused) {
      el.start.textContent = "Continue";
    } else {
      el.start.textContent = "Pause";
    }
  }

  function playCurrentStep() {
    const step = currentStep();
    if (!step || lessonState.paused) return;
    clearAutoTimer();
    lessonState.lastStep = step;
    clearBoard();
    animateCommands(commandsForBoard(step));
    teach(step.say, () => scheduleAutoAdvance(step.say));
  }

  function playNextStep() {
    const module = currentModule();
    if (!module) return;
    if (lessonState.paused) return;
    if (lessonState.stepIndex < module.steps.length - 1) {
      lessonState.stepIndex += 1;
    } else if (lessonState.moduleIndex < lessonState.plan.modules.length - 1) {
      lessonState.moduleIndex += 1;
      lessonState.stepIndex = 0;
      renderPlan();
    } else {
      lessonState.playing = false;
      lessonState.completed = true;
      updateLessonControl();
      teach("That is today's lesson. We can stop here or restart from the beginning.");
      lessonState.memory.push("Completed today's short blackboard session.");
      renderMemory();
      return;
    }
    playCurrentStep();
  }

  function scheduleAutoAdvance(spokenText) {
    if (!lessonState.playing || lessonState.paused || lessonState.completed) return;
    const delay = Math.min(3600, Math.max(1400, String(spokenText || "").length * 18));
    clearAutoTimer();
    lessonState.autoTimer = setTimeout(() => {
      lessonState.autoTimer = null;
      playNextStep();
    }, delay);
  }

  function clearAutoTimer() {
    if (lessonState.autoTimer) clearTimeout(lessonState.autoTimer);
    lessonState.autoTimer = null;
  }

  function currentModule() {
    return lessonState.plan?.modules?.[lessonState.moduleIndex];
  }

  function currentStep() {
    return currentModule()?.steps?.[lessonState.stepIndex];
  }

  async function handleQuestion(event) {
    event.preventDefault();
    const question = el.question.value.trim();
    if (!question) return;
    pauseLesson();
    const savedPosition = { moduleIndex: lessonState.moduleIndex, stepIndex: lessonState.stepIndex };
    lessonState.interruptedFrom = savedPosition;
    lessonState.memory.push(`Open question: ${question}`);
    lessonState.transcript.push({ role: "student", text: question });
    renderMemory();
    const answer = localTeacherAnswer(question, currentModule());
    el.apiStatus.textContent = "Answering now; AI follow-up checking...";
    el.ask.disabled = true;
    animateCommands(answer.commands);
    teach(answer.say, () => {
      lessonState.moduleIndex = savedPosition.moduleIndex;
      lessonState.stepIndex = savedPosition.stepIndex;
      lessonState.memory.push(`Returned to ${currentModule()?.title || "the lesson"} after the interruption.`);
      renderMemory();
    });
    enrichInterruptionWithAI(question, savedPosition);
    el.question.value = "";
    el.ask.disabled = false;
  }

  async function enrichInterruptionWithAI(question, savedPosition) {
    const localStaticPreview = ["127.0.0.1", "localhost", ""].includes(window.location.hostname) && !window.__blackboardAllowLocalAI;
    if (localStaticPreview) {
      el.apiStatus.textContent = "Local preview: AI follow-up disabled";
      return;
    }
    const module = currentModule();
    const payload = {
      question,
      studentName: lessonState.profile?.name || "Aarin",
      age: 8,
      module: summarizeModuleForAI(module),
      currentStep: currentStep()?.say || "",
      transcript: lessonState.transcript.slice(-8)
    };
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3200);
      const response = await fetch("/api/blackboard-teacher", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`AI unavailable: ${response.status}`);
      const body = await response.json();
      if (!body?.teacherText) throw new Error("AI response missing teacherText");
      if (lessonState.moduleIndex !== savedPosition.moduleIndex || lessonState.stepIndex !== savedPosition.stepIndex) {
        return;
      }
      el.apiStatus.textContent = `ChatGPT follow-up ready in ${body.latencyMs || "?"}ms`;
      lessonState.memory.push("AI follow-up added to the interruption.");
      renderMemory();
      animateCommands(aiCommands(body));
      teach(body.teacherText);
    } catch (error) {
      el.apiStatus.textContent = error.name === "AbortError"
        ? "AI follow-up skipped to keep lesson fast"
        : "Local teaching used; AI not needed";
    }
  }

  function toggleMic() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      el.apiStatus.textContent = "Mic not supported here; type the question instead";
      el.question.focus();
      return;
    }
    if (!lessonState.recognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-AU";
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.onstart = () => {
        lessonState.listening = true;
        el.mic.classList.add("listening");
        el.mic.textContent = "Listening...";
        el.apiStatus.textContent = "Listening for the interruption";
      };
      recognition.onresult = (event) => {
        const text = Array.from(event.results).map((result) => result[0]?.transcript || "").join(" ").trim();
        if (text) el.question.value = text;
      };
      recognition.onend = () => {
        lessonState.listening = false;
        el.mic.classList.remove("listening");
        el.mic.textContent = "Speak";
        el.apiStatus.textContent = el.question.value.trim() ? "Speech captured; press Ask" : "Mic stopped";
      };
      recognition.onerror = () => {
        lessonState.listening = false;
        el.mic.classList.remove("listening");
        el.mic.textContent = "Speak";
        el.apiStatus.textContent = "Mic had trouble; type the question";
      };
      lessonState.recognition = recognition;
    }
    if (lessonState.listening) {
      lessonState.recognition.stop();
    } else {
      pauseLesson("Listening. Ask your question, then press Ask.");
      lessonState.recognition.start();
    }
  }

  function summarizeModuleForAI(module) {
    return {
      title: module?.title || "",
      section: module?.section || "",
      objective: module?.objective || "",
      narrative: module?.narrative?.short || "",
      examples: (module?.examples || []).slice(0, 3)
    };
  }

  function aiCommands(body) {
    const text = body.boardText || body.teacherText || "Use the clue, then make the move.";
    if (isNarrowBoard()) {
      return [
        { type: "erase" },
        { type: "text", fixed: true, x: 24, y: 38, text: "Teacher answer", size: 22 },
        { type: "box", fixed: true, x: 28, y: 76, w: 306, h: 128 },
        { type: "text", fixed: true, x: 44, y: 108, text: shorten(text, 120), size: 14, max: 276 },
        { type: "text", fixed: true, x: 36, y: 250, text: shorten(body.checkQuestion || "What would you do first?", 78), size: 17, max: 298 }
      ];
    }
    return [
      { type: "erase" },
      { type: "text", x: 52, y: 70, text: "Teacher answer", size: 34 },
      { type: "box", x: 62, y: 126, w: 980, h: 170 },
      { type: "text", x: 92, y: 176, text: shorten(text, 210), size: 24, max: 880 },
      { type: "line", x1: 92, y1: 352, x2: 780, y2: 352 },
      { type: "text", x: 96, y: 402, text: shorten(body.checkQuestion || "What would you do first?", 130), size: 26, max: 820 }
    ];
  }

  function localTeacherAnswer(question, module) {
    const lower = question.toLowerCase();
    const example = module?.examples?.[0];
    if (lower.includes("example")) {
      return {
        say: example
          ? `Let's use your saved example. The question was: ${example.prompt} The best answer was ${example.correctText || "the one supported by the evidence"}. I want you to notice the exact clue before choosing.`
          : `Let's use a tiny example from this skill. I will draw the question job, the evidence, and then the answer.`,
        commands: [
          { type: "erase" }, { type: "text", x: 54, y: 72, text: "Saved example", size: 34 },
          { type: "box", x: 70, y: 138, w: 980, h: 140 },
          { type: "text", x: 96, y: 184, text: example ? shorten(example.prompt, 140) : samplePromptFor(module?.title || ""), size: 22, max: 900 },
          { type: "text", x: 96, y: 244, text: example?.correctText ? `Best answer: ${shorten(example.correctText, 64)}` : "Best answer: prove it from the question.", size: 21, max: 780 },
          { type: "arrow", x1: 180, y1: 360, x2: 420, y2: 360 },
          { type: "arrow", x1: 560, y1: 360, x2: 800, y2: 360 },
          { type: "text", x: 96, y: 410, text: "question asks", size: 22 },
          { type: "text", x: 456, y: 410, text: "evidence says", size: 22 },
          { type: "text", x: 836, y: 410, text: "answer fits", size: 22 }
        ]
      };
    }
    if (lower.includes("why")) {
      return {
        say: example
          ? `Because the saved question was not asking for a nice-sounding answer. It was asking for the answer that the words or numbers prove. I would pause, point to the proof, and only then choose.`
          : `Because this skill repeats in different-looking questions. If you name what the question asks first, the answer has less room to wobble.`,
        commands: [
          { type: "erase" }, { type: "text", x: 54, y: 72, text: "Why this answer changed", size: 34 },
          { type: "box", x: 92, y: 146, w: 320, h: 96 }, { type: "text", x: 126, y: 202, text: "not: sounds right", size: 24 },
          { type: "arrow", x1: 430, y1: 194, x2: 560, y2: 194 },
          { type: "box", x: 578, y: 146, w: 360, h: 96 }, { type: "text", x: 620, y: 202, text: "yes: proof matches", size: 24 },
          { type: "text", x: 96, y: 326, text: module?.narrative?.thinkAloud || "What words or numbers prove it?", size: 26, max: 900 }
        ]
      };
    }
    return {
      say: `Yes. For this lesson, the first step is: ${stripTrailingPunctuation(module?.objective || "find the clue, name the move, then answer")}. I would say that step before touching the answer choices.`,
      commands: [
        { type: "erase" }, { type: "text", x: 54, y: 72, text: "Simpler version", size: 34 },
        { type: "text", x: 82, y: 164, text: `1. ${shorten(module?.objective || "Find the clue.", 70)}`, size: 28, max: 880 },
        { type: "text", x: 82, y: 228, text: "2. Point to the proof.", size: 28 },
        { type: "text", x: 82, y: 292, text: "3. Choose the answer that fits.", size: 28 },
        { type: "line", x1: 82, y1: 334, x2: 560, y2: 334 },
        { type: "text", x: 92, y: 384, text: "Say the first step.", size: 30 }
      ]
    };
  }

  function animateCommands(commands) {
    const queue = [...commands];
    const token = ++lessonState.animationToken;
    const run = () => {
      if (token !== lessonState.animationToken) return;
      const command = queue.shift();
      if (!command) return;
      drawCommand(command, true);
      setTimeout(run, command.type === "erase" ? 180 : 260 / lessonState.speed);
    };
    run();
  }

  function renderStaticStep(step) {
    clearBoard();
    commandsForBoard(step).forEach((command) => drawCommand(command, false));
  }

  function commandsForBoard(step) {
    if (isNarrowBoard() && Array.isArray(step.mobileCommands)) return step.mobileCommands;
    return step.commands || [];
  }

  function isNarrowBoard() {
    return el.canvas.getBoundingClientRect().width < 560;
  }

  function clearBoard(options = {}) {
    if (!options.keepAnimation) lessonState.animationToken += 1;
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
    drawCommand({ type: "box", x: 60, y: 180, w: 500, h: 142 }, false);
    drawCommand({ type: "text", x: 88, y: 224, text: "1. Teach with chalk", size: 25 }, false);
    drawCommand({ type: "text", x: 88, y: 278, text: "2. Pause for questions", size: 25 }, false);
    drawCommand({ type: "arrow", x1: 590, y1: 250, x2: 760, y2: 250 }, false);
    drawCommand({ type: "circle", x: 850, y: 250, r: 72 }, false);
    drawCommand({ type: "text", x: 807, y: 258, text: "learn", size: 26 }, false);
  }

  function drawCommand(command, jitter) {
    if (command.type === "erase") {
      clearBoard({ keepAnimation: true });
      return;
    }
    const scale = command.fixed ? 1 : boardScale();
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
    el.caption.hidden = !lessonState.captionsVisible;
    lessonState.transcript.push({ role: "teacher", text });
    cancelTeacherVoice();
    const token = ++lessonState.voiceToken;
    if (canUseCloudVoice() && lessonState.cloudVoiceAvailable) {
      playOpenAiVoice(text, token, after);
      return;
    }
    playBrowserVoice(text, token, after);
  }

  async function playOpenAiVoice(text, token, after) {
    try {
      const audioUrl = await getVoiceUrl(text, token);
      if (token !== lessonState.voiceToken || lessonState.paused) return;
      const audio = new Audio(audioUrl);
      audio.preload = "auto";
      audio.volume = 0.95;
      lessonState.currentAudio = audio;
      audio.onended = () => {
        if (lessonState.currentAudio === audio) lessonState.currentAudio = null;
        if (token === lessonState.voiceToken && !lessonState.paused) after?.();
      };
      audio.onerror = () => {
        if (lessonState.currentAudio === audio) lessonState.currentAudio = null;
        playBrowserVoice(text, token, after);
      };
      el.apiStatus.textContent = "AI teacher voice speaking";
      await audio.play();
    } catch {
      if (token !== lessonState.voiceToken || lessonState.paused) return;
      lessonState.cloudVoiceAvailable = false;
      el.apiStatus.textContent = "Browser voice fallback";
      playBrowserVoice(text, token, after);
    }
  }

  async function getVoiceUrl(text, token) {
    const cacheKey = text.slice(0, 900);
    if (lessonState.voiceCache.has(cacheKey)) return lessonState.voiceCache.get(cacheKey);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const response = await fetch("/api/blackboard-voice", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: cacheKey }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (token !== lessonState.voiceToken) throw new Error("stale voice request");
    if (!response.ok) throw new Error(`voice unavailable: ${response.status}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    lessonState.voiceCache.set(cacheKey, url);
    return url;
  }

  function playBrowserVoice(text, token, after) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = lessonState.speed === 1 ? 0.92 : 0.78;
      utterance.pitch = 0.92;
      utterance.volume = 0.95;
      utterance.voice = chooseTeacherVoice();
      lessonState.currentUtterance = utterance;
      utterance.onend = () => {
        if (lessonState.currentUtterance === utterance) lessonState.currentUtterance = null;
        if (token === lessonState.voiceToken && !lessonState.paused) after?.();
      };
      utterance.onerror = () => {
        if (lessonState.currentUtterance === utterance) lessonState.currentUtterance = null;
        if (token === lessonState.voiceToken && !lessonState.paused) setTimeout(() => after?.(), 800);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        if (token === lessonState.voiceToken && !lessonState.paused) after?.();
      }, Math.min(2400, 900 + text.length * 22));
    }
  }

  function cancelTeacherVoice() {
    lessonState.voiceToken += 1;
    if (lessonState.currentAudio) {
      lessonState.currentAudio.pause();
      lessonState.currentAudio = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    lessonState.currentUtterance = null;
  }

  function canUseCloudVoice() {
    return !["127.0.0.1", "localhost", ""].includes(window.location.hostname) || window.__blackboardAllowLocalAI;
  }

  function prepareVoices() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      lessonState.voicesReady = true;
    };
  }

  function chooseTeacherVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((voice) => /Natural|Neural|Premium|Daniel|Ryan|George|David|Guy/i.test(voice.name) && /en/i.test(voice.lang))
      || voices.find((voice) => /en-AU|en-GB|en-US/i.test(voice.lang))
      || voices.find((voice) => /English/i.test(voice.lang))
      || null;
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
      narratives: lessonState.plan?.modules?.map((module) => module.narrative?.short) || [],
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
