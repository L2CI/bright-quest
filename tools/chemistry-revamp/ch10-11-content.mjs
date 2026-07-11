const question = (prompt, options, answer, concept, feedback) => ({
  prompt,
  options,
  answer,
  concept,
  feedback
});

export const chapter10 = {
  id: "melting-not-disappearing",
  number: 10,
  title: "Melting Is Not Disappearing",
  shortTitle: "Melting",
  durationTarget: 660,
  learningOutcome: "Explain melting and freezing as reversible state changes, use evidence to show that material is conserved, and read a simple heating curve without advanced mathematics.",
  scenes: [
    {
      id: "ch10-scene-01",
      title: "The Ice Cube Mystery",
      narration: "Place one ice cube in a sealed, clear bag, set the bag on a plate, and start a timer. We can watch without touching very cold water or making a slippery puddle. At first the cube has straight edges and keeps its own shape. Later, liquid gathers inside the bag and takes the shape of the bottom. Something has changed, but let us be precise about what. The cube shape is disappearing from view. The water is not disappearing. Our investigation will track the material called water before, during, and after this change.",
      visualIntent: "Close view of a labelled sealed bag on a plate; timer begins beside a sharp-edged ice cube, with a persistent WATER label.",
      checkpoint: "What should we track: the cube shape, the water material, or both?"
    },
    {
      id: "ch10-scene-02",
      title: "State, Shape and Material",
      narration: "Three words help us untangle the evidence: material, state, and shape. Water is the material. Solid and liquid are states. Cube and puddle describe shapes. Before melting, we have solid water in a cube shape. After melting, we have liquid water in the shape of the bag and plate beneath it. A learner might say, 'The ice is gone.' In everyday talk that can mean the solid shape is gone. In chemistry, we repair the sentence: the solid state changed, but the water material remained. Precise words stop an ordinary change from sounding like matter was destroyed.",
      visualIntent: "A three-column board keeps WATER fixed while STATE changes from solid to liquid and SHAPE changes from cube to shallow pool."
    },
    {
      id: "ch10-scene-03",
      title: "A Fair Time-Lapse",
      narration: "Let us plan a safe time-lapse rather than simply wait. Keep the camera still, keep the sealed bag on the same plate, and take one image every two minutes. Add a card showing the time in each frame. Do not hold the ice against skin, taste the water, or leave melted water where someone could slip. An adult can help position the device so it will not fall. The changing outline becomes our evidence. A time-lapse speeds up playback, not the melting itself. It is a record made from separate observations, so gaps between frames are not events we directly saw.",
      visualIntent: "Overhead setup diagram followed by a strip of evenly timed frames; safety icons show sealed bag, stable device and dry floor.",
      checkpoint: "Why must the camera, plate and timing stay consistent?"
    },
    {
      id: "ch10-scene-04",
      title: "Reading the Evidence",
      narration: "Now compare the first, middle, and final frames. In frame one, nearly all the water is solid. In the middle, solid ice and liquid water are both present. In the final frame, the visible cube may be gone, yet liquid remains inside the same sealed bag. Some water may cling to a fold where the camera cannot show it clearly. Still, the labelled, closed setup gives strong evidence against the claim that the water vanished. We can describe the change without asking one photograph to tell the whole story.",
      visualIntent: "Three evidence frames with observation callouts separated from an inference panel; hidden droplets behind creases are acknowledged."
    },
    {
      id: "ch10-scene-05",
      title: "Conservation in a Closed Bag",
      narration: "Suppose a sensitive balance measures the sealed bag before and after melting. If nothing enters, leaves, or spills, the measured mass should stay about the same. The material has been conserved: it is still present even though its state and shape changed. A balance has limited precision, so the last digit may differ slightly. That tiny difference does not mean water was created or destroyed. We look for readings that are about the same. This balance comparison belongs in an adult-led or app demonstration, not a required home experiment.",
      visualIntent: "A digital balance shows matching readings within a shaded precision band; a callout distinguishes conservation from perfect instruments."
    },
    {
      id: "ch10-scene-06",
      title: "Energy Enters the Story",
      narration: "Why does the ice melt on the plate? The surroundings are warmer than the ice, so energy is transferred to the colder water. We often say the ice gains heat. Heat is energy being transferred because of a temperature difference; it is not a substance poured into the cube. As energy arrives, melting can occur. The room cools by an amount far too small for us to notice here. We do not need boiling water, a heater, or a flame. Room-temperature surroundings provide a slow, low-risk change that is ideal for observation and gives the camera time to collect useful evidence.",
      visualIntent: "Warm-room arrows point towards the colder sealed ice, while a crossed-out icon rejects flames, kettles and direct heaters."
    },
    {
      id: "ch10-scene-07",
      title: "A Simple Heating Curve",
      narration: "This graph tells a story without advanced maths. Time runs from left to right. Temperature runs from lower to higher. First, the line rises as cold ice warms. For pure water, melting happens at about 0 degrees Celsius. The line becomes flatter while melting takes place. After all the ice is liquid, the line can rise again as the water warms. Read the shape: rise, flatter section, rise. Our graph is simplified, so real classroom points may wobble instead of making a smooth line. We care about the pattern, not calculating a slope.",
      visualIntent: "Large axes labelled time and temperature; three colour-coded regions read SOLID WARMS, MELTING, and LIQUID WARMS.",
      checkpoint: "During which part are solid and liquid present together?"
    },
    {
      id: "ch10-scene-08",
      title: "Why the Line Flattens",
      narration: "A common question is, 'If energy keeps arriving, why does the temperature stop rising for a while?' During the flatter part, incoming energy helps change solid water into liquid water. It is not mainly making the temperature climb. That is why temperature can stay nearly steady while both states are present. Once melting is complete, more energy can raise the liquid's temperature again. This simple graph shows the main pattern, not every small change that a real thermometer may record.",
      visualIntent: "Energy tokens enter continuously; during the middle region they move a solid-to-liquid progress bar instead of lifting the thermometer."
    },
    {
      id: "ch10-scene-09",
      title: "The Particle Model",
      narration: "We can use a particle model to explain the state change. In the solid picture, dots are close together in an organised arrangement and vibrate around positions. In the liquid picture, dots remain close but can move past neighbours. We keep the same number, colour, and size of dots to represent the same material. The model helps us think about arrangement and movement. It is not a microscope photograph. Real water particles are not coloured circles, the spaces are not drawn to scale, and the model does not show every attraction or collision. Its value is explaining evidence, not copying reality exactly.",
      visualIntent: "Side-by-side solid and liquid dot models retain identical dots; a MODEL, NOT PHOTOGRAPH banner lists what the drawing omits."
    },
    {
      id: "ch10-scene-10",
      title: "Freezing Reverses the Change",
      narration: "Now run the state-change story in reverse. Place liquid water in an ice tray and put it in a freezer. Energy transfers from the warmer water to the colder surroundings inside the freezer. Over time, the liquid becomes solid. That is freezing. The freezer does not add 'cold stuff'; it helps energy leave the water. The material remains water throughout. A safe investigation can mark the tray level before freezing and photograph it before and after, with an adult handling the freezer space. Never taste investigation samples, and never seal water in a rigid, completely full container because expanding water can damage it.",
      visualIntent: "Reversible arrows connect liquid water and ice; energy arrows leave the tray towards the freezer coils, with a no-full-rigid-container warning."
    },
    {
      id: "ch10-scene-11",
      title: "The Cooling Curve",
      narration: "A cooling curve tells the reverse story. As liquid water cools, the graph slopes downward. Pure water freezes at about 0 degrees Celsius. During freezing, the line becomes flatter while liquid and solid are both present. After freezing is complete, the solid can cool further and the line slopes down again. Read it as fall, flatter section, fall. We are not asking for negative numbers or rate calculations. We are matching graph regions to events we can observe. The graph is simplified, so real freezer readings may wobble instead of following straight lines.",
      visualIntent: "Cooling graph mirrors the heating graph, with animated state icons travelling across LIQUID COOLS, FREEZING, and SOLID COOLS."
    },
    {
      id: "ch10-scene-12",
      title: "Different Materials, Same Question",
      narration: "Ice is not the only solid that can melt. Chocolate, butter, and candle wax can also become liquids under suitable conditions, but they do not all melt at the same temperature or in exactly the same way. Some mixtures soften across a range before they flow. For our child-led observation, we stay with sealed ice at room temperature. Hot wax can burn skin and must never be heated for this activity. Chocolate and butter can be shown in recorded adult demonstrations. The transferable question is always: which material are we tracking, what state was it in, and what state is it in now?",
      visualIntent: "A comparison shelf shows ice, chocolate, butter and wax with different melting ranges; only sealed ice receives a CHILD OBSERVATION badge.",
      checkpoint: "Does every material melt at the same temperature? Explain from the examples."
    },
    {
      id: "ch10-scene-13",
      title: "Melting Is a Physical Change",
      narration: "When water melts or freezes, it remains water. No new material is needed to explain the evidence. We call this a physical change: state and appearance change while the substance stays the same. Not every change caused by heating is melting. Toast browning, paper burning, and an egg cooking make different materials. We will not investigate flames or hot cooking here. The words 'it got warm' do not name a process. Look for evidence that a solid became its own liquid, then ask whether freezing can reverse the state change.",
      visualIntent: "Sorting board contrasts reversible water state changes with app-only images of browning, burning and cooking; no hazardous action is demonstrated."
    },
    {
      id: "ch10-scene-14",
      title: "Challenge the Claims",
      narration: "Let us test three claims. Claim one: 'The cube disappeared, so the material was destroyed.' Reject it; liquid water remains. Claim two: 'The flat graph means no energy enters.' Reject it; energy supports the state change while temperature stays nearly steady. Claim three: 'Particle dots show exactly what water looks like.' Reject that too; dots are model symbols. A strong explanation joins evidence and reasoning: the sealed bag still contains water, the state changes from solid to liquid, and the simple graph becomes flatter during melting. Several clues support one careful conclusion.",
      visualIntent: "Three misconception cards are stamped REVISE, then rebuilt into evidence-reasoning statements with matching visuals."
    },
    {
      id: "ch10-scene-15",
      title: "The Complete Melting Story",
      narration: "Here is the complete story. In a safe time-lapse, solid water loses its cube shape and becomes liquid water. In a sealed system, the material is conserved. Energy transfers from warmer surroundings to colder ice. A simple heating curve rises, flattens during melting, then rises again. A cooling curve reverses the pattern during freezing. The particle model shows close particles changing from mostly fixed positions to movement past neighbours, but it is not a photograph. Whenever an object seems to vanish, ask: what material am I tracking, what evidence remains, and did its state change?",
      visualIntent: "Final concept map links time-lapse evidence, conservation, energy transfer, curves, freezing and the model-limitation badge.",
      checkpoint: "Explain melting in one sentence using material, state and energy."
    }
  ],
  tests: [
    question("Which description is most precise after an ice cube melts in a sealed bag?", ["The water was destroyed", "The cube shape changed, but the water remained", "The ice turned into heat", "The bag created new water"], 1, "conservation", "Melting changes the state and shape; the water material remains present."),
    question("What makes a time-lapse comparison fairer?", ["Moving the camera closer each time", "Changing both the plate and room", "Keeping the setup fixed and taking images at equal intervals", "Opening the bag between every frame"], 2, "investigation-design", "A fixed setup and regular timing make changes between frames easier to compare."),
    question("What pattern belongs to a simple heating curve for melting?", ["Rise, flatter section, rise", "Flat, fall, disappear", "Fall, steeper fall, fall", "Rise only, with no state-change region"], 0, "heating-curve", "The solid warms, melting gives a flatter region, and the liquid then warms."),
    question("Why can the temperature stay nearly steady while melting continues?", ["The thermometer stops working during every melt", "No energy reaches the material", "The material has vanished", "Incoming energy is mainly supporting the state change"], 3, "energy-and-state", "During melting, transferred energy supports the change from solid to liquid rather than mainly raising temperature."),
    question("Which statement about the particle drawing is correct?", ["It is a microscope photograph", "It models arrangement and movement but leaves out many details", "It proves particles are coloured circles", "It shows spaces and sizes exactly to scale"], 1, "model-limitations", "The dots are a simplified thinking model, not an exact picture of particles."),
    question("Freezing changes water from...", ["gas to liquid", "solid to liquid", "liquid to solid", "water to a new substance"], 2, "freezing", "Freezing changes liquid water to solid water."),
    question("In a sealed-bag balance demonstration, a tiny last-digit difference most reasonably suggests...", ["water was destroyed", "the state change failed", "ice is not matter", "measurement limits should be considered"], 3, "measurement", "Balances have limited precision, so a tiny difference does not overturn conservation."),
    question("Which is the safest child-led melting observation?", ["Heating wax over a flame", "Watching sealed ice melt on a plate", "Holding ice on bare skin for ten minutes", "Pouring boiling water over chocolate"], 1, "safety", "Sealed ice melting at room temperature avoids flames, boiling water and spills."),
    question("Which change is NOT simply melting?", ["An ice cube becoming liquid water", "Solid wax becoming liquid wax in an adult demonstration", "Butter becoming liquid when warmed", "Bread turning brown in a toaster"], 3, "physical-change", "Browning forms different materials; it is not a solid simply becoming its own liquid."),
    question("What does the flatter region of a simple cooling curve represent?", ["Freezing while liquid and solid are both present", "Water disappearing", "A camera speeding up time", "The solid warming rapidly"], 0, "cooling-curve", "The flatter region represents freezing, when liquid and solid can coexist.")
  ]
};

