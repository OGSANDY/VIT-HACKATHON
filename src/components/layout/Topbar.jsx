import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Button } from '../ui/Button';

export function Topbar({ onMenuClick }) {
  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 shadow-sm gap-2">
      <div className="flex items-center flex-1 min-w-0">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden mr-2 shrink-0">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers, transactions, case IDs..."
            className="w-full bg-muted/50 border-none rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-muted-foreground font-medium hidden md:inline">System Online</span>
        </div>
        <div className="h-6 w-px bg-border mx-1"></div>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-muted text-muted-foreground hover:text-foreground ml-1">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
