const Books = require("./books");

async function invokeAction({ action, id, title, author }) {
  switch (action) {
    case "getAll":
      const books = await Books.getAll();
      return books;
    case "getById":
      const book = await Books.getById(id);
      return book;
    case "create":
      const newBook = await Books.create({ title, author });
      return newBook;
    case "update":
      const updatedBook = await Books.update(id, { title, author });
      return updatedBook;
    case "remove":
      const removedBook = await Books.remove(id);
      return removedBook;
    default:
      console.log("Unknown action");
  }
}

// node app.js --action update --id 12345 --title "New Title" --author "New Author"

console.log(process.argv);

const actionIndex = process.argv.indexOf("--action");

if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];
  const id = process.argv[actionIndex + 3];
  const title = process.argv[actionIndex + 5];
  const author = process.argv[actionIndex + 7];

  invokeAction({ action, id, title, author })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
