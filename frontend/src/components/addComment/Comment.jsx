import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getCommentsByPost
} from '../../config/redux/action/postAction'
import './Comment.css'

export const Comment = ({ post }) => {

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [comment, setComment] = useState('');

  const { comments, isCommentsLoading } = useSelector((state) => state.posts);

  // Fetch comments when this component opens
  useEffect(() => {
    dispatch(getCommentsByPost(post._id));
  }, [dispatch, post._id]);


  const handleComment = () => {
    

    if (!comment.trim()) return;

    dispatch(
      addComment({
        token,
        post_id: post._id,
        comment: comment.trim()
      })
    );

    setComment('');
  };


  return (
    <div className="comment-section">

      <div className="comment-input">

        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleComment}>
          Comment
        </button>

      </div>


      <div className="comments">

        {isCommentsLoading ? (
          <p>Loading comments...</p>
        ) : comments?.length > 0 ? (

          comments.map((comment) => (

            <div
              className="comment"
              key={comment._id}
            >

              <strong>
                {comment.userId?.name}
              </strong>

              <p>
                {comment.text}
              </p>

            </div>

          ))

        ) : (

          <p>No comments yet.</p>

        )}

      </div>

    </div>
  )
}