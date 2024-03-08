const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  content: { type: String, trim: true },
  sender: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",required : true }],
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  
},{timestamps:true , versionKey:false});

const MessageModel = mongoose.model("message", MessageSchema);
module.exports = MessageModel;
