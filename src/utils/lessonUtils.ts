import type { Lesson } from "../types"

// Belirli bir derse ait dersleri getirir.
export const getLessonsBySubject = (
  lessons: Lesson[],
  subject: Lesson["subject"]
): Lesson[] => {
  return lessons.filter(
    (lesson) => lesson.subject === subject
  )
}

// Verilen ID'ye sahip dersi bulur.
export const findLessonById = (
  lessons: Lesson[],
  lessonId: string
): Lesson | undefined => {
  return lessons.find(
    (lesson) => lesson.id === lessonId
  )
}

// Belirli bir sınıfa ait dersleri getirir.
export const getLessonsByGrade = (
  lessons: Lesson[],
  grade: number
): Lesson[] => {
  return lessons.filter(
    (lesson) => lesson.grade === grade
  )
}

// Belirli bir öğretmenin derslerini getirir.
export const getLessonsByTeacher = (
  lessons: Lesson[],
  teacherId: string
): Lesson[] => {
  return lessons.filter(
    (lesson) => lesson.teacherId === teacherId
  )
}

// Yeni ders eklenmiş yeni bir dizi oluşturur.
export const addLesson = (
  lessons: Lesson[],
  newLesson: Lesson
): Lesson[] => {
  return [
    ...lessons,
    newLesson,
  ]
}

// Verilen ID'ye sahip dersi siler.
export const deleteLesson = (
  lessons: Lesson[],
  lessonId: string
): Lesson[] => {
  return lessons.filter(
    (lesson) => lesson.id !== lessonId
  )
}