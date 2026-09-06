import Post from "../models/postModel.js";
import ExpressErr from "../utils/ExpressErr.js";

export const createPost = async (req,res) =>{
       const {content} = req.body;
       if(!content && !req.file){
          throw new ExpressErr(400, "Post must contain text or an image");
       }
       const images = req.file ? req.file.path : [];
      
         const newPost = await Post.create({
               userId : req.user._id,
              content,
              images
          });
        return res.status(201).json({message : "New Post Created!",post : newPost});

}
export const getAllPosts = async (req,res) =>{
       const allPosts = await Post.find({}).populate("userId","name email profilePicture").sort({createdAt : -1 });
        return res.status(200).json({allPosts});
       
}
export const getUserAllPosts = async(req,res)=>{

         const userPosts = await Post.find({userId: req.user._id })
        .populate("userId", "name email profilePicture")
        .sort({ createdAt: -1 });

        return res.status(200).json({ posts: userPosts });
    
}

export const addComments = async (req,res) =>{
        const { post_id } = req.params;
        const { text } = req.body;

  if (!text || text.trim() === "") {
    throw new ExpressErr(400, "Comment cannot be empty");
  }

  const post = await Post.findById(post_id);

  if (!post) {
    throw new ExpressErr(404, "Post not found");
  }

  const comment = {
    userId: req.user._id,
    text: text.trim()
  };

  post.comments.push(comment);

  await post.save();

  return res.status(201).json({
    message: "Comment added",
    comment: post.comments[post.comments.length - 1]
  });

   
}
export const likePost = async (req, res) => {
  const { post_id } = req.params;

  const post = await Post.findById(post_id);

  if (!post) {
    throw new ExpressErr(404, "Post not found");
  }

  post.likes.addToSet(req.user._id);

  await post.save();

  return res.status(200).json({
    message: "Post liked",
    likesCount: post.likes.length
  });
};


export const unlikePost = async (req, res) => {
  const { post_id } = req.params;

  const post = await Post.findById(post_id);

  if (!post) {
    throw new ExpressErr(404, "Post not found");
  }

  post.likes.pull(req.user._id);

  await post.save();

  return res.status(200).json({
    message: "Post unliked",
    likesCount: post.likes.length
  });
};

export const getCommentsByPost = async (req, res) => {
  const { post_id } = req.params;

  const post = await Post.findById(post_id)
    .populate("comments.userId", "name email profilePicture");

  if (!post) {
    throw new ExpressErr(404, "Post not found");
  }

  return res.status(200).json({
    comments: post.comments
  });
};