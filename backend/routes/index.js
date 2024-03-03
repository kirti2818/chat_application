const express = require("express");
allRoutes = express.Router();
const userRoutes = require("../routes/users/route");

allRoutes.use("/users", userRoutes);

module.exports = allRoutes;
