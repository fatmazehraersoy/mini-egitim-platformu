import {
  useEffect,
  useMemo,
  useState,
} from "react"

import Sidebar from "../components/Sidebar"

import {
  getStudents,
  type StudentResponse,
} from "../services/api"

function TeacherStudentsPage() {
  const [students, setStudents] =
    useState<StudentResponse[]>([])

  const [searchTerm, setSearchTerm] =
    useState("")

  const [selectedGrade, setSelectedGrade] =
    useState("all")

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    async function loadStudents() {
      try {
        setIsLoading(true)
        setError("")

        const data =
          await getStudents()

        setStudents(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Öğrenciler yüklenemedi.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [])

  const availableGrades =
    useMemo(() => {
      return Array.from(
        new Set(
          students.flatMap(
            (student) =>
              student.grades,
          ),
        ),
      ).sort((a, b) => a - b)
    }, [students])

  const filteredStudents =
    useMemo(() => {
      const normalizedSearch =
        searchTerm
          .trim()
          .toLocaleLowerCase(
            "tr-TR",
          )

      return students.filter(
        (student) => {
          const matchesSearch =
            !normalizedSearch ||
            student.name
              .toLocaleLowerCase(
                "tr-TR",
              )
              .includes(
                normalizedSearch,
              ) ||
            student.email
              .toLocaleLowerCase(
                "tr-TR",
              )
              .includes(
                normalizedSearch,
              )

          const matchesGrade =
            selectedGrade ===
              "all" ||
            student.grades.includes(
              Number(selectedGrade),
            )

          return (
            matchesSearch &&
            matchesGrade
          )
        },
      )
    }, [
      students,
      searchTerm,
      selectedGrade,
    ])

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
            label:
              "Yeni Ders Oluştur",
            path: "/teacher/lessons/new",
          },
        ]}
      />

      <main className="dashboard-main teacher-students-page">
        <section className="students-page-header">
          <div>
            <p className="page-kicker">
              Öğrenci Yönetimi
            </p>

            <h1>Öğrenciler</h1>

            <p className="page-description">
              Kurslarınıza kayıtlı
              öğrencileri ve soru
              durumlarını takip edin.
            </p>
          </div>

          <div className="students-total-badge">
            <span>Toplam</span>
            <strong>
              {students.length}
            </strong>
            <span>öğrenci</span>
          </div>
        </section>

        <section className="students-toolbar">
          <div className="student-search">
            <label htmlFor="student-search">
              Öğrenci Ara
            </label>

            <input
              id="student-search"
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value,
                )
              }
              placeholder="İsim veya e-posta ara..."
            />
          </div>

          <div className="student-grade-filter">
            <label htmlFor="student-grade">
              Sınıf
            </label>

            <select
              id="student-grade"
              value={selectedGrade}
              onChange={(event) =>
                setSelectedGrade(
                  event.target.value,
                )
              }
            >
              <option value="all">
                Tüm Sınıflar
              </option>

              {availableGrades.map(
                (grade) => (
                  <option
                    key={grade}
                    value={grade}
                  >
                    {grade}. Sınıf
                  </option>
                ),
              )}
            </select>
          </div>
        </section>

        {isLoading && (
          <p className="page-message">
            Öğrenciler yükleniyor...
          </p>
        )}

        {error && (
          <p className="page-error">
            {error}
          </p>
        )}

        {!isLoading &&
          !error &&
          filteredStudents.length ===
            0 && (
            <section className="empty-state">
              <h2>
                Öğrenci bulunamadı.
              </h2>

              <p>
                Arama veya sınıf
                filtresini değiştirmeyi
                deneyin.
              </p>
            </section>
          )}

        {!isLoading &&
          !error &&
          filteredStudents.length >
            0 && (
            <section className="students-list">
              {filteredStudents.map(
                (student) => (
                  <article
                    className="student-card"
                    key={student.id}
                  >
                    <div className="student-main-info">
                      <div className="student-avatar">
                        {student.name
                          .split(" ")
                          .map(
                            (part) =>
                              part[0],
                          )
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h2>
                          {student.name}
                        </h2>

                        <p>
                          {student.email}
                        </p>
                      </div>
                    </div>

                    <div className="student-card-section">
                      <span className="student-card-label">
                        Sınıf
                      </span>

                      <strong>
                        {student.grades
                          .map(
                            (grade) =>
                              `${grade}. Sınıf`,
                          )
                          .join(", ")}
                      </strong>
                    </div>

                    <div className="student-card-section">
                      <span className="student-card-label">
                        Kurslar
                      </span>

                      <div className="student-course-tags">
                        {student.courses.map(
                          (course) => (
                            <span
                              key={
                                course.id
                              }
                            >
                              {
                                course.title
                              }
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="student-question-summary">
                      <div>
                        <strong>
                          {
                            student.totalQuestions
                          }
                        </strong>
                        <span>
                          Toplam Soru
                        </span>
                      </div>

                      <div>
                        <strong>
                          {
                            student.answeredQuestions
                          }
                        </strong>
                        <span>
                          Cevaplandı
                        </span>
                      </div>

                      <div>
                        <strong>
                          {
                            student.pendingQuestions
                          }
                        </strong>
                        <span>
                          Bekliyor
                        </span>
                      </div>
                    </div>

                    {student.questions.length >
                      0 && (
                      <div className="student-latest-question">
                        <span className="student-card-label">
                          Son Soru
                        </span>

                        <p>
                          {
                            student.questions[
                              0
                            ].content
                          }
                        </p>

                        <small>
                          {
                            student.questions[
                              0
                            ].lessonTitle
                          }
                        </small>
                      </div>
                    )}
                  </article>
                ),
              )}
            </section>
          )}
      </main>
    </div>
  )
}

export default TeacherStudentsPage