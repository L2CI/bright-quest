import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, validateState, applyAction, publicState, validSnapshot, DURATION_MS, TRIALS } from '../functions/_lib/dragon-expedition.js';
import { QUESTIONS } from '../functions/_lib/dragon-expedition-content.js';
import { createState as originalCreate, applyAction as originalApply, publicState as originalPublic, ADVENTURES, PATHS } from '../functions/_lib/dragon-grove.js';
import { QUESTIONS as ORIGINAL_QUESTIONS } from '../functions/_lib/dragon-grove-content.js';
import { createSimulation, stepSimulation, checkpoint as simulatedCheckpoint } from '../dragon-grove/chapter-two/trial-simulation.js';

function grown(childId = 'expedition-domain-child', paths = PATHS) {
  let s = originalApply(originalCreate(childId), { type: 'begin', name: 'Willow' });
  while (s.phase !== 'complete') {
    if (s.phase === 'questions') { const q = ORIGINAL_QUESTIONS.find(q => q.id === originalPublic(s).currentQuestion.id); s = originalApply(s, { type: 'answer', questionId: q.id, answer: String(q.answer) }); }
    else if (s.phase === 'evolution') s = originalApply(s, { type: 'evolve', path: paths[(s.level - 1) % paths.length] });
    else if (s.phase === 'adventure') s = originalApply(s, { type: 'adventure', power: paths[(s.level - 1) % paths.length], targetId: ADVENTURES[s.level - 1][s.objectiveIndex].correctTarget });
    else s = originalApply(s, { type: 'next' });
  }
  return s;
}
const original = grown();
const initial = () => createState(original.childId, original);
const start = () => applyAction(initial(), { type: 'begin' });
function solveBlock(s) { while (s.phase === 'questions') { const q = QUESTIONS.find(q => q.id === publicState(s).currentQuestion.id); s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(q.answer) }); } return s; }
const snapshot = activeMs => ({ v: 1, tick: activeMs / 50, player: [.2, .5], aim: [.8, .5], spawnIndex: 10, shotSeq: 10, cooldowns: [0, 0, 0, 0], entities: [[1, 0, .7, .4, 1, 50]], projectiles: [[1, 0, .5, .4, .02, 0, 20]] });
const checkpoint = (s, activeMs, paused = false) => ({ type: 'minigame-checkpoint', runId: s.minigame.runId, seq: s.minigame.checkpointSeq + 1, activeMs,
  score: 100, hits: 3, misses: 1, combo: 2, bestCombo: 3, powerUses: { fire: 2, storm: 0, nature: 0, astral: 0 }, snapshot: snapshot(activeMs), paused });
const throws = (fn, code) => assert.throws(fn, code ? error => error.code === code : undefined);

test('Chapter II inherits the complete original by value and never starts unfinished saves', () => {
  const before = JSON.stringify(original), s = initial();
  assert.equal(s.version, 0); assert.equal(s.phase, 'welcome'); assert.equal(s.dragon.sourceVersion, original.version);
  assert.deepEqual(s.dragon.paths, original.paths); assert.deepEqual(s.dragon.growth, original.growth);
  s.dragon.paths.fire = 0; s.dragon.growth[0].path = 'nature'; assert.equal(JSON.stringify(original), before);
  throws(() => createState('wrong-child', original), 'CHAPTER_LOCKED');
  throws(() => createState('midway', originalCreate('midway')), 'CHAPTER_LOCKED');
});

test('every fifth correct answer opens a full five-minute trial and all six blocks complete', () => {
  let s = start(), now = 1800000000000; const inherited = structuredClone(s.dragon);
  for (let block = 1; block <= 6; block++) {
    assert.equal(s.block, block);
    for (let i = 0; i < 5; i++) {
      assert.equal(s.phase, 'questions'); const q = publicState(s).currentQuestion;
      s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(QUESTIONS.find(item => item.id === q.id).answer) }, { now });
      assert.equal(s.phase, i === 4 ? 'minigame' : 'questions');
    }
    throws(() => applyAction(s, { type: 'next' }));
    throws(() => applyAction(s, { type: 'minigame-complete', runId: s.minigame.runId }));
    s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId }, { now });
    for (let activeMs = 10000; activeMs <= DURATION_MS; activeMs += 10000) { now += 10000; s = applyAction(s, checkpoint(s, activeMs, activeMs === DURATION_MS), { now }); }
    s = applyAction(s, { type: 'minigame-complete', runId: s.minigame.runId }, { now });
    assert.equal(s.phase, block === 6 ? 'complete' : 'reward'); assert.equal(s.results.length, block);
    assert.deepEqual(s.dragon, inherited);
    if (block < 6) s = applyAction(s, { type: 'next' }, { now });
  }
  assert.equal(s.counters.correct, 30); assert.equal(publicState(s).stats.activeMs, 1800000);
  assert.equal(new Set(s.results.map(r => r.runId)).size, 6); assert.equal(TRIALS.length, 6);
  assert.deepEqual(s.completedBlocks, [1, 2, 3, 4, 5, 6]);
  throws(() => applyAction(s, { type: 'begin' })); throws(() => applyAction(s, { type: 'next' }));
  const corruptResult = structuredClone(s); corruptResult.results.at(-1).score++;
  throws(() => validateState(corruptResult), 'INVALID_SAVE');
});

