import assert from 'node:assert/strict';
import {test} from 'node:test';
import {CONTENT_VERSION, QUESTIONS, LEVELS, CURRICULUM_SOURCES} from '../functions/_lib/dragon-grove-content.js';

const at = (level, subject, variant = 1) => QUESTIONS.find(q => q.level === level && q.subject === subject && q.variant === variant);
const correctLabel = q => q.choices.find(c => c.id === q.answer)?.label;

test('every level has independent maths, living-things and world-science learning, with stable replay variants', () => {
  assert.equal(CONTENT_VERSION, 1);
  assert.equal(LEVELS.length, 10);
  assert.equal(QUESTIONS.length, 90);
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, 90);
  for (let level = 1; level <= 10; level++) {
    for (const subject of ['maths','living','world']) {
      const variants = QUESTIONS.filter(q => q.level === level && q.subject === subject);
      assert.deepEqual(variants.map(q => q.variant).sort(), [1,2,3]);
      assert.equal(new Set(variants.map(q => q.prompt)).size, 3, `Repeated wording for ${level}/${subject}`);
      for (const q of variants) {
        assert.equal(q.id, `dragon-l${String(level).padStart(2,'0')}-${subject}-v${q.variant}`);
        assert.equal(q.slot, subject);
        assert.equal(q.type, subject === 'maths' ? 'number' : 'choice');
        assert.ok(q.hint.trim().length > 0 && q.explanation.trim().length > 0, q.id);
        assert.ok(q.alignment.every(code => /^AC9[MS][345][A-Z]{1,2}\d\d$/.test(code)), q.id);
      }
    }
  }
});

test('all thirty maths answers independently match the written calculation, including regrouping, noon and money', () => {
  const expected = [
    [84 + 27, 76 + 38, 68 + 57],
    [5 * 8, 7 * 5, 9 * 4],
    [36 / 4, 45 / 5, 48 / 4],
    [3 * (8 / 4), 2 * (6 / 3), 2 * (10 / 5)],
    [3 * 128, 4 * 116, 4 * 124],
    [(10 * 60 + 20) - (9 * 60 + 35), (12 * 60 + 20) - (11 * 60 + 45), (15 * 60 + 30) - (14 * 60 + 48)],
    [6 * 24 - 39, 5 * 28 - 47, 7 * 18 - 46],
    [3 / 4, 1 / 4, 1 / 2],
    [(2000 - 3 * 450) / 100, (2000 - 4 * 325) / 100, (2000 - 5 * 275) / 100],
    [(4 * 36 + 18) / 6, (5 * 28 + 20) / 8, (6 * 24 + 24) / 7]
  ];
  for (let level = 1; level <= 10; level++) for (let variant = 1; variant <= 3; variant++) {
    const q = at(level,'maths',variant);
    assert.equal(Number(q.answer), expected[level - 1][variant - 1], q.id);
    assert.ok(Number.isFinite(Number(q.answer)) && Number(q.answer) > 0, q.id);
    if (q.numericFormat === 'integer') assert.ok(Number.isSafeInteger(Number(q.answer)), q.id);
    if (q.numericFormat === 'money') assert.equal(q.answerCents, expected[level - 1][variant - 1] * 100, q.id);
  }
});

test('number format and help preserve what each task is actually assessing', () => {
  for (const q of QUESTIONS.filter(q => q.subject === 'maths')) {
    assert.ok(q.unit && q.numericFormat, q.id);
    assert.ok(!q.prompt.includes('calculator required'), q.id);
  }
  for (let v = 1; v <= 3; v++) {
    assert.match(at(4,'maths',v).prompt, /\[ \]/);
    assert.equal(at(4,'maths',v).numericFormat, 'integer');
    assert.match(at(8,'maths',v).prompt, /decimal/);
    assert.equal(at(8,'maths',v).numericFormat, 'decimal');
    assert.match(at(9,'maths',v).prompt, /dollars/);
    assert.equal(at(9,'maths',v).numericFormat, 'money');
  }
  assert.match(at(6,'maths',2).explanation, /noon/);
});

test('science marking is unambiguous and correctness is not always the first rendered choice', () => {
  const positions = new Set();
  for (const q of QUESTIONS.filter(q => q.type === 'choice')) {
    assert.equal(q.choices.length,3,q.id);
    assert.equal(new Set(q.choices.map(c => c.id)).size,3,q.id);
    assert.equal(new Set(q.choices.map(c => c.label)).size,3,q.id);
    assert.equal(q.choices.filter(c => c.id === q.answer).length,1,q.id);
    assert.ok(correctLabel(q),q.id);
    positions.add(q.choices.findIndex(c => c.id === q.answer));
    assert.ok(q.choices.every(c => !/all of the above|none of the above/i.test(c.label)),q.id);
  }
  assert.deepEqual([...positions].sort(),[0,1,2]);
});

