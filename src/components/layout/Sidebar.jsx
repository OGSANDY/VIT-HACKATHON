import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  MessageSquareWarning, 
  ArrowRightLeft, 
  Users, 
  Building2, 
  Network, 
  History, 
  Dna, 
  BellRing, 
  Activity, 
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Investigations', to: '/investigations', icon: Search },
  { name: 'Scam Analyzer', to: '/analyze', icon: MessageSquareWarning },
  { name: 'Transactions', to: '/transactions', icon: ArrowRightLeft },
  { name: 'Customers', to: '/customers', icon: Users },
  { name: 'Beneficiaries', to: '/beneficiaries', icon: Building2 },
  { name: 'Fraud Network', to: '/fraud-network', icon: Network },
  { name: 'Journey Replay', to: '/replay', icon: History },
  { name: 'Fraud DNA', to: '/fraud-dna', icon: Dna },
  { name: 'Alerts', to: '/alerts', icon: BellRing },
];

const systemItems = [
  { name: 'System Health', to: '/health', icon: Activity },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card h-full flex flex-col shadow-sm relative z-20">
      <div className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <ShieldCheck className="h-8 w-8" />
          ScamShield
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-accent/50 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
          <div className="pt-6 pb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            System
          </div>
          {systemItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-accent/50 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
          <ShieldCheck className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Protection Active</span>
            <span className="text-xs opacity-80">All engines online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
