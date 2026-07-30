import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Zap, Shield, Wifi, AlertTriangle } from 'lucide-react'
import { LandingNavbar, LandingFooter } from '../components/layout/LandingLayout'

const sante_features = [
  'Oxymètre connecté (SpO2 & fréquence cardiaque)',
  'Tensiomètre numérique',
  'Thermomètre infrarouge',
  'IA de triage en temps réel (3 niveaux)',
  'Historique médical anonymisé',
  'Alerte automatique infirmerie',
]

const vigie_features = [
  'Détection de chute par accéléromètre',
  'Analyse vidéo edge AI (local, no cloud)',
  'Zones couvertes : labos, biblio, résidences',
  'Fonctionnement hors connexion total',
  'Alertes push instantanées',
  'Intégration protocole d\'urgence campus',
]

export default function SentinellePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0d9488] py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488] animate-pulse-dot" />
            Extension IoT & IA — Campus Intelligent
          </span>
          <div className="mx-auto mb-6 flex justify-center">
            <img src="/logos/mascotte.png" alt="Sentinelle" className="h-28 w-28 object-contain drop-shadow-2xl animate-float" />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">UniFlow Sentinelle</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
            L'extension physique du campus universitaire. Matériel bas coût, IA embarquée,
            fonctionnement hors ligne. Du diagnostic médical à la sécurité des espaces.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/app" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#1e3a8a] hover:bg-blue-50 transition-all shadow-xl">
              Voir la démo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all">
              Contacter l'équipe
            </Link>
          </div>
        </div>
      </section>

      {/* Concept */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#111827]">Pourquoi Sentinelle ?</h2>
            <p className="mt-3 text-[#6b7280] max-w-2xl mx-auto">
              Les universités africaines font face à des défis uniques : coupures de courant, faible connectivité, infrastructure médicale limitée.
              Sentinelle répond à ces contraintes avec une architecture bas coût et résiliente.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '💡', title: 'Bas coût', desc: 'Raspberry Pi + capteurs standards. Déploiement accessible pour tout campus.', color: 'bg-amber-50 text-amber-700 border-amber-200' },
              { icon: '📡', title: 'Offline First', desc: 'IA embarquée qui fonctionne sans Internet. Parfait pour les zones isolées.', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { icon: '🔗', title: 'Synergie totale', desc: 'Les modules communiquent entre eux. Une chute déclenche le protocole médical.', color: 'bg-[#eff3ff] text-[#1e3a8a] border-[#1e3a8a]/20' },
              { icon: '🛡️', title: 'Privé & Sécurisé', desc: 'Données anonymisées, traitées en local. Aucune donnée sensible sur le cloud.', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            ].map(item => (
              <div key={item.title} className={`rounded-2xl border p-6 ${item.color}`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Santé */}
      <section className="bg-[#f3f4f6] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 mb-4">
                🏥 Module 1
              </span>
              <h2 className="text-3xl font-extrabold text-[#111827] mb-4">Module Santé</h2>
              <p className="text-[#6b7280] leading-relaxed mb-6">
                Un kiosque médical intelligent installé à l'infirmerie et aux points stratégiques du campus.
                Les étudiants mesurent leurs constantes vitales en autonomie. Une IA classe l'urgence en 3 niveaux et
                alerte le personnel médical automatiquement.
              </p>
              <ul className="space-y-2.5 mb-8">
                {sante_features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#374151]">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                {[
                  { color: 'bg-emerald-500', label: 'Vert — Normal', desc: 'Aucune action requise' },
                  { color: 'bg-amber-500',   label: 'Orange — Surveillance', desc: 'Alerte infirmier' },
                  { color: 'bg-red-500',     label: 'Rouge — Urgence', desc: 'Intervention immédiate' },
                ].map(t => (
                  <div key={t.label} className="flex-1 rounded-xl border border-[#e5e7eb] bg-white p-3 text-center">
                    <div className={`mx-auto h-4 w-4 rounded-full ${t.color} mb-2`} />
                    <p className="text-xs font-bold text-[#111827]">{t.label}</p>
                    <p className="text-[10px] text-[#6b7280] mt-0.5">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-xl">
              <h3 className="text-sm font-bold text-[#111827] mb-6 text-center">Interface Kiosque Santé</h3>
              <div className="space-y-4">
                {[
                  { label: 'SpO2', value: '98%', status: 'normal', icon: '❤️' },
                  { label: 'Fréq. cardiaque', value: '72 bpm', status: 'normal', icon: '💓' },
                  { label: 'Température', value: '36.8°C', status: 'normal', icon: '🌡️' },
                  { label: 'Tension', value: '120/80 mmHg', status: 'normal', icon: '🩺' },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-sm font-medium text-[#374151]">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-emerald-700">{m.value}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                ))}
                <div className="rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-center">
                  <p className="text-xs font-bold text-emerald-800">✅ Statut : Normal — Aucune alerte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Vigie */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1 rounded-2xl border border-slate-200 bg-[#0f172a] p-8 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-6 text-center">Interface Vigie — Campus en direct</h3>
              <div className="space-y-3">
                {[
                  { zone: 'Bibliothèque principale', status: 'Sécurisé', color: 'text-emerald-400', dot: 'bg-emerald-400', icon: '📚' },
                  { zone: 'Laboratoire C205',        status: 'Sécurisé', color: 'text-emerald-400', dot: 'bg-emerald-400', icon: '🔬' },
                  { zone: 'Résidence Bloc A',        status: '⚠ Anomalie détectée', color: 'text-amber-400', dot: 'bg-amber-400', icon: '🏠' },
                  { zone: 'Parking nord',            status: 'Sécurisé', color: 'text-emerald-400', dot: 'bg-emerald-400', icon: '🅿️' },
                ].map(z => (
                  <div key={z.zone} className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{z.icon}</span>
                      <span className="text-sm font-medium text-slate-200">{z.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${z.color}`}>{z.status}</span>
                      <span className={`h-2 w-2 rounded-full ${z.dot} animate-pulse`} />
                    </div>
                  </div>
                ))}
                <div className="rounded-lg bg-amber-900/40 border border-amber-700/50 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-amber-300">Anomalie détectée — Résidence Bloc A</p>
                      <p className="text-[10px] text-amber-400 mt-0.5">Chute possible — Protocole santé déclenché</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-semibold text-purple-700 mb-4">
                👁️ Module 2
              </span>
              <h2 className="text-3xl font-extrabold text-[#111827] mb-4">Module Vigie</h2>
              <p className="text-[#6b7280] leading-relaxed mb-6">
                Surveillance intelligente des espaces sensibles du campus. L'IA edge analyse les données
                en local sans envoyer d'images sur le cloud — vie privée garantie. Fonctionne 24h/24
                même sans Internet.
              </p>
              <ul className="space-y-2.5">
                {vigie_features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#374151]">
                    <CheckCircle className="h-4 w-4 text-purple-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Synergie */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0d9488] py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white mb-5 border border-white/20">
            <Zap className="h-3.5 w-3.5" /> Le différenciateur clé
          </span>
          <h2 className="text-3xl font-extrabold text-white mb-4">La synergie inter-modules</h2>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
            <strong className="text-white">C'est le point différenciant du projet :</strong> une chute détectée par{' '}
            <strong className="text-purple-300">Vigie</strong> déclenche automatiquement le protocole d'urgence de{' '}
            <strong className="text-emerald-300">Santé</strong>, sans qu'un témoin ait besoin d'intervenir.
            Ce déclenchement croisé distingue Sentinelle d'un simple assemblage de gadgets IoT.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            <div className="rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-white text-center">
              <div className="text-3xl mb-2">👁️</div>
              <p className="font-bold">Vigie détecte</p>
              <p className="text-xs text-blue-200 mt-1">Chute ou anomalie</p>
            </div>
            <ArrowRight className="h-8 w-8 text-white/60" />
            <div className="rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-white text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-bold">Signal croisé</p>
              <p className="text-xs text-blue-200 mt-1">Automatique, offline</p>
            </div>
            <ArrowRight className="h-8 w-8 text-white/60" />
            <div className="rounded-2xl bg-white/10 border border-white/20 px-6 py-4 text-white text-center">
              <div className="text-3xl mb-2">🏥</div>
              <p className="font-bold">Santé intervient</p>
              <p className="text-xs text-blue-200 mt-1">Protocole urgence</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: CheckCircle, text: 'Déclenchement croisé automatique', color: 'text-emerald-400' },
              { icon: Wifi,        text: 'Fonctionnement offline (edge AI)', color: 'text-blue-300' },
              { icon: Shield,      text: 'Matériel bas coût (Raspberry Pi)', color: 'text-purple-300' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2 justify-center text-sm font-medium text-white bg-white/10 rounded-xl px-4 py-3 border border-white/10">
                <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-extrabold text-[#111827] text-center mb-10">Stack technique</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { cat: 'Matériel', items: ['Raspberry Pi 4B', 'Oxymètre MAX30102', 'Thermomètre MLX90614', 'Caméra Pi HQ'], color: 'bg-[#eff3ff] text-[#1e3a8a] border-[#1e3a8a]/20' },
              { cat: 'IA Edge',  items: ['TensorFlow Lite', 'MediaPipe Pose', 'Edge Impulse', 'OpenCV'], color: 'bg-purple-50 text-purple-700 border-purple-200' },
              { cat: 'Backend', items: ['FastAPI (Python)', 'SQLite offline', 'MQTT LAN', 'WebSockets'], color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { cat: 'Intégration', items: ['UniFlow API REST', 'Alertes push', 'Dashboard admin', 'Logs d\'événements'], color: 'bg-amber-50 text-amber-700 border-amber-200' },
            ].map(s => (
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
      <section className="bg-[#f3f4f6] border-t border-[#e5e7eb] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <img src="/logos/mascotte.png" alt="Sentinelle" className="mx-auto h-16 w-16 object-contain mb-4 animate-float" />
          <h2 className="text-2xl font-extrabold text-[#111827] mb-3">Intégrer Sentinelle à votre campus</h2>
          <p className="text-[#6b7280] mb-8">Contactez-nous pour un devis ou pour en savoir plus sur le déploiement.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-7 py-3 text-sm font-bold text-white hover:bg-[#2d4fa8] transition-all shadow-lg">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/presentation" className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-7 py-3 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-all">
              Voir la présentation
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
