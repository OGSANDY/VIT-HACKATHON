export const demonstrationCase = {
  caseId: "SCM-2048",
  status: "OPEN",
  scamType: "Digital Arrest / Bank Impersonation",
  createdAt: new Date().toISOString(),

  customer: {
    name: "Arun Kumar",
    customerId: "CUST-88219",
    device: "iPhone 13",
    normalBehaviourSummary: "Typical transactions under ₹10,000 to known beneficiaries. Low frequency of new payee additions. Average session length 2-4 minutes."
  },

  transaction: {
    amount: 85000,
    currency: "INR",
    beneficiary: "Rahul Sharma",
    accountInformation: "XXXX-XXXX-9921",
    isNewBeneficiary: true,
    amountDeviationPercent: 850 // 85k compared to usual 10k
  },

  communicationSignals: {
    scamPressure: true,
    urgency: true,
    authorityImpersonation: true,
    threat: true,
    financialDemand: true,
    keywordsDetected: ["rbi", "account frozen", "police", "arrest", "urgent"]
  },

  behaviouralSignals: {
    behaviourDeviation: true,
    sessionLengthDeviation: true, // Extremely long session
    hesitationPatterns: true,
    navigationAnomalies: true
  },

  deviceContextSignals: {
    activeCall: true,
    callDurationMinutes: 42,
    remoteScreenSharing: true,
    remoteApp: "AnyDesk",
    gyroscopeJitter: true,
    recentThreateningMessage: true
  },

  beneficiarySignals: {
    beneficiaryRisk: true,
    newBeneficiary: true,
    beneficiaryAgeMinutes: 2,
    knownMuleNetwork: false 
  },

  networkSignals: {
    networkAnomaly: true,
    suspiciousConnections: true,
    vpnOrProxyDetected: true,
    ispDeviation: false
  },

  events: [
    { time: "10:15 AM", description: "Suspicious communication received (SMS)", type: "communication" },
    { time: "10:18 AM", description: "Incoming call accepted from unknown number", type: "call" },
    { time: "10:20 AM", description: "Banking session started", type: "session" },
    { time: "10:21 AM", description: "Authentication successful", type: "auth" },
    { time: "10:25 AM", description: "Active call signal detected (ongoing)", type: "call" },
    { time: "10:32 AM", description: "Screen-sharing signal detected (AnyDesk)", type: "device" },
    { time: "10:35 AM", description: "Behavioural anomaly detected (Hesitation, Jitter)", type: "behaviour" },
    { time: "10:45 AM", description: "New beneficiary added (Rahul Sharma)", type: "beneficiary" },
    { time: "10:47 AM", description: "₹85,000 transfer initiated", type: "transaction" },
    { time: "10:48 AM", description: "Risk threshold crossed (CRITICAL)", type: "engine" },
    { time: "10:48 AM", description: "Transaction blocked", type: "intervention" }
  ],

  network: {
    nodes: [
      { id: '1', type: 'target', label: 'Arun Kumar (Customer)', risk: 'critical', x: 50, y: 50, details: { id: "CUST-88219", inflow: "N/A", outflow: "₹85,000" } },
      { id: '2', type: 'mule', label: 'Rahul Sharma (Beneficiary)', risk: 'high', x: 30, y: 30, details: { id: "XXXX-XXXX-9921", inflow: "₹85,000", outflow: "₹85,000" } },
      { id: '3', type: 'mule', label: 'Unknown Account (Demonstration)', risk: 'warning', x: 70, y: 30, details: { id: "SIM-8812", inflow: "₹12,000", outflow: "₹12,000" } },
      { id: '4', type: 'hub', label: 'Crypto Exchange (Demonstration)', risk: 'critical', x: 50, y: 15, details: { id: "EX-992", inflow: "₹97,000", outflow: "₹0" } }
    ],
    relationships: [
      { source: '1', target: '2', label: 'Transaction beneficiary', amount: '₹85k (Blocked)' },
      { source: '1', target: '3', label: 'Previous suspicious transfer', amount: '₹12k' },
      { source: '2', target: '4', label: 'Immediate onward transfer', amount: '₹85k' },
      { source: '3', target: '4', label: 'Immediate onward transfer', amount: '₹12k' }
    ]
  }
};
