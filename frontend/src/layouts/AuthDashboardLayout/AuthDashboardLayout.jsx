import React from 'react'
import { Outlet } from 'react-router-dom'
import './AuthDashboardLayout.css'
import { Logo } from '../../components/logo/Logo'
export const AuthDashboardLayout = () => {
  return (
      <div className="auth-layout">
      <Logo/>
      <Outlet />
    </div>
  )
}
