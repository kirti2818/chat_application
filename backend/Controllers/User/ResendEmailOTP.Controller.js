const dayjs = require("dayjs");
const OtpModel = require("../../models/User/Otp.Schema");
const OTPGenerator = require("../../utils/OTPGenerator");
const SendMailController = require("../../utils/SendMailController");


const ResendEmailOTP = async (req, res) => {
    const {email,_id : userId} = req.profile;
  try {
    const deleteAllExistingOTPs = await OtpModel.deleteMany({ userId });
    const Otp = await OTPGenerator();
    const expiryDate = dayjs().add(10, "minute");

    const SaveOtp = new OtpModel({
      email,
      Otp,
      userId,
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
    return res.status(200).json({message : "Resend OTP !",status : true})
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = ResendEmailOTP;
