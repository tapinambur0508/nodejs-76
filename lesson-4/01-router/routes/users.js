const express = require("express");

const router = express.Router();

// GET /api/users
router.get("/", (req, res) => {
  res.send("Users");
});

// POST /api/users
router.post("/", (req, res) => {
  res.send("Create user");
});

module.exports = router;
