const { response } = require('express');
const jwt = require('jsonwebtoken');

const checkToken = (req, res = response, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      mensaje: 'Necesitas enviar un token.'
    });
  }
  if (!authorization.split(' ')[1]) {
    return res.status(401).json({
      mensaje: 'Necesitas enviar un token.'
    });
  }
  jwt.verify(authorization.split(' ')[1], process.env.SECRET, (error) => {
    if (error) {
      return res.status(401).json({
        mensaje: 'Token inválido.'
      });
    } else {
      next();
    }
  });
};

module.exports = checkToken;