import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

const dashboardPath = {
  admin: '/admin/dashboard',
  user: '/dashboard',
}

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate replace to={dashboardPath[user?.role] || '/login'} />
  }

  return <Outlet />
}

export default ProtectedRoute
