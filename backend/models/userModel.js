import mongoose from "mongoose";
import Post from "./postModel.js";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required :  true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
   
    password : {
       type : String,
       required:  true,
       select : false
    },
  
    profilePicture : {
        type : String,
        default : "default.jpg"
    },
  
     
},{timestamps : true})




userSchema.post('findOneAndDelete',async function(deletedUser){
 if(!deletedUser) return;
 const userId = deletedUser._id;
 await Post.deleteMany({userId})
});


const User = mongoose.model("User" , userSchema);
export default User;
