// const fs = require("node:fs"); // get all fs functions

// const fs = require("node:fs").promises; // get only promises fs functions
const fs = require("node:fs/promises"); // get only promises fs functions

console.log("Before");

// // Using Callback
// fs.readFile("file.txt", { encoding: 'utf-8' }, (err, data) => { // fs.readFile("file.txt", 'utf-8', (err, data) => {
//   if (err) throw err;

//   console.log(data);
// });

// // Using Promise
// fs.promises
//   .readFile("unknown.txt", { encoding: "utf-8" })
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

async function readFile(path, options) {
  const data = await fs.readFile(path, options);

  return data;
}

readFile("index.js", { encoding: "utf-8" })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

console.log("After");
