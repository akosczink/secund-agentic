// src/retention-agent.ts
import { AgentSignal, AgentResult, ModelWeights } from './types';
import { DignityGuard } from './security';

/**
 * META-LOOP CONFIGURATION
 * In production, these are pulled from the Redis State Store,
 * updated weekly by the Meta-Reflection Loop (Loop 18).
 */
const DYNAMIC_WEIGHTS: ModelWeights = {
  burnout: 0.35,    // Increased weight due to Q4 high-stress signals
  sentiment: 0.25,
  workload: 0.20,
  motivation: 0.15,
  fairness: 0.05
};

export async function retentionAgent(signal: AgentSignal): Promise<AgentResult> {
  const start = Date.now();

  // 1. DIGNITY PROTOCOL: Anonymize immediately
  const secureId = DignityGuard.hashIdentity(signal.employeeId);

  // 2. SENSE & EVALUATE (The Core Formula)
  // Risk = Weighted sum of signals corrected by sentiment inverse
  // Logic derived from Loop 3 (Retention Risk Loop)
  const riskScore = 
    (signal.burnoutRisk * DYNAMIC_WEIGHTS.burnout) +
    ((1 - (signal.sentimentScore + 1) / 2) * DYNAMIC_WEIGHTS.sentiment) + // Normalize sentiment
    (signal.workload * DYNAMIC_WEIGHTS.workload) +
    (0.5 * DYNAMIC_WEIGHTS.motivation); // Baseline assumption if missing

  // 3. DECIDE (The Intervention Matrix)
  let recommendation = "";
  const activeLoops: string[] = ["Meta-Reflection Loop"];

  if (signal.burnoutRisk > 0.7) {
    recommendation = "URGENT: Burnout Early Warning Triggered. Suggest 'Decompression Day'.";
    activeLoops.push("Loop 1: Burnout Early Warning");
  } else if (signal.sentimentScore < -0.3) {
    recommendation = "Check in with employee — negative sentiment trend detected.";
    activeLoops.push("Loop 12: Sentiment Loop");
  } else if (signal.workload > 0.9) {
    recommendation = "Workload Equity Alert: Rebalance tickets within 48h.";
    activeLoops.push("Loop 4: Workload Equity");
  } else {
    recommendation = "Stable state. Continue monitoring.";
  }

  // 4. ACT & RETURN
  return {
    risk: Number(riskScore.toFixed(3)),
    recommendation,
    loopsEngaged: activeLoops,
    meta: {
      anonymizedId: secureId,
      processingTimeMs: Date.now() - start,
      modelVersion: "v2.0-agentic"
    }
  };
}
