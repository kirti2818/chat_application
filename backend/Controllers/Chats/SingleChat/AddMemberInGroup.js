const { REFETCH_CHATS, ALERT } = require("../../../constants/events");
const ChatModel = require("../../../models/Chat/Chat.Schema");
const { emitEvents } = require("../../../utils/features");

const AddMemberInGroup = async (req, res) => {
  const { chatId, members } = req.body;
  try {
    const chat = await ChatModel.findById(chatId);
    const exists = members.some(id => chat?.members.includes(id));
    console.log(exists)
    if(exists){
      return res.status(400).json({ message: "Member Already Added", status: false });
    }
    if (!chat || !chat.isGroupChat || members.includes(req.userId) )  {
      return res.status(400).json({ message: "Chat Not Found", status: false });
    }
    if (chat.groupAdmin.toString() !== req.userId.toString()) {
      return res
        .status(400)
        .json({ message: "Admin Can Add Participants Only", status: false });
    }

    // if(chat.members.length >= 10){
    //     return res.status(400).josn({ message: "Group Limit Reached", status: false });
    // }
    const AddMemberInChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { $push: { members } },
      { new: true }
    );
    await emitEvents(req, ALERT, `Welcome to Group ${chatName}`);
     await emitEvents(req, REFETCH_CHATS, members);
    return res.status(200).json({ message: "Member Added", status: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = AddMemberInGroup;
