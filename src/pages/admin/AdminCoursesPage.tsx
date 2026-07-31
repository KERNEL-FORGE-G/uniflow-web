import { useState } from 'react'
import { BookOpen, Search, Download, Plus, Eye, Edit, Trash2, Calendar, MapPin, Users, UserCheck } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

interface Course {
  id: string
  code: string
  title: string
  ue: string
  teacher: string
  level: string
  room: string
  schedule: string
  studentsCount: number
  type: 'CM' | 'TD' | 'TP'
  status: 'ongoing' | 'completed' | 'scheduled'
  progress: number
}

const mockCourses: Course[] = [
  { id: '1', code: 'INF301-CM', title: 'IA - Réseaux de Neurones', ue: 'INF301', teacher: 'Pr. Martin Dupont', level: 'L3', room: 'A201', schedule: 'Lun 08:00-10:00', studentsCount: 85, type: 'CM', status: 'ongoing', progress: 65 },
  { id: '2', code: 'INF302-TD', title: 'BD Avancées - SQL Avancé', ue: 'INF302', teacher: 'Dr. Sophie Kamga', level: 'L3', room: 'B105', schedule: 'Mar 10:00-12:00', studentsCount: 40, type: 'TD', status: 'ongoing', progress: 55 },
  { id: '3', code: 'INF201-CM', title: 'Structures de Données', ue: 'INF201', teacher: 'Dr. Marie Ngo Bisse', level: 'L2', room: 'A204', schedule: 'Mer 14:00-16:00', studentsCount: 120, type: 'CM', status: 'ongoing', progress: 70 },
  { id: '4', code: 'MAT401-CM', title: 'Analyse Numérique', ue: 'MAT401', teacher: 'Pr. Jean Mbida', level: 'M1', room: 'C301', schedule: 'Jeu 08:00-11:00', studentsCount: 42, type: 'CM', status: 'ongoing', progress: 45 },
  { id: '5', code: 'INF205-TP', title: 'Réseaux - Configuration', ue: 'INF205', teacher: 'Dr. Marie Ngo Bisse', level: 'L2', room: 'Lab3', schedule: 'Ven 14:00-17:00', studentsCount: 30, type: 'TP', status: 'scheduled', progress: 0 },
  { id: '6', code: 'INF101-CM', title: 'Intro Programmation C', ue: 'INF101', teacher: 'Dr. Alice Fouda', level: 'L1', room: 'A101', schedule: 'Lun 14:00-16:00', studentsCount: 150, type: 'CM', status: 'scheduled', progress: 0 },
]

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = mockCourses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchType = filterType === 'all' || c.type === filterType
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    return matchSearch && matchType && matchStatus
  })

  const stats = [
    { label: 'Total Cours', value: mockCourses.length, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'En cours', value: mockCourses.filter(c => c.status === 'ongoing').length, color: 'text-[#059669]', bg: 'bg-emerald-50' },
    { label: 'Programmés', value: mockCourses.filter(c => c.status === 'scheduled').length, color: 'text-[#d97706]', bg: 'bg-amber-50' },
    { label: 'Terminés', value: mockCourses.filter(c => c.status === 'completed').length, color: 'text-[#7c3aed]', bg: 'bg-purple-50' },
  ]

  const statusConfig = {
    ongoing: { label: 'En cours', color: 'success' as const },
    scheduled: { label: 'Programmé', color: 'warning' as const },
    completed: { label: 'Terminé', color: 'neutral' as const },
  }

  const typeColors = {
    CM: 'bg-[#eff3ff] text-[#1e3a8a]',
    TD: 'bg-[#f0fdfa] text-[#0d9488]',
    TP: 'bg-purple-50 text-[#7c3aed]',
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Gestion des Cours</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Administration · Séances de cours 2026</p>
        </div>
        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div className={`inline-flex items-center justify-center rounded-lg p-2 ${s.bg} mb-3`}>
              <BookOpen className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-[#111827]">{s.value}</p>
            <p className="text-xs text-[#6b7280] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Rechercher par titre, code, enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-[#d1d5db] bg-white py-2 pl-10 pr-4 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
            />
          </div>
          <div className="flex gap-2">
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              className="rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20">
              <option value="all">Tous types</option>
              <option value="CM">Cours Magistral</option>
              <option value="TD">Travaux Dirigés</option>
              <option value="TP">Travaux Pratiques</option>
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20">
              <option value="all">Tous statuts</option>
              <option value="ongoing">En cours</option>
              <option value="scheduled">Programmé</option>
              <option value="completed">Terminé</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(course => (
          <div key={course.id} className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${typeColors[course.type]}`}>
                {course.type}
              </span>
              <Badge color={statusConfig[course.status].color}>{statusConfig[course.status].label}</Badge>
            </div>
            
            <h3 className="font-bold text-[#111827] text-base mb-1">{course.title}</h3>
            <p className="text-xs text-[#6b7280] mb-3 font-mono">{course.code} · UE {course.ue}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#374151]">
                <UserCheck className="h-4 w-4 text-[#0d9488]" />
                <span>{course.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#374151]">
                <MapPin className="h-4 w-4 text-[#7c3aed]" />
                <span>{course.room}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#374151]">
                <Calendar className="h-4 w-4 text-[#d97706]" />
                <span>{course.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#374151]">
                <Users className="h-4 w-4 text-[#1e3a8a]" />
                <span>{course.studentsCount} étudiants</span>
              </div>
            </div>

            {/* Progress bar */}
            {course.status === 'ongoing' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#6b7280]">Progression</span>
                  <span className="text-xs font-bold text-[#1e3a8a]">{course.progress}%</span>
                </div>
                <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1e3a8a] to-[#7c3aed] rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-3 border-t border-[#f3f4f6]">
              <button className="flex-1 rounded-lg bg-[#eff3ff] hover:bg-[#1e3a8a] hover:text-white text-[#1e3a8a] py-2 px-3 text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                <Eye className="h-4 w-4" />
                Détails
              </button>
              <button className="rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] p-2 text-[#6b7280] transition-colors">
                <Edit className="h-4 w-4" />
              </button>
              <button className="rounded-lg border border-[#e5e7eb] hover:bg-red-50 hover:border-red-200 p-2 text-[#6b7280] hover:text-red-600 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-[#9ca3af]">Aucun cours trouvé</p>
        </div>
      )}
    </div>
  )
}
