import { useState } from 'react'
import { GraduationCap, Search, Download, Plus, Eye, Edit, Trash2, Mail, Phone } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

interface Student {
  id: string
  matricule: string
  name: string
  email: string
  phone: string
  department: string
  level: string
  year: string
  status: 'active' | 'suspended' | 'graduated'
  average: number
  credits: number
}

const mockStudents: Student[] = [
  { id: '1', matricule: '20INFO001', name: 'Adamou Ibrahim', email: 'adamou.i@facsciences-uy1.cm', phone: '+237 670 123 456', department: 'Informatique', level: 'L3', year: '2025-2026', status: 'active', average: 14.5, credits: 180 },
  { id: '2', matricule: '20INFO045', name: 'Kameni Sarah', email: 'kameni.s@facsciences-uy1.cm', phone: '+237 690 234 567', department: 'Informatique', level: 'L2', year: '2025-2026', status: 'active', average: 16.2, credits: 120 },
  { id: '3', matricule: '19MATH012', name: 'Nkodo Paul', email: 'nkodo.p@facsciences-uy1.cm', phone: '+237 655 345 678', department: 'Mathématiques', level: 'M1', year: '2025-2026', status: 'active', average: 15.8, credits: 240 },
  { id: '4', matricule: '21INFO089', name: 'Fotso Divine', email: 'fotso.d@facsciences-uy1.cm', phone: '+237 677 456 789', department: 'Informatique', level: 'L1', year: '2025-2026', status: 'active', average: 13.9, credits: 60 },
  { id: '5', matricule: '18ECO034', name: 'Mballa Jean', email: 'mballa.j@uy1.cm', phone: '+237 693 567 890', department: 'Économie', level: 'M2', year: '2025-2026', status: 'graduated', average: 17.1, credits: 300 },
  { id: '6', matricule: '20INFO078', name: 'Tchoumba Alice', email: 'tchoumba.a@facsciences-uy1.cm', phone: '+237 680 678 901', department: 'Informatique', level: 'L2', year: '2025-2026', status: 'suspended', average: 9.2, credits: 105 },
  { id: '7', matricule: '21MATH056', name: 'Onana Marc', email: 'onana.m@facsciences-uy1.cm', phone: '+237 671 789 012', department: 'Mathématiques', level: 'L1', year: '2025-2026', status: 'active', average: 15.3, credits: 55 },
  { id: '8', matricule: '19INFO023', name: 'Bella Christelle', email: 'bella.c@facsciences-uy1.cm', phone: '+237 694 890 123', department: 'Informatique', level: 'M1', year: '2025-2026', status: 'active', average: 16.7, credits: 245 },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState<string>('all')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       s.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       s.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDept = filterDept === 'all' || s.department === filterDept
    const matchLevel = filterLevel === 'all' || s.level === filterLevel
    const matchStatus = filterStatus === 'all' || s.status === filterStatus
    return matchSearch && matchDept && matchLevel && matchStatus
  })

  const stats = [
    { label: 'Total Étudiants', value: mockStudents.length, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'Actifs', value: mockStudents.filter(s => s.status === 'active').length, color: 'text-[#059669]', bg: 'bg-emerald-50' },
    { label: 'Suspendus', value: mockStudents.filter(s => s.status === 'suspended').length, color: 'text-[#d97706]', bg: 'bg-amber-50' },
    { label: 'Diplômés 2026', value: mockStudents.filter(s => s.status === 'graduated').length, color: 'text-[#7c3aed]', bg: 'bg-purple-50' },
  ]

  const statusConfig = {
    active: { label: 'Actif', variant: 'success' as const },
    suspended: { label: 'Suspendu', variant: 'warning' as const },
    graduated: { label: 'Diplômé', variant: 'neutral' as const },
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Gestion des Étudiants</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Administration · UniFlow 2026</p>
        </div>
        <Button className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Étudiant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div className={`inline-flex items-center justify-center rounded-lg p-2 ${s.bg} mb-3`}>
              <GraduationCap className={`h-5 w-5 ${s.color}`} />
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
              placeholder="Rechercher par nom, matricule, email..."
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
            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}
              className="rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20">
              <option value="all">Tous niveaux</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="M1">M1</option>
              <option value="M2">M2</option>
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20">
              <option value="all">Tous statuts</option>
              <option value="active">Actif</option>
              <option value="suspended">Suspendu</option>
              <option value="graduated">Diplômé</option>
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Matricule</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Étudiant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Département</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Niveau</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Moyenne</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Crédits</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {filtered.map(student => (
                <tr key={student.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-[#1e3a8a]">{student.matricule}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827]">{student.name}</p>
                        <p className="text-xs text-[#6b7280]">{student.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                        <Mail className="h-3 w-3" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                        <Phone className="h-3 w-3" />
                        <span>{student.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#374151]">{student.department}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-[#eff3ff] px-2.5 py-0.5 text-xs font-semibold text-[#1e3a8a]">
                      {student.level}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${student.average >= 14 ? 'text-[#059669]' : student.average >= 10 ? 'text-[#d97706]' : 'text-[#dc2626]'}`}>
                      {student.average.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#374151]">{student.credits}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusConfig[student.status].variant}>
                      {statusConfig[student.status].label}
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
            <p className="text-sm text-[#9ca3af]">Aucun étudiant trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
