import 'dotenv/config';
import knex, { Knex } from 'knex';
import knexConfig from '../../../knexfile';

const environment = process.env.NODE_ENV || 'development';

export const db: Knex = knex(knexConfig[environment]);

export default db;

