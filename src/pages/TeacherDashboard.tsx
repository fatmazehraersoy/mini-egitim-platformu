import {
  type FormEvent,
  useEffect,
  useState,
} from "react"

import Header from "../components/Header"
import LessonList from "../components/LessonList"
import QuestionCard from "../components/QuestionCard"
import Sidebar from "../components/Sidebar"
import SummaryCard from "../components/SummaryCard"

import { subjectLabels } from "../constants/lessonLabels"

import {
  lessons as initialLessons,
  questions,
  users,
} from "../data/mockData"

import type { Lesson } from "../types"

function TeacherDashboard() {
  const [lessonList, setLessonList] =
  useState<Lesson[]>(() => {
    const savedLessons =
      localStorage.getItem("lessonList")

    if (!savedLessons) {
      return initialLessons
    }

    try {
      return JSON.parse(savedLessons) as Lesson[]
    } catch {
      return initialLessons
    }
  })
  useEffect(() => {
  localStorage.setItem(
    "lessonList",
    JSON.stringify(lessonList)
  )
}, [lessonList])

const [formError, setFormError] = useState("")
  
    const [showOnlyPending, setShowOnlyPending] =
  useState(false)
  const totalLessons = lessonList.length
  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonSubject, setLessonSubject] =
    useState<Lesson["subject"]>("math")

  const [lessonGrade, setLessonGrade] =
    useState(6)
    const [lessonDescription, setLessonDescription] =
  useState("")

const [lessonDuration, setLessonDuration] =
  useState(30)


  const totalStudents = users.filter(
    (user) => user.role === "student"
  ).length

  const pendingQuestions = questions.filter(
    (question) => question.status === "pending"
  ).length

  const visibleQuestions = showOnlyPending
  ? questions.filter(
      (question) => question.status === "pending"
    )
  : questions
  function handleSubmit(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault()

  const trimmedTitle = lessonTitle.trim()
  const trimmedDescription = lessonDescription.trim()

  if (lessonTitle.trim() === "") {
  setFormError(
    "Ders başlığı boş bırakılamaz. Lütfen bir ders başlığı yazın."
  )
  return
}

if (lessonDescription.trim() === "") {
  setFormError(
    "Lütfen ders hakkında kısa bir açıklama yazın."
  )
  return
}

if (lessonDuration <= 0) {
  setFormError(
    "Tahmini süre 1 dakikadan büyük olmalıdır."
  )
  return
}

  const newLesson: Lesson = {
    id: `lesson-${Date.now()}`,
    title: trimmedTitle,
    subject: lessonSubject,
    grade: lessonGrade,
    description: trimmedDescription,
    estimatedDuration: lessonDuration,
    isPublished: false,
    teacherId: "teacher-1",
  }

  setLessonList((currentLessons) => [
    ...currentLessons,
    newLesson,
  ])

  setLessonTitle("")
  setLessonSubject("math")
  setLessonGrade(6)
  setLessonDescription("")
  setLessonDuration(30)
  setFormError("")
}
function handleDeleteLesson(lessonId: string) {
  setLessonList((currentLessons) =>
    currentLessons.filter(
      (lesson) => lesson.id !== lessonId
    )
  )
}
function handleToggleLessonPublished(
  lessonId: string
) {
  setLessonList((currentLessons) =>
    currentLessons.map((lesson) => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          isPublished: !lesson.isPublished,
        }
      }

      return lesson
    })
  )
}
  return (
    <div className="dashboard">
      <Sidebar
  title="Menü"
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
      label: "Yeni Ders Oluştur",
      path: "/teacher/lessons/new",
    },
  ]}
/>

      <main className="dashboard-main">
        <Header
          title="Öğretmen Paneli"
          teacherName="Zehra Ersoy"
        />

        <section className="dashboard-section">
          <h2>Özet</h2>

          <div className="summary-grid">
            <SummaryCard
              title="Toplam Ders"
              value={totalLessons}
            />

            <SummaryCard
              title="Toplam Öğrenci"
              value={totalStudents}
            />

            <SummaryCard
              title="Bekleyen Sorular"
              value={pendingQuestions}
            />
          </div>
        </section>

        <div className="content-grid">
  <section className="dashboard-section">
    <h2>Dersler</h2>

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
      type="text"
      value={lessonTitle}
      onChange={(event) =>
        setLessonTitle(event.target.value)
      }
    />
  </div>

  <div className="form-field">
    <label htmlFor="lesson-subject">
      Ders türü
    </label>

    <select
      id="lesson-subject"
      value={lessonSubject}
      onChange={(event) =>
        setLessonSubject(
          event.target.value as Lesson["subject"]
        )
      }
    >
      <option value="math">Matematik</option>
      <option value="science">Fen</option>
      <option value="english">İngilizce</option>
    </select>
  </div>

  <div className="form-field">
    <label htmlFor="lesson-grade">
      Sınıf seviyesi
    </label>

    <input
      id="lesson-grade"
      type="number"
      min={5}
      max={8}
      value={lessonGrade}
      onChange={(event) =>
        setLessonGrade(
          Number(event.target.value)
        )
      }
    />
  </div>

  <div className="form-field">
    <label htmlFor="lesson-description">
      Açıklama
    </label>

    <textarea
      id="lesson-description"
      value={lessonDescription}
      onChange={(event) =>
        setLessonDescription(
          event.target.value
        )
      }
    />
  </div>

  <div className="form-field">
    <label htmlFor="lesson-duration">
      Tahmini süre (dakika)
    </label>

    <input
      id="lesson-duration"
      type="number"
      min={1}
      value={lessonDuration}
      onChange={(event) =>
        setLessonDuration(
          Number(event.target.value)
        )
      }
    />
  </div>

  {formError && (
    <p className="form-error">
      {formError}
    </p>
  )}

  <button type="submit">
  Yeni Ders Oluştur
</button>
</form>

    <p>
  Önizleme: {lessonTitle || "Başlık girilmedi"} —{" "}
  {subjectLabels[lessonSubject]} — {lessonGrade}. sınıf
</p>

  <LessonList
  lessonList={lessonList}
  onDeleteLesson={handleDeleteLesson}
  onToggleLessonPublished={
    handleToggleLessonPublished
  }
/>
  </section>
          <section className="dashboard-section">
            <h2>Sorular</h2>

  <button
    onClick={() =>
      setShowOnlyPending(!showOnlyPending)
    }
  >
    {showOnlyPending
      ? "Tüm Soruları Göster"
      : "Yalnızca Bekleyen Soruları Göster"}
  </button>

  {visibleQuestions.length === 0 ? (
  <div className="empty-state">
    <h3>Gösterilecek soru bulunmuyor</h3>

    <p>
      {showOnlyPending
        ? "Şu anda bekleyen bir öğrenci sorusu yok."
        : "Henüz öğrenciler tarafından soru gönderilmedi."}
    </p>
  </div>
) : (
  visibleQuestions.map((question) => {
    const student = users.find(
      (user) =>
        user.id === question.studentId
    )

    return (
      <QuestionCard
        key={question.id}
        studentName={
          student?.name ??
          "Bilinmeyen öğrenci"
        }
        content={question.content}
        status={question.status}
      />
    )
  })
)}
</section>

        </div>
      </main>
    </div>
  )
}

export default TeacherDashboard