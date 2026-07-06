import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const userHome = process.env.USERPROFILE || "C:\\Users\\gupta";
const courseDir = path.join(root, "chemistry-training", "chemistry-101-winter-2026");
const coursePath = path.join(courseDir, "data", "chemistry-101-course.json");
const assetDir = path.join(courseDir, "assets");
const renderRoot = path.join(root, "outputs", "chemistry-longform-render");
const ffmpeg = path.join(userHome, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffmpeg.exe");
const ffprobe = path.join(userHome, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffprobe.exe");
const width = 1280;
const height = 720;
const fps = 2;
const release = "chemistry-101-winter-2026-004";

const voiceInstructions = [
  "Speak like the existing Bright Quest Chemistry teacher: warm, energetic, clear, precise, and beside a bright Grade 4-5 child.",
  "Use the same lively Chemistry 101 cadence: brisk but understandable, with short natural pauses before evidence reveals.",
  "Keep humour dry and quick. Never sound cartoonish, sleepy, robotic, or over-performed.",
  "Treat each sentence as if a chalkboard animation beat is being drawn at the same time."
].join(" ");

const chapters = [
  {
    id: "mystery-of-stuff",
    number: 6,
    title: "The Mystery of Stuff",
    shortTitle: "Stuff",
    durationTarget: 375,
    visualType: "property-table",
    learningOutcome: "Compare everyday materials by observable properties before using tiny-particle models.",
    palette: ["#16324f", "#2dd4bf", "#facc15", "#fb7185"],
    boards: [
      "evidence table", "object versus material", "property detective", "three spoons", "best for the job",
      "student question", "science notebook", "fair comparison", "test handoff"
    ],
    segments: [
      "Watch this table before we use any big chemistry words. A glass cup. A metal spoon. A wool jumper. A plastic bottle. A sheet of paper. They sit in the same room, but they are not the same kind of stuff. The first job is not to guess the invisible answer. The first job is to notice what is right in front of us. What can you see, touch, bend, shine light through, or compare safely?",
      "A student might ask, is everything just one kind of thing with different shapes? Good question. Let us sort before we guess. A cup is an object. Glass is a material. A spoon is an object. Metal is a material. A jumper is an object. Fibre is a material. The object name tells what it is for. The material name tells what it is made from. Chemistry needs both.",
      "Now we need a property detective. A property is a clue you can test. Does it bend? Does it let light through? Does it soak up water? Does a magnet stick to it? Notice what is happening on the board. We are not saying, this material feels sciencey. We are asking one testable question at a time, and we are writing down the answer.",
      "Here is the trick. A spoon shape is not the same as spoon material. A wooden spoon, a metal spoon, and a plastic spoon can all be spoon-shaped. But put them near warm soup, and they behave differently. The metal spoon can carry heat along itself more easily. The wooden spoon is usually more comfortable to hold. Same shape, different material, different job.",
      "Best for what job is the real materials question. A raincoat needs a material that does not soak up water quickly. A window needs a material that lets light through. A pan handle should not quickly carry heat into your hand. A wire needs a material that lets electricity move through it. We are still not starting with atoms. We are starting with evidence.",
      "Now a quick interruption. Suppose a student says, but surely the tiny answer is what really matters. Yes, eventually. But if we jump to tiny answers too early, we can make confident mistakes. Scientists earn models by collecting evidence first. The model is coming. Today we are building the habits that make the model useful instead of random.",
      "Now the important move: write what you noticed, not what you hoped. A good science notebook row has an object, a material, a property, and evidence. Spoon, metal, shiny and magnetic? Careful: many metals are magnetic, but not all. That is why the evidence column matters. The board is not asking for a perfect memory. It is asking for a careful observation.",
      "Let me test that idea with two mystery tiles. Tile A bends a little and does not let water soak in. Tile B is stiff and soaks up water quickly. If the job is a rain cover, which one would you test next? You do not need to know the secret name yet. You can reason from properties. That is a grown-up science move.",
      "So the chapter rule is simple. Observe first. Compare fairly. Name the material. Name the property. Give the evidence. Soon we will use a model for tiny pieces of matter, but not before the evidence has earned it. The chapter test will ask you to sort objects from materials, choose useful properties, and explain why evidence beats guessing."
    ],
    tests: [
      q("What is a material?", ["The stuff an object is made from", "A guess with no evidence", "Only an invisible particle", "A video control"], 0, "materials", "A material is the stuff an object is made from."),
      q("Which pair separates object from material?", ["Spoon and metal", "Warm and warmer", "Question and answer", "Shadow and reflection"], 0, "object-material", "A spoon is an object; metal can be its material."),
      q("Which is a testable property?", ["Lets light through", "Looks sciencey", "Has a secret answer", "Feels important"], 0, "properties", "Letting light through is a property you can test."),
      q("Why compare wooden, metal, and plastic spoons?", ["Same shape can use different materials", "Only metal is matter", "Wood is always invisible", "Plastic has no properties"], 0, "comparison", "The same object shape can be made from different materials."),
      q("Which property helps choose a raincoat?", ["Waterproof", "Magnetic", "Lets light through", "Tastes sweet"], 0, "materials-use", "A raincoat should resist water."),
      q("What belongs in the evidence column?", ["What you observed", "Only what you hoped", "A random word", "The longest answer"], 0, "evidence", "Evidence is what you observed or measured."),
      q("Why not start with invisible particles immediately?", ["Models work best after evidence", "Particles are never useful", "Observation is forbidden", "Materials cannot be compared"], 0, "models", "Evidence makes later models meaningful."),
      q("A fair comparison should test...", ["one main clue at a time", "every clue randomly", "nothing at all", "only the funniest material"], 0, "fair-test", "Testing one clue at a time makes the comparison clearer."),
      q("Which job needs transparent material?", ["Window", "Raincoat", "Pan handle", "Notebook cover"], 0, "properties", "A window needs material that lets light through."),
      q("Best first chemist move:", ["Observe and compare", "Guess and defend it", "Skip the evidence", "Memorise equations"], 0, "reasoning", "Chemistry begins with careful observation and comparison.")
    ]
  },
  {
    id: "solid-liquid-gas",
    number: 7,
    title: "Solid, Liquid or Gas?",
    shortTitle: "States",
    durationTarget: 390,
    visualType: "state-containers",
    learningOutcome: "Classify solids, liquids and gases by behaviour, including shape, flow and space taken up.",
    palette: ["#12324a", "#38bdf8", "#a7f3d0", "#facc15"],
    boards: [
      "three objects no labels", "solid shape test", "liquid shape test", "air takes space", "jelly tricky case",
      "word map", "vapour precision", "sort examples", "test handoff"
    ],
    segments: [
      "Do not memorise the words first. Watch how each one behaves. On the board we have a wooden block, a cup of water, and a balloon full of air. No labels yet. If we name the words too early, the words can hide the evidence. Today the evidence comes first. What keeps its own shape? What changes shape? What spreads through the space it gets?",
      "Start with the block. Move it from a tray to a box. The block still has its own shape. It can be turned, lifted, stacked, and moved, but it does not pour into the corner of the box. That is the main solid clue. A solid usually keeps its own shape. Some solids are soft or bendy, but they still do not flow like water.",
      "Now watch the water. Pour it from a narrow cup into a wide bowl. The amount is meant to stay the same, but the shape changes. The water takes the shape of the container. That is the liquid clue. A liquid can flow. It does not keep one fixed shape, but it still takes up space. If the cup is full, you cannot also put the same space full of juice there.",
      "Now air. We are not using particle dots yet, because the model-warning chapter comes next. For now, use macroscopic evidence. The balloon grows because air takes up space. A plunger pushes against a shaded air region because the air is there and can push back. Invisible does not mean nothing. Arrows show where the invisible gas goes; they are not particles and not decoration.",
      "A student might say, but jelly is wobbly, so is it a liquid? Good interruption. Jelly is a tricky soft solid for our purposes. One clue is not enough. It wobbles, but it does not pour like water into a new container. That is why the board has a tricky lane. In science, tricky examples are not annoying. They are useful because they make us test our words.",
      "Now we can name the states. Solid: usually keeps its own shape. Liquid: flows and takes the container shape. Gas: spreads through the available space. Notice how late the labels arrived. That is deliberate. The words are not magic badges. They are names for behaviour we already watched.",
      "One more precision move. People often call the cloudy stuff above hot water steam. Visible mist is actually tiny liquid water droplets floating in air. Water vapour itself is invisible gas. The arrows on this board show where invisible water vapour goes. The little mist marks are liquid droplets. Hot water examples are app-only or adult-only; you do not handle steam in a child task.",
      "Let us sort examples. Ice cube: solid. Juice: liquid. Air in a tyre: gas. Honey: liquid, but slow. Sponge: tricky solid with air pockets. That last one matters. A sponge can hold air and water, but the sponge material itself is still a solid. Sorting is not about one quick look. It is about behaviour and evidence.",
      "The chapter test will ask about shape, flow, space, and tricky cases. If your brain says gas is nothing, remember the balloon and the plunger. If your brain says wobbly means liquid, remember the jelly and sponge. We classify by evidence, not by the first word that feels right."
    ],
    tests: [
      q("A solid usually...", ["keeps its own shape", "fills every space", "has no evidence", "must be invisible"], 0, "solid", "A solid usually keeps its own shape."),
      q("A liquid usually...", ["flows and takes the container shape", "keeps one fixed shape", "takes no space", "is always a gas"], 0, "liquid", "A liquid flows and takes the shape of its container."),
      q("A gas usually...", ["spreads through available space", "stays as one hard block", "is not matter", "cannot push"], 0, "gas", "A gas spreads through available space."),
      q("Why is air counted as matter here?", ["It takes space and can push back", "It is a shadow", "It has a colour label", "It cannot be tested"], 0, "gas-evidence", "Air gives evidence by filling space and pushing back."),
      q("Why is jelly a tricky example?", ["One clue is not enough", "It proves all solids pour", "It is not matter", "It is water vapour"], 0, "classification", "Jelly is a soft solid, so test more than one clue."),
      q("What is visible mist above hot water?", ["Tiny liquid droplets", "Invisible water vapour itself", "A solid block", "A safe child-led steam task"], 0, "vapour", "Visible mist is condensed liquid droplets; water vapour is invisible."),
      q("What do arrows show in the gas scene?", ["Where invisible gas goes", "Real particles before the model lesson", "A flame", "A decoration only"], 0, "model-boundary", "Before the model lesson, arrows show gas movement at a macroscopic level."),
      q("How should sponge be sorted here?", ["Tricky solid with air pockets", "Pure gas", "A liquid because it can hold water", "Not matter"], 0, "tricky-case", "The sponge material is a solid with air pockets."),
      q("Why are labels added late?", ["Evidence should come before vocabulary", "Labels are not allowed", "The words are not important ever", "The quiz writes them"], 0, "evidence", "The lesson watches behaviour before naming it."),
      q("Best state-classification question:", ["How does it behave?", "Which word is longest?", "Is it drawn in blue?", "Can I ignore tricky examples?"], 0, "reasoning", "State words describe behaviour.")
    ]
  },
  {
    id: "tiny-particles-big-clues",
    number: 8,
    title: "Tiny Particles, Big Clues",
    shortTitle: "Particles",
    durationTarget: 405,
    visualType: "particle-models",
    learningOutcome: "Use simple particle models to explain why solids, liquids and gases behave differently.",
    palette: ["#172554", "#c084fc", "#67e8f9", "#facc15"],
    boards: [
      "model warning", "why models help", "solid model", "liquid model", "gas model",
      "student challenge", "evidence match", "model limits", "test handoff"
    ],
    segments: [
      "Now we are ready for the tiny-particle model. Watch this carefully. These dots are not a photograph. No microscope took this picture. The dots are a model. A model is a thinking tool that leaves out many details so one pattern becomes easier to see. We use it because Chapter 7 gave us evidence that needs explaining.",
      "The evidence cards come back first. A solid keeps shape. A liquid pours. A gas fills a balloon. Those facts are visible. The model is our attempt to explain them. That order matters. Evidence first, model second. If the model helps explain several pieces of evidence at once, it earns its place on the board.",
      "Start with a solid model. The dots draw close together in mostly fixed places. They wiggle a little, because particles are not frozen statues, but they do not wander away from their neighbours. That helps explain why a block keeps its shape. The label appears late: close, fixed places, tiny vibration.",
      "Now the liquid model. The dots are still close together, but the arrangement is not a neat fixed grid. They can slide past each other. That helps explain pouring. A liquid changes shape because the pieces can move around one another, but it does not become nothing. The amount of stuff is still there.",
      "Now gas. The dots are spread far apart in a larger space. They move through the available space, which helps explain the balloon and the plunger from Chapter 7. This is the first chapter where particle dots are allowed, because now the safety rail is in place: model, not photograph.",
      "A student might say, so are the dots exactly what particles look like? No. That is the trap. A dot model shows arrangement and movement. It does not show exact size, exact colour, wetness, smell, or every force. The model is useful because it explains evidence, not because it is a tiny portrait.",
      "Let us match evidence to model. Keeps shape connects to close particles in fixed places. Pours connects to close particles that slide. Fills the available space connects to spread-out moving particles. If a line connects to the wrong model, the board gently corrects it and asks which behaviour the evidence actually showed.",
      "Now the model limits. Do not imagine water particles as tiny wet drops. Do not imagine ice particles as tiny ice cubes. Do not imagine gas particles as coloured balloons. The dot is a symbol. It means a tiny piece of matter in a model. The job is to compare spacing and motion.",
      "The chapter test will check whether you can use the model without overbelieving it. You will match behaviour to solid, liquid, and gas models. You will also spot the careful sentence: these dots help us think, but they are not exact photographs of particles."
    ],
    tests: [
      q("Particle dots in this lesson are...", ["a model", "exact photographs", "always wet", "visible particles on the page"], 0, "models", "The dots are a model, not a photograph."),
      q("Why does the model come after Chapter 7 evidence?", ["Models should explain evidence", "Evidence is useless", "Words come before observations", "The model replaces all tests"], 0, "model-use", "The model is useful because it explains observed behaviour."),
      q("Solid particles are shown as...", ["close and mostly fixed", "far apart only", "gone", "giant wet drops"], 0, "solid-model", "The solid model shows close particles in mostly fixed places."),
      q("Liquid particles are shown as...", ["close but able to slide", "locked forever", "not matter", "always square"], 0, "liquid-model", "The liquid model shows close particles that can slide."),
      q("Gas particles are shown as...", ["spread out in available space", "a fixed grid", "not moving at all", "wet drops"], 0, "gas-model", "The gas model shows spread-out particles."),
      q("Which evidence matches a liquid model?", ["It pours", "It keeps a fixed block shape", "It is a shadow", "It cannot move"], 0, "evidence-match", "Pouring matches close particles that can slide."),
      q("What does the dot model mainly show?", ["spacing and motion", "exact colour and smell", "wetness", "the real photograph"], 0, "model-limits", "This model focuses on spacing and motion."),
      q("Which statement is careful?", ["The dots help us think", "The dots are exact photos", "Single water particles are wet", "Gas particles are tiny balloons"], 0, "misconception", "The dots help us think; they are not exact pictures."),
      q("Why does a gas fill a balloon?", ["The model shows particles spread through space", "It has no matter", "It becomes a solid", "The label pushes it"], 0, "gas-model", "Spread-out particles explain gas filling space."),
      q("A good model earns its place by...", ["explaining evidence", "looking fancy", "showing everything", "removing questions"], 0, "reasoning", "A useful model explains evidence.")
    ]
  },
  {
    id: "heat-particles-dance",
    number: 9,
    title: "Heat Makes Particles Dance",
    shortTitle: "Heat",
    durationTarget: 405,
    visualType: "heat-transfer",
    learningOutcome: "Describe warming, cooling and temperature change using safe observations and particle motion models.",
    palette: ["#2b1d13", "#f97316", "#facc15", "#38bdf8"],
    boards: [
      "spoon touching cup", "heat through contact", "thermometer reading", "student question", "wiggle model",
      "cooling", "safe setup", "predict direction", "test handoff"
    ],
    segments: [
      "Watch the setup carefully. The spoon is touching the warm cup. That contact matters. Heat is not a magic beam leaping across an empty board. In this example, the warmer cup can transfer heat into the cooler spoon through the place where they touch. The yellow arrows travel through the contact point, not through random air.",
      "Now the spoon warms. The board shows the cup first, then the spoon, then the contact point, then the heat arrows. The evidence question is: which object was warmer, which was cooler, and which way did the heat move? For this chapter, keep the rule concrete: heat can move from warmer things to cooler things.",
      "A thermometer now enters the story. The same thermometer is dipped into warm water, then cool water, and the number changes. The thermometer measures how warm the spoon is. Heat is the thing that travels into the spoon and makes that number go up. Temperature is the reading. Heat is what moves.",
      "A student might ask, so heat is the number? Good interruption. No. The number tells us how warm something is. Heat is the energy moving from the warmer object to the cooler object. We are keeping the language careful because this idea is hard even for older learners. Number: temperature. Moving warmth: heat transfer.",
      "Now we use the particle model. Both sides use the same dot colour, because we are not teaching hot dots and cold dots. We vary only the wiggle. On the cooler side, the dots wiggle gently. On the warmer side, the same kind of dots jiggle more. The movement changes; the dots do not become different substances.",
      "Cooling is the reverse evidence story. Put a warm object in a cooler place, and heat can move away. The particle motion in the model becomes less energetic, but the dots never stop completely. Never draw frozen-dead particles. The careful sentence is: cooling can make particle motion slow down.",
      "Safety now. Use warm tap water only, and a parent checks first. No boiling water, no flame, no hot glass, no closed container heating. This is a training chapter, not a kitchen hazard challenge. The board draws a parent icon, a warm tap-water icon, and a no-boiling symbol before any optional observation is mentioned.",
      "Let us predict direction. Warm hand touches cool cup: which way does heat move at first? Warm room around a cold bottle: what warms what? If a learner predicts cool to warm, the wrong arrow gently shakes, then redraws from warmer to cooler. Wrong answers are useful when the correction is visible.",
      "The chapter test will ask you to separate the thermometer reading from heat transfer, choose the direction of heat movement, and spot the safe setup. Remember the contact point, the thermometer sentence, and the same-colour particle dots with different wiggle sizes."
    ],
    tests: [
      q("In the cup and spoon example, the spoon should be...", ["touching the cup", "floating far away", "inside a flame", "inside a closed hot bottle"], 0, "heat-contact", "The animation shows heat transfer through contact."),
      q("Heat can move from...", ["warmer to cooler", "cooler to warmer only", "a shadow to a label", "nothing to nothing"], 0, "heat-transfer", "Heat can move from warmer things to cooler things."),
      q("Temperature is...", ["the thermometer reading", "a material name", "a particle photograph", "a quiz score"], 0, "temperature", "Temperature tells how warm something is."),
      q("What does a thermometer reading tell us?", ["how warm something is", "how much heat is stored as a number", "that particles turned into heat dots", "that boiling water is child-led"], 0, "temperature", "The thermometer gives a temperature reading."),
      q("In the particle model, warmer particles should...", ["move more", "change colour into hot dots", "stop completely", "vanish"], 0, "particle-motion", "Use the same dot colour and vary motion."),
      q("Cooling can make particle motion...", ["slow down", "stop forever", "become exact photos", "turn into labels"], 0, "cooling", "Cooling can slow particle motion."),
      q("Which setup is safe for a child-led observation?", ["Warm tap water with a parent", "Boiling water alone", "Hot oil", "Heating a closed container"], 0, "safety", "Warm tap water with a parent is the safe option."),
      q("A warm hand rests on a cool cup. Which way does heat move?", ["from the warmer hand to the cooler cup", "from the cup to the warmer hand", "nowhere", "from the label to the hand"], 0, "prediction", "Heat moves from the warmer object toward the cooler object."),
      q("Why keep particle dots the same colour?", ["To avoid teaching hot particles as different particles", "Because colour is forbidden", "Because particles are exact photos", "Because cold dots vanish"], 0, "model-limits", "The model varies motion, not dot identity."),
      q("Best heat reasoning question:", ["What was warmer, what was cooler, and what touched?", "Which arrow looked brightest?", "Can I use boiling water?", "Did the thermometer become heat?"], 0, "reasoning", "Warm/cool evidence and contact explain heat transfer.")
    ]
  },
  {
    id: "melting-not-disappearing",
    number: 10,
    title: "Melting Is Not Disappearing",
    shortTitle: "Melting",
    durationTarget: 390,
    visualType: "melting-model",
    learningOutcome: "Explain melting and freezing as state changes where the material remains present.",
    palette: ["#082f49", "#38bdf8", "#f0f9ff", "#facc15"],
    boards: [
      "ice evidence", "shape changes", "student says gone", "same stuff", "particle model",
      "freezer reverse", "other examples", "safe home option", "test handoff"
    ],
    segments: [
      "Start with an ice cube on a plate. Do not rush to the word melting yet. Watch the evidence. The cube has edges. It has a shape. It is solid water. The timer starts, and the board slowly changes the cube outline into a puddle. Something clearly changed, but the question is what changed.",
      "The shape changed. The state changed. The material did not disappear. This is the key correction. The label water stays attached to both pictures: solid water on the left, liquid water on the right. The cube shape is gone, but the water is still there. That is why the board refuses to use the word vanished.",
      "A student might say, but the cube is gone. That is a good everyday sentence, but it is not precise enough for science. The cube shape is gone. The water is not gone. Chemistry often asks us to repair normal speech so the idea becomes more exact.",
      "Now compare before and after. Before: solid water, fixed shape. After: liquid water, new shape. Same stuff, new state. The board draws a balance-style picture, not to measure mass perfectly, but to remind us that a change in appearance is not the same as deletion.",
      "Now the particle model can help. In the solid model, the dots sit close in fixed places and wiggle. Add heat, and the model redraws as close dots that can slide. The dots are the same colour and size. The arrangement and motion change. That is the story of melting at this level.",
      "Let me test the idea backwards with a freezer. Put liquid water in a freezer, and heat moves away from the water into the colder surroundings. Over time, the liquid can become solid ice again. Freezing is liquid to solid. The home freezer is the concrete heat-removal example; no hot equipment is needed.",
      "Other materials can melt too. Butter softens. Chocolate melts. Wax can melt. The lesson does not ask you to heat wax or use flames. The examples are app visuals. The important idea is that melting is not a special trick only water can do. Melting means solid to liquid when conditions are right.",
      "Safe home option: sealed bag of ice, a plate, a timer, and a notebook, with a parent nearby. No hot water is needed. The observation is slow, but slow is useful. You can sketch the cube at the start, middle, and end, then write the evidence: same material, new state.",
      "The chapter test will ask whether melting means disappearing, what freezing does, and why the same water label follows the ice and puddle. Keep this sentence ready: the material stayed, the state changed."
    ],
    tests: [
      q("Melting changes...", ["solid to liquid", "liquid to solid", "gas to nothing", "sound to shadow"], 0, "melting", "Melting is solid to liquid."),
      q("When ice melts, what is gone?", ["the cube shape", "all the water", "all matter", "all evidence"], 0, "misconception", "The cube shape is gone; the water remains."),
      q("Which label belongs on both ice and puddle?", ["water", "new metal", "not matter", "steam only"], 0, "conservation", "Both are water in different states."),
      q("Freezing changes...", ["liquid to solid", "solid to liquid", "gas to element", "light to sound"], 0, "freezing", "Freezing is liquid to solid."),
      q("What concrete example removes heat safely?", ["a home freezer", "a flame", "hot oil", "a closed heated bottle"], 0, "cooling", "A freezer is a familiar heat-removal example."),
      q("In the melting particle model, what changes?", ["arrangement and motion", "the dots become a different substance", "all particles vanish", "the label becomes water"], 0, "particle-model", "The arrangement and motion change."),
      q("Which other material can melt in app visuals?", ["chocolate", "a shadow", "a reflection", "a question"], 0, "state-change", "Chocolate can melt, but heating is not a child-led task."),
      q("The safe home observation uses...", ["sealed bag of ice", "boiling water", "hot glass", "flame"], 0, "safety", "A sealed bag of ice is low-risk with a parent."),
      q("Best explanation of melting:", ["same material, new state", "material vanished", "atoms stopped existing", "a gas was created"], 0, "reasoning", "Melting keeps the material but changes its state."),
      q("Why repair the phrase 'the cube is gone'?", ["It hides the material still being there", "It is always perfect science", "It means water is not matter", "It proves freezing cannot happen"], 0, "precision", "Science needs the more precise idea: the shape is gone, not the water.")
    ]
  },
  {
    id: "dissolving-not-melting",
    number: 11,
    title: "Dissolving Is Not Melting",
    shortTitle: "Dissolving",
    durationTarget: 420,
    visualType: "dissolving-model",
    learningOutcome: "Compare melting with dissolving and explain that dissolved material is spread out, not gone.",
    palette: ["#1f2937", "#2dd4bf", "#f9a8d4", "#facc15"],
    boards: [
      "two mysteries", "melting recap", "crystals in water", "student says melted", "dissolving model",
      "not gone evidence", "safety boundary", "compare table", "sort statements", "test handoff"
    ],
    segments: [
      "Two mysteries start side by side. Ice on a plate seems to disappear as it melts. Sugar crystals in water seem to disappear as they dissolve. They can look similar to our eyes, but the causes are not the same. The board holds both examples apart so we do not accidentally use one word for two different stories.",
      "First, the melting recap. Melting is a state change: solid to liquid. Heat can help the solid material become liquid material. In the ice example, solid water becomes liquid water. The material is still water. The state changed. That is the left side of the comparison table.",
      "Now the dissolving setup. Sugar or salt crystals go into water. We use a labelled known material in the app model, not mystery powder. A stirring arrow appears, but the board does not label it melting. The question is not, did it get hot enough to melt? The question is, what happened to the tiny bits in the water?",
      "A student says, so the sugar melted? Here is the locked correction: Dissolving is not melting. The sugar does not change from solid to liquid stuff on its own. It spreads through the water. Warm water can make it spread faster, but spreading is the story, not melting.",
      "Now the dissolving model appears. Sugar dots start together as a crystal, then redraw spread among the water dots. This is a model, not a photograph. The key idea is spread out. If the grains are too small and spread out for our eyes, the cup can look clear even though the sugar is still part of the mixture.",
      "Invisible to our eyes does not mean gone. We avoid tasting as evidence in Bright Quest. Instead, the app can show a labelled known material, a particle model, an app-only mass comparison with a proper scale, or app-only salt recovery by evaporation. Kitchen scales may not be precise enough, so mass comparison is not a home task.",
      "Safety boundary. Do not taste unknown substances. Do not heat salt water as a child-led task. Do not boil water for this chapter. If a parent uses known sugar and water at home, the app still frames it as optional and supervised. The main Bright Quest evidence is visual, labelled, and app-safe.",
      "Now compare the two rows. Melting: a state changes, such as solid water to liquid water. Dissolving: a material spreads through a liquid, such as sugar spreading through water. Melting asks about state. Dissolving asks about mixing at a tiny scale. Both can make something harder to see. That does not make them the same.",
      "Sort the statements. Ice becomes liquid water: melting. Sugar spreads through water: dissolving. Sand sitting at the bottom: neither, because it did not dissolve. If a card goes into the wrong lane, it shakes gently and returns. The correction should be visible, not just spoken.",
      "The chapter test will ask you to compare cause, model, and evidence. Keep this rule ready: cannot see it does not mean gone. Also keep the second rule: dissolving is not melting, even when warm water makes dissolving happen faster."
    ],
    tests: [
      q("Melting is mainly...", ["a state change", "spreading through water", "a taste test", "a shadow"], 0, "melting", "Melting changes state, such as solid to liquid."),
      q("Dissolving is mainly...", ["spreading through a liquid", "solid changing to liquid stuff on its own", "turning into light", "freezing"], 0, "dissolving", "Dissolving spreads material through a liquid."),
      q("Locked correction from the lesson:", ["Dissolving is not melting", "Dissolving means gone", "Always taste to check", "Warm water proves melting"], 0, "misconception", "Dissolving is not melting."),
      q("Warm water can make sugar...", ["spread faster", "stop being matter", "become a metal", "turn into steam"], 0, "temperature-effect", "Warm water can affect rate, but spreading is the dissolving story."),
      q("Why can clear sugar water still contain sugar?", ["Sugar bits are spread out", "Sugar vanished", "Water is not matter", "The label is wrong"], 0, "evidence", "Dissolved sugar can be too spread out to see as grains."),
      q("Which evidence is NOT a child task?", ["mass comparison with a precise scale", "watching an app model", "reading a label", "answering the quiz"], 0, "safety", "Mass comparison is app-only here because normal kitchen scales may not show it clearly."),
      q("What should Bright Quest avoid?", ["tasting unknown substances", "using labels", "showing a model", "comparing examples"], 0, "safety", "Do not taste unknown substances."),
      q("Which statement belongs in the dissolving lane?", ["Sugar spreads through water", "Ice becomes liquid water", "Water freezes in a freezer", "A block keeps its shape"], 0, "comparison", "Sugar spreading through water is dissolving."),
      q("Which statement belongs in the melting lane?", ["Ice becomes liquid water", "Sugar spreads out", "Sand sits at the bottom", "Air fills a balloon"], 0, "comparison", "Ice becoming liquid water is melting."),
      q("Best final rule:", ["Cannot see it does not mean gone", "Clear liquids are always pure water", "Dissolving is always melting", "Taste unknowns to prove it"], 0, "reasoning", "Invisible to our eyes does not mean gone.")
    ]
  }
];

for (const chapter of chapters) {
  chapter.segments.push(...longformPracticeSegments(chapter));
  if (chapter.number >= 8) chapter.segments.push(extendedTransferSegment(chapter));
  chapter.segments.push(finalGateSegment(chapter));
  chapter.durationTarget = Math.max(chapter.durationTarget, 330);
}

function q(prompt, options, answer, concept, feedback) {
  return { prompt, options, answer, concept, feedback };
}

async function main() {
  await fs.mkdir(renderRoot, { recursive: true });
  await updateCourse();
  for (const chapter of chapters) await buildChapter(chapter);
  console.log(`Built ${chapters.length} long-form Chemistry chapters for ${release}`);
}

async function updateCourse() {
  const course = JSON.parse(await fs.readFile(coursePath, "utf8"));
  const existing = new Map(course.chapters.map((chapter) => [chapter.id, chapter]));
  for (const chapter of chapters) existing.set(chapter.id, serialiseChapter(chapter));
  course.release = release;
  course.chapters = [...existing.values()].sort((a, b) => Number(a.number) - Number(b.number));
  await fs.writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
}

function serialiseChapter(chapter) {
  return {
    id: chapter.id,
    number: chapter.number,
    title: chapter.title,
    shortTitle: chapter.shortTitle,
    durationTarget: chapter.durationTarget,
    visualType: chapter.visualType,
    learningOutcome: chapter.learningOutcome,
    segments: chapter.segments,
    tests: chapter.tests
  };
}

async function buildChapter(chapter) {
  const n = String(chapter.number).padStart(2, "0");
  const workDir = path.join(renderRoot, `chapter-${n}`);
  const chunkDir = path.join(workDir, "voice-chunks");
  const framesDir = path.join(workDir, "frames");
  const timelinePath = path.join(workDir, "timeline.json");
  const audioPath = path.join(assetDir, "audio", `chapter-${n}-teacher.mp3`);
  const captionsPath = path.join(assetDir, "captions", `chapter-${n}.vtt`);
  const videoPath = path.join(assetDir, "videos", `chapter-${n}.mp4`);
  const posterPath = path.join(assetDir, "posters", `chapter-${n}.jpg`);
  const cardPath = path.join(assetDir, "ui", `chapter-${n}-card.png`);

  await fs.mkdir(chunkDir, { recursive: true });
  await fs.mkdir(framesDir, { recursive: true });
  await fs.mkdir(path.dirname(audioPath), { recursive: true });
  await fs.mkdir(path.dirname(captionsPath), { recursive: true });
  await fs.mkdir(path.dirname(videoPath), { recursive: true });
  await fs.mkdir(path.dirname(posterPath), { recursive: true });
  await fs.mkdir(path.dirname(cardPath), { recursive: true });

  await createSpeech(chapter, chunkDir, audioPath);
  const duration = await mediaDuration(audioPath);
  if (duration < 300) throw new Error(`${chapter.title} rendered under 5 minutes: ${duration.toFixed(1)}s`);
  const timings = segmentTimings(chapter, duration);
  await fs.writeFile(captionsPath, makeVtt(chapter, timings));
  await fs.writeFile(timelinePath, JSON.stringify(makeTimeline(chapter, timings), null, 2));
  await renderFrames(chapter, framesDir, timings, duration);
  await muxVideo(framesDir, audioPath, videoPath);
  const videoDuration = await mediaDuration(videoPath);
  if (videoDuration < 300) throw new Error(`${chapter.title} video under 5 minutes: ${videoDuration.toFixed(1)}s`);
  await sharp(Buffer.from(frameSvg(chapter, timings[Math.floor(timings.length * 0.45)]?.start || 0, duration, timings, true))).jpeg({ quality: 88 }).toFile(posterPath);
  await sharp(Buffer.from(cardSvg(chapter))).png().toFile(cardPath);
  console.log(`chapter-${n}: ${videoDuration.toFixed(1)}s video, ${duration.toFixed(1)}s audio, ${wordCount(chapter.segments.join(" "))} words`);
}

async function createSpeech(chapter, chunkDir, outputPath) {
  const sourceHash = crypto.createHash("sha256").update(JSON.stringify({
    voice: "coral",
    instructions: voiceInstructions,
    segments: chapter.segments
  })).digest("hex");
  const hashPath = path.join(chunkDir, "source-hash.txt");
  if (await exists(outputPath)) {
    const existingHash = await fs.readFile(hashPath, "utf8").catch(() => "");
    const existingDuration = await mediaDuration(outputPath);
    if (existingHash === sourceHash && existingDuration >= 300) return;
    await fs.rm(outputPath, { force: true });
    await fs.rm(chunkDir, { recursive: true, force: true });
    await fs.mkdir(chunkDir, { recursive: true });
  }
  const chunks = chunkText(chapter.segments, 1100);
  const chunkFiles = [];
  for (let i = 0; i < chunks.length; i += 1) {
    const file = path.join(chunkDir, `chunk-${String(i + 1).padStart(2, "0")}.mp3`);
    chunkFiles.push(file);
    if (await exists(file)) continue;
    await speechRequest(chunks[i], file);
  }
  const listFile = path.join(chunkDir, "concat.txt");
  await fs.writeFile(listFile, chunkFiles.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n"));
  await run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", outputPath]);
  await fs.writeFile(hashPath, sourceHash);
}

function longformPracticeSegments(chapter) {
  const common = {
    "mystery-of-stuff": [
      "Let us slow down for guided practice. I will point to an object, and you say two things: the object name and the material name. Cup, glass. Spoon, metal. Jumper, fibre. Bottle, plastic. Paper, paper fibres. If you only say the object, the answer is unfinished. If you only say the material, the job is unfinished. Chemistry often needs both the thing and the stuff.",
      "Now repair a weak answer. A learner says, the best raincoat material is shiny. Shiny might be true, but it does not answer the job question. The better answer is: I would test whether the material is waterproof, because a raincoat needs to stop water soaking through. Notice the because. The word because turns a property into evidence-based reasoning.",
      "One more transfer example. Imagine a lunchbox, a window, and a tea towel. The lunchbox might need to be rigid and waterproof. The window needs to be transparent. The tea towel needs to absorb water. Three objects, three jobs, three property choices. That is why there is no one best material. The better question is always: best for what job?",
      "Before the test, use the four-step chant. Name the object. Name the material. Pick one property. Give the evidence. If the question tries to tempt you into guessing, come back to those four steps. They are the safety rails for this chapter."
    ],
    "solid-liquid-gas": [
      "Let us add a careful practice round. I will show a jar of honey. It pours, but slowly. That still makes it behave like a liquid in this lesson. Slow flow is still flow. Now I show a sponge. The sponge can hold air and water, but the sponge material is a solid with holes. That is why it belongs in the tricky solid lane.",
      "Repair a weak answer. A learner says, gas is not matter because I cannot see it. The better answer is: I cannot see the air, but the balloon gets bigger and the plunger pushes back, so there is evidence that air takes up space. That is the move we want: not see, therefore nothing is weak. Evidence, therefore matter is stronger.",
      "Here is another sort. Sand keeps a pile shape, so solid. Milk pours and takes the cup shape, so liquid. Air in a football spreads through the inside space, so gas. Foam is tricky, because it has gas bubbles inside liquid or solid material. Tricky does not mean impossible. It means slow down and ask what part you are classifying.",
      "Before the test, keep three questions ready. Does it keep its own shape? Does it flow and take the container shape? Does it spread through the available space? Those three questions are better than asking whether it looks hard, wet, or invisible."
    ],
    "tiny-particles-big-clues": [
      "Now practise using the model without overbelieving it. If I draw a red dot and a blue dot, that does not mean particles are really painted red and blue. The colours help us track parts of a model. If I draw a big dot, that does not mean the real particle is big enough to see. A model chooses what to show.",
      "Repair a weak answer. A learner says, a liquid pours because the dots are wet. No. The better answer is: in the model, liquid particles are close together but can slide past each other, and that helps explain pouring. Notice how the answer uses arrangement and motion, not a made-up property of a single dot.",
      "Let us connect the three models again. Solid: close and mostly fixed. Liquid: close and sliding. Gas: spread out and moving through the available space. The words are short, but the contrast is powerful. Close versus spread out. Fixed versus sliding. Small wiggle versus moving around the space.",
      "Before the test, listen for exact wording. If an option says the dots are exact photographs, reject it. If it says single particles are wet, reject it. If it says the model helps us explain evidence, that is the careful science answer."
    ],
    "heat-particles-dance": [
      "Let us practise the hard distinction. I touch the thermometer to the spoon and read a number. That number is temperature. I watch the spoon warm because it is touching the warmer cup. That movement of energy is heat transfer. Temperature is the reading. Heat transfer is the process that can change the reading.",
      "Repair a weak answer. A learner says, the yellow arrow is heat flying like a laser. No. In this example the spoon touches the cup, and the arrow shows heat moving through the contact point from warmer material toward cooler material. The arrow is a thinking symbol. It is not a beam you can see.",
      "Now try a wrong prediction. If the cool spoon touches the warm cup, and you draw an arrow from the spoon into the cup, the board shakes the arrow and asks: which object was warmer first? The warm cup was warmer, so the first heat arrow should go from cup toward spoon. Wrong arrows are not failures. They are repair moments.",
      "Before the test, keep four clues ready: warmer object, cooler object, contact or pathway, and thermometer reading. Also remember the particle model rule: same dot colour, different wiggle size. We are not inventing hot particles. We are showing particles moving more when warmed."
    ],
    "melting-not-disappearing": [
      "Let us practise with other materials. Butter can soften and melt. Chocolate can melt. Wax can melt in an app animation. None of those examples mean the material vanished. They mean a solid became liquid when conditions allowed it. Do not attach melting only to ice, and do not attach melting to disappearing.",
      "Repair a weak answer. A learner says, the ice cube disappeared because I cannot see the cube anymore. Better: the cube shape disappeared, but the water is still present as liquid water. The word cube named the shape. The word water named the material. The material is the part we track.",
      "Now use the freezer example. Liquid water in an ice tray goes into a freezer. Heat moves away from the water into colder surroundings, and the water can become solid again. That is freezing. The freezer makes the reverse direction concrete. No flames, no boiling, no hot glass, just a familiar safe device.",
      "Before the test, keep one sentence ready: same material, new state. If the question shows ice and puddle, say water in two states. If it shows freezing, say liquid to solid. If it asks what vanished, be precise: the shape changed, not the material."
    ],
    "dissolving-not-melting": [
      "Let us lock the correction exactly. Dissolving is not melting. The sugar does not change from solid to liquid stuff on its own. It spreads through the water. Warm water can make it spread faster, but spreading is the story, not melting. That sentence is the heart of the chapter.",
      "Repair a weak answer. A learner says, the sugar is gone because I cannot see it. Better: the sugar is spread through the water in pieces too small and spread out for my eyes to see as grains. The app model shows that idea. We do not need tasting, and we do not use unknown substances.",
      "Now compare evidence choices. A labelled app model is safe. App-only salt recovery is safe because the app can show evaporation without asking a child to boil water. App-only mass comparison is safe because the app can use a precise scale. Kitchen scales may not be sensitive enough, so that is not a home proof.",
      "Before the test, separate the two stories. Melting: state change, solid to liquid. Dissolving: spreading through a liquid. Warmth may affect speed, but warmth does not turn dissolving into melting. If an answer says cannot see means gone, reject it."
    ]
  };
  return common[chapter.id] || [];
}

function finalGateSegment(chapter) {
  return [
    "Final training pause before the test. Do not rush this last board.",
    `For ${chapter.title}, say the main idea in your own words, then test it against one new example.`,
    "If the example changes the job, the material, the state, the heat direction, or the evidence, update the answer instead of memorising the last picture.",
    "That is why this is training, not just a video. The test checks whether the idea transfers."
  ].join(" ");
}

function extendedTransferSegment(chapter) {
  const byId = {
    "tiny-particles-big-clues": "One last transfer check before the test. A drawing can show particles close together, spread out, or sliding, but it cannot show every real detail. If the board changes from dots in a neat grid to dots sliding past each other, name the state clue first, then the limit of the model second. Solid particles are close and mostly fixed in place. Liquid particles are close but can slide. Gas particles are spread out and move through the space. The model helps because it explains the evidence, not because the dots are magic.",
    "heat-particles-dance": "One last transfer check before the test. Imagine a cool metal spoon touching warm soup, then imagine the same spoon sitting alone on the table. In the first case there is a contact pathway from warmer soup to cooler spoon. In the second case the spoon is not being warmed by the soup. The arrow belongs only when there is a heat-transfer story to tell. Say the warmer object, say the cooler object, say the contact point, then say what the thermometer would show changing over time.",
    "melting-not-disappearing": "One last transfer check before the test. If wax, butter, chocolate, or ice changes from a solid shape into a liquid puddle, do not say the material disappeared. Ask two questions. What material am I tracking? What state is it in now? The shape can vanish while the material remains. Freezing reverses the idea: liquid water can become solid ice when heat leaves it. The safe home version is observation, not hot equipment. The app can show the risky parts clearly.",
    "dissolving-not-melting": "One last transfer check before the test. If sugar grains vanish from sight in water, do not jump to gone, melted, or destroyed. Ask what evidence the app gives. The model can show sugar pieces spreading through the water. The liquid may look clear because the pieces are too small and spread out for your eyes to see as grains. Warm water can change the speed, but the main story stays the same. Dissolving is spreading through a liquid, not turning into liquid sugar."
  };
  return byId[chapter.id] || "One last transfer check before the test. Say the main idea, apply it to a new example, and explain the evidence that made you choose it.";
}

async function speechRequest(input, outputPath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required for Chemistry voice generation.");
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "coral",
      input,
      instructions: voiceInstructions,
      response_format: "mp3"
    })
  });
  if (!response.ok) throw new Error(`OpenAI speech failed: ${response.status} ${await response.text()}`);
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

