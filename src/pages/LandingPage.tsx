import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users, Wifi, Shield } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const features = [
  {
    icon: GraduationCap,
    title: 'Tout-en-un',
    description: 'Centralisez cours, devoirs, notes et communications dans une seule plateforme intuitive.',
  },
  {
    icon: Users,
    title: 'Collaboratif',
    description: 'Facilitez les échanges entre étudiants, enseignants et administration en temps réel.',
  },
  {
    icon: Wifi,
    title: 'Accessible',
    description: 'Accédez à vos ressources pédagogiques depuis n\'importe quel appareil, partout.',
  },
  {
    icon: Shield,
    title: 'Sécurisé',
    description: 'Vos données académiques sont protégées avec les standards de sécurité les plus élevés.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <img src="/assets/UniFlow_Logo_Principal.png" alt="UniFlow" className="h-9" />
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary">Fonctionnalités</a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary">À propos</a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-primary">Tarifs</a>
          <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-primary">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Se connecter</Button>
          </Link>
          <Link to="/register">
            <Button>Commencer gratuitement</Button>
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Simplifiez l'éducation, libérez le potentiel
          </h1>
          <p className="mt-6 text-lg text-muted">
            UniFlow centralise vos cours, communications, planifications et bien plus encore, dans une interface intuitive et moderne.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/register">
              <Button className="px-6 py-3 text-base">
                Commencer gratuitement <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login" className="text-sm font-medium text-primary hover:underline">
              Déjà utilisateur ? Se connecter
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/assets/UniFlow_Mascotte_Owl.png"
            alt="Étudiant UniFlow"
            className="max-h-[420px] w-auto object-contain"
          />
        </div>
      </section>

      <section id="features" className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Pourquoi choisir UniFlow ?</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
                  <Icon className="h-6 w-6 text-teal" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © 2024 UniFlow — Plateforme éducative moderne
      </footer>
    </div>
  )
}
