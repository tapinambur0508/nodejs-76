const fs = require("node:fs/promises");
const path = require("node:path");
const morgan = require("morgan");
const express = require("express");

const checkAuth = require("./middleware/check-auth");

const app = express();

app.use(morgan("combined"));

app.use("/books", checkAuth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books", async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "books.json"), "utf8");

    res.send(JSON.parse(data));
  } catch (error) {
    console.error(error);

    res.status(500).send("Internal server error");
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
