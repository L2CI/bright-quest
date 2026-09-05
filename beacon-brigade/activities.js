// Optional fun stops, separate from curriculum, scores, rewards and saved history.
function deepFreeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

export const ACTIVITY_SITES = deepFreeze([
  { id: "jokes", name: "Joke Jetty", icon: "smile", description: "Take a break for a silly joke.",
    colour: 0xf2b544, symbol: "J", position: [-13, 0, 14] },
  { id: "riddles", name: "Riddle Nook", icon: "lightbulb", description: "Pick apart a small word puzzle.",
    colour: 0xd96ba0, symbol: "?", position: [16, 0, -18] },
  { id: "lookout", name: "Lookout", icon: "binoculars", description: "Read a tiny scene and spot a clue.",
    colour: 0x48b59a, symbol: "O", position: [-8, 0, -15] },
  { id: "numbers", name: "Number Trail", icon: "footprints", description: "Follow a playful number pattern.",
    colour: 0x609ee8, symbol: "#", position: [19, 0, 13] }
]);

function joke(id, prompt, answer, explanation) {
  return { id, prompt, answer, explanation };
}

function choice(id, prompt, texts, correctIndex, explanation) {
  const options = texts.map((text, index) => ({ id: `${id}-${index + 1}`, text }));
  return { id, prompt, answer: texts[correctIndex], explanation,
    options, correctOption: options[correctIndex].id };
}

