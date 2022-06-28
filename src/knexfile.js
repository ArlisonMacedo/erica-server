const path = require('path')

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database', 'database.sqlite')
    },
    useNullAsDefault: true,
    migrations: {
        directory: path.join(__dirname, 'database', 'migrations')
    }
}