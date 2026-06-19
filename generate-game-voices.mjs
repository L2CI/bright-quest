import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const apiKey = process.env.OPENAI_API_KEY;
const force = process.argv.includes("--force");
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const only = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",").map((id) => id.trim()).filter(Boolean)) : null;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required to generate static game voice audio.");
}

const lines = [
  {
    id: "cave-intro",
    path: "cave-river-quest/assets/audio/game-voice/cave-intro.mp3",
    voice: "onyx",
    instructions: "Speak as a calm cinematic cave guardian for an 8-12 year old. Warm, low, mysterious, precise, not scary. This is a reward game, not a classroom lecture.",
    text: "Maths gates ahead. Row steadily, protect the invariant, and let the cave reveal the answer."
  },
  {
    id: "cave-q1-average",
    path: "cave-river-quest/assets/audio/game-voice/cave-q1-average.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Average gate. Do not subtract the averages. Turn both averages into totals, then find the number that joined."
  },
  {
    id: "cave-q2-ratio",
    path: "cave-river-quest/assets/audio/game-voice/cave-q2-ratio.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Ratio gate. Build one complete group first. The group count will tell you the rabbits."
  },
  {
    id: "cave-q3-remainder",
    path: "cave-river-quest/assets/audio/game-voice/cave-q3-remainder.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Remainder gate. The words what is left mean the whole has changed. Redraw the bar in your mind."
  },
  {
    id: "cave-q4-shortage",
    path: "cave-river-quest/assets/audio/game-voice/cave-q4-shortage.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Shortage gate. Travel from missing six to spare three. That whole distance is the gap."
  },
  {
    id: "cave-q5-cubes",
    path: "cave-river-quest/assets/audio/game-voice/cave-q5-cubes.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Cube gate. Count the joins. Every join hides two faces."
  },
  {
    id: "cave-q6-calendar",
    path: "cave-river-quest/assets/audio/game-voice/cave-q6-calendar.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Calendar gate. Full weeks vanish. Only the remainder moves the weekday."
  },
  {
    id: "cave-q7-practice-average",
    path: "cave-river-quest/assets/audio/game-voice/cave-q7-practice-average.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Practice gate. Before total, after total, difference. That is the clean average move."
  },
  {
    id: "cave-q8-rate",
    path: "cave-river-quest/assets/audio/game-voice/cave-q8-rate.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Rate gate. Distance stays the same. Find it once, then divide by the new speed."
  },
  {
    id: "cave-q9-percent",
    path: "cave-river-quest/assets/audio/game-voice/cave-q9-percent.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Percent gate. The base is the original value. Guard it."
  },
  {
    id: "cave-q10-invariant",
    path: "cave-river-quest/assets/audio/game-voice/cave-q10-invariant.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Short, focused, encouraging.",
    text: "Final gate. Ask the strongest question in maths: what stays the same?"
  },
  {
    id: "cave-correct",
    path: "cave-river-quest/assets/audio/game-voice/cave-correct.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Rewarding, concise.",
    text: "Correct. The lock hears the method, and the gate opens."
  },
  {
    id: "cave-try",
    path: "cave-river-quest/assets/audio/game-voice/cave-try.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian. Kind correction, concise.",
    text: "Not yet. Slow down and use the hint. The cave rewards clean thinking."
  },
  {
    id: "cave-finale",
    path: "cave-river-quest/assets/audio/game-voice/cave-finale.mp3",
    voice: "onyx",
    instructions: "Cinematic cave guardian finale. Warm, grand, not over the top.",
    text: "You carried the invariant through every gate. The Bright Quest vault is open."
  },
  {
    id: "street-kid-intro",
    path: "street-smart-rescue/assets/audio/game-voice/street-kid-intro.mp3",
    voice: "nova",
    instructions: "Speak as a lively cartoon kid in a safety-learning game. Curious, cheeky, not bratty.",
    text: "No one's here. Maybe I can drive today."
  },
  {
    id: "street-kid-rollout",
    path: "street-smart-rescue/assets/audio/game-voice/street-kid-rollout.mp3",
    voice: "nova",
    instructions: "Lively cartoon kid. Curious, a little nervous.",
    text: "Okay. Just a tiny drive. Nobody will know."
  },
  {
    id: "street-officer-stop",
    path: "street-smart-rescue/assets/audio/game-voice/street-officer-stop.mp3",
    voice: "ash",
    instructions: "Speak as a friendly animated safety officer. Clear, firm, warm, not frightening.",
    text: "Hold it. Street-smart choices start before the engine does."
  },
  {
    id: "street-kid-caught",
    path: "street-smart-rescue/assets/audio/game-voice/street-kid-caught.mp3",
    voice: "nova",
    instructions: "Lively cartoon kid. Sheepish and honest.",
    text: "I don't have a licence. I was just trying."
  },
  {
    id: "street-officer-brief",
    path: "street-smart-rescue/assets/audio/game-voice/street-officer-brief.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Clear, firm, warm.",
    text: "Then you solve five grammar checkpoints and take the safe way home."
  },
  {
    id: "street-q1-sentence",
    path: "street-smart-rescue/assets/audio/game-voice/street-q1-sentence.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Short game checkpoint prompt.",
    text: "Checkpoint one. A complete sentence needs a subject and a predicate. Find what Maya does."
  },
  {
    id: "street-q2-noun",
    path: "street-smart-rescue/assets/audio/game-voice/street-q2-noun.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Short game checkpoint prompt.",
    text: "Checkpoint two. Proper nouns name someone or somewhere special. Pick the special name."
  },
  {
    id: "street-q3-verb",
    path: "street-smart-rescue/assets/audio/game-voice/street-q3-verb.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Short game checkpoint prompt.",
    text: "Checkpoint three. Modal helpers show duty, ability, or possibility. Listen for should, must, can, or might."
  },
  {
    id: "street-q4-modifier",
    path: "street-smart-rescue/assets/audio/game-voice/street-q4-modifier.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Short game checkpoint prompt.",
    text: "Checkpoint four. Adverbs often tell how an action happens."
  },
  {
    id: "street-q5-clause",
    path: "street-smart-rescue/assets/audio/game-voice/street-q5-clause.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Short game checkpoint prompt.",
    text: "Checkpoint five. Choose the clause that can stand alone as a complete thought."
  },
  {
    id: "street-correct",
    path: "street-smart-rescue/assets/audio/game-voice/street-correct.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Rewarding and crisp.",
    text: "Correct. One grammar lock clears, and the safe route gets brighter."
  },
  {
    id: "street-try",
    path: "street-smart-rescue/assets/audio/game-voice/street-try.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Kind correction, crisp.",
    text: "Not quite. Use the hint, then try again. Grammar is a map, not a trap."
  },
  {
    id: "street-finale",
    path: "street-smart-rescue/assets/audio/game-voice/street-finale.mp3",
    voice: "ash",
    instructions: "Friendly animated safety officer. Warm finale.",
    text: "Unlocked. Smart writers build clear sentences, and smart kids ask an adult before any drive."
  }
];

const fallbackVoices = ["ash", "onyx", "nova", "alloy"];

await Promise.all([
  mkdir(resolve(here, "cave-river-quest/assets/audio/game-voice"), { recursive: true }),
  mkdir(resolve(here, "street-smart-rescue/assets/audio/game-voice"), { recursive: true })
]);

for (const line of lines) {
  if (only && !only.has(line.id)) continue;
  const target = resolve(here, line.path);
  if (existsSync(target) && !force) {
    console.log(`${line.id}: exists -> ${line.path}`);
    continue;
  }

  const voices = [line.voice, ...fallbackVoices.filter((voice) => voice !== line.voice)];
  let lastError = "";
  for (const voice of voices) {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice,
        format: "mp3",
        instructions: line.instructions,
        input: line.text
      })
    });

    if (!response.ok) {
      lastError = `${response.status} ${await response.text()}`;
      continue;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(target, buffer);
    console.log(`${line.id}: ${Math.round(buffer.length / 1024)} KB (${voice}) -> ${line.path}`);
    lastError = "";
    break;
  }

  if (lastError) {
    throw new Error(`TTS failed for ${line.id}: ${lastError}`);
  }
}
