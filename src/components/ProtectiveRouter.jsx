import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectiveRouter = ({children , user}) => {
  return user ? children : <Navigate to='/'></Navigate> 
}

export default ProtectiveRouter
