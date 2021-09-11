const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
const isAdmin = require("../middlewares/isAdmin");
const authenticated = require("../middlewares/auth");

router.get("/products", getAllProducts);
router.post("/products", authenticated, isAdmin, createNewProduct);

router.get("/products/:id", getProductById);
router.put("/products/:id", authenticated, isAdmin, updateProduct);
router.delete("/products/:id", authenticated, isAdmin, deleteProduct);

module.exports = router;
