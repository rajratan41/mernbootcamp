const Category = require("../models/category");

exports.getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);

    res.status(200).json({
      message: "Success",
      category,
    });

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Category not found in DB",
      error: error.message,
    });
  }
};
