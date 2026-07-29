import { useState } from 'react'
import { Download, Eye } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { mockGrades, mockGradesEvolution, mockRadarData } from '../data/mockData'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts'

export default function GradesPage() {
  const [sem, setSem] = useState('Semestre 2')
  const [year, setYear] = useState('2023-2024')

  const avg = (mockGrades.reduce((s, g) => s + g.grade * g.coef, 0) / mockGrades.reduce((s, g) => s + g.coef, 0)).toFixed(2)
  const totalCredits = 45
  const maxCredits = 60

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Mes notes</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Résultats académiques et bulletins</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={sem} onChange={e => setSem(e.target.value)}
            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]">
            <option>Semestre 2</option><option>Semestre 1</option>
          </select>
          <select value={year} onChange={e => setYear(e.target.value)}
            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]">
            <option>2023-2024</option><option>2022-2023</option>
          </select>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Avg + radar */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Résumé académique</h2>
          <p className="text-3xl font-extrabold text-[#1e3a8a]">{avg}/20</p>
          <p className="text-xs text-[#6b7280]">Moyenne générale</p>
          <ResponsiveContainer width="100%" height={160} className="mt-2">
            <RadarChart data={mockRadarData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <PolarGrid stroke="#f3f4f6" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Radar dataKey="value" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* ECTS */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Crédits ECTS</h2>
          <p className="text-3xl font-extrabold text-[#0d9488]">{totalCredits}/{maxCredits}</p>
          <p className="text-xs text-[#6b7280] mt-0.5">Crédits validés</p>
          <div className="mt-4 h-2.5 rounded-full bg-[#f3f4f6] overflow-hidden">
            <div className="h-full rounded-full bg-[#0d9488]" style={{ width: `${(totalCredits/maxCredits)*100}%` }} />
          </div>
          <p className="text-xs text-[#9ca3af] mt-2">{Math.round((totalCredits/maxCredits)*100)}% du semestre validé</p>
          <div className="mt-4 space-y-1.5">
            {[
              { label: 'Excellentes (≥16)', pct: 18, color: 'bg-[#1e3a8a]' },
              { label: 'Bonnes (12-16)',    pct: 62, color: 'bg-[#0d9488]' },
              { label: 'Moyennes (10-12)',  pct: 12, color: 'bg-[#f59e0b]' },
              { label: 'Faibles (<10)',     pct: 8,  color: 'bg-[#ef4444]' },
            ].map(g => (
              <div key={g.label} className="flex items-center gap-2 text-[10px] text-[#374151]">
                <span className={`h-2 w-2 rounded-full shrink-0 ${g.color}`} />
                <span className="flex-1">{g.label}</span>
                <span className="font-semibold">{g.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bulletin download */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm flex flex-col items-center justify-between">
          <h2 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3 self-start">Bulletin du semestre</h2>
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="flex h-36 w-28 flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] text-xs text-[#9ca3af] gap-2">
              <Download className="h-6 w-6 opacity-40" />
              <span>Bulletin S2</span>
              <span>2023-2024</span>
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
            <Download className="h-4 w-4" /> Télécharger PDF
          </button>
          <p className="mt-2 text-xs text-[#9ca3af]">Aperçu disponible</p>
        </div>
      </div>

      {/* Grades table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#f3f4f6]">
          <h2 className="text-sm font-bold text-[#111827]">Notes par UE</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#f3f4f6] bg-[#f9fafb]">
              <tr>
                {['Intitulé','UE','Type','Coef.','Note',`Moy. classe`,'Rang','Détails'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f9fafb]">
              {mockGrades.map(g => (
                <tr key={g.ue} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="px-4 py-3 font-medium text-[#111827]">{g.title}</td>
                  <td className="px-4 py-3"><Badge variant="primary">{g.ue}</Badge></td>
                  <td className="px-4 py-3 text-[#6b7280]">{g.type}</td>
                  <td className="px-4 py-3 text-[#374151]">{g.coef}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${g.grade >= 14 ? 'text-[#059669]' : g.grade >= 10 ? 'text-[#d97706]' : 'text-[#dc2626]'}`}>
                      {g.grade}/20
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#6b7280]">{g.classAvg}</td>
                  <td className="px-4 py-3 text-[#374151]">
                    <span className="font-semibold">{g.rank}</span>
                    <span className="text-[#9ca3af]">/{g.maxRank}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="rounded p-1 hover:bg-[#f3f4f6] text-[#1e3a8a]"><Eye className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evolution chart */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#111827] mb-4">Évolution des moyennes par semestre</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={mockGradesEvolution} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="sem" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[10, 16]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: any) => [`${v}/20`]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="personal" name="Moyenne personnelle" stroke="#1e3a8a" strokeWidth={2.5} dot={{ r: 4, fill: '#1e3a8a' }} />
            <Line type="monotone" dataKey="classAvg" name="Moyenne classe" stroke="#0d9488" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#0d9488' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
