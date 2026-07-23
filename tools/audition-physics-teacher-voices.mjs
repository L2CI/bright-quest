import fs from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.OPENAI_API_KEY || "";
if (!apiKey) throw new Error("OPENAI_API_KEY is required for the Physics teacher voice audition.");

const outputDir = path.resolve("outputs", "physics-101-voice-audition-v2");
await fs.mkdir(outputDir, { recursive: true });

const auditionText = [
  "Shh—look closely. Two skaters are still. Watch their hands. They press, then both platforms roll apart. Which two objects just interacted?",
  "Ooh, careful—many scientists think the push rides inside the skater. Let’s check. Hands touch: the contact arrows appear. Hands separate: the arrows vanish.",
  "That’s the evidence! You named the pair, checked for touching, and used a change in motion. That is exactly how a physicist thinks.",
].join(" ");

const candidates = [
  { label: "A", voice: "marin" },
  { label: "B", voice: "cedar" },
  { label: "C", voice: "coral" },
];

const instructions = [
  "Speak as a warm, engaging Australian primary science teacher beside one capable nine-year-old learner.",
  "Sound genuinely curious in the observation, kind but precise in the correction, and brightly pleased in the final success beat.",
  "Use natural pitch variety and conversational rhythm, not constant loudness.",
  "Keep a calm adult authority without becoming deep, dull, military, theatrical, sing-song, breathless, or like an advertisement.",
  "Aim for 142 to 148 words per minute. Give questions a real upward invitation and leave a short thinking beat after them.",
  "Pronounce interaction, skater, evidence, contact and physicist crisply.",
].join(" ");

const manifest = [];
for (const candidate of candidates) {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts-2025-12-15",
      voice: candidate.voice,
      response_format: "mp3",
      input: auditionText,
      instructions,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Voice audition ${candidate.label} failed (${response.status}): ${detail.slice(0, 500)}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const file = `${candidate.label}.mp3`;
  await fs.writeFile(path.join(outputDir, file), bytes);
  manifest.push({ label: candidate.label, voice: candidate.voice, file, bytes: bytes.byteLength });
  console.log(`Generated candidate ${candidate.label}: ${bytes.byteLength} bytes`);
}

await fs.writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify({ model: "gpt-4o-mini-tts-2025-12-15", auditionText, instructions, candidates: manifest }, null, 2)}\n`, "utf8");
console.log(outputDir);
