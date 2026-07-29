import { Link } from 'react-router-dom'
import { ArrowLeft, Play, ExternalLink } from 'lucide-react'

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#2d4fa8] to-[#0d9488]">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Retour à l'accueil</span>
          </Link>
          <div className="flex items-center">
            <img src="/logos/logo-principal.png" alt="UniFlow" className="h-10 w-auto object-contain brightness-0 invert" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white mb-4 backdrop-blur-sm">
            <Play className="h-3.5 w-3.5" /> Présentation officielle
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Découvrez UniFlow en action
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Une démonstration complète de la plateforme universitaire intelligente
          </p>
        </div>

        {/* Video Player */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 animate-scale-in">
          <div className="relative aspect-video bg-black">
            <video 
              controls 
              className="w-full h-full"
              preload="metadata"
            >
              <source src="/video/uniflow-presentation.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        </div>

        {/* Video Info */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-white">
            <h2 className="text-xl font-bold mb-4">📋 Au programme</h2>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Interface étudiante :</strong> Gestion des cours, devoirs, notes et emploi du temps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Espace enseignant :</strong> Création de cours, gestion des présences, notation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Rôle délégué :</strong> Prise de présences, exports, communication classe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Panneau admin :</strong> Gestion des salles, réservations, statistiques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">UniFlow Sentinelle :</strong> Extension IoT avec modules Santé et Vigie</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-white">
            <h2 className="text-xl font-bold mb-4">🎯 Points clés</h2>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Offline First :</strong> Fonctionnement hors ligne sur Mobile & Desktop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Multi-plateforme :</strong> Web (PWA), Mobile (iOS/Android), Desktop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Sécurisé :</strong> JWT + RBAC avec gestion multi-rôles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Bas coût :</strong> Architecture optimisée (Raspberry Pi pour Sentinelle)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 h-1.5 w-1.5 rounded-full bg-[#0d9488] shrink-0"></span>
                <span><strong className="text-white">Open Source :</strong> Licence MIT, code disponible sur GitHub</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/app"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#1e3a8a] hover:bg-blue-50 transition-colors shadow-lg">
              Essayer la démo
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link to="/login"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Se connecter
            </Link>
          </div>
          <p className="text-sm text-blue-200">
            <a href="https://uniflow.kernelforge.codes" target="_blank" rel="noopener noreferrer" 
              className="hover:underline inline-flex items-center gap-1">
              uniflow.kernelforge.codes
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-blue-200">
        <p>© 2024 UniFlow — KERNEL FORGE · Université de Yaoundé I</p>
      </div>
    </div>
  )
}
