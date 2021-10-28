import knex, { Knex } from 'knex';

const config = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'miusuarionuevo',
    password: '12345678',
    database: 'sot',
  },
  pool: { min: 0, max: 7 },
};

class DB {
  private connection: Knex;

  constructor() {
    this.connection = knex(config);
  }

  async initDb() {
    const exists = await this.connection.schema.hasTable('libros');

    if (!exists) {
      console.log('Vamos a crear tabla libros');
      return this.connection.schema.createTable('libros', (table) => {
        table.uuid('_id').primary();
        table.string('nombre');
        table.integer('precio');
      });
    }
  }

  async get(tableName: string, id: string | undefined = undefined) {
    if (id) return this.connection(tableName).where({ _id: id });

    return this.connection(tableName);
  }
}

export const DbService = new DB();
