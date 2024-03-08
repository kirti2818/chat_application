const { ALERT, REFETCH_CHATS } = require("../../../constants/events");
const ChatModel = require("../../../models/Chat/Chat.Schema");
const { emitEvents } = require("../../../utils/features");

const NewGroupChat = async (req, res) => {
  const { chatName, members } = req.body;
  const userId = req.userId;
 
  try {
    if (members.length < 2 || members.includes(userId)) {
      return res.status(400).json({
        message: "Group Members should be more than 2",
        status: false,
      });
    }

    let Allmembers = [...members, userId];
    const CreateGroupChat = new ChatModel({
      chatName,
      isGroupChat: true,
      members : Allmembers,
      groupAdmin: userId,
    });
    await CreateGroupChat.save();
     await emitEvents(req, ALERT, Allmembers, `Welcome to Group ${chatName}`);
     await emitEvents(req, REFETCH_CHATS, members);

    

    return res.status(200).json({ message: "Group Created", status: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = NewGroupChat;
