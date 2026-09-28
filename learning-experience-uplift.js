(() => {
  // This layer only presents existing questions/results. The original test,
  // autosave and scoring functions continue to own learner state.
  document.body.classList.add("bq-learning-uplift");

  const previousRenderQuestion = renderQuestion;
  renderQuestion = function focusedRenderQuestion(...args) {
    const result = previousRenderQuestion.apply(this, args);
    requestAnimationFrame(updateQuestionNavigation);
    return result;
  };

  const previousRenderResult = renderResult;
  renderResult = function focusedRenderResult(attempt, ...args) {
    const result = previousRenderResult.call(this, attempt, ...args);
    renderCompleteReview(attempt);
    return result;
  };

  document.querySelector("#writingBox")?.setAttribute("aria-label", "Your written answer");
  document.querySelector("#writingBox")?.addEventListener("input", updateQuestionNavigation);
  document.querySelector("#timer")?.setAttribute("aria-live", "off");
  document.querySelector("#reviewTrainingButton").textContent = "Practise next";
  const resultReturn = document.querySelector("#resultDashboardButton");
  if (resultReturn) {
    resultReturn.textContent = "Back to Today";
    resultReturn.addEventListener("click", (event) => {
      if (!window.BrightQuestChildExperience || !document.body.classList.contains("bq-child-uplift") || !state.profile) return;
      event.stopImmediatePropagation();
      window.BrightQuestChildExperience.navigate("today");
    }, true);
  }

  function updateQuestionNavigation() {
    const questions = state?.activeLevel?.questions;
    const stepper = document.querySelector("#questionStepper");
    const progress = document.querySelector("#testScreen .test-progress");
    if (!questions?.length || !stepper || !progress) return;
    let panel = document.querySelector("#focusedQuestionNavigation");
    if (!panel) {
      panel = document.createElement("details");
      panel.id = "focusedQuestionNavigation";
      panel.className = "focused-question-navigation";
      panel.innerHTML = `<summary><span>Questions</span><span class="question-navigation-count"></span></summary><p class="question-navigation-help">Choose any question. Filled circles show answers you have added.</p>`;
      progress.after(panel);
      panel.append(stepper);
      panel.addEventListener("click", (event) => {
        if (!event.target.closest("[data-question-jump]")) return;
        panel.open = false;
        const prompt = document.querySelector("#questionPrompt");
        prompt.tabIndex = -1;
        prompt.focus({ preventScroll: true });
        prompt.scrollIntoView({ behavior: "instant", block: "nearest" });
      });
    }
    const answered = questions.filter((question, index) => {
      const answer = state.answers[index];
      return question.format === "writing" ? Boolean(answer?.writing?.trim()) : Number.isInteger(answer?.selected);
    }).length;
    panel.querySelector(".question-navigation-count").textContent = `${answered} of ${questions.length} answered`;
    const exit = document.querySelector("#exitTestButton");
    if (window.BrightQuestDrafts && exit) exit.textContent = "Save & leave";
  }

  function renderCompleteReview(attempt) {
    const list = document.querySelector("#reviewList");
    if (!list) return;
    const rows = reviewRows(attempt);
    const counts = rows.reduce((result, row) => {
      result[row.status] += 1;
      return result;
    }, { correct: 0, incorrect: 0, unanswered: 0, writing: 0 });
    const filters = [["all", "All answers", rows.length], ["incorrect", "Incorrect", counts.incorrect], ["unanswered", "Unanswered", counts.unanswered], ["correct", "Correct", counts.correct], ["writing", "Writing", counts.writing]];
    list.classList.add("focused-review");
    list.innerHTML = `
      <header class="focused-review-heading"><div><p class="eyebrow">Your saved work</p><h2>Take a closer look</h2><p>Open an answer to see the question, your response and an explanation.</p></div><span class="focused-review-total">${rows.length} questions</span></header>
      <div class="focused-review-filters" role="group" aria-label="Filter saved answers">${filters.map(([key, label, count]) => `<button type="button" data-review-filter="${key}" aria-pressed="${key === "all"}">${label}<span>${count}</span></button>`).join("")}</div>
      <p class="focused-review-empty" hidden>No answers in this view.</p>
      <div class="focused-review-records">${rows.map((row) => reviewMarkup(row)).join("")}</div>`;
    list.querySelectorAll("[data-review-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.reviewFilter;
        let visible = 0;
        list.querySelectorAll("[data-review-status]").forEach((record) => {
          record.hidden = filter !== "all" && record.dataset.reviewStatus !== filter;
          if (!record.hidden) visible += 1;
        });
        list.querySelectorAll("[data-review-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        list.querySelector(".focused-review-empty").hidden = visible > 0;
      });
    });
    list.querySelectorAll("[data-train]").forEach((button) => button.addEventListener("click", () => openTraining(button.dataset.train)));
  }

  function reviewRows(attempt) {
    const stats = Array.isArray(attempt.questionStats) ? attempt.questionStats : [];
    const wrong = Array.isArray(attempt.wrong) ? attempt.wrong : [];
    if (!stats.length) return wrong.map((item, index) => ({
      ...item,
      number: index + 1,
      status: Number.isInteger(item.selected) ? "incorrect" : "unanswered",
      response: Number.isInteger(item.selected) ? item.options?.[item.selected] || "" : "",
      correctText: item.options?.[item.correct] || ""
    }));
    return stats.map((item, index) => {
      const original = state.activeLevel?.questions?.find((question) => question.id === item.id);
      const missed = wrong.find((question) => question.id === item.id);
      const writing = item.format === "writing";
      const response = writing ? item.answerText || "" : item.selectedText || (Number.isInteger(item.selected) ? (missed?.options || original?.options)?.[item.selected] || "" : "");
      return {
        ...item,
        number: item.number || index + 1,
        status: writing ? "writing" : item.correct === true ? "correct" : Number.isInteger(item.selected) || Boolean(response) ? "incorrect" : "unanswered",
        response,
        correctText: item.correctText || missed?.options?.[missed.correct] || original?.options?.[original.correct] || "",
        explain: missed?.explain || original?.explain || ""
      };
    });
  }

  function reviewMarkup(row) {
    const statusLabel = { correct: "Correct", incorrect: "Incorrect", unanswered: "Unanswered", writing: "Writing" }[row.status];
    const preview = String(row.prompt || "Question");
    const summary = preview.length > 105 ? `${preview.slice(0, 102)}…` : preview;
    return `<details class="focused-review-record" data-review-status="${row.status}">
      <summary><span class="focused-review-number">${row.number}</span><span class="focused-review-summary"><strong>${escapeHtml(row.skill || row.section || "Question")}</strong><span>${escapeHtml(summary)}</span></span><span class="focused-review-status ${row.status}">${statusLabel}</span></summary>
      <div class="focused-review-detail"><p class="eyebrow">${escapeHtml([row.section, row.skill].filter(Boolean).join(" · "))}${Number.isFinite(row.secondsSpent) ? ` · ${Math.round(row.secondsSpent)} seconds` : ""}</p><h3>${escapeHtml(row.prompt || "")}</h3><div class="focused-review-response"><strong>Your ${row.status === "writing" ? "writing" : "answer"}</strong><p>${escapeHtml(row.response || "No answer added")}</p></div>${row.correctText ? `<p class="focused-correct-answer"><strong>Correct answer</strong> ${escapeHtml(row.correctText)}</p>` : ""}${row.explain ? `<p class="focused-explanation">${escapeHtml(row.explain)}</p>` : ""}${["incorrect", "unanswered"].includes(row.status) && row.skill ? `<button class="button button-soft" type="button" data-train="${escapeAttr(row.skill)}">Practise ${escapeHtml(row.skill)}</button>` : ""}</div>
    </details>`;
  }
})();
