const fs = require("node:fs/promises");
const path = require("node:path");

async function read() {
  const filePath = path.join(__dirname, "/movies.json");

  const data = await fs.readFile(filePath, { encoding: "utf8" });

  return JSON.parse(data);
}

module.exports = { read };
