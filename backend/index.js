require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
const cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
const connect = require("./config/db");
const allRoutes = require("./routes");
app.use("/api",allRoutes)


app.get("/",async(req,res)=>{
  return res.send("Hello")
})

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`Server started on PORT ${process.env.PORT}`)
  } catch (error) {
    console.log(error.message);
  }
});

