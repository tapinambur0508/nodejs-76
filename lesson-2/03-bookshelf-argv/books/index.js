const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const FILE_PATH = path.join(__dirname, "books.json");

async function read() {
  const data = await fs.readFile(FILE_PATH, "utf-8");

  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(FILE_PATH, JSON.stringify(data));
}

async function getAll() {
  const data = await read();

  return data;
}

async function getById(id) {
  const data = await read();

  return data.find((book) => book.id === id);
}

async function create(book) {
  const data = await read();

  const newBook = { ...book, id: crypto.randomUUID() };

  data.push(newBook);

  await write(data);

  return newBook;
}

async function update(id, book) {
  const data = await read();

  const index = data.findIndex((book) => book.id === id);

  if (index === -1) {
    return undefined;
  }

  const newBooks = [
    ...data.slice(0, index),
    { ...book, id },
    ...data.slice(index + 1),
  ];

  await write(newBooks);

  return { ...book, id };
}

async function remove(id) {
  const data = await read();

  const index = data.findIndex((book) => book.id === id);

  if (index === -1) {
    return undefined;
  }

  const newBooks = [...data.slice(0, index), ...data.slice(index + 1)];

  await write(newBooks);

  return data[index];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
