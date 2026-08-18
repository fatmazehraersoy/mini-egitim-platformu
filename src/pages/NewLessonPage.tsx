import {
  type FormEvent,
  useEffect,
  useState,
} from "react"

import { useNavigate } from "react-router-dom"

import Sidebar from "../components/Sidebar"

import {
  createLesson,
  getCourses,
  type CourseResponse,
} from "../services/api"

function NewLessonPage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [courses, setCourses] =
    useState<CourseResponse[]>([])

  const [selectedCourseId, setSelectedCourseId] =
    useState("")

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  useEffect(() => {
    async function loadCourses() {
      try {
        const courseList = await getCourses()

        setCourses(courseList)

        if (courseList.length > 0) {
          setSelectedCourseId(courseList[0].id)
        }
      } catch {
        setError("Kurslar yüklenemedi.")
      }
    }

    loadCourses()
  }, [])

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!title.trim()) {
      setError(
        "Ders başlığı boş bırakılamaz."
      )
      return
    }

    if (!content.trim()) {
      setError(
        "Ders içeriği boş bırakılamaz."
      )
      return
    }

    if (!selectedCourseId) {
      setError("Lütfen bir kurs seçin.")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      await createLesson({
        title: title.trim(),
        content: content.trim(),
        courseId: selectedCourseId,
      })

      navigate("/teacher/lessons")
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ders oluşturulamadı."
      )
    } finally {
      setIsSubmitting(false)
    }
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
        <section className="dashboard-section">
          <p className="section-eyebrow">
            Ders Yönetimi
          </p>

          <h1>Yeni Ders Oluştur</h1>

          <form
            className="lesson-form"
            onSubmit={handleSubmit}
          >
            <div className="form-field">
              <label htmlFor="lesson-title">
                Ders başlığı
              </label>

              <input
                id="lesson-title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
              />
            </div>

            <div className="form-field">
              <label htmlFor="lesson-course">
                Kurs
              </label>

              <select
                id="lesson-course"
                value={selectedCourseId}
                onChange={(event) =>
                  setSelectedCourseId(
                    event.target.value
                  )
                }
              >
                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="lesson-content">
                Ders içeriği
              </label>

              <textarea
                id="lesson-content"
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
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
                ? "Oluşturuluyor..."
                : "Dersi Oluştur"}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default NewLessonPage