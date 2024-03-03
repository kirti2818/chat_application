const jwt = require("jsonwebtoken");


const AuthMiddleware = async(req,res)=>{
    try {
        const token = req.cookies.token || req.headers.authorization;
        if(!token){
            return res.status(401).json({message: "Unauthorized Access",status : false});
        }
        const DecodeToken = jwt.verify(token,process.env.SECRET_KEY)
        if(DecodeToken){

        }
        
    } catch (error) {

        return res.status(400).json({message: error.message,status : false});
    }
}

module.exports = AuthMiddleware;