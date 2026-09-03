import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Fingerprint, BrainCircuit, Activity, Cpu, Database, Network } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';
import { Badge } from '../components/ui/Badge';

const radarData = [
  { subject: 'Financial Velocity', A: 85, fullMark: 100 },
  { subject: 'Device Jitter', A: 92, fullMark: 100 },
  { subject: 'App Overlays', A: 98, fullMark: 100 },
  { subject: 'Network Proxy', A: 75, fullMark: 100 },
  { subject: 'Voice Call Active', A: 99, fullMark: 100 },
  { subject: 'Beneficiary Age', A: 88, fullMark: 100 },
];

const barData = [
  { name: 'NLP Sentiment', risk: 85, fill: '#ef4444' },
  { name: 'Biometrics', risk: 65, fill: '#f97316' },
  { name: 'Geo-Velocity', risk: 45, fill: '#eab308' },
  { name: 'Device Trust', risk: 90, fill: '#ef4444' },
];

export function FraudDNA() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Fingerprint className="h-8 w-8 text-primary" />
          Fraud DNA & Unified Engine
        </h1>
        <p className="text-muted-foreground mt-2">
          Transparent AI model interpretability. See exactly how ScamShield calculates the final manipulation score.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Radar Chart Card */}
        <Card className="lg:col-span-1 shadow-md border-border/50">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" /> Multi-Dimensional Risk
            </CardTitle>
            <CardDescription>Visual mapping of all active telemetry vectors</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#3f3f46" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                <Radar name="Scam Profile" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Breakdown Card */}
        <Card className="lg:col-span-2 shadow-md border-border/50">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Engine Calculation Breakdown
            </CardTitle>
            <CardDescription>Weights applied to individual scoring models</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#3f3f46" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#a1a1aa' }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#a1a1aa', fontSize: 12 }} width={100} />
                    <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46' }} />
                    <Bar dataKey="risk" radius={[0, 4, 4, 0]} />
                  </BarChart>
               </ResponsiveContainer>
               
               <div className="flex flex-col justify-center space-y-4">
                  <div className="bg-card border p-4 rounded-lg shadow-sm">
                     <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Final Unified Output</p>
                     <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-destructive">94.8%</span>
                        <span className="text-sm font-semibold text-destructive mb-1">CRITICAL MATCH</span>
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase">Sub-Model Status</h4>
                    <div className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded">
                      <span className="flex items-center gap-2"><Database className="w-4 h-4 text-emerald-500" /> Financial Tx Graph</span>
                      <Badge className="bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded">
                      <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-emerald-500" /> Device Telemetry</span>
                      <Badge className="bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded">
                      <span className="flex items-center gap-2"><Network className="w-4 h-4 text-emerald-500" /> Network / ISP Risk</span>
                      <Badge className="bg-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20">Online</Badge>
                    </div>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
