const LogoutController = async(req,res)=>{
    try {
    return res.status(200).cookie("chat_token","",{maxAge : 0 ,  httpOnly: true}).json({message : "Logout Successfully",status : true})
    } catch (error) {
        return res.status(400).json({message : error.message , status : false})
    }
}

module.exports = LogoutController;