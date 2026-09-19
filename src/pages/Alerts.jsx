import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BellRing, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export function Alerts() {
  const alerts = [
    { id: 1, type: 'CRITICAL', title: 'Transaction Blocked (Scam Pattern Match)', time: '2 mins ago', desc: '₹85,000 transfer from Arun Kumar blocked due to Digital Arrest pattern.', icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
    { id: 2, type: 'WARNING', title: 'High Mule Probability Detected', time: '15 mins ago', desc: 'New payee added by Sanjay Patel flags 45% on the mule index.', icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
    { id: 3, type: 'INFO', title: 'Model Weights Updated', time: '1 hour ago', desc: 'NLP sentiment model updated to v2.4 in production.', icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <BellRing className="h-8 w-8 text-primary" />
          Global Alerts
        </h1>
        <p className="text-muted-foreground mt-2">Demonstration alerts generated from the Unified Risk Engine.</p>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <Card key={alert.id} className="shadow-sm border-border/50 hover:bg-muted/10 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`p-3 rounded-full ${alert.bg}`}>
                <alert.icon className={`w-6 h-6 ${alert.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground">{alert.title}</h3>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{alert.desc}</p>
                <div className="mt-2">
                  <Badge variant={alert.type === 'CRITICAL' ? 'destructive' : alert.type === 'WARNING' ? 'warning' : 'outline'}>
                    {alert.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
