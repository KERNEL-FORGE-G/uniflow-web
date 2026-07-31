import { useState } from 'react'
import { QrCode, Download, CheckCircle, XCircle, Clock, Calendar, TrendingUp, Smartphone } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

// Données mockées pour les présences de l'étudiant connecté par matière
const myAttendanceByCourse = [
  { 
    course: 'Algorithmique', 
    code: 'INFO101', 
    teacher: 'Dr. Martin',
    color: 'from-blue-600 to-indigo-600',
    present: 14, 
    absent: 2, 
    late: 1, 
    rate: 82,
    sessions: [
      { date: '15 janv.', status: 'present' },
      { date: '18 janv.', status: 'present' },
      { date: '22 janv.', status: 'absent' },
      { date: '25 janv.', status: 'late' },
      { date: '29 janv.', status: 'present' },
    ]
  },
  { 
    course: 'Base de Données', 
    code: 'INFO102', 
    teacher: 'Dr. Dubois',
    color: 'from-teal-600 to-emerald-600',
    present: 16, 
    absent: 0, 
    late: 1, 
    rate: 94,
    sessions: [
      { date: '16 janv.', status: 'present' },
      { date: '19 janv.', status: 'present' },
      { date: '23 janv.', status: 'present' },
      { date: '26 janv.', status: 'late' },
      { date: '30 janv.', status: 'present' },
    ]
  },
  { 
    course: 'Réseaux', 
    code: 'INFO103', 
    teacher: 'Pr. Lambert',
    color: 'from-purple-600 to-pink-600',
    present: 12, 
    absent: 1, 
    late: 2, 
    rate: 80,
    sessions: [
      { date: '17 janv.', status: 'present' },
      { date: '20 janv.', status: 'late' },
      { date: '24 janv.', status: 'absent' },
      { date: '27 janv.', status: 'late' },
      { date: '31 janv.', status: 'present' },
    ]
  },
  { 
    course: 'Intelligence Artificielle', 
    code: 'INFO104', 
    teacher: 'Dr. Chen',
    color: 'from-amber-600 to-orange-600',
    present: 13, 
    absent: 2, 
    late: 0, 
    rate: 87,
    sessions: [
      { date: '16 janv.', status: 'present' },
      { date: '19 janv.', status: 'absent' },
      { date: '23 janv.', status: 'present' },
      { date: '26 janv.', status: 'absent' },
      { date: '30 janv.', status: 'present' },
    ]
  },
]

const weeklyAttendance = [
  { week: 'S1', rate: 85 },
  { week: 'S2', rate: 88 },
  { week: 'S3', rate: 78 },
  { week: 'S4', rate: 92 },
  { week: 'S5', rate: 86 },
]

