const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const dataBase = require('../database/conection');

const hashPassword = (password) => {
  return hashedPassword = bcrypt.hashSync(password, 10);
};

const saveUserOnDB = (username, password, name, email, phone, address) => {
  const sqlQuery = 'INSERT INTO users SET ?';
  dataBase.query(sqlQuery, [{ username, password, name, email, phone, address }], (error, response) => {
    if (error) {
      throw new Error(error);
    } else {
      return response;
    }
  });
};

const createToken = (username) => {
  return jwt.sign(username, process.env.SECRET);
};

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    dataBase.query("SELECT * FROM products WHERE active = 'TRUE'", (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    dataBase.query("SELECT * FROM products WHERE product_id = ? AND active= 'TRUE'", [id], (error, response) => {
      if (error) {
        return reject(error);
      }
      if (response.length < 1) {
        return resolve('No existe un producto con ese product_id');
      }
      return resolve(response);
    });
  });
};

const saveProductOnDB = (name, description, image, price) => {
  const sqlQuery = 'INSERT INTO products SET ?';
  dataBase.query(sqlQuery, [{ name, description, image, price }], (error, response) => {
    if (error) {
      throw new Error(error);
    } else {
      return response;
    }
  });
};

module.exports = {
  hashPassword,
  saveUserOnDB,
  createToken,
  getAllProducts,
  getProductById,
  saveProductOnDB
};