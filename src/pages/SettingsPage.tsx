import { useState } from 'react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'

const settingsNav = [
  { group: 'Compte', items: ['Profil', 'Sécurité', 'Notifications'] },
  { group: 'Préférences', items: ['Langue', 'Thème', 'Accessibilité'] },
  { group: 'Système', items: ['Confidentialité', 'Données'] },
  { group: 'Support', items: ['Aide', 'Contact'] },
]

const profileTabs = ['Profil', 'Sécurité', 'Notifications']

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Profil')
  const [activeTab, setActiveTab] = useState('Profil')
  const [toggles, setToggles] = useState({ email: true, sms: false, newsletter: true })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="!p-3">
          {settingsNav.map(({ group, items }) => (
            <div key={group} className="mb-4">
              <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted">{group}</p>
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveSection(item)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    activeSection === item ? 'bg-primary/10 font-medium text-primary' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-4 border-b border-border">
            {profileTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium ${
                  activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <Avatar name="Emma Martin" size="xl" />
                <div>
                  <h2 className="font-semibold text-lg">Emma Martin</h2>
                  <p className="text-sm text-muted">Licence 2 — Informatique</p>
                  <Button variant="outline" className="mt-2 !py-1.5 text-xs">Changer la photo</Button>
                </div>
              </div>

              <form className="mt-6 space-y-4">
                {[
                  { label: 'Nom complet', value: 'Emma Martin' },
                  { label: 'Email', value: 'emma.martin@uniflow.edu' },
                  { label: 'Téléphone', value: '+237 6 12 34 56 78' },
                  { label: 'Adresse', value: 'Yaoundé, Cameroun' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type="text"
                      defaultValue={value}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                ))}
                <Button>Enregistrer</Button>
              </form>
            </Card>

            <Card>
              <CardTitle className="mb-4 text-base">Préférences de contact</CardTitle>
              <div className="space-y-4">
                {[
                  { key: 'email' as const, label: 'Notifications par email' },
                  { key: 'sms' as const, label: 'Alertes SMS' },
                  { key: 'newsletter' as const, label: 'Newsletter' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{label}</span>
                    <button
                      type="button"
                      onClick={() => setToggles((t) => ({ ...t, [key]: !t[key] }))}
                      className={`relative h-6 w-11 rounded-full transition-colors ${toggles[key] ? 'bg-teal' : 'bg-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${toggles[key] ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
