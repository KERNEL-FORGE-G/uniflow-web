import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useAcademicStructure } from '../../hooks'

export default function AcademicStructurePage() {
  const { data, loading, error } = useAcademicStructure()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger la structure" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Structure académique" description="Facultés, départements et filières" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((node) => (
          <Card key={node.id}>
            <Badge variant="primary">{node.type}</Badge>
            <h3 className="mt-2 font-semibold text-text">{node.name}</h3>
            {node.children != null ? (
              <p className="mt-1 text-sm text-muted">{node.children} éléments enfants</p>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  )
}
