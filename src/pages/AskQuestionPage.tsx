import {
  type FormEvent,
  useEffect,
  useState,
} from "react"

import {
  createQuestion,
  getLessons,
  type LessonResponse,
} from "../services/api"

function AskQuestionPage() {
  const [lessons, setLessons] =
    useState<LessonResponse[]>([])

  const [selectedLessonId, setSelectedLessonId] =
    useState("")

  const [questionContent, setQuestionContent] =
    useState("")

  const [error, setError] =
    useState("")

  const [successMessage, setSuccessMessage] =
    useState("")

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  useEffect(() => {
    async function loadLessons() {
      try {
        const lessonList = await getLessons()

        setLessons(lessonList)

        if (lessonList.length > 0) {
          setSelectedLessonId(
            lessonList[0].id
          )
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Dersler yüklenemedi."
        )
      }
    }

    loadLessons()
  }, [])

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (
      !selectedLessonId ||
      !questionContent.trim()
    ) {
      setError(
        "Ders seçimi ve soru metni zorunludur."
      )
      return
    }

    try {
      setIsSubmitting(true)
      setError("")
      setSuccessMessage("")

      await createQuestion({
        lessonId: selectedLessonId,
        content: questionContent.trim(),
      })

      setQuestionContent("")
      setSuccessMessage(
        "Sorunuz başarıyla gönderildi."
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Soru gönderilemedi."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <h1>Soru Sor</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="question-lesson">
            Ders
          </label>

          <select
            id="question-lesson"
            value={selectedLessonId}
            onChange={(event) =>
              setSelectedLessonId(
                event.target.value
              )
            }
          >
            {lessons.map((lesson) => (
              <option
                key={lesson.id}
                value={lesson.id}
              >
                {lesson.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="question-content">
            Sorunuz
          </label>

          <textarea
            id="question-content"
            value={questionContent}
            onChange={(event) =>
              setQuestionContent(
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

        {successMessage && (
          <p>{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Gönderiliyor..."
            : "Soruyu Gönder"}
        </button>
      </form>
    </main>
  )
}

export default AskQuestionPage