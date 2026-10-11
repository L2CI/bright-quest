import assert from 'node:assert/strict';
import {test} from 'node:test';
import {existsSync} from 'node:fs';
import {CONTENT_VERSION, QUESTIONS, BLOCKS, CURRICULUM_SOURCES} from '../functions/_lib/dragon-expedition-content.js';
import {QUESTIONS as ORIGINAL_QUESTIONS} from '../functions/_lib/dragon-grove-content.js';
import {markAnswer} from '../functions/_lib/dragon-grove.js';

const at = order => QUESTIONS.find(q => q.order === order);
const correct = order => at(order).choices.find(c => c.id === at(order).answer).label;
const numbers = cells => cells.map(cell => Number(String(cell).match(/^-?\d+(?:\.\d+)?/)?.[0]));

test('Chapter II has six ordered blocks with five genuinely new questions and a balanced subject mix', () => {
  assert.equal(CONTENT_VERSION,1);
  assert.deepEqual(BLOCKS.map(b => b.block),[1,2,3,4,5,6]);
  assert.deepEqual(QUESTIONS.map(q => q.order),Array.from({length:30},(_,i) => i+1));
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size,30);
  assert.equal(new Set(QUESTIONS.map(q => q.prompt)).size,30);
  const originalIds = new Set(ORIGINAL_QUESTIONS.map(q => q.id));
  const originalPrompts = new Set(ORIGINAL_QUESTIONS.map(q => q.prompt));
  for (const block of BLOCKS) {
    const group = QUESTIONS.filter(q => q.block === block.block);
    assert.equal(group.length,5);
    assert.equal(new Set(group.map(q => q.subject)).size,3);
    assert.ok(block.title && block.description && block.learningBand);
  }
  for (const subject of ['maths','living','world']) assert.equal(QUESTIONS.filter(q => q.subject === subject).length,10);
  for (const q of QUESTIONS) {
    assert.equal(q.level,q.block);
    assert.equal(q.block,Math.ceil(q.order/5));
    assert.equal(q.id,`expedition-b${String(q.block).padStart(2,'0')}-q${String(q.order).padStart(2,'0')}`);
    assert.ok(!originalIds.has(q.id) && !originalPrompts.has(q.prompt),q.id);
    assert.equal(q.type,q.subject === 'maths' ? 'number' : 'choice');
    assert.ok(q.prompt.length <= 340 && q.hint && q.explanation,q.id);
    assert.ok(q.alignment.length && q.alignment.every(code => /^AC9[MS][45][A-Z]{1,2}\d\d$/.test(code)),q.id);
  }
});

test('all ten mathematical results match independently computed operations and the stated units', () => {
  const expected = new Map([
    [1,{answer:246+178,unit:'metres',operands:['246','178']}],
    [4,{answer:7*36,unit:'berries',operands:['7','36']}],
    [7,{answer:168/8,unit:'crystals per pouch',operands:['168','8']}],
    [11,{answer:23/100,unit:'of the route',operands:['23/100','decimal']}],
    [14,{answer:2*(18+7),unit:'metres',operands:['18','7','four sides']}],
    [17,{answer:(15*60+10)-(13*60+45),unit:'minutes',operands:['1:45 pm','3:10 pm','same day']}],
    [20,{answer:(2500-3*475)/100,unit:'dollars',operands:['$25.00','3','$4.75']}],
    [23,{answer:(36/4)*3,unit:'seedlings',operands:['36','three quarters']}],
    [26,{answer:(5*48-24)/8,unit:'crystals per beacon',operands:['5','48','24','8']}],
    [29,{answer:64-(3+5+2)*4,unit:'kilometres remaining',operands:['1 centimetre','4 kilometres','3 cm','5 cm','2 cm','64']}]
  ]);
  const maths = QUESTIONS.filter(q => q.type === 'number');
  assert.deepEqual(maths.map(q => q.order),[...expected.keys()]);
  for (const q of maths) {
    const fixture = expected.get(q.order);
    assert.equal(q.answer,fixture.answer,q.id);
    assert.equal(q.unit,fixture.unit,q.id);
    for (const operand of fixture.operands) assert.ok(q.prompt.includes(operand),`${q.id}: missing given ${operand}`);
    assert.ok(markAnswer(q,String(fixture.answer)),q.id);
    assert.ok(!markAnswer(q,String(fixture.answer+1)),q.id);
    if(q.numericFormat === 'integer') assert.ok(Number.isSafeInteger(q.answer),q.id);
  }
  assert.equal(at(20).answerCents,2500-3*475);
  assert.equal(at(11).numericFormat,'decimal');
  assert.equal(at(20).numericFormat,'money');
});

