import { Users, GraduationCap, BookOpen, TrendingUp, UserCheck, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const attendanceData = [
  { month: 'Jan', rate: 82 }, { month: 'Fév', rate: 85 }, { month: 'Mar', rate: 79 },
  { month: 'Avr', rate: 88 }, { month: 'Mai', rate: 91 }, { month: 'Juin', rate: 87 },
]
const enrollmentData = [
  { dept: 'Info', val: 520 }, { dept: 'Maths', val: 380 }, { dept: 'Éco', val: 640 },
  { dept: 'Droit', val: 430 }, { dept: 'Médecine', val: 290 }, { dept: 'GC', val: 315 },
]
const pieData = [
  { name: 'Étudiants', value: 2847, color: '#1e3a8a' },
  { name: 'Enseignants', value: 186,  color: '#0d9488' },
  { name: 'Délégués', value: 48,   color: '#7c3aed' },
  { name: 'Admins', value: 12,   color: '#d97706' },
]

const recentActions = [
  { text: '45 nouveaux étudiants inscrits — L1 Informatique', time: 'Il y a 2h', icon: GraduationCap, color: 'text-[#1e3a8a] bg-[#eff3ff]' },
  { text: 'Salle A204 réservée pour TP Réseaux', time: 'Il y a 3h', icon: CheckCircle, color: 'text-[#059669] bg-emerald-50' },
  { text: 'Alerte présences faibles — Économie S2', time: 'Il y a 5h', icon: AlertCircle, color: 'text-[#d97706] bg-amber-50' },
  { text: 'Export rapport mensuel généré', time: 'Hier', icon: Clock, color: 'text-[#6b7280] bg-[#f3f4f6]' },
]

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Étudiants',    value: '2 847', change: '+127 ce mois', up: true,  icon: GraduationCap, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'Enseignants',  value: '186',   change: '+3 ce mois',   up: true,  icon: Users,         color: 'text-[#0d9488]', bg: 'bg-[#f0fdfa]' },
    { label: 'UE actives',   value: '124',   change: '+8 ce semestre', up: true, icon: BookOpen,      color: 'text-[#7c3aed]', bg: 'bg-[#ede9fe]' },
    { label: 'Taux présence',value: '87%',   change: '-2% vs hier',  up: false, icon: UserCheck,     color: 'text-[#059669]', bg: 'bg-[#d1fae5]' },
    { label: 'Salles actives',value: '32',   change: 'Stable',       up: true,  icon: TrendingUp,    color: 'text-[#d97706]', bg: 'bg-amber-50' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Tableau de bord Admin</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">UniFlow — Vue d'ensemble · Lundi 13 mai 2026</p>
        </div>
        <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1.5 text-xs font-bold text-amber-700">
          ⚙️ Super Admin
        </span>
      </div>

      {/* KPI stats */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ label, value, change, up, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-4 w-4 ${color}`} /></div>
              <span className={`text-[10px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>{change}</span>
            </div>
            <p className="text-2xl font-extrabold text-[#111827]">{value}</p>
            <p className="text-xs text-[#6b7280] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Attendance trend */}
        <div className="lg:col-span-2 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4">Évolution du taux de présence (%)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceData}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: any) => [`${v}%`, 'Taux']} />
              <Line type="monotone" dataKey="rate" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, fill: '#1e3a8a' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User distribution pie */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4">Répartition des utilisateurs</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: any, name: any) => [v, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-[#374151]">{d.name}</span>
                </div>
                <span className="font-bold text-[#111827]">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment by dept + recent actions */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4">Étudiants par département</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={enrollmentData} barGap={4}>
              <XAxis dataKey="dept" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="val" name="Étudiants" fill="#1e3a8a" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4">Activité récente</h2>
          <ul className="divide-y divide-[#f3f4f6]">
            {recentActions.map((a, i) => {
              const Icon = a.icon
              return (
                <li key={i} className="flex items-start gap-3 py-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#374151] leading-snug">{a.text}</p>
                    <p className="text-xs text-[#9ca3af] mt-0.5">{a.time}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#111827] mb-4">Actions rapides</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Ajouter un étudiant',     icon: '🎓', to: '/admin/etudiants' },
            { label: 'Créer un cours',           icon: '📚', to: '/admin/cours' },
            { label: 'Gérer les salles',         icon: '🏫', to: '/admin/salles' },
            { label: 'Export rapport mensuel',   icon: '📊', to: '/admin' },
          ].map(a => (
            <a key={a.label} href={a.to}
              className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] p-4 hover:bg-[#f9fafb] hover:border-[#1e3a8a]/30 transition-all group">
              <span className="text-2xl">{a.icon}</span>
              <span className="text-sm font-medium text-[#374151] group-hover:text-[#1e3a8a]">{a.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
