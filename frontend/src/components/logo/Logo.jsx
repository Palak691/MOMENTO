import React from 'react'
import { useDispatch } from 'react-redux'
import logo from '../../assets/logo.jpeg'
import './Logo.css'
import { useNavigate } from 'react-router-dom'
export const Logo = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
     <header className="auth-header" onClick={()=>nav('/')}>
            <div className='momento-logo'>
            <div className="logo">
            <img src={logo} alt='logo' />
            </div>
            <p className="auth-logoname">MOMENTO</p>
            </div>
            <p className="auth-tagline">Share the moments that matter</p>
          </header>
  )
}
