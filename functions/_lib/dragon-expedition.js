// Chapter II is independent of Chapter I. The original dragon is copied only on explicit begin.
import { QUESTIONS, BLOCKS, CONTENT_VERSION } from './dragon-expedition-content.js';
import { PATHS, markAnswer, validateState as validateOriginal } from './dragon-grove.js';

export const DURATION_MS = 300000;
export const MAX_CHECKPOINT_MS = 30000;
export const TRIALS = [
  ['cloud-run', 'Cloudrunner', 'Fly through the seed trail. Steer around rocks and use your powers to clear a path.'],
  ['ember-forge', 'Emberforge', 'Clear the thorn barriers and gather the glowing seeds beyond them.'],
  ['canopy-rescue', 'Canopy Rescue', 'Reach the golden birds and guide them home. Clear hazards along the way.'],
  ['storm-pass', 'Storm Pass', 'Ride the mountain winds. Dodge falling rocks or clear them with a power.'],
  ['moonward', 'Moonward', 'Guard the sanctuary nest. Stop the drifting wisps before they reach it.'],
  ['guardian-flight', 'Guardian Flight', 'Bring every skill together: rescue birds, gather seeds and protect Emberwild.'],
].map(([mode, title, clue], i) => ({ id: mode, mode, title, clue, trial: i + 1, durationMs: DURATION_MS }));

