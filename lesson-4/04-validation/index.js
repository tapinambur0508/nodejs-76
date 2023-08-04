const crypto = require("node:crypto");
const express = require("express");

const bookSchema = require("./schemas/book");

const app = express();
const jsonParser = express.json();

app.post("/api/books", jsonParser, (req, res) => {
  const response = bookSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).send("Validation Error");
  }

  const book = {
    id: crypto.randomUUID(),
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
  };

  res.status(201).send(book);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
