import { useAuth } from '../context/AuthProvider'
import React from 'react'

const Profile = () => {
  const {user} = useAuth()
  return (
    <h1 className='text-2xl font-semibold text-blue-500 text-center'>Hello {user.username}</h1>
  )
}

export default Profile