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
  type LucideIcon,
} from 'lucide-react'
import type { Role } from '../types'

export type { Role }

export interface NavItem {
  to: string
  icon: LucideIcon
  label: string
  end?: boolean
  roles?: Role[]
}

export interface AdminNavGroup {
  title: string
  items: NavItem[]
}

export const navItems: NavItem[] = [
  { to: '/app', icon: Home, label: 'Accueil', end: true, roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/cours', icon: BookOpen, label: 'Cours', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/emploi-du-temps', icon: Calendar, label: 'Emploi du temps', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/presences', icon: UserCheck, label: 'Présences', roles: ['student', 'delegate'] },
  { to: '/app/gestion-presences', icon: ClipboardList, label: 'Gérer Présences', roles: ['delegate'] },
  { to: '/app/mes-cours-enseignant', icon: BookMarked, label: 'Mes Cours', roles: ['teacher'] },
  { to: '/app/devoirs', icon: ClipboardList, label: 'Devoirs', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/notes', icon: GraduationCap, label: 'Notes', roles: ['student', 'delegate'] },
  { to: '/app/messages', icon: MessageSquare, label: 'Messages', roles: ['student', 'delegate', 'teacher'] },
  { to: '/app/parametres', icon: Settings, label: 'Paramètres', roles: ['student', 'delegate', 'teacher', 'admin'] },
]

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Vue d'ensemble",
    items: [{ to: '/admin', icon: BarChart3, label: 'Tableau de bord', end: true }],
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
    items: [{ to: '/admin/parametres', icon: Settings, label: 'Paramètres' }],
  },
]
