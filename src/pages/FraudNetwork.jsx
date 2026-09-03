import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Network, Search, AlertTriangle, ShieldCheck, UserX, Building2, Landmark, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
// Using framer-motion to create an animated SVG network graph
import { motion } from 'framer-motion';

const nodes = [
  { id: '1', type: 'target', label: 'Arun Kumar', risk: 'critical', x: 50, y: 50 },
  { id: '2', type: 'mule', label: 'Beneficiary A', risk: 'high', x: 30, y: 30 },
  { id: '3', type: 'mule', label: 'Beneficiary B', risk: 'high', x: 70, y: 30 },
  { id: '4', type: 'hub', label: 'Crypto Exchange', risk: 'critical', x: 50, y: 15 },
  { id: '5', type: 'bank', label: 'Foreign Bank', risk: 'medium', x: 20, y: 15 },
  { id: '6', type: 'bank', label: 'Offshore Trust', risk: 'medium', x: 80, y: 15 },
  { id: '7', type: 'mule', label: 'Beneficiary C', risk: 'high', x: 50, y: 75 },
  { id: '8', type: 'mule', label: 'Beneficiary D', risk: 'warning', x: 70, y: 70 },
  { id: '9', type: 'mule', label: 'Beneficiary E', risk: 'warning', x: 30, y: 70 },
];

const edges = [
  { source: '1', target: '2', amount: '₹85k (Blocked)' },
  { source: '1', target: '3', amount: '₹12k' },
  { source: '2', target: '4', amount: '₹85k' },
  { source: '3', target: '4', amount: '₹12k' },
  { source: '4', target: '5', amount: '₹40k' },
  { source: '4', target: '6', amount: '₹57k' },
  { source: '1', target: '7', amount: '₹5k' },
  { source: '7', target: '8', amount: '₹2k' },
  { source: '7', target: '9', amount: '₹3k' },
];

export function FraudNetwork() {
  const [activeNode, setActiveNode] = useState(nodes[0]);

  const getNodeColor = (type, risk) => {
    if (risk === 'critical') return '#ef4444'; // destructive
    if (risk === 'high') return '#f97316'; // warning
    if (risk === 'medium') return '#eab308';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Network className="h-8 w-8 text-primary" />
            Fraud Syndicate Network
          </h1>
          <p className="text-muted-foreground mt-2">
            Graph visualization of money mule accounts and transaction flows linked to ScamShield investigations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Account / PAN..."
              className="w-full bg-muted/50 border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="outline" className="gap-2"><Filter className="w-4 h-4"/> Filter</Button>
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

              <div className="absolute bottom-4 left-4 flex gap-4 bg-background/80 p-3 rounded-lg border backdrop-blur-sm text-xs font-medium">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive"></div> Critical Node</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning"></div> High Risk</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#eab308]"></div> Monitored</div>
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
                    <span className="text-sm font-mono">#{activeNode.id.padStart(4, '0')}</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Total Inflow</span>
                    <span className="text-sm font-semibold">₹1,45,000</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Total Outflow</span>
                    <span className="text-sm font-semibold">₹97,000</span>
                 </div>
                 <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Connected Wallets</span>
                    <span className="text-sm font-semibold">14</span>
                 </div>
              </div>

              {activeNode.type === 'target' && (
                <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-destructive">
                  <div className="flex items-center gap-2 font-bold mb-2 text-sm">
                    <AlertTriangle className="w-4 h-4" /> Patient Zero
                  </div>
                  <p className="text-xs leading-relaxed">
                    This account is the origin of the current ScamShield investigation (SCM-2048). Funds were manipulated from this legitimate customer account.
                  </p>
                </div>
              )}

              {activeNode.type === 'hub' && (
                <div className="bg-warning/10 p-4 rounded-lg border border-warning/20 text-warning-foreground">
                  <div className="flex items-center gap-2 font-bold mb-2 text-sm">
                    <Network className="w-4 h-4" /> Syndicate Hub
                  </div>
                  <p className="text-xs leading-relaxed">
                    This entity acts as a central mixing node, consolidating stolen funds before distributing them to offshore accounts. High priority for freezing.
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
