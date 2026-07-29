import { useState } from 'react'
import { Plus, Clock, CheckCircle, AlertCircle, FileText, ChevronRight, X } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { mockAssignments, type AssignmentStatus } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const statusMeta: Record<AssignmentStatus, { variant: 'warning'|'danger'|'success'|'info'; icon: any; label: string }> = {
  'À rendre': { variant: 'warning', icon: Clock,        label: 'À rendre' },
  'En retard': { variant: 'danger',  icon: AlertCircle,  label: 'En retard' },
  'Soumis':    { variant: 'success', icon: CheckCircle,  label: 'Soumis' },
  'Noté':      { variant: 'info',    icon: FileText,     label: 'Noté' },
}

const summary = [
  { key: 'À rendre',  color: 'text-[#d97706]', bg: 'bg-[#fef3c7]' },
  { key: 'En retard', color: 'text-[#dc2626]', bg: 'bg-[#fee2e2]' },
  { key: 'Soumis',    color: 'text-[#059669]', bg: 'bg-[#d1fae5]' },
  { key: 'Noté',      color: 'text-[#1d4ed8]', bg: 'bg-[#dbeafe]' },
] as const

export default function AssignmentsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<AssignmentStatus | 'Tous'>('Tous')
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCode, setNewCode] = useState('INFO101')
  const [newDue, setNewDue] = useState('')
  const [assignments, setAssignments] = useState(mockAssignments)

  const filtered = filter === 'Tous' ? assignments : assignments.filter(a => a.status === filter)

  const counts = {
    'À rendre':  assignments.filter(a => a.status === 'À rendre').length,
    'En retard': assignments.filter(a => a.status === 'En retard').length,
    'Soumis':    assignments.filter(a => a.status === 'Soumis').length,
    'Noté':      assignments.filter(a => a.status === 'Noté').length,
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newDue) return
    setAssignments(prev => [{
      id: String(Date.now()), title: newTitle, code: newCode,
      due: newDue, progress: 0, status: 'À rendre',
    }, ...prev])
    setNewTitle(''); setNewDue(''); setShowNew(false)
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Mes devoirs</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Semestre 2 · 2023-2024</p>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
          <Plus className="h-4 w-4" /> Nouveau devoir
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['Tous','Statut','UE','Date'].map(f => (
          <select key={f} className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#374151] outline-none focus:border-[#1e3a8a]">
            <option>{f} ▾</option>
          </select>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {summary.map(({ key, color, bg }) => (
          <button key={key} onClick={() => setFilter(prev => prev === key ? 'Tous' : key as AssignmentStatus)}
            className={`rounded-xl border p-4 text-left transition-all shadow-sm hover:shadow-md ${filter === key ? 'border-[#1e3a8a] ring-2 ring-[#1e3a8a]/20' : 'border-[#e5e7eb] bg-white'} ${filter === key ? bg : 'bg-white'}`}>
            <p className={`text-3xl font-extrabold ${color}`}>{counts[key as AssignmentStatus]}</p>
            <p className="text-xs text-[#6b7280] mt-0.5">{key}</p>
          </button>
        ))}
      </div>

      {/* Assignment list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-[#9ca3af]">
            <FileText className="h-10 w-10 mb-3 opacity-30" />
            <p className="text-sm">Aucun devoir dans cette catégorie.</p>
          </div>
        )}
        {filtered.map(a => {
          const meta = statusMeta[a.status]
          const StatusIcon = meta.icon
          return (
            <div key={a.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge variant="primary">{a.code}</Badge>
                  <Badge variant={meta.variant}>
                    <StatusIcon className="h-3 w-3 mr-1 inline" />{meta.label}
                  </Badge>
                  {a.grade && <span className="text-xs font-bold text-[#1e3a8a] bg-[#eff3ff] rounded-md px-2 py-0.5">{a.grade}</span>}
                </div>
                <h3 className="font-semibold text-[#111827] text-sm">{a.title}</h3>
                <p className="text-xs text-[#9ca3af] mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Échéance : {a.due}
                </p>
                {a.progress > 0 && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 max-w-xs rounded-full bg-[#f3f4f6] overflow-hidden">
                      <div className="h-full rounded-full bg-[#0d9488] transition-all" style={{ width: `${a.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-[#6b7280]">{a.progress}%</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => a.status === 'À rendre' || a.status === 'En retard' ? undefined : undefined}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors shrink-0 ${
                  a.status === 'À rendre' || a.status === 'En retard'
                    ? 'bg-[#1e3a8a] text-white hover:bg-[#2d4fa8]'
                    : 'border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]'
                }`}>
                {a.status === 'À rendre' || a.status === 'En retard' ? 'Continuer' : 'Voir'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>

      {/* New assignment modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#111827]">Nouveau devoir</h2>
              <button onClick={() => setShowNew(false)} className="rounded-lg p-1.5 hover:bg-[#f3f4f6] text-[#9ca3af]"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Titre</label>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} required
                  placeholder="Ex: TP Algo — Tri rapide"
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">UE</label>
                <select value={newCode} onChange={e => setNewCode(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                  {['INFO101','INFO201','INFO301','ECO101','MATH101'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Date limite</label>
                <input type="date" value={newDue} onChange={e => setNewDue(e.target.value)} required
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowNew(false)}
                  className="flex-1 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8]">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
