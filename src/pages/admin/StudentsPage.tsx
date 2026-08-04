import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { Button } from '../../components/ui/Button'
import { useStudents } from '../../hooks'
import { Plus } from 'lucide-react'

export default function StudentsPage() {
  const { data, loading, error } = useStudents()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les étudiants" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Gestion des étudiants" actions={<Button><Plus className="h-4 w-4" /> Ajouter</Button>} />
      <Card className="overflow-hidden !p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-bg">
            <tr>
              {['ID', 'Nom', 'Filière', 'Niveau', 'Statut'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((s) => (
              <tr key={s.id} className="hover:bg-bg">
                <td className="px-4 py-3 text-muted">{s.id}</td>
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.program}</td>
                <td className="px-4 py-3">{s.level}</td>
                <td className="px-4 py-3">
                  <Badge variant={s.status === 'Actif' ? 'success' : 'warning'}>{s.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
