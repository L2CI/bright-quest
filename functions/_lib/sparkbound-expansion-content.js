// Server-only answer-bearing content. Do not import from a learner entry point.
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
const choices = (labels) => labels.map((label, i) => ({ id: String.fromCharCode(97 + i), label }));
const observation = (description) => ({ kind: "observation", description });
const numeric = (title, prompt, answer, clue, explanation, evidence) => ({
  type: "numeric", title, prompt, answer, choices: [], evidence,
  hints: [clue, `${explanation} Enter ${answer}.`], explanation
});
const order = (title, prompt, labels, answer, clue, explanation, evidence) => ({
  type: "order", title, prompt, choices: choices(labels), answer, evidence,
  hints: [clue, `${explanation} Tap: ${answer.map((id) => labels[id.charCodeAt(0) - 97]).join(", ")}.`], explanation
});
const mcq = (title, prompt, labels, answer, clue, explanation, description) => ({
  type: "mcq", title, prompt, choices: choices(labels), answer, evidence: observation(description),
  hints: [clue, `${explanation} Choose ${labels[answer.charCodeAt(0) - 97]}.`], explanation
});
const task = (id, slot, skill, outcome, variants) => ({ id: `expansion-${id}`, slot, skill, outcome, variants });

const tasks = [
  task("supply-groups", 0, "equal-groups", "The workshop supply count is recorded.", [
    numeric("Count the markers", "The workshop has 6 boxes with 4 markers in each box. How many markers are there altogether?", 24,
      "Add six equal groups of four, or multiply 6 by 4.", "6 x 4 = 24 markers.", observation("There are 6 boxes. Every box contains 4 markers.")),
    numeric("Count the labels", "There are 7 sheets with 5 labels on each sheet for the storage shelves. How many labels are there altogether?", 35,
      "Count in fives seven times to find the total.", "7 x 5 = 35 labels.", observation("There are 7 full sheets, each with 5 labels."))
  ]),
  task("tray-sharing", 0, "equal-sharing", "Each workshop tray receives an equal share.", [
    numeric("Share the tiles", "Share 32 coloured tiles equally between 4 trays. How many tiles belong in each tray?", 8,
      "Which number multiplied by four makes thirty-two?", "32 / 4 = 8 tiles in each tray.", observation("All 32 tiles are shared. Each of the 4 trays gets the same number.")),
    numeric("Share the stickers", "Share 45 stickers equally between 5 folders. How many stickers belong in each folder?", 9,
      "Find the number of fives needed to make forty-five.", "45 / 5 = 9 stickers in each folder.", observation("There are 45 stickers and 5 folders. No stickers are left over."))
  ]),
  task("pack-count", 0, "division-grouping", "The correct number of supply packs is prepared.", [
    numeric("Pack the pencils", "There are 40 pencils. Each pack must contain 8 pencils. How many full packs can the workshop make?", 5,
      "Count how many groups of eight fit into forty.", "40 / 8 = 5 full packs.", observation("Use all 40 pencils, with exactly 8 pencils in each pack.")),
    numeric("Pack the badges", "There are 36 badges. Each envelope must contain 4 badges. How many full envelopes can be filled?", 9,
      "Count in fours until you reach thirty-six.", "36 / 4 = 9 full envelopes.", observation("Use all 36 badges, with exactly 4 badges in each envelope."))
  ]),
  task("missing-group", 0, "missing-factor", "The shelf plan now has equal rows.", [
    numeric("Plan the rows", "A display has 3 equal rows of cards and 21 cards altogether. How many cards are in each row?", 7,
      "Three equal groups must add up to twenty-one.", "3 x 7 = 21, so each row has 7 cards.", observation("Every row has the same number of cards. There are 3 rows and 21 cards.")),
    numeric("Plan the hooks", "A board has 8 equal rows of hooks and 48 hooks altogether. How many hooks are in each row?", 6,
      "Eight times the missing number must equal forty-eight.", "8 x 6 = 48, so each row has 6 hooks.", observation("Every row has the same number of hooks. There are 8 rows and 48 hooks."))
  ]),
  task("digit-value", 1, "place-value", "The value of the code digit is checked.", [
    numeric("Read the hundreds", "A storage code is 642. What value does the digit 6 have in this code? Enter a number.", 600,
      "The first digit of a three-digit number counts hundreds.", "The 6 is in the hundreds place: 6 hundreds = 600.", observation("The storage code is 642. Read the places as hundreds, tens, ones.")),
    numeric("Read the tens", "A storage code is 583. What value does the digit 8 have in this code? Enter a number.", 80,
      "The middle digit of a three-digit number counts tens.", "The 8 is in the tens place: 8 tens = 80.", observation("The storage code is 583. Read the places as hundreds, tens, ones."))
  ]),
  task("build-number", 1, "number-composition", "The three-digit shelf number is assembled.", [
    numeric("Build the shelf code", "A shelf code has 4 hundreds, 0 tens and 7 ones. What is the three-digit code?", 407,
      "Keep a zero in the tens place so the seven stays in the ones place.", "400 + 0 + 7 = 407.", observation("Hundreds: 4. Tens: 0. Ones: 7.")),
    numeric("Build the drawer code", "A drawer code has 9 hundreds, 3 tens and 0 ones. What is the three-digit code?", 930,
      "Combine nine hundred and thirty, keeping zero in the ones place.", "900 + 30 + 0 = 930.", observation("Hundreds: 9. Tens: 3. Ones: 0."))
  ]),
  task("fraction-share", 1, "unit-fractions", "An equal fraction of the supplies is set aside.", [
    numeric("Set aside a quarter", "The workshop has 28 tiles. One quarter of them are blue. How many tiles are blue?", 7,
      "One quarter means one of four equal groups.", "28 / 4 = 7, so one quarter of 28 is 7.", observation("The 28 tiles can be split into 4 equal groups. The blue tiles make one group.")),
    numeric("Set aside a third", "There are 24 flags. One third of them are green. How many flags are green?", 8,
      "One third means one of three equal groups.", "24 / 3 = 8, so one third of 24 is 8.", observation("The 24 flags can be split into 3 equal groups. The green flags make one group."))
  ]),
  task("fraction-rest", 1, "fraction-remainder", "The remaining supplies are counted.", [
    numeric("Count unused ribbon", "A ribbon is 20 cm long. Half of it is used for a display. How many centimetres of ribbon remain?", 10,
      "Find half of twenty, then take that length away from the whole.", "Half of 20 is 10. Then 20 - 10 = 10 cm remain.", observation("The ribbon starts at 20 cm. Exactly one half is used.")),
    numeric("Count unused beads", "There are 32 beads. One quarter are used for a pattern. How many beads remain unused?", 24,
      "Divide by four to find the used beads, then subtract them from thirty-two.", "32 / 4 = 8 used beads. Then 32 - 8 = 24 remain.", observation("There are 32 beads at the start. Exactly one quarter are used."))
  ]),
  task("length-sort", 2, "measurement-order", "The display strips are arranged by length.", [
    order("Sort display strips", "Put these display strips in order from shortest to longest. Every length is measured in centimetres.", ["45 cm", "18 cm", "63 cm", "27 cm"], ["b", "d", "a", "c"],
      "All units match, so compare the numbers and start with the smallest.", "18 cm < 27 cm < 45 cm < 63 cm.", { kind: "measurement", unit: "cm" }),
    order("Sort shelf labels", "Put these shelf labels in order from shortest to longest. Every length is measured in centimetres.", ["32 cm", "56 cm", "14 cm", "41 cm"], ["c", "a", "d", "b"],
      "Find the smallest length, then the next smallest length.", "14 cm < 32 cm < 41 cm < 56 cm.", { kind: "measurement", unit: "cm" })
  ]),
  task("number-pattern", 2, "number-patterns", "The counting pattern is restored.", [
    order("Restore the counter", "A workshop counter goes up by 25 each step. Put these readings in increasing order.", ["175", "125", "200", "150"], ["b", "d", "a", "c"],
      "Start with the smallest reading and add twenty-five each time.", "125, 150, 175, 200 increase by 25 each time.", { kind: "sequence", step: 25 }),
    order("Restore the labels", "Numbered labels go up by 100 each step. Put these labels in increasing order.", ["620", "420", "720", "520"], ["b", "d", "a", "c"],
      "The tens and ones stay the same while the hundreds increase.", "420, 520, 620, 720 increase by 100 each time.", { kind: "sequence", step: 100 })
  ]),
  task("elapsed-time", 2, "elapsed-time", "The workshop timetable is checked.", [
    numeric("Time the tidy-up", "A tidy-up starts at 10:35 am and ends at 11:00 am on the same morning. How many minutes does it take?", 25,
      "Count from thirty-five minutes past the hour to sixty minutes.", "60 - 35 = 25 minutes.", observation("Start: 10:35 am. Finish: 11:00 am on the same day.")),
    numeric("Time the display", "Setting up a display starts at 2:45 pm and ends at 3:20 pm on the same afternoon. How many minutes does it take?", 35,
      "Count fifteen minutes to three o'clock, then twenty more minutes.", "15 + 20 = 35 minutes.", observation("Start: 2:45 pm. Finish: 3:20 pm on the same day."))
  ]),
  task("measure-difference", 2, "measurement-subtraction", "The difference between measurements is recorded.", [
    numeric("Compare jug amounts", "One jug contains 750 mL of water and another contains 500 mL. How many more millilitres are in the first jug?", 250,
      "Both amounts use millilitres. Subtract the smaller amount from the larger.", "750 - 500 = 250 mL more water.", observation("First jug: 750 mL. Second jug: 500 mL.")),
    numeric("Compare parcel masses", "One parcel has a mass of 650 g and another has a mass of 425 g. How many grams greater is the first parcel's mass?", 225,
      "Both masses use grams. Find the difference between six hundred fifty and four hundred twenty-five.", "650 - 425 = 225 g greater mass.", observation("First parcel: 650 g. Second parcel: 425 g."))
  ]),
  task("light-source", 3, "light-and-reflection", "The light-source card is filed correctly.", [
    mcq("Find a light source", "A display includes a switched-on torch, a mirror, a book and a metal spoon. Which object makes its own light?", ["The switched-on torch", "The mirror", "The book", "The metal spoon"], "a",
      "A light source makes light; a shiny surface can reflect light made elsewhere.", "The switched-on torch produces light. The other objects reflect light that reaches them.", "The torch is working and switched on. The other objects are ordinary unlit objects."),
    mcq("Explain moonlight", "A picture shows the Moon bright in the night sky. Why can the Moon look bright to us?", ["It makes light like a switched-on lamp", "It reflects light from the Sun", "It stores darkness during the day", "It makes sunlight inside its rocks"], "b",
      "Think about the difference between making light and reflecting it.", "Moonlight is sunlight reflected from the Moon's surface, not light made by the Moon.", "The picture shows the ordinary Moon, not a fictional glowing object.")
  ]),
  task("shadow-block", 3, "shadow-formation", "The shadow observation is explained.", [
    mcq("Explain the shadow", "In a classroom photo, a wooden block stands between a lamp and a screen. Why is there a dark shadow on the screen?", ["The screen makes extra darkness", "The block turns light into water", "The block stops some lamp light reaching the screen", "The lamp pulls darkness from the block"], "c",
      "Follow the light from the lamp and think about what the wood stops.", "Wood is opaque: light does not pass through it. The blocked light leaves a shadow on the screen.", "The lamp is on. The wooden block is opaque and lies in the path to the screen."),
    mcq("Locate the shadow", "A picture shows a lamp to the left of an opaque card and a screen to its right. Where will the card's shadow fall?", ["Inside the lamp", "On the left of the lamp", "Only inside the card", "On the screen behind the card"], "d",
      "A shadow is on the side away from the light source, where light is blocked.", "The card blocks some light travelling towards the screen on its right. Its shadow falls on that screen.", "Left to right: lamp, opaque card, screen. They are lined up.")
  ]),
  task("window-material", 3, "transparent-and-opaque", "The viewing-window material is identified.", [
    mcq("Choose a clear window", "A model workshop needs a window that lets someone see objects clearly through it. Which material is best for this job?", ["Clear transparent plastic", "Thick cardboard", "A wooden sheet", "An iron sheet"], "a",
      "Transparent materials let light through so objects behind them can be seen clearly.", "Clear transparent plastic lets someone see through it. These solid sheets of card, wood and iron are opaque.", "All four choices are plain sheets with no holes. The plastic is clear, not frosted."),
    mcq("Read the material note", "A material note says: light passes through this sheet and objects behind it can be seen clearly. Which word describes it?", ["Opaque", "Transparent", "Magnetic", "Frozen"], "b",
      "Choose the word for a material that you can see clearly through.", "Transparent describes a material that lets light pass through so objects can be seen clearly.", "This question describes an ordinary clear sheet, not a mirror.")
  ]),
  task("magnet-material", 3, "magnetic-materials", "The magnetic-material card is sorted.", [
    mcq("Find a magnetic material", "A classroom magnet is brought near separate pieces of wood, plastic, iron and copper. Which material is strongly attracted?", ["Wood", "Plastic", "Iron", "Copper"], "c",
      "Some metals are magnetic, but not all metals are strongly attracted to a classroom magnet.", "Iron is strongly attracted to a classroom magnet. Wood, plastic and copper are not strongly attracted in this test.", "These are ordinary samples, without hidden iron parts. The question is about a classroom magnet, not game equipment."),
    mcq("Check a metals claim", "A recorded test shows iron pulled towards a magnet but copper not pulled towards it. Which statement does this support?", ["Every metal is pulled towards a magnet", "Copper is not a metal", "Only non-metals are attracted to magnets", "Not every metal is strongly attracted to a magnet"], "d",
      "Iron and copper are both metals, but the recorded results differ.", "Copper is a metal that is not strongly attracted in this test. The result shows why 'all metals are magnetic' is not a useful rule.", "Recorded observation: the classroom magnet attracts the iron sample, but not the copper sample.")
  ]),
  task("magnet-poles", 4, "magnetic-poles", "The magnet-pole prediction is recorded.", [
    mcq("Predict matching poles", "In a diagram, the north ends of two bar magnets face each other across a small gap. What force do they exert on each other?", ["A push apart", "A pull together", "No magnetic force because there is a gap", "A force that turns both magnets into wood"], "a",
      "Like magnetic poles repel, which means they push away from each other.", "Two north poles are like poles. They repel, exerting a force that pushes the magnets apart.", "The diagram labels both facing poles N. The magnets are close enough to interact."),
    mcq("Predict opposite poles", "In a diagram, the north end of one bar magnet faces the south end of another across a small gap. What force acts between them?", ["A push apart", "A pull together", "No force until the magnets touch", "A force that removes both poles"], "b",
      "Unlike magnetic poles attract, which means they pull towards each other.", "North and south are unlike poles. They attract across the gap and pull the magnets towards each other.", "The facing poles are labelled N and S. The magnets are close enough to interact.")
  ]),
  task("contact-force", 4, "contact-and-noncontact-forces", "The force observation is classified.", [
    mcq("Find a contact push", "A picture shows a hand pushing a toy trolley. Which description explains the contact force moving the trolley?", ["Light from the room pushes the wheels", "The trolley moves because it changes colour", "The hand touches the trolley and pushes it", "A shadow pulls the trolley forwards"], "c",
      "Contact means touching. Look for the two objects that touch in this push.", "The hand and trolley touch. The hand exerts a push on the trolley, so this is a contact force.", "The pictured hand is touching the back of the toy trolley and pushing it forwards."),
    mcq("Explain a pull across a gap", "A recorded demonstration shows an iron clip moving towards a magnet before they touch. What does this show?", ["All forces need objects to touch", "The clip has become a light source", "The air has turned into iron", "A magnetic force can act without contact"], "d",
      "There is still a gap when the clip begins to move.", "The magnet pulls the iron clip across a gap. Magnetic forces can act without the objects touching.", "The clip starts moving while a visible gap remains between it and the magnet.")
  ]),
  task("fair-ramp", 4, "fair-comparison", "The fair-comparison plan is selected.", [
    mcq("Compare ramp surfaces", "A class compares how far one toy car rolls on two ramp surfaces. What should stay the same to make the comparison fair?", ["The car and its release height", "Only the colour of the notebook", "Nothing: change the car and height too", "The surface: never change it"], "a",
      "Change the surface you are investigating; keep other things that affect travel the same.", "Keeping the car and release height the same helps isolate the effect of the surface. Release it without an extra push each time.", "Plan only: compare two surface coverings on the same ramp using one toy car, released without pushing."),
    mcq("Spot an unfair comparison", "A class changes both the ramp surface and the toy car before the second roll. Why is it hard to tell what caused a different distance?", ["Distance cannot be measured", "Two things changed, so either could affect the result", "Changing more things always makes a fairer test", "The notebook must be magnetic"], "b",
      "Think about whether the surface was the only thing that changed.", "Both the car and the surface changed. Either could affect the distance, so this does not isolate the surface's effect.", "First roll: car A on felt. Second roll: car B on smooth plastic. Both the car and surface change.")
  ]),
  task("repeat-evidence", 4, "repeated-observations", "The test record keeps the evidence honestly.", [
    mcq("Use repeated rolls", "Three rolls of the same toy car on the same ramp travel slightly different distances. What is a useful reason to repeat the test?", ["To guarantee that every number becomes identical", "To keep only the longest roll", "To check whether the results show a consistent pattern", "To prove the car always rolls furthest on every surface"], "c",
      "Repeating a test helps reveal how much results vary, rather than hiding that variation.", "Repeated rolls help check consistency. They do not guarantee identical distances or prove what happens on every other surface.", "The class uses the same car, surface and release point, without an extra push, and records every roll."),
    mcq("Handle a surprising result", "One recorded roll travels much farther than the other two in the same test. What is the best next step?", ["Erase it without checking", "Change every distance to match it", "Claim it proves what always happens", "Keep the record, check the setup and repeat fairly"], "d",
      "A surprising observation is a reason to check carefully, not to hide a result.", "Keep the observation and check for a changed setup or measurement error. Further fair repeats can help explain the difference.", "Three distances were recorded using a toy car and ramp. One is unexpectedly large.")
  ]),
  task("matter-state", 5, "states-of-matter", "The material-state labels are checked.", [
    mcq("Name water's state", "Water is poured from a cup into a bowl at room temperature. It flows and takes the shape of the part of the bowl it fills. What state is it?", ["Liquid", "Solid", "Gas", "A magnet"], "a",
      "Think of the state that flows but does not spread out to fill the entire room.", "Liquid water flows and takes the shape of the part of its container it occupies. Pouring does not turn it into a gas.", "The recorded water remains water when poured. There is no freezing or boiling."),
    mcq("Name air's state", "A closed, inflated balloon contains air that spreads throughout the space inside it. What state of matter is the air?", ["Liquid", "Gas", "Solid", "Ice"], "b",
      "Air can spread out to occupy the space available inside a container.", "Air is a mixture of gases. Inside a balloon it occupies the available space rather than forming a solid block or a pool of liquid.", "The balloon in the picture contains ordinary air at room temperature.")
  ]),
  task("melt-freeze", 5, "melting-and-freezing", "The change-of-state observation is named.", [
    mcq("Name the ice change", "A time-lapse recording shows an ice cube becoming a puddle of liquid water in a warm room. What is this change called?", ["Freezing", "Condensation", "Melting", "Magnetism"], "c",
      "The water starts as a solid and ends as a liquid.", "Melting is a change from solid to liquid. The ice becomes liquid water; it is still water.", "Recorded observation only: solid ice gradually becomes liquid water in a bowl."),
    mcq("Name the water change", "A recording shows liquid water cooled in a freezer until it becomes solid ice. What is this change called?", ["Melting", "Evaporation", "Condensation", "Freezing"], "d",
      "The water starts as a liquid and ends as a solid.", "Freezing changes liquid water into solid ice as energy is removed by cooling. The material is still water.", "This is a recorded observation, not an instruction to operate a freezer.")
  ]),
  task("water-air", 5, "evaporation-and-condensation", "The water-change record is completed.", [
    mcq("Explain a drying cloth", "A damp cloth dries at room temperature. No water drips off it. What happens to the water as it evaporates?", ["It becomes water vapour in the air", "It stops existing", "It becomes solid iron", "It must first freeze into ice"], "a",
      "Evaporation changes liquid water into a gas, even without boiling.", "Water evaporates from the cloth into the air as water vapour. It still exists, although the gas is invisible.", "The cloth dries gradually at room temperature. It is not heated or squeezed."),
    mcq("Explain cold-cup drops", "Drops appear outside a cold, sealed cup in humid air. The cup does not leak. Where does the water in these new drops come from?", ["It passes through the unbroken cup wall", "Water vapour in the air cools and becomes liquid", "The cup turns its solid wall into water", "The cold surface creates water from nothing"], "b",
      "Think about water that is already in the surrounding air as a gas.", "Water vapour from the air cools at the cold surface and condenses into liquid drops. The drops need not come from inside the cup.", "The outside starts dry. The sealed cup has no leaks, and the surrounding air is humid.")
  ]),
  task("sound-vibration", 5, "sound-and-vibration", "The sound observation is explained.", [
    mcq("Explain a ringing bell", "A slow-motion recording shows a bell's metal moving rapidly back and forth while it rings. What produces the sound?", ["The colour of the bell", "The bell's shadow", "The vibrating metal", "The name printed on the bell"], "c",
      "Rapid back-and-forth movement is called vibration.", "The bell's vibrating metal makes the surrounding air vibrate. Sound can travel through that air to a listener.", "This is a recording of an ordinary bell, viewed at a comfortable listening volume."),
    mcq("Trace sound to an ear", "A listener hears a quiet drum across a classroom. What carries the sound from the vibrating drum through the room?", ["Bits of drum skin flying to the ear", "A shadow travelling across the floor", "Light that has frozen", "Vibrations travelling through the air"], "d",
      "The drum stays in place while a disturbance travels through the air.", "Sound travels as vibrations through the air to the ear. Pieces of drum skin do not need to travel across the room.", "The drum and listener are in an ordinary room containing air. The sound is at a comfortable volume.")
  ])
];

