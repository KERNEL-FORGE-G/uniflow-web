import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { useUserRole } from '../../utils/userRole'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setCurrentRole } = useUserRole()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '', role: 'student', filiere: 'Informatique', niveau: 'Licence 2' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setCurrentRole(form.role as any)
    navigate('/app')
  }

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[#0d9488] p-12">
        <div className="max-w-md text-center text-white">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <span className="text-3xl font-black text-white">U</span>
          </div>
          <h1 className="text-3xl font-extrabold">Rejoignez UniFlow</h1>
          <p className="mt-3 text-teal-100 text-base">Créez votre espace en quelques minutes.</p>
          <div className="mt-8 space-y-3 text-left">
            {[
              'Accès à tous vos cours et emplois du temps',
              'Suivi des présences et devoirs en temps réel',
              'Messagerie et visioconférence intégrées',
              'Fonctionne même sans connexion Internet',
            ].map(t => (
              <div key={t} className="flex items-center gap-2.5 text-sm text-teal-100">
                <CheckCircle className="h-4 w-4 text-white shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e3a8a] text-white font-black text-lg">U</div>
            <span className="text-xl font-bold text-[#111827]">Uni<span className="text-[#0d9488]">Flow</span></span>
          </div>

          <h2 className="text-2xl font-extrabold text-[#111827]">Créer un compte</h2>
          <p className="mt-1 text-sm text-[#6b7280]">Étape {step} sur 2</p>

          {/* Progress */}
          <div className="mt-4 flex gap-2">
            {[1, 2].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-[#1e3a8a]' : 'bg-[#e5e7eb]'}`} />
            ))}
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">Prénom</label>
                  <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)} required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
                    placeholder="Emma" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">Nom</label>
                  <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)} required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
                    placeholder="Martin" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Adresse email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
                  placeholder="votre@uniflow.edu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Rôle</label>
                <select value={form.role} onChange={e => set('role', e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                  <option value="student">🎓 Étudiant</option>
                  <option value="delegate">📢 Délégué</option>
                  <option value="teacher">👨‍🏫 Enseignant</option>
                </select>
              </div>
              <button type="submit"
                className="w-full rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors shadow-sm">
                Continuer →
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Filière</label>
                <select value={form.filiere} onChange={e => set('filiere', e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                  {['Informatique', 'Mathématiques', 'Économie', 'Droit', 'Médecine', 'Génie Civil'].map(f => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Niveau</label>
                <select value={form.niveau} onChange={e => set('niveau', e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a]">
                  {['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat'].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Mot de passe</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} required
                    className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 pr-10 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
                    placeholder="Min. 8 caractères" />
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1">Confirmer le mot de passe</label>
                <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} required
                  className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 rounded-lg border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
                  ← Retour
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] disabled:opacity-60 shadow-sm">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Création...</> : 'Créer mon compte'}
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-[#6b7280]">
            Déjà inscrit ?{' '}
            <Link to="/login" className="font-medium text-[#1e3a8a] hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
