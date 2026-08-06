/**
 * Client API UniFlow
 * Pointe vers https://api-uniflow.kernelforge.codes
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api-uniflow.kernelforge.codes'

// ─── Token helpers ────────────────────────────────────────────────────────────

export function getAccessToken(): string | null {
  return localStorage.getItem('uniflow_access_token')
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('uniflow_refresh_token')
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem('uniflow_access_token', access)
  localStorage.setItem('uniflow_refresh_token', refresh)
}

export function clearTokens() {
  localStorage.removeItem('uniflow_access_token')
  localStorage.removeItem('uniflow_refresh_token')
  localStorage.removeItem('uniflow_user')
  localStorage.removeItem('uniflow_role')
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const token = getAccessToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })

  // Token expiré → tenter un refresh automatique
  if (res.status === 401 && retry) {
    const refreshed = await tryRefreshToken()
    if (refreshed) return apiFetch<T>(endpoint, options, false)
    clearTokens()
    window.location.href = '/login'
    throw new Error('Session expirée')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body?.message ?? 'Erreur serveur', body)
  }

  // 204 No Content
  if (res.status === 204) return null as T

  return res.json() as Promise<T>
}

async function tryRefreshToken(): Promise<boolean> {
  const refresh = getRefreshToken()
  if (!refresh) return false
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh }),
    })
    if (!res.ok) return false
    const data = await res.json()
    setTokens(data.data?.accessToken ?? data.accessToken, data.data?.refreshToken ?? data.refreshToken)
    return true
  } catch {
    return false
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// ─── HTTP methods ─────────────────────────────────────────────────────────────

export const api = {
  get: <T>(url: string) => apiFetch<T>(url),

  post: <T>(url: string, body?: unknown) =>
    apiFetch<T>(url, { method: 'POST', body: JSON.stringify(body) }),

  put: <T>(url: string, body?: unknown) =>
    apiFetch<T>(url, { method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(url: string, body?: unknown) =>
    apiFetch<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(url: string) =>
    apiFetch<T>(url, { method: 'DELETE' }),
}

// ─── Response wrapper (le backend utilise TransformInterceptor) ───────────────

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

function unwrap<T>(res: ApiResponse<T>): T {
  return res.data ?? (res as unknown as T)
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'ETUDIANT' | 'ENSEIGNANT' | 'DELEGUE' | 'ADMIN'
  levelId?: string
  specialtyId?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  user: BackendUser
}

export interface BackendUser {
  id: string
  email: string
  role: string
  student?: { firstName: string; lastName: string; matricule: string }
  teacher?: { firstName: string; lastName: string }
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthTokens> => {
    const res = await api.post<ApiResponse<AuthTokens>>('/auth/login', payload)
    return unwrap(res)
  },

  register: async (payload: RegisterPayload): Promise<AuthTokens> => {
    const res = await api.post<ApiResponse<AuthTokens>>('/auth/register', payload)
    return unwrap(res)
  },

  me: async (): Promise<BackendUser> => {
    const res = await api.get<ApiResponse<BackendUser>>('/auth/me')
    return unwrap(res)
  },

  logout: () => clearTokens(),
}

// ─── Courses API ──────────────────────────────────────────────────────────────

export interface Course {
  id: string
  name: string
  code: string
  description?: string
  credits: number
  teacher?: { firstName: string; lastName: string }
  ue?: { name: string; code: string }
}

export const coursesApi = {
  list: async (): Promise<Course[]> => {
    const res = await api.get<ApiResponse<Course[]>>('/courses')
    return unwrap(res)
  },
  getById: async (id: string): Promise<Course> => {
    const res = await api.get<ApiResponse<Course>>(`/courses/${id}`)
    return unwrap(res)
  },
}

// ─── Students API ─────────────────────────────────────────────────────────────

export interface Student {
  id: string
  firstName: string
  lastName: string
  matricule: string
  email?: string
  level?: { name: string }
  specialty?: { name: string }
}

export const studentsApi = {
  list: async (): Promise<Student[]> => {
    const res = await api.get<ApiResponse<Student[]>>('/students')
    return unwrap(res)
  },
  getById: async (id: string): Promise<Student> => {
    const res = await api.get<ApiResponse<Student>>(`/students/${id}`)
    return unwrap(res)
  },
}

// ─── Teachers API ─────────────────────────────────────────────────────────────

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email?: string
  specialization?: string
}

export const teachersApi = {
  list: async (): Promise<Teacher[]> => {
    const res = await api.get<ApiResponse<Teacher[]>>('/teachers')
    return unwrap(res)
  },
}

// ─── Schedules API ────────────────────────────────────────────────────────────

export interface ScheduleEntry {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  course: { name: string; code: string }
  classroom: { name: string; building: string }
  teacher: { firstName: string; lastName: string }
}

export const schedulesApi = {
  getMine: async (): Promise<ScheduleEntry[]> => {
    const res = await api.get<ApiResponse<ScheduleEntry[]>>('/schedules/my')
    return unwrap(res)
  },
  getByLevel: async (levelId: string): Promise<ScheduleEntry[]> => {
    const res = await api.get<ApiResponse<ScheduleEntry[]>>(`/schedules/level/${levelId}`)
    return unwrap(res)
  },
}

// ─── Attendance API ───────────────────────────────────────────────────────────

export interface AttendanceRecord {
  id: string
  status: 'PRESENT' | 'ABSENT' | 'RETARD' | 'JUSTIFIE'
  date: string
  course: { name: string; code: string }
  student?: { firstName: string; lastName: string; matricule: string }
}

export const attendanceApi = {
  getMine: async (): Promise<AttendanceRecord[]> => {
    const res = await api.get<ApiResponse<AttendanceRecord[]>>('/attendance/my')
    return unwrap(res)
  },
  getByCourse: async (courseId: string): Promise<AttendanceRecord[]> => {
    const res = await api.get<ApiResponse<AttendanceRecord[]>>(`/attendance/course/${courseId}`)
    return unwrap(res)
  },
  markPresence: async (sessionId: string, qrCode?: string): Promise<void> => {
    await api.post(`/attendance/mark`, { sessionId, qrCode })
  },
}

// ─── Classrooms API ───────────────────────────────────────────────────────────

export interface Classroom {
  id: string
  name: string
  building: string
  floor: number
  capacity: number
  type: string
  equipment: string[]
  isAvailable: boolean
}

export const classroomsApi = {
  list: async (): Promise<Classroom[]> => {
    const res = await api.get<ApiResponse<Classroom[]>>('/classrooms')
    return unwrap(res)
  },
  getAvailability: async (classroomId: string, date: string): Promise<unknown> => {
    const res = await api.get<ApiResponse<unknown>>(`/classrooms/${classroomId}/availability?date=${date}`)
    return unwrap(res)
  },
  reserve: async (payload: {
    classroomId: string
    date: string
    startTime: string
    endTime: string
    purpose: string
  }): Promise<void> => {
    await api.post('/classrooms/reserve', payload)
  },
}

// ─── Notifications API ────────────────────────────────────────────────────────

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

export const notificationsApi = {
  list: async (): Promise<Notification[]> => {
    const res = await api.get<ApiResponse<Notification[]>>('/notifications')
    return unwrap(res)
  },
  markRead: async (id: string): Promise<void> => {
    await api.patch(`/notifications/${id}/read`)
  },
  markAllRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all')
  },
}

// ─── UE API ───────────────────────────────────────────────────────────────────

export interface UE {
  id: string
  name: string
  code: string
  credits: number
  courses?: Course[]
}

export const ueApi = {
  list: async (): Promise<UE[]> => {
    const res = await api.get<ApiResponse<UE[]>>('/ue')
    return unwrap(res)
  },
  getMine: async (): Promise<UE[]> => {
    const res = await api.get<ApiResponse<UE[]>>('/ue/my')
    return unwrap(res)
  },
}

// ─── Files / Library API ──────────────────────────────────────────────────────

export interface LibraryFile {
  id: string
  name: string
  type: string
  url: string
  size: number
  course?: { name: string }
  uploadedBy?: { firstName: string; lastName: string }
  createdAt: string
}

export const filesApi = {
  list: async (courseId?: string): Promise<LibraryFile[]> => {
    const url = courseId ? `/files?courseId=${courseId}` : '/files'
    const res = await api.get<ApiResponse<LibraryFile[]>>(url)
    return unwrap(res)
  },
  upload: async (formData: FormData): Promise<LibraryFile> => {
    const token = getAccessToken()
    const res = await fetch(`${BASE_URL}/files`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    })
    if (!res.ok) throw new ApiError(res.status, 'Upload échoué')
    const data = await res.json()
    return unwrap(data)
  },
}

// ─── Video Conference API ────────────────────────────────────────────────────

export interface VideoRoom {
  roomName: string
  token: string
  url: string
}

export const videoApi = {
  createRoom: async (courseId: string): Promise<VideoRoom> => {
    const res = await api.post<ApiResponse<VideoRoom>>('/videoconference/create', { courseId })
    return unwrap(res)
  },
  joinRoom: async (roomName: string): Promise<VideoRoom> => {
    const res = await api.post<ApiResponse<VideoRoom>>('/videoconference/join', { roomName })
    return unwrap(res)
  },
}
