const knex = require('knex')

exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id')
        table.text('text').nullable()
        table.text('image').nullable()

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
    })
}

exports.down = function () {
    return knex.schema.dropTable('posts')
}