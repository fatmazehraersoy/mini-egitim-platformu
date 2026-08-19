import {
  type FormEvent,
  useState,
} from "react"

import { answerQuestion } from "../services/api"

type QuestionCardProps = {
  questionId: string
  studentName: string
  content: string
  status:
    | "pending"
    | "answered"
    | "escalated"
  teacherAnswer?: string | null
  onAnswered: (questionId: string) => void
}

const statusLabels = {
  pending: "Bekliyor",
  answered: "Cevaplandı",
  escalated: "Yönlendirildi",
}

function QuestionCard({
  questionId,
  studentName,
  content,
  status,
  teacherAnswer,
  onAnswered,
}: QuestionCardProps) {
  const [
    showAnswerForm,
    setShowAnswerForm,
  ] = useState(false)

  const [
    answerContent,
    setAnswerContent,
  ] = useState("")

  const [
    submittedAnswer,
    setSubmittedAnswer,
  ] = useState<string | null>(null)

  const [error, setError] =
    useState("")

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const cleanAnswer =
      answerContent.trim()

    if (!cleanAnswer) {
      setError(
        "Cevap metni boş bırakılamaz.",
      )
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      await answerQuestion(
        questionId,
        {
          content: cleanAnswer,
        },
      )

      setSubmittedAnswer(
        cleanAnswer,
      )

      onAnswered(questionId)

      setAnswerContent("")
      setShowAnswerForm(false)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Soru cevaplanamadı.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayedAnswer =
    teacherAnswer ??
    submittedAnswer

  return (
    <article className="teacher-question-card">
      <div className="teacher-question-card-header">
        <div>
          <span className="question-student-label">
            Öğrenci
          </span>

          <h3>
            {studentName}
          </h3>
        </div>

        <span
          className={`question-status-badge question-status-${status}`}
        >
          {statusLabels[status]}
        </span>
      </div>

      <div className="teacher-question-content">
        <span className="question-content-label">
          Soru
        </span>

        <p>{content}</p>
      </div>

      {status === "answered" &&
        displayedAnswer && (
          <div className="teacher-answer-box">
            <span>
              Verdiğiniz Cevap
            </span>

            <p>
              {displayedAnswer}
            </p>
          </div>
        )}

      {status === "pending" && (
        <div className="question-answer-area">
          {!showAnswerForm && (
            <button
              type="button"
              className="answer-question-button"
              onClick={() => {
                setShowAnswerForm(true)
                setError("")
              }}
            >
              Soruyu Cevapla
            </button>
          )}

          {showAnswerForm && (
            <form
              className="question-answer-form"
              onSubmit={handleSubmit}
            >
              <div className="question-answer-form-header">
                <div>
                  <h4>
                    Cevabınızı Yazın
                  </h4>

                  <p>
                    Öğrenciye açıklayıcı ve
                    anlaşılır bir cevap
                    gönderin.
                  </p>
                </div>
              </div>

              <textarea
                id={`answer-${questionId}`}
                value={answerContent}
                onChange={(event) => {
                  setAnswerContent(
                    event.target.value,
                  )

                  if (error) {
                    setError("")
                  }
                }}
                placeholder="Cevabınızı buraya yazın..."
                rows={5}
              />

              {error && (
                <p className="form-error">
                  {error}
                </p>
              )}

              <div className="question-answer-actions">
                <button
                  type="button"
                  className="answer-cancel-button"
                  onClick={() => {
                    setShowAnswerForm(false)
                    setAnswerContent("")
                    setError("")
                  }}
                >
                  Vazgeç
                </button>

                <button
                  type="submit"
                  className="answer-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Gönderiliyor..."
                    : "Cevabı Gönder"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </article>
  )
}

export default QuestionCard