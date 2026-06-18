import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const lessons = JSON.parse(await readFile(resolve(here, "lesson-scripts.json"), "utf8"));
const apiKey = process.env.OPENAI_API_KEY;
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlyLessons = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",").map((id) => id.trim()).filter(Boolean)) : null;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required to generate static lesson audio.");
}

const instructions =
  "Speak like a warm, energetic Grade 4 maths teacher beside the student at a blackboard. Be lively, clear, encouraging, and about 10 percent faster than a normal classroom explanation. Slow very slightly before calculations, brighten the voice when a trick becomes simple, and leave short natural pauses so chalk drawings can land. Keep the performance expressive, professional, and never robotic.";

await mkdir(resolve(here, "assets", "audio"), { recursive: true });

for (const lesson of lessons) {
  if (onlyLessons && !onlyLessons.has(lesson.id)) continue;

  const target = resolve(here, lesson.audio);
  if (existsSync(target) && !process.argv.includes("--force")) {
    console.log(`${lesson.id}: exists -> ${lesson.audio}`);
    continue;
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "coral",
      format: "mp3",
      instructions,
      input: lesson.script
    })
  });

  if (!response.ok) {
    throw new Error(`TTS failed for ${lesson.id}: ${response.status} ${await response.text()}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(target, buffer);
  console.log(`${lesson.id}: ${Math.round(buffer.length / 1024)} KB -> ${lesson.audio}`);
}
