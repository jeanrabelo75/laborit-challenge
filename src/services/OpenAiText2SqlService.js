import OpenAI from "openai";
import dotenv from "dotenv";
import { extractSqlFromResponse } from "../utils/extractSql.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function textToSql(query) {
  const response = await getOpenAICompletion(query);
  return extractSqlFromResponse(response.choices[0]?.text.trim());
}

export async function getOpenAICompletion(query) {
  return openai.completions.create({
    model: "gpt-3.5-turbo",
    prompt: `Transforme o seguinte texto em uma consulta SQL válida para o banco de dados Northwind: ${query}`,
    max_tokens: 150,
  });
}
