import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { LayoutDashboard, ShieldAlert, MessageSquareWarning, ArrowLeftRight, Network, Activity } from 'lucide-react';

const NAVIGATION = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Investigations', path: '/investigations', icon: ShieldAlert },
  { name: 'Scam Analyzer', path: '/analyze', icon: MessageSquareWarning },
  { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { name: 'Fraud Network', path: '/fraud-network', icon: Network },
  { name: 'Fraud DNA', path: '/fraud-dna', icon: Activity },
];

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-foreground relative">
      {/* Primary Global Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none" 
        style={{ backgroundImage: "url('/bg-intelligence.jpg')" }} 
      />
      {/* Light Translucent Overlay for readability */}
      <div className="fixed inset-0 z-0 bg-white/85 pointer-events-none" />
      
      {/* Optional: Preserve existing faint grid overlay over the image if needed */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none z-0" />
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-20 md:hidden backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex flex-col flex-1 overflow-hidden z-10 relative">
        <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
