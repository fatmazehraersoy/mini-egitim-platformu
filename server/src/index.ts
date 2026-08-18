import cors from "cors"
import dotenv from "dotenv"

import { demoAuth } from "./middleware/demoAuth.js"
import { requireRole } from "./middleware/requireRole.js"

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express"

import { prisma } from "./lib/prisma.js"
import { getOpenAIClient } from "./lib/openai.js"

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json())

type CreateLessonBody = {
  title?: string
  content?: string
  courseId?: string
}

type CreateQuestionBody = {
  lessonId?: string
  content?: string
}

type QuestionStatusValue =
  | "pending"
  | "answered"
  | "escalated"

type UpdateQuestionStatusBody = {
  status?: QuestionStatusValue
}

type AiAnswerBody = {
  question?: string
  grade?: number
  subject?: "math" | "science" | "english"
  lessonContext?: string
}

type AnswerQuestionBody = {
  content?: string
}

class AppError extends Error {
  statusCode: number

  constructor(
    message: string,
    statusCode: number
  ) {
    super(message)
    this.statusCode = statusCode
  }
}

/*
  GET /health
  Backend'in çalışıp çalışmadığını kontrol eder.
*/
app.get(
  "/health",
  (_request, response) => {
    response.status(200).json({
      status: "ok",
      message: "Backend çalışıyor.",
    })
  }
)
app.get("/courses", async (_request, response, next) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    })

    response.status(200).json(courses)
  } catch (error) {
    next(error)
  }
})
/*
  GET /lessons
  PostgreSQL'deki bütün dersleri getirir.
*/
app.get(
  "/lessons",
  async (
    _request,
    response,
    next
  ) => {
    try {
      const lessons =
        await prisma.lesson.findMany({
          include: {
            course: true,
          },
          orderBy: {
            title: "asc",
          },
        })

      response.status(200).json(lessons)
    } catch (error) {
      next(error)
    }
  }
)
app.get("/questions", async (_request, response, next) => {
  try {
    const questions = await prisma.question.findMany({
      include: {
        student: true,
        lesson: true,
        answer: true,
      },
    })

    response.status(200).json(questions)
  } catch (error) {
    next(error)
  }
})

app.post(
  "/questions/:id/answer",
  demoAuth,
  requireRole("teacher"),
  async (
    request: Request<
      { id: string },
      unknown,
      AnswerQuestionBody
    >,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { content } = request.body ?? {}

      if (!content?.trim()) {
        next(
          new AppError(
            "Cevap metni boş bırakılamaz.",
            400
          )
        )
        return
      }

      const question =
        await prisma.question.findUnique({
          where: {
            id: request.params.id,
          },
          include: {
            answer: true,
          },
        })

      if (!question) {
        next(
          new AppError(
            "Cevaplanacak soru bulunamadı.",
            404
          )
        )
        return
      }

      if (question.answer) {
        next(
          new AppError(
            "Bu soru daha önce cevaplanmış.",
            409
          )
        )
        return
      }

      const answer = await prisma.answer.create({
        data: {
          content: content.trim(),
          source: "teacher",
          questionId: question.id,
        },
      })

      await prisma.question.update({
        where: {
          id: question.id,
        },
        data: {
          status: "answered",
        },
      })

      response.status(201).json(answer)
    } catch (error) {
      next(error)
    }
  }
)

app.get(
  "/my/questions",
  demoAuth,
  requireRole("student"),
  async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const student = response.locals.user

      const questions =
        await prisma.question.findMany({
          where: {
            studentId: student.id,
          },
          include: {
            lesson: true,
            answer: true,
          },
          orderBy: {
            id: "desc",
          },
        })

      response.status(200).json(questions)
    } catch (error) {
      next(error)
    }
  }
)
/*
  GET /lessons/:id
  PostgreSQL'den tek bir dersi getirir.
*/
app.get(
  "/lessons/:id",
  async (
    request: Request<{ id: string }>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const lesson =
        await prisma.lesson.findUnique({
          where: {
            id: request.params.id,
          },
          include: {
            course: {
              include: {
                teacher: true,
              },
            },
            questions: {
              include: {
                student: true,
                answer: true,
              },
            },
          },
        })

      if (!lesson) {
        next(
          new AppError(
            "Aradığınız ders bulunamadı.",
            404
          )
        )
        return
      }

      response.status(200).json(lesson)
    } catch (error) {
      next(error)
    }
  }
)

