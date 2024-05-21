import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sessions', (table) => {
        table.bigIncrements('id').primary().notNullable();
        table.timestamp('expires_at').notNullable();
        table.timestamps(true, true);
        table.bigint('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE').index('user_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('sessions');
}
