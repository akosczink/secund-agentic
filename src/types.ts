// src/types.ts

export interface AgentSignal {
  employeeId: string;
  performance: number;      // 0.0 - 1.0
  burnoutRisk: number;      // 0.0 - 1.0
  sentimentScore: number;   // -1.0 (negative) to +1.0 (positive)
  workload: number;         // 0.0 - 1.0
  motivation: number;       // Ezt adtuk most hozzá!
}

export interface AgentResult {
  risk: number;
  recommendation: string;
  loopsEngaged: string[];
  meta: {
    anonymizedId: string;
    processingTimeMs: number;
    dignityProtocol: "ACTIVE";
  };
}

export interface ModelWeights {
  burnout: number;
  sentiment: number;
  workload: number;
  motivation: number;
  fairness: number;
}
