import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserAndPosts } from '../../config/redux/action/authAction'
import './Profile.css'
import { BackButton } from '../../components/backbutton/BackButton'

export const Profile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, user, posts } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (token) {
      dispatch(getUserAndPosts(token))
    }
  }, [token, dispatch])


  if (!token) {
    return (
      <div className="profile-login">
        <h2>Login to view your profile</h2>

        <button onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    )
  }

  
  const profileUser = user || posts?.[0]?.userId

  return (
    <main className="profile-page">
      <BackButton/>
      {/* PROFILE HEADER */}
      <section className="profile-header">

        <div className="profile-avatar">
          {profileUser?.profilePicture &&
          profileUser.profilePicture !== 'default.jpg' ? (
            <img
              src={profileUser.profilePicture}
              alt={profileUser.name}
            />
          ) : (
            <span>
              {profileUser?.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="profile-details">

          <h1>{profileUser?.name}</h1>

          <p className="profile-email">
            {profileUser?.email}
          </p>

          <div className="profile-stats">

            <div>
              <strong>{posts?.length || 0}</strong>
              <span>Posts</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Following</span>
            </div>

          </div>

        </div>

      

      </section>


      {/* USER POSTS */}
      <section className="profile-content">

        <h2>Your Moments</h2>

        {posts?.length === 0 ? (

          <div className="no-posts">
            <h3>No moments yet</h3>
            <p>
              You haven't shared anything yet.
            </p>
          </div>

        ) : (

          <div className="profile-posts">

            {posts?.map((post) => (

              <article
                className="profile-post"
                key={post._id}
              >

                {/* IMAGE */}
                {post.images?.length > 0 && (
                  <div className="profile-post-image">
                    <img
                      src={post.images[0]}
                      alt="Post"
                    />
                  </div>
                )}

                {/* TEXT */}
                {post.content && (
                  <div className="profile-post-text">
                    <p>{post.content}</p>
                  </div>
                )}

                {/* POST INFO */}
                <div className="profile-post-info">

                  <span>
                    ♥ {post.likes?.length || 0}
                  </span>

                  <span>
                    💬 {post.comments?.length || 0}
                  </span>

                  <span>
                    {new Date(
                      post.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  )
}
