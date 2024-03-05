const dayjs = require("dayjs");
const OtpModel = require("../../models/User/Otp.Schema");
const UserModel = require("../../models/User/Auth.Schema");

const VerifyEmail = async (req, res) => {
  const { otp } = req.body;
  const { _id: userId } = req.profile;
//   console.log(userId);
  try {
    const findOTP = await OtpModel.findOne({ userId, Otp: otp });
    if (findOTP) {
      const todayDate = dayjs().format();
      const expiryDate = dayjs(findOTP?.expiryDate).format();
    //   console.log("TODAY DATE", todayDate, expiryDate);
      if (todayDate > expiryDate) {
        console.log("expired");
        return res
          .status(400)
          .json({ message: "OTP expired , Resend Otp", status: false });
      }
      const deleteAllOTPs = await OtpModel.deleteMany({userId})
      const updateUser = await UserModel.findOneAndUpdate({_id : userId},{emailVerified : true})
      return res.status(200).json({ message: "Verified Successfully !", status: true });
    } else {
      return res.status(400).json({ message: "Wrong Otp", status: false });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = VerifyEmail;
