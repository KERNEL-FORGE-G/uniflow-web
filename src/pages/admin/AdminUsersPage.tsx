import { useState } from 'react'
import { Search, Plus, Edit2, Trash2, X, Check, Filter, Download, ChevronUp, ChevronDown } from 'lucide-react'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'

type Role = 'student' | 'delegate' | 'teacher' | 'admin'
type Status = 'active' | 'inactive' | 'suspended'

interface User {
  id: string; name: string; email: string; role: Role; status: Status
  filiere?: string; niveau?: string; phone: string; createdAt: string
}

const roleConfig: Record<Role, { label: string; variant: 'primary'|'success'|'warning'|'info'; emoji: string }> = {
  student:  { label: 'Étudiant',    variant: 'primary', emoji: '🎓' },
  delegate: { label: 'Délégué',     variant: 'info',    emoji: '📢' },
  teacher:  { label: 'Enseignant',  variant: 'success', emoji: '👨‍🏫' },
  admin:    { label: 'Admin',       variant: 'warning', emoji: '⚙️' },
}
const statusConfig: Record<Status, { label: string; color: string }> = {
  active:    { label: 'Actif',     color: 'bg-emerald-100 text-emerald-700' },
  inactive:  { label: 'Inactif',   color: 'bg-gray-100 text-gray-600' },
  suspended: { label: 'Suspendu',  color: 'bg-red-100 text-red-700' },
}

const mockUsers: User[] = [
  { id: 'U001', name: 'Emma Martin',      email: 'emma.martin@uniflow.edu',      role: 'student',  status: 'active',   filiere: 'Informatique', niveau: 'L2', phone: '+237 612 345 678', createdAt: '12 Sep 2023' },
  { id: 'U002', name: 'Lucas Dubois',     email: 'lucas.dubois@uniflow.edu',     role: 'delegate', status: 'active',   filiere: 'Informatique', niveau: 'L2', phone: '+237 655 443 322', createdAt: '12 Sep 2023' },
  { id: 'U003', name: 'Pr. Kamga',        email: 'kamga@uniflow.edu',            role: 'teacher',  status: 'active',   filiere: 'Informatique', niveau: 'L2/L3', phone: '+237 679 012 345', createdAt: '01 Sep 2021' },
  { id: 'U004', name: 'Chloé Dubois',     email: 'chloe.dubois@uniflow.edu',     role: 'student',  status: 'active',   filiere: 'Mathématiques', niveau: 'L1', phone: '+237 612 000 111', createdAt: '15 Sep 2023' },
  { id: 'U005', name: 'Hugo Leroy',       email: 'hugo.leroy@uniflow.edu',       role: 'student',  status: 'suspended',filiere: 'Économie',     niveau: 'L3', phone: '+237 699 123 456', createdAt: '10 Sep 2022' },
  { id: 'U006', name: 'Dr. Benkacem',     email: 'benkacem@uniflow.edu',         role: 'teacher',  status: 'active',   filiere: 'Informatique', niveau: 'L2', phone: '+237 678 456 789', createdAt: '01 Sep 2020' },
  { id: 'U007', name: 'Marie Nguema',     email: 'marie.nguema@uniflow.edu',     role: 'student',  status: 'active',   filiere: 'Droit',        niveau: 'L1', phone: '+237 611 222 333', createdAt: '14 Sep 2023' },
  { id: 'U008', name: 'Administrateur',   email: 'admin@uniflow.edu',            role: 'admin',    status: 'active',   phone: '+237 657 635 644', createdAt: '01 Jan 2020' },
]

