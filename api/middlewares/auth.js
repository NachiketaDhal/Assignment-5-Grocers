const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified.user); // id
    req.user = verified.user;

    return next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = authenticated;
