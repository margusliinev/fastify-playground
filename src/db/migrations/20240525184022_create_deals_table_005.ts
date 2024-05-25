import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('deals', (table) => {
        table.bigIncrements('id').primary().notNullable();
        table.string('title').notNullable();
        table.enum('status', ['OPEN', 'WON', 'LOST', 'DELETED']).defaultTo('OPEN').notNullable();
        table.bigint('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.bigint('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('deals');
}
