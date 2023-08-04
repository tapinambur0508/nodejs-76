const express = require("express");

const router = express.Router();

const bookRoutes = require("./books");
const userRoutes = require("./users");

const checkAuth = require("../middleware/check-auth");

router.use("/books", checkAuth, bookRoutes);
router.use("/users", userRoutes);

module.exports = router;
