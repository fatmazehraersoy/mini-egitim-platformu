import { Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"

import DemoLoginPage from "./pages/DemoLoginPage"

import TeacherDashboard from "./pages/TeacherDashboard"
import TeacherLessonsPage from "./pages/TeacherLessonsPage"
import TeacherLessonDetailPage from "./pages/TeacherLessonDetailPage"
import TeacherLessonEditPage from "./pages/TeacherLessonEditPage"
import TeacherQuestionsPage from "./pages/TeacherQuestionsPage"
import NewLessonPage from "./pages/NewLessonPage"

import StudentDashboard from "./pages/StudentDashboard"
import LessonDetailPage from "./pages/LessonDetailPage"
import AskQuestionPage from "./pages/AskQuestionPage"
import TeacherStudentsPage from "./pages/TeacherStudentsPage"
import StudentLessonsPage from "./pages/StudentLessonsPage"
import StudentQuestionsPage from "./pages/StudentQuestionsPage"

import NotFoundPage from "./pages/NotFoundPage"

import "./App.css"

function App() {
  return (
    <Routes>
      <Route
  path="/"
  element={<DemoLoginPage />}
/>

      <Route
        path="/login"
        element={<DemoLoginPage />}
      />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/teacher/students"
  element={
    <ProtectedRoute allowedRole="teacher">
      <TeacherStudentsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/lessons"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentLessonsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/questions"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentQuestionsPage />
    </ProtectedRoute>
  }
/>

      <Route
        path="/teacher/lessons"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherLessonsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/lessons/new"
        element={
          <ProtectedRoute allowedRole="teacher">
            <NewLessonPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/lessons/:lessonId"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherLessonDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
  path="/teacher/lessons/:lessonId/edit"
  element={
    <ProtectedRoute allowedRole="teacher">
      <TeacherLessonEditPage />
    </ProtectedRoute>
  }
/>

      <Route
        path="/teacher/questions"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherQuestionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/lessons/:lessonId"
  element={
    <ProtectedRoute allowedRole="student">
      <LessonDetailPage />
    </ProtectedRoute>
  }
/>

      <Route
  path="/ask"
  element={
    <ProtectedRoute allowedRole="student">
      <AskQuestionPage />
    </ProtectedRoute>
  }
/>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}

export default App