import { useNavigate } from "react-router-dom"

function DemoLoginPage() {
  const navigate = useNavigate()

  function loginAsTeacher() {
    localStorage.setItem("demoUserId", "teacher-1")
    localStorage.setItem("demoUserRole", "teacher")

    navigate("/teacher")
  }

  function loginAsStudent() {
    localStorage.setItem("demoUserId", "student-1")
    localStorage.setItem("demoUserRole", "student")

    navigate("/student")
  }

  return (
    <main>
      <h1>Demo Giriş</h1>

      <p>
        Demo authentication — production için uygun değildir.
      </p>

      <button onClick={loginAsTeacher}>
        Öğretmen olarak giriş yap
      </button>

      <button onClick={loginAsStudent}>
        Öğrenci olarak giriş yap
      </button>
    </main>
  )
}

export default DemoLoginPage