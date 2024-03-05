const jwt = require("jsonwebtoken");
const UserModel = require("../models/User/Auth.Schema");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.chat_token || req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", status: false });
    }
    const DecodeToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decodetoken",DecodeToken)
    if (DecodeToken) {
      const user = await UserModel.findById(DecodeToken?._id);
      if (!user) {
        console.log("hi")
        return res.status(401).json({ message: "Unauthorized", status: false });
      }
      req.userId = DecodeToken._id;
      req.profile = DecodeToken;
      next();
    }
    else{
        return res.status(401).json({ message: "Unauthorized", status: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AuthMiddleware;
