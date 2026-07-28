import type {
  Lesson,
  Question,
  User,
} from "../types"

export const users: User[] = [
  {
    id: "user-1",
    name: "Zehra Öğretmen",
    role: "teacher",
  },
  {
    id: "user-2",
    name: "Ayşe",
    role: "student",
  },
  {
    id: "user-3",
    name: "Mehmet",
    role: "student",
  },
]

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Kesirler",
    subject: "math",
    grade: 6,
    description: "Kesirlerde toplama ve çıkarma işlemleri.",
    teacherId: "user-1",
  },
  {
    id: "lesson-2",
    title: "Güneş Sistemi",
    subject: "science",
    grade: 6,
    teacherId: "user-1",
  },
  {
    id: "lesson-3",
    title: "Simple Present Tense",
    subject: "english",
    grade: 6,
    description: "Simple Present Tense temel kullanımı.",
    teacherId: "user-1",
  },
]

export const questions: Question[] = [
  {
    id: "question-1",
    lessonId: "lesson-1",
    studentId: "user-2",
    content: "Paydaları neden eşitliyoruz?",
    status: "pending",
  },
  {
    id: "question-2",
    lessonId: "lesson-2",
    studentId: "user-3",
    content: "En büyük gezegen hangisidir?",
    status: "answered",
  },
  {
    id: "question-3",
    lessonId: "lesson-3",
    studentId: "user-2",
    content: "Do ve does arasındaki fark nedir?",
    status: "escalated",
  },
]