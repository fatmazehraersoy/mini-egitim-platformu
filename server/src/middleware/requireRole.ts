import {
  type NextFunction,
  type Request,
  type Response,
} from "express"

type UserRole = "teacher" | "student"

export function requireRole(
  allowedRole: UserRole
) {
  return (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = response.locals.user

    if (!user) {
      response.status(401).json({
        message:
          "Kullanıcı bilgisi bulunamadı.",
      })
      return
    }

    if (user.role !== allowedRole) {
      response.status(403).json({
        message:
          "Bu işlem için yetkiniz yok.",
      })
      return
    }

    next()
  }
}