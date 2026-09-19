export function calculateScamPressure(signals) {
  let score = 0;
  if (!signals) return { score, explanation: "No communication signals analyzed." };
  
  if (signals.scamPressure) score += 40;
  if (signals.urgency) score += 20;
  if (signals.authorityImpersonation) score += 20;
  if (signals.threat) score += 10;
  if (signals.financialDemand) score += 10;
  
  score = Math.min(score, 100);
  
  let explanation = "Communication analysis indicates: ";
  const findings = [];
  if (signals.scamPressure) findings.push("general scam pressure");
  if (signals.urgency) findings.push("strong urgency");
  if (signals.authorityImpersonation) findings.push("authority impersonation");
  if (signals.threat) findings.push("threats");
  if (signals.financialDemand) findings.push("financial demands");
  
  explanation += findings.length > 0 ? findings.join(", ") + "." : "no significant manipulation detected.";
  
  return { score, explanation };
}

export function calculateBehaviourDeviation(signals) {
  let score = 0;
  if (!signals) return { score, explanation: "No behavioural signals analyzed." };

  if (signals.behaviourDeviation) score += 30;
  if (signals.sessionLengthDeviation) score += 30;
  if (signals.hesitationPatterns) score += 20;
  if (signals.navigationAnomalies) score += 20;

  score = Math.min(score, 100);

  let explanation = "Behavioural analysis indicates: ";
  const findings = [];
  if (signals.sessionLengthDeviation) findings.push("abnormally long session");
  if (signals.hesitationPatterns) findings.push("hesitation patterns");
  if (signals.navigationAnomalies) findings.push("erratic navigation");
  if (signals.behaviourDeviation) findings.push("deviation from historical baseline");

  explanation += findings.length > 0 ? findings.join(", ") + "." : "normal user behaviour.";

  return { score, explanation };
}

export function calculateTransactionAnomaly(transaction) {
  let score = 0;
  if (!transaction) return { score, explanation: "No transaction details provided." };

  if (transaction.isNewBeneficiary) score += 30;
  
  if (transaction.amountDeviationPercent > 500) {
    score += 70;
  } else if (transaction.amountDeviationPercent > 200) {
    score += 40;
  } else if (transaction.amountDeviationPercent > 50) {
    score += 20;
  }

  score = Math.min(score, 100);

  let explanation = "Transaction analysis indicates: ";
  const findings = [];
  if (transaction.isNewBeneficiary) findings.push("transfer to a newly added beneficiary");
  if (transaction.amountDeviationPercent > 50) findings.push(`transaction amount deviates by ${transaction.amountDeviationPercent}% from typical baseline`);

  explanation += findings.length > 0 ? findings.join(" and ") + "." : "transaction within normal parameters.";

  return { score, explanation };
}

export function calculateDeviceContextRisk(signals) {
  let score = 0;
  if (!signals) return { score, explanation: "No device context signals provided." };

  if (signals.activeCall) score += 35;
  if (signals.remoteScreenSharing) score += 40;
  if (signals.gyroscopeJitter) score += 15;
  if (signals.recentThreateningMessage) score += 10;

  score = Math.min(score, 100);

  let explanation = "Device telemetry indicates: ";
  const findings = [];
  if (signals.remoteScreenSharing) findings.push(`active remote screen sharing (${signals.remoteApp || 'unknown app'})`);
  if (signals.activeCall) findings.push(`user on an active voice call for ${signals.callDurationMinutes || 0} minutes`);
  if (signals.gyroscopeJitter) findings.push("high device physical jitter");
  if (signals.recentThreateningMessage) findings.push("recent threatening message received");

  explanation += findings.length > 0 ? findings.join(", ") + "." : "secure device state.";

  return { score, explanation };
}

export function calculateBeneficiaryRisk(signals) {
  let score = 0;
  if (!signals) return { score, explanation: "No beneficiary signals provided." };

  if (signals.beneficiaryRisk) score += 30;
  if (signals.newBeneficiary) score += 30;
  if (signals.beneficiaryAgeMinutes < 60) score += 20;
  if (signals.knownMuleNetwork) score += 20;

  score = Math.min(score, 100);

  let explanation = "Beneficiary analysis indicates: ";
  const findings = [];
  if (signals.knownMuleNetwork) findings.push("beneficiary is linked to a known mule network");
  if (signals.beneficiaryRisk) findings.push("high-risk beneficiary profile");
  if (signals.newBeneficiary) findings.push("recently added payee");
  if (signals.beneficiaryAgeMinutes < 60) findings.push(`payee age is only ${signals.beneficiaryAgeMinutes} minutes`);

  explanation += findings.length > 0 ? findings.join(", ") + "." : "low-risk beneficiary.";

  return { score, explanation };
}

