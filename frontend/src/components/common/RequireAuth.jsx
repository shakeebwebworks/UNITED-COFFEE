import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="uc-container uc-empty"><p>Loading...</p></div>; if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return children
}