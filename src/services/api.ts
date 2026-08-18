const API_URL = import.meta.env.VITE_API_URL

function getDemoUserId() {
  return localStorage.getItem("demoUserId")
}

function getAuthHeaders() {
  const userId = getDemoUserId()

  return {
    "Content-Type": "application/json",
    ...(userId
      ? { "x-demo-user-id": userId }
      : {}),
  }
}

export type CourseResponse = {
  id: string
  title: string
  subject: "math" | "science" | "english"
  grade: number
  teacherId: string
}

export type LessonResponse = {
  id: string
  title: string
  content: string
  courseId: string
  course: CourseResponse
}

export type CreateLessonInput = {
  title: string
  content: string
  courseId: string
}

export async function getLessons(): Promise<
  LessonResponse[]
> {
  const response = await fetch(
    `${API_URL}/lessons`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Dersler şu anda yüklenemedi."
    )
  }

  return data
}

export async function getCourses(): Promise<
  CourseResponse[]
> {
  const response = await fetch(
    `${API_URL}/courses`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Kurslar şu anda yüklenemedi."
    )
  }

  return data
}

export async function createLesson(
  lesson: CreateLessonInput
): Promise<LessonResponse> {
  const response = await fetch(
    `${API_URL}/lessons`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(lesson),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Ders oluşturulamadı."
    )
  }

  return data
}

export type CreateQuestionInput = {
  lessonId: string
  content: string
}

export async function createQuestion(
  question: CreateQuestionInput
) {
  const response = await fetch(
    `${API_URL}/questions`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(question),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Soru gönderilemedi."
    )
  }

  return data
}

export async function getLessonById(
  lessonId: string
): Promise<LessonResponse> {
  const response = await fetch(
    `${API_URL}/lessons/${lessonId}`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Ders bilgileri alınamadı."
    )
  }

  return data
}

export type QuestionResponse = {
  id: string
  content: string
  status: "pending" | "answered" | "escalated"
  studentId: string
  lessonId: string

  student: {
    id: string
    name: string
    email: string
    role: "teacher" | "student"
  }

  answer: {
    id: string
    content: string
    source: "teacher" | "ai"
    questionId: string
  } | null
}

export async function getQuestions(): Promise<
  QuestionResponse[]
> {
  const response = await fetch(
    `${API_URL}/questions`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Sorular alınamadı."
    )
  }

  return data
}

export type CreateAnswerInput = {
  content: string
}

export type AnswerResponse = {
  id: string
  content: string
  source: "teacher" | "ai"
  questionId: string
}

export async function answerQuestion(
  questionId: string,
  answer: CreateAnswerInput
): Promise<AnswerResponse> {
  const response = await fetch(
    `${API_URL}/questions/${questionId}/answer`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(answer),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Soru cevaplanamadı."
    )
  }

  return data
}

export type MyQuestionResponse = {
  id: string
  content: string
  status: "pending" | "answered" | "escalated"
  studentId: string
  lessonId: string

  lesson: {
    id: string
    title: string
    content: string
    courseId: string
  }

  answer: {
    id: string
    content: string
    source: "teacher" | "ai"
    questionId: string
  } | null
}

export async function getMyQuestions(): Promise<
  MyQuestionResponse[]
> {
  const response = await fetch(
    `${API_URL}/my/questions`,
    {
      headers: getAuthHeaders(),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Sorularınız alınamadı."
    )
  }

  return data
}