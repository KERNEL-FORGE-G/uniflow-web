import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut } from 'lucide-react'
import { adminNavGroups } from '../../data/navigation'
import { useAuth } from '../../auth/AuthContext'
import { Avatar } from '../ui/Avatar'
import { Input } from '../ui/Input'
import { cn } from '../../utils/cn'

function AdminSidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <img src="/assets/UniFlow_Logo_Principal.png" alt="UniFlow" className="h-8 w-auto" />
        <span className="text-xs font-medium text-muted">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {adminNavGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">{group.title}</p>
            <ul className="space-y-1">
              {group.items.map(({ to, icon: Icon, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end ?? false}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'border-l-4 border-primary bg-primary/5 text-primary'
                          : 'border-l-4 border-transparent text-gray-600 hover:bg-bg',
                      )
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-surface px-6">
          <div className="relative max-w-xl flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input type="search" placeholder="Rechercher utilisateurs, cours..." className="pl-10" />
          </div>
          <button type="button" className="relative rounded-lg p-2 text-gray-600 hover:bg-bg">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar name={user?.name ?? 'Admin'} size="sm" />
            <div className="hidden text-sm sm:block">
              <p className="font-medium">{user?.name ?? 'Administrateur'}</p>
              <p className="text-xs text-muted">{user?.roleLabel ?? 'Super Admin'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Déconnexion"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
