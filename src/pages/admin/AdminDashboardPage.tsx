import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Étudiants', value: 2847, change: '+12%', icon: GraduationCap, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'Enseignants', value: 186, change: '+3%', icon: Users, color: 'text-[#0d9488]', bg: 'bg-[#f0fdfa]' },
    { label: 'UE actives', value: 124, change: '+8', icon: BookOpen, color: 'text-[#7c3aed]', bg: 'bg-[#ede9fe]' },
    { label: 'Taux présence', value: '87%', change: '-2%', icon: TrendingUp, color: 'text-[#059669]', bg: 'bg-[#d1fae5]' },
  ]

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Tableau de bord Admin</h1>
        <p className="text-sm text-[#6b7280] mt-1">Vue d'ensemble de la plateforme UniFlow</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
              <span className="text-xs font-semibold text-[#059669]">{change}</span>
            </div>
            <p className="text-3xl font-extrabold text-[#111827]">{value}</p>
            <p className="text-sm text-[#6b7280] mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <p className="text-center text-sm text-[#9ca3af] py-12">Tableau de bord admin en développement...</p>
      </div>
    </div>
  )
}
