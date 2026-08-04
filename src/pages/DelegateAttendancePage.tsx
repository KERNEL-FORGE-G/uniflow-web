import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useAttendance } from '../hooks'
import { EmptyState } from '../components/ui/EmptyState'

export default function DelegateAttendancePage() {
  const { data, loading, error } = useAttendance()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gérer les présences"
        description="Espace délégué — validation et suivi des sessions"
      />
      {loading ? <p className="text-sm text-muted">Chargement…</p> : null}
      {error ? <EmptyState title="Erreur" description={error} /> : null}
      {data ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.students.map((s) => (
            <Card key={s.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-text">{s.name}</p>
                  <p className="text-xs text-muted">{s.id}</p>
                </div>
                <Badge variant={s.status === 'Régulier' ? 'success' : s.status === 'Attention' ? 'warning' : 'danger'}>
                  {s.status}
                </Badge>
              </div>
              <p className="mt-3 text-2xl font-bold text-teal">{s.rate}%</p>
              <p className="text-sm text-muted">
                {s.present} présents · {s.absent} absents · {s.late} retards
              </p>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}
