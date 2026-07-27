import { NavLink, Outlet } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'
import { adminNavGroups } from '../../data/navigation'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../utils/cn'

function AdminSidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <img src="/assets/UniFlow_Logo_Principal.png" alt="UniFlow" className="h-8 w-auto" />
        <span className="text-xs font-medium text-muted">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {adminNavGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">{group.title}</p>
            <ul className="space-y-1">
              {group.items.map(({ to, icon: Icon, labelFr, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end ?? false}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'border-l-4 border-primary bg-primary/5 text-primary'
                          : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50',
                      )
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {labelFr}
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
  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-white px-6">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Rechercher utilisateurs, cours..."
              className="w-full rounded-lg border border-border bg-bg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <button type="button" className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar name="Admin UniFlow" size="sm" />
            <div className="hidden text-sm sm:block">
              <p className="font-medium">Administrateur</p>
              <p className="text-xs text-muted">Super Admin</p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
