const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const router = express.Router();

const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found!");
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send("Password is incorrect!");
  const token = jwt.sign(
    { _id: user.id, email: user.email },
    process.env.JWT_SECRET
  );
  res.send(token);
};

router.route("/").post(authUser);

module.exports = router;
