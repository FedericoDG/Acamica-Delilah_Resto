const { response } = require('express');
const { getAllOrdersByUserId, getAllOrdesDetails, getOrderDetailByOrderId, getAllOrdersonDB, saveOrderOnDB, getPrice } = require('../helpers/helpers');

// OBTENER TODAS LAS ORDENES
const getAllOrders = async (req, res = response) => {
  try {
    const arrayOrdersDetails = await getAllOrdesDetails(await getAllOrdersonDB());
    res.json({
      mensaje: 'Lista de todas las órdenes.',
      ordenes: arrayOrdersDetails[0]
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// OBTENER UNA ORDEN POR ORDER_ID
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = (await getOrderDetailByOrderId(id))[0];
    res.json({
      mensaje: 'Orden encontrada.',
      order
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// OBTENER TODAS LAS ORDENES DE UN USUARIO POR USER_ID
const getUserOrders = async (req, res = response) => {
  try {
    const { id } = req.params;
    const arrayOrdersDetails = await getAllOrdesDetails(await getAllOrdersByUserId(id));
    res.json({
      mensaje: `Lista de todas las órdenes del usuario con user_id: ${id}.`,
      ordenes: arrayOrdersDetails[0]
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};

// CREAR UNA ORDEN
const postOrder = async (req, res = response) => {
  try {
    const { order } = req.body;
    const { payment_method } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const order_id = await saveOrderOnDB(token, payment_method, order);
    getPrice(order_id, order);
    res.json({
      mensage: 'Orden creada.',
      order: (await getOrderDetailByOrderId(order_id))[0]
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Ha ocurrido un error.',
      error
    });
  }
};


module.exports = { getUserOrders, getOrder, getAllOrders, postOrder };