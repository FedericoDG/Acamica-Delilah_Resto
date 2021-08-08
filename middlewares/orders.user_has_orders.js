// MIDDLEWARE PARA COMPROBAR QUE UN USUARIO TIENE ORDENES
const { response } = require('express');
const dataBase = require('../database/conection');

const userHasOrder = async (req, res = response, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT order_id FROM orders WHERE user_id = ?";
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
        mensaje: 'No existen órdenes para ese user_id'
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

module.exports = userHasOrder;