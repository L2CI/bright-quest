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
const renderScript = path.join(root, "tools", "render_physics_chapters_04_06.py");
const workDir = path.join(root, "outputs", "physics-101-chapters-04-06");
const targetSeconds = 205;
const voiceModel = "gpt-4o-mini-tts-2025-12-15";
const voiceName = "cedar";
const posterAt = { 4: 17, 5: 92, 6: 178 };

async function main() {
  const course = JSON.parse(await fs.readFile(dataFile, "utf8"));
  const chapterFlag = process.argv.indexOf("--chapter");
  const requested = chapterFlag >= 0 ? Number(process.argv[chapterFlag + 1]) : null;
  const chapterNumbers = requested ? [requested] : [4, 5, 6];
  if (chapterNumbers.some((number) => ![4, 5, 6].includes(number))) {
    throw new Error("--chapter must be 4, 5 or 6.");
  }
  for (const number of chapterNumbers) {
    const chapter = course.chapters.find((entry) => entry.number === number);
    if (!chapter?.narration?.length) throw new Error(`Physics Chapter ${number} narration is missing.`);
    await buildChapter(course, chapter);
  }
}

async function buildChapter(course, chapter) {
  const chapterTag = `chapter-${String(chapter.number).padStart(2, "0")}`;
  const chapterWorkDir = path.join(workDir, chapterTag);
  const segmentsDir = path.join(chapterWorkDir, "voice-sections-v1");
  const voiceWavDir = path.join(chapterWorkDir, "voice-wav-v1");
  await Promise.all([
    fs.mkdir(segmentsDir, { recursive: true }),
    fs.mkdir(voiceWavDir, { recursive: true }),
    ...["audio", "captions", "posters", "timelines", "ui", "videos"].map((folder) => fs.mkdir(path.join(courseDir, "assets", folder), { recursive: true })),
  ]);

  const apiKey = process.env.OPENAI_API_KEY || "";
  const parts = [];
  for (const [index, section] of narrationSections(chapter).entries()) {
    const segmentPath = path.join(segmentsDir, `${String(index + 1).padStart(2, "0")}-${section.id}.mp3`);
    let duration = await reusableSpeechDuration(segmentPath);
    if (!duration) {
      if (!apiKey) throw new Error(`OPENAI_API_KEY is required to generate ${chapterTag} voice section ${section.id}.`);
      await createSpeech(apiKey, chapter, section, segmentPath);
      duration = await mediaDuration(segmentPath);
    }
    if (duration < 5) throw new Error(`${chapterTag} voice section ${section.id} is unexpectedly short.`);
    parts.push({ ...section, file: segmentPath, duration });
    console.log(`${chapterTag} voice ${index + 1}/4: ${duration.toFixed(2)}s`);
  }

  const spokenSeconds = parts.reduce((sum, part) => sum + part.duration, 0);
  if (spokenSeconds > 198) throw new Error(`${chapterTag} measured speech is too long: ${spokenSeconds.toFixed(2)}s.`);
  const leadout = 1.25;
  const gap = Math.max(2.2, (targetSeconds - leadout - spokenSeconds) / 3);
  console.log(`${chapterTag} spoken ${spokenSeconds.toFixed(2)}s; section pause ${gap.toFixed(2)}s.`);

  for (const [index, part] of parts.entries()) {
    const wavPath = path.join(voiceWavDir, `${String(index + 1).padStart(2, "0")}-${part.id}.wav`);
    await run(ffmpeg, ["-y", "-i", part.file, "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le", wavPath]);
    part.wavFile = wavPath;
  }

  const silencePath = path.join(chapterWorkDir, "evidence-room-tone.wav");
  const leadoutPath = path.join(chapterWorkDir, "leadout-room-tone.wav");
  await run(ffmpeg, ["-y", "-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=0.0007:r=44100", "-t", String(gap), "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le", silencePath]);
  await run(ffmpeg, ["-y", "-f", "lavfi", "-i", "anoisesrc=color=pink:amplitude=0.0007:r=44100", "-t", String(leadout), "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le", leadoutPath]);

  const concatPath = path.join(chapterWorkDir, `${chapterTag}-concat.txt`);
  const concatLines = [];
  parts.forEach((part, index) => {
    concatLines.push(`file '${escapeConcatPath(part.wavFile)}'`);
    if (index < parts.length - 1) concatLines.push(`file '${escapeConcatPath(silencePath)}'`);
  });
  concatLines.push(`file '${escapeConcatPath(leadoutPath)}'`);
  await fs.writeFile(concatPath, `${concatLines.join("\n")}\n`, "utf8");

  const rawWav = path.join(chapterWorkDir, `${chapterTag}-teacher-raw.wav`);
  const masterWav = path.join(chapterWorkDir, `${chapterTag}-teacher-master.wav`);
  const audioMp3 = path.join(courseDir, "assets", "audio", `${chapterTag}-teacher.mp3`);
  await run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", concatPath, "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le", rawWav]);
  await run(ffmpeg, ["-y", "-i", rawWav, "-af", "loudnorm=I=-16:TP=-1.5:LRA=7", "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le", masterWav]);
  await run(ffmpeg, ["-y", "-i", masterWav, "-c:a", "libmp3lame", "-b:a", "192k", audioMp3]);
  const audioDuration = await mediaDuration(masterWav);

  let cursor = 0;
  const timeline = [];
  parts.forEach((part, sectionIndex) => {
    const weights = part.cues.map((cue) => Math.max(1, cue.text.trim().split(/\s+/u).length));
    const total = weights.reduce((sum, value) => sum + value, 0);
    part.cues.forEach((cue, cueIndex) => {
      const start = cursor;
      cursor += part.duration * (weights[cueIndex] / total);
      timeline.push({ id: cue.id, title: cue.title, visual: cue.visual, text: cue.text, start: round(start), end: round(cursor), beatEnd: round(cursor), voiceSection: part.id });
    });
    cursor += sectionIndex < parts.length - 1 ? gap : leadout;
    timeline[timeline.length - 1].beatEnd = round(cursor);
  });

  const captionPackage = buildVtt(timeline);
  const timelinePath = path.join(courseDir, "assets", "timelines", `${chapterTag}.json`);
  const actions = timeline.map((cue) => ({ id: cue.id, start: cue.start, end: cue.beatEnd, narration: cue.text, expected_action: cue.visual, board_region: "demonstration-stage" }));
  await fs.writeFile(timelinePath, `${JSON.stringify({
    release: course.release,
    chapter: chapter.number,
    duration: round(audioDuration),
    cues: timeline,
    captionCues: captionPackage.cues,
    visualBeats: captionPackage.cues.map(({ index, start, end, sourceCueId, event, cueFunction, targets, intentionalHold }) => ({ index, start, end, sourceCueId, event, cueFunction, targets, holdUntil: end, intentionalHold })),
    actions,
  }, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(courseDir, "assets", "captions", `${chapterTag}.vtt`), captionPackage.vtt, "utf8");

  const silentName = `physics-${chapterTag}-silent`;
  const sceneName = `PhysicsChapter0${chapter.number}Cinematic`;
  await run(python, ["-m", "manim", "--progress_bar", "none", "--verbosity", "WARNING", "--media_dir", chapterWorkDir, "--disable_caching", "-r", "1920,1080", "--fps", "30", "-o", silentName, renderScript, sceneName], {
    BQ_TIMELINE_PATH: timelinePath,
    BQ_PHYSICS_COURSE_DIR: courseDir,
  });
  const renderFolder = path.basename(renderScript, path.extname(renderScript));
  const silentVideo = await findFile(path.join(chapterWorkDir, "videos", renderFolder), `${silentName}.mp4`);
  const videoPath = path.join(courseDir, "assets", "videos", `${chapterTag}.mp4`);
  await run(ffmpeg, ["-y", "-i", silentVideo, "-i", masterWav, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", videoPath]);
  const posterPath = path.join(courseDir, "assets", "posters", `${chapterTag}.jpg`);
  await run(ffmpeg, ["-y", "-ss", String(posterAt[chapter.number]), "-i", videoPath, "-frames:v", "1", "-update", "1", "-q:v", "2", posterPath]);
  await run(ffmpeg, ["-y", "-i", posterPath, "-vf", "scale=720:405", "-frames:v", "1", "-update", "1", path.join(courseDir, "assets", "ui", `${chapterTag}-card.png`)]);
  const finalDuration = await mediaDuration(videoPath);
  if (finalDuration < 195 || finalDuration > 220) throw new Error(`${chapterTag} final duration ${finalDuration.toFixed(2)}s is outside 195-220s.`);
  console.log(`${chapterTag} complete: ${finalDuration.toFixed(2)}s`);
}

async function createSpeech(apiKey, chapter, section, outputPath) {
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: voiceModel,
      voice: voiceName,
      response_format: "mp3",
      speed: 1.08,
      input: section.text,
      instructions: teacherInstructions(chapter.number, section.id),
    }),
  });
  if (!response.ok) throw new Error(`OpenAI speech generation failed (${response.status}): ${(await response.text()).slice(0, 500)}`);
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

function narrationSections(chapter) {
  return [0, 3, 6, 9].map((start, index) => {
    const cues = chapter.narration.slice(start, start + 3);
    return { id: `part-${index + 1}`, cues, text: cues.map((cue) => cue.text).join("\n\n") };
  });
}

function teacherInstructions(chapterNumber, sectionId) {
  const focus = chapterNumber === 4
    ? "Build suspense before each surface result. Contrast useful grip with unwanted slowing, and land the words fair comparison and repeated distance with calm authority."
    : chapterNumber === 5
      ? "Treat the vacuum drop as a genuine reveal. Keep gravity and air resistance sharply distinct, and slow down for Earth on object and towards Earth's centre."
      : "Let the material non-results feel like evidence, then make attraction, repulsion and the visible gap vivid. Keep pole names and distance claims precise.";
  return [
    "Speak as a warm, adventurous Australian-friendly primary science teacher beside one capable eight-year-old learner.",
    focus,
    `This is ${sectionId} of one continuous lesson. Maintain conversational continuity rather than restarting like an announcer.`,
    "Use a natural middle-low pitch, lively but unforced rhythm, expressive contrast, settled factual endings and a full thinking pause after prediction questions.",
    "Sound quietly delighted by surprising evidence. Never become cartoonish, sales-like or relentlessly excited.",
    "Aim for approximately 145 to 155 words per minute, but slow around measurements, force labels and the final evidence claim.",
  ].join(" ");
}

function buildVtt(cues) {
  const lines = ["WEBVTT", ""];
  const captionCues = [];
  let captionIndex = 1;
  cues.forEach((cue) => {
    const chunks = captionChunks(cue.text);
    const weights = chunks.map((chunk) => Math.max(1, chunk.replace(/\s+/g, " ").length));
    const total = weights.reduce((sum, value) => sum + value, 0);
    let cursor = cue.start;
    chunks.forEach((chunk, localIndex) => {
      const end = localIndex === chunks.length - 1 ? cue.end : cursor + (cue.end - cue.start) * (weights[localIndex] / total);
      lines.push(String(captionIndex), `${vttTime(cursor)} --> ${vttTime(end)}`, chunk, "");
      const targets = [cue.visual || cue.id, `${cue.id}-evidence`];
      captionCues.push({
        index: captionIndex,
        start: round(cursor),
        end: round(end),
        text: chunk.replaceAll("\n", " "),
        sourceCueId: cue.id,
        event: `${cue.id}-${localIndex + 1}`,
        cueFunction: ["selection", "integration", "organisation"][localIndex % 3],
        targets,
        intentionalHold: /prediction|choose|decide/i.test(chunk) ? "predict" : null,
      });
      captionIndex += 1;
      cursor = end;
    });
  });
  return { vtt: `${lines.join("\n")}\n`, cues: captionCues };
}

function captionChunks(text) {
  const sentences = text.split(/(?<=[.!?])\s+/u).filter(Boolean);
  const chunks = [];
  for (const sentence of sentences) {
    const words = sentence.split(/\s+/u);
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > 62 && current) { chunks.push(wrapCaption(current)); current = word; }
      else current = candidate;
    }
    if (current) chunks.push(wrapCaption(current));
  }
  return chunks;
}

function wrapCaption(text) {
  if (text.length <= 32) return text;
  const words = text.split(/\s+/u);
  let bestIndex = 1;
  let bestScore = Infinity;
  for (let index = 1; index < words.length; index += 1) {
    const first = words.slice(0, index).join(" ");
    const second = words.slice(index).join(" ");
    if (first.length > 34 || second.length > 34) continue;
    const score = Math.abs(first.length - second.length);
    if (score < bestScore) { bestScore = score; bestIndex = index; }
  }
  return `${words.slice(0, bestIndex).join(" ")}\n${words.slice(bestIndex).join(" ")}`;
}

async function reusableSpeechDuration(file) {
  try { const duration = await mediaDuration(file); return duration >= 5 ? duration : 0; }
  catch { return 0; }
}

function vttTime(seconds) {
  const ms = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const secs = Math.floor((ms % 60_000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms % 1000).padStart(3, "0")}`;
}

function escapeConcatPath(value) { return value.replaceAll("\\", "/").replaceAll("'", "'\\''"); }
function round(value) { return Math.round(value * 1000) / 1000; }

async function mediaDuration(file) {
  const output = await run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], {}, true);
  return Number.parseFloat(output.trim());
}

async function findFile(dir, filename) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { try { return await findFile(full, filename); } catch {} }
    else if (entry.name === filename) return full;
  }
  throw new Error(`Could not locate ${filename} under ${dir}`);
}

function run(command, args, extraEnv = {}, capture = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, env: { ...process.env, ...extraEnv }, stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit" });
    let stdout = "";
    let stderr = "";
    if (capture) {
      child.stdout.on("data", (chunk) => { stdout += chunk; });
      child.stderr.on("data", (chunk) => { stderr += chunk; });
    }
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve(stdout) : reject(new Error(`${command} ${args.join(" ")} failed with ${code}\n${stderr}`)));
  });
}

main().catch((error) => { console.error(error); process.exit(1); });
