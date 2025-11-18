export interface EmployeeSignal {
  stress: number;
  engagement: number;
  performance: number;
  recent_conflicts: number;
}

export interface RetentionResult {
  risk: number;
  intervention: string;
  confidence: number;
}

export function RetentionAgent(signal: EmployeeSignal): RetentionResult {
  const risk =
    signal.stress * 0.35 +
    (1 - signal.engagement) * 0.30 +
    (1 - signal.performance) * 0.25 +
    (signal.recent_conflicts / 10) * 0.10;

  let intervention = "";

  if (risk > 0.75) {
    intervention = "Immediate intervention: 1:1 talk + workload relief + support plan.";
  } else if (risk > 0.55) {
    intervention = "Encourage wellbeing check-in + light workload adjustment.";
  } else if (risk > 0.35) {
    intervention = "Positive reinforcement + quick pulse survey next week.";
  } else {
    intervention = "Healthy state. Maintain rhythm + periodic wellbeing touchpoints.";
  }

  return {
    risk: Number(risk.toFixed(3)),
    intervention,
    confidence: 0.90
  };
}
