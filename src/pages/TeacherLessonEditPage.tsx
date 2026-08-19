import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom"

import Sidebar from "../components/Sidebar"
import RichTextEditor from "../components/RichTextEditor"

import {
  getCourses,
  getLessonById,
  updateLesson,
  uploadLessonCover,
  type CourseResponse,
} from "../services/api"

const API_URL = import.meta.env.VITE_API_URL

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
]

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024

function TeacherLessonEditPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] =
    useState("")

  const [content, setContent] =
    useState("")

  const [courseId, setCourseId] =
    useState("")

  const [courses, setCourses] =
    useState<CourseResponse[]>([])

  const [
    existingCoverImageUrl,
    setExistingCoverImageUrl,
  ] = useState<string | null>(null)

  const [
    coverImageAlt,
    setCoverImageAlt,
  ] = useState("")

  const [
    selectedCoverFile,
    setSelectedCoverFile,
  ] = useState<File | null>(null)

  const [
    coverPreview,
    setCoverPreview,
  ] = useState<string | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false)

  const [error, setError] =
    useState("")

  useEffect(() => {
    async function loadPage() {
      if (!lessonId) {
        setError(
          "Ders bilgisi bulunamadı.",
        )

        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError("")

        const [
          lessonData,
          courseData,
        ] = await Promise.all([
          getLessonById(lessonId),
          getCourses(),
        ])

        setTitle(
          lessonData.title,
        )

        setContent(
          lessonData.content,
        )

        setCourseId(
          lessonData.courseId,
        )

        setCourses(
          courseData,
        )

        setExistingCoverImageUrl(
          lessonData.coverImageUrl,
        )

        setCoverImageAlt(
          lessonData.coverImageAlt ?? "",
        )
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Ders bilgileri yüklenemedi.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPage()
  }, [lessonId])

  function handleCoverImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    if (
      !allowedImageTypes.includes(
        file.type,
      )
    ) {
      setError(
        "Kapak görseli JPG, PNG veya WebP formatında olmalıdır.",
      )

      event.target.value = ""
      return
    }

    if (
      file.size > MAX_IMAGE_SIZE
    ) {
      setError(
        "Kapak görseli en fazla 5 MB olabilir.",
      )

      event.target.value = ""
      return
    }

    setError("")
    setSelectedCoverFile(file)

    const reader =
      new FileReader()

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        setCoverPreview(
          reader.result,
        )
      }
    }

    reader.readAsDataURL(file)
  }

  function handleRemoveSelectedImage() {
    setSelectedCoverFile(null)
    setCoverPreview(null)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!lessonId) {
      return
    }

    if (!title.trim()) {
      setError(
        "Ders başlığı boş bırakılamaz.",
      )
      return
    }

    if (!content.trim()) {
      setError(
        "Ders içeriği boş bırakılamaz.",
      )
      return
    }

    if (!courseId) {
      setError(
        "Lütfen bir kurs seçin.",
      )
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      await updateLesson(
        lessonId,
        {
          title,
          content,
          courseId,
        },
      )

      if (selectedCoverFile) {
        await uploadLessonCover(
          lessonId,
          selectedCoverFile,
          coverImageAlt,
        )
      }

      navigate(
        `/teacher/lessons/${lessonId}`,
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ders güncellenemedi.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayedCoverImage =
    coverPreview ??
    (
      existingCoverImageUrl
        ? `${API_URL}${existingCoverImageUrl}`
        : null
    )

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

      <main className="dashboard-main lesson-edit-page">
        <Link
          to={
            lessonId
              ? `/teacher/lessons/${lessonId}`
              : "/teacher/lessons"
          }
          className="back-link"
        >
          ← Ders Detayına Dön
        </Link>

        <section className="lesson-edit-header">
          <div>
            <p className="page-kicker">
              Ders Yönetimi
            </p>

            <h1>
              Dersi Düzenle
            </h1>

            <p className="page-description">
              Ders bilgilerini ve
              kapak görselini
              güncelleyebilirsiniz.
            </p>
          </div>
        </section>

        {isLoading && (
          <p className="page-message">
            Ders bilgileri
            yükleniyor...
          </p>
        )}

        {!isLoading && (
          <form
            className="lesson-edit-form"
            onSubmit={
              handleSubmit
            }
          >
            {error && (
              <p className="page-error">
                {error}
              </p>
            )}

            <div className="lesson-edit-layout">
              <section className="lesson-edit-fields">
                <div className="form-group">
                  <label htmlFor="lesson-title">
                    Ders Başlığı
                  </label>

                  <input
                    id="lesson-title"
                    type="text"
                    value={title}
                    onChange={(
                      event,
                    ) =>
                      setTitle(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Ders başlığını yazın"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lesson-course">
                    Kurs
                  </label>

                  <select
                    id="lesson-course"
                    value={courseId}
                    onChange={(
                      event,
                    ) =>
                      setCourseId(
                        event.target
                          .value,
                      )
                    }
                  >
                    <option value="">
                      Kurs seçin
                    </option>

                    {courses.map(
                      (course) => (
                        <option
                          key={
                            course.id
                          }
                          value={
                            course.id
                          }
                        >
                          {
                            course.title
                          }
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="form-group">
  <label>
    Ders İçeriği
  </label>

  <RichTextEditor
    value={content}
    onChange={setContent}
  />
</div>
              </section>

              <aside className="lesson-cover-panel">
                <div className="lesson-cover-panel-header">
                  <div>
                    <p className="page-kicker">
                      Görsel
                    </p>

                    <h2>
                      Kapak Görseli
                    </h2>
                  </div>
                </div>

                <div className="lesson-cover-preview">
                  {displayedCoverImage ? (
                    <img
                      src={
                        displayedCoverImage
                      }
                      alt={
                        coverImageAlt ||
                        "Ders kapak görseli"
                      }
                    />
                  ) : (
                    <div className="lesson-cover-placeholder">
                      <span>
                        🖼️
                      </span>

                      <p>
                        Henüz kapak
                        görseli yok
                      </p>
                    </div>
                  )}
                </div>

                <div className="lesson-cover-controls">
                  <label
                    htmlFor="lesson-cover-image"
                    className="cover-upload-button"
                  >
                    {displayedCoverImage
                      ? "Görseli Değiştir"
                      : "Görsel Seç"}
                  </label>

                  <input
                    id="lesson-cover-image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleCoverImageChange
                    }
                    className="visually-hidden-file-input"
                  />

                  {coverPreview && (
                    <button
                      type="button"
                      className="cover-remove-button"
                      onClick={
                        handleRemoveSelectedImage
                      }
                    >
                      Seçimi İptal Et
                    </button>
                  )}

                  <p className="cover-help-text">
                    JPG, PNG veya WebP
                    • Maksimum 5 MB
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="cover-alt">
                    Görsel Alt Metni
                  </label>

                  <input
                    id="cover-alt"
                    type="text"
                    value={
                      coverImageAlt
                    }
                    onChange={(
                      event,
                    ) =>
                      setCoverImageAlt(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Örn. Kesirleri anlatan ders görseli"
                  />

                  <small className="form-help">
                    Görseli
                    göremeyen kullanıcılar
                    için kısa bir açıklama
                    yazın.
                  </small>
                </div>
              </aside>
            </div>

            <div className="lesson-edit-actions">
              <Link
                to={
                  lessonId
                    ? `/teacher/lessons/${lessonId}`
                    : "/teacher/lessons"
                }
                className="cancel-button"
              >
                İptal
              </Link>

              <button
                type="submit"
                className="primary-button"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? "Kaydediliyor..."
                  : "Değişiklikleri Kaydet"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

export default TeacherLessonEditPage