const emptyForm = { name: '', email: '', role: 'student' as Role, status: 'active' as Status, filiere: 'Informatique', niveau: 'L2', phone: '' }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'createdAt'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [toDelete, setToDelete] = useState<User | null>(null)

  const filtered = users
    .filter(u => {
      const q = search.toLowerCase()
      return (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
        && (roleFilter === 'all' || u.role === roleFilter)
        && (statusFilter === 'all' || u.status === statusFilter)
    })
    .sort((a, b) => {
      const v = sortDir === 'asc' ? 1 : -1
      return a[sortBy] > b[sortBy] ? v : -v
    })

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('asc') }
  }

  const openAdd = () => { setForm(emptyForm); setEditMode(false); setShowModal(true) }
  const openEdit = (u: User) => { setForm({ name: u.name, email: u.email, role: u.role, status: u.status, filiere: u.filiere ?? '', niveau: u.niveau ?? '', phone: u.phone }); setEditMode(true); setSelected(u); setShowModal(true) }
  const saveUser = () => {
    if (editMode && selected) {
      setUsers(prev => prev.map(u => u.id === selected.id ? { ...u, ...form } : u))
    } else {
      const next: User = { id: `U${String(Date.now()).slice(-4)}`, createdAt: new Date().toLocaleDateString('fr-FR'), ...form }
      setUsers(prev => [next, ...prev])
    }
    setShowModal(false)
  }
  const confirmDelete = () => {
    if (toDelete) setUsers(prev => prev.filter(u => u.id !== toDelete.id))
    setToDelete(null)
  }

  const counts = { all: users.length, student: users.filter(u => u.role === 'student').length, delegate: users.filter(u => u.role === 'delegate').length, teacher: users.filter(u => u.role === 'teacher').length, admin: users.filter(u => u.role === 'admin').length }

  const SortIcon = ({ col }: { col: typeof sortBy }) => sortBy === col
    ? (sortDir === 'asc' ? <ChevronUp className="h-3 w-3 inline ml-1" /> : <ChevronDown className="h-3 w-3 inline ml-1" />)
    : <ChevronUp className="h-3 w-3 inline ml-1 opacity-20" />

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Gestion des Utilisateurs</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Total : {users.length} utilisateurs enregistrés</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8]">
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
        {([['all','Tous','bg-[#eff3ff] text-[#1e3a8a]'],['student','Étudiants','bg-blue-50 text-blue-700'],['delegate','Délégués','bg-purple-50 text-purple-700'],['teacher','Enseignants','bg-teal-50 text-teal-700'],['admin','Admins','bg-amber-50 text-amber-700']] as const).map(([k, label, cls]) => (
          <button key={k} onClick={() => setRoleFilter(k as any)}
            className={`rounded-xl border p-3 text-center transition-all ${roleFilter === k ? 'border-[#1e3a8a] ring-2 ring-[#1e3a8a]/20' : 'border-[#e5e7eb] bg-white'} ${cls}`}>
            <p className="text-2xl font-extrabold">{counts[k as keyof typeof counts]}</p>
            <p className="text-xs font-medium mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Filters + search */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher nom, email…"
            className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:bg-white" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
          className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]">
          <option value="all">Tous statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="suspended">Suspendu</option>
        </select>
        <span className="text-xs text-[#9ca3af] flex items-center gap-1"><Filter className="h-3.5 w-3.5" />{filtered.length} résultat(s)</span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#f3f4f6] bg-[#f9fafb]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('name')}>Utilisateur <SortIcon col="name" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('role')}>Rôle <SortIcon col="role" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Filière / Niveau</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('createdAt')}>Inscription <SortIcon col="createdAt" /></th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f9fafb]">
              {filtered.map(u => {
                const rc = roleConfig[u.role]; const sc = statusConfig[u.status]
                return (
                  <tr key={u.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <p className="font-semibold text-[#111827]">{u.name}</p>
                          <p className="text-xs text-[#6b7280]">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={rc.variant}>{rc.emoji} {rc.label}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6b7280]">
                      {u.filiere ? <><p className="font-medium text-[#374151]">{u.filiere}</p><p>{u.niveau}</p></> : <span className="text-[#d1d5db]">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-[#6b7280]">{u.phone}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${sc.color}`}>{sc.label}</span></td>
                    <td className="px-4 py-3 text-xs text-[#6b7280]">{u.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(u)} className="rounded p-1.5 hover:bg-[#eff3ff] text-[#1e3a8a]" title="Modifier"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => setToDelete(u)} className="rounded p-1.5 hover:bg-red-50 text-red-500" title="Supprimer"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-sm text-[#9ca3af] py-12">Aucun utilisateur trouvé.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-[#1e3a8a] px-6 py-4">
              <h2 className="font-bold text-white">{editMode ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/70 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[['Nom complet','name','text'],['Email','email','email'],['Téléphone','phone','tel']].map(([lbl, key, type]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">{lbl}</label>
                  <input type={type} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Rôle</label>
                  <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as Role }))}
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                    {Object.entries(roleConfig).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Statut</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="suspended">Suspendu</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Filière</label>
                  <select value={form.filiere} onChange={e => setForm(f => ({ ...f, filiere: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                    {['Informatique','Mathématiques','Économie','Droit','Médecine','Génie Civil'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">Niveau</label>
                  <select value={form.niveau} onChange={e => setForm(f => ({ ...f, niveau: e.target.value }))}
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                    {['L1','L2','L3','M1','M2','Doctorat'].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">Annuler</button>
                <button onClick={saveUser} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8]">
                  <Check className="h-4 w-4" /> {editMode ? 'Enregistrer' : 'Créer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setToDelete(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-[#111827] mb-2">Supprimer l'utilisateur</h3>
            <p className="text-sm text-[#6b7280] mb-5">Confirmer la suppression de <strong>{toDelete.name}</strong> ? Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setToDelete(null)} className="flex-1 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">Annuler</button>
              <button onClick={confirmDelete} className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
