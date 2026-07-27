import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ClipboardList,
  Clock,
  TrendingUp,
  UserCheck,
  ChevronUp,
  ChevronDown,
  Users,
  MessageSquare,
  Wifi,
} from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useUserRole } from '../utils/userRole'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

export default function DashboardPage() {
  const { currentRole, language, isOfflineMode } = useUserRole()
  const navigate = useNavigate()

  // ----------------------------------------------------
  // STUDENT WORKSPACE DATA
  // ----------------------------------------------------
  const studentStats = [
    { labelFr: 'Cours inscrits', labelEn: 'Enrolled Courses', value: '12', change: '+8%', up: true, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { labelFr: 'Devoirs à rendre', labelEn: 'Assignments Due', value: '5', change: '↓1', up: false, icon: ClipboardList, color: 'text-orange-600 bg-orange-50' },
    { labelFr: 'Prochain cours', labelEn: 'Next Lecture', value: '2h30', change: '+15m', up: true, icon: Clock, color: 'text-teal bg-teal/10' },
    { labelFr: 'Moyenne générale', labelEn: 'GPA Average', value: '14.6/20', change: '+0.6', up: true, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
    { labelFr: 'Taux de présences', labelEn: 'Attendance Rate', value: '87%', change: '-5%', up: false, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
  ]

  const studentActivities = [
    { textFr: 'Mathématiques : Devoir 1 rendu', textEn: 'Mathematics: Assignment 1 submitted', timeFr: 'Il y a 2h', timeEn: '2h ago' },
    { textFr: 'Économie : Quiz noté 15/20', textEn: 'Economics: Graded Quiz 15/20', timeFr: 'Il y a 5h', timeEn: '5h ago' },
    { textFr: 'Anglais : Nouveau cours disponible', textEn: 'Technical English: New lesson available', timeFr: 'Hier', timeEn: 'Yesterday' },
    { textFr: 'Informatique : TP validé', textEn: 'Computer Science: Lab validated', timeFr: 'Hier', timeEn: 'Yesterday' },
  ]

  const gradeData = [
    { name: 'Excellentes', value: 35, color: '#1e3a8a' },
    { name: 'Bonnes', value: 30, color: '#0d9488' },
    { name: 'Moyennes', value: 25, color: '#f59e0b' },
    { name: 'Faibles', value: 10, color: '#ef4444' },
  ]

  // ----------------------------------------------------
  // DELEGATE WORKSPACE DATA
  // ----------------------------------------------------
  const delegateStats = [
    { labelFr: 'Taux présence cohorte', labelEn: 'Cohort Attendance Rate', value: '89%', change: '+3%', up: true, icon: UserCheck, color: 'text-teal bg-teal/10' },
    { labelFr: 'Rapports non synchronisés', labelEn: 'Offline Queued Reports', value: isOfflineMode ? '1' : '0', change: 'Offline', up: false, icon: Wifi, color: 'text-red-600 bg-red-50' },
    { labelFr: 'Justifications en attente', labelEn: 'Pending Excuses', value: '3', change: '↓2', up: true, icon: ClipboardList, color: 'text-orange-600 bg-orange-50' },
    { labelFr: 'Signalements d\'absence', labelEn: 'Absence alerts sent', value: '4', change: '+1', up: false, icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
    { labelFr: 'Étudiants cohorte L2', labelEn: 'L2 Class Cohort Size', value: '5', change: 'Stable', up: true, icon: Users, color: 'text-blue-600 bg-blue-50' },
  ]

  const delegateActivities = [
    { textFr: 'Appel validé : Structures de données', textEn: 'Roll Call submitted: Data Structures', timeFr: 'Il y a 1h', timeEn: '1h ago' },
    { textFr: 'Alerte SMS envoyée à Yasmine Ngo', textEn: 'SMS reminder dispatched to Yasmine Ngo', timeFr: 'Il y a 3h', timeEn: '3h ago' },
    { textFr: 'Appel local mDNS enregistré', textEn: 'Local campus network mDNS record logged', timeFr: 'Ce matin', timeEn: 'This morning' },
    { textFr: 'Rapport d\'assiduité exporté', textEn: 'Cohort attendance matrix spreadsheet exported', timeFr: 'Hier', timeEn: 'Yesterday' },
  ]

  // ----------------------------------------------------
  // TEACHER WORKSPACE DATA
  // ----------------------------------------------------
  const teacherStats = [
    { labelFr: 'Cours assignés', labelEn: 'Assigned Courses', value: '3', change: 'Stable', up: true, icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
    { labelFr: 'Total étudiants inscrits', labelEn: 'Total Enrolled Students', value: '145', change: '+12', up: true, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { labelFr: 'Taux d\'assiduité moyen', labelEn: 'Average Attendance', value: '89%', change: '+2%', up: true, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
    { labelFr: 'Ressources partagées', labelEn: 'Syllabus & Uploads', value: '12', change: '+3', up: true, icon: ClipboardList, color: 'text-teal bg-teal/10' },
    { labelFr: 'Moyenne générale classe', labelEn: 'Class Grade Average', value: '13.6/20', change: '+0.4', up: true, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
  ]

  const teacherActivities = [
    { textFr: 'Support de cours "Arbres & Graphes" partagé', textEn: 'Course file "Trees & Graphs" published', timeFr: 'À l\'instant', timeEn: 'Just now' },
    { textFr: 'Grille de notes figeables INFO201 validée', textEn: 'Locked scores sheet INFO201 approved', timeFr: 'Il y a 2h', timeEn: '2h ago' },
    { textFr: 'Rapport d\'assiduité examiné', textEn: 'Attendance summary checked', timeFr: 'Hier', timeEn: 'Yesterday' },
    { textFr: 'Cours en ligne initié via LiveKit local', textEn: 'Virtual lecture started using local LiveKit server', timeFr: 'Hier', timeEn: 'Yesterday' },
  ]

  // Pick active lists
  const activeStats = currentRole === 'teacher' ? teacherStats : currentRole === 'delegate' ? delegateStats : studentStats
  const activeActivities = currentRole === 'teacher' ? teacherActivities : currentRole === 'delegate' ? delegateActivities : studentActivities

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {language === 'FR' ? 'Tableau de bord' : 'Dashboard'}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === 'FR'
              ? `Ravi de vous revoir, ${currentRole === 'teacher' ? 'Pr. Kamga' : currentRole === 'delegate' ? 'Lucas' : 'Emma'} — Lundi 13 mai 2024`
              : `Welcome back, ${currentRole === 'teacher' ? 'Pr. Kamga' : currentRole === 'delegate' ? 'Lucas' : 'Emma'} — Monday 13 May 2024`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentRole === 'student' && (
            <Link to="/app/accueil-compact" className="inline-flex items-center text-xs font-bold text-primary hover:underline bg-primary/5 px-3 py-2 rounded-lg">
              {language === 'FR' ? 'Vue compacte →' : 'Compact View →'}
            </Link>
          )}

          <span className="text-xs bg-slate-100 border border-border px-3 py-2 rounded-lg font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
            🛡️ {language === 'FR' ? `Rôle: ${currentRole}` : `Workspace: ${currentRole}`}
          </span>
        </div>
      </div>

      {/* Synchronized vs Local banner alert */}
      {isOfflineMode && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping shrink-0" />
            <p className="font-semibold">
              {language === 'FR'
                ? 'Mode de simulation déconnecté (Hors-ligne). Les actions sauvegardées sont mises en attente locale.'
                : 'Offline simulation mode active. Any changes saved will be stored in your local queue.'}
            </p>
          </div>
          <span className="font-mono text-[10px] bg-red-100 text-red-800 font-bold px-2 py-1 rounded">
            LOCAL SQLite
          </span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {activeStats.map((stat, idx) => {
          const Icon = stat.icon
          const label = language === 'FR' ? stat.labelFr : stat.labelEn
          return (
            <Card key={idx} className="!p-4 bg-white border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center text-xs font-bold ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {stat.up ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-semibold text-muted mt-1 uppercase tracking-wider">{label}</p>
            </Card>
          )
        })}
      </div>

      {/* Main split grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (Activities & customized Workspace Tools) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent activities based on role */}
          <Card className="bg-white border border-border">
            <CardTitle className="mb-4 text-base font-bold text-gray-900">
              {language === 'FR' ? 'Activité récente' : 'Recent Activity Log'}
            </CardTitle>
            <ul className="divide-y divide-border">
              {activeActivities.map((a, idx) => (
                <li key={idx} className="flex items-center justify-between py-3.5 text-sm">
                  <span className="text-gray-700 font-medium">{language === 'FR' ? a.textFr : a.textEn}</span>
                  <span className="text-xs text-muted font-mono">{language === 'FR' ? a.timeFr : a.timeEn}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Dynamic Interactive Role Tool Widget */}
          {currentRole === 'student' && (
            <Card className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 flex flex-col sm:flex-row justify-between items-center p-6 rounded-xl gap-4">
              <div className="space-y-2 text-center sm:text-left">
                <Badge variant="success">Filière: Informatique</Badge>
                <h3 className="font-extrabold text-teal-900 text-lg">
                  {language === 'FR' ? 'Pointage rapide d\'assiduité par QR Code' : 'Scan Live QR Code to Register'}
                </h3>
                <p className="text-xs text-teal-800 max-w-md">
                  {language === 'FR'
                    ? 'Un cours est en cours d\'appel ? Flashez le QR Code affiché par votre délégué pour enregistrer votre présence.'
                    : 'Class is active? Scan the QR code projected by your class delegate to check-in.'}
                </p>
              </div>
              <Button onClick={() => navigate('/app/presences')} className="bg-teal text-white font-bold shrink-0 shadow-sm flex items-center gap-1">
                <UserCheck className="h-4 w-4" />
                {language === 'FR' ? 'Scanner / Pointer' : 'Scan / Check-in'}
              </Button>
            </Card>
          )}

          {currentRole === 'delegate' && (
            <Card className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white border-0 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-black tracking-wider uppercase">Délégué L2</span>
                <h3 className="font-extrabold text-white text-lg">
                  {language === 'FR' ? 'Faire l\'appel de présence' : 'Trigger Cohort Roll Call'}
                </h3>
                <p className="text-xs text-teal-100 max-w-md">
                  {language === 'FR'
                    ? 'Prenez les présences des étudiants pour le cours en cours. Fonctionne en réseau local autonome même sans électricité ni Internet.'
                    : 'Check-in your cohort peers. Guaranteed to function on local battery-powered LAN systems with offline outbox queuing.'}
                </p>
              </div>
              <Button onClick={() => navigate('/app/gestion-presences')} className="bg-white text-emerald-900 font-bold hover:bg-slate-50 shrink-0 shadow flex items-center gap-1.5">
                <UserCheck className="h-4 w-4" />
                {language === 'FR' ? 'Ouvrir l\'appel' : 'Open Roll Call'}
              </Button>
            </Card>
          )}

          {currentRole === 'teacher' && (
            <Card className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white border-0 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-black tracking-wider uppercase">Enseignant</span>
                <h3 className="font-extrabold text-white text-lg">
                  {language === 'FR' ? 'Espace de Saisie des Notes académiques' : 'Class Score Evaluation Entry'}
                </h3>
                <p className="text-xs text-indigo-100 max-w-md">
                  {language === 'FR'
                    ? 'Saisissez les notes de contrôle continu (CC) et d\'examen. Le système calcule automatiquement la moyenne pondérée.'
                    : 'Directly record and validate student assessment scores (CC 30%, Exam 70%). Final grade is computed instantly.'}
                </p>
              </div>
              <Button onClick={() => navigate('/app/mes-cours-enseignant')} className="bg-teal text-white font-bold hover:bg-teal-light shrink-0 shadow flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4" />
                {language === 'FR' ? 'Saisir les Notes' : 'Enter Grades'}
              </Button>
            </Card>
          )}

          {/* Global statistics block */}
          <Card className="bg-white border border-border">
            <CardTitle className="mb-3 text-base font-bold text-gray-900">
              {language === 'FR' ? 'Progression académique' : 'Course Completion Rates'}
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-gray-100 border border-border">
                <div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: '72%' }} />
              </div>
              <span className="text-sm font-bold text-teal">72%</span>
            </div>
            <p className="text-xs text-muted mt-2">
              {language === 'FR'
                ? 'Semestre 2 en cours. 14 chapitres validés sur 20 prévus.'
                : 'Semester 2 in progress. 14 chapters completed out of 20 planned.'}
            </p>
          </Card>
        </div>

        {/* Right Column (Calendars, charts, schedules) */}
        <div className="space-y-6">
          {/* Quick Calendar widget */}
          <Card className="bg-white border border-border shadow-sm">
            <CardTitle className="mb-4 text-base font-bold text-gray-900">
              {language === 'FR' ? 'Calendrier — Mai 2024' : 'Academic Calendar — May 2024'}
            </CardTitle>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => (
                <div key={d} className="py-1 font-bold text-muted uppercase text-[10px] tracking-wider">{d}</div>
              ))}
              {calendarDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`rounded py-1.5 font-semibold text-xs ${day === 13 ? 'bg-primary text-white font-bold shadow-sm' : 'hover:bg-slate-50 text-gray-700'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </Card>

          {/* Grades Distribution for Student / Attendance rate for others */}
          {currentRole === 'student' ? (
            <Card className="bg-white border border-border shadow-sm">
              <CardTitle className="mb-4 text-base font-bold text-gray-900">
                {language === 'FR' ? 'Répartition des notes' : 'Grades Distribution'}
              </CardTitle>
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
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                {gradeData.map((g) => (
                  <div key={g.name} className="flex items-center gap-1.5 bg-slate-50 border border-border p-1 rounded">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: g.color }} />
                    {g.name}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="bg-white border border-border shadow-sm">
              <CardTitle className="mb-4 text-base font-bold text-gray-900">
                {language === 'FR' ? 'Engagement Global de la Cohorte' : 'Cohort Performance Metrics'}
              </CardTitle>
              <div className="space-y-4">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>{language === 'FR' ? 'Assiduité' : 'Attendance Rate'}</span>
                    <span className="font-bold text-emerald-600">89%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '89%' }} />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>{language === 'FR' ? 'Rapports complétés' : 'Class Reports Completed'}</span>
                    <span className="font-bold text-indigo-600">95%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: '95%' }} />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>{language === 'FR' ? 'Notes validées' : 'Grades Submitted'}</span>
                    <span className="font-bold text-amber-600">80%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Next event block */}
          <Card className="border-l-4 border-l-primary bg-white shadow-sm">
            <CardTitle className="mb-2 text-base font-bold text-gray-900">
              {language === 'FR' ? 'Prochain événement' : 'Upcoming Academic Event'}
            </CardTitle>
            <p className="font-extrabold text-gray-900 text-sm">
              {language === 'FR' ? 'Examen structures de données' : 'Data Structures final evaluation'}
            </p>
            <p className="text-xs text-muted mt-1">
              {language === 'FR' ? 'Demain · 09h00 · Amphi 250' : 'Tomorrow · 09h00 · Amphi 250'}
            </p>
            <Badge variant="warning" className="mt-3">
              {language === 'FR' ? 'Demain' : 'Tomorrow'}
            </Badge>
          </Card>
        </div>
      </div>
    </div>
  )
}
