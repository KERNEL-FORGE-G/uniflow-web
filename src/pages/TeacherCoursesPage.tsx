import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Users, Download, UploadCloud, Trash2, Edit3, Save, Video, Check } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useUserRole } from '../utils/userRole'

const initialCourses = [
  { code: 'INFO201', title: 'Structures de données', students: 45, hours: '30h CM + 15h TD', progress: 78, color: 'from-blue-600 to-indigo-800' },
  { code: 'INFO101', title: 'Algorithmique & Graphes', students: 120, hours: '40h CM + 20h TD', progress: 90, color: 'from-teal to-teal-dark' },
  { code: 'INFO301', title: 'Réseaux informatiques', students: 38, hours: '25h CM + 15h TP', progress: 60, color: 'from-purple-600 to-purple-800' },
]

const initialStudents = [
  { name: 'Emma Martin', id: 'ETU-0847', cc: 14, exam: 13, val: true },
  { name: 'Sarah Kamga', id: 'ETU-0849', cc: 16, exam: 15, val: true },
  { name: 'Yasmine Ngo', id: 'ETU-0850', cc: 10, exam: 8, val: false },
  { name: 'Thomas Mbarga', id: 'ETU-0851', cc: 12, exam: 11, val: true },
  { name: 'Lucas Dubois', id: 'ETU-0848', cc: 11, exam: 10, val: true },
]

const initialResources = [
  { id: 1, name: 'Syllabus_INFO201_v2.pdf', type: 'Syllabus', size: '2.4 Mo', date: '10 Avril 2024' },
  { id: 2, name: 'TP1_Structures_Lineaires.pdf', type: 'TP', size: '1.2 Mo', date: '25 Avril 2024' },
  { id: 3, name: 'Support_Cours_Arbres_Graphes.pdf', type: 'Cours', size: '4.8 Mo', date: 'Aujourd\'hui' },
]

