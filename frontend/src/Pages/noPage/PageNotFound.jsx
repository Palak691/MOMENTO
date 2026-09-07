import React from 'react'
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css'
export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>

      <button onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  )
}
