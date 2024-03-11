const express = require("express")
const AddMessage = require("../../Controllers/Message/AddMessage")
const AuthMiddleware = require("../../middleware/IsAuth")
const GetAllMessages = require("../../Controllers/Message/GetAllMessage")

const MessageRoutes = express.Router()

MessageRoutes.use(AuthMiddleware)
MessageRoutes.post("/add_newMessage",AddMessage)
MessageRoutes.get("/get_allMessages",GetAllMessages)

module.exports = MessageRoutes;