export default function TeacherCoursesPage() {
  const { language } = useUserRole()
  const navigate = useNavigate()
  const [selectedCourseCode, setSelectedCourseCode] = useState('INFO201')
  const [studentsList, setStudentsList] = useState(initialStudents)
  const [resources, setResources] = useState(initialResources)
  const [newResourceName, setNewResourceName] = useState('')
  const [newResourceType, setNewResourceType] = useState('Cours')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // WebRTC LiveKit local config states
  const [isLanMode, setIsLanMode] = useState(true)
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)

  // Grade weights
  const ccWeight = 0.3
  const examWeight = 0.7

  const selectedCourse = initialCourses.find(c => c.code === selectedCourseCode) || initialCourses[0]

  const handleGradeChange = (studentId: string, type: 'cc' | 'exam', value: number) => {
    // clamp between 0 and 20
    const clamped = Math.max(0, Math.min(20, value))
    setStudentsList(prev => prev.map(s => s.id === studentId ? { ...s, [type]: clamped } : s))
  }

  const handleToggleValidation = (studentId: string) => {
    setStudentsList(prev => prev.map(s => s.id === studentId ? { ...s, val: !s.val } : s))
  }

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResourceName.trim()) return

    setIsUploading(true)
    setUploadProgress(10)

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setResources(r => [
              {
                id: Date.now(),
                name: newResourceName.endsWith('.pdf') ? newResourceName : `${newResourceName}.pdf`,
                type: newResourceType,
                size: '1.8 Mo',
                date: language === 'FR' ? 'À l\'instant' : 'Just now'
              },
              ...r
            ])
            setNewResourceName('')
            setIsUploading(false)
            setUploadProgress(0)
          }, 500)
          return 100
        }
        return prev + 30
      })
    }, 200)
  }

  const handleDeleteResource = (id: number) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  // Calculate stats
  const totalEnrolled = studentsList.length
  const averageFinal = parseFloat((studentsList.reduce((acc, curr) => acc + (curr.cc * ccWeight + curr.exam * examWeight), 0) / totalEnrolled).toFixed(2))
  const validatedCount = studentsList.filter(s => (s.cc * ccWeight + s.exam * examWeight) >= 10).length
  const validationRate = Math.round((validatedCount / totalEnrolled) * 100)

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 mb-2">
            👨‍🏫 {language === 'FR' ? 'ESPACE ENSEIGNANT' : 'TEACHER PEDA PORTAL'}
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'FR' ? 'Espace Pédagogique & Évaluations' : 'Pedagogical Space & Student Grades'}
          </h1>
          <p className="text-sm text-muted">
            {language === 'FR'
              ? 'Gérez vos syllabus, documents pédagogiques et saisissez les notes de contrôle continu (30%) et d\'examen (70%)'
              : 'Upload reference materials and enter CC (30%) and Exam (70%) student scores.'}
          </p>
        </div>

        <div className="flex gap-2">
          {initialCourses.map(c => (
            <button
              key={c.code}
              onClick={() => setSelectedCourseCode(c.code)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                selectedCourseCode === c.code
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-white text-gray-700 border-border hover:bg-gray-50'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course Info Card & Videoconference Initiator */}
        <div className="lg:col-span-1 space-y-6">
          {/* Active Course Card */}
          <Card className="overflow-hidden p-0 bg-white border border-border shadow-sm">
            <div className={`h-28 bg-gradient-to-r ${selectedCourse.color} p-4 flex flex-col justify-between text-white`}>
              <Badge className="self-start bg-white/20 border-0 text-white font-bold">{selectedCourse.code}</Badge>
              <div>
                <h3 className="font-bold text-lg">{selectedCourse.title}</h3>
                <p className="text-xs text-white/80">{selectedCourse.hours}</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-xs text-muted">
                <span>{language === 'FR' ? 'Progression du programme' : 'Syllabus Progress'}</span>
                <span className="font-semibold text-gray-800">{selectedCourse.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${selectedCourse.progress}%` }} />
              </div>

              <div className="pt-2 border-t border-border flex justify-between items-center text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {selectedCourse.students} {language === 'FR' ? 'étudiants inscrits' : 'enrolled students'}
                </span>
                <span className="font-bold text-indigo-600">{language === 'FR' ? 'L2 Info' : 'L2 CS'}</span>
              </div>
            </div>
          </Card>

          {/* WebRTC Video class initiator block */}
          <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-0 shadow-md">
            <CardTitle className="text-white text-base mb-2 flex items-center gap-2">
              <Video className="h-5 w-5 text-teal" />
              {language === 'FR' ? 'Planifier / Démarrer Visioconf' : 'Initiate Live Videoconference'}
            </CardTitle>
            <p className="text-xs text-indigo-200 mb-4">
              {language === 'FR'
                ? 'Hébergez un cours virtuel en temps réel. Parfaitement adapté pour l\'enseignement à distance ou hybride.'
                : 'Host a live virtual classroom. Built for local offline networks or global remote lecture halls.'}
            </p>

            <div className="space-y-3.5 bg-white/10 p-3 rounded-lg border border-white/10 text-xs">
              {/* Server mode switcher */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold block text-white">{language === 'FR' ? 'Mode Serveur' : 'Server Mode'}</span>
                  <span className="text-[10px] text-indigo-200">
                    {isLanMode
                      ? (language === 'FR' ? 'Réseau local (LAN Campus) — Pas d\'Internet' : 'Campus LAN — Zero Internet cost')
                      : (language === 'FR' ? 'Internet global (VPS/Cloud)' : 'Global Internet Cloud')}
                  </span>
                </div>
                <button
                  onClick={() => setIsLanMode(!isLanMode)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all ${
                    isLanMode ? 'bg-teal text-white' : 'bg-white/20 text-indigo-100'
                  }`}
                >
                  {isLanMode ? 'LAN' : 'CLOUD'}
                </button>
              </div>

              {/* Bandwidth Optimization Toggle */}
              <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                <div>
                  <span className="font-bold block text-white">{language === 'FR' ? 'Option Bas-Débit (3G)' : 'Low Bandwidth Mode (3G)'}</span>
                  <span className="text-[10px] text-indigo-200">
                    {isLowBandwidth
                      ? (language === 'FR' ? 'Audio uniquement (8 Ko/s)' : 'Audio-only limits (8 KB/s)')
                      : (language === 'FR' ? 'Qualité Standard' : 'Standard quality active')}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isLowBandwidth}
                  onChange={(e) => setIsLowBandwidth(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-teal focus:ring-teal h-4 w-4"
                />
              </div>
            </div>

            <Button
              onClick={() => navigate('/app/visioconference')}
              className="mt-4 w-full bg-teal text-white hover:bg-teal-light font-bold flex items-center justify-center gap-1.5"
            >
              <Video className="h-4 w-4" />
              {language === 'FR' ? 'Lancer la visioconférence' : 'Start Live Lecture'}
            </Button>
          </Card>
        </div>

        {/* Resources Uploader Form & Resources Explorer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upload form card */}
            <Card className="bg-white border border-border shadow-sm">
              <CardTitle className="mb-3 text-base flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-indigo-600" />
                {language === 'FR' ? 'Ajouter une ressource' : 'Upload Syllabus / File'}
              </CardTitle>

              <form onSubmit={handleAddResource} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {language === 'FR' ? 'Nom du document (Ex: TD2_Arbres)' : 'Resource Title (e.g. TD2_Trees)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newResourceName}
                    onChange={(e) => setNewResourceName(e.target.value)}
                    placeholder="Saisissez le titre..."
                    className="w-full text-xs font-medium rounded-lg border border-border bg-white py-2 px-3 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      {language === 'FR' ? 'Type' : 'Category'}
                    </label>
                    <select
                      value={newResourceType}
                      onChange={(e) => setNewResourceType(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-border bg-white py-2 px-2.5 outline-none focus:border-indigo-600"
                    >
                      <option value="Cours">{language === 'FR' ? '📖 Cours' : '📖 Course file'}</option>
                      <option value="TP">🧪 TP</option>
                      <option value="TD">📝 TD</option>
                      <option value="Syllabus">📌 Syllabus</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1 h-[34px]"
                    >
                      <Plus className="h-4 w-4" />
                      {language === 'FR' ? 'Publier' : 'Publish'}
                    </Button>
                  </div>
                </div>

                {isUploading && (
                  <div className="bg-slate-50 border border-border rounded-lg p-3 text-xs space-y-1.5 animate-pulse">
                    <div className="flex justify-between font-bold text-gray-700">
                      <span>{language === 'FR' ? 'Téléversement crypté delta...' : 'Encrypting delta upload...'}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <span className="block text-[10px] text-muted">
                      {language === 'FR' ? 'Optimisé pour le réseau local' : 'LAN-optimized connection'}
                    </span>
                  </div>
                )}
              </form>
            </Card>

            {/* Quick KPIs of scores */}
            <Card className="bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <CardTitle className="mb-2 text-base">
                  {language === 'FR' ? 'Statistiques des Notes' : 'Grading Summary'}
                </CardTitle>
                <p className="text-xs text-muted mb-4">
                  {language === 'FR' ? 'Calculs basés sur CC (30%) + Examen (70%)' : 'Averages calculated using CC (30%) + Exam (70%) weights'}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-border text-xs">
                    <span className="text-muted font-medium">{language === 'FR' ? 'Moyenne générale' : 'Class average'} :</span>
                    <span className="font-bold text-indigo-600 text-sm font-mono">{averageFinal}/20</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-border text-xs">
                    <span className="text-muted font-medium">{language === 'FR' ? 'Taux de réussite (>=10)' : 'Pass rate (>=10)'} :</span>
                    <span className="font-bold text-emerald-600 text-sm">{validationRate}%</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-muted leading-relaxed mt-4 bg-white/50 border border-border p-2 rounded-lg">
                📋 {language === 'FR'
                  ? 'Conformément aux règles du secrétariat académique camerounais, les notes figeables donnent lieu à l\'acquisition automatique de crédits.'
                  : 'Subject to validation rules of the Cameroon central Ministry of Higher Education.'}
              </div>
            </Card>
          </div>

          {/* Resources Explorer */}
          <Card className="bg-white border border-border shadow-sm">
            <CardTitle className="mb-3 text-base flex justify-between items-center">
              <span>📚 {language === 'FR' ? 'Supports & Ressources pédagogiques' : 'Syllabus & Documents'}</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                {resources.length} {language === 'FR' ? 'fichiers' : 'files'}
              </span>
            </CardTitle>

            <div className="divide-y divide-border">
              {resources.map((file) => (
                <div key={file.id} className="flex items-center justify-between py-3.5 text-xs first:pt-0 last:pb-0">
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 shrink-0 rounded bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                      PDF
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{file.name}</p>
                      <p className="text-[10px] text-muted flex items-center gap-2 mt-0.5">
                        <Badge variant="primary" className="py-0 px-1.5 text-[9px]">{file.type}</Badge>
                        <span>{file.size}</span>
                        <span>·</span>
                        <span>{file.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900" title="Télécharger">
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteResource(file.id)}
                      className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Grade entry interactive grid */}
      <Card className="p-0 overflow-hidden shadow-sm bg-white border border-border">
        <div className="p-5 border-b border-border bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              {language === 'FR'
                ? `3. Grille d'évaluation pour ${selectedCourse.code}`
                : `3. Evaluation sheet for ${selectedCourse.code}`}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {language === 'FR'
                ? 'Saisissez directement les notes des étudiants (CC coefficient 0.3 · Examen coefficient 0.7)'
                : 'Input grades dynamically (CC coeff 0.3 · Exam coeff 0.7)'}
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-1.5 text-xs bg-white">
            <Download className="h-4 w-4" />
            {language === 'FR' ? 'Exporter rapport notes' : 'Export Grade Sheet'}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-gray-50 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5 text-left">Étudiant</th>
                <th className="px-6 py-3.5 text-left">Matricule</th>
                <th className="px-6 py-3.5 text-center">Note CC (/20)</th>
                <th className="px-6 py-3.5 text-center">Note Examen (/20)</th>
                <th className="px-6 py-3.5 text-center">Moyenne Finale</th>
                <th className="px-6 py-3.5 text-center">Statut</th>
                <th className="px-6 py-3.5 text-center">Figer la note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {studentsList.map((student) => {
                const finalGrade = parseFloat((student.cc * ccWeight + student.exam * examWeight).toFixed(2))
                const passed = finalGrade >= 10

                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} size="sm" />
                        <div>
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-xs text-muted font-mono">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{student.id}</td>

                    {/* CC input */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="20"
                          disabled={student.val}
                          value={student.cc}
                          onChange={(e) => handleGradeChange(student.id, 'cc', parseFloat(e.target.value) || 0)}
                          className={`w-16 text-center font-mono font-bold text-sm rounded border py-1 px-1.5 outline-none transition-colors ${
                            student.val ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-border focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                          }`}
                        />
                        <span className="text-xs text-muted">/20</span>
                      </div>
                    </td>

                    {/* Exam input */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="20"
                          disabled={student.val}
                          value={student.exam}
                          onChange={(e) => handleGradeChange(student.id, 'exam', parseFloat(e.target.value) || 0)}
                          className={`w-16 text-center font-mono font-bold text-sm rounded border py-1 px-1.5 outline-none transition-colors ${
                            student.val ? 'bg-gray-50 border-gray-200 text-gray-500' : 'border-border focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'
                          }`}
                        />
                        <span className="text-xs text-muted">/20</span>
                      </div>
                    </td>

                    {/* Moyenne Finale computed */}
                    <td className="px-6 py-4 text-center font-mono font-black text-sm">
                      <span className={passed ? "text-emerald-600" : "text-red-500"}>
                        {finalGrade} / 20
                      </span>
                    </td>

                    {/* Statut badge */}
                    <td className="px-6 py-4 text-center">
                      <Badge variant={passed ? 'success' : 'danger'}>
                        {passed ? (language === 'FR' ? 'Validé' : 'Passed') : (language === 'FR' ? 'Échoué' : 'Failed')}
                      </Badge>
                    </td>

                    {/* Lock checkbox */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleValidation(student.id)}
                        className={`inline-flex items-center justify-center p-1 rounded-md transition-colors ${
                          student.val ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                        title={student.val ? "Déverrouiller la saisie" : "Figer la note"}
                      >
                        {student.val ? <Check className="h-4 w-4 stroke-[3]" /> : <Edit3 className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Validate report actions */}
        <div className="p-5 border-t border-border bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            {language === 'FR'
              ? '⚠️ Les notes figées sont immédiatement consultables par les étudiants dans leur espace personnel.'
              : '⚠️ Locked grades are immediately viewable by students in their grades panel.'}
          </p>
          <Button
            onClick={() => {
              const count = studentsList.length
              const sizeInKB = parseFloat(((200 + count * 50) / 1024).toFixed(2))
              alert(
                language === 'FR'
                  ? `Grille de notes sauvegardée ! \n\n🔒 Éléments figeables validés : ${studentsList.filter(s => s.val).length} / ${count} étudiants.\n🌍 Synchronisé en ligne (Coût : ~${sizeInKB} Ko).`
                  : `Gradesheet saved successfully! \n\n🔒 Locked items: ${studentsList.filter(s => s.val).length} / ${count} students.\n🌍 Synchronized online (Bandwidth overhead: ~${sizeInKB} KB).`
              )
            }}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 shadow-sm flex items-center justify-center gap-1.5"
          >
            <Save className="h-4 w-4" />
            {language === 'FR' ? 'Enregistrer la grille' : 'Commit Grade Sheet'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
