const User = require("../Models/User");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user;
    if (!userId) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    const user = await User.findById(userId);
    // console.log(user.role);

    if (user.role !== "admin") {
      return res.status(401).json({ errorMessage: "Not Admin" });
    }

    // return true;

    return next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Not Admin" });
  }
};

module.exports = isAdmin;
