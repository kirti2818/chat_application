const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    posts: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: false }
);
const UserModel = mongoose.model("User", User);
module.exports = UserModel;
