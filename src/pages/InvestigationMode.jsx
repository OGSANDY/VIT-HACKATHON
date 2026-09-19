import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert, AlertTriangle, Fingerprint, MapPin, Smartphone, PhoneCall, Network, Lock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { evaluateRisk } from '../engine/riskEngine';
import { demonstrationCase } from '../data/scamCase';

// Fix for default leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function InvestigationMode() {
  const navigate = useNavigate();
  const riskResult = evaluateRisk(demonstrationCase);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Investigation Workspace</h1>
            <Badge variant={riskResult.riskLevel === 'CRITICAL' ? 'destructive' : riskResult.riskLevel === 'HIGH' ? 'warning' : 'outline'} className="animate-pulse">
              {riskResult.riskLevel} ACTIVE
            </Badge>
          </div>
          <p className="text-muted-foreground">Case ID: #{demonstrationCase.caseId} • Customer: {demonstrationCase.customer.name} ({demonstrationCase.customer.customerId}) • Amount: ₹{demonstrationCase.transaction.amount.toLocaleString('en-IN')}</p>
          <p className="text-sm font-semibold mt-2 text-destructive flex items-center gap-2">
             <AlertTriangle className="w-4 h-4" /> Recommended Action: {riskResult.recommendedAction}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            <Button variant="outline" size="sm" onClick={() => navigate('/fraud-dna')}>View Fraud DNA</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/transactions')}>View Transaction Context</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/analyze')}>Scam Analyzer</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
             <Button variant="secondary" className="flex-1" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
             <Button variant="destructive" className="flex-1 gap-2 shadow-lg shadow-destructive/20">
               <Lock className="w-4 h-4" /> {riskResult.recommendedAction.split('/')[0].trim() || 'Execute Action'}
             </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Scam DNA & Signals */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-md">
            <CardHeader className="pb-3 bg-muted/20 border-b">
              <CardTitle className="text-foreground flex items-center justify-between text-lg">
                 <div className="flex items-center gap-2">
                   <Fingerprint className="w-5 h-5 text-primary" /> Unified Risk Engine
                 </div>
                 <Badge variant="outline" className="text-[10px]">Deterministic Evaluation</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className={`p-4 bg-background rounded-lg border ${riskResult.riskLevel === 'CRITICAL' ? 'border-destructive/30 bg-destructive/5' : ''}`}>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">Detected Scam Pattern</p>
                <p className="text-lg font-bold text-foreground">{demonstrationCase.scamType}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full w-[${riskResult.totalScore}%] ${riskResult.riskLevel === 'CRITICAL' ? 'bg-destructive' : 'bg-warning'}`} style={{width: `${riskResult.totalScore}%`}} />
                  </div>
                  <span className={`text-sm font-bold ${riskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : 'text-warning'}`}>{riskResult.totalScore}/100 Match</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground mt-4 uppercase tracking-wider">Engine Risk Factors</h4>
                
                {riskResult.factors.map((f, i) => (
                  <div key={i} className="flex flex-col justify-between p-3 bg-background border rounded-lg gap-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-foreground">{f.name}</p>
                      <Badge variant={f.score > 70 ? 'destructive' : f.score > 40 ? 'warning' : 'outline'} className="text-[10px]">{f.score}/100</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.explanation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground uppercase tracking-widest">Geolocation</CardTitle>
            </CardHeader>
            <CardContent className="p-0 rounded-b-xl overflow-hidden relative">
               <div className="h-[350px] w-full bg-muted/50 z-0">
                 {/* Leaflet map needs to be client-side only and requires a height */}
                 <MapContainer 
                    center={[17.82, 84.31]} // Center of India between Chennai and Kolkata
                    zoom={5} 
                    scrollWheelZoom={true}
                    className="h-full w-full"
                    zoomControl={true}
                 >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Victim Location */}
                    <Marker position={[13.0827, 80.2707]}>
                      <Popup>Victim Device Location (Chennai)</Popup>
                    </Marker>
                    {/* Scammer Suspected IP */}
                    <Marker position={[22.5726, 88.3639]}>
                      <Popup>Scammer VoIP Origin (Kolkata)</Popup>
                    </Marker>
                    {/* Line connecting them */}
                    <Polyline positions={[[13.0827, 80.2707], [22.5726, 88.3639]]} color="#ef4444" weight={3} dashArray="5, 10" />
                 </MapContainer>
               </div>
               {/* Map overlay controls */}
               <div className="absolute top-2 right-2 bg-background/90 p-1.5 rounded text-[10px] font-semibold border shadow-sm z-[400]">
                 Live IP Tracing Active
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Timeline & Resolution */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="shadow-md border-border/50 flex-1">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle className="text-lg">Incident Timeline</CardTitle>
              <CardDescription>Chronological sequence of manipulation events leading to the blocked transaction.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              
              <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                
                {/* Timeline Item 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-muted-foreground text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <MessageSquare className="w-3 h-3" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground">Scam SMS Received</span>
                      <time className="text-xs text-muted-foreground">10:15 AM</time>
                    </div>
                    <p className="text-sm text-muted-foreground">"RBI Alert: Your account is suspended. Click to verify."</p>
                    <Badge variant="outline" className="mt-2 text-[10px]">Scam Analyzer: High Threat</Badge>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-warning text-warning-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <PhoneCall className="w-3 h-3" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-warning/30 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground">Incoming Call Accepted</span>
                      <time className="text-xs text-muted-foreground">10:18 AM</time>
                    </div>
                    <p className="text-sm text-muted-foreground">User accepts call from unknown VoIP number. Call remains active during the entire fraud window.</p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-warning text-warning-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Smartphone className="w-3 h-3" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground">AnyDesk Installed</span>
                      <time className="text-xs text-muted-foreground">10:32 AM</time>
                    </div>
                    <p className="text-sm text-muted-foreground">Remote access application installed and granted screen recording permissions.</p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-destructive text-destructive-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <ShieldAlert className="w-3 h-3" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-destructive/10 border border-destructive/30 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-destructive">₹{demonstrationCase.transaction.amount.toLocaleString('en-IN')} Transfer Blocked</span>
                      <time className="text-xs text-destructive">10:48 AM</time>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-2">ScamShield intervened.</p>
                    <p className="text-xs text-muted-foreground">Engine correlated SMS + Call + AnyDesk to block standard UPI transfer despite correct PIN.</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Action Center */}
          <Card className="shadow-md border-border/50">
             <CardHeader className="pb-3 bg-muted/20 border-b">
                <CardTitle className="text-lg">Analyst Action Center</CardTitle>
             </CardHeader>
             <CardContent className="p-6 flex flex-col md:flex-row gap-4">
                <Button variant="outline" className="flex-1 gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  <CheckCircle2 className="w-4 h-4" /> Dismiss (False Positive)
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <PhoneCall className="w-4 h-4" /> Call Customer
                </Button>
                <Button variant="destructive" className="flex-1 gap-2 shadow-lg shadow-destructive/20">
                  <Lock className="w-4 h-4" /> Freeze & Escalate
                </Button>
             </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
