require("dotenv").config();

const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const passport = require("./Controllers/User/google/GoogleAuth");


const app = express();
app.use(express.json());
app.use(session({
  secret: 'your_secret_key', // Add a secret key for session encryption
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
const connect = require("./config/db");
const allRoutes = require("./routes");
app.use("/api", allRoutes);

app.get("/", async (req, res) => {
  return res.send("Hello");
});

app.get('/api/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/api/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/auth/google/success',
        failureRedirect: '/api/auth/google/failure'
}));

app.get("/api/auth/google/success",async(req,res)=>{
  console.log("hurray",req.user)
  let cookieOption = { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true };
  return res.cookie("chat_token",req.user?.token,cookieOption).status(200).redirect(`${process.env.FRONTEND_URL}`)
})

app.get("/api/auth/google/failure",async(req,res)=>{
  console.log("hurray!")
  res.send("failed !!")
})



app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`Server started on PORT ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
