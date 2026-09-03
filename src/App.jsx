import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { ScamAnalyzer } from './pages/ScamAnalyzer';
import { LoginPage } from './pages/LoginPage';
import { TransactionSimulator } from './pages/TransactionSimulator';
import { InvestigationMode } from './pages/InvestigationMode';
import { FraudNetwork } from './pages/FraudNetwork';
import { FraudDNA } from './pages/FraudDNA';
import { Customers } from './pages/Customers';
import { Beneficiaries } from './pages/Beneficiaries';
import { Alerts } from './pages/Alerts';
import { SystemHealth } from './pages/SystemHealth';
import { JourneyReplay } from './pages/JourneyReplay';
import { Settings } from './pages/Settings';

// Placeholders for other pages
const Placeholder = ({ title }) => (
  <div className="flex h-[60vh] items-center justify-center rounded-xl border border-dashed border-border bg-card/50">
    <div className="text-center">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2">Implementation planned for a future phase.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Application Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investigations" element={<InvestigationMode />} />
          <Route path="/investigations/:id" element={<InvestigationMode />} />
          <Route path="/analyze" element={<ScamAnalyzer />} />
          <Route path="/transactions" element={<TransactionSimulator />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/fraud-network" element={<FraudNetwork />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="/fraud-dna" element={<FraudDNA />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/replay" element={<JourneyReplay />} />
          <Route path="/health" element={<SystemHealth />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
