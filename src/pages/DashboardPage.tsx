import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, ClipboardList, Clock, TrendingUp, UserCheck, ChevronUp, ChevronDown, Calendar, Bell, GraduationCap, Megaphone } from 'lucide-react'

import { Badge } from '../components/ui/Badge'
import { useUserRole } from '../utils/userRole'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const calDays = ['L','M','M','J','V','S','D']
// May 2024 starts Wednesday (offset 2)
const calOffset = 2
const calTotal = 31

const gradeDistrib = [
  { name: 'Excellentes', value: 35, color: '#1e3a8a' },
  { name: 'Bonnes',      value: 30, color: '#0d9488' },
  { name: 'Moyennes',    value: 25, color: '#f59e0b' },
  { name: 'Faibles',     value: 10, color: '#ef4444' },
]

export default function DashboardPage() {
  const { currentRole, currentUser, language } = useUserRole()
  const navigate = useNavigate()
  const firstName = currentUser.name.split(' ')[0]

  const studentStats = [
    { label: 'Cours inscrits',    value: '12',      change: '+8%',  up: true,  icon: BookOpen,     bg: 'bg-[#eff3ff]', color: 'text-[#1e3a8a]' },
    { label: 'Devoirs à rendre',  value: '5',       change: '↓1',   up: false, icon: ClipboardList, bg: 'bg-[#fef3c7]', color: 'text-[#d97706]' },
    { label: 'Prochain cours',    value: '2h30',    change: '+15m', up: true,  icon: Clock,         bg: 'bg-[#f0fdfa]', color: 'text-[#0d9488]' },
    { label: 'Moyenne',           value: '14.6/20', change: '+0.6', up: true,  icon: TrendingUp,    bg: 'bg-[#ede9fe]', color: 'text-[#7c3aed]' },
    { label: 'Présences',         value: '87%',     change: '-5%',  up: false, icon: UserCheck,     bg: 'bg-[#d1fae5]', color: 'text-[#059669]' },
  ]
  const delegateStats = [
    { label: 'Taux présence',     value: '89%',  change: '+3%',  up: true,  icon: UserCheck,     bg: 'bg-[#f0fdfa]', color: 'text-[#0d9488]' },
    { label: 'En attente synchro',value: '2',    change: 'Offline',up:false, icon: ClipboardList, bg: 'bg-[#fee2e2]', color: 'text-[#dc2626]' },
    { label: 'Justif. en attente',value: '3',    change: '↓2',   up: true,  icon: Bell,          bg: 'bg-[#fef3c7]', color: 'text-[#d97706]' },
    { label: 'Cohorte L2 Info',   value: '52',   change: 'Stable',up: true, icon: BookOpen,      bg: 'bg-[#eff3ff]', color: 'text-[#1e3a8a]' },
    { label: 'Sessions validées', value: '18',   change: '+1',   up: true,  icon: Calendar,      bg: 'bg-[#d1fae5]', color: 'text-[#059669]' },
  ]
  const teacherStats = [
    { label: 'Cours assignés',    value: '4',       change: 'Stable',up: true, icon: BookOpen,     bg: 'bg-[#eff3ff]', color: 'text-[#1e3a8a]' },
    { label: 'Étudiants totaux',  value: '186',     change: '+12',   up: true, icon: UserCheck,    bg: 'bg-[#f0fdfa]', color: 'text-[#0d9488]' },
    { label: 'Devoirs à corriger',value: '23',      change: '+5',    up: false,icon: ClipboardList, bg: 'bg-[#fef3c7]', color: 'text-[#d97706]' },
    { label: 'Notes à saisir',    value: '2',       change: '↓1',    up: true, icon: TrendingUp,   bg: 'bg-[#ede9fe]', color: 'text-[#7c3aed]' },
    { label: 'Visioconfs semaine',value: '3',       change: '+1',    up: true, icon: Calendar,     bg: 'bg-[#d1fae5]', color: 'text-[#059669]' },
  ]

  const stats = currentRole === 'teacher' ? teacherStats : currentRole === 'delegate' ? delegateStats : studentStats

  const activities = currentRole === 'teacher' ? [
    { text: 'Support "Arbres & Graphes" publié',       time: 'À l\'instant' },
    { text: 'Grille de notes INFO201 validée',          time: 'Il y a 2h' },
    { text: 'Rapport d\'assiduité examiné',             time: 'Hier' },
    { text: 'Cours initié via LiveKit LAN',             time: 'Hier' },
  ] : currentRole === 'delegate' ? [
    { text: 'Appel validé : Structures de données',     time: 'Il y a 1h' },
    { text: 'SMS envoyé à Yasmine Ngo',                 time: 'Il y a 3h' },
    { text: 'Rapport d\'assiduité exporté',             time: 'Hier' },
    { text: 'QR Code généré pour INFO201',              time: 'Hier' },
  ] : [
    { text: 'Mathématiques : Devoir 1 rendu',           time: 'Il y a 2h' },
    { text: 'Économie : Quiz noté 15/20',               time: 'Il y a 5h' },
    { text: 'Anglais : Nouveau cours disponible',       time: 'Hier' },
    { text: 'Physique : Document ajouté',               time: 'Hier' },
  ]



  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">
            Bonjour, {firstName}
          </h1>
          <p className="text-sm text-[#6b7280] mt-0.5">
            {language === 'FR' ? 'Lundi 13 mai 2024' : 'Monday, May 13, 2024'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentRole === 'student' && (
            <Link to="/app/accueil-compact"
              className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
              Vue liste →
            </Link>
          )}
          {(() => {
            const RoleIcon = currentRole === 'teacher' ? UserCheck : currentRole === 'delegate' ? Megaphone : GraduationCap
            const roleLabel = currentRole === 'teacher' ? 'Enseignant' : currentRole === 'delegate' ? 'Délégué' : 'Étudiant'
            return (
              <span className="flex items-center gap-1.5 rounded-lg bg-[#f3f4f6] border border-[#e5e7eb] px-3 py-1.5 text-xs font-semibold text-[#374151] uppercase tracking-wide">
                <RoleIcon className="h-3.5 w-3.5 text-[#1e3a8a]" />
                {roleLabel}
              </span>
            )
          })()}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2 ${s.bg}`}>
                  <Icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? 'text-[#059669]' : 'text-[#dc2626]'}`}>
                  {s.up ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {s.change}
                </span>
              </div>
              <p className="mt-2.5 text-2xl font-extrabold text-[#111827] tracking-tight">{s.value}</p>
              <p className="text-xs text-[#6b7280] mt-0.5 font-medium">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left col */}
        <div className="space-y-5 lg:col-span-2">
          {/* Recent activity */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#111827] mb-1">Activité récente</h2>
            <div className="flex gap-4 border-b border-[#e5e7eb] mb-4 text-sm">
              {['Aujourd\'hui', 'Cette semaine', 'Ce mois'].map((t, i) => (
                <button key={t} className={`pb-2 text-xs font-medium border-b-2 transition-colors ${i === 0 ? 'border-[#1e3a8a] text-[#1e3a8a]' : 'border-transparent text-[#9ca3af] hover:text-[#374151]'}`}>{t}</button>
              ))}
            </div>
            <ul className="divide-y divide-[#f3f4f6]">
              {activities.map((a, i) => (
                <li key={i} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#1e3a8a] shrink-0" />
                    <span className="text-[#374151] font-medium">{a.text}</span>
                  </div>
                  <span className="text-xs text-[#9ca3af] font-mono shrink-0 ml-4">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Role-specific CTA */}
          {currentRole === 'student' && (
            <div className="rounded-xl border border-[#ccfbf1] bg-gradient-to-r from-[#f0fdfa] to-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <Badge variant="success" className="mb-2">Filière : Informatique</Badge>
                <h3 className="font-bold text-[#0a7167] text-base">Pointage rapide par QR Code</h3>
                <p className="text-xs text-[#374151] mt-1 max-w-sm">Un cours est en cours ? Scannez le QR Code de votre délégué pour enregistrer votre présence instantanément.</p>
              </div>
              <button onClick={() => navigate('/app/presences')}
                className="shrink-0 rounded-lg bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a7167] transition-colors shadow-sm flex items-center gap-2">
                <UserCheck className="h-4 w-4" /> Scanner / Pointer
              </button>
            </div>
          )}
          {currentRole === 'delegate' && (
            <div className="rounded-xl bg-[#1e3a8a] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Délégué L2 Info</span>
                <h3 className="font-bold text-white text-base mt-1">Faire l'appel de présence</h3>
                <p className="text-xs text-blue-200 mt-1 max-w-sm">Prenez les présences. Fonctionne en réseau local sans Internet ni électricité continue.</p>
              </div>
              <button onClick={() => navigate('/app/gestion-presences')}
                className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#1e3a8a] hover:bg-[#f0f4ff] transition-colors shadow-sm flex items-center gap-2">
                <UserCheck className="h-4 w-4" /> Ouvrir l'appel
              </button>
            </div>
          )}
          {currentRole === 'teacher' && (
            <div className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#1e3a8a] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Enseignant</span>
                <h3 className="font-bold text-white text-base mt-1">Espace de saisie des notes</h3>
                <p className="text-xs text-indigo-200 mt-1 max-w-sm">Saisissez les notes CC (30%) et examen (70%). Calcul automatique de la moyenne pondérée.</p>
              </div>
              <button onClick={() => navigate('/app/mes-cours-enseignant')}
                className="shrink-0 rounded-lg bg-[#0d9488] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a7167] transition-colors shadow-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Saisir les notes
              </button>
            </div>
          )}

          {/* Progress bar */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-[#111827]">Progression globale</h2>
              <span className="text-sm font-bold text-[#0d9488]">72%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#f3f4f6] overflow-hidden">
              <div className="h-full rounded-full bg-[#0d9488] transition-all duration-700" style={{ width: '72%' }} />
            </div>
            <p className="text-xs text-[#9ca3af] mt-2">↑ 3% ce mois · Semestre 2 en cours</p>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* Mini calendar */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#111827]">Mai 2024</h2>
              <div className="flex gap-1">
                <button className="rounded p-1 hover:bg-[#f3f4f6]"><ChevronDown className="h-3.5 w-3.5 rotate-90 text-[#6b7280]" /></button>
                <button className="rounded p-1 hover:bg-[#f3f4f6]"><ChevronUp className="h-3.5 w-3.5 rotate-90 text-[#6b7280]" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
              {calDays.map(d => <div key={d} className="py-1 font-bold text-[#9ca3af]">{d}</div>)}
              {Array.from({ length: calOffset }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: calTotal }, (_, i) => i + 1).map(day => (
                <button key={day}
                  className={`rounded py-1.5 text-xs font-medium transition-colors ${day === 13 ? 'bg-[#1e3a8a] text-white font-bold' : day === 16 || day === 18 ? 'bg-[#f0fdfa] text-[#0d9488] font-semibold' : 'hover:bg-[#f3f4f6] text-[#374151]'}`}>
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Grade distribution (student) or metrics */}
          {currentRole === 'student' ? (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-3">Répartition des notes</h2>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={gradeDistrib} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value" paddingAngle={2}>
                    {gradeDistrib.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {gradeDistrib.map(g => (
                  <div key={g.name} className="flex items-center gap-1.5 text-[10px] font-medium text-[#374151]">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: g.color }} />
                    {g.name} ({g.value}%)
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-4">Métriques cohorte</h2>
              <div className="space-y-3">
                {[
                  { label: 'Assiduité', value: 89, color: 'bg-[#10b981]' },
                  { label: 'Rapports complétés', value: 95, color: 'bg-[#1e3a8a]' },
                  { label: 'Notes validées', value: 80, color: 'bg-[#f59e0b]' },
                ].map(m => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#374151]">{m.label}</span>
                      <span className="font-bold text-[#111827]">{m.value}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#f3f4f6] overflow-hidden">
                      <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next event */}
          <div className="rounded-xl border-l-4 border-l-[#1e3a8a] border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h2 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Prochain événement</h2>
            <p className="font-bold text-[#111827] text-sm">Examen Maths</p>
            <p className="text-xs text-[#6b7280] mt-1">Demain · 09h00 · Salle A204</p>
            <Badge variant="warning" className="mt-3">Dans 1 jour</Badge>
            <button className="mt-3 w-full rounded-lg border border-[#e5e7eb] py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
              Voir le détail
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
