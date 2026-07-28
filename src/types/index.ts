export interface User {
  id: string
  name: string
  role: "teacher" | "student"
}

export interface Course {
  id: string
  title: string
  subject: "math" | "science" | "english"
  grade: number
  teacherId: string
}

export interface Lesson {
  id: string
  title: string
  subject: "math" | "science" | "english"
  grade: number
  description?: string
  teacherId: string
}

export interface Question {
  id: string
  lessonId: string
  studentId: string
  content: string
  status: "pending" | "answered" | "escalated"
}

export interface Answer {
  id: string
  questionId: string
  content: string
  answeredBy: "ai" | "teacher"
}