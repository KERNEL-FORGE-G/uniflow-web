import {
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  UserCheck,
  MessageSquare,
  Bell,
  Settings,
  GraduationCap,
  Library,
  HelpCircle,
  BarChart3,
  FileText,
  Users,
  BookMarked,
  Megaphone,
  Database,
  HeadphonesIcon,
} from 'lucide-react'

export const studentNavItems = [
  { to: '/app', icon: Home, label: 'Accueil', end: true },
  { to: '/app/cours', icon: BookOpen, label: 'Cours' },
  { to: '/app/emploi-du-temps', icon: Calendar, label: 'Emploi du temps' },
  { to: '/app/devoirs', icon: ClipboardList, label: 'Devoirs' },
  { to: '/app/presences', icon: UserCheck, label: 'Présences' },
  { to: '/app/notes', icon: GraduationCap, label: 'Notes' },
  { to: '/app/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/app/notifications', icon: Bell, label: 'Notifications' },
  { to: '/app/bibliotheque', icon: Library, label: 'Ressources' },
  { to: '/app/aide', icon: HelpCircle, label: 'Aide' },
  { to: '/app/parametres', icon: Settings, label: 'Paramètres' },
]

export const adminNavGroups = [
  {
    title: "Vue d'ensemble",
    items: [
      { to: '/admin', icon: BarChart3, label: 'Tableau de bord', end: true },
      { to: '/admin/statistiques', icon: BarChart3, label: 'Statistiques' },
      { to: '/admin/rapports', icon: FileText, label: 'Rapports' },
    ],
  },
  {
    title: 'Gestion',
    items: [
      { to: '/admin/utilisateurs', icon: Users, label: 'Utilisateurs' },
      { to: '/admin/cours', icon: BookMarked, label: 'Cours' },
      { to: '/admin/inscriptions', icon: ClipboardList, label: 'Inscriptions' },
      { to: '/admin/presences', icon: UserCheck, label: 'Présences' },
      { to: '/admin/devoirs', icon: ClipboardList, label: 'Devoirs' },
      { to: '/admin/annonces', icon: Megaphone, label: 'Annonces' },
    ],
  },
  {
    title: 'Système',
    items: [
      { to: '/admin/parametres', icon: Settings, label: 'Paramètres' },
      { to: '/admin/sauvegardes', icon: Database, label: 'Sauvegardes' },
      { to: '/admin/logs', icon: FileText, label: 'Logs' },
      { to: '/admin/support', icon: HeadphonesIcon, label: 'Support' },
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
