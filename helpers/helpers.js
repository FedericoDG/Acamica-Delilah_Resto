const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorMonitor } = require('stream');
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
    dataBase.query(sqlQuery, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
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
    dataBase.query(sqlQuery, [id], (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

// GUARDAR USUARIO EN LA BASE DE DATOS
const saveUserOnDB = (user) => {
  const sqlQuery = "INSERT INTO users SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [user], (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

// ACTUALIZAR USUARIO EN LA BASE DE DATOS (Solo ADMIN)
const updateUserOnDB = (user, id) => {
  const sqlQuery = "UPDATE users SET password = ?, name = ?, phone= ?, address = ? WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [user.password, user.name, user.phone, user.address, id], (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
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
    dataBase.query(sqlQuery, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
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
    dataBase.query(sqlQuery, [id], (error, data) => {
      if (error) {
        return reject(error);
      }
      if (data.length < 1) {
        return resolve('No existe un producto con ese product_id.');
      }
      return resolve(JSON.parse(JSON.stringify(data[0])));
    });
  });
};

// GUARDAR PRODUCTO EN LA BASE DE DATOS (Solo ADMIN)
const saveProductOnDB = (product) => {
  const sqlQuery = "INSERT INTO products SET ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [product], (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

// ACTUALIZAR UN PRODUCTO EN LA BASE DE DATOS (Solo ADMIN)
const updateProductOnDB = (product, id) => {
  const sqlQuery = "UPDATE products SET name = ?, description = ?, image = ?, price= ? WHERE product_id = ?";
  return new Promise((resolve, reject) => {
    dataBase.query(sqlQuery, [product.name, product.description, product.image, product.price, id], (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};

/*  */
const deleteProductOnDB = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM products WHERE product_id = ?";
    dataBase.query(sqlQuery, [id], (error, product) => {
      if (error) {
        reject(error);
      } else {
        resolve(product);
      }
    });
  });
};

// OBTENER TODAS LAS ORDENES DE UN USUARIO (sólo las id) 
const getAllOrdersByUserId = async (id) => {
  try {
    const arrayOrdersIds = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT order_id FROM orders WHERE user_id = ?";
      dataBase.query(sqlQuery, [id], (error, data) => {
        if (error) {
          reject(error);
        } else {
          const orders = JSON.parse(JSON.stringify(data));
          const arrayOrdersIds = [];
          orders.forEach(order => {
            arrayOrdersIds.push(order.order_id);
          });
          resolve(arrayOrdersIds);
        }
      });
    });
    return arrayOrdersIds;
  } catch (error) {
    throw new Error(error);
  }
};

// OBTENER TODAS LAS ORDENES DE TODOS LOS USUARIOS (sólo las id) 
const getAllOrdersonDB = async () => {
  try {
    const arrayOrdersIds = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT order_id FROM orders";
      dataBase.query(sqlQuery, (error, data) => {
        if (error) {
          reject(error);
        } else {
          const orders = JSON.parse(JSON.stringify(data));
          const arrayOrdersIds = [];
          orders.forEach(order => {
            arrayOrdersIds.push(order.order_id);
          });
          resolve(arrayOrdersIds);
        }
      });
    });
    return arrayOrdersIds;
  } catch (error) {
    throw new Error(error);
  }

};

// OBTENER TODAS LAS ORDENES DETALLADAS DE UN USUARIO 
const getAllOrdesDetails = async (arrayOrders) => {
  try {
    let arrayOrdersDetails = [];
    await Promise.all(arrayOrders.map(async (order) => {
      try {
        let orderDetail = await getOrderDetailByOrderId(order);
        arrayOrdersDetails.push(orderDetail);
      } catch (error) {
        throw new Error(error);
      }
    }));
    return arrayOrdersDetails;
  } catch (error) {
    throw new Error(error);
  }
};

// OBTENER ORDENEN DETALLADA
const getOrderDetailByOrderId = async (orderId) => {
  try {
    const order_id = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT order_id FROM orders WHERE order_id = ?;";
      dataBase.query(sqlQuery, [orderId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
    const user_id = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT user_id FROM orders WHERE order_id = ?;";
      dataBase.query(sqlQuery, [orderId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
    const payment_method = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT payment_method FROM orders WHERE order_id = ?;";
      dataBase.query(sqlQuery, [orderId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
    const status = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT status FROM orders WHERE order_id = ?;";
      dataBase.query(sqlQuery, [orderId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
    const total = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT total FROM orders WHERE order_id = ?;";
      dataBase.query(sqlQuery, [orderId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
    const order = await new Promise((resolve, reject) => {
      const sqlQuery = "SELECT quantity, (SELECT name FROM products WHERE product_id = details.product_id) AS product, (SELECT price FROM products WHERE product_id = details.product_id) AS unitary, (SELECT price FROM products WHERE product_id = details.product_id) * quantity AS Total FROM details WHERE order_id = ?;";
      dataBase.query(sqlQuery, [orderId], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(JSON.stringify(data)));
        }
      });
    });
    return ([{ order_id: order_id[0].order_id, user_id: user_id[0].user_id, payment_method: payment_method[0].payment_method, total: total[0].total, status: status[0].status, datails: order }]);
  } catch (error) {
    throw new Error(error);
  }
};

// GUARDAR UNA ORDEN EN LA BASE DE DATOS
const saveOrderOnDB = async (token, payment_method, arrayOrders) => {
  try {
    user_id = decodeToken(token, process.env.SECRET).user_id;
    const order_id = await new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO orders SET user_id = ?, payment_method = ?";
      dataBase.query(sqlQuery, [user_id, payment_method], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data.insertId);
        }
      });
    });
    let arrayOrdersDetails = [];
    await Promise.all(arrayOrders.map(async (orderDetails) => {
      try {
        let orderDetail = await saveDetailsOnDB(order_id, orderDetails);
        arrayOrdersDetails.push(orderDetail);
      } catch (error) {
        throw new Error(error);
      }
    }));
    return order_id;
  } catch (error) {
    throw new Error(error);
  }
};

// GUARDAR EL DETALLE DE UNA ORDEN EN LA BASE DE DATOS
const saveDetailsOnDB = async (order_id, orderDetails) => {
  try {
    await new Promise((resolve, reject) => {
      const sqlQuery = "INSERT INTO details SET order_id = ?, product_id = ?, quantity = ? ";
      dataBase.query(sqlQuery, [order_id, orderDetails.product_id, orderDetails.quantity], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

// ACTUALIZAR EL PRECIO TOTAL DE UNA ORDEN EN LA BASE DE DATOS
const getPrice = async (order_id, order) => {
  try {

    const productsId = order.map(el => el.product_id);
    const productsQuantity = order.map(el => el.quantity);
    let prices = [];
    await Promise.all(productsId.map(async (id) => {
      try {
        let orderDetail = await price(id);
        prices.push(orderDetail);
      } catch (error) {
        throw new Error(error);
      }
    }));
    prices = JSON.parse(JSON.stringify(prices));
    let resultado = 0;
    for (let index = 0; index < productsQuantity.length; index++) {
      resultado += productsQuantity[index] * prices[index];
    }
    return new Promise((resolve, reject) => {
      dataBase.query("UPDATE orders SET total = ? WHERE order_id = ?", [resultado, order_id], (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

// función auxiliar para obtener el precio de un producto
const price = (id) => {
  return new Promise((resolve, reject) => {
    dataBase.query("SELECT price FROM products WHERE product_id = ?", [id], (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data[0].price);
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
  updateProductOnDB,
  deleteProductOnDB,
  getAllUsers,
  getUserById,
  getAllOrdersByUserId,
  getAllOrdesDetails,
  getOrderDetailByOrderId,
  getAllOrdersonDB,
  saveOrderOnDB,
  getPrice
};