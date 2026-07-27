import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut, Wifi, WifiOff, Globe } from 'lucide-react'
import { useUserRole } from '../../utils/userRole'
import { navItems } from '../../data/navigation'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../utils/cn'

export function Sidebar() {
  const { currentRole, setCurrentRole, currentUser, isOfflineMode, setIsOfflineMode, language, setLanguage } = useUserRole()
  const filteredNav = navItems.filter(item => item.roles && item.roles.includes(currentRole))

  return (
    <aside className="flex h-screen w-66 shrink-0 flex-col border-r border-border bg-white shadow-sm">
      {/* Brand logo */}
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black text-lg">U</div>
          <div>
            <span className="text-lg font-bold tracking-tight text-gray-900">Uni<span className="text-teal">Flow</span></span>
            <span className="block text-[9px] text-muted tracking-wider uppercase font-semibold">Web Workspace</span>
          </div>
        </div>
      </div>

      {/* User profile with active Role details */}
      <div className="border-b border-border px-4 py-4">
        <div className={cn(
          "flex flex-col gap-3 rounded-xl p-3.5 transition-all",
          isOfflineMode ? "bg-red-50/50 border border-red-100" : "bg-slate-50 border border-slate-100"
        )}>
          <div className="flex items-center gap-3">
            <Avatar name={currentUser.name} size="md" className={cn(currentRole === 'teacher' ? 'bg-indigo-600' : currentRole === 'delegate' ? 'bg-teal' : 'bg-primary')} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-900">{currentUser.name}</p>
              <p className="truncate text-xs font-medium text-muted">{currentUser.roleLabel}</p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className={cn(
                  "h-2 w-2 rounded-full animate-pulse",
                  isOfflineMode ? "bg-red-500" : "bg-emerald-500"
                )} />
                <span className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider",
                  isOfflineMode ? "text-red-600" : "text-emerald-600"
                )}>
                  {isOfflineMode
                    ? (language === 'FR' ? 'Mode Local (LAN)' : 'Local LAN Mode')
                    : (language === 'FR' ? 'En ligne' : 'Online')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick role switcher */}
          <div className="mt-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {language === 'FR' ? 'Espace de travail' : 'Active Workspace'}
            </label>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as any)}
              className="w-full text-xs font-medium rounded-lg border border-border bg-white py-1.5 px-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="student">🎓 {language === 'FR' ? 'Espace Étudiant' : 'Student Space'}</option>
              <option value="delegate">📢 {language === 'FR' ? 'Espace Délégué' : 'Delegate Space'}</option>
              <option value="teacher">👨‍🏫 {language === 'FR' ? 'Espace Enseignant' : 'Teacher Space'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {filteredNav.map(({ to, icon: Icon, labelFr, labelEn, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-l-4 border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  )
                }
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {language === 'FR' ? labelFr : labelEn}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Preferences & Utilities footer */}
      <div className="border-t border-border p-4 bg-gray-50/50 space-y-3">
        {/* Language Toggler */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted font-medium flex items-center gap-1">
            <Globe className="h-3.5 w-3.5 text-gray-400" />
            {language === 'FR' ? 'Langue' : 'Language'}
          </span>
          <div className="inline-flex rounded-lg border border-border p-0.5 bg-white">
            <button
              onClick={() => setLanguage('FR')}
              className={cn(
                "px-2 py-1 rounded text-[10px] font-bold",
                language === 'FR' ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={cn(
                "px-2 py-1 rounded text-[10px] font-bold",
                language === 'EN' ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              EN
            </button>
          </div>
        </div>

        {/* Offline Mode Switcher */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted font-medium flex items-center gap-1">
            {isOfflineMode ? <WifiOff className="h-3.5 w-3.5 text-red-500" /> : <Wifi className="h-3.5 w-3.5 text-teal" />}
            {language === 'FR' ? 'Mode Offline' : 'Offline Simulation'}
          </span>
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none",
              isOfflineMode ? "bg-red-500" : "bg-teal"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                isOfflineMode ? "translate-x-4" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>
    </aside>
  )
}

export function TopBar() {
  const navigate = useNavigate()
  const { isOfflineMode, setIsOfflineMode, language } = useUserRole()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-white px-6 shadow-sm">
      {/* Searchbar */}
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder={language === 'FR' ? "Rechercher un cours, un enseignant, un devoir..." : "Search for a course, a teacher, an assignment..."}
          className="w-full rounded-lg border border-border bg-bg py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Connected / Offline Mode visual banner */}
      <div className="hidden sm:flex items-center">
        {isOfflineMode ? (
          <div className="flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-3.5 py-1.5 text-xs font-semibold text-red-700 animate-pulse">
            <WifiOff className="h-4 w-4" />
            <span>{language === 'FR' ? '🔴 Mode Local (LAN) Activé' : '🔴 Local LAN Mode Active'}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-teal/10 border border-teal/20 px-3.5 py-1.5 text-xs font-semibold text-teal-800">
            <Wifi className="h-4 w-4 text-teal" />
            <span>{language === 'FR' ? '🟢 Mode Synchro Auto (Internet)' : '🟢 Auto Sync Mode (Internet)'}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Toggle offline simulator directly in topbar */}
        <button
          onClick={() => setIsOfflineMode(!isOfflineMode)}
          className={cn(
            "p-2 rounded-lg transition-all",
            isOfflineMode ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-teal/10 text-teal hover:bg-teal/20"
          )}
          title={language === 'FR' ? "Simuler déconnexion réseau" : "Simulate network disconnection"}
        >
          {isOfflineMode ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
        </button>

        {/* Notification bell */}
        <button type="button" className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Dynamic Log out */}
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          title={language === 'FR' ? "Se déconnecter" : "Log out"}
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
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
