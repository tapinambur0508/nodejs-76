const Book = require("../models/book");

// About promises in mongoose
// https://mongoosejs.com/docs/promises.html

// About Query operators in mongodb
// https://www.mongodb.com/docs/v6.2/reference/operator/query/
async function getAll(req, res, next) {
  try {
    const docs = await Book.find(
      { year: { $gte: 2020 }, genre: { $in: ["Action", "Biography"] } } // $gt, $lt, $gte, $lte
      // { _id: 0, title: 1, author: 1, year: 1 }
    ).exec();

    return res.send(docs);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  const { id } = req.params;

  try {
    const doc = await Book.findById(id).exec();

    if (doc === null) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.send(doc);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  };

  try {
    const doc = await Book.create(book);

    return res.status(201).send(doc);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const { id } = req.params;

  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  };

  try {
    const result = await Book.findByIdAndUpdate(id, book, { new: true }).exec();

    if (result === null) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Book.findByIdAndRemove(id).exec();

    if (result === null) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
