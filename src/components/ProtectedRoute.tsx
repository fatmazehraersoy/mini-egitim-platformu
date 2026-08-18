import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
  allowedRole: "teacher" | "student"
  children: ReactNode
}

function ProtectedRoute({
  allowedRole,
  children,
}: ProtectedRouteProps) {
  const userId =
    localStorage.getItem("demoUserId")

  const userRole =
    localStorage.getItem("demoUserRole")

  if (!userId || !userRole) {
    return <Navigate to="/login" replace />
  }

  if (userRole !== allowedRole) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute