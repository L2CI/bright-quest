// Private, original Dragon Grove learning content. Never serve this module as a static asset.
// Final ACARA v9 alignment verified 2026-10-09; rationale and sources are in the planning document.
export const CONTENT_VERSION = 1;
const mainQuestions = [
  {
    "id": "dragon-l01-maths-v1",
    "level": 1,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M3N03"
    ],
    "prompt": "Your hatchling finds 84 glow crystals, then 27 more. How many crystals does it have altogether?",
    "type": "number",
    "answer": 111,
    "hint": "Add 20 first, then add the remaining 7.",
    "explanation": "84 + 20 = 104. Another 7 makes 111 crystals.",
    "unit": "crystals",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l01-living-v1",
    "level": 1,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S3U01"
    ],
    "prompt": "Beside the nest are a beetle, a stone and a wind-up toy. Which one is a living animal?",
    "type": "choice",
    "choices": [
      {
        "id": "beetle",
        "label": "The beetle: it grows and needs food."
      },
      {
        "id": "stone",
        "label": "The stone: it gets warm in the sun."
      },
      {
        "id": "toy",
        "label": "The toy: it moves when wound up."
      }
    ],
    "answer": "beetle",
    "hint": "Movement or warmth alone does not show that something is alive.",
    "explanation": "The beetle is an animal that grows and needs resources. A toy can move and a stone can warm up without being alive."
  },
  {
    "id": "dragon-l01-world-v1",
    "level": 1,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S3U04"
    ],
    "prompt": "In the story, the dragon warms a frozen pond. Some solid ice becomes liquid water. What is this change called?",
    "type": "choice",
    "choices": [
      {
        "id": "melting",
        "label": "Melting"
      },
      {
        "id": "freezing",
        "label": "Freezing"
      },
      {
        "id": "growing",
        "label": "Growing"
      }
    ],
    "answer": "melting",
    "hint": "Think about what happens to an ice block as it warms.",
    "explanation": "Melting is a change from solid to liquid. The ice gains heat energy and becomes liquid water."
  },
  {
    "id": "dragon-l02-maths-v1",
    "level": 2,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M3N04",
      "AC9M3A03"
    ],
    "prompt": "There are 5 berry baskets. Each holds 8 berries. How many berries are there altogether?",
    "type": "number",
    "answer": 40,
    "hint": "You can count five groups of 8, or eight groups of 5.",
    "explanation": "5 × 8 = 40 berries. Equal groups can be multiplied.",
    "unit": "berries",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l02-living-v1",
    "level": 2,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S3U01"
    ],
    "prompt": "A butterfly's life cycle goes: egg → caterpillar → ? → adult butterfly. Which stage is missing?",
    "type": "choice",
    "choices": [
      {
        "id": "pupa",
        "label": "Pupa, also called a chrysalis"
      },
      {
        "id": "tadpole",
        "label": "Tadpole"
      },
      {
        "id": "seed",
        "label": "Seed"
      }
    ],
    "answer": "pupa",
    "hint": "A butterfly changes from a caterpillar inside a protective stage.",
    "explanation": "The four main stages are egg, caterpillar, pupa and adult butterfly. A tadpole is a young frog, and a seed belongs to a plant life cycle."
  },
  {
    "id": "dragon-l02-world-v1",
    "level": 2,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S3U03"
    ],
    "prompt": "A cool metal spoon is placed in warm water. The spoon warms up. Which way does heat energy move at first?",
    "type": "choice",
    "choices": [
      {
        "id": "water-to-spoon",
        "label": "From the warmer water to the cooler spoon"
      },
      {
        "id": "spoon-to-water",
        "label": "From the cooler spoon to the warmer water"
      },
      {
        "id": "no-transfer",
        "label": "No heat energy moves between them"
      }
    ],
    "answer": "water-to-spoon",
    "hint": "Compare which object starts warmer and which starts cooler.",
    "explanation": "Heat energy transfers from the warmer water to the cooler spoon. This makes the spoon's temperature rise."
  },
  {
    "id": "dragon-l03-maths-v1",
    "level": 3,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M3N04",
      "AC9M3A03"
    ],
    "prompt": "Share 36 fruit pieces equally between 4 young dragons. How many pieces does each dragon receive?",
    "type": "number",
    "answer": 9,
    "hint": "Which number multiplied by 4 gives 36?",
    "explanation": "36 ÷ 4 = 9, because 4 × 9 = 36.",
    "unit": "pieces each",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l03-living-v1",
    "level": 3,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S3U01",
      "AC9S3I02"
    ],
    "prompt": "Two groups of bean seeds have air and the same suitable warmth. One group is kept moist; the other stays completely dry. Which group is more likely to begin growing?",
    "type": "choice",
    "choices": [
      {
        "id": "moist",
        "label": "The moist seeds"
      },
      {
        "id": "dry",
        "label": "The completely dry seeds"
      },
      {
        "id": "neither",
        "label": "Neither, because seeds cannot grow"
      }
    ],
    "answer": "moist",
    "hint": "Think about a resource a seed needs before its first root emerges.",
    "explanation": "Bean seeds need water, oxygen and suitable warmth to germinate. The moist group has water available; the dry group does not."
  },
  {
    "id": "dragon-l03-world-v1",
    "level": 3,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S3U04"
    ],
    "prompt": "Liquid water in a mountain pool becomes solid ice as heat energy is removed. Which description is correct?",
    "type": "choice",
    "choices": [
      {
        "id": "freezing",
        "label": "The water is freezing."
      },
      {
        "id": "melting",
        "label": "The water is melting."
      },
      {
        "id": "still-liquid",
        "label": "The water is still a liquid."
      }
    ],
    "answer": "freezing",
    "hint": "Follow the change from liquid to solid.",
    "explanation": "Freezing changes a liquid into a solid. Removing enough heat energy from liquid water makes ice."
  },
  {
    "id": "dragon-l04-maths-v1",
    "level": 4,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4N03"
    ],
    "prompt": "The flight crystal is three-quarters charged. Complete the equivalent fraction: 3/4 = [ ]/8. What number belongs in the box?",
    "type": "number",
    "answer": 6,
    "hint": "Each quarter contains two eighths.",
    "explanation": "Three quarters is six eighths. Multiplying the numerator and denominator of 3/4 by 2 gives 6/8.",
    "unit": "eighths",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l04-living-v1",
    "level": 4,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S4U01"
    ],
    "prompt": "In this food chain, grass is eaten by a grasshopper, and the grasshopper is eaten by a frog. Which organism is the producer that makes its own food using sunlight?",
    "type": "choice",
    "choices": [
      {
        "id": "grass",
        "label": "Grass"
      },
      {
        "id": "grasshopper",
        "label": "Grasshopper"
      },
      {
        "id": "frog",
        "label": "Frog"
      }
    ],
    "answer": "grass",
    "hint": "Look for the green plant at the start of the food chain.",
    "explanation": "Grass is a producer. The grasshopper and frog are consumers: they obtain food by eating other organisms."
  },
  {
    "id": "dragon-l04-world-v1",
    "level": 4,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4U02"
    ],
    "prompt": "A puddle slowly dries after the rain. No water runs away or soaks into the ground. What happens to the missing liquid water?",
    "type": "choice",
    "choices": [
      {
        "id": "vapour",
        "label": "It evaporates into the air as water vapour."
      },
      {
        "id": "vanishes",
        "label": "It stops existing."
      },
      {
        "id": "stone",
        "label": "It turns into stone."
      }
    ],
    "answer": "vapour",
    "hint": "Water can be present in the air even when you cannot see it.",
    "explanation": "During evaporation, liquid water becomes water vapour, a gas, and enters the air. The water has not stopped existing."
  },
  {
    "id": "dragon-l05-maths-v1",
    "level": 5,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4N06",
      "AC9M4A02"
    ],
    "prompt": "The dragon carries 3 supply packs. Each pack contains 128 crystals. How many crystals does it carry?",
    "type": "number",
    "answer": 384,
    "hint": "Multiply 100, 20 and 8 by 3, then combine the results.",
    "explanation": "3 × 100 = 300, 3 × 20 = 60 and 3 × 8 = 24. Together, 300 + 60 + 24 = 384.",
    "unit": "crystals",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l05-living-v1",
    "level": 5,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S4U01"
    ],
    "prompt": "In the forest, some fungi break down fallen leaves and dead wood. What role are these fungi playing?",
    "type": "choice",
    "choices": [
      {
        "id": "decomposer",
        "label": "Decomposer: breaking down dead material"
      },
      {
        "id": "producer",
        "label": "Producer: making food using sunlight"
      },
      {
        "id": "predator",
        "label": "Predator: catching living animals"
      }
    ],
    "answer": "decomposer",
    "hint": "Focus on what is happening to the dead leaves and wood.",
    "explanation": "These fungi act as decomposers. Breaking down dead material helps return nutrients to the environment."
  },
  {
    "id": "dragon-l05-world-v1",
    "level": 5,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4U03"
    ],
    "prompt": "The same sled gets the same starting push on two level paths. It stops sooner on the rough path. Which explanation best fits?",
    "type": "choice",
    "choices": [
      {
        "id": "more-friction",
        "label": "The rough path produces more friction opposing the sled's motion."
      },
      {
        "id": "no-gravity",
        "label": "Gravity disappears on the rough path."
      },
      {
        "id": "friction-speeds",
        "label": "Friction makes the sled keep speeding up."
      }
    ],
    "answer": "more-friction",
    "hint": "Think about the force between surfaces that rub against each other.",
    "explanation": "Friction opposes the sliding motion. In this comparison, greater friction on the rough path brings the sled to a stop sooner."
  },
  {
    "id": "dragon-l06-maths-v1",
    "level": 6,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4M03"
    ],
    "prompt": "The valley flight begins at 9:35 am and ends at 10:20 am on the same morning. How many minutes does it last?",
    "type": "number",
    "answer": 45,
    "hint": "Count from 9:35 to 10:00, then from 10:00 to 10:20.",
    "explanation": "There are 25 minutes to 10:00 and another 20 minutes to 10:20. The flight lasts 45 minutes.",
    "unit": "minutes",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l06-living-v1",
    "level": 6,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S4U01"
    ],
    "prompt": "In our simple meadow model, caterpillars eat leaves and the birds eat only caterpillars. If caterpillar numbers fall, what is the most direct effect on the birds?",
    "type": "choice",
    "choices": [
      {
        "id": "less-food",
        "label": "There is less food available for the birds."
      },
      {
        "id": "more-food",
        "label": "There is more food available for the birds."
      },
      {
        "id": "make-food",
        "label": "The birds begin making food from sunlight."
      }
    ],
    "answer": "less-food",
    "hint": "Trace the feeding link from caterpillar to bird.",
    "explanation": "In the stated model, caterpillars are the birds' food. Fewer caterpillars means less available food. Real food webs can have more feeding links."
  },
  {
    "id": "dragon-l06-world-v1",
    "level": 6,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4U02"
    ],
    "prompt": "Water vapour in the air cools and forms tiny liquid droplets in a cloud. What process has occurred?",
    "type": "choice",
    "choices": [
      {
        "id": "condensation",
        "label": "Condensation"
      },
      {
        "id": "evaporation",
        "label": "Evaporation"
      },
      {
        "id": "melting",
        "label": "Melting"
      }
    ],
    "answer": "condensation",
    "hint": "Here, water changes from a gas into liquid droplets.",
    "explanation": "Condensation is the change from water vapour into liquid water. Clouds contain tiny droplets and can also contain ice crystals."
  },
  {
    "id": "dragon-l07-maths-v1",
    "level": 7,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4N06",
      "AC9M4N08"
    ],
    "prompt": "You collect 6 packs of 24 crystals, then use 39 crystals to repair a bridge. How many crystals remain?",
    "type": "number",
    "answer": 105,
    "hint": "Find the total in all six packs before subtracting the repair cost.",
    "explanation": "6 × 24 = 144 crystals. Then 144 − 39 = 105 crystals remain.",
    "unit": "crystals",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l07-living-v1",
    "level": 7,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S4U01"
    ],
    "prompt": "The arrows on this food web mean 'is eaten by': grass → grasshopper → frog. A lizard also eats grasshoppers. Which new arrow should you add?",
    "type": "choice",
    "choices": [
      {
        "id": "grasshopper-lizard",
        "label": "Grasshopper → lizard"
      },
      {
        "id": "lizard-grasshopper",
        "label": "Lizard → grasshopper"
      },
      {
        "id": "grass-lizard",
        "label": "Grass → lizard"
      }
    ],
    "answer": "grasshopper-lizard",
    "hint": "Start the arrow at the food and point it towards the animal that eats it.",
    "explanation": "The lizard eats the grasshopper, so the arrow is grasshopper → lizard. It shows the direction of the feeding relationship."
  },
  {
    "id": "dragon-l07-world-v1",
    "level": 7,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4U03"
    ],
    "prompt": "A magnet pulls an iron clip sideways without touching it. When released far from the magnet, the clip falls towards Earth. Which forces explain these two movements?",
    "type": "choice",
    "choices": [
      {
        "id": "magnet-gravity",
        "label": "Magnetic force sideways; gravity downwards"
      },
      {
        "id": "gravity-magnet",
        "label": "Gravity sideways; magnetic force downwards"
      },
      {
        "id": "friction-both",
        "label": "Friction causes both movements"
      }
    ],
    "answer": "magnet-gravity",
    "hint": "Match each movement to the object that is attracting the clip.",
    "explanation": "The magnet attracts the iron clip through magnetic force. Earth attracts the released clip through gravity. Both can act without direct contact."
  },
  {
    "id": "dragon-l08-maths-v1",
    "level": 8,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4N01",
      "AC9M4N03"
    ],
    "prompt": "A flask holds 3/4 of a litre. Write this amount as a decimal number of litres.",
    "type": "number",
    "answer": "0.75",
    "hint": "One quarter is 25 hundredths. How many hundredths are three quarters?",
    "explanation": "3/4 = 75/100 = 0.75. The flask holds 0.75 litres.",
    "unit": "litres",
    "numericFormat": "decimal"
  },
  {
    "id": "dragon-l08-living-v1",
    "level": 8,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S4U01",
      "AC9S4I05"
    ],
    "prompt": "Researchers predict that fungi help break down dead leaves. Which observation would support that prediction?",
    "type": "choice",
    "choices": [
      {
        "id": "breakdown",
        "label": "In otherwise matching conditions, leaves with the fungi break down faster than leaves without them."
      },
      {
        "id": "colour",
        "label": "Some fungi are orange and others are brown."
      },
      {
        "id": "dragon",
        "label": "The dragon prefers the look of the fungi."
      }
    ],
    "answer": "breakdown",
    "hint": "Look for evidence that compares leaf breakdown with and without fungi.",
    "explanation": "The first observation directly compares decomposition while other conditions match. Colour and preference do not test the predicted role."
  },
  {
    "id": "dragon-l08-world-v1",
    "level": 8,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4I02",
      "AC9S4U03"
    ],
    "prompt": "You want to compare how many identical iron clips two magnets can lift. Which plan makes the comparison fairest?",
    "type": "choice",
    "choices": [
      {
        "id": "same-method",
        "label": "Change the magnet, but use the same clips and lifting method each time."
      },
      {
        "id": "change-everything",
        "label": "Change the magnet, clip type and lifting method together."
      },
      {
        "id": "guess",
        "label": "Choose the brightest-coloured magnet without testing it."
      }
    ],
    "answer": "same-method",
    "hint": "Change the thing you are comparing while keeping other relevant conditions the same.",
    "explanation": "Using the same clips and method helps isolate the effect of the magnet. Repeating the test would make the comparison more dependable."
  },
  {
    "id": "dragon-l09-maths-v1",
    "level": 9,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4N06",
      "AC9M4N08"
    ],
    "prompt": "Three supply packs cost $4.50 each. You pay with $20. How much change should you receive? Enter dollars.",
    "type": "number",
    "answer": 6.5,
    "hint": "First find the cost of three packs. Then subtract it from $20.",
    "explanation": "3 × $4.50 = $13.50. Then $20.00 − $13.50 = $6.50 change.",
    "unit": "dollars",
    "numericFormat": "money",
    "answerCents": 650
  },
  {
    "id": "dragon-l09-living-v1",
    "level": 9,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S5U01"
    ],
    "prompt": "An Arctic fox has thick fur that traps a layer of air close to its body. Why does this feature help it in a cold habitat?",
    "type": "choice",
    "choices": [
      {
        "id": "heat-loss",
        "label": "It slows heat loss from the fox's warm body."
      },
      {
        "id": "makes-sunlight",
        "label": "It turns the fox into a producer that makes food from sunlight."
      },
      {
        "id": "stops-needs",
        "label": "It removes the fox's need for food and water."
      }
    ],
    "answer": "heat-loss",
    "hint": "Link the trapped air to keeping the fox's body warm.",
    "explanation": "The fur and trapped air provide insulation, slowing heat loss. This supports survival in cold conditions; the fox still needs food and water."
  },
  {
    "id": "dragon-l09-world-v1",
    "level": 9,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4U04",
      "AC9S4I04"
    ],
    "prompt": "A rain shelter needs a cover that bends and keeps water out. Tests show: Material A bends but lets water through; Material B bends and keeps water out; Material C keeps water out but cannot bend. Which material meets both needs?",
    "type": "choice",
    "choices": [
      {
        "id": "a",
        "label": "Material A"
      },
      {
        "id": "b",
        "label": "Material B"
      },
      {
        "id": "c",
        "label": "Material C"
      }
    ],
    "answer": "b",
    "hint": "Check both requirements for each material, not just one.",
    "explanation": "Material B is both flexible and waterproof in these tests. A fails the water test; C fails the bending requirement."
  },
  {
    "id": "dragon-l10-maths-v1",
    "level": 10,
    "subject": "maths",
    "slot": "maths",
    "variant": 1,
    "alignment": [
      "AC9M4N06",
      "AC9M4N08"
    ],
    "prompt": "For the final journey, you have 4 crates containing 36 crystals each, plus 18 loose crystals. Share all the crystals equally between 6 beacons. How many crystals go to each beacon?",
    "type": "number",
    "answer": 27,
    "hint": "Multiply to count the crated crystals, add the loose ones, then divide between six beacons.",
    "explanation": "4 × 36 = 144. Add 18 to get 162. Then 162 ÷ 6 = 27 crystals for each beacon.",
    "unit": "crystals per beacon",
    "numericFormat": "integer"
  },
  {
    "id": "dragon-l10-living-v1",
    "level": 10,
    "subject": "living",
    "slot": "living",
    "variant": 1,
    "alignment": [
      "AC9S5U01"
    ],
    "prompt": "A desert lizard can move between a hot rock in sunlight and a cooler shaded crevice. At midday its body is becoming too hot. Which behaviour would help it cool?",
    "type": "choice",
    "choices": [
      {
        "id": "shade",
        "label": "Move into the cooler shaded crevice."
      },
      {
        "id": "hot-rock",
        "label": "Stay on the hottest part of the sunlit rock."
      },
      {
        "id": "grow-fur",
        "label": "Choose to grow a thick fur coat immediately."
      }
    ],
    "answer": "shade",
    "hint": "Use the temperature information to choose a cooler place.",
    "explanation": "Moving to the cooler shade can help the lizard reduce heat gain and cool. Behaviour can help an animal survive; real animals do not instantly choose new body features."
  },
  {
    "id": "dragon-l10-world-v1",
    "level": 10,
    "subject": "world",
    "slot": "world",
    "variant": 1,
    "alignment": [
      "AC9S4I04",
      "AC9S4I05",
      "AC9S4U03"
    ],
    "prompt": "Using the same ball, ramp and release point, you test two paths three times. On A the ball rolls 150, 152 and 148 cm. On B it rolls 81, 80 and 79 cm. Which conclusion is supported by these results?",
    "type": "choice",
    "choices": [
      {
        "id": "tested-farther",
        "label": "In these tests, the ball rolled farther on A every time."
      },
      {
        "id": "all-balls",
        "label": "Every ball in the world will always roll exactly 150 cm on A."
      },
      {
        "id": "b-farther",
        "label": "In these tests, the ball rolled farther on B every time."
      }
    ],
    "answer": "tested-farther",
    "hint": "Compare the measurements and choose a claim limited to what was tested.",
    "explanation": "Every distance measured on A exceeds every distance measured on B. The results support a conclusion about these tests; they do not prove what every possible ball would do."
  }
];

