export default function PricingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tarifs</h1>
      
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Période de Démonstration</h2>
        <p className="text-blue-700">
          Actuellement, UniFlow est en phase de démonstration et reste <strong>entièrement gratuit</strong> pour tous les utilisateurs.
        </p>
      </div>

      <div className="border border-gray-200 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">À venir : Version 1.2</h2>
        <p className="text-gray-700 mb-4">
          Suite à la sortie officielle de la version 1.2, UniFlow passera à un modèle d'abonnement pour assurer la maintenance et l'évolution de la plateforme :
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Abonnements Individuels :</strong> Pour les étudiants et enseignants souhaitant une utilisation personnelle.</li>
          <li><strong>Abonnements Universitaires :</strong> Solutions complètes pour les établissements (campus, facultés).</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500 italic">
          Plus de détails seront communiqués à l'approche de la mise à jour v1.2.
        </p>
      </div>
    </div>
  )
}
