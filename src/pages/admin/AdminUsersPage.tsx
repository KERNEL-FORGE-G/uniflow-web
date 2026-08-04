import { useState } from 'react'
import { Plus, MoreHorizontal, MessageSquare } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { PageHeader } from '../../components/ui/PageHeader'
import { EmptyState } from '../../components/ui/EmptyState'
import { Input, Select } from '../../components/ui/Input'
import { useAdminUsers } from '../../hooks'

export default function AdminUsersPage() {
  const { data, loading, error } = useAdminUsers()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (loading) return <p className="text-sm text-muted">Chargement…</p>
  if (error || !data) return <EmptyState title="Impossible de charger les utilisateurs" description={error ?? undefined} />

  const selected = data.find((u) => u.id === (selectedId ?? data[0]?.id)) ?? data[0]

  return (
    <div className="space-y-6">
      <PageHeader title="Gestion des utilisateurs" actions={<Button><Plus className="h-4 w-4" /> Ajouter un utilisateur</Button>} />

      <div className="flex flex-wrap gap-3">
        <Input type="search" placeholder="Rechercher un utilisateur..." className="min-w-[200px] flex-1" />
        {['Rôle', 'Statut', 'Département'].map((f) => (
          <Select key={f} defaultValue={f}>
            <option>{f}</option>
          </Select>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden !p-0 lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-bg">
                <tr>
                  {['Utilisateur', 'ID', 'Email', 'Rôle', 'Statut', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((u) => (
                  <tr
                    key={u.id}
                    className="cursor-pointer hover:bg-bg"
                    onClick={() => setSelectedId(u.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={u.name} size="sm" />
                        {u.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{u.id}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.role}</td>
                    <td className="px-4 py-3">
                      <Badge variant={u.status === 'Actif' ? 'success' : 'neutral'}>{u.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <MoreHorizontal className="h-4 w-4 text-muted" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <Avatar name={selected.name} size="xl" className="mx-auto" />
            <h3 className="mt-4 text-lg font-semibold">{selected.name}</h3>
            <p className="text-sm text-muted">{selected.id}</p>
            <Badge variant={selected.status === 'Actif' ? 'success' : 'neutral'} className="mt-2">
              {selected.status}
            </Badge>
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="font-medium">{selected.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Rôle</dt>
              <dd className="font-medium">{selected.role}</dd>
            </div>
          </dl>
          <div className="mt-6 space-y-2">
            <Button className="w-full">Éditer</Button>
            <Button variant="outline" className="w-full">
              Désactiver
            </Button>
            <Button variant="danger" className="w-full">
              Supprimer
            </Button>
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4" /> Envoyer message
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
