import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Users,
  MessageSquare,
  MoreHorizontal,
  PhoneOff,
  Radio,
  HardDrive,
  Shield,
  VolumeX,
  Hand,
  Download,
  AlertCircle,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react'
import { useUserRole } from '../utils/userRole'
import { Avatar } from '../components/ui/Avatar'

const translations = {
  FR: {
    live: "EN DIRECT",
    localLan: "Réseau Local LiveKit (LAN/mDNS)",
    cloudSync: "Synchro Cloud Internet (Payant)",
    ecoMode: "Mode Éco (Audio seul — 8 Ko/s)",
    ecoActive: "Éco Activé (8 Ko/s)",
    participants: "Participants",
    chat: "Discussion",
    hostPanel: "Console de Modération (Enseignant)",
    muteAll: "Couper tous les micros",
    stopAllVideo: "Forcer Audio-Seul (Économiser la Bande Passante)",
    startRec: "Lancer l'Enregistrement LAN",
    stopRec: "Arrêter l'Enregistrement",
    recording: "ENREGISTREMENT EN COURS",
    placeholderMsg: "Écrire un message...",
    leave: "Quitter",
    handRaised: "Main Levée",
    raiseHand: "Lever la main",
    presenter: "Présentateur",
    spectator: "Spectateur",
    you: "Vous",
    connectedLAN: "Intranet local (Consommation Internet : 0 Mo)",
    connectedCloud: "Cloud (Consommation Internet élevée)",
    dataSavedMsg: "Félicitations ! En activant l'Audio-Seul (8 Ko/s), vous économisez environ 92% de vos données mobiles par rapport à un flux vidéo HD classique.",
    hostActions: "Actions d'Hôte",
    raisedHandNotify: "a levé la main pour poser une question.",
    noLocalCost: "Astuce Cameroun : Connectez-vous au Wi-Fi local du campus pour un flux vidéo gratuit sans forfait data !",
    addMsgBtn: "Envoyer",
  },
  EN: {
    live: "LIVE",
    localLan: "Local LiveKit Network (LAN/mDNS)",
    cloudSync: "Cloud Internet Sync (Paid Data)",
    ecoMode: "Data Saver Mode (Audio only — 8 KB/s)",
    ecoActive: "Data Saver Active (8 KB/s)",
    participants: "Participants",
    chat: "Chat",
    hostPanel: "Moderator Console (Teacher)",
    muteAll: "Mute All Microphones",
    stopAllVideo: "Force Audio-Only (Save Campus Bandwidth)",
    startRec: "Start LAN Recording",
    stopRec: "Stop Recording",
    recording: "RECORDING IN PROGRESS",
    placeholderMsg: "Type a message...",
    leave: "Leave",
    handRaised: "Hand Raised",
    raiseHand: "Raise Hand",
    presenter: "Presenter",
    spectator: "Spectator",
    you: "You",
    connectedLAN: "Local Intranet (Internet data usage: 0 MB)",
    connectedCloud: "Cloud Network (High mobile data cost)",
    dataSavedMsg: "Congratulations! By enabling Audio-only (8 KB/s), you save approximately 92% of mobile data costs compared to HD video streams.",
    hostActions: "Host Actions",
    raisedHandNotify: "raised their hand to ask a question.",
    noLocalCost: "Cameroon Tip: Connect to the campus local Wi-Fi for free streaming without buying mobile data plans!",
    addMsgBtn: "Send",
  }
}

interface MessageItem {
  id: string
  user: string
  text: string
  time: string
  role: string
}

