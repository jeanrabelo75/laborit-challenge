import { edenAiClient } from "../config/llmConfig.js";
import { generatePrompt } from "./LlmService.js";

export async function generateEdenAiChatCompletion(query, provider) {
  const instruction = await generatePrompt(query);

  const options = {
    method: 'POST',
    url: '/text/code_generation',
    data: {
      response_as_dict: true,
      attributes_as_list: false,
      show_base_64: false,
      show_original_response: false,
      temperature: 0.1,
      max_tokens: 100,
      providers: provider,
      instruction: instruction,
    }
  };

  try {
    const response = await edenAiClient.request(options);
    return response.data[provider]?.generated_text;
  } catch (error) {
    console.error(`Error with EdenAI (${provider}) Completion:`, error);
    throw new Error(`Failed to generate SQL with ${provider}.`);
  }
}
