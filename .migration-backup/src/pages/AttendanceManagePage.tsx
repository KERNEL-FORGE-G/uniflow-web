import { useState } from 'react'
import { QrCode, Download, UserCheck, RefreshCw, AlertTriangle, Wifi, FileSpreadsheet, Check, Clock, X, HelpCircle, Megaphone, User, CheckCircle2 } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useUserRole } from '../utils/userRole'
import { cn } from '../utils/cn'
import { mockRollStudents, type RollStatus } from '../data/mockData'

const courses = [
  { code: 'INFO101', name: 'Algorithmique',       teacher: 'Pr. Martin',   time: '08h00–10h00', room: 'Salle A204' },
  { code: 'INFO201', name: 'Bases de données',    teacher: 'Dr. Benkacem', time: '14h00–16h00', room: 'Salle B101' },
  { code: 'INFO301', name: 'Réseaux informatiques',teacher: 'Dr. Dubois',  time: '10h15–12h15', room: 'Labo C205' },
]

const announcements = [
  { id: 1, title: 'Réunion délégués', desc: 'Vendredi 17 mai à 13h — Salle C102.', time: 'il y a 1h', type: 'info' },
  { id: 2, title: 'Changement de salle INFO201', desc: 'Le cours de demain aura lieu en Amphi B au lieu de la salle B101.', time: 'il y a 3h', type: 'warning' },
]

