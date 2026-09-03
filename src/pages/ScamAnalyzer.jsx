import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MessageSquareWarning, ShieldAlert, CheckCircle2, ScanSearch, AlertTriangle, Fingerprint } from 'lucide-react';

const mockAnalysisResult = {
  score: 92,
  level: 'CRITICAL',
  intent: 'Bank Impersonation / Urgency Manipulation',
  signals: [
    { type: 'Urgency', text: '"within 24 hours"', weight: 'High' },
    { type: 'Authority', text: '"Reserve Bank of India"', weight: 'High' },
    { type: 'Consequence', text: '"account will be permanently frozen"', weight: 'Critical' },
    { type: 'Call to Action', text: '"click the secure link below"', weight: 'Critical' }
  ],
  explanation: 'This communication exhibits classic signs of social engineering. It creates false urgency by threatening account suspension, impersonates a high-level authority (RBI), and provides a malicious call to action to harvest credentials.'
};

export function ScamAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      let analysis = {};
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('lakh') || lowerText.includes('lottery') || lowerText.includes('won') || lowerText.includes('prize') || lowerText.includes('ruppes')) {
        analysis = {
          score: 88,
          level: 'CRITICAL',
          intent: 'Lottery / Advance Fee Scam',
          signals: [
            { type: 'Financial Lure', text: 'Mention of large unexpected sums', weight: 'High' },
            { type: 'Unsolicited Reward', text: 'Fake prize declaration', weight: 'High' }
          ],
          explanation: 'This communication uses a classic lottery scam template, promising a large sum of money to entice the victim into paying an "advance fee" or sharing bank details to claim it.'
        };
      } else if (lowerText.includes('police') || lowerText.includes('arrest') || lowerText.includes('fir') || lowerText.includes('customs')) {
         analysis = {
          score: 95,
          level: 'CRITICAL',
          intent: 'Digital Arrest / Extortion',
          signals: [
            { type: 'Authority', text: 'Impersonating law enforcement', weight: 'Critical' },
            { type: 'Fear/Threat', text: 'Threatening immediate arrest', weight: 'Critical' }
          ],
          explanation: 'Extremely high pressure extortion tactic. Scammers are impersonating authorities to force immediate financial compliance through fear of arrest.'
        };
      } else if (lowerText.includes('rbi') || lowerText.includes('account frozen') || lowerText.includes('urgent') || lowerText.includes('kyc')) {
        analysis = mockAnalysisResult;
      } else {
         analysis = {
          score: 12,
          level: 'SAFE',
          intent: 'Normal Communication',
          signals: [
            { type: 'Safe', text: 'No manipulation detected', weight: 'Low' }
          ],
          explanation: 'This text appears to be standard, low-risk communication. No psychological pressure, urgency, or manipulation vectors were detected by the NLP model.'
        };
      }
      
      setResult(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const loadExample = () => {
    setText("URGENT: Your Reserve Bank of India (RBI) account monitoring has detected suspicious activity. Your account will be permanently frozen within 24 hours. Please click the secure link below immediately to verify your identity and prevent blocking.");
    setResult(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <MessageSquareWarning className="h-8 w-8 text-primary" />
          Scam Pressure Analyzer
        </h1>
        <p className="text-muted-foreground mt-2">
          Evaluate communication payloads (SMS, Email, Voice Transcripts) for manipulation and psychological pressure signals.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle>Input Payload (Testing Console)</CardTitle>
            <CardDescription>
              In production, the ScamShield Mobile SDK automatically intercepts suspicious SMS/WhatsApp messages in the background. You can manually test the NLP model here.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <textarea 
              className="flex-1 w-full p-4 rounded-md border bg-muted/30 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm min-h-[250px]"
              placeholder="Paste communication text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex gap-3">
              <Button 
                className="flex-1 gap-2 shadow-lg" 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !text.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <ScanSearch className="h-4 w-4 animate-spin" />
                    Analyzing Neural Patterns...
                  </>
                ) : (
                  <>
                    <ScanSearch className="h-4 w-4" />
                    Analyze Payload
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={loadExample}>Simulate Intercepted SMS</Button>
            </div>
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
            <CardTitle>Intelligence Report</CardTitle>
            <CardDescription>NLP model output and scam probability score.</CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-4 pt-12">
                <ShieldAlert className="h-16 w-16" />
                <p>Awaiting payload for analysis.</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-start justify-between bg-destructive/5 border border-destructive/20 p-4 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-destructive tracking-widest uppercase">Scam Probability</span>
                    </div>
                    <h3 className="text-2xl font-bold text-destructive">{result.intent}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-destructive">{result.score}%</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Detected Pressure Signals
                  </h4>
                  <div className="space-y-2">
                    {result.signals.map((signal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div>
                          <Badge variant={signal.weight === 'Critical' ? 'destructive' : 'warning'} className="mb-1 text-[10px]">
                            {signal.type}
                          </Badge>
                          <p className="text-sm font-medium italic text-foreground">{signal.text}</p>
                        </div>
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground opacity-30" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-2">Engine Synthesis</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.explanation}
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
