(() => {
  const previousRenderParentDashboard = renderParentDashboard;

  renderParentDashboard = function simplifiedParentDashboard() {
    previousRenderParentDashboard();
    renderSimplifiedParentDashboard();
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-parent-panel]");
    if (!button) return;
    const card = button.closest(".parent-layer-card, .parent-focus-card, .parent-attempt-card");
    const panel = card?.querySelector(`[data-parent-panel-body="${button.dataset.parentPanel}"]`);
    if (!panel) return;
    const hidden = panel.classList.toggle("hidden");
    button.textContent = hidden ? button.dataset.openText : button.dataset.closeText;
  });

  function renderSimplifiedParentDashboard() {
    const profile = state.parentProfileId ? state.profiles[state.parentProfileId] : null;
    if (!profile) return;

    const attempts = profile.attempts || [];
    const questionStats = attempts.flatMap((attempt) =>
      (attempt.questionStats || []).map((question) => ({ ...question, attempt }))
    );
    const markedQuestions = questionStats.filter((question) => question.format !== "writing");
    const training = getTrainingCoverage(profile);
    const averageScore = attempts.length
      ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.percent, 0) / attempts.length)
      : 0;
    const bestScore = attempts.reduce((best, attempt) => Math.max(best, attempt.percent || 0), 0);
    const latest = attempts.at(-1);
    const previous = attempts.at(-2);
    const trendDelta = latest && previous ? latest.percent - previous.percent : 0;
    const focusSummaries = buildFocusSummaries(markedQuestions).slice(0, 5);
    const writingItems = getWritingItems(attempts).slice(0, 3);

    updateParentHeadings();
    parentRecommendation.innerHTML = renderSimpleRecommendation(profile, focusSummaries, averageScore, latest, training);
    parentOverview.innerHTML = `
      <div class="parent-visual-stat">
        <span>Latest</span>
        <strong>${latest ? `${latest.percent}%` : "--"}</strong>
        <small>${latest ? escapeHtml(latest.levelName) : "No test yet"}</small>
      </div>
      <div class="parent-visual-stat">
        <span>Average</span>
        <strong>${attempts.length ? `${averageScore}%` : "--"}</strong>
        <small>${attempts.length} completed test${attempts.length === 1 ? "" : "s"}</small>
      </div>
      <div class="parent-visual-stat">
        <span>Best</span>
        <strong>${attempts.length ? `${bestScore}%` : "--"}</strong>
        <small>${trendDelta ? `${trendDelta > 0 ? "+" : ""}${trendDelta}% vs previous` : "Trend starts after 2 tests"}</small>
      </div>
      <div class="parent-visual-stat">
        <span>Training</span>
        <strong>${training.completed.length}</strong>
        <small>${training.untouched.length} untouched</small>
      </div>
      <div class="parent-chart-card">
        <div class="parent-chart-head">
          <div>
            <p class="eyebrow">Score trend</p>
            <h3>How results are moving</h3>
          </div>
          <strong>${attempts.length ? `${attempts.length} runs` : "No runs"}</strong>
        </div>
        ${renderTrendChart(attempts)}
      </div>
      <div class="parent-chart-card compact">
        <div class="parent-chart-head">
          <div>
            <p class="eyebrow">Main pressure points</p>
            <h3>Top skills to watch</h3>
          </div>
        </div>
        ${renderFocusBars(focusSummaries)}
      </div>
      <div class="parent-chart-card compact">
        <div class="parent-chart-head">
          <div>
            <p class="eyebrow">Writing</p>
            <h3>Recent writing signals</h3>
          </div>
        </div>
        ${renderWritingSnapshot(writingItems)}
      </div>
    `;

    parentQuestionTable.innerHTML = renderFocusDrilldown(focusSummaries);
    parentTrainingTable.innerHTML = renderLayeredRecords(attempts, training, questionStats);
  }

  function updateParentHeadings() {
    const questionCard = parentQuestionTable.closest(".parent-card");
    const trainingCard = parentTrainingTable.closest(".parent-card");
    questionCard?.querySelector(".eyebrow") && (questionCard.querySelector(".eyebrow").textContent = "Focus areas");
    questionCard?.querySelector("h3") && (questionCard.querySelector("h3").textContent = "Open evidence only when needed");
    trainingCard?.querySelector(".eyebrow") && (trainingCard.querySelector(".eyebrow").textContent = "Drill-down");
    trainingCard?.querySelector("h3") && (trainingCard.querySelector("h3").textContent = "Detailed records on request");
  }

  function buildFocusSummaries(questions) {
    const grouped = questions.reduce((acc, question) => {
      const key = question.skill || "Other";
      acc[key] ||= { skill: key, section: question.section, count: 0, missed: 0, seconds: 0, questions: [] };
      acc[key].count += 1;
      acc[key].missed += question.correct === false ? 1 : 0;
      acc[key].seconds += question.secondsSpent || 0;
      acc[key].questions.push(question);
      return acc;
    }, {});

    return Object.values(grouped)
      .map((summary) => ({
        ...summary,
        averageSeconds: Math.round(summary.seconds / Math.max(1, summary.count)),
        score: summary.missed * 3 + Math.round(summary.seconds / 45)
      }))
      .sort((a, b) => b.score - a.score);
  }

  function getWritingItems(attempts) {
    return attempts.flatMap((attempt) => (attempt.questionStats || [])
      .filter((question) => question.format === "writing")
      .map((question) => ({ attempt, question }))).reverse();
  }

  function renderSimpleRecommendation(profile, focusSummaries, averageScore, latest, training) {
    const focus = focusSummaries[0];
    const headline = focus
      ? `Help ${profile.name} next with ${focus.skill}.`
      : latest
        ? "Results are ready for pressure polish."
        : `${profile.name}'s parent cockpit is ready.`;
    const copy = focus
      ? `${focus.missed} missed or slow signal${focus.missed === 1 ? "" : "s"} appeared here. Open the evidence below only when you want the exact questions.`
      : latest
        ? `Average score is ${averageScore}%. Use the trend and drill-down panels to decide what to practise next.`
        : "Complete a timed quest to unlock trend lines and focus areas.";
    return `
      <p class="eyebrow">Recommendation</p>
      <h3>${escapeHtml(headline)}</h3>
      <p>${escapeHtml(copy)} ${training.untouched.length ? `${training.untouched.length} training areas remain untouched.` : "All training areas have been opened."}</p>
    `;
  }

  function renderTrendChart(attempts) {
    if (!attempts.length) return `<div class="empty-state">Complete a test to see the trend line.</div>`;
    const recent = attempts.slice(-10);
    const width = 520;
    const height = 180;
    const pad = 28;
    const points = recent.map((attempt, index) => {
      const x = recent.length === 1 ? width / 2 : pad + (index * (width - pad * 2)) / (recent.length - 1);
      const y = height - pad - ((attempt.percent || 0) / 100) * (height - pad * 2);
      return { x, y, attempt };
    });
    const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
    return `
      <svg class="parent-trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Parent score trend">
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" class="parent-axis"/>
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" class="parent-axis"/>
        <polyline points="${polyline}" class="parent-trend-line"/>
        ${points.map((point) => `
          <g>
            <circle cx="${point.x}" cy="${point.y}" r="7" class="parent-trend-dot"></circle>
            <text x="${point.x}" y="${Math.max(18, point.y - 12)}" text-anchor="middle">${point.attempt.percent}%</text>
          </g>
        `).join("")}
      </svg>
    `;
  }

  function renderFocusBars(summaries) {
    if (!summaries.length) return `<div class="empty-state">No slow or missed question pattern yet.</div>`;
    const maxScore = Math.max(...summaries.map((summary) => summary.score), 1);
    return summaries.slice(0, 4).map((summary) => `
      <div class="parent-focus-bar">
        <div><strong>${escapeHtml(summary.skill)}</strong><span>${summary.missed} missed / avg ${formatDuration(summary.averageSeconds)}</span></div>
        <i style="--bar:${Math.max(12, Math.round((summary.score / maxScore) * 100))}%"></i>
      </div>
    `).join("");
  }

  function renderWritingSnapshot(items) {
    if (!items.length) return `<div class="empty-state">No writing answers saved yet.</div>`;
    return items.map(({ attempt, question }) => `
      <div class="parent-writing-chip">
        <strong>${escapeHtml(attempt.levelName)}</strong>
        <span>${question.writingScore ? `${question.writingScore.total}/20` : "Saved for review"}</span>
      </div>
    `).join("");
  }

  function renderFocusDrilldown(summaries) {
    if (!summaries.length) return `<div class="empty-state">No slow or missed question pattern yet.</div>`;
    return summaries.map((summary, index) => `
      <div class="parent-focus-card">
        <div>
          <h4>${escapeHtml(summary.skill)}</h4>
          <p>${escapeHtml(summary.section || "Mixed")} / ${summary.count} flagged / ${summary.missed} missed / avg ${formatDuration(summary.averageSeconds)}</p>
        </div>
        <button class="button button-soft" type="button" data-parent-panel="focus-${index}" data-open-text="View evidence" data-close-text="Hide evidence">View evidence</button>
        <div class="parent-panel-body hidden" data-parent-panel-body="focus-${index}">
          ${summary.questions.map((question) => `
            <div class="parent-evidence-row">
              <strong>Q${question.number} ${escapeHtml(question.attempt.levelName)}</strong>
              <p>${escapeHtml(question.correct ? "Correct but slow" : "Missed")} / ${formatDuration(question.secondsSpent || 0)}</p>
              <p>${escapeHtml(shorten(question.prompt, 220))}</p>
              ${question.correct === false ? `<p>Correct answer: ${escapeHtml(question.correctText || "")}</p>` : ""}
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderLayeredRecords(attempts, training, questionStats) {
    return `
      <div class="parent-layer-card">
        <div>
          <h4>Test history</h4>
          <p>${attempts.length} completed attempt${attempts.length === 1 ? "" : "s"} with full answer records hidden below.</p>
        </div>
        <button class="button button-soft" type="button" data-parent-panel="attempts" data-open-text="Show tests" data-close-text="Hide tests">Show tests</button>
        <div class="parent-panel-body hidden" data-parent-panel-body="attempts">
          ${attempts.slice().reverse().map((attempt, index) => renderAttemptRecord(attempt, index)).join("") || `<div class="empty-state">No completed tests yet.</div>`}
        </div>
      </div>
      <div class="parent-layer-card">
        <div>
          <h4>Training coverage</h4>
          <p>${training.completed.length} opened / ${training.untouched.length} untouched.</p>
        </div>
        <button class="button button-soft" type="button" data-parent-panel="training" data-open-text="Show training" data-close-text="Hide training">Show training</button>
        <div class="parent-panel-body hidden" data-parent-panel-body="training">
          <div class="parent-mini-grid">
            ${training.completed.map((skill) => `<span class="done">${escapeHtml(skill)}</span>`).join("")}
            ${training.untouched.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
          </div>
        </div>
      </div>
      <div class="parent-layer-card">
        <div>
          <h4>All question records</h4>
          <p>${questionStats.length} saved question record${questionStats.length === 1 ? "" : "s"} remain available for audit.</p>
        </div>
        <button class="button button-soft" type="button" data-parent-panel="all-questions" data-open-text="Show records" data-close-text="Hide records">Show records</button>
        <div class="parent-panel-body hidden" data-parent-panel-body="all-questions">
          ${questionStats.map((question) => `
            <div class="parent-evidence-row">
              <strong>${escapeHtml(question.attempt.levelName)} / Q${question.number} / ${escapeHtml(question.skill)}</strong>
              <p>${escapeHtml(question.format === "writing" ? "Writing response" : question.correct ? "Correct" : "Missed")} / ${formatDuration(question.secondsSpent || 0)}</p>
              <p>${escapeHtml(shorten(question.prompt, 220))}</p>
            </div>
          `).join("") || `<div class="empty-state">No question records yet.</div>`}
        </div>
      </div>
    `;
  }

  function renderAttemptRecord(attempt, index) {
    return `
      <div class="parent-attempt-card">
        <div>
          <h4>${escapeHtml(attempt.levelName)} - ${attempt.percent}%</h4>
          <p>${new Date(attempt.date).toLocaleString()} / ${attempt.correct} of ${attempt.total} correct / ${formatDuration(attempt.secondsUsed || 0)}</p>
        </div>
        <button class="button button-soft" type="button" data-parent-panel="attempt-${index}" data-open-text="View answers" data-close-text="Hide answers">View answers</button>
        <div class="parent-panel-body hidden" data-parent-panel-body="attempt-${index}">
          ${(attempt.questionStats || []).map((question) => `
            <div class="parent-evidence-row ${question.correct === false ? "missed" : ""}">
              <strong>Q${question.number} / ${escapeHtml(question.section)} / ${escapeHtml(question.skill)}</strong>
              <p>${escapeHtml(question.format === "writing" ? "Writing" : question.correct ? "Correct" : "Missed")} / ${formatDuration(question.secondsSpent || 0)}</p>
              <p>${escapeHtml(shorten(question.prompt, 240))}</p>
              ${question.format === "writing"
                ? `<p>Response: ${escapeHtml(shorten(question.answerText || "No response saved.", 260))}</p>`
                : `<p>Selected: ${escapeHtml(question.selectedText || "No answer")} / Correct: ${escapeHtml(question.correctText || "")}</p>`}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
})();
