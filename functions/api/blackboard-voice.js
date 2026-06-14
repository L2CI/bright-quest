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
        "Speak like an enthusiastic one-on-one maths explainer for an 8-year-old: bright, curious, and genuinely excited by the reveal.",
        "Use a friendly adult male tutor tone with more forward motion than a normal classroom read-aloud.",
        "Give phrases like 'ready?', 'watch this', 'sneaky bit', and 'now the interesting part' a small lift, as if inviting the student into a discovery.",
        "Keep the pace brisk but clear. Use tiny pauses only before reveals, answers, or a question the child should think about.",
        "Sound natural and animated, not robotic, not theatrical, and not like a sports announcer."
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
