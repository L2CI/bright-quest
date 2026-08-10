import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const apiKey = process.env.OPENAI_API_KEY || "";
if (!apiKey) throw new Error("OPENAI_API_KEY is required to generate ICAS spelling audio.");

const force = process.argv.includes("--force");
const onlyId = (process.argv.find((argument) => argument.startsWith("--only=")) || "").replace("--only=", "");
const bank = JSON.parse(await readFile(resolve("icas-prep/data/icas-question-bank.json"), "utf8"));
const outputDir = resolve("icas-prep/assets/audio");
await mkdir(outputDir, { recursive: true });

const questions = bank.tests.flatMap((test) => test.questions).filter((question) => question.format === "dictation");
const allJobs = [
  {
    id: "volume-check",
    file: "volume-check.mp3",
    input: "This is your volume check. Adjust the sound until every word is clear. When you are ready, begin the spelling set."
  },
  ...questions.map((question) => ({
    id: question.id,
    file: question.audio.replace(/^assets\/audio\//, ""),
    input: `The word is ${question.target}. ${question.sentence} ${question.target === "enough" ? "Repeat the word once more" : "Repeat"}: ${question.target}.`
  }))
];
const jobs = onlyId ? allJobs.filter((job) => job.id === onlyId) : allJobs;
if (onlyId && !jobs.length) throw new Error(`No audio job found for ${onlyId}`);

const instructions = [
  "Speak as a calm Australian primary-school spelling assessor.",
  "Use clear Australian English pronunciation at about 95 words per minute.",
  "For a spelling item, clearly say 'The word is', the target word, pause briefly, read the carrier sentence naturally, pause briefly, then say 'Repeat' and the target word.",
  "Do not spell the word, explain it, add encouragement, announce punctuation, or change the supplied word or sentence.",
  "Keep volume and pace consistent across every clip."
].join(" ");

const manifest = [];
let cursor = 0;
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    const target = resolve(outputDir, job.file);
    if (existsSync(target) && !force) {
      manifest.push({ id: job.id, file: job.file, status: "existing" });
      continue;
    }
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts-2025-12-15",
        voice: "coral",
        response_format: "mp3",
        instructions,
        input: job.input
      })
    });
    if (!response.ok) throw new Error(`TTS failed for ${job.id} (${response.status}): ${(await response.text()).slice(0, 400)}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1000) throw new Error(`TTS returned an unexpectedly small file for ${job.id}`);
    await writeFile(target, bytes);
    manifest.push({ id: job.id, file: job.file, status: "generated", bytes: bytes.length });
    console.log(`${job.id}: ${Math.round(bytes.length / 1024)} KB`);
  }
}));

manifest.sort((left, right) => left.id.localeCompare(right.id));
if (!onlyId) await writeFile(resolve(outputDir, "manifest.json"), `${JSON.stringify({ model: "gpt-4o-mini-tts-2025-12-15", voice: "coral", count: manifest.length, files: manifest }, null, 2)}\n`);
console.log(JSON.stringify({ result: "complete", clips: manifest.length, outputDir }, null, 2));