export default function VideoConfPage() {
  const navigate = useNavigate()
  const { currentRole, language, isOfflineMode } = useUserRole()
  const t = translations[language]

  // Stateful interactions
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [dataSaver, setDataSaver] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [handRaised, setHandRaised] = useState(false)

  // Simulated participant states (for teacher moderations)
  const [participantsMuted, setParticipantsMuted] = useState(false)
  const [participantsVideoForcedOff, setParticipantsVideoForcedOff] = useState(false)

  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat')
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<MessageItem[]>([
    { id: '1', user: 'Sarah Kamga', text: language === 'FR' ? 'Bonjour professeur, pouvez-vous répéter la dernière slide ?' : 'Hello professor, could you repeat the last slide?', time: '14:32', role: 'student' },
    { id: '2', user: 'Pr. Martin', text: language === 'FR' ? 'Bien sûr, je reviens sur la complexité O(n log n).' : 'Sure, let me revisit the O(n log n) complexity.', time: '14:33', role: 'teacher' },
    { id: '3', user: 'Lino Ndongo', text: language === 'FR' ? 'Est-ce que le support est disponible en hors-ligne sur le LAN ?' : 'Is the course material available offline on the LAN?', time: '14:34', role: 'delegate' },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const now = new Date()
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    const newMsg: MessageItem = {
      id: Math.random().toString(),
      user: currentRole === 'teacher' ? 'Pr. Martin' : currentRole === 'delegate' ? 'Lino (Délégué)' : 'Vous (Étudiant)',
      text: inputText,
      time: timeString,
      role: currentRole
    }

    setMessages([...messages, newMsg])
    setInputText('')
  }

  // Handle Moderator Actions
  const handleMuteAll = () => {
    setParticipantsMuted(!participantsMuted)
  }

  const handleForceAudioOnly = () => {
    setParticipantsVideoForcedOff(!participantsVideoForcedOff)
    if (!participantsVideoForcedOff) {
      setDataSaver(true) // Also force it locally for maximum bandwidth savings
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Header bar */}
      <header className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3.5 gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-100 text-sm md:text-base tracking-wide uppercase">
                {language === 'FR' ? 'Algorithmique & Structures de Données L2' : 'Algorithms & Data Structures L2'}
              </h1>
              <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20">
                {t.live}
              </span>
            </div>
            {/* Campus LAN mDNS local connectivity badge as specified in Cameroon context */}
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-teal-400 font-medium">
              {isOfflineMode ? (
                <>
                  <Wifi className="h-3.5 w-3.5 animate-pulse" />
                  <span>{t.localLan} — <strong className="text-emerald-400">{t.connectedLAN}</strong></span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5 text-amber-400" />
                  <span>{t.cloudSync} — <strong className="text-amber-400">{t.connectedCloud}</strong></span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Live timers and active recording indicators */}
        <div className="flex items-center gap-3">
          {isRecording && (
            <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 animate-pulse">
              <Radio className="h-3.5 w-3.5" />
              <span>{t.recording}</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 text-sm bg-slate-800 border border-slate-700/60 rounded-lg px-3 py-1 text-slate-300">
            <span className="font-mono text-emerald-400">01:24:35</span>
          </div>

          <div className="flex items-center gap-1 text-xs md:text-sm font-semibold bg-teal-950/40 text-teal-300 border border-teal-800/50 rounded-lg px-3 py-1">
            <Users className="h-4 w-4" />
            <span>42 {t.participants.toLowerCase()}</span>
          </div>
        </div>
      </header>

      {/* Main conference workspace */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Side: Video Feeds and Controls */}
        <div className="flex flex-1 flex-col p-4 overflow-y-auto space-y-4">

          {/* Cameroon mobile data warning notification banner if data saver is off */}
          {!dataSaver && (
            <div className="bg-amber-950/40 border border-amber-900/50 rounded-xl p-3 flex gap-3 text-xs text-amber-200">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
              <div className="space-y-1">
                <p className="font-semibold">{t.noLocalCost}</p>
                <p className="opacity-90">{language === 'FR' ? "Si vous êtes en 3G/4G, activez le 'Mode Éco' pour consommer uniquement l'audio." : "If using 3G/4G, activate 'Data Saver Mode' to stream audio only."}</p>
              </div>
            </div>
          )}

          {/* Interactive banner confirming savings if eco mode is active */}
          {dataSaver && (
            <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-xl p-3 flex gap-3 text-xs text-emerald-200">
              <Sparkles className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold">{t.ecoActive}</p>
                <p className="opacity-90">{t.dataSavedMsg}</p>
              </div>
            </div>
          )}

          {/* Main Presenter Window */}
          <div className="relative flex-1 min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col items-center justify-center">
            {/* If audio-only mode is active, display nice avatar with data saver dashboard */}
            {dataSaver || participantsVideoForcedOff ? (
              <div className="text-center space-y-4 p-6">
                <div className="relative inline-block">
                  <Avatar name="Pr. Martin" size="xl" className="ring-4 ring-teal-500/30" />
                  <span className="absolute bottom-1 right-1 bg-emerald-500 p-1.5 rounded-full ring-4 ring-slate-900">
                    <Mic className="h-4 w-4 text-white" />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-lg">Pr. Martin</h3>
                  <p className="text-xs text-teal-400 mt-1 font-semibold tracking-wide uppercase">{t.presenter} — {t.ecoActive}</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-full px-4 py-1.5 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{language === 'FR' ? 'Flux audio optimisé : ~7.8 Ko/s' : 'Optimized audio feed: ~7.8 KB/s'}</span>
                </div>
              </div>
            ) : (
              // Simulated video placeholder (styled dark/blue video card)
              <div className="w-full h-full flex flex-col items-center justify-center relative bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-950">
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-400">
                  1080p @ 30fps
                </div>

                <div className="text-center space-y-3">
                  <Avatar name="Pr. Martin" size="xl" />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-200">Pr. Martin</p>
                    <p className="text-xs text-slate-400">{language === 'FR' ? 'Partage son écran' : 'Sharing screen'}</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Pr. Martin ({t.presenter})</span>
                </div>
              </div>
            )}
          </div>

          {/* Peer participant rows (Horizontal bar) */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase px-1">
              {language === 'FR' ? 'Participants à Proximité' : 'Nearby Participants'}
            </h3>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {/* Local user card */}
              <div className="relative shrink-0 w-36 h-24 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center">
                <Avatar name={currentRole === 'teacher' ? 'Pr. Martin' : 'Moi'} size="sm" />
                <span className="text-xs font-medium mt-1 truncate max-w-full">
                  {currentRole === 'teacher' ? 'Pr. Martin' : t.you}
                </span>

                {/* Hand raised status overlay */}
                {handRaised && (
                  <span className="absolute top-1.5 right-1.5 bg-yellow-500 text-slate-950 rounded-full p-1 border border-slate-900" title={t.handRaised}>
                    <Hand className="h-3 w-3 fill-slate-950" />
                  </span>
                )}

                {/* Local audio/video indicator overlay */}
                <span className="absolute bottom-1.5 right-1.5 flex gap-1">
                  {isMuted ? (
                    <span className="bg-rose-500/20 text-rose-400 rounded p-0.5 border border-rose-500/30 text-[10px]">
                      <MicOff className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-400 rounded p-0.5 border border-emerald-500/30 text-[10px]">
                      <Mic className="h-2.5 w-2.5" />
                    </span>
                  )}
                </span>
              </div>

              {/* Sarah */}
              <div className="relative shrink-0 w-36 h-24 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center">
                <Avatar name="Sarah" size="sm" />
                <span className="text-xs font-medium mt-1 truncate max-w-full">Sarah Kamga</span>
                <span className="absolute top-1.5 left-1.5 bg-indigo-500/10 text-indigo-300 text-[9px] font-semibold px-1 rounded border border-indigo-500/20">
                  {language === 'FR' ? 'L2 Info' : 'CS L2'}
                </span>
                <span className="absolute bottom-1.5 right-1.5">
                  {participantsMuted ? (
                    <span className="bg-rose-500/20 text-rose-400 rounded p-0.5 border border-rose-500/30">
                      <MicOff className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-400 rounded p-0.5 border border-emerald-500/30">
                      <Mic className="h-2.5 w-2.5" />
                    </span>
                  )}
                </span>
              </div>

              {/* Lino */}
              <div className="relative shrink-0 w-36 h-24 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center">
                <Avatar name="Lino" size="sm" />
                <span className="text-xs font-medium mt-1 truncate max-w-full">Lino Ndongo</span>
                <span className="absolute top-1.5 left-1.5 bg-teal-500/10 text-teal-300 text-[9px] font-semibold px-1 rounded border border-teal-500/20">
                  {language === 'FR' ? 'Délégué' : 'Delegate'}
                </span>
                <span className="absolute bottom-1.5 right-1.5">
                  <span className="bg-rose-500/20 text-rose-400 rounded p-0.5 border border-rose-500/30">
                    <MicOff className="h-2.5 w-2.5" />
                  </span>
                </span>
              </div>

              {/* Yasmine */}
              <div className="relative shrink-0 w-36 h-24 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center">
                <Avatar name="Yasmine" size="sm" />
                <span className="text-xs font-medium mt-1 truncate max-w-full">Yasmine Ngono</span>
                <span className="absolute bottom-1.5 right-1.5">
                  {participantsMuted ? (
                    <span className="bg-rose-500/20 text-rose-400 rounded p-0.5 border border-rose-500/30">
                      <MicOff className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <span className="bg-emerald-500/20 text-emerald-400 rounded p-0.5 border border-emerald-500/30">
                      <Mic className="h-2.5 w-2.5" />
                    </span>
                  )}
                </span>
              </div>

              {/* Remaining counter */}
              <div className="flex h-24 w-36 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-900 border border-slate-800/80 text-sm font-bold text-slate-400">
                <span>+39</span>
                <span className="text-[10px] text-slate-500 font-normal mt-0.5">élèves connectés</span>
              </div>
            </div>
          </div>

          {/* Teacher Host panel displayed ONLY if user is logged as a teacher */}
          {currentRole === 'teacher' && (
            <div className="bg-slate-900 border border-teal-500/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Shield className="h-5 w-5 text-teal-400" />
                <h3 className="font-bold text-sm tracking-wide text-teal-300 uppercase">{t.hostPanel}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={handleMuteAll}
                  className={`flex items-center gap-2.5 justify-center px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    participantsMuted
                      ? 'bg-rose-600 border-rose-500 text-white hover:bg-rose-700'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <VolumeX className="h-4 w-4" />
                  <span>{participantsMuted ? (language === 'FR' ? "Rétablir les micros" : "Unmute All") : t.muteAll}</span>
                </button>

                <button
                  type="button"
                  onClick={handleForceAudioOnly}
                  className={`flex items-center gap-2.5 justify-center px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    participantsVideoForcedOff
                      ? 'bg-teal-600 border-teal-500 text-white hover:bg-teal-700'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <VideoOff className="h-4 w-4" />
                  <span>{participantsVideoForcedOff ? (language === 'FR' ? "Rétablir la Vidéo" : "Allow Video streams") : t.stopAllVideo}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`flex items-center gap-2.5 justify-center px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    isRecording
                      ? 'bg-red-600 border-red-500 text-white hover:bg-red-700'
                      : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700'
                  }`}
                >
                  <HardDrive className="h-4 w-4" />
                  <span>{isRecording ? t.stopRec : t.startRec}</span>
                </button>
              </div>

              {/* Quick info about local recording space */}
              <p className="text-[11px] text-slate-400">
                {language === 'FR'
                  ? "✓ L'enregistrement local est stocké sur le serveur du campus pour économiser la bande passante internet. Un lien sera généré automatiquement."
                  : "✓ Local recording is stored directly on the campus LAN server. A link will be made available shortly."}
              </p>
            </div>
          )}

        </div>

        {/* Right Side Panel: Chat / Participants */}
        <aside className="hidden lg:flex w-96 flex-col border-l border-slate-800 bg-slate-900">
          {/* Tabs header */}
          <div className="flex border-b border-slate-800 text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 text-center font-semibold transition-all border-b-2 ${
                activeTab === 'chat'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/20'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {t.chat} ({messages.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-4 text-center font-semibold transition-all border-b-2 ${
                activeTab === 'participants'
                  ? 'border-teal-500 text-teal-400 bg-slate-800/20'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {t.participants} (42)
            </button>
          </div>

          {activeTab === 'chat' ? (
            <>
              {/* Message Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar name={m.user} size="sm" />
                        <span className={`font-bold ${
                          m.role === 'teacher'
                            ? 'text-teal-400'
                            : m.role === 'delegate'
                              ? 'text-indigo-400'
                              : 'text-slate-300'
                        }`}>
                          {m.user}
                        </span>

                        {m.role === 'teacher' && (
                          <span className="bg-teal-500/10 text-teal-400 text-[9px] px-1 rounded uppercase font-semibold">
                            Prof
                          </span>
                        )}
                        {m.role === 'delegate' && (
                          <span className="bg-indigo-500/10 text-indigo-400 text-[9px] px-1 rounded uppercase font-semibold">
                            Deleg
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{m.time}</span>
                    </div>
                    <p className="mt-1 ml-7 text-slate-300 bg-slate-950/40 p-2 rounded-xl border border-slate-850">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="border-t border-slate-850 p-4 bg-slate-950/60">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t.placeholderMsg}
                    className="flex-1 rounded-xl bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-700/50"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-teal-950/20"
                  >
                    {t.addMsgBtn}
                  </button>
                </div>
              </form>
            </>
          ) : (
            // Participants view list
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-xs text-slate-400 font-semibold px-1 pb-1">
                {language === 'FR' ? 'LISTE DES ÉLÈVES EN LIGNE' : 'ONLINE STUDENTS LIST'}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <Avatar name="Pr. Martin" size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Pr. Martin</div>
                      <div className="text-[10px] text-teal-400">{t.presenter}</div>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <Avatar name="Lino Ndongo" size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Lino Ndongo</div>
                      <div className="text-[10px] text-indigo-400">{language === 'FR' ? 'Délégué — L2' : 'Delegate — L2'}</div>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <Avatar name="Sarah" size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Sarah Kamga</div>
                      <div className="text-[10px] text-slate-400">{t.spectator}</div>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <Avatar name="Yasmine" size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Yasmine Ngono</div>
                      <div className="text-[10px] text-slate-400">{t.spectator}</div>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Main Bottom Control Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-900 px-6 py-4">

        {/* Toggle between Audio-Only (8KB/s) low mobile internet saver mode */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setDataSaver(!dataSaver)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              dataSaver
                ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md shadow-teal-950/10'
                : 'bg-slate-800 border-slate-700/60 text-slate-400 hover:text-slate-300'
            }`}
          >
            <Download className="h-4 w-4" />
            <span>{t.ecoMode}</span>
          </button>
        </div>

        {/* Call stream toggles (Mute, Camera, Raise Hand) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`rounded-xl p-3 border transition-all ${
              isMuted
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                : 'bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-700'
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`rounded-xl p-3 border transition-all ${
              isVideoOff
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                : 'bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-700'
            }`}
            title={isVideoOff ? "Start Video" : "Stop Video"}
          >
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </button>

          {/* Student/Delegate hand-raising utility */}
          {currentRole !== 'teacher' && (
            <button
              type="button"
              onClick={() => setHandRaised(!handRaised)}
              className={`rounded-xl p-3 border transition-all ${
                handRaised
                  ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                  : 'bg-slate-800 border-slate-750 text-slate-300 hover:bg-slate-700'
              }`}
              title={t.raiseHand}
            >
              <Hand className={`h-5 w-5 ${handRaised ? 'fill-yellow-400' : ''}`} />
            </button>
          )}

          {/* Standard layout settings triggers */}
          <button type="button" className="hidden sm:inline-flex rounded-xl bg-slate-800 border border-slate-750 p-3 text-slate-300 hover:bg-slate-700">
            <MonitorUp className="h-5 w-5" />
          </button>

          <button type="button" className="lg:hidden rounded-xl bg-slate-800 border border-slate-750 p-3 text-slate-300 hover:bg-slate-700">
            <MessageSquare className="h-5 w-5" />
          </button>

          <button type="button" className="rounded-xl bg-slate-800 border border-slate-750 p-3 text-slate-300 hover:bg-slate-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Exit Call */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="flex items-center gap-2 rounded-xl bg-rose-600 border border-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-950/20 hover:bg-rose-500 hover:border-rose-400 transition-all"
          >
            <PhoneOff className="h-4 w-4" />
            <span>{t.leave}</span>
          </button>
        </div>

      </footer>
    </div>
  )
}
