import { useAuth } from '@/context/AuthProvider'
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user} = useAuth()
    if (!user) return <Navigate to="/signin"/>
  return <Outlet/>
}

export default ProtectedRoute