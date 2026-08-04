import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut, Wifi, WifiOff, Globe, ChevronDown, GraduationCap, Megaphone, UserCheck, Settings, Menu, X } from 'lucide-react'
import { useUserRole } from '../../utils/userRole'
import { navItems } from '../../data/navigation'
import { Avatar } from '../ui/Avatar'
import { Footer } from './Footer'
import { cn } from '../../utils/cn'
import { useState } from 'react'
import { mockNotifications } from '../../data/mockData'

export function Sidebar() {
  const { currentRole, setCurrentRole, currentUser, isOfflineMode, setIsOfflineMode, language, setLanguage } = useUserRole()
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
            <p className="truncate text-xs font-semibold text-[#111827]">{currentUser.name}</p>
            <p className="truncate text-[11px] text-[#6b7280]">{currentUser.roleLabel}</p>
          </div>
        </div>

        {/* Role Selector dropdown */}
        <div className="mt-2.5">
          <label className="block text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1 px-1">Rôle de démonstration</label>
          <select
            value={currentRole}
            onChange={e => setCurrentRole(e.target.value as any)}
            className="w-full rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-xs text-[#374151] font-medium outline-none focus:border-[#1e3a8a]"
          >
            <option value="student">Étudiant</option>
            <option value="delegate">Délégué</option>
            <option value="teacher">Enseignant</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <p className="px-2 pb-1 text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Navigation</p>
        {filteredNav.map(item => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                    : 'text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827]'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{language === 'FR' ? item.labelFr : item.labelEn}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Offline toggle */}
      <div className="border-t border-[#e5e7eb] p-3 space-y-2">
        <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-[#f9fafb]">
          <div className="flex items-center gap-1.5 text-xs text-[#374151]">
            <Globe className="h-3.5 w-3.5 text-[#6b7280]" />
            <span>Langue</span>
          </div>
          <button
            onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
            className="text-xs font-bold text-[#1e3a8a] hover:underline"
          >
            {language}
          </button>
        </div>

        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-1.5 text-xs text-[#374151]">
            {isOfflineMode ? (
              <WifiOff className="h-3.5 w-3.5 text-red-500" />
            ) : (
              <Wifi className="h-3.5 w-3.5 text-emerald-600" />
            )}
            <span className={isOfflineMode ? 'font-bold text-red-600' : 'text-[#374151]'}>
              {isOfflineMode ? 'Hors ligne' : 'En ligne'}
            </span>
          </div>
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
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
  student: { badge: 'Étudiant', icon: GraduationCap, bgColor: 'bg-[#eff3ff]', textColor: 'text-[#1e3a8a]', borderColor: 'border-[#1e3a8a]/20' },
  delegate: { badge: 'Délégué', icon: Megaphone, bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  teacher: { badge: 'Enseignant', icon: UserCheck, bgColor: 'bg-[#f0fdfa]', textColor: 'text-[#0d9488]', borderColor: 'border-[#0d9488]/20' },
  admin: { badge: 'Admin', icon: Settings, bgColor: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
}

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate()
  const { language, currentUser, currentRole } = useUserRole()
  const [, setShowNotifDropdown] = useState(false)
  const unreadCount = mockNotifications.filter(n => n.unread).length
  const roleInfo = roleConfig[currentRole]
  const RoleIcon = roleInfo.icon

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-[#e5e7eb] bg-white px-4 sm:px-6 shadow-sm">
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden rounded-lg p-2 hover:bg-[#f9fafb] transition-colors touch-target"
      >
        <Menu className="h-5 w-5 text-[#6b7280]" />
      </button>

      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="search"
          placeholder={language === 'FR' ? 'Rechercher...' : 'Search...'}
          className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] py-1.5 pl-9 pr-4 text-sm outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Role Badge */}
        <div className={cn(
          'hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold',
          roleInfo.bgColor,
          roleInfo.textColor,
          roleInfo.borderColor
        )}>
          <RoleIcon className="h-3.5 w-3.5" />
          <span>{roleInfo.badge}</span>
        </div>

        {/* Notif bell */}
        <div className="relative">
          <button onClick={() => { setShowNotifDropdown(v => !v); navigate('/app/notifications') }}
            className="relative rounded-lg p-2 text-[#6b7280] hover:bg-[#f9fafb] transition-colors touch-target">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{unreadCount}</span>
            )}
          </button>
        </div>

        {/* User avatar */}
        <button onClick={() => navigate('/app/profil')}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#f9fafb] transition-colors touch-target">
          <Avatar name={currentUser.name} size="sm" />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-[#111827] leading-none">{currentUser.name}</p>
            <p className="text-xs text-[#6b7280] leading-none mt-0.5 truncate max-w-[120px]">{currentUser.roleLabel}</p>
          </div>
          <ChevronDown className="hidden sm:block h-4 w-4 text-[#9ca3af]" />
        </button>

        <button onClick={() => navigate('/login')}
          className="hidden sm:block rounded-lg p-2 text-[#6b7280] hover:bg-red-50 hover:text-red-600 transition-colors touch-target"
          title="Se déconnecter">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-[280px] transform bg-white lg:hidden transition-transform duration-300",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <MobileSidebar onClose={() => setMobileMenuOpen(false)} />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar />
      
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  const { currentRole, setCurrentRole, currentUser, isOfflineMode, setIsOfflineMode, language, setLanguage } = useUserRole()
  const filteredNav = navItems.filter(item => item.roles && item.roles.includes(currentRole))

  return (
    <aside className="flex h-full flex-col border-r border-[#e5e7eb] bg-white">
      {/* Logo + Close */}
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
        <img src="/logos/logo-principal.png" alt="UniFlow" className="h-8 w-auto object-contain" />
        <button onClick={onClose} className="rounded-lg p-2 hover:bg-[#f9fafb] transition-colors">
          <X className="h-5 w-5 text-[#6b7280]" />
        </button>
      </div>

      {/* User card */}
      <div className="border-b border-[#e5e7eb] px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg bg-[#f9fafb] px-3 py-2.5">
          <Avatar name={currentUser.name} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#111827]">{currentUser.name}</p>
            <p className="truncate text-[11px] text-[#6b7280]">{currentUser.roleLabel}</p>
          </div>
        </div>

        <div className="mt-2.5">
          <label className="block text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider mb-1 px-1">Rôle de démonstration</label>
          <select
            value={currentRole}
            onChange={e => setCurrentRole(e.target.value as any)}
            className="w-full rounded-md border border-[#e5e7eb] bg-white px-2 py-1 text-xs text-[#374151] font-medium outline-none focus:border-[#1e3a8a]"
          >
            <option value="student">Étudiant</option>
            <option value="delegate">Délégué</option>
            <option value="teacher">Enseignant</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        <p className="px-2 pb-1 text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Navigation</p>
        {filteredNav.map(item => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all touch-target',
                  isActive
                    ? 'bg-[#1e3a8a] text-white shadow-sm'
                    : 'text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827]'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{language === 'FR' ? item.labelFr : item.labelEn}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Offline toggle */}
      <div className="border-t border-[#e5e7eb] p-3 space-y-2 safe-area-inset">
        <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-[#f9fafb]">
          <div className="flex items-center gap-1.5 text-xs text-[#374151]">
            <Globe className="h-3.5 w-3.5 text-[#6b7280]" />
            <span>Langue</span>
          </div>
          <button
            onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
            className="text-xs font-bold text-[#1e3a8a] hover:underline"
          >
            {language}
          </button>
        </div>

        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-1.5 text-xs text-[#374151]">
            {isOfflineMode ? (
              <WifiOff className="h-3.5 w-3.5 text-red-500" />
            ) : (
              <Wifi className="h-3.5 w-3.5 text-emerald-600" />
            )}
            <span className={isOfflineMode ? 'font-bold text-red-600' : 'text-[#374151]'}>
              {isOfflineMode ? 'Hors ligne' : 'En ligne'}
            </span>
          </div>
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={cn('relative h-5 w-9 rounded-full transition-colors', isOfflineMode ? 'bg-red-500' : 'bg-[#0d9488]')}
          >
            <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform', isOfflineMode ? 'left-[18px]' : 'left-0.5')} />
          </button>
        </div>
      </div>
    </aside>
  )
}
