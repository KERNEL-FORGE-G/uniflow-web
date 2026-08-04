import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, Globe, Code2, Heart, Shield, Target, Zap, Users, Award, TrendingUp, Sparkles
} from 'lucide-react'
import { LandingNavbar, LandingFooter } from '../components/layout/LandingLayout'
import { AnimatedSection, AnimatedItem } from '../components/ui/AnimatedSection'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { fadeInUp, staggerContainer } from '../utils/animations'

const team = [
  { 
    name: 'NGHOMSI FEUKOUO RAVEL', 
    role: 'Fondateur & Chef de projet', 
    desc: 'GitHub: Archlord12345 · KERNEL FORGE', 
    avatar: Code2, 
    color: 'bg-[#eff3ff] text-[#1e3a8a]',
    gradient: 'from-[#1e3a8a] to-[#2d4fa8]'
  },
  { 
    name: 'KERNEL FORGE', 
    role: 'Équipe de développement', 
    desc: 'Étudiants en Informatique — Université de Yaoundé I', 
    avatar: Shield, 
    color: 'bg-[#f0fdfa] text-[#0d9488]',
    gradient: 'from-[#0d9488] to-[#14b8a8]'
  },
]

const values = [
  {
    icon: Globe,
    title: 'Accessibilité universelle',
    desc: 'Fonctionner partout, même sans Internet stable. Pour toutes les universités africaines.',
    color: 'text-[#1e3a8a] bg-[#eff3ff]'
  },
  {
    icon: Heart,
    title: 'Open Source & gratuit',
    desc: 'Code ouvert, transparent. Aucun frais d\'abonnement. L\'éducation est un droit.',
    color: 'text-rose-700 bg-rose-50'
  },
  {
    icon: Zap,
    title: 'Performance optimale',
    desc: 'Interface rapide et fluide. Optimisé pour les appareils à ressources limitées.',
    color: 'text-amber-700 bg-amber-50'
  },
  {
    icon: Users,
    title: 'Communauté active',
    desc: 'Développé par des étudiants, pour des étudiants. Feedback continu.',
    color: 'text-purple-700 bg-purple-50'
  },
]

const techStack = [
  { 
    cat: 'Frontend', 
    items: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Recharts', 'Framer Motion'], 
    color: 'from-blue-500 to-blue-600',
    icon: Code2
  },
  { 
    cat: 'Mobile', 
    items: ['React Native', 'Expo', 'SQLite (offline)', 'Push Notifications'], 
    color: 'from-emerald-500 to-emerald-600',
    icon: Sparkles
  },
  { 
    cat: 'Backend', 
    items: ['Node.js / FastAPI', 'PostgreSQL', 'JWT + RBAC', 'WebSockets'], 
    color: 'from-purple-500 to-purple-600',
    icon: Shield
  },
  { 
    cat: 'IoT', 
    items: ['Raspberry Pi', 'Python', 'MQTT', 'TensorFlow Lite'], 
    color: 'from-amber-500 to-amber-600',
    icon: Zap
  },
]

