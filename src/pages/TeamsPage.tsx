import { Mail, Code2, Smartphone, Server, Database } from 'lucide-react'
import { LandingNavbar, LandingFooter } from '../components/layout/LandingLayout'

interface TeamMember {
  name: string
  github: string
  email: string
  team: string
  role: string
  icon: any
  color: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'NGHOMSI FEUKOUO RAVEL',
    github: 'Archlord12345',
    email: 'ravelnghomsi@gmail.com',
    team: 'Leadership',
    role: 'Chef de projet',
    icon: Code2,
    color: 'from-[#1e3a8a] to-[#0d9488]',
  },
  {
    name: 'Aliyatou Rachid Oumou Tourab',
    github: 'aliya-nadi',
    email: 'oumou.aliyatou@facsciences-uy1.cm',
    team: 'Frontend Desktop',
    role: 'Frontend Developer',
    icon: Code2,
    color: 'from-[#7c3aed] to-[#db2777]',
  },
  {
    name: 'Mandeng Judith Oceanne',
    github: 'oceannemj',
    email: 'judithoceanne12@gmail.com',
    team: 'Frontend Mobile',
    role: 'Mobile Developer',
    icon: Smartphone,
    color: 'from-[#0d9488] to-[#059669]',
  },
  {
    name: 'Meli William',
    github: 'WilliamMeli-27',
    email: 'meliwilliam27@gmail.com',
    team: 'Backend + BD',
    role: 'Backend Developer',
    icon: Server,
    color: 'from-[#f59e0b] to-[#d97706]',
  },
  {
    name: 'FEBNCHAK M. Borelle Sandra',
    github: 'FEBNCHAK',
    email: 'sandraborelle0@gmail.com',
    team: 'Frontend Mobile',
    role: 'Mobile Developer',
    icon: Smartphone,
    color: 'from-[#0d9488] to-[#059669]',
  },
  {
    name: 'HASSANE YOUSSOUF OUMAR',
    github: 'h-hawadja1',
    email: 'h.hawadja1@gmail.com',
    team: 'Backend NestJS',
    role: 'Backend Developer',
    icon: Server,
    color: 'from-[#ef4444] to-[#dc2626]',
  },
  {
    name: 'Mokam Ange',
    github: 'Ange55-star',
    email: 'ange.mokam@facsciences-uy1.cm',
    team: 'Backend + BD',
    role: 'Backend Developer',
    icon: Database,
    color: 'from-[#f59e0b] to-[#d97706]',
  },
]

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white mb-5">
            <Code2 className="h-3 w-3" /> KERNEL FORGE
          </span>
          <div className="mx-auto mb-4 flex justify-center">
            <img src="/logos/mascotte.png" alt="KERNEL FORGE" className="h-24 w-24 object-contain drop-shadow-2xl animate-float" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">L'équipe KERNEL FORGE</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Une équipe passionnée d'étudiants en informatique de l'Université de Yaoundé I, unie pour révolutionner l'éducation en Afrique.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#e5e7eb] bg-[#f9fafb] py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { label: 'Membres', value: teamMembers.length.toString() },
              { label: 'Frontend', value: '3' },
              { label: 'Backend', value: '3' },
              { label: 'Leadership', value: '1' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-[#1e3a8a]">{s.value}</p>
                <p className="text-sm text-[#6b7280] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1920px] px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#111827]">Notre équipe</h2>
            <p className="mt-3 text-[#6b7280]">Des étudiants passionnés qui construisent l'avenir de l'éducation numérique</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => {
              const Icon = member.icon
              return (
                <div key={member.github} className="group rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  {/* Header gradient */}
                  <div className={`h-24 bg-gradient-to-br ${member.color} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Icon className="h-16 w-16 text-white" />
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="relative px-6 pb-6">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                        <img
                          src={`https://github.com/${member.github}.png`}
                          alt={member.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1e3a8a&color=fff&size=128`
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-14 text-center">
                      <h3 className="font-bold text-[#111827] text-base leading-tight mb-1">{member.name}</h3>
                      <p className="text-sm font-semibold text-[#1e3a8a] mb-0.5">{member.role}</p>
                      <p className="text-xs text-[#9ca3af] mb-4">{member.team}</p>

                      {/* Links */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <a
                          href={`https://github.com/${member.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all"
                        >
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          @{member.github}
                        </a>
                      </div>

                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center gap-1.5 text-xs text-[#6b7280] hover:text-[#1e3a8a] transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e3a8a] py-14 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-extrabold text-white mb-3">Rejoignez l'aventure KERNEL FORGE</h2>
          <p className="text-blue-200 mb-6">Contributeurs open source bienvenus !</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/KERNEL-FORGE-G"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-[#1e3a8a] hover:bg-blue-50 transition-all shadow-xl"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              <Mail className="h-4 w-4" /> Nous contacter
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