const foundation = tasks.flatMap((entry) => entry.variants.map((variant, index) => ({
  ...variant, id: `${entry.id}-v${index + 1}`, taskId: entry.id, variant: index + 1,
  forge: entry.slot < 3 ? "maths" : "science", slot: entry.slot, skill: entry.skill, outcome: entry.outcome,
  learningLevel: 1, difficulty: "Foundation"
})));

function tierMath(base, level) {
  if (level >= 4) return advancedMath(base, level);
  const v = base.variant - 1;
  const stretch = level === 3;
  const titles = ["Count the supplies", "Share the remaining tiles", "Work out the packs", "Plan equal rows",
    "Update the counter", "Regroup the number", "Count blue beads", "Track remaining flags",
    "Compare ribbon lengths", "Continue the pattern", "Count working minutes", "Compare jug amounts"];
  const title = titles[tasks.findIndex((entry) => entry.id === base.taskId)];
  const make = (prompt, answer, clue, explanation) => ({
    ...numeric(title, prompt, answer, clue, explanation, observation(prompt)),
    outcome: "The workshop calculation is checked."
  });
  switch (base.taskId) {
    case "expansion-supply-groups": {
      const boxes = [4, 6][v], each = [8, 5][v], extra = [7, 9][v], used = [12, 14][v];
      return stretch
        ? make(`There are ${boxes} boxes of ${each} markers and ${extra} loose markers. The class uses ${used} markers. How many remain?`, boxes * each + extra - used,
          "Find the boxed total, add the loose markers, then take away those used.", `${boxes} x ${each} + ${extra} = ${boxes * each + extra}. Subtract ${used}: ${boxes * each + extra - used} markers remain.`)
        : make(`There are ${boxes} boxes of ${each} markers and ${extra} loose markers. How many markers are there altogether?`, boxes * each + extra,
          "Multiply to count the boxed markers, then add the loose markers.", `${boxes} x ${each} = ${boxes * each}; add ${extra} to get ${boxes * each + extra} markers.`);
    }
    case "expansion-tray-sharing": {
      const total = [48, 40][v], groups = [4, 5][v], reserved = [8, 10][v], used = [3, 2][v];
      return stretch
        ? make(`Share ${total} tiles equally between ${groups} trays, then use ${used} tiles from each tray. How many tiles remain in each tray?`, total / groups - used,
          "Find one tray's equal share before subtracting what is used from that tray.", `${total} / ${groups} = ${total / groups}. Then ${total / groups} - ${used} = ${total / groups - used} tiles per tray.`)
        : make(`There are ${total} tiles. Set aside ${reserved}, then share the rest equally between ${groups} trays. How many tiles go in each tray?`, (total - reserved) / groups,
          "First remove the set-aside tiles, then divide the remainder equally.", `${total} - ${reserved} = ${total - reserved}. Then ${total - reserved} / ${groups} = ${(total - reserved) / groups} tiles per tray.`);
    }
    case "expansion-pack-count": {
      const total = [54, 64][v], spare = [6, 8][v], size = [6, 8][v], missing = [12, 16][v];
      return stretch
        ? make(`A display needs ${total} badges. There are ${spare} badges already on it. Packs contain ${size} badges each. How many packs supply exactly the missing badges?`, (total - spare) / size,
          "Find the gap in the display first, then count how many equal packs fill it.", `${total} - ${spare} = ${total - spare}. Divide by ${size}: ${(total - spare) / size} packs.`)
        : make(`There are ${total} badges, but ${missing} are reserved. Pack the rest with ${size} badges in each envelope. How many full envelopes can be filled?`, (total - missing) / size,
          "Subtract the reserved badges before dividing the available badges into packs.", `${total} - ${missing} = ${total - missing}; ${total - missing} / ${size} = ${(total - missing) / size} envelopes.`);
    }
    case "expansion-missing-group": {
      const rows = [4, 6][v], each = [7, 8][v], extra = [5, 9][v];
      const total = rows * each + extra;
      return stretch
        ? make(`A display has ${rows} equal rows and ${extra} extra cards, using ${total} cards altogether. How many cards are needed for one more equal row?`, each,
          "Remove the extra cards, then find the number in one existing row.", `${total} - ${extra} = ${rows * each}; ${rows * each} / ${rows} = ${each}. One more equal row needs ${each} cards.`)
        : make(`A display uses ${total} cards. There are ${extra} cards in a heading and the rest make ${rows} equal rows. How many cards are in each row?`, each,
          "Take away the heading cards before sharing the rest between equal rows.", `${total} - ${extra} = ${rows * each}; ${rows * each} / ${rows} = ${each} cards in each row.`);
    }
    case "expansion-digit-value": {
      const code = [368, 547][v], tens = [5, 6][v], ones = [9, 8][v];
      return stretch
        ? make(`A counter shows ${code}. Add ${tens} tens, then take away ${ones} ones. What number does the counter show now?`, code + tens * 10 - ones,
          "Convert the tens to a number, add it, then subtract the ones.", `${tens} tens = ${tens * 10}. ${code} + ${tens * 10} - ${ones} = ${code + tens * 10 - ones}.`)
        : make(`A counter shows ${code}. It increases by ${tens} tens. What number does the counter show now?`, code + tens * 10,
          "Each ten is worth ten ones, so first find the value of the added tens.", `${tens} tens = ${tens * 10}. ${code} + ${tens * 10} = ${code + tens * 10}.`);
    }
    case "expansion-build-number": {
      const h = [3, 5][v], t = [14, 12][v], o = [6, 8][v], remove = [80, 90][v];
      return stretch
        ? make(`A collection has ${h} hundreds, ${t} tens and ${o} ones. Remove ${remove} from the collection. What number remains?`, h * 100 + t * 10 + o - remove,
          "Regroup the tens to find the whole number, then subtract the removed amount.", `${h * 100} + ${t * 10} + ${o} = ${h * 100 + t * 10 + o}. Subtract ${remove} to get ${h * 100 + t * 10 + o - remove}.`)
        : make(`A collection has ${h} hundreds, ${t} tens and ${o} ones. What number does this collection represent?`, h * 100 + t * 10 + o,
          "More than ten tens can be regrouped: ten tens make another hundred.", `${h * 100} + ${t * 10} + ${o} = ${h * 100 + t * 10 + o}.`);
    }
    case "expansion-fraction-share": {
      const total = [24, 32][v], numerator = [2, 3][v], denominator = [3, 4][v], used = [5, 7][v];
      const share = total / denominator * numerator;
      return stretch
        ? make(`There are ${total} beads. ${numerator}/${denominator} of them are blue. Use ${used} of the blue beads. How many blue beads remain?`, share - used,
          "Divide to find one equal part, multiply for the blue parts, then subtract the used blue beads.", `${total} / ${denominator} x ${numerator} = ${share} blue beads. ${share} - ${used} = ${share - used} remain.`)
        : make(`There are ${total} beads. ${numerator}/${denominator} of them are blue. How many blue beads are there?`, share,
          "First find one equal part, then count the number of parts that are blue.", `${total} / ${denominator} = ${total / denominator}; ${total / denominator} x ${numerator} = ${share} blue beads.`);
    }
    case "expansion-fraction-rest": {
      const total = [36, 40][v], denominator = [3, 4][v], extra = [6, 8][v];
      const left = total - total / denominator;
      return stretch
        ? make(`There are ${total} flags. Use 1/${denominator} of them, then share the remaining flags equally between 2 displays. How many flags go on each display?`, left / 2,
          "Find the used fraction, subtract it from the total, then halve the remainder.", `${total} / ${denominator} = ${total / denominator} used; ${left} remain. ${left} / 2 = ${left / 2} per display.`)
        : make(`There are ${total} flags. Use 1/${denominator} of them, then receive ${extra} new flags. How many flags are available now?`, left + extra,
          "Find the used fraction, take it away, then add the new flags.", `${total} / ${denominator} = ${total / denominator} used. ${total} - ${total / denominator} + ${extra} = ${left + extra} flags.`);
    }
    case "expansion-length-sort": {
      const labels = v ? ["9 cm", "120 mm", "75 mm", "10 cm"] : ["8 cm", "65 mm", "11 cm", "95 mm"];
      if (!stretch) return order(title, `Sort these ${v ? "shelf label" : "ribbon"} lengths from shortest to longest. Some use centimetres and some use millimetres. 1 cm = 10 mm.`, labels,
        v ? ["c", "a", "d", "b"] : ["b", "a", "d", "c"], "Convert centimetres to millimetres before comparing the four lengths.",
        v ? "75 mm < 90 mm < 100 mm < 120 mm." : "65 mm < 80 mm < 95 mm < 110 mm.", observation("Compare in one unit: 1 cm = 10 mm."));
      const length = [35, 42][v], cut = [120, 150][v];
      return make(`A ribbon is ${length} cm long. Cut off ${cut} mm. How many centimetres remain? Remember 10 mm = 1 cm.`, length - cut / 10,
        "Convert the cut length from millimetres to centimetres, then subtract it.", `${cut} mm = ${cut / 10} cm. ${length} - ${cut / 10} = ${length - cut / 10} cm remain.`);
    }
    case "expansion-number-pattern": {
      const start = [135, 260][v], step = [25, 40][v], hops = stretch ? 2 : 1;
      return make(`A counter reads ${start}, ${start + step}, ${start + step * 2}. The increase is the same each time. What reading appears after ${hops} more steps?`, start + step * (2 + hops),
        "Find the difference between neighbouring readings, then continue by that amount.", `Each step adds ${step}. After ${hops} more steps the reading is ${start + step * (2 + hops)}.`);
    }
    case "expansion-elapsed-time": {
      const end = [25, 40][v], pause = [10, 15][v], pauses = stretch ? 2 : 1;
      return make(`A workshop runs from 2:45 pm to 3:${end} pm on one afternoon. It includes ${pauses} breaks of ${pause} minutes each. How many minutes are spent working, excluding breaks?`, 15 + end - pauses * pause,
        "Find the full elapsed time across the hour, then subtract all break time.", `15 + ${end} = ${15 + end} minutes elapsed. Subtract ${pauses} x ${pause}: ${15 + end - pauses * pause} working minutes.`);
    }
    case "expansion-measure-difference": {
      const large = [800, 900][v], small = [450, 550][v], change = [150, 200][v], use = [100, 150][v];
      return stretch
        ? make(`Jug A has ${large} mL and jug B has ${small} mL. Use ${change} mL from A and ${use} mL from B. How many more millilitres remain in A than B?`, large - change - (small - use),
          "Find what remains in each jug separately before comparing the two amounts.", `A: ${large - change} mL. B: ${small - use} mL. Difference: ${large - change} - ${small - use} = ${large - change - (small - use)} mL.`)
        : make(`Jug A has ${large} mL and jug B has ${small} mL. Add ${change} mL to B. How many more millilitres are in A than B now?`, large - (small + change),
          "Update the amount in jug B before subtracting it from the amount in A.", `B now has ${small} + ${change} = ${small + change} mL. ${large} - ${small + change} = ${large - (small + change)} mL.`);
    }
    default: throw new Error(`Uncalibrated maths task ${base.taskId}`);
  }
}

