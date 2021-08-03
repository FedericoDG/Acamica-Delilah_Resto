const { Router } = require('express');

const { register, login, getProducts, getProduct, createProduct } = require('../controllers/api.controllers');

const verifyBodyRegister = require('../middlewares/register_check_body.middleware');
const verifyBodyLogin = require('../middlewares/login_check_body.middleware');
const checkToken = require('../middlewares/check_token.middleware');
const userNotExist = require('../middlewares/user_not_exist.middlewares');
const isAdmin = require('../middlewares/is_admin.middleware');
const verifyBodyProduct = require('../middlewares/product_check_body.middleware');

const router = Router();

router.post('/register', [verifyBodyRegister, userNotExist], register);

router.post('/login', [verifyBodyLogin], login);

router.get('/products', [checkToken], getProducts);

router.get('/products/:id', [checkToken], getProduct);

router.post('/products/', [checkToken, isAdmin, verifyBodyProduct], createProduct);

module.exports = router;