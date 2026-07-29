import { BookMarked } from 'lucide-react'

export default function UEPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <BookMarked className="h-6 w-6 text-[#1e3a8a]" />
          <h1 className="text-xl font-bold text-[#111827]">Gestion des UE</h1>
        </div>
        <p className="text-center text-sm text-[#9ca3af] py-12">Module admin en développement...</p>
      </div>
    </div>
  )
}
