import "dotenv/config"

import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

import { PrismaClient } from "../src/generated/prisma/client.js"

const connectionString =
  process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    "DATABASE_URL environment variable bulunamadı."
  )
}

const pool = new Pool({
  connectionString,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const teacher = await prisma.user.upsert({
    where: {
      email: "zehra@example.com",
    },
    update: {
      name: "Zehra Ersoy",
      role: "teacher",
    },
    create: {
      id: "teacher-1",
      name: "Zehra Ersoy",
      email: "zehra@example.com",
      role: "teacher",
    },
  })

  const student = await prisma.user.upsert({
    where: {
      email: "ece@example.com",
    },
    update: {
      name: "Ece Demir",
      role: "student",
    },
    create: {
      id: "student-1",
      name: "Ece Demir",
      email: "ece@example.com",
      role: "student",
    },
  })

  const secondStudent = await prisma.user.upsert({
  where: {
    email: "mert@example.com",
  },
  update: {
    name: "Mert Kaya",
    role: "student",
  },
  create: {
    id: "student-2",
    name: "Mert Kaya",
    email: "mert@example.com",
    role: "student",
  },
})

  const course = await prisma.course.upsert({
    where: {
      id: "course-1",
    },
    update: {
      title: "6. Sınıf Matematik",
      subject: "math",
      grade: 6,
      teacherId: teacher.id,
    },
    create: {
      id: "course-1",
      title: "6. Sınıf Matematik",
      subject: "math",
      grade: 6,
      teacherId: teacher.id,
    },
  })
  const scienceCourse = await prisma.course.upsert({
  where: { id: "course-2" },
  update: {
    title: "6. Sınıf Fen",
    subject: "science",
    grade: 6,
    teacherId: teacher.id,
  },
  create: {
    id: "course-2",
    title: "6. Sınıf Fen",
    subject: "science",
    grade: 6,
    teacherId: teacher.id,
  },
})

const englishCourse = await prisma.course.upsert({
  where: { id: "course-3" },
  update: {
    title: "6. Sınıf İngilizce",
    subject: "english",
    grade: 6,
    teacherId: teacher.id,
  },
  create: {
    id: "course-3",
    title: "6. Sınıf İngilizce",
    subject: "english",
    grade: 6,
    teacherId: teacher.id,
  },
})

  const lesson = await prisma.lesson.upsert({
    where: {
      id: "lesson-1",
    },
    update: {
      title: "Kesirlerde Dört İşlem",
      content:
        "Kesirlerde toplama, çıkarma, çarpma ve bölme işlemleri.",
      courseId: course.id,
    },
    create: {
      id: "lesson-1",
      title: "Kesirlerde Dört İşlem",
      content:
        "Kesirlerde toplama, çıkarma, çarpma ve bölme işlemleri.",
      courseId: course.id,
    },
  })

  const question =
    await prisma.question.upsert({
      where: {
        id: "question-1",
      },
      update: {
        content:
          "Paydaları farklı kesirleri toplarken neden eşitliyoruz?",
        status: "pending",
        studentId: student.id,
        lessonId: lesson.id,
      },
      create: {
        id: "question-1",
        content:
          "Paydaları farklı kesirleri toplarken neden eşitliyoruz?",
        status: "pending",
        studentId: student.id,
        lessonId: lesson.id,
      },
    })

  console.log("Seed işlemi tamamlandı.")

  const secondQuestion =
  await prisma.question.upsert({
    where: {
      id: "question-2",
    },
    update: {
      content:
        "Kesirlerde bölme işlemini anlayamadım.",
      status: "pending",
      studentId: secondStudent.id,
      lessonId: lesson.id,
    },
    create: {
      id: "question-2",
      content:
        "Kesirlerde bölme işlemini anlayamadım.",
      status: "pending",
      studentId: secondStudent.id,
      lessonId: lesson.id,
    },
  })

  console.log({
    teacher,
    student,
    course,
    lesson,
    question,
  })
}

main()
  .catch((error) => {
    console.error(
      "Seed işlemi başarısız oldu:",
      error
    )

    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })