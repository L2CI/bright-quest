import test from "node:test";
import assert from "node:assert/strict";
import { createState, applyAction, publicState, SparkError, INTENTS, MOVES, BATTLE_CONFIG } from "../functions/_lib/sparkbound.js";

const fresh = (profileId = "domain-child") => applyAction(createState({ profileId }), { type: "start" });
const adaptive = (m) => m.intent === "heavy" ? "guard" : m.pad && m.energy === 4 ? "special" :
  m.staff && m.intent === "guard" ? (m.energy >= 2 ? "break" : "guard") : "strike";
function step(s, policy = adaptive) {
  const m = s.match;
  const q = m.questions[m.questionIndex];
  return applyAction(s, m.phase === "battle" ? { type: "move", move: policy(m) } :
    m.phase === "training" ? { type: "answer", questionId: q.id, answer: q.answer } : { type: "continue" });
}
function until(s, predicate, policy = adaptive, limit = 300) {
  for (let i = 0; i < limit; i++) {
    if (predicate(s)) return s;
    if (s.match.phase === "defeat") throw new Error(`Unexpected defeat in round ${s.match.round}`);
    s = step(s, policy);
  }
  throw new Error("Scenario did not reach its target");
}
const training = () => until(fresh(), (s) => s.match.phase === "training");
const round = (n, id) => until(fresh(id), (s) => s.match.round === n && s.match.phase === "battle");
const error = (fn, code, status) => assert.throws(fn, (e) => e instanceof SparkError && e.code === code && (!status || e.status === status));
const submit = (s, answer) => applyAction(s, { type: "answer", questionId: s.match.questions[s.match.questionIndex].id, answer });
const hint = (s) => applyAction(s, { type: "hint", questionId: s.match.questions[s.match.questionIndex].id });
function deepFreeze(v) { if (v && typeof v === "object") { Object.values(v).forEach(deepFreeze); Object.freeze(v); } return v; }

test("creation has stable fields, unique profile scope and no ambient clock/randomness", () => {
  const s = createState({ profileId: "child" });
  assert.deepEqual(s, { profileId: "child", version: 0, tier: 1, wins: 0, nextMatchNumber: 1, match: null, history: [] });
  assert.deepEqual(fresh(), fresh());
  assert.notEqual(fresh("one").match.id, fresh("two").match.id);
});
for (const id of [undefined, null, "", " ", " child", "child\n", 1, {}, "a".repeat(129)]) {
  test(`invalid profile ${JSON.stringify(id)}`, () => error(() => createState({ profileId: id }), "INVALID_PROFILE", 400));
}
test("every accepted action increments version once and has a stable event id", () => {
  const s = fresh();
  const n = applyAction(s, { type: "move", move: "strike", expectedVersion: s.version });
  assert.equal(n.version, s.version + 1);
  assert.equal(n.match.lastEvent.id, `${n.match.id}:v${n.version}`);
  assert.notEqual(n.match.lastEvent.id, s.match.lastEvent.id);
});
const badActions = [null, [], "start", {}, { type: "constructor" }, { type: "__proto__" },
  { type: ["start"] }, { type: {} }, { type: "start", profileId: "victim" }, { type: "move", move: "Strike" },
  { type: "move", move: "constructor" }, { type: "move", move: {} }, { type: "move" },
  { type: "start", expectedVersion: "1" }, { type: "start", expectedVersion: NaN },
  { type: "start", expectedVersion: -1 }, { type: "start", expectedVersion: Infinity },
  { type: "retry", support: "true" }, { type: "answer", questionId: [] },
  JSON.parse('{"type":"start","__proto__":{"wins":999}}'), { type: "start", [Symbol("hidden")]: true }];
