// MIDDLEWARE PARA COMPROBAR LOS CAMPOS DEL BODY AL HACER LOGIN PARA OBTENER UN TOKEN
const { response } = require('express');
const dataBase = require('../database/conection');
const bcrypt = require('bcrypt');

const verifyBodyLogin = (req, res = response, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      mensaje: 'Todos los campos son obligatorios: username, password.'
    });
  }
  try {
    const sqlQuery = 'SELECT * FROM users WHERE username = ?';
    dataBase.query(sqlQuery, [username], (error, response) => {
      if (error) {
        throw new Error(error);
      } else {
        if (response.length < 1) {
          return res.status(404).json({
            mensaje: 'Usuario inexistente.'
          });
        }
        if (!bcrypt.compareSync(password, response[0].password)) {
          return res.status(401).json({
            mensaje: 'Contraseña inválida.'
          });
        }
        if (response[0].active !== 'TRUE') {
          return res.status(401).json({
            mensaje: 'Su cuenta se encuentra suspendida.'
          });
        }
        req.user = {
          user_id: response[0].user_id,
          username: response[0].username,
          role: response[0].role
        };
        next();
      }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = verifyBodyLogin;