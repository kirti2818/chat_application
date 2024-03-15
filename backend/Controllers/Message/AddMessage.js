const ChatModel = require("../../models/Chat/Chat.Schema");
const MessageModel = require("../../models/Message/Message.Schema");

const AddMessage = async (data) => {
  const { chatId, content, sender } = data;
  try {
    const findChat = await ChatModel.findById(chatId);
    if (!findChat) {
      console.log("Chat Not Found !!");
      return null;
    }
    const AddNewMessage = await MessageModel.create({
      content,
      sender,
      chat: chatId,
    });

    const AddLastMessageToChat = await ChatModel.findByIdAndUpdate(chatId,{latestMessage : AddNewMessage?._id},{new : true})
    return true;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = AddMessage;
