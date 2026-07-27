import { useState } from 'react'
import { Edit, Users, FileText, Star } from 'lucide-react'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'

const tabs = ['Informations', 'Parcours', 'Présences', 'Grades', 'Paramètres', 'Références']

const personalInfo = [
  { label: 'Nom complet', value: 'Emma Martin' },
  { label: 'Date de naissance', value: '15 mars 2003' },
  { label: 'Téléphone', value: '+237 6 12 34 56 78' },
  { label: 'Email', value: 'emma.martin@uniflow.edu' },
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
  const [activeTab, setActiveTab] = useState('Informations')

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center gap-6">
          <Avatar name="Emma Martin" size="xl" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Emma Martin</h1>
              <Badge variant="success">Actif</Badge>
            </div>
            <p className="mt-1 text-muted">Étudiante en Licence 2 — Informatique</p>
          </div>
          <Button variant="outline">
            <Edit className="h-4 w-4" /> Modifier le profil
          </Button>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium ${
              activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle className="mb-4 text-base">Informations personnelles</CardTitle>
          <dl className="space-y-3">
            {personalInfo.map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-border pb-2 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card>
          <CardTitle className="mb-4 text-base">Informations académiques</CardTitle>
          <dl className="space-y-3">
            {academicInfo.map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-border pb-2 text-sm">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Mes statistiques</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-muted">{label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
