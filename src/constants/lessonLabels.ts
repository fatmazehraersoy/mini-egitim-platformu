import type { Lesson } from "../types"

export const subjectLabels: Record<
  Lesson["subject"],
  string
> = {
  math: "Matematik",
  science: "Fen",
  english: "İngilizce",
}