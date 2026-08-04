import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Printer, Sparkles } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Select } from '../components/ui/Input'
import { useSchedule } from '../hooks'
import type { EventType } from '../types'

const eventColors: Record<EventType, string> = {
  CM: 'bg-primary text-white',
  TD: 'bg-teal text-white',
  TP: 'bg-orange-500 text-white',
  Séminaire: 'bg-emerald-600 text-white',
}

export default function SchedulePage() {
  const { data, loading, error } = useSchedule()
  const [view, setView] = useState<'Semaine' | 'Mois' | 'Jour'>('Semaine')

  if (loading) return <p className="text-sm text-muted">Chargement de l&apos;emploi du temps…</p>
  if (error || !data) return <EmptyState title="Impossible de charger l'emploi du temps" description={error ?? undefined} />

  return (
    <div className="space-y-6">
      <PageHeader
        title={data.weekLabel}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="rounded-lg border border-border p-2 hover:bg-bg">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-lg border border-border p-2 hover:bg-bg">
              <ChevronRight className="h-4 w-4" />
            </button>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4" /> Imprimer
            </Button>
            <Button>
              <Sparkles className="h-4 w-4" /> Auto-générer
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          {['Programme', 'Niveau', 'Semestre'].map((f) => (
            <Select key={f} defaultValue={f}>
              <option>{f}</option>
            </Select>
          ))}
        </div>
        <div className="flex rounded-lg border border-border">
          {(['Semaine', 'Mois', 'Jour'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium ${view === v ? 'bg-primary text-white' : 'text-gray-600 hover:bg-bg'} ${
                v === 'Semaine' ? 'rounded-l-lg' : v === 'Jour' ? 'rounded-r-lg' : ''
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="overflow-x-auto !p-0 lg:col-span-3">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 border-b border-border bg-bg">
              <div className="p-3" />
              {data.days.map((d) => (
                <div key={d} className="border-l border-border p-3 text-center text-sm font-semibold">
                  {d}
                </div>
              ))}
            </div>
            {data.hours.map((hour, hi) => (
              <div key={hour} className="grid grid-cols-7 border-b border-border" style={{ minHeight: 56 }}>
                <div className="p-2 text-xs text-muted">{hour}</div>
                {data.days.map((_, di) => {
                  const event = data.events.find((e) => e.day === di && e.start === hi)
                  if (event) {
                    return (
                      <div key={di} className="relative border-l border-border p-1">
                        <div
                          className={`absolute inset-x-1 rounded-lg p-2 text-xs ${eventColors[event.type]}`}
                          style={{ top: 4, height: event.duration * 52 }}
                        >
                          <p className="font-semibold">{event.title}</p>
                          <p className="opacity-90">
                            {event.type} · {event.room}
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return <div key={di} className="border-l border-border" />
                })}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle className="mb-4 text-base">Cours sélectionné</CardTitle>
          <h3 className="font-semibold text-primary">{data.selected.title}</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-muted">Professeur</dt>
              <dd className="font-medium">{data.selected.teacher}</dd>
            </div>
            <div>
              <dt className="text-muted">Salle</dt>
              <dd className="font-medium">{data.selected.room}</dd>
            </div>
            <div>
              <dt className="text-muted">Groupe</dt>
              <dd className="font-medium">{data.selected.group}</dd>
            </div>
            <div>
              <dt className="text-muted">Type</dt>
              <dd className="font-medium">{data.selected.type}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted">{data.selected.description}</p>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full">
              Voir les étudiants
            </Button>
            <Button className="w-full">Ajouter au calendrier</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
