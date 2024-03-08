const ChatModel = require("../../../models/Chat/Chat.Schema");
const { ObjectId } = require("mongodb");

const GetSingleChat = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const pipeline = [
      {
        $match: {
          members: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          let: { membersId: "$members" ,isGroupChat : "$isGroupChat"},
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$membersId"],
                },
              },
            },
            
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                avatar: 1,
                isGroupChat: 1,
              },
            },
          
          ],
          as: "members",
        },
      },

      {
        $addFields: {
          members: {
            $cond: {
              if: { $eq: ["$isGroupChat", false] },
              then: {
                $filter: {
                  input: "$members",
                  as: "member",
                  cond: { $ne: ["$$member._id", new ObjectId(userId)] },
                },
              },
              else: "$members",
            },
          },
        },
      },
     
      {
        $group: {
          _id: "$_id",
          avatar: { $first: "$members.name" },
          data: { $first: "$$ROOT" }
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$data",
              { avatar: "$avatar" } 
            ]
          }
        }
      }
    ];
    const MyGroups = await ChatModel.aggregate(pipeline);
    return res
      .status(200)
      .json({ message: "Get My Groups", status: true, data: MyGroups });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetSingleChat;