function advancedMath(base, level) {
  const v = base.variant - 1, master = level === 5;
  const make = (prompt, answer, clue, explanation) => ({
    ...numeric("Solve the workshop puzzle", prompt, answer, clue, explanation, observation(prompt)),
    outcome: "The workshop calculation is checked."
  });
  switch (base.taskId) {
    case "expansion-supply-groups": {
      if (master) {
        const boxes = [6, 8][v], left = [28, 48][v], answer = left / 2 * 3 / boxes;
        return make(`Boxes hold all the markers. Each box starts with the same number of markers. After using 1/3 of all the markers, ${left} remain. There were ${boxes} boxes. How many markers were in each box?`, answer,
          "The remaining markers make two thirds. Find one third, then the whole, then one box.",
          `${left} / 2 x 3 = ${left / 2 * 3} markers at first. ${left / 2 * 3} / ${boxes} = ${answer} per box.`);
      }
      const each = [8, 6][v], loose = [7, 9][v], used = [12, 14][v], left = [35, 43][v];
      return make(`Boxes hold ${each} markers each. With ${loose} loose markers added, the class uses ${used} and has ${left} left. How many full boxes were there at first?`, (left + used - loose) / each,
        "Undo the use first, remove the loose markers, then work out the number of boxes.",
        `${left} + ${used} - ${loose} = ${left + used - loose} boxed markers. Divide by ${each}: ${(left + used - loose) / each} boxes.`);
    }
    case "expansion-tray-sharing": {
      const total = master ? [71, 86][v] : [59, 74][v], aside = master ? [5, 7][v] : [8, 9][v];
      const trays = master ? [8, 9][v] : [6, 8][v], move = [2, 3][v];
      const remainder = (total - aside) % trays;
      return master
        ? make(`There are ${total} tiles. Keep ${aside} aside and share the rest equally among ${trays} trays, leaving any spare tiles out. Move ${move} tiles from each tray back out. How many tiles are now outside the trays?`, aside + remainder + move * trays,
          "Count three outside groups: those set aside, the division remainder, and those moved back.",
          `${total} - ${aside} = ${total - aside}; sharing leaves ${remainder} spare. Outside: ${aside} + ${remainder} + ${move} x ${trays} = ${aside + remainder + move * trays}.`)
        : make(`There are ${total} tiles. Set aside ${aside}. Share the rest equally among ${trays} trays, putting as many as possible on each tray. How many of the tiles being shared are left over?`, remainder,
          "Subtract those set aside. Find the largest whole number of equal shares and the remainder.",
          `${total} - ${aside} = ${total - aside}. ${trays} x ${Math.floor((total - aside) / trays)} = ${total - aside - remainder}, leaving ${remainder} unshared.`);
    }
    case "expansion-pack-count": {
      const need = master ? [68, 79][v] : [53, 67][v], have = master ? [11, 14][v] : [8, 10][v], size = [8, 9][v];
      const packs = Math.ceil((need - have) / size), spare = have + packs * size - need;
      return master
        ? make(`A display needs ${need} badges and already has ${have}. Badges come only in full packs of ${size}. Buy the fewest packs that finish the display. How many badges will be spare?`, spare,
          "Find the missing badges, round up to enough full packs, then count the unused badges.",
          `Need ${need - have} more: ${packs} packs supply ${packs * size}. ${have} + ${packs * size} - ${need} = ${spare} spare.`)
        : make(`A display needs ${need} badges and already has ${have}. Badges come only in full packs of ${size}. What is the fewest number of packs needed to finish the display?`, packs,
          "After finding the gap, check whether the last partly needed pack must still be bought whole.",
          `The gap is ${need} - ${have} = ${need - have}. ${packs - 1} packs are too few; ${packs} packs supply ${packs * size}, enough.`);
    }
    case "expansion-missing-group": {
      const times = master ? [5, 4][v] : [6, 8][v], extra = [9, 11][v], removed = [12, 13][v];
      if (master) return make(`The same number fills both blanks: (blank x 2) + ${extra} = (blank x ${times}) - ${removed}. What is the missing number?`, (extra + removed) / (times - 2),
        "Add back the subtracted amount. Compare the extra equal groups on the two sides.",
        `The extra ${times - 2} groups equal ${extra} + ${removed} = ${extra + removed}. Each is ${(extra + removed) / (times - 2)}.`);
      const total = [51, 69][v], inside = [3, 4][v], answer = (total + extra) / times - inside;
      return make(`A supply check reads: (blank + ${inside}) x ${times} - ${extra} = ${total}. Work inside the brackets first. What number replaces the blank?`, answer,
        "Undo the subtraction, then the multiplication, then the addition inside the brackets.",
        `${total} + ${extra} = ${total + extra}; divide by ${times} to get ${(total + extra) / times}. Subtract ${inside}: ${answer}.`);
    }
    case "expansion-digit-value": {
      if (master) {
        const hundreds = [4, 6][v], difference = [2, 4][v], sum = [12, 18][v];
        const ones = (sum - hundreds - difference) / 2, tens = ones + difference;
        return make(`A three-digit code has ${hundreds} in the hundreds place. Its tens digit is ${difference} more than its ones digit. Its three digits add to ${sum}. What is the code?`, hundreds * 100 + tens * 10 + ones,
          "Remove the hundreds digit from the digit sum, then split the rest into two digits with the stated difference.",
          `${sum} - ${hundreds} = ${sum - hundreds}. The digits ${tens} and ${ones} fit the sum and difference. The code is ${hundreds * 100 + tens * 10 + ones}.`);
      }
      const start = [472, 586][v], removed = [18, 24][v], end = [514, 632][v];
      return make(`A counter starts at ${start}. Add some whole tens, then subtract ${removed}. It finishes at ${end}. How many tens were added?`, (end + removed - start) / 10,
        "Undo the subtraction, compare with the starting number, then change the difference into tens.",
        `${end} + ${removed} - ${start} = ${end + removed - start}. That is ${(end + removed - start) / 10} tens.`);
    }
    case "expansion-build-number": {
      const hundreds = master ? [4, 5][v] : [3, 5][v], ones = [8, 6][v];
      if (master) {
        const tens = [16, 14][v], allTens = hundreds * 10 + tens;
        return make(`A collection has ${hundreds} hundreds, ${tens} tens and ${ones} ones. Trade every hundred for tens. Remove half of all the tens but keep every one. What number remains?`, allTens / 2 * 10 + ones,
          "Count all the tens after trading. Halve the tens only, then add back the untouched ones.",
          `${hundreds} hundreds become ${hundreds * 10} tens: ${allTens} tens altogether. Half is ${allTens / 2} tens. ${allTens / 2 * 10} + ${ones} = ${allTens / 2 * 10 + ones}.`);
      }
      const target = [488, 676][v];
      return make(`A collection has ${hundreds} hundreds, some tens and ${ones} ones. Its total value is ${target}. How many tens are in the collection? There may be more than ten tens.`, (target - hundreds * 100 - ones) / 10,
        "Remove the known hundreds and ones from the total before counting the tens.",
        `${target} - ${hundreds * 100} - ${ones} = ${target - hundreds * 100 - ones}. Divide by ten: ${(target - hundreds * 100 - ones) / 10} tens.`);
    }
    case "expansion-fraction-share": {
      const numerator = [3, 2][v], denominator = [4, 3][v], used = [6, 5][v], left = [15, 19][v];
      if (master) return make(`${numerator}/${denominator} of a bead collection is blue. After using ${used} blue beads, ${left} blue beads remain. How many beads of all colours were in the collection at first?`, (used + left) / numerator * denominator,
        "Rebuild the blue group first. Find one fractional part, then rebuild the whole collection.",
        `${used} + ${left} = ${used + left} blue beads. ${used + left} / ${numerator} x ${denominator} = ${(used + left) / numerator * denominator} beads altogether.`);
      const first = [36, 30][v], second = [28, 24][v], answer = first * 2 / 3 - second * 3 / 4;
      return make(`Bag A has ${first} beads; 2/3 are blue. Bag B has ${second} beads; 3/4 are blue. How many more blue beads are in A than B?`, answer,
        "Find each blue amount separately. Comparing the fraction labels alone is not enough.",
        `A: ${first} / 3 x 2 = ${first * 2 / 3}. B: ${second} / 4 x 3 = ${second * 3 / 4}. The difference is ${answer}.`);
    }
    case "expansion-fraction-rest": {
      const first = master ? [3, 4][v] : [4, 3][v], second = master ? [2, 3][v] : [3, 4][v];
      if (master) {
        const left = [12, 20][v], middle = left * second / (second - 1), total = middle * first / (first - 1);
        return make(`Use 1/${first} of all the flags. Then use 1/${second} of the flags that remain. There are now ${left} flags left. How many flags were there at first?`, total,
          "Work backwards through the second fraction first, then through the first fraction.",
          `Before the second use: ${left} / ${second - 1} x ${second} = ${middle}. Before the first: ${middle} / ${first - 1} x ${first} = ${total}.`);
      }
      const total = [48, 60][v], middle = total - total / first;
      return make(`There are ${total} flags. Use 1/${first} of them. Then use 1/${second} of the remaining flags, not of the original total. How many flags are left?`, middle - middle / second,
        "Find the first remainder. Use that smaller amount as the whole for the second fraction.",
        `${total} - ${total / first} = ${middle} remain. Then ${middle} - ${middle / second} = ${middle - middle / second} remain.`);
    }
    case "expansion-length-sort": {
      if (master) {
        const cm = [125, 154][v], reserved = [150, 200][v], piece = [18, 20][v], trim = [2, 3][v];
        const usable = cm - reserved / 10, size = piece + trim, answer = usable % size;
        return make(`A ribbon is ${cm} cm long. Reserve ${reserved} mm. Each tag uses ${piece} cm plus ${trim} cm of trimming. Make as many tags as possible. How many usable centimetres are left, not counting the reserve? 10 mm = 1 cm.`, answer,
          "Convert the reserve first. Each tag uses its ribbon plus its trimming; find the remainder after full tags.",
          `${cm} - ${reserved / 10} = ${usable} usable cm. Each tag needs ${size} cm. ${Math.floor(usable / size)} tags use ${usable - answer} cm, leaving ${answer} cm.`);
      }
      const cm = [100, 120][v], count = [3, 4][v], piece = [18, 22][v], waste = [20, 30][v];
      return make(`A ribbon is ${cm} cm long. Cut ${count} pieces of ${piece} cm each, and discard another ${waste} mm of frayed ribbon. How many centimetres remain? 10 mm = 1 cm.`, cm - count * piece - waste / 10,
        "Count the length of all pieces. Convert the discarded millimetres before subtracting both amounts.",
        `${cm} - ${count} x ${piece} - ${waste / 10} = ${cm - count * piece - waste / 10} cm.`);
    }
    case "expansion-number-pattern": {
      if (master) {
        const times = [2, 3][v], extra = [3, 2][v], end = [33, 71][v], answer = ((end - extra) / times - extra) / times;
        return make(`A counter follows this rule: multiply by ${times}, then add ${extra}, and repeat. After 4 changes it shows ${end}. Count each multiplication or addition as one change. What number did it start on?`, answer,
          "Undo the changes in reverse order: subtract, divide, subtract, divide.",
          `${end} - ${extra} = ${end - extra}; divide by ${times}: ${(end - extra) / times}. Subtract ${extra}, then divide by ${times} to get ${answer}.`);
      }
      const start = [2, 4][v], extra = [3, 5][v], answer = ((start + extra) * 2 + extra) * 2 + extra;
      return make(`A counter starts at ${start}. Its rule is add ${extra}, then double, and repeat. What number appears after 5 changes? Count each addition or doubling as one change.`, answer,
        "Write each change separately and alternate the two rules; do not use just one repeated increase.",
        `The readings are ${start + extra}, ${(start + extra) * 2}, ${(start + extra) * 2 + extra}, ${((start + extra) * 2 + extra) * 2}, ${answer}.`);
    }
    case "expansion-elapsed-time": {
      if (master) {
        const end = [10, 15][v], games = [3, 4][v], minutes = [20, 15][v], gap = 5, setup = [15, 20][v];
        const needed = games * minutes + (games - 1) * gap + setup, answer = needed - (60 + end);
        return make(`A club must finish by 4:${end} pm. It needs ${games} games of ${minutes} minutes, ${gap} minutes between games, and ${setup} minutes of setup before the first game. What is the minimum number of minutes before 3:00 pm that setup must start?`, answer,
          "There is one fewer gap than games. Add all the time, then work backwards from the finish.",
          `${games} x ${minutes} + ${games - 1} x ${gap} + ${setup} = ${needed} minutes. Only ${60 + end} minutes lie after 3:00 pm, so start ${answer} minutes before it.`);
      }
      const startHour = [1, 2][v], startMinute = [35, 45][v], endHour = [3, 4][v], endMinute = [5, 10][v], session = [35, 30][v];
      const elapsed = (endHour - startHour) * 60 + endMinute - startMinute;
      return make(`A workshop starts at ${startHour}:${startMinute} pm and ends at ${endHour}:${String(endMinute).padStart(2, "0")} pm. It has 2 working sessions of ${session} minutes each and one break. How many minutes is the break?`, elapsed - 2 * session,
        "Measure the whole time across the hour, then remove the time spent in both working sessions.",
        `${elapsed} minutes pass. Work takes 2 x ${session} = ${2 * session} minutes. The break is ${elapsed - 2 * session} minutes.`);
    }
    case "expansion-measure-difference": {
      if (master) {
        const times = [2, 3][v], moved = [120, 80][v], small = 2 * moved / (times - 1), answer = small * (times + 1);
        return make(`Jug A starts with ${times} times as much water as jug B. Pour ${moved} mL from A into B, and the amounts become equal. How many millilitres of water are in both jugs altogether?`, answer,
          "A loses the poured amount while B gains it, so the original gap was twice that amount.",
          `The gap was ${2 * moved} mL, or ${times - 1} of B's starting amount. B held ${small} mL; A held ${small * times} mL. Total: ${answer} mL.`);
      }
      const a = [850, 900][v], b = [350, 420][v], used = [100, 120][v], answer = (a - used - b) / 2;
      return make(`Jug A has ${a} mL; jug B has ${b} mL. Use ${used} mL from A. Then pour water from A into B until they hold equal amounts. How many millilitres must be poured?`, answer,
        "Find the gap after the first use. Pouring closes that gap from both sides, so halve it.",
        `A now holds ${a - used} mL. The gap is ${a - used - b} mL. Pour ${answer} mL: both then hold ${b + answer} mL.`);
    }
    default: throw new Error(`Uncalibrated advanced maths task ${base.taskId}`);
  }
}

