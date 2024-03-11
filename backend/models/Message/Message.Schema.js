const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  content: { type: String, required : true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User",required : true },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required : true
  },
  
},{timestamps:true , versionKey:false});

const MessageModel = mongoose.model("message", MessageSchema);
module.exports = MessageModel;
