import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { useAuth } from '../../auth/AuthContext'
import { Avatar } from '../ui/Avatar'
import { Input } from '../ui/Input'
import { cn } from '../../utils/cn'

export function Sidebar() {
  const { user } = useAuth()
  const filteredNav = navItems.filter((item) => item.roles && user && item.roles.includes(user.role))

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <img src="/assets/UniFlow_Logo_Principal.png" alt="UniFlow" className="h-8 w-auto" />
      </div>

      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-bg p-3">
          <Avatar name={user?.name ?? 'Utilisateur'} size="md" src={user?.avatar} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">{user?.name}</p>
            <p className="truncate text-xs text-muted">{user?.roleLabel}</p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              {user?.status}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {filteredNav.map(({ to, icon: Icon, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-l-4 border-primary bg-primary/5 text-primary'
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-bg hover:text-text',
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export function TopBar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-surface px-6">
      <div className="relative max-w-xl flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          type="search"
          placeholder="Rechercher (cours, devoirs, enseignants...)"
          className="pl-10"
        />
      </div>
      <button
        type="button"
        onClick={() => navigate('/app/notifications')}
        className="relative rounded-lg p-2 text-gray-600 hover:bg-bg"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
      <Avatar name={user?.name ?? 'Utilisateur'} size="sm" src={user?.avatar} />
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
        title="Déconnexion"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </header>
  )
}

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
