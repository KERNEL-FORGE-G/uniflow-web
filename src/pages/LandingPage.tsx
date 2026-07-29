import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users, Wifi, Shield, CheckCircle, Play, Sparkles, Zap, TrendingUp } from 'lucide-react'

const features = [
  { icon: GraduationCap, title: 'Tout-en-un', desc: 'Cours, emplois du temps, devoirs, notes et plus encore dans une seule interface intuitive.', color: 'from-blue-500 to-indigo-600' },
  { icon: Users,         title: 'Collaboratif', desc: 'Enseignants et étudiants dans un même espace partagé en temps réel.', color: 'from-teal-500 to-emerald-600' },
  { icon: Wifi,          title: 'Accessible', desc: 'Fonctionne hors-ligne, adapté aux zones à faible connexion.', color: 'from-purple-500 to-pink-600' },
  { icon: Shield,        title: 'Sécurisé', desc: 'Données protégées et authentification multi-rôle par JWT + RBAC.', color: 'from-orange-500 to-red-600' },
]

const stats = [
  { value: '12 000+', label: 'Étudiants actifs', trend: '+15%' },
  { value: '480+',    label: 'Enseignants', trend: '+8%' },
  { value: '98%',     label: 'Satisfaction', trend: '+3%' },
  { value: 'Offline', label: 'First design', trend: '100%' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30 font-sans overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-blue-400 top-0 -left-48" />
        <div className="glow-orb w-[500px] h-[500px] bg-teal-400 bottom-0 -right-64" />
        <div className="glow-orb w-80 h-80 bg-indigo-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 animate-fade-in-left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl blur opacity-30 animate-pulse-glow" />
              <img src="/logos/logo-principal.png" alt="UniFlow" className="relative h-11 w-auto object-contain rounded-xl" />
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex animate-fade-in-down">
            <a href="#fonctionnalites" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">Fonctionnalités</a>
            <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">À propos</Link>
            <Link to="/pricing" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">Tarifs</Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105">Contact</Link>
          </div>
          <div className="flex items-center gap-3 animate-fade-in-right">
            <Link to="/login"
              className="rounded-xl border-2 border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              Se connecter
            </Link>
            <Link to="/app"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 btn-ripple">
              <span className="relative z-10 flex items-center gap-2">
                Commencer gratuitement <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-in-up space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100/80 to-teal-100/80 px-4 py-2 text-xs font-bold text-blue-700 border border-blue-200 shadow-md backdrop-blur-sm hover:scale-105 transition-transform cursor-default">
              <Sparkles className="h-3.5 w-3.5 text-teal-500 animate-pulse" />
              Plateforme universitaire nouvelle génération
            </div>
            
            <h1 className="text-5xl font-black leading-tight text-slate-900 lg:text-6xl xl:text-7xl">
              Simplifiez<br />l'éducation,<br />
              <span className="gradient-text block mt-2">libérez le potentiel</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              UniFlow centralise vos cours, communications, planifications et bien plus encore,
              dans une interface <strong className="text-blue-600 font-bold">intuitive</strong> et <strong className="text-teal-600 font-bold">moderne</strong>.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/app"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 btn-ripple">
                Commencer gratuitement 
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/presentation"
                className="group inline-flex items-center gap-2.5 text-base font-bold text-slate-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white border-2 border-slate-200 shadow-md group-hover:border-blue-500 group-hover:shadow-lg transition-all">
                  <Play className="h-4 w-4 ml-0.5 text-blue-600" />
                </span>
                Voir la présentation
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-teal-500" />
                <span className="font-medium text-slate-600">Gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-teal-500" />
                <span className="font-medium text-slate-600">Open Source</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-teal-500" />
                <span className="font-medium text-slate-600">Offline First</span>
              </div>
            </div>
          </div>

          {/* Dashboard preview mockup */}
          <div className="relative animate-fade-in-up lg:animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl blur-3xl opacity-20 animate-pulse-glow scale-110" />
              
              {/* Main card */}
              <div className="relative rounded-3xl border border-white/40 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden hover:shadow-premium-xl transition-all duration-500 hover:-translate-y-2">
                {/* Browser bar */}
                <div className="flex items-center gap-2 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-5 py-3">
                  <div className="flex gap-2">
                    <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-sm" />
                    <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm" />
                    <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm" />
                  </div>
                  <div className="flex-1 mx-4 rounded-lg bg-white border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-400 shadow-sm">
                    https://uniflow.kernelforge.codes
                  </div>
                </div>
                
                {/* Hero illustration area with mascotte */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 p-8 min-h-[320px]">
                  <div className="text-center space-y-6">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl blur-xl opacity-40 animate-float" />
                      <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                        <img src="/logos/mascotte.png" alt="UniFlow Mascotte" className="h-full w-full object-contain animate-float" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">UniFlow Dashboard</p>
                      <p className="text-sm text-slate-500 font-medium mt-1">Interfaces Web Responsive</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                      {[
                        { label: 'Cours inscrits', val: '12', gradient: 'from-blue-500 to-indigo-600' },
                        { label: 'Moyenne', val: '14.6/20', gradient: 'from-teal-500 to-emerald-600' },
                        { label: 'Présences', val: '87%', gradient: 'from-emerald-500 to-green-600' },
                        { label: 'Devoirs', val: '5', gradient: 'from-amber-500 to-orange-600' },
                      ].map(s => (
                        <div key={s.label} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} p-4 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <p className="relative text-2xl font-black">{s.val}</p>
                          <p className="relative text-xs font-medium opacity-90">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 px-5 py-3 text-white shadow-xl text-sm font-bold animate-float flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Offline First
              </div>
              
              {/* Stats floating card */}
              <div className="absolute -top-6 -left-6 rounded-2xl bg-white/95 backdrop-blur-xl px-5 py-4 shadow-xl border border-white/50 animate-float-horizontal">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Croissance</p>
                    <p className="text-lg font-black text-slate-900">+127%</p>
                  </div>
                </div>
              </div>
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
