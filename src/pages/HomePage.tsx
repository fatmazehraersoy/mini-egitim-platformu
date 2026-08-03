import { Link } from "react-router-dom"

function HomePage() {
  return (
    <main>
      <h1>Mini Eğitim Platformu</h1>
      <p>Devam etmek için kullanıcı türünü seçin.</p>

      <Link to="/teacher">
        Öğretmen Girişi
      </Link>

      <Link to="/student">
        Öğrenci Girişi
      </Link>
    </main>
  )
}

export default HomePage