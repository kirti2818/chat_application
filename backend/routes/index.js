const express = require("express");
allRoutes = express.Router();
const userRoutes = require("../routes/users/route");
const chatRoutes = require("../routes/chat/route");
const MessageRoutes = require("./message/route");

allRoutes.use("/users", userRoutes);
allRoutes.use("/chat", chatRoutes);
allRoutes.use("/message",MessageRoutes)

module.exports = allRoutes;
