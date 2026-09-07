import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import ExpressErr from '../utils/ExpressErr.js';

export const register = async (req,res)=>{

        const {name,email,password} = req.body;
        if(!name || !email ||!password){
            throw new ExpressErr(400, 'All Fields Are Required');
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existsEmail = await User.findOne({email : normalizedEmail});
        if(existsEmail){
            throw new ExpressErr(400, 'Email Already Exists');
            
        }
        const hashedPassword = await bcrypt.hash(password,8);
        //salt rounds It controls how much computational work bcrypt performs.
        const newUser = await User.create({
            name : name.trim(),
            email :normalizedEmail,
            password : hashedPassword,
        })
        return res.status(201).json({message:"Registered Sucessfully"});
    

}

export const login = async  (req,res)=>{
     const {email, password} = req.body;
    if(!email || !password){
        throw new ExpressErr(400, 'Email and Password Are Required');
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existsUser = await User.findOne({ email: normalizedEmail }).select("+password");
    if(!existsUser){
        throw new ExpressErr(400, 'User not found!');
    }
    
    const isMatched = await bcrypt.compare(password, existsUser.password);
    if(!isMatched){
        throw new ExpressErr(400, 'Password or email is invalid');
    }
    let payload  = {userId : existsUser._id, email : existsUser.email}
    const token = jwt.sign(payload, process.env.KEY, {expiresIn:"7d"});
    return res.status(200).json({message : "Login Successfully!!" , token : token, user : {
         _id: existsUser._id,
        name: existsUser.name,
        email: existsUser.email,
        profilePicture: existsUser.profilePicture
    } });

    
}

                                 
export const uploadProfilePicture = async (req,res) =>{
        req.user.profilePicture = req.file.path;
        await req.user.save();
        return res.status(200).json({message : "Profile Picture Saved!"});
}




export const getUserAndPosts =  async (req,res) =>{
 const userPosts = await Post.find({
    userId: req.user._id
  })
    .populate('userId', 'name email profilePicture')
    .sort({ createdAt: -1 })

  return res.status(200).json({
    user: req.user,
    posts: userPosts
  })
}

