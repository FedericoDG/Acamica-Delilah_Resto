// MIDDLEWARE PARA COMPROBAR USER_ID EXISTE EN LA BASE DE DATOS
const { response } = require('express');
const dataBase = require('../database/conection');

const userIdExist = async (req, res = response, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM users WHERE user_id = ?';
      dataBase.query(sqlQuery, [id], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    if (resp.length < 1) {
      return res.status(404).json({
        mensaje: `No existe un usuario con el user_id: ${id}.`
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

module.exports = userIdExist;