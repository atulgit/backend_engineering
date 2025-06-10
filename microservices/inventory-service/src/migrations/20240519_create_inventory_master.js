export async function up(knex) {
    await knex.schema.createTable('inventory_master', (table) => {
      table.string('sku').notNullable();
      table.uuid('warehouse_id').notNullable();
      table.integer('quantity').notNullable().defaultTo(0);
      table.timestamp('last_updated').defaultTo(knex.fn.now());
  
      table.primary(['sku', 'warehouse_id']);
    });
  }
  
  export async function down(knex) {
    await knex.schema.dropTable('inventory_master');
  }
  