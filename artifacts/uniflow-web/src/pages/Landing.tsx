import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  MapPin, 
  Users, 
  ShieldCheck,
  Zap,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export default function Landing() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Fonctionnalités</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Témoignages</a>
          </div>
          <Link href="/auth">
            <Button className="rounded-full px-6 font-semibold" data-testid="btn-login-nav">
              Se connecter
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-background to-background"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Nouveau: Déploiement Cloud 2024
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] mb-6">
              L'excellence académique <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">parfaitement orchestrée.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              UniFlow est le système nerveux central des universités modernes au Cameroun. Gérez vos étudiants, vos cours, vos présences et vos salles depuis une plateforme unique, rapide et fiable.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
              <Link href="/auth">
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all">
                  Découvrir la plateforme <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-border hover:bg-muted">
                Contacter les ventes
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { label: "Universités actives", value: "12+", icon: "🏛️" },
              { label: "Étudiants gérés", value: "45,000+", icon: "👥" },
              { label: "Cours dispensés", value: "3,200+", icon: "📚" },
              { label: "Heures économisées/mois", value: "850h", icon: "⏱️" }
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col gap-3">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-foreground">{stat.value}</div>
                <div className="text-sm md:text-base font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Tout ce dont votre institution a besoin</h2>
            <p className="text-muted-foreground text-lg">Finis les fichiers Excel dispersés et la paperasse. UniFlow centralise chaque aspect de votre gestion universitaire.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Gestion des Étudiants", desc: "Dossiers complets, suivi de scolarité, inscriptions et filières." },
              { icon: BookOpen, title: "Unités d'Enseignement", desc: "Catalogue de cours, affectation des enseignants, gestion des crédits." },
              { icon: Calendar, title: "Emploi du Temps", desc: "Génération de plannings sans conflits, vues par salle ou par enseignant." },
              { icon: CheckSquare, title: "Suivi des Présences", desc: "Appels numériques rapides, alertes d'absentéisme et statistiques." },
              { icon: MapPin, title: "Gestion des Salles", desc: "Allocation des amphithéâtres, suivi des capacités et maintenances." },
              { icon: LineChart, title: "Analytique & Rapports", desc: "Tableaux de bord directionnels pour des prises de décision éclairées." }
            ].map((feat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-card border border-border p-8 rounded-2xl hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <feat.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-24 bg-gradient-to-r from-sidebar to-sidebar-border/50 border-y border-sidebar-border relative overflow-hidden">
        <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-1/2 h-[120%] bg-primary/8 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -right-[10%] top-1/4 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-sidebar-foreground">Sécurité et fiabilité de niveau institutionnel</h2>
              <p className="text-sidebar-foreground/70 text-lg mb-8 leading-relaxed">
                Les données de vos étudiants et de votre personnel sont critiques. Nous appliquons les standards de sécurité les plus stricts pour garantir confidentialité et disponibilité 24/7.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "Chiffrement de bout en bout des données sensibles" },
                  { icon: Zap, text: "Infrastructure cloud haute disponibilité (99.9% uptime)" },
                  { icon: Users, text: "Gestion granulaire des rôles et permissions (RBAC)" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sidebar-foreground/90 font-medium">
                    <item.icon className="text-primary h-6 w-6" /> {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="flex-1 w-full max-w-md relative">
            <div className="aspect-square rounded-full border border-sidebar-border absolute inset-0 animate-[spin_60s_linear_infinite] opacity-50"></div>
            <div className="aspect-square rounded-full border border-primary/20 absolute inset-8 animate-[spin_40s_linear_infinite_reverse] opacity-50"></div>
            <div className="bg-card border border-border shadow-2xl rounded-2xl p-6 relative z-10 transform translate-x-4 -translate-y-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="font-semibold">Statut du système</div>
                <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                  Opérationnel
                </div>
              </div>
              <div className="space-y-4">
                {['Base de données', 'API Authentification', 'Service d\'envoi d\'emails'].map((service, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{service}</span>
                    <span className="font-mono text-xs">99.99%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-20">Ils transforment l'éducation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Prof. Jean-Claude Owona", role: "Doyen de la Faculté des Sciences", quote: "Depuis l'intégration d'UniFlow, la planification des semestres prend deux jours au lieu de trois semaines. Un gain de temps inestimable pour notre administration." },
              { name: "Dr. Sandrine Njoya", role: "Chef Département Informatique", quote: "Le suivi des présences numérique a réduit l'absentéisme de 15%. Les étudiants savent que le système est fiable et instantané." },
              { name: "M. Albert Tchuente", role: "Responsable Scolarité", quote: "L'interface est si intuitive que même nos agents les moins à l'aise avec l'outil informatique l'ont adoptée en quelques jours." }
            ].map((test, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} className="bg-muted/30 p-8 rounded-2xl border border-border"
              >
                <div className="flex text-accent mb-4">
                  {[...Array(5)].map((_, j) => <svg key={j} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-lg text-foreground mb-6 font-medium italic">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                    {test.name.charAt(6)}
                  </div>
                  <div>
                    <div className="font-bold">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">Prêt à moderniser votre université ?</h2>
          <p className="text-primary-foreground/80 text-xl mb-10 max-w-2xl mx-auto">
            Rejoignez les institutions qui ont déjà fait le choix de l'efficacité et de la transparence avec UniFlow.
          </p>
          <Link href="/auth">
            <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold bg-background text-primary hover:bg-background/90 shadow-2xl">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo size="sm" />
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} UniFlow Cameroun. Tous droits réservés.
          </div>
          <div className="flex gap-4 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground">Confidentialité</a>
            <a href="#" className="hover:text-foreground">Conditions</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
