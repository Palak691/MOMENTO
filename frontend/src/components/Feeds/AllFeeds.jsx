import './AllFeeds.css'
import { PostActions } from '../postActions/PostActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getAllPosts } from '../../config/redux/action/postAction'
import { Comment } from '../addComment/Comment'
import { useNavigate } from 'react-router-dom'

export const AllFeeds = () => {
    const { posts, isLoading, nextCursor, hasMore } = useSelector((state) => state.posts);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const observerRef = useRef(null);
    useEffect(() => {  
     dispatch(getAllPosts({}))
    }, [dispatch])


    const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || isFetchingMore || !nextCursor) return;
    setIsFetchingMore(true);
    await dispatch(getAllPosts({ cursor: nextCursor }));
    setIsFetchingMore(false);
}, [dispatch, hasMore, isLoading, isFetchingMore, nextCursor]);

const sentinelRef = useCallback((node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
    });
    if (node) observerRef.current.observe(node);
}, [isLoading, hasMore, loadMore]);
    
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
  console.log("posts from redux:", posts);
  return (
     <div className='allFeedsContainer'>
      {posts.map((post,i) => (
        <div className='feedPost' key={post._id} ref={i === posts.length - 3 ? sentinelRef : null}>
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
       {isFetchingMore && <p>Loading more....</p>}
      {!hasMore && posts.length > 0 && <p>No more posts</p>}
    </div>
  )
}
