const UserModel = require("../../models/User/Auth.Schema");

const GetAllUsers = async (req, res) => {
  const query = req.query;
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $option: "i" } },
            { email: { $regex: req.query.search, $option: "1" } },
          ],
        }
      : {};
    const allUsers = await UserModel.find(keyword)
    return res.status(200).json({message : "Get All Users" , status : true, data : allUsers})
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GetAllUsers;