import {
  useEffect,
  useState,
} from "react"

import { Link } from "react-router-dom"

import Sidebar from "../components/Sidebar"

import {
  getMyQuestions,
  type MyQuestionResponse,
} from "../services/api"

type QuestionFilter =
  | "all"
  | "pending"
  | "answered"

function StudentQuestionsPage() {
  const [questions, setQuestions] =
    useState<MyQuestionResponse[]>([])

  const [filter, setFilter] =
    useState<QuestionFilter>("all")

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true)
        setError("")

        const data =
          await getMyQuestions()

        setQuestions(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Sorularınız yüklenemedi.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const filteredQuestions =
    questions.filter((question) => {
      if (filter === "all") {
        return true
      }

      return question.status === filter
    })

  const answeredCount =
    questions.filter(
      (question) =>
        question.status === "answered",
    ).length

  const pendingCount =
    questions.filter(
      (question) =>
        question.status === "pending",
    ).length

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
              Soru Takibi
            </p>

            <h1>Sorularım</h1>

            <p className="page-description">
              Öğretmeninize gönderdiğiniz
              soruları ve verilen cevapları
              takip edin.
            </p>
          </div>

          <Link
            to="/ask"
            className="primary-button student-new-question-button"
          >
            + Yeni Soru Sor
          </Link>
        </section>

        <section className="student-question-stats">
          <div>
            <span>Toplam</span>
            <strong>
              {questions.length}
            </strong>
          </div>

          <div>
            <span>Cevaplandı</span>
            <strong>
              {answeredCount}
            </strong>
          </div>

          <div>
            <span>Bekliyor</span>
            <strong>
              {pendingCount}
            </strong>
          </div>
        </section>

        <div className="student-question-tabs">
          <button
            type="button"
            className={
              filter === "all"
                ? "student-tab student-tab-active"
                : "student-tab"
            }
            onClick={() =>
              setFilter("all")
            }
          >
            Tümü
          </button>

          <button
            type="button"
            className={
              filter === "pending"
                ? "student-tab student-tab-active"
                : "student-tab"
            }
            onClick={() =>
              setFilter("pending")
            }
          >
            Bekleyen
          </button>

          <button
            type="button"
            className={
              filter === "answered"
                ? "student-tab student-tab-active"
                : "student-tab"
            }
            onClick={() =>
              setFilter("answered")
            }
          >
            Cevaplanan
          </button>
        </div>

        {isLoading ? (
          <p className="page-message">
            Sorular yükleniyor...
          </p>
        ) : error ? (
          <p className="page-error">
            {error}
          </p>
        ) : filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <h2>
              Bu kategoride soru yok.
            </h2>
          </div>
        ) : (
          <section className="student-full-question-list">
            {filteredQuestions.map(
              (question) => (
                <article
                  key={question.id}
                  className="student-full-question-card"
                >
                  <div className="student-full-question-header">
                    <div>
                      <span className="soft-badge">
                        {question.lesson.title}
                      </span>

                      <h2>
                        {question.content}
                      </h2>
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
                    <div className="student-full-answer">
                      <span>
                        Öğretmenin Cevabı
                      </span>

                      <p>
                        {
                          question.answer
                            .content
                        }
                      </p>
                    </div>
                  ) : (
                    <p className="student-question-waiting">
                      Öğretmeniniz henüz bu
                      soruyu cevaplamadı.
                    </p>
                  )}
                </article>
              ),
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default StudentQuestionsPage