function chunkText(segments, maxChars) {
  const chunks = [];
  let current = "";
  for (const segment of segments) {
    const next = current ? `${current} ${segment}` : segment;
    if (next.length > maxChars && current) {
      chunks.push(current);
      current = segment;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function segmentTimings(chapter, duration) {
  const weights = chapter.segments.map(wordCount);
  const total = weights.reduce((sum, value) => sum + value, 0) || 1;
  let cursor = 0;
  return chapter.segments.map((text, index) => {
    const end = index === chapter.segments.length - 1 ? duration : cursor + duration * (weights[index] / total);
    const timing = { index, text, start: cursor, end };
    cursor = end;
    return timing;
  });
}

function makeTimeline(chapter, timings) {
  const actions = [];
  for (const timing of timings) {
    const board = chapter.boards[timing.index] || chapter.boards.at(-1);
    const step = 3;
    for (let t = timing.start; t < timing.end; t += step) {
      actions.push({
        id: `${chapter.id}-${String(actions.length + 1).padStart(3, "0")}`,
        start: Number(t.toFixed(2)),
        end: Number(Math.min(t + step, timing.end).toFixed(2)),
        narration: timing.text.slice(0, 180),
        expected_action: board,
        board_region: actions.length % 3 === 0 ? "center" : actions.length % 3 === 1 ? "side" : "lower",
        drawing_type: actions.length % 4 === 0 ? "object" : actions.length % 4 === 1 ? "arrow" : actions.length % 4 === 2 ? "label" : "highlight"
      });
    }
  }
  return { chapterId: chapter.id, title: chapter.title, actions };
}

function makeVtt(chapter, timings) {
  const lines = ["WEBVTT", ""];
  for (const timing of timings) {
    lines.push(`${timeCode(timing.start)} --> ${timeCode(timing.end)}`);
    lines.push(timing.text);
    lines.push("");
  }
  return lines.join("\n");
}

async function renderFrames(chapter, framesDir, timings, duration) {
  await fs.rm(framesDir, { recursive: true, force: true });
  await fs.mkdir(framesDir, { recursive: true });
  const totalFrames = Math.ceil((duration + 2) * fps);
  for (let frame = 0; frame < totalFrames; frame += 1) {
    const seconds = frame / fps;
    await sharp(Buffer.from(frameSvg(chapter, seconds, duration, timings))).png().toFile(path.join(framesDir, `frame-${String(frame + 1).padStart(5, "0")}.png`));
  }
}

function frameSvg(chapter, seconds, duration, timings, poster = false) {
  const [bg, accent, warm, pink] = chapter.palette;
  const active = timings.find((timing) => seconds >= timing.start && seconds < timing.end) || timings.at(-1);
  const scene = chapter.boards[active.index] || chapter.boards.at(-1);
  const local = Math.max(0, seconds - active.start);
  const sceneDuration = Math.max(1, active.end - active.start);
  const action = Math.floor(local / 3);
  const p = Math.min(1, local / sceneDuration);
  const wrapped = wrapText(active.text, 58).slice(0, 5);
  const items = boardItems(chapter, active.index, action, p, seconds, local, sceneDuration);
  const progressWidth = Math.max(18, Math.round(1090 * (seconds / duration)));
  const safeTitle = escapeXml(chapter.title);
  const safeScene = escapeXml(titleCase(scene));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <filter id="chalk"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" seed="${chapter.number + active.index}"/><feDisplacementMap in="SourceGraphic" scale="0.7"/></filter>
      <linearGradient id="board" x1="0" x2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="#0f172a"/></linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#board)"/>
    <rect x="44" y="34" width="1192" height="650" rx="30" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.24)" stroke-width="3"/>
    <text x="76" y="82" fill="${warm}" font-family="Arial, sans-serif" font-size="25" font-weight="900">Chemistry 101 Winter 2026 - Chapter ${chapter.number}</text>
    <text x="76" y="130" fill="#f8fafc" font-family="Arial, sans-serif" font-size="42" font-weight="900">${safeTitle}</text>
    <text x="76" y="174" fill="${accent}" font-family="Arial, sans-serif" font-size="27" font-weight="900">${safeScene}</text>
    <g filter="url(#chalk)">${items}</g>
    <rect x="76" y="520" width="650" height="122" rx="22" fill="rgba(15,23,42,0.64)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
    ${wrapped.map((line, i) => `<text x="102" y="${554 + i * 20}" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="18" font-weight="700">${escapeXml(line)}</text>`).join("")}
    <g transform="translate(802 512)">
      <rect width="354" height="128" rx="24" fill="rgba(248,250,252,0.96)"/>
      <text x="28" y="42" fill="#0f172a" font-family="Arial, sans-serif" font-size="24" font-weight="900">Training checkpoint</text>
      <text x="28" y="76" fill="#334155" font-family="Arial, sans-serif" font-size="19" font-weight="800">${escapeXml(checkpointLine(chapter, active.index))}</text>
      <text x="28" y="108" fill="#0f766e" font-family="Arial, sans-serif" font-size="18" font-weight="900">Test follows after this chapter</text>
    </g>
    <rect x="76" y="662" width="1090" height="10" rx="5" fill="rgba(255,255,255,0.2)"/>
    <rect x="76" y="662" width="${progressWidth}" height="10" rx="5" fill="${accent}"/>
  </svg>`;
}

function boardItems(chapter, index, action, p, seconds, local, sceneDuration) {
  const [bg, accent, warm, pink] = chapter.palette;
  const itemWords = visualWords(chapter, index);
  let out = "";
  const revealEvery = Math.max(1.7, sceneDuration / Math.max(5, itemWords.length));
  const count = Math.min(itemWords.length, Math.max(2, Math.floor(local / revealEvery) + 2));
  for (let i = 0; i < count; i += 1) {
    const x = 94 + (i % 3) * 230;
    const y = 220 + Math.floor(i / 3) * 90;
    const jitter = Math.sin((seconds * 1.4 + i) * 0.7) * 5;
    const color = i % 3 === 0 ? accent : i % 3 === 1 ? warm : pink;
    const label = escapeXml(itemWords[i]);
    const reveal = Math.min(1, Math.max(0.18, (local - i * revealEvery + 0.8) / 1.5));
    const opacity = reveal.toFixed(2);
    if (i % 4 === 0) {
      out += `<g opacity="${opacity}"><rect x="${x}" y="${y - 40 + jitter}" width="194" height="64" rx="16" fill="rgba(255,255,255,0.08)" stroke="${color}" stroke-width="4"/><text x="${x + 18}" y="${y}" fill="#f8fafc" font-family="Arial, sans-serif" font-size="21" font-weight="900">${label}</text></g>`;
    } else if (i % 4 === 1) {
      out += `<g opacity="${opacity}"><circle cx="${x + 36}" cy="${y - 10 + jitter}" r="28" fill="none" stroke="${color}" stroke-width="5"/><path d="M${x + 72} ${y - 12} H${x + 190}" stroke="${color}" stroke-width="5" stroke-linecap="round"/><text x="${x + 82}" y="${y + 22}" fill="#f8fafc" font-family="Arial, sans-serif" font-size="20" font-weight="900">${label}</text></g>`;
    } else if (i % 4 === 2) {
      out += `<g opacity="${opacity}"><path d="M${x} ${y + 16} C${x + 50} ${y - 60}, ${x + 130} ${y + 58}, ${x + 200} ${y - 10}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/><text x="${x + 18}" y="${y + 44}" fill="#f8fafc" font-family="Arial, sans-serif" font-size="20" font-weight="900">${label}</text></g>`;
    } else {
      out += `<g opacity="${opacity}"><polygon points="${x + 24},${y + 26} ${x + 62},${y - 42} ${x + 104},${y + 26}" fill="rgba(255,255,255,0.08)" stroke="${color}" stroke-width="5"/><text x="${x + 122}" y="${y + 2}" fill="#f8fafc" font-family="Arial, sans-serif" font-size="20" font-weight="900">${label}</text></g>`;
    }
  }
  out += motionCue(seconds, local, sceneDuration, accent, warm, pink);
  out += particleOrEvidenceMotif(chapter, index, seconds, accent, warm, pink);
  return out;
}

