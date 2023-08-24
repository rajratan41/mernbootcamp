const User = require("../models/user");

exports.signup = (req, res) => {
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

exports.signout = (req, res) => {
  res.json({
    message: "User Signout",
  });
};
