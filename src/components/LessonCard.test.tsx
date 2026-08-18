import {
  render,
  screen,
} from "@testing-library/react"

import { MemoryRouter } from "react-router-dom"

import {
  describe,
  expect,
  it,
  vi,
} from "vitest"

import LessonCard from "./LessonCard"

import type { Lesson } from "../types"

describe("LessonCard", () => {
  it("verilen ders başlığını göstermeli", () => {
    // Arrange
    const lesson: Lesson = {
      id: "lesson-1",
      title: "Kesirlerde Dört İşlem",
      subject: "math",
      grade: 6,
      description: "Kesirler konusu",
      estimatedDuration: 30,
      isPublished: false,
      teacherId: "teacher-1",
    }

    // Act
    render(
      <MemoryRouter>
        <LessonCard
          lesson={lesson}
          onDeleteLesson={vi.fn()}
          onToggleLessonPublished={vi.fn()}
        />
      </MemoryRouter>
    )

    // Assert
    expect(
      screen.getByRole("heading", {
        name: "Kesirlerde Dört İşlem",
      })
    ).toBeInTheDocument()
  })
})