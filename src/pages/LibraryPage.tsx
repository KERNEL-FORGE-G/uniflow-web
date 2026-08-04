import { Plus, FileText, Play, Link2, Download, Share2, Heart, Flag } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Input, Select } from '../components/ui/Input'
import { useLibrary } from '../hooks'

const typeConfig = {
  PDF: { icon: FileText, color: 'text-red-600 bg-red-50', label: 'PDF' },
  Vidéo: { icon: Play, color: 'text-purple-600 bg-purple-50', label: 'Vidéo' },
  Lien: { icon: Link2, color: 'text-blue-600 bg-blue-50', label: 'Lien' },
  Doc: { icon: FileText, color: 'text-orange-600 bg-orange-50', label: 'Doc' },
} as const

export default function LibraryPage() {
  const { data, loading, error } = useLibrary()

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger la bibliothèque" description={error ?? undefined} />

  const collections = [...new Set(data.map((r) => r.collection))]

  return (
    <div className="space-y-6">
      <PageHeader title="Bibliothèque de ressources" actions={<Button><Plus className="h-4 w-4" /> Ajouter une ressource</Button>} />

      <div className="flex flex-wrap gap-3">
        <Input type="search" placeholder="Rechercher une ressource..." className="min-w-[200px] flex-1" />
        {['Type', 'UE', 'Date'].map((f) => (
          <Select key={f} defaultValue={f}>
            <option>{f}</option>
          </Select>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {data.map((r) => {
            const cfg = typeConfig[r.type]
            const Icon = cfg.icon
            return (
              <Card key={r.id}>
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2.5 ${cfg.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary">{r.collection}</Badge>
                      <span className="text-xs text-muted">{cfg.label}</span>
                    </div>
                    <h3 className="mt-1 text-sm font-semibold">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted">{r.author}</p>
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
                <li key={c} className="cursor-pointer text-sm hover:text-primary">
                  {c}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardTitle className="mb-3 text-base">Ressources récentes</CardTitle>
            <ul className="space-y-2 text-sm text-muted">
              {data.slice(0, 3).map((r) => (
                <li key={r.id} className="cursor-pointer truncate hover:text-primary">
                  {r.title}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm">
        <Button variant="outline">
          <Download className="h-4 w-4" /> Télécharger
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4" /> Partager
        </Button>
        <Button variant="outline">
          <Heart className="h-4 w-4" /> Favoris
        </Button>
        <Button variant="outline">
          <Flag className="h-4 w-4" /> Signaler
        </Button>
      </div>
    </div>
  )
}
