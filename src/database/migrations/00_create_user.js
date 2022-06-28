const knex = require('knex')

exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('username').notNullable().unique()
        table.string('password').notNullable()
        table.string('functionBand').nullable()
        table.text('bio').nullable()
        table.text('image').nullable()
    })
}

exports.down = function () {
    return knex.schema.dropTable('users')
}