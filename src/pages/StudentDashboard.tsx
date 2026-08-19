import {
  useEffect,
  useState,
} from "react"

import { Link } from "react-router-dom"

import Sidebar from "../components/Sidebar"

import {
  getCurrentUser,
  getMyLessons,
  getMyQuestions,
  type CurrentUserResponse,
  type LessonResponse,
  type MyQuestionResponse,
} from "../services/api"

const API_URL =
  import.meta.env.VITE_API_URL

const subjectLabels = {
  math: "Matematik",
  science: "Fen Bilimleri",
  english: "İngilizce",
}

function StudentDashboard() {
  const [student, setStudent] =
    useState<CurrentUserResponse | null>(
      null,
    )

  const [lessons, setLessons] =
    useState<LessonResponse[]>([])

  const [questions, setQuestions] =
    useState<MyQuestionResponse[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    let ignore = false

    async function loadDashboard() {
      try {
        setIsLoading(true)
        setError("")

        const [
          userData,
          lessonData,
          questionData,
        ] = await Promise.all([
          getCurrentUser(),
          getMyLessons(),
          getMyQuestions(),
        ])

        if (!ignore) {
          setStudent(userData)
          setLessons(lessonData)
          setQuestions(questionData)
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Öğrenci paneli yüklenemedi.",
          )
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      ignore = true
    }
  }, [])

  const registeredCourses =
    new Set(
      lessons.map(
        (lesson) =>
          lesson.courseId,
      ),
    ).size

  const pendingQuestions =
    questions.filter(
      (question) =>
        question.status === "pending",
    ).length

  const recentLessons =
    lessons.slice(0, 3)

  const recentQuestions =
    questions.slice(0, 3)

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

      <main className="dashboard-main student-dashboard">
        {isLoading ? (
          <p className="page-message">
            Öğrenci paneli
            yükleniyor...
          </p>
        ) : error ? (
          <p className="page-error">
            {error}
          </p>
        ) : (
          <>
            <section className="student-welcome">
              <div>
                <p className="section-eyebrow">
                  Öğrenci Paneli
                </p>

                <h1>
                  Merhaba{" "}
                  {student?.name.split(
                    " ",
                  )[0]} 👋
                </h1>

                <p>
                  Derslerine göz atabilir,
                  öğretmenine soru
                  gönderebilir ve verilen
                  cevapları buradan takip
                  edebilirsin.
                </p>
              </div>

              <Link
                to="/ask"
                className="primary-button"
              >
                Soru Sor
              </Link>
            </section>

            <section className="student-summary-grid">
              <article className="student-summary-card">
                <span>
                  Kayıtlı Kurs
                </span>

                <strong>
                  {registeredCourses}
                </strong>
              </article>

              <article className="student-summary-card">
                <span>
                  Sorularım
                </span>

                <strong>
                  {questions.length}
                </strong>
              </article>

              <article className="student-summary-card">
                <span>
                  Bekleyen Cevap
                </span>

                <strong>
                  {pendingQuestions}
                </strong>
              </article>
            </section>

            <section className="student-dashboard-section">
              <div className="section-header">
  <div>
    <p className="section-eyebrow">
      Öğrenmeye Devam Et
    </p>

    <h2>Derslerim</h2>
  </div>

  <Link
    to="/student/lessons"
    className="text-link"
  >
    Tümünü Gör →
  </Link>
</div>

              {recentLessons.length ===
              0 ? (
                <div className="empty-state">
                  <p>
                    Henüz size atanmış
                    bir ders bulunmuyor.
                  </p>
                </div>
              ) : (
                <div className="student-lessons-grid">
                  {recentLessons.map(
                    (lesson) => (
                      <article
                        key={lesson.id}
                        className="student-lesson-card"
                      >
                        {lesson.coverImageUrl && (
                          <div className="student-lesson-image">
                            <img
                              src={`${API_URL}${lesson.coverImageUrl}`}
                              alt={
                                lesson.coverImageAlt ??
                                lesson.title
                              }
                            />
                          </div>
                        )}

                        <div className="student-lesson-card-body">
                          <div className="student-lesson-meta">
                            <span>
                              {
                                subjectLabels[
                                  lesson
                                    .course
                                    .subject
                                ]
                              }
                            </span>

                            <span>
                              {
                                lesson.course
                                  .grade
                              }
                              . Sınıf
                            </span>
                          </div>

                          <h3>
                            {lesson.title}
                          </h3>

                          <p>
                            {
                              lesson.course
                                .title
                            }
                          </p>

                          <Link
                            to={`/lessons/${lesson.id}`}
                            className="text-link"
                          >
                            Dersi Aç →
                          </Link>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              )}
            </section>

            <section className="student-dashboard-section">
              <div className="section-header">
                <div>
                  <p className="section-eyebrow">
                    Soru Takibi
                  </p>

                  <h2>
                    Son Sorularım
                  </h2>
                </div>

                <div className="student-section-actions">
  <Link
    to="/student/questions"
    className="text-link"
  >
    Tümünü Gör
  </Link>

  <Link
    to="/ask"
    className="text-link"
  >
    Yeni Soru Sor →
  </Link>
</div>
              </div>

              {recentQuestions.length ===
              0 ? (
                <div className="empty-state">
                  <p>
                    Henüz soru
                    sormadınız.
                  </p>
                </div>
              ) : (
                <div className="student-question-list">
                  {recentQuestions.map(
                    (question) => (
                      <article
                        key={question.id}
                        className="student-question-card"
                      >
                        <div className="student-question-top">
                          <div>
                            <span className="soft-badge">
                              {
                                question.lesson
                                  .title
                              }
                            </span>

                            <h3>
                              {
                                question.content
                              }
                            </h3>
                          </div>

                          <span
                            className={
                              question.status ===
                              "answered"
                                ? "student-status student-status-answered"
                                : "student-status student-status-pending"
                            }
                          >
                            {question.status ===
                            "answered"
                              ? "Cevaplandı"
                              : "Bekliyor"}
                          </span>
                        </div>

                        {question.answer ? (
                          <div className="student-answer-preview">
                            <span>
                              Öğretmenin
                              Cevabı
                            </span>

                            <p>
                              {
                                question
                                  .answer
                                  .content
                              }
                            </p>
                          </div>
                        ) : (
                          <p className="student-question-waiting">
                            Öğretmeniniz henüz
                            bu soruyu
                            cevaplamadı.
                          </p>
                        )}
                      </article>
                    ),
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default StudentDashboard