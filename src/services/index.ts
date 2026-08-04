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
import {
  mockAdminCourses,
  mockAdminDashboard,
  mockAdminUsers,
  mockAssignments,
  mockAssignmentSummary,
  mockAttendance,
  mockClassrooms,
  mockConversations,
  mockCourses,
  mockDashboard,
  mockGrades,
  mockLibrary,
  mockMessages,
  mockNotifications,
  mockSchedule,
  mockStructure,
  mockStudents,
  mockTeachers,
  mockUpcomingHomework,
  mockUEs,
  mockUsers,
} from '../mocks/data'
import { apiFetch, delay, isApiEnabled } from './client'

export async function getDashboard(): Promise<DashboardData> {
  if (isApiEnabled()) return apiFetch('/dashboard')
  return delay(mockDashboard)
}

export async function getCourses(): Promise<Course[]> {
  if (isApiEnabled()) return apiFetch('/courses')
  return delay(mockCourses)
}

export async function getUpcomingHomework(): Promise<HomeworkPreview[]> {
  if (isApiEnabled()) return apiFetch('/homework/upcoming')
  return delay(mockUpcomingHomework)
}

export async function getSchedule(): Promise<ScheduleData> {
  if (isApiEnabled()) return apiFetch('/schedule')
  return delay(mockSchedule)
}

export async function getAssignments(): Promise<{ summary: AssignmentSummary[]; items: Assignment[] }> {
  if (isApiEnabled()) return apiFetch('/assignments')
  return delay({ summary: mockAssignmentSummary, items: mockAssignments })
}

export async function getGrades(): Promise<GradesData> {
  if (isApiEnabled()) return apiFetch('/grades')
  return delay(mockGrades)
}

export async function getAttendance(): Promise<AttendanceData> {
  if (isApiEnabled()) return apiFetch('/attendance')
  return delay(mockAttendance)
}

export async function getConversations(): Promise<Conversation[]> {
  if (isApiEnabled()) return apiFetch('/messages/conversations')
  return delay(mockConversations)
}

export async function getMessages(_conversationId: number): Promise<ChatMessage[]> {
  if (isApiEnabled()) return apiFetch(`/messages/${_conversationId}`)
  return delay(mockMessages)
}

export async function getNotifications(): Promise<NotificationItem[]> {
  if (isApiEnabled()) return apiFetch('/notifications')
  return delay(mockNotifications)
}

export async function getLibrary(): Promise<LibraryResource[]> {
  if (isApiEnabled()) return apiFetch('/library')
  return delay(mockLibrary)
}

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  if (isApiEnabled()) return apiFetch('/admin/dashboard')
  return delay(mockAdminDashboard)
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (isApiEnabled()) return apiFetch('/admin/users')
  return delay(mockAdminUsers)
}

export async function getAdminCourses(): Promise<AdminCourse[]> {
  if (isApiEnabled()) return apiFetch('/admin/courses')
  return delay(mockAdminCourses)
}

export async function getClassrooms(): Promise<Classroom[]> {
  if (isApiEnabled()) return apiFetch('/admin/classrooms')
  return delay(mockClassrooms)
}

export async function getUEs(): Promise<AcademicUnit[]> {
  if (isApiEnabled()) return apiFetch('/admin/ue')
  return delay(mockUEs)
}

export async function getStudents(): Promise<StudentRecord[]> {
  if (isApiEnabled()) return apiFetch('/admin/students')
  return delay(mockStudents)
}

export async function getTeachers(): Promise<TeacherRecord[]> {
  if (isApiEnabled()) return apiFetch('/admin/teachers')
  return delay(mockTeachers)
}

export async function getAcademicStructure(): Promise<StructureNode[]> {
  if (isApiEnabled()) return apiFetch('/admin/structure')
  return delay(mockStructure)
}

export async function login(email: string, _password: string): Promise<User> {
  if (isApiEnabled()) {
    return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password: _password }) })
  }
  const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? mockUsers[0]
  return delay(user, 300)
}

export async function register(name: string, email: string, _password: string): Promise<User> {
  if (isApiEnabled()) {
    return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password: _password }) })
  }
  return delay(
    {
      id: `u-${Date.now()}`,
      name,
      email,
      role: 'student',
      roleLabel: 'Étudiant',
      status: 'En ligne',
    } satisfies User,
    300,
  )
}

export function getMockUserByRole(role: User['role']): User {
  return mockUsers.find((u) => u.role === role) ?? mockUsers[0]
}
