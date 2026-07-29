import { useState } from 'react'
import { Search, MapPin, Users, Monitor, Wifi, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Badge } from '../components/ui/Badge'

type RoomStatus = 'available' | 'occupied' | 'reserved'
type RoomType = 'Amphithéâtre' | 'Salle TP' | 'Salle TD' | 'Labo' | 'Salle Conf'

interface Classroom {
  id: string
  name: string
  building: string
  floor: number
  type: RoomType
  capacity: number
  status: RoomStatus
  equipment: string[]
  currentOccupant?: string
  nextAvailable?: string
  reservations: { time: string; course: string; teacher: string }[]
}

const mockClassrooms: Classroom[] = [
  {
    id: 'A101',
    name: 'Salle A101',
    building: 'Bâtiment A',
    floor: 1,
    type: 'Salle TD',
    capacity: 30,
    status: 'available',
    equipment: ['Projecteur', 'Tableau blanc', 'WiFi'],
    reservations: [
      { time: '14:00 - 16:00', course: 'Algorithmique', teacher: 'Dr. Martin' },
      { time: '16:00 - 18:00', course: 'Base de Données', teacher: 'Dr. Dubois' },
    ]
  },
  {
    id: 'A204',
    name: 'Salle A204',
    building: 'Bâtiment A',
    floor: 2,
    type: 'Salle TP',
    capacity: 25,
    status: 'occupied',
    equipment: ['30 PC', 'Projecteur', 'Climatisation', 'WiFi'],
    currentOccupant: 'Programmation Web - Pr. Lambert',
    nextAvailable: '12:00',
    reservations: [
      { time: '08:00 - 10:00', course: 'Programmation Web', teacher: 'Pr. Lambert' },
      { time: '10:00 - 12:00', course: 'Algorithmique', teacher: 'Dr. Martin' },
    ]
  },
  {
    id: 'B105',
    name: 'Amphi B105',
    building: 'Bâtiment B',
    floor: 1,
    type: 'Amphithéâtre',
    capacity: 150,
    status: 'available',
    equipment: ['Projecteur HD', 'Sonorisation', 'Micro', 'WiFi', 'Enregistrement'],
    reservations: []
  },
  {
    id: 'C301',
    name: 'Labo C301',
    building: 'Bâtiment C',
    floor: 3,
    type: 'Labo',
    capacity: 20,
    status: 'reserved',
    equipment: ['Équipement réseau', 'Serveurs', 'Switch', 'WiFi'],
    currentOccupant: 'TP Réseaux - Dr. Chen',
    nextAvailable: '16:00',
    reservations: [
      { time: '14:00 - 16:00', course: 'Réseaux Avancés', teacher: 'Dr. Chen' },
    ]
  },
  {
    id: 'A303',
    name: 'Salle A303',
    building: 'Bâtiment A',
    floor: 3,
    type: 'Salle TD',
    capacity: 35,
    status: 'available',
    equipment: ['Projecteur', 'Tableau blanc', 'WiFi'],
    reservations: []
  },
  {
    id: 'B202',
    name: 'Salle Conf B202',
    building: 'Bâtiment B',
    floor: 2,
    type: 'Salle Conf',
    capacity: 50,
    status: 'occupied',
    equipment: ['Visioconf', 'Écran tactile', 'Tableau interactif', 'WiFi'],
    currentOccupant: 'Réunion pédagogique',
    nextAvailable: '11:30',
    reservations: [
      { time: '09:00 - 11:30', course: 'Réunion pédagogique', teacher: 'Administration' },
    ]
  },
]

