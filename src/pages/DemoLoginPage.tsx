import { useNavigate } from "react-router-dom"

function DemoLoginPage() {
  const navigate = useNavigate()

  function loginAsTeacher() {
    localStorage.setItem(
      "demoUserId",
      "teacher-1",
    )

    localStorage.setItem(
      "demoUserRole",
      "teacher",
    )

    navigate("/teacher")
  }

  function loginAsStudent() {
    localStorage.setItem(
      "demoUserId",
      "student-1",
    )

    localStorage.setItem(
      "demoUserRole",
      "student",
    )

    navigate("/student")
  }

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-intro">
          <span className="login-brand">
            Mini Eğitim Platformu
          </span>

          <h1>
            Öğrenme sürecini
            tek bir yerde yönetin.
          </h1>

          <p>
            Öğretmenlerin derslerini
            yönetebildiği, öğrencilerin
            içeriklere ulaşabildiği ve
            sorularını paylaşabildiği
            modern bir eğitim platformu.
          </p>

          <div className="login-feature-list">
            <span>
              Ders ve içerik yönetimi
            </span>

            <span>
              Öğrenci soru takibi
            </span>

            <span>
              Rol bazlı kullanıcı deneyimi
            </span>
          </div>
        </div>

        <div className="login-selection">
          <div className="login-selection-header">
            <p className="page-kicker">
              Demo Giriş
            </p>

            <h2>
              Nasıl devam etmek
              istersiniz?
            </h2>

            <p>
              Denemek istediğiniz kullanıcı
              rolünü seçin.
            </p>
          </div>

          <div className="login-role-grid">
            <article className="login-role-card">
              <div className="login-role-number">
                01
              </div>

              <span className="login-role-label">
                Öğretmen
              </span>

              <h3>
                Öğretmen Paneli
              </h3>

              <p>
                Ders oluşturun, içerikleri
                düzenleyin, öğrencileri
                takip edin ve gelen
                soruları yanıtlayın.
              </p>

              <ul>
                <li>
                  Ders yönetimi
                </li>

                <li>
                  Öğrenci takibi
                </li>

                <li>
                  Soru ve cevap yönetimi
                </li>
              </ul>

              <button
                type="button"
                className="login-role-button"
                onClick={loginAsTeacher}
              >
                Öğretmen olarak devam et
              </button>
            </article>

            <article className="login-role-card">
              <div className="login-role-number">
                02
              </div>

              <span className="login-role-label">
                Öğrenci
              </span>

              <h3>
                Öğrenci Paneli
              </h3>

              <p>
                Ders içeriklerini inceleyin,
                öğretmene soru gönderin ve
                verilen cevapları takip edin.
              </p>

              <ul>
                <li>
                  Derslere erişim
                </li>

                <li>
                  Öğretmene soru sorma
                </li>

                <li>
                  Cevapları takip etme
                </li>
              </ul>

              <button
                type="button"
                className="login-role-button"
                onClick={loginAsStudent}
              >
                Öğrenci olarak devam et
              </button>
            </article>
          </div>

          <p className="login-demo-note">
            Bu ekran demo amaçlı rol seçimi
            kullanmaktadır.
          </p>
        </div>
      </section>
    </main>
  )
}

export default DemoLoginPage