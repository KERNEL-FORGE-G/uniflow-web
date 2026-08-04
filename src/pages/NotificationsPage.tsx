import { useEffect, useState } from 'react'
import { Megaphone, FileText, Video, Star, Trash2 } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Select } from '../components/ui/Input'
import { useNotifications } from '../hooks'
import type { NotificationItem } from '../types'

const iconMap = {
  info: Megaphone,
  warning: FileText,
  success: Star,
  danger: Megaphone,
  message: Video,
} as const

export default function NotificationsPage() {
  const { data, loading, error } = useNotifications()
  const [activeTab, setActiveTab] = useState('Tous')
  const [selected, setSelected] = useState<NotificationItem | null>(null)

  useEffect(() => {
    if (data?.length && !selected) setSelected(data[0])
  }, [data, selected])

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les notifications" description={error ?? undefined} />
  if (!selected) return null

  const unread = data.filter((n) => n.unread).length
  const tabs = [
    { label: 'Tous', count: data.length },
    { label: 'Non lues', count: unread },
  ]

  const filtered = activeTab === 'Non lues' ? data.filter((n) => n.unread) : data

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {['Par UE', 'Par type', 'Période'].map((f) => (
              <Select key={f} defaultValue={f}>
                <option>{f}</option>
              </Select>
            ))}
            <Button>Tout marquer comme lu</Button>
          </div>
        }
      />

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
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{count}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          {filtered.map((n) => {
            const Icon = iconMap[n.type] || Megaphone
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelected(n)}
                className={`w-full rounded-xl border bg-surface p-4 text-left transition-colors ${
                  selected.id === n.id
                    ? 'border-l-4 border-primary/30 border-l-primary shadow-sm'
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${n.unread ? 'text-text' : 'text-gray-600'}`}>{n.title}</p>
                      {n.unread ? <span className="h-2 w-2 shrink-0 rounded-full bg-primary" /> : null}
                    </div>
                    <p className="text-xs text-muted">{n.time}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text">{selected.title}</h2>
              <p className="text-sm text-muted">{selected.time}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded p-1 hover:bg-bg">
                <Star className="h-4 w-4 text-muted" />
              </button>
              <button type="button" className="rounded p-1 hover:bg-bg">
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
          {selected.unread ? (
            <Badge variant="primary" className="mt-3">
              Non lue
            </Badge>
          ) : null}
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{selected.body}</p>
          <Button className="mt-6">J&apos;ai compris</Button>
        </Card>
      </div>
    </div>
  )
}