// Traditional joke wordplay; original questions with self-contained observations.
export const ACTIVITY_CONTENT = deepFreeze({
  jokes: [
    joke("jokes-boot", "Why couldn't the bicycle stand up by itself?",
      "It was two-tired!", "Two tyres sounds like too tired. A bicycle has two tyres."),
    joke("jokes-beacon", "What do you call a sleeping dinosaur?",
      "A dino-snore!", "Dino-snore sounds like dinosaur, with a snore added for sleep."),
    joke("jokes-sandwich", "Why did the banana go to the doctor?",
      "It wasn't peeling well!", "Peeling sounds like feeling. A banana has a peel."),
    joke("jokes-map", "Why was the maths book sad?",
      "It had too many problems!", "Problems can mean worries or maths questions. A maths book is full of questions."),
    joke("jokes-cloud", "What did the ocean say to the beach?",
      "Nothing. It just waved!", "A wave can be a greeting or moving water in the ocean."),
    joke("jokes-pebble", "What do you call a bear with no teeth?",
      "A gummy bear!", "A mouth without teeth has gums. A gummy bear is also a chewy sweet."),
    joke("jokes-ladder", "What do you call a pig that knows karate?",
      "A pork chop!", "Pork comes from pigs. A chop is both a cut of meat and a karate move."),
    joke("jokes-kite", "Why did the teddy bear say no to dessert?",
      "It was already stuffed!", "Stuffed means very full after eating. A teddy bear is also filled with stuffing.")
  ],
  riddles: [
    choice("riddles-zip", "I have two rows of teeth on a coat. Pull my tab and I join them. What am I?",
      ["A comb", "A zip", "A fork"], 1,
      "A zip has two rows of teeth. Its tab pulls them together to close a coat."),
    choice("riddles-soap", "I am a bar by the sink. Rub me with water for bubbles and clean hands. What am I?",
      ["Soap", "Chalk", "A sponge"], 0,
      "A bar of soap makes bubbles with water and helps clean hands."),
    choice("riddles-shadow", "I copy your shape on the ground when you block sunlight. I have no face or clothes. What am I?",
      ["A footprint", "A puddle", "A shadow"], 2,
      "Your body blocks the light. The dark shape on the ground is your shadow."),
    choice("riddles-envelope", "I am a paper pocket. Put a letter in me, seal my flap and add a stamp. What am I?",
      ["A book", "An envelope", "A cup"], 1,
      "An envelope holds a letter. Its flap seals it shut for the post."),
    choice("riddles-ice", "I am a cube of frozen water. Leave me in a warm cup and I turn to water. What am I?",
      ["An ice cube", "A sugar cube", "A glass bead"], 0,
      "An ice cube is frozen water. It melts back into water as it warms."),
    choice("riddles-ruler", "I have straight edges and marks for centimetres. Lay me by a leaf to find its length. What am I?",
      ["A spoon", "A clock", "A ruler"], 2,
      "The marks on a ruler measure length in units such as centimetres."),
    choice("riddles-key", "I am a small metal tool with teeth. Turn me in a lock to open a door. What am I?",
      ["A key", "A brush", "A coin"], 0,
      "A key has a shape that fits its lock. Turning the right key unlocks it."),
    choice("riddles-watering-can", "I hold water for plants. Tip my handle and water runs out through my spout. What am I?",
      ["A flowerpot", "A watering can", "A raincoat"], 1,
      "A watering can holds water and has a spout to pour it onto plants.")
  ],
  lookout: [
    choice("lookout-flags", "Three flags hang in a row: red, blue, yellow. Which colour is between the other two?",
      ["Yellow", "Red", "Blue"], 2,
      "Blue is second in the row. Red is on one side and yellow is on the other."),
    choice("lookout-boats", "A green boat has a square sail. A white boat has a round sail. Which boat has the round sail?",
      ["The white boat", "The green boat", "Both boats"], 0,
      "The scene says the white boat has the round sail. The green boat has a square sail."),
    choice("lookout-bench", "A bench holds a dry hat, a wet scarf and a dry bag. Which item is wet?",
      ["The hat", "The scarf", "The bag"], 1,
      "Only the scarf is called wet. The hat and bag are both dry."),
    choice("lookout-lights", "At dusk, the gate lamp is off, the hut lamp is on and the dock lamp is off. Which lamp is on?",
      ["The gate lamp", "The dock lamp", "The hut lamp"], 2,
      "The hut lamp is on. Both the gate lamp and the dock lamp are off."),
    choice("lookout-leaves", "On a tray lie a long green leaf, a round green leaf and a long red leaf. Which leaf is round?",
      ["A green leaf", "The red leaf", "All three leaves"], 0,
      "The round leaf is green. The red leaf and the other green leaf are long."),
    choice("lookout-boxes", "A blue box is shut. A red box is open. A yellow box is shut. Which box lets you see inside?",
      ["The blue box", "The red box", "The yellow box"], 1,
      "The red box is open, so you can see inside. The other two boxes are shut.")
  ],
  numbers: [
    choice("numbers-hops", "Hop along stones, adding 2 each time: 2, 4, 6, __. What number comes next?",
      ["7", "8", "10"], 1,
      "Each hop adds 2. After 6, another 2 makes 8."),
    choice("numbers-countdown", "A launch chant goes down by 3 each time: 12, 9, 6, __. What comes next?",
      ["3", "4", "0"], 0,
      "Take 3 away from 6 to get 3. The chant goes 12, 9, 6, 3."),
    choice("numbers-claps", "Repeat this clap code: 1, 2, 2, 1, 2, 2, __. Which number starts the next repeat?",
      ["2", "3", "1"], 2,
      "The code repeats the group 1, 2, 2. Each new group starts with 1."),
    choice("numbers-double", "Each new lantern row has twice as many lights: 1, 2, 4, __. How many lights are next?",
      ["6", "8", "5"], 1,
      "Twice 4 is 4 plus 4, which makes 8 lights."),
    choice("numbers-lock", "A toy lock needs a whole number greater than 4 and less than 8. It must be even. Which number fits?",
      ["6", "5", "8"], 0,
      "The whole numbers between 4 and 8 are 5, 6 and 7. Only 6 is even."),
    choice("numbers-shells", "Two bowls must each hold 5 shells. One bowl is full. The other has 3. How many shells does that bowl need?",
      ["3", "5", "2"], 2,
      "The bowl has 3 and needs 5. Add 2 shells because 3 plus 2 is 5.")
  ]
});

// Zero-based safe integer indices cycle forward; invalid input has no item.
export function getActivityItem(siteId, index) {
  if (typeof siteId !== "string" || !Object.hasOwn(ACTIVITY_CONTENT, siteId)
    || !Number.isSafeInteger(index) || index < 0) return null;
  const items = ACTIVITY_CONTENT[siteId];
  return items[index % items.length];
}

export function checkActivityAnswer(siteId, index, optionId) {
  if (typeof optionId !== "string") return false;
  const item = getActivityItem(siteId, index);
  return Boolean(item?.options?.some((option) => option.id === optionId)
    && item.correctOption === optionId);
}
