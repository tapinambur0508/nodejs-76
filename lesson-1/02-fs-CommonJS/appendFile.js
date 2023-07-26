const fs = require("node:fs/promises");

console.log("Before");

fs.appendFile("new-file.txt", "Hello, World!\n", { encoding: "utf-8" })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

console.log("After");
