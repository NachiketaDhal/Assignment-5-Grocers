const express = require("express");
const router = express.Router();

const {
  getAllFavProducts,
  addToFav,
  removeFromFav,
} = require("../controllers/fav.controller");
const authenticated = require("../middlewares/auth");

router.get("/fav", authenticated, getAllFavProducts);

router.post("/fav/:id", authenticated, addToFav);
router.delete("/fav/:id", authenticated, removeFromFav);

// router.route("/fav/:id").post(addToFav).delete(removeFromFav);

module.exports = router;
