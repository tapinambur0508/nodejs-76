import fs from "node:fs/promises";

// Instructions for Executing ES6 Modules:
// Method 1: Modify the file extension to '.mjs'
// Method 2: Construct a 'package.json' file incorporating the ensuing content: { "type": "module" }

fs.readFile("index.js", { encoding: "utf8" })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
