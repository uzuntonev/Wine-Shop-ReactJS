const express = require('express');
const router = express.Router();
const {
  postProduct,
  getProducts,
  putProduct,
  delProduct,
} = require('../controllers/product');

// @route GET api/products
// @desc get all products
router.get('/', getProducts);

// @route POST api/products
// @desc create product
router.post('/', postProduct);

// @route GET api/products
// @desc get product by id
router.get('/:id', getProducts);

// @route PUT api/products
// @desc update product
router.put('/:id', putProduct);

// @route DELETE api/products
// @desc delete product
router.delete('/:id', delProduct);

module.exports = router;
