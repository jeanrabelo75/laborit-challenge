import sequelize from '../config/dbConfig.js';

let cachedSchema = null;

export async function getDatabaseSchema() {
  if (cachedSchema) {
    return cachedSchema;
  }

  const tables = await sequelize.getQueryInterface().showAllTables();
  const schema = {};

  for (const table of tables) {
    const columns = await sequelize.getQueryInterface().describeTable(table);
    schema[table] = Object.keys(columns);
  }

  cachedSchema = schema;
  return schema;
}

export function generateSchemaDescription(schema) {
  let description = '';

  for (const [table, columns] of Object.entries(schema)) {
    description += `Tabela ${table}: ${columns.join(', ')}\n`;
  }

  return description;
}
