import { Plus, MoreHorizontal, MessageSquare } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'

const users = [
  { name: 'Emma Martin', id: 'ETU-0847', email: 'emma.martin@uniflow.edu', role: 'Étudiant', dept: 'Informatique', status: 'Actif' as const },
  { name: 'Dr. Karim Benkacem', id: 'ENS-0042', email: 'k.benkacem@uniflow.edu', role: 'Enseignant', dept: 'Informatique', status: 'Actif' as const },
  { name: 'Lucas Dubois', id: 'ETU-0848', email: 'lucas.dubois@uniflow.edu', role: 'Étudiant', dept: 'Économie', status: 'Actif' as const },
  { name: 'Pr. Martin', id: 'ENS-0015', email: 'p.martin@uniflow.edu', role: 'Enseignant', dept: 'Informatique', status: 'Inactif' as const },
  { name: 'Sarah Kamga', id: 'ETU-0849', email: 'sarah.kamga@uniflow.edu', role: 'Étudiant', dept: 'Droit', status: 'Actif' as const },
]

const selectedUser = {
  name: 'Emma Martin',
  id: 'ETU-0847',
  email: 'emma.martin@uniflow.edu',
  phone: '+237 6 12 34 56 78',
  registered: '15 septembre 2022',
  status: 'Actif' as const,
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
        <Button><Plus className="h-4 w-4" /> Ajouter un utilisateur</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input type="search" placeholder="Rechercher un utilisateur..." className="flex-1 min-w-[200px] rounded-lg border border-border px-4 py-2 text-sm outline-none" />
        {['Rôle', 'Statut', 'Département'].map((f) => (
          <select key={f} className="rounded-lg border border-border bg-white px-4 py-2 text-sm">
            <option>{f}</option>
          </select>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-gray-50">
                <tr>
                  {['Utilisateur', 'ID', 'Email', 'Rôle', 'Département', 'Statut', 'Dernière connexion', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={u.name} size="sm" />
                        {u.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{u.id}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.role}</td>
                    <td className="px-4 py-3">{u.dept}</td>
                    <td className="px-4 py-3">
                      <Badge variant={u.status === 'Actif' ? 'success' : 'neutral'}>{u.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">Aujourd'hui</td>
                    <td className="px-4 py-3"><MoreHorizontal className="h-4 w-4 text-muted" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-3 text-sm text-muted">
            1-10 sur 1 333 résultats
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <Avatar name={selectedUser.name} size="xl" className="mx-auto" />
            <h3 className="mt-4 font-semibold text-lg">{selectedUser.name}</h3>
            <p className="text-sm text-muted">{selectedUser.id}</p>
            <Badge variant="success" className="mt-2">{selectedUser.status}</Badge>
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            <div><dt className="text-muted">Email</dt><dd className="font-medium">{selectedUser.email}</dd></div>
            <div><dt className="text-muted">Téléphone</dt><dd className="font-medium">{selectedUser.phone}</dd></div>
            <div><dt className="text-muted">Inscription</dt><dd className="font-medium">{selectedUser.registered}</dd></div>
          </dl>
          <div className="mt-6 space-y-2">
            <Button className="w-full">Éditer</Button>
            <Button variant="outline" className="w-full !border-red-300 !text-red-600">Désactiver</Button>
            <Button variant="danger" className="w-full">Supprimer</Button>
            <Button variant="outline" className="w-full"><MessageSquare className="h-4 w-4" /> Envoyer message</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
