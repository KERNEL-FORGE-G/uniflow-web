import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const [location] = useLocation();

  const navGroups = [
    {
      label: "VUE D'ENSEMBLE",
      items: [{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard Principal' }]
    },
    {
      label: "ACADEMIQUE",
      items: [
        { href: '/students', icon: Users, label: 'Étudiants' },
        { href: '/courses', icon: BookOpen, label: 'Cours & UE' },
        { href: '/schedule', icon: Calendar, label: 'Emploi du temps' }
      ]
    },
    {
      label: "OPERATIONNEL",
      items: [
        { href: '/attendance', icon: CheckSquare, label: 'Présences' },
        { href: '/rooms', icon: MapPin, label: 'Salles' }
      ]
    },
    {
      label: "COMMUNICATION",
      items: [
        { href: '/notifications', icon: Bell, label: 'Notifications', badge: 3 }
      ]
    },
    {
      label: "SYSTEME",
      items: [
        { href: '/settings', icon: Settings, label: 'Paramètres' }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border overflow-hidden">
      {/* Header */}
      <div className="flex h-16 items-center px-4 justify-between shrink-0 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            U
          </div>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="font-heading font-bold tracking-tight text-lg leading-tight">UniFlow</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Plateforme Universitaire</span>
            </motion.div>
          )}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shrink-0"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <button 
          onClick={() => setMobileOpen(false)}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {navGroups.map((group, i) => (
          <div key={i} className="mb-6 px-3">
            {!collapsed ? (
              <div className="mb-2 px-4 text-xs font-semibold text-sidebar-foreground/50 tracking-wider">
                {group.label}
              </div>
            ) : (
              <div className="mb-2 h-4 border-t border-sidebar-border/50 mx-2" />
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative group",
                      active 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {!collapsed && (
                      <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                        active ? "bg-white text-primary" : "bg-primary text-primary-foreground"
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary" />
                    )}
                    
                    {collapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden rounded-md bg-popover px-2 py-1 text-sm font-medium text-popover-foreground shadow-md group-hover:block z-50 whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-sidebar-border p-4">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
          <div className="h-9 w-9 shrink-0 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            AD
          </div>
          {!collapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold">Admin. Principal</span>
              <span className="truncate text-xs text-muted-foreground">Super Admin</span>
            </div>
          )}
          {!collapsed && (
            <Link href="/" className="shrink-0 p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10">
              <LogOut size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 80 : 280 }}
        className="hidden md:block h-[100dvh] shrink-0 fixed left-0 top-0 z-40"
      >
        {sidebarContent}
      </motion.div>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-72 z-50 md:hidden"
      >
        {sidebarContent}
      </motion.div>
    </>
  );
}
