const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema({
  Status: { type: String, enum : ["Pending","Accept","Reject"]},
  sender: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  
},{timestamps:true , versionKey:false});

const RequestModel = mongoose.model("message", RequestSchema);
module.exports = RequestModel;
