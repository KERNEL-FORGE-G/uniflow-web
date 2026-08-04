import { useMemo, useState } from 'react'
import { Filter, LayoutGrid, List } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { useCourses, useUpcomingHomework } from '../hooks'

const tabs = ['Tous', 'En cours', 'À venir', 'Terminés'] as const

export default function CoursesPage() {
  const { data: courses, loading, error } = useCourses()
  const { data: upcomingHomework } = useUpcomingHomework()
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Tous')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    if (!courses) return []
    if (activeTab === 'Tous') return courses
    return courses.filter((c) => c.status === activeTab)
  }, [courses, activeTab])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes cours"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline">
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
        }
      />

      <div className="flex gap-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? <p className="text-sm text-muted">Chargement…</p> : null}
      {error ? <EmptyState title="Erreur" description={error} /> : null}

      {courses ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className={`lg:col-span-2 ${viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}`}>
            {filtered.map((course) => (
              <Card key={course.code} className="overflow-hidden p-0">
                <div className={`h-24 bg-gradient-to-r ${course.color}`} />
                <div className="p-4">
                  <Badge variant="primary" className="mb-2">
                    {course.code}
                  </Badge>
                  <h3 className="font-semibold text-text">{course.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {course.teacher} · {course.semester}
                  </p>
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
              {(upcomingHomework ?? []).map((hw) => (
                <li key={hw.title} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-xs font-bold text-orange-600">
                    D
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{hw.title}</p>
                    <p className="text-xs text-muted">{hw.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
