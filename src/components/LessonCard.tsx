type LessonCardProps = {
  title: string
  subject: string
  grade: number
  description?: string
}

function LessonCard({
  title,
  subject,
  grade,
  description,
}: LessonCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>Ders: {subject}</p>
      <p>Sınıf: {grade}</p>

      {description && (
        <p>{description}</p>
      )}

      <button>Dersi Görüntüle</button>
    </article>
  )
}

export default LessonCard