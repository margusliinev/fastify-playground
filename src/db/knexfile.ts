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
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306')
    },
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
