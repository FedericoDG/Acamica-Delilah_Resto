const { response } = require('express');
const jwt = require('jsonwebtoken');
const { saveUserOnDB, hashPassword, createToken, getAllProducts, getProductById, saveProductOnDB } = require('../helpers/helpers');


const register = (req, res = response) => {
  let { username, password, name, email, phone, address } = req.body;
  const hashedPassword = hashPassword(password);
  saveUserOnDB(username, hashedPassword, name, email, phone, address);
  res.json({
    mensaje: 'Usuario agregado a la base de datos.',
    usuario: {username, hashedPassword, name, email, phone, address}
  });
};

const login = (req, res = response) => {
  //const { username } = req.body;
  const token = createToken(req.user);
  res.json({
    token
  });
};

const getProducts = async (req, res) => {
  const products = await getAllProducts();
  res.json({
    products
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  res.json({
    product
  });
};

const createProduct = (req, res) => {
  let { name, description, image, price } = req.body;
  price = Number(price)
  saveProductOnDB(name, description, image, price)
  res.json({
    mensaje: 'Producto agregado a la base de datos.',
    prducto:{name, description, image, price}
  });
};

module.exports = {
  register, login, getProducts, getProduct, createProduct
};