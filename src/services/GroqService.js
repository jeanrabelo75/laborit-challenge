import { groqClient } from "../config/llmConfig.js";
import { generatePrompt } from "./LlmService.js";

export async function generateGroqChatCompletion(query) {
  const prompt = await generatePrompt(query);

  try {
    const response = await groqClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: "llama3-8b-8192",
    });

    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error with Groq Chat Completion:', error);
    throw new Error('Failed to generate SQL with Groq.');
  }
}
