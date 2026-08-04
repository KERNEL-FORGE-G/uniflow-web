import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useCourses } from '../hooks'
import { EmptyState } from '../components/ui/EmptyState'

export default function TeacherCoursesPage() {
  const { data, loading, error } = useCourses()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes cours (enseignant)"
        description="Cours dont vous êtes responsable"
        actions={<Button>Nouveau contenu</Button>}
      />
      {loading ? <p className="text-sm text-muted">Chargement…</p> : null}
      {error ? <EmptyState title="Erreur" description={error} /> : null}
      {data ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((course) => (
            <Card key={course.code}>
              <Badge variant="primary">{course.code}</Badge>
              <h3 className="mt-2 font-semibold text-text">{course.title}</h3>
              <p className="mt-1 text-sm text-muted">{course.semester}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted">{course.progress}% progression moyenne</p>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}
