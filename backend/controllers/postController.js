import Post from "../models/postModel.js";
import ExpressErr from "../utils/ExpressErr.js";

function encodeCursor(createdAt, id) {

  const cursorObject = {
    createdAt: createdAt.toISOString(), 
    id: id.toString(),                  
  };
  const jsonString = JSON.stringify(cursorObject);
  const base64Cursor = Buffer.from(jsonString, "utf8").toString("base64url");
  return base64Cursor;
}


function decodeCursor(cursorString) {
try{
    const jsonString = Buffer.from(cursorString, "base64url").toString("utf8");
    const cursorObject = JSON.parse(jsonString);
    return {
      createdAt: new Date(cursorObject.createdAt),
      id: cursorObject.id,                          
    };
}catch{
    return null;
}}


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
export const getAllPosts = async (req, res) => {
    const requestedLimit = Number(req.query.limit);
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0 ?
        Math.min(requestedLimit, 5) : 5;
    const { cursor, search } = req.query;

    let filter = {};
    if (search) {
        filter.content = { $regex: search, $options: "i" };
    }
    if (cursor) {
        const decodedCursor = decodeCursor(cursor);
        if (decodedCursor === null) {
            return res.status(400).json({ message: "Invalid Cursor" });
        }
        filter.$or = [
            { createdAt: { $lt: decodedCursor.createdAt } },
            { createdAt: decodedCursor.createdAt, _id: { $lt: decodedCursor.id } }
        ];
    }

    const fetchedDocs = await Post.find(filter)
        .populate("userId", "name email profilePicture")
        .sort({ createdAt: -1, _id: -1 })
        .limit(limit + 1)
        .lean();

    const hasMorePosts = fetchedDocs.length > limit;
    const postsToReturn = hasMorePosts ? fetchedDocs.slice(0, limit) : fetchedDocs;

    let nextCursor = null;
    if (hasMorePosts && postsToReturn.length > 0) {
        const lastPost = postsToReturn[postsToReturn.length - 1];
        nextCursor = encodeCursor(lastPost.createdAt, lastPost._id);
    }

    return res.json({
        hasMore: hasMorePosts,
        posts: postsToReturn,
        nextCursor: nextCursor
    });
};
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
    likesCount: post.likes.length,
    post
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
    likesCount: post.likes.length,
    post
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