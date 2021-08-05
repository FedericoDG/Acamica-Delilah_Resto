// MIDDLEWARE PARA COMPROBAR QUE USERNAME NO EXISTE EN LA BASE DE DATOS (necesario para registrar nuevos usuarios)
const { response } = require('express');
const dataBase = require('../database/conection');

const userNotExist = async (req, res = response, next) => {
  const { username, password, name, email, phone, address } = req.body;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM users WHERE username = ?';
      dataBase.query(sqlQuery, [username], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    if (resp.length > 0) {
      return res.status(400).json({
        mensaje: 'Ya existe un usuario con ese username.'
      });
    }
    req.user = { username, password, name, email: email.toLowerCase(), phone, address };
    next();
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = userNotExist;