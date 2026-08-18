import {
  useEffect,
  useState,
} from "react"

import {
  Link,
  useParams,
} from "react-router-dom"

import { subjectLabels } from "../constants/lessonLabels"

import {
  getLessonById,
  type LessonResponse,
} from "../services/api"

function LessonDetailPage() {
  const { lessonId } = useParams<{
    lessonId: string
  }>()

  const [lesson, setLesson] =
    useState<LessonResponse | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    async function loadLesson() {
      try {
        setIsLoading(true)
        setError(null)

        if (!lessonId) {
          setError(
            "Ders ID bilgisi bulunamadı."
          )
          return
        }

        const foundLesson =
          await getLessonById(lessonId)

        setLesson(foundLesson)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Ders bilgileri yüklenemedi."
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadLesson()
  }, [lessonId])

  if (isLoading) {
    return (
      <main>
        <p>Ders yükleniyor...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="error-state">
        <h1>Ders yüklenemedi</h1>

        <p>{error}</p>

        <Link to="/teacher">
          Öğretmen paneline dön
        </Link>
      </main>
    )
  }

  if (!lesson) {
    return (
      <main className="empty-state">
        <h1>Ders bulunamadı</h1>

        <Link to="/teacher">
          Ders listesine dön
        </Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{lesson.title}</h1>

      <p>
        Kurs: {lesson.course.title}
      </p>

      <p>
        Ders alanı:{" "}
        {subjectLabels[
          lesson.course.subject
        ]}
      </p>

      <p>
        Sınıf: {lesson.course.grade}
      </p>

      <p>
        Ders içeriği: {lesson.content}
      </p>

      <Link to="/teacher">
        Öğretmen paneline dön
      </Link>
    </main>
  )
}

export default LessonDetailPage