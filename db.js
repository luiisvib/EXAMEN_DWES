const pool_localhost = require("./db_localhost")

if (process.env.NODE_ENV == "produccion"){ //Si es producción se envia la base de datos local
    const pool = pool_localhost
    module.exports = pool
}

if (process.env.NODE_ENV == "despliegue"){ //Si es desplieque se envia la base de datos de CleverCloud
    const pool = pool_localhost
    module.exports = pool
}
