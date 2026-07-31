import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Code2, Heart } from 'lucide-react'
import { LandingNavbar, LandingFooter } from '../components/layout/LandingLayout'

const team = [
  { name: 'NGHOMSI FEUKOUO RAVEL', role: 'Fondateur & Chef de projet', desc: 'GitHub: Archlord12345 · KERNEL FORGE', avatar: '👨‍💻', color: 'bg-[#eff3ff] text-[#1e3a8a]' },
  { name: 'KERNEL FORGE', role: 'Équipe de développement', desc: 'Étudiants en Informatique — Université de Yaoundé I', avatar: '🦅', color: 'bg-[#f0fdfa] text-[#0d9488]' },
  { name: 'Dr. Kamga',   role: 'Encadrant académique',   desc: 'Département Informatique — UY1',                    avatar: '👨‍🏫', color: 'bg-purple-50 text-purple-700' },
]

const techStack = [
  { cat: 'Frontend',  items: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Recharts'], color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { cat: 'Mobile',    items: ['React Native', 'Expo', 'SQLite (offline)', 'Push Notifications'], color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { cat: 'Backend',   items: ['Node.js / FastAPI', 'PostgreSQL', 'JWT + RBAC', 'WebSockets'],     color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { cat: 'IoT',       items: ['Raspberry Pi', 'Python', 'MQTT', 'TensorFlow Lite'],              color: 'bg-amber-50 text-amber-700 border-amber-200' },
]

const milestones = [
  { year: '2024', title: 'Idée & concept', desc: 'Naissance du projet KERNEL FORGE lors d\'un hackathon universitaire.' },
  { year: '2025 T1', title: 'Prototype web', desc: 'Première version de l\'interface web avec 4 rôles fonctionnels.' },
  { year: '2025 T2', title: 'Sentinelle IoT', desc: 'Développement des modules Santé et Vigie sur Raspberry Pi.' },
  { year: '2025 T4', title: 'Version 1.0', desc: 'Déploiement sur Vercel. Intégration visioconférence LAN.' },
  { year: '2026', title: 'Version 1.2', desc: 'Mobile offline, desktop Electron, API publique.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center">
            <img src="/logos/mascotte.png" alt="UniFlow" className="h-20 w-20 object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">À propos d'UniFlow</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Un projet universitaire né en Afrique, pour l'Afrique. Une vision claire :
            rendre l'éducation numérique accessible, même sans connexion permanente.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#1e3a8a] mb-4">
                <Heart className="h-3 w-3" /> Notre mission
              </span>
              <h2 className="text-3xl font-extrabold text-[#111827] mb-4">Construire l'université du futur, aujourd'hui</h2>
              <p className="text-[#6b7280] leading-relaxed mb-4">
                UniFlow est né d'un constat simple : les universités africaines méritent des outils numériques modernes
                qui tiennent compte de leurs réalités — coupures d'électricité, faible bande passante, diversité des appareils.
              </p>
              <p className="text-[#6b7280] leading-relaxed mb-6">
                Nous avons conçu une plateforme <strong className="text-[#1e3a8a]">Offline First</strong> qui fonctionne
                sur smartphone d'entrée de gamme, tablette ou ordinateur de bureau, avec ou sans Internet.
              </p>
              <div className="space-y-2.5">
                {[
                  'Accessibilité maximale — fonctionne sur tout appareil',
                  'Offline First — synchronisation intelligente',
                  'Multi-rôles — chaque acteur a son espace',
                  'Open Source MIT — transparent et libre',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-[#374151]">
                    <CheckCircle className="h-4 w-4 text-[#0d9488] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '12 000+', label: 'Étudiants ciblés', icon: '🎓', color: 'bg-[#eff3ff]' },
                { val: '480+',    label: 'Enseignants',       icon: '👨‍🏫', color: 'bg-[#f0fdfa]' },
                { val: '4',       label: 'Rôles différents',  icon: '🔑', color: 'bg-purple-50' },
                { val: 'MIT',     label: 'Licence Open Source', icon: '📖', color: 'bg-amber-50' },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl ${s.color} border border-[#e5e7eb] p-6 text-center`}>
                  <div className="text-4xl mb-2">{s.icon}</div>
                  <p className="text-3xl font-extrabold text-[#111827]">{s.val}</p>
                  <p className="text-sm text-[#6b7280] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-[#f3f4f6] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#111827]">L'équipe KERNEL FORGE</h2>
            <p className="mt-2 text-[#6b7280]">Étudiants et enseignants de l'Université de Yaoundé I</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {team.map(t => (
              <div key={t.name} className="rounded-2xl border border-[#e5e7eb] bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${t.color}`}>
                  {t.avatar}
                </div>
                <h3 className="font-bold text-[#111827]">{t.name}</h3>
                <p className="text-sm text-[#1e3a8a] font-medium mt-0.5">{t.role}</p>
                <p className="text-xs text-[#9ca3af] mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-extrabold text-[#111827] text-center mb-10">Notre parcours</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#e5e7eb]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-6 pl-20">
                  <div className={`absolute left-5 top-1.5 h-6 w-6 rounded-full border-4 border-white shadow-md ${i === milestones.length - 1 ? 'bg-[#0d9488]' : 'bg-[#1e3a8a]'}`} />
                  <div>
                    <span className="text-xs font-bold text-[#1e3a8a] uppercase tracking-wider">{m.year}</span>
                    <h3 className="font-bold text-[#111827] mt-0.5">{m.title}</h3>
                    <p className="text-sm text-[#6b7280] mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-[#f3f4f6] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#1e3a8a] mb-3">
              <Code2 className="h-3 w-3" /> Stack technique
            </span>
            <h2 className="text-2xl font-extrabold text-[#111827]">Technologies utilisées</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map(s => (
              <div key={s.cat} className={`rounded-2xl border p-5 ${s.color}`}>
                <h3 className="font-bold text-[#111827] mb-3">{s.cat}</h3>
                <ul className="space-y-1.5">
                  {s.items.map(i => (
                    <li key={i} className="text-sm text-[#374151] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e3a8a] py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Globe className="mx-auto h-10 w-10 text-white/60 mb-4" />
          <h2 className="text-2xl font-extrabold text-white mb-3">Rejoindre l'aventure UniFlow</h2>
          <p className="text-blue-200 mb-6">Contribuez au projet open source ou partenariez avec nous.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-[#1e3a8a] hover:bg-blue-50 transition-all">
              Nous contacter <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-7 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all">
              GitHub
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
