import { useState } from 'react'
import { Edit, Users, FileText, Star } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { PageHeader } from '../components/ui/PageHeader'
import { useAuth } from '../auth/AuthContext'

const tabs = ['Informations', 'Parcours', 'Présences', 'Grades', 'Paramètres', 'Références']

const personalInfo = [
  { label: 'Date de naissance', value: '15 mars 2003' },
  { label: 'Téléphone', value: '+237 6 12 34 56 78' },
  { label: 'Adresse', value: 'Yaoundé, Cameroun' },
]

const academicInfo = [
  { label: 'Numéro étudiant', value: 'ETU-2022-0847' },
  { label: 'Filière', value: 'Informatique' },
  { label: 'Niveau', value: 'Licence 2' },
  { label: 'Langue', value: 'Français' },
  { label: 'Établissement', value: 'Université UniFlow' },
  { label: 'Inscription', value: 'Septembre 2022' },
]

const stats = [
  { label: 'Sessions totales', value: 80, icon: Users, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Présences', value: 68, icon: FileText, color: 'text-blue-600 bg-blue-50' },
  { label: 'Points', value: 1200, icon: Star, color: 'text-orange-600 bg-orange-50' },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('Informations')
  const name = user?.name ?? 'Utilisateur'

  return (
    <div className="space-y-6">
      <PageHeader title="Mon profil" description={user?.roleLabel} />
      <Card>
        <div className="flex flex-wrap items-center gap-6">
          <Avatar name={name} size="xl" src={user?.avatar} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text">{name}</h2>
            <p className="text-sm text-muted">{user?.email}</p>
            <Badge variant="success" className="mt-2">
              {user?.status ?? 'En ligne'}
            </Badge>
          </div>
          <Button variant="outline">
            <Edit className="h-4 w-4" /> Modifier
          </Button>
        </div>
      </Card>

      <div className="flex flex-wrap gap-4 border-b border-border">
        {tabs.map((tab) => (
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
          <CardTitle className="mb-4 text-base">Informations personnelles</CardTitle>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">Nom complet</dt>
              <dd className="font-medium">{name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Email</dt>
              <dd className="font-medium">{user?.email}</dd>
            </div>
            {personalInfo.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
          <CardTitle className="mb-4 mt-8 text-base">Parcours académique</CardTitle>
          <dl className="grid gap-4 sm:grid-cols-2">
            {academicInfo.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-muted">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <div className="space-y-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="flex items-center gap-4 !p-4">
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
