import React, { useEffect, useState } from 'react'
import './AllFeeds.css'
import { PostActions } from '../postActions/PostActions'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../config/redux/action/postAction'
import { Comment } from '../addComment/Comment'
import { useNavigate } from 'react-router-dom'

export const AllFeeds = () => {
    const {posts ,isLoading} = useSelector((state)=>state.posts);
      const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const nav = useNavigate();
    useEffect(() => {  
     dispatch(getAllPosts())
    }, [dispatch])

    
 const [openComments, setOpenComments] = useState(null);
  
 const handleCommentClick = (postId) => {
    if (!token) {
    nav('/login');
    return;
  }
    setOpenComments(
      openComments === postId ? null : postId
    )
  }
  if(isLoading){
    return <p>Loading Posts..</p>

  }
  if(!posts || posts.length === 0){
    return <p>No Posts Yet..</p>
  }
  return (
     <div className='allFeedsContainer'>
      {posts.map((post) => (
        <div className='feedPost' key={post._id}>
          <div className="topContainer">
            <div className="userInfo">
              <p>{post.userId?.name}</p>
              <p>{post.userId?.email}</p>
              <p>
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            <button className='followBtn'>
              Follow
            </button>
            <button className="post-menu">
              <svg width="22" height="22"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>

          {/* POST CONTENT */}
          <div className="bottomContainer">
            <div className="userPosts">

  {post.content && (
    <div className="textContainer">
      <p>{post.content}</p>
    </div>
  )}

  {post.images && post.images.length > 0 && (
  <div className="imgContainer">
    <img src={post.images[0]} alt="Post" />
  </div>
)}

</div>
          </div>
          {/* LIKE / COMMENT /Share */}
          <PostActions post = {post}  onCommentClick={() => handleCommentClick(post._id)} />
          {openComments === post._id && (
            <Comment post={post} />
          )}
        </div>
      ))}

    </div>
  )
}
