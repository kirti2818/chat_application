const UserModel = require("../../models/User/Auth.Schema");

const GetMyData=async(req,res)=>{
    const userId = req.userId;

    try {
        const get = await UserModel.findById(userId)
        return res.status(200).json({message : "Get Data",data : get,status : true})
        
    } catch (error) {
        return res.status(400).json({message : error.message ,status : false})
    }
}

module.exports = GetMyData