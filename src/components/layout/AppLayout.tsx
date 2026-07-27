import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut } from 'lucide-react'
import type { Role } from '../../data/navigation'
import { navItems, currentUser } from '../../data/navigation'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../utils/cn'

// ... (Sidebar component remains same)

export function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would typically clear the auth tokens
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-white px-6">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Rechercher (cours, devoirs, enseignants...)"
          className="w-full rounded-lg border border-border bg-bg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
      <button type="button" className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
      <Avatar name={currentUser.name} size="sm" />
      <button 
        onClick={handleLogout}
        className="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        title="Déconnexion"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </header>
  )
}
// ... (AppLayout component remains same)

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
