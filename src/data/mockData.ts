export type Lesson = {
  id: number
  title: string
  subject: string
  grade: number
  completed: boolean
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Kesirler",
    subject: "Matematik",
    grade: 6,
    completed: false,
  },
  {
    id: 2,
    title: "Güneş Sistemi",
    subject: "Fen",
    grade: 6,
    completed: true,
  },
]