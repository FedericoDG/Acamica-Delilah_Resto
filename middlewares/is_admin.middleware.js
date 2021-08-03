const { response } = require('express');
const jwt = require('jsonwebtoken');

const isAdmin = (req, res = response, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  if (jwt.decode(token, process.env.SECRET).role !== 'ADMIN') {
    return res.status(401).json({
      mensaje: 'No tiene permisos para acceder.'
    });
  }
  next();
};

module.exports = isAdmin;