const router = require("express").Router();

// Requires all modules
const homeRoutes = require("./homeRoutes");
const searchRoutes = require("./searchRoutes");
const apiRoutes = require("./api");
const profileRoutes = require("./profileRoutes");

// Sets the router routes.
router.use("/", homeRoutes);
router.use("/search", searchRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
