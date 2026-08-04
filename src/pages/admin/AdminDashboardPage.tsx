import { Users, GraduationCap, BookOpen, Calendar, UserCheck, ClipboardList } from 'lucide-react'
import { Card, CardTitle } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { useAdminDashboard } from '../../hooks'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

const iconMap = {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  UserCheck,
  ClipboardList,
} as const

export default function AdminDashboardPage() {
  const { data, loading, error } = useAdminDashboard()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger le dashboard admin" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader title="Tableau de bord admin" description="Vue d'ensemble de la plateforme" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.stats.map(({ label, value, icon, color }) => {
          const Icon = iconMap[icon]
          return (
            <Card key={label} className="!p-4">
              <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-text">{value}</p>
              <p className="text-sm text-muted">{label}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle className="mb-4 text-base">Inscriptions</CardTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.registration}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#1e3a8a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle className="mb-4 text-base">Répartition par département</CardTitle>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={data.departments} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={65}>
                {data.departments.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <CardTitle className="mb-4 text-base">Activité récente</CardTitle>
        <ul className="divide-y divide-border">
          {data.activities.map((a) => (
            <li key={a.text} className="flex items-center justify-between py-3 text-sm">
              <span>{a.text}</span>
              <span className="text-xs text-muted">{a.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
