import { useState } from 'react'
import { Search, ChevronDown, Mail, Phone, Clock, Ticket } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PageHeader } from '../components/ui/PageHeader'
import { Input } from '../components/ui/Input'

const categories = ['Connexion', 'Devoirs', 'Notes', 'Emploi du temps', 'Visioconférence', 'Compte']

const faqs = [
  {
    q: 'Comment réinitialiser mon mot de passe ?',
    a: 'Allez dans Paramètres > Sécurité > Modifier le mot de passe, ou utilisez le lien "Mot de passe oublié" sur la page de connexion.',
  },
  {
    q: 'Comment soumettre un devoir ?',
    a: 'Accédez à Mes devoirs, sélectionnez le devoir concerné et cliquez sur "Continuer" pour uploader votre fichier.',
  },
  {
    q: 'Où consulter mes notes ?',
    a: 'Rendez-vous dans la section Notes du menu latéral pour voir vos résultats et télécharger votre bulletin.',
  },
  {
    q: 'Comment rejoindre une visioconférence ?',
    a: 'Cliquez sur le lien dans la notification ou accédez au cours concerné et cliquez sur "Rejoindre la session".',
  },
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
      <PageHeader title="Aide & Support" description="FAQ, guides et tickets" />

      <div className="relative mx-auto max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <Input type="search" placeholder="Comment pouvons-nous vous aider ?" className="rounded-xl py-4 pl-12" />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <Badge key={c} variant="neutral">
            {c}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle className="mb-4 text-base">FAQ</CardTitle>
          <ul className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <li key={faq.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-sm font-medium"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`h-4 w-4 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i ? <p className="pb-3 text-sm text-muted">{faq.a}</p> : null}
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardTitle className="mb-3 text-base">Guides</CardTitle>
            <ul className="space-y-3">
              {guides.map((g) => (
                <li key={g.title}>
                  <p className="text-sm font-medium">{g.title}</p>
                  <p className="text-xs text-muted">{g.desc}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardTitle className="mb-3 text-base">Contact</CardTitle>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> support@uniflow.edu
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +237 6 00 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Lun–Ven 8h–17h
              </li>
            </ul>
            <Button className="mt-4 w-full">
              <Ticket className="h-4 w-4" /> Ouvrir un ticket
            </Button>
          </Card>
          <Card>
            <CardTitle className="mb-3 text-base">Mes tickets</CardTitle>
            <ul className="space-y-2">
              {tickets.map((t) => (
                <li key={t.id} className="flex items-center justify-between text-sm">
                  <span>
                    {t.id} — {t.title}
                  </span>
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
