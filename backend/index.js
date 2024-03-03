require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");
const connect = require("./config/db");

app.use(cors);

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`Server started on PORT ${process.env.PORT}`)
  } catch (error) {
    console.log(error.message);
  }
});

