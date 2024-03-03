const UserModel = require("../../models/User/Auth.Schema");
const OtpModel = require("../../models/User/Otp.Schema");
const OTPGenerator = require("../../utils/OTPGenerator");
const dayjs = require("dayjs");
const SendMailController = require("../../utils/SendMailController");

const SignUpController = async (req, res) => {
  const { email, user_name } = req.body;

  try {
    const findUser_name = await UserModel.findOne({ user_name });
    const findEmail = await UserModel.findOne({ email });
    if (findUser_name) {
      return res.status(400).json({ message: "User Name already exists" });
    }
    if (findEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const signup = new UserModel(req.body);
    await signup.validate();

    const Otp = await OTPGenerator();
    const expiryDate = dayjs().add(10, "minute");

    const SaveOtp = new OtpModel({
      email,
      Otp,
      createdBy: signup?._id,
      expiryDate,
    });
    await SaveOtp.validate();

    const MailOptions = {
      from: "kirti8527260810@gmail.com",
      to: email,
      subject: `Messenger Verification`,
      text: `Hii Your Verification Code is ${Otp}`,
    };

    const SendMail = await SendMailController({ MailOptions });
    await SaveOtp.save();
    await signup.save();
    return res
      .status(200)
      .json({
        message: "User Created Successfully Otp Has been send to your mail",
        status: true,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = SignUpController;
