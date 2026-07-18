import { useAuth } from '../context/AuthProvider'
import React from 'react'

const Profile = () => {
  const {user} = useAuth()
  return (
    <div>Hello {user.username}</div>
  )
}

export default Profile