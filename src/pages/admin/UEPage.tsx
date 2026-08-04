import { Plus } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useUEs } from '../../hooks'

export default function UEPage() {
  const { data, loading, error } = useUEs()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les UE" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Unités d'enseignement" actions={<Button><Plus className="h-4 w-4" /> Nouvelle UE</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((ue) => (
          <Card key={ue.id}>
            <Badge variant="primary">{ue.code}</Badge>
            <h3 className="mt-2 font-semibold text-text">{ue.title}</h3>
            <p className="mt-1 text-sm text-muted">
              {ue.credits} crédits · {ue.semester}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