export default function AttendanceManagePage() {
  const { isOfflineMode } = useUserRole()
  const [selectedCode, setSelectedCode] = useState('INFO101')
  const [students, setStudents] = useState(mockRollStudents)
  const [showQR, setShowQR] = useState(false)
  const [pending, setPending] = useState(isOfflineMode ? 2 : 0)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'appel'|'annonces'>('appel')

  const course = courses.find(c => c.code === selectedCode)!
  const present  = students.filter(s => s.status === 'Présent').length
  const absent   = students.filter(s => s.status === 'Absent').length
  const late     = students.filter(s => s.status === 'Late').length
  const excused  = students.filter(s => s.status === 'Excusé').length
  const rate     = Math.round((present / students.length) * 100)

  const setStatus = (id: string, status: RollStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s))
    if (isOfflineMode) setPending(p => p + 1)
  }

  const handleSave = () => {
    setSaved(true)
    if (!isOfflineMode) setPending(0)
    setTimeout(() => setSaved(false), 3500)
  }



  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f0fdfa] border border-[#ccfbf1] px-2.5 py-1 text-xs font-semibold text-[#0d9488] mb-2">
            <Megaphone className="h-3.5 w-3.5" /> ESPACE DÉLÉGUÉ
          </span>
          <h1 className="text-xl font-bold text-[#111827]">Gestion des présences — Cohorte L2 Info</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Lucas Dubois · Délégué · Lundi 13 mai 2024</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowQR(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a7167] transition-colors">
            <QrCode className="h-4 w-4" /> Générer QR
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Exporter
          </button>
        </div>
      </div>

      {/* Offline / Online banner */}
      {isOfflineMode ? (
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Réseau Local Universitaire Actif</p>
            <p className="text-xs mt-0.5">Mode Offline-First : les présences sont stockées en SQLite local et synchronisées au retour de connexion.</p>
          </div>
          {pending > 0 && (
            <button onClick={() => setPending(0)}
              className="flex items-center gap-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 px-3 py-1.5 text-xs font-bold text-amber-900 shrink-0">
              <RefreshCw className="h-3.5 w-3.5" /> Sync ({pending})
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800">
          <Wifi className="h-5 w-5 text-emerald-500 shrink-0" />
          <p className="text-sm font-medium">Mode Connecté — Synchronisation delta-sync active (~1.2 Ko/sync)</p>
        </div>
      )}

      {/* Saved toast */}
      {saved && (
        <div className="rounded-xl bg-slate-900 text-white px-4 py-3 text-sm font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {isOfflineMode ? 'Rapport enregistré localement (Outbox SQLite).' : 'Rapport synchronisé avec les serveurs UniFlow !'}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#e5e7eb]">
        {[{id:'appel',label:'Appel de présence'},{id:'annonces',label:'Annonces cohorte'}].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === t.id ? 'border-[#1e3a8a] text-[#1e3a8a]' : 'border-transparent text-[#6b7280] hover:text-[#374151]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'appel' && (
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Course selector */}
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#111827] mb-3">1. Sélection du cours</h2>
            <div className="space-y-2">
              {courses.map(c => (
                <button key={c.code} onClick={() => setSelectedCode(c.code)}
                  className={cn('w-full text-left rounded-xl border p-3.5 text-sm transition-all', selectedCode === c.code ? 'border-[#1e3a8a] bg-[#f0f4ff]' : 'border-[#e5e7eb] hover:bg-[#f9fafb]')}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#111827]">{c.code}</span>
                    <Badge variant="neutral">{c.room}</Badge>
                  </div>
                  <p className="font-medium text-[#374151] mt-0.5 truncate">{c.name}</p>
                  <div className="flex justify-between text-xs text-[#9ca3af] mt-1">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {c.teacher}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#1e3a8a]"><Clock className="h-3 w-3" /> {c.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* KPIs + table */}
          <div className="lg:col-span-2 space-y-4">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Présents',  val: present, color: 'text-[#059669]', bg: 'bg-[#d1fae5]' },
                { label: 'Absents',   val: absent,  color: 'text-[#dc2626]', bg: 'bg-[#fee2e2]' },
                { label: 'Retards',   val: late,    color: 'text-[#d97706]', bg: 'bg-[#fef3c7]' },
                { label: 'Excusés',   val: excused, color: 'text-[#7c3aed]', bg: 'bg-[#ede9fe]' },
              ].map(k => (
                <div key={k.label} className={`rounded-xl p-3 ${k.bg} border border-transparent`}>
                  <p className={`text-2xl font-extrabold ${k.color}`}>{k.val}</p>
                  <p className="text-xs font-medium text-[#374151] mt-0.5">{k.label}</p>
                </div>
              ))}
            </div>
            {/* Rate bar */}
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#111827]">Taux de présence</span>
                <span className="text-2xl font-extrabold text-[#0d9488]">{rate}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#f3f4f6] overflow-hidden">
                <div className="h-full rounded-full bg-[#0d9488] transition-all" style={{ width: `${rate}%` }} />
              </div>
              <p className="text-xs text-[#9ca3af] mt-1.5">Seuil requis : ≥75% · {students.length} étudiants</p>
            </div>

            {/* Roll call table */}
            <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-[#f3f4f6] bg-[#f9fafb] flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#111827]">2. Liste d'appel — {course.code}</h3>
                <span className="text-xs text-[#9ca3af]">L2 Info · {students.length} étudiants</span>
              </div>
              <table className="w-full text-sm">
                <thead className="border-b border-[#f3f4f6]">
                  <tr>
                    {['Étudiant','Matricule','Présent','Absent','Retard','Excusé'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f9fafb]">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-[#f9fafb]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={s.name} size="sm" />
                          <div>
                            <p className="font-semibold text-[#111827]">{s.name}</p>
                            <p className="text-xs text-[#9ca3af] font-mono">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#6b7280]">{s.id}</td>
                      {(['Présent','Absent','Late','Excusé'] as RollStatus[]).map(st => (
                        <td key={st} className="px-4 py-3 text-center">
                          <button onClick={() => setStatus(s.id, st)}
                            className={cn('flex h-7 w-7 items-center justify-center rounded-full border mx-auto transition-all',
                              s.status === st
                                ? st === 'Présent' ? 'bg-emerald-500 border-emerald-600 text-white'
                                  : st === 'Absent' ? 'bg-red-500 border-red-600 text-white'
                                  : st === 'Late' ? 'bg-amber-500 border-amber-600 text-white'
                                  : 'bg-purple-600 border-purple-700 text-white'
                                : 'border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] text-[#d1d5db]'
                            )}>
                            {st === 'Présent' ? <Check className="h-3.5 w-3.5 stroke-[3]" />
                              : st === 'Absent' ? <X className="h-3.5 w-3.5 stroke-[3]" />
                              : st === 'Late' ? <Clock className="h-3.5 w-3.5 stroke-[3]" />
                              : <span className="text-[10px] font-bold">E</span>}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-4 border-t border-[#f3f4f6] bg-[#f9fafb] flex items-center justify-between gap-4">
                <p className="text-xs text-[#9ca3af] flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" /> Les absents recevront une notification push/SMS.
                </p>
                <button onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
                  <UserCheck className="h-4 w-4" /> Valider et sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'annonces' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-[#111827]">Annonces de la cohorte L2 Info</h2>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8]">
              <Megaphone className="h-4 w-4" /> Nouvelle annonce
            </button>
          </div>
          {announcements.map(a => (
            <div key={a.id} className={`rounded-xl border p-4 ${a.type === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-[#e5e7eb] bg-white'} shadow-sm`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-semibold text-[#111827]">{a.title}</h3>
                <span className="text-xs text-[#9ca3af]">{a.time}</span>
              </div>
              <p className="text-sm text-[#374151]">{a.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[#111827]">QR Code d'appel</span>
              <button onClick={() => setShowQR(false)} className="rounded-lg p-1.5 hover:bg-[#f3f4f6] text-[#9ca3af]"><X className="h-5 w-5" /></button>
            </div>
            <p className="text-xs text-[#6b7280] mb-4">{course.code} · {course.room} · {course.teacher}</p>
            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb]">
              <QrCode className="h-44 w-44 text-[#1e3a8a]" />
            </div>
            <p className="mt-4 rounded-lg bg-[#fef3c7] border border-[#fde68a] px-3 py-2 text-xs font-semibold text-[#92400e] animate-pulse flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" /> Expire dans 04:59 — Rotation automatique anti-fraude
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => setShowQR(false)} className="rounded-lg border border-[#e5e7eb] py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">Fermer</button>
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