test('hints, wrong attempts and question boundaries preserve earned dragon and learning evidence', () => {
  let s = start(); const q = publicState(s).currentQuestion, beforeDragon = structuredClone(s.dragon);
  s = applyAction(s, { type: 'hint', questionId: q.id });
  throws(() => applyAction(s, { type: 'hint', questionId: q.id }));
  s = applyAction(s, { type: 'answer', questionId: q.id, answer: '-999' });
  const mistake = structuredClone(s.lastEvent); assert.equal(mistake.correct, false); assert.equal(mistake.hintUsed, true);
  assert.equal(s.questionIndex, 0); assert.equal(s.phase, 'questions'); assert.equal(s.counters.hints, 1);
  throws(() => applyAction(s, { type: 'answer', questionId: QUESTIONS[5].id, answer: '1' }));
  s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(QUESTIONS.find(item => item.id === q.id).answer) });
  assert.equal(s.counters.answers, 2); assert.equal(s.counters.correct, 1); assert.equal(s.hintUsed, false); assert.deepEqual(s.dragon, beforeDragon);
  assert.equal(mistake.correct, false); assert.equal(mistake.answer, '-999');
});

test('active clock requires server-acknowledged resume, rejects fast-forward, and never accrues paused time', () => {
  let s = solveBlock(start()), now = 1800000000000;
  throws(() => applyAction(s, checkpoint(s, 10000), { now }));
  s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId }, { now });
  throws(() => applyAction(s, checkpoint(s, 10000), { now: now + 9999 }), 'CLOCK_AHEAD');
  throws(() => applyAction(s, checkpoint(s, 30050), { now: now + 31000 }));
  now += 10000; s = applyAction(s, checkpoint(s, 10000, true), { now });
  const paused = JSON.stringify(s); now += 86400000;
  assert.equal(publicState(s).minigame.activeMs, 10000); assert.equal(JSON.stringify(s), paused);
  throws(() => applyAction(s, checkpoint(s, 20000), { now }));
  s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId }, { now });
  assert.equal(s.minigame.activeMs, 10000);
  throws(() => applyAction(s, checkpoint(s, 20000), { now: now + 5000 }), 'CLOCK_AHEAD');
  now += 10000; s = applyAction(s, checkpoint(s, 20000), { now });
  // Reloading a previously-running checkpoint starts a fresh lease, also without crediting wall time.
  now += 900000; s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId }, { now });
  assert.equal(s.minigame.activeMs, 20000); assert.deepEqual(s.minigame.snapshot, snapshot(20000));
  throws(() => applyAction(s, checkpoint(s, 30000), { now }), 'CLOCK_AHEAD');
});

test('checkpoint snapshots have an explicit bounded schema and cannot carry arbitrary records', () => {
  assert.equal(validSnapshot(snapshot(10000), 10000), true);
  const mutations = [s => s.tick++, s => s.secret = 'arbitrary', s => s.player[0] = 9, s => s.aim[1] = NaN,
    s => s.cooldowns.push(0), s => s.entities.push(...Array.from({ length: 19 }, () => [2, 0, .5, .5, 1, 1])),
    s => s.entities[0][4] = 0, s => s.entities.push([...s.entities[0]]), s => s.projectiles[0][1] = 4,
    s => s.projectiles[0][4] = Infinity, s => s.projectiles[0][6] = 101, s => s.projectiles.push([...s.projectiles[0]])];
  for (const mutate of mutations) { const value = snapshot(10000); mutate(value); assert.equal(validSnapshot(value, 10000), false); }
});

