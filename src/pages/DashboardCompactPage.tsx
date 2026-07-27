import { Link } from 'react-router-dom'
import { Card, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

const schedule = [
  { time: '08h00 - 10h00', course: 'Algorithmique', teacher: 'Pr. Martin', room: 'A101', type: 'CM', status: 'Terminé' as const },
  { time: '10h15 - 12h15', course: 'Mathématiques', teacher: 'Dr. Dupont', room: 'B204', type: 'TD', status: 'Terminé' as const },
  { time: '14h00 - 16h00', course: 'Réseaux', teacher: 'Pr. Kamga', room: 'C302', type: 'TP', status: 'À venir' as const },
  { time: '16h15 - 18h00', course: 'Anglais', teacher: 'Mme. Johnson', room: 'D105', type: 'CM', status: 'À venir' as const },
]

const lateHomework = [
  { title: 'Mathématiques — Devoir 2', due: '10 mai 2024' },
  { title: 'Économie — Rapport final', due: '8 mai 2024' },
]

export default function DashboardCompactPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cours du jour</h1>
          <p className="text-sm text-muted">Lundi 13 mai 2024</p>
        </div>
        <Link to="/app" className="text-sm font-medium text-primary hover:underline">
          ← Vue principale
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-gray-50">
                <tr>
                  {['Heure', 'Cours', 'Enseignant', 'Salle', 'Type', 'Statut'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schedule.map((row) => (
                  <tr key={row.course} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-muted">{row.time}</td>
                    <td className="px-4 py-3 font-medium">{row.course}</td>
                    <td className="px-4 py-3">{row.teacher}</td>
                    <td className="px-4 py-3">{row.room}</td>
                    <td className="px-4 py-3"><Badge variant="info">{row.type}</Badge></td>
                    <td className="px-4 py-3">
                      <Badge variant={row.status === 'Terminé' ? 'success' : 'warning'}>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Mes devoirs en retard (2)</CardTitle>
            <ul className="space-y-3">
              {lateHomework.map((hw) => (
                <li key={hw.title} className="rounded-lg border border-red-100 bg-red-50 p-3">
                  <p className="text-sm font-medium text-gray-900">{hw.title}</p>
                  <p className="text-xs text-muted">Échéance : {hw.due}</p>
                  <Badge variant="danger" className="mt-2">En retard</Badge>
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
