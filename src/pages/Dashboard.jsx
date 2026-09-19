import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ShieldCheck, Search, ShieldAlert, IndianRupee, Users, Building2 } from 'lucide-react';
import { LiveThreatFeed } from '../components/dashboard/LiveThreatFeed';
import { RiskChart } from '../components/dashboard/RiskChart';
import { ActiveInvestigationCard } from '../components/dashboard/ActiveInvestigationCard';
import { IntelligenceSphere } from '../components/3d/IntelligenceSphere';

export function Dashboard() {
  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white/50 backdrop-blur-sm p-8 shadow-sm">
        {/* Subtle Hero Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-grid-pattern opacity-10 pointer-events-none [mask-image:linear-gradient(to_left,white,transparent)]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Telemetry Active
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 drop-shadow-sm">Fraud Intelligence Center</h1>
            <p className="text-slate-600 mt-2 text-lg font-medium">Contextual visibility into simulated scam-in-progress activity.</p>
          </div>
        </div>
      </div>
      
      {/* Top KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card className="shadow-sm border-border/50 bg-gradient-to-br from-card to-card hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Investigations</CardTitle>
            <Search className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">+2 since last hour</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-destructive/20 bg-destructive/5 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Critical Transactions</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">04</div>
            <p className="text-xs text-destructive/80 mt-1">Requires intervention</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scams Prevented</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,284</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">+14% this month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Funds Protected</CardTitle>
            <IndianRupee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹48.7L</div>
            <p className="text-xs text-muted-foreground mt-1">Estimated total</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-warning/20 bg-warning/5 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-warning-foreground">Customers at Risk</CardTitle>
            <Users className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-foreground">19</div>
            <p className="text-xs text-warning/80 mt-1">High pressure signals</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High-Risk Accounts</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">27</div>
            <p className="text-xs text-muted-foreground mt-1">Flagged beneficiaries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <ActiveInvestigationCard />
          <div className="flex-1 min-h-[300px]">
            {/* We will later replace this with the 3D Threat Globe in Phase G */}
            <Card className="h-full flex flex-col shadow-sm border-border/50 bg-gradient-to-b from-card to-accent/20 overflow-hidden">
               <CardHeader className="relative z-10">
                  <CardTitle className="text-lg">Live Threat Intelligence</CardTitle>
               </CardHeader>
               <CardContent className="flex-1 p-0 relative">
                  <IntelligenceSphere />
               </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="h-full min-h-[500px]">
          <LiveThreatFeed />
        </div>

        <div className="flex flex-col gap-6">
           <RiskChart />
           <Card className="flex-1 shadow-sm border-border/50">
             <CardHeader>
               <CardTitle className="text-lg">Recent Incidents</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-muted-foreground">Detailed logs will appear here...</p>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
