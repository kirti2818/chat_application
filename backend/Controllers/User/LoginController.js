const UserModel = require("../../models/User/Auth.Schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let cookieOption = { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true , secure: true,sameSite : "none" };
  try {
    const findUser = await UserModel.findOne({
      $or: [{ email }, { user_name: email }],
    });

    if (!findUser) {
      return res.status(400).json({ message: "User Not Exist" });
    }
    const comparePassword = await bcryptjs.compare(
      password,
      findUser?.password
    );
    console.log(comparePassword);
    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    let token = jwt.sign(
      {
        _id: findUser?._id,
        email: findUser?.email,
        user_name: findUser?.user_name,
        emailVerified: findUser?.emailVerified,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res
      .cookie("chat_token", token, cookieOption)
      .status(200)
      .json({
        message: findUser?.emailVerified
          ? "Login Successfully !"
          : "User Logged In Successfully ,Otp Has been send to your mail",
          data : findUser,
        status: true,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = LoginController;
