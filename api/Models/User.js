const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  fav: {
    type: Array,
    required: false,
  },
  cart: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
