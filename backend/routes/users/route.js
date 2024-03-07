const express = require("express");
const SignUpController = require("../../Controllers/User/SignUpController");
const LoginController = require("../../Controllers/User/LoginController");
const VerifyEmail = require("../../Controllers/User/VerifyEmail.Controller");
const ResendEmailOTP = require("../../Controllers/User/ResendEmailOTP.Controller");
const AuthMiddleware = require("../../middleware/IsAuth");
const passport = require("../../Controllers/User/google/GoogleAuth");
const GoogleAPI = require("../../Controllers/User/google/GoogleAPI");
const GetMyData = require("../../Controllers/User/GetMyData");

const UserRouter = express.Router();

UserRouter.post("/signup", SignUpController);
UserRouter.post("/login", LoginController);
UserRouter.post("/googleAuthentication", GoogleAPI);

UserRouter.use(AuthMiddleware);
UserRouter.post("/veriFyEmail", VerifyEmail);
UserRouter.post("/resendEmail", ResendEmailOTP);
UserRouter.get("/getMyData", GetMyData);


module.exports = UserRouter;
