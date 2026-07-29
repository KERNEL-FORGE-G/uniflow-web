import { useState } from 'react'
import { QrCode, Download, UserCheck, Eye, Edit, Trash2, X } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { mockAttendanceStudents, mockAttendanceWeekly, type AttendanceStatus } from '../data/mockData'

const statusVariant: Record<AttendanceStatus, 'success'|'warning'|'danger'> = {
  Régulier: 'success', Attention: 'warning', Critique: 'danger',
}

export default function AttendancePage() {
  const [showQR, setShowQR] = useState(false)
  const [qrTimer, setQrTimer] = useState(532) // seconds
  const [activeUE, setActiveUE] = useState('Tous')

  const total = mockAttendanceStudents.length
  const globalRate = Math.round(mockAttendanceStudents.reduce((s, st) => s + st.rate, 0) / total)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Gestion des présences</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Suivi d'assiduité · L2 Informatique</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['UE', 'Groupe', 'Semaine'].map(f => (
            <select key={f} className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]">
              <option>{f} ▾</option>
            </select>
          ))}
          <button onClick={() => setShowQR(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
            <QrCode className="h-4 w-4" /> Générer QR
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
            <UserCheck className="h-4 w-4" /> Marquer présence
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
            <p className="text-xs text-[#6b7280]">Taux de présence global</p>
          </div>
        </div>
        {[
          { val: '156', label: 'Sessions au total',                  color: 'text-[#1e3a8a]' },
          { val: '12',  label: `Présents aujourd'hui (sur ${total})`, color: 'text-[#059669]' },
          { val: '12',  label: 'Absences à justifier (6.7%)',        color: 'text-[#d97706]' },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <p className={`text-2xl font-extrabold ${k.color}`}>{k.val}</p>
            <p className="text-xs text-[#6b7280] mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#f3f4f6] bg-[#f9fafb]">
              <tr>
                {['#','Étudiant','N° Étudiant','Présences','Absences','Retards','Taux (%)','Justifiées','Statut','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f9fafb]">
              {mockAttendanceStudents.map((s, i) => (
                <tr key={s.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-4 py-3 text-[#9ca3af]">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size="sm" />
                      <span className="font-medium text-[#111827]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#6b7280]">{s.studentId}</td>
                  <td className="px-4 py-3 font-semibold text-[#059669]">{s.present}</td>
                  <td className="px-4 py-3 font-semibold text-[#dc2626]">{s.absent}</td>
                  <td className="px-4 py-3 text-[#d97706]">{s.late}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#f3f4f6] overflow-hidden">
                        <div className="h-full rounded-full bg-[#0d9488]" style={{ width: `${s.rate}%` }} />
                      </div>
                      <span className="font-semibold text-[#374151]">{s.rate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{s.justified}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[s.status]}>{s.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="rounded p-1 hover:bg-[#f3f4f6] text-[#9ca3af] hover:text-[#374151]"><Eye className="h-4 w-4" /></button>
                      <button className="rounded p-1 hover:bg-[#f3f4f6] text-[#9ca3af] hover:text-[#374151]"><Edit className="h-4 w-4" /></button>
                      <button className="rounded p-1 hover:bg-red-50 text-[#9ca3af] hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#111827] mb-4">Évolution des présences par semaine</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAttendanceWeekly} barGap={4}>
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip formatter={(v: any) => [`${v}%`, '']} />
              <Bar dataKey="present" name="Taux de présence (%)" fill="#1e3a8a" radius={[4,4,0,0]} maxBarSize={28} />
              <Bar dataKey="group"   name="Taux de présence (groupe %)" fill="#0d9488" radius={[4,4,0,0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm text-center">
          <h2 className="text-sm font-bold text-[#111827] mb-3">QR Code session active</h2>
          <button onClick={() => setShowQR(true)}
            className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] hover:border-[#1e3a8a] transition-colors cursor-pointer">
            <QrCode className="h-28 w-28 text-[#1e3a8a]" />
          </button>
          <p className="mt-4 text-sm font-semibold text-[#d97706]">
            Expire dans {Math.floor(qrTimer / 60)}:{String(qrTimer % 60).padStart(2,'0')}
          </p>
          <button onClick={() => setShowQR(true)}
            className="mt-3 rounded-lg bg-[#1e3a8a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2d4fa8]">
            Afficher plein écran
          </button>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[#111827]">QR Code d'appel</span>
              <button onClick={() => setShowQR(false)} className="rounded-lg p-1.5 hover:bg-[#f3f4f6] text-[#9ca3af]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-[#6b7280] mb-4">INFO101 · Salle A204 · Pr. Martin</p>
            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb]">
              <QrCode className="h-44 w-44 text-[#1e3a8a]" />
            </div>
            <p className="mt-4 rounded-lg bg-[#fef3c7] border border-[#fde68a] px-3 py-2 text-xs font-semibold text-[#92400e] animate-pulse">
              🕒 Expire dans {Math.floor(qrTimer / 60)}:{String(qrTimer % 60).padStart(2,'0')} — Rotation automatique anti-fraude
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => setShowQR(false)}
                className="rounded-lg border border-[#e5e7eb] py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
                Fermer
              </button>
              <button className="rounded-lg bg-[#1e3a8a] py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] flex items-center justify-center gap-1.5">
                <Download className="h-4 w-4" /> Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
