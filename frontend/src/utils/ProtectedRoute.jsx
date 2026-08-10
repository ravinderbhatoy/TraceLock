import { useAuth } from '@/context/AuthProvider'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const stationOnly = ['/dashboard']
  const location = useLocation()
  const currentPath = location.pathname
  const { user, isStation } = useAuth()

  if (!user) {
    return <Navigate to="/signin" />
  }

  if (stationOnly.includes(currentPath) && !isStation) {
    return <Navigate to="/unauthorized" />
  }

  return <Outlet />
}

export default ProtectedRoute