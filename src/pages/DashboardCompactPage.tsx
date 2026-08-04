import { Link } from 'react-router-dom'
import { Card, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { useAssignments, useSchedule } from '../hooks'
import { EmptyState } from '../components/ui/EmptyState'

export default function DashboardCompactPage() {
  const { data: schedule, loading: loadingSchedule } = useSchedule()
  const { data: assignments, loading: loadingAssignments } = useAssignments()

  if (loadingSchedule || loadingAssignments) {
    return <p className="text-sm text-muted">Chargement…</p>
  }

  if (!schedule || !assignments) {
    return <EmptyState title="Données indisponibles" />
  }

  const dayEvents = schedule.events.filter((e) => e.day === 0)
  const lateHomework = assignments.items.filter((a) => a.statusVariant === 'danger')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cours du jour"
        description={schedule.weekLabel}
        actions={
          <Link to="/app" className="text-sm font-medium text-primary hover:underline">
            ← Vue principale
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden !p-0 lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-bg">
                <tr>
                  {['Heure', 'Cours', 'Enseignant', 'Salle', 'Type'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dayEvents.map((row) => (
                  <tr key={row.title} className="hover:bg-bg">
                    <td className="px-4 py-3 text-muted">{schedule.hours[row.start]}</td>
                    <td className="px-4 py-3 font-medium">{row.title}</td>
                    <td className="px-4 py-3">{row.teacher}</td>
                    <td className="px-4 py-3">{row.room}</td>
                    <td className="px-4 py-3">
                      <Badge variant="info">{row.type}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Mes devoirs en retard ({lateHomework.length})</CardTitle>
            <ul className="space-y-3">
              {lateHomework.map((hw) => (
                <li key={hw.title} className="rounded-lg border border-red-100 bg-red-50 p-3">
                  <p className="text-sm font-medium text-text">{hw.title}</p>
                  <p className="text-xs text-muted">Échéance : {hw.due}</p>
                  <Badge variant="danger" className="mt-2">
                    En retard
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="text-center">
            <CardTitle className="mb-2 text-base">Prochain partiel dans</CardTitle>
            <p className="text-5xl font-bold text-primary">5</p>
            <p className="text-lg font-medium text-gray-700">jours</p>
            <p className="mt-3 text-sm text-muted">Examen Mathématiques — 18 mai 2024</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
