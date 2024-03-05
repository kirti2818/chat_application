const express = require("express");
const SignUpController = require("../../Controllers/User/SignUpController");
const LoginController = require("../../Controllers/User/LoginController");
const VerifyEmail = require("../../Controllers/User/VerifyEmail.Controller");
const ResendEmailOTP = require("../../Controllers/User/ResendEmailOTP.Controller");
const AuthMiddleware = require("../../middleware/IsAuth");

const UserRouter = express.Router();

UserRouter.post("/signup", SignUpController);
UserRouter.post("/login", LoginController);

UserRouter.use(AuthMiddleware);
UserRouter.post("/veriFyEmail", VerifyEmail);
UserRouter.post("/resendEmail", ResendEmailOTP);

module.exports = UserRouter;