import { Plus } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useTeachers } from '../../hooks'

export default function TeachersPage() {
  const { data, loading, error } = useTeachers()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les enseignants" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Gestion des enseignants" actions={<Button><Plus className="h-4 w-4" /> Ajouter</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((t) => (
          <Card key={t.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text">{t.name}</p>
                <p className="text-sm text-muted">{t.department}</p>
              </div>
              <Badge variant="success">{t.status}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted">{t.courses} cours · {t.id}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
