const mongoose = require("mongoose")
const ChatSchema = new mongoose.Schema({
    chatName : {type : String , trim : true},
    isGroupChat : {
        type : Boolean , default : false
    },
    user : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
    lastestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
    },
    groupAdmin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps:true , versionKey:false})

const ChatModel = mongoose.model("Chat",ChatSchema)
module.exports = ChatModel;