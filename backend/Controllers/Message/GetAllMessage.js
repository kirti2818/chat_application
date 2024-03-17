const ChatModel = require("../../models/Chat/Chat.Schema");
const MessageModel = require("../../models/Message/Message.Schema");

const GetAllMessages = async(req,res)=>{
    const chatId = req.params.chatId;
    console.log(chatId)
    try {
        const findChat = await ChatModel.findById(chatId)
        if(!findChat){
          return ({message : "Chat Not Found" , status : false});
        }
        const getMessages = await MessageModel.find({chat : chatId})
       return res.status(200).json({message : "Get All Messages" , status : true,data : getMessages});
        
    } catch (error) {
        return res.status(400).json({message : error.message , status : false}) ;
    }
}

module.exports = GetAllMessages;