import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { History, PlayCircle, PauseCircle, FastForward, SkipBack, Activity } from 'lucide-react';
import { demonstrationCase } from '../data/scamCase';
import { evaluateRisk } from '../engine/riskEngine';

export function JourneyReplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const events = demonstrationCase.events;
  const isComplete = currentIndex >= events.length - 1;
  const activeEvent = events[currentIndex];
  
  // Calculate final risk for telemetry context
  const riskResult = evaluateRisk(demonstrationCase);

  useEffect(() => {
    let interval;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= events.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500); // 1.5 seconds per event playback
    } else if (isComplete) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete, events.length]);

  const progress = events.length > 1 ? (currentIndex / (events.length - 1)) * 100 : 100;

  const handlePlayPause = () => {
    if (isComplete) {
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <History className="h-8 w-8 text-primary" />
          Demonstration Session Replay
        </h1>
        <p className="text-muted-foreground mt-2">Deterministic replay of the Case {demonstrationCase.caseId} chronological event timeline.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-border/50 overflow-hidden bg-black text-white">
          <div className="h-[400px] flex items-center justify-center border-b border-white/10 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20 blur-sm" />
            <div className="relative z-10 text-center space-y-6 max-w-lg px-4">
               {isPlaying ? (
                 <div className="w-16 h-16 rounded-full border-4 border-primary/50 border-t-primary animate-spin mx-auto" />
               ) : (
                 <PlayCircle 
                   className="w-16 h-16 text-primary mx-auto cursor-pointer hover:scale-110 transition-transform" 
                   onClick={handlePlayPause} 
                 />
               )}
               
               <div>
                 <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-widest">{activeEvent.time}</p>
                 <p className="text-xl font-bold tracking-widest uppercase text-white drop-shadow-md">
                    {isPlaying ? "STREAMING TELEMETRY" : isComplete ? "REPLAY COMPLETE" : `${demonstrationCase.caseId} PAUSED`}
                 </p>
                 <p className="text-md mt-2 text-white/80 font-medium">{activeEvent.description}</p>
               </div>
               
               <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/50">Subject: {demonstrationCase.customer.name} • Device: {demonstrationCase.customer.device}</p>
                  {isComplete && (
                    <p className="text-sm font-bold text-destructive mt-1">Final Risk: {riskResult.riskLevel} ({riskResult.totalScore}/100)</p>
                  )}
               </div>
            </div>
            
            {isPlaying && (
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
              </div>
            )}
          </div>
          <CardContent className="p-4 bg-zinc-950 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <SkipBack className="w-5 h-5 text-white/70 cursor-pointer hover:text-white" onClick={() => { setCurrentIndex(0); setIsPlaying(false); }} />
               {isPlaying ? (
                 <PauseCircle className="w-8 h-8 text-white cursor-pointer" onClick={() => setIsPlaying(false)} />
               ) : (
                 <PlayCircle className="w-8 h-8 text-white cursor-pointer" onClick={handlePlayPause} />
               )}
               <FastForward className="w-5 h-5 text-white/70 cursor-pointer hover:text-white" onClick={() => { setCurrentIndex(events.length - 1); setIsPlaying(false); }} />
             </div>
             <div className="flex-1 px-8">
               <div className="h-2 w-full bg-white/20 rounded-full relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
               </div>
             </div>
             <div className="text-sm font-mono text-white/70 w-32 text-right">
               Event {currentIndex + 1} / {events.length}
             </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 shadow-sm border-border/50 bg-black text-emerald-500 font-mono text-xs overflow-hidden flex flex-col">
          <CardHeader className="border-b border-emerald-900/30 bg-emerald-950/20 py-3">
            <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
              <Activity className="w-4 h-4" /> Case Event Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1 overflow-y-auto space-y-4 opacity-90">
            {events.slice(0, currentIndex + 1).map((evt, idx) => {
              const isCritical = evt.type === 'intervention' || evt.type === 'engine';
              const isWarning = evt.type === 'device' || evt.type === 'call' || evt.type === 'behaviour';
              
              return (
                <div 
                  key={idx} 
                  className={`animate-in fade-in slide-in-from-bottom-2 ${
                    isCritical ? 'text-red-500 font-bold' 
                    : isWarning ? 'text-yellow-500' 
                    : 'text-emerald-500'
                  }`}
                >
                  <div className="opacity-70 mb-1">[{evt.time}]</div>
                  <div>{evt.description}</div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
