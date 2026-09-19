import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Lock, Fingerprint, ScanFace, KeyRound } from 'lucide-react';
import { IntelligenceSphere } from '../components/3d/IntelligenceSphere';

export function LoginPage() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Simulate secure authentication delay
    setTimeout(() => {
      setIsAuthenticating(false);
      navigate('/dashboard'); // Route to the main dashboard after "login"
    }, 2000);
  };

  const autofillCredentials = () => {
    setEmployeeId('ANALYST-7492-X');
    setPassword('••••••••••••');
  };

  return (
    <div className="min-h-screen bg-transparent flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 animate-scan pointer-events-none" />
      
      {/* Left Side - 3D Visual */}
      <div className="hidden lg:flex flex-1 flex-col justify-center relative border-r border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-80 z-0">
          <IntelligenceSphere />
        </div>
        
        {/* Gradient overlay to ensure text is always readable over the 3D sphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10 pointer-events-none" />
        
        <div className="relative z-20 max-w-lg mt-auto p-12">
          <div className="flex items-center gap-3 text-primary font-black text-4xl tracking-tight mb-4 drop-shadow-lg">
            <ShieldCheck className="h-12 w-12" />
            <span>ScamShield</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4 leading-tight drop-shadow-lg">
            Fraud Intelligence & Prevention Core
          </h2>
          <p className="text-slate-800 font-bold text-lg drop-shadow-md bg-white/50 p-4 rounded-xl backdrop-blur-sm border border-white/60">
            Authorized Personnel Only. Simulated banking telemetry for contextual fraud investigation.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 z-10 relative">
        {/* Glow effect behind the login card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <Card className="w-full max-w-md shadow-2xl border-primary/20 bg-card/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-sky-400" />
          
          <CardHeader className="space-y-4 pt-8 pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">Security Console</CardTitle>
              <CardDescription className="text-sm">
                Authenticate with your Employee Credentials
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Analyst ID</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input 
                      type="text" 
                      required
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono transition-all"
                      placeholder="Enter ID (e.g., ANALYST-001)"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Access Token</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <input 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 relative overflow-hidden group"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <span className="flex items-center gap-2">
                    <ScanFace className="h-5 w-5 animate-pulse text-emerald-200" />
                    Authenticating Biometrics...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Secure Login
                  </span>
                )}
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </form>

            <div className="mt-8 text-center border-t pt-6">
              <p className="text-xs text-muted-foreground mb-4">Hackathon Demo Controls</p>
              <Button variant="outline" size="sm" onClick={autofillCredentials} className="text-xs font-mono h-8">
                [Auto-Fill Demo Credentials]
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground max-w-sm">
          By logging in, you agree to the Bank's strict data privacy regulations. All investigation activity is monitored and audited.
        </div>
      </div>
    </div>
  );
}
