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

  const normalizedSentimentRisk = 1 - ((sentiment + 1) / 2);
  const motivationRisk = 1 - motivation;
  const fairnessRisk = 1 - fairness;

  const riskBreakdown: Record<keyof ModelWeights, number> = {
    burnout: burnout * DYNAMIC_WEIGHTS.burnout,
    sentiment: normalizedSentimentRisk * DYNAMIC_WEIGHTS.sentiment,
    workload: workload * DYNAMIC_WEIGHTS.workload,
    motivation: motivationRisk * DYNAMIC_WEIGHTS.motivation,
    fairness: fairnessRisk * DYNAMIC_WEIGHTS.fairness
  };

  const riskBreakdownEntries: [keyof ModelWeights, number][] =
    Object.entries(riskBreakdown) as [keyof ModelWeights, number][];

  const riskScore = riskBreakdownEntries.reduce((sum, [, value]) => sum + value, 0);

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
    recommendation,
    loopsEngaged: activeLoops,
    explainability: {
      riskBreakdown: {
        burnout: Number(burnout.toFixed(3)),
        sentiment: Number(normalizedSentimentRisk.toFixed(3)),
        workload: Number(workload.toFixed(3)),
        motivation: Number(motivationRisk.toFixed(3)),
        fairness: Number(fairnessRisk.toFixed(3))
      }
    },
    meta: {
      anonymizedId: secureId,
      processingTimeMs: Date.now() - start,
      dignityProtocol: "ACTIVE"
    }
  };
}
