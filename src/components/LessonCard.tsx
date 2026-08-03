import { Link } from "react-router-dom"

import { subjectLabels } from "../constants/lessonLabels"
import type { Lesson } from "../types"

type LessonCardProps = {
  lesson: Lesson
  onDeleteLesson: (lessonId: string) => void
  onToggleLessonPublished: (
    lessonId: string
  ) => void
}

function LessonCard({
  lesson,
  onDeleteLesson,
  onToggleLessonPublished,
}: LessonCardProps) {
  const {
    id,
    title,
    subject,
    grade,
    description,
    estimatedDuration,
    isPublished,
  } = lesson

  return (
    <article>
      <h3>{title}</h3>

      <p>Ders: {subjectLabels[subject]}</p>
      <p>Sınıf: {grade}</p>
      <p>
        Tahmini süre: {estimatedDuration} dakika
      </p>

      <p>
        {description ??
          "Bu ders için henüz açıklama eklenmedi."}
      </p>

      <p>
        Durum:{" "}
        {isPublished ? "Yayımlandı" : "Taslak"}
      </p>

      <Link
        to={`/lessons/${id}`}
        className="lesson-detail-link"
      >
        Dersi Görüntüle
      </Link>

      <button
        type="button"
        onClick={() =>
          onToggleLessonPublished(id)
        }
      >
        {isPublished ? "Taslağa Al" : "Yayımla"}
      </button>

      <button
        type="button"
        onClick={() => onDeleteLesson(id)}
      >
        Dersi Sil
      </button>
    </article>
  )
}

export default LessonCard