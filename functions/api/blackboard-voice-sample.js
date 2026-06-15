export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const input = cleanInput(body.text || defaultSampleText());
  const style = cleanStyle(body.style || "spark");
  const instructions = sampleInstructions(style);
  const cacheRequest = await makeVoiceCacheRequest(context.request, input, instructions, style);
  const cached = await readVoiceCache(cacheRequest);
  if (cached) {
    const headers = new Headers(cached.headers);
    headers.set("x-bq-voice-cache", "HIT");
    return new Response(cached.body, { status: cached.status, headers });
  }

  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) return json({ error: "OPENAI_API_KEY is not configured" }, 503);

  const voices = style === "spark"
    ? ["verse", "ash", "onyx"]
    : ["ash", "verse", "onyx"];
  const attempts = voices.flatMap((voice) => ([
    {
      model: "gpt-4o-mini-tts",
      voice,
      input,
      instructions,
      response_format: "mp3"
    }
  ])).concat({
    model: "tts-1",
    voice: "onyx",
    input,
    response_format: "mp3"
  });

  let lastError = "";
  for (const payload of attempts) {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "authorization": `Bearer ${apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const audio = await response.arrayBuffer();
      const audioResponse = new Response(audio, {
        headers: {
          "content-type": "audio/mpeg",
          "cache-control": "public, max-age=604800, immutable",
          "x-bq-voice-cache": "MISS",
          "x-bq-voice-model": payload.model,
          "x-bq-voice-name": payload.voice
        }
      });
      writeVoiceCache(cacheRequest, audioResponse.clone(), context);
      return audioResponse;
    }
    lastError = await response.text();
  }

  return json({ error: "OpenAI voice sample failed", detail: lastError.slice(0, 500) }, 502);
}

function defaultSampleText() {
  return [
    "Alright Aarin, watch this.",
    "The snack costs one dollar forty five, and we are buying three of them.",
    "So I am going to stack the prices like three little snack boxes.",
    "One forty five, plus one forty five, plus one forty five.",
    "Now here comes the neat bit: that makes four dollars thirty five.",
    "If we paid with ten dollars, the change is what is left after the shopkeeper takes four dollars thirty five.",
    "Ready? Ten dollars minus four thirty five gives five dollars sixty five.",
    "That is the move."
  ].join(" ");
}

function sampleInstructions(style) {
  const shared = [
    "You are recording a short premium narration sample for an 8-year-old's chalkboard tutoring app.",
    "Sound like a real private tutor who enjoys the reveal: warm, bright, confident, and alive.",
    "Keep the wording crystal clear. Do not rush the numbers.",
    "Use expressive rhythm: lift on 'watch this', 'neat bit', 'ready', and the final answer.",
    "Smile in the voice. Make it feel like the child is beside you and you are discovering the answer together.",
    "Avoid drone, monotone, robot voice, bedtime-story slowness, sports-announcer hype, or fake cartoon excitement."
  ];

  if (style === "spark") {
    return shared.concat([
      "Energy level: 8 out of 10, but still teacher-like.",
      "Use short natural pauses before important reveals.",
      "Make the final line feel satisfying and encouraging."
    ]).join(" ");
  }

  return shared.concat([
    "Energy level: 6.5 out of 10, polished and calm but not flat.",
    "Keep a premium educational-video feel."
  ]).join(" ");
}

function cleanInput(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);
}

function cleanStyle(value) {
  return String(value || "").toLowerCase().includes("calm") ? "calm" : "spark";
}

async function makeVoiceCacheRequest(originalRequest, input, instructions, style) {
  const url = new URL(originalRequest.url);
  const hash = await sha256(JSON.stringify({
    version: "blackboard-voice-audition-001",
    model: "gpt-4o-mini-tts",
    style,
    instructions,
    input
  }));
  return new Request(`${url.origin}/__blackboard_voice_sample_cache/${hash}.mp3`, { method: "GET" });
}

async function readVoiceCache(request) {
  try {
    if (!globalThis.caches?.default) return null;
    return await caches.default.match(request);
  } catch {
    return null;
  }
}

function writeVoiceCache(request, response, context) {
  try {
    if (!globalThis.caches?.default) return;
    const task = caches.default.put(request, response).catch(() => {});
    if (context.waitUntil) context.waitUntil(task);
  } catch {
    // The sample still works; cache storage is only to avoid repeated TTS spend.
  }
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
