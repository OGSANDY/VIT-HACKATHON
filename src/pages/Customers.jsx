import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Users, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export function Customers() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          Customer Directory
        </h1>
        <p className="text-muted-foreground mt-2">Manage retail banking customers and view their assigned ScamShield risk profiles.</p>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <CardTitle>Customer Risk Profiles</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search customer ID or name..." className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer ID</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Account Type</th>
                  <th className="px-6 py-4 font-semibold">Risk Status</th>
                  <th className="px-6 py-4 font-semibold">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">CUST-88219</td>
                  <td className="px-6 py-4">Arun Kumar</td>
                  <td className="px-6 py-4">Savings Salary</td>
                  <td className="px-6 py-4"><Badge variant="destructive" className="animate-pulse">CRITICAL RISK</Badge></td>
                  <td className="px-6 py-4 text-muted-foreground">Active Now</td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">CUST-10923</td>
                  <td className="px-6 py-4">Meera Reddy</td>
                  <td className="px-6 py-4">Current Account</td>
                  <td className="px-6 py-4"><Badge variant="success" className="bg-emerald-500/20 text-emerald-600"><CheckCircle2 className="w-3 h-3 mr-1"/> Safe</Badge></td>
                  <td className="px-6 py-4 text-muted-foreground">2 hours ago</td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">CUST-55412</td>
                  <td className="px-6 py-4">Sanjay Patel</td>
                  <td className="px-6 py-4">Joint Savings</td>
                  <td className="px-6 py-4"><Badge variant="warning">Elevated</Badge></td>
                  <td className="px-6 py-4 text-muted-foreground">1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
