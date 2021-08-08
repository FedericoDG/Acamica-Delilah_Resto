// MIDDLEWARE PARA COMPROBAR SI EXISTE UNA ORDEN PARA UN ORDER_ID REQUERIDO
const { response } = require('express');
const dataBase = require('../database/conection');

const orderExist = async (req, res = response, next) => {
  const { id } = req.params;
  try {
    const resp = await new Promise((resolve, reject) => {
      const sqlQuery = 'SELECT * FROM orders WHERE order_id = ?';
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
        mensaje: 'No existe una order con ese order_id'
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

module.exports = orderExist;