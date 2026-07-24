import { Link, useLocation } from 'wouter';
import {
  Home, BookOpen, Calendar, ClipboardList, CheckSquare,
  BarChart2, MessageSquare, Bell, Settings, LogOut,
  ChevronLeft, ChevronRight, X, Users, Video, DoorOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUser } from '@/lib/mock-data';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const navItems = [
  { href: '/dashboard',      icon: Home,          label: 'Accueil' },
  { href: '/courses',        icon: BookOpen,       label: 'Cours' },
  { href: '/schedule',       icon: Calendar,       label: 'Emploi du temps' },
  { href: '/devoirs',        icon: ClipboardList,  label: 'Devoirs' },
  { href: '/attendance',     icon: CheckSquare,    label: 'Présences' },
  { href: '/notes',          icon: BarChart2,      label: 'Notes' },
  { href: '/messages',       icon: MessageSquare,  label: 'Messages',      badge: 1 },
  { href: '/notifications',  icon: Bell,           label: 'Notifications', badge: 3 },
  { href: '/video',          icon: Video,          label: 'Visioconférence' },
  { href: '/students',       icon: Users,          label: 'Étudiants' },
  { href: '/rooms',          icon: DoorOpen,       label: 'Salles' },
  { href: '/settings',       icon: Settings,       label: 'Paramètres' },
];

function SidebarContent({ collapsed, setCollapsed, onClose }: {
  collapsed: boolean; setCollapsed: (v: boolean) => void; onClose?: () => void;
}) {
  const [location] = useLocation();

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100 shrink-0">
        <Link href="/dashboard" className="flex items-center overflow-hidden">
          {collapsed ? (
            <img src="/uniflow-icon.png" alt="U" className="h-9 w-9 object-contain" />
          ) : (
            <img src="/uniflow-logo.png" alt="UniFlow" className="h-9 object-contain" />
          )}
        </Link>
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors shrink-0"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose} className="md:hidden h-7 w-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = location === item.href || (item.href !== '/dashboard' && location.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 relative group',
                active
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon size={18} className="shrink-0" />
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Badge */}
              {item.badge && !collapsed && (
                <span className={cn(
                  'flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold px-1',
                  active ? 'bg-white text-[#1E3A8A]' : 'bg-[#1E3A8A] text-white'
                )}>
                  {item.badge}
                </span>
              )}
              {item.badge && collapsed && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:block">
                  <div className="bg-gray-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="shrink-0 border-t border-gray-100 p-3">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-9 w-9 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] text-sm font-bold">
              {mockUser.initiales}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-gray-900 truncate">{mockUser.nomComplet}</p>
                <p className="text-xs text-gray-500 truncate">{mockUser.role} en {mockUser.niveau}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <Link href="/" className="shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1 rounded">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:block shrink-0 h-screen fixed left-0 top-0 z-30 overflow-hidden"
      >
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-y-0 left-0 w-64 z-50 md:hidden"
      >
        <SidebarContent collapsed={false} setCollapsed={() => {}} onClose={() => setMobileOpen(false)} />
      </motion.aside>
    </>
  );
}
