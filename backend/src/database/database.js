// require
const {Client} = require('pg')
//require('dotenv').config()

const DB_HOST = "localhost"
const DB_USER = "postgres"
const DB_PORT = 5432
const DB_PASSWORD = "V+sg(<CCM&J::7t"
const DB_NAME = "BAPI"

// function
const connexion = new Client({
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME
})

connexion.connect().then(() => console.log("connected"))

// export
module.exports = {connexion}