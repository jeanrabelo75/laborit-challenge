import { expect } from 'chai';
import { extractSqlFromResponse } from '../../src/utils/sqlExtractorUtils.js';

describe('extractSqlFromResponse', () => {
  it('should extract SQL from the response text', () => {
    const responseText = `
      Here is your SQL query:
      \`\`\`sql
      SELECT * FROM Customers WHERE Country = 'Brazil';
      \`\`\`
    `;
    const sql = extractSqlFromResponse(responseText);
    expect(sql).to.equal("SELECT * FROM Customers WHERE Country = 'Brazil';");
  });

  it('should return null if no SQL found', () => {
    const responseText = "There is no SQL query here.";
    const sql = extractSqlFromResponse(responseText);
    expect(sql).to.be.null;
  });
});
