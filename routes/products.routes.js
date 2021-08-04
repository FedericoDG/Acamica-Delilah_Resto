const { Router } = require('express');

const { getProducts, getProduct, createProduct } = require('../controllers/products.controllers');

const checkToken = require('../middlewares/products.check_token');
const isAdmin = require('../middlewares/products.user_is_admin');
const verifyBodyProduct = require('../middlewares/product.check_body');

const router = Router();

router.get('/', [checkToken], getProducts);

router.get('/:id', [checkToken], getProduct);

router.post('/', [checkToken, isAdmin, verifyBodyProduct], createProduct);

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