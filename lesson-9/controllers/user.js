const User = require("../models/user");

const fs = require("node:fs/promises");
const path = require("node:path");

async function uploadAvatar(req, res, next) {
  try {
    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public", req.file.filename)
    );

    const doc = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    ).exec();

    if (doc === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(doc);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadAvatar,
};
