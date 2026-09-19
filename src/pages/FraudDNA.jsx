import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Fingerprint, BrainCircuit, Activity, ShieldAlert, FileText } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';
import { Badge } from '../components/ui/Badge';
import { evaluateRisk } from '../engine/riskEngine';
import { demonstrationCase } from '../data/scamCase';

export function FraudDNA() {
  // Calculate final risk dynamically
  const riskResult = evaluateRisk(demonstrationCase);

  // Map engine factors to Radar data (raw scores)
  const radarData = riskResult.factors.map(f => ({
    subject: f.name,
    A: f.score,
    fullMark: 100
  }));

  // Map engine factors to Bar data (weighted contributions)
  const barData = riskResult.factors.map(f => ({
    name: f.name,
    risk: parseFloat(f.contribution),
    fill: f.score > 70 ? '#ef4444' : f.score > 40 ? '#f97316' : '#10b981'
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Fingerprint className="h-8 w-8 text-primary" />
          Fraud DNA & Unified Engine
          <Badge variant="outline" className="ml-2 bg-muted/50 text-muted-foreground border-muted-foreground/30 font-normal">
            Deterministic Explainable Evaluation
          </Badge>
        </h1>
        <p className="text-muted-foreground mt-2">
          Transparent model interpretability. See exactly how the Unified Risk Engine calculates the final manipulation score based on contextual telemetry.
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
                <Radar name="Scam Profile" dataKey="A" stroke={riskResult.riskLevel === 'CRITICAL' ? '#ef4444' : '#10b981'} fill={riskResult.riskLevel === 'CRITICAL' ? '#ef4444' : '#10b981'} fillOpacity={0.3} />
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
            <CardDescription>Weighted contribution of individual scoring models to the final result</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#3f3f46" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#a1a1aa' }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#a1a1aa', fontSize: 11 }} width={110} />
                    <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46' }} />
                    <Bar dataKey="risk" radius={[0, 4, 4, 0]} />
                  </BarChart>
               </ResponsiveContainer>
               
               <div className="flex flex-col justify-center space-y-4">
                  <div className={`border p-4 rounded-lg shadow-sm ${riskResult.riskLevel === 'CRITICAL' ? 'bg-destructive/10 border-destructive/30' : riskResult.riskLevel === 'HIGH' ? 'bg-warning/10 border-warning/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                     <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 flex items-center justify-between">
                       Unified Risk Engine
                       <Badge variant="outline" className="text-[9px] uppercase">Central Result</Badge>
                     </p>
                     <div className="flex items-end gap-2 mt-2">
                        <span className={`text-5xl font-black ${riskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : riskResult.riskLevel === 'HIGH' ? 'text-warning' : 'text-emerald-500'}`}>
                          {riskResult.totalScore}/100
                        </span>
                     </div>
                     <div className={`text-lg font-bold mt-1 uppercase ${riskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : riskResult.riskLevel === 'HIGH' ? 'text-warning' : 'text-emerald-500'}`}>
                        {riskResult.riskLevel} MATCH
                     </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded-lg shadow-sm">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> Recommended Action
                    </h4>
                    <p className="text-sm font-medium text-foreground">
                      {riskResult.recommendedAction}
                    </p>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Explanations Card */}
        <Card className="lg:col-span-3 shadow-md border-border/50">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Risk Composition & Evidence
            </CardTitle>
            <CardDescription>Why the unified engine classified this activity as risky</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
               {riskResult.factors.map((f, i) => (
                  <div key={i} className="border p-4 rounded-lg bg-card flex flex-col">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm flex-1">{i+1}. {f.name}</h4>
                        <Badge variant={f.score > 70 ? 'destructive' : f.score > 40 ? 'warning' : 'outline'}>{f.score}/100</Badge>
                     </div>
                     <p className="text-xs text-muted-foreground mb-4 flex-1">{f.explanation}</p>
                     <div className="flex justify-between text-xs border-t border-border pt-3 mt-auto">
                        <span className="text-muted-foreground">Weight: {f.weight}%</span>
                        <span className="font-bold text-foreground">Contribution: +{f.contribution}</span>
                     </div>
                  </div>
               ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
