const express = require("express");
const AuthMiddleware = require("../../middleware/isAuth");
const NewGroupChat = require("../../Controllers/Chats/GroupChat/NewGroupChat.Controller");
const GetMyGroups = require("../../Controllers/Chats/GroupChat/GetMyGroups");
const GetSingleChat = require("../../Controllers/Chats/SingleChat/GetSingleChat");
const AddMemberInGroup = require("../../Controllers/Chats/SingleChat/AddMemberInGroup");
const AccessChat = require("../../Controllers/Chats/SingleChat/AccessChat");
const GetAllChats = require("../../Controllers/Chats/GetAllChats");
const ChatRouter = express.Router();

ChatRouter.use(AuthMiddleware)

ChatRouter.post("/newGroupChat", NewGroupChat);
ChatRouter.get("/getMyGroups", GetMyGroups);
ChatRouter.get("/getSingleChat", GetSingleChat);
ChatRouter.patch("/addMemberInGroup", AddMemberInGroup);

ChatRouter.post("/accessChat", AccessChat);
ChatRouter.get("/getAllChats",GetAllChats)


module.exports = ChatRouter;
