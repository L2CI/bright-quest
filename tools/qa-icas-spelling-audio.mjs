import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const apiKey = process.env.OPENAI_API_KEY || "";
if (!apiKey) throw new Error("OPENAI_API_KEY is required for ICAS spelling audio transcription QA.");

const bank = JSON.parse(await readFile(resolve("icas-prep/data/icas-question-bank.json"), "utf8"));
const questions = bank.tests.flatMap((test) => test.questions).filter((question) => question.format === "dictation");
const results = [];
let cursor = 0;

await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < questions.length) {
    const question = questions[cursor++];
    const path = resolve("icas-prep", question.audio);
    const bytes = await readFile(path);
    const form = new FormData();
    form.append("model", "gpt-4o-mini-transcribe");
    form.append("language", "en");
    form.append("file", new Blob([bytes], { type: "audio/mpeg" }), basename(path));
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}` },
      body: form
    });
    if (!response.ok) throw new Error(`Transcription failed for ${question.id} (${response.status}): ${(await response.text()).slice(0, 400)}`);
    const body = await response.json();
    const transcript = normalise(body.text || "");
    const target = normalise(question.target);
    const aliases = new Set([target, ...(target === "neighbour" ? ["neighbor"] : [])]);
    const words = transcript.split(" ").filter(Boolean);
    const targetPositions = words.map((word, index) => aliases.has(word) ? index : -1).filter((index) => index >= 0);
    const openingMatch = targetPositions.some((index) => index <= 4);
    const closingMatch = targetPositions.some((index) => index >= words.length - 3);
    const sentenceTerms = normalise(question.sentence).split(" ").filter((word) => word.length >= 5);
    const sentenceCoverage = sentenceTerms.length ? sentenceTerms.filter((word) => transcript.includes(word)).length / sentenceTerms.length : 1;
    const pass = openingMatch && closingMatch && sentenceCoverage >= 0.6;
    results.push({ id: question.id, target: question.target, transcript: body.text || "", openingMatch, closingMatch, sentenceCoverage: Number(sentenceCoverage.toFixed(2)), pass });
    console.log(`${question.id}: ${pass ? "PASS" : "REVIEW"}`);
  }
}));

results.sort((left, right) => left.id.localeCompare(right.id));
const report = { generatedAt: new Date().toISOString(), total: results.length, passed: results.filter((item) => item.pass).length, failed: results.filter((item) => !item.pass).length, results };
await writeFile(resolve("outputs/qa-icas-spelling-audio.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ total: report.total, passed: report.passed, failed: report.failed }, null, 2));
if (report.failed) process.exitCode = 1;

function normalise(value) {
  return String(value).toLowerCase().replace(/[^a-z' ]/g, " ").replace(/\s+/g, " ").trim();
}
