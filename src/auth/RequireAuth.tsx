import { Navigate, useLocation } from 'react-router-dom'
import type { Role } from '../types'
import { useAuth } from './AuthContext'

export function RequireAuth({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: Role[]
}) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (roles && !roles.includes(user.role)) {
    const fallback = user.role === 'admin' ? '/admin' : '/app'
    return <Navigate to={fallback} replace />
  }

  return children
}
