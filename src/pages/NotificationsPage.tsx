import { useState } from 'react'
import { Megaphone, FileText, Video, Star, Trash2 } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const tabs = [
  { label: 'Tous', count: 6 },
  { label: 'Annonces', count: undefined },
  { label: 'Système', count: undefined },
  { label: 'Non lues', count: 4 },
]

const notifications = [
  { id: 1, type: 'annonce', title: 'Annonce importante', sender: 'Administration', time: 'Il y a 5 min', unread: true,
    content: 'Changement de salle pour le cours de Mathématiques demain. Le cours aura lieu en salle B204 au lieu de A101.' },
  { id: 2, type: 'devoir', title: 'Nouveau devoir disponible', sender: 'Pr. Martin', time: 'Il y a 2h', unread: true,
    content: 'Le devoir 3 d\'Algorithmique est maintenant disponible. Date limite : 20 mai 2024.' },
  { id: 3, type: 'video', title: 'Visioconférence programmée', sender: 'Dr. Kamga', time: 'Hier', unread: false,
    content: 'Une session de visioconférence est prévue vendredi à 14h pour le cours de Réseaux.' },
  { id: 4, type: 'annonce', title: 'Rappel examen', sender: 'Scolarité', time: 'Il y a 2j', unread: true,
    content: 'N\'oubliez pas que l\'examen de Mathématiques aura lieu le 18 mai à 9h.' },
  { id: 5, type: 'devoir', title: 'Devoir noté', sender: 'Pr. Ngo', time: 'Il y a 3j', unread: false,
    content: 'Votre rapport de Microéconomie a été noté : 16/20. Consultez vos notes.' },
  { id: 6, type: 'system', title: 'Mise à jour système', sender: 'UniFlow', time: 'Il y a 1 sem.', unread: true,
    content: 'Une nouvelle version de la plateforme est disponible avec des améliorations de performance.' },
]

const iconMap = {
  annonce: Megaphone,
  devoir: FileText,
  video: Video,
  system: Star,
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('Tous')
  const [selected, setSelected] = useState(notifications[0])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <div className="flex flex-wrap items-center gap-2">
          {['Par UE', 'Par type', 'Période'].map((f) => (
            <select key={f} className="rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <option>{f}</option>
            </select>
          ))}
          <Button>Tout marquer comme lu</Button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border">
        {tabs.map(({ label, count }) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium ${
              activeTab === label ? 'border-b-2 border-primary text-primary' : 'text-muted'
            }`}
          >
            {label}
            {count !== undefined && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type as keyof typeof iconMap] || Megaphone
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelected(n)}
                className={`w-full rounded-xl border bg-white p-4 text-left transition-colors ${
                  selected.id === n.id ? 'border-l-4 border-l-primary border-primary/30 shadow-sm' : 'border-border hover:border-primary/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${n.unread ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</p>
                      {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted">{n.sender} · {n.time}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{selected.title}</h2>
              <p className="text-sm text-muted">{selected.sender} · {selected.time}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded p-1 hover:bg-gray-100"><Star className="h-4 w-4 text-muted" /></button>
              <button type="button" className="rounded p-1 hover:bg-gray-100"><Trash2 className="h-4 w-4 text-red-500" /></button>
            </div>
          </div>
          {selected.unread && <Badge variant="primary" className="mt-3">Non lue</Badge>}
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{selected.content}</p>
          <Button className="mt-6">J'ai compris</Button>
        </Card>
      </div>
    </div>
  )
}
