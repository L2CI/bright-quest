import { getHero } from './sparkbound/roster.js';
let active = null;
const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const exact = (value) => JSON.stringify(value) ?? "Not recorded";
const missed = (q) => q.attempts?.some((attempt) => attempt.correct === false);

export function closeSparkboundReview(navigate = false) {
  if (!active) return;
  const current = active;
  active = null;
  current.abort.abort();
  clearInterval(current.timer);
  window.removeEventListener("popstate", current.onBack);
  current.dialog.close();
  current.dialog.remove();
  if (current.opener?.isConnected) current.opener.focus({ preventScroll: true });
  if (history.state?.sparkboundReview === current.id) {
    if (navigate) history.back();
    else {
      const next = { ...history.state };
      delete next.sparkboundReview;
      history.replaceState(next, "");
    }
  }
}

export function openSparkboundReview({ profile, opener, isCurrent }) {
  closeSparkboundReview();
  if (!isCurrent()) return;
  if (!document.querySelector('link[data-sparkbound-parent]')) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "/sparkbound-parent.css";
    style.dataset.sparkboundParent = "true";
    document.head.append(style);
  }
  const dialog = document.createElement("dialog");
  dialog.id = "bqSparkboundReviewPopup";
  dialog.className = "bq-spark-review";
  dialog.setAttribute("aria-labelledby", "bqSparkboundReviewTitle");
  dialog.innerHTML = `<header><div><p>${escape(profile.name)}</p><h2 id="bqSparkboundReviewTitle">Sparkbound training</h2></div>
    <button type="button" class="button button-soft" data-spark-review-close aria-label="Close Sparkbound review">Close</button></header>
    <div data-spark-review-body aria-busy="true"><p role="status">Loading saved training...</p></div>`;
  document.body.append(dialog);
  const current = { dialog, opener, abort: new AbortController(), id: crypto.randomUUID(), onBack: () => closeSparkboundReview() };
  active = current;
  history.pushState({ ...history.state, sparkboundReview: current.id }, "");
  window.addEventListener("popstate", current.onBack);
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeSparkboundReview(true); });
  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-spark-review-close]")) closeSparkboundReview(true);
    if (event.target.closest("[data-spark-review-retry]")) void load();
  });
  const capability = () => new Headers(window.BrightQuestFamilyAuth?.requestHeaders?.() || {}).get("x-bq-parent-capability");
  const openedCapability = capability();
  const valid = () => active === current && isCurrent() && capability() === openedCapability;
  current.timer = setInterval(() => { if (!valid()) closeSparkboundReview(); }, 250);
  dialog.showModal();
  dialog.querySelector("button").focus();
  void load();

  async function load() {
    if (!valid()) return;
    const body = dialog.querySelector("[data-spark-review-body]");
    body.setAttribute("aria-busy", "true");
    body.innerHTML = '<p role="status">Loading saved training...</p>';
    try {
      const listing = await fetchReview("/api/profiles", current.abort.signal);
      if (!valid()) return;
      const matches = (listing.profiles || []).filter((row) => row.profileId === profile.id || row.childId === profile.id);
      if (matches.length !== 1 || !matches[0].childId) throw new Error("This child could not be matched to the signed-in family.");
      const data = await fetchReview(`/api/sparkbound?childId=${encodeURIComponent(matches[0].childId)}`, current.abort.signal);
      if (!valid()) return;
      if (!data.state || !Array.isArray(data.state.history) || !data.profile?.id
        || data.profile.id !== matches[0].childId || data.profile.id !== data.state.profileId) throw new Error("Saved training could not be matched to this child.");
      body.innerHTML = renderSparkboundEvidence(data.state);
    } catch (error) {
      if (!valid() || error.name === "AbortError") return;
      body.innerHTML = `<p role="alert">${escape(error.message)}</p><button type="button" class="button button-soft" data-spark-review-retry>Try again</button>`;
    } finally { if (valid()) body.setAttribute("aria-busy", "false"); }
  }
}

async function fetchReview(url, signal) {
  let response;
  try { response = await fetch(url, { credentials: "same-origin", cache: "no-store", signal,
    headers: window.BrightQuestFamilyAuth?.requestHeaders?.() || {} }); }
  catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("Could not connect. Check your connection and try again.");
  }
  if ([401, 403].includes(response.status)) throw new Error("Parent access has expired. Close this review and unlock Parent again.");
  if (!response.ok) throw new Error("Saved training could not be loaded. Please try again.");
  try { return await response.json(); }
  catch { throw new Error("Saved training could not be read. Please try again."); }
}

