import { useState, useRef, useEffect } from 'react'
import { Search, Plus, Phone, Video, Paperclip, Smile, Mic, Send, MoreHorizontal, X, AlertTriangle, UserCircle } from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'
import { mockConversations, type Conversation, type Message } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const TYPING_DELAY = 1200

export default function MessagingPage() {
  const navigate = useNavigate()
  const [convos, setConvos] = useState<Conversation[]>(mockConversations)
  const [active, setActive] = useState<Conversation>(convos[0])
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [active.messages])

  // Clear unread on select
  const selectConvo = (c: Conversation) => {
    setConvos(prev => prev.map(cv => cv.id === c.id ? { ...cv, unread: 0 } : cv))
    setActive({ ...c, unread: 0 })
    setIsTyping(false)
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
    const newMsg: Message = { id: Date.now().toString(), from: 'me', text: text.trim(), time }

    const updated = { ...active, messages: [...active.messages, newMsg], preview: text.trim(), time }
    setActive(updated)
    setConvos(prev => prev.map(c => c.id === active.id ? updated : c))
    setText('')

    // Simulate reply after delay
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replies = [
        'Merci pour votre message !',
        'Je prends note, je vous reviens bientôt.',
        'Bien reçu !',
        'D\'accord, pas de problème.',
        'Je vais vérifier ça.',
      ]
      const replyText = replies[Math.floor(Math.random() * replies.length)]
      const replyTime = `${new Date().getHours().toString().padStart(2,'0')}:${new Date().getMinutes().toString().padStart(2,'0')}`
      const reply: Message = { id: (Date.now() + 1).toString(), from: 'them', text: replyText, time: replyTime }
      setActive(prev => ({ ...prev, messages: [...prev.messages, reply], preview: replyText }))
      setConvos(prev => prev.map(c => c.id === active.id ? { ...c, messages: [...c.messages, reply], preview: replyText } : c))
    }, TYPING_DELAY)
  }

  const filteredConvos = convos.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
  const totalUnread = convos.reduce((s, c) => s + c.unread, 0)

  return (
    <div className="flex h-[calc(100vh-5rem)] rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden animate-fade-in">

      {/* ── Contacts sidebar ── */}
      <div className="flex w-72 shrink-0 flex-col border-r border-[#e5e7eb]">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3.5">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[#111827]">Messages</h2>
            {totalUnread > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1e3a8a] text-[10px] font-bold text-white">{totalUnread}</span>
            )}
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-[#1e3a8a] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
            <Plus className="h-3.5 w-3.5" /> Nouveau
          </button>
        </div>
        <div className="border-b border-[#e5e7eb] p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1e3a8a] focus:bg-white" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#f9fafb]">
          {filteredConvos.map(c => (
            <button key={c.id} type="button" onClick={() => selectConvo(c)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-[#f9fafb] transition-colors ${active.id === c.id ? 'bg-[#f0f4ff] border-l-2 border-[#1e3a8a]' : ''}`}>
              <div className="relative shrink-0">
                <Avatar name={c.name} size="md" />
                {c.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#10b981] ring-2 ring-white" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${c.unread > 0 ? 'font-bold text-[#111827]' : 'font-medium text-[#374151]'}`}>{c.name}</p>
                  <span className="text-[10px] text-[#9ca3af] ml-1 shrink-0">{c.time}</span>
                </div>
                <p className={`text-xs truncate mt-0.5 ${c.unread > 0 ? 'text-[#374151] font-medium' : 'text-[#9ca3af]'}`}>{c.preview}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#1e3a8a] px-1.5 text-[10px] font-bold text-white shrink-0">{c.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat window ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar name={active.name} size="md" />
              {active.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#10b981] ring-2 ring-white" />}
            </div>
            <div>
              <p className="font-semibold text-[#111827]">{active.name}</p>
              <div className="flex items-center gap-1.5">
                {isTyping ? (
                  <span className="text-xs text-[#0d9488] font-medium flex items-center gap-1">
                    <span className="flex gap-0.5">
                      <span className="h-1 w-1 rounded-full bg-[#0d9488] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1 w-1 rounded-full bg-[#0d9488] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1 w-1 rounded-full bg-[#0d9488] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    est en train d'écrire...
                  </span>
                ) : active.online ? (
                  <span className="flex items-center gap-1 text-xs text-[#10b981]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                    En ligne
                  </span>
                ) : (
                  <span className="text-xs text-[#9ca3af]">Hors ligne</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => navigate('/app/visio')}
              className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
              <Video className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setShowInfo(v => !v)}
              className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {active.messages.map(m => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              {m.from === 'them' && <Avatar name={active.name} size="sm" className="mr-2 mt-1 shrink-0" />}
              <div className={`max-w-sm ${m.from === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === 'me'
                    ? 'bg-[#1e3a8a] text-white rounded-br-sm'
                    : 'bg-[#f3f4f6] text-[#111827] rounded-bl-sm'
                }`}>
                  <p>{m.text}</p>
                  {m.file && (
                    <div className={`mt-2 flex items-center gap-2 rounded-lg p-2 text-xs ${m.from === 'me' ? 'bg-white/20' : 'bg-white border border-[#e5e7eb]'}`}>
                      <Paperclip className="h-3.5 w-3.5 shrink-0" /> {m.file}
                    </div>
                  )}
                </div>
                <span className={`text-[10px] ${m.from === 'me' ? 'text-[#9ca3af] pr-1' : 'text-[#9ca3af] pl-1'}`}>{m.time}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2">
              <Avatar name={active.name} size="sm" />
              <div className="bg-[#f3f4f6] rounded-2xl rounded-bl-sm px-4 py-2.5">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="h-2 w-2 rounded-full bg-[#9ca3af] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#e5e7eb] px-4 py-3.5">
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <button type="button" className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
              <Smile className="h-5 w-5" />
            </button>
            <input value={text} onChange={e => setText(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-all" />
            <button type="button" className="rounded-lg p-2 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151] transition-colors">
              <Mic className="h-5 w-5" />
            </button>
            <button type="submit" disabled={!text.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] disabled:opacity-40 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Contact info panel ── */}
      {showInfo && (
        <div className="hidden xl:flex w-64 shrink-0 flex-col border-l border-[#e5e7eb] p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-[#111827]">Infos</h3>
            <button onClick={() => setShowInfo(false)} className="rounded p-1 hover:bg-[#f3f4f6] text-[#9ca3af]"><X className="h-4 w-4" /></button>
          </div>
          <div className="text-center">
            <Avatar name={active.name} size="xl" className="mx-auto" />
            <h3 className="mt-3 font-bold text-[#111827]">{active.name}</h3>
            <p className="text-xs text-[#6b7280]">{active.role}</p>
            {active.online && (
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-[#0d9488] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" /> En ligne
              </span>
            )}
          </div>
          <dl className="mt-5 space-y-3 text-sm border-t border-[#e5e7eb] pt-4">
            <div>
              <dt className="text-xs text-[#9ca3af]">Email</dt>
              <dd className="font-medium text-[#374151] text-xs mt-0.5">{active.name.split(' ')[0].toLowerCase()}.{active.name.split(' ')[1]?.toLowerCase() ?? 'user'}@uniflow.edu</dd>
            </div>
            <div>
              <dt className="text-xs text-[#9ca3af]">Bureau</dt>
              <dd className="font-medium text-[#374151] text-xs mt-0.5">Bâtiment B, Étage 2</dd>
            </div>
          </dl>
          <div className="mt-5 space-y-1.5 border-t border-[#e5e7eb] pt-4">
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#374151] hover:bg-[#f3f4f6] transition-colors">
              <UserCircle className="h-4 w-4 text-[#9ca3af]" /> Voir profil
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#dc2626] hover:bg-red-50 transition-colors">
              <AlertTriangle className="h-4 w-4" /> Signaler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
