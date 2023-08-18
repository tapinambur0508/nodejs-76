const express = require("express");

const router = express.Router();

const authRoutes = require("./auth");
const bookRoutes = require("./books");

const auth = require("../middleware/auth");

router.use("/auth", authRoutes);
router.use("/books", auth, bookRoutes);

module.exports = router;
