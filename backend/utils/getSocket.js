const ChatModel = require("../models/Chat/Chat.Schema");
const SocketModel = require("../models/Socket/Socket.Schema");
const { ObjectId } = require("mongodb");

const GetSockets = async (data) => {
    const {chatId , recepientIds,sender} = data
  let userIdsSockets = [];
  if (!chatId) {
    return "Chat Id is not defined";
  }

//   const pipeline = [
//     {
//       $match: {
//         _id: new ObjectId(data?.chatId),
//         members: new ObjectId(data?.sender),
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         let: { membersId: "$members", isGroupChat: "$isGroupChat" },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $in: ["$_id", "$$membersId"],
//               },
//             },
//           },

//           {
//             $project: {
//               _id: 1,
//               //   name: 1,
//               //   email: 1,
//               //   avatar: 1,
//               //   isGroupChat: 1,
//             },
//           },
//         ],
//         as: "members",
//       },
//     },

//     {
//       $addFields: {
//         members: {
//           $cond: {
//             if: { $eq: ["$isGroupChat", false] },
//             then: {
//               $filter: {
//                 input: "$members",
//                 as: "member",
//                 cond: { $ne: ["$$member._id", new ObjectId(data?.sender)] },
//               },
//             },
//             else: "$members",
//           },
//         },
//       },
//     },

//     {
//       $group: {
//         _id: "$_id",
//         avatar: { $first: "$members.name" },
//         data: { $first: "$$ROOT" },
//       },
//     },
//     {
//       $replaceRoot: {
//         newRoot: {
//           $mergeObjects: ["$data", { avatar: "$avatar" }],
//         },
//       },
//     },
//   ];

//   const findChatMember = await ChatModel.aggregate(pipeline);
 
  for (let i = 0; i < recepientIds?.length; i++) {
    const findSocket = await SocketModel.findOne({ userId: recepientIds[i]?._id });
    console.log(findSocket,"FIND SOCKET");
    userIdsSockets.push(findSocket?.socketId);
  }
  return userIdsSockets;
};
module.exports = GetSockets;
