import { useAsyncData } from './useAsyncData'
import {
  getAdminCourses,
  getAdminDashboard,
  getAdminUsers,
  getAssignments,
  getAttendance,
  getAcademicStructure,
  getClassrooms,
  getConversations,
  getCourses,
  getDashboard,
  getGrades,
  getLibrary,
  getMessages,
  getNotifications,
  getSchedule,
  getStudents,
  getTeachers,
  getUEs,
  getUpcomingHomework,
} from '../services'

export function useDashboard() {
  return useAsyncData(getDashboard)
}

export function useCourses() {
  return useAsyncData(getCourses)
}

export function useUpcomingHomework() {
  return useAsyncData(getUpcomingHomework)
}

export function useSchedule() {
  return useAsyncData(getSchedule)
}

export function useAssignments() {
  return useAsyncData(getAssignments)
}

export function useGrades() {
  return useAsyncData(getGrades)
}

export function useAttendance() {
  return useAsyncData(getAttendance)
}

export function useConversations() {
  return useAsyncData(getConversations)
}

export function useMessages(conversationId: number) {
  return useAsyncData(() => getMessages(conversationId), [conversationId])
}

export function useNotifications() {
  return useAsyncData(getNotifications)
}

export function useLibrary() {
  return useAsyncData(getLibrary)
}

export function useAdminDashboard() {
  return useAsyncData(getAdminDashboard)
}

export function useAdminUsers() {
  return useAsyncData(getAdminUsers)
}

export function useAdminCourses() {
  return useAsyncData(getAdminCourses)
}

export function useClassrooms() {
  return useAsyncData(getClassrooms)
}

export function useUEs() {
  return useAsyncData(getUEs)
}

export function useStudents() {
  return useAsyncData(getStudents)
}

export function useTeachers() {
  return useAsyncData(getTeachers)
}

export function useAcademicStructure() {
  return useAsyncData(getAcademicStructure)
}