export function renderSparkboundEvidence(saved) {
  const matches = [...(saved.match ? [saved.match] : []), ...saved.history.slice().reverse()];
  const rows = matches.flatMap((match) => (match.questions || []).map((question) => ({ match, question })))
    .filter(({ question }) => question.attempts?.length || question.hintsUsed || question.resolved);
  if (!rows.length) return '<p role="status">No saved training answers yet.</p>';
  const wrong = rows.filter(({ question }) => missed(question));
  const supported = rows.filter(({ question }) => !missed(question) && question.completion !== "independent");
  const independent = rows.filter(({ question }) => !missed(question) && question.completion === "independent");
  return `<p class="bq-spark-summary">${rows.length} training records &middot; ${wrong.length} with incorrect answers</p>
    ${wrong.length ? `<h3>Incorrect answers, including later corrections</h3>${wrong.map(renderQuestion).join("")}` : ""}
    ${supported.length ? `<h3>Supported or unfinished training</h3>${supported.map(renderQuestion).join("")}` : ""}
    ${independent.length ? `<details><summary>Correct first try (${independent.length})</summary>${independent.map(renderQuestion).join("")}</details>` : ""}`;
}

function answerLabel(q, value) {
  if (Array.isArray(value)) return value.map((id) => answerLabel(q, id)).join(" -> ");
  return q.choices?.find((choice) => choice.id === value)?.label ?? String(value ?? "Not recorded");
}

function renderQuestion({ match, question: q }) {
  const hints = Number(q.hintsUsed || 0);
  return `<article class="bq-spark-question ${missed(q) ? "missed" : ""}" data-spark-question="${escape(q.id)}">
    <p class="bq-spark-context">Match ${escape(match.number)} &middot; ${escape(getHero(match.heroId).name)}${q.forgeStage ? ` &middot; Upgrade ${escape(q.forgeStage)} of 5` : ''} &middot; ${escape(q.difficulty || 'Foundation')} &middot; ${escape(q.skill)} &middot; ${escape(q.completion || "Unfinished")}</p>
    <h4>${escape(q.title)}</h4><p>${escape(q.prompt)}</p>
    ${q.choices?.length ? `<ul>${q.choices.map((choice) => `<li>${escape(choice.id)}: ${escape(choice.label)}</li>`).join("")}</ul>` : ""}
    ${q.evidence ? `<details><summary>Original task evidence</summary><pre>${escape(JSON.stringify(q.evidence, null, 2))}</pre></details>` : ""}
    <p><strong>Hints used:</strong> ${hints}. <strong>Worked support:</strong> ${hints >= 2 || q.completion === "worked" ? "Yes" : "No"}.</p>
    ${hints ? `<ol>${(q.hints || []).slice(0, hints).map((hint) => `<li>${escape(hint)}</li>`).join("")}</ol>` : ""}
    ${q.attempts?.length ? `<ol class="bq-spark-attempts">${q.attempts.map((attempt, index) => `<li>
      <strong>${index === 0 ? "Original answer" : `Attempt ${index + 1}`}:</strong> ${escape(answerLabel(q, attempt.answer))}
      <code>${escape(exact(attempt.answer))}</code><span>${attempt.correct ? "Correct" : "Incorrect"}</span>
      <span>Support at submission: ${escape(["None", "Clue", "Worked solution"][attempt.assistanceLevel] ?? "Not recorded")}</span>
      <p>${escape(attempt.feedback?.message ?? attempt.feedback)}</p></li>`).join("")}</ol>` : "<p>No answer submitted.</p>"}
    ${q.supportEvents?.length ? `<details><summary>Support history (${q.supportEvents.length})</summary><ol>${q.supportEvents.map((event) => `<li>${event.level === 2 ? "Worked solution" : "Clue"} (${escape(event.source)})<p>${escape(event.feedback?.message)}</p></li>`).join("")}</ol></details>` : ""}
    <p><strong>Correct answer:</strong> ${escape(answerLabel(q, q.answer))} <code>${escape(exact(q.answer))}</code></p>
    <p>${escape(q.explanation)}</p>
  </article>`;
}
