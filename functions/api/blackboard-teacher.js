export async function onRequestPost(context) {
  const started = Date.now();
  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) return json({ error: "OPENAI_API_KEY is not configured" }, 503);

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const prompt = buildPrompt(body);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "authorization": `Bearer ${apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano",
        input: prompt,
        temperature: 0.45,
        max_output_tokens: 180,
        text: {
          format: {
            type: "json_schema",
            name: "blackboard_teacher_reply",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                teacherText: { type: "string" },
                boardText: { type: "string" },
                checkQuestion: { type: "string" }
              },
              required: ["teacherText", "boardText", "checkQuestion"]
            },
            strict: true
          }
        }
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const detail = await response.text();
      return json({ error: "OpenAI request failed", detail: detail.slice(0, 500) }, 502);
    }

    const result = await response.json();
    const text = result.output_text || result.output?.flatMap((item) => item.content || [])
      .find((item) => item.type === "output_text")?.text || "";
    const parsed = safeJson(text);
    if (!parsed?.teacherText) return json({ error: "OpenAI response was not parseable" }, 502);

    return json({
      ...parsed,
      latencyMs: Date.now() - started
    });
  } catch (error) {
    clearTimeout(timeout);
    return json({ error: error.name === "AbortError" ? "OpenAI timeout" : "OpenAI unavailable" }, 504);
  }
}

function buildPrompt(body) {
  const module = body.module || {};
  const transcript = Array.isArray(body.transcript) ? body.transcript.slice(-8) : [];
  const examples = Array.isArray(module.examples) ? module.examples.slice(0, 3) : [];
  return [
    {
      role: "system",
      content: [
        "You are a warm, lively expert classroom teacher tutoring an 8-year-old.",
        "Respond to the interruption in under 80 spoken words.",
        "Use the actual saved question evidence where helpful.",
        "Do not sound like a chatbot. Do not use jargon. Do not introduce a new topic unless the child asked.",
        "After answering, gently return to the original blackboard lesson.",
        "Return strict JSON only."
      ].join(" ")
    },
    {
      role: "user",
      content: JSON.stringify({
        studentName: body.studentName || "Aarin",
        age: body.age || 8,
        studentQuestion: body.question || "",
        currentLesson: {
          title: module.title || "",
          section: module.section || "",
          objective: module.objective || "",
          narrative: module.narrative || "",
          currentStep: body.currentStep || ""
        },
        savedQuestionExamples: examples.map((item) => ({
          prompt: item.prompt,
          selectedText: item.selectedText,
          correctText: item.correctText,
          secondsSpent: item.secondsSpent,
          correct: item.correct
        })),
        recentTranscript: transcript
      })
    }
  ];
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

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
