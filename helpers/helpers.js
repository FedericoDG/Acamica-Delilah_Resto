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

// OBTENER TODOS LOS USUARIOS (Para AADMIN: muestra todos los usuarios. Para USER: muestra los datos propios)
const getAllUsers = (token) => {
  let sqlQuery = "";
  const role = decodeToken(token, process.env.SECRET).role;
  if (role === 'ADMIN') {
    sqlQuery = "SELECT * FROM users";
  } else {
    const user_id = decodeToken(token, process.env.SECRET).user_id;
    sqlQuery = `SELECT user_id, name, name, email, phone, address FROM users WHERE user_id = ${user_id}`;
  }
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

// OBTENER DATOS DE UN USUARIO EN PARTICULAR (Para ADMIN: Muestra los datos un un usuario. Para USER: Muestra los datos Propios)
const getUserById = (token, id) => {
  let sqlQuery = 'SELECT user_id, name, name, email, phone, address FROM users WHERE user_id = ?';
  if (decodeToken(token, process.env.SECRET).role === 'ADMIN') {
    sqlQuery = "SELECT * FROM users WHERE user_id = ?";
  }
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

// GUARDAR USUARIO EN LA BASE DE DATOS
const saveUserOnDB = (user) => {
  const sqlQuery = "INSERT INTO users SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [user], (error, response) => {
      if (error) {
        return reject(error);
      } else {
        //////////console.log(response.insertId); //////////
        return resolve(response);
      }
    });
  });
};

// ACTUALIZAR USUARIO EN LA BASE DE DATOS (Solo ADMIN)
const updateUserOnDB = (object, id) => {
  const sqlQuery = "UPDATE users SET password = ?, name = ?, phone= ?, address = ? WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [object.password, object.name, object.phone, object.address, id], (error, response) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(response);
      }
    });
  });
};

// ELIMINAR USUARIO DE LA BASE DE DATOS (Solo ADMIN)
const deleteUserOnDB = (id) => {
  const sqlQuery = "DELETE FROM users WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [id], (error, data) => {
      if (error) {
        reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

// OBTENER TODOS LOS PRODUCTOS DE LA BASE DE DATOS (sólo si el campo active es TRUE, salvo para ADMIN que muestra todos)
const getAllProducts = (token) => {
  let sqlQuery = "SELECT product_id, name, description, image, price FROM products WHERE active = 'TRUE'";
  if (decodeToken(token, process.env.SECRET).role === 'ADMIN') {
    sqlQuery = "SELECT * FROM products";
  }
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

// OBTENER UN PRODUCTO (por product_id y sólo si el campo active es TRUE, salvo para ADMIN que muestra todos) 
const getProductById = (token, id) => {
  let sqlQuery = "SELECT product_id, name, description, image, price FROM products WHERE product_id = ? AND active= 'TRUE'";
  if (decodeToken(token, process.env.SECRET).role === 'ADMIN') {
    sqlQuery = "SELECT * FROM products WHERE product_id = ?";
  }
  return new Promise((resolve, reject) => {
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
  const sqlQuery = "INSERT INTO products SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [product], (error, response) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(response);
      }
    });
  });
};

module.exports = {
  hashPassword,
  createToken,
  decodeToken,
  saveUserOnDB,
  updateUserOnDB,
  deleteUserOnDB,
  getAllProducts,
  getProductById,
  saveProductOnDB,
  getAllUsers,
  getUserById
};