export const chapter11 = {
  id: "dissolving-not-melting",
  number: 11,
  title: "Dissolving Is Not Melting",
  shortTitle: "Dissolving",
  durationTarget: 660,
  learningOutcome: "Distinguish dissolving from melting, identify solute, solvent and solution, separate dissolving rate from amount dissolved, and use saturation and recovery as evidence that dissolved material remains.",
  scenes: [
    {
      id: "ch11-scene-01",
      title: "Two Vanishing Acts",
      narration: "Watch two clear containers. In the first, an ice cube sits on a plate and becomes liquid water. In the second, a measured spoonful of salt is stirred into room-temperature water until the grains cannot be seen. Both solids seem to vanish, but the stories differ. The ice changed state: solid water became liquid water. The salt spread through another material, water, to make a mixture. That is dissolving. Looking similar is not enough to name a process. We need to track which materials are present, whether a new liquid state formed, and what evidence could help us recover the hidden material.",
      visualIntent: "Split-screen investigation contrasts an ice-to-water state change with labelled salt grains dispersing through water.",
      checkpoint: "What evidence would distinguish melting from dissolving?"
    },
    {
      id: "ch11-scene-02",
      title: "Meet the Three Roles",
      narration: "Chemists use three role words. The solute is the material that dissolves; in our example, salt is the solute. The solvent is the liquid doing the dissolving; water is the solvent. The solution is the even-looking mixture produced when the solute spreads through the solvent. These are roles in a particular mixture, not permanent surnames. Water is often a solvent, but not every liquid is water, and not every substance dissolves in water. The word solution does not mean 'the answer to a question' here. It names the whole mixture, including both the dissolved solute and the solvent.",
      visualIntent: "Three labelled cards attach to salt, water and the final cup; arrows combine SOLUTE plus SOLVENT into SOLUTION."
    },
    {
      id: "ch11-scene-03",
      title: "A Safe Dissolving Investigation",
      narration: "For a low-risk investigation, use drinking water, table salt, identical clear cups, clean spoons, labels, and adult supervision. Wear eye protection if your class rules require it, wipe spills promptly, and wash hands afterwards. The materials are known, but the cups are investigation samples, so do not taste them. Never taste an unknown powder to identify it. Do not mix household cleaners, medicines, garden chemicals, or mystery substances. We can answer strong questions using tiny measured amounts of familiar salt and cool or lukewarm water. No flame, kettle, hotplate, or boiling is needed, and the solution should be poured away as an adult directs.",
      visualIntent: "Bench checklist shows labelled food-grade materials and spill cloth; hazard panel excludes tasting, cleaners, medicines, mystery powders and heat."
    },
    {
      id: "ch11-scene-04",
      title: "Dissolving Is Not Melting",
      narration: "Let us repair the common claim, 'The salt melted in the water.' Melting means a solid becomes its own liquid because of a state change. Dissolving means a solute spreads through a solvent to form a solution. The salt has not become a little puddle of liquid salt. At ordinary classroom temperatures, it remains salt distributed through water. Warm water may help salt dissolve faster, but faster dissolving is still dissolving, not melting. Temperature alone does not name the process. Ask whether one material changed state or whether one material spread through another. That question separates the two stories cleanly.",
      visualIntent: "A comparison table highlights ONE MATERIAL, STATE CHANGE for melting and TWO MATERIALS, MIXTURE for dissolving."
    },
    {
      id: "ch11-scene-05",
      title: "Where Did the Salt Go?",
      narration: "The cup may look clear after stirring, but clear does not mean pure water and invisible does not mean gone. Our particle model shows salt spread among water particles. This helps explain why separate grains are no longer visible. The dots are symbols, not a photograph, and their size and spacing are not to scale. The model gives us an idea to test. Evidence from measured mass, saturation, or later recovery supports the claim that salt remains in the solution.",
      visualIntent: "Salt symbols separate among water symbols while a model-limit panel lists not a photo, not to scale, simplified particles and needs evidence."
    },
    {
      id: "ch11-scene-06",
      title: "Rate Means How Fast",
      narration: "Now investigate rate: how quickly dissolving happens. Put equal amounts of salt into equal volumes of water at the same temperature. Stir one cup gently at a steady pace and leave the other still. The stirred sample usually loses visible grains sooner because moving water repeatedly brings fresh solvent near the solute. Stirring changes the rate, not necessarily the final maximum amount that can dissolve under those conditions. To make this a fair comparison, change only stirring. Equal salt, equal water, equal cups, and equal temperature let us connect the different time to the factor we tested.",
      visualIntent: "Two matched cups differ only by a stirring arrow; a stopwatch measures time until visible grains are gone.",
      checkpoint: "Which variable changes, and which variables must stay the same?"
    },
    {
      id: "ch11-scene-07",
      title: "Smaller Pieces, Faster Mixing",
      narration: "Particle size can also affect rate. Compare one coarse salt sample with the same mass of fine salt in matching cups. Fine grains expose more surface to the water, so they often dissolve faster when all other conditions match. Use shop-bought food salt, pour it gently, and keep it away from faces. Do not grind any material for this activity. Again, faster does not mean more can dissolve. The fine sample may finish first, while both cups end with the same amount dissolved if each began below the saturation limit.",
      visualIntent: "Equal-mass coarse and fine salt samples enter identical cups; highlighted outer surfaces connect to separate timers, not different final totals."
    },
    {
      id: "ch11-scene-08",
      title: "Temperature and Rate",
      narration: "Temperature can change dissolving rate too. An adult prepares equal cups of cool and lukewarm water, never hot enough to burn. Add equal amounts of the same salt and stir each in the same way. In this salt investigation, the grains may dissolve faster in warmer water. Keep rate separate from amount: grains disappearing sooner tell us about time. They do not tell us the greatest amount of salt that the water can hold. Our result is about this salt and this test, not every solute.",
      visualIntent: "Cool and adult-checked lukewarm cups use equal measures and matched stirring; two clocks emphasise rate while a maximum-amount gauge remains unanswered."
    },
    {
      id: "ch11-scene-09",
      title: "Amount Is How Much",
      narration: "Amount asks a different question: how much solute can dissolve in a fixed volume of solvent under stated conditions? Imagine adding salt in small measured portions, stirring for the same generous time after each addition. Early portions disappear from sight. Eventually, extra salt may remain on the bottom even after patient stirring. Stirring harder might help grains dissolve sooner, but it cannot guarantee unlimited dissolving. A stopwatch answers rate. A count or mass of added portions helps answer amount. Mixing those questions leads to weak conclusions, such as claiming that the fastest cup must always hold the most solute.",
      visualIntent: "A split board contrasts stopwatch RATE evidence with measured-spoon AMOUNT evidence; a crossed arrow blocks the inference faster equals more."
    },
    {
      id: "ch11-scene-10",
      title: "Reaching Saturation",
      narration: "A solution is saturated when, under those conditions, it holds as much dissolved solute as it can and added solute remains undissolved. We approach this point carefully with small portions rather than dumping in a large pile. Salt resting at the bottom after enough stirring is evidence that the current water cannot dissolve all the added salt. It is not proof that no salt dissolved; the solution above contains dissolved salt while excess solid remains. Saturation depends on the solute, solvent, temperature, and amount of solvent. Change those conditions and the maximum dissolved amount may change too.",
      visualIntent: "Measured portions enter one by one until a persistent crystal layer remains; labels distinguish saturated solution from excess undissolved solute.",
      checkpoint: "What does solid at the bottom tell us, and what does it not tell us?"
    },
    {
      id: "ch11-scene-11",
      title: "More Solvent Changes the Limit",
      narration: "Suppose a saturated salt solution has crystals on the bottom. Add a measured amount of fresh water and stir again. Some remaining crystals may dissolve because there is now more solvent available. This is evidence that the earlier limit belonged to that particular amount of water under those conditions; the salt had not lost the ability to dissolve. Notice what we changed: solvent amount. If we also changed temperature, stirring, and salt type, we could not tell which factor mattered. Careful investigations isolate one question at a time and record exact amounts instead of relying on cup height or a quick glance.",
      visualIntent: "A measured cylinder adds water to a saturated cup; crystals shrink while a variable-control panel highlights solvent amount only."
    },
    {
      id: "ch11-scene-12",
      title: "Recovery Is Strong Evidence",
      narration: "How can we show that dissolved salt is still present? Recover it. In an adult-led demonstration, place a small amount of salt solution in a wide labelled dish and let water evaporate naturally in a secure place over several days. No heating is required. As water leaves into the air, salt crystals remain in the dish. The recovered crystals are strong evidence that the salt was part of the solution, not destroyed. Keep the dish away from children, pets, food areas, and open windows, and do not taste the crystals. Recovery may be incomplete because some solution can spill or cling to equipment.",
      visualIntent: "A multi-day covered observation sequence shows water level falling and labelled salt crystals appearing; safety boundary surrounds the adult-managed dish."
    },
    {
      id: "ch11-scene-13",
      title: "Mass Before and After",
      narration: "A sensitive balance offers another line of evidence. Measure a closed container holding water and a separate salt packet. Then combine them without losing material and measure the closed system again. The total mass should stay about the same. Dissolving changes how salt is spread, not the amount of matter. This belongs in an app or adult-led setup because an ordinary kitchen balance may not show small changes clearly. A slightly different last digit does not prove matter vanished. Good science reports the tool's limit instead of forcing the reading to look perfect.",
      visualIntent: "Before-and-after closed-system balance readings sit within an uncertainty band; icons flag spills, clinging drops and evaporation as error sources."
    },
    {
      id: "ch11-scene-14",
      title: "Not Everything Dissolves",
      narration: "Water does not dissolve every material. Clean sand settles, cooking oil forms a separate layer, and too much salt leaves crystals when saturation is reached. These outcomes are different. Sand in water is a mixture with undissolved solid. Oil and water form separate liquid regions. Extra salt can sit beneath a saturated salt solution even though some salt has dissolved. Do not call every mixture a solution or decide from colour alone. Observe whether the mixture becomes even-looking, whether material settles, and whether it can be recovered. These observations tell us what happened, but not every reason why.",
      visualIntent: "Three labelled columns compare settling sand, layered oil and saturated salt, with solution status and observation evidence beneath each."
    },
    {
      id: "ch11-scene-15",
      title: "The Complete Dissolving Story",
      narration: "Here is the complete story. A solute spreads through a solvent to form a solution; that process is dissolving, not melting. Stirring, smaller grains, and temperature can change the rate, which means how fast. The maximum amount dissolved is a separate question. When added solute remains after thorough stirring, the solution may be saturated under those conditions. Adding more solvent can change the limit, and natural evaporation can recover the solute as evidence that it never vanished. Particle diagrams help us imagine spreading but are simplified, not-to-scale models. Use known safe materials, tiny quantities, no tasting, no household chemicals, and no child-led heating.",
      visualIntent: "Final concept map connects vocabulary, rate factors, amount, saturation, added solvent, recovery evidence, model limits and safety rules.",
      checkpoint: "Use rate, amount and saturation correctly in a three-sentence explanation."
    }
  ],
  tests: [
    question("In salt water, which material is the solvent?", ["The salt", "The spoon", "The water", "The final crystals"], 2, "solution-vocabulary", "Water is the solvent because it does the dissolving in this example."),
    question("Which statement correctly distinguishes dissolving from melting?", ["Dissolving always needs boiling", "Dissolving spreads a solute through a solvent; melting changes a solid into its own liquid", "Melting forms every solution", "Both words mean a material vanished"], 1, "dissolving-vs-melting", "Dissolving forms a mixture; melting is a state change of one material."),
    question("What does stirring usually change in a fair salt-water investigation?", ["The dissolving rate", "The identity of salt", "The amount of water", "Salt into liquid salt"], 0, "rate", "Stirring usually changes how quickly dissolving happens."),
    question("Two cups eventually dissolve the same mass, but cup B finishes sooner. What differs?", ["The final amount only", "Whether matter is conserved", "The solvent identity", "The dissolving rate"], 3, "rate-vs-amount", "Finishing sooner means a faster rate, even when the final amount is the same."),
    question("After repeated additions and thorough stirring, salt remains on the bottom. What is the best conclusion?", ["No salt dissolved", "The visible salt has melted", "The solution may be saturated under those conditions", "Water has stopped being a solvent forever"], 2, "saturation", "Persistent excess solute suggests the solution has reached its dissolving limit under those conditions."),
    question("Why might adding more water dissolve some crystals in a saturated cup?", ["There is more solvent available", "Water turns crystals into heat", "Stirring creates new salt", "Saturation means every future condition is fixed"], 0, "solvent-amount", "More solvent can allow more solute to dissolve."),
    question("Which is strongest evidence that dissolved salt remained present?", ["The solution looked clear", "Salt crystals were recovered after water evaporated", "The cup was stirred quickly", "The salt grains became too small to see"], 1, "recovery-evidence", "Recovering crystals shows that salt remained part of the solution."),
    question("Which statement about a dissolving particle model is accurate?", ["It shows exact particle size and spacing", "It proves the solution is safe to taste", "It is a photograph of the liquid", "It represents spreading but leaves out important details"], 3, "model-limitations", "The diagram is a simplified model of spreading, not an exact photograph."),
    question("Which setup is low risk and scientifically useful?", ["Tasting an unknown powder", "Mixing household cleaners", "Using small amounts of table salt and room-temperature water with supervision", "Boiling a salt solution alone"], 2, "safety", "Known food-grade salt and room-temperature water avoid tasting, unknowns, cleaners and heating."),
    question("A clear mixture has no visible grains. What can we conclude from appearance alone?", ["The solute was destroyed", "It must be pure water", "It definitely contains the maximum possible solute", "Only that visible grains are absent; more evidence is needed"], 3, "evidence", "Clear appearance alone cannot show whether a solute is absent, dissolved, or at saturation.")
  ]
};

export const chapters = [chapter10, chapter11];

export default chapters;
