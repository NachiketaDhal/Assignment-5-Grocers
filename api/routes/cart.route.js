const express = require("express");
const router = express.Router();

const {
  getAllCartProducts,
  addToCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const authenticated = require("../middlewares/auth");

router.get("/cart", authenticated, getAllCartProducts);

router.post("/cart/:id", authenticated, addToCart);
router.delete("/cart/:id", authenticated, removeFromCart);

// router.route("/cart/:id").post(addToCart).delete(removeFromCart);

module.exports = router;
