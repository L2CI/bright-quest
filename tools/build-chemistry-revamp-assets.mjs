import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

import { chapters as chapters89 } from "./chemistry-revamp/ch08-09-content.mjs";
import { chapters as chapters1011 } from "./chemistry-revamp/ch10-11-content.mjs";

const root = process.cwd();
const home = process.env.USERPROFILE || "C:\\Users\\gupta";
const courseDir = path.join(root, "chemistry-training", "chemistry-101-winter-2026");
const coursePath = path.join(courseDir, "data", "chemistry-101-course.json");
const workRoot = path.join(root, "outputs", "chemistry-revamp-audio");
const ffmpeg = path.join(home, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffmpeg.exe");
const ffprobe = path.join(home, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffprobe.exe");
const release = "chemistry-101-winter-2026-007";
const sceneGapSeconds = 1.4;
const checkpointGapSeconds = 5.5;
const chapters = [...chapters89, ...chapters1011].sort((a, b) => a.number - b.number);
const selected = new Set((process.env.BQ_ONLY_CHAPTERS || "8,9,10,11").split(",").map(Number));

const voiceInstructions = [
  "Speak as the established Bright Quest Chemistry teacher using the same warm Coral voice identity.",
  "Teach a bright Grade 4 or Grade 5 child beside a live chalkboard.",
  "Use a calm, curious, confident pace near 130 words per minute, with clear emphasis on evidence and scientific vocabulary.",
  "Leave a short natural pause after questions and predictions. Do not rush lists or over-perform humour.",
  "Sound conversational and precise, never robotic, theatrical, sleepy, or like an advertisement."
].join(" ");

async function main() {
  const active = chapters.filter((chapter) => selected.has(chapter.number));
  if (!active.length) throw new Error("No Chemistry revamp chapters selected.");
  await fs.mkdir(workRoot, { recursive: true });
  await updateCourse(active);
  for (const chapter of active) await buildChapterAudio(chapter);
  console.log(`Prepared ${active.length} Chemistry revamp chapters for ${release}.`);
}

async function updateCourse(active) {
  const course = JSON.parse(await fs.readFile(coursePath, "utf8"));
  const replacements = new Map(active.map((chapter) => [chapter.id, serialiseChapter(chapter)]));
  course.release = release;
  course.chapters = course.chapters.map((chapter) => replacements.get(chapter.id) || chapter);
  await fs.writeFile(coursePath, `${JSON.stringify(course, null, 2)}\n`);
}

function serialiseChapter(chapter) {
  return {
    id: chapter.id,
    number: chapter.number,
    title: chapter.title,
    shortTitle: chapter.shortTitle,
    durationTarget: chapter.durationTarget,
    visualType: chapter.visualType,
    learningOutcome: chapter.learningOutcome,
    segments: chapter.scenes.map((scene) => scene.narration),
    tests: chapter.tests
  };
}

async function buildChapterAudio(chapter) {
  const n = String(chapter.number).padStart(2, "0");
  const workDir = path.join(workRoot, `chapter-${n}`);
  const sceneDir = path.join(workDir, "scenes");
  const audioPath = path.join(courseDir, "assets", "audio", `chapter-${n}-teacher.mp3`);
  const captionPath = path.join(courseDir, "assets", "captions", `chapter-${n}.vtt`);
  const timelineDir = path.join(courseDir, "assets", "timelines");
  const timelinePath = path.join(timelineDir, `chapter-${n}.json`);
  await fs.mkdir(sceneDir, { recursive: true });
  await fs.mkdir(path.dirname(audioPath), { recursive: true });
  await fs.mkdir(path.dirname(captionPath), { recursive: true });
  await fs.mkdir(timelineDir, { recursive: true });

  const silencePath = await ensureSilence(sceneGapSeconds);
  const checkpointSilencePath = await ensureSilence(checkpointGapSeconds);

  const files = [];
  const timeline = [];
  let cursor = 0;
  for (let index = 0; index < chapter.scenes.length; index += 1) {
    const scene = chapter.scenes[index];
    const scenePath = path.join(sceneDir, `${String(index + 1).padStart(2, "0")}-${scene.id}.mp3`);
    await createSceneSpeech(scene, scenePath);
    const duration = await mediaDuration(scenePath);
    const gap = index === chapter.scenes.length - 1 ? 0 : scene.checkpoint ? checkpointGapSeconds : sceneGapSeconds;
    timeline.push({
      index,
      id: scene.id,
      title: scene.title,
      visualIntent: scene.visualIntent,
      checkpoint: scene.checkpoint || null,
      start: round(cursor),
      audioEnd: round(cursor + duration),
      end: round(cursor + duration + gap),
      duration: round(duration)
    });
    cursor += duration;
    files.push(scenePath);
    if (gap > 0) {
      files.push(scene.checkpoint ? checkpointSilencePath : silencePath);
      cursor += gap;
    }
  }

  const concatPath = path.join(workDir, "concat.txt");
  await fs.writeFile(concatPath, files.map((file) => `file '${file.replaceAll("'", "'\\''")}'`).join("\n"));
  await run(ffmpeg, [
    "-y", "-f", "concat", "-safe", "0", "-i", concatPath,
    "-codec:a", "libmp3lame", "-b:a", "128k", "-ar", "24000", "-ac", "1", audioPath
  ]);
  const totalDuration = await mediaDuration(audioPath);
  if (totalDuration < 600) throw new Error(`Chapter ${n} audio is under 10 minutes: ${totalDuration.toFixed(1)}s`);

  const captions = buildCaptions(chapter, timeline);
  await fs.writeFile(captionPath, makeVtt(captions));
  await fs.writeFile(timelinePath, `${JSON.stringify({
    chapterId: chapter.id,
    number: chapter.number,
    title: chapter.title,
    release,
    duration: round(totalDuration),
    scenes: timeline
  }, null, 2)}\n`);

  console.log(`chapter-${n}: ${totalDuration.toFixed(1)}s, ${wordCount(chapter.scenes.map((scene) => scene.narration).join(" "))} words, ${captions.length} caption cues`);
}

async function ensureSilence(seconds) {
  const file = path.join(workRoot, `silence-${seconds.toFixed(1)}s.mp3`);
  if (!(await exists(file))) {
    await run(ffmpeg, [
      "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", String(seconds),
      "-codec:a", "libmp3lame", "-b:a", "64k", file
    ]);
  }
  return file;
}

async function createSceneSpeech(scene, outputPath) {
  const hash = crypto.createHash("sha256").update(JSON.stringify({
    model: "gpt-4o-mini-tts",
    voice: "coral",
    voiceInstructions,
    text: scene.narration
  })).digest("hex");
  const hashPath = `${outputPath}.sha256`;
  if (await exists(outputPath) && await fs.readFile(hashPath, "utf8").catch(() => "") === hash) return;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required for Chemistry narration generation.");
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "coral",
      input: scene.narration,
      instructions: voiceInstructions,
      response_format: "mp3"
    })
  });
  if (!response.ok) throw new Error(`OpenAI speech failed for ${scene.id}: ${response.status} ${await response.text()}`);
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
  await fs.writeFile(hashPath, hash);
}

