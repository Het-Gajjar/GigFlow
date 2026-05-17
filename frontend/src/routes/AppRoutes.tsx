import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Loader from '../components/common/Loader'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'))
const UserDashboardPage = lazy(() => import('../pages/UserDashboardPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader label="Loading workspace" />}>
        <Routes>
          <Route element={<Navigate replace to="/login" />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route element={<AdminDashboardPage />} path="/admin/dashboard" />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route element={<DashboardLayout />}>
              <Route element={<UserDashboardPage />} path="/dashboard" />
            </Route>
          </Route>

          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
