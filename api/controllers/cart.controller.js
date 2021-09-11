const Product = require("../Models/Product");
const User = require("../Models/User");

// exports.getAllCartProducts = async (req, res) => {
//   try {
//     const cartProducts = await Product.find({ cart: true });
//     res.status(200).json({
//       message: "success",
//       length: cartProducts.length,
//       cartProducts,
//     });
//   } catch (err) {
//     res.status(404).json({
//       message: "Failed to fetch cart products",
//     });
//   }
// };

// exports.addToCart = async (req, res) => {
//   try {
//     await Product.findByIdAndUpdate(req.params.id, {
//       cart: true,
//     });

//     res.status(200).json({
//       message: "successfully added to cart",
//     });
//   } catch (err) {
//     res.status(404).json({
//       message: "Failed to  add to cart",
//     });
//   }
// };

// exports.removeFromCart = async (req, res) => {
//   try {
//     await Product.findByIdAndUpdate(req.params.id, {
//       cart: false,
//     });

//     res.status(200).json({
//       message: "successfully removed from cart",
//     });
//   } catch (err) {
//     res.status(404).json({
//       message: "Failed to remove from cart",
//     });
//   }
// };

exports.getAllCartProducts = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user);
    const cartProducts = loggedInUser.cart;

    res.status(200).json({
      message: "success",
      length: cartProducts.length,
      cartProducts,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to fetch cart products",
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    const loggedInUser = await User.findByIdAndUpdate(req.user, {
      $push: { cart: foundProduct },
    });

    res.status(200).json({
      message: "successfully added to cart",
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to  add to cart",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    const loggedInUser = await User.findByIdAndUpdate(req.user, {
      $pull: { cart: foundProduct },
    });

    res.status(200).json({
      message: "successfully removed from cart",
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to remove from cart",
    });
  }
};
