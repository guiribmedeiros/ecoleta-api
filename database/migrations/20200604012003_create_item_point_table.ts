import Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('item_point', table => {
        table.integer('item_id').notNullable().references('id').inTable('items');
        table.integer('point_id').notNullable().references('id').inTable('points');

        table.primary(['item_id', 'point_id']);
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('item_point');
}
