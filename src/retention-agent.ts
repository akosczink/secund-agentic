// src/retention-agent.ts
import { AgentSignal, AgentResult, ModelWeights, RiskBreakdown } from './types';
import { DignityGuard } from './security';

// Simulated dynamic weights from the Meta-Loop
const DYNAMIC_WEIGHTS: ModelWeights = {
  burnout: 0.3,
  sentiment: 0.2,
  workload: 0.2,
  motivation: 0.15,
  fairness: 0.05,
  performance: 0.1
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export async function retentionAgent(signal: AgentSignal): Promise<AgentResult> {
  const start = Date.now();

  // 1. DIGNITY PROTOCOL: Anonymize immediately
  const secureId = DignityGuard.hashIdentity(signal.employeeId);

  // 2. CALCULATE RISK
  // Sentiment is inverted (Higher sentiment = Lower risk)
  // Normalized: (-1 to 1) -> (0 to 1)
  const sentiment = clamp(signal.sentimentScore, -1, 1);
  const burnout = clamp(signal.burnoutRisk, 0, 1);
  const workload = clamp(signal.workload, 0, 1);
  const motivation = clamp(signal.motivation, 0, 1);
  const fairness = clamp(signal.fairnessScore, 0, 1);
  const performance = clamp(signal.performance, 0, 1);

  const normalizedSentimentRisk = 1 - ((sentiment + 1) / 2);
  const motivationRisk = 1 - motivation;
  const fairnessRisk = 1 - fairness;
  const performanceRisk = 1 - performance;

  const riskComponents: RiskBreakdown = {
    burnout: burnout * DYNAMIC_WEIGHTS.burnout,
    sentiment: normalizedSentimentRisk * DYNAMIC_WEIGHTS.sentiment,
    workload: workload * DYNAMIC_WEIGHTS.workload,
    motivation: motivationRisk * DYNAMIC_WEIGHTS.motivation,
    fairness: fairnessRisk * DYNAMIC_WEIGHTS.fairness,
    performance: performanceRisk * DYNAMIC_WEIGHTS.performance
  };

  const riskScore = Object.values(riskComponents).reduce((sum, value) => sum + value, 0);

  const riskBreakdown: RiskBreakdown = {
    burnout: Number(riskComponents.burnout.toFixed(3)),
    sentiment: Number(riskComponents.sentiment.toFixed(3)),
    workload: Number(riskComponents.workload.toFixed(3)),
    motivation: Number(riskComponents.motivation.toFixed(3)),
    fairness: Number(riskComponents.fairness.toFixed(3)),
    performance: Number(riskComponents.performance.toFixed(3))
  };

  // 3. DECIDE INTERVENTION
  let recommendation = "";
  const activeLoops: string[] = ["Meta-Reflection Loop"];

  if (burnout > 0.6) {
    recommendation = "URGENT: Burnout Risk High. Suggest 'Decompression Day'.";
    activeLoops.push("Loop 1: Burnout Early Warning");
  } else if (workload > 0.85) {
    // Ez fog bekapcsolni a demóban!
    recommendation = "Workload Equity Alert: Rebalance tickets within 48h.";
    activeLoops.push("Loop 4: Workload Equity");
  } else if (sentiment < -0.2) {
    recommendation = "Check in with employee — negative sentiment trend.";
    activeLoops.push("Loop 12: Sentiment Loop");
  } else if (fairness < 0.6) {
    recommendation = "Equity Scan: fairness signal low — run allocation audit.";
    activeLoops.push("Loop 7: Fairness & Inclusion");
  } else {
    recommendation = "Stable state. Continue monitoring.";
  }

  if (fairness < 0.6 && !activeLoops.includes("Loop 7: Fairness & Inclusion")) {
    activeLoops.push("Loop 7: Fairness & Inclusion");
    recommendation = `${recommendation} (Include fairness audit.)`;
  }

  // 4. RETURN RESULT
  return {
    risk: Number(riskScore.toFixed(3)),
    riskBreakdown,
    recommendation,
    loopsEngaged: activeLoops,
    meta: {
      anonymizedId: secureId,
      processingTimeMs: Date.now() - start,
      dignityProtocol: "ACTIVE"
    }
  };
}
