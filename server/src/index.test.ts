import request from "supertest"

import {
  describe,
  expect,
  it,
} from "vitest"

import { app } from "./index.js"

describe("POST /questions", () => {
  it("boş soru içeriğini reddetmeli", async () => {
    // Arrange
    const body = {
      lessonId: "lesson-1",
      content: "",
    }

    // Act
    const response = await request(app)
      .post("/questions")
      .set(
        "x-demo-user-id",
        "student-1"
      )
      .send(body)

    // Assert
    expect(response.status).toBe(400)

    expect(response.body.message).toBe(
      "Ders ve soru metni zorunludur."
    )
  })
})

describe("POST /questions/:id/answer", () => {
  it("öğrenci soru cevaplayamamalı", async () => {
    // Arrange
    const body = {
      content: "Öğrenci bu cevabı gönderememeli.",
    }

    // Act
    const response = await request(app)
      .post("/questions/question-1/answer")
      .set(
        "x-demo-user-id",
        "student-1"
      )
      .send(body)

    // Assert
    expect(response.status).toBe(403)

    expect(response.body.message).toBe(
      "Bu işlem için yetkiniz yok."
    )
  })
})