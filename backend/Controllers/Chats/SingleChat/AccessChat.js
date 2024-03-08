const ChatModel = require("../../../models/Chat/Chat.Schema");

const AccessChat = async (req, res) => {
  const userId  = req.userId;
  const { OtherMemberId } = req.body;
  console.log(OtherMemberId,userId)
  try {
    if(userId.toString() === OtherMemberId.toString()){
        return res
        .status(200)
        .json({ message: "You Can't create and access chat with yourself", status: false });
    }
    
    const findChat = await ChatModel.findOne({
      isGroupChat: false,
      members: { $all: [userId, OtherMemberId] }
    });
    if (findChat) {
      return res
        .status(200)
        .json({ message: "Chat Access", status: true, data: findChat });
    }
    const CreateChat = await ChatModel.create({
      chatName: "sender",
      isGroupChat: false,
      members: [userId, OtherMemberId],
    });
    return res.status(200).json({message : "Chat Created And Access Successfully",data : CreateChat,status : true})
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AccessChat;
