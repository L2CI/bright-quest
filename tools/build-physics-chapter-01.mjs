import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const userHome = process.env.USERPROFILE || "C:\\Users\\gupta";
const python = path.join(userHome, ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe");
const ffmpeg = path.join(userHome, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffmpeg.exe");
const ffprobe = path.join(userHome, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffprobe.exe");
const courseDir = path.join(root, "physics-training", "physics-101-advanced-grade-4");
const dataFile = path.join(courseDir, "data", "physics-101-course.json");
const renderScript = path.join(root, "tools", "render_physics_chapter_01_motion.py");
const workDir = path.join(root, "outputs", "physics-101-pilot-media");
const segmentsDir = path.join(workDir, "voice-segments");
const targetSeconds = 205;

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not available in this session.");

  const course = JSON.parse(await fs.readFile(dataFile, "utf8"));
  const chapter = course.chapters.find((entry) => entry.number === 1);
  if (!chapter) throw new Error("Physics Chapter 1 was not found in the course data.");

  await Promise.all([
    fs.mkdir(segmentsDir, { recursive: true }),
    fs.mkdir(path.join(courseDir, "assets", "audio"), { recursive: true }),
    fs.mkdir(path.join(courseDir, "assets", "captions"), { recursive: true }),
    fs.mkdir(path.join(courseDir, "assets", "posters"), { recursive: true }),
    fs.mkdir(path.join(courseDir, "assets", "timelines"), { recursive: true }),
    fs.mkdir(path.join(courseDir, "assets", "ui"), { recursive: true }),
    fs.mkdir(path.join(courseDir, "assets", "videos"), { recursive: true }),
  ]);

  const parts = [];
  for (let index = 0; index < chapter.narration.length; index += 1) {
    const segment = chapter.narration[index];
    const segmentPath = path.join(segmentsDir, `${String(index + 1).padStart(2, "0")}-${segment.id}.mp3`);
    let duration = await reusableSpeechDuration(segmentPath);
    if (!duration) {
      await createSpeech(apiKey, segment, segmentPath);
      duration = await mediaDuration(segmentPath);
    }
    if (duration < 5) {
      await createSpeech(apiKey, segment, segmentPath);
      duration = await mediaDuration(segmentPath);
    }
    if (duration < 5) throw new Error(`Voice segment ${segment.id} is unexpectedly short (${duration.toFixed(2)}s).`);
    parts.push({ ...segment, file: segmentPath, duration });
    console.log(`Voice ${index + 1}/${chapter.narration.length}: ${duration.toFixed(2)}s`);
  }

  const spokenSeconds = parts.reduce((total, part) => total + part.duration, 0);
  const leadout = 1.25;
  const gap = Math.max(0.65, (targetSeconds - leadout - spokenSeconds) / Math.max(1, parts.length - 1));
  const expectedDuration = spokenSeconds + gap * (parts.length - 1) + leadout;
  console.log(`Spoken ${spokenSeconds.toFixed(2)}s; evidence pause ${gap.toFixed(2)}s; target ${expectedDuration.toFixed(2)}s`);

  const silencePath = path.join(workDir, "evidence-pause.mp3");
  const leadoutPath = path.join(workDir, "leadout.mp3");
  await run(ffmpeg, ["-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-t", String(gap), "-q:a", "4", silencePath]);
  await run(ffmpeg, ["-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-t", String(leadout), "-q:a", "4", leadoutPath]);

  const concatFile = path.join(workDir, "chapter-01-concat.txt");
  const concatLines = [];
  parts.forEach((part, index) => {
    concatLines.push(`file '${escapeConcatPath(part.file)}'`);
    if (index < parts.length - 1) concatLines.push(`file '${escapeConcatPath(silencePath)}'`);
  });
  concatLines.push(`file '${escapeConcatPath(leadoutPath)}'`);
  await fs.writeFile(concatFile, `${concatLines.join("\n")}\n`, "utf8");

  const audioPath = path.join(courseDir, "assets", "audio", "chapter-01-teacher.mp3");
  await run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", concatFile, "-ar", "44100", "-ac", "2", "-b:a", "160k", audioPath]);
  const audioDuration = await mediaDuration(audioPath);

  let cursor = 0;
  const timeline = parts.map((part, index) => {
    const start = cursor;
    const end = start + part.duration;
    cursor = end + (index < parts.length - 1 ? gap : leadout);
    return {
      id: part.id,
      title: part.title,
      visual: part.visual,
      text: part.text,
      start: round(start),
      end: round(end),
      beatEnd: round(cursor),
    };
  });

  const timelinePath = path.join(courseDir, "assets", "timelines", "chapter-01.json");
  const actions = timeline.map((cue) => ({
    id: cue.id,
    start: cue.start,
    end: cue.beatEnd,
    narration: cue.text,
    expected_action: cue.visual,
    board_region: "demonstration-stage",
  }));
  await fs.writeFile(timelinePath, `${JSON.stringify({ release: course.release, duration: round(audioDuration), cues: timeline, actions }, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(courseDir, "assets", "captions", "chapter-01.vtt"), buildVtt(timeline), "utf8");

  const silentName = "physics-chapter-01-silent";
  await run(python, [
    "-m", "manim",
    "--media_dir", workDir,
    "--disable_caching",
    "-r", "1280,720",
    "--fps", "8",
    "-o", silentName,
    renderScript,
    "PhysicsChapter01Motion",
  ], {
    BQ_TIMELINE_PATH: timelinePath,
    BQ_PHYSICS_COURSE_DIR: courseDir,
  });

  const silentVideo = await findFile(workDir, `${silentName}.mp4`);
  const videoPath = path.join(courseDir, "assets", "videos", "chapter-01.mp4");
  await run(ffmpeg, [
    "-y", "-ss", "0.5", "-i", silentVideo, "-i", audioPath,
    "-map", "0:v:0", "-map", "1:a:0",
    "-vf", "tpad=stop_mode=clone:stop_duration=0.5",
    "-c:v", "libx264", "-preset", "medium", "-crf", "22",
    "-c:a", "aac", "-b:a", "160k",
    "-shortest", "-movflags", "+faststart", videoPath,
  ]);

  const posterPath = path.join(courseDir, "assets", "posters", "chapter-01.jpg");
  await run(ffmpeg, ["-y", "-ss", "4", "-i", videoPath, "-frames:v", "1", "-update", "1", "-q:v", "2", posterPath]);
  const cardPath = path.join(courseDir, "assets", "ui", "chapter-01-card.png");
  await run(ffmpeg, ["-y", "-i", posterPath, "-vf", "scale=720:405", "-frames:v", "1", "-update", "1", cardPath]);

  const finalDuration = await mediaDuration(videoPath);
  if (finalDuration < 195 || finalDuration > 220) {
    throw new Error(`Final lesson duration ${finalDuration.toFixed(2)}s is outside the 195-220 second pilot window.`);
  }
  console.log(`Physics Chapter 1 complete: ${finalDuration.toFixed(2)}s`);
}

async function createSpeech(apiKey, segment, outputPath) {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "onyx",
      response_format: "mp3",
      input: segment.text,
      instructions: "Speak as a warm, confident Australian primary science teacher with a clear lower register. Aim for 140 to 150 words per minute. Use precise diction for interaction, contact, non-contact, evidence and motion. Pause naturally at punctuation so a capable nine-year-old can inspect the diagram. Sound curious and encouraging, never military, theatrical, sing-song, or like an advertisement.",
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI speech generation failed (${response.status}): ${detail.slice(0, 500)}`);
  }
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

async function reusableSpeechDuration(outputPath) {
  try {
    const duration = await mediaDuration(outputPath);
    return duration >= 5 ? duration : 0;
  } catch {
    return 0;
  }
}

function buildVtt(cues) {
  const lines = ["WEBVTT", ""];
  cues.forEach((cue, index) => {
    lines.push(String(index + 1));
    lines.push(`${vttTime(cue.start)} --> ${vttTime(cue.end)}`);
    lines.push(cue.text);
    lines.push("");
  });
  return `${lines.join("\n")}\n`;
}

function vttTime(seconds) {
  const ms = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const secs = Math.floor((ms % 60_000) / 1000);
  const millis = ms % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}

function escapeConcatPath(value) {
  return value.replaceAll("\\", "/").replaceAll("'", "'\\''");
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

async function mediaDuration(file) {
  const output = await run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], {}, true);
  return Number.parseFloat(output.trim());
}

async function findFile(dir, filename) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      try {
        return await findFile(full, filename);
      } catch {
        // Continue through the Manim media tree.
      }
    } else if (entry.name === filename) {
      return full;
    }
  }
  throw new Error(`Could not locate ${filename} under ${dir}`);
}

function run(command, args, extraEnv = {}, capture = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: { ...process.env, ...extraEnv },
      stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
    });
    let stdout = "";
    let stderr = "";
    if (capture) {
      child.stdout.on("data", (chunk) => { stdout += chunk; });
      child.stderr.on("data", (chunk) => { stderr += chunk; });
    }
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${command} ${args.join(" ")} failed with ${code}\n${stderr}`));
    });
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
