const express = require("express");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const router = express.Router();
const authorize = require("../middlewares/authorize");

const newUser = async (req, res) => {
  // check user exist
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist!");
  // create new user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const result = await newUser.save();
    const token = newUser.generateAuthToken();
    res.send({
      token: token,
      data: {
        name: result.name,
        email: result.email,
      },
    });
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

router.route("/").post(newUser);
router.route("/me").get(authorize, (req, res) => {
  res.send(req.user);
});

module.exports = router;
