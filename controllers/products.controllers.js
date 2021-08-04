const { response } = require('express');
const { getAllProducts, getProductById, saveProductOnDB } = require('../helpers/helpers');

const getProducts = async (req, res = response) => {
  try {
    const products = await getAllProducts();
    res.json({
      products
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json({
      product
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

const createProduct = async(req, res) => {
  try {
    await saveProductOnDB(req.product);
    res.json({
      mensaje: 'Producto agregado a la base de datos.',
      prducto: req.product
    });  
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

module.exports = {
  getProducts, getProduct, createProduct
};