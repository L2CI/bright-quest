import { selectQuestions, INTENTS, MOVES, BATTLE_CONFIG } from "./sparkbound-content.js";
export { INTENTS, MOVES, BATTLE_CONFIG };

export class SparkError extends Error {
  constructor(code, message, status = 409) {
    super(message);
    this.name = "SparkError";
    this.code = code;
    this.status = status;
  }
}
const fail = (code, message, status = 409) => { throw new SparkError(code, message, status); };
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
function plain(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return (proto === Object.prototype || proto === null) && Reflect.ownKeys(value).every((key) =>
    typeof key === "string" && own(Object.getOwnPropertyDescriptor(value, key), "value"));
}
function profileValid(id) {
  return typeof id === "string" && id.length > 0 && id.length <= 128 && id === id.trim() && !/[\x00-\x1f\x7f]/.test(id);
}
export function createState(options = {}) {
  if (!plain(options) || !own(options, "profileId") || Reflect.ownKeys(options).some((key) => key !== "profileId"))
    fail("INVALID_PROFILE", "Provide only a profile id.", 400);
  const { profileId } = options;
  if (!profileValid(profileId)) fail("INVALID_PROFILE", "A valid profile id is required.", 400);
  return { profileId, version: 0, tier: 1, wins: 0, nextMatchNumber: 1, match: null, history: [] };
}
function validateState(state) {
  if (!plain(state) || !profileValid(state.profileId) || !Number.isSafeInteger(state.version) || state.version < 0 ||
      state.version >= Number.MAX_SAFE_INTEGER || !Number.isSafeInteger(state.nextMatchNumber) || state.nextMatchNumber < 1 ||
      !Number.isSafeInteger(state.wins) || state.wins < 0 || !Number.isSafeInteger(state.tier) || state.tier < 1 ||
      !Array.isArray(state.history) || !(state.match === null || plain(state.match))) {
    fail("INVALID_STATE", "The saved state is invalid.", 400);
  }
  const m = state.match;
  if (m && (!Number.isSafeInteger(m.round) || m.round < 1 || m.round > 3 ||
      !["battle", "round_won", "rival_upgrade", "training", "player_upgrade", "defeat", "victory"].includes(m.phase) ||
      !Number.isSafeInteger(m.energy) || m.energy < 0 || m.energy > 4 ||
      ![m.playerHP, m.rivalHP, m.exchange].every((n) => Number.isSafeInteger(n) && n >= 0) ||
      !Array.isArray(m.questions) || m.questions.length !== 4 ||
      !Number.isSafeInteger(m.questionIndex) || m.questionIndex < 0 || m.questionIndex > 4 ||
      (m.phase === "battle" && !own(INTENTS, m.intent))))
    fail("INVALID_STATE", "The saved match is invalid.", 400);
}
const fields = {
  start: [], move: ["move"], continue: [], answer: ["questionId", "answer"],
  hint: ["questionId"], retry: ["support"], reset: []
};
function validateAction(action) {
  if (!plain(action) || !own(action, "type") || typeof action.type !== "string" || !own(fields, action.type) || Reflect.ownKeys(action).some((key) =>
    !["type", "expectedVersion", ...fields[action.type]].includes(key))) {
    fail("INVALID_ACTION", "Unknown action or unexpected action fields.", 400);
  }
  if (own(action, "expectedVersion") && (!Number.isSafeInteger(action.expectedVersion) || action.expectedVersion < 0))
    fail("INVALID_ACTION", "expectedVersion must be a nonnegative integer.", 400);
  if (action.type === "move" && (typeof action.move !== "string" || !own(MOVES, action.move)))
    fail("INVALID_MOVE", "Choose Strike, Guard, Break or Special.", 400);
  if (["hint", "answer"].includes(action.type) && (typeof action.questionId !== "string" || !action.questionId.length || action.questionId.length > 100))
    fail("INVALID_QUESTION", "A valid questionId is required.", 400);
  if (action.type === "retry" && own(action, "support") && typeof action.support !== "boolean")
    fail("INVALID_ACTION", "support must be a boolean.", 400);
}
function requirePhase(match, ...phases) {
  if (!match || !phases.includes(match.phase)) fail("INVALID_PHASE", "This action is not available in the current phase.");
}
function hash(text) {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.charCodeAt(0), 16777619) >>> 0;
  return value;
}
function intentAt(match) {
  if (match.round === 1 && match.exchange < 2) return ["open", "strike"][match.exchange];
  if (match.round === 2 && match.exchange === 0) return "guard";
  const sequence = BATTLE_CONFIG.sequences[(match.seed + match.round - 1) % BATTLE_CONFIG.sequences.length];
  const offset = match.round === 1 ? 2 : match.round === 2 ? 1 : 0;
  return sequence[(match.exchange - offset) % sequence.length];
}
function event(state, kind, details = {}) {
  state.match.lastEvent = { id: `${state.match.id}:v${state.version}`, kind,
    move: null, intent: null, damage: 0, rivalDamage: 0, guardBroken: false, ...details };
}
function prepareRound(match) {
  Object.assign(match, BATTLE_CONFIG.rounds[match.round - 1], { phase: "battle", exchange: 0 });
  match.energy = match.round === 3 ? BATTLE_CONFIG.maxEnergy : 2;
  match.intent = intentAt(match);
}
function archive(state, outcome) {
  if (state.match) state.history.push({ ...structuredClone(state.match), outcome });
}
function start(state) {
  if (state.match) requirePhase(state.match, "victory");
  if (state.nextMatchNumber >= Number.MAX_SAFE_INTEGER) fail("MATCH_LIMIT", "Match numbering has reached its safe limit.");
  archive(state, "victory");
  const number = state.nextMatchNumber++;
  state.match = { id: `${state.profileId}:match-${number}`, number, round: 1,
    phase: "battle", playerHP: 0, rivalHP: 0, energy: 2, playerPower: 10, rivalPower: 10,
    intent: "open", staff: false, pad: false, exchange: 0, lastEvent: null,
    questions: selectQuestions(number).map((question) => ({ ...question, attempts: [],
      hintsUsed: 0, supportEvents: [], feedback: null, resolved: false, completion: null })),
    questionIndex: 0, seed: hash(`${state.profileId}:${number}`), roundAttempt: 1,
    assisted: false, rewardGranted: false, trainingStage: 0 };
  prepareRound(state.match);
  event(state, "match_started");
}
function move(state, action) {
  const match = state.match;
  requirePhase(match, "battle");
  const name = action.move;
  if ((name === "break" && !match.staff) || (name === "special" && !match.pad))
    fail("MOVE_LOCKED", "Complete the forge for this technique.");
  if (match.energy < MOVES[name].cost) fail("INSUFFICIENT_ENERGY", "Build more energy first.");
  const intent = match.intent;
  const incoming = BATTLE_CONFIG.incoming[intent];
  let damage = 0;
  let rivalDamage = incoming;
  let guardBroken = false;
  if (name === "guard") {
    rivalDamage = Math.floor(incoming / 5);
    if (incoming > 0) match.energy = Math.min(4, match.energy + 2);
  } else if (name === "strike") {
    damage = intent === "guard" ? (match.round === 1 ? 2 : 0) : 4;
    match.energy = Math.min(4, match.energy + 1);
  } else if (name === "break") {
    damage = intent === "guard" ? 10 : 6;
    guardBroken = intent === "guard";
    match.energy -= 2;
  } else {
    damage = 12;
    guardBroken = intent === "guard";
    match.energy = 0;
  }
  if (match.assisted && rivalDamage > 0) rivalDamage = Math.floor(rivalDamage / 2);
  const dealt = Math.min(match.rivalHP, damage);
  const received = Math.min(match.playerHP, rivalDamage);
  match.rivalHP -= dealt;
  match.playerHP -= received;
  match.exchange++;
  if (match.playerHP === 0) match.phase = "defeat";
  else if (match.rivalHP === 0) match.phase = "round_won";
  match.intent = match.phase === "battle" ? intentAt(match) : null;
  event(state, "exchange", { move: name, intent, damage: dealt, rivalDamage: received,
    guardBroken, phase: match.phase, exchange: match.exchange });
}
function advance(state) {
  const match = state.match;
  requirePhase(match, "round_won", "rival_upgrade", "player_upgrade");
  if (match.phase === "round_won") {
    if (match.round === 3) {
      if (match.rewardGranted) fail("REWARD_GRANTED", "This match has already been rewarded.");
      match.rewardGranted = true;
      state.wins++;
      state.tier++;
      match.phase = "victory";
      event(state, "victory", { tier: state.tier });
    } else {
      match.phase = "rival_upgrade";
      event(state, "rival_upgrade", { upgrade: match.round === 1 ? "shield" : "pressure" });
    }
  } else if (match.phase === "rival_upgrade") {
    match.phase = "training";
    match.trainingStage = match.round;
    event(state, "training_started", { forge: match.round === 1 ? "maths" : "science" });
  } else {
    match.round++;
    match.roundAttempt = 1;
    prepareRound(match);
    event(state, "round_started", { round: match.round });
  }
}
function currentQuestion(match, id) {
  requirePhase(match, "training");
  const question = match.questions[match.questionIndex];
  if (!question || question.id !== id || question.resolved) fail("QUESTION_NOT_CURRENT", "This is not the current unresolved task.");
  return question;
}
function normalise(question, answer) {
  if (question.type === "numeric") {
    if (typeof answer === "string" && /^-?(0|[1-9][0-9]{0,5})$/.test(answer)) return Number(answer);
    if (typeof answer === "number" && Number.isSafeInteger(answer) && Math.abs(answer) <= 999999) return answer;
    fail("INVALID_ANSWER", "Enter a whole number of at most six digits.", 400);
  }
  const ids = question.choices.map((choice) => choice.id);
  if (question.type === "mcq") {
    if (typeof answer === "string" && ids.includes(answer)) return answer;
    fail("INVALID_ANSWER", "Choose one of the displayed options.", 400);
  }
  if (question.type === "order" && Array.isArray(answer) && Object.getPrototypeOf(answer) === Array.prototype &&
      answer.length === ids.length && Object.keys(answer).length === ids.length &&
      Reflect.ownKeys(answer).length === ids.length + 1 &&
      ids.every((_, i) => own(Object.getOwnPropertyDescriptor(answer, String(i)) || {}, "value")) &&
      answer.every((id) => typeof id === "string" && ids.includes(id)) && new Set(answer).size === ids.length) return [...answer];
  fail("INVALID_ANSWER", "Arrange every displayed option exactly once.", 400);
}
function support(question, level, state, source) {
  level = Math.max(question.hintsUsed, level);
  question.hintsUsed = level;
  question.feedback = { kind: level === 2 ? "worked" : "hint", message: question.hints[level - 1] };
  question.supportEvents.push({ level, source, version: state.version, feedback: structuredClone(question.feedback) });
}
function answer(state, action) {
  const match = state.match;
  const question = currentQuestion(match, action.questionId);
  const value = normalise(question, action.answer);
  const correct = JSON.stringify(value) === JSON.stringify(question.answer);
  if (!correct && question.attempts.length >= 32) fail("ATTEMPT_LIMIT", "Your attempts are preserved. Follow the worked solution to complete this task.");
  const assistanceLevel = question.hintsUsed;
  if (!correct) support(question, Math.min(2, question.attempts.filter((a) => !a.correct).length + 1), state, "wrong_answer");
  else question.feedback = { kind: "correct", message: question.explanation };
  question.attempts.push({ answer: structuredClone(action.answer), normalizedAnswer: value, correct,
    assistanceLevel, version: state.version, feedback: structuredClone(question.feedback) });
  if (correct) {
    question.resolved = true;
    question.completion = assistanceLevel === 2 ? "worked" : assistanceLevel === 1 ? "hinted" :
      question.attempts.length === 1 ? "independent" : "retried";
    match.questionIndex++;
    if (match.questionIndex === match.trainingStage * 2) {
      if (match.trainingStage === 1) match.staff = true;
      else match.pad = true;
      match.phase = "player_upgrade";
    }
  }
  event(state, correct ? "answer_correct" : "answer_wrong", { questionId: question.id,
    feedback: structuredClone(question.feedback), completion: question.completion,
    upgrade: match.phase === "player_upgrade" ? (match.staff && !match.pad ? "staff" : "pad") : null });
}

