type QuestionCardProps = {
  studentName: string
  content: string
  status: "pending" | "answered" | "escalated"
}

const statusLabels = {
  pending: "Beklemede",
  answered: "Cevaplandı",
  escalated: "Öğretmene Yönlendirildi",
}

function QuestionCard({
  studentName,
  content,
  status,
}: QuestionCardProps) {
  return (
    <article>
      <h3>Öğrenci: {studentName}</h3>
      <p>Soru: {content}</p>
      <p>Durum: {statusLabels[status]}</p>

      <button type="button">
  Soruyu Cevapla
</button>
    </article>
  )
}

export default QuestionCard