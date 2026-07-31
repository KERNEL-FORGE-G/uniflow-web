import { useState } from 'react'
import { Search, HelpCircle, BookOpen, Video, MessageCircle, Mail, ChevronRight } from 'lucide-react'

const faqs = [
  { q: 'Comment réinitialiser mon mot de passe ?', a: 'Cliquez sur "Mot de passe oublié" sur la page de connexion, puis suivez les instructions envoyées par email.', cat: 'Compte' },
  { q: 'Comment télécharger un bulletin de notes en PDF ?', a: 'Allez dans Mes Notes > Bulletin du semestre > Télécharger PDF.', cat: 'Notes' },
  { q: 'Comment activer les notifications push ?', a: 'Paramètres > Notifications > Activer "Notifications push".', cat: 'Paramètres' },
  { q: 'Puis-je utiliser UniFlow hors ligne ?', a: 'Oui, UniFlow est Offline-First. Les données sont stockées localement et synchronisées au retour de connexion.', cat: 'Technique' },
  { q: 'Comment rejoindre une visioconférence ?', a: 'Cliquez sur le lien de visioconférence envoyé par votre enseignant, ou allez dans Visioconférence > Rejoindre.', cat: 'Visioconférence' },
  { q: 'Comment marquer les présences en tant que délégué ?', a: 'Espace Délégué > Gestion des présences > Sélectionner le cours > Marquer les présences.', cat: 'Présences' },
]

const guides = [
  { title: 'Guide de démarrage rapide', desc: 'Découvrez les fonctionnalités essentielles en 5 minutes.', icon: BookOpen, duration: '5 min' },
  { title: 'Tutoriel vidéo : Mes Cours', desc: 'Comment naviguer dans vos cours et ressources.', icon: Video, duration: '8 min' },
  { title: 'Tutoriel vidéo : Visioconférence', desc: 'Organiser et rejoindre une visioconférence.', icon: Video, duration: '12 min' },
  { title: 'Guide Offline First', desc: 'Utiliser UniFlow sans connexion Internet.', icon: BookOpen, duration: '7 min' },
]

export default function HelpPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tous')

  const filtered = faqs.filter(f => {
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Tous' || f.cat === category
    return matchSearch && matchCat
  })

  const cats = ['Tous', ...Array.from(new Set(faqs.map(f => f.cat)))]

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] text-white p-8 text-center shadow-lg">
        <HelpCircle className="mx-auto h-12 w-12 mb-3 opacity-90" />
        <h1 className="text-2xl font-extrabold">Centre d'aide UniFlow</h1>
        <p className="text-sm text-blue-100 mt-2 max-w-md mx-auto">
          Trouvez des réponses à vos questions ou contactez notre équipe support.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9ca3af]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Recherchez votre question..."
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3 pl-12 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:bg-white" />
        </div>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: MessageCircle, label: 'Chat en direct', desc: 'Parlez à un agent', color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
          { icon: Mail, label: 'Email support', desc: 'support@uniflow.edu', color: 'text-[#0d9488]', bg: 'bg-[#f0fdfa]' },
          { icon: Video, label: 'Tutoriels vidéo', desc: '12 vidéos disponibles', color: 'text-[#7c3aed]', bg: 'bg-[#ede9fe]' },
        ].map(l => (
          <button key={l.label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm hover:shadow-md transition-all text-left">
            <div className={`inline-flex rounded-lg p-2 ${l.bg} mb-2`}>
              <l.icon className={`h-5 w-5 ${l.color}`} />
            </div>
            <h3 className="font-semibold text-[#111827] text-sm">{l.label}</h3>
            <p className="text-xs text-[#6b7280] mt-0.5">{l.desc}</p>
          </button>
        ))}
      </div>

      {/* Guides */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-[#1e3a8a]" /> Guides & Tutoriels</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {guides.map(g => (
            <button key={g.title} className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f9fafb] transition-colors text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6]">
                <g.icon className="h-5 w-5 text-[#1e3a8a]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#111827] text-sm">{g.title}</h3>
                <p className="text-xs text-[#9ca3af] mt-0.5">{g.desc} · {g.duration}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#9ca3af] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[#111827] flex items-center gap-1.5"><HelpCircle className="h-4 w-4 text-[#1e3a8a]" /> Questions fréquentes</h2>
          <div className="flex gap-1">
            {cats.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${category === c ? 'bg-[#1e3a8a] text-white' : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-sm text-[#9ca3af] py-8 text-center">Aucune question trouvée. Essayez un autre terme de recherche.</p>
          )}
          {filtered.map((f, i) => (
            <details key={i} className="group rounded-lg border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] transition-colors">
              <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-[#111827]">
                <span>{f.q}</span>
                <ChevronRight className="h-4 w-4 text-[#9ca3af] transition-transform group-open:rotate-90" />
              </summary>
              <div className="border-t border-[#f3f4f6] px-4 py-3 text-sm text-[#6b7280]">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="rounded-xl bg-[#f3f4f6] border border-[#e5e7eb] p-6 text-center">
        <p className="text-sm font-semibold text-[#111827] mb-2">Vous ne trouvez pas votre réponse ?</p>
        <p className="text-xs text-[#6b7280] mb-4">Notre équipe support est disponible 24/7 pour vous aider.</p>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
          <MessageCircle className="h-4 w-4" /> Contacter le support
        </button>
      </div>
    </div>
  )
}
