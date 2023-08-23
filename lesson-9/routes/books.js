const express = require("express");

const BookController = require("../controllers/book");

const router = express.Router();
const jsonParser = express.json();

router.get("/", BookController.getAll);
router.post("/", jsonParser, BookController.create);

router.get("/:id", BookController.getById);
router.put("/:id", jsonParser, BookController.update);
router.delete("/:id", BookController.remove);

module.exports = router;
