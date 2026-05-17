const express = require('express');
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();
router.use(auth);
router.get('/me', controller.getMyProfile);
router.put('/me', controller.updateMyProfile);
module.exports = router;
