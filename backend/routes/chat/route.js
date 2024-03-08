const express = require("express");
const AuthMiddleware = require("../../middleware/isAuth");
const NewGroupChat = require("../../Controllers/Chats/GroupChat/NewGroupChat.Controller");
const GetMyGroups = require("../../Controllers/Chats/GroupChat/GetMyGroups");
const GetSingleChat = require("../../Controllers/Chats/SingleChat/GetSingleChat");
const AddMemberInGroup = require("../../Controllers/Chats/SingleChat/AddMemberInGroup");
const ChatRouter = express.Router();

ChatRouter.use(AuthMiddleware)

ChatRouter.post("/newGroupChat", NewGroupChat);
// UserRouter.post("/resendEmail", ResendEmailOTP);
ChatRouter.get("/getMyGroups", GetMyGroups);
ChatRouter.get("/getSingleChat", GetSingleChat);
ChatRouter.patch("/addMemberInGroup", AddMemberInGroup);


module.exports = ChatRouter;
