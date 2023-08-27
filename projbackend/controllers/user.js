const User = require("../models/user");
const Order = require("../models/order");

// Get id of User from Params
exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      req.profile = user;
      next();
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: "No User was Found in DB",
        });
      }
    });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    user.salt = undefined;
    user.encry_password = undefined;

    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "You are not authorized to Update this User",
      error: error.message,
    });
  }
};

exports.userPurchaseList = async (req, res) => {
  try {
    const order = await Order.find({ user: req.profile._id }).populate(
      "user",
      "_id name"
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No Order in this account",
      error: error.message,
    });
  }
};
