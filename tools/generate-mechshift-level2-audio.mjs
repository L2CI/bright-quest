import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is not available.");

const outputDir = resolve("mechshift-rescue/assets/level-2/audio");
await mkdir(outputDir, { recursive: true });

const stages = [
  {
    id: "level-2-stage-1",
    text: "Commander Nimbus here. Level two. Stage one. Transform Relay Seven into Mag Claw mode. Calculate the usable coupler charge and the spare. Then select each magnetic coupler and lock all three glowing rail sockets."
  },
  {
    id: "level-2-stage-2",
    text: "Stage two. Transform to Shield Runner mode. Share one hundred and seventy one shield units equally across three carriers. Subtract the seventeen unit crossing cost. Then match the glowing lane and hold Shield before every lightning pulse lands."
  },
  {
    id: "level-2-stage-3",
    text: "Final stage. Transform Relay Seven into Titan Bridge mode. Prove the three sections reach the fifty two metre gap and leave a two metre anchor zone. Then order the seven minute build: rotate, anchor, energise. Hold steady while the convoy crosses."
  }
];

const scorePrompt = `Create a production-ready composition specification for a seamless original 20-second game-music loop.

Context: Stormrail Shield Sprint is the premium Level 2 mission in the child-friendly Mechshift Rescue game. A heroic transforming rescue machine runs beside a civilian convoy through a lightning storm above a floating city. The listener loves transforming robots. The music should feel like a polished app-store sequel: confident field-command energy, propulsive rescue action, warm heroism, bright storm electricity and controlled excitement. It must never sound frightening, violent, babyish, noisy, or like any existing franchise theme.

Musical direction: 96 BPM, D minor with hopeful major colour, hybrid cinematic orchestra and clean electronic pulse, restrained snare cadence, low synth engine, short brass calls, glassy arpeggio, clear space for spoken instructions. Eight bars of 4/4. Strong loop point. No vocals.

Return only valid JSON with this exact shape:
{
  "title": "Stormrail Command",
  "bpm": 96,
  "key": "D minor",
  "mood": "string",
  "chords": [[midi,midi,midi], ... exactly 8 arrays],
  "bass": [midi, ... exactly 32 integers],
  "arp": [midi, ... exactly 64 integers],
  "brass": [{"beat": number from 0 to 31.5, "notes": [three midi integers], "length": number from 0.25 to 1.5, "velocity": number from 0.35 to 0.9}, ... 6 to 12 events],
  "accentBeats": [number, ... 6 to 14 values from 0 to 31.5],
  "mixNotes": "string"
}`;

const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    authorization: `Bearer ${apiKey}`,
    "content-type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-5.6-sol",
    reasoning: { effort: "medium" },
    text: { verbosity: "low" },
    input: scorePrompt
  })
});

if (!response.ok) {
  const detail = (await response.text()).slice(0, 600);
  throw new Error(`OpenAI score request failed (${response.status}): ${detail}`);
}

const responseJson = await response.json();
const scoreText = responseJson.output
  ?.flatMap((item) => item.content || [])
  .find((item) => item.type === "output_text")?.text;
if (!scoreText) throw new Error("OpenAI score response did not contain output text.");

const jsonMatch = scoreText.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("OpenAI score response did not contain JSON.");
const score = validateScore(JSON.parse(jsonMatch[0]));

const scoreRecord = {
  generator: "OpenAI Responses API",
  model: "gpt-5.6-sol",
  originalWork: true,
  intendedUse: "Mechshift Rescue Level 2 Stormrail Shield Sprint background music",
  ...score
};
await writeFile(resolve(outputDir, "stormrail-command-score.json"), `${JSON.stringify(scoreRecord, null, 2)}\n`);

const wav = renderScore(score);
await writeFile(resolve(outputDir, "stormrail-command-loop.wav"), wav);

const voiceInstructions = [
  "Record premium mission guidance for a child-friendly science-fiction rescue game.",
  "Use a deep, warm adult male field-commander voice with crisp diction, calm authority, and premium cinematic presence.",
  "Deliver the lines like smart rescue orders: brisk, confident, alert, energetic, and encouraging, with purposeful rises into each action.",
  "Emphasise the required machine form, the numbered button, and the action at the beacon.",
  "Keep the energy at eight and a half out of ten without shouting. Sound swanky and assured, never dull or flat.",
  "Never sound aggressive, frightening, robotic, cartoonish, or like a parody soldier.",
  "Use short purposeful pauses after the stage number and before the maths task.",
  "Speak only the supplied words. Do not add an introduction or sound effects."
].join(" ");

const voiceFiles = [];
for (const stage of stages) {
  const voiceResponse = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "onyx",
      input: stage.text,
      instructions: voiceInstructions,
      response_format: "mp3"
    })
  });
  if (!voiceResponse.ok) {
    const detail = (await voiceResponse.text()).slice(0, 600);
    throw new Error(`OpenAI voice request failed for ${stage.id} (${voiceResponse.status}): ${detail}`);
  }
  const voiceBuffer = Buffer.from(await voiceResponse.arrayBuffer());
  const fileName = `commander-${stage.id}.mp3`;
  await writeFile(resolve(outputDir, fileName), voiceBuffer);
  voiceFiles.push({ fileName, bytes: voiceBuffer.byteLength });
}

