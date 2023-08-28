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
    res.status(400).json({
      message: "Category not found in DB",
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newcategory = await new Category(req.body).save();

    res.status(200).json({ newcategory });
  } catch (error) {
    res.status(400).json({
      message: "Not able to save category in DB",
      error: error.message,
    });
  }
};