app.post(
  "/ai/answer",
  demoAuth,
  requireRole("student"),
  async (
    request: Request<
      Record<string, never>,
      unknown,
      AiAnswerBody
    >,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {
        question,
        grade,
        subject,
        lessonContext,
      } = request.body ?? {}

      if (
        !question?.trim() ||
        !grade ||
        !subject ||
        !lessonContext?.trim()
      ) {
        next(
          new AppError(
            "Soru, sınıf, ders alanı ve ders bağlamı zorunludur.",
            400
          )
        )
        return
      }

      if (question.trim().length > 1000) {
        next(
          new AppError(
            "Soru çok uzun. Lütfen daha kısa bir soru yazın.",
            400
          )
        )
        return
      }

      if (
        !["math", "science", "english"].includes(
          subject
        )
      ) {
        next(
          new AppError(
            "Geçersiz ders alanı.",
            400
          )
        )
        return
      }
const openai = getOpenAIClient()
      const aiResponse = await openai.responses.create({
  model: "gpt-5.6-terra",

  instructions: `
Sen ortaokul öğrencilerine yardımcı olan bir eğitim asistanısın.

- Öğrencinin sınıf seviyesine uygun konuş.
- Soruyu doğrudan geçiştirme.
- Küçük ve anlaşılır bir örnek kullan.
- Emin olmadığın bilgiyi uydurma.
- Öğrenciyi aşağılayan veya korkutan dil kullanma.
- Mümkün olduğunca verilen ders bağlamında kal.
`,

  input: `
Sınıf: ${grade}
Ders: ${subject}
Ders bağlamı: ${lessonContext}

Öğrencinin sorusu:
${question}
`,
})

response.status(200).json({
  answer: aiResponse.output_text,
})
    } catch (error) {
      next(error)
    }
  }
)
/*
  POST /lessons
  PostgreSQL'e yeni ders ekler.
*/
app.post(
  "/lessons",
  demoAuth,
  requireRole("teacher"),
  async (
    request: Request<
      Record<string, never>,
      unknown,
      CreateLessonBody
    >,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {
        title,
        content,
        courseId,
      } = request.body ?? {}

      if (
        !title?.trim() ||
        !content?.trim() ||
        !courseId?.trim()
      ) {
        next(
          new AppError(
            "Ders başlığı, içeriği ve kurs bilgisi zorunludur.",
            400
          )
        )
        return
      }

      const course =
        await prisma.course.findUnique({
          where: {
            id: courseId,
          },
        })

      if (!course) {
        next(
          new AppError(
            "Dersin ekleneceği kurs bulunamadı.",
            404
          )
        )
        return
      }

      const newLesson =
        await prisma.lesson.create({
          data: {
            title: title.trim(),
            content: content.trim(),
            courseId,
          },
          include: {
            course: true,
          },
        })

      response
        .status(201)
        .json(newLesson)
    } catch (error) {
      next(error)
    }
  }
)

/*
  POST /questions
  PostgreSQL'e yeni öğrenci sorusu ekler.
*/
app.post(
  "/questions",
  demoAuth,
  requireRole("student"),
  async (
    request: Request<
      Record<string, never>,
      unknown,
      CreateQuestionBody
    >,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { lessonId, content } =
  request.body ?? {}

const student = response.locals.user

      if (
        !lessonId?.trim() ||
        !content?.trim()
      ) {
        next(
          new AppError(
            "Ders ve soru metni zorunludur.",
            400
          )
        )
        return
      }

      const lesson =
  await prisma.lesson.findUnique({
    where: { id: lessonId },
  })
      if (!lesson) {
        next(
          new AppError(
            "Soru gönderilecek ders bulunamadı.",
            404
          )
        )
        return
      }


      
      const newQuestion =
        await prisma.question.create({
          data: {
            lessonId,
            studentId: student.id,
            content: content.trim(),
            status: "pending",
          },
          include: {
            lesson: true,
            student: true,
          },
        })

      response
        .status(201)
        .json(newQuestion)
    } catch (error) {
      next(error)
    }
  }
)

/*
  PATCH /questions/:id/status
  PostgreSQL'deki soru durumunu günceller.
*/
app.patch(
  "/questions/:id/status",
  demoAuth,
  async (
    request: Request<
      { id: string },
      unknown,
      UpdateQuestionStatusBody
    >,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { status } =
        request.body ?? {}

      const allowedStatuses:
        QuestionStatusValue[] = [
          "pending",
          "answered",
          "escalated",
        ]

      if (
        !status ||
        !allowedStatuses.includes(status)
      ) {
        next(
          new AppError(
            "Durum pending, answered veya escalated olmalıdır.",
            400
          )
        )
        return
      }

      const question =
        await prisma.question.findUnique({
          where: {
            id: request.params.id,
          },
        })

      if (!question) {
        next(
          new AppError(
            "Güncellenecek soru bulunamadı.",
            404
          )
        )
        return
      }

      const user = response.locals.user

if (
  user.role === "student" &&
  question.studentId !== user.id
) {
  next(
    new AppError(
      "Başka bir öğrencinin sorusunu değiştiremezsiniz.",
      403
    )
  )
  return
}

      const updatedQuestion =
        await prisma.question.update({
          where: {
            id: request.params.id,
          },
          data: {
            status,
          },
        })

      response
        .status(200)
        .json(updatedQuestion)
    } catch (error) {
      next(error)
    }
  }
)

/*
  Tanımlanmamış API adreslerini yakalar.
*/
app.use(
  (
    _request: Request,
    _response: Response,
    next: NextFunction
  ) => {
    next(
      new AppError(
        "İstediğiniz API adresi bulunamadı.",
        404
      )
    )
  }
)

/*
  Merkezi error middleware.
*/
app.use(
  (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    console.error(error)

    if (
      error instanceof SyntaxError &&
      "status" in error &&
      error.status === 400
    ) {
      response.status(400).json({
        message:
          "Gönderilen JSON verisi geçerli değil.",
      })
      return
    }

    if (error instanceof AppError) {
      response
        .status(error.statusCode)
        .json({
          message: error.message,
        })
      return
    }

    response.status(500).json({
      message:
        "Beklenmeyen bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.",
    })
  }
)

export { app }

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(
      `Backend http://localhost:${port} adresinde çalışıyor.`
    )
  })
}