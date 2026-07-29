import { useState } from 'react'
import { Filter, LayoutGrid, List, BookOpen, Clock, Users, ChevronRight } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { useNavigate } from 'react-router-dom'
import { mockCourses } from '../data/mockData'

const tabs = ['Tous', 'En cours', 'À venir', 'Terminés'] as const
type Tab = typeof tabs[number]

const upcomingHomework = [
  { title: 'Algorithmique — Devoir 3', code: 'INFO101', due: '20 mai 2024', color: 'text-[#1e3a8a]' },
  { title: 'Bases de données — Devoir 2', code: 'INFO201', due: '22 mai 2024', color: 'text-[#0d9488]' },
  { title: 'Réseaux — Devoir 1', code: 'INFO301', due: '24 mai 2024', color: 'text-[#7c3aed]' },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Tous')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = mockCourses.filter(c => {
    const matchTab = activeTab === 'Tous' || c.status === activeTab
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-[#111827]">Mes cours</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un cours, un enseignant..."
              className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:bg-white w-64" />
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
            <Filter className="h-4 w-4" /> Filtrer
          </button>
          <div className="flex rounded-lg border border-[#e5e7eb] overflow-hidden">
            <button onClick={() => setView('grid')}
              className={`p-2 transition-colors ${view === 'grid' ? 'bg-[#1e3a8a] text-white' : 'bg-white text-[#6b7280] hover:bg-[#f9fafb]'}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setView('list')}
              className={`p-2 transition-colors ${view === 'list' ? 'bg-[#1e3a8a] text-white' : 'bg-white text-[#6b7280] hover:bg-[#f9fafb]'}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#e5e7eb]">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab ? 'border-[#1e3a8a] text-[#1e3a8a]' : 'border-transparent text-[#6b7280] hover:text-[#374151]'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Course cards */}
        <div className={`lg:col-span-2 ${view === 'grid' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-3'}`}>
          {filtered.length === 0 && (
            <div className="col-span-2 flex flex-col items-center justify-center py-16 text-[#9ca3af]">
              <BookOpen className="h-12 w-12 mb-3 opacity-30" />
              <p className="font-medium">Aucun cours trouvé</p>
            </div>
          )}
          {filtered.map(course => (
            view === 'grid' ? (
              <div key={course.id} className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group">
                {/* Cover */}
                <div className={`h-28 bg-gradient-to-r ${course.color} relative p-4 flex flex-col justify-end`}>
                  <span className="inline-flex items-center rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {course.code}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-[#111827] text-sm leading-tight">{course.title}</h3>
                    <Badge variant={course.status === 'En cours' ? 'success' : 'warning'} className="shrink-0">
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#6b7280]">{course.teacher} · {course.semester}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-[#9ca3af]">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.enrolled}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.credits} crédits</span>
                  </div>
                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#9ca3af]">Progression</span>
                      <span className="font-semibold text-[#374151]">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#f3f4f6] overflow-hidden">
                      <div className="h-full rounded-full bg-[#0d9488] transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <button onClick={() => navigate('/app/visioconference')}
                    className="mt-4 w-full rounded-lg bg-[#1e3a8a] py-2 text-xs font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
                    Continuer
                  </button>
                </div>
              </div>
            ) : (
              <div key={course.id} className="flex items-center gap-4 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm hover:shadow-md transition-all">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                  {course.code.slice(0, 4)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#111827] text-sm truncate">{course.title}</h3>
                    <Badge variant={course.status === 'En cours' ? 'success' : 'warning'}>{course.status}</Badge>
                  </div>
                  <p className="text-xs text-[#6b7280] mt-0.5">{course.teacher} · {course.semester}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex-1 h-1.5 rounded-full bg-[#f3f4f6] overflow-hidden">
                      <div className="h-full bg-[#0d9488]" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-[#374151] shrink-0">{course.progress}%</span>
                  </div>
                </div>
                <button className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] flex items-center gap-1 shrink-0">
                  Voir <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          ))}
        </div>

        {/* Sidebar: upcoming homework */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#111827]">Prochains devoirs</h2>
              <Badge variant="warning">{upcomingHomework.length}</Badge>
            </div>
            <div className="space-y-3">
              {upcomingHomework.map(hw => (
                <div key={hw.title} className="flex items-start gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f9fafb] transition-colors">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fef3c7] text-xs font-bold ${hw.color}`}>
                    D
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{hw.title}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5">À rendre le {hw.due}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-center text-xs font-medium text-[#1e3a8a] hover:underline" onClick={() => navigate('/app/devoirs')}>
              Voir tous les devoirs →
            </button>
          </div>

          {/* Course stats */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#111827] mb-4">Résumé</h2>
            <div className="space-y-3">
              {[
                { label: 'Cours inscrits', value: mockCourses.length, color: 'text-[#1e3a8a]' },
                { label: 'En cours', value: mockCourses.filter(c => c.status === 'En cours').length, color: 'text-[#0d9488]' },
                { label: 'À venir', value: mockCourses.filter(c => c.status === 'À venir').length, color: 'text-[#d97706]' },
                { label: 'Crédits total', value: mockCourses.reduce((s, c) => s + c.credits, 0), color: 'text-[#7c3aed]' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center text-sm">
                  <span className="text-[#6b7280]">{s.label}</span>
                  <span className={`font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
