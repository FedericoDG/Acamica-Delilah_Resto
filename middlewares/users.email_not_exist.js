// MIDDLEWARE PARA COMPROBAR QUE EMAIL NO EXISTE EN LA BASE DE DATOS (necesario para registrar nuevos usuarios)
const { response } = require('express');
const dataBase = require('../database/conection');

const emailNotExist = async (req, res = response, next) => {
  const { email } = req.body;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM users WHERE email = ?';
      dataBase.query(sqlQuery, [email.toLowerCase()], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    if (resp.length > 0) {
      return res.status(400).json({
        mensaje: 'Ya existe un usuario con ese email.'
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = emailNotExist;