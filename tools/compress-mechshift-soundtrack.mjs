import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require("playwright");
} catch {
  const modulePath = process.env.BQ_PLAYWRIGHT_MODULE;
  if (!modulePath) throw new Error("Install Playwright or set BQ_PLAYWRIGHT_MODULE to its module directory.");
  playwright = require(modulePath);
}

const baseUrl = process.env.BQ_QA_URL || "http://127.0.0.1:4173";
const browser = await playwright.chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/mechshift-rescue/`, { waitUntil: "domcontentloaded" });
  const encoded = await page.evaluate(async () => {
    const mimeType = "audio/webm;codecs=opus";
    if (!MediaRecorder.isTypeSupported(mimeType)) throw new Error(`${mimeType} is not supported by this browser.`);
    const response = await fetch("assets/audio/mechshift-command-loop.wav");
    if (!response.ok) throw new Error(`Soundtrack master returned ${response.status}.`);
    const context = new AudioContext();
    const master = await context.decodeAudioData(await response.arrayBuffer());
    const source = context.createBufferSource();
    const destination = context.createMediaStreamDestination();
    source.buffer = master;
    source.connect(destination);
    const chunks = [];
    const recorder = new MediaRecorder(destination.stream, { mimeType, audioBitsPerSecond: 96000 });
    recorder.addEventListener("dataavailable", (event) => { if (event.data.size) chunks.push(event.data); });
    const stopped = new Promise((resolveStopped) => recorder.addEventListener("stop", resolveStopped, { once: true }));
    recorder.start(250);
    source.start();
    source.addEventListener("ended", () => recorder.stop(), { once: true });
    await stopped;
    await context.close();
    const bytes = new Uint8Array(await new Blob(chunks, { type: mimeType }).arrayBuffer());
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    return { base64: btoa(binary), bytes: bytes.length, seconds: master.duration, mimeType };
  });
  const output = resolve("mechshift-rescue/assets/audio/mechshift-command-loop.webm");
  await writeFile(output, Buffer.from(encoded.base64, "base64"));
  console.log(JSON.stringify({ result: "compressed", output, bytes: encoded.bytes, seconds: encoded.seconds, mimeType: encoded.mimeType }, null, 2));
} finally {
  await browser.close();
}
