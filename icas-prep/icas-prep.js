(function () {
  "use strict";

  const bank = window.BrightQuestIcasBank;
  const main = document.querySelector("#icasMain");
  const backButton = document.querySelector("#appBackButton");
  const profileBadge = document.querySelector("#profileBadge");
  const toast = document.querySelector("#icasToast");
  const modal = document.querySelector("#confirmModal");
  const confirmAction = document.querySelector("#confirmAction");
  const storageKey = "brightQuestProfilesV2";
  const activeProfileKey = "brightQuestActiveProfile";
  const draftKey = "brightQuestIcasDraftsV1";
  let modalAction = null;
  let timerId = null;
  let toastId = null;

  const state = {
    view: "home",
    subject: "",
    test: null,
    index: 0,
    answers: {},
    flagged: new Set(),
    startedAt: 0,
    pausedSeconds: 0,
    result: null,
    profile: loadActiveProfile()
  };

  if (!bank?.tests?.length) {
    main.innerHTML = `<section class="result-panel"><h1>Challenge data did not load</h1><p>Return to Bright Quest and try again.</p><a class="button button-primary" href="../">Dashboard</a></section>`;
    return;
  }

  profileBadge.textContent = state.profile?.name ? `${state.profile.name}'s practice` : "Practice profile";
  history.replaceState({ view: "home" }, "", "#home");
  render();
  if (state.profile?.id) window.queueMicrotask(() => syncProfile(state.profile));

  backButton.addEventListener("click", handleBack);
  window.addEventListener("popstate", (event) => {
    if (state.view === "runner") saveDraft();
    const route = event.state || routeFromHash();
    applyRoute(route);
  });
  window.addEventListener("beforeunload", () => {
    if (state.view === "runner") saveDraft();
  });
  modal.querySelectorAll("[data-modal-cancel]").forEach((button) => button.addEventListener("click", closeModal));
  confirmAction.addEventListener("click", () => {
    const action = modalAction;
    closeModal();
    action?.();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  function render() {
    stopTimer();
    if (state.view === "home") renderHome();
    if (state.view === "subject") renderSubject();
    if (state.view === "runner") renderRunner();
    if (state.view === "result") renderResult();
    main.focus({ preventScroll: true });
  }

  function renderHome() {
    const maths = subjectSummary("maths");
    const spelling = subjectSummary("spelling");
    main.innerHTML = `
      <section class="icas-hero">
        <div class="icas-hero-copy">
          <p class="eyebrow">Grade 3 targeted preparation</p>
          <h1>ICAS Challenge Lab</h1>
          <p>Build careful reasoning, spelling accuracy and calm test pace with original Bright Quest questions set just above Paper A demand.</p>
        </div>
        <div class="icas-hero-art" aria-hidden="true"><div class="icas-sheet"><span></span><span></span><span></span><span></span></div><div class="icas-pencil"></div></div>
      </section>
      <section class="subject-grid" aria-label="Subjects">
        ${subjectCard("maths", "Mathematics", "Number, patterns, measurement, space and data reasoning.", maths)}
        ${subjectCard("spelling", "Spelling Bee", "Dictation, spelling conventions, proofreading and correction.", spelling)}
      </section>
      <p class="icas-disclaimer">${escapeHtml(bank.disclaimer)}</p>
    `;
    main.querySelectorAll("[data-subject]").forEach((button) => button.addEventListener("click", () => openSubject(button.dataset.subject)));
  }

  function subjectCard(subject, title, copy, summary) {
    return `<article class="subject-card ${subject}">
      <p class="eyebrow">${subject === "maths" ? "Reasoning" : "Word knowledge"}</p>
      <h2>${title}</h2><p>${copy}</p>
      <div class="subject-stats"><span><strong>${summary.completed}</strong><small>sets complete</small></span><span><strong>${summary.latest ?? "--"}${summary.latest === null ? "" : "%"}</strong><small>latest score</small></span></div>
      <button class="button button-primary" type="button" data-subject="${subject}">Open ${title}</button>
    </article>`;
  }

  function renderSubject() {
    const tests = bank.tests.filter((test) => test.subject === state.subject);
    const title = state.subject === "maths" ? "Mathematics" : "Spelling Bee";
    main.innerHTML = `
      <header class="subject-head"><div><p class="eyebrow">ICAS Challenge Lab</p><h1>${title}</h1><p>Complete a readiness check, sharpen specific skills, then attempt the full simulation.</p></div><div class="subject-head-actions">${state.subject === "spelling" ? `<button class="button button-soft" type="button" data-volume-check>Check audio</button>` : ""}<button class="button button-soft" type="button" data-back-home>All subjects</button></div></header>
      <section class="test-list" aria-label="${title} practice sets">
        ${tests.map((test, index) => testCard(test, index)).join("")}
      </section>
    `;
    main.querySelector("[data-back-home]").addEventListener("click", () => history.back());
    main.querySelector("[data-volume-check]")?.addEventListener("click", () => {
      const audio = new Audio("assets/audio/volume-check.mp3");
      audio.play().catch(() => showToast("The volume check did not load. Check the connection and try again."));
    });
    main.querySelectorAll("[data-start-test]").forEach((button) => button.addEventListener("click", () => startTest(button.dataset.startTest)));
  }

  function testCard(test, index) {
    const attempts = getAttempts().filter((attempt) => attempt.testId === test.id);
    const latest = attempts.at(-1);
    const draft = loadDrafts()[test.id];
    return `<article class="test-card ${test.mode}">
      <span class="test-index" aria-hidden="true">${index + 1}</span>
      <div><p class="eyebrow">${modeLabel(test.mode)}</p><h3>${escapeHtml(test.title)}</h3><p>${test.mode === "simulation" ? "Exam-length mixed set with a countdown timer." : test.mode === "diagnostic" ? "Find the skills that deserve the next practice block." : "A concentrated set for high-demand question patterns."}</p>
        <div class="test-meta"><span>${test.questions.length} questions</span><span>${test.minutes} minutes</span><span>${test.timing === "countdown" ? "Countdown" : "Elapsed time"}</span>${latest ? `<span class="status-pill complete">Latest ${latest.percent}%</span>` : ""}</div>
      </div>
      <div class="test-actions"><small>${draft ? `${answeredCount(draft.answers)} answered in saved work` : attempts.length ? `${attempts.length} attempt${attempts.length === 1 ? "" : "s"}` : "Not started"}</small><button class="button ${test.mode === "simulation" ? "button-primary" : "button-soft"}" type="button" data-start-test="${test.id}">${draft ? "Resume" : attempts.length ? "Try again" : "Start"}</button></div>
    </article>`;
  }

  function renderRunner() {
    const question = state.test.questions[state.index];
    const answered = answeredCount(state.answers);
    main.innerHTML = `
      <section class="runner-shell">
        <aside class="runner-side">
          <p class="eyebrow">${modeLabel(state.test.mode)}</p><h2>${escapeHtml(state.test.title)}</h2><p>${answered} of ${state.test.questions.length} answered</p>
          <div class="timer-box" id="timerBox"><small>${state.test.timing === "countdown" ? "Time remaining" : "Time used"}</small><strong id="timerValue">00:00</strong></div>
          <div class="question-palette" aria-label="Question navigation">${state.test.questions.map((item, index) => paletteButton(item, index)).join("")}</div>
          <div class="palette-key"><span class="key-answered">Answered</span><span class="key-flagged">Flagged</span></div>
        </aside>
        <article class="question-panel">
          <div class="question-top"><p class="eyebrow">Question ${state.index + 1} of ${state.test.questions.length} / ${escapeHtml(question.domain)}</p><span class="difficulty">Demand ${question.difficulty} of 4</span></div>
          <h1>${escapeHtml(question.prompt)}</h1>
          ${renderStimulus(question)}
          ${renderResponse(question)}
          <div class="question-actions">
            <button class="button button-soft" type="button" data-prev ${state.index === 0 ? "disabled" : ""}>Previous</button>
            <button class="button button-soft flag-action" type="button" data-flag>${state.flagged.has(question.id) ? "Remove flag" : "Flag for review"}</button>
            <button class="button button-warn" type="button" data-exit>Exit</button>
            <button class="button button-primary" type="button" data-next>${state.index === state.test.questions.length - 1 ? "Submit set" : "Next"}</button>
          </div>
        </article>
      </section>
    `;
    wireRunner(question);
    startTimer();
  }

  function paletteButton(question, index) {
    const classes = ["palette-button"];
    if (index === state.index) classes.push("current");
    if (isAnswered(state.answers[question.id])) classes.push("answered");
    if (state.flagged.has(question.id)) classes.push("flagged");
    return `<button class="${classes.join(" ")}" type="button" data-jump="${index}" aria-label="Question ${index + 1}${isAnswered(state.answers[question.id]) ? ", answered" : ""}${state.flagged.has(question.id) ? ", flagged" : ""}">${index + 1}</button>`;
  }

  function renderResponse(question) {
    const value = state.answers[question.id];
    if (question.options) {
      const className = question.format === "proofread" ? "option-list proofread-list" : "option-list";
      return `<div class="${className}" role="group" aria-label="Answer choices">${question.options.map((option, index) => `<button class="option-button ${Number(value) === index ? "selected" : ""}" type="button" data-answer-index="${index}" aria-pressed="${Number(value) === index}"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span></button>`).join("")}</div>`;
    }
    const isSpelling = state.test.subject === "spelling";
    const inputMode = state.test.subject === "maths" ? "numeric" : "text";
    return `${question.format === "dictation" ? `<div class="audio-panel"><button class="icon-button" type="button" data-play-audio aria-label="Play dictation audio" title="Play dictation audio">&#9654;</button><p><strong>Listen carefully.</strong><br />You may replay the word and sentence.</p><audio preload="none" src="${escapeAttr(question.audio)}"></audio></div>` : ""}
      <label><span class="eyebrow">Your answer</span><input class="answer-input" id="typedAnswer" type="text" inputmode="${inputMode}" value="${escapeAttr(value ?? "")}" ${isSpelling ? 'spellcheck="false" autocorrect="off" autocapitalize="off" autocomplete="off"' : 'autocomplete="off"'} /></label>`;
  }

  function wireRunner(question) {
    main.querySelectorAll("[data-jump]").forEach((button) => button.addEventListener("click", () => moveTo(Number(button.dataset.jump))));
    main.querySelectorAll("[data-answer-index]").forEach((button) => button.addEventListener("click", () => {
      state.answers[question.id] = Number(button.dataset.answerIndex);
      renderRunner();
    }));
    const input = main.querySelector("#typedAnswer");
    if (input) {
      input.addEventListener("input", () => { state.answers[question.id] = input.value; updatePaletteClasses(); });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { event.preventDefault(); nextQuestion(); }
      });
      input.focus({ preventScroll: true });
    }
    main.querySelector("[data-play-audio]")?.addEventListener("click", () => playDictation(question));
    main.querySelector("[data-prev]").addEventListener("click", () => moveTo(state.index - 1));
    main.querySelector("[data-next]").addEventListener("click", nextQuestion);
    main.querySelector("[data-flag]").addEventListener("click", () => {
      if (state.flagged.has(question.id)) state.flagged.delete(question.id); else state.flagged.add(question.id);
      renderRunner();
    });
    main.querySelector("[data-exit]").addEventListener("click", confirmExit);
  }

  function updatePaletteClasses() {
    state.test.questions.forEach((question, index) => {
      const button = main.querySelector(`[data-jump="${index}"]`);
      button?.classList.toggle("answered", isAnswered(state.answers[question.id]));
    });
  }

  function nextQuestion() {
    if (state.index < state.test.questions.length - 1) moveTo(state.index + 1);
    else confirmSubmit();
  }

  function moveTo(index) {
    if (index < 0 || index >= state.test.questions.length) return;
    state.index = index;
    saveDraft();
    renderRunner();
    if (window.matchMedia("(max-width: 820px)").matches) {
      window.requestAnimationFrame(() => document.querySelector(".question-panel")?.scrollIntoView({ block: "start" }));
    }
  }

  function renderStimulus(question) {
    const s = question.stimulus;
    if (!s) return "";
    let body = "";
    if (s.type === "fractionBar") body = `<div class="fraction-bar">${Array.from({ length: s.parts }, (_, index) => `<span class="fraction-cell ${index < s.filled ? "filled" : ""}"></span>`).join("")}</div>`;
    if (s.type === "array") body = `<div class="array-grid ${s.tile ? "tiles" : ""}" style="grid-template-columns:repeat(${s.cols},auto)">${Array.from({ length: s.rows * s.cols }, () => `<span class="array-dot"></span>`).join("")}</div>`;
    if (s.type === "shapePattern") body = `<div class="pattern-row">${s.shapes.map((shape) => `<span class="pattern-shape">${escapeHtml(shape)}</span>`).join("")}</div>`;
    if (s.type === "stagePattern") body = `<div class="pattern-row">${s.values.map((value, index) => `<span class="stage-bar" style="height:${60 + index * 18}px">${escapeHtml(String(value))}</span>`).join("")}</div>`;
    if (s.type === "table") body = renderTable(s.headers, s.rows);
    if (s.type === "clock") body = renderClock(s.hour, s.minute);
    if (s.type === "calendar") body = renderCalendar(s.month, s.highlighted);
    if (s.type === "numberLine") body = renderNumberLine(s);
    if (s.type === "grid") body = renderGrid(s);
    if (s.type === "arrow") body = `<div class="arrow-visual" style="transform:rotate(${({ up: 0, right: 90, down: 180, left: 270 })[s.direction] || 0}deg)">&#8593;</div>`;
    if (s.type === "pictureGraph") body = `<p><strong>Key:</strong> &#9679; = ${s.key}</p>${s.rows.map(([label, count]) => `<div class="picture-row"><strong>${escapeHtml(label)}</strong><span class="picture-symbols">${"&#9679;".repeat(count)}</span></div>`).join("")}`;
    if (s.type === "solids") body = `<div class="solid-row">${s.names.map((name) => `<span class="solid-token">${escapeHtml(name)}</span>`).join("")}</div>`;
    if (s.type === "shapeChoices") body = `<div class="shape-pairs">${s.pairs.map((pair, index) => `<span class="shape-pair">${String.fromCharCode(65 + index)}: ${escapeHtml(pair.join(" + "))}</span>`).join("")}</div>`;
    return body ? `<div class="stimulus">${body}</div>` : "";
  }

  function renderTable(headers, rows) {
    return `<table class="data-table"><thead><tr>${headers.map((header) => `<th>${escapeHtml(String(header))}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(String(cell))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function renderClock(hour, minute) {
    const minuteAngle = minute * 6;
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    return `<div class="clock-wrap"><svg class="clock-face" viewBox="0 0 160 160" role="img" aria-label="Analogue clock"><circle cx="80" cy="80" r="72" fill="white" stroke="#14213a" stroke-width="5"/><text x="80" y="25" text-anchor="middle">12</text><text x="135" y="85" text-anchor="middle">3</text><text x="80" y="143" text-anchor="middle">6</text><text x="25" y="85" text-anchor="middle">9</text><line x1="80" y1="80" x2="80" y2="43" stroke="#14213a" stroke-width="7" stroke-linecap="round" transform="rotate(${hourAngle} 80 80)"/><line x1="80" y1="80" x2="80" y2="25" stroke="#2e71e8" stroke-width="4" stroke-linecap="round" transform="rotate(${minuteAngle} 80 80)"/><circle cx="80" cy="80" r="6" fill="#14213a"/></svg><p>Read the hour and minute hands.</p></div>`;
  }

  function renderCalendar(month, highlighted) {
    const blanks = 5;
    return `<p><strong>${escapeHtml(month)}</strong></p><div class="calendar-grid">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span class="calendar-head">${day}</span>`).join("")}${Array.from({ length: blanks }, () => "<span></span>").join("")}${Array.from({ length: 30 }, (_, index) => `<span class="${index + 1 === highlighted ? "highlight" : ""}">${index + 1}</span>`).join("")}</div>`;
  }

  function renderNumberLine(s) {
    return `<div class="number-target">Target: ${s.target}</div><div class="number-line"><div class="number-line-track">${Array.from({ length: s.points }, (_, index) => `<span class="number-point"><strong>${String.fromCharCode(65 + index)}</strong><small>${index < 2 ? s.start + s.step * index : ""}</small></span>`).join("")}</div></div>`;
  }

  function renderGrid(s) {
    const cells = ["<span class=\"grid-label\"></span>", ...s.columns.map((column) => `<span class="grid-cell grid-label">${column}</span>`)];
    for (let row = s.rows; row >= 1; row -= 1) {
      cells.push(`<span class="grid-cell grid-label">${row}</span>`);
      s.columns.forEach((column) => {
        const key = `${column}${row}`;
        cells.push(`<span class="grid-cell ${key === s.start ? "start" : ""} ${key === s.finish ? "finish" : ""}">${key === s.start ? "Start" : key === s.finish ? "Finish" : ""}</span>`);
      });
    }
    return `<div class="grid-board">${cells.join("")}</div>`;
  }

  function renderResult() {
    const attempt = state.result;
    const wrong = attempt.questionStats.filter((item) => !item.correct);
    const domainStats = aggregateDomains(attempt.questionStats);
    main.innerHTML = `
      <section class="result-hero"><div><p class="eyebrow">Set complete</p><h1>${escapeHtml(attempt.levelName)}</h1><p>${resultMessage(attempt.percent)} Your result and full answer evidence are saved to the Parent Cockpit.</p><div class="result-actions"><button class="button button-primary" type="button" data-review>${wrong.length ? `Review ${wrong.length} missed` : "Review answers"}</button><button class="button button-soft" type="button" data-result-subject>Return to ${attempt.subject === "maths" ? "Mathematics" : "Spelling Bee"}</button></div></div><div class="result-score"><span><strong>${attempt.percent}%</strong>${attempt.correct} of ${attempt.total}</span></div></section>
      <section class="result-grid">
        <article class="result-panel"><p class="eyebrow">Skill picture</p><h2>Performance by area</h2>${Object.entries(domainStats).map(([domain, value]) => `<div class="domain-row"><span>${escapeHtml(domain)}</span><strong>${value.correct}/${value.total}</strong></div>`).join("")}</article>
        <article class="result-panel"><p class="eyebrow">Next practice</p><h2>${wrong.length ? escapeHtml(weakestDomain(domainStats)) : "Maintain careful accuracy"}</h2><p>${wrong.length ? "Start with the lowest-accuracy area, then retry a targeted set before another full simulation." : "Every answer was correct. Use another set to practise the same care under fresh question patterns."}</p><p><strong>Time used:</strong> ${formatTime(attempt.secondsUsed)}</p></article>
      </section>
      <section class="result-panel hidden" id="answerReview"><p class="eyebrow">Wrong answers first</p><h2>Answer review</h2><div class="review-list">${[...attempt.questionStats].sort((a, b) => Number(a.correct) - Number(b.correct) || a.number - b.number).map(reviewCard).join("")}</div></section>
    `;
    main.querySelector("[data-review]").addEventListener("click", () => {
      const review = main.querySelector("#answerReview");
      review.classList.toggle("hidden");
      if (!review.classList.contains("hidden")) review.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    main.querySelector("[data-result-subject]").addEventListener("click", () => history.back());
  }

  function reviewCard(item) {
    return `<article class="review-card ${item.correct ? "correct" : "missed"}"><p class="eyebrow">${item.correct ? "Correct" : "Review first"} / Question ${item.number}</p><h3>${escapeHtml(item.prompt)}</h3><p><strong>Your answer:</strong> ${escapeHtml(item.selectedText || "No answer")}</p><p><strong>Correct answer:</strong> ${escapeHtml(item.correctText)}</p><p>${escapeHtml(item.explanation)}</p></article>`;
  }

  function startTest(testId) {
    const test = bank.tests.find((item) => item.id === testId);
    if (!test) return;
    const draft = loadDrafts()[test.id];
    state.test = test;
    state.subject = test.subject;
    state.answers = draft?.answers || {};
    state.flagged = new Set(draft?.flagged || []);
    state.index = Math.min(draft?.index || 0, test.questions.length - 1);
    state.startedAt = Date.now();
    state.pausedSeconds = draft?.elapsedSeconds || 0;
    state.result = null;
    navigate({ view: "runner", subject: test.subject, testId: test.id });
    if (draft) showToast("Saved work resumed.");
  }

  function openSubject(subject) {
    state.subject = subject;
    navigate({ view: "subject", subject });
  }

  function confirmExit() {
    openModal("Save this set for later?", "Your current answers, flags and place will be kept on this device.", "Save and leave", () => {
      saveDraft();
      history.back();
    });
  }

  function confirmSubmit() {
    const unanswered = state.test.questions.length - answeredCount(state.answers);
    openModal("Submit this set?", unanswered ? `${unanswered} question${unanswered === 1 ? " is" : "s are"} unanswered. You can return and check them before submitting.` : "Your answers will be marked and saved to the Parent Cockpit.", unanswered ? "Submit anyway" : "Submit set", submitAttempt);
  }

  function submitAttempt() {
    stopTimer();
    const elapsed = elapsedSeconds();
    const questionStats = state.test.questions.map((question, index) => markQuestion(question, index));
    const correct = questionStats.filter((item) => item.correct).length;
    const attempt = {
      id: `icas-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      module: "icas-prep",
      subject: state.test.subject,
      testId: state.test.id,
      levelName: state.test.title,
      mode: state.test.mode,
      date: new Date().toISOString(),
      secondsUsed: elapsed,
      correct,
      total: state.test.questions.length,
      percent: Math.round((correct / state.test.questions.length) * 100),
      questionStats
    };
    state.result = attempt;
    clearDraft(state.test.id);
    saveAttempt(attempt);
    history.replaceState({ view: "result", subject: state.subject, attemptId: attempt.id }, "", `#result/${attempt.id}`);
    state.view = "result";
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function markQuestion(question, index) {
    const answer = state.answers[question.id];
    const hasOptions = Array.isArray(question.options);
    const correct = hasOptions ? Number(answer) === question.correct : question.acceptedAnswers.some((accepted) => normalizeAnswer(answer) === normalizeAnswer(accepted));
    const selectedText = hasOptions && Number.isInteger(Number(answer)) && question.options[Number(answer)] !== undefined ? question.options[Number(answer)] : String(answer ?? "").trim();
    return {
      id: question.id,
      number: index + 1,
      prompt: question.prompt,
      domain: question.domain,
      skill: question.skill,
      format: question.format,
      difficulty: question.difficulty,
      selectedText,
      correctText: question.correctText,
      correct,
      explanation: question.explanation
    };
  }

  function playDictation(question) {
    const audio = main.querySelector("audio");
    const button = main.querySelector("[data-play-audio]");
    if (!audio || !button) return;
    button.disabled = true;
    button.textContent = "...";
    audio.currentTime = 0;
    audio.play().catch(() => {
      showToast("Audio did not load. Check the connection and try again; the timer has been paused for this retry.");
      state.pausedSeconds = elapsedSeconds();
      state.startedAt = Date.now();
    }).finally(() => {
      window.setTimeout(() => { button.disabled = false; button.innerHTML = "&#9654;"; }, 500);
    });
  }

  function startTimer() {
    updateTimer();
    timerId = window.setInterval(updateTimer, 1000);
  }

  function stopTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function updateTimer() {
    const value = document.querySelector("#timerValue");
    const box = document.querySelector("#timerBox");
    if (!value || !state.test) return;
    const elapsed = elapsedSeconds();
    const remaining = Math.max(0, state.test.minutes * 60 - elapsed);
    value.textContent = formatTime(state.test.timing === "countdown" ? remaining : elapsed);
    box?.classList.toggle("warning", state.test.timing === "countdown" && remaining <= 300);
    if (state.test.timing === "countdown" && remaining === 0) {
      stopTimer();
      showToast("Time is complete. Your saved answers are being submitted.");
      submitAttempt();
    }
  }

  function elapsedSeconds() {
    return state.pausedSeconds + Math.max(0, Math.floor((Date.now() - state.startedAt) / 1000));
  }

  function saveDraft() {
    if (!state.test) return;
    const drafts = loadDrafts();
    drafts[state.test.id] = { answers: state.answers, flagged: [...state.flagged], index: state.index, elapsedSeconds: elapsedSeconds(), updatedAt: new Date().toISOString() };
    localStorage.setItem(draftKey, JSON.stringify(drafts));
  }

  function clearDraft(testId) {
    const drafts = loadDrafts();
    delete drafts[testId];
    localStorage.setItem(draftKey, JSON.stringify(drafts));
  }

  function loadDrafts() {
    try { return JSON.parse(localStorage.getItem(draftKey)) || {}; } catch { return {}; }
  }

  function saveAttempt(attempt) {
    const profiles = loadProfiles();
    const profileId = state.profile?.id || localStorage.getItem(activeProfileKey);
    if (!profileId || !profiles[profileId]) {
      const standalone = JSON.parse(localStorage.getItem("brightQuestIcasStandaloneAttemptsV1") || "[]");
      standalone.push(attempt);
      localStorage.setItem("brightQuestIcasStandaloneAttemptsV1", JSON.stringify(standalone.slice(-30)));
      showToast("Result saved on this device. Choose a Bright Quest child profile to add future results to Parent Cockpit.");
      return;
    }
    const profile = profiles[profileId];
    profile.icasAttempts = Array.isArray(profile.icasAttempts) ? profile.icasAttempts : [];
    profile.icasAttempts.push(attempt);
    profile.icasAttempts = profile.icasAttempts.slice(-80);
    profiles[profileId] = profile;
    state.profile = profile;
    localStorage.setItem(storageKey, JSON.stringify(profiles));
    syncProfile(profile);
  }

  async function syncProfile(profile, allowConflictRetry = true) {
    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: { "content-type": "application/json", ...requestHeaders() },
        body: JSON.stringify({ profile })
      });
      if (response.status === 409 && allowConflictRetry) {
        const remoteResponse = await fetch("/api/profiles", { headers: { accept: "application/json", ...requestHeaders() } });
        if (!remoteResponse.ok) return;
        const remoteBody = await remoteResponse.json();
        const remoteRecord = (remoteBody.profiles || []).find((item) => item.payload?.id === profile.id);
        if (!remoteRecord?.payload) return;
        const merged = {
          ...profile,
          ...remoteRecord.payload,
          icasAttempts: mergeAttempts(remoteRecord.payload.icasAttempts, profile.icasAttempts),
          cloudVersion: remoteRecord.version
        };
        const profiles = loadProfiles();
        profiles[profile.id] = merged;
        state.profile = merged;
        localStorage.setItem(storageKey, JSON.stringify(profiles));
        await syncProfile(merged, false);
        return;
      }
      if (!response.ok) return;
      const body = await response.json();
      profile.cloudSyncedAt = body.syncedAt || new Date().toISOString();
      if (body.version) profile.cloudVersion = body.version;
      const profiles = loadProfiles();
      if (profiles[profile.id]) {
        profiles[profile.id] = profile;
        localStorage.setItem(storageKey, JSON.stringify(profiles));
      }
    } catch {
      // Static hosting and offline practice remain local-first.
    }
  }

  function mergeAttempts(remoteAttempts, localAttempts) {
    const merged = new Map();
    [...(remoteAttempts || []), ...(localAttempts || [])].forEach((attempt) => {
      const key = attempt?.id || `${attempt?.testId || "attempt"}-${attempt?.date || merged.size}`;
      merged.set(key, attempt);
    });
    return [...merged.values()].sort((left, right) => String(left.date || "").localeCompare(String(right.date || ""))).slice(-80);
  }

  function requestHeaders() {
    const headers = {};
    const parent = sessionStorage.getItem("brightQuestParentCapability");
    const child = sessionStorage.getItem("brightQuestChildCapability");
    if (parent) headers["x-bq-parent-capability"] = parent;
    if (child) headers["x-bq-child-capability"] = child;
    return headers;
  }

  function loadActiveProfile() {
    const profiles = loadProfiles();
    return profiles[localStorage.getItem(activeProfileKey)] || null;
  }

  function loadProfiles() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  }

  function getAttempts() {
    return Array.isArray(state.profile?.icasAttempts) ? state.profile.icasAttempts : [];
  }

  function subjectSummary(subject) {
    const attempts = getAttempts().filter((attempt) => attempt.subject === subject);
    return { completed: new Set(attempts.map((attempt) => attempt.testId)).size, latest: attempts.length ? attempts.at(-1).percent : null };
  }

  function navigate(route) {
    history.pushState(route, "", routeHash(route));
    applyRoute(route);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function applyRoute(route) {
    state.view = route.view || "home";
    if (route.subject) state.subject = route.subject;
    if (state.view === "runner" && route.testId && !state.test) {
      const test = bank.tests.find((item) => item.id === route.testId);
      if (test) startTest(test.id); else state.view = "home";
      return;
    }
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function routeHash(route) {
    if (route.view === "subject") return `#subject/${route.subject}`;
    if (route.view === "runner") return `#test/${route.testId}`;
    if (route.view === "result") return `#result/${route.attemptId}`;
    return "#home";
  }

  function routeFromHash() {
    const parts = location.hash.replace(/^#/, "").split("/");
    if (parts[0] === "subject") return { view: "subject", subject: parts[1] };
    return { view: "home" };
  }

  function handleBack() {
    if (state.view === "home") { window.location.href = "../"; return; }
    if (state.view === "runner") { confirmExit(); return; }
    history.back();
  }

  function openModal(title, message, actionLabel, action) {
    document.querySelector("#confirmTitle").textContent = title;
    document.querySelector("#confirmMessage").textContent = message;
    confirmAction.textContent = actionLabel;
    modalAction = action;
    modal.classList.remove("hidden");
    confirmAction.focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
    modalAction = null;
  }

  function answeredCount(answers) {
    return Object.values(answers || {}).filter(isAnswered).length;
  }

  function isAnswered(value) {
    return value !== undefined && value !== null && String(value).trim() !== "";
  }

  function normalizeAnswer(value) {
    return String(value ?? "").trim().toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, " ");
  }

  function aggregateDomains(items) {
    return items.reduce((result, item) => {
      result[item.domain] ||= { correct: 0, total: 0 };
      result[item.domain].total += 1;
      if (item.correct) result[item.domain].correct += 1;
      return result;
    }, {});
  }

  function weakestDomain(stats) {
    return Object.entries(stats).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))[0]?.[0] || "Mixed practice";
  }

  function resultMessage(percent) {
    if (percent >= 90) return "Excellent control under challenge conditions.";
    if (percent >= 75) return "Strong work with a clear next practice target.";
    if (percent >= 55) return "A useful result with several skills ready to strengthen.";
    return "This baseline gives you a precise place to begin.";
  }

  function modeLabel(mode) {
    return ({ diagnostic: "Readiness check", targeted: "Targeted practice", simulation: "Full simulation" })[mode] || mode;
  }

  function formatTime(seconds) {
    const value = Math.max(0, Number(seconds) || 0);
    return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
  }

  function showToast(message) {
    window.clearTimeout(toastId);
    toast.textContent = message;
    toast.classList.add("show");
    toastId = window.setTimeout(() => toast.classList.remove("show"), 4200);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }
})();
