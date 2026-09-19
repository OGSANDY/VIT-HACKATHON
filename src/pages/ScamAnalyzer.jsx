import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MessageSquareWarning, ShieldAlert, CheckCircle2, ScanSearch, AlertTriangle, Fingerprint, ShieldCheck } from 'lucide-react';
import { evaluateRisk } from '../engine/riskEngine';
import { demonstrationCase } from '../data/scamCase';

const analyzeCommunication = (text) => {
  const lowerText = text.toLowerCase();
  
  const signals = {
    scamPressure: false,
    urgency: false,
    authorityImpersonation: false,
    threat: false,
    financialDemand: false,
    keywordsDetected: []
  };

  const urgencyKeywords = ['immediately', 'now', 'today', 'within minutes', 'urgent', '24 hours', 'action required'];
  const authorityKeywords = ['police', 'rbi', 'bank officer', 'government', 'cyber crime', 'court', 'customs'];
  const threatKeywords = ['blocked', 'arrest', 'legal action', 'freeze', 'frozen', 'case', 'warrant', 'fir', 'suspension'];
  const financialKeywords = ['transfer', 'pay', 'send money', 'deposit', 'fee', '₹', 'lakh', 'account number', 'rupees'];

  if (urgencyKeywords.some(k => lowerText.includes(k))) signals.urgency = true;
  if (authorityKeywords.some(k => lowerText.includes(k))) signals.authorityImpersonation = true;
  if (threatKeywords.some(k => lowerText.includes(k))) signals.threat = true;
  if (financialKeywords.some(k => lowerText.includes(k))) signals.financialDemand = true;

  if (signals.urgency || signals.authorityImpersonation || signals.threat || signals.financialDemand) {
    signals.scamPressure = true;
  }

  const detectedUI = [];
  if (signals.urgency) detectedUI.push({ type: 'Urgency', text: 'Time-sensitive pressure detected', weight: 'High' });
  if (signals.authorityImpersonation) detectedUI.push({ type: 'Authority', text: 'Impersonation of official entity', weight: 'Critical' });
  if (signals.threat) detectedUI.push({ type: 'Threat', text: 'Coercive consequences mentioned', weight: 'Critical' });
  if (signals.financialDemand) detectedUI.push({ type: 'Financial', text: 'Demand for payment or details', weight: 'High' });
  
  if (detectedUI.length === 0) {
     detectedUI.push({ type: 'Safe', text: 'No manipulation detected', weight: 'Low' });
  }

  return { signals, detectedUI };
};

