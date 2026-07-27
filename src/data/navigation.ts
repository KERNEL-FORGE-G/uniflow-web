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
} from 'lucide-react'

export type Role = 'student' | 'delegate' | 'teacher' | 'admin'

export const navItems = [
  // Étudiant
  { to: '/app', icon: Home, label: 'Accueil', end: true, roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/cours', icon: BookOpen, label: 'Cours', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/emploi-du-temps', icon: Calendar, label: 'Emploi du temps', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/presences', icon: UserCheck, label: 'Présences', roles: ['student', 'delegate'] },
  
  // Délégué (rôle spécial)
  { to: '/app/gestion-presences', icon: UserCheck, label: 'Gérer Présences', roles: ['delegate'] },
  
  // Enseignant
  { to: '/app/mes-cours-enseignant', icon: BookMarked, label: 'Mes Cours', roles: ['teacher'] },
  
  // Commun
  { to: '/app/messages', icon: MessageSquare, label: 'Messages', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/parametres', icon: Settings, label: 'Paramètres', roles: ['student', 'delegate', 'teacher', 'admin'] },
]

export const adminNavGroups = [
  {
    title: "Vue d'ensemble",
    items: [
      { to: '/admin', icon: BarChart3, label: 'Tableau de bord', end: true },
    ],
  },
  {
    title: 'Gestion Académique',
    items: [
      { to: '/admin/structure', icon: Database, label: 'Structure Académique' },
      { to: '/admin/ue', icon: BookOpen, label: 'UE' },
      { to: '/admin/cours', icon: BookMarked, label: 'Cours' },
      { to: '/admin/salles', icon: Calendar, label: 'Salles' },
    ],
  },
  {
    title: 'Gestion Utilisateurs',
    items: [
      { to: '/admin/utilisateurs', icon: Users, label: 'Utilisateurs' },
      { to: '/admin/etudiants', icon: GraduationCap, label: 'Étudiants' },
      { to: '/admin/enseignants', icon: UserCheck, label: 'Enseignants' },
    ],
  },
  {
    title: 'Système',
    items: [
      { to: '/admin/parametres', icon: Settings, label: 'Paramètres' },
    ],
  },
]

export const currentUser = {
  name: 'Emma Martin',
  role: 'Étudiante - L2 Info',
  email: 'emma.martin@uniflow.edu',
  avatar: undefined as string | undefined,
  status: 'En ligne' as const,
}
