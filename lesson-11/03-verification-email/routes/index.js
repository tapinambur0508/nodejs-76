const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
const bookRoutes = require("./books");
const userRoutes = require("./users");

const auth = require("../middleware/auth");

router.use("/auth", authRoutes);
router.use("/books", auth, bookRoutes);
router.use("/users", auth, userRoutes);

module.exports = router;
