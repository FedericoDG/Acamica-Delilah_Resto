// MIDDLEWARE PARA COMPROBAR QUE EXISTE EL PRODUCT_ID PASADO POR PARAMETRO
const { response } = require('express');
const dataBase = require('../database/conection');

const idExist = async (req, res = response, next) => {
  const { id } = req.params;
  const product = await check(id);
  if (product !== 'OK') {
    return res.status(404).json({
      mensaje: `No existe un producto con el product_id: ${product}.`
    });
  }
  next();
};

const check = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT product_id FROM products WHERE product_id = ?";
    dataBase.query(sqlQuery, [id], (error, data) => {
      if (error) {
        reject(error);
      } else {
        if (data.length < 1) {
          resolve(id);
        }
        resolve('OK');
      }
    });
  });
};

module.exports = idExist;