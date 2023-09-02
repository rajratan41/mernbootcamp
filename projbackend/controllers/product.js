const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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

exports.createProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "Problem with image",
        });
      }

      //   TODO: restrictions on fields
      let product = new Product(fields);

      //   handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size is too big!",
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }

      //   save to the db
      product.save();
      res.json(product);
    });
  } catch (error) {
    res.status(400).json({
      message: "Saving tshirt in DB failed",
      error: error.message,
    });
  }
};
