import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Printer, Sparkles, X } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { mockScheduleEvents, eventColors, type ScheduleEvent } from '../data/mockData'

const hours = ['08h00','09h00','10h00','11h00','12h00','13h00','14h00','15h00','16h00','17h00','18h00']
const days  = ['Lun 13','Mar 14','Mer 15','Jeu 16','Ven 17','Sam 18']
const CELL_H = 56

const typeLegend = [
  { label: 'CM',       color: 'bg-[#1e3a8a]' },
  { label: 'TD',       color: 'bg-[#0d9488]' },
  { label: 'TP',       color: 'bg-orange-500' },
  { label: 'Séminaire',color: 'bg-emerald-600' },
]

export default function SchedulePage() {
  const [view, setView] = useState<'Semaine'|'Mois'|'Jour'>('Semaine')
  const [selected, setSelected] = useState<ScheduleEvent | null>(mockScheduleEvents[6])

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-[#e5e7eb] p-1.5 hover:bg-[#f9fafb] transition-colors">
            <ChevronLeft className="h-4 w-4 text-[#374151]" />
          </button>
          <h1 className="text-base font-bold text-[#111827]">13 – 19 mai 2024</h1>
          <button className="rounded-lg border border-[#e5e7eb] p-1.5 hover:bg-[#f9fafb] transition-colors">
            <ChevronRight className="h-4 w-4 text-[#374151]" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['Programme','Niveau','Semestre'].map(f => (
            <select key={f} className="rounded-lg border border-[#e5e7eb] bg-white px-2.5 py-1.5 text-xs font-medium text-[#374151] outline-none focus:border-[#1e3a8a]">
              <option>{f} ▾</option>
            </select>
          ))}
          <div className="flex rounded-lg border border-[#e5e7eb] overflow-hidden">
            {(['Semaine','Mois','Jour'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === v ? 'bg-[#1e3a8a] text-white' : 'text-[#6b7280] hover:bg-[#f9fafb]'}`}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb]">
            <Download className="h-3.5 w-3.5" /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb]">
            <Printer className="h-3.5 w-3.5" /> Imprimer
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d4fa8]">
            <Sparkles className="h-3.5 w-3.5" /> Auto-générer
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 flex-wrap">
        {typeLegend.map(t => (
          <span key={t.label} className="flex items-center gap-1.5 text-xs font-medium text-[#374151]">
            <span className={`h-3 w-3 rounded ${t.color}`} />{t.label}
          </span>
        ))}
      </div>

      {/* Grid + panel */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Calendar grid */}
        <div className={`${selected ? 'lg:col-span-3' : 'lg:col-span-4'} rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-x-auto`}>
          <div className="min-w-[640px]">
            {/* Day headers */}
            <div className="grid border-b border-[#e5e7eb] bg-[#f9fafb]" style={{ gridTemplateColumns: '60px repeat(6,1fr)' }}>
              <div className="p-2.5" />
              {days.map(d => (
                <div key={d} className="border-l border-[#e5e7eb] p-2.5 text-center text-xs font-semibold text-[#374151]">{d}</div>
              ))}
            </div>
            {/* Hour rows */}
            {hours.map((hour, hi) => (
              <div key={hour} className="grid border-b border-[#f3f4f6] last:border-0" style={{ gridTemplateColumns: '60px repeat(6,1fr)', minHeight: CELL_H }}>
                <div className="p-2 text-[10px] text-[#9ca3af] font-mono">{hour}</div>
                {days.map((_, di) => {
                  const ev = mockScheduleEvents.find(e => e.day === di && e.start === hi)
                  return (
                    <div key={di} className="relative border-l border-[#f3f4f6]">
                      {ev && (
                        <button onClick={() => setSelected(ev === selected ? null : ev)}
                          className={`absolute inset-x-1 rounded-lg px-2 py-1.5 text-left transition-all hover:opacity-90 ${eventColors[ev.type]} ${selected?.id === ev.id ? 'ring-2 ring-white ring-offset-1' : ''}`}
                          style={{ top: 3, height: ev.duration * CELL_H - 6, zIndex: 1 }}>
                          <p className="text-[11px] font-bold leading-tight truncate">{ev.title}</p>
                          <p className="text-[10px] opacity-80 truncate">{ev.type} · {ev.room}</p>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#111827]">Cours sélectionné</h2>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1 hover:bg-[#f3f4f6]">
                <X className="h-4 w-4 text-[#9ca3af]" />
              </button>
            </div>
            <div className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold text-white mb-3 ${eventColors[selected.type]}`}>
              {selected.type}
            </div>
            <h3 className="font-bold text-[#1e3a8a] text-base mb-4">{selected.title}</h3>
            <dl className="space-y-2.5 text-sm">
              {[
                { label: 'Enseignant', value: selected.teacher },
                { label: 'Salle',      value: selected.room },
                { label: 'Groupe',     value: 'L2 — Groupe A' },
                { label: 'Type',       value: selected.type },
                { label: 'Description',value: 'Travaux pratiques — apportez votre ordinateur portable.' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs text-[#9ca3af] font-medium">{label}</dt>
                  <dd className="mt-0.5 font-medium text-[#374151]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 space-y-2">
              <button className="w-full rounded-lg border border-[#e5e7eb] py-2 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                Voir les étudiants
              </button>
              <button className="w-full rounded-lg bg-[#1e3a8a] py-2 text-xs font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
                Ajouter au calendrier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
