import { useState } from 'react'
import { QrCode, Download, UserCheck, RefreshCw, AlertTriangle, Wifi, FileSpreadsheet, Check, Clock, X, HelpCircle } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useUserRole } from '../utils/userRole'
import { cn } from '../utils/cn'

const initialStudents = [
  { name: 'Emma Martin', id: 'ETU-0847', email: 'emma.martin@uniflow.edu', status: 'Présent' },
  { name: 'Sarah Kamga', id: 'ETU-0849', email: 'sarah.kamga@uniflow.edu', status: 'Présent' },
  { name: 'Yasmine Ngo', id: 'ETU-0850', email: 'yasmine.ngo@uniflow.edu', status: 'Absent' },
  { name: 'Thomas Mbarga', id: 'ETU-0851', email: 'thomas.mbarga@uniflow.edu', status: 'Présent' },
  { name: 'Lucas Dubois', id: 'ETU-0848', email: 'lucas.dubois@uniflow.edu', status: 'Late' },
]

const courses = [
  { code: 'INFO201', name: 'Structures de données', teacher: 'Dr. Kamga', time: '14h00 - 16h00', room: 'Amphi 250' },
  { code: 'INFO101', name: 'Algorithmique', teacher: 'Pr. Martin', time: '08h00 - 10h00', room: 'Salle A101' },
  { code: 'MATH201', name: 'Analyse numérique', teacher: 'Dr. Dupont', time: '10h15 - 12h15', room: 'Salle B204' },
]

