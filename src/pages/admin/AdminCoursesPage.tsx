import { Plus, BookOpen, Users, Link2, Copy } from 'lucide-react'
import { Card, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

const courses = [
  { code: 'INFO201', title: 'Structures de données', teacher: 'Dr. Kamga', students: 45, status: 'Actif', progress: 78, color: 'from-blue-600 to-blue-800' },
  { code: 'INFO301', title: 'Réseaux informatiques', teacher: 'Pr. Benkacem', students: 38, status: 'Actif', progress: 65, color: 'from-teal to-teal-light' },
  { code: 'ECO101', title: 'Microéconomie', teacher: 'Pr. Ngo', students: 120, status: 'Brouillon', progress: 30, color: 'from-purple-600 to-purple-800' },
  { code: 'MATH201', title: 'Analyse numérique', teacher: 'Dr. Dupont', students: 52, status: 'Actif', progress: 90, color: 'from-orange-500 to-orange-700' },
]

const timeline = [
  { date: 'Sept 2024', label: 'Rentrée', desc: 'Début des cours' },
  { date: 'Oct 2024', label: 'Inscriptions', desc: 'Date limite d\'inscription' },
  { date: 'Nov 2024', label: 'Partiels', desc: 'Examens partiels S1' },
  { date: 'Jan 2025', label: 'Reprise', desc: 'Reprise après vacances' },
  { date: 'Mai 2025', label: 'Finaux', desc: 'Examens finaux S2' },
  { date: 'Juin 2025', label: 'Fin', desc: 'Fin du semestre' },
]

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des cours & programmes</h1>
        <Button><Plus className="h-4 w-4" /> Créer un cours</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <Card key={c.code} className="overflow-hidden p-0">
              <div className={`h-20 bg-gradient-to-r ${c.color}`} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="primary">{c.code}</Badge>
                  <Badge variant={c.status === 'Actif' ? 'success' : 'warning'}>{c.status}</Badge>
                </div>
                <h3 className="mt-2 font-semibold">{c.title}</h3>
                <p className="text-sm text-muted">{c.teacher} · {c.students} étudiants</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-teal" style={{ width: `${c.progress}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted">{c.status} {c.progress}%</p>
                <div className="mt-3 flex gap-3 text-sm">
                  <button type="button" className="text-primary hover:underline">Éditer</button>
                  <button type="button" className="text-primary hover:underline">Voir</button>
                  <button type="button" className="text-muted hover:underline"><Copy className="inline h-3 w-3" /> Dupliquer</button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Actions rapides</CardTitle>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start"><BookOpen className="h-4 w-4" /> Créer UE</Button>
              <Button variant="outline" className="w-full justify-start"><Users className="h-4 w-4" /> Associer enseignant</Button>
              <Button variant="outline" className="w-full justify-start"><Link2 className="h-4 w-4" /> Lier programme</Button>
            </div>
          </Card>

          <Card>
            <CardTitle className="mb-4 text-base">Statistiques</CardTitle>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Cours actifs</dt><dd className="font-semibold">142</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Brouillons</dt><dd className="font-semibold">8</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Archivés</dt><dd className="font-semibold">24</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Total UE</dt><dd className="font-semibold">174</dd></div>
            </dl>
          </Card>
        </div>
      </div>

      <Card>
        <CardTitle className="mb-6 text-base">Calendrier académique — 2024-2025</CardTitle>
        <div className="relative">
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-primary/20" />
          <div className="flex justify-between overflow-x-auto pb-4">
            {timeline.map((t) => (
              <div key={t.date} className="relative flex flex-col items-center px-2 text-center">
                <div className="z-10 h-4 w-4 rounded-full bg-primary" />
                <p className="mt-3 text-xs font-semibold text-primary">{t.date}</p>
                <p className="mt-1 text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
