const UserModel = require("../../models/User/Auth.Schema");

const LoginController = async(req,res)=>{
    const {email,user_name} = req.body;
    try {
        const findUser_name = await UserModel.findOne({user_name});
        const findEmail = await UserModel.findOne({email});
        if(findUser_name){
            return res.status(400).json({message: "User Name already exists"});
        }
        if(findEmail){
            return res.status(400).json({message: "Email already exists"});
        }
        const login = await UserModel.findOne({user_name,password})
        return res.status(200).json({message: "User Created Successfully"});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

mocule.exports = LoginController;