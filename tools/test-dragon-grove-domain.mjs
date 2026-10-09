import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, validateState, applyAction, publicState, markAnswer, ADVENTURES, PATHS } from '../functions/_lib/dragon-grove.js';
import { QUESTIONS, CONTENT_VERSION } from '../functions/_lib/dragon-grove-content.js';

const start = () => applyAction(createState('fictional-child'), { type: 'begin', name: 'Aster' });
const actualQuestion = s => QUESTIONS.find(q => q.id === publicState(s).currentQuestion.id);
function solve(s) { while (s.phase === 'questions') { const q = actualQuestion(s); s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(q.answer) }); } return s; }
function adventure(s, power) { while (s.phase === 'adventure') { const objective = ADVENTURES[s.level - 1][s.objectiveIndex]; s = applyAction(s, { type: 'adventure', targetId: objective.correctTarget, power }); } return s; }

test('ten levels have exactly three main questions, balanced subjects and valid private answer banks', () => {
  assert.equal(CONTENT_VERSION, 1);
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, QUESTIONS.length);
  for (let level = 1; level <= 10; level++) {
    const qs = QUESTIONS.filter(q => q.level === level && (q.variant === undefined || q.variant === 1));
    assert.equal(qs.length, 3); assert.equal(new Set(qs.map(q => q.subject)).size, 3);
    for (const q of QUESTIONS.filter(q => q.level === level)) {
      assert(q.prompt && q.hint && q.explanation); assert(markAnswer(q, String(q.answer)), q.id);
      if (q.type === 'choice') { assert.equal(new Set(q.choices.map(c => c.id)).size, q.choices.length); for (const c of q.choices) assert.equal(markAnswer(q, c.id), c.id === q.answer, q.id); }
    }
  }
});

test('strict marking accepts intended numeric equivalents and rejects partial parsing or non-finite values', () => {
  const q = { type: 'number', answer: 6.5 };
  for (const answer of ['6.50', ' 6.5 ', '13/2']) assert(markAnswer(q, answer));
  for (const answer of ['6.5 apples', '6.5e0', '0x6.8', 'Infinity', 'NaN', '6,5', '', null, 6.5, '13/0']) assert.equal(markAnswer(q, answer), false);
  assert(markAnswer({ type: 'number', answer: 1200 }, '1,200'));
  assert.equal(markAnswer({ type: 'number', answer: 1200 }, '1,20,0'), false);
  assert(markAnswer({ type: 'number', answer: .75 }, '3/4'));
  assert.equal(markAnswer({ type: 'number', numericFormat: 'decimal', answer: .75 }, '3/4'), false);
  assert.equal(markAnswer({ type: 'number', numericFormat: 'integer', answer: 6 }, '12/2'), false);
  assert(markAnswer({ type: 'number', numericFormat: 'money', answer: 6.5 }, '$6.50'));
  assert.equal(markAnswer({ type: 'number', numericFormat: 'money', answer: 6.5 }, '6.500'), false);
});

test('child-specific question variation is stable through save and covers all three variants', () => {
  const seen = new Set();
  for (const child of ['child-a', 'child-b', 'child-c', 'child-d', 'child-e', 'child-f']) {
    const s = applyAction(createState(child), { type: 'begin', name: 'Ember' });
    const q = publicState(s).currentQuestion;
    seen.add(q.id);
    assert.deepEqual(publicState(JSON.parse(JSON.stringify(s))).currentQuestion, q);
    assert(!('questionSet' in publicState(s)));
  }
  assert.equal(seen.size, 3);
});

