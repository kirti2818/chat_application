const SocketModel = require("../../models/Socket/Socket.Schema");

const DeleteUserFromSocket = async (socket) => {
  console.log("SOCKET ID", socket);
  try {
    const DeleteSocket = await SocketModel.findOneAndDelete({
      socketId: socket,
    });
    return "Socket Id Stored";
  } catch (error) {
    return error.message;
  }
};

module.exports = DeleteUserFromSocket;
