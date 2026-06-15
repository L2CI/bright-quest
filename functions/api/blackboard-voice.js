export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const input = cleanInput(body.text);
  if (!input) return json({ error: "Missing text" }, 400);

  const primaryInstructions = [
    "You are recording premium narration for an 8-year-old's chalkboard tutoring app.",
    "Sound like a real private teacher: warm, bright, confident, and alive.",
    "Use a slightly deeper baritone adult male tone, with calm authority and clear diction.",
    "Keep the energy at 7.5 out of 10: enthusiastic and teacher-like, never cartoonish.",
    "Smile in the voice. Lift discovery words like 'watch this', 'here comes the neat bit', 'ready', and the final answer.",
    "Use expressive rhythm and short natural pauses before important reveals.",
    "Do not drone, mumble, sound sleepy, sound robotic, or read like an audiobook.",
    "Treat every sentence as if it is being spoken while chalk is being drawn on a board."
  ].join(" ");

  const cacheRequest = await makeVoiceCacheRequest(context.request, input, primaryInstructions);
  const cached = await readVoiceCache(cacheRequest);
  if (cached) {
    const headers = new Headers(cached.headers);
    headers.set("x-bq-voice-cache", "HIT");
    return new Response(cached.body, { status: cached.status, headers });
  }

  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) return json({ error: "OPENAI_API_KEY is not configured" }, 503);

  const attempts = [
    {
      model: "gpt-4o-mini-tts",
      voice: "onyx",
      input,
      instructions: primaryInstructions,
      response_format: "mp3"
    },
    {
      model: "tts-1",
      voice: "onyx",
      input,
      response_format: "mp3"
    }
  ];

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
          "cache-control": "public, max-age=2592000, immutable",
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

  return json({ error: "OpenAI voice request failed", detail: lastError.slice(0, 500) }, 502);
}

function cleanInput(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);
}

async function makeVoiceCacheRequest(originalRequest, input, instructions) {
  const url = new URL(originalRequest.url);
  const hash = await sha256(JSON.stringify({
    version: "blackboard-teacher-openai-voice-003",
    model: "gpt-4o-mini-tts",
    fallback: "tts-1",
    voice: "onyx",
    instructions,
    input
  }));
  return new Request(`${url.origin}/__blackboard_voice_cache/${hash}.mp3`, { method: "GET" });
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
    // Voice generation still succeeded; cache storage is an optimisation.
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
