import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const lessons = JSON.parse(await readFile(resolve(here, "lesson-scripts.json"), "utf8"));
const apiKey = process.env.OPENAI_API_KEY;
const forceSteps = new Set(
  (process.argv.find((arg) => arg.startsWith("--force-steps=")) || "")
    .replace("--force-steps=", "")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter(Boolean)
);

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is required to generate static lesson audio.");
}

const instructions =
  "Speak like a warm, energetic Grade 4 English teacher. Be lively, clear, encouraging, and about 10 percent faster than a normal classroom explanation.";

await mkdir(resolve(here, "assets", "audio"), { recursive: true });

for (const lesson of lessons) {
  const target = resolve(here, lesson.audio);
  const shouldForce = process.argv.includes("--force") || forceSteps.has(Number(lesson.step || 1));
  if (existsSync(target) && !shouldForce) {
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
