import { textToSql as openAiTextToSql } from '../services/OpenAiText2SqlService.js';
import { textToSql as groqTextToSql } from '../services/GroqText2SqlService.js';
import sequelize from '../config/db.js';

export async function executeQuery(req, res) {
  const { query, llm } = req.body;

  const llmServices = {
    openai: openAiTextToSql,
    groq: groqTextToSql,
  };

  try {
    const textToSql = llmServices[llm];

    if (!textToSql) {
      return res.status(400).json({ error: "Invalid LLM specified. Use 'openai' or 'groq'." });
    }

    const sql = await textToSql(query);

    const [results] = await sequelize.query(sql);
    res.json({ success: true, sql, results });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

