const ChatModel = require("../../models/Chat/Chat.Schema");
const MessageModel = require("../../models/Message/Message.Schema");

const GetAllMessages = async()=>{
    const {chatId} = req.body;
    try {
        const findChat = await ChatModel.findById(chatId)
        if(!findChat){
          return ({message : "Chat Not Found" , status : false});
        }
        const getMessages = await MessageModel.find({chat : chatId})
        return ({message : "Get All Messages" , status : true});
        
    } catch (error) {
        return ({message : error.message , status : false}) ;
    }
}

module.exports = GetAllMessages;