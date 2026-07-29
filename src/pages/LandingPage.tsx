import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users, Wifi, Shield, CheckCircle, Play } from 'lucide-react'

const features = [
  { icon: GraduationCap, title: 'Tout-en-un', desc: 'Cours, emplois du temps, devoirs, notes et plus encore dans une seule interface intuitive.' },
  { icon: Users,         title: 'Collaboratif', desc: 'Enseignants et étudiants dans un même espace partagé en temps réel.' },
  { icon: Wifi,          title: 'Accessible', desc: 'Fonctionne hors-ligne, adapté aux zones à faible connexion.' },
  { icon: Shield,        title: 'Sécurisé', desc: 'Données protégées et authentification multi-rôle par JWT + RBAC.' },
]

const stats = [
  { value: '12 000+', label: 'Étudiants actifs' },
  { value: '480+',    label: 'Enseignants' },
  { value: '98%',     label: 'Satisfaction' },
  { value: 'Offline', label: 'First par design' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center">
            <img src="/logos/logo-principal.png" alt="UniFlow" className="h-10 w-auto object-contain" />
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {['Fonctionnalités', 'À propos', 'Tarifs', 'Contact'].map(label => (
              <a key={label} href={`#${label.toLowerCase().replace('é','e').replace('à','a')}`}
                className="text-sm font-medium text-[#6b7280] hover:text-[#1e3a8a] transition-colors">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login"
              className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
              Se connecter
            </Link>
            <Link to="/app"
              className="rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#1e3a8a] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" /> Plateforme universitaire moderne
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-[#111827] lg:text-5xl">
              Simplifiez<br />l'éducation,<br />
              <span className="text-[#1e3a8a]">libérez le potentiel</span>
            </h1>
            <p className="mt-6 text-lg text-[#6b7280] leading-relaxed">
              UniFlow centralise vos cours, communications, planifications et bien plus encore,
              dans une interface intuitive et moderne.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/app"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors shadow-sm">
                Commencer gratuitement <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/presentation"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#374151] hover:text-[#1e3a8a] transition-colors">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] border border-[#e5e7eb]">
                  <Play className="h-3 w-3 ml-0.5 text-[#1e3a8a]" />
                </span>
                Voir la présentation
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#9ca3af]">
              Déjà utilisateur ?{' '}
              <Link to="/login" className="font-medium text-[#1e3a8a] hover:underline">Se connecter</Link>
            </p>
          </div>

          {/* Dashboard preview mockup */}
          <div className="relative animate-fade-in">
            <div className="rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
                  <div className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                  <div className="h-3 w-3 rounded-full bg-[#10b981]" />
                </div>
                <div className="flex-1 mx-4 rounded bg-white border border-[#e5e7eb] px-3 py-1 text-xs text-[#9ca3af]">
                  https://uniflow.kernelforge.codes
                </div>
              </div>
              {/* Hero illustration area with mascotte */}
              <div className="bg-gradient-to-br from-[#eff3ff] via-white to-[#f0fdfa] p-8 min-h-[280px] flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl overflow-hidden">
                    <img src="/logos/mascotte.png" alt="UniFlow Mascotte" className="h-full w-full object-contain" />
                  </div>
                  <p className="text-lg font-bold text-[#1e3a8a]">UniFlow Dashboard</p>
                  <p className="text-sm text-[#6b7280] mt-1">Interfaces Web Responsive</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { label: 'Cours inscrits', val: '12', color: 'bg-[#eff3ff] text-[#1e3a8a]' },
                      { label: 'Moyenne', val: '14.6/20', color: 'bg-[#f0fdfa] text-[#0d9488]' },
                      { label: 'Présences', val: '87%', color: 'bg-[#f0fdf4] text-[#059669]' },
                      { label: 'Devoirs', val: '5', color: 'bg-[#fef3c7] text-[#d97706]' },
                    ].map(s => (
                      <div key={s.label} className={`rounded-lg p-3 text-left ${s.color}`}>
                        <p className="text-lg font-bold">{s.val}</p>
                        <p className="text-xs opacity-80">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#0d9488] px-4 py-2 text-white shadow-lg text-xs font-semibold">
              ✓ Offline First
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#1e3a8a] py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-sm text-blue-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="fonctionnalites" className="bg-[#f3f4f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#111827]">Pourquoi choisir UniFlow ?</h2>
            <p className="mt-3 text-[#6b7280] max-w-xl mx-auto">Une plateforme pensée pour les universités africaines, avec une approche Offline First.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff3ff]">
                  <Icon className="h-6 w-6 text-[#1e3a8a]" />
                </div>
                <h3 className="font-semibold text-[#111827]">{title}</h3>
                <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#111827]">Prêt à transformer votre expérience universitaire ?</h2>
          <p className="mt-4 text-[#6b7280]">Rejoignez des milliers d'étudiants et d'enseignants qui utilisent UniFlow.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/app"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-8 py-3 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors shadow-sm">
              Commencer gratuitement <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login"
              className="rounded-lg border border-[#e5e7eb] px-8 py-3 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
              Se connecter
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#9ca3af]">
            {['Open source MIT', 'Offline First', 'Gratuit'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#0d9488]" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── UniFlow Sentinelle Extension ── */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a8a] via-[#2d4fa8] to-[#0d9488]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white mb-4 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" /> Extension IoT & IA
            </span>
            <h2 className="text-3xl font-extrabold text-white">UniFlow Sentinelle</h2>
            <p className="mt-3 text-blue-100 max-w-2xl mx-auto">
              Extension physique du campus avec matériel bas coût et robuste (Raspberry Pi), 
              connectant la plateforme à la couche physique.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Module Santé */}
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 hover:bg-white/15 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 shrink-0">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Module Santé</h3>
                  <p className="text-sm text-blue-100 mt-1">Kiosque de pré-diagnostic intelligent</p>
                </div>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                Kiosque à l'infirmerie avec capteurs médicaux connectés (oxymètre, tensiomètre, thermomètre) 
                et IA de triage qui classe l'urgence en temps réel.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-100">
                  🟢 Vert: Normal
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-xs font-semibold text-amber-100">
                  🟠 Orange: Surveillance
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-100">
                  🔴 Rouge: Urgence
                </span>
              </div>
            </div>

            {/* Module Vigie */}
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 hover:bg-white/15 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 shrink-0">
                  <span className="text-2xl">👁️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Module Vigie</h3>
                  <p className="text-sm text-blue-100 mt-1">Détection d'anomalie par IA edge</p>
                </div>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed mb-4">
                Détection de chute et d'anomalie par IA en périphérie (edge computing), 
                fonctionnelle même hors connexion sur les points sensibles du campus 
                (labos, bibliothèque de nuit, résidences, parkings).
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-blue-100">
                <span className="rounded-full bg-white/10 px-2 py-1">📚 Bibliothèque</span>
                <span className="rounded-full bg-white/10 px-2 py-1">🔬 Laboratoires</span>
                <span className="rounded-full bg-white/10 px-2 py-1">🏠 Résidences</span>
                <span className="rounded-full bg-white/10 px-2 py-1">🅿️ Parkings</span>
              </div>
            </div>
          </div>

          {/* Synergie */}
          <div className="rounded-2xl border-2 border-[#0d9488] bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0d9488] shrink-0">
                <span className="text-3xl">⚡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-extrabold text-white mb-2">La synergie inter-modules</h3>
                <p className="text-blue-100 leading-relaxed">
                  <strong className="text-white">Le point différenciant du projet :</strong> une chute détectée 
                  par <strong className="text-purple-200">Vigie</strong> déclenche automatiquement le protocole 
                  d'urgence de <strong className="text-emerald-200">Santé</strong>, sans qu'un témoin ait besoin 
                  d'atteindre un kiosque. Ce déclenchement croisé distingue Sentinelle d'un simple assemblage de gadgets IoT.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-[#0d9488]" />
                <span>Déclenchement automatique croisé</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-[#0d9488]" />
                <span>Fonctionnement hors ligne (edge AI)</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-[#0d9488]" />
                <span>Matériel bas coût (Raspberry Pi)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e5e7eb] py-8 text-center text-sm text-[#9ca3af]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logos/logo-principal.png" alt="UniFlow" className="h-8 w-auto object-contain" />
        </div>
        <p>© 2024 UniFlow — KERNEL FORGE · Université de Yaoundé I · Licence MIT</p>
      </footer>
    </div>
  )
}
