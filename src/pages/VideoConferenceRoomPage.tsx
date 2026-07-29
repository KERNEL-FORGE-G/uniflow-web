import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Video, Users, Link as LinkIcon, Plus, Play, Clock, Globe, Lock, Wifi, WifiOff, Shield, ArrowRight, Calendar } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { useUserRole } from '../utils/userRole'

interface Meeting {
  id: string
  title: string
  host: string
  participants: number
  status: 'live' | 'scheduled' | 'ended'
  startTime?: string
  date?: string
  isPrivate: boolean
  roomCode: string
}

const mockMeetings: Meeting[] = [
  { id: '1', title: 'Algorithmique L2 — Cours magistral', host: 'Prof. Martin', participants: 45, status: 'live', startTime: '14:00', isPrivate: false, roomCode: 'ALGO-L2-2024' },
  { id: '2', title: 'Bases de données — TD Groupe A', host: 'Dr. Benkacem', participants: 22, status: 'live', startTime: '15:30', isPrivate: false, roomCode: 'BDD-TDA-2024' },
  { id: '3', title: 'Réunion délégués L2 Informatique', host: 'Lucas Dubois', participants: 8, status: 'live', startTime: '16:45', isPrivate: true, roomCode: 'DEL-INFO-2024' },
  { id: '4', title: 'Intelligence Artificielle L3', host: 'Pr. Lefèvre', participants: 0, status: 'scheduled', date: 'Demain 10:00', isPrivate: false, roomCode: 'IA-L3-2024' },
]

export default function VideoConferenceRoomPage() {
  const navigate = useNavigate()
  const { currentRole, isOfflineMode } = useUserRole()
  const [roomCode, setRoomCode] = useState('')
  const [createMode, setCreateMode] = useState(false)
  const [meetingTitle, setMeetingTitle] = useState('')
  const [isPrivateMeeting, setIsPrivateMeeting] = useState(false)

  const handleJoinMeeting = (meeting?: Meeting) => {
    if (meeting || roomCode) {
      navigate('/app/visio')
    }
  }

  const handleCreateMeeting = () => {
    if (meetingTitle.trim()) {
      // Simuler la création et rejoindre immédiatement
      navigate('/app/visio')
    }
  }

  const canCreateMeeting = currentRole === 'teacher' || currentRole === 'delegate'

  const liveMeetings = mockMeetings.filter(m => m.status === 'live')
  const scheduledMeetings = mockMeetings.filter(m => m.status === 'scheduled')

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Visioconférence</h1>
          <p className="text-sm text-[#6b7280] mt-1">Créez ou rejoignez une réunion vidéo en direct</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
            isOfflineMode 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {isOfflineMode ? <Wifi className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
            {isOfflineMode ? 'Réseau Local (LAN)' : 'Internet'}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rejoindre une réunion */}
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="rounded-lg bg-[#eff3ff] p-2.5">
              <Play className="h-6 w-6 text-[#1e3a8a]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#111827]">Rejoindre une réunion</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">Entrez le code de la réunion pour rejoindre</p>
            </div>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="CODE-REUNION-2024"
              className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-mono uppercase tracking-wider outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleJoinMeeting()}
              disabled={!roomCode.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2d4fa8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <LinkIcon className="h-4 w-4" />
              Rejoindre avec le code
            </button>
          </div>
        </Card>

        {/* Créer une réunion */}
        <Card className={`p-6 ${!canCreateMeeting ? 'opacity-60' : ''}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className="rounded-lg bg-[#f0fdfa] p-2.5">
              <Plus className="h-6 w-6 text-[#0d9488]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#111827]">Créer une réunion</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">
                {canCreateMeeting ? 'Démarrez une nouvelle visioconférence' : 'Réservé aux enseignants et délégués'}
              </p>
            </div>
          </div>
          {canCreateMeeting ? (
            <div className="space-y-3">
              {createMode ? (
                <>
                  <input
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="Titre de la réunion"
                    className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 focus:bg-white transition-all"
                  />
                  <label className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPrivateMeeting}
                      onChange={(e) => setIsPrivateMeeting(e.target.checked)}
                      className="rounded border-[#d1d5db] text-[#0d9488] focus:ring-[#0d9488]"
                    />
                    <Lock className="h-3.5 w-3.5 text-[#6b7280]" />
                    Réunion privée (invitation uniquement)
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCreateMode(false)}
                      className="flex-1 rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                      Annuler
                    </button>
                    <button
                      onClick={handleCreateMeeting}
                      disabled={!meetingTitle.trim()}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#0d9488] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a7167] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      <Video className="h-4 w-4" />
                      Démarrer
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setCreateMode(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0d9488] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a7167] transition-colors">
                  <Plus className="h-4 w-4" />
                  Créer une nouvelle réunion
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-4 text-sm text-[#9ca3af]">
              <Shield className="h-4 w-4 mr-2" />
              Fonctionnalité réservée
            </div>
          )}
        </Card>
      </div>

      {/* Réunions en direct */}
      {liveMeetings.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Réunions en direct
            </h2>
            <Badge variant="danger" className="animate-pulse">
              {liveMeetings.length} en cours
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleJoinMeeting(meeting)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#111827] text-sm truncate">{meeting.title}</h3>
                      {meeting.isPrivate && <Lock className="h-3.5 w-3.5 text-[#6b7280] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#6b7280]">
                      <span className="font-medium">{meeting.host}</span>
                    </p>
                  </div>
                  <Badge variant="danger" className="shrink-0">
                    EN DIRECT
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="flex items-center gap-1.5 text-[#6b7280]">
                    <Users className="h-3.5 w-3.5" />
                    {meeting.participants} participants
                  </span>
                  <span className="flex items-center gap-1.5 text-[#6b7280]">
                    <Clock className="h-3.5 w-3.5" />
                    {meeting.startTime}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#f3f4f6]">
                  <code className="text-[10px] font-mono text-[#6b7280] bg-[#f9fafb] px-2 py-1 rounded">
                    {meeting.roomCode}
                  </code>
                  <button className="flex items-center gap-1 text-xs font-medium text-[#1e3a8a] group-hover:text-[#0d9488] transition-colors">
                    Rejoindre <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Réunions programmées */}
      {scheduledMeetings.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#111827]">Réunions programmées</h2>
          </div>
          <div className="space-y-3">
            {scheduledMeetings.map((meeting) => (
              <Card key={meeting.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="rounded-lg bg-[#f9fafb] p-3 shrink-0">
                      <Calendar className="h-5 w-5 text-[#6b7280]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#111827] text-sm truncate">{meeting.title}</h3>
                        {meeting.isPrivate && <Lock className="h-3.5 w-3.5 text-[#6b7280] shrink-0" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#6b7280]">
                        <span>{meeting.host}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {meeting.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="warning">Programmée</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Info offline mode */}
      {isOfflineMode && (
        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <div className="flex gap-3">
            <Wifi className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-emerald-900 mb-1">Mode Réseau Local activé</h3>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Vous êtes connecté au réseau local du campus. La visioconférence fonctionne sans consommer votre forfait data mobile. 
                Profitez de la qualité HD sans frais supplémentaires.
              </p>
            </div>
          </div>
        </Card>
      )}

      {!isOfflineMode && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex gap-3">
            <WifiOff className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900 mb-1">Conseil data mobile</h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                Vous utilisez Internet mobile. Activez le <strong>Mode Éco</strong> dans les paramètres de visioconférence 
                pour réduire la consommation de données jusqu'à 92% (8 Ko/s au lieu de 100 Ko/s en HD).
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
