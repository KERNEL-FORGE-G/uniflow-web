/**
 * Client API UniFlow
 * Base URL : https://api-uniflow.kernelforge.codes
 */

export const BASE_URL = (import.meta.env.VITE_API_URL as string) ?? 'https://api-uniflow.kernelforge.codes'

// ─── Tokens ──────────────────────────────────────────────────────────────────

export const getToken = () => localStorage.getItem('uniflow_access_token')
export const getRefreshToken = () => localStorage.getItem('uniflow_refresh_token')
export const setTokens = (a: string, r: string) => {
  localStorage.setItem('uniflow_access_token', a)
  localStorage.setItem('uniflow_refresh_token', r)
}
export const clearTokens = () => {
  localStorage.removeItem('uniflow_access_token')
  localStorage.removeItem('uniflow_refresh_token')
  localStorage.removeItem('uniflow_user')
}

// ─── ApiError ────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message)
    this.name = 'ApiError'
  }
}

// ─── Core fetch ──────────────────────────────────────────────────────────────

async function req<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init.headers as Record<string, string> ?? {}),
  }
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers })

  if (res.status === 401 && retry) {
    const ok = await doRefresh()
    if (ok) return req<T>(path, init, false)
    clearTokens()
    window.location.href = '/login'
    throw new ApiError(401, 'Session expirée')
  }

  if (!res.ok) {
    let msg = 'Erreur serveur'
    try { const b = await res.json(); msg = b?.message ?? msg } catch { /* ignore */ }
    throw new ApiError(res.status, msg)
  }
  if (res.status === 204) return null as T
  return res.json()
}

async function doRefresh(): Promise<boolean> {
  const r = getRefreshToken()
  if (!r) return false
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: r }),
    })
    if (!res.ok) return false
    const d = await res.json()
    const data = d.data ?? d
    setTokens(data.accessToken, data.refreshToken)
    return true
  } catch { return false }
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

export const api = {
  get:    <T>(p: string)              => req<T>(p),
  post:   <T>(p: string, b?: unknown) => req<T>(p, { method: 'POST',   body: JSON.stringify(b) }),
  patch:  <T>(p: string, b?: unknown) => req<T>(p, { method: 'PATCH',  body: JSON.stringify(b) }),
  put:    <T>(p: string, b?: unknown) => req<T>(p, { method: 'PUT',    body: JSON.stringify(b) }),
  delete: <T>(p: string)              => req<T>(p, { method: 'DELETE' }),
}

// ─── Unwrap (TransformInterceptor → { data: T }) ──────────────────────────────

function u<T>(r: { data?: T } | T): T {
  return (r as { data?: T }).data !== undefined ? (r as { data: T }).data : r as T
}

// =============================================================================
// AUTH
// =============================================================================

export interface LoginDto    { email: string; password: string }
export interface RegisterDto {
  email: string; password: string
  firstName: string; lastName: string
  role: 'ETUDIANT' | 'ENSEIGNANT' | 'DELEGUE' | 'ADMIN'
  levelId?: string; specialtyId?: string
}
export interface AuthResult {
  accessToken: string; refreshToken: string
  user: { id: string; email: string; role: string; student?: StudentProfile; teacher?: TeacherProfile }
}
export interface BackendUser {
  id: string
  email: string
  role: string
  student?: StudentProfile
  teacher?: TeacherProfile
}
interface StudentProfile { firstName: string; lastName: string; matricule: string }
interface TeacherProfile { firstName: string; lastName: string }

export const authApi = {
  login:    async (dto: LoginDto)    => u(await api.post<{ data: AuthResult }>('/auth/login', dto)),
  register: async (dto: RegisterDto) => u(await api.post<{ data: AuthResult }>('/auth/register', dto)),
  me:       async ()                 => u(await api.get<{ data: BackendUser }>('/auth/me')),
  logout:   ()                       => clearTokens(),
}

// =============================================================================
// COURSES  GET /courses  |  GET /courses/my  |  GET /courses/:id
// =============================================================================

export interface Course {
  id: string; name: string; code: string; description?: string
  type: 'CM' | 'TD' | 'TP'; credits: number; hours: number
  teachingUnit?: { id: string; name: string; code: string; credits: number }
  teacher?: { id: string; firstName: string; lastName: string }
  classroom?: { id: string; name: string; building: string }
}

export const coursesApi = {
  list:   async ()          => u(await api.get<{ data: Course[] }>('/courses')),
  mine:   async ()          => u(await api.get<{ data: Course[] }>('/courses/my')),
  getOne: async (id: string) => u(await api.get<{ data: Course }>(`/courses/${id}`)),
}

// =============================================================================
// SCHEDULES  GET /schedules
// =============================================================================

export interface Schedule {
  id: string; dayOfWeek: string; startTime: string; endTime: string
  semesterId: string
  course: { id: string; name: string; code: string; type: string
            teacher: { firstName: string; lastName: string }
            classroom: { name: string; building: string } }
}

export const schedulesApi = {
  list: async () => u(await api.get<{ data: Schedule[] }>('/schedules')),
}

// =============================================================================
// STUDENTS  GET /students  |  GET /students/:id
// =============================================================================

