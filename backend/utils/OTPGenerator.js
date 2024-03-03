const otpGenerator = require('otp-generator')

const OTPGenerator = async()=>{
    const Otp = otpGenerator.generate(4, {digits:true, upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    return Otp;

}

module.exports = OTPGenerator;