import { Plus, BookOpen, Users, Link2, Copy } from 'lucide-react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useAdminCourses } from '../../hooks'

export default function AdminCoursesPage() {
  const { data, loading, error } = useAdminCourses()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les cours" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Gestion des cours & programmes" actions={<Button><Plus className="h-4 w-4" /> Créer un cours</Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {data.map((c) => (
            <Card key={c.code}>
              <div className="flex items-center justify-between">
                <Badge variant="primary">{c.code}</Badge>
                <Badge variant={c.status === 'Actif' ? 'success' : 'warning'}>{c.status}</Badge>
              </div>
              <h3 className="mt-2 font-semibold">{c.title}</h3>
              <p className="text-sm text-muted">
                {c.teacher} · {c.students} étudiants
              </p>
              <div className="mt-3 flex gap-3 text-sm">
                <button type="button" className="text-primary hover:underline">
                  Éditer
                </button>
                <button type="button" className="text-muted hover:underline">
                  <Copy className="inline h-3 w-3" /> Dupliquer
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Actions rapides</CardTitle>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4" /> Créer UE
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4" /> Associer enseignant
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Link2 className="h-4 w-4" /> Lier programme
              </Button>
            </div>
          </Card>
          <Card>
            <CardTitle className="mb-4 text-base">Statistiques</CardTitle>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Cours actifs</dt>
                <dd className="font-semibold">{data.filter((c) => c.status === 'Actif').length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Total</dt>
                <dd className="font-semibold">{data.length}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  )
}
