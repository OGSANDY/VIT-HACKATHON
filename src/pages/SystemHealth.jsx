import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Activity, Server, Cpu, Network } from 'lucide-react';

export function SystemHealth() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Activity className="h-8 w-8 text-primary" />
          System Health
        </h1>
        <p className="text-muted-foreground mt-2">Live infrastructure monitoring for the ScamShield core.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-border/50 border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Server className="w-4 h-4" /> NLP Engine API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12ms</div>
            <p className="text-xs text-emerald-500 mt-1 font-medium">99.99% Uptime (Operational)</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/50 border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Telemetry Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2k <span className="text-lg font-normal text-muted-foreground">req/s</span></div>
            <p className="text-xs text-emerald-500 mt-1 font-medium">Optimal Load</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Network className="w-4 h-4" /> Graph Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Syncing</div>
            <p className="text-xs text-emerald-500 mt-1 font-medium">No replication lag</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
