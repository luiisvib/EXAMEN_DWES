const mysql = require("mysql2/promise")

const pool_localhost = mysql.createPool({
    host: process.env.HOST_LOCALHOST,
    user: process.env.USUARIO_LOCALHOST,
    password: process.env.PASSWORD_LOCALHOST,
    database: process.env.DATABASE_LOCALHOST,
    port: process.env.PORT_LOCALHOST
})
module.exports = pool_localhost
