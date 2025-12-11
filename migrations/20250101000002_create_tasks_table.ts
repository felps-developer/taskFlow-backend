import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', function (table) {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table
      .enum('type', ['landing_page', 'edicao', 'api', 'manutencao', 'urgente'])
      .notNullable();
    table.uuid('responsible_id').notNullable();
    table
      .enum('status', ['pendente', 'fazendo', 'concluido'])
      .notNullable()
      .defaultTo('pendente');
    table.timestamp('deadline').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table
      .foreign('responsible_id')
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}

