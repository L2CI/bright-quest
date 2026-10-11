// Private Chapter II content. Public API responses must allowlist question givens only.
// Original questions; curriculum references checked 11 October 2026. "Year 4.5" is not an official band.
export const CONTENT_VERSION = 1;

export const BLOCKS = [
  {block:1,title:'Beyond the grove',description:'Pack for the journey and read the living mountain.',learningBand:'Year 4 foundations'},
  {block:2,title:'The cloud crossing',description:'Choose useful materials and follow connections in nature.',learningBand:'Year 4 application'},
  {block:3,title:'The highland camp',description:'Measure, compare and plan a fair investigation.',learningBand:'Year 4 reasoning'},
  {block:4,title:'The moonlit valley',description:'Link structures to their uses and solve longer problems.',learningBand:'Year 4 with supported Year 5 science'},
  {block:5,title:'The weathered peaks',description:'Look for patterns while keeping conclusions fair.',learningBand:'Year 4 extension with supported Year 5 science'},
  {block:6,title:'The guardian returns',description:'Combine calculations and evidence to help Emberwild.',learningBand:'Year 4 extension with supported Year 5 science'}
];

const record = (block, order, data) => ({
  id:`expedition-b${String(block).padStart(2,'0')}-q${String(order).padStart(2,'0')}`,
  block,level:block,order,...data
});
const choice = (id,label,feedback) => ({id,label,feedback});
const table = (title,columns,rows) => ({type:'table',title,columns,rows});

