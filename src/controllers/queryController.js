import sequelize from '../config/dbConfig.js';
import { textToSql } from '../services/LlmService.js';

export async function executeQuery(req, res) {
  const { query, llm } = req.body;

  try {
    const sql = await textToSql(query, llm);
    const [results] = await sequelize.query(sql);

    res.json({ success: true, sql, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
