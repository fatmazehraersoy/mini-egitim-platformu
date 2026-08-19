import {
  type FormEvent,
  useEffect,
  useState,
} from "react"

import {
  Link,
  useSearchParams,
} from "react-router-dom"

import Sidebar from "../components/Sidebar"

import {
  createQuestion,
  getMyLessons,
  type LessonResponse,
} from "../services/api"

const subjectLabels = {
  math: "Matematik",
  science: "Fen Bilimleri",
  english: "İngilizce",
}

function AskQuestionPage() {
  const [searchParams] =
    useSearchParams()

  const lessonFromUrl =
    searchParams.get("lessonId")

  const [lessons, setLessons] =
    useState<LessonResponse[]>([])

  const [
    selectedLessonId,
    setSelectedLessonId,
  ] = useState("")

  const [
    questionContent,
    setQuestionContent,
  ] = useState("")

  const [error, setError] =
    useState("")

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("")

  const [isLoading, setIsLoading] =
    useState(true)

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false)

  useEffect(() => {
    async function loadLessons() {
      try {
        setIsLoading(true)
        setError("")

        const lessonList =
          await getMyLessons()

        setLessons(lessonList)

        if (
          lessonFromUrl &&
          lessonList.some(
            (lesson) =>
              lesson.id === lessonFromUrl,
          )
        ) {
          setSelectedLessonId(
            lessonFromUrl,
          )
        } else if (
          lessonList.length > 0
        ) {
          setSelectedLessonId(
            lessonList[0].id,
          )
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Dersler yüklenemedi.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadLessons()
  }, [lessonFromUrl])

  const selectedLesson =
    lessons.find(
      (lesson) =>
        lesson.id === selectedLessonId,
    )

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!selectedLessonId) {
      setError(
        "Lütfen bir ders seçin.",
      )
      return
    }

    if (!questionContent.trim()) {
      setError(
        "Soru metni boş bırakılamaz.",
      )
      return
    }

    try {
      setIsSubmitting(true)
      setError("")
      setSuccessMessage("")

      await createQuestion({
        lessonId: selectedLessonId,
        content:
          questionContent.trim(),
      })

      setQuestionContent("")

      setSuccessMessage(
        "Sorunuz öğretmeninize başarıyla gönderildi.",
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Soru gönderilemedi.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

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

      <main className="dashboard-main ask-question-page">
        <Link
          to="/student"
          className="back-link"
        >
          ← Genel Bakışa Dön
        </Link>

        <section className="ask-question-header">
          <div>
            <p className="page-kicker">
              Öğretmenine Ulaş
            </p>

            <h1>Soru Sor</h1>

            <p className="page-description">
              Anlamadığınız bir noktayı
              dersinizi seçerek
              öğretmeninize
              gönderebilirsiniz.
            </p>
          </div>
        </section>

        {isLoading ? (
          <p className="page-message">
            Dersleriniz yükleniyor...
          </p>
        ) : lessons.length === 0 ? (
          <section className="empty-state">
            <h2>
              Soru sorabileceğiniz bir
              ders bulunamadı.
            </h2>

            <p>
              Önce bir kursa kayıtlı
              olmanız gerekiyor.
            </p>
          </section>
        ) : (
          <form
            className="ask-question-form"
            onSubmit={handleSubmit}
          >
            {error && (
              <p className="page-error">
                {error}
              </p>
            )}

            {successMessage && (
              <div className="question-success">
                <div>
                  <strong>
                    Soru gönderildi
                  </strong>

                  <p>
                    {successMessage}
                  </p>
                </div>

                <Link
                  to="/student/questions"
                  className="text-link"
                >
                  Sorularımı Gör →
                </Link>
              </div>
            )}

            <section className="ask-question-card">
              <div className="ask-question-section">
                <div className="ask-question-section-header">
                  <span>
                    01
                  </span>

                  <div>
                    <h2>
                      Dersini Seç
                    </h2>

                    <p>
                      Sorunuzun hangi
                      dersle ilgili olduğunu
                      belirtin.
                    </p>
                  </div>
                </div>

                <div className="question-form-group">
                  <label htmlFor="question-lesson">
                    Ders
                  </label>

                  <select
                    id="question-lesson"
                    value={
                      selectedLessonId
                    }
                    onChange={(event) => {
                      setSelectedLessonId(
                        event.target.value,
                      )

                      setSuccessMessage("")
                    }}
                  >
                    {lessons.map(
                      (lesson) => (
                        <option
                          key={
                            lesson.id
                          }
                          value={
                            lesson.id
                          }
                        >
                          {
                            lesson.title
                          }
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {selectedLesson && (
                  <div className="selected-lesson-preview">
                    <div>
                      <span className="soft-badge">
                        {
                          subjectLabels[
                            selectedLesson
                              .course
                              .subject
                          ]
                        }
                      </span>

                      <span className="selected-lesson-grade">
                        {
                          selectedLesson
                            .course.grade
                        }
                        . Sınıf
                      </span>
                    </div>

                    <h3>
                      {
                        selectedLesson.title
                      }
                    </h3>

                    <p>
                      {
                        selectedLesson.course
                          .title
                      }
                    </p>

                    <Link
                      to={`/lessons/${selectedLesson.id}`}
                      className="text-link"
                    >
                      Ders detayını gör →
                    </Link>
                  </div>
                )}
              </div>

              <div className="ask-question-divider" />

              <div className="ask-question-section">
                <div className="ask-question-section-header">
                  <span>
                    02
                  </span>

                  <div>
                    <h2>
                      Sorunu Yaz
                    </h2>

                    <p>
                      Anlamadığınız noktayı
                      mümkün olduğunca açık
                      şekilde anlatın.
                    </p>
                  </div>
                </div>

                <div className="question-form-group">
                  <label htmlFor="question-content">
                    Sorunuz
                  </label>

                  <textarea
                    id="question-content"
                    value={
                      questionContent
                    }
                    onChange={(event) => {
                      setQuestionContent(
                        event.target.value,
                      )

                      setSuccessMessage("")
                    }}
                    placeholder="Örn. Paydaları farklı olan kesirleri toplarken neden önce eşitliyoruz?"
                    rows={8}
                  />

                  <div className="question-writing-tip">
                    <span>
                      İpucu
                    </span>

                    <p>
                      Hangi adımda
                      zorlandığınızı
                      belirtmeniz,
                      öğretmeninizin daha
                      açıklayıcı cevap
                      vermesine yardımcı
                      olur.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="ask-question-actions">
              <Link
                to="/student/questions"
                className="cancel-button"
              >
                Sorularım
              </Link>

              <button
                type="submit"
                className="question-submit-button"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? "Gönderiliyor..."
                  : "Soruyu Gönder"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

export default AskQuestionPage