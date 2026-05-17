const express = require('express');
const controller = require('../controllers/product-public.controller');

const router = express.Router();
router.get('/', controller.getProducts);
router.get('/:id', controller.getProductDetail);
module.exports = router;
