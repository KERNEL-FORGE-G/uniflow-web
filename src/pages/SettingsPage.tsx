import { useState } from 'react'
import { Camera, Bell, Globe, Shield, Database, Save } from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'
import { useUserRole } from '../utils/userRole'
import { mockUsers } from '../data/mockData'

const sections = [
  { group: 'Compte',      items: ['Profil', 'Sécurité', 'Notifications'] },
  { group: 'Préférences', items: ['Langue', 'Thème', 'Accessibilité'] },
  { group: 'Système',     items: ['Confidentialité', 'Données'] },
  { group: 'Support',     items: ['Aide', 'Contact'] },
]

export default function SettingsPage() {
  const { currentRole, language, setLanguage } = useUserRole()
  const user = currentRole === 'teacher' ? mockUsers.teacher : mockUsers.student
  const [section, setSection] = useState('Profil')
  const [toggles, setToggles] = useState({ push: true, email: true, sms: false, newsletter: false })
  const [saved, setSaved] = useState(false)

  const toggle = (k: keyof typeof toggles) => setToggles(t => ({ ...t, [k]: !t[k] }))
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <h1 className="text-xl font-bold text-[#111827]">Paramètres</h1>
        <p className="text-sm text-[#6b7280] mt-0.5">Gérez vos préférences et informations de compte.</p>
      </div>

      {saved && (
        <div className="rounded-xl bg-[#d1fae5] border border-[#a7f3d0] px-4 py-3 text-sm font-medium text-[#065f46] flex items-center gap-2 animate-fade-in">
          <Save className="h-4 w-4" /> Modifications enregistrées.
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-sm">
          {sections.map(({ group, items }) => (
            <div key={group} className="mb-4">
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">{group}</p>
              {items.map(item => (
                <button key={item} onClick={() => setSection(item)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${section === item ? 'bg-[#eff3ff] text-[#1e3a8a]' : 'text-[#374151] hover:bg-[#f9fafb]'}`}>
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-5">
          {section === 'Profil' && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-5">Informations personnelles</h2>
              <div className="flex items-center gap-5 pb-6 border-b border-[#f3f4f6] mb-5">
                <div className="relative">
                  <Avatar name={user.name} size="xl" />
                  <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#1e3a8a] text-white shadow">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-[#111827]">{user.name}</h3>
                  <p className="text-sm text-[#6b7280]">{user.role} · {user.filiere}</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Nom complet', val: user.name, type: 'text' },
                  { label: 'Email',       val: user.email, type: 'email' },
                  { label: 'Téléphone',   val: user.phone, type: 'tel' },
                  { label: 'Adresse',     val: user.address, type: 'text' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">{f.label}</label>
                    <input type={f.type} defaultValue={f.val}
                      className="w-full rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]" />
                  </div>
                ))}
                <button onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8] transition-colors">
                  <Save className="h-4 w-4" /> Enregistrer
                </button>
              </div>
            </div>
          )}

          {section === 'Notifications' && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-5 flex items-center gap-2"><Bell className="h-4 w-4 text-[#1e3a8a]" /> Préférences de notifications</h2>
              <div className="space-y-4">
                {[
                  { key: 'push' as const,       label: 'Notifications push',   desc: 'Alertes en temps réel dans le navigateur' },
                  { key: 'email' as const,      label: 'Notifications email',  desc: 'Résumé quotidien par email' },
                  { key: 'sms' as const,        label: 'Alertes SMS',          desc: 'Pour les événements critiques uniquement' },
                  { key: 'newsletter' as const, label: 'Newsletter UniFlow',   desc: 'Nouveautés et mises à jour de la plateforme' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-[#f9fafb] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#111827]">{n.label}</p>
                      <p className="text-xs text-[#9ca3af] mt-0.5">{n.desc}</p>
                    </div>
                    <button onClick={() => toggle(n.key)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${toggles[n.key] ? 'bg-[#0d9488]' : 'bg-[#e5e7eb]'}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${toggles[n.key] ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'Langue' && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-5 flex items-center gap-2"><Globe className="h-4 w-4 text-[#1e3a8a]" /> Langue de l'interface</h2>
              <div className="grid grid-cols-2 gap-3 max-w-xs">
                {(['FR','EN'] as const).map(l => (
                  <button key={l} onClick={() => setLanguage(l)}
                    className={`rounded-xl border p-4 text-center font-bold transition-all ${language === l ? 'border-[#1e3a8a] bg-[#eff3ff] text-[#1e3a8a]' : 'border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]'}`}>
                    <p className="text-2xl">{l === 'FR' ? '🇫🇷' : '🇬🇧'}</p>
                    <p className="text-sm mt-1">{l === 'FR' ? 'Français' : 'English'}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === 'Sécurité' && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#111827] mb-5 flex items-center gap-2"><Shield className="h-4 w-4 text-[#1e3a8a]" /> Sécurité du compte</h2>
              <div className="space-y-4">
                {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau mot de passe'].map(f => (
                  <div key={f}>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">{f}</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]" />
                  </div>
                ))}
                <button onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d4fa8]">
                  <Save className="h-4 w-4" /> Changer le mot de passe
                </button>
              </div>
            </div>
          )}

          {!['Profil','Notifications','Langue','Sécurité'].includes(section) && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm text-center py-16">
              <Database className="mx-auto h-10 w-10 text-[#e5e7eb] mb-3" />
              <p className="text-sm text-[#9ca3af]">Section {section} — disponible prochainement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
