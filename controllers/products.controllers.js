const { response } = require('express');
const { getAllProducts, getProductById, saveProductOnDB, updateProductOnDB, deleteProductOnDB } = require('../helpers/helpers');

// OBTENER TODOS LOS PRODUCTOS
const getProducts = async (req, res = response) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const products = await getAllProducts(token);
    res.json({
      mensaje: 'Lista de productos.',
      products
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// OBTENER UN PRODUCTO POR PRODUCT_ID
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const product = await getProductById(token, id);
    res.json({
      mensaje: 'Producto encontrado.',
      producto: product
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// CREAR UN PRODUCTO
const createProduct = async (req, res) => {
  try {
    const product = await saveProductOnDB(req.product);
    res.json({
      mensaje: 'Producto agregado.',
      producto: { product_id: product.insertId, ...req.product }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// ACTUALIZAR UN PRODUCTO
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await updateProductOnDB(req.product, id);
    res.json({
      mensaje: 'Producto actualizado.',
      producto: { product_id: id, ...req.product }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  console.log('vamos bien');
  const producto = await getProductById(token, id);
  await deleteProductOnDB(id);
  console.log();
  res.json({
    mensaje: 'Producto eliminado.',
    producto
  });
};

module.exports = {
  getProducts, getProduct, createProduct, updateProduct, deleteProduct
};