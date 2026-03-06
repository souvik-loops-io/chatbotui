import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await client.responses.create({
      model: "grok-4-1-fast-reasoning",
      input: [
        { role: "system", content: "You are Grok." },
        { role: "user", content: prompt }
      ],
    });

    console.log("API Response:", response);

    return Response.json(response);
  } catch (err) {
    console.error("Chat API error:", err);
    // Always return valid JSON with error details
    return Response.json({ error: "Failed to fetch response", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}



