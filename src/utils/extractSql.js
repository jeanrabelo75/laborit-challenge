export function extractSqlFromResponse(responseText) {
  const sqlMatch = responseText.match(/```sql\s*([\s\S]*?)\s*```/);
  return sqlMatch ? sqlMatch[1].trim() : null;
}
