import { useState } from 'react'
import { UserCheck, Search, Download, Plus, Eye, Edit, Trash2, Mail, Phone, Book } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

interface Teacher {
  id: string
  code: string
  name: string
  email: string
  phone: string
  department: string
  specialization: string
  coursesCount: number
  studentsCount: number
  status: 'active' | 'onleave' | 'retired'
  grade: string
}

const mockTeachers: Teacher[] = [
  { id: '1', code: 'ENS001', name: 'Pr. Martin Dupont', email: 'martin.dupont@uy1.cm', phone: '+237 670 111 222', department: 'Informatique', specialization: 'Intelligence Artificielle', coursesCount: 4, studentsCount: 180, status: 'active', grade: 'Professeur' },
  { id: '2', code: 'ENS012', name: 'Dr. Sophie Kamga', email: 'sophie.kamga@uy1.cm', phone: '+237 690 333 444', department: 'Informatique', specialization: 'Bases de Données', coursesCount: 3, studentsCount: 140, status: 'active', grade: 'Maître de Conférences' },
  { id: '3', code: 'ENS024', name: 'Pr. Jean Mbida', email: 'jean.mbida@uy1.cm', phone: '+237 655 555 666', department: 'Mathématiques', specialization: 'Analyse Numérique', coursesCount: 5, studentsCount: 220, status: 'active', grade: 'Professeur' },
  { id: '4', code: 'ENS045', name: 'Dr. Marie Ngo Bisse', email: 'marie.ngobisse@uy1.cm', phone: '+237 677 777 888', department: 'Informatique', specialization: 'Réseaux & Sécurité', coursesCount: 2, studentsCount: 95, status: 'active', grade: 'Chargé de Cours' },
  { id: '5', code: 'ENS078', name: 'Pr. Paul Essomba', email: 'paul.essomba@uy1.cm', phone: '+237 693 999 000', department: 'Économie', specialization: 'Économétrie', coursesCount: 3, studentsCount: 165, status: 'onleave', grade: 'Professeur' },
  { id: '6', code: 'ENS089', name: 'Dr. Alice Fouda', email: 'alice.fouda@uy1.cm', phone: '+237 680 111 333', department: 'Mathématiques', specialization: 'Statistiques', coursesCount: 4, studentsCount: 185, status: 'active', grade: 'Maître de Conférences' },
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = mockTeachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDept = filterDept === 'all' || t.department === filterDept
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    return matchSearch && matchDept && matchStatus
  })

  const stats = [
    { label: 'Total Enseignants', value: mockTeachers.length, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'Actifs', value: mockTeachers.filter(t => t.status === 'active').length, color: 'text-[#059669]', bg: 'bg-emerald-50' },
    { label: 'En congé', value: mockTeachers.filter(t => t.status === 'onleave').length, color: 'text-[#d97706]', bg: 'bg-amber-50' },
    { label: 'Cours totaux', value: mockTeachers.reduce((sum, t) => sum + t.coursesCount, 0), color: 'text-[#7c3aed]', bg: 'bg-purple-50' },
  ]

  const statusConfig = {
    active: { label: 'Actif', variant: 'success' as const },
    onleave: { label: 'En congé', variant: 'warning' as const },
    retired: { label: 'Retraité', variant: 'neutral' as const },
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Gestion des Enseignants</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Administration · UniFlow 2026</p>
        </div>
        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Enseignant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div className={`inline-flex items-center justify-center rounded-lg p-2 ${s.bg} mb-3`}>
              <UserCheck className={`h-5 w-5 ${s.color}`} />
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
              placeholder="Rechercher par nom, code, spécialisation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-[#d1d5db] bg-white py-2 pl-10 pr-4 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
            />
          </div>
          <div className="flex gap-2">
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
              className="rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20">
              <option value="all">Tous départements</option>
              <option value="Informatique">Informatique</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Économie">Économie</option>
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20">
              <option value="all">Tous statuts</option>
              <option value="active">Actif</option>
              <option value="onleave">En congé</option>
              <option value="retired">Retraité</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#e5e7eb]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Enseignant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Département</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Spécialisation</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Cours</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Étudiants</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {filtered.map(teacher => (
                <tr key={teacher.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-[#1e3a8a]">{teacher.code}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0d9488] to-[#059669] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {teacher.name.split(' ').slice(-1)[0][0]}{teacher.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827]">{teacher.name}</p>
                        <p className="text-xs text-[#6b7280]">{teacher.grade}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                        <Mail className="h-3 w-3" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                        <Phone className="h-3 w-3" />
                        <span>{teacher.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#374151]">{teacher.department}</td>
                  <td className="px-4 py-3 text-sm text-[#6b7280]">{teacher.specialization}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Book className="h-4 w-4 text-[#7c3aed]" />
                      <span className="text-sm font-semibold text-[#111827]">{teacher.coursesCount}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#374151]">{teacher.studentsCount}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusConfig[teacher.status].variant}>
                      {statusConfig[teacher.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-1.5 hover:bg-[#eff3ff] text-[#6b7280] hover:text-[#1e3a8a] transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 hover:bg-[#eff3ff] text-[#6b7280] hover:text-[#1e3a8a] transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 hover:bg-red-50 text-[#6b7280] hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-[#9ca3af]">Aucun enseignant trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
