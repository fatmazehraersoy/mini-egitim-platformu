import { lessons } from "../data/mockData"
import type { Lesson } from "../types"

export function getLessonById(
  lessonId: string
): Promise<Lesson | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lessonId === "error") {
        reject(
          new Error("Sahte sunucu hatası")
        )
        return
      }

      const lesson = lessons.find(
        (lesson) => lesson.id === lessonId
      )

      resolve(lesson)
    }, 1500)
  })
}