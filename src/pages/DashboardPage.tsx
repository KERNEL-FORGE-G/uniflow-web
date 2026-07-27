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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const stats = [
  { label: 'Cours inscrits', value: '12', change: '+8%', up: true, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
  { label: 'Devoirs à rendre', value: '5', change: '↓1', up: false, icon: ClipboardList, color: 'text-orange-600 bg-orange-50' },
  { label: 'Prochain cours dans', value: '2h30', change: '+15m', up: true, icon: Clock, color: 'text-teal bg-teal/10' },
  { label: 'Moyenne', value: '14.6/20', change: '+0.6', up: true, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
  { label: 'Présences', value: '87%', change: '-5%', up: false, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
]

const activities = [
  { text: 'Mathématiques : Devoir 1 rendu', time: 'Il y a 2h' },
  { text: 'Économie : Quiz noté 15/20', time: 'Il y a 5h' },
  { text: 'Anglais : Nouveau cours disponible', time: 'Hier' },
  { text: 'Informatique : TP validé', time: 'Hier' },
  { text: 'Physique : Rappel examen', time: 'Il y a 2j' },
]

const gradeData = [
  { name: 'Excellentes', value: 35, color: '#1e3a8a' },
  { name: 'Bonnes', value: 30, color: '#0d9488' },
  { name: 'Moyennes', value: 25, color: '#f59e0b' },
  { name: 'Faibles', value: 10, color: '#ef4444' },
]

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-sm text-muted">Bienvenue, Emma — Lundi 13 mai 2024</p>
        </div>
        <Link to="/app/accueil-compact" className="text-sm font-medium text-primary hover:underline">
          Vue compacte →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ label, value, change, up, icon: Icon, color }) => (
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
            <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardTitle className="mb-4 text-base">Activité récente</CardTitle>
            <ul className="divide-y divide-border">
              {activities.map((a) => (
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
                <div className="h-full w-[72%] rounded-full bg-teal" />
              </div>
              <span className="text-sm font-semibold text-teal">72%</span>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Calendrier — Mai 2024</CardTitle>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => (
                <div key={d} className="py-1 font-medium text-muted">{d}</div>
              ))}
              {calendarDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`rounded py-1.5 ${day === 13 ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
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
                <Pie data={gradeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                  {gradeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              {gradeData.map((g) => (
                <div key={g.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: g.color }} />
                  {g.name}
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardTitle className="mb-2 text-base">Prochain événement</CardTitle>
            <p className="font-semibold text-gray-900">Examen Maths</p>
            <p className="text-sm text-muted">Demain · 09h00 · Salle A204</p>
            <Badge variant="warning" className="mt-3">Demain</Badge>
          </Card>
        </div>
      </div>
    </div>
  )
}
