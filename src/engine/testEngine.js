import { evaluateRisk } from './riskEngine.js';
import { demonstrationCase } from '../data/scamCase.js';

console.log("=== SCAMSHIELD RISK ENGINE PROTOTYPE TEST ===\n");

// 1. Test the full critical demonstration case
console.log("TEST 1: SCM-2048 Demonstration Case (Expected: CRITICAL)");
const criticalResult = evaluateRisk(demonstrationCase);
console.log(`Score: ${criticalResult.totalScore} | Level: ${criticalResult.riskLevel}`);
console.log(`Action: ${criticalResult.recommendedAction}`);
console.log("Factors:", criticalResult.factors.map(f => `${f.name} (${f.score})`).join(", "));
console.log("--------------------------------------------------\n");

// 2. Test a LOW risk scenario
console.log("TEST 2: Low Risk Scenario (Expected: LOW)");
const lowRiskCase = {
  ...demonstrationCase,
  communicationSignals: { scamPressure: false, urgency: false, authorityImpersonation: false, threat: false, financialDemand: false },
  behaviouralSignals: { behaviourDeviation: false, sessionLengthDeviation: false, hesitationPatterns: false, navigationAnomalies: false },
  transaction: { isNewBeneficiary: false, amountDeviationPercent: 10 },
  deviceContextSignals: { activeCall: false, remoteScreenSharing: false, gyroscopeJitter: false, recentThreateningMessage: false },
  beneficiarySignals: { beneficiaryRisk: false, newBeneficiary: false, beneficiaryAgeMinutes: 10000, knownMuleNetwork: false },
  networkSignals: { networkAnomaly: false, suspiciousConnections: false, vpnOrProxyDetected: false, ispDeviation: false }
};
const lowResult = evaluateRisk(lowRiskCase);
console.log(`Score: ${lowResult.totalScore} | Level: ${lowResult.riskLevel}`);
console.log(`Action: ${lowResult.recommendedAction}`);
console.log("--------------------------------------------------\n");

// 3. Test a MEDIUM risk scenario
console.log("TEST 3: Medium Risk Scenario (Expected: MEDIUM)");
const mediumRiskCase = {
  ...lowRiskCase,
  transaction: { isNewBeneficiary: true, amountDeviationPercent: 250 }, // 40 + 30 = 70. 70 * 0.2 = 14
  deviceContextSignals: { ...lowRiskCase.deviceContextSignals, activeCall: true, remoteScreenSharing: true }, // 35+40=75 * 0.15 = 11.25
  beneficiarySignals: { beneficiaryRisk: true, newBeneficiary: true, beneficiaryAgeMinutes: 10, knownMuleNetwork: false } // 30+30+20 = 80 * 0.15 = 12
}; // Total: 14 + 11.25 + 12 = 37.25. Still too low! Let's add network risk.
mediumRiskCase.networkAnomaly = true;
mediumRiskCase.networkSignals = { networkAnomaly: true, suspiciousConnections: true, vpnOrProxyDetected: false, ispDeviation: false }; // 40+30=70 * 0.1 = 7. Total ~44 (MEDIUM)
const mediumResult = evaluateRisk(mediumRiskCase);
console.log(`Score: ${mediumResult.totalScore} | Level: ${mediumResult.riskLevel}`);
console.log(`Action: ${mediumResult.recommendedAction}`);
console.log("--------------------------------------------------\n");

// 4. Test a HIGH risk scenario
console.log("TEST 4: High Risk Scenario (Expected: HIGH)");
const highRiskCase = {
  ...mediumRiskCase,
  communicationSignals: { ...lowRiskCase.communicationSignals, scamPressure: true, urgency: true, threat: true }, // 40+20+10 = 70 * 0.25 = 17.5
  behaviouralSignals: { behaviourDeviation: true, sessionLengthDeviation: true, hesitationPatterns: false, navigationAnomalies: false }, // 30+30 = 60 * 0.15 = 9
  deviceContextSignals: { ...mediumRiskCase.deviceContextSignals, gyroscopeJitter: true } // 75+15=90 * 0.15 = 13.5
}; // Total ~ 44 + 17.5 + 9 + 2.25 = 72.75 (HIGH)
const highResult = evaluateRisk(highRiskCase);
console.log(`Score: ${highResult.totalScore} | Level: ${highResult.riskLevel}`);
console.log(`Action: ${highResult.recommendedAction}`);
console.log("--------------------------------------------------\n");

console.log("TESTS COMPLETED.");
