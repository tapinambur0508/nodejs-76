const movies = require("./movies/index.js");

movies
  .read()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
