import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Activity, ShieldAlert, ShieldX, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

const initialEvents = [
  { id: 1, time: '10:48:03', level: 'CRITICAL', customer: 'Arun Kumar', amount: '₹85,000', reason: 'Possible scam in progress' },
  { id: 2, time: '10:46:22', level: 'HIGH', customer: 'Priya', amount: '₹42,000', reason: 'Possible KYC scam' },
  { id: 3, time: '10:44:17', level: 'MEDIUM', customer: 'Rahul', amount: '₹18,000', reason: 'Network anomaly' },
];

export function LiveThreatFeed() {
  const [events, setEvents] = useState(initialEvents);

  return (
    <Card className="h-full flex flex-col shadow-sm border-border/50">
      <CardHeader className="border-b bg-muted/20 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Live Threat Stream
          </CardTitle>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Monitoring
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="divide-y">
          {events.map((event) => (
            <div key={event.id} className="p-4 hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                  {event.time}
                </div>
                <Badge 
                  variant={
                    event.level === 'CRITICAL' ? 'destructive' : 
                    event.level === 'HIGH' ? 'warning' : 'secondary'
                  }
                  className="text-[10px] px-1.5 py-0"
                >
                  {event.level}
                </Badge>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <div className="font-medium text-foreground">{event.customer}</div>
                <div className="font-semibold text-foreground">{event.amount}</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                {event.level === 'CRITICAL' && <ShieldX className="h-3.5 w-3.5 text-destructive" />}
                {event.level === 'HIGH' && <ShieldAlert className="h-3.5 w-3.5 text-warning" />}
                {event.level === 'MEDIUM' && <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />}
                {event.reason}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
