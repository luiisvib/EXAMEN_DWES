const mysql = require("mysql2/promise")

const pool_clevercloud = mysql.createPool({
    host: process.env.HOST_CLEVERCLOUD,
    user: process.env.USUARIO_CLEVERCLOUD,
    password: process.env.PASSWORD_CLEVERCLOUD,
    database: process.env.DATABASE_CLEVERCLOUD,
    port: process.env.PORT_CLEVERCLOUD
})
module.exports = pool_clevercloud