test('the living-things bank uses scientifically sound roles and does not confuse magic with real adaptation', () => {
  const expectedConcept = [
    [/beetle/,/fern/,/water.*new leaves/],
    [/pupa|chrysalis/i,/tadpole/i,/young frog/i],
    [/moist/i,/warmth/i,/water.*germination/i],
    [/grass$/i,/pondweed/i,/cabbage/i],
    [/decomposer/i,/decomposer/i,/decomposer/i],
    [/less food/i,/less available food/i,/less food/i],
    [/grasshopper → lizard/i,/caterpillar → bird/i,/caterpillar → spider/i],
    [/matching conditions.*break down faster/i,/matching.*break down faster/i,/matching wood.*only one group/i],
    [/slows heat loss/i,/move through water/i,/retain water/i],
    [/warmth when cool.*overheating when hot/i,/body temperature/i,/heat.*food/i]
  ];
  for (let l = 1; l <= 10; l++) for (let v = 1; v <= 3; v++) assert.match(correctLabel(at(l,'living',v)),expectedConcept[l-1][v-1],at(l,'living',v).id);
  for (let v = 1; v <= 3; v++) {
    assert.match(at(7,'living',v).prompt, /is eaten by/);
    assert.ok(!at(3,'living',v).explanation.includes('sunlight to germinate'));
    assert.ok(at(9,'living',v).alignment.includes('AC9S5U01'));
    assert.ok(at(10,'living',v).alignment.includes('AC9S5U01'));
  }
  assert.match(at(10,'living').explanation, /cannot instantly choose/);
});

test('physical and Earth science retain direction, state, controlled conditions and the limits of evidence', () => {
  for (let v = 1; v <= 3; v++) {
    assert.match(correctLabel(at(1,'world',v)), /melting/i);
    assert.match(correctLabel(at(2,'world',v)), /warmer/);
    assert.match(correctLabel(at(3,'world',v)), /freezing|removed by cooling/i);
    assert.match(correctLabel(at(4,'world',v)), /evapora/i);
    assert.match(correctLabel(at(5,'world',v)), /friction/i);
    assert.match(correctLabel(at(6,'world',v)), /condensation/i);
    assert.match(correctLabel(at(7,'world',v)), /magnetic.*gravit/i);
    assert.match(correctLabel(at(8,'world',v)), /same|equal-sized/i);
    assert.match(correctLabel(at(10,'world',v)), /these tests/i);
    assert.match(at(10,'world',v).explanation, /every possible|every object/);
  }
  assert.match(at(4,'world').explanation, /gas/);
  assert.match(at(6,'world').explanation, /droplets/);
  assert.match(at(5,'world').prompt, /same starting push.*level paths/);
});

test('material and distance diagrams agree with their prompts and independently determine the selected evidence', () => {
  for (let v = 1; v <= 3; v++) {
    const q = at(9,'world',v);
    const matched = q.diagram.rows.filter(row => row[1] === 'Yes' && row[2] === (v === 3 ? 'Slowly' : 'Yes'));
    assert.equal(matched.length,1);
    assert.equal(matched[0][0].toLowerCase(),q.answer);
    const distance = at(10,'world',v);
    const [a,b] = distance.diagram.rows.map(row => row.slice(1).map(Number));
    const longerIndex = Math.min(...a) > Math.max(...b) ? 0 : Math.min(...b) > Math.max(...a) ? 1 : -1;
    assert.ok(longerIndex >= 0);
    const label = distance.diagram.rows[longerIndex][0];
    assert.ok(correctLabel(distance).includes(` ${label} `),distance.id);
    for (const row of distance.diagram.rows) for (const n of row.slice(1)) assert.ok(distance.prompt.includes(n),`${distance.id}: omitted ${n}`);
  }
});

test('public diagrams contain observations, not grading fields or revealed missing lifecycle stages', () => {
  for (const q of QUESTIONS.filter(q => q.diagram)) {
    assert.ok(q.diagram.title && ['sequence','foodChain','table','comparison','cards'].includes(q.diagram.type),q.id);
    const serial = JSON.stringify(q.diagram);
    assert.ok(!/"(?:answer|correct|correctOptionId|hint|explanation)"\s*:/.test(serial),q.id);
    if (q.diagram.items) assert.ok(q.diagram.items.every(item => item.id && item.label),q.id);
    if (q.diagram.type === 'table') assert.ok(q.diagram.rows.every(row => row.length === q.diagram.columns.length),q.id);
  }
  assert.ok(!JSON.stringify(at(2,'living').diagram).match(/pupa|chrysalis/i));
  assert.ok(at(2,'living').diagram.items.some(item => item.id === 'missing'));
});

test('difficulty increases through linked operations and reasoning while references use final v9 documents', () => {
  assert.match(at(1,'maths').hint,/Add 20/);
  assert.match(at(7,'maths').explanation,/×.*−/);
  assert.match(at(10,'maths').explanation,/×.*Add.*÷/);
  assert.match(at(8,'living').prompt,/support.*prediction/);
  assert.match(at(10,'world').prompt,/conclusion.*supported/);
  assert.ok(LEVELS.slice(8).every(l => l.learningBand.includes('supported Year 5')));
  assert.ok(CURRICULUM_SOURCES.length >= 5);
  assert.ok(CURRICULUM_SOURCES.every(s => s.startsWith('https://www.qcaa.qld.edu.au/downloads/aciqv9/') && s.endsWith('_as_cd_alignment.pdf')));
});
