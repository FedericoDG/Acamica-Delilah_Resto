const { Router } = require('express');

const { getProducts, getProduct, createProduct, updateProduct } = require('../controllers/products.controllers');

const checkToken = require('../middlewares/check_token');
const isAdmin = require('../middlewares/is_admin');
const verifyBodyProduct = require('../middlewares/product.check_body');

const router = Router();

// OBTENER TODOS LOS PRODUCTOS
router.get('/', [checkToken], getProducts);

// OBTENER UN PRODUCTO
router.get('/:id', [checkToken], getProduct);

// CARGAR UN PRODUCTO
router.post('/', [checkToken, isAdmin, verifyBodyProduct], createProduct);

// ACTUALIZAR UN PRODUCTO
router.put('/:id', [checkToken, isAdmin, verifyBodyProduct], updateProduct);

router.post('/borrar/', (req, res) => {
  console.log(req.body.length)
  console.log(Array.isArray(req.body))
  let arr =[]
  req.body.forEach(el =>{
    arr.push(el.cantidad)
  })
  console.log(arr)
  res.json({
    respuesta: req.body
  });
});

module.exports = router;