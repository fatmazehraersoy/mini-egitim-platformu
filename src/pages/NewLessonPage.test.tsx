import {
  render,
  screen,
} from "@testing-library/react"

import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import NewLessonPage from "./NewLessonPage"

import {
  createLesson,
  getCourses,
} from "../services/api"

vi.mock("../services/api", () => ({
  createLesson: vi.fn(),
  getCourses: vi.fn(),
}))

describe("NewLessonPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(getCourses).mockResolvedValue([
      {
        id: "course-1",
        title: "6. Sınıf Matematik",
        subject: "math",
        grade: 6,
        teacherId: "teacher-1",
      },
    ])
  })

  it("ders başlığı boşsa form gönderilmemeli", async () => {
    // Arrange
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <NewLessonPage />
      </MemoryRouter>
    )

    // Act
    await user.click(
      screen.getByRole("button", {
        name: "Dersi Oluştur",
      })
    )

    // Assert
    expect(
      await screen.findByText(
        "Ders başlığı boş bırakılamaz."
      )
    ).toBeInTheDocument()

    expect(createLesson).not.toHaveBeenCalled()
  })
})