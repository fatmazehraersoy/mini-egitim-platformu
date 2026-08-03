import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import TeacherDashboard from "./pages/TeacherDashboard"
import TeacherLessonsPage from "./pages/TeacherLessonsPage"
import NewLessonPage from "./pages/NewLessonPage"
import StudentDashboard from "./pages/StudentDashboard"
import LessonDetailPage from "./pages/LessonDetailPage"
import AskQuestionPage from "./pages/AskQuestionPage"
import NotFoundPage from "./pages/NotFoundPage"

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
        element={<TeacherDashboard />}
      />

      <Route
        path="/teacher/lessons"
        element={<TeacherLessonsPage />}
      />

      <Route
        path="/teacher/lessons/new"
        element={<NewLessonPage />}
      />

      <Route
        path="/student"
        element={<StudentDashboard />}
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
    </Routes>
  )
}

export default App