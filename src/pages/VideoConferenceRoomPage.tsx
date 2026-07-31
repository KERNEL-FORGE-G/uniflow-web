import { useState } from 'react'
import { Video, Mic, MicOff, VideoOff, PhoneOff, Users, MessageSquare, Share2, Settings } from 'lucide-react'

export default function VideoConferenceRoomPage() {
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [showChat, setShowChat] = useState(false)

  const participants = [
    { name: 'Emma Martin', role: 'Étudiant', audio: true, video: true },
    { name: 'Lucas Dubois', role: 'Délégué', audio: true, video: true },
    { name: 'Pr. Martin', role: 'Enseignant', audio: true, video: true },
    { name: 'Sophie Bernard', role: 'Étudiant', audio: false, video: true },
  ]

  return (
    <div className="fixed inset-0 bg-[#0f172a] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-[#1e293b] px-6 py-3">
        <div>
          <h1 className="text-lg font-bold text-white">Algorithmique L2 — Cours du 13 mai 2026</h1>
          <p className="text-xs text-slate-400">Pr. Martin · Salle virtuelle A204</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-600 transition-colors">
            <Users className="h-3.5 w-3.5" />
            {participants.length}
          </button>
          <button onClick={() => setShowChat(!showChat)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              showChat
                ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white'
                : 'border-slate-600 bg-slate-700 text-white hover:bg-slate-600'
            }`}>
            <MessageSquare className="h-3.5 w-3.5" />
            Chat
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 p-4">
          <div className="grid h-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Main speaker (teacher) */}
            <div className="sm:col-span-2 lg:col-span-2 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-20">👨‍🏫</span>
              </div>
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                <p className="text-sm font-bold text-white">Pr. Martin</p>
                <p className="text-xs text-slate-300">Enseignant</p>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <span className="rounded-md bg-emerald-500 p-1.5">
                  <Mic className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="rounded-md bg-[#1e3a8a] p-1.5">
                  <Video className="h-3.5 w-3.5 text-white" />
                </span>
              </div>
            </div>

            {/* Participants */}
            {participants.slice(0, 3).map((p, i) => (
              <div key={i} className="rounded-xl bg-slate-800 flex items-center justify-center relative overflow-hidden min-h-[160px]">
                <span className="text-5xl opacity-30">{p.role === 'Étudiant' ? '🎓' : '📢'}</span>
                <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
                  <p className="text-xs font-bold text-white">{p.name}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {p.audio ? (
                    <span className="rounded-md bg-emerald-500 p-1">
                      <Mic className="h-3 w-3 text-white" />
                    </span>
                  ) : (
                    <span className="rounded-md bg-red-500 p-1">
                      <MicOff className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat sidebar */}
        {showChat && (
          <div className="w-80 border-l border-slate-700 bg-[#1e293b] flex flex-col animate-slide-in">
            <div className="border-b border-slate-700 p-4">
              <h2 className="font-bold text-white">Chat</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {[
                { name: 'Emma', text: 'Bonjour tout le monde !', time: '10:32' },
                { name: 'Pr. Martin', text: 'Bonjour Emma, prêt pour le cours ?', time: '10:33' },
                { name: 'Lucas', text: 'Présent !', time: '10:33' },
              ].map((msg, i) => (
                <div key={i} className="rounded-lg bg-slate-800 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-[#0d9488]">{msg.name}</p>
                    <span className="text-[10px] text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-slate-200">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 p-3">
              <input
                placeholder="Envoyer un message..."
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-center gap-3 border-t border-slate-700 bg-[#1e293b] px-6 py-4">
        <button onClick={() => setMicOn(!micOn)}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            micOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'
          }`}>
          {micOn ? <Mic className="h-5 w-5 text-white" /> : <MicOff className="h-5 w-5 text-white" />}
        </button>
        <button onClick={() => setCameraOn(!cameraOn)}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            cameraOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'
          }`}>
          {cameraOn ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5 text-white" />}
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
          <Share2 className="h-5 w-5 text-white" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
          <Settings className="h-5 w-5 text-white" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors ml-4">
          <PhoneOff className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}
