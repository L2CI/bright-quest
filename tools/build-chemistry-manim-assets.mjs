import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const userHome = process.env.USERPROFILE || "C:\\Users\\gupta";
const python = path.join(userHome, ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe");
const ffmpeg = path.join(userHome, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffmpeg.exe");
const ffprobe = path.join(userHome, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffprobe.exe");
const courseDir = path.join(root, "chemistry-training", "chemistry-101-winter-2026");
const script = path.join(root, "tools", "render_chemistry_manim_chapters.py");
const mediaDir = path.join(root, "outputs", "chemistry-manim-media");

const chapters = (process.env.BQ_ONLY_CHAPTERS || "6,7,8,9,10,11")
  .split(",")
  .map((value) => Number.parseInt(value.trim(), 10))
  .filter(Boolean);

async function main() {
  await fs.mkdir(mediaDir, { recursive: true });
  await run(python, [script, "cards", "--out", path.join(courseDir, "assets", "ui")]);

  for (const chapter of chapters) {
    const n = String(chapter).padStart(2, "0");
    const audio = path.join(courseDir, "assets", "audio", `chapter-${n}-teacher.mp3`);
    const silentName = `chapter-${n}-manim-silent`;
    const duration = await mediaDuration(audio);
    console.log(`Rendering chapter ${n} with Manim (${duration.toFixed(1)}s voice reused)`);
    await run(python, [
      "-m",
      "manim",
      "--media_dir",
      mediaDir,
      "--disable_caching",
      "-r",
      "1280,720",
      "--fps",
      "6",
      "-o",
      silentName,
      script,
      `ChemistryChapter${n}`,
    ], {
      BQ_CHAPTER_DURATION: String(duration + 1.5),
    });

    const silentVideo = await findFile(mediaDir, `${silentName}.mp4`);
    const video = path.join(courseDir, "assets", "videos", `chapter-${n}.mp4`);
    const poster = path.join(courseDir, "assets", "posters", `chapter-${n}.jpg`);
    await run(ffmpeg, [
      "-y",
      "-i",
      silentVideo,
      "-i",
      audio,
      "-map",
      "0:v:0",
      "-map",
      "1:a:0",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "22",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-t",
      String(duration + 1.5),
      "-shortest",
      "-movflags",
      "+faststart",
      video,
    ]);
    await run(ffmpeg, ["-y", "-ss", "8", "-i", video, "-frames:v", "1", "-update", "1", "-q:v", "2", poster]);
    const renderedDuration = await mediaDuration(video);
    if (renderedDuration < 300) throw new Error(`Chapter ${n} is under 5 minutes after Manim render: ${renderedDuration.toFixed(1)}s`);
    console.log(`Chapter ${n} complete: ${renderedDuration.toFixed(1)}s`);
  }
}

async function mediaDuration(file) {
  const result = await run(ffprobe, [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    file,
  ], {}, true);
  return Number.parseFloat(result.trim());
}

async function findFile(dir, filename) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      try {
        const found = await findFile(full, filename);
        if (found) return found;
      } catch {
        // Keep searching other Manim output folders.
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
      child.stdout.on("data", (chunk) => {
        stdout += chunk;
      });
      child.stderr.on("data", (chunk) => {
        stderr += chunk;
      });
    }
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`${command} ${args.join(" ")} failed with ${code}\n${stderr}`));
      }
    });
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
