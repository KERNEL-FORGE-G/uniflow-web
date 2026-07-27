import { QrCode, Download, UserCheck, Eye, Edit, Trash2 } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

const students = [
  { name: 'Emma Martin', id: 'ETU-0847', present: 42, absent: 3, late: 2, rate: 89, justified: 2, status: 'Régulier' as const },
  { name: 'Lucas Dubois', id: 'ETU-0848', present: 38, absent: 5, late: 4, rate: 76, justified: 3, status: 'Attention' as const },
  { name: 'Sarah Kamga', id: 'ETU-0849', present: 44, absent: 1, late: 1, rate: 95, justified: 1, status: 'Régulier' as const },
  { name: 'Yasmine Ngo', id: 'ETU-0850', present: 30, absent: 10, late: 6, rate: 60, justified: 4, status: 'Critique' as const },
  { name: 'Thomas Mbarga', id: 'ETU-0851', present: 40, absent: 4, late: 2, rate: 85, justified: 2, status: 'Régulier' as const },
]

const statusVariant = { Régulier: 'success', Attention: 'warning', Critique: 'danger' } as const

const weeklyData = [
  { week: 'S1', present: 85, absent: 15 },
  { week: 'S2', present: 88, absent: 12 },
  { week: 'S3', present: 82, absent: 18 },
  { week: 'S4', present: 90, absent: 10 },
  { week: 'S5', present: 87, absent: 13 },
]

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des présences</h1>
        <div className="flex flex-wrap items-center gap-2">
          {['UE', 'Groupe', 'Semaine'].map((f) => (
            <select key={f} className="rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <option>{f}</option>
            </select>
          ))}
          <Button variant="outline"><QrCode className="h-4 w-4" /> Générer QR</Button>
          <Button><UserCheck className="h-4 w-4" /> Marquer présence</Button>
          <Button variant="outline"><Download className="h-4 w-4" /> Exporter</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center gap-4">
          <ResponsiveContainer width={80} height={80}>
            <PieChart>
              <Pie data={[{ value: 87 }, { value: 13 }]} cx="50%" cy="50%" innerRadius={25} outerRadius={38} dataKey="value" startAngle={90} endAngle={-270}>
                <Cell fill="#0d9488" />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div>
            <p className="text-2xl font-bold text-teal">87%</p>
            <p className="text-sm text-muted">Taux de présence global</p>
          </div>
        </Card>
        <Card>
          <p className="text-2xl font-bold">156</p>
          <p className="text-sm text-muted">Sessions au total</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-muted">Présents aujourd'hui (sur 20)</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-orange-600">12</p>
          <p className="text-sm text-muted">Absences à justifier (6.7%)</p>
        </Card>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-gray-50">
              <tr>
                {['#', 'Étudiant', 'N° Étudiant', 'Présences', 'Absences', 'Retards', 'Taux (%)', 'Justifiées', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size="sm" />
                      {s.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{s.id}</td>
                  <td className="px-4 py-3">{s.present}</td>
                  <td className="px-4 py-3">{s.absent}</td>
                  <td className="px-4 py-3">{s.late}</td>
                  <td className="px-4 py-3 font-medium">{s.rate}%</td>
                  <td className="px-4 py-3">{s.justified}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button type="button" className="rounded p-1 hover:bg-gray-100"><Eye className="h-4 w-4 text-muted" /></button>
                      <button type="button" className="rounded p-1 hover:bg-gray-100"><Edit className="h-4 w-4 text-muted" /></button>
                      <button type="button" className="rounded p-1 hover:bg-gray-100"><Trash2 className="h-4 w-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle className="mb-4 text-base">Évolution des présences par semaine</CardTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="text-center">
          <CardTitle className="mb-4 text-base">QR Code session active</CardTitle>
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-gray-50">
            <QrCode className="h-24 w-24 text-gray-400" />
          </div>
          <p className="mt-4 text-sm font-medium text-orange-600">Expire dans 8:32</p>
        </Card>
      </div>
    </div>
  )
}