console.log(JSON.stringify({
  result: "generated",
  score: { title: score.title, bpm: score.bpm, seconds: wav.durationSeconds, bytes: wav.byteLength },
  voices: voiceFiles
}, null, 2));

function validateScore(value) {
  const fail = (message) => { throw new Error(`Invalid OpenAI score: ${message}`); };
  if (!value || typeof value !== "object") fail("root must be an object");
  if (!Array.isArray(value.chords) || value.chords.length !== 8 || value.chords.some((chord) => !Array.isArray(chord) || chord.length !== 3)) fail("chords must contain eight triads");
  if (!Array.isArray(value.bass) || value.bass.length !== 32) fail("bass must contain 32 notes");
  if (!Array.isArray(value.arp) || value.arp.length !== 64) fail("arp must contain 64 notes");
  if (!Array.isArray(value.brass) || value.brass.length < 6 || value.brass.length > 12) fail("brass must contain 6 to 12 events");
  if (!Array.isArray(value.accentBeats) || value.accentBeats.length < 6 || value.accentBeats.length > 14) fail("accentBeats must contain 6 to 14 values");
  const midi = (note) => Number.isInteger(note) && note >= 24 && note <= 96;
  if (value.chords.flat().some((note) => !midi(note)) || value.bass.some((note) => !midi(note)) || value.arp.some((note) => !midi(note))) fail("notes must be valid MIDI integers");
  value.brass.forEach((event) => {
    if (!Number.isFinite(event.beat) || event.beat < 0 || event.beat > 31.5) fail("invalid brass beat");
    if (!Array.isArray(event.notes) || event.notes.length !== 3 || event.notes.some((note) => !midi(note))) fail("invalid brass notes");
    if (!Number.isFinite(event.length) || event.length < .25 || event.length > 1.5) fail("invalid brass length");
    if (!Number.isFinite(event.velocity) || event.velocity < .35 || event.velocity > .9) fail("invalid brass velocity");
  });
  if (value.accentBeats.some((beat) => !Number.isFinite(beat) || beat < 0 || beat > 31.5)) fail("invalid accent beat");
  return {
    title: String(value.title || "Aether Command"),
    bpm: 96,
    key: "D minor",
    mood: String(value.mood || "heroic futuristic rescue"),
    chords: value.chords,
    bass: value.bass,
    arp: value.arp,
    brass: value.brass,
    accentBeats: value.accentBeats,
    mixNotes: String(value.mixNotes || "Keep space for mission voice.")
  };
}

