import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Building2, Search, AlertTriangle } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export function Beneficiaries() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          Beneficiary Watchlist
        </h1>
        <p className="text-muted-foreground mt-2">Monitor recently added payees and flag potential money mule accounts.</p>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <CardTitle>Global Payee Database</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search Account # or IFSC..." className="w-full pl-9 pr-4 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Account Number</th>
                  <th className="px-6 py-4 font-semibold">Bank / IFSC</th>
                  <th className="px-6 py-4 font-semibold">Added By</th>
                  <th className="px-6 py-4 font-semibold">Mule Probability</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">XXXX-XXXX-9921</td>
                  <td className="px-6 py-4">HDFC Bank<br/><span className="text-xs text-muted-foreground">HDFC0001234</span></td>
                  <td className="px-6 py-4">Arun Kumar (2 mins ago)</td>
                  <td className="px-6 py-4 text-destructive font-bold">89%</td>
                  <td className="px-6 py-4"><Badge variant="destructive">BLOCKED</Badge></td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">XXXX-XXXX-4412</td>
                  <td className="px-6 py-4">State Bank of India<br/><span className="text-xs text-muted-foreground">SBIN0004567</span></td>
                  <td className="px-6 py-4">Meera Reddy (1 hr ago)</td>
                  <td className="px-6 py-4 text-emerald-600 font-bold">2%</td>
                  <td className="px-6 py-4"><Badge variant="success" className="bg-emerald-500/20 text-emerald-600">VERIFIED</Badge></td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">XXXX-XXXX-1109</td>
                  <td className="px-6 py-4">ICICI Bank<br/><span className="text-xs text-muted-foreground">ICIC0008910</span></td>
                  <td className="px-6 py-4">Sanjay Patel (Yesterday)</td>
                  <td className="px-6 py-4 text-warning font-bold">45%</td>
                  <td className="px-6 py-4"><Badge variant="warning">UNDER REVIEW</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
