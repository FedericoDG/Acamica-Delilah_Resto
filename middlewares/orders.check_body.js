// MIDDLEWARE PARA COMPROBAR EL BODY AL CREAR UNA ORDEN
const { response } = require('express');
const dataBase = require('../database/conection');

const ordersCheckBody = async (req, res = response, next) => {
  let { payment_method } = req.body;
  const { order } = req.body;
  if (!payment_method) {
    return res.status(400).json({
      mensaje: 'El campo payment_method es requerido.'
    });
  }
  payment_method = payment_method.toUpperCase();
  payment_method;
  if (payment_method !== 'CASH' && payment_method !== 'DEBIT' && payment_method !== 'CREDIT') {
    return res.status(400).json({
      mensaje: 'El campo payment_method deber ser: CASH, DEBIT o CREDIT.'
    });
  }
  if (!order) {
    return res.status(400).json({
      mensaje: 'El campo order es requerido.'
    });
  }
  if (!Array.isArray(order)) {
    return res.status(400).json({
      mensaje: 'El campo order debe ser un Array.'
    });
  }
  if (order.length < 1) {
    return res.status(400).json({
      mensaje: 'La orden debe tener algún producto.'
    });
  }
  let flag = '';
  order.forEach(el => {
    if (!el?.quantity || !el?.product_id || isNaN(el?.quantity) || isNaN(el?.product_id)) {
      flag = 'ERROR';
    }
  });
  if (flag === 'ERROR') {
    return res.status(400).json({
      mensaje: 'Error en el formato de order. Por favor revise la documentación.'
    });
  }
  const productsId = order.map(el => el.product_id);

  let flag2 = '';
  await Promise.all(productsId.map(async (product) => {
    try {
      let orderDetail = await checkExistProdcut(product);
      if (orderDetail !== 'OK') {
        flag2 = orderDetail;
      }
    } catch (error) {
      throw new Error(error);
    }
  }));
  if (flag2 !== '') {
    return res.status(400).json({
      mensaje: `No existe el producto con id_product: ${flag2}`
    });
  }
  req.body = { payment_method, order };
  next();
};

const checkExistProdcut = (id) => {
  return new Promise((resolve, reject) => {
    dataBase.query("SELECT product_id FROM products WHERE product_id = ?", [id], (error, data) => {
      if (error) {
        reject(error);
      } else {
        if (data.length == 0) {
          resolve(id);
        }
        resolve('OK');
      }
    });
  });
};

module.exports = ordersCheckBody;