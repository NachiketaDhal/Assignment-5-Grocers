const Product = require("../Models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "success",
      total: products.length,
      products,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to fetch products",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(200).json({
        message: "No product found with this id",
      });
    }
    res.status(200).json({
      message: "success",
      product,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to fetch product",
    });
  }
};

exports.createNewProduct = async (req, res) => {
  try {
    const product = await new Product(req.body);
    await product.save();
    res.status(201).json({
      message: "successfully created a product",
      product,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to create product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(200).json({
        message: "No product found with this id",
      });
    }
    res.status(203).json({
      message: "successfully updated the product",
      product,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to update product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(203).json({
      message: "successfully deleted the product",
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to delete product",
    });
  }
};
