// Progression and marking stay on the server. Every saved operation has its own evidence delta.
import { QUESTIONS, CONTENT_VERSION } from './dragon-grove-content.js';

export const PATHS = ['fire', 'storm', 'nature', 'astral'];
export const LEVELS = [
  ['A spark in the hollow', 'The newborn discovers the grove.'],
  ['Across the brook', 'Little wings begin to stretch.'],
  ['The lantern wood', 'Find a way through the ancient trees.'],
  ['Cloudstep cliffs', 'Your young dragon learns to soar.'],
  ['The crystal spring', 'Restore the mountain waterway.'],
  ['The sleeping canopy', 'Bring life back to the high forest.'],
  ['The sky garden', 'Reach the gardens above the clouds.'],
  ['The ancient observatory', 'Wake the old star instruments.'],
  ['The heart of Emberwild', 'Guide the grove through the gathering mist.'],
  ['The dawn of the guardian', 'Complete three acts of courage and restore Emberwild.']
].map(([title, description], i) => ({ level: i + 1, title, description }));

const objective = (id, title, clue, labels, correct) => ({ id, title, clue,
  targets: labels.map((label, i) => ({ id: `${id}-${i + 1}`, label })), correctTarget: `${id}-${correct + 1}` });
export const ADVENTURES = [
  [objective('hearth', 'Light the welcome beacon', 'The empty stone lantern is waiting for a gentle spark of dragon magic. Leave the sleeping creatures undisturbed.', ['Sleeping owl nest', 'Empty stone lantern', 'Mossy pond'], 1)],
  [objective('brook', 'Make a safe crossing', 'The fallen log reaches almost across the brook. Strengthen it to make a bridge.', ['Fallen log', 'Distant cloud', 'Little fish'], 0), objective('bell', 'Call the bridgekeeper', 'A brass bell hangs beside the bridge. Ring it to tell the keeper the crossing is ready.', ['Pebble pile', 'Brass bell', 'Fern leaf'], 1)],
  [objective('lantern', 'Find the hidden trail', 'The trail begins under the arch marked with a leaf. Wake its lantern.', ['Moon-marked arch', 'Sun-marked arch', 'Leaf-marked arch'], 2), objective('seed', 'Help the lantern tree', 'The young tree has dry roots. Send your magic to the water bowl beside it.', ['Empty water bowl', 'Bird nest', 'Old sign'], 0)],
  [objective('wind', 'Open the cliff path', 'The blue wind ribbon points towards the sheltered ledge. Guide your dragon there.', ['Exposed peak', 'Sheltered ledge', 'Deep ravine'], 1), objective('kite', 'Rescue the signal kite', 'The signal kite is caught on a bare branch. Free the kite without disturbing the nest.', ['Nest of chicks', 'Rock ledge', 'Kite on bare branch'], 2)],
  [objective('spring', 'Restore the spring', 'A loose stone blocks the carved water channel. Move the blockage.', ['Loose channel stone', 'Glowing mushroom', 'Clear pool'], 0), objective('wheel', 'Wake the waterwheel', 'The repaired channel leads to the wooden waterwheel. Give that wheel a gentle turn.', ['Stone bench', 'Wooden waterwheel', 'Cloud reflection'], 1)],
  [objective('canopy', 'Revive the hanging garden', 'The drooping vine is thirsty. Guide the collected rain from its copper basin.', ['Dry path', 'Copper rain basin', 'Hollow branch'], 1), objective('pod', 'Open the seed shelter', 'The round shelter with a seed carved on its door protects the new saplings.', ['Empty cave', 'Bird house', 'Seed-carved shelter'], 2)],
  [objective('cloud', 'Anchor the sky garden', 'The garden is drifting because its silver anchor ring has come loose.', ['Silver anchor ring', 'Flower petal', 'Passing cloud'], 0), objective('bloom', 'Wake the moonflowers', 'The moonflowers lean towards the covered mirror. Uncover it to send them gentle light.', ['Old stair', 'Covered mirror', 'Rain barrel'], 1)],
  [objective('lens', 'Restore the observatory', 'The dusty telescope lens cannot show the stars. Clear the lens gently.', ['Star map', 'Stone wall', 'Dusty telescope lens'], 2), objective('dial', 'Align the star gate', 'The star chart points to the north-marked dial. Turn that dial to align the gate.', ['North-marked dial', 'South-marked dial', 'West-marked dial'], 0)],
  [objective('mist', 'Guide the grove home', 'The mist hides the path. The tall guiding lantern will help everyone find their way.', ['Tall guiding lantern', 'Quiet burrow', 'Leaf pile'], 0), objective('heart', 'Steady the grove heart', 'The glowing root bridge leads to the heart tree. Repair its cracked centre arch.', ['Smooth side stone', 'Cracked centre arch', 'High branch'], 1)],
  [objective('final-beacon', 'First light: gather the grove', 'Wake the great beacon on the hill so the grove can gather safely.', ['Hidden burrow', 'Deep pond', 'Great hill beacon'], 2), objective('final-bridge', 'Second light: open the way', 'The great root bridge is missing its middle span. Restore that span for the travellers.', ['Middle bridge span', 'Far mountain', 'Cloud bank'], 0), objective('final-heart', 'Final light: restore Emberwild', 'The heart tree has one unlit crystal at its centre. Share your dragon magic with that crystal.', ['River pebble', 'Unlit heart crystal', 'Fallen leaf'], 1)]
];

