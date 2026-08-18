import {
  useEffect,
  useState,
} from "react"

import {
  getMyQuestions,
  type MyQuestionResponse,
} from "../services/api"

function StudentDashboard() {
  const [questions, setQuestions] =
    useState<MyQuestionResponse[]>([])

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
          await getMyQuestions()

        setQuestions(questionList)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Sorularınız yüklenemedi."
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [])

  return (
    <main>
      <h1>Öğrenci Paneli</h1>

      <h2>Sorularım</h2>

      {isLoading ? (
        <p>Sorular yükleniyor...</p>
      ) : error ? (
        <p className="form-error">
          {error}
        </p>
      ) : questions.length === 0 ? (
        <p>Henüz soru sormadınız.</p>
      ) : (
        questions.map((question) => (
          <article key={question.id}>
            <h3>
              {question.lesson.title}
            </h3>

            <p>
              <strong>Sorum:</strong>{" "}
              {question.content}
            </p>

            <p>
              <strong>Durum:</strong>{" "}
              {question.status === "answered"
                ? "Cevaplandı"
                : "Beklemede"}
            </p>

            {question.answer ? (
              <div>
                <h4>Öğretmenin Cevabı</h4>

                <p>
                  {question.answer.content}
                </p>
              </div>
            ) : (
              <p>
                Öğretmeniniz henüz bu soruyu
                cevaplamadı.
              </p>
            )}
          </article>
        ))
      )}
    </main>
  )
}

export default StudentDashboard