// Each variant replaces the same subject slot. Its wording and answer travel together.
const variants = [];
function numberVariant(level, variant, prompt, answer, hint, explanation) {
  const base = mainQuestions.find(q => q.level === level && q.subject === 'maths');
  variants.push({...base, id: base.id.replace('-v1', `-v${variant}`), variant, prompt, answer, hint, explanation,
    ...(base.numericFormat === 'money' ? {answerCents: Math.round(Number(answer) * 100)} : {})});
}
function choiceVariant(level, subject, variant, prompt, options, answer, hint, explanation, diagram) {
  const base = mainQuestions.find(q => q.level === level && q.subject === subject);
  variants.push({...base, id: base.id.replace('-v1', `-v${variant}`), variant, prompt,
    choices: options.map(([id, label]) => ({id, label})), answer, hint, explanation, ...(diagram ? {diagram} : {})});
}

numberVariant(1, 2, 'Your hatchling has 76 crystals and finds 38 more. How many crystals does it have altogether?', 114, 'Add 30 first, then add 8.', '76 + 30 = 106; 106 + 8 = 114 crystals.');
numberVariant(1, 3, 'Your hatchling gathers 68 crystals beside the stream and 57 near its nest. How many altogether?', 125, 'Add 50 first, then the remaining 7.', '68 + 50 = 118; 118 + 7 = 125 crystals.');
numberVariant(2, 2, 'Seven baskets hold 5 berries each. How many berries are there altogether?', 35, 'Count seven groups of 5.', '7 × 5 = 35 berries.');
numberVariant(2, 3, 'Nine baskets hold 4 berries each. How many berries are there altogether?', 36, 'Count nine groups of 4, or four groups of 9.', '9 × 4 = 36 berries.');
numberVariant(3, 2, 'Share 45 fruit pieces equally among 5 dragons. How many pieces does each receive?', 9, 'Which number multiplied by 5 gives 45?', '45 ÷ 5 = 9 pieces for each dragon.');
numberVariant(3, 3, 'Share 48 fruit pieces equally among 4 dragons. How many pieces does each receive?', 12, 'Share 40 first, then share the remaining 8.', '40 ÷ 4 = 10 and 8 ÷ 4 = 2. Each dragon receives 12 pieces.');
numberVariant(4, 2, 'Complete the equivalent fraction: 2/3 = [ ]/6. Enter the missing numerator.', 4, 'Each third contains two sixths.', '2/3 = 4/6. Multiply both the numerator and denominator by 2.');
numberVariant(4, 3, 'Complete the equivalent fraction: 2/5 = [ ]/10. Enter the missing numerator.', 4, 'Each fifth contains two tenths.', '2/5 = 4/10. Multiply both the numerator and denominator by 2.');
numberVariant(5, 2, 'Four supply packs each hold 116 crystals. How many crystals are there altogether?', 464, 'Multiply 100, 10 and 6 by 4, then combine.', '4 × 100 + 4 × 10 + 4 × 6 = 400 + 40 + 24 = 464 crystals.');
numberVariant(5, 3, 'Four supply packs each hold 124 crystals. How many crystals are there altogether?', 496, 'Multiply 100, 20 and 4 by 4, then combine.', '4 × 100 + 4 × 20 + 4 × 4 = 400 + 80 + 16 = 496 crystals.');
numberVariant(6, 2, 'A flight starts at 11:45 am and ends at 12:20 pm on the same day. How many minutes does it last?', 35, 'Count to noon first, then count the remaining minutes.', '15 minutes to noon plus 20 more minutes makes 35 minutes.');
numberVariant(6, 3, 'A flight starts at 2:48 pm and ends at 3:30 pm on the same day. How many minutes does it last?', 42, 'Count to 3:00 pm first, then to 3:30 pm.', '12 minutes to 3:00 plus 30 minutes makes 42 minutes.');
numberVariant(7, 2, 'You collect 5 packs of 28 crystals and spend 47 repairing a bridge. How many remain?', 93, 'Find the crystals in all five packs, then subtract the cost.', '5 × 28 = 140; 140 − 47 = 93 crystals remain.');
numberVariant(7, 3, 'You collect 7 packs of 18 crystals and spend 46 repairing a bridge. How many remain?', 80, 'Multiply first to find the total, then subtract.', '7 × 18 = 126; 126 − 46 = 80 crystals remain.');
numberVariant(8, 2, 'A flask holds 1/4 of a litre. Write this amount as a decimal number of litres.', '0.25', 'One quarter is 25 hundredths.', '1/4 = 25/100 = 0.25 litres.');
numberVariant(8, 3, 'A flask holds 1/2 of a litre. Write this amount as a decimal number of litres.', '0.5', 'One half equals five tenths.', '1/2 = 5/10 = 0.5 litres. The decimal 0.50 represents the same amount.');
numberVariant(9, 2, 'Four supply packs cost $3.25 each. You pay $20. How much change should you receive? Enter dollars.', 7, 'Find the cost of four packs, then subtract from $20.', '4 × $3.25 = $13.00; $20.00 − $13.00 = $7.00.');
numberVariant(9, 3, 'Five supply packs cost $2.75 each. You pay $20. How much change should you receive? Enter dollars.', 6.25, 'Find the cost of five packs, then subtract from $20.', '5 × $2.75 = $13.75; $20.00 − $13.75 = $6.25.');
numberVariant(10, 2, 'Five crates hold 28 crystals each, plus 20 loose crystals. Share them all equally among 8 beacons. How many crystals go to each beacon?', 20, 'Count the crated crystals, add the loose ones, then divide.', '5 × 28 = 140; 140 + 20 = 160; 160 ÷ 8 = 20 crystals per beacon.');
numberVariant(10, 3, 'Six crates hold 24 crystals each, plus 24 loose crystals. Share them all equally among 7 beacons. How many crystals go to each beacon?', 24, 'Multiply, add the loose crystals, then divide between seven beacons.', '6 × 24 = 144; 144 + 24 = 168; 168 ÷ 7 = 24 crystals per beacon.');

