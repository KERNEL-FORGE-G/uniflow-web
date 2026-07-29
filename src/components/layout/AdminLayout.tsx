import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut } from 'lucide-react'
import { adminNavGroups } from '../../data/navigation'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../utils/cn'

function AdminSidebar() {
  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r border-[#e5e7eb] bg-white">
      <div className="flex items-center gap-2.5 border-b border-[#e5e7eb] px-5 py-4">
        <img src="/logos/logo-principal.png" alt="UniFlow Admin" className="h-8 w-auto object-contain" />
        <div>
          <span className="text-[17px] font-bold tracking-tight text-[#111827]">Uni<span className="text-[#0d9488]">Flow</span></span>
          <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">Administration</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {adminNavGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">{group.title}</p>
            <ul className="space-y-0.5">
              {group.items.map(({ to, icon: Icon, labelFr, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end ?? false}
                    className={({ isActive }) => cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'bg-[#eff3ff] text-[#1e3a8a] font-semibold' : 'text-[#374151] hover:bg-[#f9fafb]',
                    )}>
                    <Icon className="h-4 w-4 shrink-0" />
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
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-[#e5e7eb] bg-white px-6 shadow-sm">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input type="search" placeholder="Rechercher utilisateurs, cours..."
              className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-1.5 pl-9 pr-4 text-sm outline-none focus:border-[#1e3a8a]" />
          </div>
          <button className="relative rounded-lg p-2 text-[#6b7280] hover:bg-[#f9fafb]">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar name="Admin UniFlow" size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#111827]">Administrateur</p>
              <p className="text-xs text-[#6b7280]">Super Admin</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="rounded-lg p-2 text-[#6b7280] hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-5 w-5" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
      </div>
    </div>
  )
}
