const jwt = require("jsonwebtoken");

const User = require("../models/user");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "string") {
    return res.status(401).send({ message: "No token provided" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).send({ message: "Token Error" });
      }

      return next(err);
    }

    try {
      const user = await User.findById(decode.id);

      if (user.token !== token) {
        return res.status(401).send({ message: "You are not authorize" });
      }

      if (user.verified !== true) {
        return res.status(401).send({ message: "You are not authorize" });
      }

      req.user = { id: user.id, name: user.name };

      next();
    } catch (error) {
      next(error);
    }
  });
}

module.exports = auth;