test('existing answer marking accepts equivalent valid entries without accepting incomplete numbers or wrong representations', () => {
  for (const q of QUESTIONS.filter(q => q.type === 'number')) {
    assert.ok(markAnswer(q,` ${q.answer} `),q.id);
    for (const invalid of ['', ' ',`${q.answer} metres`,`${q.answer}xyz`,'NaN','Infinity','1e2','1,2','1/0']) assert.ok(!markAnswer(q,invalid),`${q.id}: ${invalid}`);
  }
  assert.ok(markAnswer(at(11),'0.2300'));
  assert.ok(!markAnswer(at(11),'23/100'),'decimal task must assess decimal notation');
  assert.ok(!markAnswer(at(11),'23'),'hundredths cannot be treated as whole units');
  assert.ok(markAnswer(at(20),'$10.75'));
  assert.ok(!markAnswer(at(20),'1075'),'money task requests dollars, not cents');
  assert.ok(!markAnswer(at(20),'10.754'),'extra decimal places must not round into a correct amount');
  assert.ok(!markAnswer(at(20),'43/4'),'money task requests a dollar amount');
  assert.ok(!markAnswer(at(14),'25'),'perimeter must include all four sides');
  assert.ok(!markAnswer(at(17),'1.25'),'duration must be entered in minutes');
  assert.ok(!markAnswer(at(26),'30'),'camp supply must be removed before sharing');
  assert.ok(!markAnswer(at(29),'40'),'question asks for distance remaining, not distance flown');
});

test('science choices use varied positions, neutral IDs, distinct labels and feedback for each misconception', () => {
  const positions = [0,0,0];
  for (const q of QUESTIONS.filter(q => q.type === 'choice')) {
    assert.deepEqual(q.choices.map(c => c.id),['a','b','c'],q.id);
    assert.equal(new Set(q.choices.map(c => c.label)).size,3,q.id);
    assert.equal(new Set(q.choices.map(c => c.feedback)).size,3,q.id);
    assert.equal(q.choices.filter(c => c.id === q.answer).length,1,q.id);
    assert.ok(q.choices.every(c => c.feedback.length > 25),q.id);
    for (const c of q.choices) {
      assert.equal(markAnswer(q,c.id),c.id === q.answer,q.id);
      assert.ok(!/^(correct|right answer)|all of the above|none of the above/i.test(c.label),q.id);
    }
    assert.ok(!markAnswer(q,'unknown') && !markAnswer(q,correct(q.order)),q.id);
    positions[q.choices.findIndex(c => c.id === q.answer)]++;
  }
  assert.deepEqual(positions,[7,7,6]);
});

test('living-things questions preserve food roles, relationships and limits on observations', () => {
  assert.match(at(2).prompt,/each arrow means "is eaten by"/);
  assert.equal(correct(2),'The grasshopper');
  assert.deepEqual(at(2).diagram.items.map(x=>x.label),['Grass','Grasshopper','Lizard']);
  assert.match(correct(5),/return nutrients.*dead material/);
  assert.equal(correct(8),'Caterpillars');
  assert.match(at(8).explanation,/does not guarantee/);
  assert.match(correct(10),/similar seedlings.*soil.*light.*only the water/);
  assert.match(correct(13),/less dead plant material/);
  assert.match(correct(16),/pollination.*can lead to seed/);
  assert.match(at(16).prompt,/same kind.*pollen-receiving part/);
  assert.match(at(16).explanation,/does not guarantee/);
  assert.match(correct(19),/strong hind legs/);
  assert.match(at(19).prompt,/typical tadpole/);
  assert.match(at(19).explanation,/does not choose/);
  assert.match(correct(22),/shape, colour and stillness.*predators/);
  assert.match(at(22).explanation,/not an instant decision/);
  assert.match(correct(25),/Fewer were seen.*more matched observations/);
  assert.match(correct(28),/Protect and regrow.*shrubs/);
  assert.match(at(28).explanation,/caterpillars.*birds.*nesting/);
});

