const { json } = require("body-parser");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user
    .save()
    .then((savedUser) => {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match",
        });
      }

      // create token
      const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET);

      // put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });

      // send response to front end
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: "User email does not exists",
        });
      }
    });
};

exports.signout = (req, res) => {
  res.json({
    message: "User Signout",
  });
};
