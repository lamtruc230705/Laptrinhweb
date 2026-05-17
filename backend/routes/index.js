const express = require('express');

const authRoutes = require('./auth.routes');
const homeRoutes = require('./home.routes');
const productPublicRoutes = require('./product-public.routes');
const artistPublicRoutes = require('./artist-public.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');
const uploadRoutes = require('./upload.routes');
const userRoutes = require('./user.routes');
const adminRoutes = require('./admin/admin.routes');
const artistRoutes = require('./artist/artist.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/home', homeRoutes);
router.use('/products', productPublicRoutes);
router.use('/artists', artistPublicRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/upload', uploadRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/artist', artistRoutes);

module.exports = router;
