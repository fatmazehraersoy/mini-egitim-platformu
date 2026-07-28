import "./App.css"

import { lessons } from "./data/mockData"

import {
  addLesson,
  deleteLesson,
  findLessonById,
  getCompletedLessons,
  getLessonTitles,
  getMathLessons,
  toggleLessonCompleted,
} from "./utils/lessonUtils"

const newLesson = {
  id: 3,
  title: "Simple Present Tense",
  subject: "İngilizce",
  grade: 6,
  completed: false,
}

console.log("Bütün dersler:", lessons)

console.log(
  "Matematik dersleri:",
  getMathLessons(lessons)
)

console.log(
  "Tamamlanmış dersler:",
  getCompletedLessons(lessons)
)

console.log(
  "Ders başlıkları:",
  getLessonTitles(lessons)
)

console.log(
  "ID'si 2 olan ders:",
  findLessonById(lessons, 2)
)

console.log(
  "Yeni ders eklenmiş liste:",
  addLesson(lessons, newLesson)
)

console.log(
  "Tamamlanma durumu değişmiş liste:",
  toggleLessonCompleted(lessons, 1)
)

console.log(
  "ID'si 2 olan ders silindikten sonra:",
  deleteLesson(lessons, 2)
)

function App() {
  return (
    <main>
      <h1>2. Gün JavaScript Çalışması</h1>

      <p>
        Fonksiyonların sonuçlarını görmek için tarayıcı
        konsolunu aç.
      </p>
    </main>
  )
}
export default App