import { useEffect, useState } from 'react'
import { Search, Plus, Phone, Video, Paperclip, Smile, Mic, Send, AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { Input } from '../components/ui/Input'
import { EmptyState } from '../components/ui/EmptyState'
import { useConversations, useMessages } from '../hooks'
import type { Conversation } from '../types'

export default function MessagingPage() {
  const { data: conversations, loading, error } = useConversations()
  const [activeChat, setActiveChat] = useState<Conversation | null>(null)
  const conversationId = activeChat?.id ?? conversations?.[0]?.id ?? 1
  const { data: messages } = useMessages(conversationId)

  useEffect(() => {
    if (conversations?.length && !activeChat) setActiveChat(conversations[0])
  }, [conversations, activeChat])

  if (loading) return <p className="text-sm text-muted">Chargement des messages…</p>
  if (error || !conversations) return <EmptyState title="Impossible de charger la messagerie" description={error ?? undefined} />
  if (!activeChat) return null

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex w-72 shrink-0 flex-col border-r border-border">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold text-text">Messages</h2>
          <Button className="!px-3 !py-1.5 text-xs">
            <Plus className="h-3 w-3" /> Nouveau
          </Button>
        </div>
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input type="search" placeholder="Rechercher..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveChat(c)}
              className={`flex w-full items-center gap-3 border-b border-border p-4 text-left hover:bg-bg ${
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
              {c.unread > 0 ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {c.unread}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

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
            <button type="button" className="rounded-lg p-2 hover:bg-bg">
              <Phone className="h-5 w-5 text-muted" />
            </button>
            <button type="button" className="rounded-lg p-2 hover:bg-bg">
              <Video className="h-5 w-5 text-muted" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {(messages ?? []).map((m, i) => (
            <div key={`${m.time}-${i}`} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === 'me' ? 'bg-primary text-white' : 'bg-bg text-text'
                }`}
              >
                <p>{m.text}</p>
                {m.file ? (
                  <div
                    className={`mt-2 flex items-center gap-2 rounded-lg p-2 text-xs ${
                      m.from === 'me' ? 'bg-white/20' : 'bg-surface'
                    }`}
                  >
                    <Paperclip className="h-4 w-4" /> {m.file}
                  </div>
                ) : null}
                <p className={`mt-1 text-xs ${m.from === 'me' ? 'text-white/70' : 'text-muted'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg p-2 hover:bg-bg">
              <Paperclip className="h-5 w-5 text-muted" />
            </button>
            <button type="button" className="rounded-lg p-2 hover:bg-bg">
              <Smile className="h-5 w-5 text-muted" />
            </button>
            <Input type="text" placeholder="Écrire un message..." className="flex-1" />
            <button type="button" className="rounded-lg p-2 hover:bg-bg">
              <Mic className="h-5 w-5 text-muted" />
            </button>
            <Button className="!px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden w-64 shrink-0 flex-col border-l border-border p-6 xl:flex">
        <div className="text-center">
          <Avatar name={activeChat.name} size="xl" className="mx-auto" />
          <h3 className="mt-4 font-semibold">{activeChat.name}</h3>
          <p className="text-sm text-muted">Enseignant — Informatique</p>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-muted">Email</dt>
            <dd className="font-medium">k.benkacem@uniflow.edu</dd>
          </div>
          <div>
            <dt className="text-muted">Bureau</dt>
            <dd className="font-medium">Bâtiment A, Bureau 204</dd>
          </div>
        </dl>
        <div className="mt-6 space-y-2 border-t border-border pt-6">
          <button type="button" className="w-full rounded-lg py-2 text-left text-sm hover:bg-bg">
            Voir profil
          </button>
          <button type="button" className="w-full rounded-lg py-2 text-left text-sm hover:bg-bg">
            Bloquer
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <AlertTriangle className="h-4 w-4" /> Signaler
          </button>
        </div>
      </div>
    </div>
  )
}