export default function AttendancePage() {
  const [showQR, setShowQR] = useState(false)

  // Calculer les stats globales de l'étudiant
  const totalPresent = myAttendanceByCourse.reduce((s, c) => s + c.present, 0)
  const totalAbsent = myAttendanceByCourse.reduce((s, c) => s + c.absent, 0)
  const totalLate = myAttendanceByCourse.reduce((s, c) => s + c.late, 0)
  const totalSessions = totalPresent + totalAbsent + totalLate
  const globalRate = Math.round((totalPresent / totalSessions) * 100)

  const getStatusIcon = (status: string) => {
    if (status === 'present') return <CheckCircle className="h-4 w-4 text-[#059669]" />
    if (status === 'absent') return <XCircle className="h-4 w-4 text-[#dc2626]" />
    return <Clock className="h-4 w-4 text-[#d97706]" />
  }

  const getStatusBadge = (status: string) => {
    if (status === 'present') return <Badge variant="success">Présent</Badge>
    if (status === 'absent') return <Badge variant="danger">Absent</Badge>
    return <Badge variant="warning">Retard</Badge>
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Mes présences</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Suivi personnel par matière · L2 Informatique</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowQR(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
            <QrCode className="h-4 w-4" /> Scanner QR
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
            <Download className="h-4 w-4" /> Exporter
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Donut rate */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ value: globalRate }, { value: 100 - globalRate }]}
                  cx="50%" cy="50%" innerRadius={22} outerRadius={30} dataKey="value" startAngle={90} endAngle={-270}>
                  <Cell fill="#0d9488" /><Cell fill="#f3f4f6" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#0d9488]">{globalRate}%</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#111827]">{globalRate}%</p>
            <p className="text-xs text-[#6b7280]">Mon taux global</p>
          </div>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p className="text-2xl font-extrabold text-[#059669]">{totalPresent}</p>
          <p className="text-xs text-[#6b7280] mt-0.5">Présences totales</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p className="text-2xl font-extrabold text-[#dc2626]">{totalAbsent}</p>
          <p className="text-xs text-[#6b7280] mt-0.5">Absences totales</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p className="text-2xl font-extrabold text-[#d97706]">{totalLate}</p>
          <p className="text-xs text-[#6b7280] mt-0.5">Retards totaux</p>
        </div>
      </div>

      {/* Présences par matière */}
      <div className="grid gap-4 sm:grid-cols-2">
        {myAttendanceByCourse.map(course => (
          <div key={course.code} className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${course.color} p-4 text-white`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 text-xs font-bold backdrop-blur-sm mb-1">
                    {course.code}
                  </span>
                  <h3 className="text-base font-bold">{course.course}</h3>
                  <p className="text-xs opacity-90 mt-0.5">{course.teacher}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold">{course.rate}%</div>
                  <p className="text-xs opacity-80">Assiduité</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-emerald-900">{course.present}</p>
                  <p className="text-xs text-emerald-600">Présent</p>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-2">
                  <XCircle className="h-5 w-5 text-red-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-red-900">{course.absent}</p>
                  <p className="text-xs text-red-600">Absent</p>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-2">
                  <Clock className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-amber-900">{course.late}</p>
                  <p className="text-xs text-amber-600">Retard</p>
                </div>
              </div>

              {/* Dernières sessions */}
              <div>
                <h4 className="text-xs font-bold text-[#6b7280] uppercase mb-2 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Dernières sessions
                </h4>
                <div className="space-y-1.5">
                  {course.sessions.map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors">
                      <span className="text-xs text-[#6b7280]">{session.date}</span>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(session.status)}
                        {getStatusBadge(session.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                Voir l'historique complet
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#1e3a8a]" />
            Mon évolution hebdomadaire
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAttendance} barGap={4}>
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip formatter={(v: any) => [`${v}%`, 'Taux']} />
              <Bar dataKey="rate" name="Mon taux de présence (%)" fill="#1e3a8a" radius={[4,4,0,0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-3">Scanner QR Code</h2>
          <button onClick={() => setShowQR(true)}
            className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] hover:border-[#1e3a8a] transition-colors cursor-pointer group">
            <QrCode className="h-28 w-28 text-[#1e3a8a] group-hover:scale-110 transition-transform" />
          </button>
          <p className="mt-4 text-xs text-center text-[#6b7280]">
            Scannez le QR code affiché par votre enseignant pour marquer votre présence
          </p>
          <button onClick={() => setShowQR(true)}
            className="mt-3 w-full rounded-lg bg-[#1e3a8a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2d4fa8]">
            Ouvrir le scanner
          </button>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[#111827]">Scanner QR Code</span>
              <button onClick={() => setShowQR(false)} className="rounded-lg p-1.5 hover:bg-[#f3f4f6] text-[#9ca3af]">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-[#6b7280] mb-4">Scannez le QR code affiché par votre enseignant</p>
            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-xl border-2 border-dashed border-[#1e3a8a] bg-[#eff3ff] animate-pulse">
              <QrCode className="h-44 w-44 text-[#1e3a8a]" />
            </div>
            <p className="mt-4 rounded-lg bg-[#eff3ff] border border-[#1e3a8a]/20 px-3 py-2 text-xs text-[#1e3a8a] flex items-center justify-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 shrink-0" /> Positionnez le QR code dans le cadre
            </p>
            <div className="mt-4">
              <button onClick={() => setShowQR(false)}
                className="w-full rounded-lg border border-[#e5e7eb] py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
