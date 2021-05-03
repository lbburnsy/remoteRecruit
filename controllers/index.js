const router = require("express").Router();

// const categoryRoutes = require('./categories');
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
const profileRoutes = require("./profileRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);
// router.use('/category', categoryRoutes);

module.exports = router;
