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

function tierScience(base, level, index) {
  const row = (level === 2 ? appliedScience : stretchScience)[index];
  const position = (index + level - 1) % 4;
  const labels = [...row.distractors];
  labels.splice(position, 0, row.correct);
  return mcq(base.title, `${row.description} ${row.question}`, labels, String.fromCharCode(97 + position), row.clue, row.explanation, row.description);
}

const higherBands = [2, 3].flatMap((level) => foundation.map((base, index) => ({
  ...base, ...(base.forge === "maths" ? tierMath(base, level) : tierScience(base, level, index - 24)),
  id: `${base.taskId}-l${level}-v${base.variant}`, learningLevel: level,
  skill: base.taskId === "expansion-length-sort" ? "measurement-conversion" : base.skill,
  difficulty: level === 2 ? "Applied" : "Stretch"
})));
export const EXPANDED_QUESTION_BANK = freeze([...foundation, ...higherBands]);

// Keep this server-local list aligned with the public roster, without importing answers into that roster.
const heroIds = ["relay", "helio", "volt", "bastion", "zephyr", "glacier"];
const bands = [1, 2, 3].map((level) => Array.from({ length: 6 }, (_, slot) =>
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
