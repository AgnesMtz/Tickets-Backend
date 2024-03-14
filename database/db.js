import mysql from "promise-mysql";
import credentialsDB from "../config/credentialsDB.js";

const connection = mysql.createConnection({
    host: credentialsDB.host,
    database: credentialsDB.database,
    user: credentialsDB.user,
    password: credentialsDB.password
})

const conectarDB = () => {
    return connection;
}

export {
    conectarDB
}