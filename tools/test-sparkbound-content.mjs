import test from "node:test";
import assert from "node:assert/strict";
import { TASKS, QUESTION_BANK, selectQuestions, INTENTS, MOVES, BATTLE_CONFIG } from "../functions/_lib/sparkbound-content.js";
import { createState, applyAction, publicState } from "../functions/_lib/sparkbound.js";

test("bank has exactly 12 distinct authored tasks with two distinct checked variants each", () => {
  assert.equal(TASKS.length, 12);
  assert.equal(QUESTION_BANK.length, 24);
  assert.equal(new Set(TASKS.map((t) => t.id)).size, 12);
  assert.equal(new Set(QUESTION_BANK.map((q) => q.id)).size, 24);
  for (const task of TASKS) {
    assert.equal(task.variants.length, 2);
    assert.notDeepEqual(task.variants[0], task.variants[1]);
    assert.ok(task.skill && task.outcome);
  }
  assert.deepEqual([...new Set(QUESTION_BANK.map((q) => q.type))].sort(), ["mcq", "numeric", "order"]);
});
test("selection is fixed two maths then two science, varied over six matches without rerolls", () => {
  const seen = new Set();
  for (let i = 1; i <= 6; i++) {
    const qs = selectQuestions(i);
    assert.deepEqual(qs.map((q) => q.forge), ["maths", "maths", "science", "science"]);
    assert.deepEqual(qs.map((q) => q.slot), [0, 1, 2, 3]);
    assert.deepEqual(qs, selectQuestions(i));
    for (const q of qs) { assert.ok(!seen.has(q.id)); seen.add(q.id); }
  }
  assert.equal(seen.size, 24);
  assert.deepEqual(selectQuestions(7), selectQuestions(1));
});
test("bank and config are deeply frozen; selection is detached", () => {
  for (const v of [TASKS, TASKS[0], TASKS[0].variants[0], QUESTION_BANK, QUESTION_BANK[0].hints, INTENTS, MOVES, BATTLE_CONFIG.rounds[0]])
    assert.ok(Object.isFrozen(v));
  const qs = selectQuestions(1);
  qs[0].hints[0] = "edit";
  assert.notEqual(selectQuestions(1)[0].hints[0], "edit");
});
test("invalid selection numbers reject rather than coercing or randomly choosing", () => {
  for (const value of [0, -1, "1", 1.1, NaN, Infinity, undefined, {}, Number.MAX_SAFE_INTEGER + 1])
    assert.throws(() => selectQuestions(value), RangeError);
});

// Check graph connectivity with the bulb removed to detect a bypass separately.
function connected(edges, start, end) {
  const seen = new Set([start]), todo = [start];
  while (todo.length) {
    const from = todo.shift();
    if (from === end) return true;
    for (const [a, b] of edges) {
      const next = a === from ? b : b === from ? a : null;
      if (next !== null && !seen.has(next)) { seen.add(next); todo.push(next); }
    }
  }
  return false;
}
const bulbLoop = (wires, bulb) => connected([...wires, bulb], "+", "-") && !connected(wires, "+", "-");
for (const q of QUESTION_BANK) test(`authored evidence and answer check: ${q.id}`, () => {
  assert.ok(q.prompt.length >= 40 && q.prompt.length < 650);
  assert.ok(q.title && q.skill && q.outcome && q.explanation);
  assert.equal(q.hints.length, 2);
  assert.ok(q.hints.every((h) => typeof h === "string" && h.length >= 20));
  assert.ok(q.evidence && typeof q.evidence === "object");
  assert.doesNotMatch(q.prompt, /placeholder|lorem ipsum|what is \d+ \+ \d+/i);
  assert.equal(new Set(q.choices.map((c) => c.id)).size, q.choices.length);
  assert.ok(q.choices.every((c) => typeof c.label === "string" && c.label.length > 0));
  const e = q.evidence;
  if (q.type === "numeric") {
    assert.equal(q.choices.length, 0);
    const expected = e.kind === "groups" ? e.groups * e.each : e.kind === "sharing" ? e.total / e.groups : e.capacity - e.filled;
    assert.equal(q.answer, expected);
    assert.ok(Number.isSafeInteger(q.answer) && q.answer > 0 && q.answer <= 100);
  } else if (q.type === "order") {
    const sorted = [...q.choices].sort((a, b) => parseInt(a.label, 10) - parseInt(b.label, 10));
    assert.deepEqual(q.answer, sorted.map((c) => c.id));
    if (e.kind === "sequence") for (let i = 1; i < sorted.length; i++)
      assert.equal(Number(sorted[i].label) - Number(sorted[i - 1].label), e.step);
  } else {
    assert.ok(q.choices.some((c) => c.id === q.answer));
    if (e.kind === "pad-test") {
      assert.equal(e.controlled, "same test push and sensor");
      assert.match(q.prompt, /test|trial/i);
      assert.match(q.explanation, /test|trial|conditions/i);
      assert.match(q.prompt, /lower/i);
      const trials = e.readings[0].values.length;
      const minima = Array.from({ length: trials }, (_, i) => Math.min(...e.readings.map((r) => r.values[i])));
      const winners = e.readings.filter((r) => r.values.every((v, i) => v === minima[i])).map((r) => r.pad);
      const answerLabel = q.choices.find((c) => c.id === q.answer).label;
      if (winners.length === 1) assert.equal(answerLabel, `Pad ${winners[0]}`);
      else assert.equal(answerLabel, `${winners.join(" and ")} share the lowest reading`);
    } else if (e.kind === "circuit-gap") {
      const valid = Object.entries(e.options).filter(([, wire]) => bulbLoop([...e.wires, wire], e.bulb));
      assert.deepEqual(valid.map(([id]) => id), [q.answer]);
      assert.equal(bulbLoop(e.wires, e.bulb), false);
      assert.match(q.explanation, /unsafe/);
    } else if (e.kind === "circuit-cards") {
      const valid = Object.entries(e.cards).filter(([, wires]) => bulbLoop(wires, e.bulb));
      assert.deepEqual(valid.map(([id]) => id), [q.answer]);
      assert.match(q.explanation, /unsafe/);
    } else if (e.kind === "circuit-switch") {
      assert.equal(bulbLoop(e.wires, e.bulb), false);
      assert.equal(bulbLoop([...e.wires, e.gap], e.bulb), true);
      assert.equal(q.choices.find((c) => c.id === q.answer).label, "Close the gap from S to T");
      assert.match(q.explanation, /unsafe|Never/);
    } else assert.fail(`Unverified evidence kind ${e.kind}`);
  }
});
test("every variant scores through the authority using its snapshotted answer", () => {
  for (let number = 1; number <= 6; number++) {
    let s = createState({ profileId: "all-content" });
    // Exercise each authored selection without treating fixture numbering as a client action.
    s.nextMatchNumber = number;
    s = applyAction(s, { type: "start" });
    for (let i = 0; s.match.phase !== "victory" && i < 300; i++) {
      const m = s.match, q = m.questions[m.questionIndex];
      const move = m.intent === "heavy" ? "guard" : m.pad && m.energy === 4 ? "special" :
        m.staff && m.intent === "guard" ? (m.energy >= 2 ? "break" : "guard") : "strike";
      s = applyAction(s, m.phase === "battle" ? { type: "move", move } :
        m.phase === "training" ? { type: "answer", questionId: q.id, answer: q.answer } : { type: "continue" });
    }
    assert.equal(s.match.phase, "victory");
    assert.ok(s.match.questions.every((q) => q.resolved && q.completion === "independent"));
    assert.equal(publicState(s).match.questions.some((q) => "answer" in q), false);
  }
});