choiceVariant(1, 'living', 2, 'Which is a living plant?', [['fern','A fern that grows new fronds'],['statue','A stone statue'],['plastic','A plastic flower']], 'fern', 'Think about which one grows new parts as a living plant.', 'The fern is a living plant. A stone statue and plastic flower are non-living objects.');
choiceVariant(1, 'living', 3, 'Which observation best shows that the bean seedling is a living thing?', [['growth','It takes up water and grows new leaves.'],['green','It is the same colour as a green toy.'],['wind','It moves when wind blows on it.']], 'growth', 'A colour or movement caused by wind is not enough by itself.', 'Taking up water and growing new leaves are evidence of life. Non-living things can also be green or move in the wind.');
choiceVariant(2, 'living', 2, 'Frog eggs hatch into which young stage?', [['tadpole','Tadpoles'],['caterpillar','Caterpillars'],['seed','Seeds']], 'tadpole', 'Think of the young stage of a frog that lives in water.', 'A tadpole is a young stage in a frog life cycle. A caterpillar is an insect larva, and a seed belongs to a plant.');
choiceVariant(2, 'living', 3, 'A frog life cycle goes: egg → tadpole → young frog → adult frog. Which stage comes immediately after the tadpole?', [['young-frog','Young frog'],['egg','Egg'],['adult','Adult butterfly']], 'young-frog', 'Follow the sequence one step after tadpole.', 'A tadpole develops into a young frog, before becoming an adult frog. Different animals have different life cycles.');
choiceVariant(3, 'living', 2, 'Bean seeds have moisture and air. Which temperature condition is most suitable for them to start growing?', [['warmth','Suitable warmth'],['frozen','Freezing solid'],['extreme','Extremely high heat']], 'warmth', 'Seeds need suitable conditions, rather than extremes.', 'Bean seeds need water, oxygen and a suitable temperature to germinate. Freezing or extremely high heat is unsuitable in this comparison.');
choiceVariant(3, 'living', 3, 'Two matching groups of bean seeds have air and suitable warmth. One receives water and one stays dry. What is this comparison investigating?', [['water','Whether water affects germination'],['light','Whether different colours of light affect germination'],['size','Whether different seed sizes affect germination']], 'water', 'Identify the one condition that is changed.', 'Water availability is changed. Matching the other conditions helps investigate its effect on germination.');
choiceVariant(4, 'living', 2, 'Pondweed is eaten by a snail, which is eaten by a duck. Which is the producer that makes food using sunlight?', [['pondweed','Pondweed'],['snail','Snail'],['duck','Duck']], 'pondweed', 'Look for the plant.', 'Pondweed is the producer. The snail and duck obtain food by eating other organisms.');
choiceVariant(4, 'living', 3, 'In this model, a caterpillar eats a cabbage plant and a bird eats the caterpillar. Which organism makes its own food using sunlight?', [['plant','The cabbage plant'],['caterpillar','The caterpillar'],['bird','The bird']], 'plant', 'Which organism is a green plant?', 'The cabbage plant is a producer. The caterpillar and bird are consumers.');
choiceVariant(5, 'living', 2, 'Some bacteria break down dead material in soil. What role are they playing?', [['decomposer','Decomposers'],['producer','Producers making food from sunlight'],['rock','Rock-makers']], 'decomposer', 'Focus on breaking down dead material.', 'These bacteria act as decomposers, helping return nutrients to the environment.');
choiceVariant(5, 'living', 3, 'A fungus obtains resources by breaking down a fallen dead branch. Which description fits its role?', [['decomposer','It is acting as a decomposer.'],['sunlight','It is a producer making food from sunlight.'],['living-prey','It is catching a living bird.']], 'decomposer', 'Think about whether the material being broken down is living or dead.', 'This fungus acts as a decomposer because it breaks down dead wood. The description does not say it uses sunlight or catches a living animal.');
choiceVariant(6, 'living', 2, 'In a simple pond model, snails eat pondweed and ducks eat only snails. If there are fewer snails, what happens to the ducks\' available food?', [['less','There is less available food.'],['more','There is more available food.'],['none-needed','The ducks no longer need food.']], 'less', 'Follow the stated food link from snail to duck.', 'In this model, fewer snails means less food available for the ducks.');
choiceVariant(6, 'living', 3, 'In a simple model, rabbits eat only grass. After a long dry period there is much less grass. What is the most direct effect on the rabbits?', [['less-food','They have less food available.'],['more-food','They have more food available.'],['producer','They become producers using sunlight.']], 'less-food', 'Use the food source stated in the model.', 'Less grass means less food for rabbits that depend on it. They remain consumers.');
choiceVariant(7, 'living', 2, 'Arrows mean “is eaten by”. A bird eats a caterpillar. Which arrow shows that relationship?', [['prey-bird','Caterpillar → bird'],['bird-prey','Bird → caterpillar'],['bird-sun','Bird → sun']], 'prey-bird', 'Point from the food to the animal that eats it.', 'Caterpillar → bird means the caterpillar is eaten by the bird.');
choiceVariant(7, 'living', 3, 'Arrows mean “is eaten by”. The web has leaf → caterpillar → bird. A spider also eats caterpillars. Which arrow adds that information?', [['prey-spider','Caterpillar → spider'],['spider-prey','Spider → caterpillar'],['bird-spider','Bird → spider']], 'prey-spider', 'Start at the caterpillar and point towards its new consumer.', 'The new feeding relationship is caterpillar → spider. The prompt does not say that the spider eats the bird.');
choiceVariant(8, 'living', 2, 'A claim says decomposers help fallen leaves break down. Which is useful evidence about that claim?', [['matching','Matching leaf samples break down faster when decomposers are present.'],['names','The leaves have different names.'],['preference','A dragon prefers green leaves.']], 'matching', 'Choose a comparison that measures leaf breakdown.', 'Comparing breakdown with and without decomposers tests the claimed role. Names and preferences do not.');
choiceVariant(8, 'living', 3, 'A scientist predicts that a fungus helps dead wood break down. Which comparison tests that prediction most directly?', [['matching-wood','Matching wood samples in the same conditions, with the fungus added to only one group'],['different-everything','Different wood types in different conditions, with different fungi'],['colour-only','Comparing only the colours of the fungi']], 'matching-wood', 'Change the presence of the fungus while keeping other relevant conditions the same.', 'The matching samples help isolate the fungus\' effect on wood breakdown. Changing many conditions makes the cause less clear.');
choiceVariant(9, 'living', 2, 'A duck\'s webbed feet have a broad surface that pushes against water. How can this feature help the duck?', [['swimming','It helps the duck move through water.'],['sunlight','It lets the duck make food from sunlight.'],['breathing','It removes the duck\'s need to breathe.']], 'swimming', 'Connect pushing against water with movement.', 'The webbed surface helps the duck push against water as it swims. The duck still needs food and oxygen.');
choiceVariant(9, 'living', 3, 'A desert plant has a waxy outer covering that slows water loss. Why is this feature useful in a dry habitat?', [['retain','It helps the plant retain water.'],['no-water','It means the plant never needs water.'],['animal','It changes the plant into an animal.']], 'retain', 'Connect the stated effect of the covering with scarce water.', 'Slowing water loss helps the plant retain water. It reduces water loss; it does not remove the need for water.');
choiceVariant(10, 'living', 2, 'A lizard basks on a gently warmed rock when its body is cool, then enters cooler shade when its body is too hot. Which explanation fits both behaviours?', [['temperature','It moves between places to help manage its body temperature.'],['food','It is making food from sunlight like a plant.'],['instant-fur','It is choosing to grow and lose a fur coat instantly.']], 'temperature', 'Compare what the lizard needs when too cool and when too hot.', 'The lizard can gain heat in a warmer place and reduce heat gain or cool in a cooler place. Its behaviour helps it manage body temperature.');
choiceVariant(10, 'living', 3, 'A desert mammal stays in a cooler burrow during the hot day and searches for food in the cooler night. Which explanation connects both behaviours to survival?', [['heat-and-food','It reduces exposure to daytime heat while still finding food.'],['never-food','It no longer needs food or water.'],['instant-change','It instantly chooses a new species each night.']], 'heat-and-food', 'Consider both the temperature and the need to find food.', 'Sheltering during the hot period can reduce heat exposure. Feeding during a cooler period still allows the animal to obtain food.');

