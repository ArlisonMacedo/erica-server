const knex = require('knex')

exports.up = function (knex) {
    return knex.schema.createTable('posts_reaction', table => {
        table.increments('id')     
        table.integer('match').nullable()
        table.integer('like').nullable()
        table.text('comment').nullable()

        table.integer('post_id')
            .notNullable()
            .references('id')
            .inTable('posts')
        
        table.integer('user_id')
            .notNullable()
            .references()
            .inTable('users')
    })
}

exports.down = function () {
    return knex.schema.dropTable('posts')
}