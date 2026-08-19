import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Sidebar from "../components/Sidebar"
import {
  getLessons,
  type LessonResponse,
} from "../services/api"

const subjectLabels = {
  math: "Matematik",
  science: "Fen Bilimleri",
  english: "İngilizce",
}

function getTextPreview(
  html: string,
  maxLength = 130,
) {
  const document = new DOMParser().parseFromString(
    html,
    "text/html",
  )

  const text =
    document.body.textContent?.trim() ?? ""

  if (text.length <= maxLength) {
    return text
  }

  return `${text
    .slice(0, maxLength)
    .trim()}...`
}

function TeacherLessonsPage() {
  const [lessons, setLessons] = useState<LessonResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let ignore = false

    async function loadLessons() {
      try {
        setIsLoading(true)
        setError("")

        const data = await getLessons()

        if (!ignore) {
          setLessons(data)
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Dersler yüklenemedi.",
          )
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadLessons()

    return () => {
      ignore = true
    }
  }, [])

  const teacherId = localStorage.getItem("demoUserId")

  const teacherLessons = teacherId
    ? lessons.filter(
        (lesson) =>
          lesson.course.teacherId === teacherId,
      )
    : lessons

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

      <main className="dashboard-main teacher-lessons-page">
        <section className="teacher-lessons-header">
          <div>
            <p className="page-kicker">
              Ders Yönetimi
            </p>

            <h1>Dersler</h1>

            <p className="page-description">
              Oluşturduğunuz dersleri görüntüleyin
              ve ders içeriklerini yönetin.
            </p>
          </div>

          <Link
            to="/teacher/lessons/new"
            className="primary-button"
          >
            + Yeni Ders Oluştur
          </Link>
        </section>

        <section className="teacher-lessons-summary">
          <div>
            <span>Toplam Ders</span>
            <strong>
              {teacherLessons.length}
            </strong>
          </div>
        </section>

        {isLoading && (
          <p className="page-message">
            Dersler yükleniyor...
          </p>
        )}

        {error && (
          <p className="page-error">
            {error}
          </p>
        )}

        {!isLoading &&
          !error &&
          teacherLessons.length === 0 && (
            <section className="empty-state">
              <h2>Henüz ders oluşturulmamış.</h2>

              <p>
                İlk dersinizi oluşturarak
                başlayabilirsiniz.
              </p>

              <Link
                to="/teacher/lessons/new"
                className="primary-button"
              >
                İlk Dersi Oluştur
              </Link>
            </section>
          )}

        {!isLoading &&
          !error &&
          teacherLessons.length > 0 && (
            <section className="teacher-lessons-grid">
              {teacherLessons.map((lesson) => {
                const shortContent =
  getTextPreview(lesson.content)

                return (
                  <article
                    className="teacher-lesson-card"
                    key={lesson.id}
                  >
                    <div className="lesson-card-top">
                      <span className="lesson-subject">
                        {
                          subjectLabels[
                            lesson.course.subject
                          ]
                        }
                      </span>

                      <span className="lesson-grade">
                        {lesson.course.grade}. Sınıf
                      </span>
                    </div>

                    <h2>{lesson.title}</h2>

                    <p className="lesson-course-name">
                      {lesson.course.title}
                    </p>

                    <p className="lesson-content-preview">
                      {shortContent}
                    </p>

                    <div className="lesson-card-footer">
                      <Link
                        to={`/teacher/lessons/${lesson.id}`}
                        className="text-link"
                      >
                        Dersi Görüntüle →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </section>
          )}
      </main>
    </div>
  )
}

export default TeacherLessonsPage