// Each row supplies a new observation and inference, not a harder label on a recall item.
const reasoning = (description, question, correct, distractors, clue, explanation) => ({ description, question, correct, distractors, clue, explanation });
const appliedScience = [
  reasoning("An ordinary mirror looks bright while a torch shines on it. Covering the torch makes the mirror dark.", "What best explains this change?", "The mirror reflects the torch's light", ["The mirror makes its own light whenever the torch is nearby", "The mirror stores light and keeps shining after the torch is covered", "The light seen at the mirror comes from the viewer's eyes"], "Think about what changed when light stopped reaching the mirror.", "The mirror redirects light from the torch. It does not make its own light or keep shining from stored light after the torch is covered. Our eyes receive light; they do not light up the mirror."),
  reasoning("A book is visible beside a working lamp. When the lamp is switched off in a room with no other light, the book cannot be seen.", "Why?", "Light must reach the book and then the eye", ["The book has stopped existing", "The book needs a magnetic force to be seen", "The book has changed from solid to gas"], "Seeing an ordinary object needs light, even though the object is still there in darkness.", "The book remains in place. Without light to reflect towards the eye, it cannot be seen."),
  reasoning("In a recorded lamp-and-screen test, a card makes a shadow. The card is removed while the lamp and screen stay still.", "What should happen at the old shadow position?", "More lamp light reaches it", ["The card's shadow stays exactly as dark", "All of the lamp's light disappears", "The screen becomes a light source"], "Consider whether the light still has an opaque object blocking its path.", "Removing the card clears the blocked path, allowing more lamp light to reach that part of the screen."),
  reasoning("A lamp is on the left of a wooden block. A shadow lies to the right. The lamp is then moved to the right of the block.", "Which prediction fits?", "The shadow is now on the left, away from the lamp", ["The shadow must stay on the right", "The wood becomes transparent", "No object can make a shadow from the right"], "Use the lamp's new position, not its old position, to find the blocked side.", "The shadow lies on the side away from the light source. Moving the lamp to the opposite side changes which side is shaded."),
  reasoning("Sheet A lets letters behind it be read clearly. Sheet B lets some light through, but the letters look blurred.", "Which sheet suits a clear viewing window?", "A, because objects can be seen clearly through it", ["B, because any light means a clear view", "Neither, because all sheets are opaque", "B, because blurred letters are easier to read"], "A viewing window needs a clear image, not merely some transmitted light.", "A is transparent. B lets light through but scatters it, so it does not give the same clear view."),
  reasoning("Two plain sheets have no holes. A lamp shines through sheet A but is blocked by sheet B.", "Which sheet should make a dark shadow?", "B, because it blocks the light", ["A, because light passes through it", "Both must be equally transparent", "Neither, because only magnets make shadows"], "Connect the observed light blocking to the formation of a shadow.", "Sheet B is opaque in this observation. It blocks lamp light, leaving a dark shadow beyond it."),
  reasoning("A magnet attracts an iron washer but not a copper washer. Both washers are metal.", "Which sorting rule fits both results?", "Sort by magnetic attraction, not just by being metal", ["Place every metal in the attracted group", "Call copper a non-metal", "Sort only by which washer is shinier"], "A useful rule must agree with both observations, including the copper result.", "Being metal is not enough to predict strong attraction to a classroom magnet. The two observed responses belong in different groups."),
  reasoning("An ordinary painted iron object is attracted to a magnet. A similarly painted wooden object is not.", "Which explanation best fits?", "The material underneath matters, not just paint colour", ["Paint makes every object magnetic", "All wooden objects must be attracted", "The magnet is responding only to colour"], "The objects share a colour, but their underlying materials differ.", "Iron is strongly attracted whereas ordinary wood is not. The shared paint colour does not explain the different results."),
  reasoning("Two bar magnets attract when N faces S. One magnet is turned so N faces N.", "What should the new interaction be?", "Repulsion instead of attraction", ["Attraction because all magnet ends attract", "No poles remain after turning", "The magnets must touch before any force acts"], "Identify the facing poles after the turn and apply the like-pole rule.", "After turning, like north poles face each other. Like poles repel, so the force now pushes them apart."),
  reasoning("The N pole of a labelled bar magnet repels the unlabelled end of another bar magnet.", "What is the unlabelled end?", "A north pole", ["A south pole", "An end with no magnetic pole", "A wooden pole"], "Repulsion between two magnet ends is evidence that the poles are alike.", "Since a north pole repels the unknown magnet end, the unknown end is also north."),
  reasoning("A hand pushes a trolley by touching it. A magnet pulls an iron clip across a gap.", "What difference do these observations show?", "The hand push needs contact; the magnetic pull does not", ["Both require direct contact", "Neither involves a force", "Only the trolley can ever move"], "Compare whether the two interacting objects touch in each observation.", "The hand's push acts through contact. The magnet can attract the clip without touching it."),
  reasoning("A rolling toy car slows on a rough mat after the hand releases it.", "Which explanation best fits?", "Contact with the mat resists the car's motion", ["Its shadow pushes it faster", "Forces stop existing when the hand lets go", "The mat must be a magnet"], "The wheels still touch a surface after the hand stops pushing.", "Contact forces, including friction, can resist the motion. A continuing hand push is not needed for the surface to affect the car."),
  reasoning("A class wants to compare two surface coverings. They can use one car, one ramp and one marked release point.", "Which plan best isolates the surface?", "Change only the covering and release without pushing", ["Change the car and covering together", "Push harder on the second surface", "Move the release point every time"], "The tested surface should change while other things affecting distance stay the same.", "Using the same car, ramp and release point without an extra push helps isolate the surface covering."),
  reasoning("A roll on felt starts high on a ramp. A roll on plastic starts lower. The distances differ.", "What should be fixed before comparing the coverings?", "Use the same release height for both coverings", ["Use different cars as well", "Erase the shorter distance", "Change the covering during each roll"], "The starting height changed as well as the covering.", "Height can affect motion. Matching the release height removes that extra difference from the comparison."),
  reasoning("In repeated fair rolls, car A travels farther than car B in each trial on one tested surface.", "Which claim is supported?", "A travelled farther in these trials on this surface", ["A will win on every possible surface", "B can never move", "Repeats prove that measuring is unnecessary"], "Keep the conclusion within the conditions that were actually tested.", "The repeated pattern supports A for these trials. Untested surfaces may give different results."),
  reasoning("A class repeats a test and records all results. One differs greatly from the others.", "Why keep that result while checking it?", "It may reveal a real variation or a setup problem", ["Keeping it guarantees it is correct", "All unusual results must be hidden", "It proves the next result will match it"], "An unexpected observation can be useful evidence even before its cause is known.", "Keeping the record allows the class to investigate variation or error. It does not mean accepting the reading without checking."),
  reasoning("The same water is poured from a tall narrow cup into a shallow wide bowl. None spills.", "Which statement fits?", "Its shape changes, but it remains liquid water", ["It becomes solid because the bowl is wide", "It becomes air merely by being poured", "It must keep the tall cup's shape"], "Changing a container is not by itself a change of state.", "Liquid water takes the shape of the part of the new container it fills. It has not frozen or evaporated merely because it was poured."),
  reasoning("An inflated balloon contains invisible air and takes up more space than the same empty balloon.", "What does this help show?", "A gas can occupy space even when it is invisible", ["Only visible things occupy space", "The air must be liquid water", "Air is the same thing as empty space"], "Visibility and taking up space are different properties.", "The air inside is a gas that occupies space. Its invisibility does not make the balloon empty."),
  reasoning("A recording shows an ice cube melt. Later, the resulting water is cooled until it freezes.", "What is the material at the end?", "Solid water again", ["A new metal", "Water that has stopped existing", "A gas because it was once melted"], "Track both state changes while keeping the identity of the material in mind.", "Melting changes solid water to liquid. Freezing changes it back to solid water, so this change can be reversed."),
  reasoning("Two notes say: A, ice becomes liquid water; B, liquid water becomes ice.", "Which note describes cooling that causes freezing?", "B only", ["A only", "Both describe melting", "Neither involves water changing state"], "Match the direction of the state change to freezing rather than melting.", "Note B goes from liquid to solid, the direction of freezing. Note A goes from solid to liquid, which is melting."),
  reasoning("A damp cloth dries indoors without dripping or boiling.", "Which claim does this observation challenge?", "Water must boil before any of it can become gas", ["Water vapour can be invisible", "Liquid water can evaporate", "Water remains water when it evaporates"], "Compare the room-temperature drying with the claim that boiling is always required.", "Evaporation can happen at room temperature. Water can become vapour without boiling."),
  reasoning("A dry, sealed cold cup develops drops outside it. The cup has no cracks and the surrounding air is humid.", "Which change best explains the drops?", "Water vapour changes from gas to liquid at the cold surface", ["The solid cup changes into iron", "Ice outside the cup melts, though no ice was there", "Liquid water changes into gas to make the drops"], "The new drops are liquid, so identify what could change into liquid outside the cup.", "Water vapour in the air can condense on the cold surface. Condensation is gas to liquid, not evaporation."),
  reasoning("A recording shows the metal of a ringing bell vibrating. A hand gently steadies the metal; its vibration becomes smaller and its ringing fades.", "Which explanation connects the two observations?", "Reducing the bell's vibration reduces the sound it makes", ["The hand changes only the sound's path, not the bell's vibration", "Once ringing starts, the bell makes the same sound without vibrating", "Smaller vibrations make the bell's sound louder"], "Compare both the visible vibration and the sound before and after the metal is steadied.", "The sound source is the vibrating metal. Steadying this bell reduces its vibration and the sound it produces; it is not just a change in the sound's path."),
  reasoning("A drum is heard across a room although no drum material reaches the listener.", "Which explanation fits?", "Vibrations travel through air without pieces of drum travelling across", ["Drum skin must secretly fly into the ear", "Sound needs an empty room with no air", "Only a visible moving object can carry a disturbance"], "Distinguish the travelling sound disturbance from the drum material itself.", "The vibrating drum disturbs the air. The sound travels through the air; the drum skin need not move across the room.")
];

