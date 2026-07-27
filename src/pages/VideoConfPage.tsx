import { Mic, Video, MonitorUp, Users, MessageSquare, MoreHorizontal, PhoneOff } from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'

const participants = [
  { name: 'Vous', active: true },
  { name: 'Sarah', active: false },
  { name: 'Yasmine', active: false },
  { name: 'Lino', active: false },
]

const messages = [
  { user: 'Sarah Kamga', text: 'Bonjour professeur, pouvez-vous répéter la dernière slide ?', time: '14:32' },
  { user: 'Pr. Martin', text: 'Bien sûr, je reviens sur la complexité O(n log n).', time: '14:33' },
  { user: 'Lucas Dubois', text: 'Merci !', time: '14:34' },
  { user: 'Emma Martin', text: 'J\'ai une question sur l\'exercice 3.', time: '14:35' },
]

export default function VideoConfPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-900 text-white">
      <header className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <h1 className="font-semibold">Algorithmique — EN DIRECT</h1>
          <span className="rounded bg-gray-700 px-2 py-0.5 text-sm">01:24:35</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Users className="h-4 w-4" /> 41 participants
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col p-4">
          <div className="relative flex-1 overflow-hidden rounded-xl bg-gray-800">
            <div className="flex h-full items-center justify-center">
              <Avatar name="Pr. Martin" size="xl" />
              <p className="absolute bottom-4 left-4 rounded bg-black/50 px-3 py-1 text-sm">Pr. Martin (Présentateur)</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto">
            {participants.map((p) => (
              <div key={p.name} className={`relative shrink-0 w-36 h-24 rounded-lg bg-gray-800 flex items-center justify-center ${p.active ? 'ring-2 ring-teal' : ''}`}>
                <Avatar name={p.name} size="md" />
                <span className="absolute bottom-2 left-2 text-xs">{p.name}</span>
              </div>
            ))}
            <div className="flex h-24 w-36 shrink-0 items-center justify-center rounded-lg bg-gray-700 text-sm font-medium">
              +41
            </div>
          </div>
        </div>

        <aside className="flex w-80 flex-col border-l border-gray-700 bg-gray-800">
          <div className="flex border-b border-gray-700">
            <button type="button" className="flex-1 border-b-2 border-teal py-3 text-sm font-medium">Chat</button>
            <button type="button" className="flex-1 py-3 text-sm text-gray-400">Participants (24)</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.time + m.user} className="text-sm">
                <div className="flex items-center gap-2">
                  <Avatar name={m.user} size="sm" />
                  <span className="font-medium">{m.user}</span>
                  <span className="text-xs text-gray-500">{m.time}</span>
                </div>
                <p className="mt-1 ml-10 text-gray-300">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 p-4">
            <input
              type="text"
              placeholder="Écrire un message..."
              className="w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm outline-none placeholder:text-gray-500"
            />
          </div>
        </aside>
      </div>

      <footer className="flex items-center justify-center gap-4 border-t border-gray-700 px-6 py-4">
        <button type="button" className="rounded-full bg-gray-700 p-3 hover:bg-gray-600"><Mic className="h-5 w-5" /></button>
        <button type="button" className="rounded-full bg-gray-700 p-3 hover:bg-gray-600"><Video className="h-5 w-5" /></button>
        <button type="button" className="rounded-full bg-gray-700 p-3 hover:bg-gray-600"><MonitorUp className="h-5 w-5" /></button>
        <button type="button" className="rounded-full bg-gray-700 p-3 hover:bg-gray-600"><Users className="h-5 w-5" /></button>
        <button type="button" className="rounded-full bg-gray-700 p-3 hover:bg-gray-600"><MessageSquare className="h-5 w-5" /></button>
        <button type="button" className="rounded-full bg-gray-700 p-3 hover:bg-gray-600"><MoreHorizontal className="h-5 w-5" /></button>
        <button type="button" className="ml-4 flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-medium hover:bg-red-700">
          <PhoneOff className="h-5 w-5" /> Quitter
        </button>
      </footer>
    </div>
  )
}