function renderScore(score) {
  const sampleRate = 22050;
  const beatSeconds = 60 / score.bpm;
  const durationSeconds = 32 * beatSeconds;
  const frameCount = Math.round(durationSeconds * sampleRate);
  const left = new Float64Array(frameCount);
  const right = new Float64Array(frameCount);
  let noiseSeed = 0x7a11ce;

  const noise = () => {
    noiseSeed = (1664525 * noiseSeed + 1013904223) >>> 0;
    return (noiseSeed / 0xffffffff) * 2 - 1;
  };
  const midiHz = (midi) => 440 * (2 ** ((midi - 69) / 12));
  const add = (index, value, pan = 0) => {
    if (index < 0 || index >= frameCount) return;
    const leftGain = Math.sqrt((1 - Math.max(-1, Math.min(1, pan))) / 2);
    const rightGain = Math.sqrt((1 + Math.max(-1, Math.min(1, pan))) / 2);
    left[index] += value * leftGain;
    right[index] += value * rightGain;
  };
  const waveAt = (type, phase) => {
    if (type === "triangle") return (2 / Math.PI) * Math.asin(Math.sin(phase));
    if (type === "saw") return 2 * ((phase / (Math.PI * 2)) % 1) - 1;
    if (type === "square") return Math.sin(phase) >= 0 ? 1 : -1;
    return Math.sin(phase);
  };
  const envelope = (time, duration, attack, release) => {
    if (time < 0 || time >= duration) return 0;
    const inGain = Math.min(1, time / Math.max(.001, attack));
    const outGain = Math.min(1, (duration - time) / Math.max(.001, release));
    return Math.max(0, Math.min(inGain, outGain));
  };
  const addTone = ({ midi, beat, beats, amp, type = "sine", pan = 0, detune = 0, attack = .02, release = .12 }) => {
    const start = Math.round(beat * beatSeconds * sampleRate);
    const duration = beats * beatSeconds;
    const count = Math.round(duration * sampleRate);
    const frequency = midiHz(midi) * (2 ** (detune / 1200));
    for (let i = 0; i < count; i += 1) {
      const time = i / sampleRate;
      const env = envelope(time, duration, attack, release);
      add(start + i, waveAt(type, Math.PI * 2 * frequency * time) * amp * env, pan);
    }
  };
  const addKick = (beat, amp) => {
    const start = Math.round(beat * beatSeconds * sampleRate);
    const duration = .24;
    const count = Math.round(duration * sampleRate);
    for (let i = 0; i < count; i += 1) {
      const time = i / sampleRate;
      const frequency = 95 * Math.exp(-time * 13) + 42;
      const env = Math.exp(-time * 18);
      add(start + i, Math.sin(Math.PI * 2 * frequency * time) * amp * env, 0);
    }
  };
  const addSnare = (beat, amp) => {
    const start = Math.round(beat * beatSeconds * sampleRate);
    const duration = .2;
    const count = Math.round(duration * sampleRate);
    let filtered = 0;
    for (let i = 0; i < count; i += 1) {
      const time = i / sampleRate;
      filtered = filtered * .2 + noise() * .8;
      const body = Math.sin(Math.PI * 2 * 185 * time) * .22;
      add(start + i, (filtered * .72 + body) * amp * Math.exp(-time * 20), .08);
    }
  };
  const addHat = (beat, amp, pan) => {
    const start = Math.round(beat * beatSeconds * sampleRate);
    const duration = .055;
    const count = Math.round(duration * sampleRate);
    let previous = 0;
    for (let i = 0; i < count; i += 1) {
      const time = i / sampleRate;
      const current = noise();
      const high = current - previous * .8;
      previous = current;
      add(start + i, high * amp * Math.exp(-time * 54), pan);
    }
  };

  score.chords.forEach((chord, bar) => {
    chord.forEach((note, index) => {
      addTone({ midi: note, beat: bar * 4, beats: 4.05, amp: .035, type: "triangle", pan: [-.45, 0, .45][index], detune: index === 1 ? 4 : -3, attack: .35, release: .5 });
      addTone({ midi: note + 12, beat: bar * 4, beats: 4.05, amp: .012, type: "sine", pan: [.5, -.35, .25][index], attack: .45, release: .6 });
    });
  });

  score.bass.forEach((note, beat) => {
    addTone({ midi: note, beat, beats: .74, amp: .09, type: "triangle", pan: 0, attack: .008, release: .16 });
    if (beat % 4 === 0) addTone({ midi: note - 12, beat, beats: 1.4, amp: .04, type: "sine", pan: 0, attack: .02, release: .3 });
  });

  score.arp.forEach((note, step) => {
    const pan = step % 2 ? .34 : -.34;
    addTone({ midi: note, beat: step * .5, beats: .36, amp: .026, type: "sine", pan, attack: .005, release: .1 });
    addTone({ midi: note + 12, beat: step * .5, beats: .18, amp: .009, type: "triangle", pan: -pan, attack: .003, release: .06 });
  });

  score.brass.forEach((event) => event.notes.forEach((note, index) => {
    addTone({ midi: note, beat: event.beat, beats: event.length, amp: .042 * event.velocity, type: "saw", pan: [-.28, 0, .28][index], detune: [-5, 1, 6][index], attack: .045, release: .22 });
    addTone({ midi: note - 12, beat: event.beat, beats: event.length, amp: .025 * event.velocity, type: "triangle", pan: 0, attack: .05, release: .24 });
  }));

  for (let beat = 0; beat < 32; beat += 1) {
    if (beat % 4 === 0 || beat % 4 === 2) addKick(beat, beat % 4 === 0 ? .2 : .14);
    if (beat % 4 === 1 || beat % 4 === 3) addSnare(beat, .105);
  }
  for (let halfBeat = 0; halfBeat < 64; halfBeat += 1) addHat(halfBeat * .5, halfBeat % 2 === 0 ? .027 : .017, halfBeat % 2 ? .38 : -.38);
  score.accentBeats.forEach((beat, index) => {
    addKick(beat, .14);
    addTone({ midi: 74 + (index % 3) * 2, beat, beats: .16, amp: .018, type: "sine", pan: index % 2 ? .55 : -.55, attack: .002, release: .07 });
  });

  let peak = 0;
  for (let i = 0; i < frameCount; i += 1) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
  const master = peak > 0 ? .88 / peak : 1;
  const edgeFrames = Math.round(sampleRate * .025);
  for (let i = 0; i < frameCount; i += 1) {
    const edge = Math.min(1, i / edgeFrames, (frameCount - 1 - i) / edgeFrames);
    left[i] *= master * Math.max(0, edge);
    right[i] *= master * Math.max(0, edge);
  }

  const dataBytes = frameCount * 4;
  const wav = Buffer.alloc(44 + dataBytes);
  wav.write("RIFF", 0); wav.writeUInt32LE(36 + dataBytes, 4); wav.write("WAVE", 8);
  wav.write("fmt ", 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
  wav.writeUInt32LE(sampleRate, 24); wav.writeUInt32LE(sampleRate * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34);
  wav.write("data", 36); wav.writeUInt32LE(dataBytes, 40);
  for (let i = 0; i < frameCount; i += 1) {
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, left[i])) * 32767), 44 + i * 4);
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, right[i])) * 32767), 46 + i * 4);
  }
  wav.durationSeconds = durationSeconds;
  return wav;
}
