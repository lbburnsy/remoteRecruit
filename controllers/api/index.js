const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jobRoutes = require("./jobRoutes");
const searchRoutes = require('./searchRoutes');

router.use('/users', userRoutes);
router.use("/jobs", jobRoutes);
router.use("/search", searchRoutes);

module.exports = router;