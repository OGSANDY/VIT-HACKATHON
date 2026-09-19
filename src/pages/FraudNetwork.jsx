import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Network, Search, AlertTriangle, ShieldCheck, UserX, Building2, Landmark, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { demonstrationCase } from '../data/scamCase';
import { evaluateRisk } from '../engine/riskEngine';

const nodes = demonstrationCase.network.nodes;
const edges = demonstrationCase.network.relationships;

export function FraudNetwork() {
  const [activeNode, setActiveNode] = useState(nodes[0]);
  const riskResult = evaluateRisk(demonstrationCase);
  const networkFactor = riskResult.factors.find(f => f.name.toLowerCase().includes('network'));
  const networkRiskScore = networkFactor ? networkFactor.score : 0;

  const getNodeColor = (type, risk) => {
    if (risk === 'critical') return '#ef4444'; // destructive
    if (risk === 'high') return '#f97316'; // warning
    if (risk === 'medium') return '#eab308';
    if (risk === 'warning') return '#eab308';
    return '#10b981'; // primary
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'target': return <UserX className="w-5 h-5 text-white" />;
      case 'mule': return <Building2 className="w-4 h-4 text-white" />;
      case 'hub': return <Network className="w-5 h-5 text-white" />;
      case 'bank': return <Landmark className="w-4 h-4 text-white" />;
      default: return <ShieldCheck className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Network className="h-8 w-8 text-primary" />
            Case Investigation Network
          </h1>
          <p className="text-muted-foreground mt-2">
            Graph visualization of entities and transaction flows linked to Case {demonstrationCase.caseId}.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Account / PAN..."
              className="w-full bg-muted/50 border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="outline" className="gap-2 shrink-0"><Filter className="w-4 h-4"/> Filter</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 flex-1 min-h-[600px]">
        {/* The Graph Canvas */}
        <Card className="lg:col-span-3 shadow-md border-border/50 relative overflow-hidden bg-card/50">
           <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
           <CardContent className="p-0 w-full h-full relative min-h-[600px]">
              
              <svg className="w-full h-full absolute inset-0 z-0">
                {edges.map((edge, i) => {
                  const source = nodes.find(n => n.id === edge.source);
                  const target = nodes.find(n => n.id === edge.target);
                  return (
                    <g key={i}>
                      <motion.line
                        x1={`${source.x}%`}
                        y1={`${source.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke="currentColor"
                        className="text-muted-foreground/30"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                      />
                      <motion.circle
                         cx={`${target.x}%`}
                         cy={`${target.y}%`}
                         r="3"
                         fill="currentColor"
                         className="text-destructive"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: [0, 1, 0] }}
                         transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </g>
                  );
                })}
              </svg>

              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveNode(node)}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 ${activeNode.id === node.id ? 'ring-4 ring-primary/30 border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: getNodeColor(node.type, node.risk) }}
                  >
                    {getNodeIcon(node.type)}
                  </div>
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/90 px-2 py-1 rounded text-xs font-semibold shadow-sm border">
                    {node.label}
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex flex-wrap gap-2 sm:gap-4 bg-background/80 p-3 rounded-lg border backdrop-blur-sm text-xs font-medium z-20">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive shrink-0"></div> Critical Node</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning shrink-0"></div> High Risk</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#eab308] shrink-0"></div> Monitored</div>
              </div>
              <div className="absolute top-4 right-4 left-4 sm:left-auto flex flex-wrap gap-2 sm:gap-4 bg-background/80 p-3 rounded-lg border backdrop-blur-sm text-xs font-medium shadow-sm z-20">
                 <div className="flex items-center gap-2 font-bold text-destructive">
                   <Network className="w-4 h-4 shrink-0" /> Unified Engine Network Risk: {networkRiskScore}/100
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* Node Details Panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="shadow-md border-border/50 flex-1">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg flex items-center justify-between">
                Node Inspector
                <Badge variant={activeNode.risk === 'critical' ? 'destructive' : 'warning'} className="uppercase">
                  {activeNode.risk}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{activeNode.label}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{activeNode.type} Entity</p>
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Entity ID</span>
                    <span className="text-sm font-mono">{activeNode.details?.id || `#${activeNode.id.padStart(4, '0')}`}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Total Inflow</span>
                    <span className="text-sm font-semibold">{activeNode.details?.inflow || "N/A"}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Total Outflow</span>
                    <span className="text-sm font-semibold">{activeNode.details?.outflow || "N/A"}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Direct Relationships</span>
                    <span className="text-sm font-semibold">{edges.filter(e => e.source === activeNode.id || e.target === activeNode.id).length}</span>
                 </div>
              </div>

              {activeNode.type === 'target' && (
                <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-destructive">
                  <div className="flex items-center gap-2 font-bold mb-2 text-sm">
                    <AlertTriangle className="w-4 h-4" /> Patient Zero
                  </div>
                  <p className="text-xs leading-relaxed">
                    This account is the origin of the current ScamShield demonstration investigation ({demonstrationCase.caseId}). Funds were manipulated from this legitimate customer account.
                  </p>
                </div>
              )}

              {activeNode.type === 'hub' && (
                <div className="bg-warning/10 p-4 rounded-lg border border-warning/20 text-warning-foreground">
                  <div className="flex items-center gap-2 font-bold mb-2 text-sm">
                    <Network className="w-4 h-4" /> Syndicate Hub
                  </div>
                  <p className="text-xs leading-relaxed">
                    This demonstration entity acts as a central mixing node, consolidating stolen funds before distributing them to offshore accounts. High priority for freezing.
                  </p>
                </div>
              )}

              <Button className="w-full mt-4" variant={activeNode.risk === 'critical' ? 'destructive' : 'default'}>
                View Full Audit Trail
              </Button>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
