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

const clampWithNote = (
  value: number,
  min: number,
  max: number,
  field: string,
  notes: string[]
) => {
  if (Number.isNaN(value)) {
    notes.push(`${field} was NaN; defaulted to ${min}`);
    return min;
  }
  if (value < min) {
    notes.push(`${field} clamped from ${value} to ${min}`);
    return min;
  }
  if (value > max) {
    notes.push(`${field} clamped from ${value} to ${max}`);
    return max;
  }
  return value;
};

export async function retentionAgent(signal: AgentSignal): Promise<AgentResult> {
  const start = Date.now();

  const notes: string[] = [];

  // 1. DIGNITY PROTOCOL: Anonymize immediately
  const secureId = DignityGuard.hashIdentity(signal.employeeId);

  // 2. CALCULATE RISK
  // Sentiment is inverted (Higher sentiment = Lower risk)
  // Normalized: (-1 to 1) -> (0 to 1)
  const sentiment = clampWithNote(signal.sentimentScore, -1, 1, 'sentimentScore', notes);
  const burnout = clampWithNote(signal.burnoutRisk, 0, 1, 'burnoutRisk', notes);
  const workload = clampWithNote(signal.workload, 0, 1, 'workload', notes);
  const motivation = clampWithNote(signal.motivation, 0, 1, 'motivation', notes);
  const fairness = clampWithNote(signal.fairnessScore, 0, 1, 'fairnessScore', notes);

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

  const riskEntries = Object.entries(riskBreakdown) as [keyof ModelWeights, number][];
  const riskScore = riskEntries.reduce((sum, [, value]) => sum + value, 0);

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

  if (!notes.length) {
    notes.push("All input signals within expected bounds; no clamping applied.");
  }

  // 4. RETURN RESULT
  return {
    risk: Number(riskScore.toFixed(3)),
    recommendation,
    loopsEngaged: activeLoops,
    explainability: {
      riskBreakdown: Object.fromEntries(
        riskEntries.map(([key, value]) => [key, Number(value.toFixed(3))])
      ),
      notes
    },
    meta: {
      anonymizedId: secureId,
      processingTimeMs: Date.now() - start,
      dignityProtocol: "ACTIVE"
    }
  };
}
