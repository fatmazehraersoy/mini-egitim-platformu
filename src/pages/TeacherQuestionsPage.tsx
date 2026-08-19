import {
  useEffect,
  useState,
} from "react"

import Header from "../components/Header"
import QuestionCard from "../components/QuestionCard"
import Sidebar from "../components/Sidebar"

import {
  getQuestions,
  type QuestionResponse,
} from "../services/api"

type QuestionFilter =
  | "pending"
  | "answered"
  | "all"

function TeacherQuestionsPage() {
  const [questions, setQuestions] =
    useState<QuestionResponse[]>([])

  const [filter, setFilter] =
    useState<QuestionFilter>("pending")

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true)
        setError("")

        const questionList =
          await getQuestions()

        setQuestions(questionList)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Sorular yüklenemedi."
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [])

  function handleQuestionAnswered(
    questionId: string
  ) {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              status: "answered",
            }
          : question
      )
    )
  }

  const visibleQuestions =
    filter === "all"
      ? questions
      : questions.filter(
          (question) =>
            question.status === filter
        )

  const pendingCount = questions.filter(
    (question) =>
      question.status === "pending"
  ).length

  const answeredCount = questions.filter(
    (question) =>
      question.status === "answered"
  ).length

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

      <main className="dashboard-main">
        <Header
          title="Öğrenci Soruları"
          teacherName="Zehra Ersoy"
        />

        <section className="questions-hero">
          <p className="section-eyebrow">
            Soru Yönetimi
          </p>

          <h1>Öğrenci Soruları</h1>

          <p>
            Öğrencilerden gelen soruları
            görüntüleyebilir ve buradan
            cevaplayabilirsin.
          </p>
        </section>

        <div className="question-tabs">
          <button
            className={
              filter === "pending"
                ? "question-tab question-tab-active"
                : "question-tab"
            }
            onClick={() =>
              setFilter("pending")
            }
          >
            Bekleyen
            <span>{pendingCount}</span>
          </button>

          <button
            className={
              filter === "answered"
                ? "question-tab question-tab-active"
                : "question-tab"
            }
            onClick={() =>
              setFilter("answered")
            }
          >
            Cevaplanan
            <span>{answeredCount}</span>
          </button>

          <button
            className={
              filter === "all"
                ? "question-tab question-tab-active"
                : "question-tab"
            }
            onClick={() =>
              setFilter("all")
            }
          >
            Tümü
            <span>{questions.length}</span>
          </button>
        </div>

        <section className="question-page-list">
          {isLoading ? (
            <p>Sorular yükleniyor...</p>
          ) : error ? (
            <p className="form-error">
              {error}
            </p>
          ) : visibleQuestions.length === 0 ? (
            <div className="empty-state">
              <h3>
                Gösterilecek soru bulunmuyor
              </h3>

              <p>
                Bu kategoride şu anda
                öğrenci sorusu yok.
              </p>
            </div>
          ) : (
            visibleQuestions.map(
              (question) => (
                <QuestionCard
  key={question.id}
  questionId={question.id}
  studentName={question.student.name}
  content={question.content}
  status={question.status}
  teacherAnswer={
  question.answer?.content
}
  onAnswered={
    handleQuestionAnswered
  }
/>
              )
            )
          )}
        </section>
      </main>
    </div>
  )
}

export default TeacherQuestionsPage