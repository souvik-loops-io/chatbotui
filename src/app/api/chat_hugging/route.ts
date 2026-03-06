import { HfInference } from "@huggingface/inference";
import { InferenceClient } from '@huggingface/inference';
console.log("Hugging Face API Key:", process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);
const hf = new InferenceClient(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY  || "");

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await hf.textGeneration({
    model: "featherless-ai",
    inputs: prompt,
  });

  return Response.json({
    text: result.generated_text,
  });
}