const stretchScience = [
  reasoning("A bright patch on a wall disappears when a card blocks light travelling from a torch to a mirror. The torch stays on.", "Which path best explains the original patch?", "Torch to mirror to wall", ["Wall to card to a source of darkness", "Mirror makes light without the torch", "Torch turns wall material into light"], "Use what disappeared when the incoming light to the mirror was blocked.", "Blocking the torch-to-mirror path removes the reflected light reaching the wall. The mirror redirects light rather than supplying its own."),
  reasoning("In a dark room, a torch beam is blocked from reaching a book. The torch still shines elsewhere, but the book cannot be seen.", "Which conclusion fits?", "A working source is not enough; light must reach the book and the eye", ["Any working torch makes every hidden object visible", "The book disappears when the beam moves", "Books make light whenever a torch is nearby"], "Think about the route of the light, not just whether a source is switched on.", "A light source elsewhere does not guarantee a lit object. To see this book, light must reach it and reflect towards the eye."),
  reasoning("With a small lamp and screen fixed, an opaque card is moved closer to the lamp between them. A recording shows its shadow grow.", "Which explanation fits this setup?", "The closer card blocks a wider part of the spreading light reaching the screen", ["The card has physically grown", "Moving any object closer to any screen always enlarges its shadow", "The lamp is now making darkness"], "Separate the unchanged size of the card from the region of light it blocks at the screen.", "In this fixed lamp-and-screen arrangement, a card nearer the small lamp blocks light over a larger screen area. The card itself has not grown."),
  reasoning("A shadow changed size, but the card and the lamp both moved between two observations.", "What would help test whether card position caused the change?", "Keep lamp and screen fixed and change only card position", ["Move the screen and lamp differently each time", "Claim the card caused it without another check", "Replace the opaque card with a lamp"], "More than one position changed, so isolate the one being investigated.", "A fixed lamp and screen remove other position changes. Moving only the card makes its effect easier to compare fairly."),
  reasoning("A window must let objects be seen clearly. Sheet A transmits light but blurs letters; sheet B transmits light and keeps letters clear.", "Why is testing only for transmitted light not enough?", "Both pass light, but only B meets the clear-view requirement", ["Neither passes light", "Passing any light guarantees a clear image", "The clearer sheet must be opaque"], "The job has two conditions: letting light through and keeping the view clear.", "Light transmission alone does not distinguish a translucent sheet from a clear transparent one. The letter test checks the needed clear view."),
  reasoning("A plain sheet blocks lamp light. Another sheet of the same material has a hole and makes a bright spot within its shadow.", "What best explains the spot?", "Light passes through the hole; the material can still be opaque", ["The hole proves every part of the sheet is transparent", "The opaque material makes its own light", "Shadows cannot contain bright areas"], "Distinguish a path through an opening from a path through the material.", "The hole provides an unblocked route for light. That does not show that light passes through the sheet material itself."),
  reasoning("A covered object is attracted to a classroom magnet. Its visible outer cover is plastic.", "Which conclusion is justified?", "It may contain magnetic material beneath the plastic", ["All plastic is now proved magnetic", "It must be pure copper throughout", "Its colour proves what is inside"], "One object's behaviour does not prove that its outer cover causes the attraction.", "A hidden iron part could explain the attraction. The observation alone does not identify all the materials inside or show that plastic is magnetic."),
  reasoning("A magnet attracts an iron sample but not a copper sample. A third metal sample has not been tested.", "What is the best prediction strategy for the third sample?", "Test it; being a metal alone does not settle strong attraction", ["Assume it attracts because every metal does", "Assume it cannot attract because copper did not", "Use its shininess as proof"], "The two known metals behave differently, so neither gives a rule for all metals.", "The results rule out an all-metals rule. Testing the third sample gives evidence about that material rather than guessing from the word metal."),
  reasoning("An unknown end of a bar magnet repels a labelled north pole. The unknown bar magnet is then turned so its other end faces that north pole.", "What is expected next?", "Attraction, because the other end is south", ["Repulsion, because both ends must be north", "No magnetic force because the magnet turned", "The unknown magnet loses both poles"], "Infer the first end from repulsion, then identify the opposite end.", "The repelling end was north. The other end of the bar magnet is south, which attracts the labelled north pole."),
  reasoning("A classroom magnet attracts an unlabelled iron object. Someone says this proves the object is a permanent magnet.", "Why is that not proved?", "Unmagnetised iron can also be attracted to a magnet", ["Magnets never attract iron", "Attraction proves the object has no iron", "Only south poles can attract any object"], "An attracted object need not itself be a permanent magnet.", "Ordinary iron is attracted too. Attraction alone cannot distinguish an iron object from a permanent magnet."),
  reasoning("A toy car slows after being released, first on a smooth surface and then more quickly on a rough one under otherwise matched conditions.", "What is supported?", "The tested surfaces affect how the car's motion changes", ["Every rough surface always stops every car instantly", "The hand must keep touching the car to slow it", "No forces act after release"], "Use the matched observations without extending them to every possible car and surface.", "Contact with the surfaces can resist motion. These observations support a surface effect for this car and setup, not a universal stopping rule."),
  reasoning("In a recorded test, a fixed thin paper barrier separates a magnet and an iron clip. The clip starts moving towards the magnet while a visible air gap remains between the clip and the paper. The paper stays still and unbroken.", "What explains the clip's movement?", "Magnetic force can act across a gap and through thin paper", ["The paper must touch the clip before any magnetic pull can act", "The paper has to move and push the clip", "A paper barrier always blocks a magnet's pull"], "The paper is not touching the moving clip, so it is not pushing the clip by contact.", "The magnetic pull acts across the gap and through the thin paper; the clip does not pass through the paper. A push can pass through touching objects, but here the paper and clip are not touching."),
  reasoning("Car A on felt rolled less far than car B on plastic. Both car and covering differed.", "Which new pair of trials best tests the covering's effect?", "Car A on each covering, with the same ramp and release point", ["A third car on a third covering", "Car A released high and car B released low", "Only repeating the original unmatched pair"], "Repeating a confounded comparison does not remove its extra difference.", "Using one car with matched ramp and release conditions changes only the covering. This helps separate a covering effect from a car difference."),
  reasoning("A class compares two ramp coverings using the same car and release point. One car is pushed at release, while the other is simply let go.", "What still needs controlling?", "Release both without an extra push", ["Make the notebook covers identical instead", "Push one even harder next time", "Nothing; a matching car makes every comparison fair"], "Look for a difference in starting motion even though the equipment matches.", "An added push can change the travel distance. Matching equipment is not enough if the release method differs."),
  reasoning("A car goes farther on surface A in two fair trials, but farther on B in a third.", "Which conclusion is most careful?", "The results vary; collect more fair observations before a strong claim", ["A wins every time", "B wins every time", "Delete the third trial to prove A wins"], "A claim of every time must fit all recorded trials, not just the majority.", "The mixed pattern does not support either always claim. More matched observations can help judge how consistent the difference is."),
  reasoning("Three repeated measurements start at 10 cm and end at 35 cm. The class records 35 cm each time, without subtracting the starting reading.", "What does this show?", "Repeating can be consistent while the measuring method is wrong", ["Identical results guarantee correct measurements", "The end reading alone gives the length even when the start is not zero", "Repeating more times will remove the same subtraction mistake"], "Measure the interval by subtracting the starting reading from the end reading, even when repeated readings agree.", "The length is 35 - 10 = 25 cm, not 35 cm. Starting at 10 cm is valid if that starting reading is subtracted. Repeating the same mistake does not correct it."),
  reasoning("Water keeps flowing into a new container's shape. An ice cube moved between containers keeps its own shape until it melts.", "Which comparison fits?", "Liquid changes shape with its container; this solid keeps its own shape", ["Both immediately become gases when moved", "The liquid keeps the first container's shape", "Changing container is always freezing"], "Compare the two materials' shapes before any change of state occurs.", "Liquid water flows into its container's shape. The solid ice keeps its shape during this observation until melting changes its state."),
  reasoning("A sealed container holds ordinary air. The air is invisible, but the container is not empty.", "Which explanation is best?", "The air is matter in the gas state and occupies space", ["Invisible means no matter can be present", "All matter must form a visible solid", "A gas is just a shadow"], "Do not use visibility as the test for whether matter is present.", "Air is gaseous matter. A container can contain invisible gas, so looking empty is not proof that it contains no matter."),
  reasoning("Ice melts into water, and that water later freezes again. No water is added or taken away.", "Which claim is challenged?", "Melting permanently changes water into a different material", ["Ice is solid water", "Freezing can reverse melting", "The state can change while the material remains water"], "Track whether the material can return to ice after melting.", "The observed return to ice shows a reversible state change. Melting did not turn the water into a permanently different material."),
  reasoning("One note records ice becoming liquid in a warm room. Another records liquid water disappearing from an uncovered shallow dish over time without spills.", "Why should these not both be called melting?", "The first is solid to liquid; the second can be liquid to gas", ["Both start with solid ice", "Water cannot become a gas without first turning to iron", "Any change in water must be freezing"], "Compare the starting state in each observation before naming its change.", "Melting starts with a solid. Drying liquid water can be evaporation, which changes liquid water to vapour rather than melting it."),
  reasoning("A damp cloth dries at room temperature. Later, some water vapour in the air forms liquid drops on a cold surface.", "Which sequence of changes fits?", "Liquid to gas, then gas to liquid", ["Gas to liquid, then liquid to gas", "Liquid to solid, then solid to liquid", "Liquid to gas, then gas to solid"], "Track the starting and ending state of the water in each observation; the final drops are liquid, not ice.", "Evaporation takes water from liquid to vapour. Condensation takes vapour back to liquid drops. Freezing would produce a solid, which is not observed here."),
  reasoning("Two identical sealed cold cups are equally cold. One is surrounded by humid air and the other by much drier air. More drops form on the first.", "Which explanation fits?", "Humid air supplies more water vapour that can condense", ["The wetter cup must leak despite being sealed", "The cup creates new water from nothing", "Dry air always contains more water vapour"], "The cup temperature matches, so compare the available water vapour around each cup.", "The humid air supplies more water vapour to the cold surface. That can produce more condensation without any leak."),
  reasoning("A drum's skin vibrates when it sounds. When the skin is held still, its own sound fades, but another drum nearby is still heard.", "Which conclusion fits?", "Stopping one source's vibration does not stop another source's sound", ["All sound in a room shares one vibrating skin", "The first drum must still be making all the sound", "Sound cannot come from vibrating objects"], "Keep track of which source was stopped and which one remains active.", "Damping the first drum reduces its sound. The second drum can still vibrate and send sound through the air independently."),
  reasoning("Two recordings compare a drum heard nearby and farther away. The drum is also struck much harder in the farther recording.", "Why does this not fairly test distance alone?", "Both distance and the strength of the strike changed", ["Sound has no source", "Only distance can ever affect loudness", "A harder strike guarantees distance has no effect"], "Check whether the source sound stayed comparable when the listener's distance changed.", "The altered strike changes the source vibration as well as the distance. A distance comparison needs a comparable source sound and listening conditions.")
];

