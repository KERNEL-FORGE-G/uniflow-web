import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic, MicOff, Video, VideoOff, MonitorUp, Users, MessageSquare,
  MoreHorizontal, PhoneOff, Radio, Hand, Download, AlertCircle,
  Sparkles, Wifi, WifiOff, Shield, VolumeX, HardDrive, Send,
  Lightbulb, CheckCircle
} from 'lucide-react'
import { useUserRole } from '../utils/userRole'
import { Avatar } from '../components/ui/Avatar'

interface ChatMsg { id: string; user: string; role: string; text: string; time: string }

const PARTICIPANTS = [
  { name: 'Sarah Kamga',     role: 'student',   muted: false },
  { name: 'Lino Ndongo',     role: 'delegate',  muted: true  },
  { name: 'Yasmine Ngono',   role: 'student',   muted: false },
  { name: 'Thomas Mbarga',   role: 'student',   muted: true  },
  { name: 'Hugo Leroy',      role: 'student',   muted: false },
]

const INITIAL_MSGS: ChatMsg[] = [
  { id: '1', user: 'Emma Martin',   role: 'student',  text: 'Pouvez-vous répéter la partie sur les graphes ?',       time: '10:15' },
  { id: '2', user: 'Prof. Dubois',  role: 'teacher',  text: 'Bien sûr, je reviens dessus.',                          time: '10:16' },
  { id: '3', user: 'Lucas Bernard', role: 'delegate', text: 'J\'ai la même question que Emma.',                      time: '10:16' },
]

