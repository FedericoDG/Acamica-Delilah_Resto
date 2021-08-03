const { response } = require('express');
const dataBase = require('../database/conection');
const bcrypt = require('bcrypt');

const verifyBody = (req, res = response, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      mensaje: 'Todos los campos son obligatorios: username, password.'
    });
  }
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
};

module.exports = verifyBody;