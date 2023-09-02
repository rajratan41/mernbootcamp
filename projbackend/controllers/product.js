const Product = require("../models/product");

exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate("category");
    req.product = product;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Product Not Found",
      error: error.message,
    });
  }
};