export class ExpeditionError extends Error {
  constructor(message, status = 400, code = 'INVALID_ACTION') { super(message); this.status = status; this.code = code; }
}
const rule = (condition, message, code) => { if (!condition) throw new ExpeditionError(message, 400, code); };
const whole = (n, min, max) => Number.isSafeInteger(n) && n >= min && n <= max;
const finite = (n, min, max) => typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max;
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const exact = (value, names) => plain(value) && Object.keys(value).length === names.length && names.every(k => Object.hasOwn(value, k));
const names = 'schema rulesVersion version childId phase block questionIndex hintUsed dragon counters completedBlocks results minigame lastEvent'.split(' ');
const metricKeys = ['score', 'hits', 'misses', 'combo', 'bestCombo', 'powerUses'];
const questionAt = s => QUESTIONS.find(q => q.order === (s.block - 1) * 5 + s.questionIndex + 1);
const goodId = id => typeof id === 'string' && /^[-a-zA-Z0-9]{16,80}$/.test(id);
const safeName = name => typeof name === 'string' && [...name].length >= 1 && [...name].length <= 24 && /^[\p{L}\p{M}\p{N} '\u2019-]+$/u.test(name);
const emptyMetrics = () => ({ score: 0, hits: 0, misses: 0, combo: 0, bestCombo: 0, powerUses: Object.fromEntries(PATHS.map(p => [p, 0])) });
const metrics = source => Object.fromEntries(metricKeys.map(k => [k, structuredClone(source[k])]));
const seedFor = text => { let seed = 2166136261; for (const c of text) seed = Math.imul(seed ^ c.codePointAt(0), 16777619) >>> 0; return seed; };

function validMetrics(m) {
  return whole(m.score, 0, 1000000) && ['hits', 'misses', 'combo', 'bestCombo'].every(k => whole(m[k], 0, 10000)) &&
    m.combo <= m.bestCombo && m.bestCombo <= m.hits && exact(m.powerUses, PATHS) && PATHS.every(p => whole(m.powerUses[p], 0, 2000)) &&
    Object.values(m.powerUses).reduce((a, b) => a + b, 0) <= 2000;
}

export function validSnapshot(snapshot, activeMs) {
  if (!exact(snapshot, ['v', 'tick', 'player', 'aim', 'spawnIndex', 'shotSeq', 'cooldowns', 'entities', 'projectiles']) || snapshot.v !== 1 ||
    !whole(snapshot.tick, 0, 6000) || snapshot.tick * 50 !== activeMs || !whole(snapshot.spawnIndex, 0, 400) || !whole(snapshot.shotSeq, 0, 2000)) return false;
  const pair = (v, minX, maxX, minY, maxY) => Array.isArray(v) && v.length === 2 && finite(v[0], minX, maxX) && finite(v[1], minY, maxY);
  if (!pair(snapshot.player, .08, .82, .15, .85) || !pair(snapshot.aim, -.3, 1.3, -.3, 1.3) ||
    !Array.isArray(snapshot.cooldowns) || snapshot.cooldowns.length !== 4 || !snapshot.cooldowns.every(t => whole(t, 0, 100)) ||
    !Array.isArray(snapshot.entities) || snapshot.entities.length > 18 || !Array.isArray(snapshot.projectiles) || snapshot.projectiles.length > 16) return false;
  if (!snapshot.entities.every(e => Array.isArray(e) && e.length === 6 && whole(e[0], 0, 2000) && whole(e[1], 0, 4) &&
    finite(e[2], -.3, 1.3) && finite(e[3], -.3, 1.3) && whole(e[4], 1, 5) && whole(e[5], 0, 6000))) return false;
  if (!snapshot.projectiles.every(p => Array.isArray(p) && p.length === 7 && whole(p[0], 0, 2000) && whole(p[1], 0, 3) &&
    finite(p[2], -.3, 1.3) && finite(p[3], -.3, 1.3) && finite(p[4], -2, 2) && finite(p[5], -2, 2) && whole(p[6], 0, 100))) return false;
  return new Set(snapshot.entities.map(e => e[0])).size === snapshot.entities.length && new Set(snapshot.projectiles.map(p => p[0])).size === snapshot.projectiles.length &&
    new TextEncoder().encode(JSON.stringify(snapshot)).length <= 8000;
}

function validDragon(d) {
  if (!exact(d, ['name', 'stage', 'paths', 'growth', 'sourceVersion']) || !safeName(d.name) || d.stage !== 10 || !whole(d.sourceVersion, 1, 9999999999) ||
    !exact(d.paths, PATHS) || !PATHS.every(p => whole(d.paths[p], 0, 10)) || !Array.isArray(d.growth) || d.growth.length !== 10) return false;
  const counts = Object.fromEntries(PATHS.map(p => [p, 0]));
  for (let i = 0; i < 10; i++) { const g = d.growth[i]; if (!exact(g, ['level', 'stage', 'path']) || g.level !== i + 1 || g.stage !== i + 1 || !PATHS.includes(g.path)) return false; counts[g.path]++; }
  return PATHS.every(p => d.paths[p] === counts[p]);
}

export function createState(childId, original) {
  validateOriginal(original);
  rule(original.childId === childId && original.phase === 'complete', 'Finish your first dragon adventure before Chapter II.', 'CHAPTER_LOCKED');
  return validateState({ schema: 1, rulesVersion: CONTENT_VERSION, version: 0, childId, phase: 'welcome', block: 1, questionIndex: 0, hintUsed: false,
    dragon: { name: original.name, stage: 10, paths: structuredClone(original.paths), growth: structuredClone(original.growth), sourceVersion: original.version },
    counters: { answers: 0, correct: 0, hints: 0 }, completedBlocks: [], results: [], minigame: null, lastEvent: null });
}

export function validateState(s) {
  const bad = () => { throw new ExpeditionError('This chapter save needs attention. Your progress has not been reset.', 500, 'INVALID_SAVE'); };
  if (!exact(s, names) || s.schema !== 1 || s.rulesVersion !== CONTENT_VERSION || !whole(s.version, 0, 9999999999) || typeof s.childId !== 'string' || !s.childId ||
    !['welcome', 'questions', 'minigame', 'reward', 'complete'].includes(s.phase) || !whole(s.block, 1, 6) || !whole(s.questionIndex, 0, 5) ||
    typeof s.hintUsed !== 'boolean' || !validDragon(s.dragon) || !exact(s.counters, ['answers', 'correct', 'hints']) ||
    !whole(s.counters.answers, 0, 999999999) || !whole(s.counters.correct, 0, 30) || !whole(s.counters.hints, 0, 30) ||
    s.counters.correct > s.counters.answers || s.counters.hints > s.counters.correct + (s.hintUsed ? 1 : 0) ||
    !Array.isArray(s.completedBlocks) || s.completedBlocks.some((b, i) => b !== i + 1) || !Array.isArray(s.results) || s.results.length !== s.completedBlocks.length || s.results.length > 6) bad();
  if (s.counters.correct !== (s.block - 1) * 5 + s.questionIndex || (s.phase !== 'questions' && s.hintUsed)) bad();
  if (s.phase === 'welcome') {
    if (s.version !== 0 || s.block !== 1 || s.questionIndex || s.completedBlocks.length || Object.values(s.counters).some(Boolean) || s.minigame !== null || s.lastEvent !== null) bad();
  } else if (s.version < 1 || !plain(s.lastEvent) || !['begin', 'hint', 'answer', 'minigame-resume', 'minigame-checkpoint', 'minigame-complete', 'next'].includes(s.lastEvent.type)) bad();
  if (s.phase === 'questions' && (s.questionIndex >= 5 || s.completedBlocks.length !== s.block - 1 || s.minigame !== null)) bad();
  if (['minigame', 'reward', 'complete'].includes(s.phase)) {
    const g = s.minigame;
    if (!exact(g, ['runId', 'trial', 'seed', 'durationMs', 'activeMs', 'checkpointSeq', 'paused', 'leaseStartedAt', 'leaseActiveMs', 'snapshot', ...metricKeys]) ||
      !goodId(g.runId) || g.trial !== s.block || !whole(g.seed, 0, 4294967295) || g.durationMs !== DURATION_MS || !whole(g.activeMs, 0, DURATION_MS) || g.activeMs % 50 ||
      !whole(g.checkpointSeq, 0, 999999) || typeof g.paused !== 'boolean' || !validMetrics(g) ||
      !(g.snapshot === null ? g.activeMs === 0 && g.checkpointSeq === 0 : validSnapshot(g.snapshot, g.activeMs)) ||
      (g.paused ? g.leaseStartedAt !== null || g.leaseActiveMs !== null : !whole(g.leaseStartedAt, 0, 8640000000000000) || !whole(g.leaseActiveMs, 0, g.activeMs)) ||
      s.questionIndex !== 5 || s.completedBlocks.length !== s.block - (s.phase === 'minigame' ? 1 : 0) ||
      (s.phase !== 'minigame' && (!g.paused || g.activeMs !== DURATION_MS))) bad();
    if (PATHS.some(p => !s.dragon.paths[p] && g.powerUses[p]) || g.snapshot?.projectiles.some(p => !s.dragon.paths[PATHS[p[1]]])) bad();
    if (g.snapshot === null && JSON.stringify(metrics(g)) !== JSON.stringify(emptyMetrics())) bad();
    if (s.phase === 'minigame' && s.results.some(r => r.runId === g.runId)) bad();
    if (s.phase !== 'minigame' && (s.results.at(-1)?.runId !== g.runId || JSON.stringify(metrics(s.results.at(-1))) !== JSON.stringify(metrics(g)))) bad();
  }
  if (s.phase === 'complete' && s.block !== 6 || s.phase === 'reward' && s.block === 6) bad();
  for (let i = 0; i < s.results.length; i++) {
    const r = s.results[i];
    if (!exact(r, ['trial', 'runId', 'activeMs', 'durationMs', 'badge', ...metricKeys]) || r.trial !== i + 1 || !goodId(r.runId) || r.activeMs !== DURATION_MS ||
      r.durationMs !== DURATION_MS || r.badge !== 'Guardian trial complete' || !validMetrics(r) || PATHS.some(p => !s.dragon.paths[p] && r.powerUses[p])) bad();
  }
  if (new Set(s.results.map(r => r.runId)).size !== s.results.length || new TextEncoder().encode(JSON.stringify(s)).length > 18000) bad();
  return s;
}

export function applyAction(current, action, { now = Date.now() } = {}) {
  validateState(current);
  rule(plain(action) && typeof action.type === 'string', 'Choose a chapter action.');
  rule(whole(now, 0, 8640000000000000), 'The chapter clock is unavailable.');
  const s = structuredClone(current);
  const event = (type, details = {}) => { s.lastEvent = { type, block: s.block, at: new Date(now).toISOString(), ...details }; };
  const currentGame = () => { rule(s.phase === 'minigame' && s.minigame?.runId === action.runId, 'This trial has changed. Load your latest dragon.'); return s.minigame; };
  switch (action.type) {
    case 'begin':
      rule(s.phase === 'welcome', 'Chapter II has already begun.'); s.phase = 'questions'; event('begin', { name: s.dragon.name, sourceVersion: s.dragon.sourceVersion }); break;
    case 'hint': {
      const q = questionAt(s);
      rule(s.phase === 'questions' && q && action.questionId === q.id, 'Open the current question first.');
      rule(!s.hintUsed, 'This hint is already open.'); s.hintUsed = true; s.counters.hints++;
      event('hint', { questionId: q.id, subject: q.subject, prompt: q.prompt, hint: q.hint }); break;
    }
    case 'answer': {
      const q = questionAt(s);
      rule(s.phase === 'questions' && q && action.questionId === q.id, 'This question has changed. Load your latest chapter.');
      rule(typeof action.answer === 'string' && action.answer.trim() && action.answer.length <= 120, 'Enter your answer or choose an option.');
      if (q.type === 'choice') rule(q.choices.some(c => c.id === action.answer), 'Choose one of the displayed answers.');
      const correct = markAnswer(q, action.answer); s.counters.answers++;
      event('answer', { questionId: q.id, contentVersion: CONTENT_VERSION, subject: q.subject, prompt: q.prompt, answer: action.answer.trim(),
        answerLabel: q.type === 'choice' ? q.choices.find(c => c.id === action.answer).label : action.answer.trim(), correct, hintUsed: s.hintUsed,
        explanation: correct ? q.explanation : q.choices?.find(c => c.id === action.answer)?.feedback || 'Keep thinking. Try again or open a hint.' });
      if (correct) {
        s.counters.correct++; s.questionIndex++; s.hintUsed = false;
        if (s.questionIndex === 5) {
          s.phase = 'minigame'; s.minigame = { runId: crypto.randomUUID(), trial: s.block, seed: seedFor(`${s.childId}:${s.dragon.sourceVersion}:${s.block}`),
            durationMs: DURATION_MS, activeMs: 0, checkpointSeq: 0, paused: true, leaseStartedAt: null, leaseActiveMs: null, snapshot: null, ...emptyMetrics() };
        }
      }
      break;
    }
    case 'minigame-resume': {
      const g = currentGame(); rule(g.activeMs < DURATION_MS, 'Your five-minute trial is ready to finish.');
      // A reload never turns closed-tab wall time into play time. Resume opens a fresh timing lease.
      g.paused = false; g.leaseStartedAt = now; g.leaseActiveMs = g.activeMs;
      event('minigame-resume', { runId: g.runId, activeMs: g.activeMs }); break;
    }
    case 'minigame-checkpoint': {
      const g = currentGame();
      rule(!g.paused, 'Resume your trial before saving active play.');
      rule(action.seq === g.checkpointSeq + 1, 'Load the latest trial checkpoint.');
      rule(whole(action.activeMs, g.activeMs, DURATION_MS) && action.activeMs % 50 === 0 && action.activeMs - g.activeMs <= MAX_CHECKPOINT_MS, 'Save your trial at least every thirty active seconds.');
      rule(action.activeMs - g.leaseActiveMs <= Math.max(0, now - g.leaseStartedAt), 'The active-play clock is ahead. Pause and retry this save.', 'CLOCK_AHEAD');
      rule(typeof action.paused === 'boolean' && (action.activeMs < DURATION_MS || action.paused), 'Pause the completed trial before saving.');
      rule(validMetrics(action) && ['score', 'hits', 'misses', 'bestCombo'].every(k => action[k] >= g[k]) && PATHS.every(p => action.powerUses[p] >= g.powerUses[p]), 'Trial results must keep your confirmed progress.');
      rule(PATHS.every(p => s.dragon.paths[p] || action.powerUses[p] === 0), 'Use the dragon powers you have earned.');
      rule(validSnapshot(action.snapshot, action.activeMs), 'This trial checkpoint is invalid. Your previous checkpoint is safe.');
      rule(action.snapshot.projectiles.every(p => s.dragon.paths[PATHS[p[1]]] > 0), 'Use the dragon powers you have earned.');
      if (g.snapshot) rule(action.snapshot.spawnIndex >= g.snapshot.spawnIndex && action.snapshot.shotSeq >= g.snapshot.shotSeq, 'Trial entities cannot move back to an earlier checkpoint.');
      Object.assign(g, metrics(action), { activeMs: action.activeMs, checkpointSeq: action.seq, paused: action.paused, snapshot: structuredClone(action.snapshot) });
      if (g.paused) { g.leaseStartedAt = null; g.leaseActiveMs = null; }
      event('minigame-checkpoint', { runId: g.runId, activeMs: g.activeMs, checkpointSeq: g.checkpointSeq, paused: g.paused, ...metrics(g) }); break;
    }
    case 'minigame-complete': {
      const g = currentGame(); rule(g.activeMs === DURATION_MS && g.paused, 'Finish five minutes of active play before collecting your trial result.');
      const result = { trial: s.block, runId: g.runId, activeMs: DURATION_MS, durationMs: DURATION_MS, badge: 'Guardian trial complete', ...metrics(g) };
      s.results.push(result); s.completedBlocks.push(s.block); s.phase = s.block === 6 ? 'complete' : 'reward'; event('minigame-complete', { ...structuredClone(result), title: TRIALS[s.block - 1].title }); break;
    }
    case 'next':
      rule(s.phase === 'reward', 'Finish this trial before the next questions.');
      s.block++; s.questionIndex = 0; s.hintUsed = false; s.minigame = null; s.phase = 'questions'; event('next'); break;
    default: throw new ExpeditionError('Unknown chapter action.');
  }
  s.version++; return validateState(s);
}

export function publicState(s) {
  validateState(s); const out = structuredClone(s), q = s.phase === 'questions' ? questionAt(s) : null;
  out.currentQuestion = q ? { id: q.id, block: q.block, level: q.block, subject: q.subject, prompt: q.prompt, type: q.type,
    ...(q.unit ? { unit: q.unit } : {}), ...(q.numericFormat ? { numericFormat: q.numericFormat } : {}),
    ...(q.choices ? { choices: q.choices.map(c => ({ id: c.id, label: c.label })) } : {}),
    ...(q.visual || q.diagram ? { visual: structuredClone(q.visual || q.diagram) } : {}), hintUsed: s.hintUsed, ...(s.hintUsed ? { hint: q.hint } : {}) } : null;
  if (out.minigame) { delete out.minigame.leaseStartedAt; delete out.minigame.leaseActiveMs; }
  out.blocks = structuredClone(BLOCKS); out.blockInfo = structuredClone(BLOCKS.find(b => b.block === s.block));
  out.trialInfo = structuredClone(TRIALS[s.block - 1]); out.questionCount = 30; out.availablePowers = PATHS.filter(p => s.dragon.paths[p] > 0);
  out.dragon.stats = { stature: 6.45, strength: 150 + s.dragon.paths.fire * 4 + s.dragon.paths.storm * 2 + s.dragon.paths.nature * 3 + s.dragon.paths.astral * 3 };
  out.stats = { solved: s.counters.correct, answers: s.counters.answers, hints: s.counters.hints, trialsCompleted: s.completedBlocks.length, activeMs: s.results.reduce((n, r) => n + r.activeMs, 0) + (s.phase === 'minigame' ? s.minigame.activeMs : 0) };
  return out;
}