function buildCaptions(chapter, timeline) {
  const cues = [];
  for (const timing of timeline) {
    const scene = chapter.scenes[timing.index];
    const chunks = splitCaptionText(scene.narration);
    const weights = chunks.map(wordCount);
    const total = weights.reduce((sum, value) => sum + value, 0) || 1;
    let cursor = timing.start;
    for (let index = 0; index < chunks.length; index += 1) {
      const end = index === chunks.length - 1
        ? timing.audioEnd
        : cursor + timing.duration * (weights[index] / total);
      cues.push({ start: cursor, end, text: chunks[index] });
      cursor = end;
    }
  }
  return cues;
}

function splitCaptionText(text) {
  const sentences = String(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [String(text)];
  const chunks = [];
  for (const sentence of sentences.map((value) => value.trim()).filter(Boolean)) {
    if (sentence.length <= 115) {
      chunks.push(sentence);
      continue;
    }
    const clauses = sentence.split(/(?<=[,;:])\s+/);
    let current = "";
    for (const clause of clauses) {
      const next = current ? `${current} ${clause}` : clause;
      if (next.length > 115 && current) {
        chunks.push(current);
        current = clause;
      } else {
        current = next;
      }
    }
    if (current) chunks.push(current);
  }
  return chunks;
}

function makeVtt(cues) {
  const lines = ["WEBVTT", ""];
  for (const cue of cues) {
    lines.push(`${timeCode(cue.start)} --> ${timeCode(cue.end)}`);
    lines.push(cue.text);
    lines.push("");
  }
  return lines.join("\n");
}

async function mediaDuration(file) {
  const output = await run(ffprobe, [
    "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file
  ], true);
  return Number.parseFloat(output.trim());
}

function run(command, args, capture = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: process.env,
      stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit"
    });
    let stdout = "";
    let stderr = "";
    if (capture) {
      child.stdout.on("data", (chunk) => stdout += chunk);
      child.stderr.on("data", (chunk) => stderr += chunk);
    }
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${path.basename(command)} exited ${code}\n${stderr}`));
    });
  });
}

function timeCode(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = Math.floor(safe % 60);
  const ms = Math.floor((safe - Math.floor(safe)) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

function wordCount(value) {
  return String(value).trim().split(/\s+/).filter(Boolean).length;
}

function round(value) {
  return Number(value.toFixed(3));
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
