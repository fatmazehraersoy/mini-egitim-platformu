import {
  useEffect,
  useState,
} from "react"

import {
  Link,
  useParams,
} from "react-router-dom"

import type { Lesson } from "../types"
import { getLessonById } from "../services/lessonService"
import { subjectLabels } from "../constants/lessonLabels"


function LessonDetailPage() {
  const { lessonId } = useParams<{
    lessonId: string
  }>()

  const [lesson, setLesson] =
    useState<Lesson | null>(null)

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
          setError("Ders ID bilgisi bulunamadı.")
          return
        }

        const foundLesson =
          await getLessonById(lessonId)

        setLesson(foundLesson ?? null)
      } catch {
  setError(
    "Ders bilgileri şu anda yüklenemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin."
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
        <p>Yükleniyor…</p>
      </main>
    )
  }

  if (error) {
  return (
    <main className="error-state">
      <h1>Ders yüklenemedi</h1>

      <p>{error}</p>

      <button
        type="button"
        onClick={() => window.location.reload()}
      >
        Tekrar Dene
      </button>

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

      <p>
        Aradığınız ders silinmiş veya bağlantı yanlış olabilir.
      </p>

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
        Ders alanı:{" "}
        {subjectLabels[lesson.subject]}
      </p>

      <p>Sınıf: {lesson.grade}</p>

      <p>
        {lesson.description ??
          "Bu ders için açıklama eklenmemiş."}
      </p>

      <p>
        Tahmini süre:{" "}
        {lesson.estimatedDuration} dakika
      </p>

      <p>
        Durum:{" "}
        {lesson.isPublished
          ? "Yayımlandı"
          : "Taslak"}
      </p>

      <Link to="/teacher">
        Öğretmen paneline dön
      </Link>
    </main>
  )
}

export default LessonDetailPage