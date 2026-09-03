import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { History, PlayCircle, PauseCircle, FastForward, SkipBack, Activity } from 'lucide-react';

export function JourneyReplay() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(33); // Start at 33% (approx 01:24 out of 04:12)
  const [seconds, setSeconds] = useState(84); // 84 seconds = 01:24

  useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          setProgress((next / 252) * 100); // 252 seconds total (04:12)
          return next >= 252 ? 252 : next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <History className="h-8 w-8 text-primary" />
          Session Journey Replay
        </h1>
        <p className="text-muted-foreground mt-2">Playback a blocked transaction session. This acts as a "black box" flight recorder for bank fraud analysts.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-border/50 overflow-hidden bg-black text-white">
          <div className="h-[400px] flex items-center justify-center border-b border-white/10 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20 blur-sm" />
            <div className="relative z-10 text-center space-y-4">
               {isPlaying ? (
                 <div className="w-16 h-16 rounded-full border-4 border-primary/50 border-t-primary animate-spin mx-auto" />
               ) : (
                 <PlayCircle 
                   className="w-16 h-16 text-primary mx-auto cursor-pointer hover:scale-110 transition-transform" 
                   onClick={() => setIsPlaying(true)} 
                 />
               )}
               <p className="text-xl font-bold tracking-widest">{isPlaying ? "STREAMING TELEMETRY" : "SCM-2048 PAUSED"}</p>
               <p className="text-sm text-white/50">Subject: Arun Kumar • Device: iPhone 13</p>
            </div>
            {isPlaying && (
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC
              </div>
            )}
          </div>
          <CardContent className="p-4 bg-zinc-950 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <SkipBack className="w-5 h-5 text-white/70 cursor-pointer hover:text-white" onClick={() => {setSeconds(0); setProgress(0);}} />
               {isPlaying ? (
                 <PauseCircle className="w-8 h-8 text-white cursor-pointer" onClick={() => setIsPlaying(false)} />
               ) : (
                 <PlayCircle className="w-8 h-8 text-white cursor-pointer" onClick={() => setIsPlaying(true)} />
               )}
               <FastForward className="w-5 h-5 text-white/70 cursor-pointer hover:text-white" />
             </div>
             <div className="flex-1 px-8">
               <div className="h-2 w-full bg-white/20 rounded-full relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
               </div>
             </div>
             <div className="text-sm font-mono text-white/70 w-24 text-right">
               {formatTime(seconds)} / 04:12
             </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 shadow-sm border-border/50 bg-black text-emerald-500 font-mono text-xs overflow-hidden flex flex-col">
          <CardHeader className="border-b border-emerald-900/30 bg-emerald-950/20 py-3">
            <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
              <Activity className="w-4 h-4" /> Live Event Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1 overflow-y-auto space-y-3 opacity-80">
            <div className="text-emerald-700">[00:00] Session Initialized</div>
            <div className="text-emerald-700">[00:15] App opened (Foreground)</div>
            <div className="text-emerald-700">[00:42] Biometric Auth Success</div>
            <div><span className="text-emerald-300">[01:12] TELEMETRY:</span> Active Voice Call Detected</div>
            <div className="text-emerald-300">[01:15] Gyroscope: High Jitter (Hand shaking)</div>
            {seconds > 85 && <div className="text-yellow-500 animate-in fade-in slide-in-from-bottom-2">[01:25] Screen Sharing permission requested</div>}
            {seconds > 88 && <div className="text-red-500 animate-in fade-in slide-in-from-bottom-2">[01:28] CRITICAL: AnyDesk overlay active</div>}
            {seconds > 95 && <div className="text-red-500 animate-in fade-in slide-in-from-bottom-2">[01:35] Beneficiary addition started</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
