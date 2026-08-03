import { Link } from "react-router-dom"

import type { Lesson } from "../types"
import LessonCard from "./LessonCard"

type LessonListProps = {
  lessonList: Lesson[]
  onDeleteLesson: (lessonId: string) => void
  onToggleLessonPublished: (
    lessonId: string
  ) => void
}

function LessonList({
  lessonList,
  onDeleteLesson,
  onToggleLessonPublished,
}: LessonListProps) {
  if (lessonList.length === 0) {
    return (
      <div className="empty-state">
        <h3>Henüz ders bulunmuyor</h3>

        <p>
          İlk dersini oluşturduğunda burada
          görüntülenecek.
        </p>

        <Link
          to="/teacher/lessons/new"
          className="empty-state-link"
        >
          Yeni Ders Oluştur
        </Link>
      </div>
    )
  }

  return (
    <>
      {lessonList.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onDeleteLesson={onDeleteLesson}
          onToggleLessonPublished={
            onToggleLessonPublished
          }
        />
      ))}
    </>
  )
}

export default LessonList