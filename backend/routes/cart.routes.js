const express = require('express');
const controller = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { addCartSchema, updateCartSchema, selectCartSchema, selectAllCartSchema } = require('../validations/cart.validation');

const router = express.Router();
router.use(auth);
router.get('/', controller.getCart);
router.post('/', validate(addCartSchema), controller.addToCart);
router.put('/:id', validate(updateCartSchema), controller.updateCartItem);
router.delete('/:id', controller.deleteCartItem);
router.patch('/:id/select', validate(selectCartSchema), controller.selectCartItem);
router.patch('/select-all', validate(selectAllCartSchema), controller.selectAll);

module.exports = router;
