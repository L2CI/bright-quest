(() => {
  const originalFinishTest = finishTest;
  const originalRenderParentDashboard = renderParentDashboard;

  finishTest = function writingScoredFinishTest(timedOut) {
    originalFinishTest(timedOut);
    const attempt = state.latestResult;
    if (!attempt) return;

    let changed = false;
    (attempt.questionStats || []).forEach((question) => {
      if (question.format !== "writing") return;
      const score = scoreWritingResponse(question.answerText || "", question.prompt || "");
      question.writingScore = score;
      changed = true;
    });

    if (changed) {
      (state.profile.writingSamples || []).forEach((sample) => {
        if (sample.level !== attempt.level || sample.writingScore) return;
        const match = (attempt.questionStats || []).find((question) =>
          question.format === "writing"
          && question.prompt === sample.prompt
          && question.answerText === sample.response
        );
        if (match?.writingScore) sample.writingScore = match.writingScore;
      });
      saveProfiles();
      syncProfileToCloud();
    }
  };

  renderParentDashboard = function upgradedParentDashboard() {
    originalRenderParentDashboard();
    renderWritingAndAttemptReview();
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-attempt-review]");
    if (!button) return;
    const panel = document.querySelector(`[data-attempt-panel="${button.dataset.attemptReview}"]`);
    if (!panel) return;
    const isHidden = panel.classList.toggle("hidden");
    button.textContent = isHidden ? "View full test answers" : "Hide full test answers";
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-writing-review]");
    if (!button) return;
    const card = button.closest(".writing-score-card");
    const panel = card?.querySelector(".writing-response-panel");
    if (!panel) return;
    const isHidden = panel.classList.toggle("hidden");
    button.textContent = isHidden ? "Show writing assessment" : "Hide writing assessment";
  });

  function renderWritingAndAttemptReview() {
    if (!state.parentProfileId || !state.profiles[state.parentProfileId]) return;
    const profile = state.profiles[state.parentProfileId];
    const attempts = profile.attempts || [];

    const writingScores = attempts
      .flatMap((attempt) => (attempt.questionStats || [])
        .filter((question) => question.format === "writing")
        .map((question) => ({ attempt, question, score: question.writingScore || scoreWritingResponse(question.answerText || "", question.prompt || "") })))
      .slice(-6)
      .reverse();

    const writingHtml = writingScores.length
      ? writingScores.map(({ attempt, question, score }) => `
        <div class="writing-score-card">
          <div class="writing-score-head">
            <div>
              <h4>${escapeHtml(attempt.levelName)} writing: ${score.total}/20</h4>
              <p>${escapeHtml(score.band)}.</p>
            </div>
            <button class="button button-soft button-compact" type="button" data-writing-review>Show writing assessment</button>
          </div>
          <div class="writing-response-panel hidden">
            <p>${escapeHtml(score.feedback)}</p>
            <div class="writing-rubric">
              ${rubricBox("Ideas", score.ideas)}
              ${rubricBox("Structure", score.structure)}
              ${rubricBox("Vocabulary", score.vocabulary)}
              ${rubricBox("Accuracy", score.accuracy)}
            </div>
            <p><strong>Next step:</strong> ${escapeHtml(score.nextStep)}</p>
            <p>${escapeHtml(question.answerText || "No response saved.")}</p>
          </div>
        </div>
      `).join("")
      : `<div class="empty-state">No writing responses scored yet. Future writing questions will be auto-scored here.</div>`;

    parentOverview.insertAdjacentHTML("beforeend", `
      <div class="writing-assessment-summary">
        <div class="section-heading compact">
          <div>
            <p class="eyebrow">Writing assessment</p>
            <h3>Auto-assessed writing</h3>
          </div>
        </div>
        <div class="writing-score-list">${writingHtml}</div>
      </div>
    `);

    if (!attempts.length) return;
    const attemptHtml = attempts.slice().reverse().map((attempt) => `
      <div class="attempt-review-card">
        <div>
          <h4>${escapeHtml(attempt.levelName)} - ${attempt.percent}%</h4>
          <p>${new Date(attempt.date).toLocaleString()} / ${attempt.correct} of ${attempt.total} marked correct / ${formatDuration(attempt.secondsUsed || 0)}</p>
        </div>
        <button class="button button-soft" type="button" data-attempt-review="${escapeAttr(attempt.id)}">View full test answers</button>
        <div class="full-review-panel hidden" data-attempt-panel="${escapeAttr(attempt.id)}">
          ${renderFullAttempt(attempt)}
        </div>
      </div>
    `).join("");

    parentQuestionTable.insertAdjacentHTML("beforeend", `
      <div class="section-heading compact">
        <div>
          <p class="eyebrow">Full test review</p>
          <h3>Question and answer view</h3>
        </div>
      </div>
      <div class="attempt-review-list">${attemptHtml}</div>
    `);
  }

  function renderFullAttempt(attempt) {
    const rows = attempt.questionStats || [];
    if (!rows.length) return `<div class="empty-state">No question-level record saved for this attempt.</div>`;

    return rows.map((question) => {
      if (question.format === "writing") {
        const score = question.writingScore || scoreWritingResponse(question.answerText || "", question.prompt || "");
        return `
          <div class="answer-review-row writing">
            <div class="answer-review-meta">
              <span>Q${question.number}</span>
              <span>Writing</span>
              <span>${formatDuration(question.secondsSpent || 0)}</span>
              <span>${score.total}/20</span>
            </div>
            <h5>${escapeHtml(question.prompt)}</h5>
            <p><strong>Response:</strong> ${escapeHtml(question.answerText || "No response saved.")}</p>
            <p><strong>Auto feedback:</strong> ${escapeHtml(score.feedback)} ${escapeHtml(score.nextStep)}</p>
          </div>
        `;
      }

      return `
        <div class="answer-review-row ${question.correct ? "correct" : "missed"}">
          <div class="answer-review-meta">
            <span>Q${question.number}</span>
            <span>${escapeHtml(question.section)}</span>
            <span>${escapeHtml(question.skill)}</span>
            <span>${formatDuration(question.secondsSpent || 0)}</span>
            <span>${question.correct ? "Correct" : "Missed"}</span>
          </div>
          <h5>${escapeHtml(question.prompt)}</h5>
          <p><strong>Selected:</strong> ${escapeHtml(question.selectedText || "No answer selected")}</p>
          <p><strong>Correct:</strong> ${escapeHtml(question.correctText || "")}</p>
        </div>
      `;
    }).join("");
  }

  function scoreWritingResponse(text, prompt) {
    const clean = String(text || "").trim();
    const words = clean ? clean.split(/\s+/).filter(Boolean) : [];
    const sentences = clean ? clean.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean) : [];
    const lower = clean.toLowerCase();
    const vividWords = ["mysterious", "sparkling", "quiet", "dark", "bright", "suddenly", "carefully", "hidden", "giant", "strange", "brave", "nervous", "excited"];
    const connectors = ["because", "although", "after", "before", "when", "while", "then", "so", "but", "however"];
    const storySignals = ["problem", "solved", "finally", "beginning", "end", "ending", "chased", "found", "returned", "opened"];

    const hasPromptLink = String(prompt || "").toLowerCase().split(/\W+/).filter((word) => word.length > 4).some((word) => lower.includes(word));
    const hasCapitalStart = sentences.length ? sentences.filter((sentence) => /^[A-Z]/.test(sentence)).length / sentences.length : 0;
    const punctuationCount = (clean.match(/[.!?]/g) || []).length;
    const commaCount = (clean.match(/,/g) || []).length;
    const repeatedEnd = /\b(the end|lived happily|happily lived)\b/i.test(clean);

    const ideas = clampScore(
      (words.length >= 45 ? 2 : words.length >= 25 ? 1 : 0)
      + (hasPromptLink ? 1 : 0)
      + (storySignals.some((word) => lower.includes(word)) ? 1 : 0)
      + (vividWords.filter((word) => lower.includes(word)).length >= 2 ? 1 : 0)
    );

    const structure = clampScore(
      (sentences.length >= 4 ? 2 : sentences.length >= 2 ? 1 : 0)
      + (connectors.some((word) => lower.includes(word)) ? 1 : 0)
      + (/\b(first|then|soon|finally|after)\b/i.test(clean) ? 1 : 0)
      + (!repeatedEnd && words.length >= 35 ? 1 : 0)
    );

    const vocabulary = clampScore(
      (new Set(words.map((word) => word.toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean)).size >= Math.min(words.length * 0.7, 30) ? 2 : 1)
      + (vividWords.filter((word) => lower.includes(word)).length >= 2 ? 1 : 0)
      + (connectors.filter((word) => lower.includes(word)).length >= 2 ? 1 : 0)
      + (words.some((word) => word.length >= 9) ? 1 : 0)
    );

    const accuracy = clampScore(
      (punctuationCount >= Math.min(sentences.length, 3) ? 1 : 0)
      + (commaCount > 0 ? 1 : 0)
      + (hasCapitalStart >= 0.75 ? 1 : 0)
      + (!/\bi\b/.test(clean) ? 1 : 0)
      + (words.length >= 20 ? 1 : 0)
    );

    const total = ideas + structure + vocabulary + accuracy;
    const band = total >= 17 ? "Excellent for Grade 3 scholarship writing"
      : total >= 13 ? "Strong and developing"
      : total >= 9 ? "Promising, needs more control"
      : "Needs guided practice";

    const weakest = [
      ["ideas", ideas, "add clearer story detail and answer the whole prompt"],
      ["structure", structure, "use a beginning, problem, turning point, and ending"],
      ["vocabulary", vocabulary, "add vivid words and stronger sentence starters"],
      ["accuracy", accuracy, "check capitals, punctuation, and complete sentences"]
    ].sort((a, b) => a[1] - b[1])[0];

    return {
      total,
      ideas,
      structure,
      vocabulary,
      accuracy,
      band,
      feedback: total >= 13
        ? "The response has a clear attempt at meaning and enough detail to assess."
        : "The response needs more development before it would feel exam-ready.",
      nextStep: `Next time, ${weakest[2]}.`
    };
  }

  function rubricBox(label, value) {
    return `<div><strong>${value}/5</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function clampScore(value) {
    return Math.max(1, Math.min(5, value));
  }
})();