const milestones = [
  { 
    year: '2024', 
    title: 'Idée & concept', 
    desc: 'Naissance du projet KERNEL FORGE lors d\'un hackathon universitaire.',
    icon: Target,
    color: 'bg-[#eff3ff] text-[#1e3a8a]'
  },
  { 
    year: '2025 T1', 
    title: 'Prototype web', 
    desc: 'Première version de l\'interface web avec 4 rôles fonctionnels.',
    icon: Code2,
    color: 'bg-purple-50 text-purple-700'
  },
  { 
    year: '2025 T2', 
    title: 'Sentinelle IoT', 
    desc: 'Développement des modules Santé et Vigie sur Raspberry Pi.',
    icon: Shield,
    color: 'bg-[#f0fdfa] text-[#0d9488]'
  },
  { 
    year: '2025 T4', 
    title: 'Version 1.0', 
    desc: 'Déploiement sur Vercel. Intégration visioconférence LAN.',
    icon: Award,
    color: 'bg-amber-50 text-amber-700'
  },
  { 
    year: '2026', 
    title: 'Version 1.2', 
    desc: 'Mobile offline, desktop Electron, API publique.',
    icon: TrendingUp,
    color: 'bg-rose-50 text-rose-700'
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2d4fa8] to-[#0d9488] py-24 lg:py-32">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white blur-3xl"
        />
        
        <div className="relative mx-auto max-w-[1920px] px-6 text-center space-y-8">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center"
          >
            <img src="/logos/mascotte.png" alt="UniFlow" className="h-24 w-24 object-contain drop-shadow-2xl" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black text-white lg:text-6xl"
          >
            À propos d'UniFlow
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Un projet universitaire né en Afrique, pour l'Afrique. Une vision claire :
            rendre l'éducation numérique accessible, même sans connexion permanente.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <AnimatedSection className="bg-white py-20" stagger>
        <div className="mx-auto max-w-[1920px] px-6">
          <div className="text-center mb-16 space-y-4">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-black text-[#111827] lg:text-5xl"
            >
              Notre{' '}
              <span className="bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] bg-clip-text text-transparent">
                mission
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-[#6b7280] max-w-3xl mx-auto leading-relaxed"
            >
              UniFlow est une plateforme de gestion académique conçue pour fonctionner
              dans des environnements à connectivité limitée, tout en offrant une expérience
              utilisateur moderne et intuitive.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((val) => {
              const Icon = val.icon
              return (
                <AnimatedItem key={val.title}>
                  <Card hover className="h-full space-y-4 text-center">
                    <div className={`mx-auto w-fit rounded-2xl p-4 ${val.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827]">{val.title}</h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{val.desc}</p>
                  </Card>
                </AnimatedItem>
              )
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Team */}
      <section className="bg-gradient-to-br from-[#f9fafb] to-white py-20">
        <div className="mx-auto max-w-[1920px] px-6">
          <div className="text-center mb-16 space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-[#111827] lg:text-5xl"
            >
              L'équipe{' '}
              <span className="bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] bg-clip-text text-transparent">
                KERNEL FORGE
              </span>
            </motion.h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
          >
            {team.map((member) => {
              const Icon = member.avatar
              return (
                <AnimatedItem key={member.name}>
                  <Card hover className="space-y-6 text-center">
                    <div className={`mx-auto w-fit rounded-3xl p-8 bg-gradient-to-br ${member.gradient}`}>
                      <Icon className="h-16 w-16 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111827] mb-2">{member.name}</h3>
                      <p className="text-sm font-semibold text-[#1e3a8a] mb-3">{member.role}</p>
                      <p className="text-sm text-[#6b7280]">{member.desc}</p>
                    </div>
                  </Card>
                </AnimatedItem>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <AnimatedSection className="bg-white py-20" stagger>
        <div className="mx-auto max-w-[1920px] px-6">
          <div className="text-center mb-16 space-y-4">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-black text-[#111827] lg:text-5xl"
            >
              Stack{' '}
              <span className="bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] bg-clip-text text-transparent">
                technique
              </span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-[#6b7280] max-w-2xl mx-auto"
            >
              Technologies modernes et éprouvées pour une performance optimale
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {techStack.map((tech) => {
              const Icon = tech.icon
              return (
                <AnimatedItem key={tech.cat}>
                  <Card hover className="h-full space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-3 bg-gradient-to-br ${tech.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[#111827]">{tech.cat}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#374151]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Card>
                </AnimatedItem>
              )
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <section className="bg-gradient-to-br from-[#f9fafb] to-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16 space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-[#111827] lg:text-5xl"
            >
              Notre{' '}
              <span className="bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] bg-clip-text text-transparent">
                parcours
              </span>
            </motion.h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {milestones.map((milestone, idx) => {
              const Icon = milestone.icon
              return (
                <AnimatedItem key={idx}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="flex-shrink-0">
                      <div className={`rounded-2xl p-4 ${milestone.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-2xl font-black text-[#1e3a8a]">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-[#111827]">{milestone.title}</h3>
                      </div>
                      <p className="text-[#6b7280] leading-relaxed">{milestone.desc}</p>
                    </div>
                  </motion.div>
                </AnimatedItem>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#2d4fa8] to-[#0d9488] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white lg:text-5xl"
          >
            Rejoignez l'aventure UniFlow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Découvrez comment UniFlow peut transformer votre expérience universitaire
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/app">
              <Button size="lg" className="bg-white text-[#1e3a8a] hover:bg-gray-50 text-base px-8 py-4">
                Essayer maintenant <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 text-base px-8 py-4">
                Nous contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
