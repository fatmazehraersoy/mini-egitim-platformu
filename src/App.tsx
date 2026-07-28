import "./App.css"

import {
  lessons,
  questions,
  users,
} from "./data/mockData"

import {
  addLesson,
  deleteLesson,
  findLessonById,
  getLessonsByGrade,
  getLessonsBySubject,
  getLessonsByTeacher,
} from "./utils/lessonUtils"

import type { Lesson } from "./types"

const newLesson: Lesson = {
  id: "lesson-4",
  title: "Ondalık Sayılar",
  subject: "math",
  grade: 6,
  description: "Ondalık sayıların temel özellikleri.",
  teacherId: "user-1",
}


console.log("Kullanıcılar:", users)
console.log("Dersler:", lessons)
console.log("Sorular:", questions)

console.log(
  "Matematik dersleri:",
  getLessonsBySubject(lessons, "math")
)

console.log(
  "6. sınıf dersleri:",
  getLessonsByGrade(lessons, 6)
)

console.log(
  "ID'si lesson-2 olan ders:",
  findLessonById(lessons, "lesson-2")
)

console.log(
  "Öğretmenin dersleri:",
  getLessonsByTeacher(lessons, "user-1")
)

console.log(
  "Yeni ders eklenmiş liste:",
  addLesson(lessons, newLesson)
)

console.log(
  "Ders silinmiş liste:",
  deleteLesson(lessons, "lesson-2")
)

function App() {
  return (
    <main>
      <h1>3. Gün TypeScript Çalışması</h1>
      <p>Sonuçları görmek için Console bölümünü aç.</p>
    </main>
  )
}

export default App