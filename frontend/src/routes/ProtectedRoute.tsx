import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { Role } from '../types/domain'
import { useAuth } from '../features/auth/hooks/useAuth'

const dashboardPath: Record<Role, string> = {
  admin: '/admin/dashboard',
  user: '/dashboard',
}

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: Role[] }) => {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  if (allowedRoles?.length && (!user?.role || !allowedRoles.includes(user.role))) {
    return <Navigate replace to={user?.role ? dashboardPath[user.role] : '/login'} />
  }

  return <Outlet />
}

export default ProtectedRoute
