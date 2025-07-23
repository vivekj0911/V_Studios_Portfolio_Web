// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken") !== null

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute
