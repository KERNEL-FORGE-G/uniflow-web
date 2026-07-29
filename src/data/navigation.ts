import {
  Home,
  BookOpen,
  Calendar,
  UserCheck,
  MessageSquare,
  Settings,
  GraduationCap,
  BarChart3,
  Users,
  BookMarked,
  Database,
  ClipboardList,
  HelpCircle,
  Video,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

export type Role = 'student' | 'delegate' | 'teacher' | 'admin'

export interface NavItem {
  to: string
  icon: LucideIcon
  labelFr: string
  labelEn: string
  end?: boolean
  roles?: Role[]
}

export interface AdminNavGroup {
  title: string
  items: NavItem[]
}

export const navItems: NavItem[] = [
  // Commun / Student & Delegate
  { to: '/app', icon: Home, labelFr: 'Accueil', labelEn: 'Dashboard', end: true, roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/cours', icon: BookOpen, labelFr: 'Mes cours', labelEn: 'My Courses', roles: ['student', 'delegate'] },
  { to: '/app/emploi-du-temps', icon: Calendar, labelFr: 'Emploi du temps', labelEn: 'Schedule', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/presences', icon: UserCheck, labelFr: 'Présences', labelEn: 'My Attendance', roles: ['student', 'delegate'] },
  
  // Devoirs & Notes
  { to: '/app/devoirs', icon: ClipboardList, labelFr: 'Devoirs', labelEn: 'Assignments', roles: ['student', 'delegate'] },
  { to: '/app/notes', icon: GraduationCap, labelFr: 'Mes notes', labelEn: 'My Grades', roles: ['student', 'delegate'] },
  
  // Délégué Spécifique
  { to: '/app/gestion-presences', icon: UserCheck, labelFr: 'Gérer Présences', labelEn: 'Manage Attendance', roles: ['delegate'] },

  // Enseignant Spécifique
  { to: '/app/mes-cours-enseignant', icon: BookMarked, labelFr: 'Espace Pédagogique', labelEn: 'Teacher Space', roles: ['teacher'] },
  
  // Commun
  { to: '/app/visio', icon: Video, labelFr: 'Visioconférence', labelEn: 'Video Conference', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/messages', icon: MessageSquare, labelFr: 'Messages', labelEn: 'Messages', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/bibliotheque', icon: BookMarked, labelFr: 'Bibliothèque', labelEn: 'Library', roles: ['student', 'delegate'] },
  { to: '/app/salles', icon: MapPin, labelFr: 'Salles', labelEn: 'Classrooms', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/parametres', icon: Settings, labelFr: 'Paramètres', labelEn: 'Settings', roles: ['student', 'delegate', 'teacher', 'admin'] },
  { to: '/app/aide', icon: HelpCircle, labelFr: 'Aide & FAQ', labelEn: 'Help & FAQ', roles: ['student', 'delegate', 'teacher'] },
]

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Vue d'ensemble",
    items: [
      { to: '/admin', icon: BarChart3, labelFr: 'Tableau de bord', labelEn: 'Admin Dashboard', end: true },
    ],
  },
  {
    title: 'Gestion Académique',
    items: [
      { to: '/admin/structure', icon: Database, labelFr: 'Structure Académique', labelEn: 'Academic Structure' },
      { to: '/admin/ue', icon: BookOpen, labelFr: 'UE', labelEn: 'Teaching Units' },
      { to: '/admin/cours', icon: BookMarked, labelFr: 'Cours', labelEn: 'Courses' },
      { to: '/admin/salles', icon: Calendar, labelFr: 'Salles', labelEn: 'Classrooms' },
    ],
  },
  {
    title: 'Gestion Utilisateurs',
    items: [
      { to: '/admin/utilisateurs', icon: Users, labelFr: 'Utilisateurs', labelEn: 'Users' },
      { to: '/admin/etudiants', icon: GraduationCap, labelFr: 'Étudiants', labelEn: 'Students' },
      { to: '/admin/enseignants', icon: UserCheck, labelFr: 'Enseignants', labelEn: 'Teachers' },
    ],
  },
  {
    title: 'Système',
    items: [
      { to: '/admin/parametres', icon: Settings, labelFr: 'Paramètres', labelEn: 'Settings' },
    ],
  },
]