choiceVariant(1, 'world', 2, 'A solid ice block becomes liquid water as it warms. What is this change called?', [['melting','Melting'],['freezing','Freezing'],['magnetism','Magnetism']], 'melting', 'Follow the change from solid to liquid.', 'Gaining enough heat energy makes ice melt into liquid water.');
choiceVariant(1, 'world', 3, 'A piece of solid butter warms and becomes liquid. Which change has happened?', [['melting','Melting'],['freezing','Freezing'],['germination','Germination']], 'melting', 'The material changes from a solid into a liquid.', 'This change is melting. Germination is a living seed beginning to grow.');
choiceVariant(2, 'world', 2, 'A warm stone touches a cooler stone. Which way does heat energy transfer at first?', [['warm-cool','From the warmer stone to the cooler stone'],['cool-warm','From the cooler stone to the warmer stone'],['neither','Neither stone transfers heat energy']], 'warm-cool', 'Compare their starting temperatures.', 'Heat energy transfers from the warmer object to the cooler one.');
choiceVariant(2, 'world', 3, 'A cool metal cup holds warmer water. The cup becomes warmer. Where did this added heat energy come from?', [['water','The warmer water'],['cold','The cup creating cold'],['nowhere','Nowhere; heat energy did not move']], 'water', 'Look for the warmer object touching the cup.', 'The warmer water transfers heat energy to the cooler cup, raising its temperature.');
choiceVariant(3, 'world', 2, 'A tray of liquid water becomes solid ice in a freezer. Which change is happening?', [['freezing','Freezing'],['melting','Melting'],['growing','Growing']], 'freezing', 'Follow the change from liquid to solid.', 'Removing enough heat energy from liquid water causes it to freeze into ice.');
choiceVariant(3, 'world', 3, 'To change melted liquid butter back into a solid, what should happen to its heat energy?', [['remove','Enough heat energy should be removed by cooling.'],['add','More heat energy should be added.'],['none','Temperature and heat transfer can have no effect.']], 'remove', 'Think about what cooling does to a melted material.', 'Cooling removes heat energy. With sufficient cooling, the melted butter becomes solid again.');
choiceVariant(4, 'world', 2, 'A wet towel dries on a line. Its water enters the air mainly through which process?', [['evaporation','Evaporation'],['freezing','Freezing'],['cloth','Changing into cloth']], 'evaporation', 'Water can enter the air as water vapour.', 'Liquid water evaporates into water vapour, a gas. It has not changed into the towel\'s material.');
choiceVariant(4, 'world', 3, 'Liquid water from a lake enters the air as water vapour. Which process is this?', [['evaporation','Evaporation'],['condensation','Condensation'],['freezing','Freezing']], 'evaporation', 'The change goes from liquid water to a gas.', 'Evaporation changes liquid water into water vapour. Condensation goes the other way.');
choiceVariant(5, 'world', 2, 'Identical sliding blocks begin with the same speed on level paths. The block on coarse sandpaper stops sooner. Which explanation fits?', [['friction','Greater friction opposes its motion.'],['gravity','Gravity has disappeared.'],['weightless','Sandpaper makes it weightless.']], 'friction', 'Think about the contact between the block and its surface.', 'Greater friction on the rough surface opposes the sliding motion and slows the block sooner.');
choiceVariant(5, 'world', 3, 'A moving toy car slows when its wheels rub against a rough mat. Which force is directly involved in opposing the motion at the surfaces?', [['friction','Friction'],['magnetic','Magnetic force from an absent magnet'],['none','No force can affect its motion']], 'friction', 'The clue is that surfaces rub against each other.', 'Friction between contacting surfaces can oppose motion and slow the car.');
choiceVariant(6, 'world', 2, 'Water vapour from the air cools and forms liquid drops on the outside of a cold glass. What is this process?', [['condensation','Condensation'],['evaporation','Evaporation'],['melting','Melting']], 'condensation', 'The water changes from a gas into a liquid.', 'Condensation forms liquid droplets from cooled water vapour. The prompt identifies the surrounding air as the source.');
choiceVariant(6, 'world', 3, 'At dawn, water vapour in the air cools into tiny liquid drops on a leaf. Which process forms these drops?', [['condensation','Condensation'],['freezing','Freezing'],['evaporation','Evaporation']], 'condensation', 'Follow the change from water vapour to liquid drops.', 'The droplets form by condensation. Freezing would produce solid ice, while evaporation changes liquid into gas.');
choiceVariant(7, 'world', 2, 'A magnet attracts an iron nail. An apple released from a branch falls towards Earth. Which forces explain these actions, in that order?', [['magnet-gravity','Magnetic force, then gravity'],['gravity-magnet','Gravity, then magnetic force'],['friction-friction','Friction, then friction']], 'magnet-gravity', 'Match each action with the object doing the attracting.', 'The magnet attracts iron through magnetic force; Earth attracts the falling apple through gravity.');
choiceVariant(7, 'world', 3, 'An iron clip moves towards a nearby magnet without contact. Separately, a dropped stone falls towards Earth. Which statement explains both?', [['two-forces','Magnetic force attracts the clip; gravity attracts the stone.'],['all-magnetic','Both move because all objects are magnetic.'],['contact-only','Both require a hand to keep touching them.']], 'two-forces', 'Two different objects are attracting things in these examples.', 'Magnetic and gravitational forces can act without direct contact. Not all materials are attracted to magnets.');
choiceVariant(8, 'world', 2, 'You want to compare how far a ball rolls on two surfaces. Which plan makes the comparison fairest?', [['same-setup','Use the same ball, ramp and release point; change only the surface.'],['many-changes','Change the ball, ramp height and surface together.'],['colour','Choose a result based on surface colour without testing.']], 'same-setup', 'Keep other relevant conditions the same while comparing surfaces.', 'The matching setup helps isolate the surface\'s effect. Several changed conditions would make the cause unclear.');
choiceVariant(8, 'world', 3, 'You compare how much water two fabrics absorb. Which plan makes the comparison fairest?', [['matching','Use equal-sized fabric samples and the same amount of water and test time.'],['different','Use different-sized samples, different water amounts and different times.'],['guess','Choose whichever fabric has the nicest pattern.']], 'matching', 'Compare the fabric while keeping sample size and test conditions the same.', 'Matching size, water and time makes differences in the fabric a more useful explanation for the results.');
choiceVariant(9, 'world', 2, 'A viewing window must be transparent and rigid. A is transparent and flexible. B is opaque and rigid. C is transparent and rigid. Which meets both needs?', [['a','Material A'],['b','Material B'],['c','Material C']], 'c', 'Check both properties for each material.', 'Only C is both transparent and rigid in the stated tests.');
choiceVariant(9, 'world', 3, 'A warm-cup handle should be rigid and transfer heat slowly. A is rigid but transfers heat quickly; B is flexible and transfers heat slowly; C is rigid and transfers heat slowly. Which meets both needs?', [['a','Material A'],['b','Material B'],['c','Material C']], 'c', 'A material must meet both requirements, not only one.', 'C meets both stated requirements. A transfers heat quickly, and B is not rigid.');
choiceVariant(10, 'world', 2, 'The same ball, ramp and release point are used. On path C the ball rolls 92, 90 and 91 cm. On D it rolls 55, 58 and 56 cm. Which conclusion is supported?', [['tested','The ball rolled farther on C in each of these tests.'],['universal','Every ball will always roll exactly 92 cm on C.'],['reverse','The ball rolled farther on D in every test.']], 'tested', 'Compare all the numbers and limit the claim to what was tested.', 'Each C result is greater than each D result. The tests do not establish an exact distance for every possible ball.');
choiceVariant(10, 'world', 3, 'Matching blocks receive the same starting push on two level surfaces. On E they slide 61, 60 and 62 cm; on F they slide 104, 101 and 103 cm. Which claim does the evidence support?', [['tested','The blocks slid farther on F in these tests.'],['universal','Every object will always slide exactly 104 cm on F.'],['reverse','The blocks slid farther on E in these tests.']], 'tested', 'Check which set contains the longer measured distances.', 'All F distances exceed the E distances. This supports a conclusion about these tests without claiming every object will behave identically.');

