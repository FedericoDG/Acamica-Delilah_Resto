const { Router } = require('express');

const { getUserOrders, getOrder, getAllOrders, postOrder, deleteOrder, updateOrder } = require('../controllers/orders.controllers');

const checkToken = require('../middlewares/check_token');
const isAdmin = require('../middlewares/is_admin');
const ordersCheckBody = require('../middlewares/orders.check_body');
const userIdHasOrderId = require('../middlewares/orders.id_has_this_user_id');
const orderExist = require('../middlewares/orders.order_exist');
const updateCheckBody = require('../middlewares/orders.update_check_body');
const userHasOrders = require('../middlewares/orders.user_has_orders');
const userIdExist = require('../middlewares/users.id_exist');
const idEqualUserid = require('../middlewares/users.id_is_userid');

const router = Router();

// OBTENER UNA ORDEN
router.get('/:id', [checkToken, userIdHasOrderId, orderExist], getOrder);

// OBTENER TODAS LA ORDENES DE UN USUARIO
router.get('/user/:id', [checkToken, idEqualUserid, userIdExist, userHasOrders], getUserOrders);

// OBTENER TODAS LA ORDENES
router.get('/', [checkToken, isAdmin], getAllOrders);

// CREAR UNA ORDEN
router.post('/', [checkToken, ordersCheckBody], postOrder);

// ACTUALIZAR EL ESTADO DE UNA ORDEN
router.put('/:id', [checkToken, isAdmin, updateCheckBody, orderExist], updateOrder);

// ELIMINAR UNA ORDEN
router.delete('/:id', [checkToken, isAdmin, orderExist], deleteOrder);

module.exports = router;