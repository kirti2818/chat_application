require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./Controllers/User/google/GoogleAuth");

const app = express();
app.use(express.json());

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000","https://chat-application-ruddy-five.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000","https://chat-application-ruddy-five.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
const connect = require("./config/db");
const allRoutes = require("./routes");
const AddAndUpdateSocket = require("./Controllers/Socket/Adduser");
const DeleteUserFromSocket = require("./Controllers/Socket/DeleteUserFromSocket");
const GetSockets = require("./utils/getSocket");

app.use("/api", allRoutes);

io.on("connection", (socket) => {
  // console.log("Initail connection",socket.id);
  // io.emit('test',"hsflsjfljslf")
  // console.log("A user connected", socket.id);

  // Handle user login event
  socket.on("login", async (userId) => {
    // console.log("USERID", userId);
    // Store user ID and socket ID in database
    const Result = await AddAndUpdateSocket(userId, socket);
    console.log(Result);
  });

  socket.on("send_new_message",async(data)=>{
  if(!data?.content){
    console.log("Content is not Here")
      return;
     
  }
   console.log(data)
   const sockets = await GetSockets(data)
   console.log(sockets,"SOCKET")
   io.to(sockets[0]).emit("test",data?.content)

  })

  // Handle disconnect event
  socket.on("disconnect", async () => {
    // console.log("A user disconnected");
    // console.log(socket.id);
    await DeleteUserFromSocket(socket.id);
  });
});

app.get("/", async (req, res) => {
  return res.send("Hello");
});

app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/auth/google/success",
    failureRedirect: "/api/auth/google/failure",
  })
);

app.get("/api/auth/google/success", async (req, res) => {
  console.log("hurray", req.user);
  let cookieOption = { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true };
  return res
    .cookie("chat_token", req.user?.token, cookieOption)
    .status(200)
    .redirect(`${process.env.FRONTEND_URL}`);
});

app.get("/api/auth/google/failure", async (req, res) => {
  console.log("hurray!");
  res.send("failed !!");
});

httpServer.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`Server started on PORT ${process.env.PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
