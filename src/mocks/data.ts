import type {
  AcademicUnit,
  AdminCourse,
  AdminDashboardData,
  AdminUser,
  Assignment,
  AssignmentSummary,
  AttendanceData,
  ChatMessage,
  Classroom,
  Conversation,
  Course,
  DashboardData,
  GradesData,
  HomeworkPreview,
  LibraryResource,
  NotificationItem,
  ScheduleData,
  StructureNode,
  StudentRecord,
  TeacherRecord,
  User,
} from '../types'

export const mockUsers: User[] = [
  {
    id: 'u-student',
    name: 'Emma Martin',
    email: 'emma.martin@uniflow.edu',
    role: 'student',
    roleLabel: 'Étudiante - L2 Info',
    status: 'En ligne',
  },
  {
    id: 'u-delegate',
    name: 'Lucas Dubois',
    email: 'lucas.dubois@uniflow.edu',
    role: 'delegate',
    roleLabel: 'Délégué - L2 Info',
    status: 'En ligne',
  },
  {
    id: 'u-teacher',
    name: 'Pr. Martin',
    email: 'martin@uniflow.edu',
    role: 'teacher',
    roleLabel: 'Enseignant - Informatique',
    status: 'En ligne',
  },
  {
    id: 'u-admin',
    name: 'Admin UniFlow',
    email: 'admin@uniflow.edu',
    role: 'admin',
    roleLabel: 'Super Admin',
    status: 'En ligne',
  },
]

export const mockDashboard: DashboardData = {
  greeting: 'Bienvenue, Emma — Lundi 13 mai 2024',
  stats: [
    { label: 'Cours inscrits', value: '12', change: '+8%', up: true, icon: 'BookOpen', color: 'text-blue-600 bg-blue-50' },
    { label: 'Devoirs à rendre', value: '5', change: '↓1', up: false, icon: 'ClipboardList', color: 'text-orange-600 bg-orange-50' },
    { label: 'Prochain cours dans', value: '2h30', change: '+15m', up: true, icon: 'Clock', color: 'text-teal bg-teal/10' },
    { label: 'Moyenne', value: '14.6/20', change: '+0.6', up: true, icon: 'TrendingUp', color: 'text-purple-600 bg-purple-50' },
    { label: 'Présences', value: '87%', change: '-5%', up: false, icon: 'UserCheck', color: 'text-emerald-600 bg-emerald-50' },
  ],
  activities: [
    { text: 'Mathématiques : Devoir 1 rendu', time: 'Il y a 2h' },
    { text: 'Économie : Quiz noté 15/20', time: 'Il y a 5h' },
    { text: 'Anglais : Nouveau cours disponible', time: 'Hier' },
    { text: 'Informatique : TP validé', time: 'Hier' },
    { text: 'Physique : Rappel examen', time: 'Il y a 2j' },
  ],
  gradeDistribution: [
    { name: 'Excellentes', value: 35, color: '#1e3a8a' },
    { name: 'Bonnes', value: 30, color: '#0d9488' },
    { name: 'Moyennes', value: 25, color: '#f59e0b' },
    { name: 'Faibles', value: 10, color: '#ef4444' },
  ],
  progressPercent: 72,
  calendarDays: 31,
  highlightedDay: 13,
  calendarLabel: 'Calendrier — Mai 2024',
}

export const mockCourses: Course[] = [
  { code: 'INFO101', title: 'Algorithmique — Mathématiques', teacher: 'Pr. Martin', semester: 'S2 2024', progress: 75, color: 'from-blue-600 to-blue-800', status: 'En cours' },
  { code: 'INFO201', title: 'Structures de données', teacher: 'Dr. Kamga', semester: 'S2 2024', progress: 60, color: 'from-teal to-teal-light', status: 'En cours' },
  { code: 'ECO101', title: 'Microéconomie', teacher: 'Pr. Ngo', semester: 'S2 2024', progress: 45, color: 'from-purple-600 to-purple-800', status: 'En cours' },
  { code: 'MATH201', title: 'Analyse numérique', teacher: 'Dr. Dupont', semester: 'S2 2024', progress: 90, color: 'from-orange-500 to-orange-700', status: 'En cours' },
  { code: 'ANG101', title: 'Anglais technique', teacher: 'Mme. Johnson', semester: 'S2 2024', progress: 55, color: 'from-emerald-600 to-emerald-800', status: 'À venir' },
  { code: 'PHY101', title: 'Physique générale', teacher: 'Pr. Mbarga', semester: 'S2 2024', progress: 30, color: 'from-indigo-600 to-indigo-800', status: 'Terminés' },
]

export const mockUpcomingHomework: HomeworkPreview[] = [
  { title: 'Algorithmique Devoir 3', date: '20 mai 2024' },
  { title: 'Microéconomie Quiz', date: '22 mai 2024' },
  { title: 'Anglais Oral', date: '25 mai 2024' },
]

