import Groq from "groq-sdk";
import { extractSqlFromResponse } from '../utils/extractSql.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function textToSql(query) {
  const chatCompletion = await getGroqChatCompletion(query);
  return extractSqlFromResponse(chatCompletion.choices[0]?.message?.content);
}

export async function getGroqChatCompletion(query) {
  let content = `
    Use os nomes exatos das tabelas e colunas do banco de dados Northwind.
    As tabelas são: customers, employees, orders, products, etc.
    Transforme o seguinte texto em uma consulta SQL válida para o banco de dados Northwind: ${query}
  `

  return groq.chat.completions.create({
    messages: [{ role: 'user', content: content }],
    model: "llama3-8b-8192",
  });
}
