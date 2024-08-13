const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function textToSql(query) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Transforme o seguinte texto em uma consulta SQL válida para o banco de dados Northwind: ${query}`,
    max_tokens: 150,
  });

  return response.data.choices[0].text.trim();
}

module.exports = {
  textToSql,
};
