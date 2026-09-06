import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel.js";

export const validateUser = async(req,res,next)=>{
    try{
   const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token required"
            });
        }

        const token = authHeader.split(" ")[1];

    const decoded = jsonwebtoken.verify(token,process.env.KEY);
     const user = await User.findById(decoded.userId);
         if (!user) {
            return res.status(404).json({message: "User not found" });
            }
        req.user = user;
        next();
    }catch(err){  
      console.log({message :err.message} )
       return res.status(401).json({message: "Invalid or expired token" });
    }
}