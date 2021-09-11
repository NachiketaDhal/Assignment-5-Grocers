const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "success",
      length: users.length,
      users,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to fetch users",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!req.body.role) role = "user";

    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
      role,
      cart: [],
      fav: [],
    });
    const newUser = await user.save();

    const token = jwt.sign({ user: newUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to register user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(400).json({
        message: "Wrong credentials",
      });
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!passwordCorrect) {
      return res.status(400).json({
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign({ user: foundUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
      message: "User loggedin successfully",
      token,
    });
  } catch (err) {
    res.status(404).json({
      message: "Failed to login user",
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token").send();
  // res.cookie("token", "").send();
};

exports.isLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({
        status: false,
      });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    const verifiedUserId = verifiedUser.user;
    const user = await User.findOne({ _id: verifiedUserId });
    res.json({
      status: true,
      user,
    });
  } catch (err) {
    res.json({
      status: false,
    });
  }
};