test('names, transitions, private projection, hints and wrong answers preserve learner progress', () => {
  const newborn = createState('fictional-child'); assert.equal(publicState(newborn).stage, 0);
  for (const name of ['', '<script>', 'x'.repeat(25), '\n', '🐉']) assert.throws(() => applyAction(newborn, { type: 'begin', name }));
  let s = start(); const q = actualQuestion(s), original = structuredClone(s);
  const visible = publicState(s); assert(!('answer' in visible.currentQuestion)); assert(!('accepted' in visible.currentQuestion)); assert(!('hint' in visible.currentQuestion));
  assert.throws(() => applyAction(s, { type: 'evolve', path: 'fire' }));
  assert.throws(() => applyAction(s, { type: 'answer', questionId: 'future-question', answer: '1' }));
  s = applyAction(s, { type: 'hint', questionId: q.id }); assert.equal(s.counters.hints, 1); assert(publicState(s).currentQuestion.hint);
  assert.throws(() => applyAction(s, { type: 'hint', questionId: q.id }));
  const incorrect = q.type === 'choice' ? q.choices.find(c => c.id !== q.answer).id : '-987654';
  s = applyAction(s, { type: 'answer', questionId: q.id, answer: incorrect });
  assert.equal(s.lastEvent.correct, false); assert.equal(s.lastEvent.hintUsed, true); assert.equal(s.stage, 0); assert.equal(s.questionIndex, 0);
  const savedWrong = structuredClone(s.lastEvent);
  s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(q.answer) });
  assert.equal(s.lastEvent.correct, true); assert.equal(s.questionIndex, 1); assert.equal(s.lastEvent.hintUsed, true);
  assert.throws(() => applyAction(s, { type: 'answer', questionId: q.id, answer: String(q.answer) }));
  assert.equal(savedWrong.correct, false); assert.equal(original.questionIndex, 0); assert.equal(original.hintUsed, false);
  s = solve(s); assert.equal(s.phase, 'evolution');
  assert.throws(() => applyAction(s, { type: 'evolve', path: '__proto__' }));
  s = applyAction(s, { type: 'evolve', path: 'fire' });
  assert.equal(s.stage, 1); assert.equal(s.paths.fire, 1); assert.equal(s.phase, 'adventure');
  assert.throws(() => applyAction(s, { type: 'evolve', path: 'fire' }));
  const o = ADVENTURES[0][0]; assert(!('correctTarget' in publicState(s).adventure));
  assert.throws(() => applyAction(s, { type: 'adventure', targetId: o.correctTarget, power: 'storm' }));
  s = applyAction(s, { type: 'adventure', targetId: o.targets.find(t => t.id !== o.correctTarget).id, power: 'fire' });
  assert.equal(s.objectiveIndex, 0); assert.equal(s.stage, 1); assert.equal(s.lastEvent.correct, false);
});

test('all four pure paths and 64 mixed growth routes complete ten stages with thirty answers and three finale objectives', () => {
  const routes = [...PATHS.map(path => Array(10).fill(path)), ...Array.from({ length: 64 }, (_, seed) => Array.from({ length: 10 }, (_, level) => PATHS[((seed >> (level % 6)) + level) % 4]))];
  for (const route of routes) {
    let s = start(), stature = publicState(s).stats.stature;
    for (let level = 1; level <= 10; level++) {
      s = solve(s); assert.equal(s.phase, 'evolution'); assert.equal(s.level, level);
      s = applyAction(s, { type: 'evolve', path: route[level - 1] });
      assert(publicState(s).stats.stature > stature); stature = publicState(s).stats.stature;
      if (level === 10) assert.equal(publicState(s).adventure.objectiveCount, 3);
      s = adventure(s, route[level - 1]);
      if (level < 10) { assert.equal(s.phase, 'celebrate'); s = applyAction(s, { type: 'next' }); }
    }
    assert.equal(s.phase, 'complete'); assert.equal(s.stage, 10); assert.equal(s.counters.correct, 30); assert.equal(s.growth.length, 10);
    assert.equal(s.completedLevels.length, 10); assert.equal(s.adventures.length, ADVENTURES.flat().length);
    assert.equal(Object.values(s.paths).reduce((a, b) => a + b), 10);
    assert.throws(() => applyAction(s, { type: 'next' })); assert.throws(() => applyAction(s, { type: 'begin', name: 'Reset' }));
    assert.equal(validateState(JSON.parse(JSON.stringify(s))).stage, 10);
  }
});

test('every earned power solves every objective, including mixed late choices', () => {
  let s = start();
  for (let level = 1; level <= 10; level++) {
    s = applyAction(solve(s), { type: 'evolve', path: PATHS[(level - 1) % 4] });
    while (s.phase === 'adventure') {
      const objective = ADVENTURES[level - 1][s.objectiveIndex];
      for (const power of publicState(s).availablePowers) {
        const next = applyAction(s, { type: 'adventure', power, targetId: objective.correctTarget });
        assert.equal(next.lastEvent.correct, true); assert(next.lastEvent.explanation); assert.equal(next.objectiveIndex, s.objectiveIndex + 1);
      }
      s = applyAction(s, { type: 'adventure', power: PATHS[0], targetId: objective.correctTarget });
    }
    if (level < 10) s = applyAction(s, { type: 'next' });
  }
});

test('corrupt snapshots fail without resetting or accepting invented rewards', () => {
  const s = start();
  for (const patch of [{ schema: 9 }, { rulesVersion: 999 }, { version: -1 }, { stage: 10 }, { level: 11 }, { questionIndex: 3 }, { paths: { fire: 10, storm: 0, nature: 0, astral: 0 } }, { counters: { ...s.counters, correct: 5 } }, { phase: 'complete' }, { adventures: [{}] }]) {
    assert.throws(() => validateState({ ...structuredClone(s), ...patch }), /not been reset/);
  }
});
