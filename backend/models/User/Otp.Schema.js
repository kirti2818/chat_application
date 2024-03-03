const mongoose = require("mongoose")

const OtpSchema = new mongoose.Schema({
    email : {type : String , required : true},
    Otp : {type : Number , required : true},
    expiryDate : {type : Date , required : true},
    createdBy : {type : String , required : true},

},{timestamps: true , versionKey : false})

const OtpModel = mongoose.model("otp",OtpSchema)

module.exports = OtpModel;