const challengeScience = [
  reasoning("A torch lights mirror A. A bright spot from A lands on mirror B. Turning B moves a spot on the wall; blocking the gap between A and B removes it.", "Which light path fits all these clues?", "Torch to A to B to wall", ["Torch straight to wall, missing both mirrors", "Torch to B to A to wall", "B to torch to A to wall"], "Follow the spots in order and use the gap that stopped the wall spot.", "A sends torch light to B. B redirects it to the wall; blocking A to B breaks that whole path."),
  reasoning("A lamp lights a book. A card placed between book and eye hides the book, but the book stays lit. Another book beside it is still visible.", "Which part of the first book's light path was blocked?", "Reflected light travelling from book to eye", ["Light travelling directly from lamp to book","All light leaving the lamp in every direction","Light made by the book travelling to the eye"], "The first book remains lit, so distinguish light arriving at it from light leaving it.", "Light still reaches the book. The card blocks its reflected light on the way to the eye, not all the lamp's light."),
  reasoning("Two lamps light a screen behind a card. At one patch, the card blocks lamp A but not B. Switching B off makes that patch darker.", "What explains the change at that patch?", "B supplied the light reaching that patch", ["Only A lit that patch","Switching B off enlarged the card's shadow","Both lamps were already blocked"], "Consider the light that could still reach the patch before lamp B was switched off.", "The card already blocked A at that patch. B supplied its remaining light, so switching B off made it darker."),
  reasoning("Trial A: card near lamp, shadow 30 cm. B: card farther away, shadow 15 cm. Only card position changed. In C, both card and screen moved; shadow 10 cm.", "Which comparison isolates card position?", "A with B, because the other positions match", ["B with C, because the shadows differ most", "A with C, because C has the smallest shadow", "Any pair, because every trial uses a card"], "A useful pair changes only the position being investigated.", "A and B keep lamp and screen positions fixed. C changes the screen too, so it cannot isolate card position in those comparisons."),
  reasoning("A screen must let light through but hide clear letters behind it. Sheet A passes light and blurs letters. B passes light and shows clear letters. C blocks light.", "Which sheet meets both requirements?", "A: it passes light while blurring letters", ["B: any light guarantees privacy","C: hiding letters is the only requirement","B and C: one requirement each"], "Check both conditions for each sheet, not just the amount of light or the privacy.", "A lets light through while blurring the view. B fails privacy; C fails the light requirement."),
  reasoning("Two sheets are stacked together. Light passes through, but letters look blurred. One of the sheets is known to be clear plastic.", "What would best check whether the other sheet causes the blur?", "Test it alone, keeping letters and light unchanged", ["Add another clear sheet over both sheets","Keep both sheets but enlarge the letters behind them","Compare its colour with frosted plastic"], "Separate the possible cause while keeping the viewing test the same.", "Testing the unknown sheet alone checks its effect. Changing letter size or adding sheets changes the comparison instead."),
  reasoning("A classroom magnet attracts iron, but not wood or copper. An unknown sample is also not attracted in the same test.", "Which conclusion is justified?", "Could be wood or copper", ["Wood: all metals attract","Only copper: it is a non-magnetic metal","Iron: no pull must mean repulsion"], "More than one known material gives the unknown sample's result.", "Both wood and copper were not attracted. The result cannot identify which of those materials the unknown sample might be."),
  reasoning("A magnet attracts red iron and blue iron. It attracts neither red wood nor blue wood. The samples have the same shape and size.", "Which explanation best fits these four results?", "Material, not paint colour, explains these results", ["Paint colour alone determines attraction","Blue paint blocks every magnetic pull","Matching shapes guarantee matching pulls"], "Compare both colours within each material, then compare materials of the same colour.", "Iron is attracted in both colours and wood in neither. In these tests, changing paint colour does not change the result."),
  reasoning("X and Y label ends of two bar magnets. X repels a labelled north pole. Y attracts X.", "Which pole and reasoning identify the other end of Y's bar?", "North: X is north, Y south, then opposite", ["North: X is south, Y north, then same","South: X is north, Y south, then same","South: X is south, Y north, then opposite"], "Identify X, infer the pole at Y, then switch to the opposite end of Y's bar.", "X is north because it repels north. Y is south because it attracts X. The other end of Y's magnet is north."),
  reasoning("Two bar magnets attract with north facing south. Both magnets are then turned end for end, leaving their other ends facing each other.", "Which interaction and pole reasoning are correct after both turns?", "Attraction: both turns leave unlike poles facing", ["Repulsion: only one facing pole changes","Repulsion: unlike poles repel","Attraction: the two facing ends are now alike"], "Track both facing ends, not just the end of the first magnet.", "The north end is replaced by south and the south by north. The facing poles are still unlike, so they attract."),
  reasoning("A hand pulls a trolley using a tight string without touching the trolley. In a separate test, a magnet pulls an iron clip across an empty gap.", "Which comparison describes the force paths?", "String: contact pull; magnet: pull across a gap", ["Both: non-contact because the hand misses the trolley","Both: contact because force always needs touching","String: non-contact; magnet: contact"], "Contact can pass through a connected string; compare that with the empty gap.", "The hand touches the string and the string touches the trolley. The magnet does not need that contact path to pull the clip."),
  reasoning("The same car rolls on surface A: 40 cm from a high release and 20 cm from a low release. On B it rolls 30 cm from high and 10 cm from low.", "Which pair tests height without changing surface?", "A high with A low", ["A high with B low", "A low with B high", "A high with B high"], "To test height, keep the surface the same and change the release height.", "A high and A low change only height. A high with B high tests surface; the other pairs change both."),
  reasoning("A uses car X on felt from a high mark. B uses X on plastic from the same mark. C uses car Y on plastic from a low mark. All are released without pushing.", "Which pair best tests the covering?", "A and B: only their coverings differ", ["B and C: matching plastic","A and C: different cars improve fairness","All three: releasing without pushing matches every condition"], "Match both car and release point before comparing different coverings.", "A and B change only the covering. C also changes car and release point, so it cannot give that same comparison."),
  reasoning("A car's wheels get stickier as it is used. A class tests felt first every time, then plastic.", "Which plan reduces the risk of confusing use-order with covering?", "Test both orders with matched cars and releases", ["Repeat only felt-then-plastic more often","Keep the order but push harder on plastic","Use different car models on each covering"], "Do not let just one covering always get the fresher wheels.", "Testing both orders prevents one covering always coming later. Matching the other conditions keeps the surface comparison useful."),
  reasoning("A roll starts at the 10 cm mark and ends at 40 cm. B starts at 0 cm and ends at 35 cm. The rest of the test is matched.", "Which roll travelled farther, and by how much?", "B by 5 cm", ["A by 5 cm", "A by 10 cm", "Both travelled the same distance"], "Subtract each starting reading before comparing the distances travelled.", "A travelled 40 - 10 = 30 cm. B travelled 35 - 0 = 35 cm, so B travelled 5 cm farther."),
  reasoning("A measuring tool adds the same extra amount to every length. A known 20 cm strip reads 25 cm. A new strip reads 35 cm on repeated checks.", "What is the new strip's actual length?", "30 cm; subtract the tool's fixed error", ["35 cm; repeated agreement removes the measurement error","40 cm; add the tool's fixed error","25 cm; copy the reading from the known strip"], "Use the known strip to find the extra amount, then correct the new reading.", "The error is 25 - 20 = 5 cm. Subtract it from 35 cm to get 30 cm. Repeating the tool does not remove its fixed error."),
  reasoning("The same 150 mL of water is poured from a narrow container into a wider one without spilling. Its surface is lower in the wider container.", "Which statement explains both the lower surface and the measurement?", "Same amount, different shape", ["Lower level means less water","Wider container means more water","The water's shape stayed fixed while its surface fell"], "Separate the height of the surface from the measured amount.", "Liquid water takes the container's shape. Spreading the same 150 mL more widely can lower its surface without removing water."),
  reasoning("A sealed syringe contains air. Its plunger moves inward and the air takes less space. No air escapes; releasing the plunger lets it move back.", "Which explanation fits?", "Air compresses without escaping", ["Air slips past the seal and returns on release","The air amount halves whenever its space halves","The plunger's movement alone proves some air escaped"], "Use the no-escape clue and the return movement together.", "The air stays trapped while its space becomes smaller. Returning when released fits compression, not the air disappearing."),
  reasoning("Ice plus jar A weighs 140 g; empty A weighs 100 g. The ice melts and all the water goes into jar B. Water plus B weighs 110 g; empty B weighs 70 g.", "What do the contents' masses show?", "Both have 40 g of water after subtracting jars", ["Water lost 30 g, matching the full readings' difference","Water gained 30 g: the jars differ","Water now weighs 110 g, including jar B"], "Remove each jar's mass before comparing its contents with the other contents.", "Before: 140 - 100 = 40 g of ice. After: 110 - 70 = 40 g of liquid water. Different jars explain the different full readings."),
  reasoning("A record shows ice becoming liquid, then water vapour, then liquid drops on a cold window.", "Which two changes happen after the melting?", "Evaporation, then condensation", ["Condensation, then evaporation", "Freezing, then melting", "Evaporation, then freezing"], "Track the start and end states of each later step; the final drops are liquid.", "Liquid to vapour is evaporation. Vapour to liquid drops is condensation, not freezing."),
  reasoning("Four dishes are compared: A is covered and warm, B open and warm, C covered and cool, D open and cool. Other conditions match.", "Which pair tests the cover while keeping temperature the same?", "A and B", ["A and D", "B and C", "A and C"], "Choose different cover conditions but matching temperatures.", "A and B are both warm and differ only in the cover. A and C keep the cover the same but change temperature."),
  reasoning("A sealed cold cup with water gets drops outside. An empty, dry, sealed cold cup also gets outside drops. A matching warm cup stays dry in the same humid room.", "What best explains the outside drops?", "Air supplies vapour that condenses on cold cups", ["Water leaks from inside","Coldness turns the air itself into water","Sealed cups collect drops at every temperature"], "The empty cold cup rules out needing water inside, and the warm cup gives another check.", "Water vapour in the air condenses on both cold cups. The air itself does not turn into water. The empty cup rules out leaking water from inside."),
  reasoning("The same drum is struck equally in two tests. A divider is added between drum and listener. The drum skin still vibrates, but the listener hears a quieter sound. Drum and listener stay put; only the divider changes.", "What change could explain the quieter sound?", "The divider reduces sound reaching the listener", ["The drum has stopped vibrating","The listener is now farther from the drum","The drum was struck more gently"], "The source action and positions match; look at the changed route to the listener.", "A divider can reduce sound reaching the listener while the source still vibrates. Quieter at the ear does not prove the source stopped."),
  reasoning("A: listener near a drum, soft strike. B: listener far, hard strike. C: listener far, soft strike. Drum and room are unchanged.", "Which pair best tests distance alone?", "A and C", ["A and B", "B and C", "Any pair because the drum is the same"], "Match the strike strength before comparing near and far listening positions.", "A and C both use a soft strike and differ in distance. A and B change two things; B and C test strike strength."),
];

