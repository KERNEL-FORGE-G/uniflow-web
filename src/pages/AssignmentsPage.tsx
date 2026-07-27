import { Plus } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const summary = [
  { label: 'À rendre', value: 5, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'En retard', value: 2, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Soumis', value: 12, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Notés', value: 8, color: 'text-blue-600', bg: 'bg-blue-50' },
]

const assignments = [
  { title: 'TP Algorithmique — Recherche dichotomique', code: 'INFO201', due: '20 mai 2024', progress: 65, status: 'À rendre', statusVariant: 'warning' as const, action: 'Continuer' },
  { title: 'Rapport Microéconomie', code: 'ECO101', due: '8 mai 2024', progress: 100, status: 'En retard', statusVariant: 'danger' as const, action: 'Continuer' },
  { title: 'Quiz Structures de données', code: 'INFO201', due: '15 mai 2024', progress: 100, status: 'Soumis', statusVariant: 'success' as const, action: 'Voir' },
  { title: 'Exercices Analyse numérique', code: 'MATH201', due: '10 mai 2024', progress: 100, status: 'Noté 16/20', statusVariant: 'info' as const, action: 'Voir' },
  { title: 'Projet Réseaux — Configuration', code: 'INFO301', due: '25 mai 2024', progress: 30, status: 'À rendre', statusVariant: 'warning' as const, action: 'Continuer' },
]

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Mes devoirs</h1>
        <Button><Plus className="h-4 w-4" /> Nouveau devoir</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {['Statut', 'UE', 'Date'].map((f) => (
          <select key={f} className="rounded-lg border border-border bg-white px-4 py-2 text-sm">
            <option>{f}</option>
          </select>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map(({ label, value, color, bg }) => (
          <Card key={label} className={`${bg} !border-0`}>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {assignments.map((a) => (
          <Card key={a.title} className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                <Badge variant="primary">{a.code}</Badge>
                <Badge variant={a.statusVariant}>{a.status}</Badge>
              </div>
              <h3 className="mt-2 font-semibold text-gray-900">{a.title}</h3>
              <p className="text-sm text-muted">Échéance : {a.due}</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-gray-200">
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