function motionCue(seconds, local, sceneDuration, accent, warm, pink) {
  const pulse = 0.45 + Math.sin(seconds * 3.2) * 0.18;
  const x = 86 + ((local * 86) % 620);
  const sweep = Math.max(28, Math.min(620, 620 * (local / Math.max(1, sceneDuration))));
  return `
    <g opacity="0.88">
      <path d="M84 197 H${84 + sweep}" stroke="${accent}" stroke-width="7" stroke-linecap="round" opacity="0.72"/>
      <circle cx="${x.toFixed(1)}" cy="197" r="${(8 + pulse * 5).toFixed(1)}" fill="${pink}" opacity="0.72"/>
      <path d="M${(x - 24).toFixed(1)} 209 C${(x + 8).toFixed(1)} 186, ${(x + 42).toFixed(1)} 211, ${(x + 74).toFixed(1)} 190" fill="none" stroke="${warm}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    </g>
  `;
}

function visualWords(chapter, index) {
  const boards = {
    "mystery-of-stuff": [
      ["cup", "spoon", "jumper", "bottle", "paper", "evidence", "material", "property", "job", "notebook", "fair test", "chapter test"],
      ["object", "material", "glass", "metal", "fibre", "plastic", "paper", "sort"],
      ["bend", "light", "water", "magnet", "one clue", "record"],
      ["wood spoon", "metal spoon", "plastic spoon", "hot soup", "handle", "compare"],
      ["raincoat", "window", "pan handle", "wire", "best job", "property"],
      ["student asks", "tiny answer?", "evidence first", "model later"],
      ["object", "material", "property", "evidence", "careful words"],
      ["tile A", "tile B", "one variable", "rain cover", "reason"],
      ["observe", "compare", "evidence", "test"]
    ],
    "solid-liquid-gas": [
      ["block", "water", "balloon", "no labels", "watch"],
      ["tray", "box", "same shape", "solid clue"],
      ["cup", "bowl", "same amount", "new shape", "liquid clue"],
      ["balloon", "plunger", "air space", "push back", "arrows not dots"],
      ["jelly", "soft solid", "tricky lane", "more clues"],
      ["solid", "liquid", "gas", "behaviour"],
      ["invisible vapour", "liquid droplets", "app only", "adult only"],
      ["ice", "juice", "tyre air", "honey", "sponge", "tricky"],
      ["shape", "flow", "space", "test"]
    ],
    "tiny-particles-big-clues": [
      ["not photo", "model", "thinking tool", "evidence"],
      ["keeps shape", "pours", "fills balloon", "explain"],
      ["close", "fixed places", "wiggle", "solid"],
      ["close", "slide", "flow", "liquid"],
      ["spread out", "space", "move", "gas"],
      ["student asks", "exact picture?", "no", "useful model"],
      ["evidence", "model", "match", "correct"],
      ["not wet", "not exact", "not colour", "spacing", "motion"],
      ["arrangement", "movement", "test"]
    ],
    "heat-particles-dance": [
      ["cup", "spoon touching", "contact point", "no beam"],
      ["warmer", "cooler", "heat arrows", "contact"],
      ["thermometer", "warm water", "cool water", "reading"],
      ["number?", "temperature", "heat moves", "careful"],
      ["same colour dots", "small wiggle", "big wiggle", "move more"],
      ["heat leaves", "cooling", "slower wiggle", "not stopped"],
      ["parent", "warm tap water", "no boiling", "no flame"],
      ["predict", "wrong arrow shakes", "warmer to cooler"],
      ["contact", "reading", "safe", "test"]
    ],
    "melting-not-disappearing": [
      ["ice cube", "plate", "timer", "evidence"],
      ["cube", "puddle", "shape changed", "state changed"],
      ["student says gone", "shape gone", "water remains"],
      ["solid water", "liquid water", "same stuff"],
      ["fixed dots", "heat arrows", "sliding dots", "model"],
      ["freezer", "heat moves away", "liquid to solid"],
      ["butter", "chocolate", "wax", "app visuals"],
      ["sealed bag", "parent", "timer", "notebook"],
      ["same material", "new state", "test"]
    ],
    "dissolving-not-melting": [
      ["ice", "sugar", "two mysteries", "not same"],
      ["melting", "state change", "solid to liquid"],
      ["sugar", "water", "stir", "no melt label"],
      ["not melting", "spreads", "warm faster", "story"],
      ["sugar dots", "water dots", "spread out", "model"],
      ["not gone", "labelled material", "app scale", "salt recovery"],
      ["no tasting", "parent", "app safe", "known food only"],
      ["melting row", "dissolving row", "cause", "model"],
      ["sort cards", "wrong lane shakes", "correct"],
      ["cannot see != gone", "test"]
    ]
  };
  return boards[chapter.id]?.[index] || chapter.boards;
}

