// CONEXIÓN A LA BASE DE DATOS (modificar los datos del archivo .env)
const mysql = require('mysql');

const dataBase = mysql.createConnection({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectTimeout: 20000
});

module.exports = dataBase;
