import { Plus } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Select } from '../components/ui/Input'
import { useAssignments } from '../hooks'

export default function AssignmentsPage() {
  const { data, loading, error } = useAssignments()

  if (loading) return <p className="text-sm text-muted">Chargement des devoirs…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les devoirs" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Mes devoirs" actions={<Button><Plus className="h-4 w-4" /> Nouveau devoir</Button>} />

      <div className="flex flex-wrap gap-3">
        {['Statut', 'UE', 'Date'].map((f) => (
          <Select key={f} defaultValue={f}>
            <option>{f}</option>
          </Select>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.summary.map(({ label, value, color, bg }) => (
          <Card key={label} className={`${bg} !border-0`}>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {data.items.map((a) => (
          <Card key={a.title} className="flex flex-wrap items-center gap-4">
            <div className="min-w-[200px] flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="primary">{a.code}</Badge>
                <Badge variant={a.statusVariant}>{a.status}</Badge>
              </div>
              <h3 className="mt-2 font-semibold text-text">{a.title}</h3>
              <p className="text-sm text-muted">Échéance : {a.due}</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 max-w-xs flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-teal" style={{ width: `${a.progress}%` }} />
                </div>
                <span className="text-xs text-muted">{a.progress}%</span>
              </div>
            </div>
            <Button variant={a.action === 'Continuer' ? 'primary' : 'outline'}>{a.action}</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
