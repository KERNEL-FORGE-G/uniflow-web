import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut, Wifi, WifiOff, Globe, ChevronDown } from 'lucide-react'
import { useUserRole } from '../../utils/userRole'
import { navItems } from '../../data/navigation'
import { Avatar } from '../ui/Avatar'
import { Footer } from './Footer'
import { cn } from '../../utils/cn'
import { useState } from 'react'
import { mockNotifications } from '../../data/mockData'

export function Sidebar() {
  const { currentRole, currentUser, isOfflineMode, setIsOfflineMode, language, setLanguage } = useUserRole()
  const filteredNav = navItems.filter(item => item.roles && item.roles.includes(currentRole))

  return (
    <aside className="flex min-h-screen w-[220px] shrink-0 flex-col border-r border-[#e5e7eb] bg-white sticky top-0 self-start">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-[#e5e7eb] px-5 py-4">
        <img src="/logos/logo-principal.png" alt="UniFlow" className="h-8 w-auto object-contain" />
      </div>

      {/* User card */}
      <div className="border-b border-[#e5e7eb] px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg bg-[#f9fafb] px-3 py-2.5">
          <Avatar name={currentUser.name} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#111827]">{currentUser.name}</p>
            <p className="truncate text-xs text-[#6b7280]">{currentUser.roleLabel}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className={cn('h-1.5 w-1.5 rounded-full', isOfflineMode ? 'bg-red-500' : 'bg-emerald-500')} />
              <span className={cn('text-[10px] font-medium', isOfflineMode ? 'text-red-600' : 'text-emerald-600')}>
                {isOfflineMode ? 'Mode Local' : 'En ligne'}
              </span>
            </div>
          </div>
        </div>

        {/* Role switcher - REMOVED */}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {filteredNav.map(({ to, icon: Icon, labelFr, labelEn, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#eff3ff] text-[#1e3a8a] font-semibold'
                      : 'text-[#374151] hover:bg-[#f9fafb] hover:text-[#111827]',
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{language === 'FR' ? labelFr : labelEn}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[#e5e7eb] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-[#6b7280]">
            <Globe className="h-3.5 w-3.5" /> Langue
          </span>
          <div className="flex rounded-md border border-[#e5e7eb] overflow-hidden">
            {(['FR', 'EN'] as const).map(l => (
              <button key={l} onClick={() => setLanguage(l)}
                className={cn('px-2 py-0.5 text-[10px] font-bold transition-colors',
                  language === l ? 'bg-[#1e3a8a] text-white' : 'text-[#6b7280] hover:bg-[#f9fafb]'
                )}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-[#6b7280]">
            {isOfflineMode ? <WifiOff className="h-3.5 w-3.5 text-red-500" /> : <Wifi className="h-3.5 w-3.5 text-[#0d9488]" />}
            Offline
          </span>
          <button onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={cn('relative h-5 w-9 rounded-full transition-colors', isOfflineMode ? 'bg-red-500' : 'bg-[#0d9488]')}
          >
            <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform', isOfflineMode ? 'left-[18px]' : 'left-0.5')} />
          </button>
        </div>
      </div>
    </aside>
  )
}

const roleConfig = {
  student: { badge: '🎓 Étudiant', bgColor: 'bg-[#eff3ff]', textColor: 'text-[#1e3a8a]', borderColor: 'border-[#1e3a8a]/20' },
  delegate: { badge: '📢 Délégué', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  teacher: { badge: '👨‍🏫 Enseignant', bgColor: 'bg-[#f0fdfa]', textColor: 'text-[#0d9488]', borderColor: 'border-[#0d9488]/20' },
  admin: { badge: '⚙️ Admin', bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
}

export function TopBar() {
  const navigate = useNavigate()
  const { language, currentUser, currentRole } = useUserRole()
  const [, setShowNotifDropdown] = useState(false)
  const unreadCount = mockNotifications.filter(n => n.unread).length
  const roleInfo = roleConfig[currentRole]

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-[#e5e7eb] bg-white px-6 shadow-sm">
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="search"
          placeholder={language === 'FR' ? 'Rechercher (cours, devoirs, enseignants...)' : 'Search courses, assignments...'}
          className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-1.5 pl-9 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Role Badge */}
        <div className={cn(
          'hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold',
          roleInfo.bgColor,
          roleInfo.textColor,
          roleInfo.borderColor
        )}>
          <span>{roleInfo.badge}</span>
        </div>

        {/* Notif bell */}
        <div className="relative">
          <button onClick={() => { setShowNotifDropdown(v => !v); navigate('/app/notifications') }}
            className="relative rounded-lg p-2 text-[#6b7280] hover:bg-[#f9fafb] transition-colors">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{unreadCount}</span>
            )}
          </button>
        </div>

        {/* User avatar with name */}
        <button onClick={() => navigate('/app/profil')}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f9fafb] transition-colors">
          <Avatar name={currentUser.name} size="sm" />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-[#111827] leading-none">{currentUser.name}</p>
            <p className="text-xs text-[#6b7280] leading-none mt-0.5">{currentUser.roleLabel}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-[#9ca3af]" />
        </button>

        <button onClick={() => navigate('/login')}
          className="rounded-lg p-2 text-[#6b7280] hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Se déconnecter">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
