import React, { useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../config/redux/reducer/authReducer';

export const Navbar = () => {
   const {isLoading, user} = useSelector((state)=>state.auth); 
   const nav = useNavigate();
   const dispatch = useDispatch();

    const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token')
    await dispatch(reset())
    nav('/')
  }
 return (
    <nav className="navbar">

      {/* Left */}
      <div className="left">
        <div className="searchBox">
          <svg className="searchIcon"  xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
          <input type="text" placeholder="Search for users..."/>
        </div>
      </div>

      <div className="right">
        {user ? (
          <div className="profileSection">
            <button
              className="profileLink"
              onClick={() => setShowDropdown(!showDropdown)} >
              <svg width="22" height="22"  viewBox="0 0 24 24"  fill="none"  xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8"  r="3.5" stroke="currentColor" strokeWidth="1.8"/>
                <path
                  d="M5 20C5.8 16.5 8.3 14.5 12 14.5C15.7 14.5 18.2 16.5 19 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <p className="welcomeText">
               {user}
            </p>
            {showDropdown && (
              <div className="profile-dropdown">
                <p className="dropdown-user" onClick={() => nav('/profile')} >
               Welcome, {user}
                </p>
                <ul>
                  <li onClick={() => nav('/profile')}>
                    My Profile
                  </li>
                  <hr />
                  <li  className="logout" onClick={handleLogout} >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>) : (
          <div className="navLinks">
            <NavLink to="/login">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
