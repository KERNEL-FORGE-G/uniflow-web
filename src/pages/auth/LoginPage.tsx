import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useUserRole } from '../../utils/userRole'

const demoAccounts = [
  { role: 'student' as const,  label: 'Étudiant',   email: 'emma.martin@uniflow.edu',  color: 'bg-[#1e3a8a]' },
  { role: 'delegate' as const, label: 'Délégué',    email: 'lucas.dubois@uniflow.edu', color: 'bg-[#0d9488]' },
  { role: 'teacher' as const,  label: 'Enseignant', email: 'dr.martin@uniflow.edu',    color: 'bg-[#7c3aed]' },
  { role: 'admin' as const,    label: 'Admin',      email: 'admin@uniflow.edu',        color: 'bg-[#d97706]' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { setCurrentRole } = useUserRole()
  const [email, setEmail] = useState('emma.martin@uniflow.edu')
  const [password, setPassword] = useState('password123')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return }
    // Detect role from email
    if (email.includes('admin')) setCurrentRole('admin')
    else if (email.includes('lucas')) setCurrentRole('delegate')
    else if (email.includes('dr.martin') || email.includes('kamga') || email.includes('prof')) setCurrentRole('teacher')
    else setCurrentRole('student')
    
    // Redirect admin to admin panel
    if (email.includes('admin')) navigate('/admin')
    else navigate('/app')
  }

  const handleDemo = (role: typeof demoAccounts[0]['role'], demoEmail: string) => {
    setCurrentRole(role)
    setEmail(demoEmail)
    setPassword('password123')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#2d4fa8] to-[#0d9488] p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-white/5 blur-3xl"></div>
        
        <div className="max-w-md text-center text-white relative z-10">
          <img src="/logos/logo-principal.png" alt="UniFlow" className="mx-auto h-16 mb-8 object-contain brightness-0 invert" />
          <p className="text-blue-100 text-xl leading-relaxed mb-10">La plateforme universitaire intelligente</p>
          <div className="space-y-3 text-sm text-blue-100 mb-10">
            <p className="flex items-center justify-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-base">Disponible sur Mobile, Web & Desktop</span>
            </p>
            <p className="flex items-center justify-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-base">Mode hors ligne avec synchronisation</span>
            </p>
          </div>
          <div className="space-y-5 text-left">
            {[
              { icon: '🎓', title: 'Gestion académique complète', desc: 'Cours, devoirs, notes et emploi du temps centralisés.' },
              { icon: '📡', title: 'Offline First', desc: 'Fonctionne même sans connexion Internet.' },
              { icon: '🔐', title: 'Sécurisé & Multi-rôles', desc: 'JWT + RBAC pour chaque type d\'utilisateur.' },
            ].map(item => (
              <div key={item.title} className="flex gap-4 rounded-xl bg-white/10 backdrop-blur-sm p-5 hover:bg-white/15 transition-colors">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white text-base">{item.title}</p>
                  <p className="text-blue-100 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-extrabold text-[#111827]">Connexion</h2>
          <p className="mt-1 text-sm text-[#6b7280]">Accédez à votre espace de travail.</p>

          {/* Quick demo buttons */}
          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Connexion rapide (démo)</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map(acc => (
                <button key={acc.role} type="button" onClick={() => handleDemo(acc.role, acc.email)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95 ${acc.color}`}>
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e5e7eb]" />
            <span className="text-xs text-[#9ca3af]">ou</span>
            <div className="flex-1 h-px bg-[#e5e7eb]" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">Adresse email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-all"
                placeholder="votre@uniflow.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1">Mot de passe</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-all"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#374151]">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-1 text-right">
                <button type="button" className="text-xs text-[#1e3a8a] hover:underline">Mot de passe oublié ?</button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors disabled:opacity-60 shadow-sm">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Connexion...</> : 'Se connecter'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b7280]">
            Pas encore de compte ?{' '}
            <Link to="/register" className="font-medium text-[#1e3a8a] hover:underline">S'inscrire</Link>
          </p>
          <p className="mt-2 text-center text-xs text-[#9ca3af]">
            <Link to="/" className="hover:underline">← Retour à l'accueil</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