export interface Student {
  id: string; firstName: string; lastName: string; matricule: string
  status: string
  level?: { name: string; program?: { name: string } }
  specialty?: { name: string }
  user?: { email: string }
}

export const studentsApi = {
  list:   async ()           => u(await api.get<{ data: Student[] }>('/students')),
  getOne: async (id: string) => u(await api.get<{ data: Student }>(`/students/${id}`)),
}

// =============================================================================
// TEACHERS  GET /teachers  |  GET /teachers/:id
// =============================================================================

export interface Teacher {
  id: string; firstName: string; lastName: string
  user?: { email: string }
  courses?: Course[]
}

export const teachersApi = {
  list:   async ()           => u(await api.get<{ data: Teacher[] }>('/teachers')),
  getOne: async (id: string) => u(await api.get<{ data: Teacher }>(`/teachers/${id}`)),
}

// =============================================================================
// ATTENDANCE
// POST   /attendance/sessions          → créer session
// GET    /attendance/sessions/:id
// GET    /attendance/sessions/by-course/:courseId
// PATCH  /attendance/sessions/:id/mark
// POST   /attendance/scan              → scanner QR
// =============================================================================

export interface AttendanceSession {
  id: string; date: string; courseId: string
  course?: { name: string; code: string }
  records: AttendanceRecord[]
}
export interface AttendanceRecord {
  id: string; status: 'PRESENT' | 'ABSENT' | 'RETARD' | 'JUSTIFIE'
  studentId: string
  student?: { firstName: string; lastName: string; matricule: string }
}

export const attendanceApi = {
  createSession: async (dto: { courseId: string; date: string }) =>
    u(await api.post<{ data: AttendanceSession }>('/attendance/sessions', dto)),

  getSession: async (id: string) =>
    u(await api.get<{ data: AttendanceSession }>(`/attendance/sessions/${id}`)),

  byCourse: async (courseId: string) =>
    u(await api.get<{ data: AttendanceSession[] }>(`/attendance/sessions/by-course/${courseId}`)),

  mark: async (sessionId: string, dto: { studentId: string; status: string }) =>
    u(await api.patch<{ data: AttendanceRecord }>(`/attendance/sessions/${sessionId}/mark`, dto)),

  scan: async (dto: { qrCode: string }) =>
    u(await api.post<{ data: AttendanceRecord }>('/attendance/scan', dto)),
}

// =============================================================================
// CLASSROOMS  GET /classrooms  |  GET /classrooms/:id
// =============================================================================

export interface Classroom {
  id: string; name: string; building: string; floor?: number
  capacity: number; type: string; isAvailable: boolean
  equipment?: string[]
}

export const classroomsApi = {
  list:   async ()           => u(await api.get<{ data: Classroom[] }>('/classrooms')),
  getOne: async (id: string) => u(await api.get<{ data: Classroom }>(`/classrooms/${id}`)),
}

// =============================================================================
// NOTIFICATIONS  GET /notifications  |  PATCH /:id/read
// =============================================================================

export interface Notification {
  id: string; title: string; message: string; type: string
  isRead: boolean; createdAt: string
}

export const notificationsApi = {
  list: async () => u(await api.get<{ data: Notification[] }>('/notifications')),
  unreadCount: async () => {
    const res = u(await api.get<{ data: { unreadCount: number } | number }>('/notifications/unread-count'))
    return typeof res === 'number' ? res : res?.unreadCount ?? 0
  },
  markRead: async (id: string) => u(await api.patch<{ data: Notification }>(`/notifications/${id}/read`)),
  delete: async (id: string) => u(await api.delete<void>(`/notifications/${id}`)),
}

// =============================================================================
// UE  GET /ue  |  GET /ue/by-level/:levelId
// =============================================================================

export interface UE {
  id: string; name: string; code: string; credits: number
  courses?: Course[]
}

export const ueApi = {
  list:      async ()              => u(await api.get<{ data: UE[] }>('/ue')),
  byLevel:   async (id: string)    => u(await api.get<{ data: UE[] }>(`/ue/by-level/${id}`)),
  bySemester:async (id: string)    => u(await api.get<{ data: UE[] }>(`/ue/by-semester/${id}`)),
}

// =============================================================================
// VIDEO CONFERENCE  POST /videoconference/rooms
// =============================================================================

export interface VideoRoom { roomName: string; token: string; serverUrl: string }

export const videoApi = {
  create: async (dto: { courseId?: string; roomName?: string }) =>
    u(await api.post<{ data: VideoRoom }>('/videoconference/rooms', dto)),
}

// =============================================================================
// ENROLLMENTS
// =============================================================================

export interface Enrollment {
  id: string; status: string; teachingUnitId: string
  teachingUnit?: { name: string; code: string; credits: number }
}

export const enrollmentsApi = {
  mine: async () => u(await api.get<{ data: Enrollment[] }>('/enrollments/my')),
}

// =============================================================================
// FILE UPLOAD  (multipart)
// =============================================================================

export const filesApi = {
  upload: async (formData: FormData) => {
    const token = getToken()
    const res = await fetch(`${BASE_URL}/files`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    })
    if (!res.ok) throw new ApiError(res.status, 'Upload échoué')
    return u(await res.json())
  },
}
