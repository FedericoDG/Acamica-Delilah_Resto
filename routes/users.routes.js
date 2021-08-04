const { Router } = require('express');

const { register, login } = require('../controllers/users.controllers');

const verifyBodyRegister = require('../middlewares/users.register_check_body');
const verifyBodyLogin = require('../middlewares/users.login_check_body');
const userNotExist = require('../middlewares/users.user_not_exist');


const router = Router();

// REGISTER
router.post('/', [verifyBodyRegister, userNotExist], register);

// LOGIN
router.post('/login', [verifyBodyLogin], login);

module.exports = router;