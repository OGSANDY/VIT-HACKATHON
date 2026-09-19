import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Play } from 'lucide-react';
import { IntelligenceSphere } from '../components/3d/IntelligenceSphere';
// import { Canvas } from '@react-three/fiber'; // Will implement in Phase G

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3 text-primary font-bold text-2xl tracking-tight">
          <ShieldCheck className="h-10 w-10 text-primary" />
          ScamShield
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-foreground">About</Button>
          <Button variant="ghost" className="text-foreground">Technology</Button>
          <Button onClick={() => navigate('/login')} className="shadow-lg">
            Enter Security Console
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Abstract background elements - Fraud Detection Theme */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 animate-scan pointer-events-none" />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/30 rounded-full blur-3xl" />

        <div className="container px-8 grid lg:grid-cols-2 gap-12 items-center z-10">
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Someone isn't stealing the transaction.<br />
                <span className="text-muted-foreground">They're manipulating the person.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                ScamShield detects the manipulation before the money moves. We analyze communication, behaviour, network context, and transaction intent to identify scam-in-progress activity.
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" onClick={() => navigate('/login')} className="text-base h-14 px-8 shadow-xl shadow-primary/20">
                Enter Security Console
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 gap-2" onClick={() => navigate('/transactions')}>
                <Play className="h-4 w-4" />
                Simulate a Scam
              </Button>
            </div>
          </div>

          <div className="h-[600px] rounded-2xl border bg-card/50 backdrop-blur-sm shadow-2xl shadow-primary/5 flex items-center justify-center relative overflow-hidden">
             <IntelligenceSphere />
          </div>
        </div>
      </main>
    </div>
  );
}
