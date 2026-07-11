import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const home = process.env.USERPROFILE || "C:\\Users\\gupta";
const python = path.join(home, ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe");
const ffmpeg = path.join(home, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffmpeg.exe");
const ffprobe = path.join(home, ".codex", "skills", "animation-qa-scanner", "assets", "bin", "ffprobe.exe");
const courseDir = path.join(root, "chemistry-training", "chemistry-101-winter-2026");
const renderer = path.join(root, "tools", "render_chemistry_revamp_manim.py");
const mediaDir = path.join(root, "outputs", "chemistry-revamp-manim-media");
const chapters = (process.env.BQ_ONLY_CHAPTERS || "8,9,10,11").split(",").map(Number).filter(Boolean);

async function main() {
  await fs.mkdir(mediaDir, { recursive: true });
  await run(python, [renderer, "cards", "--out", path.join(courseDir, "assets", "ui")]);
  for (const chapter of chapters) await renderChapter(chapter);
}

async function renderChapter(chapter) {
  const n = String(chapter).padStart(2, "0");
  const audio = path.join(courseDir, "assets", "audio", `chapter-${n}-teacher.mp3`);
  const silentName = `chapter-${n}-revamp-silent`;
  const duration = await mediaDuration(audio);
  if (duration < 600) throw new Error(`Chapter ${n} audio is under 10 minutes: ${duration.toFixed(1)}s`);
  console.log(`Rendering chapter ${n} revamp (${duration.toFixed(1)}s)`);
  await run(python, [
    "-m", "manim", "--media_dir", mediaDir, "--disable_caching", "-r", "1920,1080", "--fps", "12",
    "-o", silentName, renderer, `ChemistryChapter${n}Revamp`
  ]);
  const silent = await findFile(mediaDir, `${silentName}.mp4`);
  const video = path.join(courseDir, "assets", "videos", `chapter-${n}.mp4`);
  const poster = path.join(courseDir, "assets", "posters", `chapter-${n}.jpg`);
  await run(ffmpeg, [
    "-y", "-i", silent, "-i", audio, "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-c:a", "aac", "-b:a", "160k",
    "-t", String(duration), "-movflags", "+faststart", video
  ]);
  await run(ffmpeg, ["-y", "-ss", "00:00:18", "-i", video, "-frames:v", "1", "-update", "1", "-q:v", "2", poster]);
  const rendered = await mediaDuration(video);
  if (rendered < 600) throw new Error(`Chapter ${n} video is under 10 minutes: ${rendered.toFixed(1)}s`);
  console.log(`Chapter ${n} complete: ${rendered.toFixed(1)}s at 1920x1080 / 12 fps`);
}

async function mediaDuration(file) {
  const output = await run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], true);
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
        // Continue searching sibling output folders.
      }
    } else if (entry.name === filename) {
      return full;
    }
  }
  throw new Error(`Could not locate ${filename} under ${dir}`);
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
