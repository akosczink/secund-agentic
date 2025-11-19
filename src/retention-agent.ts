// src/retention-agent.ts
import { AgentSignal, AgentResult, ModelWeights } from './types';
import { DignityGuard } from './security';

// Simulated dynamic weights from the Meta-Loop
const DYNAMIC_WEIGHTS: ModelWeights = {
  burnout: 0.35,
  sentiment: 0.25,
  workload: 0.20,
  motivation: 0.15,
  fairness: 0.05
};

export async function retentionAgent(signal: AgentSignal): Promise<AgentResult> {
  const start = Date.now();

  // 1. DIGNITY PROTOCOL: Anonymize immediately
  const secureId = DignityGuard.hashIdentity(signal.employeeId);

  // 2. CALCULATE RISK
  // Sentiment is inverted (Higher sentiment = Lower risk)
  // Normalized: (-1 to 1) -> (0 to 1)
  const normalizedSentimentRisk = 1 - ((signal.sentimentScore + 1) / 2);
  
  const riskScore = 
    (signal.burnoutRisk * DYNAMIC_WEIGHTS.burnout) +
    (normalizedSentimentRisk * DYNAMIC_WEIGHTS.sentiment) +
    (signal.workload * DYNAMIC_WEIGHTS.workload) +
    (0.5 * DYNAMIC_WEIGHTS.motivation); // Baseline assumption

  // 3. DECIDE INTERVENTION
  let recommendation = "";
  const activeLoops: string[] = ["Meta-Reflection Loop"];

  if (signal.burnoutRisk > 0.6) {
    recommendation = "URGENT: Burnout Risk High. Suggest 'Decompression Day'.";
    activeLoops.push("Loop 1: Burnout Early Warning");
  } else if (signal.workload > 0.85) {
    // Ez fog bekapcsolni a demóban!
    recommendation = "Workload Equity Alert: Rebalance tickets within 48h.";
    activeLoops.push("Loop 4: Workload Equity");
  } else if (signal.sentimentScore < -0.2) {
    recommendation = "Check in with employee — negative sentiment trend.";
    activeLoops.push("Loop 12: Sentiment Loop");
  } else {
    recommendation = "Stable state. Continue monitoring.";
  }

  // 4. RETURN RESULT
  return {
    risk: Number(riskScore.toFixed(3)),
    recommendation,
    loopsEngaged: activeLoops,
    meta: {
      anonymizedId: secureId,
      processingTimeMs: Date.now() - start,
      dignityProtocol: "ACTIVE"
    }
  };
}
