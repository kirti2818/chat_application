const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "kirti8527260810@gmail.com",
      pass: "yuhjkeshuareille",
    },
  });

const SendMailController = async({MailOptions})=>{
    try {
        const SendMail = await transporter.sendMail({...MailOptions})
        console.log("Message sent: %s", SendMail.messageId);
        return  SendMail.messageId;
    } catch (error) {
      console.log(error.message);
        return error.message;
    }
}

module.exports = SendMailController;