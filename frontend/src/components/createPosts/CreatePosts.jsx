import React, { useEffect, useState } from 'react'
import './CreatePosts.css'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPosts } from '../../config/redux/action/postAction';
import { useNavigate } from 'react-router-dom';
export const CreatePosts = () => {
    const {token} = useSelector((state)=>state.auth);
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
     useEffect(() => {
    if (!image) {
      setImagePreview(null)
      return
    }

    const previewUrl = URL.createObjectURL(image)
    setImagePreview(previewUrl)

    // Clean up URL
    return () => URL.revokeObjectURL(previewUrl)

  }, [image])


   useEffect(() => {
    if (!token) {
      nav('/login');
    }
  }, [token, nav]);


async function handleSubmit(e){
    e.preventDefault();
    setMessage('');
   const payload = new FormData()
  if (text.trim()) {
      payload.append('content', text);
    }

    if (image) {
      payload.append('postImg', image);
    }

  const result = await dispatch(createPost({token,payload}));
  if(createPost.fulfilled.match(result)){
   setText('');
   setImage(null);
   setMessage('Post uploaded successfully!')
   // Remove message after 3 seconds
      setTimeout(() => {
        setMessage('')
      }, 3000)

      await dispatch(getAllPosts())
  }


}

  return (
   <div className='create-PostContainer'>
      <div className="post-header">
        <p>Create Post</p>

        <div className='text-container'>
          <textarea name='text' value = {text} onChange={(e)=> setText(e.target.value)}
            placeholder='Capture a moment, share the feeling...'
          ></textarea>
        </div>
         {imagePreview && (
          <div className="image-preview">

            <img
              src={imagePreview}
              alt="Selected post"
            />

            <button
              type="button"
              className="remove-image"
              onClick={() => setImage(null)}
            >
              ×
            </button>

          </div>
        )}

        <div className='select'>
          <div className="select-img">
            <label htmlFor="post-image" className="image-upload">
              +
            </label>

            <input
              type="file"
              id="post-image"
              accept="image/*"
              name='postImg'
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </div>

          <button className="postBtn"  onClick={handleSubmit}>Post</button>
        </div>
        {/* SUCCESS MESSAGE */}
        {message && (
          <p className="post-success">
            {message}
          </p>
        )}
      </div>
    </div>
  )
  
}




