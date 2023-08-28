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
    const createCategory = await new Category(req.body).save();

    res.status(200).json({ createCategory });
  } catch (error) {
    res.status(400).json({
      message: "Not able to save category in DB",
      error: error.message,
    });
  }
};

exports.getCategory = (req, res) => {
  return res.status(200).json(req.category);
};

exports.getAllCategory = async (req, res) => {
  try {
    const getAllCategory = await Category.find();

    res.json({
      message: "success",
      getAllCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "No Categories Found",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updateCategory = await req.category;
    updateCategory.name = req.body.name;

    updateCategory.save();

    res.status(200).json({
      message: "Category is Updated",
      updateCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
};
