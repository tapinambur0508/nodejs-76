const path = require("node:path");

const morgan = require("morgan");
const express = require("express");

const routes = require("./routes");

const app = express();

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

app.use((__, res, ___) => {
  // res.status(404).send({ message: `Cannot ${req.method} ${req.url}` });

  // res.status(404).sendFile(path.join(__dirname, "public", "views", "404.html"));

  res.status(404).sendFile(path.join(__dirname, "public", "images", "cat.png"));
});

app.use((error, __, res, ___) => {
  console.error(error);

  res.status(500).send({ message: "Internal Server Error" });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
