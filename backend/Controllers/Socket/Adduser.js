const SocketModel = require("../../models/Socket/Socket.Schema");

const AddAndUpdateSocket = async (userId, socket) => {
  console.log("SOCKET ID", socket.id, userId);
  try {
    const FindSocket = await SocketModel.findOne({ userId: userId });
    console.log("FIND SOCKET",FindSocket)
    if (FindSocket) {
      console.log("HERE");
      const UpdateSocket = await SocketModel.findOneAndUpdate(
        { userId: userId },
        { socketId: socket.id, socketStatus: true },
        { upsert: true, new: true }
      );
      return "Socket Id Updated";
    } else {
      const CreateSocket = await SocketModel.create({
        userId,
        socketId: socket.id,
        socketStatus: true,
      });
      return "Socket Id Created";
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = AddAndUpdateSocket;