function particleOrEvidenceMotif(chapter, index, seconds, accent, warm, pink) {
  if (chapter.id === "solid-liquid-gas" && index < 6) return "";
  if (!/(particle|heat|melting|dissolving)/.test(chapter.visualType)) return "";
  let out = "";
  const count = 26;
  for (let i = 0; i < count; i += 1) {
    const col = i % 9;
    const row = Math.floor(i / 9);
    const spread = chapter.id === "tiny-particles-big-clues" && index >= 4 || chapter.id === "dissolving-not-melting" ? 48 : 34;
    const x = 790 + col * spread + Math.sin((seconds * 2.4 + i) * 0.9) * (chapter.id === "heat-particles-dance" ? (index >= 4 ? 10 : 3) : 6);
    const y = 235 + row * 48 + Math.cos((seconds * 2.1 + i) * 0.6) * 7;
    const color = chapter.id === "heat-particles-dance" ? accent : i % 3 === 0 ? warm : accent;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${color}" opacity="0.72"/>`;
  }
  return out;
}

function checkpointLine(chapter, index) {
  const lines = {
    "mystery-of-stuff": "Choose material, property, evidence.",
    "solid-liquid-gas": "Classify by behaviour, not looks.",
    "tiny-particles-big-clues": "Use the model, but do not overbelieve it.",
    "heat-particles-dance": "Track warmer, cooler, contact, and reading.",
    "melting-not-disappearing": "Same material, new state.",
    "dissolving-not-melting": "Spreading through water, not melting."
  };
  return lines[chapter.id] || chapter.learningOutcome.slice(0, 46);
}

