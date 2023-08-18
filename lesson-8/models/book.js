const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "Action",
        "Biography",
        "History",
        "Horror",
        "Kids",
        "Learning",
        "Sci-Fi",
        "Thriller",
        "War",
      ],
    },
    year: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    // versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
