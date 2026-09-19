import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Smartphone, Send, PhoneCall, MonitorPlay, Activity, MessageSquareWarning, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { evaluateRisk } from '../engine/riskEngine';
import { demonstrationCase } from '../data/scamCase';

export function TransactionSimulator() {
  const [amount, setAmount] = useState(demonstrationCase.transaction.amount.toString());
  const [beneficiary, setBeneficiary] = useState(demonstrationCase.transaction.beneficiary);
  
  // Threat Vectors
  const [activeCall, setActiveCall] = useState(false);
  const [remoteDesktop, setRemoteDesktop] = useState(false);
  const [deviceJitter, setDeviceJitter] = useState(false);
  const [scamSms, setScamSms] = useState(false);

  const [simulationState, setSimulationState] = useState('idle'); // idle, analyzing, blocked, allowed, medium_review, high_review
  
  // Live Risk Calculation
  const liveRiskResult = useMemo(() => {
    const currentCase = {
      ...demonstrationCase,
      transaction: {
        ...demonstrationCase.transaction,
        amount: Number(amount),
        beneficiary: beneficiary,
        isNewBeneficiary: beneficiary !== 'Known Payee',
        amountDeviationPercent: Number(amount) > 10000 ? (Number(amount) / 10000) * 100 : 10
      },
      deviceContextSignals: {
        ...demonstrationCase.deviceContextSignals,
        activeCall: activeCall,
        remoteScreenSharing: remoteDesktop,
        gyroscopeJitter: deviceJitter,
        recentThreateningMessage: scamSms
      },
      communicationSignals: {
        ...demonstrationCase.communicationSignals,
        scamPressure: scamSms,
        urgency: scamSms,
        threat: scamSms,
        authorityImpersonation: scamSms,
        financialDemand: scamSms
      },
      behaviouralSignals: {
        behaviourDeviation: false,
        sessionLengthDeviation: false,
        hesitationPatterns: false,
        navigationAnomalies: false
      },
      networkSignals: {
        networkAnomaly: false,
        suspiciousConnections: false,
        vpnOrProxyDetected: false,
        ispDeviation: false
      },
      beneficiarySignals: {
        beneficiaryRisk: beneficiary !== 'Known Payee',
        newBeneficiary: beneficiary !== 'Known Payee',
        beneficiaryAgeMinutes: beneficiary !== 'Known Payee' ? 2 : 10000,
        knownMuleNetwork: false
      }
    };
    return evaluateRisk(currentCase);
  }, [amount, beneficiary, activeCall, remoteDesktop, deviceJitter, scamSms]);

  const handleSimulate = (e) => {
    e.preventDefault();
    setSimulationState('analyzing');

    setTimeout(() => {
      if (liveRiskResult.riskLevel !== 'LOW') {
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
          <Badge variant="outline" className="ml-2 bg-muted/50 text-muted-foreground border-muted-foreground/30 font-normal">Simulation Mode</Badge>
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
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${activeCall ? 'bg-orange-500/10 border-orange-500/30' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setActiveCall(!activeCall)}
                >
                  <div className="flex gap-3">
                    <PhoneCall className={`h-5 w-5 ${activeCall ? 'text-orange-500' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Active Voice Call Detected</h4>
                      <p className="text-xs text-muted-foreground">User is on a long-duration call during transfer.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${activeCall ? 'bg-orange-500' : 'bg-slate-300'}`}>
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
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${remoteDesktop ? 'bg-destructive' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${remoteDesktop ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>

                {/* Toggle 3 */}
                <div 
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${deviceJitter ? 'bg-orange-500/10 border-orange-500/30' : 'bg-card hover:bg-muted'}`}
                  onClick={() => setDeviceJitter(!deviceJitter)}
                >
                  <div className="flex gap-3">
                    <Activity className={`h-5 w-5 ${deviceJitter ? 'text-orange-500' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">High Gyroscope Jitter</h4>
                      <p className="text-xs text-muted-foreground">Device sensors indicate trembling/shaking hands.</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${deviceJitter ? 'bg-orange-500' : 'bg-slate-300'}`}>
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
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${scamSms ? 'bg-destructive' : 'bg-slate-300'}`}>
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
              
              {simulationState === 'analyzing' ? (
                <div className="text-center space-y-4">
                  <div className="relative flex h-16 w-16 mx-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40"></span>
                    <span className="relative inline-flex rounded-full h-16 w-16 bg-primary/20 items-center justify-center border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                  <p className="font-semibold text-primary animate-pulse">Scoring Telemetry Vectors...</p>
                </div>
              ) : (
                <div className="w-full animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Live Unified Score</span>
                      <span className={`text-lg font-semibold ${liveRiskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : liveRiskResult.riskLevel === 'HIGH' ? 'text-warning' : liveRiskResult.riskLevel === 'MEDIUM' ? 'text-blue-500' : 'text-emerald-500'}`}>
                        {liveRiskResult.riskLevel} RISK
                      </span>
                    </div>
                    <span className={`text-5xl font-black ${liveRiskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : liveRiskResult.riskLevel === 'HIGH' ? 'text-warning' : liveRiskResult.riskLevel === 'MEDIUM' ? 'text-blue-500' : 'text-emerald-500'}`}>
                      {liveRiskResult.totalScore}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-4 bg-muted rounded-full overflow-hidden mb-6 shrink-0">
                    <div 
                      className={`h-full transition-all duration-500 ${liveRiskResult.riskLevel === 'CRITICAL' ? 'bg-destructive' : liveRiskResult.riskLevel === 'HIGH' ? 'bg-warning' : liveRiskResult.riskLevel === 'MEDIUM' ? 'bg-blue-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${liveRiskResult.totalScore}%` }}
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">Active Risk Factors</h4>
                    {liveRiskResult.factors.filter(f => f.score > 0).length === 0 ? (
                       <p className="text-sm text-muted-foreground italic">No significant risk factors detected.</p>
                    ) : (
                      liveRiskResult.factors.filter(f => f.score > 0).map((factor, idx) => (
                        <div key={idx} className="bg-card border rounded p-3 shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-foreground">{factor.name}</span>
                            <Badge variant={factor.score > 70 ? 'destructive' : factor.score > 40 ? 'warning' : 'outline'}>{factor.score}/100</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{factor.explanation}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
