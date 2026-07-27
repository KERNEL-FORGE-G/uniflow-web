import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Printer, Sparkles } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

const hours = ['08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00']
const days = ['Lun 13', 'Mar 14', 'Mer 15', 'Jeu 16', 'Ven 17', 'Sam 18']

type EventType = 'CM' | 'TD' | 'TP' | 'Séminaire'

const eventColors: Record<EventType, string> = {
  CM: 'bg-primary text-white',
  TD: 'bg-teal text-white',
  TP: 'bg-orange-500 text-white',
  Séminaire: 'bg-emerald-600 text-white',
}

const events: { day: number; start: number; duration: number; title: string; type: EventType; room: string; teacher: string }[] = [
  { day: 0, start: 0, duration: 2, title: 'Algorithmique', type: 'CM', room: 'A101', teacher: 'Pr. Martin' },
  { day: 0, start: 3, duration: 2, title: 'Mathématiques', type: 'TD', room: 'B204', teacher: 'Dr. Dupont' },
  { day: 1, start: 1, duration: 2, title: 'Réseaux', type: 'TP', room: 'C302', teacher: 'Pr. Kamga' },
  { day: 2, start: 2, duration: 2, title: 'Économie', type: 'CM', room: 'D105', teacher: 'Pr. Ngo' },
  { day: 3, start: 4, duration: 2, title: 'Anglais', type: 'TD', room: 'E201', teacher: 'Mme. Johnson' },
  { day: 4, start: 0, duration: 2, title: 'Physique', type: 'Séminaire', room: 'F102', teacher: 'Pr. Mbarga' },
]

const selectedCourse = {
  title: 'Réseaux — TP',
  teacher: 'Pr. Kamga',
  room: 'C302',
  group: 'Groupe B',
  type: 'TP',
  description: 'Travaux pratiques sur les protocoles réseau TCP/IP et configuration de routeurs.',
}

export default function SchedulePage() {
  const [view, setView] = useState<'Semaine' | 'Mois' | 'Jour'>('Semaine')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button type="button" className="rounded-lg border border-border p-2 hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">13 – 19 mai 2024</h1>
          <button type="button" className="rounded-lg border border-border p-2 hover:bg-gray-50">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="!py-2"><Download className="h-4 w-4" /> Export PDF</Button>
          <Button variant="outline" className="!py-2"><Printer className="h-4 w-4" /> Imprimer</Button>
          <Button className="!py-2"><Sparkles className="h-4 w-4" /> Auto-générer</Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          {['Programme', 'Niveau', 'Semestre'].map((f) => (
            <select key={f} className="rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <option>{f}</option>
            </select>
          ))}
        </div>
        <div className="flex rounded-lg border border-border">
          {(['Semaine', 'Mois', 'Jour'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium ${view === v ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'} ${v === 'Semaine' ? 'rounded-l-lg' : v === 'Jour' ? 'rounded-r-lg' : ''}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3 !p-0 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 border-b border-border bg-gray-50">
              <div className="p-3" />
              {days.map((d) => (
                <div key={d} className="border-l border-border p-3 text-center text-sm font-semibold">{d}</div>
              ))}
            </div>
            {hours.map((hour, hi) => (
              <div key={hour} className="grid grid-cols-7 border-b border-border" style={{ minHeight: 56 }}>
                <div className="p-2 text-xs text-muted">{hour}</div>
                {days.map((_, di) => {
                  const event = events.find((e) => e.day === di && e.start === hi)
                  if (event) {
                    return (
                      <div key={di} className="relative border-l border-border p-1">
                        <div
                          className={`absolute inset-x-1 rounded-lg p-2 text-xs ${eventColors[event.type]}`}
                          style={{ top: 4, height: event.duration * 52 }}
                        >
                          <p className="font-semibold">{event.title}</p>
                          <p className="opacity-90">{event.type} · {event.room}</p>
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
          <h3 className="font-semibold text-primary">{selectedCourse.title}</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-muted">Professeur</dt><dd className="font-medium">{selectedCourse.teacher}</dd></div>
            <div><dt className="text-muted">Salle</dt><dd className="font-medium">{selectedCourse.room}</dd></div>
            <div><dt className="text-muted">Groupe</dt><dd className="font-medium">{selectedCourse.group}</dd></div>
            <div><dt className="text-muted">Type</dt><dd className="font-medium">{selectedCourse.type}</dd></div>
          </dl>
          <p className="mt-3 text-sm text-muted">{selectedCourse.description}</p>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full">Voir les étudiants</Button>
            <Button className="w-full">Ajouter au calendrier</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
