// src/types.ts

/**
 * DIGNITY PROTOCOL:
 * Raw signals are transient. We never store them long-term without aggregation.
 */
export interface AgentSignal {
  employeeId: string;
  performance: number;      // 0.0 - 1.0
  burnoutRisk: number;      // 0.0 - 1.0 (Calculated by Loop 1)
  sentimentScore: number;   // -1.0 to +1.0 (Calculated by Loop 12)
  workload: number;         // 0.0 - 1.0 (Calculated by Loop 4)
}

/**
 * The output of the Agentic Retention Engine
 */
export interface AgentResult {
  risk: number;
  recommendation: string;
  loopsEngaged: string[];
  meta: {
    anonymizedId: string;
    processingTimeMs: number;
    modelVersion: string;
  };
}

/**
 * META-LOOP STATE:
 * These weights are dynamically adjusted by the system based on intervention success rates.
 */
export interface ModelWeights {
  burnout: number;
  sentiment: number;
  workload: number;
  motivation: number;
  fairness: number;
}
