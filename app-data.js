(function () {
  const levelMeta = [
    { level: 1, name: "Warm Start", difficulty: "Foundation", minutes: 30, range: [20, 80], theme: "Number sparks and careful reading" },
    { level: 2, name: "Steady Builder", difficulty: "Core", minutes: 30, range: [40, 160], theme: "Patterns, punctuation, and pace" },
    { level: 3, name: "Careful Thinker", difficulty: "Core Plus", minutes: 30, range: [80, 400], theme: "Two-step thinking and inference" },
    { level: 4, name: "Exam Explorer", difficulty: "Stretch", minutes: 30, range: [120, 900], theme: "Calm choices under time" },
    { level: 5, name: "Scholarship Ready", difficulty: "Advanced", minutes: 30, range: [250, 2000], theme: "Precision and stamina" },
    { level: 6, name: "Timed Challenge", difficulty: "Advanced Plus", minutes: 30, range: [500, 5000], theme: "Fast starts, clean finishes" },
    { level: 7, name: "Scholarship Challenge", difficulty: "High Challenge", minutes: 30, range: [800, 10000], theme: "Pressure-proof performance" }
  ];

  const readingTexts = [
    {
      title: "The Lost Lunchbox",
      text: "Mina found a blue lunchbox under the library bench. She did not open it. Instead, she checked the name label, took it to the office, and left a note where she had found it.",
      questions: [
        ["What did Mina do first?", ["Opened the lunchbox", "Checked the name label", "Ate the lunch", "Went home"], 1, "The text says she checked the name label."],
        ["What does Mina's action show?", ["Carelessness", "Honesty", "Anger", "Fear"], 1, "She tried to return the lunchbox properly."]
      ]
    },
    {
      title: "The Garden Roster",
      text: "Every Friday, Arlo's class watered the vegetable garden. When rain clouds appeared, Arlo still filled the watering can, but his teacher asked him to wait and observe the weather first.",
      questions: [
        ["Why did the teacher ask Arlo to wait?", ["The garden was closed", "The can was broken", "It might rain", "It was lunch time"], 2, "Rain clouds suggest the garden may not need watering."],
        ["Which word best describes Arlo?", ["Prepared", "Lazy", "Unkind", "Forgetful"], 0, "He was ready to do his garden job."]
      ]
    },
    {
      title: "A New Rule",
      text: "The class voted to keep the reading corner quiet. Jules wanted to talk about every page, so he began writing tiny notes to share after reading time ended.",
      questions: [
        ["Why did Jules write notes?", ["To follow the quiet rule", "To avoid reading", "To hide his book", "To finish maths"], 0, "Writing notes let him save his thoughts without talking."],
        ["The new rule was chosen by", ["the principal", "a class vote", "Jules alone", "the librarian"], 1, "The text says the class voted."]
      ]
    },
    {
      title: "The Map Mistake",
      text: "Nora drew a map for her cousin, but she forgot to mark the bridge. Her cousin reached the creek and had to turn back. Nora added the bridge and a warning about the muddy path.",
      questions: [
        ["What was missing from Nora's first map?", ["The school", "The bridge", "The creek", "The path"], 1, "She forgot to mark the bridge."],
        ["What did Nora do after the mistake?", ["Gave up", "Blamed her cousin", "Improved the map", "Hid the map"], 2, "She added details to make the map clearer."]
      ]
    },
    {
      title: "The Quiet Captain",
      text: "Leo was chosen as team captain because he listened before giving advice. During the relay, he noticed that one runner looked nervous and offered to practise the changeover twice more.",
      questions: [
        ["Why was Leo chosen as captain?", ["He ran fastest", "He listened before advising", "He shouted loudly", "He owned the batons"], 1, "The reason is stated in the first sentence."],
        ["What did Leo notice?", ["A runner was nervous", "The track was wet", "The race was cancelled", "The baton was missing"], 0, "He noticed one runner looked nervous."]
      ]
    },
    {
      title: "The Mystery Shadow",
      text: "At sunset, Priya saw a long shadow slide across the wall. It looked enormous, but when she turned around, she saw a small toy standing close to the lamp.",
      questions: [
        ["Why did the shadow look enormous?", ["The toy was huge", "The lamp made the shadow larger", "The wall moved", "It was raining"], 1, "A nearby lamp can make a small object cast a large shadow."],
        ["How did Priya solve the mystery?", ["She turned around", "She ran outside", "She called a teacher", "She opened a book"], 0, "She turned and saw the toy."]
      ]
    },
    {
      title: "The Borrowed Compass",
      text: "Sam borrowed a compass for a bushwalk activity. He returned it with a cracked lid and a note explaining exactly what happened when he slipped on gravel.",
      questions: [
        ["Why did Sam leave a note?", ["To explain the damage", "To ask for a snack", "To cancel the walk", "To label the compass"], 0, "The note explained how the lid cracked."],
        ["Which trait does Sam show?", ["Responsibility", "Jealousy", "Impatience", "Confusion"], 0, "He returned the item and explained what happened."]
      ]
    }
  ];

  const grammarLessons = {
    "Addition and subtraction": lesson("Break apart numbers", "Split each number into tens and ones, then recombine.", ["Underline the operation.", "Add or subtract tens first.", "Check the ones carefully."], "47 + 28 = 40 + 20 + 7 + 8 = 75", "What is 36 + 27?", ["53", "63", "73", "64"], 1),
    "Subtraction with regrouping": lesson("Regroup without panic", "When the top ones digit is smaller, borrow one ten and keep going.", ["Line up place values.", "Regroup one ten into ten ones.", "Subtract ones, then tens."], "62 - 28 = 34", "What is 71 - 36?", ["35", "45", "47", "25"], 0),
    "Multiplication facts": lesson("Equal groups", "Multiplication is a fast way to add equal groups.", ["Find the number of groups.", "Find how many in each group.", "Multiply or skip count."], "5 groups of 6 = 30", "There are 7 bags with 4 cards in each. How many cards?", ["11", "24", "28", "32"], 2),
    "Division as sharing": lesson("Share fairly", "Division splits a total into equal groups.", ["Find the total.", "Find how many groups.", "Share until each group is equal."], "24 shared by 6 = 4 each", "32 pencils shared by 8 students gives each student...", ["4", "6", "8", "24"], 0),
    "Number patterns": lesson("Spot the rule", "Most pattern questions use a repeated rule.", ["Compare neighbouring numbers.", "Find what changes.", "Apply the same change once more."], "9, 14, 19 adds 5 each time", "What comes next? 12, 18, 24, 30, ___", ["34", "36", "38", "42"], 1),
    "Place value": lesson("Read the place", "A digit's value depends on where it sits.", ["Read from right: ones, tens, hundreds, thousands.", "Name the place.", "Convert the digit into its value."], "In 4,382, the 3 means 300.", "In 5,726, what is the value of 7?", ["7", "70", "700", "7000"], 2),
    "Fractions": lesson("Equal parts only", "A fraction names equal parts of a whole.", ["Check the parts are equal.", "Top number counts chosen parts.", "Bottom number counts total parts."], "3 out of 4 equal parts is 3/4.", "Which means one quarter?", ["1/2", "1/3", "1/4", "4/1"], 2),
    "Time": lesson("Add minutes in chunks", "Time questions get easier when you jump to the next hour.", ["Start at the time given.", "Add easy chunks first.", "Check if you crossed an hour."], "3:45 + 30 minutes = 4:15", "9:20 plus 35 minutes is...", ["9:45", "9:55", "10:05", "10:15"], 1),
    "Money": lesson("Convert cents to dollars", "Two 50-cent coins make one dollar.", ["Count the coins.", "Multiply by the coin value.", "Convert cents if needed."], "6 fifty-cent coins = 300 cents = $3.00", "8 fifty-cent coins equal...", ["$2.00", "$3.00", "$4.00", "$8.00"], 2),
    "Data": lesson("Compare, don't guess", "Graphs and charts are about reading the labels and numbers.", ["Read the title.", "Match labels to numbers.", "Compare the values."], "18 is greater than 15, 12, and 9.", "Which is largest: 14, 19, 17, 11?", ["14", "19", "17", "11"], 1),
    "Measurement": lesson("Choose sensible units", "The unit should fit the object.", ["Tiny objects use millimetres or centimetres.", "Rooms use metres.", "Long trips use kilometres."], "A classroom is measured in metres.", "Best unit for the distance to another city?", ["millimetres", "centimetres", "metres", "kilometres"], 3),
    "Multi-step word problem": lesson("One step at a time", "Multi-step questions hide two smaller questions inside one story.", ["Circle the numbers.", "Write step 1.", "Use step 1 to answer step 2."], "4 boxes of 6, then lose 5: 24 - 5 = 19", "5 bags with 8 marbles, then 6 are lost. How many left?", ["34", "40", "46", "30"], 0),
    "Reading comprehension": lesson("Find the proof", "A comprehension answer must be supported by the text.", ["Read the question first.", "Find the matching sentence.", "Choose the option with proof."], "If the text says clouds appeared, rain is likely.", "If a character returns a lost item, they are probably...", ["honest", "sleepy", "angry", "lost"], 0),
    "Inference": lesson("Text clues plus thinking", "Inference means using clues to work out what is not directly said.", ["Find the clue.", "Ask what it suggests.", "Avoid answers with no evidence."], "Dark clouds suggest rain.", "A character whispers in a library because...", ["it is quiet there", "it is raining", "they are cooking", "they are swimming"], 0),
    "Vocabulary": lesson("Use context clues", "The sentence around a word often hints at its meaning.", ["Replace the tricky word with each option.", "Keep the sentence meaning the same.", "Choose the closest match."], "Enormous means huge.", "Closest meaning to cautious?", ["careful", "quick", "bright", "empty"], 0),
    "Spelling": lesson("Look for common patterns", "Slow down and check letter order.", ["Say the word in parts.", "Look for common chunks.", "Compare every option."], "because: be-cause", "Pick the correct spelling.", ["becaus", "because", "becuase", "beacuse"], 1),
    "Grammar": lesson("Make the sentence match", "Grammar questions often test whether words agree and make sense.", ["Find the subject.", "Find the verb.", "Check tense and number."], "The bird flies. The birds fly.", "Choose correct: The books ___ on the shelf.", ["is", "are", "was", "be"], 1),
    "Punctuation": lesson("Punctuation shows how to read", "Marks help the reader pause, ask, or hear speech.", ["Question asks something.", "Commas separate list items.", "Speech marks hold spoken words."], "Where is my bag?", "Which needs a question mark?", ["Where are you", "I am here.", "Close it.", "The bell rang."], 0),
    "Sentence logic": lesson("Connect ideas clearly", "Joining words show reason, contrast, or result.", ["Because gives a reason.", "But shows contrast.", "So shows result."], "It rained, so we went inside.", "I was tired, ___ I kept reading.", ["but", "or", "because", "when"], 0),
    "Analogies": lesson("Find the relationship", "Analogies are about how two words connect.", ["Say the first relationship.", "Test each option.", "Keep the same relationship."], "Author makes book; painter makes painting.", "Bird is to nest as person is to...", ["house", "wing", "cloud", "song"], 0),
    "Odd one out": lesson("Name the group", "Odd-one-out questions are easier when you name the group first.", ["Look for what three items share.", "Name the category.", "Pick the outsider."], "Apple, pear, grape are fruits; carrot is not.", "Which does not belong?", ["red", "blue", "circle", "green"], 2),
    "Word groups": lesson("Group by meaning", "Look for pairs or sets that belong together.", ["Find the category.", "Check every option.", "Avoid pairs that only sound alike."], "Sock and shoe both belong on feet.", "Which pair fits best?", ["spoon/kitchen", "moon/spoon", "rain/book", "tree/desk"], 0),
    "Code words": lesson("Use the code rule", "Letter codes follow a rule, usually moving letters forward or backward.", ["Compare first letters.", "Find the shift.", "Apply the same shift."], "CAT to DBU means each letter moves forward one.", "If CAT is DBU, HAT is...", ["IBU", "HAT", "TAH", "DBU"], 0),
    "Number sequences": lesson("Compare neighbours", "The gap between numbers usually reveals the rule.", ["Subtract neighbouring numbers.", "Check the same gap repeats.", "Add the gap to the last number."], "8, 13, 18 adds 5.", "What comes next? 7, 11, 15, 19", ["21", "22", "23", "24"], 2),
    "Missing number": lesson("Undo the operation", "A missing number can be found by reversing the operation.", ["Write the full equation.", "Use subtraction to undo addition.", "Check by putting it back."], "9 + __ = 15 means 15 - 9 = 6.", "Find the missing number: 14 + __ = 23", ["7", "8", "9", "10"], 2),
    "Shape pattern": lesson("Track one feature at a time", "Shape patterns may change shape, colour, size, direction, or number.", ["Name what changes.", "Check if more than one feature changes.", "Continue the same cycle."], "Up, right, down, left returns to up.", "Arrow up, right, down, left, ___", ["up", "right", "down", "left"], 0),
    "Written expression": lesson("Plan before writing", "A strong response has a beginning, middle, and ending.", ["Spend one minute planning.", "Use clear paragraphs.", "Leave time to edit."], "Problem, action, solution is a strong story shape.", "Best first step for a writing prompt?", ["Plan the main idea", "Write random words", "Skip punctuation", "Stop early"], 0)
  };

  function lesson(title, rule, steps, example, practicePrompt, practiceOptions, practiceAnswer) {
    return { title, rule, steps, example, practicePrompt, practiceOptions, practiceAnswer };
  }

  const writingPrompts = [
    "Write a short story about finding a hidden door at school. Include a beginning, problem, and ending.",
    "Persuade your class to choose one new playground rule. Give two strong reasons.",
    "Write a story about a small mistake that becomes an adventure.",
    "Explain whether homework should be short every day or longer once a week. Give reasons.",
    "Write a story where a quiet character solves an important problem.",
    "Persuade a school principal to add one useful club for younger students.",
    "Write a story about a team challenge where the cleverest idea is not the loudest idea."
  ];

  function generateLevels() {
    return levelMeta.map((meta) => ({ ...meta, questions: hardenQuestions(generateQuestions(meta), meta.level) }));
  }

  function generateQuestions(meta) {
    const base = meta.level;
    const [min, max] = meta.range;
    const a = Math.round(min / 10) + base * 7;
    const b = Math.round(max / 20) + base * 9;
    const c = base + 4;
    const d = base + 6;
    const startHour = 8 + base;
    const duration = 20 + base * 5;
    const finish = formatTime(startHour, 15 + duration);
    const text = readingTexts[base - 1];
    const questions = [];

    const add = (section, skill, prompt, options, correct, explain) => {
      questions.push({
        id: `L${base}-${questions.length + 1}`,
        section,
        skill,
        format: "choice",
        prompt,
        options,
        correct,
        explain
      });
    };

    add("Maths", "Addition and subtraction", `Calculate ${a + 37} + ${b + 18}.`, [String(a + b + 55), String(a + b + 45), String(a + b + 65), String(a + b + 50)], 0, "Add the tens and ones carefully.");
    add("Maths", "Subtraction with regrouping", `A school has ${max + 125} stickers. It gives away ${Math.round(max / 3)}. How many stickers are left?`, [String(max + 125 - Math.round(max / 3)), String(max + 125 + Math.round(max / 3)), String(max - Math.round(max / 3)), String(max + 115 - Math.round(max / 3))], 0, "Subtract the number given away from the total.");
    add("Maths", "Multiplication facts", `There are ${c} trays with ${d} muffins on each tray. How many muffins are there altogether?`, [String(c + d), String(c * d), String(c * d + c), String(d * 10)], 1, "Equal groups can be solved with multiplication.");
    add("Maths", "Division as sharing", `${c * d} pencils are shared equally between ${c} students. How many pencils does each student get?`, [String(c), String(d), String(c + d), String(c * d)], 1, "Divide the total by the number of students.");
    add("Maths", "Number patterns", `What comes next? ${base * 3}, ${base * 3 + c}, ${base * 3 + c * 2}, ${base * 3 + c * 3}, ___`, [String(base * 3 + c * 4), String(base * 3 + c * 5), String(base * 3 + c * 3 + 1), String(base * 3 + c * 2)], 0, `The pattern adds ${c} each time.`);
    add("Maths", "Place value", `In the number ${3000 + base * 417}, what is the value of the digit 3?`, ["3", "30", "300", "3000"], 3, "The 3 is in the thousands place.");
    add("Maths", "Fractions", "Which fraction means one quarter?", ["1/2", "1/3", "1/4", "4/1"], 2, "One equal part out of four is written as 1/4.");
    add("Maths", "Time", `A practice session starts at ${startHour}:15 and lasts ${duration} minutes. What time does it finish?`, [`${startHour}:35`, finish, `${startHour + 1}:15`, `${startHour}:45`], 1, "Add the minutes to the start time.");
    add("Maths", "Money", `Ravi has ${base + 3} fifty-cent coins. How much money does he have?`, [`$${((base + 3) * 0.5).toFixed(2)}`, `$${(base + 3).toFixed(2)}`, `${base + 3} cents`, `$${((base + 2) * 0.5).toFixed(2)}`], 0, "Each coin is 50 cents, or half a dollar.");
    add("Maths", "Data", `A chart shows ${a} students chose soccer, ${b} chose tennis, ${a + 4} chose swimming, and ${b - 2} chose cricket. Which sport was chosen by the most students?`, ["Soccer", "Tennis", "Swimming", "Cricket"], a + 4 > b ? 2 : 1, "Compare the numbers in the chart.");
    add("Maths", "Measurement", "Which is the most sensible unit to measure the length of a classroom?", ["millimetres", "centimetres", "metres", "kilometres"], 2, "A classroom is several metres long.");
    add("Maths", "Multi-step word problem", `A club has ${c} boxes. Each box has ${d} balls. They lose ${base + 5} balls. How many balls are left?`, [String(c * d - (base + 5)), String(c * d + (base + 5)), String(c + d - base), String(c * (d - base))], 0, "First multiply the boxes and balls, then subtract the lost balls.");
    add("English", "Reading comprehension", `${text.title}\n\n${text.text}\n\n${text.questions[0][0]}`, text.questions[0][1], text.questions[0][2], text.questions[0][3]);
    add("English", "Inference", `${text.title}\n\n${text.text}\n\n${text.questions[1][0]}`, text.questions[1][1], text.questions[1][2], text.questions[1][3]);
    add("English", "Vocabulary", `Choose the word closest in meaning to "${["enormous", "cautious", "fortunate", "reluctant", "observe", "accurate", "scarce"][base - 1]}".`, vocabOptions(base), 1, "Use the sentence meaning and choose the closest match.");
    add("English", "Spelling", "Pick the correctly spelled word.", spellingOptions(base), 1, "Check the letter order carefully.");
    add("English", "Grammar", grammarPrompt(base).prompt, grammarPrompt(base).options, grammarPrompt(base).correct, grammarPrompt(base).explain);
    add("English", "Punctuation", punctuationPrompt(base).prompt, punctuationPrompt(base).options, punctuationPrompt(base).correct, punctuationPrompt(base).explain);
    add("English", "Sentence logic", sentencePrompt(base).prompt, sentencePrompt(base).options, sentencePrompt(base).correct, sentencePrompt(base).explain);
    add("Verbal Reasoning", "Analogies", analogyPrompt(base).prompt, analogyPrompt(base).options, analogyPrompt(base).correct, analogyPrompt(base).explain);
    add("Verbal Reasoning", "Odd one out", oddOneOutPrompt(base).prompt, oddOneOutPrompt(base).options, oddOneOutPrompt(base).correct, oddOneOutPrompt(base).explain);
    add("Verbal Reasoning", "Word groups", wordGroupPrompt(base).prompt, wordGroupPrompt(base).options, wordGroupPrompt(base).correct, wordGroupPrompt(base).explain);
    add("Verbal Reasoning", "Code words", codePrompt(base).prompt, codePrompt(base).options, codePrompt(base).correct, codePrompt(base).explain);
    add("Numerical Reasoning", "Number sequences", sequencePrompt(base).prompt, sequencePrompt(base).options, sequencePrompt(base).correct, sequencePrompt(base).explain);
    add("Numerical Reasoning", "Missing number", missingNumberPrompt(base).prompt, missingNumberPrompt(base).options, missingNumberPrompt(base).correct, missingNumberPrompt(base).explain);
    add("Non-Verbal Reasoning", "Shape pattern", shapePrompt(base).prompt, shapePrompt(base).options, shapePrompt(base).correct, shapePrompt(base).explain);
    questions.push({
      id: `L${base}-${questions.length + 1}`,
      section: "Writing",
      skill: "Written expression",
      format: "writing",
      prompt: writingPrompts[base - 1],
      options: [],
      correct: null,
      explain: "Writing is saved for parent review. Use the rubric: idea, structure, vocabulary, punctuation, and editing."
    });

    return questions;
  }

  function formatTime(hour, minute) {
    const total = hour * 60 + minute;
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  }

  function vocabOptions(level) {
    return [
      ["tiny", "huge", "quiet", "quick"],
      ["careless", "careful", "noisy", "empty"],
      ["angry", "lucky", "plain", "late"],
      ["excited", "unwilling", "certain", "finished"],
      ["repair", "watch", "forget", "carry"],
      ["colourful", "correct", "heavy", "recent"],
      ["bright", "rare", "simple", "wide"]
    ][level - 1];
  }

  function spellingOptions(level) {
    return [
      ["becaus", "because", "becuase", "beacuse"],
      ["frist", "first", "ferst", "fierst"],
      ["thort", "thought", "thaught", "thout"],
      ["seperate", "separate", "separete", "seprate"],
      ["definate", "definite", "defenite", "definit"],
      ["neccessary", "necessary", "necesary", "nessesary"],
      ["responsable", "responsible", "responcible", "responsibel"]
    ][level - 1];
  }

  function grammarPrompt(level) {
    return [
      item("Which sentence is correct?", ["She run fast.", "She runs fast.", "She running fast.", "She runned fast."], 1, "A singular subject uses 'runs'."),
      item("Choose the correct word: The books ___ on the shelf.", ["is", "are", "was", "be"], 1, "Plural books takes 'are'."),
      item("Which sentence uses an apostrophe correctly?", ["The boys hat is blue.", "The boy's hat is blue.", "The boys' hat is blue.", "The boy hat's is blue."], 1, "One boy owns the hat, so use boy's."),
      item("Choose the correct sentence.", ["They was ready.", "They were ready.", "They is ready.", "They be ready."], 1, "'They' takes 'were'."),
      item("Choose the best pronoun: Lily and Tom said ___ would help.", ["he", "she", "they", "it"], 2, "Two people can be replaced by 'they'."),
      item("Choose the correct tense: Yesterday, Noah ___ a letter.", ["writes", "wrote", "writing", "written"], 1, "Yesterday needs past tense: wrote."),
      item("Which sentence is most precise?", ["The thing went there.", "The silver kite drifted over the oval.", "It did stuff.", "That one moved."], 1, "Specific nouns and verbs make the sentence clearer.")
    ][level - 1];
  }

  function punctuationPrompt(level) {
    return [
      item("Which sentence needs a question mark?", ["Where is my hat", "I found my hat.", "My hat is blue.", "Put the hat here."], 0, "A question needs a question mark."),
      item("Choose the correctly punctuated sentence.", ["Yes I can come.", "Yes, I can come.", "Yes I, can come.", "Yes I can, come."], 1, "A comma follows the introductory word 'Yes'."),
      item("Which sentence has correct speech punctuation?", ["Mum said, 'Pack your bag.'", "Mum said 'Pack your bag.", "Mum said, Pack your bag.", "'Mum said, Pack your bag.'"], 0, "The spoken words are inside quotation marks."),
      item("Choose the sentence with the correct comma.", ["After lunch we played chess.", "After lunch, we played chess.", "After, lunch we played chess.", "After lunch we, played chess."], 1, "A comma can follow an introductory phrase."),
      item("Which title uses capital letters correctly?", ["the secret cave", "The Secret Cave", "The secret Cave", "the Secret cave"], 1, "Important title words begin with capitals."),
      item("Choose the correctly punctuated list.", ["We packed apples, pencils and glue.", "We packed apples pencils, and glue.", "We packed, apples pencils and glue.", "We packed apples pencils and, glue."], 0, "Commas separate items in a list."),
      item("Which sentence is correctly punctuated?", ["Although it was raining, the team kept training.", "Although, it was raining the team kept training.", "Although it was raining the team, kept training.", "Although it was raining the team kept training"], 0, "The comma separates the opening clause.")
    ][level - 1];
  }

  function sentencePrompt(level) {
    return [
      item("Choose the best joining word: I was hungry, ___ I ate a sandwich.", ["because", "so", "or", "although"], 1, "'So' shows the result."),
      item("Choose the best joining word: Mia wore a coat ___ it was cold.", ["because", "but", "or", "so"], 0, "'Because' gives the reason."),
      item("Which sentence has the clearest order?", ["Before I brushed my teeth, I woke up.", "I woke up before I brushed my teeth.", "I brushed before woke teeth.", "Before teeth, I woke brushed."], 1, "The order is clear and logical."),
      item("Choose the best ending: The path was muddy, so ___", ["we wore boots.", "we ate soup.", "we read quietly.", "we closed the book."], 0, "Boots match a muddy path."),
      item("Which sentence best combines the ideas? Ava was tired. Ava kept reading.", ["Ava was tired, but she kept reading.", "Ava kept reading because she was tired.", "Ava was tired or she kept reading.", "Ava reading tired kept."], 0, "'But' shows contrast."),
      item("Choose the clearest sentence.", ["The game was cancelled because the storm became dangerous.", "The game because storm cancelled dangerous.", "Dangerous was the game because cancelled.", "The storm game was because cancelled."], 0, "It has clear cause and effect."),
      item("Which sentence gives the strongest reason?", ["We should plant trees because they give shade and help keep air cleaner.", "We should plant trees because trees are tree-like.", "Plant trees because I said so.", "Trees are there."], 0, "It gives two relevant reasons.")
    ][level - 1];
  }

  function analogyPrompt(level) {
    return [
      item("Bird is to nest as person is to ___", ["house", "wing", "cloud", "song"], 0, "A house is a person's shelter."),
      item("Hot is to cold as high is to ___", ["tall", "low", "warm", "above"], 1, "High and low are opposites."),
      item("Author is to book as painter is to ___", ["brush", "gallery", "painting", "paper"], 2, "An author creates a book; a painter creates a painting."),
      item("Seed is to plant as egg is to ___", ["nest", "bird", "shell", "feather"], 1, "A seed can become a plant; an egg can become a bird."),
      item("Compass is to direction as clock is to ___", ["time", "sound", "circle", "number"], 0, "A clock tells time."),
      item("Whisper is to quiet as shout is to ___", ["soft", "loud", "quick", "late"], 1, "A shout is loud."),
      item("Map is to traveller as recipe is to ___", ["chef", "garden", "pencil", "song"], 0, "A recipe guides a chef.")
    ][level - 1];
  }

  function oddOneOutPrompt(level) {
    return [
      item("Which word does not belong?", ["apple", "banana", "carrot", "grape"], 2, "Carrot is usually a vegetable; the others are fruits."),
      item("Which word does not belong?", ["triangle", "square", "circle", "window"], 3, "The others are shapes."),
      item("Which word does not belong?", ["run", "jump", "sleep", "blue"], 3, "The others are verbs."),
      item("Which word does not belong?", ["violin", "drum", "flute", "helmet"], 3, "The others are musical instruments."),
      item("Which word does not belong?", ["calculate", "estimate", "measure", "whisper"], 3, "The others are maths actions."),
      item("Which word does not belong?", ["honest", "brave", "kind", "square"], 3, "The others describe character traits."),
      item("Which word does not belong?", ["therefore", "because", "however", "pencil"], 3, "The others connect ideas.")
    ][level - 1];
  }

  function wordGroupPrompt(level) {
    return [
      item("Which pair belongs together?", ["sock/shoe", "moon/spoon", "tree/desk", "rain/book"], 0, "Socks and shoes are worn on feet."),
      item("Which pair has the same relationship as spoon/kitchen?", ["pencil/classroom", "cloud/plate", "shoe/river", "lamp/garden"], 0, "A pencil is commonly used in a classroom."),
      item("Which word best completes the group: red, blue, green, ___", ["soft", "yellow", "table", "quick"], 1, "They are colours."),
      item("Which word best completes the group: metre, litre, gram, ___", ["clock", "dollar", "degree", "book"], 2, "They are units of measurement."),
      item("Which pair shows cause and effect?", ["rain/wet ground", "desk/chair", "book/page", "sock/shoe"], 0, "Rain can cause wet ground."),
      item("Which pair shows part and whole?", ["wheel/bicycle", "bird/cloud", "cake/oven", "river/map"], 0, "A wheel is part of a bicycle."),
      item("Which pair has the strongest connection?", ["evidence/conclusion", "whistle/blanket", "garden/pencil", "window/sandwich"], 0, "Evidence supports a conclusion.")
    ][level - 1];
  }

  function codePrompt(level) {
    const shift = level;
    const word = ["CAT", "DOG", "SUN", "MAP", "BIRD", "LAMP", "STAR"][level - 1];
    const next = ["HAT", "PEN", "BOX", "CUP", "FISH", "TREE", "MOON"][level - 1];
    const encoded = [...word].map((char) => String.fromCharCode(char.charCodeAt(0) + shift)).join("");
    const nextEncoded = [...next].map((char) => String.fromCharCode(char.charCodeAt(0) + shift)).join("");
    return item(`If ${word} is coded as ${encoded}, how is ${next} coded?`, [nextEncoded, next, [...next].reverse().join(""), encoded], 0, `Each letter moves forward ${shift} place${shift === 1 ? "" : "s"} in the alphabet.`);
  }

  function sequencePrompt(level) {
    const start = level + 2;
    const step = level + 3;
    return item(`What comes next? ${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ___`, [String(start + step * 4), String(start + step * 5), String(start + step * 3 + 1), String(start + step * 2)], 0, `The sequence adds ${step} each time.`);
  }

  function missingNumberPrompt(level) {
    const x = level + 5;
    const y = level + 8;
    return item(`Find the missing number: ${x} + ___ = ${x + y}`, [String(y - 1), String(y), String(x), String(x + y)], 1, `The missing number is ${x + y} - ${x}.`);
  }

  function shapePrompt(level) {
    return [
      item("Circle, square, circle, square, ___", ["circle", "square", "triangle", "rectangle"], 0, "The pattern alternates circle and square."),
      item("Small star, big star, small star, big star, ___", ["small star", "big star", "circle", "small square"], 0, "The size alternates small and big."),
      item("Red triangle, blue triangle, red triangle, blue triangle, ___", ["red triangle", "blue triangle", "red square", "blue circle"], 0, "The colour alternates red and blue."),
      item("1 dot, 2 dots, 4 dots, 8 dots, ___", ["10 dots", "12 dots", "16 dots", "18 dots"], 2, "The number of dots doubles each time."),
      item("Arrow up, arrow right, arrow down, arrow left, ___", ["arrow up", "arrow right", "arrow down", "arrow left"], 0, "The arrow rotates clockwise."),
      item("White square, shaded square, striped square, white square, shaded square, ___", ["striped square", "white square", "shaded square", "circle"], 0, "The three-part pattern repeats."),
      item("Triangle with 1 line, triangle with 2 lines, square with 1 line, square with 2 lines, ___", ["circle with 1 line", "triangle with 1 line", "square with 3 lines", "circle with 2 lines"], 0, "The shape changes after two line counts.")
    ][level - 1];
  }

  function item(prompt, options, correct, explain) {
    return { prompt, options, correct, explain };
  }

  function hardenQuestions(questions, level) {
    return questions.map((question) => {
      if (question.format === "writing") {
        return {
          ...question,
          prompt: `${question.prompt}\n\nChallenge: include a problem, a turning point, and at least two vivid details.`
        };
      }

      const upgraded = harderQuestionBySkill(question.skill, level);
      return upgraded ? { ...question, ...upgraded } : question;
    });
  }

  function harderQuestionBySkill(skill, level) {
    const n = level + 3;
    const upgrades = {
      "Addition and subtraction": {
        prompt: `A library bought ${128 + level * 47} books on Monday, ${96 + level * 39} on Tuesday, and gave ${37 + level * 11} away. How many books were added overall?`,
        options: makeOptions((128 + level * 47) + (96 + level * 39) - (37 + level * 11), [12, -14, 25]),
        correct: 0,
        explain: "Add the two purchases, then subtract the books given away."
      },
      "Subtraction with regrouping": {
        prompt: `A theatre had ${640 + level * 83} seats. ${217 + level * 29} were booked before lunch and ${139 + level * 18} after lunch. How many seats were still empty?`,
        options: makeOptions((640 + level * 83) - (217 + level * 29) - (139 + level * 18), [20, -30, 47]),
        correct: 0,
        explain: "Subtract both groups of booked seats from the total."
      },
      "Multiplication facts": {
        prompt: `${n} teams each collect ${n + 5} tokens. Then each team earns ${level + 2} bonus tokens. How many tokens are collected altogether?`,
        options: makeOptions(n * (n + 5 + level + 2), [n, -n, 2 * n]),
        correct: 0,
        explain: "Find tokens per team after the bonus, then multiply by the number of teams."
      },
      "Division as sharing": {
        prompt: `${(n + 4) * (n + 6)} cards are shared equally into ${n + 4} packs. Each pack then gets 3 extra cards. How many cards are in each pack?`,
        options: makeOptions(n + 9, [3, -2, 5]),
        correct: 0,
        explain: "Divide first, then add the extra cards."
      },
      "Number patterns": {
        prompt: `What comes next? ${n}, ${n + 2}, ${n + 6}, ${n + 12}, ${n + 20}, ___`,
        options: makeOptions(n + 30, [2, -4, 8]),
        correct: 0,
        explain: "The jumps are +2, +4, +6, +8, so the next jump is +10."
      },
      "Fractions": {
        prompt: `Which fraction is equal to 2/4?`,
        options: ["1/2", "1/3", "3/4", "4/2"],
        correct: 0,
        explain: "Two out of four equal parts is the same as one half."
      },
      "Time": {
        prompt: `A test starts at ${8 + level}:35 and lasts ${35 + level * 7} minutes. There is then a 12-minute break. What time does the break end?`,
        options: timeOptions(8 + level, 35, 35 + level * 7 + 12),
        correct: 0,
        explain: "Add the test time and the break time to the start time."
      },
      "Money": {
        prompt: `A snack costs $${(1.25 + level * 0.2).toFixed(2)}. You buy 3 snacks and pay with $10.00. About how much change should you get?`,
        options: moneyOptions(10 - 3 * (1.25 + level * 0.2)),
        correct: 0,
        explain: "Multiply the snack cost by 3, then subtract from $10.00."
      },
      "Data": {
        prompt: `Four groups scored ${18 + level * 2}, ${24 + level * 3}, ${21 + level * 2}, and ${27 + level} points. What is the difference between the highest and lowest scores?`,
        options: makeOptions(Math.max(18 + level * 2, 24 + level * 3, 21 + level * 2, 27 + level) - Math.min(18 + level * 2, 24 + level * 3, 21 + level * 2, 27 + level), [2, -2, 5]),
        correct: 0,
        explain: "Find the highest score and the lowest score, then subtract."
      },
      "Multi-step word problem": {
        prompt: `A club has 3 boxes with ${n + 5} balls in each. They buy 9 more balls and then split all balls equally between 3 coaches. How many balls does each coach get?`,
        options: makeOptions(n + 8, [3, -3, 6]),
        correct: 0,
        explain: "Multiply, add 18, then divide by 3."
      },
      "Vocabulary": {
        prompt: `Choose the best word for the sentence: The scientist made an ___ observation after checking the results twice.`,
        options: ["accurate", "ordinary", "sleepy", "ancient"],
        correct: 0,
        explain: "Accurate means correct or exact."
      },
      "Grammar": {
        prompt: "Choose the sentence with the best grammar.",
        options: ["Although the problem was tricky, Mira solved it carefully.", "Although the problem were tricky, Mira solve it careful.", "The problem tricky Mira solved careful.", "Although tricky, solve Mira carefully it."],
        correct: 0,
        explain: "The correct sentence has agreement, tense, and clear word order."
      },
      "Punctuation": {
        prompt: "Choose the correctly punctuated sentence.",
        options: ["After the timer started, Noah read the question twice.", "After the timer started Noah, read the question twice.", "After, the timer started Noah read the question twice.", "After the timer started Noah read the question twice"],
        correct: 0,
        explain: "A comma can follow the opening phrase."
      },
      "Sentence logic": {
        prompt: "Which sentence gives the clearest cause and effect?",
        options: ["Because the clue was hidden in the final line, Ava reread the passage.", "Ava reread because hidden final clue line.", "The clue was final because Ava line reread.", "Reread the passage final hidden."],
        correct: 0,
        explain: "The first option clearly links the reason and action."
      },
      "Analogies": {
        prompt: "Evidence is to conclusion as clue is to ___.",
        options: ["solution", "noise", "colour", "window"],
        correct: 0,
        explain: "Evidence helps reach a conclusion; a clue helps reach a solution."
      },
      "Number sequences": {
        prompt: `What comes next? ${n}, ${n * 2}, ${n * 2 + 3}, ${(n * 2 + 3) * 2}, ___`,
        options: makeOptions((n * 2 + 3) * 2 + 3, [3, -6, 9]),
        correct: 0,
        explain: "The rule alternates x2, then +3."
      },
      "Missing number": {
        prompt: `Find the missing number: (${n} x 4) + ___ = ${n * 4 + 17}`,
        options: ["17", "13", "21", "27"],
        correct: 0,
        explain: "Work out the bracket first, then find the missing addend."
      },
      "Shape pattern": {
        prompt: "Pattern: triangle with 1 dot, square with 2 dots, pentagon with 3 dots, hexagon with 4 dots. What comes next?",
        options: ["heptagon with 5 dots", "triangle with 5 dots", "hexagon with 5 dots", "heptagon with 4 dots"],
        correct: 0,
        explain: "Both the number of sides and number of dots increase by one."
      }
    };

    return upgrades[skill] || null;
  }

  function makeOptions(answer, offsets) {
    const cleanAnswer = Number.isInteger(answer) ? answer : Math.round(answer);
    return [cleanAnswer, ...offsets.map((offset) => cleanAnswer + offset)].map(String);
  }

  function timeOptions(hour, minute, addMinutes) {
    const total = hour * 60 + minute + addMinutes;
    const correct = `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
    return [correct, `${Math.floor((total + 10) / 60)}:${String((total + 10) % 60).padStart(2, "0")}`, `${Math.floor((total - 15) / 60)}:${String((total - 15) % 60).padStart(2, "0")}`, `${hour + 1}:${String(minute).padStart(2, "0")}`];
  }

  function moneyOptions(answer) {
    return [answer, answer + 0.4, answer - 0.25, answer + 1].map((value) => `$${Math.max(0, value).toFixed(2)}`);
  }

  window.BrightQuestData = {
    levels: generateLevels(),
    lessons: grammarLessons,
    encouragement: [
      "Brave thinking. Keep moving.",
      "That was a strong choice.",
      "Calm brain, sharp eyes.",
      "You are building test muscles.",
      "Great effort. One question at a time.",
      "Speed grows from good habits.",
      "That focus is getting stronger."
    ],
    resultMessages: [
      { min: 90, title: "Brilliant under pressure.", copy: "That was sharp, calm, and seriously test-ready." },
      { min: 75, title: "Strong quest finish.", copy: "You handled the timer well and kept your thinking steady." },
      { min: 55, title: "Good training run.", copy: "There are clear wins here, and the app has picked the next skills to train." },
      { min: 0, title: "Useful practice unlocked.", copy: "Every wrong answer is now a map to the next mini lesson." }
    ]
  };
})();
