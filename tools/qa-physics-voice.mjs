import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is unavailable for voice QA.");

const audioPath = path.join(root, "physics-training", "physics-101-advanced-grade-4", "assets", "audio", "chapter-01-teacher.mp3");
const outputPath = path.join(root, "outputs", "physics-101-pilot-media", "chapter-01-transcript.txt");
const audio = await fs.readFile(audioPath);
const form = new FormData();
form.set("model", "gpt-4o-mini-transcribe");
form.set("response_format", "text");
form.set("language", "en");
form.set("file", new Blob([audio], { type: "audio/mpeg" }), "chapter-01-teacher.mp3");

const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
  method: "POST",
  headers: { authorization: `Bearer ${apiKey}` },
  body: form,
});
if (!response.ok) throw new Error(`Voice transcription QA failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
const transcript = await response.text();
await fs.writeFile(outputPath, transcript, "utf8");

const normalised = transcript.toLowerCase().replace(/[^a-z0-9]+/g, " ");
const required = [
  "where did the force come from",
  "one interaction two objects",
  "change in motion is evidence",
  "hand to hand force has ended",
  "some forces act without the objects touching",
  "change only the push",
  "force is not a substance hiding inside an object",
  "ready for the cockpit check",
];
const missing = required.filter((phrase) => !normalised.includes(phrase));
const report = { transcriptCharacters: transcript.length, requiredPhrases: required.length, missing, passed: missing.length === 0 };
console.log(JSON.stringify(report, null, 2));
if (missing.length) process.exitCode = 1;
