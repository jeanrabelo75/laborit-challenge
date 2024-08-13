import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function textToSql(query) {
  const chatCompletion = await getGroqChatCompletion(query);
  return chatCompletion.choices[0]?.message?.content.trim();
}

export async function getGroqChatCompletion(query) {
  return groq.chat.completions.create({
    messages: [{ role: 'user', content: `Transforme o seguinte texto em uma consulta SQL válida para o banco de dados Northwind: ${query}` }],
    model: "llama3-8b-8192",
  });
}
