const UserModel = require("../../models/User/Auth.Schema");

const LoginController = async(req,res)=>{
    const {email,user_name} = req.body;
    try {
        const findUser = await UserModel.findOne({user_name,password});
        
        if(!findUser){
            return res.status(400).json({message: "User Not Exist"});
        }
        if(findEmail){
            return res.status(400).json({message: "Email already exists"});
        }
        const login = await UserModel.findOne({user_name,password})
        return res.status(200).json({message: "User Login Successfully",status : true});
    } catch (error) {
        return res.status(400).json({message: error.message,status : false});
    }
}

module.exports = LoginController;