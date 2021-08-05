const { Router } = require('express');

const { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users.controllers');

const verifyBodyRegister = require('../middlewares/users.register_check_body');
const verifyBodyLogin = require('../middlewares/users.login_check_body');
const userNotExist = require('../middlewares/users.username_not_exist');
const emailNotExist = require('../middlewares/users.email_not_exist');
const checkToken = require('../middlewares/check_token');
const idEqualUserid = require('../middlewares/users.id_is_userid');
const userIdExist = require('../middlewares/users.id_exist');
const verifyBodyUpdate = require('../middlewares/users.update_check_body');
const isAdmin = require('../middlewares/products.user_is_admin');

const router = Router();

// REGISTRO DE USUARIO
router.post('/', [verifyBodyRegister, emailNotExist, userNotExist], registerUser);

// OBTENER TOKEN
router.post('/login', [verifyBodyLogin], loginUser);

// OBTENER TODOS LOS USUARIOS (sólo ADMIN)
router.get('/', [checkToken], getUsers);

// OBTENER USUARIO POR ID (sólo ADMIN salvo que /:id = user_id)
router.get('/:id', [checkToken, userIdExist, idEqualUserid], getUser);

// ACTUALIZAR USUARIO POR ID (sólo ADMIN salvo que /:id = user_id)
router.put('/:id', [checkToken, idEqualUserid, verifyBodyUpdate, userIdExist], updateUser);

// ELIMINAR USUARIO POR ID (sólo ADMIN salvo que /:id = user_id)
router.delete('/:id', [checkToken, userIdExist, isAdmin], deleteUser);


module.exports = router;