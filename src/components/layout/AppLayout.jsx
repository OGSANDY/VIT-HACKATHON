import React from 'react';
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
  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <Sidebar navigation={NAVIGATION} />
      <div className="flex flex-col flex-1 overflow-hidden z-10">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-[#fbfbfc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
