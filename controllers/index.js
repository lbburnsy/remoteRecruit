const router = require('express').Router();

// const categoryRoutes = require('./categories');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/category', categoryRoutes);

module.exports = router;