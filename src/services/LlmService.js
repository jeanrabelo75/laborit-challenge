import { generateGroqChatCompletion } from "./GroqService.js";
import { extractSqlFromResponse } from "../utils/sqlExtractorUtils.js"
import { generateEdenAiChatCompletion } from "./EdenAiService.js";
import { getDatabaseSchema, generateSchemaDescription } from "../utils/databaseSchemaUtils.js";

export async function generatePrompt(query) {
  const schema = await getDatabaseSchema();
  const schemaDescription = generateSchemaDescription(schema);

  return `
    Você é um assistente que transforma texto em consultas SQL. O banco de dados tem a seguinte estrutura:
    ${schemaDescription}
    Use esses nomes exatos para transformar o seguinte texto em uma consulta SQL válida:
    "${query}"
  `;
}

export async function textToSql(query, llm) {
  const llmServices = {
    groq: generateGroqChatCompletion,
    openai: (query) => generateEdenAiChatCompletion(query, 'openai'),
    google: (query) => generateEdenAiChatCompletion(query, 'google'),
  };

  const getCompletion = llmServices[llm];
  if (!getCompletion) {
    throw new Error("Invalid LLM specified. Use 'groq', 'openai' or 'google'.");
  }

  const response = await getCompletion(query);
  return extractSqlFromResponse(response);
}
