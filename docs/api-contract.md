# Contrat API UniFlow (front → backend)

Ce document décrit les endpoints attendus par la couche `src/services/`.
Tant que `VITE_USE_API` n'est pas `true`, le front utilise les mocks de `src/mocks/data.ts`.

## Configuration

| Variable | Description | Défaut |
|---|---|---|
| `VITE_USE_API` | `true` pour appeler l'API HTTP | `false` (mocks) |
| `VITE_API_BASE_URL` | Base URL de l'API | `/api` |

## Auth

| Méthode | Path | Body | Réponse |
|---|---|---|---|
| POST | `/auth/login` | `{ email, password }` | `User` |
| POST | `/auth/register` | `{ name, email, password }` | `User` |

### Type `User`

```ts
{
  id: string
  name: string
  email: string
  role: 'student' | 'delegate' | 'teacher' | 'admin'
  roleLabel: string
  avatar?: string
  status: 'En ligne' | 'Absent' | 'Occupé'
}
```

## Étudiant / enseignant

| Méthode | Path | Réponse |
|---|---|---|
| GET | `/dashboard` | `DashboardData` |
| GET | `/courses` | `Course[]` |
| GET | `/homework/upcoming` | `HomeworkPreview[]` |
| GET | `/schedule` | `ScheduleData` |
| GET | `/assignments` | `{ summary, items }` |
| GET | `/grades` | `GradesData` |
| GET | `/attendance` | `AttendanceData` |
| GET | `/messages/conversations` | `Conversation[]` |
| GET | `/messages/:id` | `ChatMessage[]` |
| GET | `/notifications` | `NotificationItem[]` |
| GET | `/library` | `LibraryResource[]` |

## Admin

| Méthode | Path | Réponse |
|---|---|---|
| GET | `/admin/dashboard` | `AdminDashboardData` |
| GET | `/admin/users` | `AdminUser[]` |
| GET | `/admin/courses` | `AdminCourse[]` |
| GET | `/admin/classrooms` | `Classroom[]` |
| GET | `/admin/ue` | `AcademicUnit[]` |
| GET | `/admin/students` | `StudentRecord[]` |
| GET | `/admin/teachers` | `TeacherRecord[]` |
| GET | `/admin/structure` | `StructureNode[]` |

Les définitions TypeScript de référence sont dans `src/types/index.ts`.
Les services front sont dans `src/services/index.ts` — swap mock/API via `isApiEnabled()`.
