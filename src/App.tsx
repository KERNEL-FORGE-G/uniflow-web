import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AdminLayout } from './components/layout/AdminLayout'
import { RoleProvider } from './utils/userRole'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import DashboardCompactPage from './pages/DashboardCompactPage'
import CoursesPage from './pages/CoursesPage'
import ProfilePage from './pages/ProfilePage'
import SchedulePage from './pages/SchedulePage'
import AttendancePage from './pages/AttendancePage'
import VideoConfPage from './pages/VideoConfPage'
import VideoConferenceRoomPage from './pages/VideoConferenceRoomPage'
import NotificationsPage from './pages/NotificationsPage'
import AssignmentsPage from './pages/AssignmentsPage'
import GradesPage from './pages/GradesPage'
import MessagingPage from './pages/MessagingPage'
import SettingsPage from './pages/SettingsPage'
import LibraryPage from './pages/LibraryPage'
import HelpPage from './pages/HelpPage'
import AttendanceManagePage from './pages/AttendanceManagePage'
import TeacherCoursesPage from './pages/TeacherCoursesPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminCoursesPage from './pages/admin/AdminCoursesPage'
import StudentsPage from './pages/admin/StudentsPage'
import TeachersPage from './pages/admin/TeachersPage'
import AcademicStructurePage from './pages/admin/AcademicStructurePage'
import UEPage from './pages/admin/UEPage'
import AdminClassroomsPage from './pages/admin/ClassroomsPage'
import ClassroomsPage from './pages/ClassroomsPage'
import CourseDetailPage from './pages/CourseDetailPage'
import PresentationPage from './pages/PresentationPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function StudentApp({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}

export default function App() {
  return (
    <RoleProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Partie 1 — Dashboard */}
        <Route path="/app" element={<StudentApp><DashboardPage /></StudentApp>} />
        <Route path="/app/accueil-compact" element={<StudentApp><DashboardCompactPage /></StudentApp>} />

        {/* Partie 2 — Cours, Profil, Emploi du temps */}
        <Route path="/app/cours" element={<StudentApp><CoursesPage /></StudentApp>} />
        <Route path="/app/cours/:courseId" element={<StudentApp><CourseDetailPage /></StudentApp>} />
        <Route path="/app/profil" element={<StudentApp><ProfilePage /></StudentApp>} />
        <Route path="/app/emploi-du-temps" element={<StudentApp><SchedulePage /></StudentApp>} />

        {/* Partie 3 — Présences, Visioconf, Notifications */}
        <Route path="/app/presences" element={<StudentApp><AttendancePage /></StudentApp>} />
        <Route path="/app/visio" element={<StudentApp><VideoConferenceRoomPage /></StudentApp>} />
        <Route path="/app/visioconference" element={<VideoConfPage />} />
        <Route path="/app/notifications" element={<StudentApp><NotificationsPage /></StudentApp>} />

        {/* Partie 4 — Devoirs, Notes, Messagerie */}
        <Route path="/app/devoirs" element={<StudentApp><AssignmentsPage /></StudentApp>} />
        <Route path="/app/notes" element={<StudentApp><GradesPage /></StudentApp>} />
        <Route path="/app/messages" element={<StudentApp><MessagingPage /></StudentApp>} />

        {/* Partie 5 — Délégué Spécifique */}
        <Route path="/app/gestion-presences" element={<StudentApp><AttendanceManagePage /></StudentApp>} />

        {/* Partie 8 — Enseignant Spécifique */}
        <Route path="/app/mes-cours-enseignant" element={<StudentApp><TeacherCoursesPage /></StudentApp>} />

        {/* Partie 6 — Paramètres, Bibliothèque, Aide, Salles */}
        <Route path="/app/parametres" element={<StudentApp><SettingsPage /></StudentApp>} />
        <Route path="/app/bibliotheque" element={<StudentApp><LibraryPage /></StudentApp>} />
        <Route path="/app/salles" element={<StudentApp><ClassroomsPage /></StudentApp>} />
        <Route path="/app/aide" element={<StudentApp><HelpPage /></StudentApp>} />

        {/* Partie 5 — Administration */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="utilisateurs" element={<AdminUsersPage />} />
          <Route path="etudiants" element={<StudentsPage />} />
          <Route path="enseignants" element={<TeachersPage />} />
          <Route path="structure" element={<AcademicStructurePage />} />
          <Route path="cours" element={<AdminCoursesPage />} />
          <Route path="ue" element={<UEPage />} />
          <Route path="salles" element={<AdminClassroomsPage />} />
          <Route path="*" element={<AdminDashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </RoleProvider>
  )
}
