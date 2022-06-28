const knex = require('knex')
const path = require('path')

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: 'src/database/database.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
        directory: path.join(__dirname, 'database', 'migrations')
    }
})

module.exports = connection