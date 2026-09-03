import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-emerald-400">ScamShield</h1>
          <p className="text-lg text-slate-400">Fraud-intelligence and scam-in-progress detection platform</p>
          <div className="mt-8 inline-block px-4 py-2 border border-slate-800 rounded-lg bg-slate-900/50">
            Phase 1 Foundation: Ready
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