export default function VideoConfPage() {
  const navigate = useNavigate()
  const { currentRole, isOfflineMode } = useUserRole()

  const [isMuted,    setIsMuted]    = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [dataSaver,  setDataSaver]  = useState(false)
  const [isRec,      setIsRec]      = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [muteAll,    setMuteAll]    = useState(false)
  const [forceAudio, setForceAudio] = useState(false)
  const [tab,        setTab]        = useState<'chat'|'participants'>('chat')
  const [msgs,       setMsgs]       = useState<ChatMsg[]>(INITIAL_MSGS)
  const [input,      setInput]      = useState('')
  const [elapsed,    setElapsed]    = useState(5075) // seconds
  const bottomRef = useRef<HTMLDivElement>(null)

  // Timer
  useEffect(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const fmtTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
  }

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    const me = currentRole === 'teacher' ? 'Prof. Martin' : currentRole === 'delegate' ? 'Lucas (Délégué)' : 'Emma Martin'
    setMsgs(prev => [...prev, { id: Date.now().toString(), user: me, role: currentRole, text: input.trim(), time }])
    setInput('')
  }

  const roleColor = (r: string) => r === 'teacher' ? 'text-[#0d9488]' : r === 'delegate' ? 'text-indigo-400' : 'text-slate-300'
  const roleBadge = (r: string) => r === 'teacher' ? 'bg-[#0d9488]/20 text-[#0d9488]' : r === 'delegate' ? 'bg-indigo-500/20 text-indigo-300' : ''

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none">

      {/* ── Header ── */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-wide text-slate-100">Algorithmique & Structures de Données L2</h1>
              <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-500/20">EN DIRECT</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs">
              {isOfflineMode
                ? <><Wifi className="h-3 w-3 text-emerald-400 animate-pulse" /><span className="text-emerald-400 font-medium">Réseau Local LiveKit (LAN) — 0 Mo consommé</span></>
                : <><WifiOff className="h-3 w-3 text-amber-400" /><span className="text-amber-400 font-medium">Cloud Internet — données mobiles actives</span></>
              }
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isRec && (
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 animate-pulse">
              <Radio className="h-3.5 w-3.5" /> ENREGISTREMENT
            </span>
          )}
          <span className="font-mono text-sm text-emerald-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            {fmtTime(elapsed)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-teal-300">
            <Users className="h-4 w-4" /> {PARTICIPANTS.length + 1 + 37}
          </span>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: video + tiles */}
        <div className="flex flex-1 flex-col p-4 gap-3 overflow-y-auto">

          {/* Data warnings */}
          {!dataSaver && !isOfflineMode && (
            <div className="rounded-xl bg-amber-950/40 border border-amber-900/50 p-3 flex gap-3 text-xs text-amber-200">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="flex items-start gap-1.5"><Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" /> Astuce Cameroun : connectez-vous au Wi-Fi local du campus pour un flux vidéo gratuit sans forfait data. En 3G/4G, activez le Mode Éco.</p>
            </div>
          )}
          {dataSaver && (
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-900/50 p-3 flex gap-3 text-xs text-emerald-200">
              <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="flex items-start gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" /> Mode Éco actif (8 Ko/s) — vous économisez ~92% de données mobiles par rapport à un flux HD classique.</p>
            </div>
          )}

          {/* Main presenter window */}
          <div className="relative flex-1 min-h-[260px] rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
            {dataSaver || forceAudio ? (
              <div className="text-center space-y-3">
                <div className="relative inline-block">
                  <Avatar name="Prof. Dubois" size="2xl" className="ring-4 ring-[#0d9488]/30" />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full ring-4 ring-slate-900">
                    <Mic className="h-3 w-3 text-white" />
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-100">Prof. Dubois</p>
                  <p className="text-xs text-[#0d9488] mt-1">Présentateur — Mode Éco 8 Ko/s</p>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-slate-950 flex items-center justify-center">
                  <Avatar name="Prof. Dubois" size="2xl" />
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-400">1080p · 30fps</div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/70 backdrop-blur rounded-xl px-3 py-1.5 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />Prof. Dubois — Présentateur
                </div>
              </>
            )}
          </div>

          {/* Participant tiles */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mb-2 px-1">Participants à proximité</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {/* Self tile */}
              <div className="relative shrink-0 w-32 h-20 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center p-1.5">
                <Avatar name={currentRole === 'teacher' ? 'Prof. Martin' : 'Emma Martin'} size="sm" />
                <span className="text-[10px] font-medium mt-1 text-slate-300 truncate w-full text-center">Vous</span>
                {handRaised && <span className="absolute top-1 right-1"><Hand className="h-4 w-4 text-yellow-400" /></span>}
                <span className="absolute bottom-1 right-1 text-[8px]">
                  {isMuted ? <MicOff className="h-3 w-3 text-rose-400" /> : <Mic className="h-3 w-3 text-emerald-400" />}
                </span>
              </div>
              {PARTICIPANTS.map(p => (
                <div key={p.name} className="relative shrink-0 w-32 h-20 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-1.5">
                  <Avatar name={p.name} size="sm" />
                  <span className="text-[10px] font-medium mt-1 text-slate-300 truncate w-full text-center">{p.name.split(' ')[0]}</span>
                  <span className="absolute bottom-1 right-1">
                    {(p.muted || muteAll) ? <MicOff className="h-3 w-3 text-rose-400" /> : <Mic className="h-3 w-3 text-emerald-400" />}
                  </span>
                </div>
              ))}
              <div className="shrink-0 w-32 h-20 rounded-xl bg-slate-900 border border-slate-800/50 flex flex-col items-center justify-center text-slate-400">
                <span className="text-lg font-bold">+37</span>
                <span className="text-[9px] mt-0.5">connectés</span>
              </div>
            </div>
          </div>

          {/* Teacher host panel */}
          {currentRole === 'teacher' && (
            <div className="rounded-2xl bg-slate-900 border border-[#0d9488]/20 p-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Shield className="h-4 w-4 text-[#0d9488]" />
                <span className="text-xs font-bold text-[#0d9488] uppercase tracking-wider">Console Modération</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setMuteAll(v => !v)}
                  className={`flex items-center gap-2 justify-center rounded-xl px-3 py-2.5 text-xs font-bold border transition-all ${muteAll ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'}`}>
                  <VolumeX className="h-4 w-4" />{muteAll ? 'Rétablir micros' : 'Couper tous'}
                </button>
                <button onClick={() => { setForceAudio(v => !v); if (!forceAudio) setDataSaver(true) }}
                  className={`flex items-center gap-2 justify-center rounded-xl px-3 py-2.5 text-xs font-bold border transition-all ${forceAudio ? 'bg-[#0d9488] border-teal-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'}`}>
                  <VideoOff className="h-4 w-4" />{forceAudio ? 'Rétablir vidéo' : 'Audio seul'}
                </button>
                <button onClick={() => setIsRec(v => !v)}
                  className={`flex items-center gap-2 justify-center rounded-xl px-3 py-2.5 text-xs font-bold border transition-all ${isRec ? 'bg-red-600 border-red-500 text-white' : 'bg-emerald-700 border-emerald-600 text-white hover:bg-emerald-600'}`}>
                  <HardDrive className="h-4 w-4" />{isRec ? 'Arrêter rec.' : 'Enregistrer'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: chat / participants */}
        <aside className="hidden lg:flex w-80 flex-col border-l border-slate-800 bg-slate-900">
          <div className="flex border-b border-slate-800">
            {(['chat','participants'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${tab === t ? 'border-[#0d9488] text-[#0d9488] bg-slate-800/30' : 'border-transparent text-slate-400 hover:text-slate-300'}`}>
                {t === 'chat' ? `Chat (${msgs.length})` : `Participants (${PARTICIPANTS.length + 1})`}
              </button>
            ))}
          </div>

          {tab === 'chat' ? (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {msgs.map(m => (
                  <div key={m.id}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Avatar name={m.user} size="xs" />
                      <span className={`text-xs font-bold ${roleColor(m.role)}`}>{m.user}</span>
                      {roleBadge(m.role) && (
                        <span className={`text-[8px] px-1 rounded uppercase font-semibold ${roleBadge(m.role)}`}>
                          {m.role === 'teacher' ? 'Prof' : 'Délég'}
                        </span>
                      )}
                      <span className="ml-auto text-[10px] text-slate-500 font-mono">{m.time}</span>
                    </div>
                    <p className="ml-7 text-xs text-slate-300 bg-slate-950/40 rounded-xl p-2 border border-slate-800/50">{m.text}</p>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <form onSubmit={sendMsg} className="border-t border-slate-800 p-3 bg-slate-950/60">
                <div className="flex gap-2">
                  <input value={input} onChange={e => setInput(e.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] border border-slate-700/50" />
                  <button type="submit" disabled={!input.trim()}
                    className="rounded-xl bg-[#0d9488] hover:bg-[#0a7167] disabled:opacity-40 px-3 py-2 text-white transition-all">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-2">En ligne ({PARTICIPANTS.length + 1})</p>
              {[{ name: 'Prof. Dubois', role: 'teacher' }, ...PARTICIPANTS].map(p => (
                <div key={p.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Avatar name={p.name} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{p.name}</p>
                      <p className={`text-[10px] ${roleColor(p.role)}`}>{p.role === 'teacher' ? 'Présentateur' : p.role === 'delegate' ? 'Délégué' : 'Étudiant'}</p>
                    </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* ── Controls footer ── */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900 px-5 py-3">
        <button onClick={() => setDataSaver(v => !v)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold border transition-all ${dataSaver ? 'bg-[#0d9488]/20 border-[#0d9488] text-[#0d9488]' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
          <Download className="h-4 w-4" /> Mode Éco (8 Ko/s)
        </button>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsMuted(v => !v)}
            className={`rounded-xl p-3 border transition-all ${isMuted ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button onClick={() => setIsVideoOff(v => !v)}
            className={`rounded-xl p-3 border transition-all ${isVideoOff ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </button>
          {currentRole !== 'teacher' && (
            <button onClick={() => setHandRaised(v => !v)}
              className={`rounded-xl p-3 border transition-all ${handRaised ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
              <Hand className="h-5 w-5" />
            </button>
          )}
          <button className="rounded-xl bg-slate-800 border border-slate-700 p-3 text-slate-300 hover:bg-slate-700 hidden sm:block">
            <MonitorUp className="h-5 w-5" />
          </button>
          <button onClick={() => setTab(t => t === 'chat' ? 'participants' : 'chat')}
            className="rounded-xl bg-slate-800 border border-slate-700 p-3 text-slate-300 hover:bg-slate-700 lg:hidden">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="rounded-xl bg-slate-800 border border-slate-700 p-3 text-slate-300 hover:bg-slate-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <button onClick={() => navigate('/app')}
          className="flex items-center gap-2 rounded-xl bg-rose-600 border border-rose-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-500 transition-all shadow-lg">
          <PhoneOff className="h-4 w-4" /> Quitter
        </button>
      </footer>
    </div>
  )
}