export const mockSchedule: ScheduleData = {
  weekLabel: '13 – 19 mai 2024',
  hours: ['08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00'],
  days: ['Lun 13', 'Mar 14', 'Mer 15', 'Jeu 16', 'Ven 17', 'Sam 18'],
  events: [
    { day: 0, start: 0, duration: 2, title: 'Algorithmique', type: 'CM', room: 'A101', teacher: 'Pr. Martin' },
    { day: 0, start: 3, duration: 2, title: 'Mathématiques', type: 'TD', room: 'B204', teacher: 'Dr. Dupont' },
    { day: 1, start: 1, duration: 2, title: 'Réseaux', type: 'TP', room: 'C302', teacher: 'Pr. Kamga' },
    { day: 2, start: 2, duration: 2, title: 'Économie', type: 'CM', room: 'D105', teacher: 'Pr. Ngo' },
    { day: 3, start: 4, duration: 2, title: 'Anglais', type: 'TD', room: 'E201', teacher: 'Mme. Johnson' },
    { day: 4, start: 0, duration: 2, title: 'Physique', type: 'Séminaire', room: 'F102', teacher: 'Pr. Mbarga' },
  ],
  selected: {
    title: 'Réseaux — TP',
    teacher: 'Pr. Kamga',
    room: 'C302',
    group: 'Groupe B',
    type: 'TP',
    description: 'Travaux pratiques sur les protocoles réseau TCP/IP et configuration de routeurs.',
  },
}

export const mockAssignmentSummary: AssignmentSummary[] = [
  { label: 'À rendre', value: 5, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'En retard', value: 2, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Soumis', value: 12, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Notés', value: 8, color: 'text-blue-600', bg: 'bg-blue-50' },
]

export const mockAssignments: Assignment[] = [
  { title: 'TP Algorithmique — Recherche dichotomique', code: 'INFO201', due: '20 mai 2024', progress: 65, status: 'À rendre', statusVariant: 'warning', action: 'Continuer' },
  { title: 'Rapport Microéconomie', code: 'ECO101', due: '8 mai 2024', progress: 100, status: 'En retard', statusVariant: 'danger', action: 'Continuer' },
  { title: 'Quiz Structures de données', code: 'INFO201', due: '15 mai 2024', progress: 100, status: 'Soumis', statusVariant: 'success', action: 'Voir' },
  { title: 'Exercices Analyse numérique', code: 'MATH201', due: '10 mai 2024', progress: 100, status: 'Noté 16/20', statusVariant: 'info', action: 'Voir' },
  { title: 'Projet Réseaux — Configuration', code: 'INFO301', due: '25 mai 2024', progress: 30, status: 'À rendre', statusVariant: 'warning', action: 'Continuer' },
]

export const mockGrades: GradesData = {
  average: 14.8,
  ects: { validated: 45, total: 60 },
  radar: [
    { skill: 'Communication', value: 75 },
    { skill: 'Programmation', value: 90 },
    { skill: 'Conception', value: 80 },
    { skill: 'Analyse', value: 85 },
    { skill: "Travail d'équipe", value: 70 },
  ],
  evolution: [
    { sem: 'S1', personal: 12.5, class: 11.8 },
    { sem: 'S2', personal: 13.2, class: 12.1 },
    { sem: 'S3', personal: 14.0, class: 12.5 },
    { sem: 'S4', personal: 14.8, class: 13.0 },
  ],
  grades: [
    { ue: 'INFO201', title: 'Structures de données', type: 'Examen', coef: 2, grade: 16, avg: 12.5, rank: 5 },
    { ue: 'MATH201', title: 'Analyse numérique', type: 'Projet', coef: 1.5, grade: 15, avg: 13.0, rank: 8 },
    { ue: 'ECO101', title: 'Microéconomie', type: 'Examen', coef: 2, grade: 14, avg: 11.5, rank: 12 },
    { ue: 'INFO101', title: 'Algorithmique', type: 'TP', coef: 1, grade: 17, avg: 14.0, rank: 3 },
    { ue: 'ANG101', title: 'Anglais technique', type: 'Oral', coef: 1, grade: 15.5, avg: 13.5, rank: 6 },
  ],
}