for (const [i, action] of badActions.entries()) test(`strict malformed action ${i + 1}`, () => {
  const s = fresh(), copy = structuredClone(s);
  assert.throws(() => applyAction(s, action), SparkError);
  assert.deepEqual(s, copy);
});
test("inherited properties and action accessors are rejected without executing getters", () => {
  const action = Object.create({ type: "start" });
  error(() => applyAction(fresh(), action), "INVALID_ACTION");
  let read = false;
  const getter = { get type() { read = true; return "start"; } };
  error(() => applyAction(fresh(), getter), "INVALID_ACTION");
  assert.equal(read, false);
  const hidden = { type: "start" };
  Object.defineProperty(hidden, "wins", { value: 999 });
  error(() => applyAction(fresh(), hidden), "INVALID_ACTION");
});
test("stale replay cannot apply another move or grant again", () => {
  const s = fresh(), action = { type: "move", move: "strike", expectedVersion: s.version };
  const n = applyAction(s, action);
  error(() => applyAction(n, action), "STALE_VERSION", 409);
  assert.deepEqual(applyAction(s, action), n);
});
test("frozen inputs remain unchanged and output aliases neither input", () => {
  const s = deepFreeze(training());
  const action = deepFreeze({ type: "answer", questionId: s.match.questions[0].id, answer: "24" });
  const next = applyAction(s, action);
  next.match.questions[0].prompt = "edited";
  assert.notEqual(s.match.questions[0].prompt, "edited");
  assert.equal(action.answer, "24");
});
test("public projection is detached, configured without bank or future enemy sequences", () => {
  const s = fresh(), p = publicState(s);
  assert.deepEqual(p.configuration.intents, INTENTS);
  assert.deepEqual(p.configuration.moves, MOVES);
  assert.equal(p.configuration.battle.maxEnergy, 4);
  assert.equal(p.configuration.battle.rounds[0].playerHP, s.match.playerHP);
  assert.equal(p.configuration.battle.sequences, undefined);
  assert.equal(p.match.seed, undefined);
  for (const q of p.match.questions) assert.deepEqual(Object.keys(q), ["id", "forge"]);
  p.configuration.moves.strike.label = "changed";
  assert.equal(MOVES.strike.label, "Strike");
});
test("review option must be boolean, not truthy browser data", () => error(() => publicState(fresh(), { review: "false" }), "INVALID_REVIEW"));
test("malformed create payload and corrupt saved counters reject with SparkError", () => {
  for (const options of [null, [], "child", { profileId: "child", wins: 100 }])
    error(() => createState(options), "INVALID_PROFILE");
  for (const value of [null, {}, { ...fresh(), version: -1 }, { ...fresh(), version: Number.MAX_SAFE_INTEGER }])
    error(() => applyAction(value, { type: "start" }), "INVALID_STATE");
  for (const [key, value] of [["phase", "invented"], ["round", 0], ["energy", -1], ["playerHP", NaN], ["intent", "unknown"], ["questions", []]]) {
    const s = fresh(); s.match[key] = value;
    error(() => applyAction(s, { type: "move", move: "strike" }), "INVALID_STATE");
  }
});
test("first teaching exchange is safe, has only Strike/Guard; Break then Special unlock", () => {
  const s = fresh();
  assert.equal(s.match.intent, "open");
  error(() => applyAction(s, { type: "move", move: "break" }), "MOVE_LOCKED");
  error(() => applyAction(s, { type: "move", move: "special" }), "MOVE_LOCKED");
  const n = applyAction(s, { type: "move", move: "strike" });
  assert.equal(n.match.playerHP, s.match.playerHP);
  assert.equal(n.match.lastEvent.damage, 4);
  assert.equal(n.match.intent, "strike");
  error(() => applyAction(round(2), { type: "move", move: "special" }), "MOVE_LOCKED");
  assert.equal(round(3).match.pad, true);
});
test("intent is committed before action and independent of selected move", () => {
  const s = fresh();
  const a = applyAction(s, { type: "move", move: "strike" });
  const b = applyAction(s, { type: "move", move: "guard" });
  assert.equal(a.match.lastEvent.intent, s.match.intent);
  assert.equal(b.match.lastEvent.intent, s.match.intent);
  assert.equal(a.match.intent, b.match.intent);
});
test("guarding open stance grants no energy; guarding an actual hit grants two", () => {
  const s = fresh();
  const a = applyAction(s, { type: "move", move: "guard" });
  assert.equal(a.match.energy, s.match.energy);
  assert.equal(a.match.rivalHP, s.match.rivalHP);
  const b = applyAction(a, { type: "move", move: "guard" });
  assert.equal(b.match.energy, 4);
  assert.equal(b.match.lastEvent.rivalDamage, 0);
});
test("staff Break pierces committed guard, spends energy, and makes a categorical event", () => {
  const s = round(2);
  assert.equal(s.match.intent, "guard");
  const hit = applyAction(s, { type: "move", move: "strike" });
  const broken = applyAction(s, { type: "move", move: "break" });
  assert.equal(hit.match.lastEvent.damage, 0);
  assert.equal(broken.match.lastEvent.damage, 10);
  assert.equal(broken.match.energy, 0);
  assert.equal(broken.match.lastEvent.guardBroken, true);
  error(() => applyAction(broken, { type: "move", move: "break" }), "INSUFFICIENT_ENERGY");
});
test("Special empties the shared meter and is not invulnerable", () => {
  let s = round(3);
  while (s.match.intent === "open") s = applyAction(s, { type: "move", move: "guard" });
  const n = applyAction(s, { type: "move", move: "special" });
  assert.equal(n.match.energy, 0);
  assert.equal(n.match.lastEvent.damage, 12);
  assert.ok(n.match.lastEvent.rivalDamage > 0);
  error(() => applyAction(n, { type: "move", move: "special" }), "INSUFFICIENT_ENERGY");
});
test("continue cannot skip battle or unresolved training", () => {
  error(() => applyAction(fresh(), { type: "continue" }), "INVALID_PHASE");
  error(() => applyAction(training(), { type: "continue" }), "INVALID_PHASE");
  error(() => applyAction(training(), { type: "move", move: "strike" }), "INVALID_PHASE");
});
test("three actual battles, exactly maths two then science two, single promotion", () => {
  let s = fresh();
  const phases = [], forges = [];
  for (let i = 0; s.match.phase !== "victory" && i < 150; i++) {
    phases.push(`${s.match.round}:${s.match.phase}`);
    if (s.match.phase === "training") forges.push(s.match.questions[s.match.questionIndex].forge);
    s = step(s);
  }
  assert.deepEqual(forges, ["maths", "maths", "science", "science"]);
  for (const r of [1, 2, 3]) assert.ok(phases.includes(`${r}:battle`) && phases.includes(`${r}:round_won`));
  assert.equal(s.wins, 1);
  assert.equal(s.tier, 2);
  assert.equal(s.match.rewardGranted, true);
  error(() => applyAction(s, { type: "continue" }), "INVALID_PHASE");
  assert.equal(s.wins, 1);
});
const badAnswers = [null, undefined, true, {}, [], "", " 24", "24 ", "024", "2.4e1", "0x18", "24.0", "NaN", "<script>", NaN, Infinity, 24.5, 1000000, "9".repeat(10000)];
for (const [i, answer] of badAnswers.entries()) test(`strict numeric answer ${i + 1}`, () => {
  const s = training();
  error(() => submit(s, answer), "INVALID_ANSWER", 400);
  assert.equal(s.match.questions[0].attempts.length, 0);
});
test("numeric exact raw input is preserved while canonical digits score correctly", () => {
  const n = submit(training(), "24");
  const q = n.match.questions[0];
  assert.equal(q.attempts[0].answer, "24");
  assert.equal(q.attempts[0].normalizedAnswer, 24);
  assert.equal(q.completion, "independent");
});
test("wrong-first has no battle penalty, preserves exact clue, then worked support", () => {
  const s = training(), n = submit(s, 17), w = submit(n, 18), end = submit(w, 24);
  for (const field of ["playerHP", "rivalHP", "energy", "playerPower", "rivalPower", "staff", "pad"])
    assert.equal(n.match[field], s.match[field]);
  const q = end.match.questions[0];
  assert.deepEqual(q.attempts.map((a) => a.answer), [17, 18, 24]);
  assert.deepEqual(q.attempts.map((a) => a.assistanceLevel), [0, 1, 2]);
  assert.equal(q.attempts[0].feedback.message, q.hints[0]);
  assert.equal(q.attempts[1].feedback.message, q.hints[1]);
  assert.equal(q.completion, "worked");
  assert.equal(publicState(end, { review: true }).match.questions[0].answer, 24);
});
test("requested hints appear only when requested; worked answer still needs submission", () => {
  const s = training();
  assert.equal(publicState(s).match.questions[0].feedback, null);
  const n = hint(s), w = hint(n);
  assert.equal(publicState(n).match.questions[0].feedback.message, s.match.questions[0].hints[0]);
  assert.equal(w.match.questionIndex, 0);
  assert.equal(w.match.questions[0].resolved, false);
  error(() => hint(w), "SUPPORT_COMPLETE");
  const wrongAfterWorked = submit(w, 12);
  assert.equal(wrongAfterWorked.match.questions[0].feedback.kind, "worked");
  assert.equal(submit(wrongAfterWorked, 24).match.questions[0].completion, "worked");
});
test("hinted correct is not labelled independent and gives identical equipment", () => {
  const s = training();
  const plain = step(step(s));
  const hinted = step(step(hint(s)));
  assert.equal(hinted.match.questions[0].completion, "hinted");
  assert.equal(plain.match.staff, hinted.match.staff);
  assert.equal(hinted.match.phase, "player_upgrade");
});
test("wrong or replayed question ids cannot advance or regrant a task", () => {
  const s = training();
  error(() => applyAction(s, { type: "answer", questionId: s.match.questions[1].id, answer: 24 }), "QUESTION_NOT_CURRENT");
  const n = submit(s, 24);
  error(() => applyAction(n, { type: "answer", questionId: s.match.questions[0].id, answer: 24 }), "QUESTION_NOT_CURRENT");
  error(() => applyAction(n, { type: "hint", questionId: s.match.questions[0].id }), "QUESTION_NOT_CURRENT");
});
test("order requires a complete valid permutation; exact order retained", () => {
  const s = submit(training(), 24), q = s.match.questions[1];
  for (const bad of [["a"], ["a", "a", "b", "c"], ["a", "b", "c", "z"], "bdac", [1, 2, 3, 4]])
    error(() => submit(s, bad), "INVALID_ANSWER");
  const sparse = Array(4); sparse[0] = "a";
  error(() => submit(s, sparse), "INVALID_ANSWER");
  let read = false;
  const getter = ["a", "b", "c", "d"];
  Object.defineProperty(getter, "0", { get() { read = true; return "a"; }, enumerable: true });
  error(() => submit(s, getter), "INVALID_ANSWER");
  assert.equal(read, false);
  const n = submit(s, q.answer);
  assert.deepEqual(n.match.questions[1].attempts[0].answer, q.answer);
});
test("multiple choice scores ids only; labels and forged indices are rejected", () => {
  const s = until(round(2), (s) => s.match.phase === "training");
  for (const bad of ["Pad A", 0, ["a"], "__proto__", "z"]) error(() => submit(s, bad), "INVALID_ANSWER");
  assert.equal(submit(s, "a").match.questions[2].resolved, true);
});
test("all learner snapshots redact answers, unrevealed hints, explanations and attempts", () => {
  let s = training();
  s = submit(s, 19);
  const p = publicState(s);
  for (const q of p.match.questions) for (const key of ["answer", "hints", "explanation", "attempts", "supportEvents"])
    assert.equal(q[key], undefined);
  assert.deepEqual(Object.keys(p.match.questions[1]), ["id", "forge"]);
  const review = publicState(s, { review: true });
  assert.equal(review.match.questions[0].attempts[0].answer, 19);
  review.match.questions[0].attempts[0].answer = 99;
  assert.equal(s.match.questions[0].attempts[0].answer, 19);
});
test("retry repeats the same intent sequence and keeps every learning snapshot", () => {
  const s = round(2);
  const defeated = until(s, (x) => x.match.phase === "defeat", () => "strike");
  const n = applyAction(defeated, { type: "retry" });
  assert.deepEqual(n.match.questions, s.match.questions);
  assert.equal(n.match.staff, true);
  assert.equal(n.match.round, 2);
  assert.equal(n.match.intent, s.match.intent);
  assert.equal(n.match.seed, s.match.seed);
  assert.equal(n.match.energy, s.match.energy);
  assert.equal(n.match.roundAttempt, 2);
  error(() => applyAction(n, { type: "retry" }), "INVALID_PHASE");
});
test("support retry reduces actual incoming damage and stays explicitly assisted", () => {
  const s = round(2), defeated = until(s, (x) => x.match.phase === "defeat", () => "strike");
  const supported = applyAction(defeated, { type: "retry", support: true });
  const n = applyAction(supported, { type: "move", move: "strike" });
  assert.equal(n.match.assisted, true);
  assert.equal(n.match.lastEvent.rivalDamage, 1);
  assert.equal(supported.match.questions[0].completion, "independent");
});
test("simultaneous knockout is defeat and cannot mint a win", () => {
  const s = round(3); s.match.playerHP = 1; s.match.rivalHP = 1; s.match.intent = "strike";
  const n = applyAction(s, { type: "move", move: "strike" });
  assert.equal(n.match.phase, "defeat");
  assert.equal(n.wins, 0);
  assert.equal(n.match.rewardGranted, false);
});
test("start after victory archives exact evidence and monotonically numbers matches", () => {
  let s = submit(training(), "19");
  s = until(s, (x) => x.match.phase === "victory");
  const snapshot = structuredClone(s.match), n = applyAction(s, { type: "start" });
  assert.deepEqual(n.history[0], { ...snapshot, outcome: "victory" });
  assert.equal(n.match.number, 2);
  assert.equal(n.nextMatchNumber, 3);
  assert.equal(n.wins, 1);
  assert.equal(publicState(n).history[0].questions, undefined);
  assert.equal(publicState(n, { review: true }).history[0].questions[0].attempts[0].answer, "19");
});
test("reset keeps evidence and progression; no id reuse or silent personal-data deletion", () => {
  const s = submit(training(), 18), n = applyAction(s, { type: "reset" });
  assert.equal(n.match, null);
  assert.equal(n.history[0].outcome, "reset");
  assert.deepEqual(n.history[0].questions, s.match.questions);
  assert.equal(n.version, s.version + 1);
  const r = applyAction(n, { type: "start" });
  assert.equal(r.match.number, 2);
  assert.equal(r.wins, s.wins);
});
test("persisted question snapshots, not current bank answers, govern scoring and review", () => {
  const s = training();
  s.match.questions[0].prompt = "Archived edition: a tray has 25 cells. How many cells?";
  s.match.questions[0].answer = 25;
  s.match.questions[0].explanation = "This archived tray has 25 cells.";
  const loaded = JSON.parse(JSON.stringify(s));
  const n = submit(loaded, 25);
  assert.equal(n.match.questions[0].resolved, true);
  assert.equal(n.match.questions[0].prompt, s.match.questions[0].prompt);
  assert.deepEqual(applyAction(loaded, { type: "answer", questionId: loaded.match.questions[0].id, answer: 25 }), n);
});
test("attempt limit preserves wrong evidence but still permits supported completion", () => {
  let s = training();
  for (let i = 0; i < 32; i++) s = submit(s, i === 24 ? 99 : i);
  error(() => submit(s, 99), "ATTEMPT_LIMIT");
  assert.equal(s.match.questions[0].attempts.length, 32);
  assert.equal(submit(s, 24).match.questions[0].completion, "worked");
});
test("20-match soak retains all exact records, unique events and one reward per match", () => {
  let s = createState({ profileId: "soak" });
  const ids = new Set();
  for (let number = 1; number <= 20; number++) {
    s = applyAction(s, { type: "start" });
    s = until(s, (x) => x.match.phase === "victory");
    assert.equal(s.wins, number);
    assert.equal(s.tier, number + 1);
    assert.equal(s.match.number, number);
    assert.ok(!ids.has(s.match.id)); ids.add(s.match.id);
    assert.ok(s.match.questions.every((q) => q.resolved && q.attempts.length === 1));
    assert.deepEqual(JSON.parse(JSON.stringify(s)), s);
  }
  assert.equal(s.history.length, 19);
  assert.equal(s.history.reduce((total, m) => total + m.questions.length, 0), 76);
});
test("balance: varied committed seeds reward adaptive choices over all fixed policies", (t) => {
  const policies = {
    alwaysStrike: () => "strike",
    alwaysGuard: () => "guard",
    breakWhenAffordable: (m) => m.staff && m.energy >= 2 ? "break" : "strike",
    guardSpecial: (m) => m.pad ? (m.energy === 4 ? "special" : "guard") : m.staff && m.energy >= 2 ? "break" : "strike",
    adaptive
  };
  const result = {};
  for (const [name, policy] of Object.entries(policies)) {
    let wins = 0, defeats = 0, boundedStalls = 0;
    for (let seed = 0; seed < 120; seed++) {
      let s = fresh(`balance-${seed}`);
      for (let i = 0; i < 300 && !["defeat", "victory"].includes(s.match.phase); i++) s = step(s, policy);
      if (s.match.phase === "victory") wins++;
      else if (s.match.phase === "defeat") defeats++;
      else boundedStalls++;
    }
    result[name] = { wins, defeats, boundedStalls, samples: 120 };
    if (name !== "adaptive") assert.ok(wins / 120 < 0.7, `${name} dominates the game`);
  }
  assert.ok(result.adaptive.wins >= 108);
  assert.ok(result.adaptive.wins > Math.max(...Object.entries(result).filter(([k]) => k !== "adaptive").map(([, v]) => v.wins)));
  t.diagnostic(JSON.stringify(result));
});
test("balance: final-round Guard/Special loop stays below 70 percent across seeds", (t) => {
  let fixed = 0, adaptiveWins = 0;
  for (let seed = 0; seed < 120; seed++) {
    const fixture = round(3, `balance-${seed}`);
    for (const name of ["fixed", "adaptive"]) {
      let s = fixture;
      for (let i = 0; i < 200 && s.match.phase === "battle"; i++)
        s = applyAction(s, { type: "move", move: name === "fixed" ? (s.match.energy === 4 ? "special" : "guard") : adaptive(s.match) });
      if (s.match.phase === "round_won") { if (name === "fixed") fixed++; else adaptiveWins++; }
    }
  }
  assert.ok(fixed < 84);
  assert.equal(adaptiveWins, 120);
  t.diagnostic(JSON.stringify({ finalRoundGuardSpecial: fixed, adaptive: adaptiveWins, seeds: 120 }));
});
