export type Role = 'student' | 'delegate' | 'teacher' | 'admin'

export type UserStatus = 'En ligne' | 'Absent' | 'Occupé'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  roleLabel: string
  avatar?: string
  status: UserStatus
}

export interface DashboardStat {
  label: string
  value: string
  change: string
  up: boolean
  icon: 'BookOpen' | 'ClipboardList' | 'Clock' | 'TrendingUp' | 'UserCheck'
  color: string
}

export interface ActivityItem {
  text: string
  time: string
}

export interface GradeDistribution {
  name: string
  value: number
  color: string
}

export interface DashboardData {
  greeting: string
  stats: DashboardStat[]
  activities: ActivityItem[]
  gradeDistribution: GradeDistribution[]
  progressPercent: number
  calendarDays: number
  highlightedDay: number
  calendarLabel: string
}

export interface Course {
  code: string
  title: string
  teacher: string
  semester: string
  progress: number
  color: string
  status: 'En cours' | 'À venir' | 'Terminés'
}

export interface HomeworkPreview {
  title: string
  date: string
}

export type EventType = 'CM' | 'TD' | 'TP' | 'Séminaire'

export interface ScheduleEvent {
  day: number
  start: number
  duration: number
  title: string
  type: EventType
  room: string
  teacher: string
}

export interface ScheduleDetail {
  title: string
  teacher: string
  room: string
  group: string
  type: EventType
  description: string
}

export interface ScheduleData {
  weekLabel: string
  hours: string[]
  days: string[]
  events: ScheduleEvent[]
  selected: ScheduleDetail
}

export type AssignmentStatusVariant = 'warning' | 'danger' | 'success' | 'info'

export interface Assignment {
  title: string
  code: string
  due: string
  progress: number
  status: string
  statusVariant: AssignmentStatusVariant
  action: string
}

export interface AssignmentSummary {
  label: string
  value: number
  color: string
  bg: string
}

export interface GradeRow {
  ue: string
  title: string
  type: string
  coef: number
  grade: number
  avg: number
  rank: number
}

export interface GradesData {
  average: number
  ects: { validated: number; total: number }
  radar: { skill: string; value: number }[]
  evolution: { sem: string; personal: number; class: number }[]
  grades: GradeRow[]
}

export type AttendanceStatus = 'Régulier' | 'Attention' | 'Critique'

export interface AttendanceStudent {
  name: string
  id: string
  present: number
  absent: number
  late: number
  rate: number
  justified: number
  status: AttendanceStatus
}

export interface AttendanceData {
  globalRate: number
  totalSessions: number
  students: AttendanceStudent[]
  weekly: { week: string; present: number; absent: number }[]
}

export interface Conversation {
  id: number
  name: string
  preview: string
  time: string
  unread: number
}

export interface ChatMessage {
  from: 'me' | 'them'
  text: string
  time: string
  file?: string
}

export interface NotificationItem {
  id: number
  type: 'info' | 'warning' | 'success' | 'danger' | 'message'
  title: string
  body: string
  time: string
  unread: boolean
}

export interface LibraryResource {
  id: string
  title: string
  type: 'PDF' | 'Vidéo' | 'Lien' | 'Doc'
  collection: string
  author: string
}

export interface AdminStat {
  label: string
  value: string
  icon: 'Users' | 'GraduationCap' | 'BookOpen' | 'Calendar' | 'UserCheck' | 'ClipboardList'
  color: string
}

export interface AdminDashboardData {
  stats: AdminStat[]
  registration: { month: string; count: number }[]
  departments: GradeDistribution[]
  activities: ActivityItem[]
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: 'Actif' | 'Inactif' | 'Suspendu'
}

export interface AdminCourse {
  code: string
  title: string
  teacher: string
  students: number
  status: string
}

export interface Classroom {
  id: string
  name: string
  capacity: number
  building: string
  type: string
}

export interface AcademicUnit {
  id: string
  code: string
  title: string
  credits: number
  semester: string
}

export interface StudentRecord {
  id: string
  name: string
  program: string
  level: string
  status: string
}

export interface TeacherRecord {
  id: string
  name: string
  department: string
  courses: number
  status: string
}

export interface StructureNode {
  id: string
  name: string
  type: 'Faculté' | 'Département' | 'Filière'
  children?: number
}