export default function AttendanceManagePage() {
  const { isOfflineMode, language } = useUserRole()
  const [selectedCourseCode, setSelectedCourseCode] = useState('INFO201')
  const [studentsList, setStudentsList] = useState(initialStudents)
  const [showQRModal, setShowQRModal] = useState(false)
  const [pendingSyncCount, setPendingSyncCount] = useState(isOfflineMode ? 1 : 0)
  const [syncStatusMsg, setSyncStatusMsg] = useState('')
  const [estimatedData, setEstimatedData] = useState<number | null>(null)

  const selectedCourse = courses.find(c => c.code === selectedCourseCode) || courses[0]

  // Calculate totals
  const totalStudents = studentsList.length
  const presentsCount = studentsList.filter(s => s.status === 'Présent').length
  const absentsCount = studentsList.filter(s => s.status === 'Absent').length
  const latesCount = studentsList.filter(s => s.status === 'Late').length
  const excusedCount = studentsList.filter(s => s.status === 'Excusé').length
  const attendanceRate = Math.round((presentsCount / totalStudents) * 100)

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setStudentsList(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s))
    if (isOfflineMode) {
      setPendingSyncCount(prev => prev + 1)
    }
  }

  const handleSave = () => {
    if (isOfflineMode) {
      setSyncStatusMsg(language === 'FR'
        ? '⚠️ Mode Offline : Rapport enregistré localement dans l\'Outbox SQLite.'
        : '⚠️ Offline Mode: Report saved locally in SQLite Outbox queue.'
      )
      setPendingSyncCount(prev => prev + 1)
      setTimeout(() => setSyncStatusMsg(''), 5000)
    } else {
      // Calculate fake bandwidth usage
      const sizeInBytes = 250 + (studentsList.length * 60)
      const sizeInKB = parseFloat((sizeInBytes / 1024).toFixed(2))
      setEstimatedData(sizeInKB)
      setSyncStatusMsg(language === 'FR'
        ? `🟢 Rapport synchronisé avec succès aux serveurs centraux UniFlow !`
        : `🟢 Report successfully synchronized with UniFlow central servers!`
      )
      setPendingSyncCount(0)
      setTimeout(() => {
        setSyncStatusMsg('')
        setEstimatedData(null)
      }, 5000)
    }
  }

  const handleSyncManual = () => {
    const sizeInBytes = pendingSyncCount * 450
    const sizeInKB = parseFloat((sizeInBytes / 1024).toFixed(2))
    setEstimatedData(sizeInKB)
    setSyncStatusMsg(language === 'FR'
      ? `🔄 Synchronisation delta-sync terminée. Toutes les listes locales de présence sont à jour !`
      : `🔄 Delta-sync completed. All local attendance records are up to date!`
    )
    setPendingSyncCount(0)
    setTimeout(() => {
      setSyncStatusMsg('')
      setEstimatedData(null)
    }, 6000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal-800 mb-2">
            📢 {language === 'FR' ? 'ESPACE DÉLÉGUÉ' : 'DELEGATE WORKSPACE'}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'FR' ? 'Gestion des présences de la cohorte' : 'Cohort Attendance Tracking'}
          </h1>
          <p className="text-sm text-muted">
            {language === 'FR' ? 'Enregistrez les présences pour votre filière (L2 Info - Informatique)' : 'Record and manage attendance for L2 Info - Computer Science'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Quick PDF/Excel Export */}
          <Button variant="outline" className="flex items-center gap-1.5 text-xs">
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            {language === 'FR' ? 'Exporter Excel' : 'Export Excel'}
          </Button>

          <Button onClick={() => setShowQRModal(true)} className="flex items-center gap-1.5 text-xs bg-teal hover:bg-teal-light">
            <QrCode className="h-4 w-4" />
            {language === 'FR' ? 'Générer QR' : 'Generate QR'}
          </Button>
        </div>
      </div>

      {/* Offline vs Online Alert Banner */}
      {isOfflineMode ? (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 animate-bounce" />
          <div className="flex-1">
            <span className="font-bold">{language === 'FR' ? 'Réseau Local Universitaire Actif' : 'University Local LAN active'}</span>
            <p className="text-xs text-amber-700 mt-0.5">
              {language === 'FR'
                ? 'Aucune connexion Internet détectée. Mode Offline-First activé : les présences sont stockées en base SQLite locale et synchronisées en tâche de fond.'
                : 'No Internet connection. Offline-First active: Attendance records are stored in local SQLite database and will sync in the background.'}
            </p>
          </div>
          {pendingSyncCount > 0 && (
            <button
              onClick={handleSyncManual}
              className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              <RefreshCw className="h-3 w-3 animate-spin" />
              {language === 'FR' ? `Forcer Synchro (${pendingSyncCount})` : `Force Sync (${pendingSyncCount})`}
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm">
          <div className="flex items-center gap-3">
            <Wifi className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">{language === 'FR' ? 'Mode Connecté (Internet)' : 'Connected Mode (Internet)'}</span>
              <p className="text-xs text-emerald-700 mt-0.5">
                {language === 'FR'
                  ? 'Synchronisation delta-sync active. Vos rapports sont envoyés instantanément avec compression pour préserver vos données mobiles.'
                  : 'Delta-sync active. Your reports are sent immediately using compression to save your mobile data.'}
              </p>
            </div>
          </div>
          {pendingSyncCount > 0 && (
            <button
              onClick={handleSyncManual}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {language === 'FR' ? `Synchroniser (${pendingSyncCount} en attente)` : `Synchronize (${pendingSyncCount} pending)`}
            </button>
          )}
        </div>
      )}

      {/* Sync feedback Toast/Banner */}
      {syncStatusMsg && (
        <div className="bg-slate-900 text-white px-4 py-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg transition-all animate-fade-in text-sm">
          <p className="font-medium text-center sm:text-left">{syncStatusMsg}</p>
          {estimatedData !== null && (
            <span className="bg-teal text-white font-mono text-xs px-2.5 py-1 rounded-full font-semibold shrink-0">
              ⚡ {language === 'FR' ? 'Données mobiles estimées' : 'Estimated data used'} : ~{estimatedData} Ko
            </span>
          )}
        </div>
      )}

      {/* Select Course & Quick KPIs */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course selection */}
        <Card className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <CardTitle className="mb-4 text-base">
              {language === 'FR' ? '1. Sélection du cours' : '1. Select Course/UE'}
            </CardTitle>

            <div className="space-y-3">
              {courses.map((course) => (
                <button
                  key={course.code}
                  onClick={() => setSelectedCourseCode(course.code)}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border text-sm transition-all flex flex-col gap-1.5",
                    selectedCourseCode === course.code
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-white hover:bg-gray-50"
                  )}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-gray-900">{course.code}</span>
                    <Badge variant={selectedCourseCode === course.code ? 'primary' : 'neutral'}>
                      {course.room}
                    </Badge>
                  </div>
                  <p className="font-semibold text-gray-800 truncate">{course.name}</p>
                  <p className="text-xs text-muted flex justify-between">
                    <span>👤 {course.teacher}</span>
                    <span className="font-semibold text-primary">🕒 {course.time}</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4 text-xs text-muted space-y-1">
            <p className="flex justify-between">
              <span>{language === 'FR' ? 'Date de session' : 'Session Date'} :</span>
              <span className="font-semibold text-gray-800">Lundi 13 mai 2024</span>
            </p>
            <p className="flex justify-between">
              <span>{language === 'FR' ? 'Estimé consommation' : 'Estimated Data Overhead'} :</span>
              <span className="font-semibold text-gray-800 font-mono">~1.2 KB / sync</span>
            </p>
          </div>
        </Card>

        {/* Live Attendance KPIs */}
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          <Card className="flex flex-col justify-between bg-gradient-to-br from-teal-50 to-white border-teal-100">
            <div>
              <p className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                {language === 'FR' ? 'Taux de présence cohorte' : 'Cohort Attendance Rate'}
              </p>
              <h2 className="text-4xl font-extrabold text-teal mt-2">{attendanceRate}%</h2>
            </div>
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-teal/10">
                <div className="h-full rounded-full bg-teal transition-all duration-300" style={{ width: `${attendanceRate}%` }} />
              </div>
              <p className="text-xs text-muted mt-2">
                {language === 'FR'
                  ? `Satisferait à l'exigence de présence minimale de 75%`
                  : `Meets the minimum academic requirements of 75% attendance`}
              </p>
            </div>
          </Card>

          <Card className="flex flex-col justify-between bg-slate-50">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {language === 'FR' ? 'Répartition actuelle' : 'Current Status Breakdowns'}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white p-2.5 rounded-lg border border-border text-center">
                  <span className="block text-xl font-bold text-emerald-600">{presentsCount}</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Présents</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-border text-center">
                  <span className="block text-xl font-bold text-red-500">{absentsCount}</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Absents</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-border text-center">
                  <span className="block text-xl font-bold text-amber-500">{latesCount}</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Retards</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-border text-center">
                  <span className="block text-xl font-bold text-purple-600">{excusedCount}</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Excusés</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Student Attendance List */}
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
          <h3 className="font-bold text-gray-900 text-base">
            {language === 'FR'
              ? `2. Liste d'appel pour ${selectedCourse.code}`
              : `2. Call List for ${selectedCourse.code}`}
          </h3>
          <span className="text-xs font-semibold text-muted bg-white border border-border px-3 py-1.5 rounded-lg">
            Cohort: L2 Info · {totalStudents} {language === 'FR' ? 'Étudiants' : 'Students'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-gray-50 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5 text-left">Étudiant</th>
                <th className="px-6 py-3.5 text-left">Matricule</th>
                <th className="px-6 py-3.5 text-center">Présent</th>
                <th className="px-6 py-3.5 text-center">Absent</th>
                <th className="px-6 py-3.5 text-center">En retard</th>
                <th className="px-6 py-3.5 text-center">Excusé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {studentsList.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} size="sm" />
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-muted font-mono">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-700">{student.id}</td>

                  {/* Radio toggles */}
                  <td className="px-6 py-4 text-center">
                    <label className="inline-flex items-center justify-center cursor-pointer">
                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={student.status === 'Présent'}
                        onChange={() => handleStatusChange(student.id, 'Présent')}
                        className="sr-only"
                      />
                      <span className={cn(
                        "h-6.5 w-6.5 rounded-full border flex items-center justify-center transition-all",
                        student.status === 'Présent'
                          ? "bg-emerald-500 border-emerald-600 text-white shadow-sm"
                          : "border-border bg-white hover:bg-slate-50 text-slate-400"
                      )}>
                        <Check className="h-4 w-4 stroke-[3]" />
                      </span>
                    </label>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <label className="inline-flex items-center justify-center cursor-pointer">
                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={student.status === 'Absent'}
                        onChange={() => handleStatusChange(student.id, 'Absent')}
                        className="sr-only"
                      />
                      <span className={cn(
                        "h-6.5 w-6.5 rounded-full border flex items-center justify-center transition-all",
                        student.status === 'Absent'
                          ? "bg-red-500 border-red-600 text-white shadow-sm"
                          : "border-border bg-white hover:bg-slate-50 text-slate-400"
                      )}>
                        <X className="h-4 w-4 stroke-[3]" />
                      </span>
                    </label>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <label className="inline-flex items-center justify-center cursor-pointer">
                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={student.status === 'Late'}
                        onChange={() => handleStatusChange(student.id, 'Late')}
                        className="sr-only"
                      />
                      <span className={cn(
                        "h-6.5 w-6.5 rounded-full border flex items-center justify-center transition-all",
                        student.status === 'Late'
                          ? "bg-amber-500 border-amber-600 text-white shadow-sm"
                          : "border-border bg-white hover:bg-slate-50 text-slate-400"
                      )}>
                        <Clock className="h-4 w-4 stroke-[3]" />
                      </span>
                    </label>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <label className="inline-flex items-center justify-center cursor-pointer">
                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={student.status === 'Excusé'}
                        onChange={() => handleStatusChange(student.id, 'Excusé')}
                        className="sr-only"
                      />
                      <span className={cn(
                        "h-6.5 w-6.5 rounded-full border flex items-center justify-center text-xs font-bold transition-all",
                        student.status === 'Excusé'
                          ? "bg-purple-600 border-purple-700 text-white shadow-sm"
                          : "border-border bg-white hover:bg-slate-50 text-slate-400"
                      )}>
                        E
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-border bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <HelpCircle className="h-4 w-4" />
            <span>
              {language === 'FR'
                ? 'Les étudiants absents recevront automatiquement une notification push/SMS de rappel.'
                : 'Absent students will automatically receive a push notification/SMS reminder.'}
            </span>
          </div>

          <Button onClick={handleSave} className="w-full sm:w-auto bg-primary text-white font-bold px-6 shadow-sm flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            {language === 'FR' ? 'Valider et Sauvegarder' : 'Validate & Save Attendance'}
          </Button>
        </div>
      </Card>

      {/* QR Code Generating Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <Card className="w-full max-w-md text-center p-6 bg-white rounded-2xl relative shadow-2xl">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="inline-block bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              QR Code d'appel
            </span>
            <h3 className="text-xl font-bold text-gray-900">{selectedCourse.name}</h3>
            <p className="text-xs text-muted mt-1">{selectedCourse.code} · {selectedCourse.room} · {selectedCourse.teacher}</p>

            {/* Simulated interactive QR Code */}
            <div className="my-6 mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-gradient-to-tr from-slate-50 to-white shadow-inner p-4 relative">
              <QrCode className="h-40 w-40 text-primary" />
              <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                <span className="bg-primary text-white text-xs py-1 px-2.5 rounded-full font-bold shadow-md">Scannable</span>
              </div>
            </div>

            <p className="text-xs font-medium text-amber-600 animate-pulse bg-amber-50 rounded-lg p-2.5 border border-amber-100">
              🕒 {language === 'FR'
                ? 'Expire dans 04:59 (Le code change automatiquement pour empêcher la fraude)'
                : 'Expires in 04:59 (Rotates automatically to prevent proximity fraud)'}
            </p>

            <div className="mt-6 flex gap-2">
              <Button onClick={() => setShowQRModal(false)} variant="outline" className="flex-1">
                {language === 'FR' ? 'Fermer' : 'Close'}
              </Button>
              <Button className="flex-1 bg-primary text-white flex items-center justify-center gap-1">
                <Download className="h-4 w-4" />
                {language === 'FR' ? 'Télécharger' : 'Download'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
