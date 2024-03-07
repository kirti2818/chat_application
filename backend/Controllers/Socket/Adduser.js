const SocketModel = require("../../models/Socket/Socket.Schema");


const AddAndUpdateSocket = async(userId,socket)=>{
    console.log("SOCKET ID",socket.id,userId)
      try {
        const AddUser = await SocketModel.findOneAndUpdate({ _id: userId }, {userId, socketId: socket.id,socketStatus : true }, { upsert: true, new: true })
        return ("Socket Id Stored");
      } catch (error) {
        return error.message
      }
}

module.exports = AddAndUpdateSocket;