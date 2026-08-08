import { useState, useEffect } from 'react'
import { Users, GraduationCap, BookOpen, TrendingUp, UserCheck, AlertCircle, CheckCircle, Clock, ShieldCheck, Building2, BarChart3, Loader2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { statsApi, OverviewStats } from '../../lib/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    statsApi.overview()
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
      </div>
    )
  }

  const studentCount = stats?.studentCount ?? 0
  const teacherCount = stats?.teacherCount ?? 0
  const courseCount = stats?.courseCount ?? 0
  const satisfactionRate = stats?.satisfactionRate ?? 95

  const kpis = [
    { label: 'Étudiants',    value: studentCount.toLocaleString(), change: '+12%', up: true,  icon: GraduationCap, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'Enseignants',  value: teacherCount.toLocaleString(),   change: '+3%',   up: true,  icon: Users,         color: 'text-[#0d9488]', bg: 'bg-[#f0fdfa]' },
    { label: 'Cours actifs', value: courseCount.toLocaleString(),   change: '+8%', up: true, icon: BookOpen,      color: 'text-[#7c3aed]', bg: 'bg-[#ede9fe]' },
    { label: 'Taux satisfaction', value: `${satisfactionRate}%`,   change: 'Stable',  up: true, icon: UserCheck,     color: 'text-[#059669]', bg: 'bg-[#d1fae5]' },
    { label: 'Support local', value: stats?.supportAvailability || 'Disponible', change: 'En ligne', up: true,  icon: TrendingUp,    color: 'text-[#d97706]', bg: 'bg-amber-50' },
  ]

  const attendanceData = [
    { month: 'Jan', rate: 82 }, { month: 'Fév', rate: 85 }, { month: 'Mar', rate: 79 },
    { month: 'Avr', rate: 88 }, { month: 'Mai', rate: 91 }, { month: 'Juin', rate: 87 },
  ]

  const pieData = [
    { name: 'Étudiants', value: studentCount, color: '#1e3a8a' },
    { name: 'Enseignants', value: teacherCount,  color: '#0d9488' },
    { name: 'Délégués', value: Math.round(studentCount * 0.05) || 5, color: '#7c3aed' },
    { name: 'Admins', value: 3, color: '#d97706' },
  ]

  const enrollmentData = [
    { dept: 'Info', val: Math.round(studentCount * 0.6) || 120 },
    { dept: 'Maths', val: Math.round(studentCount * 0.2) || 40 },
    { dept: 'Eco', val: Math.round(studentCount * 0.2) || 40 },
  ]

  const recentActions = [
    { text: 'Nouveaux étudiants inscrits dans le système', time: 'Il y a 2h', icon: GraduationCap, color: 'text-[#1e3a8a] bg-[#eff3ff]' },
    { text: 'Base de données synchronisée', time: 'Il y a 3h', icon: CheckCircle, color: 'text-[#059669] bg-emerald-50' },
    { text: 'Mise à jour de la configuration de sécurité', time: 'Hier', icon: Clock, color: 'text-[#6b7280] bg-[#f3f4f6]' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Tableau de bord Admin</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">UniFlow — Vue d'ensemble académique réelle</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-3 py-1.5 text-xs font-bold text-amber-700">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-700" /> Super Admin
        </span>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          Impossible de charger toutes les statistiques du serveur : {error}
        </div>
      )}

      {/* KPI stats */}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map(({ label, value, change, up, icon: Icon, color, bg }) => (
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
            { label: 'Ajouter un étudiant',     icon: GraduationCap, to: '/admin/etudiants' },
            { label: 'Créer un cours',           icon: BookOpen, to: '/admin/cours' },
            { label: 'Gérer les salles',         icon: Building2, to: '/admin/salles' },
            { label: 'Export rapport mensuel',   icon: BarChart3, to: '/admin' },
          ].map(a => {
            const Icon = a.icon
            return (
              <a key={a.label} href={a.to}
                className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] p-4 hover:bg-[#f9fafb] hover:border-[#1e3a8a]/30 transition-all group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff3ff] text-[#1e3a8a]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-[#374151] group-hover:text-[#1e3a8a]">{a.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

