import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import SummaryCard from "../components/SummaryCard"
import LessonCard from "../components/LessonCard"
import QuestionCard from "../components/QuestionCard"
function TeacherDashboard() {
  return (
  <div className="dashboard">
    <Sidebar
      title="Menü"
      menuItems={[
        "Genel Bakış",
        "Dersler",
        "Sorular",
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
            value={3}
          />

          <SummaryCard
            title="Toplam Öğrenci"
            value={24}
          />

          <SummaryCard
            title="Bekleyen Sorular"
            value={5}
          />
        </div>
      </section>

      <div className="content-grid">
        <section className="dashboard-section">
          <h2>Dersler</h2>

          <LessonCard
            title="Kesirler"
            subject="Matematik"
            grade={6}
            description="Kesirlerde toplama ve çıkarma işlemleri"
          />
        </section>

        <section className="dashboard-section">
          <h2>Sorular</h2>

          <QuestionCard
            studentName="Ayşe"
            content="Paydaları neden eşitliyoruz?"
            status="pending"
          />
        </section>
      </div>
    </main>
  </div>
)
}

export default TeacherDashboard