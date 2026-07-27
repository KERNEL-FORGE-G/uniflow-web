import { useState } from 'react'
import { Search, ChevronDown, Mail, Phone, Clock, Ticket } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const categories = ['Connexion', 'Devoirs', 'Notes', 'Emploi du temps', 'Visioconférence', 'Compte']

const faqs = [
  { q: 'Comment réinitialiser mon mot de passe ?', a: 'Allez dans Paramètres > Sécurité > Modifier le mot de passe, ou utilisez le lien "Mot de passe oublié" sur la page de connexion.' },
  { q: 'Comment soumettre un devoir ?', a: 'Accédez à Mes devoirs, sélectionnez le devoir concerné et cliquez sur "Continuer" pour uploader votre fichier.' },
  { q: 'Où consulter mes notes ?', a: 'Rendez-vous dans la section Notes du menu latéral pour voir vos résultats et télécharger votre bulletin.' },
  { q: 'Comment rejoindre une visioconférence ?', a: 'Cliquez sur le lien dans la notification ou accédez au cours concerné et cliquez sur "Rejoindre la session".' },
]

const guides = [
  { title: 'Guides étudiants', desc: 'Documentation complète pour les étudiants' },
  { title: 'Tutoriels vidéo', desc: 'Apprenez à utiliser UniFlow en vidéo' },
  { title: 'Documentation API', desc: 'Pour les développeurs et intégrations' },
]

const tickets = [
  { id: '#1247', title: 'Problème de connexion', status: 'Ouvert' as const, time: 'Il y a 2h' },
  { id: '#1240', title: 'Devoir non visible', status: 'Résolu' as const, time: 'Il y a 3j' },
  { id: '#1235', title: 'Export PDF bulletin', status: 'Résolu' as const, time: 'Il y a 1 sem.' },
]

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Aide & Support</h1>
        <div className="relative mx-auto mt-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Comment pouvons-nous vous aider ?"
            className="w-full rounded-xl border border-border py-4 pl-12 pr-4 text-base shadow-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button key={c} type="button" className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Questions fréquentes</CardTitle>
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
                  >
                    {faq.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <p className="pb-4 text-sm text-muted">{faq.a}</p>}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            {guides.map((g) => (
              <Card key={g.title} className="text-center">
                <h3 className="font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm text-muted">{g.desc}</p>
                <button type="button" className="mt-4 text-sm font-medium text-primary hover:underline">
                  Voir les guides
                </button>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-4 text-base">Contacter le support</CardTitle>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@uniflow.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+237 222 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Lun-Ven, 8h-18h</span>
              </div>
            </dl>
            <Button className="mt-4 w-full"><Ticket className="h-4 w-4" /> Créer un ticket</Button>
          </Card>

          <Card>
            <CardTitle className="mb-4 text-base">Tickets récents</CardTitle>
            <ul className="space-y-3">
              {tickets.map((t) => (
                <li key={t.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{t.id} — {t.title}</p>
                    <p className="text-xs text-muted">{t.time}</p>
                  </div>
                  <Badge variant={t.status === 'Ouvert' ? 'warning' : 'success'}>{t.status}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
