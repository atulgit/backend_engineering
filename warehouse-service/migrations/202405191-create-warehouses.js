export async function up(knex) {
    await knex.schema.createTable('warehouses', (table) => {
      table.uuid('warehouse_id').primary();
      table.string('name').notNullable();
      table.string('location').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTable('warehouses');
  }
  