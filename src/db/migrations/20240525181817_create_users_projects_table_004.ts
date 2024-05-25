import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_projects', (table) => {
        table.bigInteger('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.bigInteger('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamps(true, true);

        table.primary(['user_id', 'project_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users_projects');
}
