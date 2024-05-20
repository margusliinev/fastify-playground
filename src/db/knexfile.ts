import type { Knex } from 'knex';
import { env } from 'node:process';

const config: Knex.Config = {
    client: 'mysql2',
    connection: env.DATABASE_URL,
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
        loadExtensions: ['.ts']
    },
    seeds: {
        directory: './seeds',
        loadExtensions: ['.ts']
    }
};

export default config;
