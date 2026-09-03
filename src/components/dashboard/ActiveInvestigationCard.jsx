import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AlertTriangle, Fingerprint, Activity, Smartphone, Network, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ActiveInvestigationCard() {
  const navigate = useNavigate();

  return (
    <Card className="border-destructive/30 bg-destructive/5 shadow-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-destructive animate-pulse"></div>
      
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-destructive tracking-widest uppercase">Investigation</span>
            <Badge variant="outline" className="text-destructive border-destructive/30 font-mono text-xs">
              #SCM-2048
            </Badge>
          </div>
          <h3 className="text-xl font-semibold">Arun Kumar</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-destructive">₹85,000</div>
          <div className="text-sm font-medium text-destructive flex items-center justify-end gap-1">
            <AlertTriangle className="h-4 w-4" />
            SCAM IN PROGRESS
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-card rounded-lg border p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Fingerprint className="h-4 w-4" />
              Scam DNA
            </div>
            <span className="text-sm font-semibold text-foreground">Digital Arrest / Bank Impersonation</span>
          </div>
          
          <div className="space-y-3 pt-3 border-t">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Activity className="h-4 w-4 text-destructive" /> Scam Pressure</span>
              <span className="font-semibold text-destructive">94 / 100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4 text-warning" /> Behaviour Deviation</span>
              <span className="font-semibold text-warning">87 / 100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4 text-warning" /> Beneficiary Risk</span>
              <span className="font-semibold text-warning">89 / 100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Smartphone className="h-4 w-4 text-destructive" /> Device Anomaly</span>
              <span className="font-semibold text-destructive">81 / 100</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><Network className="h-4 w-4 text-warning" /> Network Anomaly</span>
              <span className="font-semibold text-warning">72 / 100</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="destructive" 
          className="w-full gap-2 shadow-lg shadow-destructive/20"
          onClick={() => navigate('/investigations/SCM-2048')}
        >
          <Search className="h-4 w-4" />
          OPEN INVESTIGATION
        </Button>
      </CardContent>
    </Card>
  );
}
