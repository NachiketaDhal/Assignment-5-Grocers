const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getAllUsers,
  isLoggedIn,
} = require("../controllers/auth.controller");
const authenticated = require("../middlewares/auth");

router.get("/auth/users", getAllUsers);
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/logout", authenticated, logout);
router.get("/auth/isLoggedIn", isLoggedIn);

module.exports = router;
