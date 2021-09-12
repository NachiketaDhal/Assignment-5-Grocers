const express = require("express");
const router = express.Router();

const {
  getAllFavProducts,
  addToFav,
  removeFromFav,
} = require("../controllers/fav.controller");
const authenticated = require("../middlewares/auth");

router.get("/fav", authenticated, getAllFavProducts);

router.get("/fav/add/:id", authenticated, addToFav);
router.get("/fav/remove/:id", authenticated, removeFromFav);

// router.route("/fav/:id").post(addToFav).delete(removeFromFav);

module.exports = router;
