import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Settings as SettingsIcon, Bell, Shield, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">Manage your analyst preferences and global system toggles.</p>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> Engine Thresholds</CardTitle>
            <CardDescription>Adjust the strictness of the ScamShield AI model.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center p-4 border rounded-lg">
               <div>
                 <h4 className="font-semibold text-foreground">Auto-Freeze Threshold</h4>
                 <p className="text-sm text-muted-foreground">Transactions scoring above this will be instantly frozen.</p>
               </div>
               <div className="font-mono text-lg font-bold bg-muted px-4 py-2 rounded">85%</div>
             </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Key className="w-5 h-5" /> API Integrations</CardTitle>
            <CardDescription>Manage third-party data sources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center p-4 border rounded-lg">
               <div>
                 <h4 className="font-semibold text-foreground">Telecom Provider Webhook</h4>
                 <p className="text-sm text-muted-foreground">Status: Connected • Last sync: 2 mins ago</p>
               </div>
               <Button variant="outline">Revoke Access</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
