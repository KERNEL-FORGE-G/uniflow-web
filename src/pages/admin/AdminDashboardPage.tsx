import { Users, GraduationCap, BookOpen, Calendar, UserCheck, ClipboardList } from 'lucide-react'
import { Card, CardTitle } from '../../components/ui/Card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const stats = [
  { label: 'Étudiants', value: '1 247', icon: Users, color: 'text-blue-600 bg-blue-50' },
  { label: 'Enseignants', value: '86', icon: GraduationCap, color: 'text-teal bg-teal/10' },
  { label: 'Cours actifs', value: '142', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
  { label: 'Sessions aujourd\'hui', value: '28', icon: Calendar, color: 'text-orange-600 bg-orange-50' },
  { label: 'Présence globale', value: '89%', icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Devoirs cette semaine', value: '156', icon: ClipboardList, color: 'text-indigo-600 bg-indigo-50' },
]

const registrationData = [
  { month: 'Jan', count: 850 },
  { month: 'Fév', count: 920 },
  { month: 'Mar', count: 980 },
  { month: 'Avr', count: 1050 },
  { month: 'Mai', count: 1150 },
  { month: 'Juin', count: 1247 },
]

const deptData = [
  { name: 'Informatique', value: 45, color: '#1e3a8a' },
  { name: 'Économie', value: 25, color: '#0d9488' },
  { name: 'Droit', value: 15, color: '#f59e0b' },
  { name: 'Autres', value: 15, color: '#8b5cf6' },
]

const activities = [
  { text: 'Nouveau cours créé — INFO301', time: 'Il y a 15 min' },
  { text: 'Utilisateur modifié — Emma Martin', time: 'Il y a 1h' },
  { text: 'Inscription validée — Lucas Dubois', time: 'Il y a 2h' },
  { text: 'Annonce publiée — Examens S2', time: 'Il y a 3h' },
  { text: 'Sauvegarde automatique effectuée', time: 'Il y a 6h' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="!p-4">
            <div className={`mb-2 inline-flex rounded-lg p-2 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle className="mb-4 text-base">Inscriptions par mois</CardTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={registrationData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#1e3a8a" strokeWidth={2} dot={{ fill: '#1e3a8a' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle className="mb-4 text-base">Répartition par département</CardTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {deptData.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle className="mb-4 text-base">Activité récente</CardTitle>
          <ul className="divide-y divide-border">
            {activities.map((a) => (
              <li key={a.text} className="flex justify-between py-3 text-sm">
                <span>{a.text}</span>
                <span className="text-muted">{a.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-orange-500 bg-orange-50">
            <p className="font-semibold text-orange-800">3 inscriptions en attente de validation</p>
            <p className="mt-1 text-sm text-orange-700">Action requise</p>
          </Card>
          <Card className="border-l-4 border-l-red-500 bg-red-50">
            <p className="font-semibold text-red-800">2 absences non justifiées signalées</p>
            <p className="mt-1 text-sm text-red-700">Priorité haute</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
