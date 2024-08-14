import { expect } from 'chai';
import sinon from 'sinon';
import { getDatabaseSchema, generateSchemaDescription } from '../../src/utils/databaseSchemaUtils.js';
import sequelize from '../../src/config/dbConfig.js';

describe('databaseSchemaUtils', () => {
  describe('getDatabaseSchema', () => {
    let showAllTablesStub, describeTableStub;

    beforeEach(() => {
      showAllTablesStub = sinon.stub(sequelize.getQueryInterface(), 'showAllTables').resolves(['customers', 'orders']);
      describeTableStub = sinon.stub(sequelize.getQueryInterface(), 'describeTable')
        .callsFake((tableName) => {
          if (tableName === 'customers') {
            return Promise.resolve({ id: {}, first_name: {} });
          }
          if (tableName === 'orders') {
            return Promise.resolve({ id: {}, customer_id: {} });
          }
          return Promise.resolve({});
        });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should retrieve the database schema correctly', async () => {
      const schema = await getDatabaseSchema();

      expect(schema).to.have.property('customers');
      expect(schema.customers).to.include('id');
      expect(schema.customers).to.include('first_name');

      expect(schema).to.have.property('orders');
      expect(schema.orders).to.include('id');
      expect(schema.orders).to.include('customer_id');
    });

    it('should cache the schema after the first call', async () => {
      const schema1 = await getDatabaseSchema();
      sinon.restore();
      const schema2 = await getDatabaseSchema();

      expect(schema2).to.deep.equal(schema1);
    });
  });

  describe('generateSchemaDescription', () => {
    it('should generate schema description correctly', () => {
      const schema = {
        customers: ['id', 'first_name'],
        orders: ['id', 'customer_id']
      };
      const schemaDescription = generateSchemaDescription(schema);

      expect(schemaDescription).to.contain('Tabela customers: id, first_name');
      expect(schemaDescription).to.contain('Tabela orders: id, customer_id');
    });
  });
});
