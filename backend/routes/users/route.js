const express = require("express");
const SignUpController = require("../../Controllers/User/SignUpController");
const LoginController = require("../../Controllers/User/LoginController");

const UserRouter = express.Router();

UserRouter.post("/signup", SignUpController);
UserRouter.post("/login", LoginController);

module.exports = UserRouter;