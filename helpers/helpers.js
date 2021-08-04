const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataBase = require('../database/conection');

// ENCRIPTAR PASSWORD
const hashPassword = (password) => {
  return hashedPassword = bcrypt.hashSync(password, 10);
};

// CREAR TOKEN
const createToken = (object) => {
  return jwt.sign(object, process.env.SECRET);
};

// LEER DATOS DEL TOKEN
const decodeToken = (token) => {
  return jwt.decode(token, process.env.SECRET);
};

// GUARDAR USUARIO EN LA BASE DE DATOS
const saveUserOnDB = (user) => {
  return new Promise((resolve, reject)=>{
    const sqlQuery = "INSERT INTO users SET ?";
    dataBase.query(sqlQuery, [user], (error, response) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(response);
      }
    });
  })
};

// OBTENER TODOS LOS PRODUCTOS DE LA BASE DE DATOS (sólo si el campo active es TRUE)
const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM products WHERE active = 'TRUE'"
    dataBase.query(sqlQuery, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

// OBTENER UN PRODUCTO (por product_id y sólo si el campo active es TRUE) 
const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM products WHERE product_id = ? AND active= 'TRUE'"
    dataBase.query(sqlQuery, [id], (error, response) => {
      if (error) {
        return reject(error);
      }
      if (response.length < 1) {
        return resolve('No existe un producto con ese product_id.');
      }
      return resolve(response);
    });
  });
};

// GUARDAR PRODUCTO EN LA BASE DE DATOS
const saveProductOnDB = (product) => {
  return new Promise((resolve, reject)=>{
    const sqlQuery = "INSERT INTO products SET ?";
    dataBase.query(sqlQuery, [product], (error, response) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(response);
      }
    });
  })
};

module.exports = {
  hashPassword,
  createToken,
  decodeToken,
  saveUserOnDB,
  getAllProducts,
  getProductById,
  saveProductOnDB
};