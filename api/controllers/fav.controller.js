const Product = require("../Models/Product");
const User = require("../Models/User");

exports.getAllFavProducts = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user);
    const favProducts = loggedInUser.fav;

    res.status(200).json({
      message: "success",
      length: favProducts.length,
      favProducts,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to fetch fav products",
    });
  }
};

exports.addToFav = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    const loggedInUser = await User.findByIdAndUpdate(req.user, {
      $push: { fav: foundProduct },
    });

    res.status(200).json({
      message: "successfully added to fav",
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to  add to fav",
    });
  }
};

exports.removeFromFav = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    const loggedInUser = await User.findByIdAndUpdate(req.user, {
      $pull: { fav: foundProduct },
    });

    res.status(200).json({
      message: "successfully removed from fav",
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to remove from fav",
    });
  }
};
