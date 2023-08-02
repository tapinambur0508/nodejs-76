function checkAuth(req, res, next) {
  const apiKey = req.query["api-key"];

  if (apiKey === "12345") {
    return next();
  }

  return res.status(401).send("Unauthorized");
}

module.exports = checkAuth;
