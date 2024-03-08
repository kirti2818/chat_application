const express = require("express");
allRoutes = express.Router();
const userRoutes = require("../routes/users/route");
const chatRoutes = require("../routes/chat/route")

allRoutes.use("/users", userRoutes);
allRoutes.use("/chat", chatRoutes);

module.exports = allRoutes;
