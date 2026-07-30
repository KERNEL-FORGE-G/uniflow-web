import { Link } from 'react-router-dom'
import {
  ArrowRight, Play, CheckCircle, GraduationCap, Users, Wifi, Shield,
  MessageSquare, BarChart3, Zap, Lock, ChevronRight,
} from 'lucide-react'
import { LandingNavbar, LandingFooter } from '../components/layout/LandingLayout'

const stats = [
  { value: '12 000+', label: 'Étudiants actifs' },
  { value: '480+',    label: 'Enseignants' },
  { value: '98%',     label: 'Satisfaction' },
  { value: '4',       label: 'Rôles & accès' },
]

const features = [
  {
    icon: GraduationCap,
    title: 'Gestion académique',
    desc: 'Cours, emplois du temps, devoirs, notes et bulletins centralisés dans une interface intuitive.',
    color: 'bg-[#eff3ff] text-[#1e3a8a]',
  },
  {
    icon: Users,
    title: 'Multi-rôles',
    desc: 'Étudiant, Délégué, Enseignant, Admin — chaque acteur dispose de son espace dédié.',
    color: 'bg-[#f0fdfa] text-[#0d9488]',
  },
  {
    icon: Wifi,
    title: 'Offline First',
    desc: 'Fonctionne sans connexion Internet. Conçu pour les zones à faible connectivité.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Shield,
    title: 'Sécurisé',
    desc: 'Authentification JWT + RBAC. Données protégées par rôle avec audit complet.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    icon: MessageSquare,
    title: 'Messagerie & Visio',
    desc: 'Chat en temps réel et visioconférence intégrée avec mode LAN sans Internet.',
    color: 'bg-purple-50 text-purple-700',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Tableaux de bord, statistiques de présence et suivi de progression en temps réel.',
    color: 'bg-rose-50 text-rose-700',
  },
]

const platforms = [
  { emoji: '📱', label: 'Mobile', sub: 'iOS & Android' },
  { emoji: '🌐', label: 'Web',    sub: 'PWA Progressive' },
  { emoji: '🖥️', label: 'Desktop', sub: 'Win, Mac, Linux' },
]

