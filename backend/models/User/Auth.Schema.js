const mongoose = require("mongoose");

const User = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default : null
    },
    password: {
        type: String,
        required: true,
    },
    },{timestamps:true , versionKey:false});
    const UserModel = mongoose.model("User", User);
module.exports = UserModel;