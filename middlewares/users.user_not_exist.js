// MIDDLEWARE PARA COMPROBAR USUARIO NO EXITE EN LA BASE DE DATOS (necesario para registrar nuevos usuarios)
const { response } = require('express');
const dataBase = require('../database/conection');

const userNotExist = (req, res = response, next) => {
  const { username, password, name, email, phone, address } = req.body;
  const sqlQuery = 'SELECT * FROM users WHERE username = ?';
  dataBase.query(sqlQuery, [username], (error, response) => {
    if (error) {
      throw new Error(error);
    } else {
      if (response.length > 0) {
        return res.status(400).json({
          mensaje: 'Ya existe un usuario con ese username.'
        });
      }
      req.user = { username, password, name, email, phone, address };
      next();
    }
  });
};

module.exports = userNotExist;