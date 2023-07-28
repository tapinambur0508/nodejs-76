const { program } = require("commander");

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

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Book id")
  .option("-t, --title <title>", "Book title")
  .option("-at, --author <author>", "Book author");

console.log(process.argv);
program.parse(process.argv);

const options = program.opts();

console.log(options);

invokeAction(options)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
