const router = require('express').Router();
const backEndRoutes = require('./backEndRoutes');
const frontEndRoutes = require('./frontEndRoutes');
const fullStackRoutes = require('./fullStackRoutes');

router.use('/backend', backEndRoutes);
router.use('/frontend', frontEndRoutes);
router.use('fullstack', fullStackRoutes);

module.exports = router;