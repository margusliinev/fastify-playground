import dotenv from 'dotenv';
import type { Knex } from 'knex';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const config: Knex.Config = {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    migrations: {
        tableName: 'knex_migrations',
        directory: resolve(__dirname, './migrations'),
        loadExtensions: ['.ts']
    },
    seeds: {
        directory: resolve(__dirname, './seeds'),
        loadExtensions: ['.ts']
    }
};

export default config;