export class GameError extends Error {
  constructor(message, status = 400, code = 'INVALID_ACTION') { super(message); this.status = status; this.code = code; }
}
const requireRule = (condition, message, code) => { if (!condition) throw new GameError(message, 400, code); };
const whole = (n, min, max) => Number.isSafeInteger(n) && n >= min && n <= max;
const questionsAt = (level, set) => QUESTIONS.filter(q => q.level === level && (q.variant === undefined || q.variant === 1))
  .map((base, index) => QUESTIONS.find(q => q.level === level && q.subject === base.subject && q.variant === ((set + level - 1 + index) % 3) + 1) || base);
const currentQuestion = s => questionsAt(s.level, s.questionSet)[s.questionIndex];
const validName = name => typeof name === 'string' && [...name].length >= 1 && [...name].length <= 24 && /^[\p{L}\p{M}\p{N} '\u2019-]+$/u.test(name);

export function createState(childId) {
  const questionSet = [...childId].reduce((seed, char) => (seed * 31 + char.codePointAt(0)) % 997, 0) % 3;
  return { schema: 1, rulesVersion: CONTENT_VERSION, version: 0, childId, questionSet, name: '', stage: 0, level: 1,
    phase: 'welcome', questionIndex: 0, hintUsed: false, paths: { fire: 0, storm: 0, nature: 0, astral: 0 },
    growth: [], completedLevels: [], adventures: [], objectiveIndex: 0,
    counters: { answers: 0, correct: 0, hints: 0, adventureAttempts: 0 }, lastEvent: null };
}

export function validateState(s) {
  const bad = () => { throw new GameError('This dragon save needs attention. Your progress has not been reset.', 500, 'INVALID_SAVE'); };
  if (!s || s.schema !== 1 || s.rulesVersion !== CONTENT_VERSION || !whole(s.version, 0, 9999999999) ||
      typeof s.childId !== 'string' || !s.childId || !whole(s.questionSet, 0, 2) || !whole(s.stage, 0, 10) || !whole(s.level, 1, 10) ||
      !['welcome', 'questions', 'evolution', 'adventure', 'celebrate', 'complete'].includes(s.phase) ||
      !whole(s.questionIndex, 0, 3) || typeof s.hintUsed !== 'boolean' ||
      !s.paths || !PATHS.every(p => whole(s.paths[p], 0, 10)) ||
      !Array.isArray(s.growth) || s.growth.length !== s.stage ||
      !Array.isArray(s.completedLevels) || s.completedLevels.some((l, i) => l !== i + 1) || !Array.isArray(s.adventures) ||
      !s.counters || !['answers', 'correct', 'hints', 'adventureAttempts'].every(k => whole(s.counters[k], 0, 999999999)) ||
      s.counters.correct > s.counters.answers || s.counters.correct > 30 || s.counters.hints > 30 ||
      !whole(s.objectiveIndex, 0, ADVENTURES[s.level - 1].length)) bad();
  const ranks = Object.fromEntries(PATHS.map(p => [p, 0]));
  for (let i = 0; i < s.growth.length; i++) {
    const g = s.growth[i];
    if (!g || g.level !== i + 1 || g.stage !== i + 1 || !PATHS.includes(g.path)) bad();
    ranks[g.path]++;
  }
  if (!PATHS.every(p => ranks[p] === s.paths[p])) bad();
  const solvedObjectives = ADVENTURES.flatMap((list, index) => index < s.level - 1 ? list : index === s.level - 1 ? list.slice(0, s.objectiveIndex) : []);
  if (s.adventures.length !== solvedObjectives.length || s.counters.adventureAttempts < s.adventures.length || s.adventures.some((a, i) => !whole(a.level, 1, s.level) || !PATHS.includes(a.power) || a.objectiveId !== solvedObjectives[i].id || a.targetId !== solvedObjectives[i].correctTarget)) bad();
  if (s.phase === 'welcome') {
    if (s.name !== '' || s.stage !== 0 || s.level !== 1 || s.questionIndex !== 0 || s.version !== 0 || s.hintUsed || s.objectiveIndex || s.adventures.length || s.completedLevels.length || Object.values(s.counters).some(Boolean)) bad();
  } else if (!validName(s.name) || s.version < 1) bad();
  if (['questions', 'evolution'].includes(s.phase) && (s.stage !== s.level - 1 || s.completedLevels.length !== s.level - 1 || s.objectiveIndex !== 0)) bad();
  if (s.phase === 'questions' && (s.questionIndex >= 3 || s.counters.correct !== (s.level - 1) * 3 + s.questionIndex)) bad();
  if (s.phase === 'evolution' && (s.questionIndex !== 3 || s.counters.correct !== s.level * 3)) bad();
  if (['adventure', 'celebrate', 'complete'].includes(s.phase) && (s.stage !== s.level || s.questionIndex !== 3 || s.counters.correct !== s.level * 3)) bad();
  if (s.phase === 'adventure' && (s.completedLevels.length !== s.level - 1 || s.objectiveIndex >= ADVENTURES[s.level - 1].length)) bad();
  if (['celebrate', 'complete'].includes(s.phase) && (s.completedLevels.length !== s.level || s.objectiveIndex !== ADVENTURES[s.level - 1].length)) bad();
  if (s.phase === 'celebrate' && s.level === 10 || s.phase === 'complete' && s.level !== 10) bad();
  return s;
}

function numeric(value) {
  if (typeof value !== 'string' || value.length > 64) return null;
  const text = value.trim();
  const fraction = text.match(/^(-?\d{1,9})\s*\/\s*(\d{1,9})$/);
  if (fraction) return Number(fraction[2]) > 0 ? Number(fraction[1]) / Number(fraction[2]) : null;
  if (!/^-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/.test(text)) return null;
  const n = Number(text.replace(/,/g, ''));
  return Number.isFinite(n) && Math.abs(n) <= 1e9 ? n : null;
}

export function markAnswer(q, answer) {
  if (typeof answer !== 'string' || answer.length > 120 || !answer.trim()) return false;
  if (q.type === 'number') {
    const n = questionNumber(q, answer);
    if (q.numericFormat === 'money') return n !== null && Math.round(n * 100) === (q.answerCents ?? Math.round(Number(q.answer) * 100));
    return n !== null && [q.answer, ...(q.accepted || [])].some(a => numeric(String(a)) !== null && Math.abs(n - numeric(String(a))) < 1e-9);
  }
  if (q.type === 'choice') return q.choices.some(c => c.id === answer) && answer === String(q.answer);
  const normal = value => String(value).trim().toLocaleLowerCase('en-AU').replace(/\s+/g, ' ');
  return [q.answer, ...(q.accepted || [])].some(a => normal(answer) === normal(a));
}

function questionNumber(q, answer) {
  let text = answer.trim();
  if (q.numericFormat && text.includes('/')) return null;
  if (q.numericFormat === 'money') {
    text = text.replace(/^\$\s*/, '');
    if (!/^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/.test(text)) return null;
  }
  const n = numeric(text);
  if (q.numericFormat === 'integer' && !Number.isSafeInteger(n)) return null;
  return n;
}

function answerFeedback(q, answer) {
  if (q.type === 'number' && questionNumber(q, answer) === null) return ({ integer: 'Enter one whole number. If the question asks for a missing numerator, enter just that number.',
    decimal: 'Write your answer as a decimal number. Keep thinking about the same amount.',
    money: 'Enter the amount in dollars. Use at most two digits after the decimal point.' })[q.numericFormat] || 'Enter a number for this question.';
  return q.choices?.find(c => c.id === answer)?.feedback || 'Good thinking takes practice. Try again, or open a hint.';
}

function powerExplanation(power, objective, target) {
  const id = objective.id;
  const group = ['hearth', 'lantern', 'mist', 'final-beacon', 'final-heart'].includes(id) ? 'light'
    : ['brook', 'heart', 'final-bridge', 'cloud'].includes(id) ? 'build'
    : ['seed', 'canopy'].includes(id) ? 'water'
    : ['wind', 'kite'].includes(id) ? 'rescue'
    : ['lens', 'bloom'].includes(id) ? 'clear' : 'move';
  const actions = {
    light: { fire: 'A bright, carefully shaped flame lights the beacon', storm: 'A spiral of sparks gathers inside the lantern', nature: 'Luminous flowers unfurl and fill the lantern with green light', astral: 'A ribbon of starlight fills the crystal with a gentle glow' },
    build: { fire: 'Magical forging fire seals the broken joins and makes them strong', storm: 'A steady lifting wind holds the structure in place while its joins close', nature: 'Strong living roots weave the loose pieces safely together', astral: 'Starlight lifts and binds the pieces into a shining whole' },
    water: { fire: 'Gentle dragon warmth wakes the enchanted rain basin and releases its stored water', storm: 'A small rain cloud gathers and sends water towards the roots', nature: 'Fresh vines guide the water into the thirsty soil', astral: 'Floating drops of water follow a silver path to the roots' },
    rescue: { fire: 'A warm rising current carries your dragon safely to the target', storm: 'A controlled gust supports your dragon and frees the way', nature: 'Supple vines make a safe route and gently lift what is caught', astral: 'A bridge of starlight guides your dragon safely across' },
    clear: { fire: 'Warm dragon magic lifts the veil and reveals the clear surface beneath', storm: 'A soft, precise gust brushes the covering aside', nature: 'Soft leaves sweep the surface clear without scratching it', astral: 'A silver shimmer lifts the covering and brings the light through' },
    move: { fire: 'A pulse of forging magic frees the stuck mechanism and eases it into place', storm: 'A carefully directed gust turns and guides the mechanism', nature: 'Flexible vines reach around the mechanism and move it gently', astral: 'A ring of starlight lifts and aligns the mechanism' }
  };
  return `${actions[group][power]}. ${target} is ready, and the grove can continue.`;
}

export function applyAction(current, action) {
  validateState(current);
  requireRule(action && typeof action === 'object' && !Array.isArray(action) && typeof action.type === 'string', 'Choose a dragon action.');
  const s = structuredClone(current);
  s.lastEvent = null;
  const event = (type, fields = {}) => { s.lastEvent = { type, level: s.level, stage: s.stage, at: new Date().toISOString(), ...fields }; };
  switch (action.type) {
    case 'begin': {
      requireRule(s.phase === 'welcome', 'Your dragon adventure has already begun.');
      const name = typeof action.name === 'string' ? action.name.trim().replace(/\s+/g, ' ') : '';
      requireRule(validName(name), 'Choose a dragon name with 1–24 letters, numbers, spaces, apostrophes or hyphens.');
      s.name = name; s.phase = 'questions'; event('begin', { name }); break;
    }
    case 'hint': {
      const q = currentQuestion(s);
      requireRule(s.phase === 'questions' && q && action.questionId === q.id, 'Open the current question first.');
      requireRule(!s.hintUsed, 'This hint is already open.');
      s.hintUsed = true; s.counters.hints++; event('hint', { questionId: q.id, subject: q.subject, prompt: q.prompt, hint: q.hint }); break;
    }
    case 'answer': {
      const q = currentQuestion(s);
      requireRule(s.phase === 'questions' && q && action.questionId === q.id, 'This question has changed. Load your latest dragon.');
      requireRule(typeof action.answer === 'string' && action.answer.trim() && action.answer.length <= 120, 'Enter your answer or choose a picture.');
      if (q.type === 'choice') requireRule(q.choices.some(c => c.id === action.answer), 'Choose one of the displayed answers.');
      const correct = markAnswer(q, action.answer);
      s.counters.answers++;
      event('answer', { questionId: q.id, contentVersion: CONTENT_VERSION, subject: q.subject, prompt: q.prompt,
        answer: action.answer.trim(), answerLabel: q.type === 'choice' ? q.choices.find(c => c.id === action.answer).label : action.answer.trim(),
        correct, hintUsed: s.hintUsed, explanation: correct ? q.explanation : answerFeedback(q, action.answer) });
      if (correct) { s.counters.correct++; s.questionIndex++; s.hintUsed = false; if (s.questionIndex === 3) s.phase = 'evolution'; }
      break;
    }
    case 'evolve':
      requireRule(s.phase === 'evolution', 'Solve the three questions before choosing a growth path.');
      requireRule(PATHS.includes(action.path), 'Choose Fire, Storm, Nature or Astral.');
      s.paths[action.path]++; s.stage++; s.growth.push({ level: s.level, stage: s.stage, path: action.path });
      s.phase = 'adventure'; s.objectiveIndex = 0; event('evolution', { path: action.path, paths: { ...s.paths } }); break;
    case 'adventure': {
      requireRule(s.phase === 'adventure', 'Complete your growth choice before this adventure.');
      requireRule(PATHS.includes(action.power) && s.paths[action.power] > 0, 'Choose a dragon power you have earned.');
      const objective = ADVENTURES[s.level - 1][s.objectiveIndex];
      const target = objective.targets.find(t => t.id === action.targetId);
      requireRule(target, 'Choose one of the three adventure targets.');
      const correct = target.id === objective.correctTarget;
      s.counters.adventureAttempts++;
      event('adventure', { objectiveId: objective.id, title: objective.title, clue: objective.clue, targetId: target.id, targetLabel: target.label,
        power: action.power, correct, explanation: correct ? powerExplanation(action.power, objective, target.label) : 'Look closely at the clue. Your dragon is ready to try another target.' });
      if (correct) {
        s.adventures.push({ level: s.level, objectiveId: objective.id, power: action.power, targetId: target.id });
        s.objectiveIndex++;
        if (s.objectiveIndex === ADVENTURES[s.level - 1].length) { s.completedLevels.push(s.level); s.phase = s.level === 10 ? 'complete' : 'celebrate'; }
      }
      break;
    }
    case 'next':
      requireRule(s.phase === 'celebrate', 'Finish this adventure before moving on.');
      s.level++; s.questionIndex = 0; s.hintUsed = false; s.objectiveIndex = 0; s.phase = 'questions'; event('next'); break;
    default: throw new GameError('Unknown dragon action.');
  }
  s.version++;
  return validateState(s);
}

export function publicState(s) {
  validateState(s);
  const out = structuredClone(s);
  delete out.questionSet;
  const q = s.phase === 'questions' ? currentQuestion(s) : null;
  out.currentQuestion = q ? { id: q.id, level: q.level, subject: q.subject, prompt: q.prompt, type: q.type,
    ...(q.unit ? { unit: q.unit } : {}), ...(q.numericFormat ? { numericFormat: q.numericFormat } : {}), ...(q.choices ? { choices: q.choices.map(c => ({ id: c.id, label: c.label, ...(c.image ? { image: c.image } : {}), ...(c.visual ? { visual: structuredClone(c.visual) } : {}) })) } : {}),
    ...(q.visual ? { visual: structuredClone(q.visual) } : {}), hintUsed: s.hintUsed, ...(s.hintUsed ? { hint: q.hint } : {}) } : null;
  if (out.currentQuestion && q.diagram) out.currentQuestion.visual = structuredClone(q.diagram);
  const adventure = s.phase === 'adventure' ? ADVENTURES[s.level - 1][s.objectiveIndex] : null;
  out.adventure = adventure ? { id: adventure.id, title: adventure.title, clue: adventure.clue, targets: structuredClone(adventure.targets),
    objectiveIndex: s.objectiveIndex, objectiveCount: ADVENTURES[s.level - 1].length } : null;
  out.levelInfo = LEVELS[s.level - 1]; out.levels = LEVELS;
  out.availablePowers = PATHS.filter(p => s.paths[p] > 0);
  out.stats = { strength: 10 + s.stage * 14 + s.paths.fire * 4 + s.paths.storm * 2 + s.paths.nature * 3 + s.paths.astral * 3,
    stature: Number((0.35 + s.stage * 0.47 + s.stage * s.stage * 0.014).toFixed(2)),
    solved: s.counters.correct, answers: s.counters.answers, hints: s.counters.hints };
  return out;
}
