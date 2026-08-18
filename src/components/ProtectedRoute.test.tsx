import {
  render,
  screen,
} from "@testing-library/react"

import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom"

import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest"

import ProtectedRoute from "./ProtectedRoute"

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("öğrenci öğretmen sayfasına ulaşamamalı", () => {
    // Arrange
    localStorage.setItem(
      "demoUserId",
      "student-1"
    )

    localStorage.setItem(
      "demoUserRole",
      "student"
    )

    // Act
    render(
      <MemoryRouter
        initialEntries={["/teacher"]}
      >
        <Routes>
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <h1>Öğretmen Paneli</h1>
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<h1>Demo Giriş</h1>}
          />
        </Routes>
      </MemoryRouter>
    )

    // Assert
    expect(
      screen.getByRole("heading", {
        name: "Demo Giriş",
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole("heading", {
        name: "Öğretmen Paneli",
      })
    ).not.toBeInTheDocument()
  })
})