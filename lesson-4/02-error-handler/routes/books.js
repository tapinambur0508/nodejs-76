const fs = require("node:fs/promises");
const path = require("node:path");

const express = require("express");

const router = express.Router();

// GET /api/books
router.get("/", async (req, res, next) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "..", "data", "books.json"),
      "utf8"
    );

    res.send(JSON.parse(data));
  } catch (error) {
    next(error);
  }
});

// GET /api/books/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.send(`Book with id ${id}`);
});

module.exports = router;