function cardSvg(chapter) {
  const [bg, accent, warm] = chapter.palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
    <rect width="480" height="300" rx="26" fill="${bg}"/>
    <circle cx="404" cy="58" r="94" fill="${warm}" opacity="0.22"/>
    <circle cx="74" cy="258" r="96" fill="${accent}" opacity="0.24"/>
    <rect x="34" y="34" width="412" height="232" rx="24" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.32)" stroke-width="3"/>
    <text x="56" y="82" fill="${warm}" font-family="Arial, sans-serif" font-size="26" font-weight="900">Chapter ${chapter.number}</text>
    <text x="56" y="136" fill="#f8fafc" font-family="Arial, sans-serif" font-size="34" font-weight="900">${escapeXml(chapter.shortTitle)}</text>
    <text x="56" y="184" fill="#dbeafe" font-family="Arial, sans-serif" font-size="21" font-weight="800">${escapeXml(chapter.visualType.replaceAll("-", " "))}</text>
    <text x="56" y="222" fill="#f8fafc" font-family="Arial, sans-serif" font-size="18" font-weight="800">5+ min training + test</text>
    <path d="M74 248 C136 188, 214 262, 294 206 S396 198, 432 162" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  </svg>`;
}

function wrapText(value, max) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function titleCase(value) {
  return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function muxVideo(framesDir, audioPath, outputPath) {
  await run(ffmpeg, [
    "-y",
    "-framerate", String(fps),
    "-i", path.join(framesDir, "frame-%05d.png"),
    "-i", audioPath,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "128k",
    "-shortest",
    "-movflags", "+faststart",
    outputPath
  ]);
}

async function mediaDuration(file) {
  const output = await run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], true);
  return Number.parseFloat(output.trim()) || 1;
}

function wordCount(value) {
  return String(value).trim().split(/\s+/).filter(Boolean).length;
}

function timeCode(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = Math.floor(safe % 60);
  const ms = Math.floor((safe - Math.floor(safe)) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function run(command, args, capture = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit" });
    let stdout = "";
    let stderr = "";
    if (capture) {
      child.stdout.on("data", (chunk) => stdout += chunk);
      child.stderr.on("data", (chunk) => stderr += chunk);
    }
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${path.basename(command)} exited ${code}\n${stderr}`));
    });
  });
}

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
