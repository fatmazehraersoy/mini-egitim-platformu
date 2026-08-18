import {
  useEffect,
  useState,
} from "react"

import { Link } from "react-router-dom"

import Header from "../components/Header"
import QuestionCard from "../components/QuestionCard"
import Sidebar from "../components/Sidebar"
import SummaryCard from "../components/SummaryCard"

import { users } from "../data/mockData"

import {
  getLessons,
  getQuestions,
  type LessonResponse,
  type QuestionResponse,
} from "../services/api"

function TeacherDashboard() {
  const [lessonList, setLessonList] =
    useState<LessonResponse[]>([])

  const [questionList, setQuestionList] =
    useState<QuestionResponse[]>([])

  const [isLoadingLessons, setIsLoadingLessons] =
    useState(true)

  const [isLoadingQuestions, setIsLoadingQuestions] =
    useState(true)

  const [lessonError, setLessonError] =
    useState("")

  const [questionError, setQuestionError] =
    useState("")

  const totalLessons = lessonList.length

  const totalStudents = users.filter(
    (user) => user.role === "student"
  ).length

  const pendingQuestions = questionList.filter(
    (question) =>
      question.status === "pending"
  ).length

  const recentLessons = lessonList.slice(0, 3)

  const recentQuestions = questionList
    .filter(
      (question) =>
        question.status === "pending"
    )
    .slice(0, 3)

  useEffect(() => {
    async function loadLessons() {
      try {
        setIsLoadingLessons(true)

        const lessons =
          await getLessons()

        setLessonList(lessons)
      } catch (error) {
        setLessonError(
          error instanceof Error
            ? error.message
            : "Dersler yüklenemedi."
        )
      } finally {
        setIsLoadingLessons(false)
      }
    }

    loadLessons()
  }, [])

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoadingQuestions(true)

        const questions =
          await getQuestions()

        setQuestionList(questions)
      } catch (error) {
        setQuestionError(
          error instanceof Error
            ? error.message
            : "Sorular yüklenemedi."
        )
      } finally {
        setIsLoadingQuestions(false)
      }
    }

    loadQuestions()
  }, [])

  function handleQuestionAnswered(
    questionId: string
  ) {
    setQuestionList((currentQuestions) =>
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
          title="Genel Bakış"
          teacherName="Zehra Ersoy"
        />

        <section className="teacher-welcome">
          <div>
            <p className="section-eyebrow">
              Öğretmen Paneli
            </p>

            <h1>
              Merhaba Zehra 👋
            </h1>

            <p>
              Derslerini ve öğrenci sorularını
              buradan kolayca takip edebilirsin.
            </p>
          </div>
        </section>

        <section className="summary-grid">
          <SummaryCard
            title="Toplam Ders"
            value={totalLessons}
          />

          <SummaryCard
            title="Bekleyen Sorular"
            value={pendingQuestions}
          />

          <SummaryCard
            title="Toplam Öğrenci"
            value={totalStudents}
          />
        </section>

        <section className="quick-actions">
          <Link
            to="/teacher/lessons/new"
            className="primary-action"
          >
            + Yeni Ders Oluştur
          </Link>

          <a
            href="#questions"
            className="secondary-action"
          >
            Bekleyen Soruları Gör
          </a>
        </section>

        <div className="teacher-overview-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">
                  Ders Yönetimi
                </p>

                <h2>Dersler</h2>
              </div>

              <Link
                to="/teacher/lessons"
                className="text-link"
              >
                Tümünü Gör
              </Link>
            </div>

            {isLoadingLessons ? (
              <p>Dersler yükleniyor...</p>
            ) : lessonError ? (
              <p className="form-error">
                {lessonError}
              </p>
            ) : recentLessons.length === 0 ? (
              <div className="empty-state">
                <p>
                  Henüz ders oluşturulmamış.
                </p>
              </div>
            ) : (
              <div className="overview-list">
                {recentLessons.map((lesson) => (
                  <article
                    className="overview-card"
                    key={lesson.id}
                  >
                    <div>
                      <span className="soft-badge">
                        {lesson.course.title}
                      </span>

                      <h3>{lesson.title}</h3>

                      <p>
                        {lesson.content}
                      </p>
                    </div>

                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="text-link"
                    >
                      Detayı Gör
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section
            className="dashboard-section"
            id="questions"
          >
            <div className="section-header">
              <div>
                <p className="section-eyebrow">
                  Öğrenci Soruları
                </p>

                <h2>Bekleyen Sorular</h2>
              </div>

              <span className="pending-count">
                {pendingQuestions}
              </span>
            </div>

            {isLoadingQuestions ? (
              <p>Sorular yükleniyor...</p>
            ) : questionError ? (
              <p className="form-error">
                {questionError}
              </p>
            ) : recentQuestions.length === 0 ? (
              <div className="empty-state">
                <p>
                  Şu anda bekleyen soru yok.
                </p>
              </div>
            ) : (
              <div className="overview-list">
                {recentQuestions.map(
                  (question) => (
                    <QuestionCard
  key={question.id}
  questionId={question.id}
  studentName={question.student.name}
  content={question.content}
  status={question.status}
  answerContent={
    question.answer?.content
  }
  onAnswered={
    handleQuestionAnswered
  }
/>
                  )
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default TeacherDashboard