const masterScience = [
  reasoning("A mirror is bright with only the torch on. It is also bright with only window light. When both light paths are blocked, it is dark.", "Which explanation fits all three tests?", "The mirror reflects light from either source", ["The torch is always needed","Both sources must reach the mirror together","The mirror shines using stored light"], "Check each claim against the torch-only, window-only and neither-source results.", "Each source works alone, so neither both sources together nor the torch alone is required. Darkness with neither fits reflection, not stored light."),
  reasoning("A lamp lights a book. Blocking lamp-to-book hides it. In a separate test, blocking book-to-eye also hides it, although the book stays lit. Other objects remain visible.", "What do the two tests support together?", "Both light routes must stay clear", ["Only the lamp-to-book route matters","A lit book can be seen through any blocked viewing route","Blocking either route switches off all the lamp's light"], "Each separate test blocks a different part of the route while other light still exists.", "The first test checks light arriving at the book. The second checks reflected light reaching the eye. This view needs both parts."),
  reasoning("Two lamps shine past a card onto a screen. Some patches lose light from just one lamp; an overlapping patch loses light from both lamps.", "Why is the overlap darkest?", "Neither lamp has an unblocked path to that patch", ["The overlap receives extra light from both lamps","Blocking one lamp blocks both","A card darkens every patch equally"], "Count the unblocked light sources at each kind of patch.", "A patch blocked from just one lamp can still receive light from the other. At the overlap, both lamp paths are blocked."),
  reasoning("A: near card, bright lamp, shadow 20 cm. B: far card, dim lamp, shadow 10 cm. C: near card, dim lamp, shadow 20 cm. The screen stays fixed.", "Which conclusion is supported by a matched comparison?", "B versus C shows a position effect", ["A and B isolate brightness alone","A and C show a smaller shadow after dimming","B and C isolate brightness with matching card positions"], "Use C to separate the two things that changed between A and B.", "B and C share the dim lamp and fixed screen but change card position. A and C also show no size change for their brightness change."),
  reasoning("An unknown sheet is inside a frosted cover. The pair passes light but blurs letters. Someone labels the unknown sheet frosted without taking it out.", "Which check is needed before that label is justified?", "Test the uncovered sheet", ["Repeat with both layers until the blur looks consistent","Brighten the lamp without removing either layer","Match the cover's and sheet's colours"], "A known source of blur is still present, so its effect has not been separated from the sheet's.", "The cover could cause the blur even if the sheet is clear. Testing the sheet alone separates the two possible causes."),
  reasoning("A privacy cover must pass light, blur letters and stop water passing. A does all but stop water. B does all three. C stops water and passes light, but shows clear letters.", "Which choice meets the whole design requirement?", "B only", ["A and B: light passes","B and C: they stop water","C: it gives the clearest view of the letters"], "Keep all three requirements when checking each result.", "A fails the water requirement and C fails privacy. Only B meets all three, not just a convenient pair of them."),
  reasoning("Two samples are either unmagnetised iron or bar magnets. A repels a labelled north pole. B is attracted by both poles of the labelled magnet.", "Which sample is proved to be a bar magnet?", "A only: ordinary iron attracts rather than repels", ["Both: either attraction or repulsion proves a magnet","B only: magnets always attract","Neither: iron and magnets both repel north"], "Compare the stronger evidence of repulsion with the attraction ordinary iron can also show.", "A's repulsion shows a magnetic pole acting against the labelled pole. B's attraction could come from ordinary iron, so that observation alone is not proof."),
  reasoning("Red iron is attracted; blue copper is not. One claim says red paint causes the pull. Another says the iron causes it.", "Which new sample best separates those claims?", "Red copper, same size and shape", ["Red iron with more paint","The same red iron and blue copper, tested again","A larger red iron sample"], "Choose a sample for which the two claims predict different outcomes.", "The paint claim predicts red copper will be pulled; the iron claim does not. Another red iron sample fits both claims and cannot separate them."),
  reasoning("X, Y and Z are ends of three bar magnets. X repels north. Y attracts X. Z repels Y.", "Which pole and reasoning identify the opposite end of Z's bar?", "North: X north, Y south, Z south, then opposite", ["North: X north, Y south, Z north, then same","South: X north, Y south, Z south, then same","South: X south, Y north, Z north, then opposite"], "Track X to Y to Z, then remember the opposite end has the opposite pole.", "X is north; Y must be south; Z is south because it repels Y. The other end of Z's bar is north."),
  reasoning("A labelled north end repels the unknown facing end of another bar magnet. First the labelled magnet turns end for end, then the unknown magnet also turns end for end.", "Which interaction and pole reasoning are correct after both turns?", "Repulsion: south faces south", ["Attraction: south faces north","Attraction: north faces south","Repulsion: north faces north"], "Infer the unknown starting pole, then track each turn separately.", "Repulsion shows both starting ends were north. One turn briefly gives unlike poles; after both turns south faces south, so they repel again."),
  reasoning("A magnet pulls a clip with a loose string attached. Removing the string does not stop the pull. Adding a fixed paper barrier with an air gap still lets the clip move towards the magnet.", "Which explanation fits all three tests?", "Magnetic pull crosses the gap without the string", ["The string carries every pull","The paper pushes the clip","The magnet must touch the clip"], "Use each changed setup to check which proposed force path can still be present.", "The string cannot explain the test without it. The remaining gap rules out a paper push or direct magnet contact; magnetic force can act across the gap."),
  reasoning("With matched releases, car A rolls 80 cm on smooth ground and 30 cm on rough ground. B rolls 50 cm on smooth and 40 cm on rough.", "Which comparison fits all four distances?", "A wins on smooth; B wins on rough", ["A wins on smooth; A wins on rough","B wins on smooth; B wins on rough","B wins on smooth; A wins on rough"], "Compare the cars within each surface before making one overall winner claim.", "On smooth ground 80 exceeds 50, so A goes farther. On rough ground 40 exceeds 30, so B goes farther. One winner does not fit both surfaces."),
  reasoning("Car A rolls 20 cm on felt and 35 cm on plastic. Car B rolls 30 cm on felt; its plastic result is missing. Release conditions match.", "What next comparison checks whether plastic also helps car B?", "B on plastic versus B on felt", ["B on plastic versus A on felt","A on plastic versus A on felt","A on plastic versus B on felt"], "The missing result must complete a same-car, same-release comparison.", "B on plastic supplies the missing matched result for B. A's result alone cannot settle whether B responds the same way."),
  reasoning("Felt first: 40 cm; plastic second: 30 cm. In a matched repeat with order reversed, plastic first: 40 cm; felt second: 30 cm.", "Which conclusion best fits?", "First rolls go farther; neither covering leads at matching positions", ["Felt gives longer rolls, whatever the trial order","Plastic gives longer rolls, whatever the trial order","Equal totals prove covering cannot affect any future roll"], "Group the results by order as well as by covering, without making an always claim.", "Each covering gives 40 cm first and 30 cm second. The coverings tie when compared in the same turn. These results show an order pattern, not a lead for either covering."),
  reasoning("Two rolls both start at the 5 cm mark. A ends at 37 cm and B at 32 cm. Someone records the end readings as distances, forgetting to subtract the start.", "What remains true after correcting the mistake?", "A travelled 5 cm farther", ["B travelled 5 cm farther","A travelled 10 cm farther","Both travelled the same distance"], "Subtract the same starting reading from each end, then compare the corrected results.", "A travelled 32 cm and B 27 cm. Their recorded distances were each 5 cm too large, but the difference is still 5 cm."),
  reasoning("Ten trials use car A on felt from a high mark and car B on plastic from a low mark. A goes farther every time.", "What is still needed before blaming the covering?", "Match car and starting height", ["Repeat the same unmatched pair","Compare only each car's longest roll","Average ten trials to remove car and height differences"], "Repeating a comparison does not remove differences built into every trial.", "Car, height and covering all differ. Repeats can show a consistent pattern while leaving its cause unclear; a matched test must separate the covering."),
  reasoning("A sealed syringe of air shrinks in volume under its plunger and expands again on release. A sealed syringe of water changes volume very little in the same kind of test.", "Which comparison is supported?", "Trapped air compresses more easily than trapped water", ["Less air space means less air remains inside","Both contents must compress equally","Returning air refills the syringe"], "A smaller volume need not mean less matter. Compare how both sealed contents respond.", "The seals keep the contents inside. Air is more easily compressed in this test; water's small volume change does not make it a solid."),
  reasoning("A sealed flexible bag of air shrinks when cooled and grows again when warmed. Its mass stays the same and the seal does not leak.", "Which explanation fits the mass and volume evidence together?", "The same trapped air changes volume, not mass", ["Cooling made some air escape","Warming added extra air","Unchanged mass proves unchanged volume"], "Mass tracks how much is present; the observations separately show a change in space occupied.", "The unchanged mass and intact seal support the same amount of trapped air. Its volume can change without requiring air to enter or leave."),
  reasoning("Ice in a sealed jar melts, keeps the same total mass, and later freezes back into ice. A pupil says the unchanged mass alone proves melting is reversible.", "Which evidence actually demonstrates the reversal?", "Refreezing shows the water returning to its earlier state", ["Unchanged mass proves reversal without needing to refreeze it","Keeping the jar sealed guarantees every change is reversible","Clear liquid proves the water has already changed back"], "Reversible means the state can change back; find the observation that shows it doing so.", "Refreezing shows the liquid returning to its earlier solid state. Unchanged mass alone does not show that a change can be reversed."),
  reasoning("Inside a sealed jar, liquid at the bottom decreases while drops form on a cold lid. No liquid splashes up, and the jar's total mass stays the same. The water stays below boiling temperature.", "Which route explains the water reaching the lid?", "Liquid evaporates; vapour condenses at the cold lid", ["Liquid evaporates; vapour freezes into liquid at the lid","Liquid condenses; vapour evaporates at the cold lid","Liquid boils; steam must bubble up to the lid"], "Explain both the water's movement without splashing and the absence of extra total mass.", "Evaporation can put water vapour into the jar's air. Condensation at the cold lid returns it to liquid, moving existing water rather than creating more."),
  reasoning("Dish A falls from 100 mL to 80 mL over 2 hours. B falls from 60 mL to 45 mL over 1 hour. Neither spills.", "Which has the greater water loss per hour over its recorded time?", "B: 15 mL per hour; A: 10", ["A: 20 mL per hour; B: 15","A: 80 mL per hour; B: 45","Both: the same loss per hour because each loses water"], "Find each lost amount, then account for the different recorded times.", "A loses 20 mL in 2 hours, or 10 mL per hour. B loses 15 mL in 1 hour, so its recorded loss per hour is greater."),
  reasoning("Drop tests use A: cold glass in humid air; B: cold metal in humid air; C: warm metal in dry air. Cup shape and test time match.", "Which extra setup allows separate checks of temperature and air moisture?", "Warm metal in humid air", ["Warm glass in dry air","Cold glass in dry air","Cold glass in humid air"], "Find a setup that differs from B in only temperature and from C in only air moisture.", "Warm metal in humid air can pair with B to test temperature and C to test moisture. The other proposed setups do not provide both matched comparisons."),
  reasoning("Matched drum strikes give meter A readings of 8 near and 4 far. Meter B gives 6 near and 2 far. The meters use different scales.", "What pattern do both meters support?", "Each meter reads higher near than far", ["Different scales prevent comparing near and far within either meter","Meter A reads higher far than near","Unequal near readings rule out distance effects"], "Compare near with far within each meter before comparing numbers between meters.", "A reads 8 above 4 and B reads 6 above 2. Both show the same near-far direction even though their scales give different numbers."),
  reasoning("A soft drum strike without a screen gives a sound reading of 4. A hard strike with a screen also gives 4. Someone says the screen has no effect.", "Which extra trial best checks that claim?", "Soft strike with screen, at the same meter position", ["Hard strike with screen, repeated at the same meter position","Hard strike with screen, moving the meter much closer","Soft strike without screen, using a different drum"], "Equal readings can hide the effects of two simultaneous changes. Match the strike to test the screen.", "A soft strike with the screen can be compared with the first soft strike without it. The original pair changes both strike strength and screen, so equal readings do not isolate the screen."),
];

