import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'buyers_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('log_id')
      table
        .integer('p_id')
        .unsigned()
        .notNullable()
        .references('p_id')
        .inTable('products')
        .onDelete('CASCADE')

      table.string('p_name').notNullable()

      table
        .integer('bought_by')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')

      // table.json('cart')
      table.json('comments').nullable()
      table.integer('user_count').defaultTo(1)

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
