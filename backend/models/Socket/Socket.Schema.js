const mongoose = require("mongoose");

const SocketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    socketId: {
      type: String,
      required: true,
    },
    socketStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
const SocketModel = mongoose.model("socket", SocketSchema);
module.exports = SocketModel;