test('physical and Earth science distinguish attraction, water-cycle changes, reflected light and erosion', () => {
  assert.match(at(3).prompt,/north poles/);
  assert.match(correct(3),/push.*apart/);
  assert.equal(correct(6),'Precipitation');
  assert.match(correct(12),/paperclip, surface.*gap/);
  assert.match(at(12).explanation,/same.*orientation.*Repeat/);
  assert.match(correct(15),/increased evaporation in this test/);
  assert.match(at(15).prompt,/same temperature.*no water spills/);
  assert.match(correct(18),/Sunlight reflects from the Moon/);
  assert.equal(correct(21),'Erosion by moving water');
  assert.match(at(21).prompt,/Weathering breaks.*Erosion removes/);
  assert.match(at(24).explanation,/did not make new heat/);
  assert.match(at(27).prompt,/opaque.*twice/);
  assert.match(at(27).explanation,/blocks light/);
  assert.match(at(30).explanation,/do not prove.*every storm or landslide/);
});

test('table data independently support the keyed conclusions rather than hiding a second correct answer', () => {
  const materials = at(9).diagram.rows;
  const suitable = materials.filter(row=>row[1]==='Yes'&&row[2]==='Yes');
  assert.deepEqual(suitable.map(row=>row[0]),[correct(9)]);
  const evaporation = at(15).diagram.rows.map(row=>Number(row[2].split(' ')[0]));
  assert.ok(evaporation[1]>evaporation[0]);
  const temperatures = at(24).diagram.rows.map(row=>({label:row[0],drop:numbers(row.slice(1))[0]-numbers(row.slice(1))[1]}));
  assert.equal(temperatures.filter(x=>x.drop===Math.min(...temperatures.map(x=>x.drop))).length,1);
  assert.equal(temperatures.sort((a,b)=>a.drop-b.drop)[0].label,'Felt');
  const [nearTorch,nearScreen] = at(27).diagram.rows.map(row=>numbers(row.slice(1)));
  assert.ok(nearTorch.every((width,i)=>width>nearScreen[i]));
  const [covered,bare] = at(30).diagram.rows.map(row=>numbers(row.slice(1)));
  assert.ok(covered.every((loss,i)=>loss<bare[i]));
  assert.match(correct(30),/both of these tests/);
  const mapLength = at(29).diagram.rows.reduce((sum,row)=>sum+Number(row[1].split(' ')[0]),0);
  assert.equal(at(29).answer,64-mapLength*4);
});

test('question diagrams contain accessible givens only and illustrations match their subjects', () => {
  const appropriate = new Map([['grass','Grass'],['grasshopper','Grasshopper'],['lizard','Lizard'],['cloud','Rain cloud'],['butterfly','Butterfly carries pollen']]);
  const diagrams = QUESTIONS.filter(q=>q.diagram);
  assert.ok(diagrams.length>=10);
  for (const q of diagrams) {
    const d=q.diagram;
    assert.ok(d.title && ['table','foodChain','sequence'].includes(d.type),q.id);
    assert.ok(!/"(?:answer|correct|correctOptionId|hint|feedback|explanation)"\s*:/.test(JSON.stringify(d)),q.id);
    if (d.type==='table') {
      assert.ok(d.columns.length>=2 && d.rows.length>=2,q.id);
      assert.ok(d.rows.every(row=>row.length===d.columns.length && row.every(cell=>typeof cell==='string'&&cell.length)),q.id);
    }
    for (const item of d.items||[]) {
      assert.ok(item.id && item.label,q.id);
      if (!item.asset) continue;
      assert.equal(item.label,appropriate.get(item.asset),q.id);
      assert.ok(existsSync(new URL(`../dragon-grove/assets/science/${item.asset}.webp`,import.meta.url)),q.id);
    }
  }
});

test('difficulty develops into linked operations and evidence reasoning with supported extension references', () => {
  assert.equal(QUESTIONS.filter(q=>q.block<=3&&q.alignment.some(code=>code.startsWith('AC9S5'))).length,0);
  assert.ok(BLOCKS.slice(3).every(b=>b.learningBand.includes('supported Year 5')));
  assert.match(at(1).explanation,/\+/);
  assert.match(at(26).explanation,/×.*After keeping.*÷/);
  assert.match(at(29).explanation,/\+.*×.*−/);
  assert.match(at(25).prompt,/most careful conclusion/);
  assert.match(at(30).prompt,/repeat.*conclusion is supported/);
  assert.ok(CURRICULUM_SOURCES.every(url=>url.startsWith('https://www.qcaa.qld.edu.au/downloads/aciqv9/')&&url.endsWith('_as_cd_alignment.pdf')));
  for (const order of [16,19,22]) assert.ok(at(order).sources.every(url=>/^https:\/\/(?:media\.)?australian\.museum\//.test(url)));
});
