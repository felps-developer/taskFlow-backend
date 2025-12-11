import 'dotenv/config';
import type { Knex } from 'knex';

const defaultDB =
  'postgresql://postgres:postgres@localhost:5432/taskflow_db';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_URI || defaultDB,
    migrations: {
      tableName: 'migrations',
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_URI || defaultDB,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;