test('checkpoints reject stale run/sequence, backwards metrics, unearned powers and malformed state', () => {
  let s = solveBlock(start()), now = 1800000000000;
  s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId }, { now }); now += 10000;
  const saved = JSON.stringify(s), action = checkpoint(s, 10000);
  for (const bad of [{ runId: crypto.randomUUID() }, { seq: 2 }, { activeMs: 10001 }, { score: -1 }, { combo: 8 }, { powerUses: { fire: 0 } }, { paused: 'yes' }])
    throws(() => applyAction(s, { ...action, ...bad }, { now }));
  assert.equal(JSON.stringify(s), saved);
  s = applyAction(s, action, { now }); now += 10000;
  throws(() => applyAction(s, { ...checkpoint(s, 20000), score: 99 }, { now }));
  throws(() => applyAction(s, { ...checkpoint(s, 20000), powerUses: { fire: 1, storm: 0, nature: 0, astral: 0 } }, { now }));
  const originalFire = grown('pure-fire', ['fire']); let fire = solveBlock(applyAction(createState('pure-fire', originalFire), { type: 'begin' }));
  fire = applyAction(fire, { type: 'minigame-resume', runId: fire.minigame.runId }, { now });
  throws(() => applyAction(fire, { ...checkpoint(fire, 10000), powerUses: { fire: 0, storm: 1, nature: 0, astral: 0 } }, { now: now + 10000 }));
  const unearnedProjectile = checkpoint(fire, 10000); unearnedProjectile.snapshot.projectiles[0][1] = 1;
  throws(() => applyAction(fire, unearnedProjectile, { now: now + 10000 }));
  for (const change of [s => s.dragon.stage = 9, s => s.dragon.paths.fire++, s => s.questionIndex = 3, s => s.minigame.activeMs = 300001,
    s => s.completedBlocks.push(3), s => s.rulesVersion++, s => s.extra = 'unknown']) { const invalid = structuredClone(s); change(invalid); throws(() => validateState(invalid), 'INVALID_SAVE'); }
});

test('public state omits private answers, choice feedback and timing leases', () => {
  let s = start(); const first = publicState(s);
  assert.equal(first.currentQuestion.hint, undefined); assert.equal(first.currentQuestion.answer, undefined);
  assert.equal(first.questionCount, 30); assert.equal(first.dragon.stage, 10); assert.equal(first.dragon.stats.stature, 6.45);
  while (s.phase === 'questions') {
    const q = publicState(s).currentQuestion;
    if (q.choices) assert.ok(q.choices.every(c => Object.keys(c).sort().join() === 'id,label'));
    assert.equal(q.answer, undefined); assert.equal(q.explanation, undefined);
    s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(QUESTIONS.find(item => item.id === q.id).answer) });
  }
  s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId });
  const p = publicState(s); assert.equal(p.minigame.leaseStartedAt, undefined); assert.equal(p.minigame.leaseActiveMs, undefined);
  assert.equal(p.trialInfo.mode, 'cloud-run'); assert.equal(p.minigame.durationMs, 300000);
  p.dragon.paths.fire = 0; assert.notEqual(s.dragon.paths.fire, 0);
});

test('real flight simulation checkpoints are accepted for all six full trials and resume exactly', () => {
  let s = start(), now = 1800000000000;
  for (let trial = 1; trial <= 6; trial++) {
    s = solveBlock(s); s = applyAction(s, { type: 'minigame-resume', runId: s.minigame.runId }, { now });
    let sim = createSimulation({ trial, seed: s.minigame.seed, paths: s.dragon.paths, saved: s.minigame });
    for (let tick = 1; tick <= 6000; tick++) {
      now += 50;
      stepSimulation(sim, { target: [.23 + .13 * Math.sin(tick / 120), .5 + .3 * Math.sin(tick / 160)], power: PATHS[Math.floor(tick / 125) % 4] });
      if (tick % 200 === 0) {
        s = applyAction(s, { type: 'minigame-checkpoint', runId: s.minigame.runId, seq: s.minigame.checkpointSeq + 1, ...simulatedCheckpoint(sim), paused: tick === 6000 }, { now });
        assert.equal(s.minigame.activeMs, tick * 50);
      }
      if (tick === 3000) {
        const restored = createSimulation({ trial, seed: s.minigame.seed, paths: s.dragon.paths, saved: publicState(s).minigame });
        assert.deepEqual(restored, sim); sim = restored;
      }
    }
    assert.ok(s.minigame.score > 0); assert.ok(s.minigame.hits > 0); assert.ok(Object.values(s.minigame.powerUses).every(n => n > 0));
    s = applyAction(s, { type: 'minigame-complete', runId: s.minigame.runId }, { now });
    if (trial < 6) s = applyAction(s, { type: 'next' }, { now });
  }
  assert.equal(s.phase, 'complete'); assert.equal(s.results.length, 6);
});
