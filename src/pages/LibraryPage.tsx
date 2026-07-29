import { useState } from 'react'
import { Search, Filter, BookOpen, Download, Eye, Heart, Star } from 'lucide-react'
import { Badge } from '../components/ui/Badge'

const categories = ['Tous', 'Informatique', 'Mathématiques', 'Économie', 'Langues', 'Sciences']
const filters = ['Populaires', 'Récents', 'Favoris', 'Téléchargés']

const books = [
  { id: 1, title: 'Algorithmique et Structures de Données', author: 'Thomas Cormen', category: 'Informatique', pages: 450, downloads: 1240, rating: 4.8, cover: '📘', format: 'PDF', size: '12.4 Mo' },
  { id: 2, title: 'Introduction aux Bases de Données', author: 'Ramez Elmasri', category: 'Informatique', pages: 380, downloads: 892, rating: 4.6, cover: '📗', format: 'PDF', size: '8.2 Mo' },
  { id: 3, title: 'Calcul Différentiel et Intégral', author: 'James Stewart', category: 'Mathématiques', pages: 520, downloads: 756, rating: 4.7, cover: '📙', format: 'PDF', size: '15.1 Mo' },
  { id: 4, title: 'Principes de Microéconomie', author: 'N. Gregory Mankiw', category: 'Économie', pages: 340, downloads: 623, rating: 4.5, cover: '📕', format: 'PDF', size: '9.8 Mo' },
  { id: 5, title: 'Réseaux et Protocoles', author: 'Andrew Tanenbaum', category: 'Informatique', pages: 410, downloads: 1105, rating: 4.9, cover: '📘', format: 'PDF', size: '11.7 Mo' },
  { id: 6, title: 'Anglais Technique', author: 'Oxford Press', category: 'Langues', pages: 280, downloads: 445, rating: 4.3, cover: '📔', format: 'PDF', size: '6.3 Mo' },
]

export default function LibraryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tous')
  const [sortBy, setSortBy] = useState('Populaires')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFav = (id: number) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const filtered = books.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Tous' || b.category === category
    const matchFav = sortBy !== 'Favoris' || favorites.includes(b.id)
    return matchSearch && matchCat && matchFav
  }).sort((a, b) => {
    if (sortBy === 'Populaires') return b.downloads - a.downloads
    if (sortBy === 'Récents') return b.id - a.id
    return 0
  })

  const stats = [
    { label: 'Ouvrages', value: books.length, icon: BookOpen, color: 'text-[#1e3a8a]', bg: 'bg-[#eff3ff]' },
    { label: 'Téléchargements', value: books.reduce((s, b) => s + b.downloads, 0), icon: Download, color: 'text-[#0d9488]', bg: 'bg-[#f0fdfa]' },
    { label: 'Favoris', value: favorites.length, icon: Heart, color: 'text-[#dc2626]', bg: 'bg-[#fee2e2]' },
  ]

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="rounded-xl bg-white border border-[#e5e7eb] p-5 shadow-sm">
        <h1 className="text-xl font-bold text-[#111827]">Bibliothèque numérique</h1>
        <p className="text-sm text-[#6b7280] mt-0.5">Accédez à des milliers de ressources académiques — PDF, EPUB, supports de cours</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm flex items-center gap-3">
            <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
            <div>
              <p className="text-2xl font-extrabold text-[#111827]">{value.toLocaleString()}</p>
              <p className="text-xs text-[#6b7280]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un livre, un auteur..."
            className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:bg-white" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3a8a]">
          {filters.map(f => <option key={f}>{f}</option>)}
        </select>
        <button className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]">
          <Filter className="h-4 w-4" /> Plus de filtres
        </button>
      </div>

      {/* Books grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center py-16 text-[#9ca3af]">
            <BookOpen className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">Aucun ouvrage trouvé.</p>
          </div>
        )}
        {filtered.map(book => (
          <div key={book.id} className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group">
            <div className="flex gap-4 p-4">
              <div className="flex h-32 w-24 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-6xl">
                {book.cover}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[#111827] text-sm leading-tight line-clamp-2">{book.title}</h3>
                  <button onClick={() => toggleFav(book.id)}
                    className={`shrink-0 rounded p-1 hover:bg-[#f3f4f6] transition-colors ${favorites.includes(book.id) ? 'text-red-500' : 'text-[#d1d5db]'}`}>
                    <Heart className={`h-4 w-4 ${favorites.includes(book.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-xs text-[#6b7280] mb-1">{book.author}</p>
                <Badge variant="primary" className="text-[9px] mb-2">{book.category}</Badge>
                <div className="flex items-center gap-2 text-[10px] text-[#9ca3af] mb-2">
                  <span>{book.pages} pages</span>
                  <span>·</span>
                  <span>{book.format}</span>
                  <span>·</span>
                  <span>{book.size}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-[#d97706]">
                    <Star className="h-3 w-3 fill-current" />{book.rating}
                  </span>
                  <span className="flex items-center gap-1 text-[#6b7280]">
                    <Download className="h-3 w-3" />{book.downloads}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-[#f3f4f6] bg-[#f9fafb] p-3">
              <button className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb]">
                <Eye className="h-3.5 w-3.5" /> Aperçu
              </button>
              <button className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1e3a8a] py-1.5 text-xs font-semibold text-white hover:bg-[#2d4fa8]">
                <Download className="h-3.5 w-3.5" /> Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
