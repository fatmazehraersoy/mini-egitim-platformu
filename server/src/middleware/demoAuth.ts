import {
  type NextFunction,
  type Request,
  type Response,
} from "express"

import { prisma } from "../lib/prisma.js"

export async function demoAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userId = request.get(
    "x-demo-user-id"
  )

  if (!userId) {
    response.status(401).json({
      message:
        "Demo kullanıcı bilgisi bulunamadı.",
    })
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    response.status(401).json({
      message:
        "Demo kullanıcı bulunamadı.",
    })
    return
  }

  response.locals.user = user

  next()
}