export function applyAction(state, action) {
  validateState(state);
  validateAction(action);
  if (own(action, "expectedVersion") && action.expectedVersion !== state.version)
    fail("STALE_VERSION", "The match changed. Reload its current state.");
  const next = structuredClone(state);
  next.version++;
  switch (action.type) {
    case "start": start(next); break;
    case "move": move(next, action); break;
    case "continue": advance(next); break;
    case "answer": answer(next, action); break;
    case "hint": {
      const question = currentQuestion(next.match, action.questionId);
      if (question.hintsUsed >= 2) fail("SUPPORT_COMPLETE", "The worked solution is already shown.");
      support(question, question.hintsUsed + 1, next, "hint_request");
      event(next, "hint", { questionId: question.id, feedback: structuredClone(question.feedback) });
      break;
    }
    case "retry": {
      requirePhase(next.match, "defeat");
      next.match.roundAttempt++;
      next.match.assisted ||= action.support === true;
      prepareRound(next.match);
      event(next, "retry", { assisted: next.match.assisted, roundAttempt: next.match.roundAttempt });
      break;
    }
    case "reset":
      archive(next, next.match?.phase === "victory" ? "victory" : "reset");
      next.match = null;
      break;
  }
  return next;
}

export function publicState(state, { review = false } = {}) {
  validateState(state);
  if (typeof review !== "boolean") fail("INVALID_REVIEW", "review must be a boolean.", 400);
  const result = structuredClone(state);
  result.configuration = structuredClone({ intents: INTENTS, moves: MOVES,
    battle: { maxEnergy: BATTLE_CONFIG.maxEnergy, rounds: BATTLE_CONFIG.rounds } });
  if (review) return result;
  const project = (match) => {
    delete match.seed;
    match.questions = match.questions.map((question, index) => {
      if (!question.resolved && (match.phase !== "training" || index !== match.questionIndex))
        return { id: question.id, forge: question.forge };
      const { id, taskId, variant, forge, type, skill, title, prompt, choices, evidence,
        outcome, hintsUsed, feedback, resolved, completion } = question;
      return { id, taskId, variant, forge, type, skill, title, prompt, choices, evidence,
        outcome, hintsUsed, feedback, resolved, completion };
    });
    return match;
  };
  if (result.match) result.match = project(result.match);
  result.history = result.history.map(({ id, number, round, phase, outcome, assisted }) =>
    ({ id, number, round, phase, outcome, assisted }));
  return result;
}
