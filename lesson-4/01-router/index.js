const morgan = require("morgan");
const express = require("express");

const routes = require("./routes");

const app = express();

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
