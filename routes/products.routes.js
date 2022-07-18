const { Router } = require('express');

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products.controllers');

const checkToken = require('../middlewares/check_token');
const isAdmin = require('../middlewares/is_admin');
const verifyBodyProduct = require('../middlewares/product.check_body');
const idExist = require('../middlewares/products.id_exist');

const router = Router();

// OBTENER TODOS LOS PRODUCTOS
router.get('/', [checkToken], getProducts);

// OBTENER UN PRODUCTO
router.get('/:id', [checkToken], idExist, getProduct);

// CARGAR UN PRODUCTO
router.post('/', [checkToken, isAdmin, verifyBodyProduct], createProduct);

// ACTUALIZAR UN PRODUCTO
router.put('/:id', [checkToken, isAdmin, idExist, verifyBodyProduct], updateProduct);

// ELIMINAR UN PRODUCTO
router.delete('/:id', [checkToken, isAdmin, idExist], deleteProduct);

module.exports = router;
