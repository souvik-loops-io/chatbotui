// import { convertToModelMessages, streamText, UIMessage } from 'ai';
// import { anthropic } from "@ai-sdk/anthropic";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: anthropic("claude-sonnet-4-5",  { apiKey: process.env.AI_KEY }),
//     system: 'You are a helpful assistant.',
//     messages: await convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();

// }


import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai'
// export async function POST(req: Request) {
//     try {
//         // const text  = generateText({
//         //     model: 'openai/gpt-4.1-nano',
//         //     prompt: 'Write a short poem about the sea.',
//         // });
//         // console.log(text);
//         // return Response.json({ text });
//         const text  = generateText({
//             model: 'openai/gpt-5.2',
//             prompt: 'What is color of sea?',
//         });

//         return Response.json({ text });

//     } catch (error) {
//         console.error('Error generating text:', error);
//     }
// }

export async function GET() {
  const result = generateText({
    model: 'openai/gpt-4.1-nano',
    prompt: 'Why is the sky blue?',
  });
  return Response.json(result);
}


