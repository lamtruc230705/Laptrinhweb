const express = require('express');
const controller = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { checkoutSchema } = require('../validations/order.validation');

const router = express.Router();
router.use(auth);
router.post('/checkout', validate(checkoutSchema), controller.checkout);
router.get('/my', controller.myOrders);
router.get('/my/:id', controller.myOrderDetail);

module.exports = router;
