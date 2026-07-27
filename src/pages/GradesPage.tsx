import { Download, Eye } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

const radarData = [
  { skill: 'Communication', value: 75 },
  { skill: 'Programmation', value: 90 },
  { skill: 'Conception', value: 80 },
  { skill: 'Analyse', value: 85 },
  { skill: 'Travail d\'équipe', value: 70 },
]

const evolutionData = [
  { sem: 'S1', personal: 12.5, class: 11.8 },
  { sem: 'S2', personal: 13.2, class: 12.1 },
  { sem: 'S3', personal: 14.0, class: 12.5 },
  { sem: 'S4', personal: 14.8, class: 13.0 },
]

const grades = [
  { ue: 'INFO201', title: 'Structures de données', type: 'Examen', coef: 2, grade: 16, avg: 12.5, rank: 5 },
  { ue: 'MATH201', title: 'Analyse numérique', type: 'Projet', coef: 1.5, grade: 15, avg: 13.0, rank: 8 },
  { ue: 'ECO101', title: 'Microéconomie', type: 'Examen', coef: 2, grade: 14, avg: 11.5, rank: 12 },
  { ue: 'INFO101', title: 'Algorithmique', type: 'TP', coef: 1, grade: 17, avg: 14.0, rank: 3 },
  { ue: 'ANG101', title: 'Anglais technique', type: 'Oral', coef: 1, grade: 15.5, avg: 13.5, rank: 6 },
]

export default function GradesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Mes notes</h1>
        <div className="flex gap-2">
          <select className="rounded-lg border border-border bg-white px-3 py-2 text-sm"><option>Semestre 2</option></select>
          <select className="rounded-lg border border-border bg-white px-3 py-2 text-sm"><option>2023-2024</option></select>
          <Button variant="outline"><Download className="h-4 w-4" /> Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle className="mb-2 text-base">Résumé académique</CardTitle>
          <p className="text-3xl font-bold text-primary">14.8/20</p>
          <p className="text-sm text-muted">Moyenne générale</p>
          <ResponsiveContainer width="100%" height={200} className="mt-4">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle className="mb-2 text-base">Crédits ECTS</CardTitle>
          <p className="text-3xl font-bold text-teal">45/60</p>
          <p className="text-sm text-muted">Crédits validés</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-[75%] rounded-full bg-teal" />
          </div>
          <p className="mt-2 text-xs text-muted">75% du semestre validé</p>
        </Card>

        <Card className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-32 w-24 items-center justify-center rounded-lg border-2 border-dashed border-border bg-gray-50 text-xs text-muted">
            Bulletin
          </div>
          <Button className="w-full"><Download className="h-4 w-4" /> Télécharger PDF</Button>
        </Card>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-gray-50">
              <tr>
                {['UE', 'Titre', 'Type', 'Coef.', 'Note', 'Moy. classe', 'Rang', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {grades.map((g) => (
                <tr key={g.ue} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-primary">{g.ue}</td>
                  <td className="px-4 py-3">{g.title}</td>
                  <td className="px-4 py-3 text-muted">{g.type}</td>
                  <td className="px-4 py-3">{g.coef}</td>
                  <td className="px-4 py-3 font-bold">{g.grade}</td>
                  <td className="px-4 py-3 text-muted">{g.avg}</td>
                  <td className="px-4 py-3">{g.rank}</td>
                  <td className="px-4 py-3"><button type="button"><Eye className="h-4 w-4 text-primary" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4 text-base">Évolution des moyennes</CardTitle>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={evolutionData}>
            <XAxis dataKey="sem" />
            <YAxis domain={[10, 16]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="personal" name="Moyenne personnelle" stroke="#1e3a8a" strokeWidth={2} />
            <Line type="monotone" dataKey="class" name="Moyenne classe" stroke="#0d9488" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
