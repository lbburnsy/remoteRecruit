const router = require('express').Router();
const backEndRoutes = require('./backEndRoutes');
const frontEndRoutes = require('./frontEndRoutes');
const fullStackRoutes = require('./fullStackRoutes');
const searchRoute = require('./searchRoute');

router.use('/backend', backEndRoutes);
router.use('/frontend', frontEndRoutes);
router.use('/fullstack', fullStackRoutes);
//search function (new tech)
router.use('/minisearch', searchRoute); 


module.exports = router;