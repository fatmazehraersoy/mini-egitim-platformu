import {
  type FormEvent,
  useState,
} from "react"

import { answerQuestion } from "../services/api"

type QuestionCardProps = {
  questionId: string
  studentName: string
  content: string
  status: "pending" | "answered" | "escalated"
  teacherAnswer?: string | null
  onAnswered: (questionId: string) => void
}

const statusLabels = {
  pending: "Beklemede",
  answered: "Cevaplandı",
  escalated: "Öğretmene Yönlendirildi",
}

function QuestionCard({
  questionId,
  studentName,
  content,
  status,
  teacherAnswer,
  onAnswered,
}: QuestionCardProps) {

  const [showAnswerForm, setShowAnswerForm] =
    useState(false)

  const [answerContent, setAnswerContent] =
    useState("")

  const [error, setError] =
    useState("")

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!answerContent.trim()) {
      setError(
        "Cevap metni boş bırakılamaz."
      )
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      await answerQuestion(
        questionId,
        {
          content: answerContent.trim(),
        }
      )

      onAnswered(questionId)

      setAnswerContent("")
      setShowAnswerForm(false)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Soru cevaplanamadı."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <article>
      <h3>Öğrenci: {studentName}</h3>

      <p>Soru: {content}</p>

      <p>
        Durum: {statusLabels[status]}
      </p>
      {status === "answered" && teacherAnswer && (
  <div className="teacher-answer">
    <strong>Verdiğiniz cevap</strong>
    <p>{teacherAnswer}</p>
  </div>
)}

      {status === "pending" && (
        <>
          <button
            type="button"
            onClick={() =>
              setShowAnswerForm(
                !showAnswerForm
              )
            }
          >
            Soruyu Cevapla
          </button>

          {showAnswerForm && (
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor={`answer-${questionId}`}>
                  Cevabınız
                </label>

                <textarea
                  id={`answer-${questionId}`}
                  value={answerContent}
                  onChange={(event) =>
                    setAnswerContent(
                      event.target.value
                    )
                  }
                />
              </div>

              {error && (
                <p className="form-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Gönderiliyor..."
                  : "Cevabı Gönder"}
              </button>
            </form>
          )}
        </>
      )}
    </article>
  )
}

export default QuestionCard