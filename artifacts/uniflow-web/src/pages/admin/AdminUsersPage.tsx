import { useState } from 'react'
import { Search, Plus, Edit, Trash2, X, Save } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'Étudiant' | 'Enseignant' | 'Admin' | 'Délégué'
  status: 'Actif' | 'Inactif'
  created: string
}

const mockUsers: User[] = [
  { id: '1', name: 'Emma Martin', email: 'emma@uniflow.edu', role: 'Étudiant', status: 'Actif', created: 'Jan 2026' },
  { id: '2', name: 'Lucas Dubois', email: 'lucas@uniflow.edu', role: 'Délégué', status: 'Actif', created: 'Jan 2026' },
  { id: '3', name: 'Dr. Kamga', email: 'kamga@uniflow.edu', role: 'Enseignant', status: 'Actif', created: 'Sep 2025' },
  { id: '4', name: 'Admin Principal', email: 'admin@uniflow.edu', role: 'Admin', status: 'Actif', created: 'Jan 2025' },
  { id: '5', name: 'Sophie Bernard', email: 'sophie@uniflow.edu', role: 'Étudiant', status: 'Actif', created: 'Fév 2026' },
]

const roleColors: Record<string, string> = {
  Étudiant: 'bg-[#eff3ff] text-[#1e3a8a] border-[#1e3a8a]/20',
  Enseignant: 'bg-[#f0fdfa] text-[#0d9488] border-[#0d9488]/20',
  Admin: 'bg-amber-50 text-amber-700 border-amber-200',
  Délégué: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<string>('Tous')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'Étudiant' as User['role'], status: 'Actif' as User['status'] })

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === 'Tous' || u.role === filterRole
    return matchSearch && matchRole
  })

  const handleAdd = () => {
    setEditingUser(null)
    setForm({ name: '', email: '', role: 'Étudiant', status: 'Actif' })
    setShowModal(true)
  }

  const handleEdit = (u: User) => {
    setEditingUser(u)
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status })
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...form } : u))
    } else {
      setUsers([...users, { id: Date.now().toString(), ...form, created: new Date().toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Gestion des utilisateurs</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">{users.length} utilisateurs · Tous rôles</p>
        </div>
        <button onClick={handleAdd}
          className="flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-all shadow-md">
          <Plus className="h-4 w-4" /> Ajouter un utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="w-full rounded-xl border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/10"
          />
        </div>
        <div className="flex gap-2">
          {['Tous', 'Étudiant', 'Enseignant', 'Délégué', 'Admin'].map(r => (
            <button key={r} onClick={() => setFilterRole(r)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                filterRole === r
                  ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
                  : 'border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb]'
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <th className="py-3.5 px-5 text-left font-bold text-[#111827]">Utilisateur</th>
                <th className="py-3.5 px-5 text-left font-bold text-[#111827]">Email</th>
                <th className="py-3.5 px-5 text-center font-bold text-[#111827]">Rôle</th>
                <th className="py-3.5 px-5 text-center font-bold text-[#111827]">Statut</th>
                <th className="py-3.5 px-5 text-center font-bold text-[#111827]">Créé</th>
                <th className="py-3.5 px-5 text-center font-bold text-[#111827]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eff3ff] text-xs font-bold text-[#1e3a8a]">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-[#111827]">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-[#6b7280]">{u.email}</td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${u.status === 'Actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center text-[#6b7280]">{u.created}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(u)}
                        className="rounded-lg p-2 text-[#1e3a8a] hover:bg-[#eff3ff] transition-colors"
                        title="Modifier">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                        title="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#9ca3af]">
            Aucun utilisateur trouvé.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#111827]">
                {editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
              </h2>
              <button onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-[#9ca3af] hover:bg-[#f3f4f6] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Nom complet</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/10" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/10" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Rôle</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value as User['role']})}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                  <option>Étudiant</option>
                  <option>Enseignant</option>
                  <option>Délégué</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Statut</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value as User['status']})}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#f9fafb] transition-colors">
                Annuler
              </button>
              <button onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-bold text-white hover:bg-[#2d4fa8] transition-colors">
                <Save className="h-4 w-4" /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
