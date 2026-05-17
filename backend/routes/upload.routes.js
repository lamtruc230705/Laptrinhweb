const express = require('express');
const controller = require('../controllers/upload.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();
router.use(auth);
router.post('/', upload.uploadGeneral.single('image'), controller.uploadImage);
router.post('/products/:productId/image', upload.uploadProduct.single('image'), controller.uploadProductImage);
router.post('/artists/:artistId/image', upload.uploadArtist.single('image'), controller.uploadArtistImage);
router.post('/avatar', upload.uploadAvatar.single('image'), controller.uploadAvatar);
router.get('/files', controller.getUploadedFiles);

module.exports = router;
