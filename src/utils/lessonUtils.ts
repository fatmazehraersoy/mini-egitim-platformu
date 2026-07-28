import type { Lesson } from "../data/mockData"

// 1. Matematik derslerini getirir.
export const getMathLessons = (lessons: Lesson[]) => {
  return lessons.filter(
    (lesson) => lesson.subject === "Matematik"
  )
}

// 2. Tamamlanmış dersleri getirir.
export const getCompletedLessons = (lessons: Lesson[]) => {
  return lessons.filter(
    (lesson) => lesson.completed
  )
}

// 3. Yalnızca ders başlıklarını getirir.
export const getLessonTitles = (lessons: Lesson[]) => {
  return lessons.map(
    (lesson) => lesson.title
  )
}

// 4. Verilen ID'ye sahip dersi bulur.
export const findLessonById = (
  lessons: Lesson[],
  lessonId: number
) => {
  return lessons.find(
    (lesson) => lesson.id === lessonId
  )
}

// 5. Yeni bir ders ekler.
export const addLesson = (
  lessons: Lesson[],
  newLesson: Lesson
) => {
  return [
    ...lessons,
    newLesson,
  ]
}

// 6. Dersin tamamlanma durumunu tersine çevirir.
export const toggleLessonCompleted = (
  lessons: Lesson[],
  lessonId: number
) => {
  return lessons.map((lesson) => {
    if (lesson.id === lessonId) {
      return {
        ...lesson,
        completed: !lesson.completed,
      }
    }

    return lesson
  })
}

// 7. Verilen ID'ye sahip dersi siler.
export const deleteLesson = (
  lessons: Lesson[],
  lessonId: number
) => {
  return lessons.filter(
    (lesson) => lesson.id !== lessonId
  )
}