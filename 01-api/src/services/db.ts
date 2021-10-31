import Config from '../config';
import knex, { Knex } from 'knex';
import { LibroI, newLibroI } from '../models/libros/libros.interfaces';

const config = {
  dev: {
    client: 'sqlite3',
    connection: { filename: './mydbsqlite3' },
    useNullAsDefault: true,
  },
  stg: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: Config.MYSQL_USERNAME,
      password: Config.MYSQL_PASSWORD,
      database: 'sot',
    },
    pool: { min: 0, max: 7 },
  },
};

type ambiente = 'dev' | 'stg';
class DB {
  private connection: Knex;
  private environment: ambiente;

  constructor() {
    this.environment = Config.MYSQL_ENV as ambiente;
    this.connection = knex(config[this.environment]);
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

  async create(tableName: string, data: LibroI): Promise<LibroI> {
    await this.connection(tableName).insert(data);

    const register = await this.connection(tableName).where({ _id: data._id });

    return register[0];
  }

  async update(
    tableName: string,
    id: string,
    data: newLibroI
  ): Promise<LibroI> {
    await this.connection(tableName).where({ _id: id }).update(data);
    const register = await this.connection(tableName).where({ _id: id });

    return register[0];
  }

  async delete(tableName: string, id: string): Promise<void> {
    await this.connection(tableName).where({ _id: id }).del();
  }
}

export const DbService = new DB();
