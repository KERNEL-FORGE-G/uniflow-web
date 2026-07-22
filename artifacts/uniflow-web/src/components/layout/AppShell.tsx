import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex w-full">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? (collapsed ? '80px' : '280px') : '0px' }}
      >
        {/* Mobile header area */}
        <div className="md:hidden flex h-16 items-center px-4 border-b border-border bg-card sticky top-0 z-30">
          <button 
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-md hover:bg-muted"
          >
            <Menu size={20} />
          </button>
          <div className="font-heading font-bold ml-2">UniFlow</div>
        </div>
        
        <main className="flex-1 overflow-x-hidden p-4 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
