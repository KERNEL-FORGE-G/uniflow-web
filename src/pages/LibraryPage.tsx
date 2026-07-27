import { Plus, FileText, Play, Link2, Download, Share2, Heart, Flag } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const resources = [
  { type: 'pdf', title: 'Cours Algorithmique avancée', desc: 'Support de cours complet — Chapitres 1 à 8', size: '4.2 Mo', code: 'INFO201', date: '10 mai 2024' },
  { type: 'video', title: 'Introduction aux réseaux TCP/IP', desc: 'Vidéo explicative — 45 min', size: '128 Mo', code: 'INFO301', date: '8 mai 2024' },
  { type: 'link', title: 'Documentation Python officielle', desc: 'Lien externe vers docs.python.org', size: '—', code: 'INFO101', date: '5 mai 2024' },
  { type: 'pdf', title: 'Exercices corrigés — Analyse', desc: 'Série d\'exercices avec corrections', size: '1.8 Mo', code: 'MATH201', date: '3 mai 2024' },
  { type: 'video', title: 'TP Structures de données', desc: 'Tutoriel pas à pas', size: '256 Mo', code: 'INFO201', date: '1 mai 2024' },
  { type: 'pdf', title: 'Microéconomie — Fiches révision', desc: 'Résumé pour examen', size: '2.1 Mo', code: 'ECO101', date: '28 avr. 2024' },
]

const typeConfig = {
  pdf: { icon: FileText, color: 'text-red-600 bg-red-50', label: 'PDF' },
  video: { icon: Play, color: 'text-purple-600 bg-purple-50', label: 'Vidéo' },
  link: { icon: Link2, color: 'text-blue-600 bg-blue-50', label: 'Lien' },
}

const collections = ['Informatique', 'Économie', 'Mathématiques', 'Langues']
const recent = ['Cours Algorithmique avancée', 'TP Structures de données', 'Fiches Microéconomie']
const popular = ['Introduction aux réseaux', 'Exercices Analyse', 'Documentation Python', 'Cours Algorithmique', 'Vidéo TP Réseaux']

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Bibliothèque de ressources</h1>
        <Button><Plus className="h-4 w-4" /> Ajouter une ressource</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input type="search" placeholder="Rechercher une ressource..." className="flex-1 min-w-[200px] rounded-lg border border-border px-4 py-2 text-sm outline-none" />
        {['Type', 'UE', 'Date'].map((f) => (
          <select key={f} className="rounded-lg border border-border bg-white px-4 py-2 text-sm">
            <option>{f}</option>
          </select>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {resources.map((r) => {
            const cfg = typeConfig[r.type as keyof typeof typeConfig]
            const Icon = cfg.icon
            return (
              <Card key={r.title}>
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2.5 ${cfg.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary">{r.code}</Badge>
                      <span className="text-xs text-muted">{cfg.label}</span>
                    </div>
                    <h3 className="mt-1 font-semibold text-sm">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted line-clamp-2">{r.desc}</p>
                    <p className="mt-2 text-xs text-muted">{r.size} · {r.date}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-3 text-base">Mes collections</CardTitle>
            <ul className="space-y-2">
              {collections.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer">
                  <span className="text-lg">📁</span> {c}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardTitle className="mb-3 text-base">Ressources récentes</CardTitle>
            <ul className="space-y-2 text-sm text-muted">
              {recent.map((r) => (
                <li key={r} className="truncate hover:text-primary cursor-pointer">{r}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardTitle className="mb-3 text-base">Les plus téléchargées</CardTitle>
            <ol className="space-y-2 text-sm">
              {popular.map((r, i) => (
                <li key={r} className="flex gap-2">
                  <span className="font-semibold text-primary">{i + 1}.</span>
                  <span className="truncate text-muted hover:text-primary cursor-pointer">{r}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-white p-4 shadow-lg">
        <Button variant="outline"><Download className="h-4 w-4" /> Télécharger</Button>
        <Button variant="outline"><Share2 className="h-4 w-4" /> Partager</Button>
        <Button variant="outline"><Heart className="h-4 w-4" /> Favoris</Button>
        <Button variant="outline"><Flag className="h-4 w-4" /> Signaler</Button>
      </div>
    </div>
  )
}
