const express = require("express");

const upload = require("../middleware/upload");
const UserController = require("../controllers/user");

const router = express.Router();

router.patch("/avatar", upload.single("avatar"), UserController.uploadAvatar);

module.exports = router;
