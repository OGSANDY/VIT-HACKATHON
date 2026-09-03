import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Smartphone, Send, PhoneCall, MonitorPlay, Activity, MessageSquareWarning, ShieldAlert, ShieldCheck } from 'lucide-react';

export function TransactionSimulator() {
  const [amount, setAmount] = useState('85000');
  const [beneficiary, setBeneficiary] = useState('Rahul Sharma');
  
  // Threat Vectors
  const [activeCall, setActiveCall] = useState(true);
  const [remoteDesktop, setRemoteDesktop] = useState(false);
  const [deviceJitter, setDeviceJitter] = useState(true);
  const [scamSms, setScamSms] = useState(true);

  const [simulationState, setSimulationState] = useState('idle'); // idle, analyzing, blocked, allowed
  const [riskScore, setRiskScore] = useState(0);

  const handleSimulate = (e) => {
    e.preventDefault();
    setSimulationState('analyzing');
    setRiskScore(0);

    // Calculate risk based on toggles
    let calculatedRisk = 15; // Base risk for any transfer
    if (activeCall) calculatedRisk += 35;
    if (remoteDesktop) calculatedRisk += 45;
    if (deviceJitter) calculatedRisk += 15;
    if (scamSms) calculatedRisk += 30;

    calculatedRisk = Math.min(calculatedRisk, 98);

    setTimeout(() => {
      setRiskScore(calculatedRisk);
      if (calculatedRisk > 70) {
        setSimulationState('blocked');
      } else {
        setSimulationState('allowed');
      }
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Smartphone className="h-8 w-8 text-primary" />
          Transaction Context Simulator
        </h1>
        <p className="text-muted-foreground mt-2">
          Demonstrate how ScamShield blocks fraudulent transfers by analyzing environmental telemetry alongside the transaction payload.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: The Customer's Phone Mockup */}
        <div className="lg:col-span-5">
          <div className="mx-auto w-[320px] h-[650px] bg-card border-[8px] border-border rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-border rounded-b-xl w-32 mx-auto z-10" />
            
            {/* Phone Header */}
            <div className="bg-primary text-primary-foreground pt-12 pb-6 px-6 text-center">
              <h3 className="font-semibold text-lg">SecureBanking App</h3>
              <p className="text-primary-foreground/80 text-sm">Send Money</p>
            </div>

            {/* Phone Content */}
            <form onSubmit={handleSimulate} className="flex-1 p-6 flex flex-col gap-5 bg-background">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-3xl font-bold border-b-2 border-border focus:border-primary pb-2 focus:outline-none bg-transparent transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Beneficiary Name</label>
                <input 
                  type="text" 
                  required
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
                  className="w-full text-base font-medium border-b-2 border-border focus:border-primary pb-2 focus:outline-none bg-transparent transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Account Number</label>
                <input 
                  type="text" 
                  defaultValue="3394 8812 0091"
                  className="w-full text-base font-medium border-b-2 border-border focus:border-primary pb-2 focus:outline-none bg-transparent transition-colors text-muted-foreground"
                />
              </div>

              <div className="mt-auto space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-full text-base font-bold shadow-lg"
                  disabled={simulationState === 'analyzing'}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Initiate Transfer
                </Button>
              </div>
            </form>

            {/* Overlay if Blocked */}
            {simulationState === 'blocked' && (
              <div className="absolute inset-0 bg-destructive/95 flex flex-col items-center justify-center p-6 text-center text-destructive-foreground animate-in zoom-in-95 duration-300">
                <ShieldAlert className="w-20 h-20 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Transfer Blocked</h3>
                <p className="text-sm opacity-90">
                  ScamShield has detected that you are currently under high pressure from a potential scammer. For your safety, this transaction has been frozen.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8 bg-transparent border-destructive-foreground text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
                  onClick={() => setSimulationState('idle')}
                >
                  Return to App
                </Button>
              </div>
            )}
            
            {/* Overlay if Allowed */}
            {simulationState === 'allowed' && (
              <div className="absolute inset-0 bg-emerald-600/95 flex flex-col items-center justify-center p-6 text-center text-white animate-in zoom-in-95 duration-300">
                <ShieldCheck className="w-20 h-20 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Transfer Successful</h3>
                <p className="text-sm opacity-90">
                  Transaction verified safely. No manipulation detected.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8 bg-transparent border-white text-white hover:bg-white hover:text-emerald-600"
                  onClick={() => setSimulationState('idle')}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Telemetry Controls & Live Engine */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="shadow-md border-border/50">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Environmental Telemetry Injection
              </CardTitle>
              <CardDescription>
                Toggle the hidden context signals that ScamShield's SDK collects from the mobile device during a transaction.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Toggle 1 */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${activeCall ? 'bg-warning/10 border-warning/30' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setActiveCall(!activeCall)}
                >
                  <div className="flex gap-3">
                    <PhoneCall className={`h-5 w-5 ${activeCall ? 'text-warning' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Active Voice Call Detected</h4>
                      <p className="text-xs text-muted-foreground">User is on a long-duration call during transfer.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${activeCall ? 'bg-warning' : 'bg-muted-foreground/30'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${activeCall ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>

                {/* Toggle 2 */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${remoteDesktop ? 'bg-destructive/10 border-destructive/30' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setRemoteDesktop(!remoteDesktop)}
                >
                  <div className="flex gap-3">
                    <MonitorPlay className={`h-5 w-5 ${remoteDesktop ? 'text-destructive' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Remote Screen Sharing Active</h4>
                      <p className="text-xs text-muted-foreground">AnyDesk / TeamViewer is capturing the screen.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${remoteDesktop ? 'bg-destructive' : 'bg-muted-foreground/30'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${remoteDesktop ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>

                {/* Toggle 3 */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${deviceJitter ? 'bg-warning/10 border-warning/30' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setDeviceJitter(!deviceJitter)}
                >
                  <div className="flex gap-3">
                    <Activity className={`h-5 w-5 ${deviceJitter ? 'text-warning' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">High Gyroscope Jitter</h4>
                      <p className="text-xs text-muted-foreground">Device sensors indicate trembling/shaking hands.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${deviceJitter ? 'bg-warning' : 'bg-muted-foreground/30'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${deviceJitter ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>

                {/* Toggle 4 */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${scamSms ? 'bg-destructive/10 border-destructive/30' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setScamSms(!scamSms)}
                >
                  <div className="flex gap-3">
                    <MessageSquareWarning className={`h-5 w-5 ${scamSms ? 'text-destructive' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Recent Threatening SMS</h4>
                      <p className="text-xs text-muted-foreground">Scam Analyzer flagged an incoming message recently.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${scamSms ? 'bg-destructive' : 'bg-muted-foreground/30'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${scamSms ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/50 flex-1 flex flex-col">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg">Live Risk Engine Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
              
              {simulationState === 'idle' && (
                <div className="text-center text-muted-foreground opacity-50 space-y-4">
                  <ShieldCheck className="w-16 h-16 mx-auto" />
                  <p>Awaiting transaction payload...</p>
                </div>
              )}

              {simulationState === 'analyzing' && (
                <div className="text-center space-y-4">
                  <div className="relative flex h-16 w-16 mx-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40"></span>
                    <span className="relative inline-flex rounded-full h-16 w-16 bg-primary/20 items-center justify-center border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                  <p className="font-semibold text-primary animate-pulse">Scoring Telemetry Vectors...</p>
                </div>
              )}

              {(simulationState === 'blocked' || simulationState === 'allowed') && (
                <div className="w-full animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Scam Pressure Score</span>
                    <span className={`text-4xl font-black ${simulationState === 'blocked' ? 'text-destructive' : 'text-emerald-500'}`}>
                      {riskScore}/100
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-4 bg-muted rounded-full overflow-hidden mb-6">
                    <div 
                      className={`h-full transition-all duration-1000 ${simulationState === 'blocked' ? 'bg-destructive' : 'bg-emerald-500'}`} 
                      style={{ width: `${riskScore}%` }}
                    />
                  </div>

                  {simulationState === 'blocked' ? (
                    <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl text-destructive">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <ShieldAlert className="h-5 w-5" />
                        CRITICAL INTERVENTION
                      </div>
                      <p className="text-sm">
                        High probability of social engineering detected. Transaction intercepted and forwarded to the Fraud Intelligence Center for manual review.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-600">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <ShieldCheck className="h-5 w-5" />
                        TRANSACTION CLEARED
                      </div>
                      <p className="text-sm">
                        Contextual telemetry indicates normal behavior. Transaction allowed to proceed to clearing network.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
