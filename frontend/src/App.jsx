import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardPage from './pages/private/DashboardPage'
import HomePage from './pages/private/HomePage'
import MainLayout from './layouts/MainLayout'
import ProjectPage from './pages/private/ProjectPage'
import BoardPage from './pages/private/BoardPage'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public: */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            {/* Private: */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/dashboard/projects/:projectId' element={<ProjectPage />} />
                <Route path='/dashboard/projects/:projectId/boards/:boardId' element={<BoardPage />} />
                <Route path='/home' element={<HomePage />} />
              </Route>
            </Route>
            <Route path='/*' element={<Navigate to='/home' />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
