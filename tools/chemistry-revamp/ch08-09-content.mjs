export const chapter8 = {
  id: "tiny-particles-big-clues",
  number: 8,
  title: "Tiny Particles, Big Clues",
  shortTitle: "Particles",
  durationTarget: 660,
  learningOutcome: "Use particle models to explain evidence about solids, liquids and gases, including diffusion and compression, while stating what the models cannot show.",
  scenes: [
    {
      id: "ch08-scene-01",
      title: "Evidence Before Dots",
      narration: "Place three observations on our evidence bench. A wooden block keeps its shape. Water takes the shape of its cup. Air fills a balloon. We can observe each behaviour. Now we need an explanation that connects them. Scientists use a particle model. It treats matter as tiny moving pieces. Notice the order: evidence first, model second. The colourful dots are not the evidence. A useful model should explain several observations and help us predict a new result. It should also have a clear limit. Our simple model cannot show every detail of real particles.",
      visualIntent: "Open on three real-scale evidence panels, then reveal a covered particle-model workspace beneath them; label evidence before model.",
      checkpoint: {
        prompt: "Which should come first when building our explanation?",
        answer: "Careful observations of behaviour."
      }
    },
    {
      id: "ch08-scene-02",
      title: "A Solid Model",
      narration: "Start with the block. In our solid model, particles are close together and remain in mostly fixed positions relative to their neighbours. They are not perfectly still; we show a small vibration. This arrangement helps explain why the block keeps its own shape and is difficult to squash. The particles are already close, so there is little empty space to remove. The model does not say every solid is hard: rubber can bend, and a sponge is solid material with air spaces. The picture explains a broad pattern, not every property.",
      visualIntent: "Show block evidence above a close-packed vibrating dot model; compare wood, rubber and a labelled porous sponge without changing state labels."
    },
    {
      id: "ch08-scene-03",
      title: "A Liquid Model",
      narration: "Pour water from a short cup into a wide bowl. Its shape changes, but the water still takes up space. In the liquid model, particles stay close together and slide past one another. This helps explain flow and changing shape. It also explains why a sealed syringe full of water is very hard to push. The particles are already close together. Do not picture each particle as a tiny wet drop. Wetness is a property we notice when many water particles act together. Our dots show spacing and movement. They do not show the real shapes of water molecules.",
      visualIntent: "Animate water changing container shape, then align it with close sliding particles and a capped water-filled syringe; include a clear model-limit callout."
    },
    {
      id: "ch08-scene-04",
      title: "A Gas Model",
      narration: "Now consider air trapped in a capped syringe with no needle. When the plunger is pressed gently, the trapped air occupies less space. Release it, and the plunger can move back. In our gas model, particles are much farther apart than in solids and liquids, moving in many directions through the available space. Pressing the plunger does not shrink each particle. It reduces the spaces between them. That distinction matters. Use only a classroom syringe designed for demonstrations, keep it pointed away from faces, and press gently with the outlet securely capped. Never use a needle, never trap reactive materials, and never force a stuck plunger.",
      visualIntent: "Show a needle-free capped syringe beside a gas-particle box; decrease gaps as the plunger moves while particle size remains constant.",
      checkpoint: {
        prompt: "What changes when trapped air is compressed in this model?",
        answer: "The gaps between particles become smaller."
      }
    },
    {
      id: "ch08-scene-05",
      title: "Compression Comparison",
      narration: "Compare two identical capped syringes. One holds air. An adult fills the other with water. A gentle push moves the air plunger much farther. The particle model explains the difference. Gas particles have large gaps between them. Liquid particles are already close together. At this level, we say liquids are very hard to compress. This does not mean there is no space at all between liquid particles. Never force either syringe. The fair comparison changes one thing: air or water. The clear difference gives our spacing model useful evidence to explain.",
      visualIntent: "Use side-by-side matched syringes with equal gentle-force indicators; quantify plunger movement visually without presenting invented measurements."
    },
    {
      id: "ch08-scene-06",
      title: "A Scent Spreads",
      narration: "Imagine an adult opens a small container with a scented cotton pad in a ventilated room. After a while, someone farther away may notice the scent. Nobody stirred the whole room. Scent particles moved and mixed with air particles. This gradual spreading is diffusion. More scent particles begin near the container. Over time, they spread into places with fewer scent particles. The particle model helps explain the pattern. Use an animation unless a teacher has checked for allergies and approved a mild scent. Never sniff any chemical directly. Our noses detect the scent, but they do not let us see the particles.",
      visualIntent: "Use a simple 2D room cross-section showing scent spreading from one side, plus one small particle inset."
    },
    {
      id: "ch08-scene-07",
      title: "Diffusion In Water",
      narration: "Diffusion also happens in liquids. Place one drop of food colouring into still water. Watch from the side without stirring. The colour slowly spreads beyond its starting point. Our model says moving water and colouring particles become more mixed over time. However, visible swirls may also come from currents in the water. Those currents can be caused by small temperature differences. This is the scene's one important limit: the cup does not show diffusion alone. Scientists improve the check by keeping temperature steady, repeating the trial and recording what they see. One attractive pattern is useful evidence, but it is not complete proof.",
      visualIntent: "Show a room-temperature clear cup receiving one food-colouring drop; separate a particle-scale diffusion inset from visible current arrows labelled as another possible effect.",
      checkpoint: {
        prompt: "Why should we be cautious about coloured swirls in water?",
        answer: "They may show both diffusion and moving currents."
      }
    },
    {
      id: "ch08-scene-08",
      title: "From Crowded To Spread",
      narration: "Focus on the pattern. At first, many colouring particles are crowded into one small region. They move and collide with water particles. Over time, the colouring becomes more evenly spread. Scientists call the crowded region a region of higher concentration. Places with fewer colouring particles have lower concentration. The overall spread goes from higher to lower concentration. Individual particles do not follow straight orders towards empty spaces. Their paths are irregular. The even spread is the large result of all that motion. Particles still move after the colour looks even. The main limit is that our neat animation makes real collisions look much simpler.",
      visualIntent: "Animate irregular individual paths while a concentration bar graph flattens; keep particles moving after the colour appears evenly distributed."
    },
    {
      id: "ch08-scene-09",
      title: "Predict A New Result",
      narration: "A model becomes stronger when it makes a useful prediction. Suppose one drop of colouring enters two identical cups, one shallow and one tall, at the same temperature with no stirring. Which will look evenly coloured first? Consider distance, currents and container shape, then test. The shallow cup offers a shorter vertical distance, but real water movement can complicate the result. A careful prediction names the pattern and conditions: if temperature and disturbance are controlled, colouring should gradually spread in both cups, although mixing times may differ.",
      visualIntent: "Present matched shallow and tall clear cups, let a prediction arrow appear, then run a schematic trial with a visible conditions checklist."
    },
    {
      id: "ch08-scene-10",
      title: "What Models Explain",
      narration: "Collect the explanatory wins. Close, mostly fixed particles help explain why a solid keeps shape. Close, sliding particles help explain why a liquid flows but resists compression. Widely spaced moving particles help explain why a gas fills available space and can be compressed. Constant motion and mixing help explain diffusion. The model connects several observations, but the animation itself is not evidence. Evidence came from the investigations; the animation is our representation. If future evidence does not fit, scientists adjust or replace the model rather than ignoring the observation.",
      visualIntent: "Build an evidence-to-explanation map linking four investigations to three particle arrangements and diffusion motion; arrows run from evidence towards model claims."
    },
    {
      id: "ch08-scene-11",
      title: "Dots Are Not Portraits",
      narration: "Now reveal three drawing conventions. First, the dots are far too large. Real particles are much smaller compared with the container. Second, the bright colours are labels chosen by the artist. They are not real particle colours. Third, the arrows simplify motion. Real particles collide and change direction many times. Stop after those three reveals. The model has one clear job: compare spacing, arrangement and motion. It does not show exact particle appearance or scale. The word particle is also a broad label. It may mean an atom or a molecule, depending on the substance we are modelling.",
      visualIntent: "Reveal only three model conventions: oversized dots, false colour and simplified motion arrows. End with spacing, arrangement and motion as the model's job.",
      checkpoint: {
        prompt: "What three features is this simple model designed to compare?",
        answer: "Spacing, arrangement and motion."
      }
    },
    {
      id: "ch08-scene-12",
      title: "Repair The Misconceptions",
      narration: "Listen to four claims and repair each one. 'Gas has no matter' becomes 'gas is matter whose particles are widely spaced in this model.' 'A compressed gas has crushed particles' becomes 'compression mainly reduces the gaps.' 'Liquid particles are wet drops' becomes 'wetness describes many particles interacting at a surface, not one drawn dot.' 'Diffusion happens because particles want to spread out' becomes 'irregular particle motion and collisions produce an overall spread.' Good explanations do more than mark a statement wrong. They replace it with a mechanism connected to evidence. Notice also that we say the model suggests or helps explain. We do not pretend a Grade 4 drawing contains the whole microscopic story.",
      visualIntent: "Display each misconception on an evidence card, strike only the faulty phrase, then rebuild it using reusable spacing, motion and evidence tiles."
    },
    {
      id: "ch08-scene-13",
      title: "Mystery Container",
      narration: "A sealed flexible bag looks almost empty, but when squeezed, another part bulges. Is there matter inside? Yes. The shape change suggests trapped gas moving through available space. Our model shows widely spaced moving particles, but not the exact gas mixture, molecular shapes or forces in the plastic. Compare a sealed bag of water. It changes outer shape, but its volume changes very little under gentle pressure. The contrast connects flow, space and compression without seeing individual particles.",
      visualIntent: "Use two transparent sealed flexible bags, one with air and one with water; highlight bulging, flow and nearly unchanged liquid volume under gentle pressure."
    },
    {
      id: "ch08-scene-14",
      title: "Design A Fair Check",
      narration: "Design a low-risk investigation for one model prediction. Choose the question: does one drop of colouring spread differently in still water at two safe temperatures? An adult prepares cool and comfortably warm tap water, never hot water. Use identical clear cups, equal water amounts, the same colouring, one drop placed in the same position, and no stirring. Record photographs at equal time intervals. Temperature is the planned difference; cup shape, volume and drop size are controlled. Even then, convection currents can affect the result, so repeat and report variation. The goal is not to force a tidy answer. It is to gather evidence that can challenge or refine our explanation.",
      visualIntent: "Lay out a fair-test bench with adult supervision icon, cool and warm tap-water cups, one-drop dispensers, timer and repeat-trial grid; cross out hot water."
    },
    {
      id: "ch08-scene-15",
      title: "Evidence, Model, Limit",
      narration: "Finish every particle explanation with three parts. First, name the evidence: trapped air becomes smaller under gentle pressure. Second, use the model: gas particles are widely spaced, so compression reduces the gaps between them. Third, name a limit: the dots are not to scale and do not show exact particle shapes or forces. Try the same frame for diffusion. Evidence: colouring spreads through still water. Model: moving particles become more mixed over time. Limit: visible currents may also move the water, and the animation simplifies collisions. This evidence-model-limit pattern keeps our science useful and honest. You are ready to explain observations without mistaking the drawing for reality.",
      visualIntent: "Complete two three-column response frames for compression and diffusion, then leave a third blank frame ready for the learner's own explanation.",
      checkpoint: {
        prompt: "What are the three parts of a careful particle explanation?",
        answer: "Evidence, model-based explanation, and a model limitation."
      }
    }
  ],
  tests: [
    {
      prompt: "A capped syringe of air is pressed gently. What does the simple particle model say changes most?",
      options: ["Each air particle becomes smaller", "The gaps between air particles become smaller", "The air stops being matter", "The particles turn into liquid"],
      answer: 1,
      concept: "gas-compression",
      feedback: "Gas compression is modelled mainly as reducing the large gaps between particles, not shrinking the particles."
    },
    {
      prompt: "Which observation is best explained by liquid particles being close but able to slide?",
      options: ["A wooden block keeps its shape", "Air can be compressed easily", "Water takes the shape of a bowl", "A shadow changes length"],
      answer: 2,
      concept: "liquid-model",
      feedback: "Close particles that can slide help explain why a liquid flows and changes shape while keeping its volume."
    },
    {
      prompt: "What is diffusion?",
      options: ["Particles being instructed to move in straight lines", "Matter disappearing when it spreads", "Only the stirring of a liquid", "An overall spreading caused by particle motion and mixing"],
      answer: 3,
      concept: "diffusion",
      feedback: "Diffusion is the overall spreading and mixing produced by irregular particle motion."
    },
    {
      prompt: "Food colouring forms swirls in still water. Why should a scientist avoid claiming the swirls show diffusion alone?",
      options: ["Water is not made of particles", "Currents in the water may also move the colour", "Colouring cannot diffuse", "Only gases can move"],
      answer: 1,
      concept: "evidence-quality",
      feedback: "Visible swirls may combine diffusion with bulk water movement such as convection currents."
    },
    {
      prompt: "Which statement respects the limits of the dot model?",
      options: ["The dots are exact photographs of particles", "Every real particle is brightly coloured", "The model compares spacing and motion but leaves out exact scale and forces", "Empty paper proves nothing exists between particles"],
      answer: 2,
      concept: "model-limits",
      feedback: "The model is useful for selected features, but it does not show exact scale, appearance, structures or forces."
    },
    {
      prompt: "Why is a sealed water-filled syringe much harder to compress than an air-filled syringe?",
      options: ["Water particles are already close together", "Water particles are larger than the syringe", "Air has no particles", "The water particles become solid"],
      answer: 0,
      concept: "compression-comparison",
      feedback: "The simple model shows liquid particles already close together, with much less space to reduce."
    },
    {
      prompt: "Which is the safest classroom compression investigation?",
      options: ["Forcing a glass container until it changes", "Heating a sealed bottle", "Using a needle attached to a syringe", "Gently pressing a capped, needle-free demonstration syringe away from faces"],
      answer: 3,
      concept: "safety",
      feedback: "A purpose-made needle-free syringe, used gently and pointed away from faces, keeps the investigation low risk."
    },
    {
      prompt: "A learner says, 'Gas is not matter because I cannot see it.' Which evidence best challenges that claim?",
      options: ["A shadow looks dark", "Trapped air resists a plunger and occupies space", "A label says gas", "An empty drawing has dots"],
      answer: 1,
      concept: "gas-is-matter",
      feedback: "Trapped air occupies space and pushes back, providing observable evidence that it is matter."
    },
    {
      prompt: "After colouring looks evenly spread through water, what does the model suggest?",
      options: ["The particles continue moving, with no obvious overall concentration change", "All particles have stopped", "The colouring has vanished", "The water has become a solid"],
      answer: 0,
      concept: "dynamic-mixing",
      feedback: "An even appearance does not mean particles stop; motion continues while the large-scale distribution stays balanced."
    },
    {
      prompt: "Which answer follows the evidence-model-limit pattern?",
      options: ["The syringe moved, so the dots must be exact", "Air compressed because it wanted to escape", "The plunger moved; reduced particle gaps explain it; the dots are not to scale", "The animation proves every detail of gas behaviour"],
      answer: 2,
      concept: "scientific-explanation",
      feedback: "A strong explanation names evidence, uses the model for a mechanism, and states a limitation."
    }
  ]
};

