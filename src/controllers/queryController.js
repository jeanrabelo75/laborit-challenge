const sequelize = require('../config/db');
const { textToSql } = require('../services/text2sqlService');

async function executeQuery(req, res) {
  const { query } = req.body;

  try {
    const sql = await textToSql(query);
    const [results] = await sequelize.query(sql);

    res.json({
      success: true,
      sql,
      results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  executeQuery,
};
