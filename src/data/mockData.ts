import type {
  Lesson,
  Question,
  User,
} from "../types"

export const users: User[] = [
  {
    id: "teacher-1",
    name: "Ayşe Yılmaz",
    role: "teacher",
  },
  {
    id: "student-1",
    name: "Ece Demir",
    role: "student",
  },
  {
    id: "student-2",
    name: "Mert Kaya",
    role: "student",
  },
  {
    id: "student-3",
    name: "Zeynep Arslan",
    role: "student",
  },
]

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Kesirlerde Dört İşlem",
    subject: "math",
    grade: 6,
    description:
      "Kesirlerde toplama, çıkarma, çarpma ve bölme işlemlerinin örneklerle anlatımı.",
    estimatedDuration: 40,
    isPublished: true,
    teacherId: "teacher-1",
  },
  {
    id: "lesson-2",
    title: "Kuvvet ve Hareket",
    subject: "science",
    grade: 7,
    description:
      "Kuvvetin cisimler üzerindeki etkileri ve hareket çeşitleri incelenecek.",
    estimatedDuration: 45,
    isPublished: true,
    teacherId: "teacher-1",
  },
  {
    id: "lesson-3",
    title: "Daily Routines",
    subject: "english",
    grade: 5,
    description:
      "Günlük yapılan aktivitelerle ilgili İngilizce kelime ve cümle çalışması.",
    estimatedDuration: 30,
    isPublished: false,
    teacherId: "teacher-1",
  },
  {
    id: "lesson-4",
    title: "Cebirsel İfadeler",
    subject: "math",
    grade: 7,
    description:
      "Değişken, katsayı ve cebirsel ifade kavramlarının temel düzeyde anlatımı.",
    estimatedDuration: 50,
    isPublished: true,
    teacherId: "teacher-1",
  },
  {
    id: "lesson-5",
    title: "Hücre ve Bölünmeler",
    subject: "science",
    grade: 6,
    description:
      "Hücrenin temel yapıları ile mitoz ve mayoz bölünmenin karşılaştırılması.",
    estimatedDuration: 35,
    isPublished: false,
    teacherId: "teacher-1",
  },
]

export const questions: Question[] = [
  {
    id: "question-1",
    lessonId: "lesson-1",
    studentId: "student-1",
    content:
      "Paydaları farklı olan kesirleri toplarken neden önce eşitliyoruz?",
    status: "pending",
  },
  {
    id: "question-2",
    lessonId: "lesson-2",
    studentId: "student-2",
    content:
      "Bir cisim hareket etmiyorsa üzerine hiç kuvvet uygulanmıyor mudur?",
    status: "answered",
  },
  {
    id: "question-3",
    lessonId: "lesson-3",
    studentId: "student-3",
    content:
      "I go to school cümlesinde neden school kelimesinden önce the kullanmıyoruz?",
    status: "escalated",
  },
  {
    id: "question-4",
    lessonId: "lesson-4",
    studentId: "student-1",
    content:
      "3x ile x + 3 ifadelerinin arasındaki fark nedir?",
    status: "pending",
  },
  {
    id: "question-5",
    lessonId: "lesson-5",
    studentId: "student-2",
    content:
      "Mitoz bölünme sonucunda oluşan hücrelerin genetik yapısı aynı mıdır?",
    status: "answered",
  },
]