export const chapter9 = {
  id: "heat-particles-dance",
  number: 9,
  title: "Heat Makes Particles Dance",
  shortTitle: "Heat",
  durationTarget: 660,
  learningOutcome: "Distinguish temperature from heat transfer and explain conduction through contact and movement towards thermal equilibrium using safe primary-level examples.",
  scenes: [
    {
      id: "ch09-scene-01",
      title: "Two Objects, Two Temperatures",
      narration: "Place a metal spoon and a wooden spoon in the same room overnight. The metal may feel cooler when you touch it. A thermometer can show that both spoons have almost the same temperature. Touch is not a thermometer. Your skin also notices how quickly energy moves. Metal moves energy away from your hand faster than wood. Today we will separate three ideas. Temperature is a measurement of how hot or cold something is. Heat transfer is energy moving because temperatures differ. Conduction is energy transfer through a material when its parts are in contact.",
      visualIntent: "Open with matched metal and wooden spoons, equal thermometer readings and different hand-sensation indicators; separate temperature, transfer and conduction labels."
    },
    {
      id: "ch09-scene-02",
      title: "Temperature Is A Measurement",
      narration: "A thermometer gives a temperature reading in degrees Celsius. The number does not tell us how an object feels. It is also not an amount of heat stored inside the object. Use one digital thermometer to measure two cups prepared by an adult. One holds cool water. The other holds comfortably warm tap water. Wait for each reading to settle. Rinse and dry the probe as directed. Record the number and unit. Never use boiling water. Temperature helps us compare the cups more reliably than words such as a bit warm. Our hands can adapt, so their judgement changes.",
      visualIntent: "Demonstrate a digital thermometer settling in cool and warm tap water; show Celsius units and a safe-temperature boundary without displaying boiling vessels.",
      checkpoint: {
        prompt: "What does the thermometer provide?",
        answer: "A temperature reading, usually recorded in degrees Celsius."
      }
    },
    {
      id: "ch09-scene-03",
      title: "Heat Transfer Has A Direction",
      narration: "Put the cool metal spoon into comfortably warm water. The spoon's temperature rises. Energy transfers from the warmer water towards the cooler spoon. We call this process heat transfer. The direction rule is simple: warmer to cooler. Cold does not pour out of the spoon like a substance. The spoon warms, while the water cools a little. We draw an arrow from water to spoon to show the direction. The arrow is only a model symbol. Before drawing it, name the warmer object and the cooler object. Then point the arrow towards the cooler one.",
      visualIntent: "Place a cool metal spoon into warm tap water, chart both temperature trends and draw a labelled energy-transfer arrow from water to spoon.",
      checkpoint: {
        prompt: "Which way does energy transfer when a cool spoon enters warm water?",
        answer: "From the warmer water towards the cooler spoon."
      }
    },
    {
      id: "ch09-scene-04",
      title: "Contact Makes A Path",
      narration: "Why does the spoon handle warm? The lower part touches the warmer water. Energy transfers through the metal towards cooler parts. This is conduction. In our particle model, particles jiggle more in the warmer region. They interact with nearby particles and pass energy along. The particles do not race up the spoon carrying tiny parcels of heat. The solid stays in place overall while energy moves through it. Use only comfortably warm tap water. Never use a flame or boiling liquid. This safe example still shows the contact pathway from the water through the spoon.",
      visualIntent: "Trace a conduction pathway along a metal spoon using adjacent vibrating regions rather than travelling particles; include a stop-if-hot safety cue."
    },
    {
      id: "ch09-scene-05",
      title: "Metal And Wood",
      narration: "An adult places equal-sized metal and wooden spoons in the same comfortably warm water. After a fixed time, measure the upper handles with a thermometer. The metal handle usually warms faster. Metal is a better thermal conductor than wood. Wood slows the transfer, so it acts as an insulator here. An insulator does not stop all heat transfer. It slows the transfer under the same conditions. Make the comparison fair. Use similar spoon sizes, equal depth, the same water, the same starting temperature and the same time. The one planned difference is the spoon material.",
      visualIntent: "Show a controlled spoon comparison with matched dimensions, immersion depth and timer; animate a faster temperature rise along metal than wood.",
      checkpoint: {
        prompt: "Why does the metal handle usually warm faster than the wooden handle?",
        answer: "Metal is a better thermal conductor, so energy transfers through it faster."
      }
    },
    {
      id: "ch09-scene-06",
      title: "The Particle Story",
      narration: "Zoom into a simple solid model. Particles in the warmer region jiggle more than particles in the cooler region. Neighbouring particles interact, so energy spreads through the material. The difference slowly becomes smaller. Keep every dot the same colour and size. There are no special hot particles or cold particles. The model shows changing motion and transfer between nearby regions. It has one main limit: it leaves out the detailed role of electrons in metal. For Grade 4 and 5, nearby particle interactions give us a useful first model of conduction.",
      visualIntent: "Use a same-colour lattice with a motion gradient that evens out; overlay a model-limit note about scale, count and omitted metal-electron detail.",
      checkpoint: {
        prompt: "Do particles travel from the warm end to the cool end during conduction in a solid?",
        answer: "No. Energy transfers through interactions while particles stay in their overall positions."
      }
    },
    {
      id: "ch09-scene-07",
      title: "Cooling Is Transfer Too",
      narration: "Take a cup of comfortably warm water and leave it safely on a bench. Its temperature moves towards room temperature. We say the water cools, but the mechanism is energy transfer from the warmer water and cup towards cooler surroundings. Several pathways contribute, including conduction through the cup and bench, air movement and surface evaporation. This chapter focuses on conduction and contact, so contact with the bench is not the whole story. Our contact model explains part of the cooling; a complete account includes other transfer processes.",
      visualIntent: "Chart warm water cooling towards room temperature and separate contact conduction arrows from muted air-movement and evaporation pathways labelled beyond today's focus."
    },
    {
      id: "ch09-scene-08",
      title: "Meeting In The Middle",
      narration: "Place a sealed bottle of cool water in a bowl of comfortably warm water. The bottle water warms and the bowl water cools. Their temperatures move closer together. When they reach the same temperature, there is no overall heat transfer in one direction between them. This state is called thermal equilibrium. For now, think of it as settling at the same temperature. The particles do not stop moving. Small energy transfers can still occur in both directions, but they balance overall. Use a sealed plastic bottle and adult-prepared warm tap water. Do not use hot glass.",
      visualIntent: "Animate two thermometer traces converging for a sealed cool-water bottle in warm tap water; keep particles moving after the traces meet."
    },
    {
      id: "ch09-scene-09",
      title: "Equilibrium Is Not Instant",
      narration: "The temperatures do not become equal the moment the bottle touches the water. Transfer takes time. Early on, the temperature difference is larger and readings may change more noticeably. Later, as the difference shrinks, changes often slow. The final shared temperature depends on water amounts, starting temperatures, the container and energy exchanged with the room. We will not calculate it here. Our claim is simpler: energy transfers from warmer regions towards cooler regions, reducing temperature differences. The exact result needs measurements and a more detailed model.",
      visualIntent: "Run a time-lapse graph with steep early changes and flatter later changes; reveal factors affecting the final reading without introducing equations."
    },
    {
      id: "ch09-scene-10",
      title: "Feeling Can Mislead",
      narration: "Return to the room-temperature metal and wood. Their thermometer readings match, but the metal feels cooler. Your warmer hand transfers energy to both objects. Metal carries that energy away from the contact point faster. Your skin cools faster and reports a cooler feeling. The metal did not start at a lower temperature. Touch mixes up two ideas: temperature and transfer rate. Scientists use thermometers and fair comparisons to separate them. Never test unknown hot or cold objects with bare skin. With safe room-temperature materials, a brief touch can raise the question. The thermometer checks the starting temperatures.",
      visualIntent: "Compare hand-to-metal and hand-to-wood transfer rates at equal measured temperature; highlight faster skin cooling beside metal, with a no-touch-unknowns symbol."
    },
    {
      id: "ch09-scene-11",
      title: "Everyday Insulation",
      narration: "Wrap one cup of room-temperature water in a clean woollen sleeve and leave an identical cup unwrapped. Place both in the same cool location and measure over time. The sleeve can slow energy transfer between water and surroundings. It does not create heat or make cold disappear. Insulation slows transfer in either direction, so an insulated bag can help warm food stay warm and cool food stay cool. Use unbreakable containers, wipe spills and do not drink experimental water. Compare equal volumes, matching cups and equal starting temperatures.",
      visualIntent: "Show wrapped and unwrapped matched cups with slow and fast transfer arrows; connect the same insulation principle to warm and cool food storage."
    },
    {
      id: "ch09-scene-12",
      title: "Repair The Heat Claims",
      narration: "Repair four common claims. 'Metal is naturally colder than wood' becomes 'metal may feel colder because it transfers energy from skin faster.' 'Cold flows into my hand' becomes 'energy transfers from the warmer hand towards the cooler object.' 'An insulator stops all heat' becomes 'an insulator slows heat transfer.' 'At equilibrium, particles stop' becomes 'temperatures are equal overall, but particle motion continues.' Each repair names a measurable condition or mechanism. Avoid saying heat rises as a universal rule. Warm fluids can rise because of density changes and movement, but conduction itself can transfer energy in any direction through contact, including downwards along a solid object.",
      visualIntent: "Correct four misconception cards using measured-temperature, direction, rate and equilibrium tiles; finish with conduction arrows pointing up, down and sideways."
    },
    {
      id: "ch09-scene-13",
      title: "Choose The Best Material",
      narration: "A lunch container must slow warming of chilled fruit until break time. Choose between a thin metal box and an insulated container with a fitted lid. The insulated container is the better choice because it slows energy transfer from warmer surroundings towards cooler food. The lid also reduces air exchange, although our focus is the insulating material. This does not guarantee the food remains at one exact temperature all day. Performance depends on time, starting temperature, thickness, gaps and the environment. Food-safety decisions require adult guidance and proper cold packs. Our science claim is limited: compared under similar conditions, an effective insulator reduces the rate of temperature change.",
      visualIntent: "Present a practical lunch-container choice with temperature-over-time curves; include an adult food-safety boundary and no absolute-temperature promise."
    },
    {
      id: "ch09-scene-14",
      title: "Plan A Contact Investigation",
      narration: "Plan a fair, low-risk conduction test. An adult places equal metal and wooden spoons to the same depth in comfortably warm tap water. Record each handle's starting temperature, wait the same time, then measure the same point on each handle with a suitable thermometer. Keep spoon dimensions as similar as possible and repeat. Do not judge by grabbing the handles, and do not use boiling water, flames, hotplates or glass that may break. The planned difference is material; other conditions should match. If results vary, report them. Surface coatings, spoon thickness and measurement delay could matter. Fair tests reduce confusion, but they do not remove every limitation.",
      visualIntent: "Build a stepwise fair-test plan around two spoons, adult-prepared warm water, fixed depth, timer and thermometer; show excluded hazardous equipment."
    },
    {
      id: "ch09-scene-15",
      title: "Tell The Whole Transfer Story",
      narration: "Use a four-part heat-transfer explanation. First, compare temperatures: the water begins warmer than the spoon. Second, name the pathway: they touch, allowing conduction through the spoon. Third, state the direction: energy transfers from warmer water towards cooler metal. Fourth, predict the trend: the spoon warms and the temperature difference becomes smaller as the system moves towards equilibrium. Then add a model limit: our vibrating dots do not show exact scale or every mechanism in a metal. This pattern also explains a cold bottle warming in a room, with the room as the warmer surroundings. Temperature is the measurement; heat transfer is the process that changes it.",
      visualIntent: "Complete a four-step transfer storyboard for spoon and cold-bottle examples, then append a model-limit footer and a final temperature-versus-process contrast.",
      checkpoint: {
        prompt: "What four ideas belong in a complete contact heat-transfer explanation?",
        answer: "Temperature comparison, contact pathway, transfer direction, and the temperature trend towards equilibrium."
      }
    }
  ],
  tests: [
    {
      prompt: "A thermometer shows a metal spoon and wooden spoon are both 21 degrees Celsius. Why might the metal feel cooler?",
      options: ["The thermometer must be wrong", "Metal transfers energy away from your hand faster", "Wood creates heat", "Cold particles leave the metal"],
      answer: 1,
      concept: "temperature-vs-sensation",
      feedback: "Equal-temperature materials can feel different because they conduct energy from your skin at different rates."
    },
    {
      prompt: "What is temperature in this chapter?",
      options: ["A measurement of how hot or cold something is", "Energy travelling between objects", "A substance stored in a cup", "The speed of every single particle"],
      answer: 0,
      concept: "temperature",
      feedback: "Temperature is a measured quantity; heat transfer is the energy-transfer process that can change it."
    },
    {
      prompt: "A cool spoon is placed in comfortably warm water. What is the initial direction of heat transfer?",
      options: ["From spoon to water", "There is no transfer because both contain particles", "From warmer water towards cooler spoon", "Cold flows from spoon into water"],
      answer: 2,
      concept: "transfer-direction",
      feedback: "Energy transfers from the warmer water towards the cooler spoon."
    },
    {
      prompt: "Which statement best describes conduction through a solid spoon?",
      options: ["The spoon's particles race into the handle", "Energy transfers through interactions between neighbouring regions", "Heat appears only at the top", "Cold is carried downwards"],
      answer: 1,
      concept: "conduction",
      feedback: "In the simple model, neighbouring interactions transfer energy while the solid's particles remain in overall positions."
    },
    {
      prompt: "What does a thermal insulator do?",
      options: ["Stops all energy transfer forever", "Creates heat when wrapped around a cup", "Makes every object room temperature instantly", "Slows energy transfer under the same conditions"],
      answer: 3,
      concept: "insulation",
      feedback: "An insulator slows transfer; it does not stop transfer completely or create heat."
    },
    {
      prompt: "A cool sealed bottle sits in warmer water until both readings are the same. What has been reached?",
      options: ["Thermal equilibrium", "Absolute zero", "A chemical reaction", "A state with no particle motion"],
      answer: 0,
      concept: "thermal-equilibrium",
      feedback: "At thermal equilibrium there is no overall one-way heat transfer caused by a temperature difference, but particle motion continues."
    },
    {
      prompt: "Which is a limitation of the chapter's vibrating-dot conduction model?",
      options: ["It cannot compare warmer and cooler regions", "It shows every particle and force exactly", "It leaves out exact scale and detailed electron behaviour in metals", "It proves touch is always accurate"],
      answer: 2,
      concept: "model-limits",
      feedback: "The simple model shows an energy-motion pattern but omits exact scale and important microscopic details."
    },
    {
      prompt: "Which investigation is low risk and fair?",
      options: ["Heating sealed glass over a flame", "Comparing matched spoons in adult-prepared warm tap water for equal times", "Grabbing unknown hot handles", "Using boiling water without an adult"],
      answer: 1,
      concept: "safety-and-fair-testing",
      feedback: "Matched conditions, warm tap water, thermometer readings and adult preparation support a fair low-risk comparison."
    },
    {
      prompt: "Why does a cup of warm water eventually cool in a room?",
      options: ["Its heat is used up and disappears", "Coldness enters as a material", "Energy transfers from the warmer cup and water towards cooler surroundings", "All water particles stop moving"],
      answer: 2,
      concept: "cooling",
      feedback: "Cooling occurs as energy transfers from warmer water and cup towards cooler surroundings through several pathways."
    },
    {
      prompt: "Which explanation correctly links temperature and heat transfer?",
      options: ["Temperature travels while heat is the thermometer number", "A temperature difference can drive energy transfer from warmer to cooler", "Equal temperatures mean particles stop", "Conduction only moves energy upwards"],
      answer: 1,
      concept: "integrated-transfer-model",
      feedback: "A temperature difference drives net energy transfer towards cooler regions; equal temperatures remove that overall direction."
    }
  ]
};

export const chapters = [chapter8, chapter9];

export default chapters;