export const mockAttendance: AttendanceData = {
  globalRate: 87,
  totalSessions: 156,
  students: [
    { name: 'Emma Martin', id: 'ETU-0847', present: 42, absent: 3, late: 2, rate: 89, justified: 2, status: 'Régulier' },
    { name: 'Lucas Dubois', id: 'ETU-0848', present: 38, absent: 5, late: 4, rate: 76, justified: 3, status: 'Attention' },
    { name: 'Sarah Kamga', id: 'ETU-0849', present: 44, absent: 1, late: 1, rate: 95, justified: 1, status: 'Régulier' },
    { name: 'Yasmine Ngo', id: 'ETU-0850', present: 30, absent: 10, late: 6, rate: 60, justified: 4, status: 'Critique' },
    { name: 'Thomas Mbarga', id: 'ETU-0851', present: 40, absent: 4, late: 2, rate: 85, justified: 2, status: 'Régulier' },
  ],
  weekly: [
    { week: 'S1', present: 85, absent: 15 },
    { week: 'S2', present: 88, absent: 12 },
    { week: 'S3', present: 82, absent: 18 },
    { week: 'S4', present: 90, absent: 10 },
    { week: 'S5', present: 87, absent: 13 },
  ],
}

export const mockConversations: Conversation[] = [
  { id: 1, name: 'Dr. Karim Benkacem', preview: 'Le TP est disponible sur la plateforme', time: '14:32', unread: 2 },
  { id: 2, name: 'Pr. Martin', preview: 'Rendez-vous confirmé pour demain', time: 'Hier', unread: 0 },
  { id: 3, name: 'Sarah Kamga', preview: "Tu as fini le devoir d'algo ?", time: 'Lun', unread: 1 },
  { id: 4, name: 'Groupe INFO201', preview: 'Lucas: On se retrouve en salle B204', time: 'Dim', unread: 5 },
]

export const mockMessages: ChatMessage[] = [
  { from: 'them', text: "Bonjour Emma, le TP d'algorithmique est maintenant disponible.", time: '14:20' },
  { from: 'me', text: 'Merci professeur ! Je vais le consulter ce soir.', time: '14:25' },
  { from: 'them', text: "Parfait. N'hésitez pas si vous avez des questions.", time: '14:28' },
  { from: 'them', text: 'Voici le document de référence.', time: '14:30', file: 'TP_Algo.docx, 1.2 Mo' },
  { from: 'me', text: 'Reçu, merci beaucoup !', time: '14:32' },
]

export const mockNotifications: NotificationItem[] = [
  { id: 1, type: 'warning', title: 'Devoir à rendre', body: 'TP Algorithmique — échéance dans 2 jours', time: 'Il y a 1h', unread: true },
  { id: 2, type: 'success', title: 'Note publiée', body: 'Quiz Économie : 15/20', time: 'Il y a 3h', unread: true },
  { id: 3, type: 'info', title: 'Nouveau cours', body: 'Anglais technique — chapitre 4 disponible', time: 'Hier', unread: false },
  { id: 4, type: 'message', title: 'Message de Pr. Martin', body: 'Rendez-vous confirmé pour demain', time: 'Hier', unread: false },
  { id: 5, type: 'danger', title: 'Absence non justifiée', body: 'Session Physique du 8 mai', time: 'Il y a 2j', unread: false },
]

export const mockLibrary: LibraryResource[] = [
  { id: 'r1', title: 'Cours Algorithmique avancée', type: 'PDF', collection: 'Informatique', author: 'Pr. Martin' },
  { id: 'r2', title: 'TP Structures de données', type: 'Doc', collection: 'Informatique', author: 'Dr. Kamga' },
  { id: 'r3', title: 'Fiches Microéconomie', type: 'PDF', collection: 'Économie', author: 'Pr. Ngo' },
  { id: 'r4', title: 'Introduction aux réseaux', type: 'Vidéo', collection: 'Informatique', author: 'Pr. Kamga' },
  { id: 'r5', title: 'Exercices Analyse', type: 'PDF', collection: 'Mathématiques', author: 'Dr. Dupont' },
  { id: 'r6', title: 'Documentation Python', type: 'Lien', collection: 'Informatique', author: 'Équipe UniFlow' },
]

