import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import TeacherDashboard from "./pages/TeacherDashboard"
import TeacherLessonsPage from "./pages/TeacherLessonsPage"
import NewLessonPage from "./pages/NewLessonPage"
import StudentDashboard from "./pages/StudentDashboard"
import LessonDetailPage from "./pages/LessonDetailPage"
import AskQuestionPage from "./pages/AskQuestionPage"
import NotFoundPage from "./pages/NotFoundPage"
import DemoLoginPage from "./pages/DemoLoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
import TeacherQuestionsPage from "./pages/TeacherQuestionsPage"

import "./App.css"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
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
  path="/student"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

      <Route
        path="/lessons/:lessonId"
        element={<LessonDetailPage />}
      />

      <Route
        path="/ask"
        element={<AskQuestionPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />

      <Route
  path="/login"
  element={<DemoLoginPage />}
/>

<Route
  path="/teacher/questions"
  element={
    <ProtectedRoute allowedRole="teacher">
      <TeacherQuestionsPage />
    </ProtectedRoute>
  }
/>

    </Routes>
  )
}

export default App