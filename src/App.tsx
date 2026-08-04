import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AdminLayout } from './components/layout/AdminLayout'
import { RequireAuth } from './auth/RequireAuth'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import DashboardCompactPage from './pages/DashboardCompactPage'
import CoursesPage from './pages/CoursesPage'
import ProfilePage from './pages/ProfilePage'
import SchedulePage from './pages/SchedulePage'
import AttendancePage from './pages/AttendancePage'
import VideoConfPage from './pages/VideoConfPage'
import NotificationsPage from './pages/NotificationsPage'
import AssignmentsPage from './pages/AssignmentsPage'
import GradesPage from './pages/GradesPage'
import MessagingPage from './pages/MessagingPage'
import SettingsPage from './pages/SettingsPage'
import LibraryPage from './pages/LibraryPage'
import HelpPage from './pages/HelpPage'
import TeacherCoursesPage from './pages/TeacherCoursesPage'
import DelegateAttendancePage from './pages/DelegateAttendancePage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminCoursesPage from './pages/admin/AdminCoursesPage'
import StudentsPage from './pages/admin/StudentsPage'
import TeachersPage from './pages/admin/TeachersPage'
import AcademicStructurePage from './pages/admin/AcademicStructurePage'
import UEPage from './pages/admin/UEPage'
import ClassroomsPage from './pages/admin/ClassroomsPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function StudentShell() {
  return (
    <RequireAuth roles={['student', 'delegate', 'teacher']}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </RequireAuth>
  )
}

function AdminShell() {
  return (
    <RequireAuth roles={['admin']}>
      <AdminLayout />
    </RequireAuth>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/app" element={<StudentShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="accueil-compact" element={<DashboardCompactPage />} />
        <Route path="cours" element={<CoursesPage />} />
        <Route path="profil" element={<ProfilePage />} />
        <Route path="emploi-du-temps" element={<SchedulePage />} />
        <Route path="presences" element={<AttendancePage />} />
        <Route path="gestion-presences" element={<DelegateAttendancePage />} />
        <Route path="mes-cours-enseignant" element={<TeacherCoursesPage />} />
        <Route path="visioconference" element={<VideoConfPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="devoirs" element={<AssignmentsPage />} />
        <Route path="notes" element={<GradesPage />} />
        <Route path="messages" element={<MessagingPage />} />
        <Route path="parametres" element={<SettingsPage />} />
        <Route path="bibliotheque" element={<LibraryPage />} />
        <Route path="aide" element={<HelpPage />} />
      </Route>

      <Route path="/admin" element={<AdminShell />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="utilisateurs" element={<AdminUsersPage />} />
        <Route path="etudiants" element={<StudentsPage />} />
        <Route path="enseignants" element={<TeachersPage />} />
        <Route path="structure" element={<AcademicStructurePage />} />
        <Route path="cours" element={<AdminCoursesPage />} />
        <Route path="ue" element={<UEPage />} />
        <Route path="salles" element={<ClassroomsPage />} />
        <Route path="parametres" element={<AdminSettingsPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
