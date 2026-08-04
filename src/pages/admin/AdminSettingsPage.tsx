import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input, Label } from '../../components/ui/Input'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Paramètres système" description="Configuration générale de la plateforme" />
      <Card className="max-w-xl space-y-4">
        <div>
          <Label htmlFor="org">Nom de l&apos;établissement</Label>
          <Input id="org" defaultValue="Université UniFlow" />
        </div>
        <div>
          <Label htmlFor="year">Année académique</Label>
          <Input id="year" defaultValue="2023-2024" />
        </div>
        <div>
          <Label htmlFor="support">Email support</Label>
          <Input id="support" type="email" defaultValue="support@uniflow.edu" />
        </div>
        <Button>Enregistrer</Button>
      </Card>
    </div>
  )
}
