import { Search, MapPin, Users, Clock, CheckCircle, AlertCircle, DoorOpen } from 'lucide-react'
import { useState } from 'react'

interface Classroom {
  id: string
  name: string
  building: string
  capacity: number
  type: 'CM' | 'TD' | 'TP' | 'Labo'
  equipment: string[]
  status: 'Disponible' | 'Occupée' | 'Maintenance'
  currentCourse?: string
  nextFree?: string
}

const mockClassrooms: Classroom[] = [
  { id: '1', name: 'Salle A204', building: 'Bâtiment A', capacity: 120, type: 'CM', equipment: ['Projecteur', 'Micro', 'Tableau blanc'], status: 'Occupée', currentCourse: 'Algorithmique L2', nextFree: '12:15' },
  { id: '2', name: 'Salle B101', building: 'Bâtiment B', capacity: 60, type: 'TD', equipment: ['Projecteur', 'Tableau blanc'], status: 'Disponible' },
  { id: '3', name: 'Labo C205', building: 'Bâtiment C', capacity: 40, type: 'Labo', equipment: ['30 PC', 'Réseau local', 'Serveur'], status: 'Disponible' },
  { id: '4', name: 'Salle A305', building: 'Bâtiment A', capacity: 80, type: 'CM', equipment: ['Projecteur', 'Sono'], status: 'Occupée', currentCourse: 'Économie S1', nextFree: '14:00' },
  { id: '5', name: 'Labo Réseaux', building: 'Bâtiment C', capacity: 30, type: 'TP', equipment: ['25 PC', 'Switches', 'Routeurs'], status: 'Maintenance' },
  { id: '6', name: 'Salle P207', building: 'Bâtiment P', capacity: 50, type: 'TD', equipment: ['Tableau blanc', 'Projecteur'], status: 'Disponible' },
]

const typeColors: Record<string, string> = {
  CM: 'bg-[#eff3ff] text-[#1e3a8a]',
  TD: 'bg-[#f0fdfa] text-[#0d9488]',
  TP: 'bg-amber-50 text-amber-700',
  Labo: 'bg-purple-50 text-purple-700',
}

const statusConfig = {
  Disponible: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  Occupée: { color: 'bg-amber-100 text-amber-700', icon: Clock },
  Maintenance: { color: 'bg-red-100 text-red-700', icon: AlertCircle },
}

export default function ClassroomsPage() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('Tous')

  const filtered = mockClassrooms.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.building.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'Tous' || r.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Salles de cours</h1>
        <p className="text-sm text-[#6b7280] mt-0.5">{mockClassrooms.length} salles · Campus Yaoundé</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une salle..."
            className="w-full rounded-xl border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/10" />
        </div>
        <div className="flex gap-2">
          {['Tous', 'Disponible', 'Occupée', 'Maintenance'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                filterStatus === s
                  ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
                  : 'border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f9fafb]'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(room => {
          const StatusIcon = statusConfig[room.status].icon
          return (
            <div key={room.id} className="group rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm hover:shadow-md hover:border-[#1e3a8a]/30 transition-all">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff3ff]">
                  <DoorOpen className="h-6 w-6 text-[#1e3a8a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#111827] text-base">{room.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b7280] mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {room.building}
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${typeColors[room.type]}`}>
                  {room.type}
                </span>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#374151]">
                  <Users className="h-4 w-4 text-[#9ca3af]" />
                  <span className="font-medium">{room.capacity} places</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${statusConfig[room.status].color.replace('bg-', 'text-').replace('/100', '-600')}`} />
                  <span className={`text-xs font-semibold ${statusConfig[room.status].color.replace('bg-', 'text-').replace('/100', '-700')}`}>
                    {room.status}
                  </span>
                  {room.nextFree && (
                    <span className="text-xs text-[#9ca3af]">· Libre à {room.nextFree}</span>
                  )}
                </div>
              </div>

              {room.currentCourse && (
                <div className="rounded-lg bg-[#f9fafb] border border-[#e5e7eb] px-3 py-2 mb-3">
                  <p className="text-xs font-semibold text-[#111827]">{room.currentCourse}</p>
                  <p className="text-[10px] text-[#9ca3af] mt-0.5">En cours maintenant</p>
                </div>
              )}

              <div className="border-t border-[#f3f4f6] pt-3">
                <p className="text-xs font-semibold text-[#6b7280] mb-2">Équipements</p>
                <div className="flex flex-wrap gap-1.5">
                  {room.equipment.map(e => (
                    <span key={e} className="rounded-md bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-medium text-[#6b7280]">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-12 text-center shadow-sm">
          <DoorOpen className="mx-auto h-12 w-12 text-[#e5e7eb] mb-3" />
          <p className="text-sm text-[#9ca3af]">Aucune salle trouvée.</p>
        </div>
      )}
    </div>
  )
}
