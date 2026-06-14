export async function onRequestPost(context) {
  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) return json({ error: "OPENAI_API_KEY is not configured" }, 503);

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const input = cleanInput(body.text);
  if (!input) return json({ error: "Missing text" }, 400);

  const attempts = [
    {
      model: "gpt-4o-mini-tts",
      voice: "onyx",
      input,
      instructions: [
        "Speak like a warm, patient classroom teacher for an 8-year-old.",
        "Use clear pacing, natural emphasis, and a steady friendly male voice.",
        "Do not sound robotic, theatrical, or like an announcement."
      ].join(" "),
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
      return new Response(await response.arrayBuffer(), {
        headers: {
          "content-type": "audio/mpeg",
          "cache-control": "private, max-age=86400"
        }
      });
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

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