function tierScience(base, level, index) {
  const row = [appliedScience, stretchScience, challengeScience, masterScience][level - 2][index];
  const position = (index + level - 1) % 4;
  const labels = [...row.distractors];
  labels.splice(position, 0, row.correct);
  return mcq(base.title, `${row.description} ${row.question}`, labels, String.fromCharCode(97 + position), row.clue, row.explanation, row.description);
}

const higherBands = [2, 3, 4, 5].flatMap((level) => foundation.map((base, index) => ({
  ...base, ...(base.forge === "maths" ? tierMath(base, level) : tierScience(base, level, index - 24)),
  id: `${base.taskId}-l${level}-v${base.variant}`, learningLevel: level,
  skill: base.taskId === "expansion-length-sort" ? "measurement-conversion" : base.skill,
  difficulty: ["Applied", "Stretch", "Challenge", "Master"][level - 2]
})));
export const EXPANDED_QUESTION_BANK = freeze([...foundation, ...higherBands]);

// Keep this server-local list aligned with the public roster, without importing answers into that roster.
const heroIds = ["relay", "helio", "volt", "bastion", "zephyr", "glacier", "ember", "tidal", "atlas", "nova", "echo"];
const bands = [1, 2, 3, 4, 5].map((level) => Array.from({ length: 6 }, (_, slot) =>
  EXPANDED_QUESTION_BANK.filter((q) => q.learningLevel === level && q.slot === slot)));

export function selectExpandedQuestions(matchNumber, heroId = "relay", learningLevel = 1) {
  if (!Number.isSafeInteger(matchNumber) || matchNumber < 1) throw new RangeError("Invalid match number");
  const heroOffset = heroIds.indexOf(heroId);
  if (heroOffset < 0) throw new RangeError("Invalid hero id");
  if (!Number.isInteger(learningLevel) || learningLevel < 1 || learningLevel > 3) throw new RangeError("Invalid learning level");
  // Reduce before adding offsets so MAX_SAFE_INTEGER remains an exact, valid input.
  const cycle = ((matchNumber - 1) % 8 + heroOffset) % 8;
  const variantIndex = Math.floor(cycle / 4);
  return bands[learningLevel - 1].map((questions, slot) => structuredClone(questions[((cycle + slot) % 4) * 2 + variantIndex]));
}

export function selectCampaignQuestions(matchNumber, heroId = "relay", learningLevel = 2) {
  if (!Number.isInteger(learningLevel) || learningLevel < 2 || learningLevel > 3) throw new RangeError("Invalid campaign starting level");
  // Reuse v2's validated, deterministic rotation without changing its saved-game contract.
  selectExpandedQuestions(matchNumber, heroId, learningLevel);
  const offset = ((matchNumber - 1) % 8 + heroIds.indexOf(heroId)) % 8;
  const usedTasks = new Set();
  return Array.from({ length: 5 }, (_, forgeIndex) => {
    const level = Math.min(5, learningLevel + forgeIndex);
    const firstSlot = forgeIndex % 2 === 0 ? 0 : 3;
    return [0, 1, 2].map((position) => {
      const candidates = bands[level - 1][firstSlot + position];
      const start = (offset + position + forgeIndex) % candidates.length;
      const question = Array.from({ length: candidates.length }, (_, i) => candidates[(start + i) % candidates.length])
        .find((candidate) => !usedTasks.has(candidate.taskId));
      if (!question) throw new RangeError("Campaign question bank exhausted");
      usedTasks.add(question.taskId);
      return { ...structuredClone(question), forgeStage: forgeIndex + 1 };
    });
  }).flat();
}