const testimonials = [
  {
    name: 'Dr. Kamga',
    role: 'Enseignant — Informatique',
    text: 'UniFlow a transformé ma gestion de cours. La synchronisation offline est parfaite pour nos campus.',
    avatar: 'K',
  },
  {
    name: 'Emma Martin',
    role: 'Étudiante L2 — Informatique',
    text: 'Je suis mes cours, devoirs et présences depuis mon téléphone, même sans connexion. C\'est révolutionnaire.',
    avatar: 'E',
  },
  {
    name: 'Lucas Dubois',
    role: 'Délégué — L2 Info',
    text: 'La gestion des présences par QR code en mode local, c\'est exactement ce dont on avait besoin.',
    avatar: 'L',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingNavbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#eff3ff] blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#f0fdfa] blur-3xl opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#1e3a8a] mb-5 border border-[#1e3a8a]/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488] animate-pulse-dot" />
                Plateforme universitaire intelligente
              </span>

              <h1 className="text-4xl font-extrabold leading-tight text-[#111827] lg:text-[3.25rem]">
                Simplifiez l'éducation,<br />
                <span className="bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] bg-clip-text text-transparent">
                  libérez le potentiel
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#6b7280] leading-relaxed max-w-lg">
                UniFlow centralise cours, emplois du temps, présences, devoirs et communications
                dans une plateforme moderne, pensée pour les universités africaines.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#2d4fa8] transition-all shadow-lg shadow-[#1e3a8a]/20 hover:shadow-xl hover:shadow-[#1e3a8a]/30 hover:-translate-y-0.5"
                >
                  Essayer gratuitement <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/presentation"
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-[#374151] hover:text-[#1e3a8a] transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#e5e7eb] shadow-sm">
                    <Play className="h-3.5 w-3.5 ml-0.5 text-[#1e3a8a]" />
                  </span>
                  Voir la démo vidéo
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                {[
                  'Gratuit & Open Source',
                  'Offline First',
                  'Multi-plateforme',
                ].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-[#6b7280]">
                    <CheckCircle className="h-4 w-4 text-[#0d9488]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — dashboard mockup + mascot */}
            <div className="relative animate-fade-in">
              {/* Mascot flottante */}
              <div className="absolute -top-8 -right-4 z-10 animate-float">
                <div className="relative">
                  <img
                    src="/logos/mascotte.png"
                    alt="Chouette UniFlow"
                    className="h-28 w-28 object-contain drop-shadow-xl"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#1e3a8a] px-3 py-1 text-[10px] font-bold text-white whitespace-nowrap shadow-lg">
                    Bonjour ! 👋
                  </div>
                </div>
              </div>

              {/* Browser mockup */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                    <div className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                    <div className="h-3 w-3 rounded-full bg-[#10b981]" />
                  </div>
                  <div className="flex-1 mx-4 rounded-md bg-white border border-[#e5e7eb] px-3 py-1 text-xs text-[#9ca3af] flex items-center gap-1.5">
                    <Lock className="h-2.5 w-2.5 text-[#10b981]" />
                    uniflow.kernelforge.codes
                  </div>
                </div>

                {/* Dashboard preview */}
                <div className="bg-gradient-to-br from-[#f3f4f6] to-white p-5">
                  {/* Mini topbar */}
                  <div className="flex items-center justify-between mb-4 rounded-lg bg-white border border-[#e5e7eb] px-3 py-2">
                    <span className="text-xs font-bold text-[#111827]">Bonjour, Emma 👋</span>
                    <span className="text-[10px] text-[#6b7280]">Lundi 13 mai 2024</span>
                  </div>
                  {/* KPI cards */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: 'Cours inscrits', val: '12', color: 'bg-[#eff3ff] text-[#1e3a8a]' },
                      { label: 'Moyenne', val: '14.6/20', color: 'bg-[#f0fdfa] text-[#0d9488]' },
                      { label: 'Présences', val: '87%', color: 'bg-emerald-50 text-emerald-700' },
                      { label: 'Devoirs', val: '5 à rendre', color: 'bg-amber-50 text-amber-700' },
                    ].map(s => (
                      <div key={s.label} className={`rounded-lg p-3 ${s.color}`}>
                        <p className="text-base font-extrabold">{s.val}</p>
                        <p className="text-[10px] font-medium opacity-80 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div className="rounded-lg bg-white border border-[#e5e7eb] p-3">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-[#374151]">Progression semestre</span>
                      <span className="font-bold text-[#0d9488]">72%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f3f4f6] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#0d9488]" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-[#0d9488] px-4 py-2.5 text-white shadow-lg text-xs font-bold flex items-center gap-2">
                <Wifi className="h-4 w-4" /> Mode Offline actif
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="border-y border-[#e5e7eb] bg-[#f9fafb] py-8">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-6">
            Disponible sur toutes les plateformes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {platforms.map(p => (
              <div key={p.label} className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-5 py-3 shadow-sm">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-[#111827]">{p.label}</p>
                  <p className="text-xs text-[#6b7280]">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#1e3a8a] py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-extrabold text-white">{value}</p>
                <p className="mt-2 text-sm text-blue-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="fonctionnalites" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#1e3a8a] mb-4">
              <Zap className="h-3.5 w-3.5" /> Fonctionnalités clés
            </span>
            <h2 className="text-3xl font-extrabold text-[#111827]">Tout ce dont votre université a besoin</h2>
            <p className="mt-3 text-[#6b7280] max-w-xl mx-auto">
              UniFlow couvre l'intégralité du cycle académique, du cours à la visioconférence en passant par les notes et les présences.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sentinelle teaser ── */}
      <section className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0d9488]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white mb-5 border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488] animate-pulse-dot" /> Extension IoT & IA
              </span>
              <h2 className="text-3xl font-extrabold mb-4">UniFlow Sentinelle</h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                L'extension physique du campus. Matériel bas coût (Raspberry Pi) connecté à la plateforme pour une couverture totale — de la santé à la sécurité des espaces.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: '🏥', label: 'Module Santé', desc: 'Kiosque de pré-diagnostic avec IA de triage médical' },
                  { icon: '👁️', label: 'Module Vigie', desc: 'Détection d\'anomalies par edge AI, fonctionne offline' },
                  { icon: '⚡', label: 'Synergie inter-modules', desc: 'Déclenchement croisé automatique en cas d\'urgence' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 rounded-xl bg-white/10 p-3 border border-white/10">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.label}</p>
                      <p className="text-xs text-blue-200 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/sentinelle"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1e3a8a] hover:bg-blue-50 transition-colors shadow-lg"
              >
                Découvrir Sentinelle <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Visual */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Central mascot enlarged */}
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/10 border border-white/20">
                  <img src="/logos/mascotte.png" alt="Sentinelle" className="h-48 w-48 object-contain drop-shadow-2xl animate-float" />
                </div>
                {/* Floating module badges */}
                <div className="absolute -top-4 -right-4 rounded-2xl bg-emerald-500 px-4 py-2.5 text-white text-xs font-bold shadow-xl">
                  🏥 Santé
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-purple-500 px-4 py-2.5 text-white text-xs font-bold shadow-xl">
                  👁️ Vigie
                </div>
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 rounded-2xl bg-[#0d9488] px-4 py-2.5 text-white text-xs font-bold shadow-xl">
                  ⚡ Synergie
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#f3f4f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#111827]">Ils font confiance à UniFlow</h2>
            <p className="mt-3 text-[#6b7280]">Des étudiants et enseignants qui ont transformé leur expérience académique.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                    <p className="text-xs text-[#6b7280]">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#374151] leading-relaxed italic">"{t.text}"</p>
                <div className="mt-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {/* Mascot */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <img src="/logos/mascotte.png" alt="UniFlow" className="h-20 w-20 object-contain animate-bounce" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#111827]">
            Prêt à transformer votre expérience universitaire ?
          </h2>
          <p className="mt-4 text-lg text-[#6b7280] max-w-xl mx-auto">
            Rejoignez des milliers d'étudiants et d'enseignants qui utilisent UniFlow au quotidien.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#2d4fa8] transition-all shadow-lg"
            >
              Commencer gratuitement <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-[#e5e7eb] px-8 py-3.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
            >
              Contacter l'équipe
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#9ca3af]">
            {['Open Source MIT', 'Offline First', 'Gratuit', 'Multi-plateforme'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-[#0d9488]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles overview ── */}
      <section className="bg-[#f3f4f6] border-t border-[#e5e7eb] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-extrabold text-[#111827] text-center mb-10">Une plateforme, 4 expériences</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                emoji: '🎓', role: 'Étudiant', color: 'border-[#1e3a8a] bg-[#eff3ff] text-[#1e3a8a]',
                features: ['Cours & documents', 'Emploi du temps', 'Notes & devoirs', 'Présences QR Code'],
              },
              {
                emoji: '📢', role: 'Délégué', color: 'border-purple-300 bg-purple-50 text-purple-700',
                features: ['Gestion présences', 'QR Code appel', 'Rapports classe', 'Communication'],
              },
              {
                emoji: '👨‍🏫', role: 'Enseignant', color: 'border-[#0d9488] bg-[#f0fdfa] text-[#0d9488]',
                features: ['Espace pédagogique', 'Saisie des notes', 'Visioconférence', 'Suivi cohorte'],
              },
              {
                emoji: '⚙️', role: 'Administrateur', color: 'border-amber-300 bg-amber-50 text-amber-700',
                features: ['Gestion utilisateurs', 'Structure académique', 'Statistiques', 'Configuration'],
              },
            ].map(r => (
              <div key={r.role} className={`rounded-2xl border-2 p-5 ${r.color}`}>
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="font-bold text-[#111827] mb-3">{r.role}</h3>
                <ul className="space-y-1.5">
                  {r.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                      <CheckCircle className="h-3.5 w-3.5 text-[#0d9488] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