export const mockAdminDashboard: AdminDashboardData = {
  stats: [
    { label: 'Étudiants', value: '1 247', icon: 'Users', color: 'text-blue-600 bg-blue-50' },
    { label: 'Enseignants', value: '86', icon: 'GraduationCap', color: 'text-teal bg-teal/10' },
    { label: 'Cours actifs', value: '142', icon: 'BookOpen', color: 'text-purple-600 bg-purple-50' },
    { label: "Sessions aujourd'hui", value: '28', icon: 'Calendar', color: 'text-orange-600 bg-orange-50' },
    { label: 'Présence globale', value: '89%', icon: 'UserCheck', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Devoirs cette semaine', value: '156', icon: 'ClipboardList', color: 'text-indigo-600 bg-indigo-50' },
  ],
  registration: [
    { month: 'Jan', count: 850 },
    { month: 'Fév', count: 920 },
    { month: 'Mar', count: 980 },
    { month: 'Avr', count: 1050 },
    { month: 'Mai', count: 1150 },
    { month: 'Juin', count: 1247 },
  ],
  departments: [
    { name: 'Informatique', value: 45, color: '#1e3a8a' },
    { name: 'Économie', value: 25, color: '#0d9488' },
    { name: 'Droit', value: 15, color: '#f59e0b' },
    { name: 'Autres', value: 15, color: '#8b5cf6' },
  ],
  activities: [
    { text: 'Nouveau cours créé — INFO301', time: 'Il y a 15 min' },
    { text: 'Utilisateur modifié — Emma Martin', time: 'Il y a 1h' },
    { text: 'Inscription validée — Lucas Dubois', time: 'Il y a 2h' },
    { text: 'Annonce publiée — Examens S2', time: 'Il y a 3h' },
    { text: 'Sauvegarde automatique effectuée', time: 'Il y a 6h' },
  ],
}

export const mockAdminUsers: AdminUser[] = [
  { id: 'USR-001', name: 'Emma Martin', email: 'emma.martin@uniflow.edu', role: 'Étudiant', status: 'Actif' },
  { id: 'USR-002', name: 'Pr. Martin', email: 'martin@uniflow.edu', role: 'Enseignant', status: 'Actif' },
  { id: 'USR-003', name: 'Lucas Dubois', email: 'lucas.dubois@uniflow.edu', role: 'Délégué', status: 'Actif' },
  { id: 'USR-004', name: 'Sarah Kamga', email: 'sarah.kamga@uniflow.edu', role: 'Étudiant', status: 'Inactif' },
  { id: 'USR-005', name: 'Admin UniFlow', email: 'admin@uniflow.edu', role: 'Admin', status: 'Actif' },
]

export const mockAdminCourses: AdminCourse[] = [
  { code: 'INFO101', title: 'Algorithmique', teacher: 'Pr. Martin', students: 42, status: 'Actif' },
  { code: 'INFO201', title: 'Structures de données', teacher: 'Dr. Kamga', students: 38, status: 'Actif' },
  { code: 'ECO101', title: 'Microéconomie', teacher: 'Pr. Ngo', students: 55, status: 'Actif' },
  { code: 'MATH201', title: 'Analyse numérique', teacher: 'Dr. Dupont', students: 30, status: 'Brouillon' },
]

export const mockClassrooms: Classroom[] = [
  { id: 'A101', name: 'Amphi A101', capacity: 120, building: 'Bâtiment A', type: 'Amphithéâtre' },
  { id: 'B204', name: 'Salle B204', capacity: 40, building: 'Bâtiment B', type: 'TD' },
  { id: 'C302', name: 'Labo C302', capacity: 25, building: 'Bâtiment C', type: 'TP' },
  { id: 'D105', name: 'Salle D105', capacity: 35, building: 'Bâtiment D', type: 'Cours' },
]

export const mockUEs: AcademicUnit[] = [
  { id: 'ue1', code: 'INFO101', title: 'Algorithmique', credits: 6, semester: 'S2' },
  { id: 'ue2', code: 'INFO201', title: 'Structures de données', credits: 6, semester: 'S2' },
  { id: 'ue3', code: 'MATH201', title: 'Analyse numérique', credits: 4, semester: 'S2' },
  { id: 'ue4', code: 'ECO101', title: 'Microéconomie', credits: 5, semester: 'S2' },
]

export const mockStudents: StudentRecord[] = [
  { id: 'ETU-0847', name: 'Emma Martin', program: 'Informatique', level: 'L2', status: 'Actif' },
  { id: 'ETU-0848', name: 'Lucas Dubois', program: 'Informatique', level: 'L2', status: 'Actif' },
  { id: 'ETU-0849', name: 'Sarah Kamga', program: 'Informatique', level: 'L2', status: 'Actif' },
  { id: 'ETU-0850', name: 'Yasmine Ngo', program: 'Économie', level: 'L1', status: 'Suspendu' },
]

export const mockTeachers: TeacherRecord[] = [
  { id: 'ENS-01', name: 'Pr. Martin', department: 'Informatique', courses: 3, status: 'Actif' },
  { id: 'ENS-02', name: 'Dr. Kamga', department: 'Informatique', courses: 2, status: 'Actif' },
  { id: 'ENS-03', name: 'Pr. Ngo', department: 'Économie', courses: 2, status: 'Actif' },
  { id: 'ENS-04', name: 'Dr. Dupont', department: 'Mathématiques', courses: 1, status: 'Actif' },
]

export const mockStructure: StructureNode[] = [
  { id: 'f1', name: 'Faculté des Sciences', type: 'Faculté', children: 3 },
  { id: 'd1', name: 'Département Informatique', type: 'Département', children: 4 },
  { id: 'd2', name: 'Département Mathématiques', type: 'Département', children: 2 },
  { id: 'fil1', name: 'Licence Informatique', type: 'Filière', children: 6 },
]
