import { Plus } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useClassrooms } from '../../hooks'

export default function ClassroomsPage() {
  const { data, loading, error } = useClassrooms()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les salles" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Salles" actions={<Button><Plus className="h-4 w-4" /> Ajouter une salle</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((room) => (
          <Card key={room.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text">{room.name}</p>
                <p className="text-sm text-muted">{room.building}</p>
              </div>
              <Badge variant="info">{room.type}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted">Capacité : {room.capacity}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
