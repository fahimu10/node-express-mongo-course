const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(400).send("Access denied!");
  token = token.split(" ")[1].trim();
  //   Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token!");
  }
  next();
};