export const QUESTIONS = [
  record(1,1,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'metres',alignment:['AC9M4N06'],
    prompt:'Your dragon climbs 246 metres above the grove, then another 178 metres. How many metres has it climbed altogether?',
    answer:424,hint:'Split the second climb into hundreds, tens and ones. Add each part.',
    explanation:'246 + 100 = 346; another 70 makes 416; another 8 makes 424 metres.'
  }),
  record(1,2,{
    subject:'living',type:'choice',alignment:['AC9S4U01'],
    prompt:'In this meadow food chain, each arrow means "is eaten by". Which animal gets its food directly from the producer?',
    choices:[
      choice('a','The lizard','Trace just one arrow from the plant. The lizard eats an animal in this chain.'),
      choice('b','The grasshopper','Yes. It eats the grass, which is the producer.'),
      choice('c','The grass','Grass is the producer. The question asks for an animal that eats it.')
    ],answer:'b',hint:'A producer is a living thing such as a green plant that makes its own food.',
    explanation:'The grass makes its own food. The grasshopper eats the grass, so it is the first consumer in this chain.',
    diagram:{type:'foodChain',title:'A meadow food chain — arrows mean "is eaten by"',items:[
      {id:'grass',label:'Grass',asset:'grass'},{id:'grasshopper',label:'Grasshopper',asset:'grasshopper'},{id:'lizard',label:'Lizard',asset:'lizard'}
    ]}
  }),
  record(1,3,{
    subject:'world',type:'choice',alignment:['AC9S4U03'],
    prompt:'At the mountain lookout, two bar magnets face each other with their north poles close together. What magnetic force acts between those poles?',
    choices:[
      choice('a','A push that moves the poles apart','Yes. Like magnetic poles repel.'),
      choice('b','A pull that brings the poles together','Opposite poles attract. Here, the two facing poles have the same name.'),
      choice('c','No magnetic force unless they touch','Magnets can exert a force across a small gap.')
    ],answer:'a',hint:'Compare a north–north pair with a north–south pair.',
    explanation:'Two north poles repel: the magnetic force pushes them apart. They do not have to touch for this force to act.'
  }),
  record(1,4,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'berries',alignment:['AC9M4A02','AC9M4N06'],
    prompt:'The mountain camp packs 7 baskets with 36 berries in each basket. How many berries are packed?',
    answer:252,hint:'Work out seven groups of 30 and seven groups of 6, then combine them.',
    explanation:'7 × 30 = 210 and 7 × 6 = 42. Together, 210 + 42 = 252 berries.'
  }),
  record(1,5,{
    subject:'living',type:'choice',alignment:['AC9S4U01'],
    prompt:'Fungi in the mountain forest break down fallen wood. How can this help other living things in the habitat?',
    choices:[
      choice('a','They turn the dead wood back into the same living tree','Decomposition breaks down dead material; it does not bring the dead tree back to life.'),
      choice('b','They make food from sunlight inside the wood','Fungi obtain nutrients from other material. They do not make food by photosynthesis.'),
      choice('c','They return nutrients from dead material to the environment','Yes. Those nutrients can become available to other living things, including plants.')
    ],answer:'c',hint:'Think about what happens to the nutrients held in a fallen branch.',
    explanation:'Fungi are decomposers. Breaking down dead wood helps recycle nutrients in the habitat.'
  }),
  record(2,6,{
    subject:'world',type:'choice',alignment:['AC9S4U02'],
    prompt:'Your dragon sees rain falling from a cloud into a mountain lake. Which water-cycle process is the rain falling?',
    choices:[
      choice('a','Evaporation','Evaporation changes liquid water into water vapour; these drops are falling from a cloud.'),
      choice('b','Precipitation','Yes. Rain falling from clouds is a form of precipitation.'),
      choice('c','Condensation','Condensation helps form liquid droplets from water vapour. The question asks about rain falling.')
    ],answer:'b',hint:'This process also includes snow or hail falling from clouds.',
    explanation:'Rain, snow and hail falling from clouds are forms of precipitation. Water can then collect in lakes or flow through the landscape.',
    diagram:{type:'sequence',title:'Follow the water',items:[{id:'cloud',label:'Rain cloud',asset:'cloud'},{id:'drops',label:'Rain falls'},{id:'lake',label:'Mountain lake'}]}
  }),
  record(2,7,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'crystals per pouch',alignment:['AC9M4N06'],
    prompt:'Share 168 glow crystals equally among 8 supply pouches. How many crystals go in each pouch?',
    answer:21,hint:'First share 160 crystals. Then share the remaining crystals.',
    explanation:'160 ÷ 8 = 20 and 8 ÷ 8 = 1. Each pouch holds 20 + 1 = 21 crystals.'
  }),
  record(2,8,{
    subject:'living',type:'choice',alignment:['AC9S4U01'],
    prompt:'The field notes show what three animals eat in this habitat. If grasshoppers become scarce, which listed food could the birds still eat?',
    choices:[
      choice('a','Grass','The notes show grass as food for grasshoppers, not for these birds.'),
      choice('b','Leaves','The notes show leaves as food for caterpillars, not for these birds.'),
      choice('c','Caterpillars','Yes. The notes show a second food source for the birds.')
    ],answer:'c',hint:'Read the birds’ row and look for another food beside grasshoppers.',
    explanation:'These birds eat both grasshoppers and caterpillars. The second food source may help them when grasshoppers are scarce; the table does not guarantee there will be enough.',
    diagram:table('Field notes: feeding observed in this habitat',['Animal','Food'],[['Grasshopper','Grass'],['Caterpillar','Leaves'],['Bird','Grasshoppers and caterpillars']])
  }),
  record(2,9,{
    subject:'world',type:'choice',alignment:['AC9S4U04','AC9S4I04'],
    prompt:'A rain cover must block water AND fold into a supply bag. Which tested material meets both needs?',
    choices:[
      choice('a','Waxed cloth','Yes. It blocks water and folds in these tests.'),
      choice('b','Glass sheet','It blocks water, but the table says it does not fold.'),
      choice('c','Wool cloth','It folds, but the table says it does not block water.')
    ],answer:'a',hint:'Check both columns for each material. One suitable property is not enough.',
    explanation:'Waxed cloth meets both stated requirements in the tests: it blocks water and folds. Glass and wool each meet only one.',
    diagram:table('Results for the tested samples',['Material','Blocks water?','Folds?'],[['Waxed cloth','Yes','Yes'],['Glass sheet','Yes','No'],['Wool cloth','No','Yes']])
  }),
  record(2,10,{
    subject:'living',type:'choice',alignment:['AC9S4I02'],
    prompt:'The camp wants to test how the amount of water affects seedling growth. Which plan makes the comparison fairest?',
    choices:[
      choice('a','Use different plant types, soils and amounts of water','Several things would change, so any growth difference would be difficult to explain.'),
      choice('b','Use similar seedlings, soil and light; change only the water amount','Yes. Keeping the other conditions alike helps isolate the effect of water.'),
      choice('c','Give all seedlings the same water, but different light','That changes light, not the amount of water being tested.')
    ],answer:'b',hint:'Change the thing you are testing and keep other important conditions alike.',
    explanation:'Use similar seedlings of the same type and age, the same soil, light and growing time, and measured water amounts. This helps link a growth difference to the water treatment.'
  }),
  record(3,11,{
    subject:'maths',type:'number',numericFormat:'decimal',unit:'of the route',alignment:['AC9M4N01','AC9M4N03'],
    prompt:'Your dragon has explored 23 of the 100 equal sections on the sky map. Write 23/100 as a decimal.',
    answer:0.23,hint:'The first place after the decimal point is tenths; the next is hundredths.',
    explanation:'23 hundredths is 2 tenths and 3 hundredths, written 0.23.'
  }),
  record(3,12,{
    subject:'world',type:'choice',alignment:['AC9S4U03','AC9S4I02'],
    prompt:'Two magnets are being compared. The test measures the greatest gap at which each magnet moves a paperclip. What should stay the same?',
    choices:[
      choice('a','Only the colour of the two magnets','Colour does not control the important differences in this force test.'),
      choice('b','A different paperclip and surface for each magnet','Changing the paperclip and surface could affect the result as well as the magnet.'),
      choice('c','The paperclip, surface and way the gap is measured','Yes. These controls make the comparison more informative.')
    ],answer:'c',hint:'The magnets are the thing being compared. Avoid changing the object they move or the measuring method.',
    explanation:'Use the same paperclip, level surface, magnet orientation and measuring procedure. Repeat the measurements. Then a difference in the gap is stronger evidence about the magnets in this test.'
  }),
  record(3,13,{
    subject:'living',type:'choice',alignment:['AC9S4U01'],
    prompt:'A path builder removes all fallen leaves from one small forest patch. What is a likely direct effect on decomposers that feed on those leaves?',
    choices:[
      choice('a','They have less dead plant material to feed on','Yes. Removing their food reduces what is available to them in that patch.'),
      choice('b','They can now make all their food from sunlight','Removing leaves does not give decomposers the ability to photosynthesise.'),
      choice('c','They immediately turn into leaf-eating animals','An organism does not change into another kind of organism when its food is removed.')
    ],answer:'a',hint:'Follow the change to the decomposers’ food supply.',
    explanation:'Decomposers that use fallen leaves lose some of their food when the leaves are removed. This can also affect nutrient recycling in that patch.'
  }),
  record(3,14,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'metres',alignment:['AC9M4M02'],
    prompt:'A rectangular landing pad is 18 metres long and 7 metres wide. How many metres of rope are needed to go once around all four sides, with no extra rope?',
    answer:50,hint:'A rectangle has two long sides and two short sides. Add all four lengths.',
    explanation:'18 + 7 + 18 + 7 = 50 metres. This distance around the edge is the perimeter.',
    diagram:table('Landing-pad measurements',['Side','Length'],[['Each long side','18 m'],['Each short side','7 m']])
  }),
  record(3,15,{
    subject:'world',type:'choice',alignment:['AC9S4U02','AC9S4I05'],
    prompt:'Two matching open dishes start with equal water. They stay at the same temperature for two hours, and no water spills. Only dish B has a fan blowing across it. What do the results support?',
    choices:[
      choice('a','Moving air stopped water from leaving dish B','Dish B lost more water, not less.'),
      choice('b','Moving air increased evaporation in this test','Yes. More water left the dish with moving air under the stated conditions.'),
      choice('c','Water in dish B changed into solid ice','The measured loss does not show freezing, and the test describes evaporation conditions.')
    ],answer:'b',hint:'Compare how much water each dish lost, then link the difference to the one changed condition.',
    explanation:'Dish B lost 18 grams of water while dish A lost 6 grams. With the other conditions matched, this supports faster evaporation with moving air in this test. The water enters the air as water vapour.',
    diagram:table('Water lost after two hours',['Dish','Air','Water lost'],[['A','Still','6 g'],['B','Moving','18 g']])
  }),
  record(4,16,{
    subject:'living',type:'choice',alignment:['AC9S4U01','AC9S5U01'],
    prompt:'A butterfly visits two flowers of the same kind. Pollen stuck to its body reaches the second flower’s pollen-receiving part. How can this help the flowering plant?',
    choices:[
      choice('a','It puts soil directly inside the petals','Pollen is made by flowers; it is not soil carried into the petals.'),
      choice('b','It lets the plant stop needing water','Pollination does not replace the plant’s need for water.'),
      choice('c','It helps pollination, which can lead to seed formation','Yes. Moving pollen to a suitable receiving part can help the plant reproduce.')
    ],answer:'c',hint:'Think about how flowers help plants produce the next generation.',
    explanation:'Insects can transfer pollen between flowers. Successful pollination can lead to fertilisation and seed formation. It does not guarantee that every flower will form seeds.',
    sources:['https://australian.museum/learn/animals/insects/'],
    diagram:{type:'sequence',title:'An observed flower visit',items:[{id:'first',label:'First flower'},{id:'visitor',label:'Butterfly carries pollen',asset:'butterfly'},{id:'second',label:'Second flower of the same kind'}]}
  }),
  record(4,17,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'minutes',alignment:['AC9M4M03'],
    prompt:'The dragon leaves the valley at 1:45 pm and reaches the next camp at 3:10 pm on the same day. How many minutes does the journey take?',
    answer:85,hint:'Count to the next whole hour, then to 3:00 pm, then add the last minutes.',
    explanation:'1:45 to 2:00 is 15 minutes, 2:00 to 3:00 is 60 minutes, and 3:00 to 3:10 is 10 minutes. 15 + 60 + 10 = 85 minutes.'
  }),
  record(4,18,{
    subject:'world',type:'choice',alignment:['AC9S5U03'],
    prompt:'At night the Moon looks bright above the valley. Which explanation correctly describes the light reaching your eyes from the Moon?',
    choices:[
      choice('a','Sunlight reflects from the Moon towards Earth','Yes. The Moon reflects light from the Sun.'),
      choice('b','The Moon makes its own visible light like the Sun','The Moon is not a visible-light source like the Sun.'),
      choice('c','Earth’s shadow shines onto the Moon','A shadow is a region where light is blocked, not a source of light.')
    ],answer:'a',hint:'An object can look bright because it reflects light from another source.',
    explanation:'The Sun gives off light. Some sunlight reaches the Moon and reflects towards Earth, allowing us to see the Moon.'
  }),
  record(4,19,{
    subject:'living',type:'choice',alignment:['AC9S5U01'],
    prompt:'The pond notes compare a typical tadpole with an adult frog. Which change helps the frog push off the ground and jump on land?',
    choices:[
      choice('a','Keeping the tadpole’s tail as its main swimming part','A tail can help a tadpole swim, but the question asks about pushing off the ground.'),
      choice('b','Developing strong hind legs','Yes. Hind legs help the frog push against the ground.'),
      choice('c','Using its gills to push against the ground','Gills help exchange gases in water; they are not jumping limbs.')
    ],answer:'b',hint:'Match the body part to the movement it can make.',
    explanation:'Strong hind legs help an adult frog push off and jump. In a typical frog life cycle, the tadpole’s body changes as the frog develops; it does not choose these changes like a magical dragon.',
    sources:['https://media.australian.museum/media/dd/documents/what_is_a_frog_2018_ao8f2g.cf378ee.pdf'],
    diagram:table('Typical frog development',['Stage','Features in the notes'],[['Tadpole','Tail; gills; lives in water'],['Adult frog','Strong hind legs; lungs; can move on land']])
  }),
  record(4,20,{
    subject:'maths',type:'number',numericFormat:'money',unit:'dollars',alignment:['AC9M4N08'],
    prompt:'At the sky market, you have $25.00 and buy 3 map cases for $4.75 each. How much money is left? Enter the amount in dollars.',
    answer:10.75,answerCents:1075,hint:'Find the cost of all three cases first. Then subtract that cost from the amount you started with.',
    explanation:'Three cases cost 3 × $4.75 = $14.25. $25.00 − $14.25 = $10.75 left.'
  }),
  record(5,21,{
    subject:'world',type:'choice',alignment:['AC9S5U02'],
    prompt:'Weathering breaks rock into smaller pieces. Erosion removes material from a place. After rain, a stream carries loose rock pieces away from a mountain path. Which described process is removing them?',
    choices:[
      choice('a','Condensation','Condensation is a change from water vapour to liquid, not the removal of loose rock.'),
      choice('b','Weathering alone','Breaking a rock into smaller pieces differs from carrying the loose pieces away.'),
      choice('c','Erosion by moving water','Yes. The stream removes and transports the loose material.')
    ],answer:'c',hint:'Separate breaking material into pieces from moving it away.',
    explanation:'Moving water erodes the path by removing loose material and transports the pieces downstream. The pieces may later be deposited where the water slows.'
  }),
  record(5,22,{
    subject:'living',type:'choice',alignment:['AC9S5U01'],
    prompt:'A brown stick insect has a twig-like body and often stays still among branches. How do these features work together to help it survive?',
    choices:[
      choice('a','Its shape, colour and stillness make it harder for predators to notice','Yes. Body features and behaviour can combine as camouflage.'),
      choice('b','Its stillness changes the insect into a real branch','A stick insect remains an animal even when it resembles a twig.'),
      choice('c','Its shape means it no longer needs food','Camouflage can help avoid predators, but the insect still needs food.')
    ],answer:'a',hint:'Imagine a bird looking for an insect among many twigs.',
    explanation:'Twig-like shape, matching colour and stillness can make a stick insect less noticeable. This is camouflage, not an instant decision to grow a new body.',
    sources:['https://australian.museum/learn/species-identification/ask-an-expert/what-do-stick-insects-look-like/']
  }),
  record(5,23,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'seedlings',alignment:['AC9M4N03','AC9M4N08'],
    prompt:'The rescue team has 36 seedlings. It plants three quarters of them beside the stream. How many seedlings does it plant there?',
    answer:27,hint:'Split the total into four equal groups, then take three of those groups.',
    explanation:'One quarter of 36 is 36 ÷ 4 = 9. Three quarters is 3 × 9 = 27 seedlings.'
  }),
  record(5,24,{
    subject:'world',type:'choice',alignment:['AC9S4U04','AC9S4I05'],
    prompt:'Three identical cups hold equal amounts of warm water. Each starts at 50°C in the same cool room. The only change is the wrapping. Which wrapping slowed cooling the most in this test?',
    choices:[
      choice('a','No wrapping','The unwrapped cup finished coolest, so it lost more heat under these conditions.'),
      choice('b','Felt wrapping','Yes. Its water stayed closest to the starting temperature.'),
      choice('c','Paper wrapping','Paper reduced cooling compared with no wrapping, but another cup stayed warmer.')
    ],answer:'b',hint:'All cups started at the same temperature. Compare how far each temperature fell.',
    explanation:'The felt-wrapped cup fell by 6°C, the paper-wrapped cup by 15°C, and the unwrapped cup by 22°C. Felt slowed cooling most in this test; it did not make new heat.',
    diagram:table('Temperature after 20 minutes',['Wrapping','Start','Finish'],[['None','50°C','28°C'],['Paper','50°C','35°C'],['Felt','50°C','44°C']])
  }),
  record(5,25,{
    subject:'living',type:'choice',alignment:['AC9S4I05','AC9S5I05'],
    prompt:'On one sunny visit, rangers count 12 butterflies in a meadow. On one rainy visit, they count 5. What is the most careful conclusion from just these two visits?',
    choices:[
      choice('a','Exactly seven butterflies have died','A lower count does not show what happened to each butterfly.'),
      choice('b','The meadow will always have fewer butterflies from now on','Two visits cannot show that a pattern will continue forever.'),
      choice('c','Fewer were seen on the rainy visit; more matched observations are needed','Yes. The counts show what was seen, but do not by themselves explain the difference.')
    ],answer:'c',hint:'A count records what an observer sees. Consider what the two counts cannot tell you.',
    explanation:'Only the observed counts are certain here. Weather, activity and visibility could affect sightings. Repeat visits with the same area, search time and method would give stronger evidence.',
    diagram:table('Two meadow visits',['Visit','Weather','Butterflies seen'],[['1','Sunny','12'],['2','Rainy','5']])
  }),
  record(6,26,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'crystals per beacon',alignment:['AC9M4N06','AC9M4N08'],
    prompt:'For the return flight, 5 crates each hold 48 glow crystals. The team keeps 24 crystals at camp and shares the rest equally among 8 beacons. How many crystals does each beacon receive?',
    answer:27,hint:'Find the total in the crates, take away the camp supply, then share the remaining crystals.',
    explanation:'5 × 48 = 240 crystals. After keeping 24, there are 216. 216 ÷ 8 = 27 crystals per beacon.'
  }),
  record(6,27,{
    subject:'world',type:'choice',alignment:['AC9S5U03','AC9S5I05'],
    prompt:'A torch and screen stay in fixed positions. An opaque model dragon moves between them. Each position is tested twice. Which claim is supported by both trials?',
    choices:[
      choice('a','The shadow was larger when the model was nearer the torch','Yes. Both measurements at that position are larger than both measurements at the other position.'),
      choice('b','The model let all the torchlight pass through it','An opaque model blocks some light and makes a shadow.'),
      choice('c','Moving the model did not change the shadow size','The two positions have different measured shadow widths.')
    ],answer:'a',hint:'Compare the two shadow widths at each position. Use both trials.',
    explanation:'Near the torch, the shadow widths were 24 and 25 cm; near the screen, they were 11 and 12 cm. Both trials support a larger shadow nearer this torch. The opaque model blocks light travelling towards the screen.',
    diagram:table('Shadow width on the screen',['Model position','Trial 1','Trial 2'],[['Near torch','24 cm','25 cm'],['Near screen','11 cm','12 cm']])
  }),
  record(6,28,{
    subject:'living',type:'choice',alignment:['AC9S4U01','AC9S4H02'],
    prompt:'In this simplified habitat, caterpillars eat leaves on shrubs and birds eat those caterpillars. Some birds also nest in the shrubs. Which action supports both the birds’ food supply and their nesting places?',
    choices:[
      choice('a','Remove the shrubs and leave bare ground','That removes the caterpillars’ food plants and the stated nesting places.'),
      choice('b','Protect and regrow the leafy shrubs','Yes. The shrubs support the caterpillars and offer nesting places.'),
      choice('c','Replace the shrubs with rocks and remove the caterpillars','That does not preserve either of the two needs described.')
    ],answer:'b',hint:'Trace the food link and the shelter link back to what both depend on.',
    explanation:'Leafy shrubs feed caterpillars, which feed the birds, and some shrubs provide nesting places. Protecting those shrubs supports both links in this simplified habitat.',
    diagram:table('Connections recorded in this habitat',['Living thing','Uses'],[['Caterpillar','Shrub leaves for food'],['Bird','Caterpillars for food; shrubs for nesting']])
  }),
  record(6,29,{
    subject:'maths',type:'number',numericFormat:'integer',unit:'kilometres remaining',alignment:['AC9M4N08'],
    prompt:'A sky map uses 1 centimetre for 4 kilometres. Three route sections measure 3 cm, 5 cm and 2 cm. Your dragon can travel 64 kilometres before resting. After flying all three sections, how many kilometres of that distance are left?',
    answer:24,hint:'Add the three map lengths, convert that total to kilometres, then compare it with the dragon’s available distance.',
    explanation:'The map route is 3 + 5 + 2 = 10 cm. That represents 10 × 4 = 40 km. The remaining distance is 64 − 40 = 24 km.',
    diagram:table('Map key: 1 cm represents 4 km',['Route section','Map length'],[['Grove to ridge','3 cm'],['Ridge to lake','5 cm'],['Lake to home','2 cm']])
  }),
  record(6,30,{
    subject:'world',type:'choice',alignment:['AC9S5U02','AC9S5I05'],
    prompt:'Rangers test equal soil trays on the same slope with equal simulated rain. One tray has plant cover; one is bare. They repeat the test with fresh matching trays. Which conclusion is supported?',
    choices:[
      choice('a','Plant-covered soil lost less material in both of these tests','Yes. Compare the two treatments within each trial.'),
      choice('b','Plant cover prevents every possible landslide','Small tray tests cannot prove what happens on every real mountain.'),
      choice('c','Bare soil lost less material in both tests','Both measurements for bare soil are larger, not smaller.')
    ],answer:'a',hint:'Use both trials and choose a conclusion no broader than the evidence.',
    explanation:'The plant-covered trays lost 8 and 9 grams, compared with 35 and 32 grams from bare soil. The results support less erosion with plant cover in these tests. They do not prove protection against every storm or landslide.',
    diagram:table('Soil washed out of the trays',['Soil surface','Trial 1','Trial 2'],[['Plant cover','8 g','9 g'],['Bare soil','35 g','32 g']])
  })
];

export const CURRICULUM_SOURCES = [
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr4_as_cd_alignment.pdf',
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr4_as_cd_alignment.pdf',
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr5_as_cd_alignment.pdf'
];
