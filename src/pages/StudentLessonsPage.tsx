import {
  useEffect,
  useState,
} from "react"

import { Link } from "react-router-dom"

import Sidebar from "../components/Sidebar"

import {
  getMyLessons,
  type LessonResponse,
} from "../services/api"

const API_URL =
  import.meta.env.VITE_API_URL

const subjectLabels = {
  math: "Matematik",
  science: "Fen Bilimleri",
  english: "İngilizce",
}

function StudentLessonsPage() {
  const [lessons, setLessons] =
    useState<LessonResponse[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    async function loadLessons() {
      try {
        setIsLoading(true)
        setError("")

        const data =
          await getMyLessons()

        setLessons(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Dersleriniz yüklenemedi.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadLessons()
  }, [])

  return (
    <div className="dashboard">
      <Sidebar
        title="Öğrenci"
        menuItems={[
          {
            label: "Genel Bakış",
            path: "/student",
          },
          {
            label: "Derslerim",
            path: "/student/lessons",
          },
          {
            label: "Sorularım",
            path: "/student/questions",
          },
          {
            label: "Soru Sor",
            path: "/ask",
          },
        ]}
      />

      <main className="dashboard-main student-page">
        <section className="student-page-header">
          <div>
            <p className="page-kicker">
              Öğrenme Alanım
            </p>

            <h1>Derslerim</h1>

            <p className="page-description">
              Kayıtlı olduğunuz kurslardaki
              ders içeriklerine buradan
              ulaşabilirsiniz.
            </p>
          </div>

          <span className="student-page-count">
            {lessons.length} ders
          </span>
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
          lessons.length === 0 && (
            <div className="empty-state">
              <h2>
                Henüz ders bulunmuyor.
              </h2>
            </div>
          )}

        {!isLoading &&
          !error &&
          lessons.length > 0 && (
            <section className="student-all-lessons-grid">
              {lessons.map((lesson) => (
                <article
                  key={lesson.id}
                  className="student-all-lesson-card"
                >
                  <div className="student-all-lesson-image">
                    {lesson.coverImageUrl ? (
                      <img
                        src={`${API_URL}${lesson.coverImageUrl}`}
                        alt={
                          lesson.coverImageAlt ??
                          lesson.title
                        }
                      />
                    ) : (
                      <div className="student-lesson-no-image">
                        Ders
                      </div>
                    )}
                  </div>

                  <div className="student-all-lesson-body">
                    <div className="student-lesson-meta">
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
                    </div>

                    <h2>
                      {lesson.title}
                    </h2>

                    <p>
                      {lesson.course.title}
                    </p>

                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="text-link"
                    >
                      Dersi Görüntüle →
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          )}
      </main>
    </div>
  )
}

export default StudentLessonsPage