export function ScamAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [baselineRisk, setBaselineRisk] = useState(null);

  useEffect(() => {
    // Calculate a baseline risk assuming no communication signals
    const baseCase = {
      ...demonstrationCase,
      communicationSignals: {
        scamPressure: false,
        urgency: false,
        authorityImpersonation: false,
        threat: false,
        financialDemand: false
      }
    };
    setBaselineRisk(evaluateRisk(baseCase));
  }, []);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const { signals, detectedUI } = analyzeCommunication(text);
      
      const currentCase = {
        ...demonstrationCase,
        communicationSignals: signals
      };
      
      const riskResult = evaluateRisk(currentCase);
      const scamPressureFactor = riskResult.factors.find(f => f.name === 'Scam Pressure');
      
      let intent = 'Normal Communication';
      if (scamPressureFactor.score > 70) intent = 'High-Pressure Social Engineering';
      else if (scamPressureFactor.score > 30) intent = 'Suspicious Manipulation';
      
      setResult({
        intent,
        detectedUI,
        riskResult,
        scamPressureFactor
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const loadExample = (type) => {
    if (type === 'benign') {
      setText("Your monthly statement for account XXXX is ready. View it securely in your banking application.");
    } else if (type === 'urgent') {
      setText("Your account requires immediate verification today to stay active.");
    } else if (type === 'authority') {
      setText("This is a police cybercrime notice. Your account will be frozen and legal action will begin.");
    } else {
      setText("URGENT: Your Reserve Bank of India (RBI) account monitoring has detected suspicious activity. Your account will be permanently frozen within 24 hours. A police warrant is pending unless you transfer ₹85,000 immediately to the verification account.");
    }
    setResult(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <MessageSquareWarning className="h-8 w-8 text-primary" />
          Rule-based Scam Signal Analysis
        </h1>
        <p className="text-muted-foreground mt-2">
          Evaluate communication payloads for manipulation and psychological pressure signals that feed the central risk engine.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle>Input Payload (Simulation)</CardTitle>
            <CardDescription>
              Test the extraction of manipulation vectors from text.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <textarea 
              className="flex-1 w-full p-4 rounded-md border bg-muted/30 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm min-h-[200px]"
              placeholder="Paste communication text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-2 mb-2">
              <Button variant="secondary" size="sm" onClick={() => loadExample('benign')}>Benign SMS</Button>
              <Button variant="secondary" size="sm" onClick={() => loadExample('urgent')}>Urgent SMS</Button>
              <Button variant="secondary" size="sm" onClick={() => loadExample('authority')}>Threat SMS</Button>
              <Button variant="outline" size="sm" onClick={() => loadExample('full')}>Full Scam SMS</Button>
            </div>

            <Button 
              className="w-full gap-2 shadow-lg h-12" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !text.trim()}
            >
              {isAnalyzing ? (
                <>
                  <ScanSearch className="h-5 w-5 animate-spin" />
                  Extracting Signals...
                </>
              ) : (
                <>
                  <ScanSearch className="h-5 w-5" />
                  Analyze Payload
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md border-border/50 relative overflow-hidden min-h-[500px]">
          {isAnalyzing && (
            <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="relative flex h-16 w-16 mb-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40"></span>
                <span className="relative inline-flex rounded-full h-16 w-16 bg-primary/20 items-center justify-center border-2 border-primary border-t-transparent animate-spin">
                  <Fingerprint className="h-8 w-8 text-primary animate-pulse" />
                </span>
              </div>
              <p className="font-semibold text-primary animate-pulse">Extracting Manipulation Vectors...</p>
            </div>
          )}

          <CardHeader>
            <CardTitle>Unified Intelligence Report</CardTitle>
            <CardDescription>Derived communication signals and their impact on the central risk engine.</CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !isAnalyzing && baselineRisk && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-70 space-y-4 pt-12">
                <ShieldCheck className="h-16 w-16" />
                <p>Awaiting payload. Baseline Unified Risk is <strong>{baselineRisk.riskLevel} ({baselineRisk.totalScore}/100)</strong>.</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                
                {/* Communication Impact Section */}
                <div className="flex items-start justify-between bg-muted/40 border border-border p-4 rounded-xl relative overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Communication Impact</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{result.intent}</h3>
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <span className="text-xs font-bold text-muted-foreground uppercase">Scam Pressure</span>
                    <div className={`text-3xl font-black ${result.scamPressureFactor.score > 70 ? 'text-destructive' : result.scamPressureFactor.score > 30 ? 'text-warning' : 'text-emerald-500'}`}>
                      {result.scamPressureFactor.score}/100
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Detected Pressure Signals
                  </h4>
                  <div className="space-y-2">
                    {result.detectedUI.map((signal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div>
                          <Badge variant={signal.weight === 'Critical' ? 'destructive' : signal.weight === 'High' ? 'warning' : 'outline'} className="mb-1 text-[10px]">
                            {signal.type}
                          </Badge>
                          <p className="text-sm font-medium italic text-foreground">{signal.text}</p>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground opacity-30" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Unified Engine Result */}
                <div className={`flex items-center justify-between border p-5 rounded-xl ${result.riskResult.riskLevel === 'CRITICAL' ? 'bg-destructive/10 border-destructive/30' : result.riskResult.riskLevel === 'HIGH' ? 'bg-warning/10 border-warning/30' : result.riskResult.riskLevel === 'MEDIUM' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                   <div>
                     <span className="text-xs font-bold tracking-widest uppercase opacity-70">Unified Risk Result</span>
                     <h3 className={`text-2xl font-black mt-1 ${result.riskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : result.riskResult.riskLevel === 'HIGH' ? 'text-warning' : result.riskResult.riskLevel === 'MEDIUM' ? 'text-blue-600' : 'text-emerald-600'}`}>
                        {result.riskResult.riskLevel} RISK
                     </h3>
                   </div>
                   <div className={`text-5xl font-black ${result.riskResult.riskLevel === 'CRITICAL' ? 'text-destructive' : result.riskResult.riskLevel === 'HIGH' ? 'text-warning' : result.riskResult.riskLevel === 'MEDIUM' ? 'text-blue-600' : 'text-emerald-600'}`}>
                      {result.riskResult.totalScore}
                   </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-2">Engine Synthesis</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.scamPressureFactor.explanation} The communication signals have updated the central risk engine model for this case, resulting in a final unified risk score of {result.riskResult.totalScore}/100.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
