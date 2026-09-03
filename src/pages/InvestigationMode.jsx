import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert, AlertTriangle, Fingerprint, MapPin, Smartphone, PhoneCall, Network, Lock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function InvestigationMode() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Investigation Workspace</h1>
            <Badge variant="destructive" className="animate-pulse">CRITICAL ACTIVE</Badge>
          </div>
          <p className="text-muted-foreground">Case ID: #SCM-2048 • Customer: Arun Kumar • Amount: ₹85,000</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          <Button variant="destructive" className="gap-2 shadow-lg shadow-destructive/20">
            <Lock className="w-4 h-4" /> Freeze Account Now
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Scam DNA & Signals */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-destructive/30 bg-destructive/5 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-destructive flex items-center gap-2 text-lg">
                <Fingerprint className="w-5 h-5" /> Scam DNA Profiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-background rounded-lg border">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">Detected Pattern</p>
                <p className="text-lg font-bold text-foreground">Digital Arrest Impersonation</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive w-[94%]" />
                  </div>
                  <span className="text-sm font-bold text-destructive">94% Match</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground mt-4 mb-3 uppercase tracking-wider">Trigger Signals</h4>
                
                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <PhoneCall className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Active Voice Call</p>
                      <p className="text-xs text-muted-foreground">Duration: 42 mins</p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-[10px]">CRITICAL</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Screen Sharing App</p>
                      <p className="text-xs text-muted-foreground">AnyDesk detected</p>
                    </div>
                  </div>
                  <Badge variant="warning" className="text-[10px]">HIGH</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                      <Network className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">New Beneficiary</p>
                      <p className="text-xs text-muted-foreground">Added 2 mins ago</p>
                    </div>
                  </div>
                  <Badge variant="warning" className="text-[10px]">HIGH</Badge>
                </div>
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
                      <span className="font-bold text-destructive">₹85,000 Transfer Blocked</span>
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
