import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('projects', (table) => {
        table.bigIncrements('id').primary().notNullable();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.enum('status', ['PLANNING', 'DEVELOPMENT', 'ON_HOLD', 'MAINTENANCE', 'COMPLETED']).defaultTo('PLANNING').notNullable();
        table.boolean('is_archived').defaultTo(false).notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('projects');
}