export function calculateNetworkRisk(signals) {
  let score = 0;
  if (!signals) return { score, explanation: "No network signals provided." };

  if (signals.networkAnomaly) score += 40;
  if (signals.suspiciousConnections) score += 30;
  if (signals.vpnOrProxyDetected) score += 20;
  if (signals.ispDeviation) score += 10;

  score = Math.min(score, 100);

  let explanation = "Network analysis indicates: ";
  const findings = [];
  if (signals.networkAnomaly) findings.push("network anomalies");
  if (signals.suspiciousConnections) findings.push("suspicious connection routing");
  if (signals.vpnOrProxyDetected) findings.push("VPN or proxy active");
  if (signals.ispDeviation) findings.push("ISP deviation");

  explanation += findings.length > 0 ? findings.join(", ") + "." : "normal network routing.";

  return { score, explanation };
}

export function evaluateRisk(caseData) {
  const factors = [];
  
  // Calculate individual dimension scores
  const scamPressure = calculateScamPressure(caseData.communicationSignals);
  factors.push({
    name: "Scam Pressure",
    score: scamPressure.score,
    weight: 25,
    contribution: (scamPressure.score * 0.25).toFixed(2),
    explanation: scamPressure.explanation
  });

  const behaviourDeviation = calculateBehaviourDeviation(caseData.behaviouralSignals);
  factors.push({
    name: "Behaviour Deviation",
    score: behaviourDeviation.score,
    weight: 15,
    contribution: (behaviourDeviation.score * 0.15).toFixed(2),
    explanation: behaviourDeviation.explanation
  });

  const transactionAnomaly = calculateTransactionAnomaly(caseData.transaction);
  factors.push({
    name: "Transaction Anomaly",
    score: transactionAnomaly.score,
    weight: 20,
    contribution: (transactionAnomaly.score * 0.20).toFixed(2),
    explanation: transactionAnomaly.explanation
  });

  const deviceRisk = calculateDeviceContextRisk(caseData.deviceContextSignals);
  factors.push({
    name: "Device / Context Risk",
    score: deviceRisk.score,
    weight: 15,
    contribution: (deviceRisk.score * 0.15).toFixed(2),
    explanation: deviceRisk.explanation
  });

  const beneficiaryRisk = calculateBeneficiaryRisk(caseData.beneficiarySignals);
  factors.push({
    name: "Beneficiary Risk",
    score: beneficiaryRisk.score,
    weight: 15,
    contribution: (beneficiaryRisk.score * 0.15).toFixed(2),
    explanation: beneficiaryRisk.explanation
  });

  const networkRisk = calculateNetworkRisk(caseData.networkSignals);
  factors.push({
    name: "Network Risk",
    score: networkRisk.score,
    weight: 10,
    contribution: (networkRisk.score * 0.10).toFixed(2),
    explanation: networkRisk.explanation
  });

  // Calculate weighted total score
  const totalScoreRaw = 
    (scamPressure.score * 0.25) +
    (behaviourDeviation.score * 0.15) +
    (transactionAnomaly.score * 0.20) +
    (deviceRisk.score * 0.15) +
    (beneficiaryRisk.score * 0.15) +
    (networkRisk.score * 0.10);

  const totalScore = Math.round(totalScoreRaw);

  // Determine Risk Level and Recommended Action
  let riskLevel = "LOW";
  let recommendedAction = "ALLOW / MONITOR";

  if (totalScore >= 85) {
    riskLevel = "CRITICAL";
    recommendedAction = "HOLD TRANSACTION / ESCALATE";
  } else if (totalScore >= 70) {
    riskLevel = "HIGH";
    recommendedAction = "STEP-UP VERIFICATION / REVIEW";
  } else if (totalScore >= 40) {
    riskLevel = "MEDIUM";
    recommendedAction = "ADDITIONAL VERIFICATION";
  }

  return {
    totalScore,
    riskLevel,
    factors,
    recommendedAction
  };
}
