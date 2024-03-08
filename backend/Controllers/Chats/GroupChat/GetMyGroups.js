const ChatModel = require("../../../models/Chat/Chat.Schema");
const { ObjectId } = require("mongodb");

const GetMyGroups = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  try {
    const pipeline = [
      {
        $match: {
          groupAdmin: new ObjectId(userId),
          isGroupChat: true,
          members: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          let: { members: "$members" }, // define variables for use in pipeline
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$members"], // filter users based on member IDs
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                avatar: 1,
              },
            },
          ],
          as: "members",
        },
      },
      {
        $group: {
          _id: "$_id",
          avatar: { $first: "$members.avatar_url" },
          data: { $first: "$$ROOT" },
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

module.exports = GetMyGroups;
