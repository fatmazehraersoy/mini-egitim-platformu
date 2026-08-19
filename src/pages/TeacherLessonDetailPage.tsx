import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import RichTextContent from "../components/RichTextContent"

import {
  getLessonById,
  type LessonResponse,
} from "../services/api"

const API_URL = import.meta.env.VITE_API_URL

const subjectLabels = {
  math: "Matematik",
  science: "Fen Bilimleri",
  english: "İngilizce",
}

function TeacherLessonDetailPage() {
  const { lessonId } = useParams()

  const [lesson, setLesson] =
    useState<LessonResponse | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    let ignore = false

    async function loadLesson() {
      if (!lessonId) {
        setError("Ders bilgisi bulunamadı.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError("")

        const data =
          await getLessonById(lessonId)

        if (!ignore) {
          setLesson(data)
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Ders yüklenemedi.",
          )
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadLesson()

    return () => {
      ignore = true
    }
  }, [lessonId])

  return (
    <div className="dashboard">
      <Sidebar
        title="Öğretmen"
menuItems={[
  {
    label: "Genel Bakış",
    path: "/teacher",
  },
  {
    label: "Dersler",
    path: "/teacher/lessons",
  },
  {
  label: "Öğrenciler",
  path: "/teacher/students",
},
  {
    label: "Sorular",
    path: "/teacher/questions",
  },
  {
    label: "Yeni Ders Oluştur",
    path: "/teacher/lessons/new",
  },
]}
      />

      <main className="dashboard-main teacher-lesson-detail-page">
        <Link
          to="/teacher/lessons"
          className="back-link"
        >
          ← Derslere Dön
        </Link>

        {isLoading && (
          <p className="page-message">
            Ders yükleniyor...
          </p>
        )}

        {error && (
          <p className="page-error">
            {error}
          </p>
        )}

        {!isLoading &&
          !error &&
          lesson && (
            <>
              <section className="lesson-detail-header">
                <div>
                  <p className="page-kicker">
                    Ders Detayı
                  </p>

                  <h1>{lesson.title}</h1>

                  <div className="lesson-detail-meta">
                    <span>
                      {
                        subjectLabels[
                          lesson.course.subject
                        ]
                      }
                    </span>

                    <span>
                      {lesson.course.grade}. Sınıf
                    </span>

                    <span>
                      {lesson.course.title}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/teacher/lessons/${lesson.id}/edit`}
                  className="secondary-button"
                >
                  Dersi Düzenle
                </Link>
              </section>

              {lesson.coverImageUrl && (
                <section className="lesson-detail-cover">
                  <img
                    src={`${API_URL}${lesson.coverImageUrl}`}
                    alt={
                      lesson.coverImageAlt ??
                      lesson.title
                    }
                  />

                  <div className="lesson-cover-overlay">
                    <div>
                      <span>
                        {
                          subjectLabels[
                            lesson.course.subject
                          ]
                        }
                      </span>

                      <h2>
                        {lesson.title}
                      </h2>
                    </div>
                  </div>
                </section>
              )}

              <section className="lesson-detail-content">
                <div className="lesson-detail-section-header">
                  <p className="page-kicker">
                    Ders İçeriği
                  </p>

                  <h2>İçerik</h2>
                </div>

                <RichTextContent
  html={lesson.content}
  className="lesson-content-body"
/>
              </section>
            </>
          )}
      </main>
    </div>
  )
}

export default TeacherLessonDetailPage