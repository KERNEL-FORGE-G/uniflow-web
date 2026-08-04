import { Link } from 'react-router-dom'
import {
  BookOpen,
  ClipboardList,
  Clock,
  TrendingUp,
  UserCheck,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { useDashboard } from '../hooks'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const iconMap = {
  BookOpen,
  ClipboardList,
  Clock,
  TrendingUp,
  UserCheck,
} as const

export default function DashboardPage() {
  const { data, loading, error } = useDashboard()

  if (loading) return <p className="text-sm text-muted">Chargement du tableau de bord…</p>
  if (error || !data) return <EmptyState title="Impossible de charger le dashboard" description={error ?? undefined} />

  const calendarDays = Array.from({ length: data.calendarDays }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord"
        description={data.greeting}
        actions={
          <Link to="/app/accueil-compact" className="text-sm font-medium text-primary hover:underline">
            Vue compacte →
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.stats.map(({ label, value, change, up, icon, color }) => {
          const Icon = iconMap[icon]
          return (
            <Card key={label} className="!p-4">
              <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2 ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center text-xs font-medium ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {up ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-text">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardTitle className="mb-4 text-base">Activité récente</CardTitle>
            <ul className="divide-y divide-border">
              {data.activities.map((a) => (
                <li key={a.text} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-gray-700">{a.text}</span>
                  <span className="text-xs text-muted">{a.time}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardTitle className="mb-3 text-base">Progression globale</CardTitle>
            <div className="flex items-center gap-4">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-teal" style={{ width: `${data.progressPercent}%` }} />
              </div>
              <span className="text-sm font-semibold text-teal">{data.progressPercent}%</span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">{data.calendarLabel}</CardTitle>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => (
                <div key={d} className="py-1 font-medium text-muted">
                  {d}
                </div>
              ))}
              {calendarDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`rounded py-1.5 ${
                    day === data.highlightedDay
                      ? 'bg-primary font-semibold text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle className="mb-4 text-base">Répartition des notes</CardTitle>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={data.gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {data.gradeDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              {data.gradeDistribution.map((g) => (
                <div key={g.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: g.color }} />
                  {g.name}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardTitle className="mb-2 text-base">Prochain événement</CardTitle>
            <p className="font-semibold text-text">Examen Maths</p>
            <p className="text-sm text-muted">Demain · 09h00 · Salle A204</p>
            <Badge variant="warning" className="mt-3">
              Demain
            </Badge>
          </Card>
        </div>
      </div>
    </div>
  )
}
