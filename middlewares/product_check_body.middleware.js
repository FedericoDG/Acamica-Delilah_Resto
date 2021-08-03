const { response } = require('express');

const productBody = (req, res = response, next) => {
  let { name, description, image, price } = req.body;
  if (!name || !description || !image || !price) {
    return res.status(400).json({
      mensaje: 'Todos los campos son requeridos: name, description, image, price.'
    });
  }
  if (isNaN(Number(price))) {
    return res.status(400).json({
      mensaje: 'El campo price debe ser un número'
    });
  }
  next();
};

module.exports = productBody;