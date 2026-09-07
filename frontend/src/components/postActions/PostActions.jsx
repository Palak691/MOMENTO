import React from 'react'
import './PostActions.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  incrementPostLikes,
  decrementPostLikes
} from '../../config/redux/action/postAction'

export const PostActions = ({ post, onCommentClick }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, user } = useSelector((state) => state.auth)

  const isLiked = post.likes?.some(
    (like) => like.toString() === user?._id?.toString()
  )

  const handleLike = async () => {

    if (!token) {
      navigate('/login')
      return
    }

    if (isLiked) {
      await dispatch(
        decrementPostLikes({
          token,
          post_id: post._id
        })
      )
    } else {
      await dispatch(
        incrementPostLikes({
          token,
          post_id: post._id
        })
      )
    }
  }

  const handleComment = () => {

    if (!token) {
      navigate('/login')
      return
    }

    onCommentClick()
  }

  return (
    <div className="post-actions">

      {/* LIKE */}
      <button
        className={`post-action ${isLiked ? 'liked' : ''}`}
        onClick={handleLike}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={isLiked ? "currentColor" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.8 8.7C20.8 13.6 12 20 12 20S3.2 13.6 3.2 8.7C3.2 5.9 5.3 4 7.8 4C9.5 4 11 4.9 12 6.2C13 4.9 14.5 4 16.2 4C18.7 4 20.8 5.9 20.8 8.7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>{post.likes?.length || 0}</span>
      </button>

      {/* COMMENT */}
      <button
        className="post-action"
        onClick={handleComment}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 11.5C20 15.6 16.4 19 12 19C10.9 19 9.8 18.8 8.8 18.4L4 20L5.3 16.2C4.5 14.9 4 13.3 4 11.5C4 7.4 7.6 4 12 4C16.4 4 20 7.4 20 11.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>{post.comments?.length || 0}</span>
      </button>

    </div>
  )
}

