import React from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import { AuthDashboardLayout } from '../layouts/AuthDashboardLayout/AuthDashboardLayout'
import { Home } from '../Pages/Home';
import { Profile } from '../Pages/profile/Profile';
import { Login } from '../Pages/login/Login';
import { Signup } from '../Pages/signup/Signup';

const router = createBrowserRouter([
    {
       element : <AuthDashboardLayout/>,
       children : [
          {
            path : '/',
            element : <Home/>
          },
          {
           path : '/signup',
           element : <Signup/>
          },
          {
            path : '/login',
            element : <Login/>
          },
          {
            path : '/profile',
            element : <Profile/>
          }
       ]
      
    }

]);
export const AppRoute = () => {
  
  return (
  <RouterProvider router={router}/>
  )
}