const statusConfig: Record<RoomStatus, { label: string; variant: 'success' | 'danger' | 'warning'; icon: any; color: string }> = {
  available: { label: 'Disponible', variant: 'success', icon: CheckCircle, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  occupied: { label: 'Occupée', variant: 'danger', icon: XCircle, color: 'bg-red-50 border-red-200 text-red-700' },
  reserved: { label: 'Réservée', variant: 'warning', icon: AlertCircle, color: 'bg-amber-50 border-amber-200 text-amber-700' },
}

export default function ClassroomsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<RoomType | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<RoomStatus | 'all'>('all')
  const [selectedRoom, setSelectedRoom] = useState<Classroom | null>(null)

  const filtered = mockClassrooms.filter(room => {
    const matchSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       room.building.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = filterType === 'all' || room.type === filterType
    const matchStatus = filterStatus === 'all' || room.status === filterStatus
    return matchSearch && matchType && matchStatus
  })

  const stats = {
    total: mockClassrooms.length,
    available: mockClassrooms.filter(r => r.status === 'available').length,
    occupied: mockClassrooms.filter(r => r.status === 'occupied').length,
    reserved: mockClassrooms.filter(r => r.status === 'reserved').length,
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Gestion des salles</h1>
            <p className="text-sm text-[#6b7280] mt-0.5">Disponibilité et réservation en temps réel</p>
          </div>
          <button className="rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
            Réserver une salle
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Rechercher une salle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#e5e7eb] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors"
            />
          </div>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors">
            <option value="all">Tous les types</option>
            <option value="Amphithéâtre">Amphithéâtre</option>
            <option value="Salle TP">Salle TP</option>
            <option value="Salle TD">Salle TD</option>
            <option value="Labo">Laboratoire</option>
            <option value="Salle Conf">Salle Conférence</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm outline-none focus:border-[#1e3a8a] transition-colors">
            <option value="all">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="occupied">Occupée</option>
            <option value="reserved">Réservée</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff3ff]">
              <MapPin className="h-5 w-5 text-[#1e3a8a]" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#111827]">{stats.total}</p>
              <p className="text-xs text-[#6b7280]">Salles totales</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-600">{stats.available}</p>
              <p className="text-xs text-[#6b7280]">Disponibles</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-red-600">{stats.occupied}</p>
              <p className="text-xs text-[#6b7280]">Occupées</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-amber-600">{stats.reserved}</p>
              <p className="text-xs text-[#6b7280]">Réservées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(room => {
          const config = statusConfig[room.status]
          const StatusIcon = config.icon
          return (
            <div 
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
              {/* Header */}
              <div className={`p-4 border-b border-[#e5e7eb] ${config.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold">{room.name}</h3>
                    <p className="text-xs opacity-80 mt-0.5">{room.building} · Étage {room.floor}</p>
                  </div>
                  <StatusIcon className="h-5 w-5" />
                </div>
                <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">Type</span>
                  <span className="font-semibold text-[#111827]">{room.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280] flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> Capacité
                  </span>
                  <span className="font-semibold text-[#111827]">{room.capacity} places</span>
                </div>

                {/* Equipment */}
                <div>
                  <p className="text-xs font-semibold text-[#6b7280] mb-1.5">Équipements</p>
                  <div className="flex flex-wrap gap-1">
                    {room.equipment.slice(0, 3).map((eq, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-2 py-0.5 text-xs text-[#374151]">
                        {eq.includes('PC') || eq.includes('Projecteur') ? <Monitor className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
                        {eq}
                      </span>
                    ))}
                    {room.equipment.length > 3 && (
                      <span className="inline-flex items-center rounded-md bg-[#f9fafb] border border-[#e5e7eb] px-2 py-0.5 text-xs text-[#6b7280]">
                        +{room.equipment.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Current status info */}
                {room.status === 'occupied' && room.currentOccupant && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-2">
                    <p className="text-xs font-semibold text-red-900 mb-0.5">En cours</p>
                    <p className="text-xs text-red-700">{room.currentOccupant}</p>
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Libre à {room.nextAvailable}
                    </p>
                  </div>
                )}

                {room.status === 'available' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* handle reservation */ }}
                    className="w-full rounded-lg bg-[#1e3a8a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
                    Réserver maintenant
                  </button>
                )}

                {room.status === 'reserved' && room.currentOccupant && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-2">
                    <p className="text-xs font-semibold text-amber-900 mb-0.5">Réservation en cours</p>
                    <p className="text-xs text-amber-700">{room.currentOccupant}</p>
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Jusqu'à {room.nextAvailable}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedRoom(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={`p-6 ${statusConfig[selectedRoom.status].color}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-extrabold mb-1">{selectedRoom.name}</h2>
                  <p className="text-sm opacity-80">{selectedRoom.building} · Étage {selectedRoom.floor}</p>
                </div>
                <button onClick={() => setSelectedRoom(null)} 
                  className="rounded-lg p-2 hover:bg-black/10 transition-colors">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <Badge variant={statusConfig[selectedRoom.status].variant}>
                {statusConfig[selectedRoom.status].label}
              </Badge>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-[#f9fafb] border border-[#e5e7eb] p-3">
                  <p className="text-xs text-[#6b7280] mb-1">Type de salle</p>
                  <p className="font-semibold text-[#111827]">{selectedRoom.type}</p>
                </div>
                <div className="rounded-lg bg-[#f9fafb] border border-[#e5e7eb] p-3">
                  <p className="text-xs text-[#6b7280] mb-1">Capacité</p>
                  <p className="font-semibold text-[#111827] flex items-center gap-1">
                    <Users className="h-4 w-4" /> {selectedRoom.capacity} places
                  </p>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-2">Équipements disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.equipment.map((eq, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 rounded-lg bg-[#eff3ff] border border-[#1e3a8a]/20 px-3 py-1.5 text-sm text-[#1e3a8a]">
                      <Monitor className="h-4 w-4" />
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reservations */}
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#1e3a8a]" />
                  Planning du jour
                </h3>
                {selectedRoom.reservations.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRoom.reservations.map((res, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#f9fafb] border border-[#e5e7eb]">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-[#6b7280]" />
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">{res.course}</p>
                            <p className="text-xs text-[#6b7280]">{res.teacher}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[#6b7280]">{res.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-[#6b7280]">
                    Aucune réservation pour aujourd'hui
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#e5e7eb]">
                <button onClick={() => setSelectedRoom(null)}
                  className="flex-1 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                  Fermer
                </button>
                {selectedRoom.status === 'available' && (
                  <button className="flex-1 rounded-lg bg-[#1e3a8a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
                    Réserver cette salle
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
