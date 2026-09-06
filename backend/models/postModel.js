import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    content : {
     type : String,
     required : true,
     maxlength : 1200 
    },
    images: [{
      type : String,
      trim : true,
     }],
     likes : [
       {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
       },   
     ],
     comments : [{
       userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
       },
       text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
 
     
},{timestamps : true})


postSchema.index({ createdAt: -1,_id : -1 })


const Post = mongoose.model("Post" , postSchema);
export default Post;
