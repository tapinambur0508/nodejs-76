const express = require("express");

const app = express();
const jsonParser = express.json();

// app.use(jsonParser); // Don't connect as global middleware, use where it is needed

app.post("/api/books", jsonParser, (req, res) => {
  console.log(req.body, req.body.title);

  res.end();
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
