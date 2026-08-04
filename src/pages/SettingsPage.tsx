import { useState } from 'react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { PageHeader } from '../components/ui/PageHeader'
import { Input, Label } from '../components/ui/Input'
import { useAuth } from '../auth/AuthContext'

const settingsNav = [
  { group: 'Compte', items: ['Profil', 'Sécurité', 'Notifications'] },
  { group: 'Préférences', items: ['Langue', 'Thème', 'Accessibilité'] },
  { group: 'Système', items: ['Confidentialité', 'Données'] },
  { group: 'Support', items: ['Aide', 'Contact'] },
]

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('Profil')
  const [toggles, setToggles] = useState({ email: true, sms: false, newsletter: true })

  return (
    <div className="space-y-6">
      <PageHeader title="Paramètres" description="Gérez votre compte et vos préférences" />

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
                    activeSection === item ? 'bg-primary/10 font-medium text-primary' : 'text-gray-600 hover:bg-bg'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </Card>

        <Card className="lg:col-span-3">
          <CardTitle className="mb-6 text-base">{activeSection}</CardTitle>
          {activeSection === 'Profil' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar name={user?.name ?? 'Utilisateur'} size="lg" />
                <Button variant="outline">Changer la photo</Button>
              </div>
              <div>
                <Label htmlFor="settings-name">Nom</Label>
                <Input id="settings-name" defaultValue={user?.name} />
              </div>
              <div>
                <Label htmlFor="settings-email">Email</Label>
                <Input id="settings-email" type="email" defaultValue={user?.email} />
              </div>
              <Button>Enregistrer</Button>
            </div>
          ) : activeSection === 'Notifications' ? (
            <div className="space-y-4">
              {(
                [
                  ['email', 'Notifications email'],
                  ['sms', 'Notifications SMS'],
                  ['newsletter', 'Newsletter'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between gap-4 text-sm">
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={toggles[key]}
                    onChange={(e) => setToggles((t) => ({ ...t, [key]: e.target.checked }))}
                  />
                </label>
              ))}
              <Button>Enregistrer</Button>
            </div>
          ) : (
            <p className="text-sm text-muted">Section « {activeSection} » — configuration mock.</p>
          )}
        </Card>
      </div>
    </div>
  )
}