// Paired observations make the final living-things question a reasoning task.
Object.assign(mainQuestions.find(q => q.id === 'dragon-l10-living-v1'), {
  prompt: 'A desert lizard basks when the morning air is cool, then moves into a cooler crevice when the midday ground is hot. Which explanation connects both behaviours?',
  choices: [{id:'temperature',label:'It seeks warmth when cool and avoids overheating when hot.'},{id:'sunlight-food',label:'It makes food from sunlight, just like a green plant.'},{id:'instant-traits',label:'It chooses a new body covering instantly whenever the weather changes.'}],
  answer: 'temperature', hint: 'Consider what the lizard needs at each of the two temperatures.',
  explanation: 'Moving between warmer and cooler places helps the lizard manage its body temperature. Behaviour can support survival; real animals cannot instantly choose new body structures.'
});

const diagrams = {
  'dragon-l02-living-v1': {type:'sequence',title:'Butterfly life cycle',items:[{id:'egg',label:'Egg',asset:'egg'},{id:'caterpillar',label:'Caterpillar',asset:'caterpillar'},{id:'missing',label:'Missing stage'},{id:'butterfly',label:'Adult butterfly',asset:'butterfly'}]},
  'dragon-l04-living-v1': {type:'foodChain',title:'Arrows mean “is eaten by”',items:[{id:'grass',label:'Grass',asset:'grass'},{id:'grasshopper',label:'Grasshopper',asset:'grasshopper'},{id:'frog',label:'Frog',asset:'frog'}]},
  'dragon-l04-living-v2': {type:'foodChain',title:'Arrows mean “is eaten by”',items:[{id:'pondweed',label:'Pondweed',asset:'leaf'},{id:'snail',label:'Snail',asset:'snail'},{id:'duck',label:'Duck',asset:'bird'}]},
  'dragon-l04-living-v3': {type:'foodChain',title:'Arrows mean “is eaten by”',items:[{id:'plant',label:'Cabbage plant',asset:'leaf'},{id:'caterpillar',label:'Caterpillar',asset:'caterpillar'},{id:'bird',label:'Bird',asset:'bird'}]},
  'dragon-l07-living-v1': {type:'foodChain',title:'Existing chain: “is eaten by”',items:[{id:'grass',label:'Grass',asset:'grass'},{id:'grasshopper',label:'Grasshopper',asset:'grasshopper'},{id:'frog',label:'Frog',asset:'frog'}]},
  'dragon-l07-living-v3': {type:'foodChain',title:'Existing chain: “is eaten by”',items:[{id:'leaf',label:'Leaf',asset:'leaf'},{id:'caterpillar',label:'Caterpillar',asset:'caterpillar'},{id:'bird',label:'Bird',asset:'bird'}]},
  'dragon-l09-world-v1': {type:'table',title:'Material test results',columns:['Material','Bends','Keeps water out'],rows:[['A','Yes','No'],['B','Yes','Yes'],['C','No','Yes']]},
  'dragon-l09-world-v2': {type:'table',title:'Material test results',columns:['Material','Transparent','Rigid'],rows:[['A','Yes','No'],['B','No','Yes'],['C','Yes','Yes']]},
  'dragon-l09-world-v3': {type:'table',title:'Material test results',columns:['Material','Rigid','Transfers heat'],rows:[['A','Yes','Quickly'],['B','No','Slowly'],['C','Yes','Slowly']]},
  'dragon-l10-world-v1': {type:'table',title:'Distance travelled in centimetres',columns:['Path','Trial 1','Trial 2','Trial 3'],rows:[['A','150','152','148'],['B','81','80','79']]},
  'dragon-l10-world-v2': {type:'table',title:'Distance travelled in centimetres',columns:['Path','Trial 1','Trial 2','Trial 3'],rows:[['C','92','90','91'],['D','55','58','56']]},
  'dragon-l10-world-v3': {type:'table',title:'Distance travelled in centimetres',columns:['Surface','Trial 1','Trial 2','Trial 3'],rows:[['E','61','60','62'],['F','104','101','103']]},
  'dragon-l10-living-v1': {type:'comparison',title:'Two observations',items:[{id:'morning',label:'Cool morning: lizard basks on a warmer rock',asset:'lizard'},{id:'midday',label:'Hot midday: lizard moves into a cooler crevice',asset:'lizard'}]},
  'dragon-l10-living-v2': {type:'comparison',title:'Two observations',items:[{id:'cool',label:'Body cool: lizard basks on a warmer rock',asset:'lizard'},{id:'hot',label:'Body hot: lizard enters cooler shade',asset:'lizard'}]},
  'dragon-l10-living-v3': {type:'comparison',title:'Two observations',items:[{id:'day',label:'Hot day: animal stays in a cooler burrow'},{id:'night',label:'Cooler night: animal searches for food'}]}
};

