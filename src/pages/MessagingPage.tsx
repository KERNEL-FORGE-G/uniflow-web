import { useState } from 'react'
import { Search, Plus, Phone, Video, Paperclip, Smile, Mic, Send, AlertTriangle } from 'lucide-react'
// import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'

const conversations = [
  { id: 1, name: 'Dr. Karim Benkacem', preview: 'Le TP est disponible sur la plateforme', time: '14:32', unread: 2 },
  { id: 2, name: 'Pr. Martin', preview: 'Rendez-vous confirmé pour demain', time: 'Hier', unread: 0 },
  { id: 3, name: 'Sarah Kamga', preview: 'Tu as fini le devoir d\'algo ?', time: 'Lun', unread: 1 },
  { id: 4, name: 'Groupe INFO201', preview: 'Lucas: On se retrouve en salle B204', time: 'Dim', unread: 5 },
]

const messages = [
  { from: 'them', text: 'Bonjour Emma, le TP d\'algorithmique est maintenant disponible.', time: '14:20' },
  { from: 'me', text: 'Merci professeur ! Je vais le consulter ce soir.', time: '14:25' },
  { from: 'them', text: 'Parfait. N\'hésitez pas si vous avez des questions.', time: '14:28' },
  { from: 'them', text: 'Voici le document de référence.', time: '14:30', file: 'TP_Algo.docx, 1.2 Mo' },
  { from: 'me', text: 'Reçu, merci beaucoup !', time: '14:32' },
]

export default function MessagingPage() {
  const [activeChat, setActiveChat] = useState(conversations[0])

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-xl border border-border bg-white">
      {/* Contact list */}
      <div className="flex w-72 shrink-0 flex-col border-r border-border">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold text-gray-900">Messages</h2>
          <Button className="!px-3 !py-1.5 text-xs"><Plus className="h-3 w-3" /> Nouveau</Button>
        </div>
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input type="search" placeholder="Rechercher..." className="w-full rounded-lg border border-border py-2 pl-9 pr-3 text-sm outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveChat(c)}
              className={`flex w-full items-center gap-3 border-b border-border p-4 text-left hover:bg-gray-50 ${
                activeChat.id === c.id ? 'bg-primary/5' : ''
              }`}
            >
              <Avatar name={c.name} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <span className="text-xs text-muted">{c.time}</span>
                </div>
                <p className="truncate text-xs text-muted">{c.preview}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={activeChat.name} size="md" />
            <div>
              <p className="font-semibold">{activeChat.name}</p>
              <p className="text-xs text-teal">En ligne</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded-lg p-2 hover:bg-gray-100"><Phone className="h-5 w-5 text-muted" /></button>
            <button type="button" className="rounded-lg p-2 hover:bg-gray-100"><Video className="h-5 w-5 text-muted" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                m.from === 'me' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
              }`}>
                <p>{m.text}</p>
                {'file' in m && m.file && (
                  <div className={`mt-2 flex items-center gap-2 rounded-lg p-2 text-xs ${m.from === 'me' ? 'bg-white/20' : 'bg-white'}`}>
                    <Paperclip className="h-4 w-4" /> {m.file}
                  </div>
                )}
                <p className={`mt-1 text-xs ${m.from === 'me' ? 'text-white/70' : 'text-muted'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg p-2 hover:bg-gray-100"><Paperclip className="h-5 w-5 text-muted" /></button>
            <button type="button" className="rounded-lg p-2 hover:bg-gray-100"><Smile className="h-5 w-5 text-muted" /></button>
            <input type="text" placeholder="Écrire un message..." className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm outline-none" />
            <button type="button" className="rounded-lg p-2 hover:bg-gray-100"><Mic className="h-5 w-5 text-muted" /></button>
            <Button className="!px-3"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="hidden w-64 shrink-0 flex-col border-l border-border p-6 xl:flex">
        <div className="text-center">
          <Avatar name={activeChat.name} size="xl" className="mx-auto" />
          <h3 className="mt-4 font-semibold">{activeChat.name}</h3>
          <p className="text-sm text-muted">Enseignant — Informatique</p>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div><dt className="text-muted">Email</dt><dd className="font-medium">k.benkacem@uniflow.edu</dd></div>
          <div><dt className="text-muted">Bureau</dt><dd className="font-medium">Bâtiment A, Bureau 204</dd></div>
        </dl>
        <div className="mt-6 space-y-2 border-t border-border pt-6">
          <button type="button" className="w-full rounded-lg py-2 text-left text-sm hover:bg-gray-50">Voir profil</button>
          <button type="button" className="w-full rounded-lg py-2 text-left text-sm hover:bg-gray-50">Bloquer</button>
          <button type="button" className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-sm text-red-600 hover:bg-red-50">
            <AlertTriangle className="h-4 w-4" /> Signaler
          </button>
        </div>
      </div>
    </div>
  )
}
