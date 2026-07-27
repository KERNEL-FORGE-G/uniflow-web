import { useState } from 'react'
import { Filter, LayoutGrid, List } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const tabs = ['Tous', 'En cours', 'À venir', 'Terminés'] as const

const courses = [
  { code: 'INFO101', title: 'Algorithmique — Mathématiques', teacher: 'Pr. Martin', semester: 'S2 2024', progress: 75, color: 'from-blue-600 to-blue-800' },
  { code: 'INFO201', title: 'Structures de données', teacher: 'Dr. Kamga', semester: 'S2 2024', progress: 60, color: 'from-teal to-teal-light' },
  { code: 'ECO101', title: 'Microéconomie', teacher: 'Pr. Ngo', semester: 'S2 2024', progress: 45, color: 'from-purple-600 to-purple-800' },
  { code: 'MATH201', title: 'Analyse numérique', teacher: 'Dr. Dupont', semester: 'S2 2024', progress: 90, color: 'from-orange-500 to-orange-700' },
  { code: 'ANG101', title: 'Anglais technique', teacher: 'Mme. Johnson', semester: 'S2 2024', progress: 55, color: 'from-emerald-600 to-emerald-800' },
  { code: 'PHY101', title: 'Physique générale', teacher: 'Pr. Mbarga', semester: 'S2 2024', progress: 30, color: 'from-indigo-600 to-indigo-800' },
]

const upcomingHomework = [
  { title: 'Algorithmique Devoir 3', date: '20 mai 2024' },
  { title: 'Microéconomie Quiz', date: '22 mai 2024' },
  { title: 'Anglais Oral', date: '25 mai 2024' },
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Tous')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Mes cours</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="!py-2">
            <Filter className="h-4 w-4" /> Filtrer
          </Button>
          <div className="flex rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`rounded-l-lg p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-r-lg p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className={`lg:col-span-2 ${viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}`}>
          {courses.map((course) => (
            <Card key={course.code} className="overflow-hidden p-0">
              <div className={`h-24 bg-gradient-to-r ${course.color}`} />
              <div className="p-4">
                <Badge variant="primary" className="mb-2">{course.code}</Badge>
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-1 text-sm text-muted">{course.teacher} · {course.semester}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted">
                    <span>Progression</span>
                    <span>{course.progress}% chapitres vus</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-teal" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <Button className="mt-4 w-full">Continuer</Button>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <CardTitle className="mb-4 text-base">Prochains devoirs</CardTitle>
          <ul className="space-y-3">
            {upcomingHomework.map((hw) => (
              <li key={hw.title} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 text-xs font-bold">D</div>
                <div>
                  <p className="text-sm font-medium">{hw.title}</p>
                  <p className="text-xs text-muted">À rendre le {hw.date}</p>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="mt-4 text-sm font-medium text-primary hover:underline">
            Voir tous les devoirs
          </button>
        </Card>
      </div>
    </div>
  )
}