const levelTitles = ['Hatchling','Curious youngling','First wings','First flight','Growing guardian','Valley explorer','High-wing dragon','Forest guardian','Mountain sovereign','Great dragon'];
export const LEVELS = levelTitles.map((title, i) => ({level:i + 1,title,questionCount:3,
  learningBand:i < 3 ? 'Later Year 3 foundations' : i < 8 ? 'Year 4 practice' : 'Year 4 reasoning with a supported Year 5 science introduction'}));

export const QUESTIONS = [...mainQuestions, ...variants].map(q => {
  const question = {...q, ...(diagrams[q.id] ? {diagram:diagrams[q.id]} : {})};
  if (question.level === 4 && question.subject === 'maths') question.unit = 'missing numerator';
  // Position is not a clue: vary authoring order before any per-session shuffle.
  if (question.choices) {
    const offset = (question.level + question.variant) % question.choices.length;
    question.choices = [...question.choices.slice(offset), ...question.choices.slice(0, offset)];
  }
  return question;
}).sort((a, b) => a.level - b.level || ['maths','living','world'].indexOf(a.subject) - ['maths','living','world'].indexOf(b.subject) || a.variant - b.variant);

export const CURRICULUM_SOURCES = [
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr3_as_cd_alignment.pdf',
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/mathematics/curriculum/ac9_maths_yr4_as_cd_alignment.pdf',
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr3_as_cd_alignment.pdf',
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr4_as_cd_alignment.pdf',
  'https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr5_as_cd_alignment.pdf'
];
