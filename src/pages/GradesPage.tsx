import { Download, Eye } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Select } from '../components/ui/Input'
import { useGrades } from '../hooks'
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

export default function GradesPage() {
  const { data, loading, error } = useGrades()

  if (loading) return <p className="text-sm text-muted">Chargement des notes…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les notes" description={error ?? undefined} />

  const ectsPct = Math.round((data.ects.validated / data.ects.total) * 100)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mes notes"
        actions={
          <div className="flex gap-2">
            <Select defaultValue="Semestre 2">
              <option>Semestre 2</option>
            </Select>
            <Select defaultValue="2023-2024">
              <option>2023-2024</option>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardTitle className="mb-2 text-base">Résumé académique</CardTitle>
          <p className="text-3xl font-bold text-primary">{data.average}/20</p>
          <p className="text-sm text-muted">Moyenne générale</p>
          <ResponsiveContainer width="100%" height={200} className="mt-4">
            <RadarChart data={data.radar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle className="mb-2 text-base">Crédits ECTS</CardTitle>
          <p className="text-3xl font-bold text-teal">
            {data.ects.validated}/{data.ects.total}
          </p>
          <p className="text-sm text-muted">Crédits validés</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-teal" style={{ width: `${ectsPct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted">{ectsPct}% du semestre validé</p>
        </Card>

        <Card className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-32 w-24 items-center justify-center rounded-lg border-2 border-dashed border-border bg-bg text-xs text-muted">
            Bulletin
          </div>
          <Button className="w-full">
            <Download className="h-4 w-4" /> Télécharger PDF
          </Button>
        </Card>
      </div>

      <Card className="overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-bg">
              <tr>
                {['UE', 'Titre', 'Type', 'Coef.', 'Note', 'Moy. classe', 'Rang', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.grades.map((g) => (
                <tr key={g.ue} className="hover:bg-bg">
                  <td className="px-4 py-3 font-medium text-primary">{g.ue}</td>
                  <td className="px-4 py-3">{g.title}</td>
                  <td className="px-4 py-3 text-muted">{g.type}</td>
                  <td className="px-4 py-3">{g.coef}</td>
                  <td className="px-4 py-3 font-bold">{g.grade}</td>
                  <td className="px-4 py-3 text-muted">{g.avg}</td>
                  <td className="px-4 py-3">{g.rank}</td>
                  <td className="px-4 py-3">
                    <button type="button">
                      <Eye className="h-4 w-4 text-primary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4 text-base">Évolution des moyennes</CardTitle>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.evolution}>
            <XAxis dataKey="sem" />
            <YAxis domain={[10, 16]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="personal" name="Moyenne personnelle" stroke="#1e3a8a" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="class"
              name="Moyenne classe"
              stroke="#0d9488"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
