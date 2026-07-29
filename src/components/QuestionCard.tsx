type QuestionCardProps = {
  studentName: string
  content: string
  status: "pending" | "answered" | "escalated"
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
      <p>Durum: {status}</p>

      <button>Cevapla</button>
    </article>
  )
}

export default QuestionCard