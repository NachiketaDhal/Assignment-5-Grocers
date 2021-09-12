const express = require("express");
const router = express.Router();

const {
  getAllCartProducts,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const authenticated = require("../middlewares/auth");

router.get("/cart", authenticated, getAllCartProducts);

router.get("/cart/add/:id", authenticated, addToCart);
router.get("/cart/remove/:id", authenticated, removeFromCart);

// router.route("/cart/:id").post(addToCart).delete(removeFromCart);

module.exports = router;
